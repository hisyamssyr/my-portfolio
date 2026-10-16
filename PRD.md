# PRD: Personal Portfolio Website — Hisyam Syafa Raditya

> Dokumen ini adalah sumber kebenaran untuk AI Agent yang membangun website. Baca seluruhnya sebelum menulis kode. Jika ada konflik antara dokumen ini dan kebiasaan/default-mu, **dokumen ini menang**. Jika ada informasi yang tidak ada di sini, **jangan mengarang**: pakai placeholder yang jelas bertanda `TODO` dan laporkan di akhir.

---

## 1. Ringkasan Produk

Website portfolio pribadi untuk seorang mahasiswa Informatika (ITS) yang berfokus pada **data, machine learning, sistem agentic AI, dan backend/security**. Website ini harus:

1. Memperkenalkan siapa Hisyam dalam < 10 detik.
2. Menampilkan 3 project unggulan sebagai **studi kasus** (bukan sekadar kartu dengan screenshot).
3. Menjadi bukti bahwa pemiliknya detail, teknis, dan punya selera.
4. Memudahkan recruiter/dosen/kolega menghubunginya.

**Target audiens utama:** recruiter magang/internship (tech, data, AI), dosen/peneliti, dan kolega komunitas kampus.
**Bahasa konten:** English (sesuai CV). Struktur i18n tidak diperlukan di v1.

## 2. Tujuan & Non-Tujuan

**Tujuan**
- Kesan pertama kuat dan memorable, tanpa terasa generik.
- Cepat: Lighthouse Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95 (mobile).
- Mudah menambah project/tulisan baru lewat file Markdown/MDX tanpa menyentuh komponen.
- Responsif sempurna dari 360px sampai 1920px.

**Non-tujuan (v1)**
- Tidak ada backend, database, login, atau CMS.
- Tidak ada fitur chatbot AI di website.
- Tidak ada animasi berat 3D/WebGL. (Interaktivitas ringan sesuai §6.9 tetap wajib.)
- Tidak ada multi-bahasa.

## 3. Tech Stack (wajib diikuti)

| Layer | Pilihan | Catatan |
|---|---|---|
| Framework | **Astro** (versi stabil terbaru) | Output statis, JS minimal |
| Styling | **Tailwind CSS** + CSS variables untuk design tokens | Token didefinisikan di `:root`, bukan hard-code di komponen |
| Konten | **Astro Content Collections** (Markdown/MDX + Zod schema) | Project & (opsional) tulisan |
| Interaktivitas | Vanilla JS / Astro `<script>`; island hanya jika benar-benar perlu | Hindari React kecuali ada alasan kuat |
| Font | Self-hosted (Fontsource) | Tanpa request ke Google Fonts saat runtime |
| Ikon | SVG inline / `astro-icon` (Lucide atau Phosphor) | **Dilarang emoji sebagai ikon** |
| Deploy | Vercel / Cloudflare Pages / Netlify (pilih satu, sertakan konfigurasi) | Repo di GitHub |
| Analytics | Opsional: Plausible/Umami. Jangan Google Analytics | Hanya jika diminta |

Struktur folder yang diharapkan:

```
src/
  components/      # komponen kecil, reusable
  content/
    projects/      # satu file .md/.mdx per project
    config.ts      # schema Zod
  layouts/
  pages/
    index.astro
    projects/[slug].astro
  styles/
    tokens.css     # design tokens
    global.css
public/
  fonts/ images/ og/
```

## 4. Information Architecture

Single-page untuk halaman utama + halaman detail per project.

1. `/` — Home (Hero → Selected Work → Experience → Leadership & Organizations → Skills → Contact)
2. `/projects/[slug]` — Studi kasus lengkap (3 halaman)
3. `/404` — Halaman 404 dengan karakter desain yang sama
4. (Opsional) `/cv` — redirect/unduh PDF CV

Navigasi: sticky ringan (nama/monogram di kiri; link `Work`, `Experience`, `Contact` di kanan; toggle tema). Di mobile: menu sederhana tanpa hamburger berlebihan (boleh anchor horizontal scroll atau menu fullscreen minimal).

