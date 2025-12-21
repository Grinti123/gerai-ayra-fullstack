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

## Sub-Proses: Penanganan Retur & Pengembalian

```mermaid
flowchart TD
    StartRetur([Pelanggan Ajukan Retur]) --> VerifyOrder[Verifikasi Status Pesanan]
    VerifyOrder --> IsDelivered{Sudah Terkirim?}
    IsDelivered -->|Tidak| RejectPolicy[Tolak - Belum Terkirim]
    IsDelivered -->|Ya| FormRetur[Isi Form Retur & Upload Bukti]
    
    FormRetur --> AdminReview[Review Admin]
    AdminReview --> Approval{Disetujui?}
    
    Approval -->|Tidak| NotifyReject[Notifikasi Penolakan]
    Approval -->|Ya| ReturnMethod{Metode Retur}
    
    ReturnMethod -->|Tukar| ShipBack[Kirim Barang Kembali]
    ReturnMethod -->|Refund| ProcessRefund[Proses Pengembalian Dana]
    
    ShipBack --> SendNew[Kirim Barang Pengganti]
    SendNew --> EndRetur([Retur Selesai])
    ProcessRefund --> EndRetur
    NotifyReject --> EndRetur
    RejectPolicy --> EndRetur

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000
    class StartRetur,EndRetur,VerifyOrder,FormRetur,AdminReview,NotifyReject,ShipBack,SendNew,ProcessRefund default
```

## Sub-Proses: Manajemen Hubungan Pelanggan (CRM)

```mermaid
flowchart TD
    StartCRM([Data Calon Pelanggan]) --> CaptureLead[Catat Sebagai Lead]
    CaptureLead --> AssignAdmin[Penugasan Admin CRM]
    
    AssignAdmin --> Interaction{Aksi Komunikasi}
    Interaction -->|WhatsApp| WAInteraction[Kirim Pesan WA]
    Interaction -->|Email| EmailInteraction[Kirim Email Penawaran]
    Interaction -->|Note| ManualNote[Catat Catatan Internal]
    
    WAInteraction --> LogHistory[Simpan Riwayat Interaksi]
    EmailInteraction --> LogHistory
    ManualNote --> LogHistory
    
    LogHistory --> ConvertStatus{Konversi?}
    ConvertStatus -->|Ya| UpdateCustomer[Update Jadi Pelanggan Tetap]
    ConvertStatus -->|Tidak| FollowUp[Jadwalkan Follow-up]
    
    UpdateCustomer --> EndCRM([Selesai])
    FollowUp --> Interaction

    classDef default fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000
    class StartCRM,EndCRM,CaptureLead,AssignAdmin,WAInteraction,EmailInteraction,ManualNote,LogHistory,UpdateCustomer,FollowUp default
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
| Start Events | 5 | Titik masuk berbagai proses |
| End Events | 7 | Penyelesaian semua flow |
| Tasks | 42 | Operasi bisnis individual |
| Gateways | 12 | Keputusan dalam proses |
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
