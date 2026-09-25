export interface CPMKItem {
  kode: string; // e.g. "CPMK 1"
  deskripsi: string;
  cplTerkait: string[]; // e.g. ["CPL 1", "CPL 2"]
}

export interface SubCPMKItem {
  kode: string; // e.g. "Sub-CPMK 1"
  deskripsi: string;
  cpmkTerkait: string; // e.g. "CPMK 1"
  levelKognitif?: 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
}

export interface JadwalMingguan {
  minggu: number;
  subCpmk: string; // e.g. "Sub-CPMK 1 (C2)"
  materi: string;
  metode: string;
  waktu: string;
  pengalamanBelajar: string;
  indikator: string;
  teknikPenilaian: string;
  bobot: number; // e.g. 5, 6, 15
}

export interface SoalUjianItem {
  nomor: number;
  subCpmk: string;
  levelKognitif: string; // C2, C3, C4, C5, C6
  bobot: number;
  pertanyaan: string;
  kunciJawaban: string;
  skorMaks?: number;
}

export interface PemetaanTugasKognitif {
  no: number;
  bentuk: string;
  subCpmk: string;
  bobotDalamKomponen: number; // e.g. 10%
}

export interface KriteriaRubrikKognitif {
  aspek: string;
  skor90_100: string;
  skor80_89: string;
  skor70_79: string;
  skor60_69: string;
  skor1_59: string;
}

export interface PemetaanProyekItem {
  no: number;
  aspek: string;
  subCpmk: string;
  bobotDalamProyek: number; // e.g. 25%, 20%
}

export interface KriteriaRubrikProyek {
  aspek: string;
  skor90_100: string;
  skor80_89: string;
  skor70_79: string;
  skor60_69: string;
  skor1_59: string;
}

export interface RPSDocument {
  id: string;
  tanggalPenyusunan: string;
  tahunAkademik: string;
  mataKuliah: string;
  kodeMK: string;
  sks: number;
  sksTeori?: number;
  sksPraktek?: number;
  semester: number;
  rumpunMK?: string;
  dosenPengampu: string;
  dosenPengembang: string;
  koordinatorMK: string;
  kaprodi: string;
  nidnKaprodi: string;
  nputkKaprodi: string;
  deskripsiMK: string;
  catatanFokusKhusus?: string; // Catatan fokus topik perkuliahan khusus (misal: "fokus senam lantai")
  cplProdi: string[];
  cpmk: CPMKItem[];
  subCpmk: SubCPMKItem[];
  korelasiMatriks: Record<string, boolean>; // e.g. "Sub-CPMK 1-CPMK 1": true
  bahanKajian: string[];
  materiPembelajaran: string[];
  pustakaUtama: string[]; // Buku teks terverifikasi
  artikelJurnal?: string[]; // Jurnal ilmiah terindeks
  pustakaPendukung: string[]; // Buku pendukung
  eBook?: string[]; // E-book & manual federasi resmi (FIBA, dll)
  pustakaOnline: string[];
  mediaPerangkatLunak?: string[];
  mediaPerangkatKeras?: string[];
  mingguan: JadwalMingguan[];
  komponenPenilaian: {
    kehadiran: number;
    sikap: number;
    tugas: number;
    proyek: number;
    uts: number;
    uas: number;
  };
  rekapKomponen?: {
    no: number;
    komponen: string;
    bobot: number;
    deskripsi: string;
  }[];
  // Data Rubrik Lengkap Sesuai Template PDF
  rubrikTugasKognitif?: {
    bobot: number;
    subCpmkTarget: string;
    pemetaan: PemetaanTugasKognitif[];
    kriteria: KriteriaRubrikKognitif[];
  };
  rubrikProyek?: {
    judul: string;
    metode: string;
    subCpmkTarget: string;
    bobot: number;
    pemetaan: PemetaanProyekItem[];
    kriteria: KriteriaRubrikProyek[];
  };
  rubrikUts?: {
    bobot: number;
    materi: string;
    aspek: { nama: string; bobot: number }[];
    kriteria: { rentang: string; kriteria: string }[];
  };
  rubrikUas?: {
    bobot: number;
    materi: string;
    aspek: { nama: string; bobot: number }[];
    kriteria: { rentang: string; kriteria: string }[];
  };
  soalUts?: SoalUjianItem[];
  soalUas?: SoalUjianItem[];
  judulProyek?: string;
  metodeProyek?: string;
  deskripsiProyek?: string;
  updatedAt: string;
}
