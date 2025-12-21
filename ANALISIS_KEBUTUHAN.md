# Dokumen Analisis Kebutuhan Sistem - Gerai Ayra

**Tanggal Analisis:** 15 Desember 2025
**Proyek:** Gerai Ayra Fullstack E-commerce
**Versi:** 1.0

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini bertujuan untuk mendefinisikan kebutuhan fungsional dan non-fungsional untuk sistem E-commerce "Gerai Ayra". Sistem ini dirancang untuk memfasilitasi penjualan produk secara online dengan dukungan manajemen produk, pesanan, dan sistem promosi (voucher).

### 1.2 Cakupan Proyek
Gerai Ayra adalah platform E-commerce berbasis web yang mencakup:
- **Halaman Pelanggan (Frontend):** Antarmuka belanja untuk pengguna akhir.
- **Panel Admin:** Dashboard untuk pengelola toko.
- **Backend API:** Server pusat untuk logika bisnis dan pemrosesan data.

---

## 2. Aktor Sistem

Sistem ini memiliki dua aktor utama yang berinteraksi dengan aplikasi:

### 2.1 Pelanggan (Customer)
- **Tamu (Guest):** Pengunjung yang belum login. Dapat melihat produk tetapi terbatas aksesnya.
- **Pelanggan Terdaftar:** Pengguna yang memiliki akun. Dapat melakukan transaksi, menyimpan keranjang, menggunakan voucher, dan melacak pesanan.

### 2.2 Admin
- Pengelola sistem yang memiliki akses penuh ke manajemen konten, data produk, voucher, dan pemrosesan pesanan.

---

## 3. Kebutuhan Fungsional

### 3.1 Modul Pelanggan (Frontend)

#### 3.1.1 Manajemen Akun
- **Registrasi & Login:** Pengguna dapat mendaftar dan login menggunakan email dan password.
- **Profil Pengguna:** Pengguna dapat melihat dan memperbarui informasi profil serta alamat pengiriman.
- **Ganti Password:** Fitur keamanan untuk mengubah kata sandi akun.

#### 3.1.2 Katalog & Penelusuran Produk
- **Browsing Produk:** Menampilkan daftar produk dengan filter kategori, harga, dan fitur pencarian.
- **Detail Produk:** Halaman detail yang menampilkan gambar, deskripsi, varian ukuran, dan ulasan produk.
- **Produk Terkait & Terlaris:** Menampilkan rekomendasi produk relevan.

#### 3.1.3 Keranjang & Transaksi
- **Keranjang Belanja:** Menambah/mengurangi item, update kuantitas, dan menghitung total harga otomatis.
- **Penerapan Voucher:** Input kode voucher untuk mendapatkan diskon (persentase/nominal tetap).
- **Checkout:** Formulir pengiriman dan pemilihan metode pembayaran.
- **Integrasi Pembayaran:**
  - **COD (Cash On Delivery):** Pembayaran di tempat.
  - **Online Payment:** Integrasi dengan Midtrans (Indonesia), Stripe (Internasional), dan Razorpay.

#### 3.1.4 Manajemen Pesanan
- **Riwayat Pesanan:** Melihat daftar pesanan yang pernah dibuat beserta statusnya.
- **Pelacakan Pesanan:** Memantau status terkini (Placed, Packing, Shipped, Delivered).
- **Ulasan Produk:** Memberikan rating (bintang) dan komentar pada produk yang telah dibeli.

### 3.2 Modul Admin (Panel Admin)

#### 3.2.1 Dashboard
- Ringkasan statistik (Total Penjualan, Jumlah Order, Jumlah User).
- Tampilan grafik atau ringkasan aktivitas terbaru.

#### 3.2.2 Manajemen Produk
- **CRUD Produk:** Menambah, mengedit, dan menghapus produk.
- **Upload Gambar:** Integrasi dengan Cloudinary untuk penyimpanan gambar produk.
- **Stok & Varian:** Mengatur ukuran dan kategori produk.

#### 3.2.3 Manajemen Pesanan
- **Daftar Pesanan:** Melihat semua pesanan masuk.
- **Update Status:** Mengubah status pesanan dari "Order Placed" -> "Packing" -> "Shipped" -> "Delivered".

#### 3.2.4 Manajemen Voucher (Sistem Promo)
- **Buat Voucher Baru:** Menentukan kode, tipe diskon (persen/tetap), nilai diskon, minimal belanja, dan masa berlaku.
- **List Voucher:** Melihat dan menghapus voucher yang aktif/tidak aktif.

#### 3.2.5 Moderasi Ulasan
- Melihat semua ulasan masuk dan menghapus ulasan yang tidak pantas.

---

## 4. Kebutuhan Non-Fungsional

### 4.1 Teknologi (Tech Stack)
- **Frontend:** React.js, Vite, TailwindCSS.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (dengan Mongoose ODM).
- **Image Storage:** Cloudinary.
- **Payment Gateways:** Midtrans, Stripe, Razorpay.

### 4.2 Keamanan
- **Autentikasi:** Menggunakan JSON Web Token (JWT).
- **Password:** Enkripsi password menggunakan `bcrypt` sebelum disimpan di database.
- **Validasi Input:** Pencegahan injecksi data berbahaya pada formulir input.
- **Otorisasi:** Middleware untuk membatasi akses endpoint tertentu hanya untuk Admin.

### 4.3 Kinerja & Skalabilitas
- **Responsif:** Antarmuka harus menyesuaikan dengan berbagai ukuran layar (Mobile, Tablet, Desktop).
- **Kecepatan:** Waktu muat halaman yang optimal dengan penggunaan Vite dan optimasi gambar.

---

## 5. Ringkasan Alur Data (DFD)

### 5.1 Diagram Konteks (Level 0)
Sistem berinteraksi dengan 4 entitas eksternal:
1. **Pelanggan:** Melakukan order, pembayaran, dan ulasan.
2. **Admin:** Mengelola data master dan pesanan.
3. **Payment Gateway:** Memproses transaksi online.
4. **Ekspedisi:** (Opsional) Mengirim data status pengiriman.

### 5.2 Alur Utama
1. **Auth:** User/Admin login -> Sistem memvalidasi -> Token diberikan.
2. **Belanja:** User memilih barang -> Masuk Cart -> Checkout -> Payment Gateway memvalidasi -> Order dibuat.
3. **Fulfillment:** Order masuk -> Admin update status "Packing/Shipped" -> User menerima notifikasi status.