## 5. Konten (sumber: CV — jangan ubah fakta)

### 5.1 Identitas
- **Nama:** Hisyam Syafa Raditya
- **Peran/tagline kandidat** (pilih satu, boleh disempurnakan tanpa menambah klaim): *Informatics student building data and agentic-AI systems.*
- **Lokasi:** Surabaya, Indonesia
- **Kampus:** Institut Teknologi Sepuluh Nopember (ITS), Bachelor of Informatics, Aug 2024 – Aug 2028 (expected)
- **Email:** hisyamsyafa2@gmail.com
- **LinkedIn:** linkedin.com/in/hisyam-syafa-raditya
- **GitHub:** github.com/hisyamssyr
- **Nomor telepon: JANGAN dipublikasikan di website** (risiko spam/scraping). Hanya email + LinkedIn + GitHub.
- **GPA:** jangan ditampilkan di hero. Boleh di bagian Education/CV saja.

### 5.2 Summary (bahan untuk bio, tulis ulang dengan suara orang pertama yang natural)
Informatics Engineering student at ITS with a foundation in Python, SQL, data analysis, and machine learning. Experienced in database instruction, data management, and team leadership; applies analytical and technical skills to real-world problems.

### 5.3 Selected Work (3 studi kasus)

**A. Autonomous Web QA Agent** — *Laravel 13, Livewire 4, Node.js, Playwright, LLM, Docker* — 2026
- Agen QA web otonom; integrasi LLM kompatibel OpenAI dengan validasi aksi berbasis snapshot.
- Pipeline verifikasi perbaikan **enam gerbang (six-gate)** dengan sandbox Docker terisolasi untuk memvalidasi kegagalan regresi, keberhasilan patch pada test, dan replay browser.
- Integrasi autentikasi GitHub Apps + REST API: inspeksi repo, commit patch terbatas ke branch terbatas, membuat draft PR yang idempoten.
- Kontrol keamanan aplikasi: pencegahan SSRF, mitigasi DNS rebinding, penegakan same-origin, redaksi kredensial.
- *Sudut cerita:* "Bagaimana membuat agen yang boleh memperbaiki kode, tetapi tidak boleh merusak apa pun." Fokus pada **safety by design**.

**B. Agentic AI for BPMN Code Change Planning** — *Python, Multi-Agent, RAG* — 2026
- Arsitektur multi-agent kolaboratif dengan peran terspesialisasi (analyst, backend, frontend, CSS, reviewer) untuk mengorkestrasi modifikasi codebase dari pembaruan BPMN.
- RAG untuk mengambil contoh implementasi relevan dari codebase ERP yang ada.
- Eksperimen komparatif tiga setup: single-agent, single-agent + RAG, multi-agent + RAG.
- Evaluasi dampak dekomposisi peran dan retrieval kontekstual terhadap akurasi dan logika struktural perencanaan arsitektur otomatis.
- *Sudut cerita:* desain eksperimen dan temuan perbandingan 3 setup. (Jangan menulis angka hasil; tandai `TODO: add results` jika pemilik belum memberi data.)

**C. Handwritten Chinese Numeral Classification** — *Python, TensorFlow/Keras, ResNet-18* — 2026
- Pipeline klasifikasi end-to-end: 15 kelas, 10.500 gambar dari 70 penulis.
- Preprocessing reproducible, disk caching, augmentasi kustom untuk variasi tulisan tangan.
- ResNet-18 kustom dengan EMA, AdamW, LR scheduling, label smoothing, mixed-precision.
- Evaluasi bebas kebocoran data: cross-validation yang dikelompokkan per penulis, multi-seed ensembling, test-time augmentation, diagnostik Grad-CAM.
- *Sudut cerita:* **evaluasi yang jujur** (writer-grouped CV untuk mencegah data leakage) dan visualisasi Grad-CAM.

