const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'AKFA Dealership Strategic Finance';
pres.company = 'AKFA Dealership Group';
pres.title = 'AKFA Dilerlik Biznesi — Investor Prezentatsiyasi';

// Color Palette Constants
const C_DARK = '171819';
const C_PANEL = '242628';
const C_CARD = '2D3033';
const C_RED = 'EE3526';
const C_RED_DARK = 'C42A1E';
const C_WHITE = 'FFFFFF';
const C_GRAY = '92979B';
const C_SILVER = 'B9BEC2';
const C_GREEN = '10B981';
const C_LIGHT_BG = 'F4F5F7';
const C_LIGHT_PANEL = 'FFFFFF';
const C_LIGHT_TEXT = '1F2937';

const heroImg = path.join(__dirname, 'assets', 'hero-bg.jpg');
const warehouseImg = path.join(__dirname, 'assets', 'warehouse.jpg');
const constrImg = path.join(__dirname, 'assets', 'construction.jpg');

function formatUZS(val) {
  if (val >= 1e9) return (val / 1e9).toFixed(val % 1e9 === 0 ? 0 : 2) + ' mlrd';
  if (val >= 1e6) return (val / 1e6).toFixed(val % 1e6 === 0 ? 0 : 1) + ' mln';
  return val.toLocaleString('uz-UZ');
}

function formatNum(val) {
  return Number(val).toLocaleString('ru-RU');
}

// Reusable Header Helper
function addSlideHeader(slide, title, category = 'AKFA DILERLIK BIZNESI', isLight = false) {
  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.4, w: 11.5, h: 0.3,
    fontSize: 10, bold: true, color: C_RED, fontFace: 'Calibri', charSpacing: 2
  });
  slide.addText(title, {
    x: 0.8, y: 0.7, w: 11.5, h: 0.6,
    fontSize: 22, bold: true, color: isLight ? C_LIGHT_TEXT : C_WHITE, fontFace: 'Calibri'
  });
  // Top red accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.5, h: 0.04,
    fill: { color: C_RED }, line: { color: C_RED }
  });
}

// -------------------------------------------------------------
// SLIDE 1: COVER
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  if (fs.existsSync(heroImg)) {
    s.addImage({ path: heroImg, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: 'cover' } });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 13.33, h: 7.5,
      fill: { color: C_DARK, transparency: 20 }
    });
  }
  
  // Badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.2, y: 1.5, w: 3.5, h: 0.45, rectRadius: 0.2,
    fill: { color: C_RED, transparency: 15 },
    line: { color: C_RED, width: 1.5 }
  });
  s.addText('STRATEGIK INVESTITSIYA MEMORANDUMI', {
    x: 1.2, y: 1.5, w: 3.5, h: 0.45,
    fontSize: 10, bold: true, color: C_WHITE, align: 'center', charSpacing: 1.5
  });

  // Main Title
  s.addText([
    { text: 'AKFA DILERLIK ', options: { color: C_WHITE } },
    { text: 'BIZNESI\n', options: { color: C_RED } },
    { text: 'Keng Qamrovli Investor Taqdimoti', options: { fontSize: 26, color: C_SILVER, bold: false } }
  ], {
    x: 1.2, y: 2.2, w: 11.0, h: 2.2,
    fontSize: 44, bold: true, fontFace: 'Calibri', lineSpacingMultiple: 1.1
  });

  // Subtitle / Intro
  s.addText('Alyuminiy va PVX profillari, radiatorlar va butlovchi qismlar dilerligi tarmog‘i.\n2023–2025 yillar to‘liq moliyaviy hisoboti va 2,000,000$ investitsiya modeli.', {
    x: 1.2, y: 4.6, w: 10.5, h: 0.9,
    fontSize: 15, color: C_SILVER, fontFace: 'Calibri', lineSpacingMultiple: 1.2
  });

  // Bottom Stats Strip
  const stats = [
    { label: 'HUDUDIY FILIALLAR', val: '4 ta Filial' },
    { label: 'HAMKOR TSEXOVIKLAR', val: '400+ Tsex' },
    { label: '3 YILLIK JAMI AYLANMA', val: '498.5 mlrd UZS' },
    { label: 'INVESTITSIYA TAKLIFI', val: '$2,000,000' }
  ];
  stats.forEach((st, idx) => {
    const xPos = 1.2 + idx * 2.8;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 5.8, w: 2.6, h: 1.1, rectRadius: 0.1,
      fill: { color: C_PANEL, transparency: 25 },
      line: { color: C_CARD, width: 1 }
    });
    s.addText(st.val, {
      x: xPos, y: 5.9, w: 2.6, h: 0.5,
      fontSize: 18, bold: true, color: C_WHITE, align: 'center'
    });
    s.addText(st.label, {
      x: xPos, y: 6.4, w: 2.6, h: 0.35,
      fontSize: 9, bold: true, color: C_RED, align: 'center', charSpacing: 1
    });
  });
}

// -------------------------------------------------------------
// SLIDE 2: KOMPANIYA HAQIDA UMUMIY MA'LUMOT
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Kompaniya Faoliyati va Asosiy Yo‘nalishlari", "1. BIZNES PROFILI");

  // Left card: Faoliyat yo'nalishlari
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 5.3, rectRadius: 0.15,
    fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
  });
  s.addText('ASOSIY FAOLIYAT VA MAHSULOTLAR', {
    x: 1.1, y: 1.8, w: 5.1, h: 0.4,
    fontSize: 13, bold: true, color: C_RED
  });
  s.addText([
    { text: '• AKFA Mahsulotlari Dilerligi: ', options: { bold: true, color: C_WHITE } },
    { text: 'AKFA brendi ostidagi barcha turdagi alyuminiy va PVX profillarni to‘g‘ridan-to‘g‘ri yetkazib berish.\n\n', options: { color: C_SILVER } },
    { text: '• Aksessuarlar va Furnitura: ', options: { bold: true, color: C_WHITE } },
    { text: 'Eshik va rom ishlab chiqarish uchun zarur bo‘lgan qulflar, tutqichlar, mexanizmlar va germetik vositalar.\n\n', options: { color: C_SILVER } },
    { text: '• Radiator Tizimlari: ', options: { bold: true, color: C_WHITE } },
    { text: 'Isitish mavsumi uchun bimetall va alyuminiy radiatorlar hamda montaj elementlari savdosi.\n\n', options: { color: C_SILVER } },
    { text: '• Ombor va Logistika Xizmati: ', options: { bold: true, color: C_WHITE } },
    { text: 'Buyurtmalarni tezkor qabul qilish va shaxsiy avtopark (7 ta Gazel) orqali manzilli yetkazib berish.', options: { color: C_SILVER } }
  ], {
    x: 1.1, y: 2.3, w: 5.1, h: 4.4,
    fontSize: 12, lineSpacingMultiple: 1.15
  });

  // Right card: Mijozlar segmenti
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 1.6, w: 5.7, h: 5.3, rectRadius: 0.15,
    fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
  });
  s.addText('MIJOZLAR KONTINGENTI VA B2B MODEL', {
    x: 7.1, y: 1.8, w: 5.1, h: 0.4,
    fontSize: 13, bold: true, color: C_RED
  });

  const clients = [
    { num: '01', title: 'Hamkor Tsexoviklar (Top segment)', desc: '400 dan ortiq doimiy eshik-rom ishlab chiqaruvchi tsexlar. Asosiy aylanma lokomotivi.' },
    { num: '02', title: 'Obyekt Quruvchilari (Developerlar)', desc: 'Yirik va o‘rta turar-joy hamda noturar joy binolari qurilish pudratchilari.' },
    { num: '03', title: 'Davlat Obyektlari va Tenderlar', desc: 'Maktab, shifoxona va davlat muassasalari loyihalari uchun profillar ta’minoti.' },
    { num: '04', title: 'Professional Ustalar va Brigadalar', desc: 'Shaxsiy xususiy buyurtmalar asosida ishlaydigan montaj ustalari tarmog‘i.' }
  ];
  clients.forEach((c, idx) => {
    const yP = 2.4 + idx * 1.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.1, y: yP, w: 5.1, h: 0.95, rectRadius: 0.1,
      fill: { color: C_CARD }
    });
    s.addText(c.num, {
      x: 7.2, y: yP + 0.1, w: 0.5, h: 0.5,
      fontSize: 16, bold: true, color: C_RED
    });
    s.addText(c.title, {
      x: 7.8, y: yP + 0.1, w: 4.3, h: 0.35,
      fontSize: 12, bold: true, color: C_WHITE
    });
    s.addText(c.desc, {
      x: 7.8, y: yP + 0.45, w: 4.3, h: 0.45,
      fontSize: 10, color: C_SILVER
    });
  });
}

