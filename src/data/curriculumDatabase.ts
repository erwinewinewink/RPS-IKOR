export interface ProfilLulusan {
  kode: string;
  nama: string;
  namaInggris: string;
  peranKerja: string[];
  deskripsi: string;
}

export interface CPL {
  kode: string;
  aspek: 'Sikap' | 'Pengetahuan' | 'Keterampilan Umum' | 'Keterampilan Khusus';
  deskripsi: string;
}

export interface BahanKajian {
  kode: string;
  nama: string;
  deskripsi: string;
}

export interface MataKuliah {
  kode: string;
  nama: string;
  sks: number;
  sksTeori?: number;
  sksPraktek?: number;
  semester: number;
  kelompok: 'Wajib Prodi' | 'Pilihan Prodi' | 'MKWN' | 'Fakultas' | 'Universitas';
  cpl: string[];
  bahanKajian?: string[];
  deskripsi?: string;
  dosenPengembang?: string;
  koordinator?: string;
}

export const IDENTITAS_PRODI = {
  universitas: 'Universitas Muhammadiyah Palu',
  fakultas: 'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)',
  programStudi: 'Ilmu Keolahragaan (IKOR)',
  jenjang: 'Sarjana (S1)',
  statusAkreditasi: 'Baik',
  bebanStudiTotal: 148,
  bebanWajibMinimal: 144,
  alamat: 'Jl. Rusdi Toana No. 01 Palu 94118',
  email: 'fkipumpalu@gmail.com',
  website: 'https://fkipump.ac.id',
  kaprodi: {
    nama: 'Erwin Zainuddin, S.Pd., M.Pd.',
    nputk: '4555770671130273',
    nidn: '1623129201',
    jabatan: 'Ketua Program Studi Ilmu Keolahragaan',
  },
  ketuaTimKurikulum: {
    nama: 'Muh. Arif, S.Pd., M.Pd.',
    nidn: '9958775676130332',
    jabatan: 'Ketua Tim Penyusun Kurikulum OBE',
  },
  sekretarisTim: {
    nama: 'Heni Silfianti, S.Pd., M.Pd.',
    nidn: '3552772673230343',
    jabatan: 'Sekretaris Tim Penyusun Kurikulum OBE',
  },
  anggotaTim: [
    { nama: 'Erwin Zainuddin, S.Pd., M.Pd.', nidn: '1623129201 / 4555770671130273' },
    { nama: 'Anugrah Riski Tritama, S.Or., M.Or.', nidn: '4551775676130133' },
    { nama: 'Zalikal Ilham, S.Pd., M.Pd.', nidn: '4254776677130273' },
    { nama: 'Zahra Zetira, S.Pd., M.Pd.', nidn: '6156775676230173' },
  ],
  dekan: {
    nama: 'Dr. Ernitasari Mulyadi, Bach., BP., M.Pd.',
    nbm: '1157 976',
    jabatan: 'Dekan FKIP Universitas Muhammadiyah Palu',
  },
  wakilDekanAkademik: {
    nama: 'Ismail Manangkari, S.Pd., M.Pd.',
    jabatan: 'Wakil Dekan Bidang Akademik & Kerjasama',
  },
  visi: 'Menghasilkan lulusan program studi yang islami, inovatif, dan berdaya saing global berbasis sport science dan teknologi digital tahun 2045.',
  misi: [
    'Menyelenggarakan pendidikan dan pembelajaran di bidang ilmu keolahragaan yang berkualitas, inovatif, berorientasi pada Outcome-Based Education (OBE), serta mengintegrasikan nilai-nilai Al-Islam dan Kemuhammadiyahan untuk menghasilkan lulusan yang kompeten, profesional, berkarakter Islami, dan berdaya saing global.',
    'Melaksanakan penelitian yang inovatif dan berkelanjutan di bidang sport science, teknologi digital olahraga, kesehatan, dan aktivitas fisik untuk mengembangkan ilmu pengetahuan, menghasilkan inovasi, serta memberikan solusi terhadap permasalahan masyarakat.',
    'Menyelenggarakan pengabdian kepada masyarakat melalui penerapan ilmu keolahragaan, olahraga kesehatan, olahraga prestasi, olahraga masyarakat, dan teknologi olahraga guna meningkatkan kualitas hidup masyarakat.',
    'Mengembangkan kerja sama strategis dengan pemerintah, dunia usaha dan dunia industri (DUDI), organisasi profesi, lembaga pendidikan, institusi olahraga, serta mitra nasional dan internasional untuk mendukung pelaksanaan Catur Dharma Perguruan Tinggi dan peningkatan daya saing lulusan.',
    'Mengembangkan tata kelola program studi yang profesional, akuntabel, adaptif, berbasis teknologi informasi, dan berorientasi pada penjaminan mutu berkelanjutan guna mendukung peningkatan kualitas penyelenggaraan Catur Dharma Perguruan Tinggi.'
  ]
};

