import { RPSDocument } from '../types/rps';
import { DAFTAR_CPL } from '../data/curriculumDatabase';
import html2pdf from 'html2pdf.js';

export function exportRpsToPdf(rps: RPSDocument) {
  const content = `
    <div id="pdf-content" style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.3; color: #000; margin: 15mm;">
      <h1 style="text-align: center; font-size: 14pt; text-transform: uppercase;">RENCANA PEMBELAJARAN SEMESTER (RPS)</h1>
      <h2 style="text-align: center; font-size: 13pt;">${rps.mataKuliah}</h2>
      <p><strong>Mata Kuliah:</strong> ${rps.mataKuliah}</p>
      <p><strong>Kode MK:</strong> ${rps.kodeMK}</p>
      <p><strong>Dosen Pengampu:</strong> ${rps.dosenPengampu}</p>
      <!-- Add more content mapping as needed, simplified for brevity -->
    </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = content;
  document.body.appendChild(element);

  const opt = {
    margin:       10,
    filename:     `RPS_${rps.kodeMK}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 } as any,
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' } as any
  };

  html2pdf().set(opt).from(element).save().then(() => {
    document.body.removeChild(element);
  });
}

export function exportRpsToWord(rps: RPSDocument) {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <meta charset="utf-8">
      <title>RPS - ${rps.mataKuliah}</title>
      <style>
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          line-height: 1.3;
          color: #000;
          margin: 15mm;
        }
        h1, h2, h3, h4 {
          font-family: Arial, sans-serif;
          margin-top: 10px;
          margin-bottom: 4px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 12px;
        }
        th, td {
          border: 1px solid #000;
          padding: 5px 6px;
          vertical-align: top;
          font-size: 9.5pt;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
          text-align: center;
        }
        .header-kop {
          width: 100%;
          border: 1px solid #000;
          margin-bottom: 10px;
        }
        .header-kop td {
          border: none;
          padding: 6px;
        }
        .section-title {
          font-family: Arial, sans-serif;
          font-weight: bold;
          font-size: 10pt;
          background-color: #e6e6e6;
          padding: 4px 6px;
          border: 1px solid #000;
          margin-top: 10px;
          margin-bottom: 0;
          text-transform: uppercase;
        }
        .rubrik-title {
          font-family: Arial, sans-serif;
          font-weight: bold;
          font-size: 10pt;
          background-color: #dcdcdc;
          padding: 4px 6px;
          border: 1px solid #000;
          margin-top: 12px;
          margin-bottom: 0;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <!-- KOP RESMI -->
      <table class="header-kop">
        <tr>
          <td style="width: 18%; text-align: center; vertical-align: middle; padding: 4px;">
            <img src="${typeof window !== 'undefined' ? window.location.origin : ''}/assets/logo_fkip.jpg" width="70" height="70" style="width: 70px; height: 70px; object-fit: contain;" alt="Logo FKIP" /><br>
            <span style="font-size: 8pt; font-weight: bold;">FKIP UNISMUH</span>
          </td>
          <td style="width: 64%; text-align: center; vertical-align: middle;">
            <h2 style="font-size: 13pt; margin: 0; text-transform: uppercase;">UNIVERSITAS MUHAMMADIYAH PALU</h2>
            <h3 style="font-size: 11pt; margin: 0; text-transform: uppercase;">FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN</h3>
            <h4 style="font-size: 11pt; margin: 0; text-transform: uppercase; color: #800000;">PROGRAM STUDI ILMU KEOLAHRAGAAN</h4>
            <div style="font-size: 8pt; margin-top: 2px;">Jl. Rusdi Toana No. 01 Telp./Fax.(0451) 425627 Palu 94118 | Email: fkipumpalu@gmail.com</div>
          </td>
          <td style="width: 18%; text-align: center; vertical-align: middle; padding: 4px;">
            <img src="${typeof window !== 'undefined' ? window.location.origin : ''}/assets/logo_diktisaintek.jpg" width="70" height="70" style="width: 70px; height: 70px; object-fit: contain;" alt="Logo Diktisaintek Berdampak" /><br>
            <span style="font-size: 8pt; font-weight: bold; color: #0055bb;">DIKTISAINTEK</span>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: center; border-top: 1px solid #000; padding: 4px;">
            <h1 style="font-size: 12pt; margin: 0; text-transform: uppercase; font-weight: bold;">RENCANA PEMBELAJARAN SEMESTER</h1>
          </td>
        </tr>
      </table>

      <!-- IDENTITAS MATA KULIAH -->
      <table>
        <tr>
          <td style="width: 25%; font-weight: bold; background-color: #f5f5f5;">Tanggal Penyusunan</td>
          <td colspan="3">${rps.tanggalPenyusunan || '10 Februari 2026'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">Mata Kuliah</td>
          <td style="width: 35%; font-weight: bold; text-transform: uppercase;">${rps.mataKuliah}</td>
          <td style="width: 20%; font-weight: bold; background-color: #f5f5f5;">Semester</td>
          <td style="width: 20%; text-align: center; font-weight: bold;">${rps.semester} (${rps.semester === 1 ? 'Satu' : rps.semester})</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">Kode Mata Kuliah</td>
          <td style="font-weight: bold;">${rps.kodeMK}</td>
          <td style="font-weight: bold; background-color: #f5f5f5;">Bobot (SKS)</td>
          <td style="text-align: center; font-weight: bold;">${rps.sks} SKS</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">Dosen Pengampu</td>
          <td colspan="3">${rps.dosenPengampu}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">Otorisasi / Pengesahan</td>
          <td colspan="3">
            <table style="width: 100%; margin: 0; border: none;">
              <tr>
                <td style="width: 33%; text-align: center; border: 1px solid #ccc;">
                  <small>Dosen Pengembang RPS:</small><br><br><br>
                  <b><u>${rps.dosenPengembang}</u></b>
                </td>
                <td style="width: 33%; text-align: center; border: 1px solid #ccc;">
                  <small>Koordinator Mata Kuliah:</small><br><br><br>
                  <b><u>${rps.koordinatorMK}</u></b>
                </td>
                <td style="width: 34%; text-align: center; border: 1px solid #ccc;">
                  <small>Ketua Program Studi:</small><br><br><br>
                  <b><u>${rps.kaprodi}</u></b><br>
                  <small>NIDN: ${rps.nidnKaprodi}</small>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">Deskripsi Mata Kuliah</td>
          <td colspan="3" style="text-align: justify;">${rps.deskripsiMK}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">CPL-PRODI</td>
          <td colspan="3">
            <ul>
              ${rps.cplProdi.map(cpl => {
                const cplObj = DAFTAR_CPL.find(c => c.kode === cpl);
                return `<li><b>${cpl}</b>: ${cplObj?.deskripsi || cpl}</li>`;
              }).join('')}
            </ul>
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">Capaian Pembelajaran Mata Kuliah (CPMK)</td>
          <td colspan="3">
            <ul>
              ${rps.cpmk.map(c => `<li><b>${c.kode}</b>: ${c.deskripsi}</li>`).join('')}
            </ul>
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f5f5f5;">
            Sub Capaian Pembelajaran Mata Kuliah (Sub-CPMK)
          </td>
          <td colspan="3">
            <ul>
              ${rps.subCpmk.map(sc => `<li><b>${sc.kode}</b>: ${sc.deskripsi}</li>`).join('')}
            </ul>
          </td>
        </tr>
      </table>

      <!-- MATRIKS KORELASI CPMK TERHADAP SUB-CPMK -->
      <div class="section-title">KORELASI CPMK TERHADAP SUB-CPMK</div>
      <table>
        <thead>
          <tr>
            <th style="width: 25%; text-align: left;">Kemampuan Akhir</th>
            ${rps.cpmk.map(c => `<th>${c.kode}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rps.subCpmk.map((sc, scIdx) => `
            <tr>
              <td style="font-weight: bold; background-color: #fafafa;">${sc.kode}</td>
              ${rps.cpmk.map((c, cpmkIdx) => {
                let isChecked = false;
                if (sc.cpmkTerkait) {
                  isChecked = sc.cpmkTerkait === c.kode;
                } else if (rps.korelasiMatriks) {
                  const matchedCpmk = rps.cpmk.find(
                    (targetC) =>
                      Boolean(rps.korelasiMatriks?.[`${sc.kode}-${targetC.kode}`]) ||
                      Boolean(rps.korelasiMatriks?.[`${targetC.kode}-${sc.kode}`])
                  );
                  isChecked = matchedCpmk ? matchedCpmk.kode === c.kode : false;
                }
                if (!isChecked && !sc.cpmkTerkait) {
                  const scNum = parseInt(sc.kode.replace(/\D/g, ''), 10) || (scIdx + 1);
                  const expectedCpmkIndex = scNum <= 3 ? 0 : scNum <= 7 ? 1 : scNum <= 11 ? 2 : 3;
                  isChecked = cpmkIdx === expectedCpmkIndex;
                }
                return `<td style="text-align: center; font-weight: bold; font-size: 11pt;">${isChecked ? '✓' : '-'}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- BAHAN KAJIAN & MATERI PEMBELAJARAN (DISUSUN KE BAWAH) -->
      <div class="section-title">IV. BAHAN KAJIAN (MATERI BESAR)</div>
      <table style="margin-bottom: 8px;">
        <tr>
          <td>
            <ol style="margin: 4px 0 4px 20px; padding: 0;">
              ${rps.bahanKajian.map(bk => `<li style="padding: 2px 0;">${bk.replace(/^\d+\.\s*/, '')}</li>`).join('')}
            </ol>
          </td>
        </tr>
      </table>

      <div class="section-title">MATERI PEMBELAJARAN (RINCIAN 16 PERTEMUAN SINKRON PUSTAKA)</div>
      <table style="margin-bottom: 12px;">
        <tr>
          <td>
            <ol style="margin: 4px 0 4px 20px; padding: 0;">
              ${rps.materiPembelajaran.map(mp => `<li style="padding: 2px 0;">${mp.replace(/^\d+\.\s*/, '')}</li>`).join('')}
            </ol>
          </td>
        </tr>
      </table>

      <!-- DAFTAR PUSTAKA -->
      <div class="section-title">V. DAFTAR PUSTAKA (TERVERIFIKASI & AKURAT)</div>
      <table style="margin-bottom: 12px;">
        <tr>
          <td>
            <b>Referensi Utama (Buku dan Artikel Jurnal):</b><br>
            <i>Buku:</i>
            <ol>
              ${rps.pustakaUtama.map(p => `<li>${p}</li>`).join('')}
            </ol>
            ${rps.artikelJurnal && rps.artikelJurnal.length > 0 ? `
              <i>Artikel Jurnal Ilmiah:</i>
              <ol>
                ${rps.artikelJurnal.map(j => `<li>${j}</li>`).join('')}
              </ol>
            ` : ''}
            <br>
            <b>Referensi Pendukung (Modul dan E-book):</b><br>
            ${rps.pustakaPendukung && rps.pustakaPendukung.length > 0 ? `
              <i>Buku Pendukung:</i>
              <ol>
                ${rps.pustakaPendukung.map(p => `<li>${p}</li>`).join('')}
              </ol>
            ` : ''}
            ${rps.eBook && rps.eBook.length > 0 ? `
              <i>E-book & Regulasi Resmi:</i>
              <ol>
                ${rps.eBook.map(e => `<li>${e}</li>`).join('')}
              </ol>
            ` : ''}
          </td>
        </tr>
      </table>

      <!-- RENCANA PEMBELAJARAN 16 MINGGU (FORMAT 9 KOLOM RESMI) -->
      <div class="section-title">VI. RENCANA PEMBELAJARAN MINGGUAN (16 PERTEMUAN)</div>
      <table>
        <thead>
          <tr>
            <th rowspan="2" style="width: 4%;">Minggu ke</th>
            <th rowspan="2" style="width: 14%;">Kompetensi Dasar/<br>Kemampuan Akhir</th>
            <th rowspan="2" style="width: 20%;">Bahan Kajian/<br>materi pembelajran</th>
            <th rowspan="2" style="width: 13%;">Metode Pembelajaran</th>
            <th rowspan="2" style="width: 7%;">Estimasi Waktu</th>
            <th rowspan="2" style="width: 14%;">Pengalaman belajar</th>
            <th colspan="3" style="width: 28%;">Penilaian</th>
          </tr>
          <tr>
            <th style="width: 12%;">Indikator</th>
            <th style="width: 10%;">Teknik</th>
            <th style="width: 6%;">Bobot (%)</th>
          </tr>
          <tr style="background-color: #eaeaea; font-size: 8pt; text-align: center;">
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
          </tr>
        </thead>
        <tbody>
          ${rps.mingguan.map(m => {
            const cleanTeknik = (m.teknikPenilaian || '')
              .replace(/\s*\(\s*\d+\s*%\s*\)/gi, '')
              .replace(/\s*\d+\s*%/gi, '')
              .replace(/\s+/g, ' ')
              .trim();
            return `
            <tr style="${m.minggu === 8 || m.minggu === 16 ? 'background-color: #f5f5f5; font-weight: bold;' : ''}">
              <td style="text-align: center;">${m.minggu}</td>
              <td><b>${m.subCpmk.replace(/\s*\([Cc][2-6]\)/gi, '').replace(/\s*-\s*[Cc][2-6]/gi, '').replace(/\s*\[[Cc][2-6]\]/gi, '').trim()}</b></td>
              <td>${m.materi}</td>
              <td>${m.metode}</td>
              <td style="text-align: center;">${m.waktu.includes('menit') ? m.waktu : `${m.waktu} Menit`}</td>
              <td>${m.pengalamanBelajar}</td>
              <td>${m.indikator}</td>
              <td>${cleanTeknik}</td>
              <td style="text-align: center; font-weight: bold;">${m.bobot}%</td>
            </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <!-- REKAPITULASI KOMPONEN PENILAIAN -->
      <div class="section-title">TABEL KOMPONEN PENILAIAN HASIL BELAJAR</div>
      <table>
        <thead>
          <tr>
            <th style="width: 8%;">No</th>
            <th style="width: 35%;">Komponen Penilaian</th>
            <th style="width: 15%;">Bobot (%)</th>
            <th style="width: 42%;">Deskripsi Penilaian</th>
          </tr>
        </thead>
        <tbody>
          ${(rps.rekapKomponen || [
            { no: 1, komponen: 'Aktivitas Partisipatif', bobot: 20, deskripsi: 'Keaktifan dalam proses perkuliahan dan diskusi.' },
            { no: 2, komponen: 'Hasil Proyek (PjBL)', bobot: 30, deskripsi: 'Kualitas analisis studi kasus dan rancangan skema latihan.' },
            { no: 3, komponen: 'Penugasan (Tugas Terstruktur)', bobot: 20, deskripsi: 'Penyelesaian tugas mingguan (Sub-CPMK 1–10).' },
            { no: 4, komponen: 'UTS', bobot: 15, deskripsi: 'Evaluasi tertulis materi Pertemuan 1-7.' },
            { no: 5, komponen: 'UAS', bobot: 15, deskripsi: 'Evaluasi tertulis materi Pertemuan 8-15.' }
          ]).map(rk => `
            <tr>
              <td style="text-align: center;">${rk.no}</td>
              <td><b>${rk.komponen}</b></td>
              <td style="text-align: center; font-weight: bold;">${rk.bobot}%</td>
              <td>${rk.deskripsi}</td>
            </tr>
          `).join('')}
          <tr style="font-weight: bold; background-color: #f2f2f2;">
            <td colspan="2" style="text-align: right;">TOTAL BOBOT EVALUASI</td>
            <td style="text-align: center;">100%</td>
            <td>Standar Mutu OBE S1 IKOR</td>
          </tr>
        </tbody>
      </table>

      <!-- LAMPIRAN RUBRIK LENGKAP -->
      <br>
      <h2 style="text-align: center; font-size: 12pt; text-transform: uppercase; border-top: 2px solid #000; padding-top: 10px;">
        LAMPIRAN: RUBRIK PENILAIAN MATA KULIAH LENGKAP
      </h2>

      <!-- 1. Rubrik Kehadiran -->
      <div class="rubrik-title">1. RUBRIK KEHADIRAN (10%)</div>
      <table>
        <tr>
          <th style="width: 25%;">Rentang Nilai</th>
          <th style="width: 75%;">Kriteria Presensi & Keaktifan</th>
        </tr>
        <tr><td style="text-align: center; font-weight: bold;">90–100</td><td>Hadir 100% tepat waktu, aktif berdiskusi di kelas, dan berdisiplin tinggi.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">80–89</td><td>Hadir 90–95%, tepat waktu, dan berpartisipasi aktif.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">70–79</td><td>Hadir 80–89%, sesekali terlambat dengan alasan jelas.</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">60–69</td><td>Hadir 75–79% (batas minimal kehadiran).</td></tr>
        <tr><td style="text-align: center; font-weight: bold;">1–59</td><td>Kehadiran &lt; 75%, tidak memenuhi syarat ujian.</td></tr>
      </table>

      <!-- 2. Rubrik Sikap -->
      <div class="rubrik-title">2. RUBRIK SIKAP DAN PARTISIPASI (20%)</div>
      <table>
        <tr>
          <th>No</th><th>Aspek Sikap</th><th>Bobot</th><th>Indikator</th>
        </tr>
        <tr><td style="text-align: center;">1</td><td><b>Disiplin</b></td><td style="text-align: center;">20%</td><td>Hadir tepat waktu, berpakaian rapi, tepat mengumpul tugas.</td></tr>
        <tr><td style="text-align: center;">2</td><td><b>Tanggung Jawab</b></td><td style="text-align: center;">20%</td><td>Melaksanakan peran kelompok dengan penuh komitmen.</td></tr>
        <tr><td style="text-align: center;">3</td><td><b>Partisipasi Aktif</b></td><td style="text-align: center;">20%</td><td>Aktif bertanya dan menyampaikan gagasan kritis.</td></tr>
        <tr><td style="text-align: center;">4</td><td><b>Kerja Sama</b></td><td style="text-align: center;">20%</td><td>Mampu berkolaborasi dalam tim praktik, menjunjung fair play.</td></tr>
        <tr><td style="text-align: center;">5</td><td><b>Etika & Integritas</b></td><td style="text-align: center;">20%</td><td>Sopan santun, menghargai orang lain, bebas plagiasi.</td></tr>
      </table>

      <!-- 3. Rubrik Tugas Kognitif -->
      <div class="rubrik-title">3. RUBRIK TUGAS / KOGNITIF (20%) — SUB-CPMK 1–10</div>
      <table>
        <tr>
          <th>No</th><th>Bentuk Penugasan Kognitif</th><th>Sub-CPMK</th><th>Bobot Komp.</th>
        </tr>
        ${(rps.rubrikTugasKognitif?.pemetaan || []).map(p => `
          <tr>
            <td style="text-align: center;">${p.no}</td>
            <td>${p.bentuk}</td>
            <td style="text-align: center; font-weight: bold;">${p.subCpmk}</td>
            <td style="text-align: center;">${p.bobotDalamKomponen}%</td>
          </tr>
        `).join('')}
      </table>

      <!-- 4. Rubrik Proyek PjBL -->
      <div class="rubrik-title">4. RUBRIK PROYEK (PjBL) — KHUSUS SUB-CPMK 11–14</div>
      <table>
        <tr>
          <th>No</th><th>Aspek Penilaian Proyek</th><th>Sub-CPMK</th><th>Bobot Proyek</th>
        </tr>
        ${(rps.rubrikProyek?.pemetaan || []).map(p => `
          <tr>
            <td style="text-align: center;">${p.no}</td>
            <td>${p.aspek}</td>
            <td style="text-align: center; font-weight: bold;">${p.subCpmk}</td>
            <td style="text-align: center;">${p.bobotDalamProyek}%</td>
          </tr>
        `).join('')}
      </table>

      <!-- 5. Rubrik UTS -->
      <div class="rubrik-title">5. RUBRIK UTS (15%) — SUB-CPMK 1–7</div>
      <table>
        <tr>
          <th>Komponen Penilaian UTS</th><th>Bobot</th>
        </tr>
        ${(rps.rubrikUts?.aspek || []).map(a => `
          <tr><td>${a.nama}</td><td style="text-align: center; font-weight: bold;">${a.bobot}%</td></tr>
        `).join('')}
      </table>

      <!-- 6. Rubrik UAS -->
      <div class="rubrik-title">6. RUBRIK UAS (15%) — SUB-CPMK 8–14</div>
      <table>
        <tr>
          <th>Komponen Penilaian UAS</th><th>Bobot</th>
        </tr>
        ${(rps.rubrikUas?.aspek || []).map(a => `
          <tr><td>${a.nama}</td><td style="text-align: center; font-weight: bold;">${a.bobot}%</td></tr>
        `).join('')}
      </table>

      <br><br>
      <table style="border: none; width: 100%;">
        <tr>
          <td style="border: none; width: 50%;"></td>
          <td style="border: none; width: 50%; text-align: center;">
            Palu, ${rps.tanggalPenyusunan || '10 Februari 2026'}<br>
            Ketua Program Studi Ilmu Keolahragaan,<br><br><br><br>
            <b><u>${rps.kaprodi}</u></b><br>
            NIDN: ${rps.nidnKaprodi}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `RPS_${rps.kodeMK.replace(/\s+/g, '_')}_${rps.mataKuliah.replace(/\s+/g, '_')}.doc`;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Ekspor Dokumen Lengkap Modul Ajar (Buku Ajar Perkuliahan - Minimal 45 Lembar)
 * Sesuai Standar Diktisaintek & Mutu Universitas Muhammadiyah Palu
 */
export function exportModulAjarToWord(modul: any) {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>MODUL AJAR: ${modul.mataKuliah}</title>
      <style>
        @page {
          size: 21.0cm 29.7cm; /* A4 */
          margin: 3cm 2.5cm 2.5cm 2.5cm;
          mso-header-margin: 35.4pt;
          mso-footer-margin: 35.4pt;
          mso-paper-source: 0;
        }
        @page Section1 {
          mso-header: h1;
          mso-footer: f1;
        }
        div.Section1 { page: Section1; }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000000;
          text-align: justify;
        }
        .page-break {
          page-break-before: always;
          mso-break-type: section-break;
        }
        h1.title-cover {
          font-size: 18pt;
          font-weight: bold;
          text-align: center;
          text-transform: uppercase;
          margin-top: 36pt;
          margin-bottom: 12pt;
          line-height: 1.3;
        }
        h2.subtitle-cover {
          font-size: 14pt;
          font-weight: bold;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 30pt;
          line-height: 1.3;
        }
        h1.bab-title {
          font-size: 14pt;
          font-weight: bold;
          text-align: center;
          text-transform: uppercase;
          margin-top: 20pt;
          margin-bottom: 14pt;
          page-break-after: avoid;
        }
        h2.section-heading {
          font-size: 12pt;
          font-weight: bold;
          margin-top: 14pt;
          margin-bottom: 6pt;
          page-break-after: avoid;
        }
        h3.sub-heading {
          font-size: 12pt;
          font-weight: bold;
          margin-top: 10pt;
          margin-bottom: 4pt;
          page-break-after: avoid;
        }
        p {
          margin: 0 0 8pt 0;
          text-indent: 1cm;
          line-height: 1.5;
        }
        .no-indent {
          text-indent: 0 !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 10pt 0 12pt 0;
          font-size: 11pt;
        }
        th, td {
          border: 1px solid #000000;
          padding: 6pt 8pt;
          vertical-align: top;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
          text-align: center;
        }
        ol, ul {
          margin: 4pt 0 8pt 24pt;
          padding: 0;
        }
        li {
          margin-bottom: 3pt;
          line-height: 1.4;
        }
      </style>
    </head>
    <body>
      <div class="Section1">
        <!-- ================= HALAMAN 1: COVER RESMI ================= -->
        <div style="text-align: center; margin-top: 20pt; margin-bottom: 40pt;">
          <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase; line-height: 1.3;">
            KEMENTERIAN PENDIDIKAN TINGGI, SAINS, DAN TEKNOLOGI<br>
            UNIVERSITAS MUHAMMADIYAH PALU<br>
            FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN<br>
            PROGRAM STUDI S1 ILMU KEOLAHRAGAAN (IKOR)
          </div>

          <div style="margin: 50pt 0 40pt 0;">
            <h1 class="title-cover">MODUL AJAR PERKULIAHAN</h1>
            <h2 class="subtitle-cover">${modul.mataKuliah}</h2>
            <div style="font-size: 11pt; font-weight: bold;">
              KODE MK: ${modul.kodeMK} &bull; BOBOT: ${modul.sks} SKS &bull; SEMESTER ${modul.semester}
            </div>
          </div>

          <div style="margin: 60pt 0 40pt 0; font-size: 11pt;">
            <b>Disusun Oleh Tim Dosen Pengampu:</b><br><br>
            <span style="font-size: 12pt; font-weight: bold;">${modul.dosenPengembang}</span><br>
            <span>${modul.dosenPengampu}</span>
          </div>

          <div style="margin-top: 60pt; font-size: 11pt; font-weight: bold;">
            KOTA PALU, SULAWESI TENGAH<br>
            TAHUN AKADEMIK ${modul.tahunAkademik}
          </div>
        </div>

        <!-- ================= HALAMAN 2: LEMBAR PENGESAHAN ================= -->
        <div class="page-break"></div>
        <div style="text-align: center; margin-top: 20pt; margin-bottom: 20pt;">
          <h2 style="font-size: 14pt; font-weight: bold; text-transform: uppercase; margin: 0;">
            LEMBAR PENGESAHAN MODUL AJAR
          </h2>
          <div style="font-size: 10.5pt; margin-top: 4pt;">Nomor Registrasi Mutu Dokumen: MA/IKOR-FKIP/UMPALU/${modul.tahunAkademik?.replace('/', '-') || '2026'}</div>
        </div>

        <p class="no-indent">Dokumen Modul Ajar perkuliahan ini telah diperiksa, diverifikasi kesesuaiannya dengan Standar Nasional Pendidikan Tinggi (SN-Dikti), panduan Kurikulum Berbasis Outcome-Based Education (OBE), dan disahkan untuk digunakan dalam proses pembelajaran mahasiswa Program Studi S1 Ilmu Keolahragaan FKIP Universitas Muhammadiyah Palu.</p>

        <table style="margin: 16pt 0;">
          <tr><td style="width: 32%; font-weight: bold; background-color: #f9f9f9;">Mata Kuliah</td><td>${modul.mataKuliah}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f9f9f9;">Kode / Bobot SKS</td><td>${modul.kodeMK} / ${modul.sks} SKS</td></tr>
          <tr><td style="font-weight: bold; background-color: #f9f9f9;">Semester / Tahun</td><td>Semester ${modul.semester} / ${modul.tahunAkademik}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f9f9f9;">Program Studi / Fakultas</td><td>${modul.programStudi} / ${modul.fakultas}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f9f9f9;">Perguruan Tinggi</td><td>${modul.universitas}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f9f9f9;">Dosen Pengembang Modul</td><td>${modul.dosenPengembang}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f9f9f9;">Koordinator Rumpun MK</td><td>Erwin, S.Pd., M.Pd.</td></tr>
        </table>

        <br>
        <table style="border: none; width: 100%; margin-top: 30pt;">
          <tr>
            <td style="border: none; width: 50%; text-align: center;">
              Menyetujui,<br>
              Dosen Pengembang Modul,<br><br><br><br><br>
              <b><u>${modul.dosenPengembang}</u></b><br>
              NIDN: ${modul.nidnKaprodi}
            </td>
            <td style="border: none; width: 50%; text-align: center;">
              Palu, ${modul.createdAt || '10 Februari 2026'}<br>
              Ketua Program Studi S1 Ilmu Keolahragaan,<br><br><br><br><br>
              <b><u>${modul.kaprodi}</u></b><br>
              NIDN: ${modul.nidnKaprodi}<br>
              NPUTK: ${modul.nputkKaprodi}
            </td>
          </tr>
        </table>

        <!-- ================= HALAMAN 3: KATA PENGANTAR ================= -->
        <div class="page-break"></div>
        <h2 style="font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; margin-bottom: 18pt;">KATA PENGANTAR</h2>

        <p><i>Alhamdulillahi Rabbil 'Alamin</i>, segala puji dan syukur senantiasa kita panjatkan ke hadirat Allah Subhanahu Wa Ta'ala atas limpahan taufik, hidayah, serta kekuatan sehingga Modul Ajar Mata Kuliah <b>${modul.mataKuliah}</b> ini dapat diselesaikan dengan paripurna dan komprehensif.</p>

        <p>Modul ajar ini disusun secara khusus untuk mendukung implementasi kurikulum <i>Outcome-Based Education</i> (OBE) pada Program Studi S1 Ilmu Keolahragaan, Fakultas Keguruan dan Ilmu Pendidikan, Universitas Muhammadiyah Palu. Selaras dengan visi program studi yaitu <i>"${modul.visiProdi}"</i>, modul ini mengintegrasikan kajian teoritis mendalam, pembuktian biomekanika dan fisiologis mutakhir (sport science), pemanfaatan teknologi digital, serta internalisasi nilai-nilai Al-Islam dan Kemuhammadiyahan (AIK).</p>

        <p>Dalam modul ajar ini, seluruh pokok bahasan 16 pertemuan dirancang secara terperinci mencakup identitas Sub-CPMK, landasan teori yang merujuk pada buku teks ber-ISBN bereputasi internasional dan jurnal terakreditasi, prosedur teknis latihan lapangan, studi kasus riil, Lembar Kerja Mahasiswa (LKM) praktikum, serta instrumen evaluasi formatif mandiri lengkap dengan kunci jawaban.</p>

        <p>Penulis menyampaikan apresiasi dan penghargaan setinggi-tingginya kepada Pimpinan Universitas Muhammadiyah Palu, Dekanat FKIP, sejawat dosen di Program Studi Ilmu Keolahragaan, serta seluruh pihak yang telah memberikan kontribusi pemikiran berharga. Tiada gading yang tak retak; kritik serta saran konstruktif dari pembaca dan akademisi keolahragaan senantiasa kami nantikan guna penyempurnaan edisi berikutnya.</p>

        <p style="text-align: right; margin-top: 24pt;" class="no-indent">
          Palu, ${modul.createdAt || 'Februari 2026'}<br><br>
          <b>Tim Penyusun Modul Ajar</b>
        </p>

        <!-- ================= HALAMAN 4: DAFTAR ISI ================= -->
        <div class="page-break"></div>
        <h2 style="font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; margin-bottom: 18pt;">DAFTAR ISI MODUL AJAR</h2>

        <table style="border: none; font-size: 11pt;">
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">HALAMAN JUDUL & SAMPUL DEPAN</td><td style="border: none; text-align: right; font-weight: bold;">i</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">LEMBAR PENGESAHAN DOKUMEN MUTU</td><td style="border: none; text-align: right; font-weight: bold;">ii</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">KATA PENGANTAR TIM PENYUSUN</td><td style="border: none; text-align: right; font-weight: bold;">iii</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">DAFTAR ISI LENGKAP</td><td style="border: none; text-align: right; font-weight: bold;">iv</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">PETA KEDUDUKAN MODUL & CAPAIAN PEMBELAJARAN (CPL & CPMK)</td><td style="border: none; text-align: right; font-weight: bold;">v</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">PETUNJUK PENGGUNAAN MODUL BAGI DOSEN & MAHASISWA</td><td style="border: none; text-align: right; font-weight: bold;">vi</td></tr>
          ${modul.babList.map((b: any, i: number) => `
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="border: none; padding: 4pt 0;"><b>${b.judulBab}</b> (Pertemuan ke-${b.mingguKe})<br>
                <span style="font-size: 10pt; color: #444444;">${b.subCpmk.replace(/\s*\([Cc][2-6]\)/gi, '').replace(/\s*-\s*[Cc][2-6]/gi, '').replace(/\s*\[[Cc][2-6]\]/gi, '').trim()}</span>
              </td>
              <td style="border: none; text-align: right; font-weight: bold; vertical-align: top;">Hal. ${i * 3 + 1}</td>
            </tr>
          `).join('')}
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">PANDUAN EVALUASI TENGAH SEMESTER (UTS) & RUBRIK</td><td style="border: none; text-align: right; font-weight: bold;">Hal. 43</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">PANDUAN EVALUASI AKHIR SEMESTER (UAS) & PROYEK AKHIR (PjBL)</td><td style="border: none; text-align: right; font-weight: bold;">Hal. 45</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">GLOSARIUM LENGKAP ISTILAH SPORT SCIENCE & OLAHRAGA</td><td style="border: none; text-align: right; font-weight: bold;">Hal. 47</td></tr>
          <tr style="border-bottom: 1px solid #cccccc;"><td style="border: none; font-weight: bold; padding: 4pt 0;">DAFTAR PUSTAKA TERVERIFIKASI & PROFIL PENULIS</td><td style="border: none; text-align: right; font-weight: bold;">Hal. 50</td></tr>
        </table>

        <!-- ================= HALAMAN 5: PETA CAPAIAN PEMBELAJARAN ================= -->
        <div class="page-break"></div>
        <h2 class="section-heading">PETA KEDUDUKAN MODUL DAN CAPAIAN PEMBELAJARAN</h2>
        <p>${modul.petaKonsep}</p>

        <h3 class="sub-heading">A. Capaian Pembelajaran Lulusan (CPL) yang Dibebankan pada Mata Kuliah:</h3>
        <ul>
          ${modul.cplProdi.map((c: string) => `<li><b>${c}</b></li>`).join('')}
        </ul>

        <h3 class="sub-heading">B. Capaian Pembelajaran Mata Kuliah (CPMK):</h3>
        <table>
          <thead>
            <tr><th style="width: 18%;">Kode</th><th>Deskripsi CPMK</th></tr>
          </thead>
          <tbody>
            ${modul.cpmkList.map((c: any) => `<tr><td style="text-align: center; font-weight: bold;">${c.kode}</td><td>${c.deskripsi}</td></tr>`).join('')}
          </tbody>
        </table>

        <h3 class="sub-heading">C. Petunjuk Operasional Penggunaan Modul:</h3>
        <p class="no-indent"><b>Bagi Dosen Pengampu:</b></p>
        <ol>
          ${modul.petunjukPenggunaan.untukDosen.map((p: string) => `<li>${p}</li>`).join('')}
        </ol>
        <p class="no-indent"><b>Bagi Mahasiswa:</b></p>
        <ol>
          ${modul.petunjukPenggunaan.untukMahasiswa.map((p: string) => `<li>${p}</li>`).join('')}
        </ol>

        <!-- ================= 14 BAB PEMBELAJARAN LENGKAP ================= -->
        ${modul.babList.map((bab: any) => `
          <div class="page-break"></div>
          <h1 class="bab-title">${bab.judulBab}</h1>
          
          <table style="margin-bottom: 12pt;">
            <tr><td style="width: 25%; font-weight: bold; background-color: #f9f9f9;">Pertemuan ke-</td><td>Minggu ke-${bab.mingguKe}</td></tr>
            <tr><td style="font-weight: bold; background-color: #f9f9f9;">Sasaran Sub-CPMK</td><td>${bab.subCpmk.replace(/\s*\([Cc][2-6]\)/gi, '').replace(/\s*-\s*[Cc][2-6]/gi, '').replace(/\s*\[[Cc][2-6]\]/gi, '').trim()}</td></tr>
            <tr><td style="font-weight: bold; background-color: #f9f9f9;">Alokasi Waktu</td><td>${bab.alokasiWaktu}</td></tr>
          </table>

          <h2 class="section-heading">I. Indikator Ketercapaian Hasil Belajar</h2>
          <ol>
            ${bab.indikatorPembelajaran.map((ind: string) => `<li>${ind}</li>`).join('')}
          </ol>

          <h2 class="section-heading">II. Pendahuluan</h2>
          <p>${bab.pendahuluan}</p>

          <h2 class="section-heading">III. Uraian Materi Perkuliahan</h2>
          ${bab.uraianMateri.map((um: any) => `
            <h3 class="sub-heading">${um.subJudul}</h3>
            <p>${um.isi}</p>
            ${um.poinPenting ? `
              <ul>
                ${um.poinPenting.map((pt: string) => `<li><b>${pt}</b></li>`).join('')}
              </ul>
            ` : ''}
          `).join('')}

          <h3 class="sub-heading">Analisis Teknis dan Prosedur Praktik Lapangan</h3>
          <p>${bab.analisisTeknisDanPraktik}</p>

          <div style="margin: 12pt 0;">
            <p class="no-indent"><b>Integrasi Nilai Al-Islam dan Kemuhammadiyahan (AIK):</b></p>
            <p>${bab.integrasiNilaiIslamKarakter}</p>
          </div>

          <div style="margin: 12pt 0;">
            <p class="no-indent"><b>Studi Kasus Keolahragaan:</b></p>
            <p class="no-indent">${bab.studiKasusKeolahragaan.kasus}</p>
            <p class="no-indent" style="margin-top: 6pt;"><b>Pertanyaan Analitis:</b></p>
            <ol>
              ${bab.studiKasusKeolahragaan.pertanyaanDiskusi.map((q: string) => `<li>${q}</li>`).join('')}
            </ol>
            <p class="no-indent" style="margin-top: 6pt;">
              <b>Rekomendasi Solutif:</b> ${bab.studiKasusKeolahragaan.solusiKunci}
            </p>
          </div>

          <h2 class="section-heading">IV. Rangkuman Materi</h2>
          <ul>
            ${bab.rangkuman.map((rg: string) => `<li>${rg}</li>`).join('')}
          </ul>

          <h2 class="section-heading">V. Lembar Kerja Mahasiswa (LKM) & Panduan Praktik</h2>
          <p class="no-indent"><b>Tujuan Praktikum:</b> ${bab.lembarKerjaMahasiswa.tujuan}</p>
          <p class="no-indent"><b>Alat dan Bahan:</b></p>
          <ul>
            ${bab.lembarKerjaMahasiswa.alatBahan.map((ab: string) => `<li>${ab}</li>`).join('')}
          </ul>
          <p class="no-indent"><b>Langkah-Langkah Kerja:</b></p>
          <ol>
            ${bab.lembarKerjaMahasiswa.langkahKerja.map((lk: string) => `<li>${lk}</li>`).join('')}
          </ol>
          ${bab.lembarKerjaMahasiswa.tabelPengamatan ? `
            <p class="no-indent"><b>Format Tabel Pengamatan:</b></p>
            <table>
              <thead>
                <tr>${bab.lembarKerjaMahasiswa.tabelPengamatan.kolom.map((k: string) => `<th>${k}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${bab.lembarKerjaMahasiswa.tabelPengamatan.barisContoh.map((row: string[]) => `
                  <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}
          <p class="no-indent"><b>Tugas Mandiri:</b> ${bab.lembarKerjaMahasiswa.tugasMandiri}</p>

          <h2 class="section-heading">VI. Latihan Soal Evaluasi Formatif</h2>
          ${bab.soalEvaluasi.map((se: any) => `
            <div style="margin-bottom: 12pt;">
              <p class="no-indent"><b>Soal No. ${se.nomor}:</b> ${se.soal}</p>
              ${se.pilihan ? `
                <div style="margin-left: 20pt; margin-bottom: 4pt;">
                  ${se.pilihan.map((p: string) => `<div>${p}</div>`).join('')}
                </div>
              ` : ''}
              <p class="no-indent" style="font-size: 10pt; color: #222222; margin-top: 4pt;">
                <i>Kunci: ${se.kunciJawaban} &bull; Pembahasan: ${se.pembahasan}</i>
              </p>
            </div>
          `).join('')}

          <h2 class="section-heading">VII. Referensi Rujukan</h2>
          <ul>
            ${bab.referensiBab.map((rf: string) => `<li><i>${rf}</i></li>`).join('')}
          </ul>
        `).join('')}

        <!-- ================= PANDUAN EVALUASI UTS ================= -->
        <div class="page-break"></div>
        <h1 class="bab-title">PANDUAN EVALUASI TENGAH SEMESTER (UTS)</h1>
        <p>${modul.panduanUts.deskripsi}</p>
        <h2 class="section-heading">Kisi-Kisi dan Distribusi Bobot Soal UTS:</h2>
        <ul>
          ${modul.panduanUts.kisiKisi.map((k: string) => `<li><b>${k}</b></li>`).join('')}
        </ul>
        <h2 class="section-heading">Rubrik Penilaian UTS:</h2>
        <p>${modul.panduanUts.rubrikPenilaian}</p>

        <!-- ================= PANDUAN EVALUASI UAS ================= -->
        <div class="page-break"></div>
        <h1 class="bab-title">PANDUAN EVALUASI AKHIR SEMESTER (UAS) & PROYEK PjBL</h1>
        <p>${modul.panduanUas.deskripsi}</p>
        <h2 class="section-heading">Ketentuan Proyek Inovasi:</h2>
        <ul>
          ${modul.panduanUas.ketentuanProyek.map((kp: string) => `<li><b>${kp}</b></li>`).join('')}
        </ul>
        <h2 class="section-heading">Rubrik Penilaian Proyek Akhir:</h2>
        <p>${modul.panduanUas.rubrikPenilaian}</p>

        <!-- ================= GLOSARIUM ================= -->
        <div class="page-break"></div>
        <h1 class="bab-title">GLOSARIUM ISTILAH SPORT SCIENCE & OLAHRAGA</h1>
        <p class="no-indent">Berikut adalah daftar istilah baku dan glosarium ilmiah yang digunakan dalam modul ajar ini:</p>
        <table>
          <thead>
            <tr><th style="width: 25%;">Istilah Keilmuan</th><th>Definisi Operasional & Konseptual</th></tr>
          </thead>
          <tbody>
            ${modul.glosarium.map((g: any) => `
              <tr>
                <td style="font-weight: bold;">${g.istilah}</td>
                <td>${g.definisi}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- ================= DAFTAR PUSTAKA UTAMA & PROFIL PENULIS ================= -->
        <div class="page-break"></div>
        <h1 class="bab-title">DAFTAR PUSTAKA TERVERIFIKASI</h1>
        <h2 class="section-heading">A. Buku Teks Utama Ber-ISBN (Minimal 6 Rujukan):</h2>
        <ol>
          ${modul.daftarPustakaUtama.map((pu: string) => `<li>${pu}</li>`).join('')}
        </ol>

        <h2 class="section-heading">B. Artikel Jurnal Ilmiah Terakreditasi SINTA & Scopus (Minimal 6 Rujukan):</h2>
        <ol>
          ${modul.daftarJurnalIlmiah.map((ji: string) => `<li>${ji}</li>`).join('')}
        </ol>

        <h2 class="section-heading">C. Buku Pendukung & Manual Federasi Resmi (Minimal 6 Rujukan):</h2>
        <ol>
          ${modul.daftarBukuPendukung.map((bp: string) => `<li>${bp}</li>`).join('')}
        </ol>

        <hr style="border: 0.5px solid #000000; margin: 30pt 0 20pt 0;">
        <h2 class="section-heading">PROFIL SINGKAT TIM PENULIS</h2>
        <table style="border: none;">
          <tr>
            <td style="border: none; width: 25%; font-weight: bold; padding: 2pt 0;">Nama Lengkap</td>
            <td style="border: none; padding: 2pt 0;">: <b>${modul.profilPenulis.nama}</b></td>
          </tr>
          <tr>
            <td style="border: none; font-weight: bold; padding: 2pt 0;">Bidang Keahlian</td>
            <td style="border: none; padding: 2pt 0;">: ${modul.profilPenulis.bidangKeahlian}</td>
          </tr>
          <tr>
            <td style="border: none; font-weight: bold; padding: 2pt 0;">Institusi Asal</td>
            <td style="border: none; padding: 2pt 0;">: ${modul.profilPenulis.institusi}</td>
          </tr>
        </table>
        <p style="margin-top: 8pt;">${modul.profilPenulis.biografiSingkat}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `MODUL_AJAR_${modul.kodeMK?.replace(/\s+/g, '_')}_${modul.mataKuliah?.replace(/\s+/g, '_')}_MIN45HAL.doc`;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

