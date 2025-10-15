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
    USERS ||--o{ ORDERS : places
    USERS ||--o{ REVIEWS : writes
    USERS {
        string id PK
        string name
        string email UK
        string password "hashed"
        object cartData
        date createdAt
    }

    PRODUCTS ||--o{ ORDERS : "ordered in"
    PRODUCTS {
        string id PK
        string name
        string description
        number price
        array image
        string category
        string subCategory
        array sizes
        boolean bestseller
        number date
        date createdAt
        date updatedAt
    }

    ORDERS {
        string id PK
        string userId FK
        array items
        number amount
        object address
        string status
        string paymentMethod
        boolean payment
        number date
    }

    REVIEWS {
        string id PK
        string productId FK
        string userId FK
        string userName
        number rating
        string comment
        number date
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
