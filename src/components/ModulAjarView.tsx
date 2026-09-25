import React, { useState } from 'react';
import { ModulAjarDocument } from '../types/modulAjar';
import { exportModulAjarToWord } from '../utils/exportUtils';
import {
  Printer,
  Download,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Search,
  BookOpen
} from 'lucide-react';
import logoFkip from '../assets/images/regenerated_image_1790171400384.png';
import logoDiktisaintek from '../assets/images/regenerated_image_1790171403473.png';

interface ModulAjarViewProps {
  modul: ModulAjarDocument;
  onBack: () => void;
  onRegenerateWithAi?: () => void;
  isAiLoading?: boolean;
}

export const ModulAjarView: React.FC<ModulAjarViewProps> = ({
  modul,
  onBack,
  onRegenerateWithAi,
  isAiLoading = false
}) => {
  const [selectedBabIndex, setSelectedBabIndex] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredBabList = selectedBabIndex === 'all'
    ? modul.babList.filter(b => b.judulBab.toLowerCase().includes(searchTerm.toLowerCase()) || b.subCpmk.toLowerCase().includes(searchTerm.toLowerCase()))
    : modul.babList.filter((_, idx) => idx === selectedBabIndex);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    exportModulAjarToWord(modul);
  };

  // Helper untuk membersihkan tag Bloom C2-C6
  const cleanSubCpmkText = (text: string) => {
    return text
      .replace(/\s*\([Cc][2-6]\)/gi, '')
      .replace(/\s*-\s*[Cc][2-6]/gi, '')
      .replace(/\s*\[[Cc][2-6]\]/gi, '')
      .trim();
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-16 font-sans">
      {/* ACTION BAR STICKY TOP (NO-PRINT) */}
      <div className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-700 px-4 py-3 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-600 text-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded">
                  Modul Ajar Resmi
                </span>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Pustaka Lengkap &bull; {modul.totalEstimasiHalaman}+ Lembar
                </span>
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-lg mt-0.5">
                {modul.mataKuliah} ({modul.kodeMK}) - {modul.sks} SKS
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {onRegenerateWithAi && (
              <button
                onClick={onRegenerateWithAi}
                disabled={isAiLoading}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-600 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAiLoading ? 'Menyusun...' : 'Pengayaan AI'}</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-600 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={handleExportWord}
              className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Word (.doc)</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTER & CHAPTER SELECTOR (NO-PRINT) */}
      <div className="bg-slate-800 border-b border-slate-700 text-slate-300 text-xs px-4 py-2.5 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">
              Navigasi Bab:
            </span>
            <button
              onClick={() => setSelectedBabIndex('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                selectedBabIndex === 'all'
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              Semua (Lengkap 16 Pertemuan)
            </button>
            <select
              value={selectedBabIndex === 'all' ? 'all' : selectedBabIndex}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedBabIndex(val === 'all' ? 'all' : parseInt(val, 10));
              }}
              className="bg-slate-700 text-white text-xs rounded px-2.5 py-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="all">Pilih Bab Spesifik...</option>
              {modul.babList.map((bab, idx) => (
                <option key={idx} value={idx}>
                  Bab {idx + 1}: {bab.judulBab.length > 35 ? bab.judulBab.substring(0, 35) + '...' : bab.judulBab}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Cari pokok bahasan / materi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-md pl-8 pr-3 py-1 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>
      </div>

      {/* DOKUMEN MODUL AJAR RESMI (PRINT AREA) */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 my-6 print:m-0 print:p-0 print:max-w-none">
        <div className="bg-white shadow-md border border-slate-300 p-6 sm:p-12 text-slate-900 print:shadow-none print:border-none print:p-0 font-serif leading-relaxed text-[11.5pt]">
          
          {/* HALAMAN 1: COVER RESMI BUKU AJAR */}
          {(selectedBabIndex === 'all' || selectedBabIndex === 0) && (
            <div className="text-center mb-16 pt-4 pb-12 border-b border-slate-300 print:mb-0 print:min-h-screen print:page-break-after print:border-none">
              <div className="flex items-center justify-between gap-4 mb-6 px-4">
                <img
                  src={logoFkip}
                  alt="Logo FKIP Unismuh Palu"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-800 font-sans leading-snug">
                  KEMENTERIAN PENDIDIKAN TINGGI, SAINS, DAN TEKNOLOGI<br />
                  UNIVERSITAS MUHAMMADIYAH PALU<br />
                  FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN<br />
                  PROGRAM STUDI S1 ILMU KEOLAHRAGAAN (IKOR)
                </div>
                <img
                  src={logoDiktisaintek}
                  alt="Logo Diktisaintek Berdampak"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="my-16">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-3 font-serif">
                  MODUL AJAR PERKULIAHAN
                </h1>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 uppercase tracking-wide mb-3">
                  {modul.mataKuliah}
                </h2>
                <div className="text-xs font-sans text-slate-600">
                  KODE MK: {modul.kodeMK} &bull; BOBOT: {modul.sks} SKS &bull; SEMESTER {modul.semester}
                </div>
              </div>

              <div className="my-16 font-sans text-xs sm:text-sm text-slate-700">
                <div className="font-semibold text-slate-500">Tim Dosen Pengampu & Pengembang:</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 mt-1">{modul.dosenPengembang}</div>
                <div className="text-xs text-slate-600 mt-0.5">{modul.dosenPengampu}</div>
              </div>

              <div className="mt-20 pt-6 font-sans text-xs text-slate-600">
                <div className="font-bold text-slate-800 uppercase">Kota Palu, Sulawesi Tengah</div>
                <div>Tahun Akademik {modul.tahunAkademik}</div>
              </div>
            </div>
          )}

          {/* HALAMAN 2: LEMBAR PENGESAHAN */}
          {selectedBabIndex === 'all' && (
            <div className="my-12 print:min-h-screen print:page-break-before print:pt-6">
              <div className="text-center mb-6">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                  LEMBAR PENGESAHAN MODUL AJAR
                </h2>
                <div className="text-xs text-slate-500 font-sans mt-0.5">
                  Nomor Registrasi Mutu Dokumen: MA/IKOR-FKIP/UMPALU/{modul.tahunAkademik?.replace('/', '-') || '2026'}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-justify leading-relaxed mb-6">
                Dokumen Modul Ajar perkuliahan ini telah diperiksa, diverifikasi kesesuaiannya dengan Standar Nasional Pendidikan Tinggi (SN-Dikti), panduan Kurikulum Berbasis <i>Outcome-Based Education</i> (OBE), dan disahkan untuk digunakan dalam proses pembelajaran mahasiswa Program Studi S1 Ilmu Keolahragaan FKIP Universitas Muhammadiyah Palu.
              </p>

              <div className="overflow-x-auto w-full my-4">
                <table className="w-full border-collapse border border-slate-400 text-xs font-sans">
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-2 font-bold w-1/3 bg-slate-50">Mata Kuliah</td>
                      <td className="border border-slate-300 p-2">{modul.mataKuliah}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-bold bg-slate-50">Kode / Bobot SKS</td>
                      <td className="border border-slate-300 p-2">{modul.kodeMK} / {modul.sks} SKS</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-bold bg-slate-50">Semester / Tahun Akademik</td>
                      <td className="border border-slate-300 p-2">Semester {modul.semester} / {modul.tahunAkademik}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-bold bg-slate-50">Program Studi / Fakultas</td>
                      <td className="border border-slate-300 p-2">{modul.programStudi} / {modul.fakultas}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-bold bg-slate-50">Perguruan Tinggi</td>
                      <td className="border border-slate-300 p-2">{modul.universitas}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-bold bg-slate-50">Dosen Pengembang Modul</td>
                      <td className="border border-slate-300 p-2">{modul.dosenPengembang}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-bold bg-slate-50">Koordinator Rumpun MK</td>
                      <td className="border border-slate-300 p-2">Erwin, S.Pd., M.Pd.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs font-sans mt-12">
                <div>
                  <div className="text-slate-600">Menyetujui,</div>
                  <div className="font-semibold text-slate-800">Dosen Pengembang Modul</div>
                  <div className="h-16"></div>
                  <div className="font-bold underline text-slate-900">{modul.dosenPengembang}</div>
                  <div className="text-slate-500">NIDN: {modul.nidnKaprodi}</div>
                </div>

                <div>
                  <div className="text-slate-600">Palu, {modul.createdAt || '10 Februari 2026'}</div>
                  <div className="font-semibold text-slate-800">Ketua Program Studi S1 Ilmu Keolahragaan</div>
                  <div className="h-16"></div>
                  <div className="font-bold underline text-slate-900">{modul.kaprodi}</div>
                  <div className="text-slate-500">NIDN: {modul.nidnKaprodi} &bull; NPUTK: {modul.nputkKaprodi}</div>
                </div>
              </div>
            </div>
          )}

          {/* HALAMAN 3: KATA PENGANTAR */}
          {selectedBabIndex === 'all' && (
            <div className="my-12 print:min-h-screen print:page-break-before print:pt-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide text-center mb-6">
                KATA PENGANTAR
              </h2>
              <div className="text-xs sm:text-sm space-y-3 text-justify leading-relaxed">
                <p className="indent-6">
                  <em>Alhamdulillahi Rabbil 'Alamin</em>, segala puji dan syukur senantiasa kita panjatkan ke hadirat Allah Subhanahu Wa Ta'ala atas limpahan taufik, hidayah, serta kemudahan yang dianugerahkan sehingga Modul Ajar Mata Kuliah <strong>{modul.mataKuliah}</strong> ini dapat diselesaikan secara komprehensif dan sistematis.
                </p>
                <p className="indent-6">
                  Modul ajar ini disusun secara khusus untuk mendukung implementasi kurikulum <em>Outcome-Based Education</em> (OBE) pada Program Studi S1 Ilmu Keolahragaan, Fakultas Keguruan dan Ilmu Pendidikan, Universitas Muhammadiyah Palu. Selaras dengan visi program studi, modul ini mengintegrasikan kajian teoritis mendalam, pembuktian biomekanika dan fisiologis mutakhir (sport science), pemanfaatan teknologi digital, serta internalisasi nilai-nilai Al-Islam dan Kemuhammadiyahan (AIK).
                </p>
                <p className="indent-6">
                  Dalam modul ajar ini, seluruh pokok bahasan 16 pertemuan dirancang secara terperinci mencakup identitas Sub-CPMK, landasan teori yang merujuk pada buku teks ber-ISBN bereputasi internasional dan jurnal terakreditasi, prosedur teknis latihan lapangan, studi kasus riil, Lembar Kerja Mahasiswa (LKM) praktikum, serta instrumen evaluasi formatif mandiri lengkap dengan kunci jawaban.
                </p>
                <p className="indent-6">
                  Penulis menyampaikan apresiasi setinggi-tingginya kepada Pimpinan Universitas Muhammadiyah Palu, Dekanat FKIP, sejawat dosen di Program Studi Ilmu Keolahragaan, serta seluruh pihak yang telah memberikan kontribusi pemikiran berharga. Semoga modul ini membawa kemanfaatan optimal bagi sivitas akademika.
                </p>
                <div className="text-right pt-6 font-sans text-xs">
                  <div>Kota Palu, {modul.createdAt || 'Februari 2026'}</div>
                  <div className="font-bold text-slate-800 mt-1">Tim Penyusun Modul Ajar</div>
                </div>
              </div>
            </div>
          )}

          {/* HALAMAN 4: DAFTAR ISI */}
          {selectedBabIndex === 'all' && (
            <div className="my-12 print:min-h-screen print:page-break-before print:pt-6 font-sans text-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide text-center mb-6 font-serif">
                DAFTAR ISI MODUL AJAR
              </h2>
              <div className="space-y-1.5 border-b border-slate-200 pb-4">
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>HALAMAN JUDUL & SAMPUL DEPAN</span>
                  <span>i</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>LEMBAR PENGESAHAN DOKUMEN MUTU</span>
                  <span>ii</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>KATA PENGANTAR</span>
                  <span>iii</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>DAFTAR ISI LENGKAP</span>
                  <span>iv</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>PETA KEDUDUKAN MODUL & CAPAIAN PEMBELAJARAN (CPL & CPMK)</span>
                  <span>v</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>PETUNJUK OPERASIONAL PENGGUNAAN MODUL</span>
                  <span>vi</span>
                </div>

                {modul.babList.map((bab, idx) => (
                  <div key={idx} className="flex justify-between items-start py-1 border-b border-slate-100">
                    <div className="pr-4">
                      <span className="font-bold text-slate-900">{bab.judulBab}</span> (Pertemuan {bab.mingguKe})
                      <div className="text-[11px] text-slate-600 line-clamp-1">{cleanSubCpmkText(bab.subCpmk)}</div>
                    </div>
                    <span className="font-semibold text-slate-500 shrink-0">Hal. {idx * 3 + 1}</span>
                  </div>
                ))}

                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>PANDUAN EVALUASI TENGAH SEMESTER (UTS)</span>
                  <span>Hal. 43</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>PANDUAN EVALUASI AKHIR SEMESTER (UAS) & PROYEK PjBL</span>
                  <span>Hal. 45</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>GLOSARIUM ISTILAH SPORT SCIENCE & OLAHRAGA</span>
                  <span>Hal. 47</span>
                </div>
                <div className="flex justify-between font-bold py-1 border-b border-slate-200">
                  <span>DAFTAR PUSTAKA TERVERIFIKASI & PROFIL PENULIS</span>
                  <span>Hal. 50</span>
                </div>
              </div>
            </div>
          )}

          {/* HALAMAN 5: PETA CAPAIAN PEMBELAJARAN & PETUNJUK */}
          {selectedBabIndex === 'all' && (
            <div className="my-12 print:min-h-screen print:page-break-before print:pt-6 text-xs sm:text-sm">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide mb-3 font-serif">
                PETA KEDUDUKAN MODUL DAN CAPAIAN PEMBELAJARAN
              </h2>
              <p className="text-justify leading-relaxed mb-4 text-slate-800 indent-6">
                {modul.petaKonsep}
              </p>

              <div className="my-4 font-sans text-xs">
                <div className="font-bold text-slate-900 uppercase tracking-wide mb-2">
                  A. Capaian Pembelajaran Lulusan (CPL) yang Dibebankan pada Mata Kuliah:
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {modul.cplProdi.map((cpl, i) => (
                    <li key={i}>{cpl}</li>
                  ))}
                </ul>
              </div>

              <div className="my-4 font-sans text-xs">
                <div className="font-bold text-slate-900 uppercase tracking-wide mb-2">
                  B. Capaian Pembelajaran Mata Kuliah (CPMK):
                </div>
                <div className="overflow-x-auto w-full">
                  <table className="w-full border-collapse border border-slate-300 text-xs">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-2 text-center w-20 font-bold">Kode</th>
                        <th className="border border-slate-300 p-2 text-left font-bold">Deskripsi Capaian Pembelajaran Mata Kuliah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modul.cpmkList.map((cpmk, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="border border-slate-300 p-2 text-center font-bold text-slate-900">{cpmk.kode}</td>
                          <td className="border border-slate-300 p-2 text-slate-800">{cpmk.deskripsi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="my-6 font-sans text-xs space-y-3">
                <div className="font-bold text-slate-900 uppercase tracking-wide">
                  C. Petunjuk Operasional Penggunaan Modul:
                </div>
                <div>
                  <div className="font-semibold text-slate-800 mb-1">Bagi Dosen Pengampu:</div>
                  <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                    {modul.petunjukPenggunaan.untukDosen.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <div className="font-semibold text-slate-800 mb-1">Bagi Mahasiswa:</div>
                  <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                    {modul.petunjukPenggunaan.untukMahasiswa.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* 14 BAB PEMBELAJARAN */}
          {filteredBabList.map((bab, index) => {
            const babNum = selectedBabIndex === 'all' ? index + 1 : Number(selectedBabIndex) + 1;
            return (
              <div
                key={bab.mingguKe || index}
                className="my-10 pt-6 border-t border-slate-300 print:min-h-screen print:page-break-before print:border-none"
              >
                {/* HEADER BAB */}
                <div className="text-center mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-wide font-serif">
                    {bab.judulBab}
                  </h2>
                </div>

                {/* METADATA PERTEMUAN */}
                <div className="overflow-x-auto w-full mb-4">
                  <table className="w-full border-collapse border border-slate-300 text-xs font-sans">
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-2 font-bold w-1/4 bg-slate-50">Pertemuan ke-</td>
                        <td className="border border-slate-300 p-2">Minggu ke-{bab.mingguKe}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2 font-bold bg-slate-50">Sasaran Sub-CPMK</td>
                        <td className="border border-slate-300 p-2">{cleanSubCpmkText(bab.subCpmk)}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2 font-bold bg-slate-50">Alokasi Waktu</td>
                        <td className="border border-slate-300 p-2">{bab.alokasiWaktu}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* INDIKATOR PEMBELAJARAN */}
                <div className="my-4 font-sans text-xs">
                  <div className="font-bold text-slate-900 uppercase tracking-wide mb-1">
                    I. Indikator Ketercapaian Hasil Belajar:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    {bab.indikatorPembelajaran.map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ol>
                </div>

                {/* PENDAHULUAN */}
                <div className="my-4">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-2 font-sans">
                    II. Pendahuluan
                  </h3>
                  <p className="text-justify leading-relaxed text-xs sm:text-sm text-slate-800 indent-6">
                    {bab.pendahuluan}
                  </p>
                </div>

                {/* URAIAN MATERI */}
                <div className="my-4">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 font-sans">
                    III. Uraian Materi Perkuliahan
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm text-justify leading-relaxed text-slate-800">
                    {bab.uraianMateri.map((um, uIdx) => (
                      <div key={uIdx} className="space-y-2">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-sans">
                          {um.subJudul}
                        </h4>
                        <p className="indent-6">{um.isi}</p>
                        {um.poinPenting && (
                          <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-4 font-sans text-xs">
                            {um.poinPenting.map((pt, pIdx) => (
                              <li key={pIdx}><b>{pt}</b></li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    <div className="mt-4">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-sans mb-1">
                        Analisis Teknis dan Prosedur Praktik Lapangan
                      </h4>
                      <p className="indent-6">{bab.analisisTeknisDanPraktik}</p>
                    </div>

                    {/* NILAI ISLAM & AIK */}
                    <div className="my-4 pl-4 border-l-2 border-slate-400 py-1 font-sans text-xs">
                      <div className="font-bold text-slate-900 uppercase tracking-wide mb-1">
                        Integrasi Nilai Al-Islam dan Kemuhammadiyahan (AIK):
                      </div>
                      <p className="text-slate-700 italic leading-relaxed">
                        {bab.integrasiNilaiIslamKarakter}
                      </p>
                    </div>

                    {/* STUDI KASUS */}
                    <div className="my-4 pl-4 border-l-2 border-slate-400 py-1 font-sans text-xs">
                      <div className="font-bold text-slate-900 uppercase tracking-wide mb-1">
                        Studi Kasus Keolahragaan:
                      </div>
                      <p className="text-slate-800 mb-2 leading-relaxed">
                        {bab.studiKasusKeolahragaan.kasus}
                      </p>
                      <div className="font-semibold text-slate-900 mb-1">Pertanyaan Analitis:</div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-700 mb-2">
                        {bab.studiKasusKeolahragaan.pertanyaanDiskusi.map((q, qIdx) => (
                          <li key={qIdx}>{q}</li>
                        ))}
                      </ol>
                      <div className="text-slate-700">
                        <span className="font-bold">Rekomendasi Solutif: </span>
                        {bab.studiKasusKeolahragaan.solusiKunci}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RANGKUMAN */}
                <div className="my-4 font-sans text-xs">
                  <div className="font-bold text-slate-900 uppercase tracking-wide mb-1">
                    IV. Rangkuman Materi:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {bab.rangkuman.map((rg, rIdx) => (
                      <li key={rIdx}>{rg}</li>
                    ))}
                  </ul>
                </div>

                {/* LEMBAR KERJA MAHASISWA (LKM) */}
                <div className="my-4 font-sans text-xs">
                  <div className="font-bold text-slate-900 uppercase tracking-wide mb-2">
                    V. Lembar Kerja Mahasiswa (LKM) & Panduan Praktik
                  </div>
                  <div className="space-y-2 text-slate-800">
                    <p><b>Tujuan Praktikum:</b> {bab.lembarKerjaMahasiswa.tujuan}</p>
                    <div>
                      <b>Alat dan Bahan:</b>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-2">
                        {bab.lembarKerjaMahasiswa.alatBahan.map((ab, aIdx) => (
                          <li key={aIdx}>{ab}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <b>Langkah-Langkah Kerja:</b>
                      <ol className="list-decimal list-inside space-y-0.5 text-slate-700 pl-2">
                        {bab.lembarKerjaMahasiswa.langkahKerja.map((lk, lIdx) => (
                          <li key={lIdx}>{lk}</li>
                        ))}
                      </ol>
                    </div>

                    {bab.lembarKerjaMahasiswa.tabelPengamatan && (
                      <div className="my-3 overflow-x-auto w-full">
                        <div className="font-semibold text-slate-800 mb-1">Format Tabel Pengamatan:</div>
                        <table className="w-full border-collapse border border-slate-300 text-xs">
                          <thead>
                            <tr className="bg-slate-100">
                              {bab.lembarKerjaMahasiswa.tabelPengamatan.kolom.map((col, cIdx) => (
                                <th key={cIdx} className="border border-slate-300 p-1.5 text-left font-bold">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {bab.lembarKerjaMahasiswa.tabelPengamatan.barisContoh.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50">
                                {row.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="border border-slate-300 p-1.5">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <p><b>Tugas Mandiri:</b> {bab.lembarKerjaMahasiswa.tugasMandiri}</p>
                  </div>
                </div>

                {/* LATIHAN SOAL EVALUASI FORMATIF */}
                <div className="my-4 font-sans text-xs">
                  <div className="font-bold text-slate-900 uppercase tracking-wide mb-3">
                    VI. Latihan Soal Evaluasi Formatif
                  </div>
                  <div className="space-y-3">
                    {bab.soalEvaluasi.map((se, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <p className="font-medium text-slate-900">
                          <b>Soal No. {se.nomor}:</b> {se.soal}
                        </p>
                        {se.pilihan && (
                          <div className="pl-4 space-y-0.5 text-slate-700">
                            {se.pilihan.map((p, pIdx) => (
                              <div key={pIdx}>{p}</div>
                            ))}
                          </div>
                        )}
                        <p className="text-[11px] text-slate-600 pt-0.5">
                          <b>Kunci:</b> {se.kunciJawaban} &bull; <b>Pembahasan:</b> {se.pembahasan}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* REFERENSI RUJUKAN BAB */}
                <div className="my-4 font-sans text-xs">
                  <div className="font-bold text-slate-900 uppercase tracking-wide mb-1">
                    VII. Referensi Rujukan:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 italic">
                    {bab.referensiBab.map((ref, rfIdx) => (
                      <li key={rfIdx}>{ref}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* PANDUAN EVALUASI UTS */}
          {selectedBabIndex === 'all' && (
            <div className="my-10 pt-6 border-t border-slate-300 print:min-h-screen print:page-break-before font-sans text-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide text-center mb-4 font-serif">
                PANDUAN EVALUASI TENGAH SEMESTER (UTS)
              </h2>
              <p className="text-justify leading-relaxed mb-4 text-slate-800 indent-6">
                {modul.panduanUts.deskripsi}
              </p>
              <div className="my-3">
                <div className="font-bold text-slate-900 uppercase mb-1">Kisi-Kisi dan Distribusi Bobot Soal UTS:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {modul.panduanUts.kisiKisi.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              </div>
              <div className="my-3">
                <div className="font-bold text-slate-900 uppercase mb-1">Rubrik Penilaian UTS:</div>
                <p className="text-slate-700 leading-relaxed">{modul.panduanUts.rubrikPenilaian}</p>
              </div>
            </div>
          )}

          {/* PANDUAN EVALUASI UAS & PROYEK PjBL */}
          {selectedBabIndex === 'all' && (
            <div className="my-10 pt-6 border-t border-slate-300 print:min-h-screen print:page-break-before font-sans text-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide text-center mb-4 font-serif">
                PANDUAN EVALUASI AKHIR SEMESTER (UAS) & PROYEK PjBL
              </h2>
              <p className="text-justify leading-relaxed mb-4 text-slate-800 indent-6">
                {modul.panduanUas.deskripsi}
              </p>
              <div className="my-3">
                <div className="font-bold text-slate-900 uppercase mb-1">Ketentuan Proyek Inovasi:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {modul.panduanUas.ketentuanProyek.map((kp, idx) => (
                    <li key={idx}>{kp}</li>
                  ))}
                </ul>
              </div>
              <div className="my-3">
                <div className="font-bold text-slate-900 uppercase mb-1">Rubrik Penilaian Proyek Akhir:</div>
                <p className="text-slate-700 leading-relaxed">{modul.panduanUas.rubrikPenilaian}</p>
              </div>
            </div>
          )}

          {/* GLOSARIUM */}
          {selectedBabIndex === 'all' && (
            <div className="my-10 pt-6 border-t border-slate-300 print:min-h-screen print:page-break-before font-sans text-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide text-center mb-4 font-serif">
                GLOSARIUM ISTILAH SPORT SCIENCE & OLAHRAGA
              </h2>
              <p className="text-slate-600 mb-3">
                Daftar istilah baku dan glosarium ilmiah yang digunakan dalam modul ajar ini:
              </p>
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse border border-slate-300 text-xs">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-2 text-left w-1/4 font-bold">Istilah Keilmuan</th>
                      <th className="border border-slate-300 p-2 text-left font-bold">Definisi Operasional & Konseptual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modul.glosarium.map((g, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2 font-bold text-slate-900">
                          {g.istilah}
                        </td>
                        <td className="border border-slate-300 p-2 text-slate-700">
                          {g.definisi}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DAFTAR PUSTAKA TERVERIFIKASI & PROFIL PENULIS */}
          {selectedBabIndex === 'all' && (
            <div className="my-10 pt-6 border-t border-slate-300 print:min-h-screen print:page-break-before font-sans text-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide text-center mb-6 font-serif">
                DAFTAR PUSTAKA TERVERIFIKASI
              </h2>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="font-bold text-slate-900 mb-1 uppercase tracking-wide">
                    A. Buku Teks Utama Ber-ISBN (Minimal 6 Rujukan):
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700 italic">
                    {modul.daftarPustakaUtama.map((pu, idx) => (
                      <li key={idx}>{pu}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div className="font-bold text-slate-900 mb-1 uppercase tracking-wide">
                    B. Artikel Jurnal Ilmiah Terakreditasi SINTA & Scopus (Minimal 6 Rujukan):
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700 italic">
                    {modul.daftarJurnalIlmiah.map((ji, idx) => (
                      <li key={idx}>{ji}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div className="font-bold text-slate-900 mb-1 uppercase tracking-wide">
                    C. Buku Pendukung & Manual Federasi Resmi (Minimal 6 Rujukan):
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700 italic">
                    {modul.daftarBukuPendukung.map((bp, idx) => (
                      <li key={idx}>{bp}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* PROFIL PENULIS */}
              <div className="border-t border-slate-300 pt-6">
                <div className="font-bold text-slate-900 mb-2 uppercase tracking-wide font-serif text-sm">
                  Profil Tim Penulis Modul Ajar
                </div>
                <div className="space-y-1 text-slate-800">
                  <div>
                    <span className="font-bold">Nama Lengkap: </span>
                    {modul.profilPenulis.nama}
                  </div>
                  <div>
                    <span className="font-bold">Bidang Keahlian: </span>
                    {modul.profilPenulis.bidangKeahlian}
                  </div>
                  <div>
                    <span className="font-bold">Institusi Asal: </span>
                    {modul.profilPenulis.institusi}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed pt-1">
                    {modul.profilPenulis.biografiSingkat}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
