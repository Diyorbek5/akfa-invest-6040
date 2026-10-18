const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

console.log('--- Generating AKFA Investor Presentation PDF (Strictly Clean & Void-Free) ---');

function getBase64Image(relPath) {
  const fullPath = path.resolve(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn('Warning: file not found:', fullPath);
    return '';
  }
  const ext = path.extname(fullPath).toLowerCase().replace('.', '');
  const mime = ext === 'png' ? 'image/png' : (ext === 'svg' ? 'image/svg+xml' : 'image/jpeg');
  const b64 = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${b64}`;
}

const heroBgBase64 = getBase64Image('assets/hero-bg.jpg');
const handshakeBase64 = getBase64Image('assets/handshake.jpg');
const branchOlmaliqBase64 = getBase64Image('assets/branch_olmaliq.jpg');
const branchGulistonBase64 = getBase64Image('assets/branch_guliston.jpg');
const branchBokaBase64 = getBase64Image('assets/branch_boka.jpg');
const branchYangiyolBase64 = getBase64Image('assets/branch_yangiyol.jpg');
const akfaLogoBase64 = getBase64Image('assets/akfa-logo.png');

console.log('Assets loaded.');

const htmlContent = `<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AKFA Dilerlik Biznesi — Investor Prezentatsiyasi</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
:root {
  --akfa-red: #EE3526;
  --akfa-red-dark: #C42A1E;
  --dark-bg: #141517;
  --dark-panel: #1E2022;
  --dark-card: #272A2D;
  --dark-border: rgba(185, 190, 194, 0.18);
  --dark-border-strong: rgba(185, 190, 194, 0.32);
  --white: #FFFFFF;
  --silver: #C8CCCF;
  --neutral: #8E9499;
  --green: #10B981;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

html, body {
  background: #0B0C0D;
  font-family: var(--font-sans);
  color: var(--white);
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

/* Print / PDF Page Setup */
@page {
  size: 297mm 210mm; /* A4 Landscape */
  margin: 0;
}

@media print {
  html, body {
    background: var(--dark-bg);
  }
  .slide-page {
    width: 297mm !important;
    height: 210mm !important;
    max-height: 210mm !important;
    min-height: 210mm !important;
    page-break-after: always !important;
    break-after: page !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    margin: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }
}

/* Screen Preview Setup */
@media screen {
  body {
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    background: #08090A;
  }
  .slide-page {
    width: 297mm;
    height: 210mm;
    box-shadow: 0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
    border-radius: 4px;
    margin-bottom: 24px;
  }
}

.slide-page {
  position: relative;
  overflow: hidden;
  background: var(--dark-bg);
  color: var(--white);
  padding: 13mm 20mm 12mm 20mm;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Background layers */
.bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
}
.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(185, 190, 194, 0.08) 1px, transparent 1px);
  background-size: 22px 22px;
  z-index: 1;
}
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(20,21,23,0.92) 0%, rgba(28,30,32,0.85) 60%, rgba(20,21,23,0.96) 100%);
  z-index: 1;
}

/* Slide Content Container */
.slide-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Header Styles with Official AKFA Logo on every slide */
.slide-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.header-left {
  flex: 1;
}
.section-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--akfa-red);
  background: rgba(238, 53, 38, 0.14);
  border: 1px solid rgba(238, 53, 38, 0.45);
  padding: 3px 12px;
  border-radius: 12px;
  margin-bottom: 6px;
}
.slide-title {
  font-size: 27px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.6px;
  color: var(--white);
}
.slide-subtitle {
  font-size: 13px;
  color: var(--silver);
  margin-top: 3px;
}

/* Official AKFA Logo Badge (Top Corner) */
.akfa-logo-pill {
  background: #FFFFFF;
  padding: 6px 16px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  margin-left: 20px;
  flex-shrink: 0;
}
.akfa-logo-img {
  height: 25px;
  width: auto;
  display: block;
}

.red-accent { color: var(--akfa-red); }
.green-accent { color: var(--green); }

/* Layout Columns */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items: stretch;
  flex: 1;
}

/* Card Styles */
.card {
  background: var(--dark-panel);
  border: 1px solid var(--dark-border);
  border-radius: 10px;
  padding: 16px 20px;
  position: relative;
}

/* Financial Table */
.fin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}
.fin-table th {
  background: #18191B;
  color: var(--silver);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 10px 16px;
  text-align: left;
  border-bottom: 2px solid var(--akfa-red);
}
.fin-table th.num { text-align: right; }
.fin-table td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--dark-border);
  color: var(--silver);
}
.fin-table td.num {
  text-align: right;
  font-family: var(--font-mono);
  font-weight: 600;
}
.fin-table tr.total-row td {
  background: rgba(238, 53, 38, 0.16);
  border-top: 2px solid var(--akfa-red);
  border-bottom: 2px solid var(--akfa-red);
  font-weight: 800;
  color: var(--white);
}

/* Branch 3D Card (Slide 6) */
.branch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex: 1;
}
.branch-card-pdf {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(185, 190, 194, 0.32);
  background: #18191B;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  min-height: 215px;
}
.branch-img-pdf {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(0.9) contrast(1.18) saturate(1.2);
}
.branch-overlay-pdf {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(20,21,23,0.05) 0%, rgba(20,21,23,0.35) 45%, rgba(18,19,21,0.95) 100%);
  z-index: 1;
}
.branch-info-pdf {
  position: relative;
  z-index: 2;
}
.branch-name-pdf {
  font-size: 24px;
  font-weight: 800;
  color: var(--white);
  text-shadow: 0 2px 8px rgba(0,0,0,0.9);
}

/* Bar Chart Styling */
.chart-box {
  background: var(--dark-panel);
  border: 1px solid var(--dark-border);
  border-radius: 10px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.bars-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 250px;
  padding-top: 24px;
}
.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
}
.bar-rect {
  width: 100%;
  border-radius: 4px 4px 0 0;
  position: relative;
  min-height: 4px;
}
.bar-tag {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--white);
  white-space: nowrap;
}
.bar-month-lbl {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--neutral);
  margin-top: 8px;
  font-weight: 600;
}

/* Callout Box */
.callout-box {
  background: rgba(238, 53, 38, 0.08);
  border-left: 3px solid var(--akfa-red);
  border-radius: 0 8px 8px 0;
  padding: 14px 18px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--silver);
}

/* Footer Strip */
.slide-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(185, 190, 194, 0.12);
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--neutral);
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
</head>
<body>

<!-- ===================================================================
     PAGE 1 (Slide 1): HERO COVER
     =================================================================== -->
