# Data Flow Diagrams (DFD) - Gerai Ayra Fullstack

Do note that while Mermaid does not have a native "DFD" standard, we use standard flowchart shapes to represent DFD elements:
- **Square `[]`**: External Entity (Entitas Luar)
- **Circle `(())`**: Process (Proses)
- **Cylinder `[()]`**: Data Store (Penyimpanan Data)
- **Arrow `-->`**: Data Flow (Alir Data)

## DFD Level 0 (Context Diagram)

Diagram Konteks menggambarkan sistem secara keseluruhan sebagai satu proses tunggal yang berinteraksi dengan entitas eksternal.

```mermaid
graph TD
    %% Entities
    C["👤 Pelanggan"]
    A["👤 Admin"]
    PG["💳 Payment Gateway"]
    CL["☁️ Cloudinary"]

    %% System Process
    S(("0.0<br/>Sistem Informasi<br/>Gerai Ayra"))

    %% Customer Flows
    C -->|"Data Login, Profil, Order,<br/>Ulasan, Pengajuan Retur"| S
    S -->|"Info Produk, Invoice,<br/>Status Pesanan, Voucher"| C

    %% Admin Flows
    A -->|"Kelola Produk, Voucher,<br/>Update Status, Data CRM,<br/>Data Pengeluaran"| S
    S -->|"Dashboard Analytics,<br/>Laporan Keuangan,<br/>Data Pelanggan"| A

    %% Payment Gateway Flows
    S -->|"Request Transaksi"| PG
    PG -->|"Status Pembayaran"| S

    %% Media Storage
    S -->|"Upload Gambar"| CL
    CL -->|"URL Media"| S

    %% Styling
    style S fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style C fill:#fff,stroke:#333
    style A fill:#fff,stroke:#333
    style PG fill:#fff,stroke:#333
    style CL fill:#fff,stroke:#333
```

## DFD Level 1

Diagram ini memecah sistem utama menjadi beberapa proses utama (fungsionalitas inti) berdasarkan pembaruan sistem terbaru.

```mermaid
graph TD
    %% External Entities
    C["👤 Pelanggan"]
    A["👤 Admin"]
    PG["💳 Payment Gateway"]

    %% Processes
    P1(("1.0<br/>Manajemen Akun<br/>& CRM"))
    P2(("2.0<br/>Katalog &<br/>Inventaris"))
    P3(("3.0<br/>Transaksi &<br/>Voucher"))
    P4(("4.0<br/>Layanan<br/>Purna Jual"))
    P5(("5.0<br/>Keuangan &<br/>Analytics"))

    %% Data Stores
    D1[("D1 Users & Leads")]
    D2[("D2 Products & Cats")]
    D3[("D3 Vouchers")]
    D4[("D4 Orders")]
    D5[("D5 Returns")]
    D6[("D6 Expenses")]
    D7[("D7 Analytics")]

    %% Process 1: CRM & Auth
    C -->|"Registrasi/Login"| P1
    A -->|"Kelola Leads/Interaksi"| P1
    P1 -->|"Simpan User/Lead"| D1
    D1 -->|"Data User/Interaksi"| P1
    P1 -->|"Token & Info Profil"| C

    %% Process 2: Catalog Management
    A -->|"Update Produk & Stok"| P2
    P2 -->|"Simpan Data"| D2
    D2 -->|"List Produk"| P2
    C -->|"Browse & Search"| P2
    P2 -->|"Detail Produk"| C

    %% Process 3: Transaction & Vouchers
    C -->|"Checkout & Pakai Voucher"| P3
    P3 -->|"Cek Stok"| D2
    P3 -->|"Validasi"| D3
    P3 -->|"Buat Order"| D4
    P3 -->|"Request Bayar"| PG
    PG -->|"Callback Status"| P3
    P3 -->|"Update Status Bayar"| D4
    P3 -->|"Update Penggunaan"| D3

    %% Process 4: Returns & Reviews
    C -->|"Ajukan Retur & Review"| P4
    P4 -->|"Simpan Retur"| D5
    D4 -->|"Verifikasi Order"| P4
    A -->|"Kelola Retur"| P4
    P4 -->|"Status Retur"| C

    %% Process 5: Finance & Analytics
    A -->|"Input Pengeluaran"| P5
    P5 -->|"Simpan Expense"| D6
    D4 -->|"Data Penjualan"| P5
    D7 -->|"Data Pageviews"| P5
    P5 -->|"Laporan Laba/Rugi &<br/>Statistik Pengunjung"| A

    %% Styling
    style P1 fill:#e0f2f1,stroke:#00695c
    style P2 fill:#fff3e0,stroke:#e65100
    style P3 fill:#fce4ec,stroke:#880e4f
    style P4 fill:#e8eaf6,stroke:#1a237e
    style P5 fill:#f3e5f5,stroke:#4a148c
    
    style D1 fill:#eceff1,stroke:#546e7a
    style D2 fill:#eceff1,stroke:#546e7a
    style D3 fill:#eceff1,stroke:#546e7a
    style D4 fill:#eceff1,stroke:#546e7a
    style D5 fill:#eceff1,stroke:#546e7a
    style D6 fill:#eceff1,stroke:#546e7a
    style D7 fill:#eceff1,stroke:#546e7a
```