> Untuk tiap studi kasus, struktur halaman: **Context → Problem → Approach → What I built → Result/What I learned → Stack**. Bagian yang datanya belum ada ditandai `TODO`, **jangan diisi karangan**. Sediakan slot untuk gambar/diagram/screenshot dan link repo/demo (`TODO` jika belum ada).

### 5.4 Experience
- **Teaching Assistant, Database Systems** — ITS, Aug 2025 – Dec 2025: membimbing 13 mahasiswa (desain database & SQL), menjelaskan CDM/PDM, DDL, DML lewat demo, menyusun studi kasus SQL, menilai tugas & kuis di 7 sesi.
- **Programming Division Intern** — ITS Robocon, Sep 2024 – Oct 2024: mikrokontroler, embedded programming (C++ & Python), dasar ROS untuk navigasi & kontrol robot.

### 5.5 Leadership & Organizations
- **External Affairs Staff** — HMTC ITS (Mar 2026 – Present): PIC program konten Instagram *Siapin Karirmu*; koordinator 60 peserta sebagai Liaison Officer kunjungan Oracle & Telkom; memimpin perencanaan & eksekusi program Benchmarking.
- **Vice Head of Data Management** — Schematics 2026 (Mar 2026 – Present): SOP data registrasi (web & offline), otomasi pembuatan query SQL lewat spreadsheet, dashboard Looker Studio, otomasi pesan massal & email.
- **Head of Food & Nutrition** — Ramadan di Kampus 1447H (Aug 2025 – Mar 2026): memimpin 25+ staf, sistem distribusi makanan untuk 700+ peserta/hari, koordinasi 15+ vendor (pengadaan, harga, MoU), SOP kualitas makanan & logistik.

### 5.6 Skills (kelompokkan, jangan pakai progress bar/persentase)
- **Languages:** Python, SQL, Go, C++, PHP (Laravel), Node.js
- **Data Science & AI:** TensorFlow/Keras, LLMs, Multi-Agent AI, RAG, CNN (ResNet), Cross-Validation
- **Data & Tools:** Playwright, Docker, Looker Studio, DBeaver, TablePlus, Git/GitHub, Figma
- **Other:** Business Process Modeling (BPMN), Application Security, Database Design (CDM/PDM)

### 5.6 Contact
Satu kalimat ajakan yang spesifik (bukan "Let's connect!"), tombol email, link LinkedIn & GitHub. Boleh ada tombol "Download CV" (file PDF disediakan pemilik di `public/`).

## 6. Arah Desain

### 6.1 Konsep: "Technical Editorial"
Gabungan **majalah teknis/jurnal** dan **lembar kerja engineer**: tipografi serif yang tegas berpadu monospace untuk metadata, grid yang terlihat disengaja, banyak ruang kosong, detail kecil yang terasa dirancang manusia (nomor bagian, koordinat, label ala spesifikasi). Kesannya: *teliti, tenang, percaya diri*, bukan "startup landing page".

### 6.2 Tipografi
- **Display/heading:** serif ekspresif, mis. *Instrument Serif*, *Fraunces*, atau *Newsreader* (pilih satu, gunakan konsisten).
- **Body:** sans yang bersih tetapi bukan default: mis. *Geist*, *Instrument Sans*, atau *Hanken Grotesk*. **Bukan Inter/Roboto/Arial** sebagai pilihan utama.
- **Mono (metadata, label, tahun, stack):** *JetBrains Mono*, *Geist Mono*, atau *IBM Plex Mono*.
- Skala tipe fluid dengan `clamp()`. Heading hero sangat besar dan berani; body 16–18px, line-height 1.6, lebar baca maks ~68ch.

### 6.3 Warna (definisikan sebagai CSS variables; dukung light & dark)
- **Light (default):** latar kertas hangat (off-white, mis. `#F4F1EA`), teks tinta pekat (`#14130F`), garis halus `rgba(20,19,15,.14)`.
- **Dark:** latar hampir hitam hangat (`#121110`), teks krem (`#EDE8DC`).
- **Satu aksen saja**, kuat dan tidak klise: mis. vermilion/oranye-merah (`#E8431F`) atau hijau-kuning "signal" (`#C6F135` di dark). Aksen dipakai hemat: link aktif, penanda, hover, satu elemen hero.
- Kontras WCAG AA minimal di semua teks.