<section class="slide-page" id="page-1">
  <div class="bg-layer">
    <img src="${heroBgBase64}" class="bg-img" style="opacity:0.25;" alt="">
    <div class="bg-overlay"></div>
    <div class="bg-pattern"></div>
  </div>

  <div class="slide-content" style="justify-content:space-between;text-align:center;">
    <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
      <div class="section-badge" style="margin:0;">INVESTOR PREZENTATSIYASI</div>
      <div class="akfa-logo-pill" style="margin:0;">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <div style="max-width:920px;margin:auto;">
      <h1 style="font-size:64px;font-weight:900;line-height:1.05;letter-spacing:-2px;margin-bottom:18px;">
        AKFA Dilerlik <span class="red-accent">Biznesi</span>
      </h1>
      <p style="font-size:18px;color:var(--silver);max-width:760px;margin:0 auto 30px;line-height:1.5;">
        Alyuminiy va PVX profillar, aksessuarlar, isitish sistemalari va radiatorlar dilerlik tarmog'i.
      </p>

      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <div style="background:rgba(238,53,38,0.15);border:1px solid rgba(238,53,38,0.5);border-radius:30px;padding:10px 24px;font-size:14px;font-weight:700;color:#FFA59C;">
          📍 4 ta Filial
        </div>
        <div style="background:rgba(238,53,38,0.15);border:1px solid rgba(238,53,38,0.5);border-radius:30px;padding:10px 24px;font-size:14px;font-weight:700;color:#FFA59C;">
          🏭 400 ta Hamkor Sex
        </div>
        <div style="background:rgba(238,53,38,0.15);border:1px solid rgba(238,53,38,0.5);border-radius:30px;padding:10px 24px;font-size:14px;font-weight:700;color:#FFA59C;">
          🚚 7 Yillik Tajriba & Avtopark
        </div>
        <div style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.5);border-radius:30px;padding:10px 24px;font-size:14px;font-weight:700;color:#6EE7B7;">
          📊 30% Bozor Ulushi
        </div>
      </div>
    </div>

    <div class="slide-footer" style="border-top:none;">
      <span>AKFA DEALERSHIP GROUP</span>
      <span style="letter-spacing:2px;color:var(--akfa-red);font-weight:700;">KONFIDENTSIAL • INVESTOR UCHUN</span>
      <span>2023–2025 TAHLIL & PROGNOZ</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 2 (Slide 2): KOMPANIYA HAQIDA UMUMIY MA'LUMOT
     =================================================================== -->
<section class="slide-page" id="page-2">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">I. Kompaniya haqida</div>
        <h2 class="slide-title">Kompaniya Haqida <span class="red-accent">Umumiy Ma'lumot</span></h2>
        <div class="slide-subtitle">7 yillik mustahkam tajriba va profil bozoridagi yetakchilik</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <div class="two-col" style="margin: 4px 0 8px 0;">
      <!-- Left: 3 Balanced Cards (No Empty Space, Crisp Text) -->
      <div style="display:flex;flex-direction:column;gap:14px;height:100%;">
        <div class="card" style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:18px 22px;">
          <div style="font-size:13px;font-weight:800;color:var(--white);text-transform:uppercase;margin-bottom:6px;letter-spacing:0.8px;">
            Faoliyat Yo'nalishi
          </div>
          <p style="font-size:13px;color:var(--silver);line-height:1.5;margin:0;">
            AKFA kompaniyasining rasmiy dilerligi (7 yillik tajriba). Alyuminiy va PVX profillar, aksessuarlar, isitish sistemalari va radiatorlar savdosi.
          </p>
        </div>

        <div class="card" style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:18px 22px;">
          <div style="font-size:13px;font-weight:800;color:var(--white);text-transform:uppercase;margin-bottom:6px;letter-spacing:0.8px;">
            Mijoz Segmentlari & Logistika
          </div>
          <p style="font-size:13px;color:var(--silver);line-height:1.5;margin:0;">
            400+ sexlar, yirik quruvchilar, davlat ob'yektlari va ustalar. Call-center va 7 ta Gazel orqali manzilgacha bepul yetkazib berish tizimi.
          </p>
        </div>

        <div class="callout-box" style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:18px 22px;background:rgba(238,53,38,0.12);border-color:var(--akfa-red);">
          <div style="font-size:13px;font-weight:800;color:var(--white);margin-bottom:4px;letter-spacing:0.8px;">
            AKFA Brendi Bozor Quvvati:
          </div>
          <div style="font-size:13px;color:var(--silver);line-height:1.5;">
            AKFA brendi O'zbekiston profil bozorining <strong style="color:var(--akfa-red);font-size:17px;">65%</strong> ulushini egallagan.
          </div>
        </div>
      </div>

      <!-- Right: 4 Solid KPI Cards -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;height:100%;">
        <div class="card" style="border-top:4px solid var(--akfa-red);display:flex;flex-direction:column;justify-content:center;padding:20px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--neutral);letter-spacing:0.8px;">Filiallar Tarmog'i</div>
          <div style="font-family:var(--font-mono);font-size:50px;font-weight:900;color:var(--akfa-red);line-height:1.05;margin:10px 0;">4 ta</div>
          <div style="font-size:12.5px;color:var(--silver);">Olmaliq, Guliston, Bo'ka, Yangiyo'l</div>
        </div>

        <div class="card" style="border-top:4px solid var(--akfa-red);display:flex;flex-direction:column;justify-content:center;padding:20px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--neutral);letter-spacing:0.8px;">Hamkor Sexlar</div>
          <div style="font-family:var(--font-mono);font-size:50px;font-weight:900;color:var(--white);line-height:1.05;margin:10px 0;">400+</div>
          <div style="font-size:12.5px;color:var(--silver);">Doimiy xarid qiluvchi tsexlar</div>
        </div>

        <div class="card" style="display:flex;flex-direction:column;justify-content:center;padding:20px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--neutral);letter-spacing:0.8px;">Logistika Parki</div>
          <div style="font-family:var(--font-mono);font-size:50px;font-weight:900;color:var(--white);line-height:1.05;margin:10px 0;">7 ta</div>
          <div style="font-size:12.5px;color:var(--silver);">Gazel yuk mashinalari parki</div>
        </div>

        <div class="card" style="border-top:4px solid var(--green);display:flex;flex-direction:column;justify-content:center;padding:20px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--neutral);letter-spacing:0.8px;">Bozor Ulushi</div>
          <div style="font-family:var(--font-mono);font-size:50px;font-weight:900;color:var(--green);line-height:1.05;margin:10px 0;">30%</div>
          <div style="font-size:12.5px;color:var(--silver);">Toshkent viloyati bozorida</div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>02 / 12</span>
      <span>KOMPANIYA PROFILI</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 3 (Slide 3): ASOSIY KO'RSATKICHLAR — KPI DASHBOARD
     (2x2 tartib: Tepada 2023 va 2024, pastda 2025 va Prognoz. Ortiqcha oylik izohlarsiz, to'liq to'ldirilgan)
     =================================================================== -->
