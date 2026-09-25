import React, { useState, useEffect } from 'react';
import {
  MATA_KULIAH_DATABASE,
  DAFTAR_CPL,
  BAHAN_KAJIAN,
  MataKuliah,
  IDENTITAS_PRODI
} from '../data/curriculumDatabase';
import { RPSDocument, CPMKItem, SubCPMKItem, JadwalMingguan, SoalUjianItem } from '../types/rps';
import { ModulAjarDocument } from '../types/modulAjar';
import { generateSmartRPS } from '../utils/rpsGenerator';
import { generateModulAjarFromRps } from '../utils/modulAjarGenerator';
import { exportRpsToWord } from '../utils/exportUtils';
import { OfficialDocumentView } from './OfficialDocumentView';
import { RubricDetailView } from './RubricDetailView';
import { ModulAjarView } from './ModulAjarView';
import {
  Sparkles,
  Printer,
  Download,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Edit3,
  FileText,
  Layers,
  Award,
  BookOpen,
  Calendar,
  AlertCircle,
  Clock,
  HelpCircle,
  Sliders,
  BookMarked
} from 'lucide-react';

interface Props {
  initialCourse?: MataKuliah | null;
  onSaveToBank?: (rps: RPSDocument) => void;
}

export const RpsEditor: React.FC<Props> = ({ initialCourse, onSaveToBank }) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>(
    initialCourse ? initialCourse.kode : 'SS2026042'
  );
  const [currentRps, setCurrentRps] = useState<RPSDocument>(() => {
    const defaultCourse = MATA_KULIAH_DATABASE.find(
      (mk) => mk.kode === (initialCourse ? initialCourse.kode : 'SS2026042')
    ) || MATA_KULIAH_DATABASE.find((mk) => mk.kode === 'SS2026005') || MATA_KULIAH_DATABASE[0];
    return generateSmartRPS(defaultCourse);
  });

  const [activeEditorTab, setActiveEditorTab] = useState<
    'identitas' | 'cpl-cpmk' | 'subcpmk' | 'pustaka' | 'mingguan' | 'penilaian'
  >('identitas');

  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'rubrik' | 'modul-ajar'>('editor');
  const [modulAjarDoc, setModulAjarDoc] = useState<ModulAjarDocument | null>(null);
  const [isModulAiLoading, setIsModulAiLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [apiConnectionStatus, setApiConnectionStatus] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Jika initialCourse dari props berubah (misal user klik "Buat RPS" di tab Kurikulum)
  useEffect(() => {
    if (initialCourse) {
      setSelectedCourseCode(initialCourse.kode);
      setCurrentRps(generateSmartRPS(initialCourse));
      showAlert('info', `Mata kuliah ${initialCourse.nama} (${initialCourse.kode}) dimuat ke generator RPS.`);
    }
  }, [initialCourse]);

  const showAlert = (type: 'success' | 'error' | 'info', text: string) => {
    setAlertMessage({ type, text });
    setTimeout(() => setAlertMessage(null), 5000);
  };

  const handleOpenModulAjar = () => {
    const doc = generateModulAjarFromRps(currentRps);
    setModulAjarDoc(doc);
    setViewMode('modul-ajar');
    showAlert('success', `Modul Ajar Lengkap "${currentRps.mataKuliah}" berhasil dibuat (${doc.totalEstimasiHalaman}+ lembar terverifikasi pustaka)!`);
  };

  const handleRegenerateModulWithAi = async () => {
    setIsModulAiLoading(true);
    try {
      const res = await fetch('/api/generate-modul-ajar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rps: currentRps })
      });
      const data = await res.json();
      if (data.success && data.data) {
        const baseDoc = generateModulAjarFromRps(currentRps);
        if (data.data.catatanAkademik) {
          baseDoc.deskripsiMataKuliah = `${baseDoc.deskripsiMataKuliah} ${data.data.catatanAkademik}`;
        }
        if (data.data.analisisSportScience) {
          baseDoc.petaKonsep = `${baseDoc.petaKonsep} ${data.data.analisisSportScience}`;
        }
        setModulAjarDoc(baseDoc);
        showAlert('success', 'Modul Ajar berhasil diperkaya dengan kajian mendalam Sport Science via AI Gemini!');
      } else {
        const baseDoc = generateModulAjarFromRps(currentRps);
        setModulAjarDoc(baseDoc);
        showAlert('info', data.message || 'Modul Ajar disusun menggunakan Standar Mutu Akademik IKOR 2026.');
      }
    } catch {
      const baseDoc = generateModulAjarFromRps(currentRps);
      setModulAjarDoc(baseDoc);
      showAlert('info', 'Modul Ajar disusun menggunakan Standar Mutu Akademik IKOR 2026.');
    } finally {
      setIsModulAiLoading(false);
    }
  };

  // Pilih mata kuliah dari database
  const handleSelectCourse = (code: string) => {
    setSelectedCourseCode(code);
    const found = MATA_KULIAH_DATABASE.find((m) => m.kode === code);
    if (found) {
      const generated = generateSmartRPS(found);
      setCurrentRps(generated);
      showAlert('success', `RPS mata kuliah ${found.nama} berhasil digenerate berdasarkan standar kurikulum.`);
    }
  };

  const [aiProgress, setAiProgress] = useState(0);

  // Helper untuk delay dengan exponential backoff
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Generate dengan AI Sport Science (Gemini) secara bertahap
  const handleGenerateAi = async () => {
    setIsAiLoading(true);
    setAiProgress(0);
    setApiConnectionStatus(null);
    
    let currentData = { ...currentRps };
    let generationSuccess = true;
    const stepNames = [
      "Identitas MK & Deskripsi",
      "CPL, CPMK & Sub-CPMK",
      "Materi, Jadwal & Pustaka"
    ];

    for (let step = 1; step <= 3; step++) {
      setAiProgress((step / 3) * 100);
      showAlert('info', `Tahap ${step}/3: ${stepNames[step - 1]}...`);
      
      let retries = 3;
      let delay = 1000; // Mulai dengan 1 detik

      while (retries > 0) {
        try {
          const res = await fetch('/api/generate-rps-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              step,
              previousData: currentData,
              courseName: currentRps.mataKuliah,
              courseCode: currentRps.kodeMK,
              sks: currentRps.sks,
              semester: currentRps.semester,
              cplList: currentRps.cplProdi,
              bahanKajian: currentRps.bahanKajian,
              courseDescription: currentRps.deskripsiMK,
              specialNotes: [
                `Sesuaikan seluruh materi hanya untuk mata kuliah ${currentRps.mataKuliah}.`,
                'Hapus terminologi cabang olahraga lain jika tidak relevan.',
                currentRps.catatanFokusKhusus?.trim()
                  ? `Fokus khusus dosen: ${currentRps.catatanFokusKhusus.trim()}.`
                  : ''
              ].filter(Boolean).join(' ')
            }),
          });

          if (res.status === 429) {
            throw new Error('Quota exceeded');
          }
          
          if (res.status === 503) {
            throw new Error('Rate limit exceeded');
          }

          const json = await res.json();
          if (json.success && json.data) {
            currentData = { ...currentData, ...json.data };
            setCurrentRps(currentData);
            break; // Berhasil, keluar dari loop retry
          } else {
            throw new Error('Data tidak valid');
          }
        } catch (err: any) {
          if (err.message === 'Quota exceeded') {
             retries = 0; // Langsung hentikan
          } else {
             retries--;
          }
          
          if (retries === 0) {
            console.error(`Gagal langkah ${step}:`, err);
            generationSuccess = false;
          } else {
            // ... (keep retry logic for 503)
            console.warn(`Retry ${3 - retries}/3 untuk langkah ${step}, tunggu ${delay}ms...`);
            await sleep(delay);
            delay *= 2; // Exponential backoff
          }
        }
      }
    }
    
    setAiProgress(100);
    if (generationSuccess) {
      showAlert('success', 'RPS berhasil digenerate lengkap dan siap digunakan!');
    } else {
      const found = MATA_KULIAH_DATABASE.find((m) => m.kode === currentRps.kodeMK) || {
        kode: currentRps.kodeMK,
        nama: currentRps.mataKuliah,
        sks: currentRps.sks,
        semester: currentRps.semester,
        kelompok: 'Wajib Prodi' as const,
        cpl: currentRps.cplProdi
      };
      const smart = generateSmartRPS(found, {
        catatanKhusus: currentRps.catatanFokusKhusus
      });
      setCurrentRps(smart);
      showAlert('info', 'Layanan AI sedang padat / kuota terlampaui. Generator Cerdas Mutu Akademik IKOR 2026 diaktifkan secara instan.');
    }
    setIsAiLoading(false);
  };

  // Simpan ke storage lokal
  const handleSaveLocal = () => {
    try {
      const savedList = JSON.parse(localStorage.getItem('ikor_rps_bank') || '[]');
      const filtered = savedList.filter((item: RPSDocument) => item.id !== currentRps.id);
      filtered.unshift({ ...currentRps, updatedAt: new Date().toISOString().split('T')[0] });
      localStorage.setItem('ikor_rps_bank', JSON.stringify(filtered));

      if (onSaveToBank) {
        onSaveToBank(currentRps);
      }
      showAlert('success', `Dokumen RPS ${currentRps.mataKuliah} berhasil disimpan di Bank RPS.`);
    } catch {
      showAlert('error', 'Gagal menyimpan RPS ke penyimpanan lokal browser.');
    }
  };

  // Cetak RPS
  const handlePrint = () => {
    window.print();
  };

  // Unduh dokumen Word (.doc)
  const handleDownloadWord = () => {
    exportRpsToWord(currentRps);
    showAlert('success', 'Dokumen RPS format Word (.doc) berhasil diunduh.');
  };

  // Helper perubahan field string sederhana
  const updateField = (field: keyof RPSDocument, val: any) => {
    setCurrentRps((prev) => ({ ...prev, [field]: val }));
  };

  // Toggle CPL
  const toggleCpl = (kode: string) => {
    const list = currentRps.cplProdi.includes(kode)
      ? currentRps.cplProdi.filter((c) => c !== kode)
      : [...currentRps.cplProdi, kode];
    setCurrentRps((prev) => ({ ...prev, cplProdi: list }));
  };

  // Perubahan CPMK
  const updateCpmk = (index: number, field: keyof CPMKItem, val: any) => {
    const updated = [...currentRps.cpmk];
    updated[index] = { ...updated[index], [field]: val };
    setCurrentRps((prev) => ({ ...prev, cpmk: updated }));
  };

  const addCpmk = () => {
    const newIdx = currentRps.cpmk.length + 1;
    setCurrentRps((prev) => ({
      ...prev,
      cpmk: [
        ...prev.cpmk,
        {
          kode: `CPMK ${newIdx}`,
          deskripsi: 'Mahasiswa mampu...',
          cplTerkait: [prev.cplProdi[0] || 'CPL 1']
        }
      ]
    }));
  };

  const removeCpmk = (index: number) => {
    const updated = currentRps.cpmk.filter((_, i) => i !== index);
    setCurrentRps((prev) => ({ ...prev, cpmk: updated }));
  };

  // Perubahan Sub-CPMK
  const updateSubCpmk = (index: number, field: keyof SubCPMKItem, val: any) => {
    const updated = [...currentRps.subCpmk];
    updated[index] = { ...updated[index], [field]: val };
    setCurrentRps((prev) => ({ ...prev, subCpmk: updated }));
  };

  const addSubCpmk = () => {
    const newIdx = currentRps.subCpmk.length + 1;
    setCurrentRps((prev) => ({
      ...prev,
      subCpmk: [
        ...prev.subCpmk,
        {
          kode: `Sub-CPMK ${newIdx}`,
          deskripsi: 'Mahasiswa mampu...',
          cpmkTerkait: prev.cpmk[0]?.kode || 'CPMK 1'
        }
      ]
    }));
  };

  const removeSubCpmk = (index: number) => {
    const updated = currentRps.subCpmk.filter((_, i) => i !== index);
    setCurrentRps((prev) => ({ ...prev, subCpmk: updated }));
  };

  // Perubahan baris mingguan
  const updateMingguan = (index: number, field: keyof JadwalMingguan, val: any) => {
    const updated = [...currentRps.mingguan];
    updated[index] = { ...updated[index], [field]: val };
    setCurrentRps((prev) => ({ ...prev, mingguan: updated }));
  };

  // Total bobot mingguan
  const totalBobotMingguan = currentRps.mingguan.reduce(
    (sum, m) => sum + (Number(m.bobot) || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* NOTIFIKASI ALERT */}
      {isAiLoading && (
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${aiProgress}%` }}
          ></div>
        </div>
      )}
      {alertMessage && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center justify-between shadow-sm transition-all ${
            alertMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : alertMessage.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {alertMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            {alertMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
            {alertMessage.type === 'info' && <Sparkles className="w-4 h-4 text-blue-600" />}
            <span>{alertMessage.text}</span>
          </div>
          <button
            onClick={() => setAlertMessage(null)}
            className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* TOP SECTION: PEMILIHAN MATA KULIAH & AKSI AI */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-red-700" />
            Pilih Mata Kuliah Kurikulum IKOR 2026:
          </label>
          <div className="flex items-center gap-1.5 text-[11px] flex-wrap">
            <span className="text-slate-400">Pintas Cepat:</span>
            <button
              type="button"
              onClick={() => handleSelectCourse('SOR2026009')}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                selectedCourseCode === 'SOR2026009'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
              }`}
            >
              🏀 Bola Basket
            </button>
            <button
              type="button"
              onClick={() => handleSelectCourse('SS2026005')}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                selectedCourseCode === 'SS2026005'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🧬 Anatomi
            </button>
            <button
              type="button"
              onClick={() => handleSelectCourse('SS2026007')}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                selectedCourseCode === 'SS2026007'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ⚡ Fisiologi
            </button>
            <button
              type="button"
              onClick={() => handleSelectCourse('SS2026011')}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                selectedCourseCode === 'SS2026011'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📐 Biomekanika
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2.5">
          <select
            value={selectedCourseCode}
            onChange={(e) => handleSelectCourse(e.target.value)}
            className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-sm bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <optgroup label="Semester 1 (Dasar Keilmuan & MKWN)">
              {MATA_KULIAH_DATABASE.filter((m) => m.semester === 1).map((m) => (
                <option key={m.kode} value={m.kode}>
                  [{m.kode}] {m.nama} ({m.sks} SKS - Smt 1)
                </option>
              ))}
            </optgroup>
            <optgroup label="Semester 2 (Sport Science & Teori/Praktik)">
              {MATA_KULIAH_DATABASE.filter((m) => m.semester === 2).map((m) => (
                <option key={m.kode} value={m.kode}>
                  [{m.kode}] {m.nama} ({m.sks} SKS - Smt 2)
                </option>
              ))}
            </optgroup>
            <optgroup label="Semester 3 s/d 8 (Lanjutan & Keahlian)">
              {MATA_KULIAH_DATABASE.filter((m) => m.semester >= 3 && m.kelompok !== 'Pilihan Prodi').map((m) => (
                <option key={m.kode} value={m.kode}>
                  [{m.kode}] {m.nama} ({m.sks} SKS - Smt {m.semester})
                </option>
              ))}
            </optgroup>
            <optgroup label="Mata Kuliah Pilihan Cabang Olahraga">
              {MATA_KULIAH_DATABASE.filter((m) => m.kelompok === 'Pilihan Prodi').map((m) => (
                <option key={m.kode} value={m.kode}>
                  [{m.kode}] {m.nama} ({m.sks} SKS - Pilihan)
                </option>
              ))}
            </optgroup>
          </select>

          <button
            onClick={handleGenerateAi}
            disabled={isAiLoading}
            className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
            title="Generate / Perkaya rumusan RPS dengan model AI Gemini"
          >
            <Sparkles className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : 'text-amber-300'}`} />
            <span>{isAiLoading ? 'Merumuskan RPS...' : 'Generate AI Sport Science'}</span>
          </button>

          {/* TOMBOL UTAMA BUAT MODUL AJAR LENGKAP (MIN. 45 LEMBAR) */}
          <button
            onClick={handleOpenModulAjar}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-red-800 hover:from-amber-700 hover:to-red-900 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap border border-amber-300/30"
            title="Buat Modul Ajar Lengkap Full 16 Pertemuan (Minimal 45 Lembar Berstandar Mutu Nasional)"
          >
            <BookMarked className="w-4 h-4 text-amber-300" />
            <span>Buat Modul Ajar (Min. 45 Lembar)</span>
          </button>
        </div>
        <div className="pt-1">
          <label htmlFor="catatan-fokus-rps" className="block text-xs font-bold text-slate-700 mb-1.5">
            Fokus atau konteks khusus perkuliahan
            <span className="font-normal text-slate-400"> (opsional)</span>
          </label>
          <input
            id="catatan-fokus-rps"
            type="text"
            value={currentRps.catatanFokusKhusus || ''}
            onChange={(e) =>
              setCurrentRps((prev) => ({ ...prev, catatanFokusKhusus: e.target.value }))
            }
            placeholder="Contoh: fokus renang gaya bebas untuk atlet pemula atau analisis cedera lutut"
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Catatan ini digunakan oleh Generator AI dan Generator Cerdas untuk menyesuaikan CPMK, materi, serta asesmen.
          </p>
        </div>
        {apiConnectionStatus && (
          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-medium animate-pulse">
            {apiConnectionStatus}
          </div>
        )}
      </div>

      {/* SECONDARY BAR: MODE TAMPILAN DOKUMEN & AKSI EKSPOR */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* VIEW MODE SEGMENTED BUTTONS */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setViewMode('editor')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              viewMode === 'editor'
                ? 'bg-white text-red-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>

          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              viewMode === 'preview'
                ? 'bg-white text-red-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pratinjau Resmi</span>
          </button>

          <button
            onClick={() => setViewMode('rubrik')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              viewMode === 'rubrik'
                ? 'bg-white text-red-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Rubrik & Portofolio</span>
          </button>

          <button
            onClick={handleOpenModulAjar}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              viewMode === 'modul-ajar'
                ? 'bg-red-800 text-white shadow-xs font-extrabold'
                : 'text-slate-700 hover:text-red-900 font-semibold'
            }`}
            title="Lihat Dokumen Modul Ajar Lengkap (Minimal 45 Lembar)"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-500" />
            <span>Modul Ajar (45+ Lembar)</span>
          </button>
        </div>

        {/* EKSPOR & AKSI */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleSaveLocal}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
            title="Simpan Dokumen ke Bank RPS"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simpan</span>
          </button>

          <button
            onClick={handleDownloadWord}
            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
            title="Unduh format Microsoft Word (.doc)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Word</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
            title="Cetak / Simpan sebagai PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak PDF</span>
          </button>
        </div>
      </div>

      {/* MODE TAMPILAN: MODUL AJAR (45+ LEMBAR LENGKAP) */}
      {viewMode === 'modul-ajar' && (
        <ModulAjarView
          modul={modulAjarDoc || generateModulAjarFromRps(currentRps)}
          onBack={() => setViewMode('editor')}
          onRegenerateWithAi={handleRegenerateModulWithAi}
          isAiLoading={isModulAiLoading}
        />
      )}

      {/* MODE TAMPILAN: PREVIEW RESMI */}
      {viewMode === 'preview' && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>
              ℹ️ Anda berada dalam mode <b>Pratinjau Dokumen Resmi</b> format baku Kurikulum IKOR 2026.
              Gunakan tombol <b>Cetak PDF</b> atau <b>Word</b> untuk mencetak atau mengekspor.
            </span>
            <button
              onClick={() => setViewMode('editor')}
              className="px-2.5 py-1 bg-white border border-amber-300 rounded font-semibold text-amber-800 hover:bg-amber-100"
            >
              Kembali ke Editor
            </button>
          </div>
          <OfficialDocumentView rps={currentRps} onOpenModulAjar={handleOpenModulAjar} />
        </div>
      )}

      {/* MODE TAMPILAN: RUBRIK & PORTOFOLIO */}
      {viewMode === 'rubrik' && (
        <div className="space-y-4">
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 flex items-center justify-between">
            <span>
              ℹ️ Menampilkan pedoman rubrik analitik, portofolio akreditasi LAMDIK, dan lembar refleksi diri mahasiswa.
            </span>
            <button
              onClick={() => setViewMode('editor')}
              className="px-2.5 py-1 bg-white border border-red-300 rounded font-semibold text-red-800 hover:bg-red-100"
            >
              Kembali ke Editor
            </button>
          </div>
          <RubricDetailView rps={currentRps} />
        </div>
      )}

      {/* MODE TAMPILAN: EDITOR */}
      {viewMode === 'editor' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* TAB EDITOR NAVIGATION */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto text-xs sm:text-sm font-semibold text-slate-600">
            <button
              onClick={() => setActiveEditorTab('identitas')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeEditorTab === 'identitas'
                  ? 'border-red-700 text-red-800 bg-white font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              1. Identitas & Dosen
            </button>

            <button
              onClick={() => setActiveEditorTab('cpl-cpmk')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeEditorTab === 'cpl-cpmk'
                  ? 'border-red-700 text-red-800 bg-white font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              2. CPL & CPMK ({currentRps.cplProdi.length} CPL / {currentRps.cpmk.length} CPMK)
            </button>

            <button
              onClick={() => setActiveEditorTab('subcpmk')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeEditorTab === 'subcpmk'
                  ? 'border-red-700 text-red-800 bg-white font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              3. Sub-CPMK ({currentRps.subCpmk.length} Tahap)
            </button>

            <button
              onClick={() => setActiveEditorTab('pustaka')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeEditorTab === 'pustaka'
                  ? 'border-red-700 text-red-800 bg-white font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              4. Bahan Kajian & Pustaka
            </button>

            <button
              onClick={() => setActiveEditorTab('mingguan')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeEditorTab === 'mingguan'
                  ? 'border-red-700 text-red-800 bg-white font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              5. Rencana 16 Minggu (Total: {totalBobotMingguan}%)
            </button>

            <button
              onClick={() => setActiveEditorTab('penilaian')}
              className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeEditorTab === 'penilaian'
                  ? 'border-red-700 text-red-800 bg-white font-bold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Sliders className="w-4 h-4" />
              6. Penilaian, Proyek & Soal
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* SUB-TAB 1: IDENTITAS & DOSEN */}
            {activeEditorTab === 'identitas' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Mata Kuliah</label>
                    <input
                      type="text"
                      value={currentRps.mataKuliah}
                      onChange={(e) => updateField('mataKuliah', e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2 font-bold text-slate-900 focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kode Mata Kuliah</label>
                    <input
                      type="text"
                      value={currentRps.kodeMK}
                      onChange={(e) => updateField('kodeMK', e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2 font-mono font-bold text-slate-900 focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Bobot SKS</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={currentRps.sks}
                        onChange={(e) => updateField('sks', Number(e.target.value))}
                        className="w-full text-sm border border-slate-300 rounded-lg p-2 text-center font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={currentRps.semester}
                        onChange={(e) => updateField('semester', Number(e.target.value))}
                        className="w-full text-sm border border-slate-300 rounded-lg p-2 text-center font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Penyusunan</label>
                    <input
                      type="text"
                      value={currentRps.tanggalPenyusunan}
                      onChange={(e) => updateField('tanggalPenyusunan', e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Akademik</label>
                    <input
                      type="text"
                      value={currentRps.tahunAkademik}
                      onChange={(e) => updateField('tahunAkademik', e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dosen Pengembang RPS</label>
                    <input
                      type="text"
                      value={currentRps.dosenPengembang}
                      onChange={(e) => updateField('dosenPengembang', e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Koordinator Mata Kuliah</label>
                    <input
                      type="text"
                      value={currentRps.koordinatorMK}
                      onChange={(e) => updateField('koordinatorMK', e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ketua Program Studi (Kaprodi)</label>
                    <input
                      type="text"
                      value={currentRps.kaprodi}
                      onChange={(e) => updateField('kaprodi', e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2 bg-white font-semibold"
                    />
                    <div className="text-[11px] text-slate-500 mt-1">NPUTK: {currentRps.nputkKaprodi}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Lengkap Mata Kuliah</label>
                  <textarea
                    rows={4}
                    value={currentRps.deskripsiMK}
                    onChange={(e) => updateField('deskripsiMK', e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg p-3 leading-relaxed focus:ring-1 focus:ring-red-600"
                    placeholder="Tuliskan orientasi keilmuan, ruang lingkup, dan relevansi sport science mata kuliah ini..."
                  />
                </div>
              </div>
            )}

            {/* SUB-TAB 2: CPL & CPMK */}
            {activeEditorTab === 'cpl-cpmk' && (
              <div className="space-y-6">
                {/* PEMILIHAN CPL-PRODI */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Pilih CPL-PRODI yang Dibebankan pada Mata Kuliah:
                    </label>
                    <span className="text-xs text-slate-500">
                      Disarankan memilih 2 hingga 5 butir CPL yang paling esensial.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {DAFTAR_CPL.map((cpl) => {
                      const isChecked = currentRps.cplProdi.includes(cpl.kode);
                      return (
                        <div
                          key={cpl.kode}
                          onClick={() => toggleCpl(cpl.kode)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                            isChecked
                              ? 'bg-red-50/80 border-red-600 text-red-950 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 rounded text-red-700 focus:ring-red-600"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-bold mb-0.5">
                              <span className={isChecked ? 'text-red-900' : 'text-slate-900'}>
                                {cpl.kode}
                              </span>
                              <span className="text-[10px] text-slate-500 font-normal">({cpl.aspek})</span>
                            </div>
                            <p className="text-[11px] leading-snug line-clamp-2">{cpl.deskripsi}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DAFTAR CPMK */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Capaian Pembelajaran Mata Kuliah (CPMK)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Penjabaran operasional dari CPL yang diukur sepanjang semester.
                      </p>
                    </div>
                    <button
                      onClick={addCpmk}
                      className="px-3 py-1.5 bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm hover:bg-red-800"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah CPMK
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentRps.cpmk.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs bg-red-800 text-white px-2 py-0.5 rounded">
                              {item.kode}
                            </span>
                            <span className="text-xs text-slate-600 font-medium">
                              CPL Terkait:{' '}
                              {currentRps.cplProdi.map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => {
                                    const exists = item.cplTerkait.includes(c);
                                    const updatedList = exists
                                      ? item.cplTerkait.filter((x) => x !== c)
                                      : [...item.cplTerkait, c];
                                    updateCpmk(idx, 'cplTerkait', updatedList);
                                  }}
                                  className={`text-[10px] mr-1 px-1.5 py-0.5 rounded font-bold ${
                                    item.cplTerkait.includes(c)
                                      ? 'bg-red-200 text-red-900'
                                      : 'bg-slate-200 text-slate-600'
                                  }`}
                                >
                                  {c}
                                </button>
                              ))}
                            </span>
                          </div>

                          {currentRps.cpmk.length > 1 && (
                            <button
                              onClick={() => removeCpmk(idx)}
                              className="text-slate-400 hover:text-red-700 p-1"
                              title="Hapus CPMK"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <textarea
                          rows={2}
                          value={item.deskripsi}
                          onChange={(e) => updateCpmk(idx, 'deskripsi', e.target.value)}
                          className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg p-2 bg-white leading-relaxed"
                          placeholder="Rumuskan kemampuan akhir mata kuliah..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: SUB-CPMK */}
            {activeEditorTab === 'subcpmk' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-red-50 p-3 rounded-xl border border-red-200">
                  <div>
                    <h4 className="font-bold text-red-900 text-sm flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-red-700" />
                      Sub-CPMK: Taksonomi Bloom Kognitif Wajib C2 – C6 (HOTS S1 IKOR)
                    </h4>
                    <p className="text-xs text-red-800 mt-0.5">
                      Sesuai kaidah kurikulum OBE S1 IKOR, rumusan capaian pembelajaran tidak menggunakan C1 (mengingat), melainkan dimulai dari C2 (Memahami) hingga C6 (Menciptakan/Merancang).
                    </p>
                  </div>
                  <button
                    onClick={addSubCpmk}
                    className="px-3 py-1.5 bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm hover:bg-red-800 self-start sm:self-auto shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Sub-CPMK
                  </button>
                </div>

                <div className="space-y-2.5">
                  {currentRps.subCpmk.map((sc, idx) => {
                    const currentLevel = sc.levelKognitif || (sc.kode.match(/C[2-6]/i) ? sc.kode.match(/C[2-6]/i)![0].toUpperCase() : 'C2');
                    return (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center gap-2.5 text-xs"
                      >
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono font-bold text-slate-800 bg-white border border-slate-300 px-2 py-1 rounded w-24 text-center">
                            {sc.kode}
                          </span>
                          <select
                            value={currentLevel}
                            onChange={(e) => {
                              const newLevel = e.target.value as any;
                              updateSubCpmk(idx, 'levelKognitif', newLevel);
                            }}
                            className={`font-bold px-2 py-1 rounded border text-xs ${
                              currentLevel === 'C2'
                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                : currentLevel === 'C3'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : currentLevel === 'C4'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : currentLevel === 'C5'
                                ? 'bg-purple-100 text-purple-900 border-purple-300'
                                : 'bg-red-100 text-red-900 border-red-300'
                            }`}
                          >
                            <option value="C2">C2 (Memahami)</option>
                            <option value="C3">C3 (Menerapkan)</option>
                            <option value="C4">C4 (Menganalisis)</option>
                            <option value="C5">C5 (Mengevaluasi)</option>
                            <option value="C6">C6 (Menciptakan)</option>
                          </select>
                        </div>

                        <input
                          type="text"
                          value={sc.deskripsi}
                          onChange={(e) => updateSubCpmk(idx, 'deskripsi', e.target.value)}
                          className="flex-1 border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-800 w-full"
                          placeholder="Rumuskan kemampuan akhir tahap pembelajaran..."
                        />

                        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                          <select
                            value={sc.cpmkTerkait}
                            onChange={(e) => updateSubCpmk(idx, 'cpmkTerkait', e.target.value)}
                            className="border border-slate-300 rounded-lg p-2 bg-white font-semibold text-slate-700 shrink-0 text-xs"
                          >
                            {currentRps.cpmk.map((cp) => (
                              <option key={cp.kode} value={cp.kode}>
                                Induk: {cp.kode}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => removeSubCpmk(idx)}
                            className="text-slate-400 hover:text-red-700 p-1 shrink-0"
                            title="Hapus Sub-CPMK"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: PUSTAKA & BAHAN KAJIAN */}
            {activeEditorTab === 'pustaka' && (
              <div className="space-y-6">
                {/* INFO VALIDITAS PUSTAKA */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <b>Standar Keabsahan Akademik:</b> Seluruh buku teks, jurnal ilmiah, dan e-book yang dicantumkan <b>wajib nyata, terverifikasi, dan memiliki identitas ISBN/ISSN/Federasi yang valid</b>. Materi pembelajaran 16 pertemuan harus bersumber dan sinkron langsung dari pustaka ini.
                  </div>
                </div>

                {/* RUJUKAN UTAMA: BUKU & JURNAL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      📚 Referensi Utama: Buku Teks Ber-ISBN (1 baris per buku)
                    </label>
                    <textarea
                      rows={5}
                      value={currentRps.pustakaUtama.join('\n')}
                      onChange={(e) =>
                        updateField('pustakaUtama', e.target.value.split('\n').filter((x) => x.trim() !== ''))
                      }
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white leading-relaxed"
                      placeholder="Penulis, Tahun, Judul Buku Ber-ISBN, Penerbit..."
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      📰 Referensi Utama: Artikel Jurnal Ilmiah (1 baris per artikel)
                    </label>
                    <textarea
                      rows={5}
                      value={(currentRps.artikelJurnal || []).join('\n')}
                      onChange={(e) =>
                        updateField('artikelJurnal', e.target.value.split('\n').filter((x) => x.trim() !== ''))
                      }
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white leading-relaxed"
                      placeholder="Penulis, Tahun, Judul Artikel, Jurnal Terakreditasi SINTA/Scopus, Vol/No/Halaman..."
                    />
                  </div>
                </div>

                {/* RUJUKAN PENDUKUNG: E-BOOK & BUKU LAIN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      📱 Referensi Pendukung: E-Book & Manual Federasi Resmi
                    </label>
                    <textarea
                      rows={4}
                      value={(currentRps.eBook || []).join('\n')}
                      onChange={(e) =>
                        updateField('eBook', e.target.value.split('\n').filter((x) => x.trim() !== ''))
                      }
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white leading-relaxed"
                      placeholder="Badan Resmi Federasi (FIBA/FIFA/ACSM), Tahun, Official Rule Book/Coaching Manual..."
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      📖 Buku Pendukung & Tautan Web Resmi
                    </label>
                    <textarea
                      rows={4}
                      value={[
                        ...currentRps.pustakaPendukung,
                        ...currentRps.pustakaOnline.map((l) => (l.startsWith('http') ? l : `URL: ${l}`))
                      ].join('\n')}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n').filter((x) => x.trim() !== '');
                        const links = lines.filter((l) => l.startsWith('http') || l.startsWith('URL:'));
                        const books = lines.filter((l) => !l.startsWith('http') && !l.startsWith('URL:'));
                        updateField('pustakaPendukung', books);
                        updateField(
                          'pustakaOnline',
                          links.map((l) => l.replace(/^URL:\s*/i, ''))
                        );
                      }}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white leading-relaxed"
                      placeholder="Buku penunjang lainnya atau link https://..."
                    />
                  </div>
                </div>

                {/* BAHAN KAJIAN & MATERI PEMBELAJARAN (DISUSUN KE BAWAH) */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      📚 1. Bahan Kajian (Materi Besar / Pokok Bahasan Keilmuan - 1 baris per pokok bahasan)
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Pokok bahasan keilmuan besar (jumlah topik lebih sedikit / payung keilmuan dari materi mingguan).
                    </p>
                    <textarea
                      rows={6}
                      value={currentRps.bahanKajian.join('\n')}
                      onChange={(e) =>
                        updateField('bahanKajian', e.target.value.split('\n').filter((x) => x.trim() !== ''))
                      }
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white font-mono leading-relaxed"
                      placeholder="1. Konsep Dasar...\n2. Landasan Fisiologi...\n..."
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      📖 2. Materi Pembelajaran Sinkron Pustaka (14 Materi Inti)
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Isi 14 materi inti. Pertemuan 8 dan 16 digunakan untuk UTS dan UAS pada tabel rencana pembelajaran.
                    </p>
                    <textarea
                      rows={8}
                      value={currentRps.materiPembelajaran.join('\n')}
                      onChange={(e) =>
                        updateField('materiPembelajaran', e.target.value.split('\n').filter((x) => x.trim() !== ''))
                      }
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white font-mono leading-relaxed"
                      placeholder="1. Materi pengantar sinkron Pustaka 1 Bab 1...\n2. Analisis teknis sinkron Pustaka 2...\n..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 5: JADWAL 16 MINGGU */}
            {activeEditorTab === 'mingguan' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-700">
                    Total Bobot Evaluasi Mingguan:{' '}
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        totalBobotMingguan === 100
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {totalBobotMingguan}% {totalBobotMingguan === 100 ? '(Sesuai 100%)' : '(Harus 100%)'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    Minggu 8 = UTS (15%), Minggu 16 = UAS (15%).
                  </span>
                </div>

                <div className="space-y-3">
                  {currentRps.mingguan.map((m, idx) => {
                    const isUts = m.minggu === 8;
                    const isUas = m.minggu === 16;
                    return (
                      <div
                        key={m.minggu}
                        className={`p-3 rounded-xl border text-xs space-y-2 ${
                          isUts || isUas
                            ? 'bg-amber-50/70 border-amber-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-red-900">
                              Minggu {m.minggu}
                            </span>
                            <span className="font-bold text-slate-700">({m.subCpmk})</span>
                            {isUts && <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">UJIAN TENGAH SEMESTER</span>}
                            {isUas && <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">UJIAN AKHIR SEMESTER</span>}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-medium">Bobot Penilaian:</span>
                            <input
                              type="number"
                              min="0"
                              max="30"
                              value={m.bobot}
                              onChange={(e) => updateMingguan(idx, 'bobot', Number(e.target.value))}
                              className="w-14 text-center border border-slate-300 rounded p-1 font-bold text-red-800 bg-white"
                            />
                            <span>%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          <div>
                            <span className="text-[11px] font-bold text-slate-600 block mb-0.5">
                              Bahan Kajian / Materi:
                            </span>
                            <textarea
                              rows={2}
                              value={m.materi}
                              onChange={(e) => updateMingguan(idx, 'materi', e.target.value)}
                              className="w-full border border-slate-300 rounded p-1.5 text-xs bg-white"
                            />
                          </div>

                          <div>
                            <span className="text-[11px] font-bold text-slate-600 block mb-0.5">
                              Bentuk & Metode Pembelajaran:
                            </span>
                            <textarea
                              rows={2}
                              value={m.metode}
                              onChange={(e) => updateMingguan(idx, 'metode', e.target.value)}
                              className="w-full border border-slate-300 rounded p-1.5 text-xs bg-white"
                            />
                          </div>

                          <div>
                            <span className="text-[11px] font-bold text-slate-600 block mb-0.5">
                              Pengalaman Belajar Mahasiswa:
                            </span>
                            <textarea
                              rows={2}
                              value={m.pengalamanBelajar}
                              onChange={(e) => updateMingguan(idx, 'pengalamanBelajar', e.target.value)}
                              className="w-full border border-slate-300 rounded p-1.5 text-xs bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Indikator Ketercapaian:</span>
                            <input
                              type="text"
                              value={m.indikator}
                              onChange={(e) => updateMingguan(idx, 'indikator', e.target.value)}
                              className="w-full border border-slate-300 rounded p-1 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Teknik Penilaian:</span>
                            <input
                              type="text"
                              value={m.teknikPenilaian}
                              onChange={(e) => updateMingguan(idx, 'teknikPenilaian', e.target.value)}
                              className="w-full border border-slate-300 rounded p-1 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Alokasi Waktu:</span>
                            <input
                              type="text"
                              value={m.waktu}
                              onChange={(e) => updateMingguan(idx, 'waktu', e.target.value)}
                              className="w-full border border-slate-300 rounded p-1 text-xs bg-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-TAB 6: PENILAIAN, PROYEK & SOAL */}
            {activeEditorTab === 'penilaian' && (
              <div className="space-y-6">
                {/* BOBOT KOMPONEN PENILAIAN */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">
                    Distribusi Bobot Komponen Penilaian OBE (Total 100%)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="p-3 bg-slate-50 border rounded-xl text-center">
                      <span className="text-[11px] text-slate-600 block mb-1">Kehadiran</span>
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={currentRps.komponenPenilaian.kehadiran}
                        onChange={(e) =>
                          setCurrentRps((prev) => ({
                            ...prev,
                            komponenPenilaian: {
                              ...prev.komponenPenilaian,
                              kehadiran: Number(e.target.value)
                            }
                          }))
                        }
                        className="w-16 mx-auto text-center font-bold text-sm border border-slate-300 rounded p-1"
                      />
                      <span className="text-xs ml-1">%</span>
                    </div>

                    <div className="p-3 bg-slate-50 border rounded-xl text-center">
                      <span className="text-[11px] text-slate-600 block mb-1">Sikap (AIK)</span>
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={currentRps.komponenPenilaian.sikap}
                        onChange={(e) =>
                          setCurrentRps((prev) => ({
                            ...prev,
                            komponenPenilaian: {
                              ...prev.komponenPenilaian,
                              sikap: Number(e.target.value)
                            }
                          }))
                        }
                        className="w-16 mx-auto text-center font-bold text-sm border border-slate-300 rounded p-1"
                      />
                      <span className="text-xs ml-1">%</span>
                    </div>

                    <div className="p-3 bg-slate-50 border rounded-xl text-center">
                      <span className="text-[11px] text-slate-600 block mb-1">Tugas / Kuis</span>
                      <input
                        type="number"
                        min="0"
                        max="40"
                        value={currentRps.komponenPenilaian.tugas}
                        onChange={(e) =>
                          setCurrentRps((prev) => ({
                            ...prev,
                            komponenPenilaian: {
                              ...prev.komponenPenilaian,
                              tugas: Number(e.target.value)
                            }
                          }))
                        }
                        className="w-16 mx-auto text-center font-bold text-sm border border-slate-300 rounded p-1"
                      />
                      <span className="text-xs ml-1">%</span>
                    </div>

                    <div className="p-3 bg-slate-50 border rounded-xl text-center">
                      <span className="text-[11px] text-slate-600 block mb-1">Proyek (PBL)</span>
                      <input
                        type="number"
                        min="0"
                        max="40"
                        value={currentRps.komponenPenilaian.proyek}
                        onChange={(e) =>
                          setCurrentRps((prev) => ({
                            ...prev,
                            komponenPenilaian: {
                              ...prev.komponenPenilaian,
                              proyek: Number(e.target.value)
                            }
                          }))
                        }
                        className="w-16 mx-auto text-center font-bold text-sm border border-slate-300 rounded p-1"
                      />
                      <span className="text-xs ml-1">%</span>
                    </div>

                    <div className="p-3 bg-slate-50 border rounded-xl text-center">
                      <span className="text-[11px] text-slate-600 block mb-1">UTS</span>
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={currentRps.komponenPenilaian.uts}
                        onChange={(e) =>
                          setCurrentRps((prev) => ({
                            ...prev,
                            komponenPenilaian: {
                              ...prev.komponenPenilaian,
                              uts: Number(e.target.value)
                            }
                          }))
                        }
                        className="w-16 mx-auto text-center font-bold text-sm border border-slate-300 rounded p-1"
                      />
                      <span className="text-xs ml-1">%</span>
                    </div>

                    <div className="p-3 bg-slate-50 border rounded-xl text-center">
                      <span className="text-[11px] text-slate-600 block mb-1">UAS</span>
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={currentRps.komponenPenilaian.uas}
                        onChange={(e) =>
                          setCurrentRps((prev) => ({
                            ...prev,
                            komponenPenilaian: {
                              ...prev.komponenPenilaian,
                              uas: Number(e.target.value)
                            }
                          }))
                        }
                        className="w-16 mx-auto text-center font-bold text-sm border border-slate-300 rounded p-1"
                      />
                      <span className="text-xs ml-1">%</span>
                    </div>
                  </div>
                </div>

                {/* TUGAS PROYEK */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Tugas Proyek Terapan (Project-Based Learning)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Proyek</label>
                      <input
                        type="text"
                        value={currentRps.judulProyek || ''}
                        onChange={(e) => updateField('judulProyek', e.target.value)}
                        className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Proyek</label>
                      <input
                        type="text"
                        value={currentRps.metodeProyek || ''}
                        onChange={(e) => updateField('metodeProyek', e.target.value)}
                        className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi & Instruksi Pengerjaan Proyek</label>
                    <textarea
                      rows={3}
                      value={currentRps.deskripsiProyek || ''}
                      onChange={(e) => updateField('deskripsiProyek', e.target.value)}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white leading-relaxed"
                    />
                  </div>
                </div>

                {/* CONTOH SOAL UTS */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">
                    Instrumen Kisi-Kisi Soal Ujian Tengah Semester (UTS) Berbasis Sub-CPMK
                  </h4>
                  <div className="space-y-3">
                    {currentRps.soalUts?.map((soal, idx) => (
                      <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-red-900">Soal #{soal.nomor} ({soal.subCpmk})</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-700">
                            Tingkat: {soal.levelKognitif} | Bobot: {soal.bobot}%
                          </span>
                        </div>
                        <p className="text-slate-800 whitespace-pre-line bg-slate-50 p-2 rounded border border-slate-100">
                          {soal.pertanyaan}
                        </p>
                        <div className="text-[11px] text-slate-600">
                          <b>Pedoman Kunci / Rubrik Penskoran:</b>
                          <div className="mt-0.5 whitespace-pre-line">{soal.kunciJawaban}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
