# Dokumen Analisis Kebutuhan Sistem - Gerai Ayra Fullstack

**Tanggal Dokumen:** 21 Desember 2025  
**Versi:** 2.0 (Updated)  
**Status:** Draft Final

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini bertujuan untuk mendefinisikan kebutuhan fungsional dan non-fungsional untuk pengembangan sistem e-commerce "Gerai Ayra". Sistem ini dirancang untuk menjadi solusi **Fullstack E-commerce & Resource Planning (ERP)** yang tidak hanya menangani penjualan online (B2C) tetapi juga mencakup manajemen operasional bisnis secara menyeluruh mulai dari stok, keuangan, pelanggan (CRM), hingga logistik.

### 1.2 Lingkup Proyek
Lingkup proyek mencakup pengembangan tiga komponen utama:
1.  **Aplikasi Frontend Pelanggan**: Antarmuka belanja online yang responsif dan interaktif.
2.  **Panel Admin (ERP)**: Pusat kontrol untuk manajemen operasional bisnis yang komprehensif.
3.  **Backend API Server**: Layanan terpusat yang menangani logika bisnis, database, dan integrasi pihak ketiga.

---

## 2. Gambaran Umum Sistem

Gerai Ayra adalah platform e-commerce modern yang dibangun dengan stack MERN (MongoDB, Express.js, React, Node.js). Sistem ini mengintegrasikan fungsi penjualan ritel dengan fitur manajemen bisnis tingkat lanjut seperti CRM, manajemen pengeluaran (Finance), sistem pengembalian barang (Returns), dan kontrol stok inventaris.

---

## 3. Aktor dan Peran

1.  **Pelanggan (Customer/User)**
    *   Pengguna yang melakukan browsing produk, transaksi pembelian, dan manajemen profil pribadi.
2.  **Administrator (Super Admin)**
    *   Pengguna dengan akses penuh ke seluruh modul Admin Panel (Dashboard, Keuangan, Pengaturan).
3.  **Staf Gudang/Logistik (Opsional)**
    *   Pengguna yang fokus pada modul Stok, Pengiriman (Shipping), dan Pesanan.
4.  **Sistem Eksternal**
    *   Gateway Pembayaran (Midtrans, Stripe, Razorpay).
    *   Layanan Penyimpanan Media (Cloudinary).

---

## 4. Analisis Kebutuhan Fungsional

### 4.1 Modul Frontend (Aplikasi Pelanggan)

Fitur yang ditujukan untuk pengalaman belanja pelanggan:

*   **Autentikasi & Profil**:
    *   Registrasi dan Login pengguna (JWT based).
    *   Manajemen Profil (Ubah password, update alamat pengiriman).
    *   Riwayat Pesanan (Order History) dan pelacakan status.
    *   Wishlist (Daftar Keinginan).
*   **Katalog & Pencarian**:
    *   Tampilan produk dengan Grid Layout.
    *   Pencarian produk (Keyword search).
    *   Filter produk berdasarkan Kategori, Sub-kategori, dan Harga.
    *   Halaman Detail Produk dengan pilihan ukuran (Size) dan galeri gambar.
    *   Tampilan Produk Terkait (Related Products).
*   **Transaksi & Checkout**:
    *   Keranjang Belanja (Cart) yang persisten antar sesi.
    *   Penerapan Kode Voucher/Diskon.
    *   Kalkulasi biaya pengiriman otomatis.
    *   Checkout Multi-step (Alamat -> Metode Bayar -> Konfirmasi).
    *   Integrasi Pembayaran Online (Midtrans/Stripe) dan COD (Cash On Delivery).
*   **Interaksi**:
    *   Pemberian Ulasan (Review) dan Rating bintang untuk produk yang sudah dibeli.
    *   Fitur "Contact Us" dan Halaman Informasi (About, Policy).

### 4.2 Modul Admin Panel (Manajemen & ERP)

Fitur backend office untuk pengelolaan bisnis:

*   **Dashboard & Analytics**:
    *   Ringkasan statistik (Total Penjualan, User Baru, Pesanan Aktif).
    *   Visualisasi data penjualan (Grafik Pendapatan).
    *   Analisis performa produk terlaris.
*   **Manajemen Produk & Stok (Inventory)**:
    *   CRUD Produk (Tambah, Edit, Hapus).
    *   Manajemen Kategori dan Sub-kategori.
    *   Upload gambar produk multi-file (terintegrasi Cloudinary).
    *   **Stock Control**: Monitoring level stok, peringatan stok menipis.