// -------------------------------------------------------------
// SLIDE 3: ASOSIY KO'RSATKICHLAR — KPI DASHBOARD
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Biznes Ko‘rsatkichlari — KPI Dashboard", "2. ASOSIY METRIKALAR");

  const kpis = [
    { title: '3 YILLIK JAMI AYLANMA', val: '498.5 mlrd UZS', sub: '2023: 193.2 mlrd | 2024: 172.2 mlrd | 2025: 133.1 mlrd', col: C_WHITE },
    { title: '3 YILLIK SOF FOYDA', val: '13.14 mlrd UZS', sub: '2023: 5.92 mlrd | 2024: 4.63 mlrd | 2025: 2.59 mlrd', col: C_GREEN },
    { title: 'HAMKOR TSEXOVIKLAR', val: '400+ Tsex', sub: 'Olmaliq: 110 | Guliston: 110 | Bo‘ka: 90 | Yangiyo‘l: 90', col: C_WHITE },
    { title: 'LOGISTIKA PARKI', val: '7 ta Gazel', sub: 'Doimiy reyslar, o‘z hisobidan bepul manzilli yetkazish', col: C_WHITE },
    { title: 'TOSHKENT VIL. BOZOR ULUSHI', val: '30.0%', sub: 'Viloyat oylik 3 mln $ bozorida mustahkam yetakchilik', col: C_RED },
    { title: 'INVESTITSIYA SO‘ROVI', val: '$2,000,000', sub: '75% tovar aylanmasi, 15% tsex limitlari, 5% logistika', col: C_RED }
  ];

  kpis.forEach((kpi, idx) => {
    const colIdx = idx % 3;
    const rowIdx = Math.floor(idx / 3);
    const xPos = 0.8 + colIdx * 4.0;
    const yPos = 1.7 + rowIdx * 2.6;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: yPos, w: 3.7, h: 2.3, rectRadius: 0.15,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    // Accent strip
    s.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: yPos, w: 3.7, h: 0.06,
      fill: { color: C_RED }
    });
    s.addText(kpi.title, {
      x: xPos + 0.2, y: yPos + 0.2, w: 3.3, h: 0.3,
      fontSize: 10, bold: true, color: C_GRAY, charSpacing: 1
    });
    s.addText(kpi.val, {
      x: xPos + 0.2, y: yPos + 0.6, w: 3.3, h: 0.8,
      fontSize: 24, bold: true, color: kpi.col, fontFace: 'Calibri'
    });
    s.addText(kpi.sub, {
      x: xPos + 0.2, y: yPos + 1.5, w: 3.3, h: 0.65,
      fontSize: 10, color: C_SILVER, lineSpacingMultiple: 1.15
    });
  });
}

// -------------------------------------------------------------
// SLIDE 4: BIZNES MODELI VA 9 TA AFZALLIK
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Biznes Modeli va 9 Ta Strategik Afzallik", "3. BIZNES AVZALLIKLARI");

  const advs = [
    { n: '1', t: 'AKFA Mutlaq Brendi', d: 'O‘zbekiston bozorining 65% ulushi, aholi va quruvchilarning birinchi tanlovi.' },
    { n: '2', t: 'Keng Assortiment', d: 'Alyuminiy va PVX barcha seriyalari, butlovchilar va qulay yetkazib berish xizmati.' },
    { n: '3', t: 'Bozorni Himoya Qilish', d: 'AKFA asoschilari xorijiy sifatsiz raqobatchilardan ichki bozorni to‘liq himoyalaydi.' },
    { n: '4', t: 'Kapital Qadri Saqlanishi', d: 'Tovar narxi valyutaga ($) bog‘langan, profillar zanglamaydi va uzoq saqlanadi.' },
    { n: '5', t: '100% Shaffof Buxgalteriya', d: 'Barcha tovarlar qat’iy schyot-faktura va rasmiy buxgalteriya orqali tarqatiladi.' },
    { n: '6', t: 'Qurilish Sektori O‘sishi', d: 'Yurtimizda yangi obyektlar va bino-inshootlar soni muttasil oshib bormoqda.' },
    { n: '7', t: '7 Yillik Tajriba', d: 'Ushbu bozor va yo‘nalishda jamoamiz 7 yildan buyon professional faoliyat yuritadi.' },
    { n: '8', t: 'Professional Servis', d: 'Buyurtmalarni tezkor qabul qilish va call-markaz orqali o‘z vaqtida yetkazish.' },
    { n: '9', t: 'Doimiy Barqaror Talab', d: 'Qurilish sohasi to‘xtamaydi, demak deraza-rom profillariga talab ham to‘xtamaydi.' }
  ];

  advs.forEach((ad, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.0;
    const y = 1.6 + row * 1.8;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 3.7, h: 1.6, rectRadius: 0.1,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.2, y: y + 0.2, w: 0.4, h: 0.4,
      fill: { color: C_RED }
    });
    s.addText(ad.n, {
      x: x + 0.2, y: y + 0.2, w: 0.4, h: 0.4,
      fontSize: 11, bold: true, color: C_WHITE, align: 'center'
    });
    s.addText(ad.t, {
      x: x + 0.75, y: y + 0.2, w: 2.8, h: 0.4,
      fontSize: 12, bold: true, color: C_WHITE
    });
    s.addText(ad.d, {
      x: x + 0.2, y: y + 0.7, w: 3.3, h: 0.8,
      fontSize: 10, color: C_SILVER, lineSpacingMultiple: 1.15
    });
  });
}

// -------------------------------------------------------------
// SLIDE 5: FILIALLAR TARMOG'I — UMUMIY VA KESIMDA
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Filiallar Tarmog‘i — 4 Ta Hududiy Markaz", "4. HUDUDIY TIZIM");

  const branches = [
    { name: 'Olmaliq Filiali', shops: '110 ta Tsex', share: '27.5%', note: 'Sanoat shahri, yuqori qurilish sur’atlari va faol tsexoviklar bazasi.' },
    { name: 'Guliston Filiali', shops: '110 ta Tsex', share: '27.5%', note: 'Sirdaryo viloyati markazi, 2 mln $ oylik bozorining 30% dilerlik ulushi.' },
    { name: 'Bo‘ka Filiali', shops: '90 ta Tsex', share: '22.5%', note: 'Toshkent viloyati janubiy mintaqasi tsexlarini to‘liq qamrab olgan markaz.' },
    { name: 'Yangiyo‘l Filiali', shops: '90 ta Tsex', share: '22.5%', note: 'Toshkent shahriga yaqin strategik logistika tuguni va yirik klaster.' }
  ];

  branches.forEach((b, i) => {
    const x = 0.8 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 5.3, rectRadius: 0.15,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    // Red indicator
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 0.08,
      fill: { color: C_RED }
    });
    s.addText(`FILIAL 0${i+1}`, {
      x, y: 1.9, w: 2.7, h: 0.3,
      fontSize: 10, bold: true, color: C_RED, align: 'center', charSpacing: 1
    });
    s.addText(b.name, {
      x, y: 2.3, w: 2.7, h: 0.5,
      fontSize: 16, bold: true, color: C_WHITE, align: 'center'
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.3, y: 3.0, w: 2.1, h: 1.1, rectRadius: 0.1,
      fill: { color: C_CARD }
    });
    s.addText(b.shops, {
      x: x + 0.3, y: 3.1, w: 2.1, h: 0.5,
      fontSize: 20, bold: true, color: C_WHITE, align: 'center'
    });
    s.addText(`ULUSH: ${b.share}`, {
      x: x + 0.3, y: 3.65, w: 2.1, h: 0.35,
      fontSize: 10, bold: true, color: C_GREEN, align: 'center'
    });
    s.addText(b.note, {
      x: x + 0.25, y: 4.4, w: 2.2, h: 2.2,
      fontSize: 11, color: C_SILVER, align: 'center', lineSpacingMultiple: 1.2
    });
  });
}

