# Dokumen Analisis Kebutuhan Sistem - Gerai Ayra Fullstack

**Tanggal Dokumen:** 22 Desember 2025  
**Versi:** 3.2 (Final Detailed)  
**Status:** Approved

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini mendefinisikan kebutuhan sistem untuk platform E-commerce "Gerai Ayra". Analisis ini mencakup spesifikasi kebutuhan fungsional dan non-fungsional, serta pemetaan teknis ke modul program yang relevan.

---

## 2. Aktor Sistem

| Kode | Aktor | Deskripsi | Akses Utama |
| :--- | :--- | :--- | :--- |
| **ACT-01** | Pelanggan | Pengguna akhir yang berbelanja | Frontend Web |
| **ACT-02** | Administrator | Pengelola toko dan bisnis | Admin Panel |
| **ACT-03** | Pembayaran | Sistem Gateway (Midtrans) | API Integration |
| **ACT-04** | Cloud Storage | Penyimpanan Aset (Cloudinary) | API Integration |

---

## 3. Kebutuhan Fungsional (Functional Requirements)

### 3.1 Modul Frontend (Pelanggan)

| ID | Fitur Utama | Deskripsi & Kriteria Akseptasi | File/Komponen Terkait |
| :--- | :--- | :--- | :--- |
| **FR-FE-001** | **Autentikasi** | Registrasi, Login, dan Logout user. Token JWT disimpan di LocalStorage. | `Login.jsx`, `userController.js` |
| **FR-FE-002** | **Katalog Produk** | Menampilkan daftar produk, filter kategori, sort harga, dan pencarian. | `Collection.jsx`, `SearchBar.jsx` |
| **FR-FE-003** | **Detail Produk** | Menampilkan info detail, galeri gambar, dan pilihan varian ukuran (Size). | `Product.jsx`, `RelatedProducts.jsx` |
| **FR-FE-004** | **Keranjang** | Menambah item, update quantity, dan hapus item. Persistensi state chart. | `Cart.jsx`, `ShopContext.jsx` |
| **FR-FE-005** | **Checkout & Pay** | Input alamat, pilih kurir, pilih metode bayar (COD/Online), dan proses order. | `PlaceOrder.jsx`, `orderController.js` |
| **FR-FE-006** | **Manajemen Profil** | Update profil user, lihat riwayat pesanan (My Orders), dan status pengiriman. | `Profile.jsx`, `Orders.jsx` |
| **FR-FE-007** | **Voucher** | Input kode promo di halaman cart untuk potongan harga. | `CartTotal.jsx`, `voucherController.js` |
| **FR-FE-008** | **Retur Barang** | User dapat mengajukan retur untuk pesanan tertentu dari riwayat order. | `MyReturns.jsx`, `returnController.js` |

### 3.2 Modul Admin (ERP & Manajemen)

| ID | Fitur Utama | Deskripsi & Kriteria Akseptasi | File/Komponen Terkait |
| :--- | :--- | :--- | :--- |
| **FR-AD-001** | **Dashboard** | Visualisasi total penjualan, grafik pendapatan, dan notifikasi order baru. | `Dashboard.jsx`, `Analytics.jsx` |
| **FR-AD-002** | **Produk (CRUD)** | Tambah produk baru dengan upload gambar, edit harga/stok, hapus produk. | `Add.jsx`, `List.jsx` |
| **FR-AD-003** | **Inventory** | Monitoring stok menipis, update stok manual per varian ukuran. | `Stock.jsx`, `stockController.js` |
| **FR-AD-004** | **Pesanan** | Update status pesanan (Packing -> Shipped -> Delivered). | `Orders.jsx` (Admin) |
| **FR-AD-005** | **Voucher Sys** | Membuat dan mengelola kode voucher (Diskon %, Limit tanggal). | `Vouchers.jsx` |
| **FR-AD-006** | **CRM** | Manajemen data pelanggan, Leads tracking, dan log interaksi. | `CRM.jsx`, `Customers.jsx` |
| **FR-AD-007** | **Keuangan** | Pencatatan pengeluaran (Expense) dan rekap pemasukan (Income). | `Finance.jsx`, `expenseController.js` |
| **FR-AD-008** | **Retur & QC** | Approval/Rejection untuk request retur barang dari user. | `Returns.jsx` |

### 3.3 Modul Backend (API & Logika Bisnis)