<section class="slide-page" id="page-3">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">Executive Dashboard</div>
        <h2 class="slide-title">Asosiy Ko'rsatkichlar — <span class="red-accent">KPI Dashboard</span></h2>
        <div class="slide-subtitle">Yillik aylanma va sof foyda ko'rsatkichlari dinamikasi</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <!-- 2x2 Grid: Tepada 2023 va 2024, Pastda 2025 va Prognoz -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1;margin:4px 0 10px 0;">
      <!-- Card 1 (Top-Left): 2023 -->
      <div class="card" style="border-top:4px solid var(--akfa-red);padding:18px 22px;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-family:var(--font-mono);font-size:17px;font-weight:800;color:#FFA59C;background:rgba(238,53,38,0.2);padding:5px 14px;border-radius:6px;border:1px solid rgba(238,53,38,0.5);">
            2023-YIL
          </div>
          <div style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:#FFA59C;background:rgba(238,53,38,0.12);padding:5px 12px;border-radius:6px;">
            Marja: 3.06%
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:10px;">
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Yillik Aylanma</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:var(--white);line-height:1.05;">
              193.2 <span style="font-size:18px;color:var(--silver);">mlrd</span>
            </div>
          </div>
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Yillik Sof Foyda</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:var(--green);line-height:1.05;">
              5.92 <span style="font-size:18px;color:#A7F3D0;">mlrd</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2 (Top-Right): 2024 -->
      <div class="card" style="border-top:4px solid #92979B;padding:18px 22px;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-family:var(--font-mono);font-size:17px;font-weight:800;color:var(--white);background:rgba(185,190,194,0.18);padding:5px 14px;border-radius:6px;border:1px solid rgba(185,190,194,0.4);">
            2024-YIL
          </div>
          <div style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--silver);background:rgba(185,190,194,0.12);padding:5px 12px;border-radius:6px;">
            Marja: 2.69%
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:10px;">
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Yillik Aylanma</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:var(--white);line-height:1.05;">
              172.2 <span style="font-size:18px;color:var(--silver);">mlrd</span>
            </div>
            <div style="font-size:11px;color:#FFA59C;font-weight:700;margin-top:2px;">▼ -10.9%</div>
          </div>
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Yillik Sof Foyda</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:var(--green);line-height:1.05;">
              4.63 <span style="font-size:18px;color:#A7F3D0;">mlrd</span>
            </div>
            <div style="font-size:11px;color:#FFA59C;font-weight:700;margin-top:2px;">▼ -21.9%</div>
          </div>
        </div>
      </div>

      <!-- Card 3 (Bottom-Left): 2025 -->
      <div class="card" style="border-top:4px solid #5A5E62;padding:18px 22px;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-family:var(--font-mono);font-size:17px;font-weight:800;color:var(--silver);background:rgba(146,151,155,0.16);padding:5px 14px;border-radius:6px;border:1px solid rgba(146,151,155,0.3);">
            2025-YIL
          </div>
          <div style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--neutral);background:rgba(146,151,155,0.12);padding:5px 12px;border-radius:6px;">
            Marja: 1.95%
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:10px;">
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Yillik Aylanma</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:var(--white);line-height:1.05;">
              133.1 <span style="font-size:18px;color:var(--silver);">mlrd</span>
            </div>
            <div style="font-size:11px;color:#FFA59C;font-weight:700;margin-top:2px;">▼ -22.7%</div>
          </div>
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(255,255,255,0.06);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Yillik Sof Foyda</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:var(--green);line-height:1.05;">
              2.59 <span style="font-size:18px;color:#A7F3D0;">mlrd</span>
            </div>
            <div style="font-size:11px;color:#FFA59C;font-weight:700;margin-top:2px;">▼ -44.0%</div>
          </div>
        </div>
      </div>

      <!-- Card 4 (Bottom-Right): PROGNOZ -->
      <div class="card" style="border-top:4px solid var(--green);background:linear-gradient(180deg,rgba(26,36,30,0.95),var(--dark-panel));padding:18px 22px;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-family:var(--font-mono);font-size:17px;font-weight:800;color:#6EE7B7;background:rgba(16,185,129,0.25);padding:5px 14px;border-radius:6px;border:1px solid rgba(16,185,129,0.65);">
            PROGNOZ
          </div>
          <div style="font-family:var(--font-mono);font-size:13px;font-weight:800;color:#6EE7B7;background:rgba(16,185,129,0.18);padding:5px 12px;border-radius:6px;">
            Marja: 1.31%
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:10px;">
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(16,185,129,0.3);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Prognoz Aylanma</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:#6EE7B7;line-height:1.05;">
              276.0 <span style="font-size:18px;color:#A7F3D0;">mlrd</span>
            </div>
            <div style="font-size:11px;color:var(--green);font-weight:700;margin-top:2px;">▲ +107.3%</div>
          </div>
          <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(16,185,129,0.3);">
            <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Prognoz Sof Foyda</div>
            <div style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:var(--green);line-height:1.05;">
              3.616 <span style="font-size:18px;color:#A7F3D0;">mlrd</span>
            </div>
            <div style="font-size:11px;color:var(--green);font-weight:700;margin-top:2px;">▲ +39.5%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Bar -->
    <div style="display:flex;background:var(--dark-panel);border:1px solid var(--dark-border);border-radius:10px;padding:12px 22px;align-items:center;justify-content:space-around;">
      <div style="text-align:center;">
        <div style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">3 Yillik Jami Aylanma</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--white);">498.5 mlrd so'm</div>
      </div>
      <div style="height:32px;width:1px;background:var(--dark-border);"></div>
      <div style="text-align:center;">
        <div style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">3 Yillik Jami Sof Foyda</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--green);">13.14 mlrd so'm</div>
      </div>
      <div style="height:32px;width:1px;background:var(--dark-border);"></div>
      <div style="text-align:center;">
        <div style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">Prognoz Yillik Aylanma</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:#6EE7B7;">276.0 mlrd so'm</div>
      </div>
      <div style="height:32px;width:1px;background:var(--dark-border);"></div>
      <div style="text-align:center;">
        <div style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">Prognoz Yillik Sof Foyda</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--green);">3.616 mlrd so'm</div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>03 / 12</span>
      <span>KPI METRIKALAR TAHLILI</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 4 (Slide 4): BIZNES MODELI VA AVZALLIKLAR
     (9 ta afzallik qisqa va aniq, bo'sh joylarsiz)
     =================================================================== -->
<section class="slide-page" id="page-4">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">Biznes Modeli</div>
        <h2 class="slide-title">Biznes Modeli va <span class="red-accent">9 Ta Strategik Afzallik</span></h2>
        <div class="slide-subtitle">Raqobatbardosh ustunliklar va hududiy bozor salohiyati</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <div class="two-col" style="margin: 4px 0 8px 0;">
      <!-- Left: 9 Advantages (Crisp, Perfectly Distributed) -->
      <div class="card" style="padding:18px 22px;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="font-size:13px;font-weight:800;text-transform:uppercase;color:var(--akfa-red);letter-spacing:1px;margin-bottom:10px;">
          9 Ta Strategik Afzallik
        </div>
        <div style="display:flex;flex-direction:column;justify-content:space-between;flex:1;gap:9px;">
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--silver);padding:4px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">01</span><span><strong>Bozor yetakchisi:</strong> AKFA — O'zbekistonda eng xaridorgir profil brendi.</span></div>
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--silver);padding:4px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">02</span><span><strong>Keng assortiment:</strong> Alyuminiy va PVX profillar, aksessuarlar, radiatorlar.</span></div>
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--silver);padding:4px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">03</span><span><strong>Himoyalangan bozor:</strong> Ichki bozor sifatsiz import raqobatchilardan himoyalangan.</span></div>
          <!-- 04: Qizil chegara bilan belgilangan -->
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--white);border:1.5px solid var(--akfa-red);background:rgba(238,53,38,0.14);border-radius:6px;padding:6px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">04</span><span><strong>Kapital xavfsizligi:</strong> Narxlar $ hisobida; tovar aynimaydi va zanglamaydi.</span></div>
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--silver);padding:4px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">05</span><span><strong>100% Shaffoflik:</strong> Rasmiy schyot-faktura va to'liq buxgalteriya nazorati.</span></div>
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--silver);padding:4px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">06</span><span><strong>O'sayotgan talab:</strong> Yangi qurilishlar soni va profilga ehtiyoj uzluksiz oshmoqda.</span></div>
          <!-- 07: Qizil chegara bilan belgilangan -->
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--white);border:1.5px solid var(--akfa-red);background:rgba(238,53,38,0.14);border-radius:6px;padding:6px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">07</span><span><strong>Fokus va tajriba:</strong> 7 yildan beri faqat ushbu sohaga yo'naltirilgan tajriba.</span></div>
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--silver);padding:4px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">08</span><span><strong>Tezkor servis:</strong> 7 ta Gazel orqali manzilgacha bepul yetkazib berish.</span></div>
          <!-- 09: Qizil chegara bilan belgilangan -->
          <div style="display:flex;gap:10px;font-size:12.5px;color:var(--white);border:1.5px solid var(--akfa-red);background:rgba(238,53,38,0.14);border-radius:6px;padding:6px 8px;"><span style="color:var(--akfa-red);font-family:var(--font-mono);font-weight:800;min-width:22px;">09</span><span><strong>To'xtamas savdo:</strong> Qurilish to'xtamaydi — AKFA mahsulotlariga talab doimiy.</span></div>
        </div>
      </div>

      <!-- Right: Market Volume Table & Potential (Evenly Filled) -->
      <div style="display:flex;flex-direction:column;gap:16px;height:100%;">
        <div class="card" style="flex:1;padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;">
          <div style="font-size:13px;font-weight:800;text-transform:uppercase;color:var(--silver);letter-spacing:1px;margin-bottom:12px;">
            Bozor Hajmi va Bizning Ulush
          </div>
          <table class="fin-table" style="margin:auto 0;">
            <thead>
              <tr>
                <th>Hudud</th>
                <th class="num">Bozor Hajmi</th>
                <th class="num">Bizning Ulush</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Toshkent viloyati</strong></td>
                <td class="num">3 mln $/oy</td>
                <td class="num" style="color:var(--akfa-red);font-size:16px;font-weight:800;">30%</td>
              </tr>
              <tr>
                <td><strong>Sirdaryo viloyati</strong></td>
                <td class="num">2 mln $/oy</td>
                <td class="num" style="color:var(--akfa-red);font-size:16px;font-weight:800;">30%</td>
              </tr>
              <tr style="background:rgba(238,53,38,0.12);">
                <td><strong>Toshkent shahri</strong></td>
                <td class="num" style="color:var(--white);font-weight:800;">25–30 mln $/oy</td>
                <td class="num" style="color:#FFA59C;font-weight:800;">&lt; 1% (Katta Salohiyat)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout-box" style="padding:20px 22px;background:rgba(238,53,38,0.12);border-color:var(--akfa-red);">
          <div style="font-size:14px;font-weight:800;color:var(--white);margin-bottom:6px;">
            🚀 Toshkent Shahri — Katta Bozor Salohiyati:
          </div>
          <div style="font-size:13px;color:var(--silver);line-height:1.55;">
            Toshkent shahrida oylik profil aylanmasi <strong>25–30 mln $</strong> bo'lib, aylanma mablag'ni oshirish orqali ushbu bozorga kirish korxona foydasini karrali oshirish imkonini beradi.
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>04 / 12</span>
      <span>STRATEGIK AVZALLIKLAR</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 5 (Slide 5 + 6 Birlashtirilgan): FILIALLAR TARMOG'I
     =================================================================== -->