export const PROFIL_LULUSAN: ProfilLulusan[] = [
  {
    kode: 'PL 1',
    nama: 'Pelatih Olahraga',
    namaInggris: 'Sports Coach',
    peranKerja: ['Instruktur Olahraga', 'Pelatih Olahraga Profesional', 'Strength & Conditioning Coach'],
    deskripsi: 'Lulusan mampu bekerja sebagai pelatih olahraga profesional yang memiliki kompetensi dalam merancang, melaksanakan, mengevaluasi, dan mengembangkan program latihan olahraga berdasarkan prinsip sport science untuk meningkatkan performa atlet maupun masyarakat dengan menjunjung tinggi etika profesi dan nilai-nilai Al-Islam dan Kemuhammadiyahan.'
  },
  {
    kode: 'PL 2',
    nama: 'Pengelola Kebugaran dan Kesehatan',
    namaInggris: 'Fitness and Wellness Manager',
    peranKerja: ['Fitness Manager', 'Personal Trainer', 'Wellness Consultant', 'Health Fitness Specialist'],
    deskripsi: 'Lulusan mampu bekerja sebagai pengelola pusat kebugaran, personal trainer, maupun konsultan kesehatan yang kompeten dalam merancang, melaksanakan, dan mengevaluasi program kebugaran, aktivitas fisik, dan promosi kesehatan masyarakat berdasarkan prinsip ilmu keolahragaan dan kesehatan olahraga.'
  },
  {
    kode: 'PL 3',
    nama: 'Peneliti dan Analis Olahraga',
    namaInggris: 'Sport Researcher and Analyst',
    peranKerja: ['Research Assistant', 'Sport Analyst', 'Performance Analyst', 'Lab Keolahragaan Officer'],
    deskripsi: 'Lulusan mampu melaksanakan penelitian di bidang ilmu keolahragaan, mengolah dan menganalisis data olahraga, memanfaatkan teknologi olahraga, serta menghasilkan inovasi berbasis bukti ilmiah untuk mendukung pengembangan sport science, aktivitas fisik, dan kesehatan masyarakat.'
  },
  {
    kode: 'PL 4',
    nama: 'Wirausahawan dan Praktisi Media Olahraga Digital',
    namaInggris: 'Sport Entrepreneur and Digital Sport Media Practitioner',
    peranKerja: ['Sport Entrepreneur', 'Content Creator Olahraga', 'Digital Sport Media Specialist', 'Event Organizer Olahraga'],
    deskripsi: 'Lulusan mampu mengembangkan usaha di bidang olahraga, memanfaatkan teknologi digital dalam industri olahraga, menghasilkan konten media olahraga yang kreatif, serta mengembangkan inovasi bisnis olahraga berbasis teknologi digital yang berdaya saing nasional maupun global.'
  },
  {
    kode: 'PL 5',
    nama: 'Pendidik',
    namaInggris: 'Physical Education Teacher',
    peranKerja: ['Guru PJOK', 'Pendidik Olahraga di Sekolah/Komunitas', 'Instruktur Pendidikan Jasmani'],
    deskripsi: 'Lulusan mampu berperan sebagai pendidik di bidang pendidikan jasmani yang memiliki kompetensi pedagogik, profesional, sosial, dan kepribadian dalam merancang, melaksanakan, mengevaluasi, serta mengembangkan pembelajaran pendidikan jasmani yang inovatif, berbasis teknologi, dan berorientasi pada peningkatan aktivitas fisik peserta didik sesuai perkembangan ilmu pengetahuan dan kebutuhan masyarakat.'
  }
];