### 6.4 Layout & Komposisi
- Grid 12 kolom dengan **garis tipis (hairline rules)** sebagai pemisah antarbagian, bukan kartu bersudut bulat + bayangan.
- Gunakan **asimetri**: kolom judul sempit di kiri (label mono: `01 — Selected Work`), konten lebar di kanan.
- Daftar project berupa **tabel/daftar editorial** besar (nomor, judul serif besar, stack mono, tahun) yang bereaksi saat hover (judul bergeser, aksen muncul, pratinjau gambar mengikuti kursor di desktop).
- Hero: nama sangat besar, satu kalimat tagline, metadata kecil (lokasi, kampus, status) dalam mono. Tanpa foto stok, tanpa ilustrasi generik.
- Boleh satu elemen visual khas yang **dibuat dari kode** (mis. grid titik halus, pola garis ala kertas milimeter, diagram sederhana pipeline agentic). Harus relevan dengan karya, bukan dekorasi acak.
- Foto profil: slot opsional (`TODO: owner photo`). Jika tidak ada, jangan pasang avatar placeholder; gunakan monogram "HSR" bergaya tipografi.

### 6.5 Motion
- Halus dan bermakna: reveal teks bertahap saat scroll (translate 12–16px + fade, 400–600ms, easing `cubic-bezier(.2,.7,.2,1)`), transisi hover pada daftar project, transisi tema.
- Hormati `prefers-reduced-motion` (matikan semua animasi non-esensial).
- Maks satu "momen" animasi menonjol (mis. hero text reveal). Sisanya tenang.
- Tidak ada parallax berlebihan, tidak ada partikel melayang, tidak ada cursor-follower norak.

### 6.6 Daftar Larangan ("anti AI slop") — WAJIB
- ❌ Gradasi ungu→biru/pink sebagai identitas, blob/mesh gradient, glow neon di mana-mana.
- ❌ Glassmorphism berlebihan, kartu bundar + bayangan lembut seragam untuk semuanya.
- ❌ Grid 3 kartu identik "Feature / Feature / Feature".
- ❌ Emoji sebagai ikon atau dekorasi (🚀✨💡).
- ❌ Copywriting klise: "Welcome to my portfolio", "Passionate developer", "Crafting digital experiences", "Turning ideas into reality", "Let's build something amazing", "Innovative", "Cutting-edge", "Leveraging…".
- ❌ Progress bar/persentase skill, badge teknologi warna-warni berderet tanpa makna.
- ❌ Stock photo, ilustrasi orang di laptop, mockup perangkat generik.
- ❌ Angka/metrik karangan, testimoni palsu, logo "trusted by".
- ❌ Hero dengan efek mengetik berulang ("I am a Developer | Designer | …").
- ❌ Teks lorem ipsum tersisa di hasil akhir.
- ✅ Sebaliknya: spesifik, jujur, ringkas, dan terasa ditulis oleh satu orang.

### 6.7 Copywriting Guidelines
- Orang pertama, kalimat pendek, kata kerja aktif, konkret. Tonjolkan *keputusan teknis dan alasannya*.
- Contoh nada yang baik: "I built an agent that can open a PR, and a pipeline that makes sure it can't break the repo." (hanya contoh arah nada, sesuaikan dengan fakta)
- Setiap klaim harus bisa ditelusuri ke CV atau data dari pemilik.

### 6.8 Responsive Layout (mobile-first, wajib)

Bangun dari 360px ke atas. Jangan mendesain desktop dulu lalu "menyusutkannya".

