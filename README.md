# AKFA Dilerlik Biznesi — Investor Prezentatsiyasi

AKFA dilerlik korxonasi investor taqdimoti (interaktiv veb-prezentatsiya va ma'lumotlar to'plami).

## Vercel orqali deploy qilish
Loyiha Vercel platformasi uchun to'liq moslashtirilgan:
1. Loyihani GitHub-ga ulang (`https://github.com/Diyorbek5/akfa-invest.git`).
2. [Vercel](https://vercel.com) saytiga kiring va **"Add New Project"** tugmasini bosing.
3. `akfa-invest` omborini (repository) tanlab, **"Deploy"** tugmasini bosing.
4. Hech qanday qo'shimcha sozlash (Build command / Output directory) talab etilmaydi — bosh sahifa (`index.html`) avtomatik ochiladi.

## Mahalliy ishga tushirish (Local)

### 1. Brauzerda to'g'ridan-to'g'ri ochish:
`index.html` yoki `akfa-investor-presentation.html` faylini brauzerda oching.

### 2. Node.js serveri orqali:
```bash
npm start
```
Brauzerda: `http://localhost:3456`

## Taqdimotlarni qayta generatsiya qilish
- **PDF formatida generatsiya qilish**:
  ```bash
  npm run generate:pdf
  ```
- **PowerPoint (PPTX) formatida generatsiya qilish**:
  ```bash
  npm run generate:pptx
  ```

## Navigatsiya va Boshqaruv
- **Strelka tugmalari** (← →): Slaydlar orasida harakatlanish
- **Space**: Keyingi slayd
- **Home / End**: Birinchi yoki oxirgi slaydga o'tish
- **F**: To'liq ekran rejimi (Fullscreen)
- **Sensorli ekran**: Chapga/o'ngga surish
- **Mouse wheel**: Aylantirish orqali slaydni o'zgartirish

## Loyiha tuzilmasi
```
akfa-invest/
├── index.html                             — Interaktiv veb-prezentatsiya (bosh sahifa)
├── akfa-investor-presentation.html        — Taqdimotning mustaqil nusxasi
├── AKFA_Investor_Prezentatsiyasi.pdf      — Investor uchun tayyor PDF taqdimot
├── AKFA_Dilerlik_Investor_Prezentatsiyasi.pptx — Investor uchun tayyor PPTX taqdimot
├── presentation-pdf.html                  — PDF generatsiyasi uchun moslashtirilgan HTML
├── generate-pdf.js                        — PDF generatsiya qiluvchi skript
├── generate-full-presentation.js          — PPTX generatsiya qiluvchi skript
├── server.js                              — Lokal HTTP server
├── vercel.json                            — Vercel marshrutlash konfiguratsiyasi
├── assets/                                — Tasvirlar va brend elementlari
├── investor-data-validation.md            — Moliyaviy ko'rsatkichlar va ma'lumotlar tahlili
├── image-sources.md                       — Foydalanilgan tasvirlar manbalari
└── package.json                           — Loyiha konfiguratsiyasi va bog'liqliklar
```


# akfa-invest-6040-new
