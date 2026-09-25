import React from 'react';
import { RPSDocument } from '../types/rps';
import { CheckCircle2, Award, FileSpreadsheet, User, ClipboardCheck } from 'lucide-react';

interface Props {
  rps: RPSDocument;
}

export const RubricDetailView: React.FC<Props> = ({ rps }) => {
  return (
    <div className="space-y-6">
      {/* PENGANTAR RUBRIK OBE */}
      <div className="bg-gradient-to-r from-red-900 to-slate-900 text-white p-5 rounded-xl shadow-md">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Pedoman Rubrik & Instrumen Penilaian Autentik OBE
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 mt-1">
          Berdasarkan Standar Penilaian Kurikulum OBE 2026 Program Studi Ilmu Keolahragaan FKIP Universitas Muhammadiyah Palu.
          Mengukur ketercapaian <b>CPMK</b> dan <b>Sub-CPMK</b> secara holistik (Kognitif, Afektif/Sikap, dan Psikomotorik).
        </p>
      </div>

      {/* 1. RUBRIK KEHADIRAN */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center justify-between border-b pb-2">
          <span>1. Rubrik Penilaian Kehadiran (Bobot: {rps.komponenPenilaian.kehadiran}%)</span>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Observasi & Presensi</span>
        </h4>
        <table className="w-full border-collapse border border-slate-200 text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-700">
              <th className="border border-slate-200 p-2 w-28 text-center font-bold">Rentang Nilai</th>
              <th className="border border-slate-200 p-2 text-left font-bold">Kriteria Capaian Kehadiran & Partisipasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 p-2 text-center font-bold text-green-700 bg-green-50/40">90 – 100</td>
              <td className="border border-slate-200 p-2">Kehadiran ≥90%, selalu mengikuti proses pembelajaran secara utuh, aktif, dan tepat waktu.</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 text-center font-bold text-blue-700 bg-blue-50/40">80 – 89</td>
              <td className="border border-slate-200 p-2">Kehadiran 80–89%, sebagian besar mengikuti pembelajaran secara utuh dan tertib.</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 text-center font-bold text-amber-700 bg-amber-50/40">70 – 79</td>
              <td className="border border-slate-200 p-2">Kehadiran 70–79%, terdapat beberapa ketidakhadiran dengan keterangan atau sedikit keterlambatan.</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 text-center font-bold text-orange-700 bg-orange-50/40">60 – 69</td>
              <td className="border border-slate-200 p-2">Kehadiran 60–69%, cukup sering tidak mengikuti perkuliahan/praktik tanpa konfirmasi.</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 text-center font-bold text-red-700 bg-red-50/40">1 – 59</td>
              <td className="border border-slate-200 p-2">Kehadiran &lt;60% dan tidak memenuhi ketentuan minimum syarat evaluasi akhir semester.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. RUBRIK SIKAP & PARTISIPASI (AIK) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center justify-between border-b pb-2">
          <span>2. Rubrik Sikap, Partisipasi & Nilai Al-Islam Kemuhammadiyahan (Bobot: {rps.komponenPenilaian.sikap}%)</span>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Observasi Holistik</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-3 text-xs">
          <div className="p-2 bg-slate-50 border rounded text-center">
            <span className="font-bold block text-slate-800">Disiplin (20%)</span>
            <span className="text-slate-500 text-[11px]">Ketepatan waktu dan kepatuhan tata tertib perkuliahan/praktik</span>
          </div>
          <div className="p-2 bg-slate-50 border rounded text-center">
            <span className="font-bold block text-slate-800">Tanggung Jawab (20%)</span>
            <span className="text-slate-500 text-[11px]">Menyelesaikan tugas, beban belajar mandiri & kelompok</span>
          </div>
          <div className="p-2 bg-slate-50 border rounded text-center">
            <span className="font-bold block text-slate-800">Partisipasi (20%)</span>
            <span className="text-slate-500 text-[11px]">Keaktifan bertanya, menanggapi, berdiskusi, & demonstrasi</span>
          </div>
          <div className="p-2 bg-slate-50 border rounded text-center">
            <span className="font-bold block text-slate-800">Kerja Sama (20%)</span>
            <span className="text-slate-500 text-[11px]">Menghargai anggota kelompok, kolaboratif, & inklusif</span>
          </div>
          <div className="p-2 bg-slate-50 border rounded text-center">
            <span className="font-bold block text-slate-800">Etika & AIK (20%)</span>
            <span className="text-slate-500 text-[11px]">Kejujuran akademik, sportivitas, etika komunikasi islami</span>
          </div>
        </div>
      </div>

      {/* 3. RUBRIK PROYEK TERAPAN (PROJECT-BASED LEARNING) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center justify-between border-b pb-2">
          <span>3. Rubrik Penilaian Proyek & Presentasi (Bobot: {rps.komponenPenilaian.proyek}%)</span>
          <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">Project-Based Learning</span>
        </h4>
        <table className="w-full border-collapse border border-slate-200 text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-700">
              <th className="border border-slate-200 p-2 text-left font-bold w-1/4">Dimensi Penilaian Proyek</th>
              <th className="border border-slate-200 p-2 text-center font-bold w-16">Bobot</th>
              <th className="border border-slate-200 p-2 text-left font-bold">Kriteria Skor 90–100 (Sangat Baik)</th>
              <th className="border border-slate-200 p-2 text-left font-bold">Kriteria Skor 70–89 (Baik/Cukup)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 p-2 font-medium">Ketajaman Analisis Masalah & Sport Science</td>
              <td className="border border-slate-200 p-2 text-center font-bold">25%</td>
              <td className="border border-slate-200 p-2 text-slate-800">Analisis sangat kritis, mendalam, didukung data ilmiah berbasis bukti empiris keolahragaan modern.</td>
              <td className="border border-slate-200 p-2 text-slate-600">Analisis cukup sistematis namun rujukan data ilmiah masih terbatas pada literatur umum.</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 font-medium">Relevansi & Orisinalitas Solusi Inovasi</td>
              <td className="border border-slate-200 p-2 text-center font-bold">25%</td>
              <td className="border border-slate-200 p-2 text-slate-800">Solusi program/produk sangat aplikatif, orisinal, adaptif, serta memberikan dampak nyata bagi masyarakat.</td>
              <td className="border border-slate-200 p-2 text-slate-600">Solusi relevan namun modifikasi inovasinya masih konvensional dan umum.</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 font-medium">Pemanfaatan Teknologi Digital & Analitik</td>
              <td className="border border-slate-200 p-2 text-center font-bold">20%</td>
              <td className="border border-slate-200 p-2 text-slate-800">Mengintegrasikan perangkat digital, aplikasi video analisis gerak, atau analitik data secara optimal.</td>
              <td className="border border-slate-200 p-2 text-slate-600">Pemanfaatan instrumen digital standar (spreadsheet/video tanpa anotasi mendalam).</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 font-medium">Kualitas Laporan & Dokumentasi Proyek</td>
              <td className="border border-slate-200 p-2 text-center font-bold">15%</td>
              <td className="border border-slate-200 p-2 text-slate-800">Sistematika sangat runtut, tata bahasa baku ilmiah, lampiran data dan visualisasi lengkap.</td>
              <td className="border border-slate-200 p-2 text-slate-600">Laporan terstruktur dengan baik, namun terdapat sedikit kekurangan teknis format penulisan.</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2 font-medium">Presentasi & Tanggung Jawab Akademik</td>
              <td className="border border-slate-200 p-2 text-center font-bold">15%</td>
              <td className="border border-slate-200 p-2 text-slate-800">Komunikasi sangat meyakinkan, penguasaan materi menyeluruh, kerjasama tim harmonis dan saling melengkapi.</td>
              <td className="border border-slate-200 p-2 text-slate-600">Penyampaian cukup lancar, dominasi presentasi masih terpusat pada satu anggota.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. PORTOFOLIO HASIL BELAJAR MAHASISWA */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-2 flex items-center gap-1.5 border-b pb-2">
          <FileSpreadsheet className="w-4 h-4 text-red-800" />
          4. Format Lembar Portofolio & Rekam Jejak Pencapaian CPL Mahasiswa
        </h4>
        <p className="text-xs text-slate-600 mb-3">
          Dokumen portofolio digunakan sebagai instrumen akreditasi LAMDIK / BAN-PT yang membuktikan ketercapaian CPL dan CPMK tiap individu mahasiswa.
        </p>
        <table className="w-full border-collapse border border-slate-200 text-xs text-center">
          <thead>
            <tr className="bg-slate-50 text-slate-800">
              <th className="border border-slate-200 p-2 w-10">No</th>
              <th className="border border-slate-200 p-2 text-left">Komponen Bukti Portofolio</th>
              <th className="border border-slate-200 p-2 w-32">Sub-CPMK Diukur</th>
              <th className="border border-slate-200 p-2 w-28">Bentuk Artefak</th>
              <th className="border border-slate-200 p-2 w-20">Skor / Nilai</th>
              <th className="border border-slate-200 p-2 w-24">Paraf Dosen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 p-2">1</td>
              <td className="border border-slate-200 p-2 text-left font-medium">Tugas Kognitif & Lembar Identifikasi</td>
              <td className="border border-slate-200 p-2 font-mono text-[11px]">Sub-CPMK 1 - 6</td>
              <td className="border border-slate-200 p-2 text-slate-600">LKS / Kuis Formatif</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">2</td>
              <td className="border border-slate-200 p-2 text-left font-medium">Laporan Analisis Studi Kasus Lapangan</td>
              <td className="border border-slate-200 p-2 font-mono text-[11px]">Sub-CPMK 7</td>
              <td className="border border-slate-200 p-2 text-slate-600">Laporan Analitik</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">3</td>
              <td className="border border-slate-200 p-2 text-left font-medium">Lembar Ujian Tengah Semester (UTS)</td>
              <td className="border border-slate-200 p-2 font-mono text-[11px]">Sub-CPMK 1 - 7</td>
              <td className="border border-slate-200 p-2 text-slate-600">Lembar Jawaban Ujian</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">4</td>
              <td className="border border-slate-200 p-2 text-left font-medium">Produk / Laporan Tugas Proyek (PBL)</td>
              <td className="border border-slate-200 p-2 font-mono text-[11px]">Sub-CPMK 10 - 14</td>
              <td className="border border-slate-200 p-2 text-slate-600">Video Analisis / Poster</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">5</td>
              <td className="border border-slate-200 p-2 text-left font-medium">Lembar Ujian Akhir Semester (UAS)</td>
              <td className="border border-slate-200 p-2 font-mono text-[11px]">Sub-CPMK 8 - 14</td>
              <td className="border border-slate-200 p-2 text-slate-600">Naskah Ujian Sumatif</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
              <td className="border border-slate-200 p-2 bg-slate-50">...</td>
            </tr>
          </tbody>
        </table>

        {/* REFLEKSI DIRI */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <div className="font-bold text-slate-800 mb-1 flex items-center gap-1">
            <ClipboardCheck className="w-4 h-4 text-red-700" />
            Lembar Refleksi Diri Mahasiswa (Student Self-Assessment)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-slate-700">
            <div>
              <p className="font-medium">1. Kompetensi/Sub-CPMK yang paling berhasil dikuasai:</p>
              <div className="h-6 border-b border-slate-300 border-dashed"></div>
            </div>
            <div>
              <p className="font-medium">2. Materi yang masih memerlukan penguatan lebih lanjut:</p>
              <div className="h-6 border-b border-slate-300 border-dashed"></div>
            </div>
            <div>
              <p className="font-medium">3. Rencana tindak lanjut pengembangan diri mahasiswa:</p>
              <div className="h-6 border-b border-slate-300 border-dashed"></div>
            </div>
            <div>
              <p className="font-medium">4. Catatan / Umpan Balik Dosen Pembina MK:</p>
              <div className="h-6 border-b border-slate-300 border-dashed"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
