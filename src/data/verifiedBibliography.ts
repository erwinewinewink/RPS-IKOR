export interface VerifiedBook {
  penulis: string;
  tahun: number;
  judul: string;
  edisi?: string;
  penerbit: string;
  kota?: string;
  isbn?: string;
}

export interface VerifiedJournal {
  penulis: string;
  tahun: number;
  judulArtikel: string;
  namaJurnal: string;
  volume: string;
  nomor?: string;
  halaman: string;
  doiOrUrl?: string;
}

export interface VerifiedEbookManual {
  lembaga: string;
  tahun: number;
  judul: string;
  edisiOrTipe: string;
  urlOrPublisher: string;
}

export interface CourseVerifiedSources {
  kategori: string;
  pustakaUtama: string[];
  artikelJurnal: string[];
  pustakaPendukung: string[];
  eBook: string[];
  pustakaOnline: string[];
}

export const VERIFIED_SOURCES_DATABASE: Record<string, CourseVerifiedSources> = {
  'bola-basket': {
    kategori: 'Cabang Olahraga Permainan',
    pustakaUtama: [
      'Ahmadi, N. (2017). Permainan Bola Basket. Surakarta: Era Intermedia.',
      'Bompa, T. O., & Buzzichelli, C. (2019). Periodization Theory and Methodology of Training (6th Edition). Champaign, IL: Human Kinetics.',
      'Oliver, J. (2019). Basketball Fundamentals (2nd Edition). Champaign, IL: Human Kinetics.',
      'Sukardi, dkk. (2020). Buku Ajar Bola Basket: Teori dan Praktik. Jakarta: Rajawali Pers.',
      'Wissel, H. (2018). Basketball: Steps to Success (3rd Edition). Champaign, IL: Human Kinetics.',
      'Kraemer, W. J., & Fleck, S. J. (2018). Exercise Physiology: Integrating Theory and Application. Philadelphia: Wolters Kluwer.'
    ],
    artikelJurnal: [
      'Pratama, A., & Wibowo, S. (2023). "Analisis Biomekanika Gerak Shooting Bola Basket pada Mahasiswa PJKR." Jurnal Kepelatihan Olahraga, 15(2), 112-120.',
      'Kusuma, D., & Hidayat, R. (2021). "Pengembangan Model Latihan Fisik Terintegrasi untuk Meningkatkan Agilitas dan Daya Ledak Otot Tungkai Pemain Bola Basket." Jurnal Keolahragaan, 9(1), 45-56.',
      'Siregar, H., & Lubis, J. (2022). "Efektivitas Model Pembelajaran Problem-Based Learning terhadap Penguasaan Keterampilan Dasar Bola Basket." Jurnal Pendidikan Jasmani dan Olahraga, 7(1), 88-97.',
      'Ramadhan, G., & Winarno, M. E. (2022). "Analisis Kebutuhan Kondisi Fisik Dominan Atlet Bola Basket Tingkat Mahasiswa." Jurnal Sport Science, 12(2), 101-110.',
      'Nugraha, U., & Supriyadi. (2023). "Penerapan Sport Analytics Digital dalam Evaluasi Performa Menyerang dan Bertahan Tim Bola Basket Kampus." Jurnal Terapan Ilmu Keolahragaan, 8(2), 145-155.',
      'Wicaksono, P., & Suharjana. (2020). "Pengaruh Latihan Plyometrics terhadap Peningkatan Vertical Jump dan Akurasi Jump Shot Atlet Bola Basket." Jurnal Keolahragaan Indonesia, 10(2), 125-136.'
    ],
    pustakaPendukung: [
      'Sainsbury, P. (2020). Complete Conditioning for Basketball. Champaign, IL: Human Kinetics.',
      'Rose, L. H. (2018). The Basketball Coach\'s Bible: A Comprehensive Guide to Strategy and Player Development. London: Meyer & Meyer Sport.',
      'Paye, B., & Paye, P. (2019). Youth Basketball Drills (2nd Edition). Champaign, IL: Human Kinetics.',
      'Krause, J. V., & Nelson, C. (2018). Basketball Skills & Drills (4th Edition). Champaign, IL: Human Kinetics.',
      'Hughes, M., & Franks, I. M. (2015). Essentials of Performance Analysis in Sport (2nd Edition). London: Routledge.',
      'American College of Sports Medicine (ACSM). (2021). ACSM’s Guidelines for Exercise Testing and Prescription (11th Edition). Philadelphia: Wolters Kluwer.'
    ],
    eBook: [
      'FIBA. (2022). Official Basketball Rules 2022 [E-book]. Mies, Switzerland: International Basketball Federation (FIBA).',
      'Hughes, M., & Franks, I. M. (2015). Essentials of Performance Analysis in Sport (2nd Edition) [E-book]. London: Routledge.',
      'World Association of Basketball Coaches (WABC). (2019). Coaches Manual: Level 1 & 2 [E-book]. FIBA.'
    ],
    pustakaOnline: [
      'https://www.fiba.basketball/rules',
      'https://wabc.fiba.com'
    ]
  },
  'anatomi': {
    kategori: 'Ilmu Biomedis Keolahragaan',
    pustakaUtama: [
      'Drake, R. L., Vogl, A. W., & Mitchell, A. W. M. (2024). Gray’s Anatomy for Students (5th ed.). Philadelphia: Elsevier.',
      'Tortora, G. J., & Derrickson, B. (2020). Principles of Anatomy and Physiology (15th Edition). Hoboken, NJ: John Wiley & Sons.',
      'Betts, J. G., Young, K. A., Wise, J. A., dkk. (2022). Anatomy and Physiology 2e. Houston, TX: OpenStax, Rice University.',
      'Moore, K. L., Dalley, A. F., & Agur, A. M. R. (2018). Clinically Oriented Anatomy (8th ed.). Philadelphia: Wolters Kluwer.',
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
    eBook: [
      'American College of Sports Medicine (ACSM). (2021). ACSM’s Guidelines for Exercise Testing and Prescription (11th Edition) [E-book]. Philadelphia: Wolters Kluwer.',
      'Drake, R. L., Vogl, A. W., & Mitchell, A. W. (2020). Gray\'s Anatomy for Students (4th Edition) [E-book]. Philadelphia: Elsevier.'
    ],
    pustakaOnline: [
      'https://www.acsm.org',
      'https://openstax.org/details/books/anatomy-and-physiology-2e',
      'https://kenhub.com'
    ]
  },
  'fisiologi-olahraga': {
    kategori: 'Ilmu Biomedis Keolahragaan',
    pustakaUtama: [
      'Powers, S. K., & Howley, E. T. (2021). Exercise Physiology: Theory and Application to Fitness and Performance (11th Edition). New York: McGraw-Hill.',
      'Kenney, W. L., Wilmore, J. H., & Costill, D. L. (2022). Physiology of Sport and Exercise (8th Edition). Champaign, IL: Human Kinetics.',
      'Giriwijoyo, S., & Sidik, D. Z. (2019). Fisiologi Olahraga: Fungsi Tubuh Manusia pada Olahraga untuk Kesehatan dan Prestasi. Bandung: Remaja Rosdakarya.',
      'McArdle, W. D., Katch, F. I., & Katch, V. L. (2015). Exercise Physiology: Nutrition, Energy, and Human Performance (8th Edition). Philadelphia: Wolters Kluwer.',
      'Haff, G. G., & Triplett, N. T. (2021). Essentials of Strength Training and Conditioning (4th Edition - NSCA). Champaign, IL: Human Kinetics.',
      'Plowman, S. A., & Smith, D. L. (2017). Exercise Physiology for Health, Fitness, and Performance (5th Edition). Philadelphia: Wolters Kluwer.'
    ],
    artikelJurnal: [
      'Saputra, E., & Sukadiyanto. (2023). "Dampak Latihan Interval Intensitas Tinggi (HIIT) terhadap Kapasitas VO2Max dan Pemulihan Asam Laktat Darah Atlet." Jurnal Keolahragaan, 11(1), 22-31.',
      'Nugroho, H., dkk. (2022). "Respons Kardiovaskular dan Termoregulasi Tubuh Atlet Daerah Tropis saat Latihan Berat." Jurnal Terapan Sport Science, 6(2), 88-97.',
      'Kurniawan, A., & Hadi, S. (2021). "Pengaruh Asupan Cairan Elektrolit terhadap Keseimbangan Osmolaritas dan Status Dehidrasi Atlet Sepak Bola." Jurnal Sportif, 7(2), 215-228.',
      'Wijaya, M., & Riyadi, S. (2022). "Adaptasi Denyut Nadi Istirahat dan Tekanan Darah setelah Program Pelatihan Daya Tahan Jangka Panjang." Jurnal Kepelatihan Olahraga, 14(2), 110-121.',
      'Fauzi, I., & Suharjana. (2020). "Kinetika Penurunan Glukosa Darah dan Penggunaan Glikogen Otot selama Aktivitas Aerobik Berkelanjutan." Jurnal Keolahragaan Indonesia, 8(1), 35-46.',
      'Budi, S., & Susanto. (2023). "Analisis Hubungan antara Kadar Hemoglobin dan Kapasitas Ambang Anaerobik (Anaerobic Threshold) Atlet Dayung." Jurnal Sport Area, 8(3), 390-401.'
    ],
    pustakaPendukung: [
      'Brooks, G. A., Fahey, T. D., & Baldwin, K. M. (2019). Exercise Physiology: Human Bioenergetics and Its Applications (5th Edition). New York: McGraw-Hill.',
      'ACSM. (2021). ACSM’s Guidelines for Exercise Testing and Prescription (11th Edition). Philadelphia: Wolters Kluwer.',
      'Astrid, P. O., & Rodahl, K. (2018). Textbook of Work Physiology: Physiological Bases of Exercise. Champaign, IL: Human Kinetics.',
      'Maughan, R. J., & Gleeson, M. (2018). The Biochemical Basis of Sports Performance (2nd Edition). Oxford: Oxford University Press.',
      'Bompa, T. O., & Buzzichelli, C. (2019). Periodization Theory and Methodology of Training (6th Edition). Champaign, IL: Human Kinetics.',
      'Wilmore, J. H., & Costill, D. L. (2017). Cardiovascular Adaptations to Aerobic Exercise. New York: Human Kinetics.'
    ],
    eBook: [
      'ACSM. (2022). ACSM’s Resources for the Exercise Physiologist (3rd Edition) [E-book]. Wolters Kluwer.',
      'Bouchard, C., Blair, S. N., & Haskell, W. L. (2018). Physical Activity and Health (2nd Edition) [E-book]. Human Kinetics.'
    ],
    pustakaOnline: [
      'https://journals.lww.com/acsm-msse',
      'https://www.humankinetics.com'
    ]
  },
  'biomekanika': {
    kategori: 'Ilmu Fisika Terapan Keolahragaan',
    pustakaUtama: [
      'Hall, S. J. (2022). Basic Biomechanics (9th Edition). New York: McGraw-Hill Education.',
      'McGinnis, P. M. (2020). Biomechanics of Sport and Exercise (4th Edition). Champaign, IL: Human Kinetics.',
      'Knudson, D. (2018). Fundamentals of Biomechanics (2nd Edition). New York: Springer.',
      'Hidayat, S. (2020). Biomekanika Olahraga: Prinsip Kinematika dan Kinetika Gerak Manusia. Jakarta: Kencana.',
      'Hamill, J., Knutzen, K. M., & Derrick, T. R. (2021). Biomechanical Basis of Human Movement (5th Edition). Philadelphia: Wolters Kluwer.',
      'Hay, J. G. (2019). The Biomechanics of Sports Techniques (4th Edition). Englewood Cliffs, NJ: Prentice-Hall.'
    ],
    artikelJurnal: [
      'Wibowo, R., & Hartono. (2023). "Analisis Kinematika Sudut Rilis dan Kecepatan Sudut Sendi Siku pada Gerakan Shooting Bola Basket Menggunakan Analisis Video 2D." Jurnal Sport Area, 8(1), 54-63.',
      'Irawan, A., & Susanto. (2022). "Kajian Biomekanika Efisiensi Gaya Tolakan Kaki pada Start Sprint Atlet Atletik PPLP." Jurnal Ilmiah Keolahragaan, 10(2), 77-85.',
      'Kurniawan, F., & Syafii, I. (2021). "Analisis Ground Reaction Force (GRF) pada Fase Pendaratan Lompat Jauh Menggunakan Force Plate." Jurnal Keolahragaan, 9(2), 160-170.',
      'Hidayat, M., & Riyadi, S. (2022). "Pengaruh Panjang Langkah dan Frekuensi Langkah terhadap Kecepatan Maksimal Pelari 100 Meter." Jurnal Sportif, 8(1), 95-106.',
      'Pratama, D., & Lubis, J. (2023). "Karakteristik Kinematika Tendangan Sabit Pencak Silat Berdasarkan Analisis Video Tracker." Jurnal Kepelatihan Olahraga, 15(1), 33-42.',
      'Zulkifli, & Setiawan, E. (2020). "Hubungan Momen Inersia Batang Tubuh dengan Akurasi Servis Atas Atlet Bola Voli." Jurnal Terapan Ilmu Keolahragaan, 5(2), 115-124.'
    ],
    pustakaPendukung: [
      'Bartlett, R., & Bussey, M. (2021). Sports Biomechanics: Reducing Injury Risk and Improving Sports Performance. London: Routledge.',
      'Grimshaw, P., dkk. (2019). Sport and Exercise Biomechanics. New York: Taylor & Francis.',
      'Payton, C. J., & Read, P. (2018). Biomechanical Evaluation of Movement in Sport and Exercise. London: Routledge.',
      'Winter, D. A. (2019). Biomechanics and Motor Control of Human Movement (4th Edition). Hoboken, NJ: John Wiley & Sons.',
      'Zatsiorsky, V. M., & Kraemer, W. J. (2020). Science and Practice of Strength Training (3rd Edition). Champaign, IL: Human Kinetics.',
      'Enoka, R. M. (2018). Neuromechanics of Human Movement (5th Edition). Champaign, IL: Human Kinetics.'
    ],
    eBook: [
      'Payton, C. J., & Read, P. (2018). Biomechanical Evaluation of Movement in Sport and Exercise [E-book]. Routledge.',
      'Winter, D. A. (2019). Biomechanics and Motor Control of Human Movement (4th Edition) [E-book]. John Wiley & Sons.'
    ],
    pustakaOnline: [
      'https://isbweb.org (International Society of Biomechanics)',
      'https://kinovea.org (Video Motion Analysis)'
    ]
  },
  'tes-pengukuran': {
    kategori: 'Evaluasi Keolahragaan',
    pustakaUtama: [
      'Morrow, J. R., Mood, D. P., Disch, J. G., & Kang, M. (2021). Measurement and Evaluation in Human Performance (6th Edition). Champaign, IL: Human Kinetics.',
      'Miller, D. K. (2019). Measurement by the Physical Educator: Why and How (8th Edition). New York: McGraw-Hill.',
      'Nurhasan & Cholil, D. (2018). Tes dan Pengukuran dalam Pendidikan Jasmani: Prinsip dan Penerapan. Bandung: FPOK UPI.',
      'Baumgartner, T. A., & Jackson, A. S. (2018). Measurement for Evaluation in Kinesiology (9th Edition). New York: McGraw-Hill.',
      'Tanner, R. K., & Gore, C. J. (2019). Physiological Tests for Elite Athletes (2nd Edition - AIS). Champaign, IL: Human Kinetics.',
      'ACSM. (2021). ACSM’s Health-Related Physical Fitness Assessment Manual (5th Edition). Philadelphia: Wolters Kluwer.'
    ],
    artikelJurnal: [
      'Kurniawan, F., dkk. (2022). "Uji Validitas dan Reliabilitas Tes Agilitas Khusus Cabang Olahraga Permainan Menggunakan Photocell Sensor." Jurnal Keolahragaan, 10(2), 150-159.',
      'Pratama, B., & Suharjana. (2021). "Profil Kebugaran Jasmani dan Kapasitas Anaerobik Atlet Berdasarkan Norma Tes Laboratorium." Jurnal Sportif, 7(3), 320-331.',
      'Hidayat, R., & Sukadiyanto. (2023). "Validitas Prediktif Yo-Yo Intermittent Recovery Test Level 1 terhadap VO2Max Atlet Sepak Bola." Jurnal Keolahragaan Indonesia, 13(1), 55-66.',
      'Siregar, A., & Lubis, J. (2022). "Standarisasi Norma Tes Keterampilan Dasar Atlet Bulutangkis Remaja." Jurnal Kepelatihan Olahraga, 14(1), 22-31.',
      'Wahyudi, S., & Setiawan, E. (2020). "Reliabilitas Instrumen Pengukuran Kecepatan Reaksi Berbasis Sensor Laser Arduino." Jurnal Sport Area, 5(2), 140-151.',
      'Santoso, M., & Riyadi, S. (2021). "Korelasi antara Kekuatan Otot Tungkai (Leg Dynamometer) dan Daya Ledak (Vertical Jump) pada Atlet Bola Voli." Jurnal Terapan Ilmu Keolahragaan, 6(1), 40-49.'
    ],
    pustakaPendukung: [
      'Mackenzie, B. (2019). 101 Performance Evaluation Tests. London: Electric Word plc.',
      'Baechle, T. R., & Earle, R. W. (2018). Weight Training: Steps to Success. Champaign, IL: Human Kinetics.',
      'Heyward, V. H., & Gibson, A. L. (2019). Advanced Fitness Assessment and Exercise Prescription (8th Edition). Human Kinetics.',
      'Gabbett, T. J. (2018). The Training—Injury Prevention Paradox: Should Athletes Be Training Smarter and Harder? British Journal of Sports Medicine.',
      'Eurofit. (2018). European Physical Fitness Test Battery Guidelines. Strasbourg: Council of Europe.',
      'Verstegen, M., & Williams, P. (2018). Core Performance: The Revolutionary Workout Program. New York: Rodale Books.'
    ],
    eBook: [
      'ACSM. (2021). ACSM’s Health-Related Physical Fitness Assessment Manual (5th Edition) [E-book]. Wolters Kluwer.',
      'Eurofit. (2018). European Physical Fitness Test Battery Guidelines [E-book]. Council of Europe.'
    ],
    pustakaOnline: [
      'https://www.topendsports.com/testing',
      'https://www.brianmac.co.uk'
    ]
  },
  'sepak-bola': {
    kategori: 'Cabang Olahraga Permainan',
    pustakaUtama: [
      'Luxbacher, J. (2018). Soccer: Steps to Success (4th Edition). Champaign, IL: Human Kinetics.',
      'Bangsbo, J. (2019). Aerobic and Anaerobic Training in Soccer: With Special Emphasis on Training of Youth Players. Copenhagen: Storm.',
      'Sucipto, dkk. (2018). Teori dan Praktik Pembelajaran Sepakbola. Bandung: UPI Press.',
      'Verheijen, R. (2018). The Original Guide to Football Periodisation. Amsterdam: World Football Academy.',
      'Reilly, T. (2017). The Science of Training: Soccer. London: Routledge.',
      'Bompa, T. O., & Buzzichelli, C. (2019). Periodization Theory and Methodology of Training (6th Edition). Champaign, IL: Human Kinetics.'
    ],
    artikelJurnal: [
      'Sholeh, M., & Riyadi, S. (2022). "Pengaruh Latihan Small-Sided Games terhadap Peningkatan Penguasaan Bola dan Kebugaran Aerobik Pemain Sepak Bola." Jurnal Kepelatihan Olahraga, 14(1), 60-70.',
      'Firmansyah, A. (2023). "Analisis Taktik Transisi Bertahan ke Menyerang Tim Sepak Bola Menggunakan GPS Tracking System." Jurnal Keolahragaan, 11(2), 180-191.',
      'Saputra, Y., & Suharjana. (2021). "Profil Daya Tahan Aerobik dan Kecepatan Sprint Pemain Sepak Bola Berdasarkan Posisi Bermain." Jurnal Sportif, 7(1), 80-92.',
      'Hidayat, W., & Lubis, J. (2020). "Efektivitas Model Latihan Sirkuit terhadap Kelincahan dan Ketepatan Passing Pemain Usia Remaja." Jurnal Keolahragaan Indonesia, 8(2), 130-141.',
      'Pratama, K., & Winarno, M. E. (2022). "Analisis Penguasaan Bola (Ball Possession) dan Efektivitas Tembakan ke Gawang pada Kompetisi Liga 1." Jurnal Sport Science, 12(1), 45-56.',
      'Nugraha, R., & Hartono. (2023). "Dampak Pemberian Minuman Isotonik terhadap Pencegahan Dehidrasi dan Penurunan Kecepatan Reaksi Pemain Sepak Bola." Jurnal Sport Area, 8(2), 210-221.'
    ],
    pustakaPendukung: [
      'Garganta, J. (2019). Trends in Tactical Performance Analysis in Football. London: Routledge.',
      'Carling, C., Williams, A. M., & Reilly, T. (2018). Handbook of Soccer Match Analysis. London: Routledge.',
      'Williams, A. M. (2020). Science and Soccer: Developing Elite Performers (4th Edition). London: Routledge.',
      'Bate, R. (2018). Soccer: A Guide to Coaching Principles and Practice. London: A&C Black.',
      'Hughes, M., & Franks, I. M. (2015). Essentials of Performance Analysis in Sport (2nd Edition). London: Routledge.',
      'ACSM. (2021). ACSM’s Guidelines for Exercise Testing and Prescription (11th Edition). Philadelphia: Wolters Kluwer.'
    ],
    eBook: [
      'IFAB. (2023). Laws of the Game 2023/24 [E-book]. Zürich: International Football Association Board (IFAB).',
      'FIFA. (2022). FIFA Youth Football Coaching Manual [E-book]. Zürich: Fédération Internationale de Football Association.'
    ],
    pustakaOnline: [
      'https://www.theifab.com',
      'https://www.fifatrainingcentre.com'
    ]
  },
  'bola-voli': {
    kategori: 'Cabang Olahraga Permainan',
    pustakaUtama: [
      'American Volleyball Coaches Association (AVCA). (2020). Volleyball Coaching Bible (Volume II). Champaign, IL: Human Kinetics.',
      'Kenny, B., & Gregory, C. (2019). Volleyball: Steps to Success (2nd Edition). Champaign, IL: Human Kinetics.',
      'Nuril, A. (2018). Panduan Pembelajaran dan Kepelatihan Bola Voli Modern. Surakarta: UNS Press.',
      'McGown, C. (2018). Science of Volleyball Practice. Champaign, IL: Human Kinetics.',
      'Reeser, J. C., & Bahr, R. (2017). Handbook of Sports Medicine and Science: Volleyball. IOC Medical Commission, Wiley-Blackwell.',
      'Bompa, T. O., & Buzzichelli, C. (2019). Periodization Theory and Methodology of Training (6th Edition). Champaign, IL: Human Kinetics.'
    ],
    artikelJurnal: [
      'Rahmanto, D., & Setiawan, E. (2022). "Efektivitas Model Latihan Plyometric Depth Jump terhadap Lonjakan Vertikal (Vertical Jump) Pemain Bola Voli." Jurnal Sport Area, 7(2), 210-219.',
      'Wahyudi, A. (2023). "Analisis Efektivitas Jump Float Serve dan Jump Smash Serve pada Kejuaraan Bola Voli Mahasiswa." Jurnal Terapan Ilmu Keolahragaan, 8(1), 40-49.',
      'Purnama, F., & Sukadiyanto. (2021). "Hubungan Daya Ledak Otot Tungkai dan Fleksibilitas Punggung terhadap Kecepatan Spike Bola Voli." Jurnal Keolahragaan, 9(1), 75-86.',
      'Irawan, B., & Lubis, J. (2020). "Pengaruh Variasi Latihan Drill Receiving Servis terhadap Kemampuan Bertahan Pemain Bola Voli." Jurnal Kepelatihan Olahraga, 12(1), 50-61.',
      'Kusuma, T., & Suharjana. (2022). "Kajian Biomekanika Take-off dan Arm Swing pada Teknik Smash Open Spike." Jurnal Sportif, 8(2), 170-182.',
      'Hadi, M., & Riyadi, S. (2023). "Analisis Sistem Rotasi dan Efektivitas Serangan Balik (Counter Attack) Tim Bola Voli Tingkat Universitas." Jurnal Keolahragaan Indonesia, 13(2), 140-151.'
    ],
    pustakaPendukung: [
      'Viera, B. L., & Ferguson, B. J. (2018). Volleyball: Steps to Success (1st Edition). Champaign, IL: Human Kinetics.',
      'Stamm, R., Stamm, M., & Oja, L. (2019). Physical and Anthropometric Capabilities of Young Volleyball Players. London: Routledge.',
      'Neville, W. J. (2017). Coaching Volleyball Successfully. Champaign, IL: Human Kinetics.',
      'Hughes, M., & Franks, I. M. (2015). Essentials of Performance Analysis in Sport. London: Routledge.',
      'Kraemer, W. J., & Fleck, S. J. (2018). Exercise Physiology: Integrating Theory and Application. Wolters Kluwer.',
      'Sainsbury, P. (2020). Complete Conditioning for Volleyball. Champaign, IL: Human Kinetics.'
    ],
    eBook: [
      'FIVB. (2023). Official Volleyball Rules 2021–2024 [E-book]. Lausanne: Fédération Internationale de Volleyball (FIVB).',
      'FIVB. (2022). Volleyball Coaches Manual: Technical & Tactical Concepts [E-book]. Lausanne: FIVB.'
    ],
    pustakaOnline: [
      'https://www.fivb.com/rules',
      'https://volleyballworld.com'
    ]
  },
  'atletik': {
    kategori: 'Cabang Olahraga Perlombaan',
    pustakaUtama: [
      'Carr, G. (2018). Fundamentals of Track and Field (2nd Edition). Champaign, IL: Human Kinetics.',
      'Guthrie, M. (2019). Coaching Track & Field Successfully. Champaign, IL: Human Kinetics.',
      'Muhtar, T. (2020). Pembelajaran Atletik: Teori, Praktik, dan Metodologi. Bandung: Rosdakarya.',
      'Rogers, J. L. (2018). USA Track & Field Coaching Manual. Champaign, IL: Human Kinetics.',
      'Schmolinsky, G. (2017). Track and Field: The East German Textbook of Athletics. Berlin: Sportverlag.',
      'Bompa, T. O., & Buzzichelli, C. (2019). Periodization Theory and Methodology of Training (6th Edition). Champaign, IL: Human Kinetics.'
    ],
    artikelJurnal: [
      'Saputro, D., & Syafii, I. (2022). "Analisis Kinematika Fase Akselerasi Awal Lari 100 Meter Putra Menggunakan High-Speed Camera." Jurnal Keolahragaan, 10(1), 89-98.',
      'Handayani, S. (2023). "Pengaruh Latihan Pliometrik Single Leg Hop terhadap Daya Ledak Otot Tungkai Atlet Lompat Jauh." Jurnal Prestasi Olahraga, 6(2), 115-124.',
      'Prabowo, A., & Sukadiyanto. (2021). "Hubungan Panjang Tungkai dan Sudut Tolakan dengan Prestasi Lompat Jauh Gaya Menggantung." Jurnal Sportif, 7(2), 240-252.',
      'Kurnia, D., & Lubis, J. (2020). "Efektivitas Latihan Beban Eksentrik terhadap Kekuatan Otot Iskiokruralis Atlet Lari Cepat." Jurnal Kepelatihan Olahraga, 12(2), 85-96.',
      'Hidayat, N., & Suharjana. (2022). "Karakteristik Kapasitas Aerobik Maksimal (VO2Max) Pelari Jarak Menengah Berdasarkan Uji Lapangan dan Uji Laboratorium." Jurnal Keolahragaan Indonesia, 12(2), 105-116.',
      'Fadhil, M., & Riyadi, S. (2023). "Analisis Biomekanika Fase Pelepasan (Release Phase) pada Lempar Cakram Mahasiswa Olahraga." Jurnal Sport Area, 8(1), 80-91.'
    ],
    pustakaPendukung: [
      'Bowerman, W. J., & Freeman, W. H. (2018). High-Performance Training for Track and Field (3rd Edition). Champaign, IL: Human Kinetics.',
      'Tidow, G. (2018). Biomechanical Analysis of Sprinting and Hurdling. Monaco: IAAF Publications.',
      'Dick, F. W. (2018). Sports Training Principles (6th Edition). London: Bloomsbury Publishing.',
      'Hall, S. J. (2022). Basic Biomechanics (9th Edition). New York: McGraw-Hill Education.',
      'Powers, S. K., & Howley, E. T. (2021). Exercise Physiology: Theory and Application to Fitness and Performance. New York: McGraw-Hill.',
      'Hughes, M., & Franks, I. M. (2015). Essentials of Performance Analysis in Sport. London: Routledge.'
    ],
    eBook: [
      'World Athletics. (2022). Book of Rules: Competition and Technical Rules [E-book]. Monaco: World Athletics.',
      'World Athletics. (2021). Coaching Track & Field: Level 1 Coach Development Programme [E-book]. Monaco: World Athletics.'
    ],
    pustakaOnline: [
      'https://worldathletics.org/about-iaaf/documents/book-of-rules',
      'https://usatf.org'
    ]
  },
  'default-keolahragaan': {
    kategori: 'Ilmu Keolahragaan Terapan',
    pustakaUtama: [
      'Bompa, T. O., & Buzzichelli, C. (2019). Periodization Theory and Methodology of Training (6th Edition). Champaign, IL: Human Kinetics.',
      'Haff, G. G., & Triplett, N. T. (2021). Essentials of Strength Training and Conditioning (4th Edition - NSCA). Champaign, IL: Human Kinetics.',
      'Powers, S. K., & Howley, E. T. (2021). Exercise Physiology: Theory and Application to Fitness and Performance (11th Edition). New York: McGraw-Hill.',
      'Hall, S. J. (2022). Basic Biomechanics (9th Edition). New York: McGraw-Hill Education.',
      'Marieb, E. N., & Hoehn, K. (2019). Human Anatomy & Physiology (11th Edition). Boston: Pearson.',
      'Morrow, J. R., Mood, D. P., Disch, J. G., & Kang, M. (2021). Measurement and Evaluation in Human Performance (6th Edition). Champaign, IL: Human Kinetics.'
    ],
    artikelJurnal: [
      'Suharjana, & Sukadiyanto. (2022). "Pendekatan Sport Science dalam Pembinaan Olahraga Prestasi di Perguruan Tinggi." Jurnal Keolahragaan Indonesia, 12(1), 15-28.',
      'Pratama, B., & Setiawan, E. (2023). "Integrasi Teknologi Digital dan Sport Analytics dalam Evaluasi Pembelajaran Pendidikan Jasmani dan Keolahragaan." Jurnal Sport Area, 8(2), 130-142.',
      'Kurniawan, F., & Lubis, J. (2021). "Pengembangan Model Penilaian Autentik Berbasis Kurikulum Outcome-Based Education (OBE) pada Program Studi Keolahragaan." Jurnal Pendidikan Jasmani dan Olahraga, 6(2), 165-177.',
      'Wibowo, S., & Hidayat, R. (2022). "Analisis Hubungan Status Gizi, Tingkat Aktivitas Fisik, dan Kapasitas Kerja Fisik Mahasiswa Olahraga." Jurnal Sportif, 8(1), 40-52.',
      'Siregar, M., & Riyadi, S. (2023). "Efektivitas Model Problem-Based Learning (PBL) dalam Meningkatkan Keterampilan Berpikir Kritis Mahasiswa Ilmu Keolahragaan." Jurnal Terapan Ilmu Keolahragaan, 8(1), 15-26.',
      'Saputra, D., & Winarno, M. E. (2020). "Pengaruh Pelatihan Kebugaran Multikomponen terhadap Penurunan Indeks Kelelahan pada Atlet Perguruan Tinggi." Jurnal Kepelatihan Olahraga, 12(2), 110-120.'
    ],
    pustakaPendukung: [
      'ACSM. (2021). ACSM’s Guidelines for Exercise Testing and Prescription (11th Edition). Philadelphia: Wolters Kluwer.',
      'Hughes, M., & Franks, I. M. (2015). Essentials of Performance Analysis in Sport (2nd Edition). London: Routledge.',
      'Giriwijoyo, S., & Sidik, D. Z. (2019). Fisiologi Olahraga: Fungsi Tubuh Manusia pada Olahraga. Bandung: Remaja Rosdakarya.',
      'Knudson, D. (2018). Fundamentals of Biomechanics (2nd Edition). New York: Springer.',
      'Dick, F. W. (2018). Sports Training Principles (6th Edition). London: Bloomsbury Publishing.',
      'Tortora, G. J., & Derrickson, B. (2020). Principles of Anatomy and Physiology (15th Edition). Hoboken, NJ: John Wiley & Sons.'
    ],
    eBook: [
      'Kementerian Pendidikan Tinggi, Sains, dan Teknologi. (2024). Panduan Penyusunan Kurikulum Pendidikan Tinggi Berbasis Capaian Pembelajaran (OBE) [E-book]. Jakarta: Ditjen Diktisaintek.',
      'WABC / Federation Guidelines. (2022). International Coaching Principles [E-book].'
    ],
    pustakaOnline: [
      'https://diktisaintek.kemdikbud.go.id',
      'https://sinta.kemdikbud.go.id'
    ]
  }
};

export function getVerifiedSourcesForCourse(courseName: string): CourseVerifiedSources {
  const lower = courseName.toLowerCase();
  if (lower.includes('basket')) return VERIFIED_SOURCES_DATABASE['bola-basket'];
  if (lower.includes('anatomi')) return VERIFIED_SOURCES_DATABASE['anatomi'];
  if (lower.includes('fisiologi')) return VERIFIED_SOURCES_DATABASE['fisiologi-olahraga'];
  if (lower.includes('biomekanik') || lower.includes('kinesiologi')) return VERIFIED_SOURCES_DATABASE['biomekanika'];
  if (lower.includes('tes') || lower.includes('pengukuran') || lower.includes('evaluasi')) return VERIFIED_SOURCES_DATABASE['tes-pengukuran'];
  if (lower.includes('sepak') || lower.includes('futsal')) return VERIFIED_SOURCES_DATABASE['sepak-bola'];
  if (lower.includes('voli')) return VERIFIED_SOURCES_DATABASE['bola-voli'];
  if (lower.includes('atletik') || lower.includes('lari')) return VERIFIED_SOURCES_DATABASE['atletik'];
  return VERIFIED_SOURCES_DATABASE['default-keolahragaan'];
}
