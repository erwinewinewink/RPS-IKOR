export interface BabModulAjar {
  mingguKe: number;
  judulBab: string;
  subCpmk: string;
  levelKognitif: string;
  alokasiWaktu: string;
  indikatorPembelajaran: string[];
  pendahuluan: string;
  uraianMateri: {
    subJudul: string;
    isi: string;
    poinPenting?: string[];
  }[];
  analisisTeknisDanPraktik: string;
  integrasiNilaiIslamKarakter: string;
  studiKasusKeolahragaan: {
    kasus: string;
    pertanyaanDiskusi: string[];
    solusiKunci: string;
  };
  rangkuman: string[];
  lembarKerjaMahasiswa: {
    tujuan: string;
    alatBahan: string[];
    langkahKerja: string[];
    tabelPengamatan?: {
      kolom: string[];
      barisContoh: string[][];
    };
    tugasMandiri: string;
  };
  soalEvaluasi: {
    nomor: number;
    soal: string;
    levelKognitif: string;
    pilihan?: string[];
    kunciJawaban: string;
    pembahasan: string;
  }[];
  referensiBab: string[];
}

export interface ModulAjarDocument {
  id: string;
  mataKuliah: string;
  kodeMK: string;
  sks: number;
  semester: number;
  tahunAkademik: string;
  programStudi: string;
  fakultas: string;
  universitas: string;
  visiProdi: string;
  dosenPengembang: string;
  dosenPengampu: string;
  kaprodi: string;
  nidnKaprodi: string;
  nputkKaprodi: string;
  deskripsiMataKuliah: string;
  cplProdi: string[];
  cpmkList: { kode: string; deskripsi: string }[];
  petaKonsep: string;
  petunjukPenggunaan: {
    untukDosen: string[];
    untukMahasiswa: string[];
  };
  babList: BabModulAjar[];
  panduanUts: {
    deskripsi: string;
    kisiKisi: string[];
    rubrikPenilaian: string;
  };
  panduanUas: {
    deskripsi: string;
    ketentuanProyek: string[];
    rubrikPenilaian: string;
  };
  glosarium: { istilah: string; definisi: string }[];
  daftarPustakaUtama: string[];
  daftarJurnalIlmiah: string[];
  daftarBukuPendukung: string[];
  profilPenulis: {
    nama: string;
    bidangKeahlian: string;
    institusi: string;
    biografiSingkat: string;
  };
  totalEstimasiHalaman: number;
  createdAt: string;
}