export const DAFTAR_CPL: CPL[] = [
  {
    kode: 'CPL 1',
    aspek: 'Sikap',
    deskripsi: 'Memiliki karakter nasionalis religius berkemajuan dan socio-technopreneur sebagai wujud pengamalan nilai-nilai Al-Islam dan Kemuhammadiyahan dalam konteks personal, sosial, dan pekerjaan.'
  },
  {
    kode: 'CPL 2',
    aspek: 'Pengetahuan',
    deskripsi: 'Menguasai konsep teoritis ilmu keolahragaan, sport science, pendidikan jasmani, kesehatan olahraga, dan aktivitas fisik secara komprehensif.'
  },
  {
    kode: 'CPL 3',
    aspek: 'Pengetahuan',
    deskripsi: 'Menguasai konsep fisiologi olahraga, biomekanika, psikologi olahraga, tes dan pengukuran olahraga, serta analisis performa olahraga berbasis ilmiah.'
  },
  {
    kode: 'CPL 4',
    aspek: 'Pengetahuan',
    deskripsi: 'Menguasai konsep teknologi olahraga, sport digital media, sport analytics, dan pemanfaatan Artificial Intelligence (AI) dalam pengembangan olahraga modern.'
  },
  {
    kode: 'CPL 5',
    aspek: 'Pengetahuan',
    deskripsi: 'Menguasai konsep manajemen olahraga, industri olahraga, kewirausahaan olahraga, dan pengembangan program olahraga berbasis kebutuhan masyarakat dan perkembangan global.'
  },
  {
    kode: 'CPL 6',
    aspek: 'Keterampilan Umum',
    deskripsi: 'Mampu bekerja sama, berkomunikasi secara efektif, menghargai keberagaman, serta memiliki kepedulian sosial dalam aktivitas olahraga dan kesehatan masyarakat.'
  },
  {
    kode: 'CPL 7',
    aspek: 'Keterampilan Umum',
    deskripsi: 'Mampu berpikir logis, kritis, sistematis, inovatif, dan adaptif dalam menyelesaikan permasalahan bidang olahraga, kesehatan, dan pendidikan.'
  },
  {
    kode: 'CPL 8',
    aspek: 'Keterampilan Umum',
    deskripsi: 'Mampu memanfaatkan teknologi informasi, media digital, dan data ilmiah dalam mendukung pembelajaran, penelitian, dan pengembangan olahraga.'
  },
  {
    kode: 'CPL 9',
    aspek: 'Keterampilan Umum',
    deskripsi: 'Mampu menyusun karya ilmiah, melaksanakan penelitian, serta menghasilkan publikasi akademik secara sistematis sesuai kaidah ilmiah dan etika akademik.'
  },
  {
    kode: 'CPL 10',
    aspek: 'Keterampilan Khusus',
    deskripsi: 'Mampu menunjukkan sikap profesional, etis, disiplin, sportif, bertanggung jawab, dan berintegritas dalam pelaksanaan kegiatan pendidikan, olahraga, kesehatan, dan profesi keolahragaan.'
  },
  {
    kode: 'CPL 11',
    aspek: 'Keterampilan Khusus',
    deskripsi: 'Mampu merancang, melaksanakan, dan mengevaluasi program aktivitas fisik, latihan olahraga, kebugaran, serta analisis kondisi fisik berdasarkan prinsip sport science.'
  },
  {
    kode: 'CPL 12',
    aspek: 'Keterampilan Khusus',
    deskripsi: 'Mampu mengembangkan inovasi, teknologi digital olahraga, serta mengelola kegiatan, organisasi, dan kewirausahaan olahraga secara profesional, kreatif, komunikatif, dan berdaya saing.'
  },
  {
    kode: 'CPL 13',
    aspek: 'Keterampilan Khusus',
    deskripsi: 'Mampu melaksanakan pengabdian dan pemberdayaan masyarakat melalui aktivitas fisik, olahraga, dan kesehatan berbasis pendekatan ilmiah, teknologi olahraga, serta nilai kemanusiaan dan keislaman.'
  }
];

export const MATRIKS_PL_CPL: Record<string, string[]> = {
  'PL 1': ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 4', 'CPL 5', 'CPL 6', 'CPL 7', 'CPL 8', 'CPL 10', 'CPL 11', 'CPL 12', 'CPL 13'],
  'PL 2': ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 4', 'CPL 5', 'CPL 6', 'CPL 7', 'CPL 8', 'CPL 10', 'CPL 11', 'CPL 12', 'CPL 13'],
  'PL 3': ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 4', 'CPL 6', 'CPL 7', 'CPL 8', 'CPL 9', 'CPL 10', 'CPL 11', 'CPL 13'],
  'PL 4': ['CPL 1', 'CPL 4', 'CPL 5', 'CPL 6', 'CPL 7', 'CPL 8', 'CPL 10', 'CPL 12'],
  'PL 5': ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 6', 'CPL 7', 'CPL 8', 'CPL 9', 'CPL 10', 'CPL 11', 'CPL 13']
};

