# Diagram Alir Aplikasi Gerai Ayra Fullstack (Updated)

## Arsitektur Tingkat Tinggi

```mermaid
graph TD
    A[ Pengguna ] --> B[Frontend - Gerai Ayra]
    A --> C[Panel Admin]
    B --> D[Backend API]
    C --> D
    D --> E[Database MongoDB]
    D --> F[Cloudinary untuk Gambar]
    D --> G[Gateway Pembayaran<br/>Midtrans/Stripe/Razorpay]

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000
    class A,B,C,D,E,F,G default
```

## Struktur API Backend

```mermaid
graph TB
    subgraph "Express Server"
        H[Routes] --> I[Controllers]
        I --> J[Models]
        H --> K[Middleware]
    end

    subgraph "Routes"
        R1["/api/user"] --> C1["Auth & Profile"]
        R2["/api/product"] --> C2["Product Mgmt"]
        R3["/api/category"] --> C3["Category Mgmt"]
        R4["/api/cart"] --> C4["Cart Logic"]
        R5["/api/orders"] --> C5["Order & Returns"]
        R6["/api/voucher"] --> C6["Voucher System"]
        R7["/api/crm"] --> C7["Leads & Interactions"]
        R8["/api/expense"] --> C8["Financial Tracking"]
        R9["/api/analytics"] --> C9["Traffic Analytics"]
        R10["/api/settings"] --> C10["Site Configuration"]
    end

    subgraph "Models"
        M1[User/Lead]
        M2[Product/Category]
        M3[Order/Return]
        M4[Voucher]
        M5[Expense/Analytics]
        M6[Shipping/Payment/Setting]
    end

    subgraph "Middleware"
        Z[auth.js]
        AA[adminAuth.js]
        BB[multer.js]
    end

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000
    class H,I,J,K,R1,R2,R3,R4,R5,R6,R7,R8,R9,R10,M1,M2,M3,M4,M5,M6,Z,AA,BB default
```

## Relasi Skema Database (ERD)

```mermaid
erDiagram
    PENGGUNA ||--o{ PESANAN : membuat
    PENGGUNA ||--o{ ULASAN : menulis
    PENGGUNA ||--o{ RETUR : mengajukan
    PENGGUNA ||--o{ INTERAKSI : melakukan
    PRODUK ||--o{ PESANAN : "dipesan dalam"
    PRODUK }o--|| KATEGORI : "termasuk dalam"
    PESANAN ||--|| RETUR : "memiliki"
    PESANAN }o--|| METODE_PEMBAYARAN : "menggunakan"
    PESANAN }o--|| SHIPPING : "menggunakan"
    VOUCHER }o--o{ PRODUK : "berlaku untuk"
    LEAD ||--o{ INTERAKSI : "memiliki"

    PENGGUNA {
        string id PK
        string nama
        string email UK
        object dataKeranjang
    }
    PRODUK {
        string id PK
        string nama
        number harga
        string kategoriID FK
        number stok
    }
    KATEGORI {
        string id PK
        string nama
        boolean isActive
    }
    VOUCHER {
        string id PK
        string kode UK
        number nilaiDiskon
        date validHingga
    }
    PESANAN {
        string id PK
        string userId FK
        number total
        string status
    }
    RETUR {
        string id PK
        string orderId FK
        string alasan
        string status
    }
    BIAYA {
        string id PK
        string judul
        number jumlah
        date tanggal
    }
```

## Alur Aplikasi - Perjalanan Pengguna

```mermaid
flowchart TD
    Start([Pengguna Mengunjungi Situs]) --> Browse[Jelajahi Produk]
    Browse --> Search[Cari/Filter Kategori]
    Search --> ViewProduct[Lihat Detail Produk]
    
    ViewProduct --> Wishlist[Tambah ke Wishlist]
    ViewProduct --> AddToCart[Tambah ke Keranjang]
    
    AddToCart --> CartPage[Halaman Keranjang]
    CartPage --> ApplyVoucher[Input Kode Voucher]
    ApplyVoucher --> VoucherValid{Voucher Valid?}
    VoucherValid -->|Ya| Discount[Potongan Harga Diterapkan]
    VoucherValid -->|Tidak| ErrorMsg[Pesan Error]
    
    Discount --> Checkout[Lanjutkan ke Checkout]
    ErrorMsg --> Checkout
    
    Checkout --> LoginCheck{Sudah Login?}
    LoginCheck -->|Tidak| Login[Masuk/Daftar]
    Login --> Address[Pilih Alamat & Ekspedisi]
    LoginCheck -->|Ya| Address
    
    Address --> PaymentMethod[Pilih Metode Pembayaran]
    PaymentMethod --> Online[Pembayaran Online]
    PaymentMethod --> COD[Bayar di Tempat]
    
    Online --> PayGateway[Gateway Pembayaran]
    PayGateway --> PaySuccess{Berhasil?}
    PaySuccess -->|Ya| OrderDone[Konfirmasi Pesanan]
    PaySuccess -->|Tidak| Checkout
    
    COD --> OrderDone
    
    OrderDone --> Track[Lacak Pesanan]
    Track --> Received{Pesanan Diterima?}
    Received -->|Ya| Review[Tulis Ulasan]
    Received -->|Bermasalah| ReturnRequest[Ajukan Retur/Tukar]
    
    Review --> End([Selesai])
    ReturnRequest --> End

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000
    class Start,End,Browse,Search,ViewProduct,Wishlist,AddToCart,CartPage,ApplyVoucher,VoucherValid,Discount,ErrorMsg,Checkout,LoginCheck,Login,Address,PaymentMethod,Online,COD,PayGateway,PaySuccess,OrderDone,Track,Received,Review,ReturnRequest default
```