*   **Manajemen Pesanan & Fulfillment**:
    *   Daftar Pesanan masuk dengan filter status.
    *   Update status pesanan (Order Placed -> Packing -> Shipped -> Delivered).
    *   Cetak label pengiriman (Shipping Label) atau Invoice.
*   **Keuangan (Finance)**:
    *   **Pencatatan Pengeluaran (Expense)**: Input dan kategorisasi biaya operasional.
    *   Laporan Laba/Rugi sederhana.
    *   Rekapitulasi pembayaran masuk (Payments).
*   **Customer Relationship Management (CRM)**:
    *   **Leads Management**: Pelacakan prospek pelanggan potensial.
    *   **Interaction Logs**: Mencatat riwayat interaksi dengan pelanggan.
    *   Database Pelanggan: Detail lengkap data pelanggan dan riwayat belanja.
*   **Pemasaran (Marketing)**:
    *   **Manajemen Voucher**: Pembuatan kode diskon (Persen/Tetap), batas penggunaan, dan masa berlaku.
    *   Manajemen Banner/Carousel promosi.
*   **Logistik & Purna Jual**:
    *   **Shipping**: Manajemen opsi pengiriman dan pelacakan resi.
    *   **Returns**: Manajemen pengajuan pengembalian barang (Retur) dan persetujuan refund.
*   **Pengaturan Sistem (Settings)**:
    *   Konfigurasi toko (Nama, Logo, Mata Uang).
    *   Manajemen pengguna admin.

### 4.3 Modul Backend (API Server)

*   **Arsitektur**: RESTful API dengan Express.js.
*   **Database**: MongoDB dengan Mongoose ODM.
*   **Keamanan**:
    *   Middleware Autentikasi (JWT Verify).
    *   Middleware Otorisasi (Admin Check).
    *   Sanitasi input data.
*   **Integrasi**:
    *   Cloudinary API (Image Management).
    *   Payment Gateways SDKs.

---

## 5. Model Data (Database Schema)

Sistem menggunakan database NoSQL (MongoDB) dengan koleksi utama sebagai berikut:

1.  **Users**: Menyimpan data akun pelanggan, password hash (bcrypt), dan alamat.
2.  **Products**: Data barang, harga, deskripsi, varian ukuran, dan URL gambar.
3.  **Categories**: Taksonomi produk.
4.  **Orders**: Data transaksi, item yang dibeli, total harga, status pembayaran, dan status pengiriman.
5.  **Reviews**: Ulasan user terhadap produk.
6.  **Vouchers**: Logika promosi dan diskon.
7.  **Leads & Interactions (CRM)**: Data prospek dan log komunikasi CRM.
8.  **Internal Finance**:
    *   **Expenses**: Data pengeluaran operasional.
    *   **Payments**: Log pembayaran yang diterima.
9.  **Logistics**:
    *   **Shippings**: Opsi pengiriman dan data logistik.
    *   **Returns**: Data pengajuan retur barang.

---

## 6. Analisis Kebutuhan Non-Fungsional

1.  **Performa**:
    *   Waktu muat halaman frontend < 2 detik (menggunakan Vite & Code Splitting).
    *   Optimasi gambar otomatis via CDN Cloudinary.
2.  **Keamanan**:
    *   Enkripsi data sensitif (Password).
    *   Proteksi terhadap serangan umum (XSS, Injection) via validasi input.
    *   Akses Admin Panel yang ketat dengan token khusus.
3.  **Skalabilitas**:
    *   Struktur kode Modular (MVC) memudahkan penambahan fitur baru tanpa merombak sistem.
    *   Database MongoDB yang mampu menangani data dalam jumlah besar (JSON-like documents).
4.  **Keterguanaan (Usability)**:
    *   Desain responsif (Mobile-First) untuk Frontend Pelanggan.
    *   Antarmuka Admin yang intuitif dan kaya visualisasi data.

---

## 7. Kesimpulan

Sistem Gerai Ayra Fullstack telah berkembang dari sekadar toko online menjadi sistem manajemen ritel yang komprehensif. Penambahan modul-modul seperti CRM, Finance, dan Returns (RMA) menjadikan sistem ini siap digunakan untuk skala bisnis yang lebih serius, memberikan kontrol penuh kepada pemilik bisnis atas setiap aspek operasional mereka.
