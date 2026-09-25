import React from 'react';
import { IDENTITAS_PRODI } from '../data/curriculumDatabase';
import { RefreshCw, BookCheck, Target, Sparkles, BookOpen, CheckCircle, ShieldAlert, Award } from 'lucide-react';

export const ObeGuideView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* BANNER VISI 2045 */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-700/80 text-white mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Visi Keilmuan Menuju 2045
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          &ldquo;{IDENTITAS_PRODI.visi}&rdquo;
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-3xl leading-relaxed">
          Kurikulum Outcome-Based Education (OBE) Program Studi Ilmu Keolahragaan FKIP Universitas Muhammadiyah Palu
          menempatkan hasil belajar dan keberdampakan mahasiswa sebagai pusat rancangan kurikulum, proses pembelajaran,
          serta asesmen autentik berkelanjutan berbasis sport science dan teknologi digital.
        </p>
      </div>

      {/* KAIDAH TAKSONOMI BLOOM KOGNITIF C2 - C6 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-700" />
            Kaidah Perumusan CPMK & Sub-CPMK: Taksonomi Bloom Kognitif (C2 – C6)
          </h3>
          <span className="inline-block self-start sm:self-auto px-2.5 py-1 text-[11px] font-bold uppercase rounded bg-red-100 text-red-800 border border-red-200">
            Standar Akademik S1 IKOR
          </span>
        </div>
        
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 mb-6 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <b>Catatan Kebijakan Kurikulum:</b> Pada jenjang Sarjana (S1) Ilmu Keolahragaan, perumusan CPMK dan Sub-CPMK <b>tidak menggunakan level C1 (Mengingat dasar)</b>. Seluruh capaian pembelajaran <b>dimulai dari C2 (Memahami) sampai C6 (Menciptakan/Merancang)</b> guna menjamin penguasaan kemampuan berpikir tingkat tinggi (Higher Order Thinking Skills / HOTS), kemandirian analisis gerak, dan kompetensi kepelatihan profesional.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* C2 */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-blue-900 text-sm">C2: Memahami</span>
                <span className="text-[10px] font-bold bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded">Understanding</span>
              </div>
              <p className="text-slate-600 mb-2 leading-relaxed">
                Mengonstruksi makna konsep keilmuan, mengelompokkan prinsip, merangkum regulasi, dan memberi contoh penerapan teknologi.
              </p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-blue-100 font-mono text-[11px] text-blue-900 mt-2">
              <div className="font-bold text-[10px] text-slate-500 uppercase mb-0.5">KKO Terukur:</div>
              Menjelaskan, Menguraikan, Mengklasifikasikan, Memberi contoh, Membedakan, Menerangkan.
            </div>
          </div>

          {/* C3 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-emerald-900 text-sm">C3: Menerapkan</span>
                <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">Applying</span>
              </div>
              <p className="text-slate-600 mb-2 leading-relaxed">
                Mempraktikkan teknik fundamental di lapangan, mengimplementasikan prosedur taktik, dan menggunakan instrumen tes keolahragaan.
              </p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-100 font-mono text-[11px] text-emerald-900 mt-2">
              <div className="font-bold text-[10px] text-slate-500 uppercase mb-0.5">KKO Terukur:</div>
              Mempraktikkan, Menerapkan, Menggunakan, Mendemonstrasikan, Mengoperasikan, Melakukan.
            </div>
          </div>

          {/* C4 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-amber-900 text-sm">C4: Menganalisis</span>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">Analyzing</span>
              </div>
              <p className="text-slate-600 mb-2 leading-relaxed">
                Membedah kesalahan gerak anatomis & biomekanis, menelaah formasi taktik lawan, dan menganalisis statistik box score digital.
              </p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-100 font-mono text-[11px] text-amber-900 mt-2">
              <div className="font-bold text-[10px] text-slate-500 uppercase mb-0.5">KKO Terukur:</div>
              Menganalisis, Menelaah, Membedah, Membandingkan, Mendiagnosis, Mengkaji secara kritis.
            </div>
          </div>

          {/* C5 */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-purple-900 text-sm">C5: Mengevaluasi</span>
                <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded">Evaluating</span>
              </div>
              <p className="text-slate-600 mb-2 leading-relaxed">
                Menilai efektivitas strategi permainan via video analisis, mengevaluasi hasil pre/post test fisik, dan menyimpulkan koreksi atlet.
              </p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-purple-100 font-mono text-[11px] text-purple-900 mt-2">
              <div className="font-bold text-[10px] text-slate-500 uppercase mb-0.5">KKO Terukur:</div>
              Menilai, Mengevaluasi, Menyimpulkan, Memvalidasi, Mengkritik, Memutuskan solusi korektif.
            </div>
          </div>

          {/* C6 */}
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-red-900 text-sm">C6: Menciptakan</span>
                <span className="text-[10px] font-bold bg-red-200 text-red-900 px-1.5 py-0.5 rounded">Creating</span>
              </div>
              <p className="text-slate-600 mb-2 leading-relaxed">
                Merancang program latihan periodisasi siklus mikro, menyusun modul kepelatihan, dan menyusun laporan analitik berbasis sport science.
              </p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-red-100 font-mono text-[11px] text-red-900 mt-2">
              <div className="font-bold text-[10px] text-slate-500 uppercase mb-0.5">KKO Terukur:</div>
              Merancang, Menyusun, Mengembangkan, Memformulasi, Mengkreasikan, Membangun portofolio.
            </div>
          </div>
        </div>
      </div>

      {/* KEBIJAKAN SUMBER PUSTAKA & MATERI PEMBELAJARAN AUTENTIK */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <BookCheck className="w-5 h-5 text-red-700" />
          Kaidah Kebenaran Sumber Pustaka & Keselarasan Materi Pembelajaran
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
          Dalam penyusunan RPS pada Program Studi Ilmu Keolahragaan FKIP Universitas Muhammadiyah Palu, seluruh materi perkuliahan pada pertemuan 1 hingga 16 <b>harus bersumber langsung secara nyata dari daftar pustaka terverifikasi</b>, bukan hasil rekaan atau judul fiktif.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-700" /> 1. Buku Teks Ber-ISBN Resmi
            </div>
            <p className="text-slate-600 leading-relaxed">
              Buku teks utama wajib berasal dari penerbit bereputasi internasional maupun nasional (misal: Human Kinetics, McGraw-Hill, Pearson, Wolters Kluwer, Rajawali Pers, dsb.) dengan identitas penulis dan tahun terbit yang valid.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-red-700" /> 2. Artikel Jurnal Terakreditasi
            </div>
            <p className="text-slate-600 leading-relaxed">
              Memasukkan artikel jurnal ilmiah mutakhir (5-10 tahun terakhir) terindeks SINTA atau Scopus bidang keolahragaan, kepelatihan, atau biomekanika untuk memperkaya diskusi ilmiah berbasis bukti (evidence-based practice).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-red-700" /> 3. E-Book & Manual Federasi Resmi
            </div>
            <p className="text-slate-600 leading-relaxed">
              Menggunakan handbook dan buku peraturan resmi dari induk organisasi olahraga internasional (seperti FIBA, FIFA, FIVB, World Athletics, ACSM, NSCA, WABC) untuk menjamin akurasi materi regulasi dan perwasitan.
            </p>
          </div>
        </div>
      </div>

      {/* SIKLUS PPEPP */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-red-700" />
          Siklus SPMI / PPEPP Kurikulum OBE IKOR
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Siklus Penjaminan Mutu Internal (PPEPP) memastikan setiap tahapan kurikulum terukur, terkendali, dan terus berkembang (Continuous Quality Improvement).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-extrabold text-slate-200">1</div>
            <div className="text-xs font-bold text-red-700 uppercase mb-1">Penetapan</div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Perumusan Dokumen</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menetapkan Profil Lulusan, CPL, Bahan Kajian, Struktur MK, SKS, CPMK, Sub-CPMK (C2-C6), dan Sistem Asesmen OBE.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-extrabold text-slate-200">2</div>
            <div className="text-xs font-bold text-red-700 uppercase mb-1">Pelaksanaan</div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Pembelajaran Terpadu</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Melaksanakan 16 pertemuan sesuai RPS dengan pendekatan aktif: Case Method, Project-Based Learning, dan Sport Science.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-extrabold text-slate-200">3</div>
            <div className="text-xs font-bold text-red-700 uppercase mb-1">Evaluasi</div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Asesmen Ketercapaian</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mengukur ketercapaian CPL & CPMK melalui portofolio, rubrik kognitif (SC 1-10), rubrik proyek (SC 11-14), dan evaluasi sumatif UTS/UAS.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-extrabold text-slate-200">4</div>
            <div className="text-xs font-bold text-red-700 uppercase mb-1">Pengendalian</div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Audit & Tindak Lanjut</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menindaklanjuti ketidaksesuaian melalui Gugus Mutu prodi, berita acara monitoring, dan rencana tindakan korektif.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-extrabold text-slate-200">5</div>
            <div className="text-xs font-bold text-red-700 uppercase mb-1">Peningkatan</div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Continuous Quality (CQI)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pembaruan berkala RPS, pengayaan bahan kajian sport digital media & AI, serta adaptasi kebutuhan industri keolahragaan modern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
