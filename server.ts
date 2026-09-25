import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ModelCandidate {
  name: string;
  thinkingLevel?: ThinkingLevel;
}

// Model list yang didukung dan aktif
// 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'
async function generateGeminiContentWithFallback(
  ai: GoogleGenAI,
  contents: string,
  isJson: boolean = false
) {
  // Urutkan model yang paling cepat, efisien, dan memiliki ketersediaan tinggi
  const candidates: ModelCandidate[] = [
    { name: 'gemini-1.5-flash' },
    { name: 'gemini-2.0-flash-exp' },
  ];

  for (const candidate of candidates) {
    // Lakukan hingga 2x percobaan per model dengan jeda singkat jika terjadi 503 / 429
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const config: any = {};
        if (isJson) {
          config.responseMimeType = 'application/json';
        }
        if (candidate.thinkingLevel !== undefined) {
          config.thinkingConfig = { thinkingLevel: candidate.thinkingLevel };
        }

        const response = await ai.models.generateContent({
          model: candidate.name,
          contents,
          config,
        });

        if (response && response.text) {
          return { response, modelUsed: candidate.name, unavailable: false };
        }
      } catch (err: any) {
        // Deteksi spesifik untuk quota/resource exhausted
        if (err.message && err.message.includes('resource_exhausted')) {
          return { response: null, modelUsed: null, unavailable: true, isQuotaExceeded: true };
        }
        // Jika 503/429/timeout, tunggu 400ms lalu coba lagi atau pindah ke model berikutnya
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    }
  }

  // Jika seluruh model sedang mengalami lonjakan beban serentak
  return { response: null, modelUsed: null, unavailable: true, isQuotaExceeded: false };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Endpoint API Gemini untuk Generate RPS berbasis OBE (Step-by-step)
  app.post('/api/generate-rps-ai', async (req, res) => {
    try {
      const { courseName, courseCode, sks, semester, cplList, bahanKajian, courseDescription, specialNotes, step, previousData } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          success: false,
          fallback: true,
          message: 'GEMINI_API_KEY tidak terkonfigurasi.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { timeout: 30000, headers: { 'User-Agent': 'aistudio-build' } },
      });

      let prompt = '';
      const courseMetadata = `MK: ${courseName} (${courseCode}), SKS: ${sks}, Semester: ${semester}, Deskripsi: ${courseDescription}, Catatan: ${specialNotes}`;
      const contextData = previousData ? `Data dari tahap sebelumnya: ${JSON.stringify(previousData)}` : '';
      
      if (step === 1) {
        prompt = `Anda adalah pakar kurikulum pendidikan tinggi penyusun RPS berbasis OBE untuk S1 Ilmu Keolahragaan FKIP UM Palu.
        Susunlah Deskripsi MK, CPMK (1-4), dan Sub-CPMK (1-14) untuk: ${courseMetadata}.
        CPL Prodi: ${JSON.stringify(cplList)}.
        PENTING: Gunakan Taksonomi Bloom C2-C6. HANYA berikan output JSON murni, tanpa teks penjelasan, tanpa markdown.
        Format JSON: {"deskripsiMK": "...", "cpmk": [{"kode": "...", "deskripsi": "...", "cplTerkait": ["..."]}], "subCpmk": [{"kode": "...", "deskripsi": "...", "cpmkTerkait": "...", "levelKognitif": "..."}]}`;
      } else if (step === 2) {
        prompt = `Berdasarkan ${contextData}, susunlah Materi Pembelajaran (1-16) dan Jadwal Mingguan untuk: ${courseMetadata}.
        Gunakan Bahan Kajian: ${JSON.stringify(bahanKajian)}.
        Pastikan materi pembelajaran selaras dengan deskripsi MK.
        Jadwal harus berisi tepat 16 objek. Gunakan "minggu" sebagai angka 1-16 dan "bobot" sebagai angka.
        Setiap objek jadwal wajib memiliki: minggu, subCpmk, materi, metode, waktu, pengalamanBelajar, indikator, teknikPenilaian, bobot.
        Total seluruh bobot jadwal harus 100.
        HANYA berikan output JSON murni, tanpa teks penjelasan, tanpa markdown.
        Format JSON: {"materiPembelajaran": ["..."], "mingguan": [{"minggu": 1, "subCpmk": "Sub-CPMK 1", "materi": "...", "metode": "...", "waktu": "${Number(sks) * 50}", "pengalamanBelajar": "...", "indikator": "...", "teknikPenilaian": "...", "bobot": 5}]}`;
      } else {
        prompt = `Berdasarkan ${contextData}, susunlah Daftar Pustaka (Utama, Jurnal, Pendukung) untuk: ${courseMetadata}.
        Gunakan Bahan Kajian: ${JSON.stringify(bahanKajian)}.
        PENTING: Gunakan referensi ilmiah nyata di bidang keolahragaan.
        HANYA berikan output JSON murni, tanpa teks penjelasan, tanpa markdown.
        Format JSON: {"pustakaUtama": ["..."], "artikelJurnal": ["..."], "pustakaPendukung": ["..."]}`;
      }

      const { response, unavailable, isQuotaExceeded } = await generateGeminiContentWithFallback(ai, prompt, true);
      if (unavailable || !response || !response.text) {
        return res.status(isQuotaExceeded ? 429 : 500).json({ success: false, message: isQuotaExceeded ? 'Kuota AI Terlampaui' : 'Layanan AI sibuk' });
      }

      const text = response.text || '';
      let parsed = null;
      try {
        // Coba cari JSON di dalam markdown code block
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        let jsonStr = jsonMatch ? jsonMatch[1] : text;
        
        // Bersihkan string dari karakter non-printable yang sering muncul
        jsonStr = jsonStr.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        
        parsed = JSON.parse(jsonStr);
      } catch (e) {
        console.error("JSON Parse Error:", e);
        parsed = null;
      }

      return res.json({ success: Boolean(parsed), data: parsed });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // Endpoint API Gemini untuk Pengayaan Modul Ajar Komprehensif (Buku Ajar Perkuliahan Lengkap)
  app.post('/api/generate-modul-ajar', async (req, res) => {
    try {
      const { rps } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          success: false,
          fallback: true,
          message: 'GEMINI_API_KEY belum terkonfigurasi. Modul Ajar komprehensif di-generate secara instan menggunakan Generator Mutu Bawaan.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          timeout: 30000,
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Anda adalah Guru Besar dan Pakar Kurikulum Pendidikan Jasmani & Sport Science di Universitas Muhammadiyah Palu.
Tugas Anda adalah menyusun intisari pengayaan modul ajar berbobot tinggi untuk mata kuliah:
- Nama Mata Kuliah: ${rps.mataKuliah}
- Kode: ${rps.kodeMK}
- SKS: ${rps.sks} SKS
- Semester: ${rps.semester}
- Daftar Pustaka Terverifikasi: ${JSON.stringify(rps.pustakaUtama || [])}
- Pokok Bahasan Pembelajaran: ${JSON.stringify(rps.materiPembelajaran || [])}

Berikan pengayaan materi akademik mendalam, analisis biomekanika/fisiologi, studi kasus riil atlet, serta integrasi nilai-nilai Al-Islam Kemuhammadiyahan (AIK) dalam format JSON valid:
{
  "catatanAkademik": "Uraian epistemologi dan signifikansi mata kuliah...",
  "analisisSportScience": "Integrasi teknologi digital dan hukum biomekanika...",
  "integrasiAIK": "Internalisasi karakter islami, sportivitas, dan ukhuwah...",
  "pengayaanBab": [
    {
      "minggu": 1,
      "fokusKajian": "Analisis mendalam topik...",
      "saranAktivitasLKM": "Panduan praktikum laboratorium..."
    }
  ]
}`;

      const { response, unavailable } = await generateGeminiContentWithFallback(ai, prompt, true);
      if (unavailable || !response || !response.text) {
        return res.status(200).json({
          success: false,
          fallback: true,
          message: 'Layanan AI sedang padat; Modul Ajar disusun menggunakan Standar Mutu Akademik IKOR 2026 terverifikasi.',
        });
      }

      const text = response.text || '';
      let parsed = null;
      try {
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        const cleanJson = jsonMatch ? jsonMatch[1] : text;
        parsed = JSON.parse(cleanJson.trim());
      } catch {
        parsed = null;
      }

      return res.json({
        success: Boolean(parsed),
        fallback: !parsed,
        data: parsed,
      });
    } catch {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'Modul Ajar disusun menggunakan Standar Mutu Akademik IKOR 2026.',
      });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server RPS OBE siap di port ${PORT}`);
  });
}

startServer();
