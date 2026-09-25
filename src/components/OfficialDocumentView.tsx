import React from 'react';
import { RPSDocument } from '../types/rps';
import { DAFTAR_CPL } from '../data/curriculumDatabase';
import { getVerifiedSourcesForCourse } from '../data/verifiedBibliography';
import { Award, BookOpen, CheckCircle, FileText, Check, Download } from 'lucide-react';
import logoFkip from '../assets/images/regenerated_image_1790171400384.png';
import logoDiktisaintek from '../assets/images/regenerated_image_1790171403473.png';
import { exportRpsToPdf, exportRpsToWord } from '../utils/exportUtils';

interface Props {
  rps: RPSDocument;
  onOpenModulAjar?: () => void;
}

export const OfficialDocumentView: React.FC<Props> = ({ rps, onOpenModulAjar }) => {
  const cpmkCodes = rps.cpmk.map(c => c.kode);

  // Sumber pustaka terverifikasi
  const verified = getVerifiedSourcesForCourse(rps.mataKuliah);

  const cleanTeknik = (teknik: string) => {
    if (!teknik) return '-';
    return teknik
      .replace(/\s*\(\s*\d+\s*%\s*\)/gi, '')
      .replace(/\s*\d+\s*%/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const cleanSubCpmk = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\s*\([Cc][2-6]\)/gi, '')
      .replace(/\s*-\s*[Cc][2-6]/gi, '')
      .replace(/\s*\[[Cc][2-6]\]/gi, '')
      .replace(/\b[Cc][2-6]\b/g, '')
      .trim();
  };

  return (
    <div className="bg-white text-slate-900 font-sans p-4 sm:p-8 md:p-10 shadow-lg border border-slate-200 rounded-xl print:shadow-none print:border-none print:p-0 print:m-0 max-w-5xl mx-auto text-xs sm:text-sm">
      
      {/* TOMBOL EKSPOR */}
      <div className="flex gap-2 mb-4 no-print">
        <button onClick={() => exportRpsToWord(rps)} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
          <FileText size={16} /> Download Word
        </button>
        <button onClick={() => exportRpsToPdf(rps)} className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700">
          <Download size={16} /> Download PDF
        </button>
      </div>

      {/* BANNER AKSI CEPAT BUAT MODUL AJAR (NO-PRINT) */}
      {onOpenModulAjar && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md no-print border-2 border-amber-500/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 text-2xl shrink-0 shadow-inner">
              📘
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold tracking-wider uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-sans">
                  STANDAR NASIONAL DIKTI
                </span>
                <span className="text-xs text-amber-300 font-semibold font-sans">
                  Minimal 45 Lembar Full Materi
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                Modul Ajar Lengkap: {rps.mataKuliah} ({rps.kodeMK})
              </h3>
              <p className="text-[11px] text-slate-200 mt-0.5">
                Otomatis menghasilkan 16 bab materi komprehensif, sumber pustaka nyata, LKM praktikum, studi kasus, rubrik, dan evaluasi formatif.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenModulAjar}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border border-amber-200"
          >
            <span>Buka Modul Ajar (Min. 45 Lembar)</span>
            <span className="text-base">&rarr;</span>
          </button>
        </div>
      )}

      {/* 1. KOP SURAT / DOKUMEN RESMI */}
      <div className="border border-slate-700 p-4 mb-4">
        <div className="flex items-center justify-between gap-3 text-center">
          {/* Logo Kiri - FKIP Unismuh Palu */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center p-1">
            <img
              src={logoFkip}
              alt="Logo FKIP Unismuh Palu"
              className="max-h-full max-w-full object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Judul Tengah */}
          <div className="flex-1 px-2">
            <h2 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-slate-900">
              UNIVERSITAS MUHAMMADIYAH PALU
            </h2>
            <h3 className="text-xs sm:text-sm md:text-base font-semibold uppercase text-slate-800">
              FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN
            </h3>
            <h4 className="text-xs sm:text-sm font-bold uppercase text-red-800">
              PROGRAM STUDI ILMU KEOLAHRAGAAN
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Jl. Rusdi Toana No. 01 Telp./Fax.(0451) 425627 Palu 94118 | Email: fkipumpalu@gmail.com
            </p>
          </div>

          {/* Logo Kanan - Diktisaintek Berdampak */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center p-1">
            <img
              src={logoDiktisaintek}
              alt="Logo Diktisaintek Berdampak"
              className="max-h-full max-w-full object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="border-t border-slate-700 mt-3 pt-2 text-center">
          <h1 className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wide text-slate-900">
            RENCANA PEMBELAJARAN SEMESTER (RPS)
          </h1>
        </div>
      </div>

      {/* 2. IDENTITAS MATA KULIAH & OTORISASI (TABEL UTAMA) */}
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-600 text-xs sm:text-sm">
          <tbody>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 w-1/4">Tanggal Penyusunan</td>
              <td className="border border-slate-600 p-2 font-medium" colSpan={3}>{rps.tanggalPenyusunan || '10 Februari 2026'}</td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 w-1/4">Mata Kuliah</td>
              <td className="border border-slate-600 p-2 font-bold text-slate-900 w-1/3 uppercase">{rps.mataKuliah}</td>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 w-1/6">Semester</td>
              <td className="border border-slate-600 p-2 font-bold text-center w-1/6">{rps.semester} ({rps.semester === 1 ? 'Satu' : rps.semester})</td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100">Kode Mata Kuliah</td>
              <td className="border border-slate-600 p-2 font-mono font-bold">{rps.kodeMK}</td>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100">Bobot (SKS)</td>
              <td className="border border-slate-600 p-2 font-bold text-center">{rps.sks} SKS (Teori: {rps.sksTeori || 0} / Praktik: {rps.sksPraktek || rps.sks})</td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100">Dosen Pengampu</td>
              <td className="border border-slate-600 p-2" colSpan={3}>{rps.dosenPengampu}</td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 align-top">Otorisasi / Pengesahan</td>
              <td className="border border-slate-600 p-2" colSpan={3}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 border border-slate-300 rounded bg-slate-50 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Dosen Pengembang RPS</span>
                    <div className="font-bold mt-4 underline text-slate-900">{rps.dosenPengembang}</div>
                  </div>
                  <div className="p-2 border border-slate-300 rounded bg-slate-50 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Koordinator Mata Kuliah</span>
                    <div className="font-bold mt-4 underline text-slate-900">{rps.koordinatorMK}</div>
                  </div>
                  <div className="p-2 border border-slate-300 rounded bg-slate-50 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Ketua Program Studi</span>
                    <div className="font-bold mt-4 underline text-slate-900">{rps.kaprodi}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">NIDN: {rps.nidnKaprodi}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 align-top">Deskripsi Mata Kuliah</td>
              <td className="border border-slate-600 p-2 text-justify leading-relaxed" colSpan={3}>
                {rps.deskripsiMK}
              </td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 align-top">CPL-PRODI</td>
              <td className="border border-slate-600 p-2" colSpan={3}>
                <ul className="space-y-1.5 text-xs">
                  {rps.cplProdi.map((cplKode) => {
                    const cplObj = DAFTAR_CPL.find((c) => c.kode === cplKode);
                    return (
                      <li key={cplKode} className="leading-snug">
                        <span className="font-bold text-red-900 bg-red-100 px-1 py-0.5 rounded mr-1 print:bg-transparent print:p-0">
                          {cplKode}
                        </span>
                        <span>: {cplObj?.deskripsi || cplKode}</span>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 align-top">
                Capaian Pembelajaran Mata Kuliah (CPMK)
              </td>
              <td className="border border-slate-600 p-2" colSpan={3}>
                <ul className="space-y-1.5 text-xs">
                  {rps.cpmk.map((item, idx) => (
                    <li key={idx} className="leading-snug">
                      <span className="font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded mr-1 print:bg-transparent print:p-0">
                        {item.kode}
                      </span>
                      <span>: {item.deskripsi}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-2 font-semibold bg-slate-100 align-top">
                Sub Capaian Pembelajaran Mata Kuliah (Sub-CPMK)
              </td>
              <td className="border border-slate-600 p-2" colSpan={3}>
                <ul className="space-y-1.5 text-xs">
                  {rps.subCpmk.map((sc, idx) => (
                    <li key={idx} className="leading-snug">
                      <span className="font-bold text-slate-900">{sc.kode}</span> : {cleanSubCpmk(sc.deskripsi)}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. TABEL MATRIKS KORELASI CPMK TERHADAP SUB-CPMK */}
      <div className="mb-6 overflow-x-auto">
        <div className="bg-slate-100 border border-slate-600 border-b-0 p-2 font-bold text-xs uppercase text-slate-800 text-center">
          Matriks Korelasi CPMK terhadap Sub-CPMK
        </div>
        <table className="w-full border-collapse border border-slate-600 text-xs text-center">
          <thead>
            <tr className="bg-slate-100 font-bold">
              <th className="border border-slate-600 p-2 text-left w-2/5">Kemampuan Akhir Tiap Tahap Belajar (Sub-CPMK)</th>
              {rps.cpmk.map((c) => (
                <th key={c.kode} className="border border-slate-600 p-2">
                  {c.kode}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rps.subCpmk.map((sc) => (
              <tr key={sc.kode} className="hover:bg-slate-50">
                <td className="border border-slate-600 p-1.5 text-left font-semibold text-slate-800 bg-slate-50/40">
                  <span className="font-bold text-slate-900">{sc.kode}</span>
                </td>
                {rps.cpmk.map((c, cpmkIdx) => {
                  // Pola tangga menurun C2-C6: Setiap Sub-CPMK hanya terikat tepat pada 1 CPMK (tanpa centang ganda)
                  // 1. Prioritaskan relasi langsung sc.cpmkTerkait
                  // 2. Jika tidak cocok, gunakan rps.korelasiMatriks tetapi pastikan hanya 1 CPMK per Sub-CPMK
                  // 3. Fallback cerdas berdasarkan indeks/pola tangga 1-3 -> CPMK 1, 4-7 -> CPMK 2, 8-11 -> CPMK 3, 12-14 -> CPMK 4
                  let isChecked = false;
                  if (sc.cpmkTerkait) {
                    isChecked = sc.cpmkTerkait === c.kode;
                  } else if (rps.korelasiMatriks) {
                    // Cari CPMK pertama yang dicentang di matriks
                    const matchedCpmk = rps.cpmk.find(
                      (targetC) =>
                        Boolean(rps.korelasiMatriks?.[`${sc.kode}-${targetC.kode}`]) ||
                        Boolean(rps.korelasiMatriks?.[`${targetC.kode}-${sc.kode}`])
                    );
                    isChecked = matchedCpmk ? matchedCpmk.kode === c.kode : false;
                  }

                  // Jika belum ada relasi terdefinisi, hitung tangga default (3, 4, 4, 3)
                  if (!isChecked && !sc.cpmkTerkait) {
                    const scNum = parseInt(sc.kode.replace(/\D/g, ''), 10) || 1;
                    const expectedCpmkIndex = scNum <= 3 ? 0 : scNum <= 7 ? 1 : scNum <= 11 ? 2 : 3;
                    isChecked = cpmkIdx === expectedCpmkIndex;
                  }

                  return (
                    <td 
                      key={c.kode} 
                      className={`border border-slate-600 p-1.5 text-center font-bold text-base transition-colors ${
                        isChecked ? 'bg-emerald-50/70 text-emerald-800 font-extrabold' : 'text-slate-300 font-normal'
                      }`}
                    >
                      {isChecked ? '✓' : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-1.5 text-[10px] text-slate-600 italic bg-slate-50 border border-t-0 border-slate-600">
          *Pola matriks korelasi memetakan ketercapaian Sub-CPMK terhadap CPMK 1 s/d 4.
        </div>
      </div>

      {/* 4. BAHAN KAJIAN & MATERI PEMBELAJARAN (DISUSUN KE BAWAH) */}
      <div className="mb-6 space-y-4">
        {/* Bahan Kajian: Materi Besar */}
        <div className="border border-slate-600 rounded-none overflow-hidden flex flex-col">
          <div className="bg-slate-100 border-b border-slate-600 p-2 font-bold text-xs uppercase text-slate-800 flex justify-between items-center">
            <span>Bahan Kajian (Materi Besar / Pokok Bahasan Keilmuan)</span>
            <span className="text-[10px] font-normal normal-case text-slate-600">
              {rps.bahanKajian.length} Pokok Bahasan Keilmuan
            </span>
          </div>
          <div className="p-3 text-xs space-y-1.5 bg-white">
            {rps.bahanKajian.map((bk, i) => (
              <div key={i} className="leading-snug py-1 border-b border-slate-100 last:border-b-0 font-medium text-slate-800">
                {bk}
              </div>
            ))}
          </div>
        </div>

        {/* Materi Pembelajaran: 14 materi inti; UTS/UAS berada pada jadwal minggu 8/16 */}
        <div className="border border-slate-600 rounded-none overflow-hidden flex flex-col">
          <div className="bg-slate-100 border-b border-slate-600 p-2 font-bold text-xs uppercase text-slate-800 flex justify-between items-center">
            <span>Materi Pembelajaran (14 Materi Inti; UTS/UAS pada Minggu 8 dan 16)</span>
            <span className="text-[10px] font-normal normal-case text-emerald-800 font-semibold">
              Terverifikasi Nyata dari Pustaka
            </span>
          </div>
          <div className="p-3 text-xs space-y-1 bg-white max-h-96 overflow-y-auto print:max-h-none">
            {rps.materiPembelajaran.map((mp, i) => (
              <div key={i} className="leading-snug py-0.5 border-b border-slate-100 last:border-b-0 text-slate-700">
                {mp}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. DAFTAR PUSTAKA LENGKAP & TERVERIFIKASI */}
      <div className="mb-6 border border-slate-600 overflow-hidden">
        <div className="bg-slate-100 border-b border-slate-600 p-2 font-bold text-xs uppercase text-slate-800">
          Daftar Pustaka
        </div>
        <div className="p-3 text-xs space-y-3 bg-white">
          {/* Referensi Utama */}
          <div>
            <div className="font-bold text-slate-900 mb-1 underline">Referensi Utama (Buku dan Artikel Jurnal)</div>
            
            {/* Buku */}
            <div className="pl-3 mb-2">
              <span className="font-semibold text-slate-800 italic block mb-0.5">Buku Teks Utama:</span>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                {verified.pustakaUtama.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            </div>

            {/* Jurnal */}
            <div className="pl-3">
              <span className="font-semibold text-slate-800 italic block mb-0.5">Artikel Jurnal Ilmiah:</span>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                {verified.artikelJurnal.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Referensi Pendukung */}
          <div className="border-t border-slate-200 pt-2">
            <div className="font-bold text-slate-900 mb-1 underline">Referensi Pendukung (Modul dan E-book)</div>
            
            <div className="pl-3 mb-2">
              <span className="font-semibold text-slate-800 italic block mb-0.5">Buku / Modul Pendukung:</span>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                {verified.pustakaPendukung.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            </div>

            {verified.eBook && verified.eBook.length > 0 && (
              <div className="pl-3 mb-1">
                <span className="font-semibold text-slate-800 italic block mb-0.5">E-book & Regulasi Resmi Federasi:</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-700">
                  {verified.eBook.map((item, i) => (
                    <li key={i} className="leading-relaxed">{item}</li>
                  ))}
                </ol>
              </div>
            )}

            {verified.pustakaOnline && verified.pustakaOnline.length > 0 && (
              <div className="pl-3">
                <span className="font-semibold text-slate-800 italic block mb-0.5">Sumber Tautan / Web Resmi:</span>
                <ul className="list-disc list-inside space-y-0.5 text-blue-900">
                  {verified.pustakaOnline.map((item, i) => (
                    <li key={i} className="break-all">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. TABEL RENCANA PEMBELAJARAN 16 MINGGU (FORMAT BAKU RESMI - SESUAI CONTOH TEMPLATE) */}
      <div className="mb-6 overflow-x-auto">
        <div className="bg-slate-100 border border-slate-600 border-b-0 p-2 font-bold text-xs uppercase text-slate-800 text-center">
          Rencana Pembelajaran Mingguan (16 Pertemuan Semester)
        </div>
        <table className="w-full border-collapse border border-slate-600 text-[11px] sm:text-xs">
          <thead>
            {/* Header Baris 1 */}
            <tr className="bg-slate-100 text-center font-bold">
              <th rowSpan={2} className="border border-slate-600 p-1.5 w-10">Minggu ke</th>
              <th rowSpan={2} className="border border-slate-600 p-1.5 w-36 text-left">Kompetensi Dasar/<br/>Kemampuan Akhir</th>
              <th rowSpan={2} className="border border-slate-600 p-1.5 w-44 text-left">Bahan Kajian/materi pembelajran</th>
              <th rowSpan={2} className="border border-slate-600 p-1.5 w-32 text-left">Metode Pembelajaran</th>
              <th rowSpan={2} className="border border-slate-600 p-1.5 w-16">Estimasi Waktu</th>
              <th rowSpan={2} className="border border-slate-600 p-1.5 w-36 text-left">Pengalaman belajar</th>
              <th colSpan={3} className="border border-slate-600 p-1.5 text-center">Penilaian</th>
            </tr>
            {/* Header Baris 2 (Di Bawah Kolom Penilaian) */}
            <tr className="bg-slate-100 text-center font-bold">
              <th className="border border-slate-600 p-1 text-left w-36">Indikator</th>
              <th className="border border-slate-600 p-1 text-left w-28">Teknik</th>
              <th className="border border-slate-600 p-1 w-14">Bobot (%)</th>
            </tr>
            {/* Header Baris 3 (Penomoran Kolom 1 s/d 9 Sesuai Template) */}
            <tr className="bg-slate-50 text-center text-[10px] text-slate-700 font-bold">
              <th className="border border-slate-600 p-0.5">1</th>
              <th className="border border-slate-600 p-0.5">2</th>
              <th className="border border-slate-600 p-0.5">3</th>
              <th className="border border-slate-600 p-0.5">4</th>
              <th className="border border-slate-600 p-0.5">5</th>
              <th className="border border-slate-600 p-0.5">6</th>
              <th className="border border-slate-600 p-0.5">7</th>
              <th className="border border-slate-600 p-0.5">8</th>
              <th className="border border-slate-600 p-0.5">9</th>
            </tr>
          </thead>
          <tbody>
            {rps.mingguan.map((m) => {
              const isUjian = m.minggu === 8 || m.minggu === 16;
              return (
                <tr key={m.minggu} className={isUjian ? 'bg-amber-50 font-semibold' : (m.minggu % 2 === 0 ? 'bg-slate-50/60' : 'bg-white')}>
                  {/* Kolom 1: Minggu ke */}
                  <td className="border border-slate-600 p-1.5 text-center font-bold">{m.minggu}</td>
                  {/* Kolom 2: Kompetensi Dasar/Kemampuan Akhir */}
                  <td className="border border-slate-600 p-1.5 font-bold text-slate-900">
                    {cleanSubCpmk(m.subCpmk)}
                  </td>
                  {/* Kolom 3: Bahan Kajian/materi pembelajran */}
                  <td className="border border-slate-600 p-1.5 text-slate-800 leading-snug">{m.materi}</td>
                  {/* Kolom 4: Metode Pembelajaran */}
                  <td className="border border-slate-600 p-1.5 text-slate-700">{m.metode}</td>
                  {/* Kolom 5: Estimasi Waktu */}
                  <td className="border border-slate-600 p-1.5 text-center text-slate-700 font-mono text-[11px]">
                    {m.waktu.includes('menit') ? m.waktu : `${m.waktu} Menit`}
                  </td>
                  {/* Kolom 6: Pengalaman belajar */}
                  <td className="border border-slate-600 p-1.5 text-slate-700 leading-snug">{m.pengalamanBelajar}</td>
                  {/* Kolom 7: Indikator */}
                  <td className="border border-slate-600 p-1.5 text-slate-700 leading-snug">{m.indikator}</td>
                  {/* Kolom 8: Teknik (Murni Nama Teknik, Tanpa Angka / Persen) */}
                  <td className="border border-slate-600 p-1.5 font-medium text-slate-800">
                    {cleanTeknik(m.teknikPenilaian)}
                  </td>
                  {/* Kolom 9: Bobot (%) */}
                  <td className="border border-slate-600 p-1.5 text-center font-bold text-red-900">{m.bobot}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 7. REKAPITULASI KOMPONEN PENILAIAN */}
      <div className="mb-6 overflow-x-auto">
        <div className="bg-slate-100 border border-slate-600 border-b-0 p-2 font-bold text-xs uppercase text-slate-800">
          Tabel Komponen Penilaian Hasil Belajar
        </div>
        <table className="w-full border-collapse border border-slate-600 text-xs">
          <thead>
            <tr className="bg-slate-50 font-bold text-center">
              <th className="border border-slate-600 p-2 w-12">No</th>
              <th className="border border-slate-600 p-2 text-left">Komponen Penilaian</th>
              <th className="border border-slate-600 p-2 w-24">Bobot (%)</th>
              <th className="border border-slate-600 p-2 text-left">Deskripsi Penilaian</th>
            </tr>
          </thead>
          <tbody>
            {(rps.rekapKomponen || [
              { no: 1, komponen: 'Aktivitas Partisipatif', bobot: 20, deskripsi: 'Keaktifan dan kontribusi mahasiswa dalam proses perkuliahan, kehadiran, dan diskusi.' },
              { no: 2, komponen: 'Hasil Proyek (PjBL)', bobot: 30, deskripsi: 'Kualitas analisis studi kasus, rancangan skema latihan taktik, dan presentasi portofolio.' },
              { no: 3, komponen: 'Penugasan (Tugas Terstruktur)', bobot: 20, deskripsi: 'Hasil penyelesaian tugas-tugas terstruktur mingguan (Sub-CPMK 1–10).' },
              { no: 4, komponen: 'UTS', bobot: 15, deskripsi: 'Evaluasi tertulis/praktik materi Pertemuan 1-7.' },
              { no: 5, komponen: 'UAS', bobot: 15, deskripsi: 'Evaluasi tertulis/praktik komprehensif materi Pertemuan 8-15.' }
            ]).map((rk) => (
              <tr key={rk.no} className="hover:bg-slate-50">
                <td className="border border-slate-600 p-2 text-center font-bold">{rk.no}</td>
                <td className="border border-slate-600 p-2 font-semibold">{rk.komponen}</td>
                <td className="border border-slate-600 p-2 text-center font-bold text-red-900">{rk.bobot}%</td>
                <td className="border border-slate-600 p-2">{rk.deskripsi}</td>
              </tr>
            ))}
            <tr className="bg-slate-100 font-bold">
              <td className="border border-slate-600 p-2 text-center" colSpan={2}>TOTAL BOBOT EVALUASI</td>
              <td className="border border-slate-600 p-2 text-center text-red-900">100%</td>
              <td className="border border-slate-600 p-2">Standar Penilaian Mutu OBE S1 IKOR FKIP Unismuh Palu</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 8. LAMPIRAN LENGKAP: RUBRIK PENILAIAN SESUAI TEMPLATE PDF */}
      <div className="mt-8 border-t-2 border-slate-800 pt-6">
        <h2 className="text-base sm:text-lg font-extrabold text-center uppercase tracking-wide text-slate-900 mb-6">
          LAMPIRAN: RUBRIK PENILAIAN MATA KULIAH LENGKAP
        </h2>

        {/* 1. RUBRIK KEHADIRAN (10%) */}
        <div className="mb-6">
          <div className="bg-slate-200 border border-slate-600 p-2 font-bold text-xs uppercase text-slate-900">
            1. RUBRIK KEHADIRAN — {rps.komponenPenilaian?.kehadiran || 10}%
          </div>
          <table className="w-full border-collapse border border-slate-600 text-xs">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 w-28 text-center">Rentang Nilai</th>
                <th className="border border-slate-600 p-2 text-left">Kriteria Presensi & Keaktifan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">90–100</td>
                <td className="border border-slate-600 p-2">Hadir 100% tepat waktu, aktif berdiskusi di kelas, dan menunjukkan etos kedisiplinan tinggi.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">80–89</td>
                <td className="border border-slate-600 p-2">Hadir 90–95%, tepat waktu, dan berpartisipasi aktif dalam kegiatan pembelajaran.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">70–79</td>
                <td className="border border-slate-600 p-2">Hadir 80–89%, sesekali terlambat dengan alasan jelas, dan cukup aktif.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">60–69</td>
                <td className="border border-slate-600 p-2">Hadir 75–79% (batas minimal kehadiran), kurang aktif, sering pasif.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold text-red-700">1–59</td>
                <td className="border border-slate-600 p-2">Kehadiran &lt; 75%, tidak memenuhi syarat ujian akhir semester.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. RUBRIK SIKAP DAN PARTISIPASI (20%) */}
        <div className="mb-6">
          <div className="bg-slate-200 border border-slate-600 p-2 font-bold text-xs uppercase text-slate-900">
            2. RUBRIK SIKAP DAN PARTISIPASI — {rps.komponenPenilaian?.sikap || 20}%
          </div>
          <table className="w-full border-collapse border border-slate-600 text-xs mb-3">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 w-12 text-center">No</th>
                <th className="border border-slate-600 p-2 text-left">Aspek Penilaian Sikap</th>
                <th className="border border-slate-600 p-2 w-20 text-center">Bobot</th>
                <th className="border border-slate-600 p-2 text-left">Indikator Perilaku</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 p-2 text-center">1</td>
                <td className="border border-slate-600 p-2 font-semibold">Disiplin</td>
                <td className="border border-slate-600 p-2 text-center font-bold">20%</td>
                <td className="border border-slate-600 p-2">Hadir tepat waktu, berpakaian olahraga rapi/sesuai ketentuan prodi, mengumpulkan tugas tepat waktu.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center">2</td>
                <td className="border border-slate-600 p-2 font-semibold">Tanggung Jawab</td>
                <td className="border border-slate-600 p-2 text-center font-bold">20%</td>
                <td className="border border-slate-600 p-2">Melaksanakan peran kelompok dengan penuh komitmen, menjaga peralatan fasilitas kuliah.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center">3</td>
                <td className="border border-slate-600 p-2 font-semibold">Partisipasi Aktif</td>
                <td className="border border-slate-600 p-2 text-center font-bold">20%</td>
                <td className="border border-slate-600 p-2">Aktif bertanya, menyampaikan gagasan kritis, merespons pertanyaan dosen dan rekan mahasiswa.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center">4</td>
                <td className="border border-slate-600 p-2 font-semibold">Kerja Sama & Sportivitas</td>
                <td className="border border-slate-600 p-2 text-center font-bold">20%</td>
                <td className="border border-slate-600 p-2">Mampu berkolaborasi dalam tim praktik, menjunjung tinggi nilai sportivitas (fair play).</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center">5</td>
                <td className="border border-slate-600 p-2 font-semibold">Etika dan Integritas</td>
                <td className="border border-slate-600 p-2 text-center font-bold">20%</td>
                <td className="border border-slate-600 p-2">Sopan santun, menghargai pendapat orang lain, menjauhi plagiasi dan kecurangan akademik.</td>
              </tr>
            </tbody>
          </table>

          {/* Kriteria Nilai Sikap */}
          <table className="w-full border-collapse border border-slate-600 text-xs">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 w-28 text-center">Rentang Nilai</th>
                <th className="border border-slate-600 p-2 text-left">Kriteria Penilaian Sikap</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">90–100</td>
                <td className="border border-slate-600 p-2">Selalu konsisten menunjukkan kelima aspek sikap dengan teladan sangat baik di kelas/lapangan.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">80–89</td>
                <td className="border border-slate-600 p-2">Sering menunjukkan sikap positif pada sebagian besar aspek dengan baik.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">70–79</td>
                <td className="border border-slate-600 p-2">Cukup konsisten tetapi kadang memerlukan pengingatan dari dosen.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">60–69</td>
                <td className="border border-slate-600 p-2">Kurang konsisten dalam kedisiplinan dan tanggung jawab.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold text-red-700">1–59</td>
                <td className="border border-slate-600 p-2">Tidak menunjukkan etika akademik dan sportivitas yang dipersyaratkan.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. RUBRIK TUGAS / KOGNITIF (20%) - SUB-CPMK 1-10 */}
        <div className="mb-6">
          <div className="bg-slate-200 border border-slate-600 p-2 font-bold text-xs uppercase text-slate-900">
            3. RUBRIK TUGAS / KOGNITIF — {rps.komponenPenilaian?.tugas || 20}% (Khusus Sub-CPMK 1–10)
          </div>
          <p className="text-xs text-slate-600 p-2 italic">
            Pemetaan Bobot Tugas Kognitif: Terbagi secara terstruktur pada Sub-CPMK 1 s.d 10 (masing-masing 10% di dalam komponen Tugas = 2% per SC terhadap nilai akhir).
          </p>

          <table className="w-full border-collapse border border-slate-600 text-xs mb-3">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 w-12 text-center">No</th>
                <th className="border border-slate-600 p-2 text-left">Bentuk Penugasan Kognitif / Unjuk Kerja</th>
                <th className="border border-slate-600 p-2 w-28 text-center">Sub-CPMK</th>
                <th className="border border-slate-600 p-2 w-24 text-center">Bobot Komp.</th>
              </tr>
            </thead>
            <tbody>
              {(rps.rubrikTugasKognitif?.pemetaan || [
                { no: 1, bentuk: 'Kajian regulasi resmi, etika sportivitas, dan filosofi keilmuan', subCpmk: 'SC 1', bobotDalamKomponen: 10 },
                { no: 2, bentuk: 'Analisis biomekanika teknik fundamental', subCpmk: 'SC 2', bobotDalamKomponen: 10 },
                { no: 3, bentuk: 'Analisis variasi teknik lanjutan dan gerak tubuh', subCpmk: 'SC 3', bobotDalamKomponen: 10 },
                { no: 4, bentuk: 'Praktikum lapangan unjuk kerja ball handling / gerak dasar', subCpmk: 'SC 4', bobotDalamKomponen: 10 },
                { no: 5, bentuk: 'Kajian taktik dasar penyerangan dan sistem pertahanan', subCpmk: 'SC 5', bobotDalamKomponen: 10 },
                { no: 6, bentuk: 'Analisis kondisi fisik spesifik, agilitas, dan daya ledak', subCpmk: 'SC 6', bobotDalamKomponen: 10 },
                { no: 7, bentuk: 'Analisis formasi strategi dan skema permainan tim', subCpmk: 'SC 7', bobotDalamKomponen: 10 },
                { no: 8, bentuk: 'Kajian situasi transisi cepat dan situasi khusus di lapangan', subCpmk: 'SC 8', bobotDalamKomponen: 10 },
                { no: 9, bentuk: 'Kajian metodologi kepelatihan dan manajemen tim olahraga', subCpmk: 'SC 9', bobotDalamKomponen: 10 },
                { no: 10, bentuk: 'Penilaian performa taktik melalui video analisis digital', subCpmk: 'SC 10', bobotDalamKomponen: 10 }
              ]).map((t) => (
                <tr key={t.no}>
                  <td className="border border-slate-600 p-1.5 text-center">{t.no}</td>
                  <td className="border border-slate-600 p-1.5">{t.bentuk}</td>
                  <td className="border border-slate-600 p-1.5 text-center font-bold text-red-900">{t.subCpmk}</td>
                  <td className="border border-slate-600 p-1.5 text-center font-bold">{t.bobotDalamKomponen}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Kriteria Skor Tugas/Kognitif */}
          <table className="w-full border-collapse border border-slate-600 text-[11px] sm:text-xs">
            <thead>
              <tr className="bg-slate-50 font-bold text-center">
                <th className="border border-slate-600 p-2 text-left w-36">Aspek Penilaian</th>
                <th className="border border-slate-600 p-1.5">Sangat Baik (90–100)</th>
                <th className="border border-slate-600 p-1.5">Baik (80–89)</th>
                <th className="border border-slate-600 p-1.5">Cukup (70–79)</th>
                <th className="border border-slate-600 p-1.5">Kurang (60–69)</th>
                <th className="border border-slate-600 p-1.5">Sangat Kurang (1–59)</th>
              </tr>
            </thead>
            <tbody>
              {(rps.rubrikTugasKognitif?.kriteria || [
                { aspek: 'Pemahaman konsep', skor90_100: 'Sangat tepat dan mendalam', skor80_89: 'Tepat', skor70_79: 'Cukup tepat', skor60_69: 'Banyak kekeliruan', skor1_59: 'Tidak menguasai' },
                { aspek: 'Identifikasi', skor90_100: 'Sangat tepat dan lengkap', skor80_89: 'Tepat', skor70_79: 'Cukup tepat', skor60_69: 'Banyak kesalahan', skor1_59: 'Tidak mampu' },
                { aspek: 'Penerapan', skor90_100: 'Sangat tepat dan presisi', skor80_89: 'Tepat', skor70_79: 'Cukup', skor60_69: 'Kurang tepat', skor1_59: 'Tidak mampu' },
                { aspek: 'Analisis', skor90_100: 'Sangat kritis dan mendalam', skor80_89: 'Baik dan logis', skor70_79: 'Cukup', skor60_69: 'Terbatas', skor1_59: 'Tidak mampu' },
                { aspek: 'Pemecahan masalah', skor90_100: 'Sangat relevan dan aplikatif', skor80_89: 'Relevan', skor70_79: 'Cukup relevan', skor60_69: 'Kurang tepat', skor1_59: 'Tidak ada solusi' }
              ]).map((kr, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-600 p-1.5 font-bold bg-slate-50">{kr.aspek}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor90_100}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor80_89}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor70_79}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor60_69}</td>
                  <td className="border border-slate-600 p-1.5 text-center text-red-700">{kr.skor1_59}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. RUBRIK PROYEK (PjBL) (20% / 30%) - KHUSUS SUB-CPMK 11-14 */}
        <div className="mb-6">
          <div className="bg-slate-200 border border-slate-600 p-2 font-bold text-xs uppercase text-slate-900">
            4. RUBRIK PROYEK (Project-Based Learning) — {rps.komponenPenilaian?.proyek || 20}% (Khusus Sub-CPMK 11–14)
          </div>
          <div className="p-2 border border-slate-600 border-t-0 bg-slate-50 text-xs">
            <div><b>Judul Proyek:</b> {rps.rubrikProyek?.judul || 'Analisis Video Performa Taktik Pertandingan dan Perancangan Skema Latihan Olahraga'}</div>
            <div><b>Metode:</b> Project-Based Learning (PjBL) Berbasis Sport Analytics Digital</div>
          </div>

          <table className="w-full border-collapse border border-slate-600 text-xs my-2">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 w-12 text-center">No</th>
                <th className="border border-slate-600 p-2 text-left">Aspek Penilaian Proyek</th>
                <th className="border border-slate-600 p-2 w-28 text-center">Sub-CPMK</th>
                <th className="border border-slate-600 p-2 w-24 text-center">Bobot Proyek</th>
              </tr>
            </thead>
            <tbody>
              {(rps.rubrikProyek?.pemetaan || [
                { no: 1, aspek: 'Evaluasi penerapan aturan perwasitan dan praktik memimpin laga', subCpmk: 'SC 11', bobotDalamProyek: 25 },
                { no: 2, aspek: 'Ketepatan analisis data statistik pertandingan digital (sport analytics)', subCpmk: 'SC 12', bobotDalamProyek: 20 },
                { no: 3, aspek: 'Ketajaman perancangan skema latihan taktik dan video analisis', subCpmk: 'SC 13', bobotDalamProyek: 25 },
                { no: 4, aspek: 'Kualitas portofolio kepelatihan dan modul latihan komprehensif', subCpmk: 'SC 14', bobotDalamProyek: 20 },
                { no: 5, aspek: 'Kualitas presentasi, komunikasi, dan pertanggungjawaban ilmiah', subCpmk: 'SC 14', bobotDalamProyek: 10 }
              ]).map((p) => (
                <tr key={p.no}>
                  <td className="border border-slate-600 p-1.5 text-center">{p.no}</td>
                  <td className="border border-slate-600 p-1.5">{p.aspek}</td>
                  <td className="border border-slate-600 p-1.5 text-center font-bold text-red-900">{p.subCpmk}</td>
                  <td className="border border-slate-600 p-1.5 text-center font-bold">{p.bobotDalamProyek}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Kriteria Skor Proyek */}
          <table className="w-full border-collapse border border-slate-600 text-[11px] sm:text-xs">
            <thead>
              <tr className="bg-slate-50 font-bold text-center">
                <th className="border border-slate-600 p-2 text-left w-36">Aspek Penilaian</th>
                <th className="border border-slate-600 p-1.5">Sangat Baik (90–100)</th>
                <th className="border border-slate-600 p-1.5">Baik (80–89)</th>
                <th className="border border-slate-600 p-1.5">Cukup (70–79)</th>
                <th className="border border-slate-600 p-1.5">Kurang (60–69)</th>
                <th className="border border-slate-600 p-1.5">Sangat Kurang (1–59)</th>
              </tr>
            </thead>
            <tbody>
              {(rps.rubrikProyek?.kriteria || [
                { aspek: 'Analisis risiko', skor90_100: 'Sangat kritis, lengkap, berbasis bukti empiris', skor80_89: 'Baik dan sistematis', skor70_79: 'Cukup', skor60_69: 'Terbatas', skor1_59: 'Tidak mampu menganalisis' },
                { aspek: 'Analisis taktis', skor90_100: 'Sangat tepat dan komprehensif', skor80_89: 'Tepat', skor70_79: 'Cukup tepat', skor60_69: 'Banyak kekurangan', skor1_59: 'Tidak mampu membedakan' },
                { aspek: 'Kritik kasus', skor90_100: 'Sangat kritis, logis, berbasis data statistik', skor80_89: 'Kritis dan logis', skor70_79: 'Cukup kritis', skor60_69: 'Terbatas', skor1_59: 'Tidak mampu mengkritik' },
                { aspek: 'Strategi kepelatihan', skor90_100: 'Sangat relevan, inovatif, dan aplikatif', skor80_89: 'Relevan dan aplikatif', skor70_79: 'Cukup relevan', skor60_69: 'Kurang tepat', skor1_59: 'Tidak ada solusi' },
                { aspek: 'Laporan & presentasi', skor90_100: 'Sangat sistematis, komunikatif, profesional', skor80_89: 'Baik dan sistematis', skor70_79: 'Cukup', skor60_69: 'Kurang sistematis', skor1_59: 'Tidak memenuhi standar' }
              ]).map((kr, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-600 p-1.5 font-bold bg-slate-50">{kr.aspek}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor90_100}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor80_89}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor70_79}</td>
                  <td className="border border-slate-600 p-1.5 text-center">{kr.skor60_69}</td>
                  <td className="border border-slate-600 p-1.5 text-center text-red-700">{kr.skor1_59}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. RUBRIK UTS (15%) */}
        <div className="mb-6">
          <div className="bg-slate-200 border border-slate-600 p-2 font-bold text-xs uppercase text-slate-900">
            5. RUBRIK UJIAN TENGAH SEMESTER (UTS) — {rps.komponenPenilaian?.uts || 15}% (Materi Sub-CPMK 1–7)
          </div>
          <table className="w-full border-collapse border border-slate-600 text-xs mb-2">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 text-left">Komponen Penilaian UTS</th>
                <th className="border border-slate-600 p-2 w-24 text-center">Bobot</th>
              </tr>
            </thead>
            <tbody>
              {(rps.rubrikUts?.aspek || [
                { nama: 'Regulasi resmi federasi, filosofi etika, dan nilai keislaman', bobot: 20 },
                { nama: 'Biomekanika teknik fundamental dan efisiensi gerak', bobot: 20 },
                { nama: 'Praktik teknik individu dan unjuk kerja keterampilan', bobot: 20 },
                { nama: 'Taktik dasar penyerangan dan sistem pertahanan terpadu', bobot: 20 },
                { nama: 'Kondisi fisik spesifik dan analisis formasi di lapangan', bobot: 20 }
              ]).map((a, i) => (
                <tr key={i}>
                  <td className="border border-slate-600 p-1.5">{a.nama}</td>
                  <td className="border border-slate-600 p-1.5 text-center font-bold">{a.bobot}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Kriteria UTS */}
          <table className="w-full border-collapse border border-slate-600 text-xs">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 w-28 text-center">Rentang Nilai</th>
                <th className="border border-slate-600 p-2 text-left">Kriteria Penilaian UTS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">90–100</td>
                <td className="border border-slate-600 p-2">Penguasaan materi sangat baik, jawaban tepat, lengkap, dan mampu menganalisis taktik/biomekanika secara komprehensif.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">80–89</td>
                <td className="border border-slate-600 p-2">Penguasaan materi baik dengan sedikit kesalahan teknis.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">70–79</td>
                <td className="border border-slate-600 p-2">Penguasaan cukup tetapi terdapat beberapa kesalahan konsep taktik.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">60–69</td>
                <td className="border border-slate-600 p-2">Penguasaan masih terbatas dan kurang mendalam.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold text-red-700">1–59</td>
                <td className="border border-slate-600 p-2">Belum menguasai materi yang diujikan.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 6. RUBRIK UAS (15%) */}
        <div className="mb-6">
          <div className="bg-slate-200 border border-slate-600 p-2 font-bold text-xs uppercase text-slate-900">
            6. RUBRIK UJIAN AKHIR SEMESTER (UAS) — {rps.komponenPenilaian?.uas || 15}% (Materi Sub-CPMK 8–14)
          </div>
          <table className="w-full border-collapse border border-slate-600 text-xs mb-2">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 text-left">Komponen Penilaian UAS</th>
                <th className="border border-slate-600 p-2 w-24 text-center">Bobot</th>
              </tr>
            </thead>
            <tbody>
              {(rps.rubrikUas?.aspek || [
                { nama: 'Situasi transisi permainan cepat, set plays, dan antisipasi taktik lawan', bobot: 20 },
                { nama: 'Metodologi kepelatihan dan manajemen tim keolahragaan modern', bobot: 20 },
                { nama: 'Penilaian performa taktik dan video analisis pertandingan digital', bobot: 20 },
                { nama: 'Regulasi perwasitan resmi dan simulasi memimpin pertandingan', bobot: 20 },
                { nama: 'Kualitas perancangan skema latihan periodisasi dan portofolio kepelatihan', bobot: 20 }
              ]).map((a, i) => (
                <tr key={i}>
                  <td className="border border-slate-600 p-1.5">{a.nama}</td>
                  <td className="border border-slate-600 p-1.5 text-center font-bold">{a.bobot}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Kriteria UAS */}
          <table className="w-full border-collapse border border-slate-600 text-xs">
            <thead>
              <tr className="bg-slate-50 font-bold">
                <th className="border border-slate-600 p-2 w-28 text-center">Rentang Nilai</th>
                <th className="border border-slate-600 p-2 text-left">Kriteria Penilaian UAS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">90–100</td>
                <td className="border border-slate-600 p-2">Mampu menerapkan dan menganalisis strategi keolahragaan secara sangat tepat, logis, sistematis, dan berbasis sport analytics digital.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">80–89</td>
                <td className="border border-slate-600 p-2">Mampu menerapkan dan menganalisis dengan baik.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">70–79</td>
                <td className="border border-slate-600 p-2">Mampu menerapkan konsep tetapi analisis taktik masih terbatas.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold">60–69</td>
                <td className="border border-slate-600 p-2">Penguasaan dan penerapan masih rendah.</td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-2 text-center font-bold text-red-700">1–59</td>
                <td className="border border-slate-600 p-2">Belum mampu menerapkan dan menganalisis konsep keolahragaan modern.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