<section class="slide-page" id="page-5">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">II. Filiallar Tarmog'i</div>
        <h2 class="slide-title">Filiallar Tarmog'i — <span class="red-accent">Umumiy Ko'rinish</span></h2>
        <div class="slide-subtitle">4 ta filial • 400 ta hamkor sex • 7 ta logistika transporti</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <div class="two-col" style="margin: 4px 0 8px 0;">
      <!-- Left Table & Info -->
      <div class="card" style="padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:13px;font-weight:800;text-transform:uppercase;color:var(--silver);letter-spacing:1px;margin-bottom:14px;">
            Filiallar Bo'yicha Sexlar Taqsimoti
          </div>
          <table class="fin-table">
            <thead>
              <tr>
                <th>Filial</th>
                <th class="num">Sexlar Soni</th>
                <th class="num">Ulushi (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Olmaliq</strong></td>
                <td class="num" style="color:var(--akfa-red);font-weight:800;font-size:15px;">110</td>
                <td class="num">27.5%</td>
              </tr>
              <tr>
                <td><strong>Guliston</strong></td>
                <td class="num" style="color:#FF6B5A;font-weight:800;font-size:15px;">110</td>
                <td class="num">27.5%</td>
              </tr>
              <tr>
                <td><strong>Bo'ka</strong></td>
                <td class="num" style="color:var(--white);font-weight:800;font-size:15px;">90</td>
                <td class="num">22.5%</td>
              </tr>
              <tr>
                <td><strong>Yangiyo'l</strong></td>
                <td class="num" style="color:var(--white);font-weight:800;font-size:15px;">90</td>
                <td class="num">22.5%</td>
              </tr>
              <tr class="total-row">
                <td><strong>JAMI</strong></td>
                <td class="num" style="font-size:16px;"><strong>400</strong></td>
                <td class="num"><strong>100.0%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout-box" style="margin-top:16px;padding:16px 20px;">
          Har bir filial zamonaviy omborxona, xaridorgir profil zaxirasi va Gazel transportiga ega.
        </div>
      </div>

      <!-- Right Donut Chart & Legend -->
      <div class="card" style="padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;">
        <div style="font-size:13px;font-weight:800;text-transform:uppercase;color:var(--silver);letter-spacing:1px;width:100%;">
          Hamkor Sexlar Strukturasi
        </div>

        <svg viewBox="0 0 280 280" style="width:220px;height:220px;margin:10px auto;display:block;">
          <circle cx="140" cy="140" r="105" fill="none" stroke="rgba(185,190,194,0.12)" stroke-width="38"/>
          <!-- Olmaliq 27.5% -->
          <circle cx="140" cy="140" r="105" fill="none" stroke="#EE3526" stroke-width="38"
                  stroke-dasharray="181.4 478.3" stroke-dashoffset="0" transform="rotate(-90 140 140)"/>
          <!-- Guliston 27.5% -->
          <circle cx="140" cy="140" r="105" fill="none" stroke="#FF6B5A" stroke-width="38"
                  stroke-dasharray="181.4 478.3" stroke-dashoffset="-181.4" transform="rotate(-90 140 140)"/>
          <!-- Bo'ka 22.5% -->
          <circle cx="140" cy="140" r="105" fill="none" stroke="#52565A" stroke-width="38"
                  stroke-dasharray="148.4 511.3" stroke-dashoffset="-362.8" transform="rotate(-90 140 140)"/>
          <!-- Yangiyo'l 22.5% -->
          <circle cx="140" cy="140" r="105" fill="none" stroke="#92979B" stroke-width="38"
                  stroke-dasharray="148.4 511.3" stroke-dashoffset="-511.2" transform="rotate(-90 140 140)"/>
          <!-- Center Text -->
          <text x="140" y="132" text-anchor="middle" fill="#FFFFFF" font-size="34" font-weight="900" font-family="JetBrains Mono">400</text>
          <text x="140" y="156" text-anchor="middle" fill="#B9BEC2" font-size="12" font-weight="600" font-family="Inter">hamkor sex</text>
        </svg>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;">
          <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--silver);">
            <div style="width:10px;height:10px;border-radius:2px;background:#EE3526;"></div>
            <span><strong>Olmaliq:</strong> 110 (27.5%)</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--silver);">
            <div style="width:10px;height:10px;border-radius:2px;background:#FF6B5A;"></div>
            <span><strong>Guliston:</strong> 110 (27.5%)</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--silver);">
            <div style="width:10px;height:10px;border-radius:2px;background:#52565A;"></div>
            <span><strong>Bo'ka:</strong> 90 (22.5%)</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--silver);">
            <div style="width:10px;height:10px;border-radius:2px;background:#92979B;"></div>
            <span><strong>Yangiyo'l:</strong> 90 (22.5%)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>05 / 12</span>
      <span>FILIALLAR TARMOG'I</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 6 (Slide 7): FILIALLAR — ALOHIDA KO'RINISH (3D MAKETLAR)
     =================================================================== -->
