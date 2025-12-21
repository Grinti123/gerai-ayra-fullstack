# Sequence Diagrams - Gerai Ayra

## 1. Alur Otentikasi
```mermaid
sequenceDiagram
    participant User as Pengguna
    participant Frontend
    participant API
    participant DB as Database

    User->>Frontend: Klik Login
    Frontend->>User: Tampilkan Form Login
    User->>Frontend: Masukkan Email & Password
    Frontend->>API: POST /api/user/login
    API->>DB: Cari Pengguna berdasarkan Email
    DB-->>API: Data Pengguna
    API->>API: Verifikasi Password (bcrypt)
    alt Kredensial Valid
        API->>API: Generate Token JWT
        API-->>Frontend: Sukses + Token
        Frontend->>Frontend: Simpan Token
        Frontend-->>User: Alihkan ke Beranda
    else Kredensial Tidak Valid
        API-->>Frontend: Pesan Error
        Frontend-->>User: Tampilkan Error
    end
```

## 2. Alur Keranjang & Penerapan Voucher
```mermaid
sequenceDiagram
    participant User as Pengguna
    participant Frontend
    participant API
    participant VoucherModel
    participant CartModel

    User->>Frontend: Tambah Item ke Keranjang
    Frontend->>API: POST /api/cart/add {itemId, size}
    API->>CartModel: Update Keranjang Pengguna
    CartModel-->>API: Sukses
    API-->>Frontend: Data Keranjang Terupdate

    User->>Frontend: Masukkan Kode Voucher
    Frontend->>API: POST /api/voucher/apply {code, cartAmount}
    API->>VoucherModel: Cari Voucher berdasarkan Kode
    VoucherModel-->>API: Data Voucher

    alt Voucher Valid
        API->>API: Validasi Tanggal & Batas Penggunaan
        API->>API: Validasi Minimal Belanja
        API->>API: Hitung Diskon
        API-->>Frontend: Sukses + Info Diskon
        Frontend->>Frontend: Update Tampilan Total Keranjang
    else Voucher Tidak Valid
        API-->>Frontend: Error (Tidak Valid/Kadaluarsa)
        Frontend-->>User: Tampilkan Pesan Error
    end
```

## 3. Alur Pembuatan Pesanan
```mermaid
sequenceDiagram
    participant User as Pengguna
    participant Frontend
    participant API
    participant OrderModel
    participant PaymentGateway

    User->>Frontend: Lanjut ke Checkout
    Frontend->>User: Konfirmasi Alamat & Metode Pembayaran
    User->>Frontend: Buat Pesanan
    
    alt Metode Pembayaran: COD
        Frontend->>API: POST /api/orders/place
        API->>OrderModel: Buat Pesanan (Status: Order Placed)
        OrderModel-->>API: Order ID
        API-->>Frontend: Sukses
        Frontend-->>User: Tampilkan Halaman Sukses
    else Metode Pembayaran: Online
        Frontend->>API: POST /api/orders/online
        API->>PaymentGateway: Buat Transaksi
        PaymentGateway-->>API: Token Pembayaran
        API->>OrderModel: Buat Pesanan (Status: Pending Payment)
        API-->>Frontend: Token Pembayaran
        Frontend->>PaymentGateway: Buka Popup Pembayaran
        User->>PaymentGateway: Selesaikan Pembayaran
        PaymentGateway-->>API: Webhook (Sukses)
        API->>OrderModel: Update Pesanan (Payment: true)
    end
```

## 4. Manajemen Voucher Admin
```mermaid
sequenceDiagram
    participant Admin
    participant AdminPanel as Panel Admin
    participant API
    participant DB as Database

    Admin->>AdminPanel: Buka Halaman Voucher
    AdminPanel->>API: GET /api/voucher/list
    API->>DB: Ambil Semua Voucher
    DB-->>API: Daftar Voucher
    API-->>AdminPanel: Kembalikan Data Voucher
    AdminPanel-->>Admin: Tampilkan Tabel Voucher

    Admin->>AdminPanel: Klik "Tambah Voucher"
    AdminPanel-->>Admin: Tampilkan Form
    Admin->>AdminPanel: Kirim Detail Voucher
    AdminPanel->>API: POST /api/voucher/create
    API->>DB: Simpan Voucher Baru
    DB-->>API: Sukses
    API-->>AdminPanel: Voucher Dibuat
    AdminPanel->>AdminPanel: Refresh Daftar
```

## 5. Alur Pengembalian & Penukaran
```mermaid
sequenceDiagram
    participant User as Pengguna
    participant Frontend
    participant API
    participant ReturnModel
    participant OrderModel

    User->>Frontend: Pilih "Ajukan Pengembalian" pada Pesanan
    Frontend->>User: Tampilkan Form Pengembalian (Alasan, Foto)
    User->>Frontend: Kirim Permintaan Pengembalian
    Frontend->>API: POST /api/orders/return/create
    API->>OrderModel: Verifikasi Status Pesanan (harus Delivered)
    OrderModel-->>API: Valid
    API->>ReturnModel: Simpan Dokumen Pengembalian (Status: Pending)
    ReturnModel-->>API: Sukses
    API-->>Frontend: Pesan Sukses
    Frontend-->>User: Tampilkan Konfirmasi

    Note over API,ReturnModel: Admin memproses pengembalian di dashboard
    API->>ReturnModel: Update Status (Disetujui/Ditolak)
```

## 6. Alur Prospek & Interaksi CRM
```mermaid
sequenceDiagram
    participant Visitor as Pengunjung
    participant Admin
    participant Frontend
    participant API
    participant LeadModel
    participant InteractionModel

    Visitor->>Frontend: Kirim Form Kontak/Pertanyaan
    Frontend->>API: POST /api/crm/lead/add
    API->>LeadModel: Buat Dokumen Prospek
    LeadModel-->>API: Sukses
    API-->>Frontend: Pesan Sukses

    Admin->>Frontend: Buka Dashboard CRM
    Frontend->>API: GET /api/crm/leads
    API->>LeadModel: Ambil Data Prospek
    LeadModel-->>API: Daftar Prospek
    API-->>Frontend: Tampilkan Prospek

    Admin->>Frontend: Tambah Catatan Interaksi (misal: Panggilan WA)
    Frontend->>API: POST /api/crm/interaction/add
    API->>InteractionModel: Simpan Interaksi untuk ID Prospek
    InteractionModel-->>API: Sukses
    API-->>Frontend: Catatan Disimpan
```
