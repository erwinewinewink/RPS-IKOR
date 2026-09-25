import { MataKuliah, DAFTAR_CPL, IDENTITAS_PRODI } from '../data/curriculumDatabase';
import { RPSDocument, CPMKItem, SubCPMKItem, JadwalMingguan } from '../types/rps';
import { SAMPLE_RPS_BOLA_BASKET } from '../data/rpsSampleBasket';
import { SAMPLE_RPS_ANATOMI } from '../data/rpsSampleAnatomi';
import { getVerifiedSourcesForCourse } from '../data/verifiedBibliography';

// Generator RPS Cerdas berbasis OBE dengan Taksonomi Bloom Kognitif C2 - C6 & Pustaka Terverifikasi
export function generateSmartRPS(mk: MataKuliah, options?: {
  dosenPengembang?: string;
  koordinatorMK?: string;
  tahunAkademik?: string;
  catatanKhusus?: string;
}): RPSDocument {
  const lowerName = mk.nama.toLowerCase();
  const catatan = (options?.catatanKhusus || '').trim();
  
  let effectiveTopik = mk.nama;
  if (lowerName.includes('akuatik') || lowerName.includes('renang')) {
    effectiveTopik = 'Renang Kolam';
  } else if (lowerName.includes('senam')) {
    effectiveTopik = 'Senam Lantai';
  }
  
  const topikTeks = catatan ? `${effectiveTopik} (${catatan})` : effectiveTopik;

  // Jika mata kuliah adalah Bola Basket tanpa catatan khusus, kembalikan master template persis sesuai acuan dokumen resmi
  if (!catatan && (lowerName.includes('basket') || mk.kode === 'SOR2026009')) {
    return {
      ...SAMPLE_RPS_BOLA_BASKET,
      id: `rps-${mk.kode.toLowerCase().replace(/\s+/g, '-')}`,
      dosenPengembang: 'Erwin Zainuddin, S.Pd., M.Pd.',
      koordinatorMK: '',
      tahunAkademik: options?.tahunAkademik || '2026/2027',
      catatanFokusKhusus: '',
      updatedAt: new Date().toISOString().split('T')[0]
    };
  }

  // Jika mata kuliah adalah Anatomi tanpa catatan khusus
  if (!catatan && (lowerName.includes('anatomi') || mk.kode === 'SS2026005')) {
    return {
      ...SAMPLE_RPS_ANATOMI,
      id: `rps-${mk.kode.toLowerCase().replace(/\s+/g, '-')}`,
      dosenPengembang: 'Erwin Zainuddin, S.Pd., M.Pd.',
      koordinatorMK: '',
      tahunAkademik: options?.tahunAkademik || '2026/2027',
      catatanFokusKhusus: '',
      updatedAt: new Date().toISOString().split('T')[0]
    };
  }

  // Ambil referensi pustaka ilmiah yang terverifikasi (Buku ber-ISBN, Jurnal terakreditasi, E-Book resmi)
  const sources = getVerifiedSourcesForCourse(mk.nama);

  // CPL Prodi yang dibebankan
  const cplList = mk.cpl && mk.cpl.length > 0 ? mk.cpl : ['CPL 1', 'CPL 3', 'CPL 7', 'CPL 8'];

  // Bentuk 4 CPMK bertingkat (Bloom C2 s/d C6)
  const cpmkList: CPMKItem[] = [
    {
      kode: 'CPMK 1',
      deskripsi: `Mahasiswa mampu menunjukkan integritas sikap religius, disiplin, dan sportivitas yang menginternalisasi nilai-nilai Al-Islam dan Kemuhammadiyahan dalam perkuliahan ${topikTeks}.`,
      cplTerkait: [cplList[0] || 'CPL 1']
    },
    {
      kode: 'CPMK 2',
      deskripsi: `Mahasiswa mampu memahami dan menguasai konsep teoritis, prinsip biomekanika/fisiologis gerak manusia, serta metodologi terpadu dalam mata kuliah ${topikTeks}.`,
      cplTerkait: [cplList[1] || 'CPL 3']
    },
    {
      kode: 'CPMK 3',
      deskripsi: `Mahasiswa mampu menerapkan analisis taktis/teknis, berpikir kritis-sistematis, dan memecahkan permasalahan empiris keolahragaan pada mata kuliah ${topikTeks}.`,
      cplTerkait: [cplList[2] || 'CPL 7']
    },
    {
      kode: 'CPMK 4',
      deskripsi: `Mahasiswa mampu memanfaatkan teknologi sport analytics digital, instrumen evaluasi, dan data ilmiah untuk merancang program latihan/inovasi dalam ${topikTeks}.`,
      cplTerkait: [cplList[3] || 'CPL 8']
    }
  ];

  // Rumusan 14 Sub-CPMK bertingkat Bloom Kognitif C2 - C6 (Pola Tangga Terstruktur):
  // Sub-CPMK 1 - 3  : Level C2 -> CPMK 1 (Pemahaman, Regulasi, Etika Sportivitas & Keislaman)
  // Sub-CPMK 4 - 7  : Level C3 -> CPMK 2 (Penerapan Biomekanika Gerak Fundamental & Kebugaran Spesifik)
  // Sub-CPMK 8 - 9  : Level C4 -> CPMK 3 (Analisis Kesalahan Gerak & Taktik Permainan)
  // Sub-CPMK 10 - 11: Level C5 -> CPMK 3 (Evaluasi Taktis & Evaluasi Pengukuran Atlet)
  // Sub-CPMK 12     : Level C5 -> CPMK 4 (Evaluasi Sport Analytics & Data Digital)
  // Sub-CPMK 13 - 14: Level C6 -> CPMK 4 (Kreasi Perancangan Latihan & Portofolio Kepelatihan)
  const subCpmkList: SubCPMKItem[] = [
    {
      kode: 'Sub-CPMK 1',
      deskripsi: `Mahasiswa mampu menjelaskan sejarah, sarana prasarana, regulasi resmi, serta filosofi etika sportivitas dan keislaman dalam ${topikTeks}`,
      cpmkTerkait: 'CPMK 1',
      levelKognitif: 'C2'
    },
    {
      kode: 'Sub-CPMK 2',
      deskripsi: `Mahasiswa mampu menguraikan filosofi keilmuan dan konsep dasar bermain ${topikTeks} serta penanaman karakter disiplin`,
      cpmkTerkait: 'CPMK 1',
      levelKognitif: 'C2'
    },
    {
      kode: 'Sub-CPMK 3',
      deskripsi: `Mahasiswa mampu menjelaskan prinsip keselamatan, etika fair play, dan penghormatan terhadap perangkat pertandingan ${topikTeks}`,
      cpmkTerkait: 'CPMK 1',
      levelKognitif: 'C2'
    },
    {
      kode: 'Sub-CPMK 4',
      deskripsi: `Mahasiswa mampu menguraikan biomekanika gerak fundamental dan mempraktikkan teknik dasar ${topikTeks} secara efisien`,
      cpmkTerkait: 'CPMK 2',
      levelKognitif: 'C3'
    },
    {
      kode: 'Sub-CPMK 5',
      deskripsi: `Mahasiswa mampu mempraktikkan variasi teknik lanjutan dan koordinasi gerak ${topikTeks} dengan mekanika yang benar`,
      cpmkTerkait: 'CPMK 2',
      levelKognitif: 'C3'
    },
    {
      kode: 'Sub-CPMK 6',
      deskripsi: `Mahasiswa mampu menerapkan pola penyerangan dasar dan pertahanan dasar dalam simulasi permainan ${topikTeks}`,
      cpmkTerkait: 'CPMK 2',
      levelKognitif: 'C3'
    },
    {
      kode: 'Sub-CPMK 7',
      deskripsi: `Mahasiswa mampu menggunakan instrumen tes dan pengukuran olahraga spesifik untuk mendata parameter kebugaran atau keterampilan dalam ${topikTeks}`,
      cpmkTerkait: 'CPMK 2',
      levelKognitif: 'C3'
    },
    {
      kode: 'Sub-CPMK 8',
      deskripsi: `Mahasiswa mampu menganalisis kesalahan gerak anatomis dan kinematika dari teknik yang dilakukan rekan sejawat pada mata kuliah ${topikTeks}`,
      cpmkTerkait: 'CPMK 3',
      levelKognitif: 'C4'
    },
    {
      kode: 'Sub-CPMK 9',
      deskripsi: `Mahasiswa mampu menelaah kelebihan dan kelemahan berbagai formasi taktik serta skema transisi permainan dalam situasi nyata ${topikTeks}`,
      cpmkTerkait: 'CPMK 3',
      levelKognitif: 'C4'
    },
    {
      kode: 'Sub-CPMK 10',
      deskripsi: `Mahasiswa mampu menilai efektivitas strategi, kepelatihan, dan pengambilan keputusan di lapangan melalui observasi video pertandingan ${topikTeks}`,
      cpmkTerkait: 'CPMK 3',
      levelKognitif: 'C5'
    },
    {
      kode: 'Sub-CPMK 11',
      deskripsi: `Mahasiswa mampu mengevaluasi kemajuan performa fisik dan penguasaan teknik individu berdasarkan hasil pengukuran pre-test & post-test ${topikTeks}`,
      cpmkTerkait: 'CPMK 3',
      levelKognitif: 'C5'
    },
    {
      kode: 'Sub-CPMK 12',
      deskripsi: `Mahasiswa mampu menganalisis dan menyimpulkan data rekam jejak digital serta statistik performa atlet menggunakan peranti sport analytics dalam ${topikTeks}`,
      cpmkTerkait: 'CPMK 4',
      levelKognitif: 'C5'
    },
    {
      kode: 'Sub-CPMK 13',
      deskripsi: `Mahasiswa mampu merancang program latihan fisik dan teknik (drill) secara sistematis untuk satu siklus mikro persiapan kompetisi ${topikTeks}`,
      cpmkTerkait: 'CPMK 4',
      levelKognitif: 'C6'
    },
    {
      kode: 'Sub-CPMK 14',
      deskripsi: `Mahasiswa mampu menyusun laporan analisis performa dan portofolio kepelatihan modern berbasis data sport analytics digital sesuai kaidah akademik`,
      cpmkTerkait: 'CPMK 4',
      levelKognitif: 'C6'
    }
  ];

  // Matriks Korelasi Sub-CPMK ke CPMK (Pola Tangga Menurun Terstruktur C2 s.d C6)
  const korelasiMatriks: Record<string, boolean> = {
    'Sub-CPMK 1-CPMK 1': true,
    'Sub-CPMK 2-CPMK 1': true,
    'Sub-CPMK 3-CPMK 1': true,
    'Sub-CPMK 4-CPMK 2': true,
    'Sub-CPMK 5-CPMK 2': true,
    'Sub-CPMK 6-CPMK 2': true,
    'Sub-CPMK 7-CPMK 2': true,
    'Sub-CPMK 8-CPMK 3': true,
    'Sub-CPMK 9-CPMK 3': true,
    'Sub-CPMK 10-CPMK 3': true,
    'Sub-CPMK 11-CPMK 3': true,
    'Sub-CPMK 12-CPMK 4': true,
    'Sub-CPMK 13-CPMK 4': true,
    'Sub-CPMK 14-CPMK 4': true,
    'CPMK 1-Sub-CPMK 1': true,
    'CPMK 1-Sub-CPMK 2': true,
    'CPMK 1-Sub-CPMK 3': true,
    'CPMK 2-Sub-CPMK 4': true,
    'CPMK 2-Sub-CPMK 5': true,
    'CPMK 2-Sub-CPMK 6': true,
    'CPMK 2-Sub-CPMK 7': true,
    'CPMK 3-Sub-CPMK 8': true,
    'CPMK 3-Sub-CPMK 9': true,
    'CPMK 3-Sub-CPMK 10': true,
    'CPMK 3-Sub-CPMK 11': true,
    'CPMK 4-Sub-CPMK 12': true,
    'CPMK 4-Sub-CPMK 13': true,
    'CPMK 4-Sub-CPMK 14': true
  };

  // Bahan Kajian: Materi Besar / Pokok Bahasan Keilmuan (7 Pokok Bahasan Utama)
  const bahanKajian: string[] = [
    `1. Pengantar, Sejarah Perkembangan, Regulasi Resmi, dan Nilai Sportivitas/Etika Keilmuan ${topikTeks}.`,
    `2. Landasan Konseptual, Fisiologi, dan Biomekanika Gerak Fundamental ${topikTeks}.`,
    `3. Variasi Keterampilan Teknik Lanjutan, Pola Koordinasi Gerak, dan Efisiensi Kinematika.`,
    `4. Teori dan Praktik Taktik, Strategi Permainan, Kerjasama Tim, dan Analisis Situasi Pertandingan.`,
    `5. Parameter Fisiologi Olahraga, Agilitas, Daya Ledak, dan Pembinaan Kondisi Fisik Spesifik.`,
    `6. Metodologi Kepelatihan Terpadu, Manajemen Tim, dan Regulasi Perwasitan Resmi.`,
    `7. Sport Analytics Digital, Analisis Video Pertandingan, dan Evaluasi Performa Atlet.`
  ];

  // Materi Pembelajaran 1 s/d 16 yang sinkron dengan sumber kepustakaan
  const materiPembelajaran: string[] = [
    `1. Sejarah perkembangan ${topikTeks} dunia & nasional; regulasi federasi resmi; nilai sportivitas & etika Al-Islam.`,
    `2. Analisis biomekanik gerak fundamental tubuh dan koordinasi kinetik pada teknik ${topikTeks}.`,
    `3. Mekanika teknik lanjutan, footwork, sudut tolakan, dan timing pelepasan beban/alat.`,
    `4. Praktik lapangan unjuk kerja teknik dasar dan ball handling/drill teknik terstruktur di bawah bimbingan instruktur.`,
    `5. Konsep kerjasama taktik menyerang & prinsip pertahanan terorganisir dengan implementasi teknik dasar.`,
    `6. Komponen kondisi fisik dominan: power eksplosif, kelincahan (agility), dan kapasitas anaerobik dalam praktik teknik dasar.`,
    `7. Analisis sistem formasi permainan tim serta respons terhadap variasi formasi lawan dengan integrasi teknik dasar.`,
    `8. Evaluasi tengah semester tertulis dan unjuk keterampilan teknik dasar (materi pertemuan 1 s.d 7).`,
    `9. Pola transisi cepat, set plays situasi khusus, dan manajemen waktu pertandingan melalui penguasaan teknik dasar.`,
    `10. Teori kepelatihan olahraga, periodisasi latihan fisik-teknik, dan psikologi atlet muda dalam penguasaan teknik dasar.`,
    `11. Pemanfaatan perangkat lunak video analisis untuk evaluasi gerak teknik dasar dan taktik tim.`,
    `12. Mekanisme perwasitan resmi, sinyal wasit, penegakan regulasi, dan praktik memimpin laga dengan teknik dasar.`,
    `13. Pengolahan data statistik box score / tracking data berbasis aplikasi sport digital terkait efektivitas teknik dasar.`,
    `14. Penyusunan program latihan mingguan (microcycle) berbasis bukti ilmiah sport science termasuk penguasaan teknik dasar.`,
    `15. Pembuatan portofolio digital modul latihan dan analisis video evaluasi performa teknik dasar.`,
    `16. Evaluasi akhir semester komprehensif; ujian tertulis taktik dan ujian kepelatihan/analisis portofolio teknik dasar.`
  ];

  // Jadwal 16 Pertemuan
  const waktuFormat = `${mk.sks * 50}`;
  const mingguan: JadwalMingguan[] = [
    {
      minggu: 1,
      subCpmk: 'Sub-CPMK 1',
      materi: materiPembelajaran[0],
      metode: 'Ceramah interaktif, diskusi, tanya jawab',
      waktu: waktuFormat,
      pengalamanBelajar: 'Mendiskusikan sejarah, aturan resmi, dan nilai sportivitas islami.',
      indikator: 'Ketepatan menjelaskan regulasi resmi dan filosofi keilmuan.',
      teknikPenilaian: 'Observasi & Partisipasi Aktif',
      bobot: 5
    },
    {
      minggu: 2,
      subCpmk: 'Sub-CPMK 2',
      materi: materiPembelajaran[1],
      metode: 'Ceramah interaktif, diskusi, inquiry',
      waktu: waktuFormat,
      pengalamanBelajar: 'Mengkaji sudut kinetik dan biomekanika teknik fundamental.',
      indikator: 'Kesesuaian menerangkan prinsip biomekanika gerak dasar.',
      teknikPenilaian: 'Tugas Terstruktur',
      bobot: 6
    },
    {
      minggu: 3,
      subCpmk: 'Sub-CPMK 3',
      materi: materiPembelajaran[2],
      metode: 'Ceramah, Diskusi',
      waktu: waktuFormat,
      pengalamanBelajar: 'Menganalisis variasi teknik lanjutan dan koordinasi tubuh.',
      indikator: 'Akurasi menjelaskan variasi teknik lanjutan.',
      teknikPenilaian: 'Tugas Terstruktur',
      bobot: 6
    },
    {
      minggu: 4,
      subCpmk: 'Sub-CPMK 4',
      materi: materiPembelajaran[3],
      metode: 'Praktikum Lapangan',
      waktu: waktuFormat,
      pengalamanBelajar: 'Mempraktikkan teknik dasar secara terstruktur di lapangan.',
      indikator: 'Ketepatan mempraktikkan keterampilan teknis fundamental.',
      teknikPenilaian: 'Penilaian Unjuk Kerja',
      bobot: 6
    },
    {
      minggu: 5,
      subCpmk: 'Sub-CPMK 5',
      materi: materiPembelajaran[4],
      metode: 'Praktikum Lapangan',
      waktu: waktuFormat,
      pengalamanBelajar: 'Menerapkan pola taktik dasar dalam simulasi permainan terkontrol.',
      indikator: 'Akurasi penerapan taktik dan kerjasama tim.',
      teknikPenilaian: 'Penilaian Unjuk Kerja',
      bobot: 6
    },
    {
      minggu: 6,
      subCpmk: 'Sub-CPMK 6',
      materi: materiPembelajaran[5],
      metode: 'Praktikum Lapangan',
      waktu: waktuFormat,
      pengalamanBelajar: 'Melakukan latihan fisik spesifik, agilitas, dan daya tahan.',
      indikator: 'Kesesuaian menelaah kondisi fisik spesifik keolahragaan.',
      teknikPenilaian: 'Unjuk Kerja & Tes Fisik',
      bobot: 6
    },
    {
      minggu: 7,
      subCpmk: 'Sub-CPMK 7',
      materi: materiPembelajaran[6],
      metode: 'Analisis Kasus, Diskusi',
      waktu: waktuFormat,
      pengalamanBelajar: 'Menganalisis skema penyerangan dan pertahanan tim lawan.',
      indikator: 'Ketajaman menganalisis formasi taktik di lapangan.',
      teknikPenilaian: 'Tugas Analisis Kelompok',
      bobot: 5
    },
    {
      minggu: 8,
      subCpmk: 'UTS (Evaluasi Sub-CPMK 1–7)',
      materi: materiPembelajaran[7],
      metode: 'Ujian Tulis & Praktik Terstruktur',
      waktu: waktuFormat,
      pengalamanBelajar: 'Mengerjakan soal evaluasi tertulis dan analisis studi kasus.',
      indikator: 'Tingkat penguasaan konsep, analisis gerak, dan pemecahan kasus.',
      teknikPenilaian: 'Tes Tertulis UTS',
      bobot: 15
    },
    {
      minggu: 9,
      subCpmk: 'Sub-CPMK 8',
      materi: materiPembelajaran[8],
      metode: 'Analisis Kasus, Diskusi',
      waktu: waktuFormat,
      pengalamanBelajar: 'Menganalisis skema situasi khusus dan transisi permainan.',
      indikator: 'Kedalaman menelaah transisi taktik dan antisipasi.',
      teknikPenilaian: 'Tugas Analisis Kasus',
      bobot: 5
    },
    {
      minggu: 10,
      subCpmk: 'Sub-CPMK 9',
      materi: materiPembelajaran[9],
      metode: 'Analisis Kasus, Diskusi',
      waktu: waktuFormat,
      pengalamanBelajar: 'Mengkaji prinsip kepelatihan olahraga dan manajemen tim.',
      indikator: 'Ketepatan memerinci metodologi kepelatihan terstruktur.',
      teknikPenilaian: 'Tugas Analisis Kepelatihan',
      bobot: 5
    },
    {
      minggu: 11,
      subCpmk: 'Sub-CPMK 10',
      materi: materiPembelajaran[10],
      metode: 'Praktikum Digital',
      waktu: waktuFormat,
      pengalamanBelajar: 'Mengevaluasi cuplikan pertandingan menggunakan video analisis.',
      indikator: 'Ketajaman menilai performa dan taktik via video digital.',
      teknikPenilaian: 'Tugas Video Analisis',
      bobot: 5
    },
    {
      minggu: 12,
      subCpmk: 'Sub-CPMK 11',
      materi: materiPembelajaran[11],
      metode: 'Praktikum Lapangan',
      waktu: waktuFormat,
      pengalamanBelajar: 'Simulasi memimpin pertandingan dan menegakkan regulasi resmi.',
      indikator: 'Kemampuan mengevaluasi penerapan aturan perwasitan.',
      teknikPenilaian: 'Praktik Simulasi Perwasitan',
      bobot: 5
    },
    {
      minggu: 13,
      subCpmk: 'Sub-CPMK 12',
      materi: materiPembelajaran[12],
      metode: 'Project Based Learning',
      waktu: waktuFormat,
      pengalamanBelajar: 'Mengolah dan menginterpretasikan data statistik pertandingan.',
      indikator: 'Ketepatan menyimpulkan data statistik berbasis digital.',
      teknikPenilaian: 'Laporan Analisis Data Digital',
      bobot: 5
    },
    {
      minggu: 14,
      subCpmk: 'Sub-CPMK 13',
      materi: materiPembelajaran[13],
      metode: 'Project Based Learning',
      waktu: waktuFormat,
      pengalamanBelajar: 'Menyusun draf program latihan mingguan (microcycle).',
      indikator: 'Kesesuaian merancang skema latihan berbasis sport science.',
      teknikPenilaian: 'Produk Skema Latihan Taktik',
      bobot: 5
    },
    {
      minggu: 15,
      subCpmk: 'Sub-CPMK 14',
      materi: materiPembelajaran[14],
      metode: 'Project Based Learning',
      waktu: waktuFormat,
      pengalamanBelajar: 'Menyusun portofolio digital modul latihan dan analisis video.',
      indikator: 'Keberhasilan menyusun portofolio kepelatihan yang komprehensif.',
      teknikPenilaian: 'Portofolio Kepelatihan Terpadu',
      bobot: 10
    },
    {
      minggu: 16,
      subCpmk: 'UAS (Evaluasi Sub-CPMK 8–14)',
      materi: materiPembelajaran[15],
      metode: 'Ujian Sumatif Komprehensif',
      waktu: waktuFormat,
      pengalamanBelajar: 'Menyajikan pertanggungjawaban portofolio dan mengikuti evaluasi komprehensif.',
      indikator: 'Penguasaan sintesis akhir, kepelatihan, analisis data, dan portofolio.',
      teknikPenilaian: 'Evaluasi Sumatif Komprehensif (UAS)',
      bobot: 15
    }
  ];

  return {
    id: `rps-${mk.kode.toLowerCase().replace(/\s+/g, '-')}`,
    tanggalPenyusunan: '10 Februari 2026',
    tahunAkademik: options?.tahunAkademik || '2026/2027',
    mataKuliah: mk.nama,
    kodeMK: mk.kode,
    sks: mk.sks,
    sksTeori: mk.sksTeori || 0,
    sksPraktek: mk.sksPraktek || mk.sks,
    semester: mk.semester,
    rumpunMK: `Mata Kuliah ${mk.kelompok} (Keilmuan Ilmu Keolahragaan)`,
    dosenPengampu: 'Erwin Zainuddin, S.Pd., M.Pd.',
    dosenPengembang: 'Erwin Zainuddin, S.Pd., M.Pd.',
    koordinatorMK: '',
    kaprodi: IDENTITAS_PRODI.kaprodi.nama,
    nidnKaprodi: IDENTITAS_PRODI.kaprodi.nidn,
    nputkKaprodi: IDENTITAS_PRODI.kaprodi.nputk,
    deskripsiMK: mk.deskripsi || `Mata kuliah ${mk.nama} merupakan mata kuliah yang mengkaji secara komprehensif mengenai teori, teknik dasar, analisis biomekanika gerak, metodologi kepelatihan, kondisi fisik, serta pemanfaatan teknologi sport analytics digital dalam ranah keolahragaan modern dengan menjunjung tinggi sportivitas dan nilai-nilai Al-Islam Kemuhammadiyahan.`,
    cplProdi: cplList,
    cpmk: cpmkList,
    subCpmk: subCpmkList,
    korelasiMatriks,
    bahanKajian,
    materiPembelajaran,
    pustakaUtama: sources.pustakaUtama,
    artikelJurnal: sources.artikelJurnal,
    pustakaPendukung: sources.pustakaPendukung,
    eBook: sources.eBook,
    pustakaOnline: sources.pustakaOnline,
    mingguan,
    komponenPenilaian: {
      kehadiran: 10,
      sikap: 20,
      tugas: 20,
      proyek: 20,
      uts: 15,
      uas: 15
    },
    rekapKomponen: [
      { no: 1, komponen: 'Aktivitas Partisipatif', bobot: 20, deskripsi: 'Keaktifan dan kontribusi mahasiswa dalam proses perkuliahan dan diskusi.' },
      { no: 2, komponen: 'Hasil Proyek (PjBL)', bobot: 30, deskripsi: 'Kualitas analisis studi kasus dan rancangan skema latihan taktik pertandingan.' },
      { no: 3, komponen: 'Penugasan (Tugas Terstruktur)', bobot: 20, deskripsi: 'Hasil penyelesaian tugas-tugas terstruktur mingguan (Sub-CPMK 1–10).' },
      { no: 4, komponen: 'UTS', bobot: 15, deskripsi: 'Evaluasi tertulis materi Pertemuan 1-7.' },
      { no: 5, komponen: 'UAS', bobot: 15, deskripsi: 'Evaluasi tertulis materi Pertemuan 8-15.' }
    ],
    rubrikTugasKognitif: {
      bobot: 20,
      subCpmkTarget: 'Sub-CPMK 1–10',
      pemetaan: [
        { no: 1, bentuk: `Analisis regulasi dan etika dasar ${mk.nama}`, subCpmk: 'SC 1', bobotDalamKomponen: 10 },
        { no: 2, bentuk: `Kajian biomekanika teknik fundamental ${mk.nama}`, subCpmk: 'SC 2', bobotDalamKomponen: 10 },
        { no: 3, bentuk: `Analisis variasi teknik lanjutan dan gerak tubuh`, subCpmk: 'SC 3', bobotDalamKomponen: 10 },
        { no: 4, bentuk: `Praktik unjuk kerja teknik di lapangan`, subCpmk: 'SC 4', bobotDalamKomponen: 10 },
        { no: 5, bentuk: `Kajian taktik dasar dan strategi bertanding`, subCpmk: 'SC 5', bobotDalamKomponen: 10 },
        { no: 6, bentuk: `Analisis kondisi fisik spesifik keolahragaan`, subCpmk: 'SC 6', bobotDalamKomponen: 10 },
        { no: 7, bentuk: `Kajian formasi strategi dan skema lawan`, subCpmk: 'SC 7', bobotDalamKomponen: 10 },
        { no: 8, bentuk: `Analisis transisi cepat dan situasi khusus`, subCpmk: 'SC 8', bobotDalamKomponen: 10 },
        { no: 9, bentuk: `Kajian kepelatihan dan manajemen tim modern`, subCpmk: 'SC 9', bobotDalamKomponen: 10 },
        { no: 10, bentuk: `Evaluasi performa taktik melalui video analisis`, subCpmk: 'SC 10', bobotDalamKomponen: 10 }
      ],
      kriteria: [
        {
          aspek: 'Pemahaman konsep',
          skor90_100: 'Sangat tepat dan mendalam',
          skor80_89: 'Tepat',
          skor70_79: 'Cukup tepat',
          skor60_69: 'Banyak kekeliruan',
          skor1_59: 'Tidak menguasai'
        },
        {
          aspek: 'Identifikasi',
          skor90_100: 'Sangat tepat dan lengkap',
          skor80_89: 'Tepat',
          skor70_79: 'Cukup tepat',
          skor60_69: 'Banyak kesalahan',
          skor1_59: 'Tidak mampu'
        },
        {
          aspek: 'Penerapan',
          skor90_100: 'Sangat tepat dan presisi',
          skor80_89: 'Tepat',
          skor70_79: 'Cukup',
          skor60_69: 'Kurang tepat',
          skor1_59: 'Tidak mampu'
        },
        {
          aspek: 'Analisis',
          skor90_100: 'Sangat kritis dan mendalam',
          skor80_89: 'Baik dan logis',
          skor70_79: 'Cukup',
          skor60_69: 'Terbatas',
          skor1_59: 'Tidak mampu'
        },
        {
          aspek: 'Pemecahan masalah',
          skor90_100: 'Sangat relevan dan aplikatif',
          skor80_89: 'Relevan',
          skor70_79: 'Cukup relevan',
          skor60_69: 'Kurang tepat',
          skor1_59: 'Tidak memberikan solusi'
        }
      ]
    },
    rubrikProyek: {
      judul: `Analisis Video Performa Taktik Pertandingan dan Perancangan Skema Latihan ${mk.nama}`,
      metode: 'Project-Based Learning',
      subCpmkTarget: 'Khusus Sub-CPMK 11–14',
      bobot: 20,
      pemetaan: [
        { no: 1, aspek: `Evaluasi penerapan regulasi perwasitan dan etika memimpin laga`, subCpmk: 'SC 11', bobotDalamProyek: 25 },
        { no: 2, aspek: `Ketepatan analisis data statistik performa pertandingan digital`, subCpmk: 'SC 12', bobotDalamProyek: 20 },
        { no: 3, aspek: `Ketajaman perancangan skema latihan periodisasi dan video analisis`, subCpmk: 'SC 13', bobotDalamProyek: 25 },
        { no: 4, aspek: `Kualitas portofolio kepelatihan dan modul latihan modern`, subCpmk: 'SC 14', bobotDalamProyek: 20 },
        { no: 5, aspek: `Kualitas presentasi, komunikasi, dan pertanggungjawaban ilmiah`, subCpmk: 'SC 14', bobotDalamProyek: 10 }
      ],
      kriteria: [
        {
          aspek: 'Analisis risiko',
          skor90_100: 'Sangat kritis, lengkap, berbasis bukti empiris sport science',
          skor80_89: 'Baik dan sistematis',
          skor70_79: 'Cukup',
          skor60_69: 'Terbatas',
          skor1_59: 'Tidak mampu menganalisis'
        },
        {
          aspek: 'Analisis taktis',
          skor90_100: 'Sangat tepat dan komprehensif',
          skor80_89: 'Tepat',
          skor70_79: 'Cukup tepat',
          skor60_69: 'Banyak kekurangan',
          skor1_59: 'Tidak mampu membedakan'
        },
        {
          aspek: 'Kritik kasus',
          skor90_100: 'Sangat kritis, logis, berbasis bukti data statistik digital',
          skor80_89: 'Kritis dan logis',
          skor70_79: 'Cukup kritis',
          skor60_69: 'Terbatas',
          skor1_59: 'Tidak mampu mengkritik'
        },
        {
          aspek: 'Strategi kepelatihan',
          skor90_100: 'Sangat relevan, inovatif, dan aplikatif di lapangan',
          skor80_89: 'Relevan dan aplikatif',
          skor70_79: 'Cukup relevan',
          skor60_69: 'Kurang tepat',
          skor1_59: 'Tidak memberikan solusi'
        },
        {
          aspek: 'Laporan & presentasi',
          skor90_100: 'Sangat sistematis, komunikatif, dan profesional',
          skor80_89: 'Baik dan sistematis',
          skor70_79: 'Cukup',
          skor60_69: 'Kurang sistematis',
          skor1_59: 'Tidak memenuhi standar'
        }
      ]
    },
    rubrikUts: {
      bobot: 15,
      materi: 'Sub-CPMK 1–7 (Materi Pertemuan 1 s.d 7)',
      aspek: [
        { nama: `Regulasi resmi, etika kompetisi, dan filosofi ${mk.nama}`, bobot: 20 },
        { nama: 'Biomekanika teknik fundamental dan efisiensi gerak', bobot: 20 },
        { nama: 'Praktik teknik individu dan unjuk kerja keterampilan', bobot: 20 },
        { nama: 'Taktik dasar penyerangan dan sistem pertahanan', bobot: 20 },
        { nama: 'Kondisi fisik spesifik dan analisis formasi di lapangan', bobot: 20 }
      ],
      kriteria: [
        { rentang: '90–100', kriteria: 'Penguasaan materi sangat baik, jawaban tepat, lengkap, dan mampu menganalisis taktik/biomekanika secara komprehensif.' },
        { rentang: '80–89', kriteria: 'Penguasaan materi baik dengan sedikit kesalahan teknis.' },
        { rentang: '70–79', kriteria: 'Penguasaan cukup tetapi terdapat beberapa kesalahan konsep taktik.' },
        { rentang: '60–69', kriteria: 'Penguasaan masih terbatas dan kurang mendalam.' },
        { rentang: '1–59', kriteria: 'Belum menguasai materi yang diujikan.' }
      ]
    },
    rubrikUas: {
      bobot: 15,
      materi: 'Sub-CPMK 8–14 (Materi Pertemuan 9 s.d 15)',
      aspek: [
        { nama: 'Situasi transisi permainan cepat dan skema khusus', bobot: 20 },
        { nama: 'Metodologi kepelatihan dan manajemen tim olahraga', bobot: 20 },
        { nama: 'Penilaian performa taktik melalui video analisis digital', bobot: 20 },
        { nama: 'Regulasi perwasitan dan simulasi memimpin pertandingan', bobot: 20 },
        { nama: 'Kualitas perancangan skema latihan periodisasi dan portofolio', bobot: 20 }
      ],
      kriteria: [
        { rentang: '90–100', kriteria: `Mampu menerapkan dan menganalisis strategi ${mk.nama} secara sangat tepat, logis, sistematis, dan berbasis sport analytics.` },
        { rentang: '80–89', kriteria: 'Mampu menerapkan dan menganalisis dengan baik.' },
        { rentang: '70–79', kriteria: 'Mampu menerapkan konsep tetapi analisis taktik masih terbatas.' },
        { rentang: '60–69', kriteria: 'Penguasaan dan penerapan masih rendah.' },
        { rentang: '1–59', kriteria: `Belum mampu menerapkan dan menganalisis konsep ${mk.nama} modern.` }
      ]
    },
    catatanFokusKhusus: catatan,
    updatedAt: new Date().toISOString().split('T')[0]
  };
}