## Alur Panel Admin (Backoffice)

```mermaid
flowchart TD
    AdminStart([Login Admin]) --> Dashboard[Dashboard Analytics]
    
    Dashboard --> Inv[Manajemen Inventaris]
    Inv --> Category[Kelola Kategori]
    Inv --> Products[Kelola Produk & Stok]
    
    Dashboard --> Sales[Manajemen Penjualan]
    Sales --> Orders[Kelola Pesanan]
    Sales --> Returns[Kelola Retur & Refund]
    
    Dashboard --> Promo[Pemasaran]
    Promo --> Vouchers[Kelola Voucher]
    Promo --> Reviews[Moderasi Ulasan]
    
    Dashboard --> CRM[Hubungan Pelanggan]
    CRM --> Leads[Kelola Leads]
    CRM --> Interactions[Catat Interaksi WA/Email]
    
    Dashboard --> Finance[Keuangan]
    Finance --> Expenses[Input Pengeluaran Operasional]
    Finance --> Reports[Laporan Laba/Rugi]
    
    Dashboard --> Config[Konfigurasi Sistem]
    Config --> Shipping[Set Biaya Pengiriman]
    Config --> Payments[Set Metode Pembayaran]
    Config --> Settings[Update SEO/Logo/Kontak]

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000
    class AdminStart,Dashboard,Inv,Category,Products,Sales,Orders,Returns,Promo,Vouchers,Reviews,CRM,Leads,Interactions,Finance,Expenses,Reports,Config,Shipping,Payments,Settings default
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Client Tier (React)"
        A1[UI Components]
        A2[Context Store]
        A3[Axios Interceptors]
    end

    subgraph "API Tier (Node/Express)"
        B1[Public/Admin Routes]
        B2[Auth/Upload Middleware]
        B3[Business Logic Controllers]
    end

    subgraph "Data Tier"
        C1[(MongoDB Atlas)]
        C2[Cloudinary CDN]
        C3[Payment Gateway API]
    end

    A1 <--> A2
    A2 <--> A3
    A3 <--> B1
    B1 --> B2
    B2 --> B3
    B3 <--> C1
    B3 <--> C2
    B3 <--> C3
```

## Component Architecture (Frontend)

```mermaid
graph TB
    subgraph "gerai-ayra/src"
        App[App.jsx]
        Context[ShopContext.jsx]
        
        subgraph "Pages"
            Home[Home.jsx]
            Coll[Collection.jsx]
            Prod[Product.jsx]
            Cart[Cart.jsx]
            Wish[Wishlist.jsx]
            Place[PlaceOrder.jsx]
            Ord[Orders.jsx]
            Ret[ReturnRequest.jsx]
        end
        
        subgraph "Components"
            Nav[Navbar.jsx]
            Vouch[VoucherList.jsx]
            Total[CartTotal.jsx]
            Filter[FilterSidebar.jsx]
        end
    end

    App --> Pages
    Pages --> Context
    Components --> Context
```

## Component Architecture (Admin Panel)

```mermaid
graph TB
    subgraph "admin/src"
        AdminApp[App.jsx]
        
        subgraph "Admin Pages"
            Dash[Dashboard.jsx]
            Add[Add.jsx]
            List[List.jsx]
            Cats[Categories.jsx]
            Ords[Orders.jsx]
            Rets[Returns.jsx]
            Vouchs[Vouchers.jsx]
            CRM_P[CRM.jsx]
            Exp[Expenses.jsx]
            Set[Settings.jsx]
        end
    end

    AdminApp --> Dash
    AdminApp --> Add
    AdminApp --> Ords
    AdminApp --> CRM_P
```

## Teknologi & Fitur Utama

- **Tech Stack**: MERN (MongoDB, Express, React, Node.js)
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Voucher System**: Persentase/Potongan Tetap, Limit Penggunaan, Validitas Tanggal.
- **CRM System**: Tracking Lead & History Interaksi.
- **Finance**: Tracking Pengeluaran & Analitik Pendapatan.
- **Returns**: Sistem pengajuan retur barang dengan upload bukti gambar.
- **Settings**: Pengaturan website dinamis (Logo, Kontak, SEO).