<section class="slide-page" id="page-6">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">Filiallar Arxitekturasi</div>
        <h2 class="slide-title">Filiallar — <span class="red-accent">Alohida Ko'rinish</span></h2>
        <div class="slide-subtitle">4 ta asosiy filialning zamonaviy 3D ko'rinishi va operatsion ko'rsatkichlari</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <div class="branch-grid" style="margin: 4px 0 8px 0;">
      <!-- Olmaliq -->
      <div class="branch-card-pdf">
        <img src="${branchOlmaliqBase64}" class="branch-img-pdf" alt="Olmaliq filiali">
        <div class="branch-overlay-pdf"></div>
        <div class="branch-info-pdf">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div class="branch-name-pdf">Olmaliq Filiali</div>
            <div style="font-family:var(--font-mono);font-size:26px;font-weight:900;color:rgba(255,255,255,0.45);">01</div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <span style="font-size:12px;background:rgba(23,24,25,0.85);border:1px solid rgba(238,53,38,0.6);border-radius:12px;padding:4px 12px;color:var(--white);font-weight:700;">
              👥 110 ta sex
            </span>
            <span style="font-size:12px;background:rgba(23,24,25,0.85);border:1px solid rgba(185,190,194,0.35);border-radius:12px;padding:4px 12px;color:var(--silver);">
              📊 27.5% tarmoq ulushi
            </span>
          </div>
        </div>
      </div>

      <!-- Guliston -->
      <div class="branch-card-pdf">
        <img src="${branchGulistonBase64}" class="branch-img-pdf" alt="Guliston filiali">
        <div class="branch-overlay-pdf"></div>
        <div class="branch-info-pdf">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div class="branch-name-pdf">Guliston Filiali</div>
            <div style="font-family:var(--font-mono);font-size:26px;font-weight:900;color:rgba(255,255,255,0.45);">02</div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <span style="font-size:12px;background:rgba(23,24,25,0.85);border:1px solid rgba(238,53,38,0.6);border-radius:12px;padding:4px 12px;color:var(--white);font-weight:700;">
              👥 110 ta sex
            </span>
            <span style="font-size:12px;background:rgba(23,24,25,0.85);border:1px solid rgba(185,190,194,0.35);border-radius:12px;padding:4px 12px;color:var(--silver);">
              📊 27.5% tarmoq ulushi
            </span>
          </div>
        </div>
      </div>

      <!-- Bo'ka -->
      <div class="branch-card-pdf">
        <img src="${branchBokaBase64}" class="branch-img-pdf" alt="Bo'ka filiali">
        <div class="branch-overlay-pdf"></div>
        <div class="branch-info-pdf">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div class="branch-name-pdf">Bo'ka Filiali</div>
            <div style="font-family:var(--font-mono);font-size:26px;font-weight:900;color:rgba(255,255,255,0.45);">03</div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <span style="font-size:12px;background:rgba(23,24,25,0.85);border:1px solid rgba(238,53,38,0.6);border-radius:12px;padding:4px 12px;color:var(--white);font-weight:700;">
              👥 90 ta sex
            </span>
            <span style="font-size:12px;background:rgba(23,24,25,0.85);border:1px solid rgba(185,190,194,0.35);border-radius:12px;padding:4px 12px;color:var(--silver);">
              📊 22.5% tarmoq ulushi
            </span>
          </div>
        </div>
      </div>

      <!-- Yangiyo'l -->
      <div class="branch-card-pdf">
        <img src="${branchYangiyolBase64}" class="branch-img-pdf" alt="Yangiyo'l filiali">
        <div class="branch-overlay-pdf"></div>
        <div class="branch-info-pdf">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div class="branch-name-pdf">Yangiyo'l Filiali</div>
            <div style="font-family:var(--font-mono);font-size:26px;font-weight:900;color:rgba(255,255,255,0.45);">04</div>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <span style="font-size:12px;background:rgba(23,24,25,0.85);border:1px solid rgba(238,53,38,0.6);border-radius:12px;padding:4px 12px;color:var(--white);font-weight:700;">
              👥 90 ta sex
            </span>
            <span style="font-size:12px;background:rgba(238,53,38,0.85);border:1px solid rgba(185,190,194,0.35);border-radius:12px;padding:4px 12px;color:var(--silver);">
              📊 22.5% tarmoq ulushi
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>06 / 12</span>
      <span>FILIALLAR VIZUAL ARXITEKTURASI</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 7 (Slide 21): INVESTORGA TAKLIF
     (Hamkorlik taklifi, qisqa va aniq bandlar, to'liq to'ldirilgan)
     =================================================================== -->
<section class="slide-page" id="page-7">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">VI. Strategik Hamkorlik</div>
        <h2 class="slide-title">Investorga <span class="red-accent">Taklif</span></h2>
        <div class="slide-subtitle">O'zaro manfaatli uzoq muddatli sheriklik va kapitalni ko'paytirish</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <div class="two-col" style="margin: 4px 0 8px 0;">
      <!-- Left: Handshake Photo Card (Full Height) -->
      <div style="position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(238,53,38,0.4);box-shadow:0 12px 32px rgba(0,0,0,0.6);display:flex;flex-direction:column;justify-content:flex-end;padding:22px;height:100%;">
        <img src="${handshakeBase64}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;" alt="Business Handshake">
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(20,21,23,0.1) 0%,rgba(20,21,23,0.3) 50%,rgba(20,21,23,0.92) 100%);z-index:1;"></div>
        <div style="position:relative;z-index:2;">
          <div style="display:inline-block;background:rgba(238,53,38,0.25);border:1px solid rgba(238,53,38,0.6);border-radius:20px;padding:5px 16px;font-size:12px;font-weight:700;color:#FFA59C;margin-bottom:8px;">
            🤝 Strategik Hamkorlik
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--white);text-shadow:0 2px 10px rgba(0,0,0,0.9);">
            Ishonchli va Barqaror Sheriklik
          </div>
        </div>
      </div>

      <!-- Right: 4 Balanced Cards (No Empty Space, Crisp Text) -->
      <div style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;height:100%;">
        <div class="card" style="flex:1;padding:18px 22px;border-left:4px solid var(--akfa-red);display:flex;flex-direction:column;justify-content:center;">
          <div style="font-size:14.5px;font-weight:800;color:var(--white);margin-bottom:5px;">
            1. 100% Likvid va Himoyalangan Kapital
          </div>
          <div style="font-size:12.5px;color:var(--silver);line-height:1.45;">
            Mablag'lar valyutaga ($) bog'langan xaridorgir AKFA profillarida aylanadi. Tovar o'z qiymatini yo'qotmaydi, aynimaydi va zanglamaydi.
          </div>
        </div>

        <div class="card" style="flex:1;padding:18px 22px;border-left:4px solid var(--green);display:flex;flex-direction:column;justify-content:center;">
          <div style="font-size:14.5px;font-weight:800;color:var(--white);margin-bottom:5px;">
            2. Katta Bozorga Chiqish (Toshkent Shahri)
          </div>
          <div style="font-size:12.5px;color:var(--silver);line-height:1.45;">
            Aylanma mablag' hajmini oshirish evaziga poytaxtdagi yirik qurilish ob'yektlari va doimiy talabga ega yangi loyihalarni qamrab olish.
          </div>
        </div>

        <div class="card" style="flex:1;padding:18px 22px;border-left:4px solid #60A5FA;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-size:14.5px;font-weight:800;color:var(--white);margin-bottom:5px;">
            3. Shaffof Buxgalteriya va To'liq Nazorat
          </div>
          <div style="font-size:12.5px;color:var(--silver);line-height:1.45;">
            100% rasmiy hisob-kitoblar, schyot-fakturalar, doimiy moliyaviy audit hamda kelishilgan muddatda sof foyda taqsimoti.
          </div>
        </div>

        <div class="callout-box" style="flex:1;padding:18px 22px;display:flex;flex-direction:column;justify-content:center;">
          <div style="color:var(--white);font-size:13.5px;font-weight:800;margin-bottom:4px;">Investitsiya Shartlari:</div>
          <div style="font-size:12.5px;color:var(--silver);line-height:1.45;">
            Investor ulushi, kompaniya bahosi va chiqish shartlari muzokaralar asosida individual va shaffof tarzda kelishiladi.
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>07 / 12</span>
      <span>INVESTOR TAKLIFI</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 8 (Slide 22): INVESTOR PROGNOZI — UMUMIY KO'RINISH
     (Ortiqcha oylik izohlarsiz, to'liq to'ldirilgan va aniq 3.616 mlrd)
     =================================================================== -->