// -------------------------------------------------------------
// SLIDE 6: LOGISTIKA VA TRANSPORT PARKI
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Logistika, Ombor va Transport Infratuzilmasi", "5. OPERATSION TIZIM");

  if (fs.existsSync(warehouseImg)) {
    s.addImage({ path: warehouseImg, x: 0.8, y: 1.6, w: 5.5, h: 5.3, sizing: { type: 'cover' } });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.6, w: 5.5, h: 5.3,
      fill: { color: C_DARK, transparency: 30 }
    });
    s.addText('MARKAZIY OMBOR VA LOGISTIKA KLUSTERI\n4 ta hududga uzluksiz tovar oqimini ta’minlash', {
      x: 1.1, y: 5.8, w: 5.0, h: 0.8,
      fontSize: 12, bold: true, color: C_WHITE
    });
  }

  // Right Side Cards
  const cards = [
    { title: '7 TA XUSUSIY GAZEL AVTOPARKI', desc: 'Korxona o‘z transport parkiga ega bo‘lib, 7 ta maxsus jihozlangan Gazel mashinalari profillarni shikastlamasdan yetkazadi.' },
    { title: 'CALL-MARKAZ VA BUYURTMA TIZIMI', desc: 'Mijozlar buyurtmalari yagona call-markaz orqali qabul qilinadi va ombor qoldig‘idan bevosita tsexlarga tezkor jo‘natiladi.' },
    { title: 'BEPUL MANZILLI YETKAZISH AFZALLIGI', desc: 'Hamkor tsexoviklarga yetkazib berish o‘z hisobimizdan amalga oshiriladi. Bu raqobatchilardan asosiy ustunliklardan biridir.' },
    { title: 'INVESTITSIYA ORQALI KENGAYTIRISH: $100,000', desc: 'Yangi investitsiya rejasida avtoparkni yangilash va qo‘shimcha transport vositalarini xarid qilish uchun $100k ajratilgan.' }
  ];

  cards.forEach((c, idx) => {
    const yP = 1.6 + idx * 1.35;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.7, y: yP, w: 5.8, h: 1.2, rectRadius: 0.1,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addText(c.title, {
      x: 7.0, y: yP + 0.15, w: 5.2, h: 0.35,
      fontSize: 12, bold: true, color: C_RED
    });
    s.addText(c.desc, {
      x: 7.0, y: yP + 0.5, w: 5.2, h: 0.6,
      fontSize: 10, color: C_SILVER, lineSpacingMultiple: 1.15
    });
  });
}

// -------------------------------------------------------------
// SLIDE 7: BOZOR TAHLILI VA RAQOBAT MUHITI
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Bozor Hajmi, AKFA Ulushi va Raqobat Muhiti", "6. BOZOR TAHLILI");

  // Box 1: AKFA Ulushi butun O'zbekistonda
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 3.6, h: 5.3, rectRadius: 0.15,
    fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
  });
  s.addText('O‘ZBEKISTON BOZORI', { x: 1.1, y: 1.9, w: 3.0, h: 0.3, fontSize: 11, bold: true, color: C_RED });
  s.addText('65%', { x: 1.1, y: 2.3, w: 3.0, h: 0.8, fontSize: 44, bold: true, color: C_WHITE });
  s.addText('AKFA Brendining butun O‘zbekiston bo‘yicha umumiy bozor ulushi.', { x: 1.1, y: 3.2, w: 3.0, h: 0.6, fontSize: 11, color: C_SILVER });
  s.addText('Qolgan 35% ulush boshqa barcha ishlab chiqaruvchilar o‘rtasida taqsimlangan.', { x: 1.1, y: 3.9, w: 3.0, h: 0.6, fontSize: 11, color: C_GRAY });

  // Box 2: Toshkent viloyati va Sirdaryo
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 4.8, y: 1.6, w: 3.6, h: 5.3, rectRadius: 0.15,
    fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
  });
  s.addText('HUDUDIY BOZORLAR', { x: 5.1, y: 1.9, w: 3.0, h: 0.3, fontSize: 11, bold: true, color: C_RED });
  s.addText('30%', { x: 5.1, y: 2.3, w: 3.0, h: 0.8, fontSize: 44, bold: true, color: C_GREEN });
  s.addText('• Toshkent viloyati bozori:\nOylik hajm ~3 mln $, bizning ulush 30%.\n\n• Sirdaryo viloyati bozori:\nOylik hajm ~2 mln $, bizning ulush 30%.\n\n• Toshkent shahri bozori:\n25–30 mln $ hajm (hozir 1% dan kam, kelajakdagi ulkan o‘sish potensiali).', {
    x: 5.1, y: 3.2, w: 3.0, h: 3.4, fontSize: 11, color: C_SILVER, lineSpacingMultiple: 1.2
  });

  // Box 3: Raqobatchilar tahlili
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.8, y: 1.6, w: 3.7, h: 5.3, rectRadius: 0.15,
    fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
  });
  s.addText('RAQOBATCHILAR PROFILI', { x: 9.1, y: 1.9, w: 3.1, h: 0.3, fontSize: 11, bold: true, color: C_RED });
  s.addText('50+', { x: 9.1, y: 2.3, w: 3.1, h: 0.8, fontSize: 44, bold: true, color: C_SILVER });
  s.addText('Bozordagi muqobil ishlab chiqaruvchilar:', { x: 9.1, y: 3.2, w: 3.1, h: 0.4, fontSize: 11, bold: true, color: C_WHITE });
  s.addText('• Alyuminiy: 10 dan ortiq brend\n• PVX profillar: 40 dan ortiq brend\n• Asosiy muqobillar: Ekopen, Alutex, Alta Plast, Imkon Plast va b.\n\nAKFA ustunligi: kuchli brend kuchi, eng keng assortiment, logistika va narx kafolati.', {
    x: 9.1, y: 3.7, w: 3.1, h: 2.8, fontSize: 11, color: C_SILVER, lineSpacingMultiple: 1.2
  });
}

// -------------------------------------------------------------
// FINANCIAL DATA ARRAYS
// -------------------------------------------------------------
const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

const data2023 = {
  turnover: [10340000000, 12300000000, 13500000000, 14700000000, 16200000000, 19400000000, 16500000000, 21000000000, 19300000000, 20500000000, 18500000000, 11000000000],
  profit:   [ 168000000,  244000000,  295000000,  343000000,  498000000,  726000000,  550000000,  755000000,  720000000,  744000000,  676000000,  203000000],
  totalTurnover: 193240000000,
  totalProfit: 5922000000,
  avgProfit: 493500000,
  margin: 3.06
};

const data2024 = {
  turnover: [10100000000,  9200000000,  9000000000, 11800000000, 14700000000, 17000000000, 17800000000, 16000000000, 21200000000, 18700000000, 14900000000, 11800000000],
  profit:   [ 173000000,  112000000,   78000000,  223000000,  335000000,  568000000,  612000000,  471000000,  785000000,  684000000,  347000000,  239000000],
  totalTurnover: 172200000000,
  totalProfit: 4627000000,
  avgProfit: 385583333,
  margin: 2.69
};

const data2025 = {
  turnover: [15500000000,  7300000000,  6800000000,  9800000000,  8200000000, 13800000000, 13900000000, 17400000000, 10200000000, 11700000000,  9500000000,  9000000000],
  profit:   [ 412000000,   10000000,          0,  124000000,   68000000,  397000000,  383000000,  582000000,  178000000,  228000000,  118000000,   92000000],
  totalTurnover: 133100000000,
  totalProfit: 2592000000,
  avgProfit: 216000000,
  margin: 1.95
};

const dataForecast = {
  turnover: [16000000000, 17000000000, 18000000000, 21000000000, 24000000000, 26000000000, 27000000000, 30000000000, 30000000000, 26000000000, 23000000000, 18000000000],
  profit:   [ 168000000,  184000000,  200000000,  248000000,  328000000,  360000000,  416000000,  424000000,  424000000,  360000000,  312000000,  192000000],
  totalTurnover: 276000000000,
  totalProfit: 3616000000,
  avgProfit: 301333333,
  margin: 1.31
};

// -------------------------------------------------------------
// SLIDE 8: 2023-YIL — YILLIK NATIJALAR & KPI
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "2023-Yil Moliyaviy Natijalari — Tarixiy Eng Yuqori Cho‘qqi", "7. MOLIYAVIY HISOBOT 2023");

  const cards23 = [
    { title: 'YILLIK JAMI AYLANMA', val: '193.24 mlrd UZS', sub: 'Oylik o‘rtacha: 16.10 mlrd UZS', col: C_WHITE },
    { title: 'YILLIK SOF FOYDA', val: '5.92 mlrd UZS', sub: 'Oylik o‘rtacha: 493.5 mln UZS', col: C_GREEN },
    { title: 'O‘RTACHA FOYDA MARJASI', val: '3.06%', sub: 'Eng yuqori marja: May oyida 3.07%', col: C_RED },
    { title: 'ENG YUQORI OY (PIK)', val: 'Avgust: 21.0 mlrd', sub: 'Foyda: 755 mln UZS (mavsum cho‘qqisi)', col: C_WHITE }
  ];

  cards23.forEach((c, i) => {
    const x = 0.8 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 2.1, rectRadius: 0.12,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addText(c.title, { x: x + 0.15, y: 1.8, w: 2.4, h: 0.3, fontSize: 9, bold: true, color: C_GRAY, charSpacing: 1 });
    s.addText(c.val, { x: x + 0.15, y: 2.1, w: 2.4, h: 0.7, fontSize: 20, bold: true, color: c.col });
    s.addText(c.sub, { x: x + 0.15, y: 2.9, w: 2.4, h: 0.6, fontSize: 10, color: C_SILVER });
  });

  // Chart: Monthly turnover & profit 2023
  const chartData = [
    { name: 'Aylanma (mlrd UZS)', labels: months, values: data2023.turnover.map(v => v / 1e9) },
    { name: 'Foyda (mlrd UZS)', labels: months, values: data2023.profit.map(v => v / 1e9) }
  ];
  s.addChart(pres.ChartType.bar, chartData, {
    x: 0.8, y: 4.0, w: 11.7, h: 3.0,
    barDir: 'col',
    chartColors: [C_SILVER, C_RED],
    showValue: false,
    catAxisLabelColor: C_SILVER, valAxisLabelColor: C_SILVER,
    catAxisLineShow: false, valAxisLineShow: false,
    legendPos: 't', legendColor: C_WHITE
  });
}

