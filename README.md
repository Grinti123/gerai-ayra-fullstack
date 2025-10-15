# Diagram Alir Aplikasi Gerai Ayra Fullstack

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
        L["/api/user"] --> M["User Routes<br/>login/register/admin"]
        N["/api/product"] --> O["Product Routes<br/>add/list/remove/update"]
        P["/api/cart"] --> Q["Cart Routes<br/>add/get/update"]
        R["/api/orders"] --> S["Order Routes<br/>place/list/status/update"]
        T["/api/review"] --> U["Review Routes<br/>add/get/delete/update"]
    end

    subgraph "Models"
        V[User Model]
        W[Product Model]
        X[Order Model]
        Y[Review Model]
    end

    subgraph "Middleware"
        Z[auth.js - User Auth]
        AA[adminAuth.js - Admin Auth]
        BB[multer.js - File Upload]
    end

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,BB default
```

## Relasi Skema Database

```mermaid
erDiagram
    PENGGUNA ||--o{ PESANAN : membuat
    PENGGUNA ||--o{ ULASAN : menulis
    PENGGUNA {
        string id PK
        string nama
        string email UK
        string password "di-hash"
        object dataKeranjang
        date dibuatPada
    }

    PRODUK ||--o{ PESANAN : "di pesan dalam"
    PRODUK {
        string id PK
        string nama
        string deskripsi
        number harga
        array gambar
        string kategori
        string subKategori
        array ukuran
        boolean produkTerlaris
        number tanggal
        date dibuatPada
        date diperbaruiPada
    }

    PESANAN {
        string id PK
        string userId FK
        array item
        number jumlah
        object alamat
        string status
        string metodePembayaran
        boolean pembayaran
        number tanggal
    }

    ULASAN {
        string id PK
        string productId FK
        string userId FK
        string namaPengguna
        number rating
        string komentar
        number tanggal
    }
```

## Alur Aplikasi - Perjalanan Pengguna

```mermaid
flowchart TD
    Start([Pengguna Mengunjungi Situs]) --> LoginCheck{Sudah Masuk?}

    LoginCheck -->|Tidak| Register[Daftarkan Akun]
    Register --> Login[Masuk]
    LoginCheck -->|Ya| Browse[Jelajahi Produk]

    Login --> Browse

    Browse --> Search[Gunakan Cari/Filter]
    Search --> ViewProduct[Lihat Detail Produk]
    Browse --> ViewProduct

    ViewProduct --> AddToCart[Tambah ke Keranjang]
    AddToCart --> CartCheck{Lebih Banyak Item?}
    CartCheck -->|Ya| Browse
    CartCheck -->|Tidak| Checkout[Lanjutkan ke Checkout]

    Checkout --> Address[Masukkan Alamat Pengiriman]
    Address --> PaymentMethod[Pilih Pembayaran]

    PaymentMethod -->|COD| PlaceOrderCOD[Buat Pesanan Bayar di Tempat]
    PaymentMethod -->|Online| PaymentGateway[Arahkan ke Gateway Pembayaran<br/>Midtrans/Stripe/Razorpay]

    PaymentGateway --> PaymentSuccess{Pembayaran Berhasil?}
    PaymentSuccess -->|Ya| OrderConfirmation[Konfirmasi Pesanan]
    PaymentSuccess -->|Tidak| PaymentFailed[Gagal Pembayaran - Coba Lagi]

    PlaceOrderCOD --> OrderConfirmation

    OrderConfirmation --> TrackOrder[Lacak Pesanan]
    TrackOrder --> OrderStatus{Status Pesanan}
    OrderStatus -->|Dikirim| WriteReview[Tulis Ulasan Produk]
    OrderStatus -->|Lainnya| TrackOrder

    WriteReview --> End([Selesai])

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class Start,End,LoginCheck,Register,Login,Browse,Search,ViewProduct,AddToCart,CartCheck,Checkout,Address,PaymentMethod,PlaceOrderCOD,PaymentGateway,PaymentSuccess,OrderConfirmation,PaymentFailed,TrackOrder,OrderStatus,WriteReview default
```

## Alur Panel Admin

```mermaid
flowchart TD
    AdminStart([Login Admin]) --> AdminAuth[Otentikasi Admin]
    AdminAuth --> Dashboard[Ikhtisar Dashboard]

    Dashboard --> ManageProducts{Kelola Produk}
    ManageProducts -->|Tambah| AddProduct[Tambah Produk Baru]
    ManageProducts -->|Daftar/Edit| ListProducts[Daftar/Edit Produk]
    ManageProducts -->|Hapus| DeleteProduct[Hapus Produk]

    Dashboard --> ManageOrders{Kelola Pesanan}
    ManageOrders -->|Lihat| ViewOrders[Lihat Semua Pesanan]
    ManageOrders -->|Update Status| UpdateOrderStatus[Update Status Pesanan]

    Dashboard --> ManageReviews{Kelola Ulasan}
    ManageReviews -->|Lihat| ViewReviews[Lihat Semua Ulasan]
    ManageReviews -->|Moderasi| ModerateReview[Moderasi Ulasan]

    Dashboard --> ManageUsers{Kelola Pengguna}
    ManageUsers -->|Lihat| ViewUsers[Lihat Statistik Pengguna]

    AddProduct --> Dashboard
    ListProducts --> Dashboard
    DeleteProduct --> Dashboard
    ViewOrders --> Dashboard
    UpdateOrderStatus --> Dashboard
    ViewReviews --> Dashboard
    ModerateReview --> Dashboard
    ViewUsers --> Dashboard

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class AdminStart,AdminAuth,Dashboard,ManageProducts,AddProduct,ListProducts,DeleteProduct,ManageOrders,ViewOrders,UpdateOrderStatus,ManageReviews,ViewReviews,ModerateReview,ManageUsers,ViewUsers default
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Frontend (React + Context)"
        A1[Antarmuka Pengguna]
        A2[ShopContext<br/>Manajemen State]
        A3[Panggilan API dengan Axios]
    end

    subgraph "Backend (Express.js)"
        B1[Routes]
        B2[Middleware<br/>Auth/Upload File]
        B3[Controllers<br/>Logika Bisnis]
        B4[Models<br/>Validasi Data]
    end

    subgraph "Database & Layanan Eksternal"
        C1[MongoDB<br/>Persistensi Data]
        C2[Cloudinary<br/>Penyimpanan Gambar]
        C3[API Pembayaran<br/>Midtrans/Stripe]
    end

    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4

    B3 --> C1
    B3 --> C2
    B3 --> C3

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class A1,A2,A3,B1,B2,B3,B4,C1,C2,C3 default
```

## Component Architecture (Frontend)

```mermaid
graph TB
    subgraph "gerai-ayra/src"
        Main[App.jsx]
        Pages[pages/]
        Components[components/]
        Context[context/ShopContext.jsx]
        Assets[assets/]
    end

    Main --> Pages
    Main --> Components
    Components --> Context
    Pages --> Context
    Context --> Assets

    subgraph "Pages"
        Home[Home.jsx]
        Collection[Collection.jsx]
        Product[Product.jsx]
        Cart[Cart.jsx]
        Login[Login.jsx]
        Orders[Orders.jsx]
        Profile[Profile.jsx]
    end

    subgraph "Components"
        Navbar[Navbar.jsx]
        Footer[Footer.jsx]
        SearchBar[SearchBar.jsx]
        ProductItem[ProductItem.jsx]
        Hero[Hero.jsx]
        CartTotal[CartTotal.jsx]
    end

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class Main,Home,Collection,Product,Cart,Login,Orders,Profile,Navbar,Footer,SearchBar,ProductItem,Hero,CartTotal,Context,Assets default
```

## Component Architecture (Admin Panel)

```mermaid
graph TB
    subgraph "admin/src"
        AdminMain[App.jsx]
        AdminPages[pages/]
        AdminComponents[components/]
    end

    AdminMain --> AdminPages
    AdminMain --> AdminComponents

    subgraph "Admin Pages"
        DashboardP[Dashboard.jsx]
        AddP[Add.jsx]
        ListP[List.jsx]
        OrdersP[Orders.jsx]
        ReviewsP[Reviews.jsx]
    end

    subgraph "Admin Components"
        NavbarC[Navbar.jsx]
        SidebarC[Sidebar.jsx]
        LoginC[Login.jsx]
    end

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class AdminMain,DashboardP,AddP,ListP,OrdersP,ReviewsP,NavbarC,SidebarC,LoginC default
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant P as Pengguna
    participant F as Frontend
    participant B as Backend
    participant DB as Database

    P->>F: Klik Login/Daftar
    F->>F: Tampilkan Form Login
    P->>F: Masukkan Kredensial
    F->>B: POST /api/user/login
    B->>DB: Query Pengguna
    DB-->>B: Data Pengguna
    B->>B: Verifikasi Password (bcrypt)
    B->>B: Generate Token JWT
    B-->>F: Return Token
    F->>F: Store Token di localStorage
    F->>F: Set State Auth
    F-->>P: Redirect ke Dashboard

    Note over P,B: Token diperlukan untuk route terproteksi
```

## Order Processing Flow

```mermaid
sequenceDiagram
    participant P as Pengguna
    participant F as Frontend
    participant B as Backend
    participant PG as Gateway Pembayaran
    participant DB as Database

    P->>F: Tambah ke Keranjang & Checkout
    F->>B: POST /api/orders/place (COD)
    B->>DB: Buat Dokumen Pesanan
    B->>DB: Kosongkan Keranjang Pengguna
    B-->>F: Pesanan Berhasil
    F-->>P: Konfirmasi Pesanan

    P->>F: Pilih Pembayaran Online
    F->>B: POST /api/orders/online
    B->>PG: Buat Transaksi Pembayaran
    PG-->>B: Return Token Pembayaran
    B->>DB: Simpan Pesanan dengan Token
    B-->>F: Token Pembayaran & ID Pesanan
    F->>PG: Redirect ke Halaman Pembayaran
    PG->>PG: Pengguna Menyelesaikan Pembayaran
    PG-->>B: Webhook/Callback Pembayaran
    B->>DB: Update Status Pembayaran Pesanan
    B-->>B: Kirim Konfirmasi

    Note over P,PG: Penanganan keberhasilan/kegagalan pembayaran
```

## Teknologi Yang Digunakan

- **Frontend**: React 18, React Router, Axios, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer, Cloudinary
- **Payment**: Midtrans, Stripe, Razorpay
- **Deployment**: Vercel

## Fitur Utama

- 🛍️ **Platform E-commerce**: Jelajahi produk, keranjang belanja, checkout
- 👤 **Manajemen Pengguna**: Pendaftaran, login, manajemen profil
- ⚡ **Panel Admin**: Manajemen produk/pesanan/ulasan
- 💳 **Opsi Pembayaran Beragam**: COD, pembayaran online
- 📦 **Pelacakan Pesanan**: Update status pesanan waktu nyata
- ⭐ **Sistem Ulasan**: Rating dan ulasan produk
- 🖼️ **Manajemen Media**: Integrasi Cloudinary untuk gambar
- 🔍 **Pencarian & Filter**: Fungsi pencarian produk canggih

# BPMN Diagram - Proses Bisnis E-commerce Gerai Ayra

## Proses Utama: Perjalanan Pembeli

```mermaid
flowchart TD
    Start([Pengunjung Website]) --> Register{Perlu Akun?}
    Register -->|Ya| RegForm[Form Registrasi]
    Register -->|Tidak| Login{Masuk sebagai Admin?}
    Login -->|Ya| AdminLogin[Login Admin]
    Login -->|Tidak| GuestBrowse[Browse sebagai Guest]

    RegForm --> ValidateEmail{Email Valid?}
    ValidateEmail -->|Tidak| RegForm
    ValidateEmail -->|Ya| CreateAccount[Buat Akun JWT]
    CreateAccount --> UserLogin[Login User]

    AdminLogin --> AdminAuth{Auth Admin Berhasil?}
    AdminAuth -->|Ya| AdminDashboard[Dashboard Admin]
    AdminAuth -->|Tidak| AdminLogin

    UserLogin --> BrowseCat[Browse Kategori Produk]
    GuestBrowse --> BrowseCat
    BrowseCat --> Search[Gunakan Search/Filter]
    Search --> ProductDetail[Halaman Detail Produk]

    ProductDetail --> AddCart{Tambah ke Keranjang?}
    AddCart -->|Ya| UpdateCart[Update Keranjang]
    AddCart -->|Tidak| BrowseCat

    UpdateCart --> ContinueShop{Lanjut Belanja?}
    ContinueShop -->|Ya| BrowseCat
    ContinueShop -->|Tidak| ViewCart[Lihat Keranjang]

    ViewCart --> Checkout[Proses Checkout]
    Checkout --> SelectAddress[Pilih Alamat]
    SelectAddress --> PaymentMethod{Pilih Metode Pembayaran}

    PaymentMethod -->|COD| CreateCODOrder[Buat Pesanan COD]
    PaymentMethod -->|Online| PaymentGateway[Redirect ke Gateway]

    CreateCODOrder --> OrderConfirm[Konfirmasi Pesanan]
    PaymentGateway --> PaymentSuccess{Pembayaran Berhasil?}
    PaymentSuccess -->|Ya| OrderConfirm
    PaymentSuccess -->|Tidak| PaymentFailed[Gagal - Coba Lagi]

    OrderConfirm --> TrackOrder[Pelacakan Pesanan]
    TrackOrder --> OrderStatus{Status Pesanan}
    OrderStatus -->|Delivered| ReviewForm[Form Ulasan]
    ReviewForm --> SubmitReview[Kirim Ulasan]
    SubmitReview --> End([Selesai])

    OrderStatus -->|Shipped| TrackOrder
    OrderStatus -->|Processing| TrackOrder
    OrderStatus -->|Placed| TrackOrder

    AdminDashboard --> AdminChoice{Pilih Aksi}
    AdminChoice -->|Kelola Produk| ProductManagement[Mengelola Produk]
    AdminChoice -->|Kelola Pesanan| OrderManagement[Mengelola Pesanan]
    AdminChoice -->|Kelola Pengguna| UserManagement[Mengelola Pengguna]

    ProductManagement --> AddProduct[Tambah Produk]
    ProductManagement --> EditProduct[Edit Produk]
    ProductManagement --> DeleteProduct[Hapus Produk]

    OrderManagement --> ViewOrders[Lihat Pesanan]
    ViewOrders --> UpdateStatus[Update Status Pesanan]
    UpdateStatus --> ProcessOrder[Proses Pesanan]

    UserManagement --> ViewUsers[Lihat Pengguna]
    ViewUsers --> ManageUser[Kelola Pengguna]

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class Start,End,RegForm,CreateAccount,UserLogin,AdminLogin,BrowseCat,Search,ProductDetail,UpdateCart,ViewCart,Checkout,SelectAddress,CreateCODOrder,PaymentGateway,OrderConfirm,TrackOrder,ReviewForm,SubmitReview,AdminDashboard,ProductManagement,OrderManagement,UserManagement,AddProduct,EditProduct,DeleteProduct,ViewOrders,UpdateStatus,ProcessOrder,ViewUsers,ManageUser default
```

## Sub-Proses: Penanganan Pembayaran Online

```mermaid
flowchart TD
    StartPG([Mulai Pembayaran Online]) --> SelectGateway{Pilih Gateway}
    SelectGateway -->|Midtrans| MidtransProcess[Proses Midtrans]
    SelectGateway -->|Stripe| StripeProcess[Proses Stripe]
    SelectGateway -->|Razorpay| RazorpayProcess[Proses Razorpay]

    MidtransProcess --> GenerateToken[Generate Snap Token]
    StripeProcess --> GenerateToken
    RazorpayProcess --> GenerateToken

    GenerateToken --> SendToFrontend[Kirim ke Frontend]
    SendToFrontend --> RedirectUser[Redirect Pengguna ke Gateway]
    RedirectUser --> UserInput[Input Data Pembayaran]

    UserInput --> GatewayProcess[Gwateway Memproses]
    GatewayProcess --> GatewayResult{Hasil}
    GatewayResult -->|Berhasil| SuccessWebhook[Kirim Webhook Sukses]
    GatewayResult -->|Gagal| FailedWebhook[Kirim Webhook Gagal]

    SuccessWebhook --> UpdateOrderSuccess[Update Pesanan: Paid = true]
    FailedWebhook --> UpdateOrderFailed[Update Pesanan: Payment Error]

    UpdateOrderSuccess --> NotifySuccess[Kirim Notifikasi Sukses]
    UpdateOrderFailed --> NotifyFailed[Kirim Notifikasi Gagal]

    NotifySuccess --> EndPG([Pembayaran Selesai])
    NotifyFailed --> EndPG

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class StartPG,EndPG,MidtransProcess,StripeProcess,RazorpayProcess,GenerateToken,SendToFrontend,RedirectUser,UserInput,GatewayProcess,SuccessWebhook,FailedWebhook,UpdateOrderSuccess,UpdateOrderFailed,NotifySuccess,NotifyFailed default
```

## Sub-Proses: Manajemen Inventori Admin

```mermaid
flowchart TD
    AdminStart([Admin Login]) --> Dashboard[Dashboard Admin]
    Dashboard --> InventoryChoice{Pilih Aksi Inventori}

    InventoryChoice -->|Cek Stok| CheckStock[Cek Stok Produk]
    InventoryChoice -->|Update Stok| UpdateStock[Update Stok]
    InventoryChoice -->|Low Stock Alert| LowStockAlert[Alert Stok Rendah]
    InventoryChoice -->|Restock| Restock[Proses Restock]

    CheckStock --> StockReport[Generate Laporan Stok]
    StockReport --> EndAdmin([Selesai])

    UpdateStock --> QuantityInput[Input Jumlah Baru]
    QuantityInput --> ValidateQty{Kuantitas Valid?}
    ValidateQty -->|Ya| SaveStock[Simpan ke Database]
    ValidateQty -->|Tidak| QuantityInput

    SaveStock --> SendStockAlert{Kirim Alert ke Supplier?}
    SendStockAlert -->|Ya| SupplierNotification[Notifikasi Supplier]
    SendStockAlert -->|Tidak| EndAdmin

    LowStockAlert --> AutoReorder{Auto Reorder?}
    AutoReorder -->|Ya| Restock
    AutoReorder -->|Tidak| ManualReorder[Pesan Manual ke Supplier]

    Restock --> UpdateStock

    SupplierNotification --> EndAdmin
    ManualReorder --> EndAdmin

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class AdminStart,EndAdmin,Dashboard,CheckStock,UpdateStock,LowStockAlert,Restock,StockReport,QuantityInput,SaveStock,SupplierNotification,ManualReorder default
```

## Pool dan Lane: Stakeholders

```mermaid
flowchart TD
    subgraph "Kolam: Pengguna"
        direction TB
        U1[Navigasi Website]
        U2[Cari Produk]
        U3[Tambah ke Keranjang]
        U4[Checkout]
        U5[Lacak Pesanan]
    end

    subgraph "Kolam: Sistem E-commerce"
        direction TB
        S1[Process Auth]
        S2[Manage Products]
        S3[Handle Cart]
        S4[Process Payment]
        S5[Send Notifications]
    end

    subgraph "Kolam: Admin"
        direction TB
        A1[Dashboard Overview]
        A2[Product Management]
        A3[Order Management]
        A4[User Management]
        A5[Generate Reports]
    end

    subgraph "Kolam: Payment Gateway"
        direction TB
        P1[Process Transaction]
        P2[Send Webhooks]
        P3[Handle Refunds]
    end

    subgraph "Kolam: Logistics"
        direction TB
        L1[Receive Order]
        L2[Pack Products]
        L3[Ship Products]
        L4[Delivery Confirmation]
    end

    U1 --> S1
    U2 --> S2
    U3 --> S3
    U4 --> S4
    S4 --> P1
    P1 --> P2
    S5 --> U5
    S3 --> L1
    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> S5

    A1 --> A2
    A1 --> A3
    A1 --> A4
    A1 --> A5
    S2 --> A2
    S4 --> A3

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000

    class U1,U2,U3,U4,U5,S1,S2,S3,S4,S5,A1,A2,A3,A4,A5,P1,P2,P3,L1,L2,L3,L4 default
```

## Notasi BPMN Yang Digunakan

### **Event (Events)**
- **Start Event** ⭕ - Titik awal proses
- **End Event** ⭕ - Titik akhir proses
- **Intermediate Event** ⭕ - Event di tengah proses

### **Activity (Activities)**
- **Task** ▭ - Satu unit kerja yang dilakukan oleh manusia atau sistem
- **Sub-Process** ▭▭ - Proses yang berisi sub-proses

### **Gateway (Gateways)**
- **Exclusive Gateway** ⬨ - Keputusan biner (Ya/Tidak)
- **Inclusive Gateway** ⬨ - Multiple paths, satu atau lebih
- **Parallel Gateway** ➕ - Semua paths bersamaan

### **Swimlanes**
- **Pool** - Stakeholder utama atau sistem
- **Lane** - Sub-divisi dalam pool

### **Flow Objects**
- **Sequence Flow** → - Urutan aktivitas
- **Message Flow** ➤ - Komunikasi antar pools
- **Association** -- - Hubungan antara objek

## Metrik BPMN dalam Sistem

| Elemen BPMN | Jumlah | Kegunaan |
|-------------|---------|----------|
| Start Events | 3 | Titik masuk berbagai proses |
| End Events | 5 | Penyelesaian semua flow |
| Tasks | 28 | Operasi bisnis individual |
| Gateways | 8 | Keputusan dalam proses |
| Pools | 5 | Stakeholder utama |
| Lanes | 5 | Sub-proses per stakeholder |

## Legenda Simbol BPMN

```
⭕ Start/End Event
▭ Task/Activity
⬨ Gateway (Decision)
→ Sequence Flow
➤ Message Flow
-- Association