<section class="slide-page" id="page-8">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">Investor Prognozi</div>
        <h2 class="slide-title">Investor Prognozi — <span class="red-accent">Umumiy Ko'rinish</span></h2>
        <div class="slide-subtitle">Yillik aylanma va sof foyda bo'yicha asosiy moliyaviy maqsadlar</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <!-- 2 Main Cards: Fully Balanced, Bold & Beautiful -->
    <div class="two-col" style="margin: 4px 0 12px 0;">
      <!-- Aylanma Card -->
      <div class="card" style="padding:22px 26px;border-top:4px solid var(--akfa-red);display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:12.5px;font-weight:700;color:var(--neutral);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">
            PROGNOZ YILLIK AYLANMA
          </div>
          <div style="font-family:var(--font-mono);font-size:52px;font-weight:900;color:var(--white);line-height:1.05;margin-bottom:12px;">
            276.00 <span style="font-size:22px;color:var(--silver);">mlrd so'm</span>
          </div>

          <div style="display:flex;gap:10px;margin-bottom:14px;">
            <div style="background:rgba(238,53,38,0.18);border-radius:6px;padding:8px 14px;border:1px solid rgba(238,53,38,0.4);font-size:12.5px;font-weight:700;color:#FFA59C;">
              ▲ +107.3% (2025-yilga nisbatan)
            </div>
            <div style="background:rgba(185,190,194,0.14);border-radius:6px;padding:8px 14px;border:1px solid rgba(185,190,194,0.3);font-size:12.5px;font-weight:700;color:var(--white);">
              ▲ +42.8% (2023-yilga nisbatan)
            </div>
          </div>
        </div>

        <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:8px;">
          <div style="font-size:12.5px;color:var(--silver);"><strong style="color:var(--white);">Maqsadli Bozor:</strong> Toshkent shahri va viloyatlardagi yirik ob'yektlar</div>
          <div style="font-size:12.5px;color:var(--silver);"><strong style="color:var(--white);">O'sish Asosi:</strong> 4 ta filial omborlaridagi tovar qoldig'ini oshirish</div>
        </div>
      </div>

      <!-- Sof Foyda Card (3.616 mlrd) -->
      <div class="card" style="padding:22px 26px;border-top:4px solid var(--green);background:linear-gradient(180deg,rgba(24,34,28,0.95),var(--dark-panel));display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:12.5px;font-weight:700;color:#A7F3D0;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">
            PROGNOZ YILLIK SOF FOYDA
          </div>
          <div style="font-family:var(--font-mono);font-size:52px;font-weight:900;color:var(--green);line-height:1.05;margin-bottom:12px;">
            3.616 <span style="font-size:22px;color:#A7F3D0;">mlrd so'm</span>
          </div>

          <div style="display:flex;gap:10px;margin-bottom:14px;">
            <div style="background:rgba(16,185,129,0.2);border-radius:6px;padding:8px 14px;border:1px solid rgba(16,185,129,0.5);font-size:12.5px;font-weight:700;color:#6EE7B7;">
              ▲ +39.5% (2025-yilga nisbatan)
            </div>
            <div style="background:rgba(185,190,194,0.14);border-radius:6px;padding:8px 14px;border:1px solid rgba(185,190,194,0.3);font-size:12.5px;font-weight:700;color:var(--white);">
              ▼ -38.9% (2023-yilga nisbatan)
            </div>
          </div>
        </div>

        <div style="background:var(--dark-card);border-radius:8px;padding:14px 18px;border:1px solid rgba(16,185,129,0.25);display:flex;flex-direction:column;gap:8px;">
          <div style="font-size:12.5px;color:var(--silver);"><strong style="color:var(--white);">Foyda Marjasi:</strong> 1.31% o'rtacha yillik rentabellik</div>
          <div style="font-size:12.5px;color:var(--silver);"><strong style="color:var(--white);">Kapital Xavfsizligi:</strong> Valyutaga ($) bog'langan xaridorgir tovarlar</div>
        </div>
      </div>
    </div>

    <!-- 4 Sub-Metrics Strip -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;">
      <div class="card" style="padding:14px 18px;text-align:center;">
        <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;">Foyda Marjasi</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--white);margin-top:2px;">1.31%</div>
      </div>
      <div class="card" style="padding:14px 18px;text-align:center;">
        <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;">Mahsulot Qiymati</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--akfa-red);margin-top:2px;">$ Hisobida</div>
      </div>
      <div class="card" style="padding:14px 18px;text-align:center;">
        <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;">Kafolat</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--green);margin-top:2px;">100% Rasmiy</div>
      </div>
      <div class="card" style="padding:14px 18px;text-align:center;">
        <div style="font-size:11px;font-weight:700;color:var(--neutral);text-transform:uppercase;">Maqsadli Bozor</div>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:#6EE7B7;margin-top:2px;">Toshkent Shahri</div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>08 / 12</span>
      <span>INVESTOR PROGNOZI KPI</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 9 (Slide 23): INVESTOR PROGNOZI — 12 OYLIK JADVAL
     (Ortiqcha izohlarsiz, toza 4 ta ustun, Iyul: 416 mln, Jami: 3.616 mlrd)
     =================================================================== -->