// -------------------------------------------------------------
// SLIDE 9: 2023-YIL — 12 OYLIK TO'LIQ JADVAL
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "2023-Yil 12 Oylik To‘liq Moliyaviy Ko‘rsatkichlar Jadvali", "8. 2023 JADVAL");

  const tableRows = [
    [
      { text: 'Oy', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } },
      { text: 'Aylangan Summa (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Sof Foyda (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Foyda Marjasi (%)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Izoh / Mavsumiy Holat', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } }
    ]
  ];

  months.forEach((m, idx) => {
    const turn = data2023.turnover[idx];
    const prof = data2023.profit[idx];
    const mrg = ((prof / turn) * 100).toFixed(2) + '%';
    const note = (idx >= 4 && idx <= 9) ? 'Mavsumiy yuqori faollik' : 'Boshlang‘ich / qishki mavsum';

    tableRows.push([
      { text: m, options: { color: C_WHITE, fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(turn), options: { color: C_WHITE, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(prof), options: { color: C_GREEN, bold: true, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: mrg, options: { color: C_SILVER, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: note, options: { color: C_GRAY, fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } }
    ]);
  });

  // Total Row
  tableRows.push([
    { text: 'JAMI 2023', options: { bold: true, color: C_WHITE, fill: { color: C_RED } } },
    { text: formatNum(data2023.totalTurnover), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: formatNum(data2023.totalProfit), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: data2023.margin.toFixed(2) + '%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: 'Yillik yakuniy ko‘rsatkich', options: { bold: true, color: C_WHITE, fill: { color: C_RED } } }
  ]);

  s.addTable(tableRows, {
    x: 0.8, y: 1.6, w: 11.7, h: 5.3,
    fontSize: 9.5, fontFace: 'Calibri',
    colW: [1.8, 3.0, 2.5, 1.8, 2.6],
    border: { pt: 0.5, color: '3A3D40' }
  });
}

// -------------------------------------------------------------
// SLIDE 10: 2024-YIL — YILLIK NATIJALAR & TAHLIL
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "2024-Yil Moliyaviy Natijalari va O‘zgarishlar Dinamikasi", "9. MOLIYAVIY HISOBOT 2024");

  const cards24 = [
    { title: 'YILLIK JAMI AYLANMA', val: '172.20 mlrd UZS', sub: '2023 ga nisbatan: -10.9% pasayish', col: C_WHITE },
    { title: 'YILLIK SOF FOYDA', val: '4.63 mlrd UZS', sub: '2023 ga nisbatan: -21.9% pasayish', col: C_SILVER },
    { title: 'O‘RTACHA FOYDA MARJASI', val: '2.69%', sub: '2023 ga nisbatan: -0.37% punkt pasayish', col: C_RED },
    { title: 'ENG YUQORI OY (PIK)', val: 'Sentabr: 21.2 mlrd', sub: 'Foyda: 785 mln UZS (kuzgi cho‘qqi)', col: C_WHITE }
  ];

  cards24.forEach((c, i) => {
    const x = 0.8 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 2.1, rectRadius: 0.12,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addText(c.title, { x: x + 0.15, y: 1.8, w: 2.4, h: 0.3, fontSize: 9, bold: true, color: C_GRAY, charSpacing: 1 });
    s.addText(c.val, { x: x + 0.15, y: 2.1, w: 2.4, h: 0.7, fontSize: 20, bold: true, color: c.col });
    s.addText(c.sub, { x: x + 0.15, y: 2.9, w: 2.4, h: 0.6, fontSize: 10, color: C_SILVER });
  });

  const chartData24 = [
    { name: '2023 Aylanma (mlrd)', labels: months, values: data2023.turnover.map(v => v / 1e9) },
    { name: '2024 Aylanma (mlrd)', labels: months, values: data2024.turnover.map(v => v / 1e9) }
  ];
  s.addChart(pres.ChartType.bar, chartData24, {
    x: 0.8, y: 4.0, w: 11.7, h: 3.0,
    barDir: 'col',
    chartColors: [C_GRAY, C_RED],
    showValue: false,
    catAxisLabelColor: C_SILVER, valAxisLabelColor: C_SILVER,
    catAxisLineShow: false, valAxisLineShow: false,
    legendPos: 't', legendColor: C_WHITE
  });
}

// -------------------------------------------------------------
// SLIDE 11: 2024-YIL — 12 OYLIK TO'LIQ JADVAL
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "2024-Yil 12 Oylik To‘liq Moliyaviy Ko‘rsatkichlar Jadvali", "10. 2024 JADVAL");

  const tableRows = [
    [
      { text: 'Oy', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } },
      { text: 'Aylangan Summa (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Sof Foyda (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Foyda Marjasi (%)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: '2023 Ga Nisbatan Farq', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } }
    ]
  ];

  months.forEach((m, idx) => {
    const turn = data2024.turnover[idx];
    const prof = data2024.profit[idx];
    const mrg = ((prof / turn) * 100).toFixed(2) + '%';
    const diff = (((turn - data2023.turnover[idx]) / data2023.turnover[idx]) * 100).toFixed(1) + '%';

    tableRows.push([
      { text: m, options: { color: C_WHITE, fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(turn), options: { color: C_WHITE, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(prof), options: { color: C_GREEN, bold: true, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: mrg, options: { color: C_SILVER, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: diff, options: { color: diff.startsWith('-') ? C_RED : C_GREEN, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } }
    ]);
  });

  tableRows.push([
    { text: 'JAMI 2024', options: { bold: true, color: C_WHITE, fill: { color: C_RED } } },
    { text: formatNum(data2024.totalTurnover), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: formatNum(data2024.totalProfit), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: data2024.margin.toFixed(2) + '%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: '-10.9%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } }
  ]);

  s.addTable(tableRows, {
    x: 0.8, y: 1.6, w: 11.7, h: 5.3,
    fontSize: 9.5, fontFace: 'Calibri',
    colW: [1.8, 3.0, 2.5, 1.8, 2.6],
    border: { pt: 0.5, color: '3A3D40' }
  });
}

// -------------------------------------------------------------
// SLIDE 12: 2025-YIL — YILLIK NATIJALAR VA ANOMALIYALAR
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "2025-Yil Natijalari — Aylanma Pasayishi va Mart Oyi Anomaliyasi", "11. MOLIYAVIY HISOBOT 2025");

  const cards25 = [
    { title: 'YILLIK JAMI AYLANMA', val: '133.10 mlrd UZS', sub: '2024 ga nisbatan: -22.7% pasayish', col: C_WHITE },
    { title: 'YILLIK SOF FOYDA', val: '2.59 mlrd UZS', sub: '2024 ga nisbatan: -44.0% pasayish', col: C_RED },
    { title: 'O‘RTACHA FOYDA MARJASI', val: '1.95%', sub: 'Tarixiy eng past daraja', col: C_RED },
    { title: 'MART OYI NATIJASI', val: '0 UZS FOYDA', sub: '6.8 mlrd aylanmada sof foyda ko‘rilmagan', col: C_RED }
  ];

  cards25.forEach((c, i) => {
    const x = 0.8 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 2.1, rectRadius: 0.12,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addText(c.title, { x: x + 0.15, y: 1.8, w: 2.4, h: 0.3, fontSize: 9, bold: true, color: C_GRAY, charSpacing: 1 });
    s.addText(c.val, { x: x + 0.15, y: 2.1, w: 2.4, h: 0.7, fontSize: 20, bold: true, color: c.col });
    s.addText(c.sub, { x: x + 0.15, y: 2.9, w: 2.4, h: 0.6, fontSize: 10, color: C_SILVER });
  });

  // Anomaly Callout Box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.0, w: 11.7, h: 2.9, rectRadius: 0.15,
    fill: { color: C_PANEL }, line: { color: C_RED, width: 1.5 }
  });
  s.addText('DIQQAT: INVESTOR UCHUN 2025-YIL CHUQUR TAHLILI VA SABABLARI', {
    x: 1.1, y: 4.2, w: 11.1, h: 0.4,
    fontSize: 13, bold: true, color: C_RED
  });
  s.addText([
    { text: '1. Mart Oyi 0 Foydasi: ', options: { bold: true, color: C_WHITE } },
    { text: 'Mart oyida 6,800,000,000 UZS aylanma bo‘lishiga qaramay, hisobotda sof foyda 0 ko‘rsatilgan. Bu ombor xatlovlari, yillik qayta hisob-kitoblar yoki operatsion zararlarga bog‘liq bo‘lishi mumkin (batafsil tekshiruv talab etiladi).\n\n', options: { color: C_SILVER } },
    { text: '2. Aylanma Kapital Yetishmovchiligi: ', options: { bold: true, color: C_WHITE } },
    { text: 'Aylanma va foydaning pasayishi bozor talabi yo‘qligidan emas, balki tovar zaxirasi yetishmovchiligi va aylanma mablag‘larning cheklanganligidan kelib chiqqan.\n\n', options: { color: C_SILVER } },
    { text: '3. Nega Yangi Investitsiya ($2M) Zarur: ', options: { bold: true, color: C_WHITE } },
    { text: 'Aynan aylanma kapital yetishmagani uchun korxona to‘liq quvvatda ishlay olmayapti. Yangi kapital kiritilishi aylanmani 276 mlrd UZS ga olib chiqish imkonini beradi.', options: { color: C_SILVER } }
  ], {
    x: 1.1, y: 4.7, w: 11.1, h: 2.0,
    fontSize: 11, lineSpacingMultiple: 1.15
  });
}

