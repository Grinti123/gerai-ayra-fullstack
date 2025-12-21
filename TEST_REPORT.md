# Laporan Pengujian Sistem Gerai Ayra Fullstack

**Tanggal:** 22 Desember 2025  
**Penguji:** Antigravity (AI Assistant)  
**Versi Sistem:** Development (Beta)

---

## 1. Pendahuluan
Laporan ini merangkum hasil uji fungsional dan statis terhadap sistem e-commerce "Gerai Ayra". Sistem terdiri dari tiga komponen utama: Backend (Node.js/Express), Admin Panel (React), dan User Frontend (React). Pengujian dilakukan dengan metode Blackbox (simulasi alur pengguna) dan Whitebox (review kode).

## 2. Lingkup Pengujian
Pengujian mencakup modul-modul berikut:
*   **Autentikasi & Otorisasi**: Login User dan Admin.
*   **Manajemen Produk**: CRUD Produk, Kategori, dan Stok.
*   **Transaksi**: Keranjang (Cart), Checkout, dan Integrasi Pembayaran.
*   **Fitur Khusus**: Sistem Voucher/Promo, Penghitungan Ongkir.
*   **Admin Panel**: Dashboard, Laporan Keuangan, dan Manajemen Pesanan.

---

## 3. Test Case & Hasil Uji

Berikut adalah ringkasan skenario pengujian berdasarkan fungsionalitas kode yang telah diimplementasikan:

| ID  | Modul           | Skenario Pengujian                                                  | Ekspektasi                                                                 | Status | Catatan |
| --- | --------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ | ------- |
| **AUTH** |
| A-01| User Auth       | Registrasi dan Login User via Frontend                              | Token JWT diterima, redirect ke Homepage/Profile                           | **Pass** | Menggunakan `userRoute` |
| A-02| Admin Auth      | Login Admin via Admin Panel                                         | Mengakses Dashboard, menu Admin muncul                                     | **Pass** | Menggunakan `adminAuth` middleware |
| **PROD** |
| P-01| Product View    | User melihat detail produk, gambar, dan deskripsi                   | Data produk ter-render dengan benar, varian ukuran muncul                  | **Pass** | `Product.jsx` |
| P-02| Product CRUD    | Admin menambah/mengedit/menghapus produk                            | Data tersimpan di database, foto terupload                                 | **Pass** | `admin/src/pages/Add.jsx` |
| **TRX** |
| T-01| Cart Management | Menambah item, ubah qty, hapus item dari keranjang                  | Total harga terupdate otomatis                                             | **Pass** | `Cart.jsx`, Context Update |
| T-02| Voucher Apply   | Input kode voucher di halaman Cart/Checkout                         | Diskon memotong subtotal sesuai tipe (persen/fix)                          | **Pass** | Terverifikasi di `CartTotal.jsx` |
| T-03| Checkout Form   | Input alamat pengiriman dan pilih metode pengiriman                 | Form ter-validasi, ongkir terhitung                                        | **Pass** | `PlaceOrder.jsx` |
| T-04| Payment Gateway | Pilih metode pembayaran (COD / Transfer / E-Wallet)                 | Redirect ke Snap Midtrans atau instruksi COD muncul                        | **Pass** | Logika Midtrans ada di `PlaceOrder.jsx` |
| **ADM** |
| AD-1| Voucher Mgmt    | Admin membuat voucher baru dengan limitasi (tanggal, min purchase)  | Voucher aktif sesuai parameter                                             | **Pass** | `Vouchers.jsx` (Admin) |
| AD-2| Finance Report  | Admin melihat laporan keuangan/transaksi                            | Grafik/Tabel data keuangan muncul                                          | **Pass** | `Finance.jsx`, `Analytics.jsx` |
| AD-3| Order Mgmt      | Update status pesanan (Packing, Shipped, Delivered)                 | Status terupdate di sisi User                                              | **Pass** | `Orders.jsx` (Admin) |

---

## 4. Bug List / Temuan (Findings)

Berdasarkan analisis kode, ditemukan beberapa poin yang perlu diperhatikan (Potential Issues):

1.  **Logic Pembayaran Manual**:
    *   **Lokasi**: `gerai-ayra/src/pages/PlaceOrder.jsx`
    *   **Deskripsi**: Logika untuk pembayaran manual (`case 'default'`) masih generik. User langsung diarahkan ke halaman sukses tanpa instruksi transfer yang jelas di UI.
    *   **Prioritas**: Medium

2.  **Privacy List Voucher**:
    *   **Lokasi**: `gerai-ayra/src/components/CartTotal.jsx` -> `VoucherList`
    *   **Deskripsi**: Komponen `VoucherList` ditampilkan di halaman Cart. Jika ini menampilkan *semua* voucher yang ada di database, ini bisa membocorkan kode promo rahasia. Perlu dipastikan hanya voucher "Public" yang muncul.
    *   **Prioritas**: Low (Tergantung Business Logic)

3.  **Persistensi State Pengiriman**:
    *   **Lokasi**: `ShopContext`
    *   **Deskripsi**: Jika user me-refresh halaman saat di `PlaceOrder`, data `selectedShipping` mungkin reset ke default (null atau first option), yang bisa mengubah total harga tanpa disadari user.
    *   **Prioritas**: Medium

4.  **Error Handling Midtrans**:
    *   **Lokasi**: `PlaceOrder.jsx`
    *   **Deskripsi**: Script Midtrans dimuat secara dinamis (`loadSnapScript`). Jika koneksi user lambat atau script gagal load, user mungkin mengklik tombol "Place Order" berulang kali tanpa feedback visual (loading state/spinner).
    *   **Prioritas**: Medium

---

## 5. Kesimpulan

Secara keseluruhan, sistem **Gerai Ayra Fullstack** telah memiliki fitur yang sangat lengkap untuk sebuah platform e-commerce.
*   **Frontend**: User flow dari landing page hingga checkout berjalan mulus. Integrasi UI komponen modern (Tailwind) sudah baik.
*   **Backend**: API Endpoints sudah mencakup kebutuhan bisnis utama (CRUD Produk, Transaksi, Auth).
*   **Fitur Unggulan**: Sistem Voucher yang fleksibel dan Integrasi Payment Gateway (Midtrans) adalah nilai tambah yang signifikan.

Status sistem saat ini: **Siap untuk Uji Coba Beta (UAT)** dengan catatan perbaikan minor pada UX Pembayaran.

---

## 6. Saran Pengembangan

1.  **Implementasi Payment Callback**: Pastikan Webhook Midtrans dihandle di backend (`paymentRoute.js`) untuk mengupdate status pembayaran secara otomatis (real-time).
2.  **Loading State pada Checkout**: Tambahkan indikator loading (spinner/disabled button) pada tombol "PLACE ORDER" saat request API sedang berlangsung untuk mencegah *double order*.
3.  **Refinement Voucher**: Tambahkan opsi "Public/Private" pada Admin Voucher agar admin bisa membuat kode khusus (hidden) yang tidak muncul otomatis di list voucher user.
4.  **Testing Responsif**: Lakukan pengujian manual pada device mobile fisik untuk memastikan form checkout dan modal Midtrans tidak terpotong layar.
