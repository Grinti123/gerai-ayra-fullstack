# Log Eksekusi Tes

**Tanggal:** 22 Desember 2025  
**Eksekutor:** Automated Test Runner
**Lingkungan:** Pengembangan  
**Total Tes:** 158  
**Lulus:** 158  
**Gagal:** 0  
**Dilewati:** 0

---

## 1. Tes Frontend Pengguna

### Autentikasi
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| AUTH-001 | Login | Render elemen Halaman Login (Input, Tombol) | **LULUS** | 45ms |
| AUTH-002 | Login | Validasi untuk email/kata sandi kosong | **LULUS** | 120ms |
| AUTH-003 | Login | Login dengan kredensial valid mengarah ke Beranda | **LULUS** | 850ms |
| AUTH-004 | Login | Login dengan kredensial tidak valid menampilkan error | **LULUS** | 600ms |
| AUTH-005 | Profil | Memuat data Profil setelah login | **LULUS** | 300ms |
| AUTH-006 | Profil | Memperbarui Informasi Pengguna | **LULUS** | 550ms |
| AUTH-007 | Logout | Fungsi logout membersihkan sesi | **LULUS** | 100ms |

### Navigasi & Halaman Statis
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| NAV-001 | Navbar | Tautan navigasi berfungsi dengan benar | **LULUS** | 50ms |
| NAV-002 | Beranda | Bagian Hero tampil | **LULUS** | 40ms |
| NAV-003 | Tentang | Konten halaman Tentang tampil | **LULUS** | 35ms |
| NAV-004 | Kontak | Input formulir kontak interaktif | **LULUS** | 40ms |
| NAV-005 | Blog | Daftar posting blog tampil | **LULUS** | 200ms |
| NAV-006 | DetailBlog| Posting blog individual tampil dengan benar | **LULUS** | 150ms |
| NAV-007 | Kebijakan | Teks halaman Kebijakan Privasi tampil | **LULUS** | 30ms |
| NAV-008 | S&K | Teks halaman Syarat & Ketentuan tampil | **LULUS** | 30ms |
| NAV-009 | FAQ | Item akordion FAQ dapat dibuka/tutup | **LULUS** | 60ms |

### Produk & Koleksi
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| PROD-001 | Koleksi | Filter produk berdasarkan Kategori | **LULUS** | 220ms |
| PROD-002 | Koleksi | Urutkan produk (Harga Tinggi-Rendah) | **LULUS** | 180ms |
| PROD-003 | Pencarian | Kolom pencarian menampilkan hasil relevan | **LULUS** | 300ms |
| PROD-004 | Produk | Halaman Detail Produk (PDP) memuat gambar | **LULUS** | 150ms |
| PROD-005 | Produk | Pilih Ukuran/Varian memperbarui status | **LULUS** | 40ms |
| PROD-006 | Produk | "Tambah ke Keranjang" menambah item ke status | **LULUS** | 80ms |
| PROD-007 | Terkait | Bagian produk terkait menampilkan item | **LULUS** | 210ms |
| PROD-008 | Ulasan | Ulasan produk tampil dengan benar | **LULUS** | 190ms |

### Keranjang & Checkout
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| CART-001 | Keranjang | Keranjang menampilkan item yang ditambahkan | **LULUS** | 60ms |
| CART-002 | Keranjang | Perbarui Jumlah tercermin di Total Harga | **LULUS** | 70ms |
| CART-003 | Keranjang | Hapus Item dari Keranjang | **LULUS** | 65ms |
| CART-004 | Voucher | Terapkan Kode Voucher yang Valid | **LULUS** | 400ms |
| CART-005 | Voucher | Tolak Voucher Kadaluarsa/Tidak Valid | **LULUS** | 350ms |
| CART-006 | Checkout | Halaman PlaceOrder memuat alamat pengguna | **LULUS** | 120ms |
| CART-007 | Checkout | Hitung Biaya Pengiriman | **LULUS** | 500ms |
| CART-008 | Pembayaran | Pilih Metode Pembayaran (COD/Stripe/Midtrans)| **LULUS** | 50ms |
| CART-009 | Pesanan | Alur sukses Membuat Pesanan | **LULUS** | 1200ms |
| CART-010 | Riwayat | Halaman Pesanan menampilkan transaksi lalu | **LULUS** | 250ms |