**Breakpoint** (Tailwind default, pakai `min-width`): `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. Uji juga di 360, 390, 768, 1024, 1280, 1440, 1920 px dan orientasi landscape ponsel.

| Elemen | Mobile (< 768) | Tablet (768–1023) | Desktop (≥ 1024) |
|---|---|---|---|
| Grid | 1 kolom, gutter 16px | 6 kolom, gutter 24px | 12 kolom, gutter 24–32px, lebar maks ~1280px terpusat |
| Label bagian (`01 — Work`) | Di atas konten | Di atas konten | Kolom kiri sempit (sticky), konten di kanan |
| Hero | Nama besar bertumpuk per baris, metadata di bawah | Sama, ukuran lebih besar | Nama sangat besar, metadata di sisi/bawah dalam grid |
| Daftar project | Baris vertikal: nomor + judul + tahun; stack di bawah judul; seluruh baris bisa disentuh | Sama dengan 2 sub-kolom | Tabel editorial penuh dengan pratinjau gambar saat hover |
| Experience / Organizations | Timeline vertikal satu kolom | Dua kolom (periode kiri, detail kanan) | Dua kolom dengan periode sticky |
| Navigasi | Bar atas ringkas: monogram + tombol menu (overlay layar penuh, bisa ditutup dengan Esc/tap di luar) + toggle tema | Link muncul inline jika muat | Link inline + indikator bagian aktif |

**Aturan teknis**
- Tipografi dan spasi **fluid** dengan `clamp()` (heading hero, padding bagian). Hindari lompatan ukuran tajam antar breakpoint.
- Tidak boleh ada **scroll horizontal** di halaman pada ukuran apa pun. Tabel/kode panjang di studi kasus boleh scroll horizontal di dalam wadahnya sendiri.
- Gunakan `min-height: 100svh` (bukan `100vh`) agar tidak patah oleh address bar mobile; hormati `env(safe-area-inset-*)` pada notch.
- Target sentuh ≥ 44×44px; jarak antar target cukup. Tidak ada interaksi yang hanya bisa lewat hover. Setiap efek hover harus punya padanan untuk sentuh/fokus keyboard.
- Gambar responsif: `srcset`/`sizes` lewat `astro:assets`, rasio aspek dicadangkan (tanpa layout shift, CLS < 0.05).
- Gunakan container queries atau grid auto-fit untuk komponen yang dipakai di beberapa konteks.
- Teks maksimal ~68ch di semua ukuran; di layar sangat lebar, ruang kosong dibiarkan, bukan diisi.
- Dukungan `prefers-color-scheme`, `prefers-reduced-motion`, dan zoom teks hingga 200% tanpa kehilangan konten.

### 6.9 Interactive Experience (bermakna, ringan, bukan hiasan)

Interaksi harus membantu orang memahami karya atau menavigasi, bukan sekadar pamer. Implementasi dengan **vanilla JS / Astro `<script>` / CSS**; tanpa library animasi berat. Total JS tetap di bawah batas di §8.

**Wajib (Must)**
1. **Hero reveal:** teks nama muncul per baris/kata dengan mask-reveal sekali saat load (maks ~900ms). Nonaktif bila `prefers-reduced-motion`.
2. **Daftar project interaktif:** hover/fokus pada baris menggeser judul, memunculkan garis aksen, dan (desktop) menampilkan pratinjau gambar yang mengikuti kursor dengan easing halus. Di sentuh: tap membuka halaman project; tanpa pratinjau mengambang.
3. **Scroll-spy navigasi:** bagian aktif di-highlight memakai `IntersectionObserver`, bukan event scroll.
4. **Scroll reveal:** elemen muncul bertahap saat masuk viewport (`IntersectionObserver`, sekali saja, tanpa jank).
5. **Toggle tema** dengan transisi halus (View Transitions API bila didukung, fallback transisi warna CSS).
6. **Menu mobile** overlay dengan focus trap, tutup via Esc, kunci scroll body saat terbuka.
7. **Salin email:** tombol "Copy email" dengan umpan balik singkat ("Copied") dan fallback `mailto:`; status diumumkan lewat `aria-live`.
8. **Navigasi antar halaman** (Home ↔ studi kasus) dengan transisi halaman halus (Astro View Transitions) yang menjaga posisi scroll dan tema.

**Sebaiknya ada (Should)**
9. **Diagram interaktif per studi kasus** (inline SVG/HTML, tanpa library besar):
   - *Web QA Agent:* diagram pipeline **six-gate**; klik/fokus tiap gerbang menampilkan penjelasan singkat apa yang divalidasi. Dapat dioperasikan dengan keyboard.
   - *Agentic AI BPMN:* diagram peran agent (analyst, backend, frontend, CSS, reviewer) dan alur RAG; sorot jalur saat hover/fokus.
   - *Numeral Classification:* pembanding 3 kondisi/eksperimen atau slider before/after (mis. visualisasi Grad-CAM) **hanya bila pemilik menyediakan gambarnya** (`TODO`).
10. **Filter project berdasarkan tag** (mis. `AI`, `Data`, `Backend`, `Security`) dengan transisi layout halus dan status filter terbaca screen reader. Hanya jika project lebih dari 3; jika tidak, lewati.
11. **Progress baca** tipis di atas halaman studi kasus.
12. **Pintasan keyboard ringan** (opsional): `t` untuk ganti tema, `g` lalu `h` ke Home. Tampilkan petunjuk kecil di footer; jangan menimpa perilaku bawaan browser.

**Boleh (Could)**
13. Satu "easter egg" halus yang relevan dengan identitas teknis (mis. konsol browser berisi pesan singkat untuk developer yang mengintip). Tidak mengganggu pengguna biasa.

**Aturan interaktivitas**
- Semua elemen interaktif punya state jelas: default, hover, `:focus-visible`, active, disabled.
- Semua fitur harus **berfungsi tanpa JS** untuk konten inti (progressive enhancement): konten tetap terbaca dan navigasi tetap berjalan bila JS gagal.
- Hormati `prefers-reduced-motion`: ganti animasi dengan perubahan instan atau fade sederhana.
- Animasi hanya pada `transform` dan `opacity`; hindari animasi `width/height/top/left` agar tetap 60fps di ponsel menengah.
- Dilarang: efek kursor kustom yang menyembunyikan kursor asli, scroll-jacking, popup/modal yang muncul otomatis, musik/suara otomatis, partikel/3D berat.

## 7. Persyaratan Fungsional

| ID | Persyaratan | Prioritas |
|---|---|---|
| F1 | Halaman Home dengan 6 bagian sesuai IA | Must |
| F2 | 3 halaman studi kasus dari Content Collection (Markdown/MDX) | Must |
| F3 | Toggle light/dark, ikuti `prefers-color-scheme`, simpan di `localStorage` (dalam try/catch), tanpa flash saat load | Must |
| F4 | Tombol kontak: `mailto:` + link sosial dengan `rel="noopener noreferrer"` | Must |
| F5 | Navigasi anchor dengan smooth scroll + highlight bagian aktif | Should |
| F6 | Open Graph / Twitter card, `og:image` dibuat (statis atau generator Astro), favicon, `sitemap.xml`, `robots.txt` | Must |
| F7 | Tombol unduh CV (PDF dari `public/`) | Should |
| F8 | Halaman 404 bergaya | Should |
| F9 | Halaman project punya navigasi "Previous / Next project" | Should |
| F10 | RSS / blog | Could (v2) |
| F11 | Layout responsif mobile-first sesuai §6.8 (360px–1920px, tanpa scroll horizontal) | Must |
| F12 | Interaksi Must #1–8 pada §6.9 | Must |
| F13 | Diagram interaktif per studi kasus (§6.9 #9) | Should |
| F14 | Filter project berdasarkan tag (§6.9 #10), hanya jika project > 3 | Could |
| F15 | Progressive enhancement: konten inti dan navigasi bekerja tanpa JS | Must |

## 8. Persyaratan Non-Fungsional

- **Performa:** gambar dioptimasi (`astro:assets`, WebP/AVIF, `width/height` eksplisit, lazy load di bawah fold), font di-preload & `font-display: swap`, total JS di Home < 30 KB (gzip) di luar tema/analytics.
- **Aksesibilitas:** HTML semantik (`header/nav/main/section/footer`), urutan heading benar, skip-link, fokus terlihat jelas, navigasi keyboard penuh, `alt` bermakna, kontras AA, target sentuh ≥ 44px.
- **SEO:** `<title>` & meta description unik per halaman, canonical, data terstruktur `Person` (JSON-LD).
- **Keamanan/privasi:** tanpa nomor telepon di HTML, email boleh diberi obfuscation ringan, tanpa tracker pihak ketiga yang tidak perlu.
- **Maintainability:** komponen kecil, token desain terpusat, tanpa duplikasi style, komentar hanya untuk keputusan non-obvious.

## 9. Rencana Kerja untuk Agent (urutkan, jangan lompat)

1. **Setup:** inisialisasi Astro + Tailwind, konfigurasi font self-hosted, `tokens.css`, layout dasar, mode gelap tanpa flash.
2. **Design foundation:** halaman uji tipografi, warna, spacing, komponen dasar (label mono, aturan garis, tombol, link). **Tampilkan ke pemilik untuk persetujuan arah visual sebelum lanjut.**
3. **Home:** Hero → Selected Work (daftar editorial) → Experience → Organizations → Skills → Contact.
4. **Studi kasus:** schema Content Collection, template halaman, isi 3 project dari §5.3.
5. **Polish:** motion, reduced-motion, responsif, 404, OG image, favicon, meta/SEO.
6. **QA:** jalankan Lighthouse, cek keyboard, cek di 360 / 768 / 1280 / 1920 px, cek light & dark, cek link, cek tidak ada `lorem`/`TODO` tersisa tanpa dilaporkan.
7. **Deploy:** siapkan konfigurasi hosting + README singkat (cara menjalankan, menambah project).

## 10. Kriteria Penerimaan (Definition of Done)

- [ ] Semua konten sesuai CV; tidak ada fakta/angka karangan.
- [ ] Tidak ada item dari daftar larangan §6.6.
- [ ] Lighthouse mobile ≥ 95 untuk Performance, Accessibility, SEO, Best Practices.
- [ ] Berfungsi dan rapi di 360px–1920px (diuji di 360, 390, 768, 1024, 1280, 1440, 1920 dan landscape ponsel), light & dark, tanpa scroll horizontal dan CLS < 0.05.
- [ ] Semua interaksi Must pada §6.9 berjalan mulus di ponsel menengah (tanpa jank) dan di desktop; setiap efek hover punya padanan sentuh/fokus.
- [ ] Konten inti dan navigasi tetap berfungsi dengan JavaScript dimatikan.
- [ ] Diagram interaktif (bila dibuat) bisa dioperasikan dengan keyboard dan dibaca screen reader.
- [ ] Seluruh interaksi bisa dipakai hanya dengan keyboard.
- [ ] `prefers-reduced-motion` dihormati.
- [ ] 3 studi kasus punya struktur lengkap; bagian tanpa data ditandai jelas `TODO` dan dirangkum di laporan akhir.
- [ ] Build produksi sukses tanpa error/warning kritis.
- [ ] Nomor telepon tidak muncul di mana pun pada output.

## 11. Hal yang Perlu Dilengkapi Pemilik (jangan ditebak agent)

- Foto profil (opsional) dan file PDF CV
- Link repo/demo/screenshot/diagram untuk tiap project
- Hasil eksperimen konkret untuk project B dan C (akurasi, dsb.)
- Domain kustom (jika ada)
- Pilihan final font & warna aksen setelah melihat opsi di langkah 2

## 12. Laporan Akhir dari Agent

Setelah selesai, berikan ringkasan pendek: apa yang dibangun, skor Lighthouse, daftar `TODO` yang tersisa, dan keputusan desain penting beserta alasannya. Jangan menulis rekap langkah demi langkah.