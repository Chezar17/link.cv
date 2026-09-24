# Link CV

Landing page Link CV: layanan mengubah CV menjadi webpage modern dengan URL pribadi (Rp99.000 per halaman).

## Struktur

```
linkcv/
├── index.html            Markup halaman (tanpa CSS/JS inline)
├── css/
│   ├── main.css          Titik masuk; meng-import semua file di bawah (urutan penting)
│   ├── tokens.css        Warna, font, tema terang/gelap
│   ├── base.css          Reset, tipografi, wrapper
│   ├── components.css    Navigasi, logo, tombol
│   ├── hero.css          Animasi CV berubah menjadi webpage
│   ├── sections.css      Cara kerja, perbandingan, keunggulan, harga, penutup, footer
│   ├── gallery.css       Galeri contoh hasil (miniatur CV)
│   └── responsive.css    Mobile dan reduced motion
├── js/
│   └── main.js           Animasi hero, garis cara kerja, galeri contoh
└── assets/img/           Logo (terang/gelap) dan favicon (ico, 16-512 px, apple-touch-icon)
```

## Cara pakai

Buka `index.html` di browser, atau unggah seluruh folder ke hosting statis.
Font dimuat dari Google Fonts, jadi perlu koneksi internet.

## Yang sering diubah

- Nomor WhatsApp: cari `6281398006841` di `index.html` (ada 4 tombol).
- Warna: `css/tokens.css`.
- Harga dan teks: `index.html`, bagian `#pesan` dan hero.
- Contoh CV baru: salin satu blok `<article class="shot">` di `#contoh`, lalu tambahkan gayanya di `css/gallery.css`.