| ID | Modul API | Fungsi Utama | Keamanan & Validasi |
| :--- | :--- | :--- | :--- |
| **FR-BE-001** | `userRoute` | Register, Login, Admin Login | Hash Password, JWT Sign |
| **FR-BE-002** | `productRoute` | Add, List, Remove, Single Info | Upload Multer, Check Admin |
| **FR-BE-003** | `orderRoute` | Place Order (COD/Online), Update Status, User Orders | Verify Token, Stock Deduction |
| **FR-BE-004** | `voucherRoute`| Verify Code, List Vouchers, Add Voucher | Check Date Validity, Min Purchase |
| **FR-BE-005** | `crmRoute` | Manage Leads, Interactions, Customers | Admin Access Only |

---

## 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Kode | Kategori | Spesifikasi Kebutuhan |
| :--- | :--- | :--- |
| **NFR-01** | **Performance** | Load time halaman utama < 2 detik. API response time < 500ms. |
| **NFR-02** | **Scalability** | Mendukung hingga 10k produk dan concurrent users (Database Indexing). |
| **NFR-03** | **Security** | Semua endpoint admin diproteksi middleware `adminAuth`. Data password terenkripsi. |
| **NFR-04** | **Reliability** | Transaksi atomik untuk stok (Stok berkurang hanya jika order sukses). |
| **NFR-05** | **Usability** | Desain Responsif (Mobile First) menggunakan Tailwind CSS. |
| **NFR-06** | **Compatibility** | Support browser modern (Chrome, Safari, Firefox, Edge). |

---

## 5. Ringkasan Alur Data (Expanded)

### 5.1 Autentikasi Pengguna
1.  **Frontend**: User input email & password -> POST `/api/user/login`.
2.  **Backend**: Find user by email -> `bcrypt.compare` password.
3.  **Result Success**: Generate JWT Token (payload: userId). Return Token.
4.  **Frontend**: Simpan Token di LocalStorage & Set Auth Context (IsLoggedIn = True).

### 5.2 Manajemen Produk (Admin)
1.  **Backend**: `adminAuth` Middleware memvalidasi Token Admin.
2.  **Admin Add Product**:
    *   Frontend kirim `FormData` (Text data + Image Files).
    *   Backend (Multer) upload files ke Cloudinary -> dapat Secure URL.
    *   Backend simpan product doc di MongoDB (termasuk URL Gambar).

### 5.3 Alur Pemesanan (Order Placement)
1.  **User Checkout**: POST `/api/order/place` (Items, Address, Payment Method).
2.  **Stock Validation**: Backend loop setiap item -> Cek `stock[size] >= qty`.
    *   *If Fail*: Return Error "Out of Stock".
3.  **Stock Deduction**: `product.stock[size] -= qty` -> `product.save()`.
4.  **Create Order**: Buat dokumen Order di DB dengan status `Payment: False` (jika Online) atau `Order Placed` (jika COD).
5.  **Clean Up**: Hapus keranjang user (`user.cartData = {}`).

### 5.4 Integrasi Pembayaran (Midtrans)
1.  **Initiate**: Backend create Transaction ke Midtrans -> Dapat `snapToken`.
2.  **Frontend**: Buka `window.snap.pay(snapToken)`.
3.  **User Action**: User bayar via VA/E-Wallet/CC.
4.  **Webhook**: Midtrans kirim notification ke Backend.
5.  **Finalize**: Backend update status order `Payment: True` & `Status: Packing`.

### 5.5 CRM Lifecycle Flow
1.  **Lead Generation**: Admin/System catat calon customer di CRM Leads.
2.  **Interaction**: Log setiap interaksi (Call/Email) di CRM.
3.  **Conversion**: Jika Lead melakukan Register/Order -> Data dipindah/dilink ke Customer Profile.
4.  **Retention**: Analisis history belanja untuk promosi/voucher personal.

### 5.6 Return Management (RMA) Flow
1.  **Request**: User pilih order -> Klik "Return" -> Upload Bukti Foto/Alasan.
2.  **Review**: Admin terima notifikasi di Dashboard Returns -> Approve/Reject.
3.  **Action**:
    *   *Approve*: Status Order -> "Return Approved". Instruksi kirim barang muncul di User.
    *   *Reject*: Status selesai.
4.  **Refund**: Setelah barang diterima Admin -> Admin trigger Refund (Manual/Auto).