export const BAHAN_KAJIAN: BahanKajian[] = [
  {
    kode: 'BK 1',
    nama: 'Al-Islam dan Kemuhammadiyahan',
    deskripsi: 'Mencakup nilai-nilai Al-Islam dan Kemuhammadiyahan, akhlak, etika, kemanusiaan, integritas, nasionalisme religius berkemajuan, serta karakter socio-technopreneur sebagai landasan kehidupan akademik, sosial, dan profesional.'
  },
  {
    kode: 'BK 2',
    nama: 'Dasar-Dasar Ilmu Keolahragaan',
    deskripsi: 'Mencakup konsep, prinsip, ruang lingkup, sejarah, perkembangan, isu, kebijakan, dan sistem keolahragaan serta keterkaitannya dengan pendidikan, kesehatan, prestasi, masyarakat, dan perkembangan olahraga global.'
  },
  {
    kode: 'BK 3',
    nama: 'Anatomi',
    deskripsi: 'Mencakup struktur dan fungsi tubuh manusia yang berkaitan dengan aktivitas fisik dan olahraga, meliputi sistem rangka, otot, persendian, organ, dan sistem tubuh yang mendukung aktivitas olahraga.'
  },
  {
    kode: 'BK 4',
    nama: 'Fisiologi Olahraga',
    deskripsi: 'Mencakup respons dan adaptasi tubuh terhadap aktivitas fisik dan latihan olahraga, meliputi sistem kardiovaskular, respirasi, metabolisme, neuromuskular, serta penerapannya dalam kebugaran dan peningkatan performa.'
  },
  {
    kode: 'BK 5',
    nama: 'Biomekanika Olahraga',
    deskripsi: 'Mencakup prinsip mekanika dalam gerak manusia, analisis gerak dan teknik olahraga, gaya, keseimbangan, momentum, serta penerapan biomekanika untuk meningkatkan efektivitas dan efisiensi gerakan olahraga.'
  },
  {
    kode: 'BK 6',
    nama: 'Psikologi dan Sosiologi Olahraga',
    deskripsi: 'Mencakup aspek psikologis dan sosial dalam olahraga, meliputi motivasi, konsentrasi, kepercayaan diri, kecemasan, dinamika kelompok, interaksi sosial, budaya olahraga, serta faktor sosial dan psikologis yang memengaruhi aktivitas dan performa olahraga.'
  },
  {
    kode: 'BK 7',
    nama: 'Kepelatihan dan Sport Performance',
    deskripsi: 'Mencakup teori dan prinsip kepelatihan, perencanaan dan periodisasi latihan, metode latihan, kondisi fisik, teknik, taktik, strategi, pembinaan atlet, serta pengembangan performa olahraga berbasis sport science.'
  },
  {
    kode: 'BK 8',
    nama: 'Cabang Olahraga dan Keterampilan Olahraga',
    deskripsi: 'Mencakup teori, teknik, taktik, peraturan, praktik, dan pembelajaran berbagai cabang olahraga permainan, atletik, senam, akuatik, olahraga bela diri, olahraga rekreasi, serta cabang olahraga lainnya sebagai pengembangan keterampilan dan kompetensi praktis keolahragaan.'
  },
  {
    kode: 'BK 9',
    nama: 'Tes, Pengukuran, dan Evaluasi Olahraga',
    deskripsi: 'Mencakup konsep, prinsip, instrumen, teknik pelaksanaan, pengolahan, interpretasi, dan evaluasi hasil tes serta pengukuran kebugaran, kondisi fisik, keterampilan, dan performa olahraga.'
  },
  {
    kode: 'BK 10',
    nama: 'Pendidikan Jasmani dan Pembinaan Olahraga',
    deskripsi: 'Mencakup konsep pendidikan olahraga, pembelajaran aktivitas fisik, pedagogik olahraga, pengembangan keterampilan, pembinaan olahraga berdasarkan kelompok usia, olahraga adaptif, serta evaluasi pembelajaran dan pembinaan olahraga.'
  },
  {
    kode: 'BK 11',
    nama: 'Kebugaran, Kesehatan, dan Gizi Olahraga',
    deskripsi: 'Mencakup konsep kebugaran jasmani, aktivitas fisik, kesehatan olahraga, wellness, gizi olahraga, kebutuhan zat gizi, prinsip latihan kebugaran, serta penerapan aktivitas fisik untuk meningkatkan kesehatan dan kualitas hidup.'
  },
  {
    kode: 'BK 12',
    nama: 'Pencegahan dan Perawatan Cedera Olahraga',
    deskripsi: 'Mencakup prinsip pencegahan cedera, faktor risiko, penanganan awal, perawatan, pemulihan, rehabilitasi, keselamatan olahraga, serta penerapan prinsip kesehatan dan keselamatan dalam aktivitas olahraga.'
  },
  {
    kode: 'BK 13',
    nama: 'Teknologi, Media Digital, dan Sport Analytics',
    deskripsi: 'Mencakup pemanfaatan teknologi olahraga, media digital, pengumpulan dan pengolahan data, sport analytics, analisis performa, aplikasi digital, wearable technology, serta Artificial Intelligence (AI) untuk mendukung pembelajaran, penelitian, kepelatihan, dan pengembangan olahraga.'
  },
  {
    kode: 'BK 14',
    nama: 'Manajemen, Industri, Event, dan Kewirausahaan Olahraga',
    deskripsi: 'Mencakup manajemen dan organisasi olahraga, kepemimpinan, pengelolaan fasilitas, penyelenggaraan event, industri olahraga, pemasaran, branding, pengembangan produk dan jasa olahraga, serta sport entrepreneurship.'
  },
  {
    kode: 'BK 15',
    nama: 'Metodologi Penelitian dan Statistik Olahraga',
    deskripsi: 'Mencakup dasar-dasar penelitian olahraga, pendekatan kuantitatif dan kualitatif, desain penelitian, teknik pengumpulan data, statistik, analisis data, penyusunan proposal, karya ilmiah, seminar, publikasi, dan etika penelitian.'
  },
  {
    kode: 'BK 16',
    nama: 'Olahraga Masyarakat dan Rekreasi',
    deskripsi: 'Mencakup konsep, prinsip, dan penerapan olahraga masyarakat serta aktivitas rekreasi untuk meningkatkan aktivitas fisik, kebugaran, kesehatan, kualitas hidup, partisipasi masyarakat, dan pemberdayaan masyarakat.'
  },
  {
    kode: 'BK 17',
    nama: 'Etika, Profesionalisme, dan Keselamatan Keolahragaan',
    deskripsi: 'Mencakup etika akademik dan profesi, profesionalisme, disiplin, sportivitas, tanggung jawab, integritas, keselamatan, kepatuhan terhadap aturan, serta penerapan prinsip profesional dalam berbagai bidang keolahragaan.'
  }
];