// -------------------------------------------------------------
// SLIDE 13: 2025-YIL — 12 OYLIK TO'LIQ JADVAL
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "2025-Yil 12 Oylik To‘liq Moliyaviy Ko‘rsatkichlar Jadvali", "12. 2025 JADVAL");

  const tableRows = [
    [
      { text: 'Oy', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } },
      { text: 'Aylangan Summa (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Sof Foyda (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Foyda Marjasi (%)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Holat / Xulosa', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } }
    ]
  ];

  months.forEach((m, idx) => {
    const turn = data2025.turnover[idx];
    const prof = data2025.profit[idx];
    const mrg = turn > 0 ? ((prof / turn) * 100).toFixed(2) + '%' : '0.00%';
    let status = 'Muntazam oqim';
    if (prof === 0) status = '⚠ DIQQAT: 0 Foyda';
    else if (idx === 7) status = 'Pik oy (Avgust)';

    tableRows.push([
      { text: m, options: { color: C_WHITE, fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(turn), options: { color: C_WHITE, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(prof), options: { color: prof === 0 ? C_RED : C_GREEN, bold: true, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: mrg, options: { color: C_SILVER, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: status, options: { color: prof === 0 ? C_RED : C_GRAY, bold: prof === 0, fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } }
    ]);
  });

  tableRows.push([
    { text: 'JAMI 2025', options: { bold: true, color: C_WHITE, fill: { color: C_RED } } },
    { text: formatNum(data2025.totalTurnover), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: formatNum(data2025.totalProfit), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: data2025.margin.toFixed(2) + '%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
    { text: 'Kapital tanqisligi yili', options: { bold: true, color: C_WHITE, fill: { color: C_RED } } }
  ]);

  s.addTable(tableRows, {
    x: 0.8, y: 1.6, w: 11.7, h: 5.3,
    fontSize: 9.5, fontFace: 'Calibri',
    colW: [1.8, 3.0, 2.5, 1.8, 2.6],
    border: { pt: 0.5, color: '3A3D40' }
  });
}

// -------------------------------------------------------------
// SLIDE 14: 2023–2025 UCH YILLIK YIG'MA TAQQOSLASH
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "2023–2025 Uch Yillik Yig‘ma Solishtirma Tahlil", "13. TAQQOSLAMA TAHLIL");

  const compTable = [
    [
      { text: 'Asosiy Ko‘rsatkich', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } },
      { text: '2023-Yil', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: '2024-Yil', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: '2025-Yil', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: '3 Yillik Jami', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Trend / O‘zgarish', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } }
    ],
    [
      { text: 'Yillik Aylanma (UZS)', options: { color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '193.24 mlrd', options: { color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '172.20 mlrd', options: { color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '133.10 mlrd', options: { color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '498.54 mlrd', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '▼ -31.1% (2023 vs 2025)', options: { color: C_RED, fill: { color: C_PANEL } } }
    ],
    [
      { text: 'Sof Foyda (UZS)', options: { color: C_WHITE, fill: { color: C_CARD } } },
      { text: '5.92 mlrd', options: { color: C_GREEN, align: 'right', fill: { color: C_CARD } } },
      { text: '4.63 mlrd', options: { color: C_GREEN, align: 'right', fill: { color: C_CARD } } },
      { text: '2.59 mlrd', options: { color: C_SILVER, align: 'right', fill: { color: C_CARD } } },
      { text: '13.14 mlrd', options: { bold: true, color: C_GREEN, align: 'right', fill: { color: C_CARD } } },
      { text: '▼ -56.2% (2023 vs 2025)', options: { color: C_RED, fill: { color: C_CARD } } }
    ],
    [
      { text: 'O‘rtacha Oylik Foyda', options: { color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '493.5 mln', options: { color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '385.6 mln', options: { color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '216.0 mln', options: { color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '365.0 mln', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: 'Pasayish tendensiyasi', options: { color: C_SILVER, fill: { color: C_PANEL } } }
    ],
    [
      { text: 'Foyda Marjasi (%)', options: { color: C_WHITE, fill: { color: C_CARD } } },
      { text: '3.06%', options: { color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: '2.69%', options: { color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: '1.95%', options: { color: C_RED, align: 'right', fill: { color: C_CARD } } },
      { text: '2.64%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: 'Marja bosimi (-1.11%)', options: { color: C_RED, fill: { color: C_CARD } } }
    ]
  ];

  s.addTable(compTable, {
    x: 0.8, y: 1.6, w: 11.7, h: 2.4,
    fontSize: 10, fontFace: 'Calibri',
    colW: [2.5, 1.8, 1.8, 1.8, 1.8, 2.0],
    border: { pt: 0.5, color: '3A3D40' }
  });

  // Chart: 3 years comparison
  const compChart = [
    { name: 'Aylanma (mlrd UZS)', labels: ['2023', '2024', '2025'], values: [193.24, 172.20, 133.10] },
    { name: 'Sof Foyda (mlrd UZS)', labels: ['2023', '2024', '2025'], values: [5.92, 4.63, 2.59] }
  ];
  s.addChart(pres.ChartType.bar, compChart, {
    x: 0.8, y: 4.3, w: 11.7, h: 2.7,
    barDir: 'col',
    chartColors: [C_SILVER, C_RED],
    showValue: true,
    catAxisLabelColor: C_SILVER, valAxisLabelColor: C_SILVER,
    catAxisLineShow: false, valAxisLineShow: false,
    legendPos: 't', legendColor: C_WHITE
  });
}

// -------------------------------------------------------------
// SLIDE 15: 36 OYLIK DINAMIKA VA MAVSUMIYLIK
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "36 Oylik Kompleks Dinamika va Mavsumiylik Faktori", "14. MAVSUMIYLIK");

  // Insight Cards
  const insights = [
    { title: 'PIK MAVSUM: MAY — OKTABR', desc: 'Barcha 3 yilda eng yuqori savdo hajmlari yoz va kuz oylariga to‘g‘ri kelgan. Aylanmaning 65% qismi ushbu 6 oyda amalga oshiriladi.' },
    { title: 'PASAYISH MAVSUMI: NOYABR — MART', desc: 'Qish faslida qurilish va montaj ishlari sekinlashishi hisobiga savdo tabiiy ravishda pasayadi. Shu sababli aylanma kapitalni to‘g‘ri rejalashtirish o‘ta muhim.' },
    { title: 'AVTO-YETKAZISHNING AHAMIYATI', desc: 'Mavsum paytida tsexoviklar tezkor tovar talab qiladi. Kim profillarni tezroq ombordan yetkazib bersa, o‘sha diler bozor ulushini saqlab qoladi.' }
  ];
  insights.forEach((ins, idx) => {
    const x = 0.8 + idx * 4.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 3.7, h: 1.8, rectRadius: 0.12,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addText(ins.title, { x: x + 0.15, y: 1.8, w: 3.4, h: 0.35, fontSize: 11, bold: true, color: C_RED });
    s.addText(ins.desc, { x: x + 0.15, y: 2.2, w: 3.4, h: 1.1, fontSize: 10, color: C_SILVER, lineSpacingMultiple: 1.15 });
  });

  // Trend line chart across 12 months for 3 years
  const trendData = [
    { name: '2023 Aylanma', labels: months, values: data2023.turnover.map(v => v / 1e9) },
    { name: '2024 Aylanma', labels: months, values: data2024.turnover.map(v => v / 1e9) },
    { name: '2025 Aylanma', labels: months, values: data2025.turnover.map(v => v / 1e9) }
  ];
  s.addChart(pres.ChartType.line, trendData, {
    x: 0.8, y: 3.7, w: 11.7, h: 3.3,
    chartColors: ['3B82F6', C_SILVER, C_RED],
    catAxisLabelColor: C_SILVER, valAxisLabelColor: C_SILVER,
    catAxisLineShow: false, valAxisLineShow: false,
    legendPos: 't', legendColor: C_WHITE
  });
}

// -------------------------------------------------------------
// SLIDE 16: INVESTOR PROGNOZI — UMUMIY MAQSADLAR
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Kelgusi Davr Prognozi — Yangi Investitsiya Bilan Kengayish", "15. INVESTOR PROGNOZI");

  const cardsF = [
    { title: 'PROGNOZ JAMI AYLANMA', val: '276.00 mlrd UZS', sub: '2025 ga nisbatan: +107% o‘sish', col: C_WHITE },
    { title: 'PROGNOZ SOF FOYDA', val: '3.616 mlrd UZS', sub: '2025 ga nisbatan: +39.5% o‘sish', col: C_GREEN },
    { title: 'O‘RTACHA FOYDA MARJASI', val: '1.31%', sub: 'Hajm hisobiga marja tiklanishi', col: C_RED },
    { title: 'AYLANMADAGI KAPITAL', val: '$3,000,000', sub: 'Iyul oyida aylanmada turgan summa', col: C_WHITE }
  ];

  cardsF.forEach((c, i) => {
    const x = 0.8 + i * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 2.1, rectRadius: 0.12,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addText(c.title, { x: x + 0.15, y: 1.8, w: 2.4, h: 0.3, fontSize: 9, bold: true, color: C_GRAY, charSpacing: 1 });
    s.addText(c.val, { x: x + 0.15, y: 2.1, w: 2.4, h: 0.7, fontSize: 20, bold: true, color: c.col });
    s.addText(c.sub, { x: x + 0.15, y: 2.9, w: 2.4, h: 0.6, fontSize: 10, color: C_SILVER });
  });

  // Chart: Historical vs Forecast
  const compFore = [
    { name: 'Aylanma (mlrd UZS)', labels: ['2023', '2024', '2025', 'Prognoz'], values: [193.24, 172.20, 133.10, 276.00] },
    { name: 'Sof Foyda (mlrd UZS)', labels: ['2023', '2024', '2025', 'Prognoz'], values: [5.92, 4.63, 2.59, 3.616] }
  ];
  s.addChart(pres.ChartType.bar, compFore, {
    x: 0.8, y: 4.0, w: 11.7, h: 3.0,
    barDir: 'col',
    chartColors: [C_SILVER, C_GREEN],
    showValue: true,
    catAxisLabelColor: C_SILVER, valAxisLabelColor: C_SILVER,
    catAxisLineShow: false, valAxisLineShow: false,
    legendPos: 't', legendColor: C_WHITE
  });
}

// -------------------------------------------------------------
// SLIDE 17: INVESTOR PROGNOZI — 12 OYLIK REJA JADVALI
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Kelgusi Davr Uchun 12 Oylik Prognoz Jadvali", "16. PROGNOZ JADVAL");

  const tableRows = [
    [
      { text: 'Oy', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } },
      { text: 'Rejadagi Aylanma (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Rejadagi Foyda (UZS)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Marja (%)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Aylanmadagi O‘rtacha Summa', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } }
    ]
  ];

  months.forEach((m, idx) => {
    const turn = dataForecast.turnover[idx];
    const prof = dataForecast.profit[idx];
    const mrg = ((prof / turn) * 100).toFixed(2) + '%';
    const note = (idx === 6) ? '3,000,000 $ (Pik)' : (idx === 0 ? '301.3 mln o‘rtacha daromad' : '-');

    tableRows.push([
      { text: m, options: { color: C_WHITE, fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(turn), options: { color: C_WHITE, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: formatNum(prof), options: { color: C_GREEN, bold: true, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: mrg, options: { color: C_SILVER, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } },
      { text: note, options: { color: (idx === 6) ? C_RED : C_GRAY, bold: idx === 6, align: 'right', fill: { color: idx % 2 === 0 ? C_PANEL : C_CARD } } }
    ]);
  });

  tableRows.push([
    { text: 'JAMI PROGNOZ', options: { bold: true, color: C_WHITE, fill: { color: C_GREEN } } },
    { text: formatNum(dataForecast.totalTurnover), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_GREEN } } },
    { text: formatNum(dataForecast.totalProfit), options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_GREEN } } },
    { text: dataForecast.margin.toFixed(2) + '%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_GREEN } } },
    { text: '3.616 mlrd sof foyda', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_GREEN } } }
  ]);

  s.addTable(tableRows, {
    x: 0.8, y: 1.6, w: 11.7, h: 5.3,
    fontSize: 9.5, fontFace: 'Calibri',
    colW: [1.8, 3.0, 2.5, 1.8, 2.6],
    border: { pt: 0.5, color: '3A3D40' }
  });
}

// -------------------------------------------------------------
// SLIDE 18: $2,000,000 MABLAG'LAR TAQSIMOTI
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "$2,000,000 Investitsiya Mablag‘larining Aniq Taqsimoti", "17. KAPITAL TAQSIMOTI");

  const allocTable = [
    [
      { text: 'Xarajat Yo‘nalishi', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } },
      { text: 'Ajratilgan Summa ($)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Ulush (%)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Tafsilotlar va Maqsadli Vazifa', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } }
    ],
    [
      { text: '1. Tovar Summasi (Zaxira)', options: { color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '$1,500,000', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '75.0%', options: { color: C_RED, align: 'right', fill: { color: C_PANEL } } },
      { text: 'AKFA zavodidan to‘g‘ridan-to‘g‘ri profillar, radiator va butlovchilar zaxirasini shakllantirish.', options: { color: C_SILVER, fill: { color: C_PANEL } } }
    ],
    [
      { text: '2. Hamkorlarga Limit', options: { color: C_WHITE, fill: { color: C_CARD } } },
      { text: '$300,000', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: '15.0%', options: { color: C_RED, align: 'right', fill: { color: C_CARD } } },
      { text: 'Top 60 ta ishonchli sexovik hamkorlarga aylanma tovar limiti ajratish (har biriga o‘rtacha $5,000).', options: { color: C_SILVER, fill: { color: C_CARD } } }
    ],
    [
      { text: '3. Transport Parki', options: { color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '$100,000', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '5.0%', options: { color: C_RED, align: 'right', fill: { color: C_PANEL } } },
      { text: 'Yangi maxsus yuk mashinalari (Gazel) xarid qilish va logistika parkini yangilash.', options: { color: C_SILVER, fill: { color: C_PANEL } } }
    ],
    [
      { text: '4. Skladlarni Tayyorlash', options: { color: C_WHITE, fill: { color: C_CARD } } },
      { text: '$20,000', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: '1.0%', options: { color: C_SILVER, align: 'right', fill: { color: C_CARD } } },
      { text: 'Omborxona stellajlari, yuklash-tushirish texnikalari va xavfsizlik tizimlarini modernizatsiya qilish.', options: { color: C_SILVER, fill: { color: C_CARD } } }
    ],
    [
      { text: '5. Hamkorlar Jalb Qilish', options: { color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '$20,000', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '1.0%', options: { color: C_SILVER, align: 'right', fill: { color: C_PANEL } } },
      { text: 'B2B marketing, taqdimotlar, tsex egalari uchun maxsus rag‘batlantirish aksiyalari.', options: { color: C_SILVER, fill: { color: C_PANEL } } }
    ],
    [
      { text: '6. Qoldiq / Rezerv Fondi', options: { color: C_WHITE, fill: { color: C_CARD } } },
      { text: '$60,000', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: '3.0%', options: { color: C_SILVER, align: 'right', fill: { color: C_CARD } } },
      { text: 'Operatsion xarajatlar va kutilmagan vaziyatlar uchun erkin likvid zaxira.', options: { color: C_SILVER, fill: { color: C_CARD } } }
    ],
    [
      { text: 'JAMI INVESTITSIYA', options: { bold: true, color: C_WHITE, fill: { color: C_RED } } },
      { text: '$2,000,000', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
      { text: '100.0%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_RED } } },
      { text: 'To‘liq kapital ehtiyoji', options: { bold: true, color: C_WHITE, fill: { color: C_RED } } }
    ]
  ];

  s.addTable(allocTable, {
    x: 0.8, y: 1.6, w: 7.2, h: 5.3,
    fontSize: 9.5, fontFace: 'Calibri',
    colW: [2.2, 1.3, 0.9, 2.8],
    border: { pt: 0.5, color: '3A3D40' }
  });

  // Doughnut Chart
  const pieData = [{
    name: 'Taqsimot',
    labels: ['Tovar Summasi', 'Hamkorlar Limiti', 'Transport', 'Ombor', 'Marketing', 'Rezerv'],
    values: [1500000, 300000, 100000, 20000, 20000, 60000]
  }];
  s.addChart(pres.ChartType.doughnut, pieData, {
    x: 8.3, y: 1.8, w: 4.2, h: 4.8,
    chartColors: [C_RED, '3B82F6', '10B981', 'F59E0B', '8B5CF6', C_GRAY],
    showPercent: true,
    legendPos: 'b', legendColor: C_WHITE
  });
}

// -------------------------------------------------------------
// SLIDE 19: HAMKORLARGA LIMIT MEXANIZMI (TOP 60 TSEXOVIK)
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Hamkorlarga Limit Mexanizmi — Savdo Aylanmasi Lokomotivi", "18. HAMKORLAR LIMITI");

  const steps = [
    { num: '01', title: 'Top 60 Saralangan Tsexovik', desc: 'Barcha 400 tsex orasidan faqat to‘lov intizomi yuqori va yirik aylanmali 60 ta tsexovik tanlab olinadi.' },
    { num: '02', title: 'O‘rtacha $5,000 Tovar Limiti', desc: 'Jami $300,000 fond hisobidan har bir tsexga 5,000$ gacha profillar nasiya / to‘lov kechiktirish bilan beriladi.' },
    { num: '03', title: '7–15 Kunlik Aylanma Sikli', desc: 'Tsex buyurtmani bajarib, deraza-romni mijozga o‘rnatgach, 1-2 haftada pulni qaytaradi va yangi tovar oladi.' },
    { num: '04', title: 'Aylanma Multiplikatori: 12-24x', desc: '$300,000 lik fond yiliga 15-20 marta aylanib, qo‘shimcha 4-6 mln $ lik yillik aylanmani shakllantiradi.' }
  ];

  steps.forEach((st, idx) => {
    const x = 0.8 + idx * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 5.3, rectRadius: 0.15,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.6, w: 2.7, h: 0.08, fill: { color: C_RED } });
    s.addText(st.num, { x, y: 1.9, w: 2.7, h: 0.6, fontSize: 32, bold: true, color: C_RED, align: 'center' });
    s.addText(st.title, { x: x + 0.15, y: 2.6, w: 2.4, h: 0.7, fontSize: 13, bold: true, color: C_WHITE, align: 'center' });
    s.addText(st.desc, { x: x + 0.15, y: 3.4, w: 2.4, h: 3.2, fontSize: 11, color: C_SILVER, align: 'center', lineSpacingMultiple: 1.25 });
  });
}

// -------------------------------------------------------------
// SLIDE 20: INVESTOR ULUSHI VA FOYDA TAQSIMOTI
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Investor Ulushi va Foyda Taqsimoti Ssenariylari", "19. DAROMAD MODELI");

  s.addText('Diqqat: Excel hujjatida investor ulushi va kompaniya bahosi ochiq qoldirilgan. Quyida professional investitsiya amaliyotiga mos 5 ta real ssenariy taqdim etiladi:', {
    x: 0.8, y: 1.5, w: 11.7, h: 0.5,
    fontSize: 11, color: C_SILVER
  });

  const scenTable = [
    [
      { text: 'Ssenariy / Model', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } },
      { text: 'Investor Ulushi', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Yillik Foyda ($ equivalent)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Yillik Daromadlilik (ROI)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Qoplanish Muddati (Payback)', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK }, align: 'right' } },
      { text: 'Ssenariy Sharhi', options: { bold: true, color: C_WHITE, fill: { color: C_RED_DARK } } }
    ],
    [
      { text: 'A: Konservativ Ulush', options: { color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '20.0%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '$56,320', options: { color: C_GREEN, align: 'right', fill: { color: C_PANEL } } },
      { text: '2.8% / yil', options: { color: C_SILVER, align: 'right', fill: { color: C_PANEL } } },
      { text: '35.5 yil', options: { color: C_GRAY, align: 'right', fill: { color: C_PANEL } } },
      { text: 'Minimal xavf va passiv ishtirok modeli.', options: { color: C_SILVER, fill: { color: C_PANEL } } }
    ],
    [
      { text: 'B: Muvozanatli Ulush', options: { color: C_WHITE, fill: { color: C_CARD } } },
      { text: '25.0%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: '$70,400', options: { color: C_GREEN, align: 'right', fill: { color: C_CARD } } },
      { text: '3.5% / yil', options: { color: C_SILVER, align: 'right', fill: { color: C_CARD } } },
      { text: '28.4 yil', options: { color: C_GRAY, align: 'right', fill: { color: C_CARD } } },
      { text: 'Standart xususiy sarmoya (Private Equity) sharti.', options: { color: C_SILVER, fill: { color: C_CARD } } }
    ],
    [
      { text: 'C: Standart Hamkorlik (Tavsiya)', options: { bold: true, color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '30.0%', options: { bold: true, color: C_RED, align: 'right', fill: { color: C_PANEL } } },
      { text: '$84,480', options: { bold: true, color: C_GREEN, align: 'right', fill: { color: C_PANEL } } },
      { text: '4.2% / yil', options: { bold: true, color: C_GREEN, align: 'right', fill: { color: C_PANEL } } },
      { text: '23.7 yil', options: { color: C_SILVER, align: 'right', fill: { color: C_PANEL } } },
      { text: 'Har ikki tomon uchun eng maqbul adolatli balans.', options: { color: C_WHITE, fill: { color: C_PANEL } } }
    ],
    [
      { text: 'D: Yuqori Rentabellik', options: { color: C_WHITE, fill: { color: C_CARD } } },
      { text: '35.0%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_CARD } } },
      { text: '$98,560', options: { color: C_GREEN, align: 'right', fill: { color: C_CARD } } },
      { text: '4.9% / yil', options: { color: C_GREEN, align: 'right', fill: { color: C_CARD } } },
      { text: '20.3 yil', options: { color: C_SILVER, align: 'right', fill: { color: C_CARD } } },
      { text: 'Investorga imtiyozli dividend to‘lash ssenariysi.', options: { color: C_SILVER, fill: { color: C_CARD } } }
    ],
    [
      { text: 'E: Strategik Nazorat', options: { color: C_WHITE, fill: { color: C_PANEL } } },
      { text: '40.0%', options: { bold: true, color: C_WHITE, align: 'right', fill: { color: C_PANEL } } },
      { text: '$112,640', options: { color: C_GREEN, align: 'right', fill: { color: C_PANEL } } },
      { text: '5.6% / yil', options: { color: C_GREEN, align: 'right', fill: { color: C_PANEL } } },
      { text: '17.8 yil', options: { color: C_GREEN, align: 'right', fill: { color: C_PANEL } } },
      { text: 'Boshqaruvda faol ishtirok etuvchi investor uchun.', options: { color: C_SILVER, fill: { color: C_PANEL } } }
    ]
  ];

  s.addTable(scenTable, {
    x: 0.8, y: 2.1, w: 11.7, h: 4.8,
    fontSize: 9.5, fontFace: 'Calibri',
    colW: [2.5, 1.4, 2.0, 1.8, 1.8, 2.2],
    border: { pt: 0.5, color: '3A3D40' }
  });
}

// -------------------------------------------------------------
// SLIDE 21: XATARLAR VA RISK-MENEJMENT MATRITSASI
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Xatarlar Boshqaruvi va Risk-Menejment Matritsasi", "20. RISK TAHLILI");

  const risks = [
    {
      title: 'Mijozlar Nasiya Qarz Qaytmasligi Riski',
      level: 'YUQORI', col: C_RED,
      desc: 'Sexoviklarga mahsulot nasiya berilganda qarz uzilmasligi ehtimoli mavjud.',
      mitigation: 'Boshqaruv: Top 60 sexovik faqat qat’iy shartnoma, garov, limit va kafil asosida ishlaydi. 15 kundan oshgan qarzga darhol yangi tovar berish to‘xtatiladi.'
    },
    {
      title: 'Valyuta Kursi va Inflyatsiya Riski',
      level: 'O‘RTA', col: 'F59E0B',
      desc: 'So‘m qadrsizlanishi hisobiga xarid narxlarining o‘sishi.',
      mitigation: 'Boshqaruv: Barcha profillar narxi xalqaro dollar kursiga bog‘langan. Narxlar avtomatik korreksiya qilinadi, mahsulot zanglamaydi va qadrini yo‘qotmaydi.'
    },
    {
      title: 'Mavsumiy Talabning Pasayishi (Qish)',
      level: 'O‘RTA', col: 'F59E0B',
      desc: 'Noyabr-Fevral oylarida qurilish sur’atlarining tushib ketishi.',
      mitigation: 'Boshqaruv: Qishki mavsumda isitish radiatorlari va butlovchi qismlar savdosi faollashtiriladi. Aylanma kapital ombor zaxirasiga to‘g‘ri taqsimlanadi.'
    },
    {
      title: 'AKFA Dilerlik Shartnomasi Shartlari',
      level: 'PAST', col: C_GREEN,
      desc: 'Zavod tomonidan narx yoki dilerlik kvotasining o‘zgartirilishi.',
      mitigation: 'Boshqaruv: 7 yillik rasmiy munosabatlar, 4 ta hududdagi mustahkam dilerlik huquqi va O‘zbekiston bo‘yicha 65% brend himoyasi kafolatlangan.'
    }
  ];

  risks.forEach((r, idx) => {
    const colIdx = idx % 2;
    const rowIdx = Math.floor(idx / 2);
    const x = 0.8 + colIdx * 6.0;
    const y = 1.6 + rowIdx * 2.6;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.7, h: 2.3, rectRadius: 0.12,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 4.3, y: y + 0.15, w: 1.2, h: 0.35, rectRadius: 0.08,
      fill: { color: r.col }
    });
    s.addText(r.level, {
      x: x + 4.3, y: y + 0.15, w: 1.2, h: 0.35,
      fontSize: 9, bold: true, color: C_WHITE, align: 'center'
    });
    s.addText(r.title, {
      x: x + 0.2, y: y + 0.15, w: 4.0, h: 0.4,
      fontSize: 12, bold: true, color: C_WHITE
    });
    s.addText(r.desc, {
      x: x + 0.2, y: y + 0.65, w: 5.3, h: 0.55,
      fontSize: 10, color: C_SILVER
    });
    s.addText(r.mitigation, {
      x: x + 0.2, y: y + 1.25, w: 5.3, h: 0.95,
      fontSize: 10, bold: true, color: C_GREEN, lineSpacingMultiple: 1.15
    });
  });
}

// -------------------------------------------------------------
// SLIDE 22: INVESTOR UCHUN TEKSHIRILISHI KERAK BO'LGAN SAVOLLAR
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Audit va Muzokaralar: Ochiq Qolgan Asosiy Savollar", "21. DATA AUDIT");

  const questions = [
    { n: '1', q: 'Aylanma va foyda pasayishining (2023-2025) rasmiy sabablari nima?', s: 'Tushuntirish zarur' },
    { n: '2', q: '2025-yil Mart oyida nega foyda 0 bo‘lgan? Xatlov yoki zarar bormi?', s: 'Buxgalteriya tekshiruvi' },
    { n: '3', q: 'Prognoz ko‘rsatkichlariga (276 mlrd UZS) erishishning operatsion rejasimi?', s: 'Marketing / Sotuv rejasi' },
    { n: '4', q: 'Investorga beriladigan ulush foizi va dividend to‘lovlar davriyligi qanday?', s: 'Yuridik shartnoma' },
    { n: '5', q: 'Investitsiya muddati va chiqish (Exit Strategy) mexanizmlari qanday belgilanadi?', s: 'Shartnomaviy band' },
    { n: '6', q: 'Filiallar kesimida alohida P&L (Daromad-Xarajat) hisobotlari mavjudmi?', s: 'Boshqaruv hisoboti' }
  ];

  questions.forEach((q, idx) => {
    const yP = 1.6 + idx * 0.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: yP, w: 11.7, h: 0.78, rectRadius: 0.08,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addShape(pres.shapes.OVAL, {
      x: 1.0, y: yP + 0.15, w: 0.45, h: 0.45,
      fill: { color: C_RED }
    });
    s.addText(q.n, {
      x: 1.0, y: yP + 0.15, w: 0.45, h: 0.45,
      fontSize: 12, bold: true, color: C_WHITE, align: 'center'
    });
    s.addText(q.q, {
      x: 1.6, y: yP + 0.15, w: 7.5, h: 0.5,
      fontSize: 11, bold: true, color: C_WHITE
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 9.4, y: yP + 0.15, w: 2.8, h: 0.45, rectRadius: 0.08,
      fill: { color: C_CARD }
    });
    s.addText(`⚠ ${q.s}`, {
      x: 9.4, y: yP + 0.15, w: 2.8, h: 0.45,
      fontSize: 10, bold: true, color: C_RED, align: 'center'
    });
  });
}

// -------------------------------------------------------------
// SLIDE 23: YAKUNIY XULOSA VA KEYINGI QADAMLAR
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  addSlideHeader(s, "Strategik Xulosa va Investitsiya Jarayoni Bosqichlari", "22. XULOSA");

  const road = [
    { step: '1-BOSQICH', title: 'Muzokaralar va NDA', desc: 'Dastlabki tijoriy shartlarni kelishish, maxfiylik shartnomasi (NDA) imzolash.' },
    { step: '2-BOSQICH', title: 'Due Diligence (Audit)', desc: 'Buxgalteriya, ombor qoldiqlari, shartnomalar va bank hisoblarini mustaqil tekshirish.' },
    { step: '3-BOSQICH', title: 'Yuridik Rasmiylashtirish', desc: 'Ta’sischilar shartnomasi, investor ulushi va dividend siyosatini tasdiqlash.' },
    { step: '4-BOSQICH', title: 'Kapital Kiritish va Masshtab', desc: '$2M mablag‘ni bosqichma-bosqich yo‘naltirish va aylanmani 276 mlrd UZS ga yetkazish.' }
  ];

  road.forEach((r, idx) => {
    const x = 0.8 + idx * 3.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.6, w: 2.7, h: 5.3, rectRadius: 0.15,
      fill: { color: C_PANEL }, line: { color: C_CARD, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.6, w: 2.7, h: 0.08, fill: { color: C_RED } });
    s.addText(r.step, { x, y: 2.0, w: 2.7, h: 0.4, fontSize: 11, bold: true, color: C_RED, align: 'center', charSpacing: 1.5 });
    s.addText(r.title, { x: x + 0.15, y: 2.5, w: 2.4, h: 0.7, fontSize: 14, bold: true, color: C_WHITE, align: 'center' });
    s.addText(r.desc, { x: x + 0.2, y: 3.4, w: 2.3, h: 3.2, fontSize: 11, color: C_SILVER, align: 'center', lineSpacingMultiple: 1.25 });
  });
}

// -------------------------------------------------------------
// SLIDE 24: ALOQA VA YAKUNIY SLAYD
// -------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: C_DARK };
  if (fs.existsSync(constrImg)) {
    s.addImage({ path: constrImg, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: 'cover' } });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 13.33, h: 7.5,
      fill: { color: C_DARK, transparency: 20 }
    });
  }

  s.addText('E’TIBORINGIZ UCHUN RAHMAT!', {
    x: 1.0, y: 2.2, w: 11.33, h: 1.0,
    fontSize: 40, bold: true, color: C_WHITE, align: 'center', fontFace: 'Calibri'
  });
  s.addText('AKFA Dilerlik Biznesi — Ishonchli, Barqaror va Yuqori Daromadli Hamkorlik', {
    x: 1.0, y: 3.3, w: 11.33, h: 0.6,
    fontSize: 18, color: C_SILVER, align: 'center', fontFace: 'Calibri'
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 4.4, w: 6.3, h: 1.6, rectRadius: 0.15,
    fill: { color: C_PANEL, transparency: 20 },
    line: { color: C_RED, width: 1.5 }
  });
  s.addText([
    { text: 'Bosh Ofis: ', options: { bold: true, color: C_WHITE } },
    { text: 'Toshkent viloyati (Olmaliq, Guliston, Bo‘ka, Yangiyo‘l)\n', options: { color: C_SILVER } },
    { text: 'Faoliyat: ', options: { bold: true, color: C_WHITE } },
    { text: 'AKFA mahsulotlari rasmiy dilerligi va logistika tarmog‘i\n', options: { color: C_SILVER } },
    { text: 'Investitsiya Miqdori: ', options: { bold: true, color: C_RED } },
    { text: '$2,000,000 (Aylanma kapital va infratuzilma)', options: { bold: true, color: C_WHITE } }
  ], {
    x: 3.8, y: 4.6, w: 5.7, h: 1.2,
    fontSize: 12, align: 'center', lineSpacingMultiple: 1.2
  });
}

const outputPath = path.join(__dirname, 'AKFA_Dilerlik_Investor_Prezentatsiyasi.pptx');
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`\n======================================================`);
  console.log(`PPTX file generated successfully!`);
  console.log(`Path: ${outputPath}`);
  console.log(`======================================================\n`);
}).catch(err => {
  console.error('Error generating PPTX:', err);
});
