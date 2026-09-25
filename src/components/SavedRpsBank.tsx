import React, { useState, useEffect } from 'react';
import { RPSDocument } from '../types/rps';
import { exportRpsToWord, exportModulAjarToWord } from '../utils/exportUtils';
import { generateModulAjarFromRps } from '../utils/modulAjarGenerator';
import { FolderOpen, Download, Trash2, Edit, Calendar, FileText, Plus, BookMarked } from 'lucide-react';

interface Props {
  onLoadRps: (rps: RPSDocument) => void;
  onNewRps: () => void;
}

export const SavedRpsBank: React.FC<Props> = ({ onLoadRps, onNewRps }) => {
  const [savedList, setSavedList] = useState<RPSDocument[]>([]);

  const stats = React.useMemo(() => {
    const totalDocs = savedList.length;
    const rumpunCounts: Record<string, number> = {};
    savedList.forEach(rps => {
      const rumpun = rps.rumpunMK || 'Umum';
      rumpunCounts[rumpun] = (rumpunCounts[rumpun] || 0) + 1;
    });

    let mostFrequentRumpun = 'N/A';
    let maxCount = 0;
    Object.entries(rumpunCounts).forEach(([rumpun, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentRumpun = rumpun;
      }
    });

    return { totalDocs, mostFrequentRumpun };
  }, [savedList]);

  const loadFromStorage = () => {
    try {
      const data = JSON.parse(localStorage.getItem('ikor_rps_bank') || '[]');
      setSavedList(data);
    } catch {
      setSavedList([]);
    }
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus arsip RPS ini?')) {
      const updated = savedList.filter((item) => item.id !== id);
      localStorage.setItem('ikor_rps_bank', JSON.stringify(updated));
      setSavedList(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Widget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-red-50 p-3 rounded-xl text-red-700">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-slate-500 font-medium">Total RPS</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalDocs}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl text-amber-700">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-slate-500 font-medium">Rumpun Terpopuler</div>
            <div className="text-2xl font-bold text-slate-900">{stats.mostFrequentRumpun}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-red-700" />
            Bank Arsip RPS Tersimpan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Daftar seluruh Rencana Pembelajaran Semester (RPS) yang telah disusun dan disimpan dalam browser.
          </p>
        </div>

        <button
          onClick={onNewRps}
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Buat RPS Baru</span>
        </button>
      </div>

      {savedList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 mb-1">Belum Ada RPS Tersimpan</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
            Anda dapat menyusun RPS di tab <b>Generator RPS</b> lalu klik tombol <b>Simpan</b> untuk menyimpannya ke daftar arsip ini.
          </p>
          <button
            onClick={onNewRps}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Mulai Buat RPS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedList.map((rps) => (
            <div
              key={rps.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded">
                    {rps.kodeMK}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Smt {rps.semester} &bull; {rps.sks} SKS
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-2">
                  {rps.mataKuliah}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {rps.deskripsiMK}
                </p>

                <div className="text-[11px] text-slate-600 space-y-1 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Disusun: {rps.tanggalPenyusunan} (TA {rps.tahunAkademik})</span>
                  </div>
                  <div>
                    <b>Dosen:</b> {rps.dosenPengembang}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rps.cplProdi?.map((c) => (
                      <span key={c} className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onLoadRps(rps)}
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-all"
                >
                  <Edit className="w-3.5 h-3.5" /> Buka & Edit
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => exportModulAjarToWord(generateModulAjarFromRps(rps))}
                    className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg flex items-center gap-1 text-[11px] font-semibold"
                    title="Unduh Dokumen Modul Ajar (Min. 45 Lembar)"
                  >
                    <BookMarked className="w-4 h-4" />
                    <span className="hidden sm:inline">Modul Ajar</span>
                  </button>
                  <button
                    onClick={() => exportRpsToWord(rps)}
                    className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg"
                    title="Unduh RPS format Word"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(rps.id)}
                    className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    title="Hapus RPS"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
