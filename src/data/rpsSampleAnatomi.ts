import { RPSDocument } from '../types/rps';

export const SAMPLE_RPS_ANATOMI: RPSDocument = {
  id: 'rps-ss2026005-anatomi',
  tanggalPenyusunan: '8 Agustus 2026',
  tahunAkademik: '2026/2027',
  mataKuliah: 'ANATOMI',
  kodeMK: 'SS2026005',
  sks: 3,
  semester: 1,
  rumpunMK: 'Mata Kuliah Wajib Keilmuan Prodi (Sport Science Dasar)',
  dosenPengampu: 'Erwin Zainuddin, S.Pd., M.Pd.',
  dosenPengembang: 'Erwin Zainuddin, S.Pd., M.Pd.',
  koordinatorMK: '',
  kaprodi: 'Erwin Zainuddin, S.Pd., M.Pd.',
  nidnKaprodi: '1623129201',
  nputkKaprodi: '4555770671130273',
  deskripsiMK: 'Mata kuliah Anatomi membahas struktur dan susunan tubuh manusia sebagai dasar dalam memahami fungsi gerak dan aktivitas fisik dalam bidang keolahragaan. Materi meliputi terminologi anatomi, posisi dan bidang tubuh, sistem rangka, persendian, otot, serta sistem tubuh yang berkaitan dengan gerak manusia. Mahasiswa diarahkan untuk mampu mengidentifikasi, menjelaskan, dan menganalisis struktur anatomi tubuh serta keterkaitannya dengan gerakan dan aktivitas olahraga. Pembelajaran dilaksanakan secara teoritis dan praktis melalui observasi, identifikasi struktur tubuh, diskusi, dan analisis gerak sehingga mahasiswa mampu menerapkan pengetahuan anatomi secara tepat dalam konteks pendidikan, latihan, kebugaran, dan aktivitas olahraga.',
  cplProdi: ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 7'],
  cpmk: [
    {
      kode: 'CPMK 1',
      deskripsi: 'Mahasiswa mampu mengidentifikasi istilah, posisi, bidang, dan sumbu anatomi serta struktur dasar sistem rangka, persendian, dan otot manusia sebagai dasar memahami sistem gerak dalam aktivitas olahraga.',
      cplTerkait: ['CPL 1', 'CPL 2']
    },
    {
      kode: 'CPMK 2',
      deskripsi: 'Mahasiswa mampu menjelaskan struktur dan fungsi tulang, persendian, dan otot serta keterkaitannya dalam sistem gerak manusia dan aktivitas olahraga berdasarkan prinsip anatomi.',
      cplTerkait: ['CPL 2', 'CPL 3']
    },
    {
      kode: 'CPMK 3',
      deskripsi: 'Mahasiswa mampu menerapkan konsep anatomi untuk menentukan keterlibatan tulang, persendian, dan kelompok otot pada berbagai gerakan dasar dan aktivitas olahraga secara tepat.',
      cplTerkait: ['CPL 3', 'CPL 7']
    },
    {
      kode: 'CPMK 4',
      deskripsi: 'Mahasiswa mampu menganalisis keterkaitan struktur dan fungsi tulang, persendian, dan otot dengan pola gerak dan teknik olahraga secara logis, kritis, sistematis, dan berbasis prinsip anatomi.',
      cplTerkait: ['CPL 7']
    }
  ],
  subCpmk: [
    { kode: 'Sub-CPMK 1', deskripsi: 'Mahasiswa mampu menyebutkan istilah dan konsep dasar anatomi manusia, termasuk posisi anatomis, arah, bidang, dan sumbu tubuh.', cpmkTerkait: 'CPMK 1' },
    { kode: 'Sub-CPMK 2', deskripsi: 'Mahasiswa mampu mengidentifikasi struktur utama sistem rangka manusia serta membedakan rangka aksial dan rangka apendikular.', cpmkTerkait: 'CPMK 1' },
    { kode: 'Sub-CPMK 3', deskripsi: 'Mahasiswa mampu mengidentifikasi jenis dan lokasi persendian serta kelompok otot utama yang berperan dalam sistem gerak manusia.', cpmkTerkait: 'CPMK 1' },
    { kode: 'Sub-CPMK 4', deskripsi: 'Mahasiswa mampu menjelaskan struktur dan fungsi tulang serta mengklasifikasikan tulang berdasarkan bentuk dan karakteristiknya.', cpmkTerkait: 'CPMK 2' },
    { kode: 'Sub-CPMK 5', deskripsi: 'Mahasiswa mampu menjelaskan struktur dan fungsi persendian serta mengklasifikasikan jenis persendian berdasarkan struktur dan kemampuan geraknya.', cpmkTerkait: 'CPMK 2' },
    { kode: 'Sub-CPMK 6', deskripsi: 'Mahasiswa mampu menjelaskan struktur dan fungsi otot rangka serta peran kelompok otot dalam menghasilkan gerakan tubuh.', cpmkTerkait: 'CPMK 2' },
    { kode: 'Sub-CPMK 7', deskripsi: 'Mahasiswa mampu menjelaskan keterkaitan struktur tulang, persendian, dan otot dalam mendukung sistem gerak manusia dan aktivitas olahraga.', cpmkTerkait: 'CPMK 2' },
    { kode: 'Sub-CPMK 8', deskripsi: 'Mahasiswa mampu menerapkan konsep anatomi untuk menentukan tulang dan persendian yang terlibat dalam gerakan ekstremitas atas pada aktivitas olahraga.', cpmkTerkait: 'CPMK 3' },
    { kode: 'Sub-CPMK 9', deskripsi: 'Mahasiswa mampu menerapkan konsep anatomi untuk menentukan tulang, persendian, dan kelompok otot yang terlibat dalam gerakan ekstremitas bawah dan batang tubuh.', cpmkTerkait: 'CPMK 3' },
    { kode: 'Sub-CPMK 10', deskripsi: 'Mahasiswa mampu mendemonstrasikan identifikasi struktur anatomi yang berperan dalam berbagai gerakan dasar olahraga secara tepat.', cpmkTerkait: 'CPMK 3' },
    { kode: 'Sub-CPMK 11', deskripsi: 'Mahasiswa mampu menerapkan konsep bidang dan sumbu gerak untuk mengidentifikasi jenis gerakan pada berbagai aktivitas olahraga.', cpmkTerkait: 'CPMK 3' },
    { kode: 'Sub-CPMK 12', deskripsi: 'Mahasiswa mampu menganalisis hubungan antara struktur tulang, persendian, dan kelompok otot dalam menghasilkan pola gerak manusia pada aktivitas olahraga.', cpmkTerkait: 'CPMK 4' },
    { kode: 'Sub-CPMK 13', deskripsi: 'Mahasiswa mampu menganalisis keterlibatan struktur anatomi dalam pelaksanaan teknik olahraga berdasarkan bidang, sumbu, persendian, dan kelompok otot yang bekerja.', cpmkTerkait: 'CPMK 4' },
    { kode: 'Sub-CPMK 14', deskripsi: 'Mahasiswa mampu menganalisis keterkaitan struktur dan fungsi anatomi dengan efektivitas gerak serta potensi risiko cedera dalam aktivitas olahraga berdasarkan prinsip anatomi.', cpmkTerkait: 'CPMK 4' }
  ],
  korelasiMatriks: {
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
    'CPMK 4-Sub-CPMK 14': true,
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
    'Sub-CPMK 14-CPMK 4': true
  },
  bahanKajian: [
    '1. Konsep Dasar, Istilah, Posisi, Bidang, dan Sumbu Gerak Anatomi Tubuh.',
    '2. Struktur, Fungsi, dan Klasifikasi Sistem Rangka Manusia (Aksial & Apendikular).',
    '3. Klasifikasi, Struktur, dan Rentang Gerak (ROM) Sistem Persendian Tubuh.',
    '4. Karakteristik, Struktur, dan Mekanisme Kontraksi Sistem Otot Rangka.',
    '5. Anatomi Fungsional Ekstremitas Atas, Ekstremitas Bawah, dan Batang Tubuh dalam Olahraga.',
    '6. Analisis Rantai Kinetik, Efektivitas Gerak, dan Pencegahan Cedera Olahraga.'
  ],
  materiPembelajaran: [
    'Pengertian dan ruang lingkup anatomi; posisi anatomis; istilah arah dan lokasi; bidang tubuh; sumbu tubuh; istilah gerak dasar manusia.',
    'Fungsi sistem rangka; rangka aksial dan apendikular; identifikasi tulang tengkorak, tulang belakang, tulang rusuk, gelang bahu, ekstremitas atas, gelang panggul, dan ekstremitas bawah.',
    'Pengenalan jenis dan lokasi persendian; kelompok otot utama tubuh; struktur dasar otot rangka; peran persendian dan otot dalam sistem gerak.',
    'Struktur dan bagian-bagian tulang; klasifikasi tulang berdasarkan bentuk; tulang panjang, pendek, pipih, dan tidak beraturan; fungsi tulang dalam menopang dan menghasilkan gerak.',
    'Pengertian dan klasifikasi persendian; sendi fibrosa, kartilaginosa, dan sinovial; struktur sendi; jenis gerakan dan rentang gerak persendian.',
    'Struktur otot rangka; karakteristik otot; kelompok otot utama; fungsi otot; kontraksi otot secara umum; peran otot dalam menghasilkan gerakan.',
    'Hubungan struktur dan fungsi tulang, persendian, dan otot; kerja sama komponen sistem gerak; peran sistem muskuloskeletal dalam aktivitas fisik dan olahraga.',
    'Anatomi bahu, lengan, siku, lengan bawah, dan tangan; tulang, persendian, dan kelompok otot yang terlibat dalam gerakan melempar, mendorong, menarik, mengayun, dan memukul.',
    'Anatomi panggul, paha, lutut, tungkai, pergelangan kaki, dan batang tubuh; struktur yang terlibat dalam berjalan, berlari, melompat, menendang, dan perubahan posisi tubuh.',
    'Penerapan konsep anatomi untuk menentukan tulang, persendian, dan kelompok otot yang bekerja pada gerakan dasar olahraga; identifikasi struktur anatomi melalui gambar, model, atau demonstrasi gerak.',
    'Bidang sagital, frontal, dan transversal; sumbu longitudinal, transversal, dan sagital; fleksi, ekstensi, abduksi, adduksi, rotasi, pronasi, supinasi, dan gerakan lainnya dalam aktivitas olahraga.',
    'Analisis keterkaitan tulang, persendian, dan kelompok otot dalam menghasilkan gerakan; hubungan struktur anatomi dengan fungsi gerak manusia.',
    'Analisis keterlibatan tulang, persendian, otot, bidang, dan sumbu gerak pada teknik olahraga; hubungan struktur dan fungsi anatomi dengan pelaksanaan teknik olahraga.',
    'Analisis faktor anatomi yang memengaruhi efektivitas gerak; hubungan struktur dan fungsi tubuh dengan pola gerak; identifikasi potensi risiko cedera berdasarkan prinsip anatomi.'
  ],
  pustakaUtama: [
    'Drake, R. L., Vogl, A. W., & Mitchell, A. W. M. (2024). Gray’s Anatomy for Students (5th ed.). Philadelphia: Elsevier.',
    'Betts, J. G., Young, K. A., Wise, J. A., Johnson, E., Poe, B., Kruse, D. H., Korol, O., Johnson, J. E., Womble, M., & DeSaix, P. (2022). Anatomy and Physiology 2e. Houston, TX: OpenStax, Rice University.',
    'Moore, K. L., Dalley, A. F., & Agur, A. M. R. (2018). Clinically Oriented Anatomy (8th ed.). Philadelphia: Wolters Kluwer.',
    'Tortora, G. J., & Derrickson, B. (2020). Principles of Anatomy and Physiology (15th Edition). Hoboken, NJ: John Wiley & Sons.',
    'Marieb, E. N., & Hoehn, K. (2019). Human Anatomy & Physiology (11th Edition). Boston: Pearson.',
    'Floyd, R. T. (2021). Manual of Structural Kinesiology (21st Edition). New York: McGraw-Hill Education.'
  ],
  artikelJurnal: [
    'Haryono, S., & Sugiarto. (2022). "Analisis Kinesiologis Otot Ekstensor dan Fleksor Tungkai Bawah pada Atlet Lompat Jauh." Jurnal Terapan Ilmu Keolahragaan, 7(1), 33-41.',
    'Putra, M. A., & Rahayu, T. (2021). "Identifikasi Morfologi Otot dan Persendian yang Berisiko Mengalami Sprain pada Aktivitas Olahraga Intensitas Tinggi." Jurnal Keolahragaan Indonesia, 11(2), 104-115.',
    'Wibowo, T., & Sukoco, P. (2023). "Karakteristik Ketebalan Otot Kuadrisep Femoris dan Korelasinya dengan Output Gaya Eksentrik pada Mahasiswa Olahraga." Jurnal Medikora, 22(1), 45-56.',
    'Santoso, B., & Setiawan, E. (2022). "Pemeriksaan Rentang Gerak Sendi (ROM) dan Fleksibilitas Otot Hamstring pada Atlet Cabang Bela Diri." Jurnal Sport Area, 7(3), 365-376.',
    'Iskandar, M., & Kusuma, D. (2020). "Kajian Anatomis Rantai Kinetik Bahu pada Atlet Lempar Lembing dalam Upaya Pencegahan Impingement Syndrome." Jurnal Kepelatihan Olahraga, 12(2), 98-109.',
    'Purnama, R., & Hartono. (2021). "Analisis Perubahan Sudut Sendi Lutut saat Pendaratan dan Korelasinya dengan Beban Ligamen Krusiatum Anterior (ACL)." Jurnal Ilmiah Keolahragaan, 9(1), 12-22.'
  ],
  pustakaPendukung: [
    'Netter, F. H. (2019). Atlas of Human Anatomy (7th Edition). Philadelphia: Elsevier.',
    'Saladin, K. S. (2020). Anatomy & Physiology: The Unity of Form and Function (9th ed.). New York: McGraw-Hill Education.',
    'Setiadi. (2018). Anatomi & Fisiologi Manusia untuk Mahasiswa Keolahragaan dan Kesehatan. Yogyakarta: Graha Ilmu.',
    'Dave, H. D., Shook, M., & Varacallo, M. A. (2023). Anatomy, Skeletal Muscle. Treasure Island, FL: StatPearls Publishing, NCBI Bookshelf.',
    'Hall, S. J. (2022). Basic Biomechanics (9th Edition). New York: McGraw-Hill Education.',
    'Kenney, W. L., Wilmore, J. H., & Costill, D. L. (2022). Physiology of Sport and Exercise (8th Edition). Champaign, IL: Human Kinetics.'
  ],
  pustakaOnline: [
    'Akses Buku Online OpenStax – Anatomy and Physiology 2e (https://openstax.org/details/books/anatomy-and-physiology-2e)',
    'NCBI Bookshelf – Anatomy, Skeletal Muscle (https://www.ncbi.nlm.nih.gov/books/NBK537236/)',
    'NCBI Bookshelf – Physiology, Skeletal Muscle'
  ],
  mediaPerangkatLunak: ['Aplikasi 3D Human Anatomy Atlas', 'Video Biomekanika Tracker', 'Google Classroom / LMS Unismuh Palu'],
  mediaPerangkatKeras: ['Model Kerangka Skeleton Manusia', 'Manekin Otot & Sendi', 'Goniometer Manual', 'LCD Proyektor'],
  mingguan: [
    {
      minggu: 1,
      subCpmk: 'Sub-CPMK 1',
      materi: 'Kontrak perkuliahan dan orientasi mata kuliah: identitas dan deskripsi mata kuliah, CPL, CPMK, Sub-CPMK, sistem penilaian OBE. Pengertian dan ruang lingkup anatomi; posisi anatomis; istilah arah, bidang, dan sumbu gerak dasar.',
      metode: 'Ceramah interaktif, diskusi, demonstrasi dan orientasi RPS',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mengikuti kontrak perkuliahan, mencermati dan mendiskusikan RPS, mengamati gambar/model anatomi, mencatat dan menyebutkan istilah anatomi serta posisi anatomis tubuh.',
      indikator: '1. Mahasiswa mampu menjelaskan struktur perkuliahan. 2. Mahasiswa mampu menjelaskan CPMK & Sub-CPMK. 3. Ketepatan menyebutkan istilah, posisi, bidang, dan sumbu anatomi.',
      teknikPenilaian: 'Observasi, tanya jawab, kuis/tes',
      bobot: 2
    },
    {
      minggu: 2,
      subCpmk: 'Sub-CPMK 2',
      materi: 'Fungsi sistem rangka; rangka aksial dan apendikular; identifikasi tulang tengkorak, tulang belakang, tulang rusuk, gelang bahu, ekstremitas atas, gelang panggul, dan ekstremitas bawah.',
      metode: 'Ceramah interaktif, demonstrasi model skeleton, diskusi kelompok',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mengidentifikasi tulang melalui gambar/model skeleton manusia dan mengelompokkan rangka aksial dan apendikular.',
      indikator: 'Ketepatan mengidentifikasi struktur dan kelompok tulang.',
      teknikPenilaian: 'Tugas / Lembar Identifikasi',
      bobot: 2
    },
    {
      minggu: 3,
      subCpmk: 'Sub-CPMK 3',
      materi: 'Pengenalan jenis dan lokasi persendian; kelompok otot utama tubuh; struktur dasar otot rangka; peran persendian dan otot dalam sistem gerak.',
      metode: 'Ceramah interaktif, demonstrasi gerak, diskusi',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mengidentifikasi persendian dan kelompok otot melalui gambar/model serta diskusi kelompok.',
      indikator: 'Ketepatan mengidentifikasi jenis, lokasi sendi dan kelompok otot.',
      teknikPenilaian: 'Tugas Mandiri',
      bobot: 2
    },
    {
      minggu: 4,
      subCpmk: 'Sub-CPMK 4',
      materi: 'Struktur dan bagian-bagian tulang; klasifikasi tulang berdasarkan bentuk (panjang, pendek, pipih, tidak beraturan); fungsi tulang dalam menopang dan menghasilkan gerak.',
      metode: 'Ceramah interaktif, diskusi, demonstrasi preparat/model tulang',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mengamati model tulang, menjelaskan bagian dan mengklasifikasikan tulang berdasarkan bentuknya.',
      indikator: 'Ketepatan menjelaskan struktur, fungsi, dan klasifikasi tulang.',
      teknikPenilaian: 'Tugas Terstruktur',
      bobot: 2
    },
    {
      minggu: 5,
      subCpmk: 'Sub-CPMK 5',
      materi: 'Pengertian dan klasifikasi persendian; sendi fibrosa, kartilaginosa, dan sinovial; struktur sendi; jenis gerakan dan rentang gerak (ROM) persendian.',
      metode: 'Ceramah interaktif, demonstrasi praktikum ROM, diskusi',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mengidentifikasi jenis sendi dan menghubungkannya dengan kemampuan gerak tubuh.',
      indikator: 'Ketepatan menjelaskan dan mengklasifikasikan persendian.',
      teknikPenilaian: 'Tugas / Kuis Singkat',
      bobot: 2
    },
    {
      minggu: 6,
      subCpmk: 'Sub-CPMK 6',
      materi: 'Struktur otot rangka; karakteristik otot (elastisitas, kontraktilitas, dll); kelompok otot utama; fungsi otot; kontraksi otot secara umum; peran otot dalam menghasilkan gerakan.',
      metode: 'Ceramah interaktif, demonstrasi palpasi otot, diskusi',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mengidentifikasi kelompok otot dan menjelaskan fungsi serta perannya dalam menghasilkan gerakan.',
      indikator: 'Ketepatan menjelaskan struktur, fungsi, dan peran otot.',
      teknikPenilaian: 'Tugas Praktik Palpasi',
      bobot: 2
    },
    {
      minggu: 7,
      subCpmk: 'Sub-CPMK 7',
      materi: 'Hubungan struktur dan fungsi tulang, persendian, dan otot; kerja sama komponen sistem gerak; peran sistem muskuloskeletal dalam aktivitas fisik dan olahraga.',
      metode: 'Case Method (studi kasus), diskusi kelompok terarah, presentasi kelompok',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa menganalisis kasus sederhana dan menjelaskan hubungan tulang, sendi, dan otot dalam suatu gerakan olahraga.',
      indikator: 'Ketepatan menjelaskan hubungan komponen sistem gerak secara terintegrasi.',
      teknikPenilaian: 'Presentasi Kasus & Lembar Kerja',
      bobot: 2
    },
    {
      minggu: 8,
      subCpmk: 'SC 1 - SC 7',
      materi: 'Ujian Tengah Semester (UTS): Evaluasi penguasaan konsep dasar anatomi, sistem rangka, persendian, sistem otot, dan hubungan struktur-fungsi sistem gerak.',
      metode: 'Tes Tertulis Esai Analitis & Soal Bergambar (Waktu: 90 menit)',
      waktu: '90 menit',
      pengalamanBelajar: 'Mahasiswa menyelesaikan lembar soal ujian UTS secara mandiri dengan menjunjung kejujuran akademik.',
      indikator: 'Ketepatan, kelengkapan, dan ketajaman analisis jawaban tertulis sesuai rubrik UTS.',
      teknikPenilaian: 'Tes Tertulis UTS',
      bobot: 15
    },
    {
      minggu: 9,
      subCpmk: 'Sub-CPMK 8',
      materi: 'Anatomi bahu, lengan, siku, lengan bawah, dan tangan; tulang, persendian, dan kelompok otot yang terlibat dalam gerakan melempar, mendorong, menarik, mengayun, dan memukul.',
      metode: 'Demonstrasi, Case Method, diskusi gerak cabang olahraga (atletik/voli/raket)',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa menentukan struktur tulang dan persendian yang terlibat pada gerakan ekstremitas atas.',
      indikator: 'Ketepatan menentukan struktur anatomi yang terlibat dalam gerakan ekstremitas atas.',
      teknikPenilaian: 'Tugas Analisis Gerak Atas',
      bobot: 2
    },
    {
      minggu: 10,
      subCpmk: 'Sub-CPMK 9',
      materi: 'Anatomi panggul, paha, lutut, tungkai, pergelangan kaki, dan batang tubuh; struktur yang terlibat dalam berjalan, berlari, melompat, menendang, dan perubahan posisi tubuh.',
      metode: 'Demonstrasi, praktik identifikasi gerak lapangan, diskusi',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mengidentifikasi struktur anatomi pada gerakan ekstremitas bawah dan batang tubuh melalui demonstrasi gerak nyata.',
      indikator: 'Ketepatan menentukan tulang, sendi, dan otot ekstremitas bawah yang terlibat.',
      teknikPenilaian: 'Tugas Praktik Lapangan',
      bobot: 2
    },
    {
      minggu: 11,
      subCpmk: 'Sub-CPMK 10',
      materi: 'Penerapan konsep anatomi untuk menentukan tulang, persendian, dan kelompok otot yang bekerja pada gerakan dasar olahraga; identifikasi struktur anatomi melalui gambar, model, atau video gerak.',
      metode: 'Project-Based Learning (tahap awal), praktik analisis gerak kelompok',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa bekerja dalam kelompok mengidentifikasi struktur anatomi pada satu gerakan cabang olahraga pilihan dan menyusun outline proyek.',
      indikator: 'Ketepatan identifikasi struktur anatomi dan kualitas dokumentasi proyek.',
      teknikPenilaian: 'Penilaian Progres Proyek',
      bobot: 2
    },
    {
      minggu: 12,
      subCpmk: 'Sub-CPMK 11',
      materi: 'Bidang sagital, frontal, dan transversal; sumbu longitudinal, transversal, dan sagital; fleksi, ekstensi, abduksi, adduksi, rotasi, pronasi, supinasi, dan gerakan lainnya dalam aktivitas olahraga.',
      metode: 'Demonstrasi praktikum gerak tubuh, studi video gerak lambat (slow motion)',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa menerapkan bidang dan sumbu tubuh untuk menentukan klasifikasi jenis gerakan pada berbagai cabang olahraga.',
      indikator: 'Ketepatan menentukan bidang, sumbu, dan jenis gerak sendi tubuh.',
      teknikPenilaian: 'Tugas Analisis Bidang Sumbu',
      bobot: 5
    },
    {
      minggu: 13,
      subCpmk: 'Sub-CPMK 12',
      materi: 'Analisis keterkaitan tulang, persendian, dan kelompok otot dalam menghasilkan gerakan; hubungan struktur anatomi dengan fungsi dan efisiensi gerak manusia.',
      metode: 'Case Method, simulasi biomekanik sederhana, diskusi kelompok',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa menganalisis rekaman gerakan olahraga dan menentukan relasi sinergis tulang, sendi, dan rantai kinetik otot yang bekerja.',
      indikator: 'Ketepatan dan kedalaman analisis struktur dan fungsi sistem gerak.',
      teknikPenilaian: 'Tugas Laporan Analisis',
      bobot: 4
    },
    {
      minggu: 14,
      subCpmk: 'Sub-CPMK 13',
      materi: 'Analisis keterlibatan tulang, persendian, otot, bidang, dan sumbu gerak pada teknik spesifik cabang olahraga (misal smash, servis tenis, tendangan sudut, sprint); hubungan struktur anatomi dengan teknik.',
      metode: 'Project-Based Learning, analisis video teknik, presentasi kelompok',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa mempresentasikan proyek analisis anatomi teknik cabang olahraga menggunakan video visual gerak beranotasi.',
      indikator: 'Ketepatan analisis struktur anatomi dan kualitas penyajian hasil analisis proyek.',
      teknikPenilaian: 'Penilaian Presentasi Proyek',
      bobot: 5
    },
    {
      minggu: 15,
      subCpmk: 'Sub-CPMK 14',
      materi: 'Analisis faktor anatomi yang memengaruhi efektivitas gerak; keterkaitan struktur tubuh dengan pola gerak; identifikasi potensi risiko cedera berdasarkan prinsip anatomis muskuloskeletal.',
      metode: 'Case Method kasus cedera atlet nyata, diskusi panel pemecahan masalah',
      waktu: '3 x 50 menit',
      pengalamanBelajar: 'Mahasiswa menganalisis kasus cedera olahraga (ACL, rotator cuff, ankle sprain) dan mengidentifikasi mekanisme anatomis terjadinya cedera serta mitigasinya.',
      indikator: 'Ketepatan analisis efektivitas gerak dan identifikasi faktor risiko cedera anatomis.',
      teknikPenilaian: 'Tugas Analisis Kasus Cedera',
      bobot: 5
    },
    {
      minggu: 16,
      subCpmk: 'SC 8 - SC 14',
      materi: 'Ujian Akhir Semester (UAS): Evaluasi komprehensif penerapan, analisis gerak olahraga, bidang sumbu, rantai kinetik muskuloskeletal, dan analisis risiko cedera.',
      metode: 'Tes Tertulis Berbasis Kasus & Analisis Video Kasus (90 Menit)',
      waktu: '90 menit',
      pengalamanBelajar: 'Mahasiswa menjawab soal-soal analitis komprehensif tingkat C3-C4 secara mandiri.',
      indikator: 'Kemampuan menganalisis hubungan anatomi dan performa gerak secara logis, tepat, dan ilmiah sesuai rubrik UAS.',
      teknikPenilaian: 'Tes Tertulis UAS',
      bobot: 15
    }
  ],
  komponenPenilaian: {
    kehadiran: 10,
    sikap: 20,
    tugas: 20,
    proyek: 20,
    uts: 15,
    uas: 15
  },
  judulProyek: 'Analisis Anatomi Fungsional dan Risiko Cedera pada Teknik Gerak Spesifik Cabang Olahraga',
  metodeProyek: 'Project-Based Learning (PjBL) Berkelompok (3-4 Mahasiswa)',
  deskripsiProyek: 'Mahasiswa secara berkelompok memilih satu gerakan teknik inti dalam cabang olahraga (misalnya jumping smash bulutangkis, free throw bola basket, tendangan taekwondo dollyo chagi, atau renang gaya dada). Mahasiswa membuat video analisis beranotasi yang mengidentifikasi sendi yang bekerja, jenis tulang, otot agonis/antagonis/sinergis, bidang dan sumbu gerak, serta potensi risiko cedera muskuloskeletal dan cara mitigasi anatomisnya.',
  soalUts: [
    {
      nomor: 1,
      subCpmk: 'SC 1',
      levelKognitif: 'C1/C2',
      bobot: 15,
      pertanyaan: 'Seorang atlet melakukan gerakan jumping jack (melompat dengan membuka dan menutup kaki serta tangan). Analisislah gerakan tersebut dengan:\na) Menyebutkan posisi anatomis awal atlet tersebut. (C1)\nb) Mengidentifikasi bidang dan sumbu tubuh yang menjadi acuan pada saat atlet melakukan gerakan abduksi dan adduksi pada lengan. (C2)\nc) Menjelaskan arah gerakan fleksi dan ekstensi yang mungkin terjadi pada sendi siku selama gerakan jumping jack. (C2)',
      kunciJawaban: 'a) Posisi anatomis awal: Tubuh tegak lurus, pandangan ke depan, kedua lengan di samping tubuh dengan telapak tangan menghadap ke depan, ibu jari mengarah ke luar lateral.\nb) Abduksi dan adduksi lengan terjadi pada BIDANG FRONTAL berputar mengelilingi SUMBU SAGITAL (anteroposterior).\nc) Fleksi siku terjadi ketika sudut sendi mengecil (lengan bawah mendekati lengan atas), sedangkan ekstensi terjadi ketika siku melurus kembali ke posisi anatomis netral.',
      skorMaks: 25
    },
    {
      nomor: 2,
      subCpmk: 'SC 2',
      levelKognitif: 'C2',
      bobot: 20,
      pertanyaan: 'Berdasarkan struktur sistem rangka manusia:\na) Kelompokkan tulang-tulang yang termasuk ke dalam rangka aksial dan rangka apendikular (minimal 5 tulang masing-masing)!\nb) Jelaskan perbedaan fungsi utama antara rangka aksial dan apendikular dalam aktivitas fisik keolahragaan!\nc) Identifikasi tulang penyusun gelang panggul (pelvis) dan fungsinya dalam menopang beban saat atlet berlari!',
      kunciJawaban: 'a) Aksial: cranium (tengkorak), vertebrae (tulang belakang), costa (rusuk), sternum (tulang dada), os hyoid. Apendikular: clavicula, scapula, humerus, femur, tibia, fibula, os coxae.\nb) Rangka aksial berfungsi melindungi organ vital (otak, jantung, paru) dan menjaga postur tubuh netral; rangka apendikular berfungsi sebagai tuas penggerak, manipulasi objek, dan lokomosi (berpindah tempat).\nc) Gelang panggul terdiri dari os ilium, os ischium, dan os pubis. Fungsinya menyalurkan beban aksial dari batang tubuh ke kedua tungkai kaki serta meredam hentakan kinetik tanah saat fase landing berlari.',
      skorMaks: 30
    },
    {
      nomor: 3,
      subCpmk: 'SC 3 & SC 5',
      levelKognitif: 'C2/C3',
      bobot: 15,
      pertanyaan: 'Perhatikan persendian bahu (articulatio humeri) dan persendian lutut (articulatio genus):\na) Identifikasi tipe sendi keduanya berdasarkan klasifikasi struktural dan kemampuan fungsional geraknya!\nb) Jelaskan kelompok otot utama yang menjadi penggerak fleksi pada lutut dan abduksi pada bahu!\nc) Mengapa sendi bahu memiliki rentang gerak (Range of Motion) yang jauh lebih luas dibandingkan sendi lutut? Jelaskan ditinjau dari stabilitas kapsul dan struktur fosa tulang!',
      kunciJawaban: 'a) Bahu: Sendi Sinovial jenis Ball and Socket (peluru / enarthrosis) triaksial. Lutut: Sendi Sinovial jenis Hinge (engsel / ginglymus) modifikasi biaksial.\nb) Fleksi lutut: kelompok otot hamstring (biceps femoris, semitendinosus, semimembranosus). Abduksi bahu: m. deltoideus (pars acromialis / lateral) dibantu m. supraspinatus.\nc) Sendi bahu memiliki fosa glenoidalis yang sangat dangkal (hanya menutupi ~1/3 caput humeri), sehingga mobilitasnya sangat tinggi namun stabilitas rendah. Sebaliknya sendi lutut memiliki kondilus lebar yang ditahan oleh ligamen krusiatum (ACL, PCL) dan meniskus yang membatasi gerak hanya pada bidang sagital demi menopang stabilitas beban tubuh.',
      skorMaks: 25
    },
    {
      nomor: 4,
      subCpmk: 'SC 6 & SC 7',
      levelKognitif: 'C3/C4',
      bobot: 15,
      pertanyaan: 'Dalam gerakan melompat tinggi (vertical jump) pada atlet bola voli:\na) Jelaskan peran otot Agonis, Antagonis, dan Sinergis pada saat fase take-off (ekstensi lutut dan plantar fleksi)!\nb) Mengapa atlet memerlukan persentase serat otot cepat (fast-twitch / tipe II) yang baik untuk menghasilkan lonjakan vertikal yang optimal?',
      kunciJawaban: 'a) Pada fase take-off: Agonis ekstensi lutut adalah m. quadriceps femoris (rectus femoris, vastus lateralis, medialis, intermedius); Antagonis adalah kelompok hamstring yang mengalami relaksasi teregulasi; Sinergis adalah m. gluteus maximus (ekstensi pinggul) dan m. gastrocnemius/soleus (plantar fleksi ankle) yang bekerja simultan dalam rantai kinetik tertutup (closed kinetic chain).\nb) Fast-twitch fibers (tipe IIx/IIa) memiliki aktivitas myosin ATPase tinggi dan kemampuan pelepasan kalsium sarkoplasma cepat, sehingga mampu menghasilkan laju peningkatan gaya (Rate of Force Development / RFD) maksimum dalam waktu milidetik yang dibutuhkan saat tolakan vertical jump.',
      skorMaks: 20
    }
  ],
  updatedAt: '2026-08-27'
};