<section class="slide-page" id="page-9">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">Investor Prognozi</div>
        <h2 class="slide-title">Investor Prognozi — <span class="red-accent">12 Oylik Jadval</span></h2>
        <div class="slide-subtitle">Oylik aylanma, sof foyda va marjinal rentabellik</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <!-- Clean 4-column financial table (Marjasiz) -->
    <div class="card" style="padding:14px 20px;flex:1;display:flex;flex-direction:column;justify-content:center;margin:4px 0 8px 0;">
      <table class="fin-table">
        <thead>
          <tr>
            <th style="width:50px;">№</th>
            <th>Oy</th>
            <th class="num">Aylanma (so'm)</th>
            <th class="num">Sof Foyda (so'm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Yanvar</td>
            <td class="num">16,000,000,000</td>
            <td class="num" style="color:var(--green);">168,000,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Fevral</td>
            <td class="num">17,000,000,000</td>
            <td class="num" style="color:var(--green);">184,000,000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mart</td>
            <td class="num">18,000,000,000</td>
            <td class="num" style="color:var(--green);">200,000,000</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Aprel</td>
            <td class="num">21,000,000,000</td>
            <td class="num" style="color:var(--green);">248,000,000</td>
          </tr>
          <tr>
            <td>5</td>
            <td>May</td>
            <td class="num">24,000,000,000</td>
            <td class="num" style="color:var(--green);">328,000,000</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Iyun</td>
            <td class="num">26,000,000,000</td>
            <td class="num" style="color:var(--green);">360,000,000</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Iyul</td>
            <td class="num">27,000,000,000</td>
            <td class="num" style="color:var(--green);">416,000,000</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Avgust</td>
            <td class="num">30,000,000,000</td>
            <td class="num" style="color:var(--green);">424,000,000</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Sentabr</td>
            <td class="num">30,000,000,000</td>
            <td class="num" style="color:var(--green);">424,000,000</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Oktabr</td>
            <td class="num">26,000,000,000</td>
            <td class="num" style="color:var(--green);">360,000,000</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Noyabr</td>
            <td class="num">23,000,000,000</td>
            <td class="num" style="color:var(--green);">312,000,000</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Dekabr</td>
            <td class="num">18,000,000,000</td>
            <td class="num" style="color:var(--green);">192,000,000</td>
          </tr>
          <!-- Total Row: Aniq 3,616,000,000 so'm (3.616 mlrd) -->
          <tr class="total-row">
            <td></td>
            <td><strong>JAMI</strong></td>
            <td class="num" style="font-size:15px;"><strong>276,000,000,000</strong></td>
            <td class="num" style="color:#6EE7B7;font-size:16px;"><strong>3,616,000,000</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>09 / 12</span>
      <span>12 OYLIK REJA JADVALI</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 10 (Slide 24): INVESTOR PROGNOZI — OYLIK GRAFIKLAR
     (Grafiklar to'liq balandlikda to'ldirilgan)
     =================================================================== -->
<section class="slide-page" id="page-10">
  <div class="bg-pattern"></div>
  <div class="slide-content">
    <div class="slide-header">
      <div class="header-left">
        <div class="section-badge">Investor Prognozi</div>
        <h2 class="slide-title">Investor Prognozi — <span class="red-accent">Oylik Grafiklar</span></h2>
        <div class="slide-subtitle">12 oylik aylanma va sof foyda dinamikasi</div>
      </div>
      <div class="akfa-logo-pill">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <div class="two-col" style="margin: 4px 0 10px 0;">
      <!-- Chart 1: Aylanma -->
      <div class="chart-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:800;text-transform:uppercase;color:var(--silver);letter-spacing:1px;">
            Aylanma (mlrd so'm)
          </div>
          <div style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--akfa-red);">
            Jami: 276.0 mlrd
          </div>
        </div>

        <div class="bars-wrap">
          <div class="bar-col"><div class="bar-rect" style="height:53.3%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">16</span></div><span class="bar-month-lbl">Yan</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:56.7%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">17</span></div><span class="bar-month-lbl">Fev</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:60.0%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">18</span></div><span class="bar-month-lbl">Mar</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:70.0%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">21</span></div><span class="bar-month-lbl">Apr</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:80.0%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">24</span></div><span class="bar-month-lbl">May</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:86.7%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">26</span></div><span class="bar-month-lbl">Iyun</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:90.0%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">27</span></div><span class="bar-month-lbl">Iyul</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:100.0%;background:linear-gradient(180deg,#FF6B5A,#EE3526);"><span class="bar-tag" style="color:#FFA59C;">30</span></div><span class="bar-month-lbl">Avg</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:100.0%;background:linear-gradient(180deg,#FF6B5A,#EE3526);"><span class="bar-tag" style="color:#FFA59C;">30</span></div><span class="bar-month-lbl">Sen</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:86.7%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">26</span></div><span class="bar-month-lbl">Okt</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:76.7%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">23</span></div><span class="bar-month-lbl">Noy</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:60.0%;background:linear-gradient(180deg,#EE3526,#8A1910);"><span class="bar-tag">18</span></div><span class="bar-month-lbl">Dek</span></div>
        </div>
      </div>

      <!-- Chart 2: Foyda (Iyul 416 mln) -->
      <div class="chart-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:800;text-transform:uppercase;color:var(--silver);letter-spacing:1px;">
            Sof Foyda (mln so'm)
          </div>
          <div style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--green);">
            Jami: 3.616 mlrd UZS
          </div>
        </div>

        <div class="bars-wrap">
          <div class="bar-col"><div class="bar-rect" style="height:39.6%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">168</span></div><span class="bar-month-lbl">Yan</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:43.4%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">184</span></div><span class="bar-month-lbl">Fev</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:47.2%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">200</span></div><span class="bar-month-lbl">Mar</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:58.5%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">248</span></div><span class="bar-month-lbl">Apr</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:77.4%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">328</span></div><span class="bar-month-lbl">May</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:84.9%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">360</span></div><span class="bar-month-lbl">Iyun</span></div>
          <!-- Iyul: 416 mln -->
          <div class="bar-col"><div class="bar-rect" style="height:98.1%;background:linear-gradient(180deg,#34D399,#059669);"><span class="bar-tag" style="color:#6EE7B7;font-weight:900;">416</span></div><span class="bar-month-lbl" style="color:var(--green);font-weight:800;">Iyul</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:100.0%;background:linear-gradient(180deg,#34D399,#059669);"><span class="bar-tag" style="color:#6EE7B7;font-weight:900;">424</span></div><span class="bar-month-lbl">Avg</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:100.0%;background:linear-gradient(180deg,#34D399,#059669);"><span class="bar-tag" style="color:#6EE7B7;font-weight:900;">424</span></div><span class="bar-month-lbl">Sen</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:84.9%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">360</span></div><span class="bar-month-lbl">Okt</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:73.6%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">312</span></div><span class="bar-month-lbl">Noy</span></div>
          <div class="bar-col"><div class="bar-rect" style="height:45.3%;background:linear-gradient(180deg,#10B981,#065F46);"><span class="bar-tag">192</span></div><span class="bar-month-lbl">Dek</span></div>
        </div>
      </div>
    </div>

    <!-- Summary Bar -->
    <div style="display:flex;background:var(--dark-panel);border:1px solid var(--dark-border);border-radius:10px;padding:12px 22px;align-items:center;justify-content:space-around;">
      <div style="text-align:center;">
        <span style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">JAMI AYLANMA</span>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--white);">276.00 mlrd so'm</div>
      </div>
      <div style="height:32px;width:1px;background:var(--dark-border);"></div>
      <div style="text-align:center;">
        <span style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">JAMI SOF FOYDA</span>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--green);">3.616 mlrd so'm</div>
      </div>
      <div style="height:32px;width:1px;background:var(--dark-border);"></div>
      <div style="text-align:center;">
        <span style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">FOYDA MARJASI</span>
        <div style="font-family:var(--font-mono);font-size:22px;font-weight:800;color:#6EE7B7;">1.31%</div>
      </div>
      <div style="height:32px;width:1px;background:var(--dark-border);"></div>
      <div style="text-align:center;">
        <span style="font-size:11px;color:var(--neutral);font-weight:700;text-transform:uppercase;">ENG YUQORI OYLAR</span>
        <div style="font-family:var(--font-mono);font-size:18px;font-weight:700;color:var(--white);">Avgust & Sentabr (424 mln), Iyul (416 mln)</div>
      </div>
    </div>

    <div class="slide-footer">
      <span>AKFA DILERLIK BIZNESI</span>
      <span>10 / 12</span>
      <span>OYLIK GRAFIKLAR TAHLILI</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 11: YANGI HAMKORLIGIMIZ BARAKALI BO'LSIN
     =================================================================== -->
<section class="slide-page" id="page-11">
  <div class="bg-layer">
    <img src="${heroBgBase64}" class="bg-img" style="opacity:0.2;" alt="">
    <div class="bg-overlay"></div>
    <div class="bg-pattern"></div>
  </div>

  <div class="slide-content" style="justify-content:space-between;text-align:center;">
    <!-- Top Bar with Logo -->
    <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
      <div class="section-badge" style="margin:0;">STRATEGIK HAMKORLIK</div>
      <div class="akfa-logo-pill" style="margin:0;">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <!-- Center -->
    <div style="max-width:900px;margin:auto;">
      <h1 style="font-size:56px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:8px;">
        Yangi Hamkorligimiz <span class="red-accent">Barakali Bo'lsin!</span>
      </h1>
      <p style="font-size:16px;color:var(--silver);margin-bottom:16px;">
        AKFA Dilerlik Biznesi & Investor — Ishonchli Sheriklik va Muvaffaqiyatli Kelajak Sari
      </p>

      <!-- Handshake Image Container -->
      <div style="position:relative;width:560px;height:240px;margin:0 auto 18px auto;border-radius:14px;overflow:hidden;border:1px solid rgba(238,53,38,0.5);box-shadow:0 16px 44px rgba(0,0,0,0.7), 0 0 30px rgba(238,53,38,0.18);">
        <img src="${handshakeBase64}" style="width:100%;height:100%;object-fit:cover;object-position:center 45%;display:block;" alt="Hamkorlik Qo'l Siqishish">
        <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(20,21,23,0.02) 0%, rgba(20,21,23,0.15) 60%, rgba(20,21,23,0.85) 100%);"></div>
        <div style="position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:12px;">
          <div style="background:rgba(20,21,23,0.85);border:1px solid rgba(238,53,38,0.6);border-radius:20px;padding:5px 18px;font-size:12px;font-weight:700;color:#FFA59C;backdrop-filter:blur(6px);">
            🤝 Strategik Hamkorlik
          </div>
          <div style="background:rgba(20,21,23,0.85);border:1px solid rgba(16,185,129,0.6);border-radius:20px;padding:5px 18px;font-size:12px;font-weight:700;color:#6EE7B7;backdrop-filter:blur(6px);">
            💼 Ishonchli va Barqaror Kelajak
          </div>
        </div>
      </div>

      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <div style="background:rgba(238,53,38,0.15);border:1px solid rgba(238,53,38,0.5);border-radius:30px;padding:9px 24px;font-size:13.5px;font-weight:700;color:#FFA59C;">
          🤝 O'zaro Manfaatli Hamkorlik
        </div>
        <div style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.5);border-radius:30px;padding:9px 24px;font-size:13.5px;font-weight:700;color:#6EE7B7;">
          📈 Barqaror O'sish & Yuqori Daromad
        </div>
        <div style="background:rgba(185,190,194,0.15);border:1px solid rgba(185,190,194,0.35);border-radius:30px;padding:9px 24px;font-size:13.5px;font-weight:700;color:var(--white);">
          🔒 100% Shaffof va Himoyalangan Kapital
        </div>
      </div>
    </div>

    <div class="slide-footer" style="border-top:none;">
      <span>AKFA DEALERSHIP GROUP</span>
      <span style="letter-spacing:2px;color:var(--akfa-red);font-weight:700;">INVESTOR TAQDIMOTI • 2026</span>
      <span>11 / 12</span>
    </div>
  </div>
</section>


<!-- ===================================================================
     PAGE 12 (Slide 27): RAHMAT (YAKUNIY SAHIFA)
     =================================================================== -->
<section class="slide-page" id="page-12">
  <div class="bg-layer">
    <img src="${heroBgBase64}" class="bg-img" style="opacity:0.2;" alt="">
    <div class="bg-overlay"></div>
    <div class="bg-pattern"></div>
  </div>

  <div class="slide-content" style="justify-content:space-between;text-align:center;">
    <!-- Top Bar with Logo -->
    <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
      <div class="section-badge" style="margin:0;">TAQDIMOT YAKUNI</div>
      <div class="akfa-logo-pill" style="margin:0;">
        <img src="${akfaLogoBase64}" alt="AKFA" class="akfa-logo-img">
      </div>
    </div>

    <!-- Center -->
    <div style="max-width:850px;margin:auto;">
      <h1 style="font-size:72px;font-weight:900;line-height:1.05;letter-spacing:-2px;margin-bottom:16px;">
        E'tiboringiz Uchun <span class="red-accent">Rahmat</span>
      </h1>
      <p style="font-size:18px;color:var(--silver);margin-bottom:28px;">
        AKFA Dilerlik Biznesi — Investor Prezentatsiyasi
      </p>

      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <div style="background:rgba(238,53,38,0.15);border:1px solid rgba(238,53,38,0.5);border-radius:30px;padding:10px 26px;font-size:14px;font-weight:700;color:#FFA59C;">
          📄 Konfidentsial Hujjat
        </div>
        <div style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.5);border-radius:30px;padding:10px 26px;font-size:14px;font-weight:700;color:#6EE7B7;">
          🤝 Strategik Hamkorlik Uchun Ochiqmiz
        </div>
        <div style="background:rgba(185,190,194,0.15);border:1px solid rgba(185,190,194,0.35);border-radius:30px;padding:10px 26px;font-size:14px;font-weight:700;color:var(--white);">
          🏭 4 ta Filial & 400 ta Hamkor Sex
        </div>
      </div>
    </div>

    <div class="slide-footer" style="border-top:none;">
      <span>AKFA DEALERSHIP GROUP</span>
      <span style="letter-spacing:2px;color:var(--akfa-red);font-weight:700;">INVESTOR TAQDIMOTI • 2026</span>
      <span>12 / 12</span>
    </div>
  </div>
</section>

</body>
</html>
`;

const htmlFilePath = path.resolve(__dirname, 'presentation-pdf.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log('Saved presentation-pdf.html');

// Render PDF via Chrome or Edge Headless
function findBrowserPath() {
  const candidates = [
    process.env.CHROME_BIN,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ].filter(Boolean);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return 'chrome';
}

const browserPath = findBrowserPath();
const pdfOutputPath = path.resolve(__dirname, 'AKFA_Investor_Prezentatsiyasi.pdf');

console.log('Rendering PDF via headless browser (' + browserPath + ')...');
const browserArgs = [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--run-all-compositor-stages-before-draw',
  `--print-to-pdf=${pdfOutputPath}`,
  htmlFilePath
];

const res = spawnSync(browserPath, browserArgs, { encoding: 'utf-8' });
if (res.status === 0 && fs.existsSync(pdfOutputPath)) {
  const stats = fs.statSync(pdfOutputPath);
  console.log('SUCCESS! PDF generated: ' + pdfOutputPath);
  console.log('File size: ' + (stats.size / 1024 / 1024).toFixed(2) + ' MB (' + stats.size + ' bytes)');
} else {
  console.error('Failed to generate PDF. Exit code:', res.status);
  if (res.stderr) console.error('Stderr:', res.stderr);
}