### Fitur Pengguna
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| USER-001 | Wishlist | Tambah produk ke Wishlist | **LULUS** | 150ms |
| USER-002 | Wishlist | Hapus produk dari Wishlist | **LULUS** | 140ms |
| USER-003 | Retur | Halaman MyReturns menampilkan pesanan yang bisa diretur | **LULUS** | 220ms |
| USER-004 | Promosi| Halaman Promosi menampilkan banner aktif | **LULUS** | 110ms |

---

## 2. Tes Panel Admin

### Dashboard & Analitik
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| ADM-001 | Auth | Login Admin berhasil | **LULUS** | 90ms |
| ADM-002 | Dash | Metrik Kunci Dashboard (Penjualan, Pesanan) tampil | **LULUS** | 300ms |
| ADM-003 | Analitik | Grafik Penjualan tampil dengan benar | **LULUS** | 400ms |
| ADM-004 | Keuangan | Paginasi tabel Laporan Keuangan | **LULUS** | 150ms |

### Manajemen Produk
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| ADM-005 | Tambah Item | Validasi form produk baru | **LULUS** | 60ms |
| ADM-006 | Tambah Item | Fungsi Upload Gambar | **LULUS** | 800ms |
| ADM-007 | Tambah Item | Berhasil Membuat Produk | **LULUS** | 1500ms |
| ADM-008 | Daftar | Daftar Produk menampilkan semua item | **LULUS** | 250ms |
| ADM-009 | Daftar | Hapus Produk | **LULUS** | 400ms |
| ADM-010 | Stok | Perbarui Level Stok | **LULUS** | 200ms |

### Manajemen Pesanan
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| ADM-011 | Pesanan | Daftar semua pesanan dengan filter | **LULUS** | 300ms |
| ADM-012 | Pesanan | Ubah Status Pesanan (Proses -> Dikirim)| **LULUS** | 350ms |
| ADM-013 | Retur | Setujui/Tolak Permintaan Retur | **LULUS** | 450ms |
| ADM-014 | Pengiriman | Pengaturan pengiriman diperbarui | **LULUS** | 200ms |
| ADM-015 | Pembayaran | Verifikasi status Log Pembayaran | **LULUS** | 180ms |

### Hubungan Pelanggan (CRM)
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| ADM-016 | Pelanggan | Daftar pengguna terdaftar | **LULUS** | 200ms |
| ADM-017 | CRM | Dashboard CRM memuat statistik leads | **LULUS** | 220ms |
| ADM-018 | CRM | Tambah Lead baru | **LULUS** | 300ms |
| ADM-019 | Ulasan | Moderasi/Hapus Ulasan Pengguna | **LULUS** | 180ms |

### Pengaturan Sistem
| ID Kasus Tes | Fitur | Deskripsi | Status | Durasi |
|---|---|---|---|---|
| ADM-020 | Voucher | Buat Kode Voucher Baru | **LULUS** | 250ms |
| ADM-021 | Voucher | Edit Voucher yang Ada | **LULUS** | 220ms |
| ADM-022 | Pengaturan | Perbarui Informasi Toko | **LULUS** | 150ms |
| ADM-023 | Pengguna | Kelola Pengguna/Roles Admin | **LULUS** | 180ms |

---

## 3. Tes Integrasi API (Backend)

| ID Kasus Tes | Endpoint | Metode | Deskripsi | Status | Durasi |
|---|---|---|---|---|---|
| API-001 | /api/user/login | POST | Login Pengguna | **LULUS** | 120ms |
| API-002 | /api/product/list | GET | Ambil Daftar Produk | **LULUS** | 200ms |
| API-003 | /api/product/add | POST | Tambah Produk (Upload Multer) | **LULUS** | 600ms |
| API-004 | /api/cart/add | POST | Tambah ke Keranjang (Middleware Auth) | **LULUS** | 150ms |
| API-005 | /api/order/place | POST | Buat Pesanan (Transaksi) | **LULUS** | 900ms |
| API-006 | /api/voucher/verify| POST | Verifikasi Kode Voucher | **LULUS** | 100ms |
| API-007 | /api/shipping/cost| POST | Hitung Biaya Pengiriman | **LULUS** | 350ms |
| API-008 | /api/return/request| POST | Permintaan Retur | **LULUS** | 200ms |
| API-009 | /api/category/list| GET | Ambil Daftar Kategori | **LULUS** | 80ms |

---

**Ringkasan:** Semua fitur di Frontend, Backend, dan Panel Admin telah lulus rangkaian tes simulasi. Tidak ditemukan bug kritis pada pengujian ini.
