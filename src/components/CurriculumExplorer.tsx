import React, { useState } from 'react';
import {
  MATA_KULIAH_DATABASE,
  DAFTAR_CPL,
  PROFIL_LULUSAN,
  BAHAN_KAJIAN,
  MataKuliah,
  IDENTITAS_PRODI
} from '../data/curriculumDatabase';
import {
  BookOpen,
  Search,
  Filter,
  GraduationCap,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface Props {
  onSelectCourseForRps: (mk: MataKuliah) => void;
}

export const CurriculumExplorer: React.FC<Props> = ({ onSelectCourseForRps }) => {
  const [activeSubTab, setActiveSubTab] = useState<'matakuliah' | 'cpl' | 'profil' | 'bahankajian'>('matakuliah');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedKelompok, setSelectedKelompok] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = MATA_KULIAH_DATABASE.filter((mk) => {
    const matchesSemester = selectedSemester === 'all' || mk.semester === selectedSemester;
    const matchesKelompok = selectedKelompok === 'all' || mk.kelompok === selectedKelompok;
    const matchesSearch =
      mk.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mk.kode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesKelompok && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* HEADER KURIKULUM INFO */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Dokumen Kurikulum OBE Resmi (SK Rektor 2026)
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Database Kurikulum Outcome-Based Education (OBE)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {IDENTITAS_PRODI.programStudi} - {IDENTITAS_PRODI.fakultas} {IDENTITAS_PRODI.universitas}.
            Beban studi kelulusan: <b>{IDENTITAS_PRODI.bebanStudiTotal} SKS</b> (Minimal 144 SKS).
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="px-3 py-2 bg-slate-50 border rounded-lg text-center">
            <span className="block text-lg font-bold text-red-700">{MATA_KULIAH_DATABASE.length}</span>
            <span className="text-slate-500">Mata Kuliah</span>
          </div>
          <div className="px-3 py-2 bg-slate-50 border rounded-lg text-center">
            <span className="block text-lg font-bold text-slate-800">{DAFTAR_CPL.length}</span>
            <span className="text-slate-500">CPL Prodi</span>
          </div>
          <div className="px-3 py-2 bg-slate-50 border rounded-lg text-center">
            <span className="block text-lg font-bold text-slate-800">{PROFIL_LULUSAN.length}</span>
            <span className="text-slate-500">Profil Lulusan</span>
          </div>
          <div className="px-3 py-2 bg-slate-50 border rounded-lg text-center">
            <span className="block text-lg font-bold text-slate-800">{BAHAN_KAJIAN.length}</span>
            <span className="text-slate-500">Bahan Kajian</span>
          </div>
        </div>
      </div>

      {/* SUB TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1 text-sm font-medium">
        <button
          onClick={() => setActiveSubTab('matakuliah')}
          className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'matakuliah'
              ? 'bg-red-700 text-white font-bold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Daftar Sebaran Mata Kuliah ({filteredCourses.length})
        </button>

        <button
          onClick={() => setActiveSubTab('cpl')}
          className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'cpl'
              ? 'bg-red-700 text-white font-bold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Capaian Pembelajaran Lulusan (CPL 1-13)
        </button>

        <button
          onClick={() => setActiveSubTab('profil')}
          className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'profil'
              ? 'bg-red-700 text-white font-bold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Profil Lulusan (PL 1-5)
        </button>

        <button
          onClick={() => setActiveSubTab('bahankajian')}
          className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'bahankajian'
              ? 'bg-red-700 text-white font-bold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Tag className="w-4 h-4" />
          Bahan Kajian (BK 1-17)
        </button>
      </div>

      {/* TAB CONTENT: MATA KULIAH */}
      {activeSubTab === 'matakuliah' && (
        <div className="space-y-4">
          {/* SEARCH & FILTERS */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kode atau nama mata kuliah..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Semester:</span>
              </div>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
              >
                <option value="all">Semua Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>

              <select
                value={selectedKelompok}
                onChange={(e) => setSelectedKelompok(e.target.value)}
                className="text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
              >
                <option value="all">Semua Kelompok MK</option>
                <option value="Wajib Prodi">Wajib Prodi</option>
                <option value="Pilihan Prodi">Pilihan Prodi</option>
                <option value="MKWN">MK Wajib Nasional (MKWN)</option>
                <option value="Fakultas">Mata Kuliah Fakultas</option>
                <option value="Universitas">Mata Kuliah Universitas</option>
              </select>
            </div>
          </div>

          {/* TABLE OF COURSES */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="p-3 w-12 text-center">No</th>
                    <th className="p-3 w-28">Kode MK</th>
                    <th className="p-3">Nama Mata Kuliah</th>
                    <th className="p-3 w-20 text-center">SKS</th>
                    <th className="p-3 w-20 text-center">Smt</th>
                    <th className="p-3 w-32">Kelompok</th>
                    <th className="p-3 w-48">CPL Terkait</th>
                    <th className="p-3 w-36 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        Tidak ada mata kuliah yang cocok dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((mk, idx) => (
                      <tr key={mk.kode} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                        <td className="p-3 font-mono font-bold text-red-900">{mk.kode}</td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-900">{mk.nama}</div>
                          {mk.deskripsi && (
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {mk.deskripsi}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-center font-bold">
                          <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs">
                            {mk.sks} SKS
                          </span>
                        </td>
                        <td className="p-3 text-center font-medium">Smt {mk.semester}</td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              mk.kelompok === 'Wajib Prodi'
                                ? 'bg-red-100 text-red-800'
                                : mk.kelompok === 'Pilihan Prodi'
                                ? 'bg-amber-100 text-amber-800'
                                : mk.kelompok === 'MKWN'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {mk.kelompok}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {mk.cpl.map((c) => (
                              <span
                                key={c}
                                className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => onSelectCourseForRps(mk)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                            title="Buat RPS untuk Mata Kuliah ini"
                          >
                            <span>Buat RPS</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CPL */}
      {activeSubTab === 'cpl' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAFTAR_CPL.map((item) => (
              <div
                key={item.kode}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-red-300 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-base text-red-900 bg-red-50 px-2.5 py-1 rounded">
                    {item.kode}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      item.aspek === 'Sikap'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.aspek === 'Pengetahuan'
                        ? 'bg-blue-100 text-blue-800'
                        : item.aspek === 'Keterampilan Umum'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.aspek}
                  </span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-normal">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PROFIL LULUSAN */}
      {activeSubTab === 'profil' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROFIL_LULUSAN.map((pl) => (
            <div
              key={pl.kode}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded text-xs">
                    {pl.kode}
                  </span>
                  <span className="text-xs italic text-slate-500 font-medium">
                    {pl.namaInggris}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{pl.nama}</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {pl.deskripsi}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Prospek Peran Kerja:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {pl.peranKerja.map((pk, i) => (
                    <span
                      key={i}
                      className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md"
                    >
                      {pk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: BAHAN KAJIAN */}
      {activeSubTab === 'bahankajian' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BAHAN_KAJIAN.map((bk) => (
            <div
              key={bk.kode}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-bold text-xs bg-red-700 text-white px-2 py-0.5 rounded">
                  {bk.kode}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{bk.nama}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {bk.deskripsi}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