export const MATA_KULIAH_DATABASE: MataKuliah[] = [
  // SEMESTER 1
  {
    kode: 'NAS 2026001',
    nama: 'Pendidikan Agama',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 1,
    kelompok: 'MKWN',
    cpl: ['CPL 1', 'CPL 3', 'CPL 4', 'CPL 8'],
    bahanKajian: ['BK 1'],
    deskripsi: 'Membahas konsep dan nilai-nilai ajaran Islam dalam membangun akhlak karimah, etika keolahragaan, serta integrasi nilai keimanan dalam kehidupan profesional.'
  },
  {
    kode: 'UMPW 102',
    nama: 'Al-Islam & Kemuhammadiyahan I',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 1,
    kelompok: 'Universitas',
    cpl: ['CPL 1'],
    bahanKajian: ['BK 1']
  },
  {
    kode: 'KIP 2026007',
    nama: 'Bahasa Inggris',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 1,
    kelompok: 'Fakultas',
    cpl: ['CPL 1', 'CPL 2']
  },
  {
    kode: 'SS2026001',
    nama: 'Senam',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 1,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026002',
    nama: 'Atletik',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 1,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026003',
    nama: 'Bola Basket',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 1,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026004',
    nama: 'Sejarah Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 1,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 6', 'CPL 7'],
    bahanKajian: ['BK 2']
  },
  {
    kode: 'SS2026005',
    nama: 'Anatomi',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 1,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 11'],
    bahanKajian: ['BK 3'],
    deskripsi: 'Mata kuliah Anatomi membahas struktur dan susunan tubuh manusia sebagai dasar dalam memahami fungsi gerak dan aktivitas fisik dalam bidang keolahragaan. Materi meliputi terminologi anatomi, posisi dan bidang tubuh, sistem rangka, persendian, otot, serta sistem tubuh yang berkaitan dengan gerak manusia.',
    dosenPengembang: 'Erwin Zainuddin, S.Pd., M.Pd.',
    koordinator: ''
  },
  {
    kode: 'SS2026006',
    nama: 'Fisiologi',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 1,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 11'],
    bahanKajian: ['BK 4'],
    deskripsi: 'Membahas faal fungsi organ dan sistem tubuh manusia pada saat istirahat dan saat melakukan aktivitas fisik dan latihan olahraga berulang.'
  },

  // SEMESTER 2
  {
    kode: 'UMPW 202',
    nama: 'Al-Islam & Kemuhammadiyahan II',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 2,
    kelompok: 'Universitas',
    cpl: ['CPL 1'],
    bahanKajian: ['BK 1']
  },
  {
    kode: 'SS2026007',
    nama: 'Psikologi Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 7'],
    bahanKajian: ['BK 6'],
    deskripsi: 'Membahas dinamika mental, motivasi, regulasi stres/kecemasan, penetapan sasaran, dan kohesivitas tim atlet dalam konteks latihan dan kompetisi olahraga.'
  },
  {
    kode: 'SS2026008',
    nama: 'Sepak Bola',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026009',
    nama: 'Dasar-dasar Kepelatihan Olahraga',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 7', 'CPL 11'],
    bahanKajian: ['BK 7']
  },
  {
    kode: 'SS2026010',
    nama: 'Sosiologi Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 12'],
    bahanKajian: ['BK 6']
  },
  {
    kode: 'SS2026011',
    nama: 'Pendidikan Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 7', 'CPL 8'],
    bahanKajian: ['BK 10']
  },
  {
    kode: 'SS2026012',
    nama: 'Biomekanika Olahraga',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 11'],
    bahanKajian: ['BK 5'],
    deskripsi: 'Menganalisis hukum mekanika fisika dan kinematika/kinetika gerak manusia pada berbagai cabang olahraga untuk mengoptimalkan efisiensi gerak dan pencegahan risiko cedera.'
  },
  {
    kode: 'SS2026013',
    nama: 'Media Digital Olahraga',
    sks: 3,
    sksTeori: 1,
    sksPraktek: 2,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 11'],
    bahanKajian: ['BK 13'],
    deskripsi: 'Pemanfaatan media digital, live streaming, pembuatan konten visual sport, platform analitik digital, dan strategi branding olahraga di era modern.'
  },
  {
    kode: 'SS2026014',
    nama: 'Isu dan Kebijakan Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 2,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 12', 'CPL 13'],
    bahanKajian: ['BK 14']
  },

  // SEMESTER 3
  {
    kode: 'UMPW 302',
    nama: 'Al-Islam & Kemuhammadiyahan III',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 3,
    kelompok: 'Universitas',
    cpl: ['CPL 1'],
    bahanKajian: ['BK 1']
  },
  {
    kode: 'SS2026015',
    nama: 'Bola Voli',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026016',
    nama: 'Sepak Takraw',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 7', 'CPL 11'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026017',
    nama: 'Masase Olahraga',
    sks: 3,
    sksTeori: 1,
    sksPraktek: 2,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 11', 'CPL 12'],
    bahanKajian: ['BK 12']
  },
  {
    kode: 'SS2026018',
    nama: 'Wanita dan Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 11', 'CPL 13'],
    bahanKajian: ['BK 6']
  },
  {
    kode: 'SS2026019',
    nama: 'Kesehatan Olahraga',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 11', 'CPL 12'],
    bahanKajian: ['BK 11']
  },
  {
    kode: 'SS2026020',
    nama: 'Pembinaan Olahraga Usia Dini',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 9', 'CPL 11'],
    bahanKajian: ['BK 10']
  },
  {
    kode: 'SS2026021',
    nama: 'Manajemen Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 11', 'CPL 12'],
    bahanKajian: ['BK 14']
  },
  {
    kode: 'SS2026022',
    nama: 'Pencegahan dan Perawatan Cedera',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 11', 'CPL 12'],
    bahanKajian: ['BK 12']
  },
  {
    kode: 'SS2026023',
    nama: 'Teknologi Olahraga',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 3,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 11', 'CPL 13'],
    bahanKajian: ['BK 13'],
    deskripsi: 'Penerapan alat ukur canggih, wearable devices, GPS tracking, sensor IMU, dan sport artificial intelligence dalam monitoring latihan atlet.'
  },

  // SEMESTER 4
  {
    kode: 'KIP 2026005',
    nama: 'Pembelajaran Mikro',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 4,
    kelompok: 'Fakultas',
    cpl: ['CPL 1', 'CPL 4', 'CPL 5'],
    bahanKajian: ['BK 10']
  },
  {
    kode: 'SS2026024',
    nama: 'Pencak Silat (Tapak Suci)',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 7', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026025',
    nama: 'Statistik',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 8', 'CPL 11'],
    bahanKajian: ['BK 15']
  },
  {
    kode: 'SS2026026',
    nama: 'Bulutangkis',
    sks: 2,
    sksTeori: 0,
    sksPraktek: 2,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026027',
    nama: 'Olahraga Adaptif',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 11', 'CPL 13'],
    bahanKajian: ['BK 10']
  },
  {
    kode: 'SS2026028',
    nama: 'Ilmu Gizi Olahraga',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 11', 'CPL 12'],
    bahanKajian: ['BK 11']
  },
  {
    kode: 'SS2026029',
    nama: 'Tes, Pengukuran dan Evaluasi Olahraga',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 3', 'CPL 11'],
    bahanKajian: ['BK 9']
  },
  {
    kode: 'SS2026030',
    nama: 'Analisis Olahraga',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 5', 'CPL 11'],
    bahanKajian: ['BK 13']
  },
  {
    kode: 'SS2026031',
    nama: 'Event Olahraga',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 4,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 11', 'CPL 12'],
    bahanKajian: ['BK 14']
  },

  // SEMESTER 5
  {
    kode: 'NAS 2026004',
    nama: 'Bahasa Indonesia',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 5,
    kelompok: 'MKWN',
    cpl: ['CPL 1', 'CPL 2']
  },
  {
    kode: 'UMPW 602',
    nama: 'Pendidikan Kebencanaan',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 5,
    kelompok: 'Universitas',
    cpl: ['CPL 1', 'CPL 2']
  },
  {
    kode: 'KIP 2026001',
    nama: 'Pengantar Pendidikan',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 5,
    kelompok: 'Fakultas',
    cpl: ['CPL 1', 'CPL 2', 'CPL 3']
  },
  {
    kode: 'KIP 2026004',
    nama: 'Ilmu Kealaman Dasar',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 5,
    kelompok: 'Fakultas',
    cpl: ['CPL 1', 'CPL 2']
  },
  {
    kode: 'SS2026032',
    nama: 'Pembinaan Olahraga Usia Lanjut',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 5,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 9', 'CPL 11'],
    bahanKajian: ['BK 10']
  },
  {
    kode: 'SS2026033',
    nama: 'Metode Penelitian Olahraga',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 5,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 8', 'CPL 11'],
    bahanKajian: ['BK 15']
  },
  {
    kode: 'SS2026034',
    nama: 'Obat dan Doping',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 5,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 2', 'CPL 11', 'CPL 13'],
    bahanKajian: ['BK 11'],
    deskripsi: 'Membahas farmakologi olahraga, zat-zat terlarang WADA, risiko kesehatan doping, Therapeutic Use Exemptions (TUE), dan etika anti-doping dalam olahraga prestasi.'
  },
  {
    kode: 'SS2026035',
    nama: 'Industri Olahraga',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 5,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 11', 'CPL 13'],
    bahanKajian: ['BK 14']
  },

  // SEMESTER 6
  {
    kode: 'NAS 2026002',
    nama: 'Pendidikan Pancasila',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 6,
    kelompok: 'MKWN',
    cpl: ['CPL 1']
  },
  {
    kode: 'NAS 2026003',
    nama: 'Pendidikan Kewarganegaraan',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 6,
    kelompok: 'MKWN',
    cpl: ['CPL 1']
  },
  {
    kode: 'UMPW 402',
    nama: 'Al-Islam & Kemuhammadiyahan IV',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 6,
    kelompok: 'Universitas',
    cpl: ['CPL 1'],
    bahanKajian: ['BK 1']
  },
  {
    kode: 'UMPW 502',
    nama: 'Kewirausahaan Islami',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 6,
    kelompok: 'Universitas',
    cpl: ['CPL 1']
  },
  {
    kode: 'KIP 2026002',
    nama: 'Perkembangan Peserta Didik',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 6,
    kelompok: 'Fakultas',
    cpl: ['CPL 1', 'CPL 2', 'CPL 3']
  },
  {
    kode: 'KIP 2026006',
    nama: 'PLP / PKL',
    sks: 4,
    sksTeori: 0,
    sksPraktek: 4,
    semester: 6,
    kelompok: 'Fakultas',
    cpl: ['CPL 1', 'CPL 4', 'CPL 5']
  },
  {
    kode: 'SS2026036',
    nama: 'Olahraga Rekreasi',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 6,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 8', 'CPL 12'],
    bahanKajian: ['BK 16']
  },
  {
    kode: 'SS2026037',
    nama: 'Sarana Prasarana Olahraga',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 6,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 11', 'CPL 13'],
    bahanKajian: ['BK 14']
  },

  // SEMESTER 7
  {
    kode: 'UMPW 702',
    nama: 'Pendidikan Anti Korupsi',
    sks: 2,
    sksTeori: 2,
    sksPraktek: 0,
    semester: 7,
    kelompok: 'Universitas',
    cpl: ['CPL 1']
  },
  {
    kode: 'UMPW 804',
    nama: 'KKN Pendidikan / Pemberdayaan Masyarakat',
    sks: 4,
    sksTeori: 0,
    sksPraktek: 4,
    semester: 7,
    kelompok: 'Universitas',
    cpl: ['CPL 1', 'CPL 4', 'CPL 9', 'CPL 10', 'CPL 11', 'CPL 12', 'CPL 13']
  },
  {
    kode: 'KIP 2026003',
    nama: 'Profesi Kependidikan',
    sks: 3,
    sksTeori: 2,
    sksPraktek: 1,
    semester: 7,
    kelompok: 'Fakultas',
    cpl: ['CPL 1', 'CPL 2']
  },
  {
    kode: 'SS2026038',
    nama: 'Seminar Keolahragaan',
    sks: 2,
    sksTeori: 1,
    sksPraktek: 1,
    semester: 7,
    kelompok: 'Wajib Prodi',
    cpl: ['CPL 1', 'CPL 8', 'CPL 12', 'CPL 13'],
    bahanKajian: ['BK 15']
  },

  // SEMESTER 8
  {
    kode: 'UMPW 904',
    nama: 'Tugas Akhir / Skripsi',
    sks: 4,
    sksTeori: 0,
    sksPraktek: 4,
    semester: 8,
    kelompok: 'Universitas',
    cpl: ['CPL 1', 'CPL 9', 'CPL 10', 'CPL 11', 'CPL 12', 'CPL 13']
  },

  // MATA KULIAH PILIHAN PRODI (Semester IV, V, VI)
  {
    kode: 'SS2026039',
    nama: 'Tenis Lapangan',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 4,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026040',
    nama: 'Tenis Meja',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 4,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026041',
    nama: 'Teqball',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 4,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026042',
    nama: 'Akuatik / Renang',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 5,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026043',
    nama: 'Softball',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 5,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026044',
    nama: 'Petanque',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 5,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026045',
    nama: 'Futsal',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 5,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026046',
    nama: 'Gateball',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 5,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026047',
    nama: 'Bola Tangan',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 5,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026048',
    nama: 'Tinju',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 6,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026049',
    nama: 'Taekwondo',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 6,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026050',
    nama: 'Karate',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 6,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026051',
    nama: 'Olahraga Masyarakat',
    sks: 3,
    sksTeori: 1,
    sksPraktek: 2,
    semester: 6,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 7', 'CPL 8', 'CPL 12'],
    bahanKajian: ['BK 16']
  },
  {
    kode: 'SS2026052',
    nama: 'Panahan',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 6,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  },
  {
    kode: 'SS2026053',
    nama: 'Berkuda',
    sks: 3,
    sksTeori: 0,
    sksPraktek: 3,
    semester: 6,
    kelompok: 'Pilihan Prodi',
    cpl: ['CPL 1', 'CPL 4', 'CPL 8', 'CPL 9'],
    bahanKajian: ['BK 8']
  }
];
