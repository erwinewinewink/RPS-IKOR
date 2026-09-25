import React, { useState, useEffect } from 'react';
import { RpsEditor } from './components/RpsEditor';
import { CurriculumExplorer } from './components/CurriculumExplorer';
import { SavedRpsBank } from './components/SavedRpsBank';
import { ObeGuideView } from './components/ObeGuideView';
import { MataKuliah, IDENTITAS_PRODI } from './data/curriculumDatabase';
import { SAMPLE_RPS_ANATOMI } from './data/rpsSampleAnatomi';
import { RPSDocument } from './types/rps';
import {
  Sparkles,
  BookOpen,
  FolderOpen,
  HelpCircle,
  GraduationCap,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import logoFkip from './assets/images/regenerated_image_1790171400384.png';
import logoDiktisaintek from './assets/images/regenerated_image_1790171403473.png';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<'generator' | 'database' | 'bank' | 'panduan'>('generator');
  const [selectedCourseForEditor, setSelectedCourseForEditor] = useState<MataKuliah | null>(null);

  // Inisialisasi seed data Anatomi jika storage kosong
  useEffect(() => {
    const existing = localStorage.getItem('ikor_rps_bank');
    if (!existing) {
      localStorage.setItem('ikor_rps_bank', JSON.stringify([SAMPLE_RPS_ANATOMI]));
    }
  }, []);

  const handleSelectCourseFromCurriculum = (mk: MataKuliah) => {
    setSelectedCourseForEditor(mk);
    setActiveMainTab('generator');
  };

  const handleLoadRpsFromBank = (rps: RPSDocument) => {
    setSelectedCourseForEditor({
      kode: rps.kodeMK,
      nama: rps.mataKuliah,
      sks: rps.sks,
      semester: rps.semester,
      kelompok: 'Wajib Prodi',
      cpl: rps.cplProdi
    });
    setActiveMainTab('generator');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* HEADER UTAMA */}
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-slate-900 text-white shadow-md border-b-2 border-amber-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={logoFkip}
                  alt="Logo FKIP Unismuh Palu"
                  className="w-11 h-11 object-contain rounded-lg bg-white/10 p-0.5 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={logoDiktisaintek}
                  alt="Logo Diktisaintek Berdampak"
                  className="w-11 h-11 object-contain rounded-lg bg-white/10 p-0.5 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-red-700/80 px-2 py-0.5 rounded text-amber-300">
                    SISTEM GENERATOR RPS OBE
                  </span>
                  <span className="text-[11px] text-slate-300 hidden md:inline">
                    Kurikulum 2026
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Universitas Muhammadiyah Palu
                </h1>
                <p className="text-xs text-slate-200">
                  Program Studi S1 Ilmu Keolahragaan &bull; FKIP &bull; Kampus Berdampak
                </p>
              </div>
            </div>

            {/* BADGE PRODI & VISI */}
            <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs">
              <div className="text-right">
                <div className="font-semibold text-slate-200">Ketua Program Studi</div>
                <div className="font-bold text-amber-300">{IDENTITAS_PRODI.kaprodi.nama}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center font-bold text-sm">
                EZ
              </div>
            </div>
          </div>

          {/* MAIN TABS NAVIGATION */}
          <div className="flex gap-1 overflow-x-auto pb-1 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveMainTab('generator')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeMainTab === 'generator'
                  ? 'bg-white text-red-900 font-bold shadow-xs'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Generator RPS OBE</span>
            </button>

            <button
              onClick={() => setActiveMainTab('database')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeMainTab === 'database'
                  ? 'bg-white text-red-900 font-bold shadow-xs'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Database Kurikulum (70+ MK)</span>
            </button>

            <button
              onClick={() => setActiveMainTab('bank')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeMainTab === 'bank'
                  ? 'bg-white text-red-900 font-bold shadow-xs'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Bank RPS Tersimpan</span>
            </button>

            <button
              onClick={() => setActiveMainTab('panduan')}
              className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeMainTab === 'panduan'
                  ? 'bg-white text-red-900 font-bold shadow-xs'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Panduan OBE & PPEPP</span>
            </button>
          </div>
        </div>
      </header>

      {/* BODY CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeMainTab === 'generator' && (
          <RpsEditor
            initialCourse={selectedCourseForEditor}
            onSaveToBank={() => {}}
          />
        )}

        {activeMainTab === 'database' && (
          <CurriculumExplorer onSelectCourseForRps={handleSelectCourseFromCurriculum} />
        )}

        {activeMainTab === 'bank' && (
          <SavedRpsBank
            onLoadRps={handleLoadRpsFromBank}
            onNewRps={() => {
              setSelectedCourseForEditor(null);
              setActiveMainTab('generator');
            }}
          />
        )}

        {activeMainTab === 'panduan' && <ObeGuideView />}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-bold text-slate-800">
              Sistem Generator Rencana Pembelajaran Semester (RPS) Berbasis Outcome-Based Education (OBE)
            </p>
            <p className="text-slate-500 mt-0.5">
              Program Studi Ilmu Keolahragaan &bull; Fakultas Keguruan dan Ilmu Pendidikan &bull; Universitas Muhammadiyah Palu
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Standar SN-Dikti 2026</span>
            <span>&bull;</span>
            <span>Diktisaintek Berdampak</span>
            <span>&bull;</span>
            <span>Siklus PPEPP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
