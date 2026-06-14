# Aplikasi Kasir Staff Rocky - Versi Dipisah

File HTML utama sudah dipecah agar lebih mudah diedit di VS Code.

## Struktur file

```text
Aplikasi_KASIR_STAF_ROCKY_SPLIT/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    └── modal-keyboard-fix.js
```

## Cara buka di VS Code

1. Extract ZIP ini.
2. Buka folder `Aplikasi_KASIR_STAF_ROCKY_SPLIT` di VS Code.
3. Edit tampilan di `css/style.css`.
4. Edit logika aplikasi di `js/app.js`.
5. Script kecil untuk popup/keyboard HP ada di `js/modal-keyboard-fix.js`.

## Cara tes

Karena file JavaScript utama memakai `type="module"`, paling aman jalankan lewat server lokal, bukan langsung double-click file.

Pilihan termudah di VS Code:

1. Install extension **Live Server**.
2. Klik kanan `index.html`.
3. Pilih **Open with Live Server**.

Atau lewat terminal di folder ini:

```bash
python -m http.server 5500
```

Lalu buka `http://localhost:5500` di browser.

## Catatan penting

- Jangan hapus link Font Awesome di `index.html`, karena icon aplikasi pakai itu.
- Jangan ubah `type="module"` pada script `app.js`, karena aplikasi memakai import Supabase dari CDN.
- File ini masih memakai koneksi CDN/Supabase, jadi sebagian fitur butuh internet.
