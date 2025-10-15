# Gerai Ayra Fullstack Application Flowchart

## High-Level Architecture

```mermaid
graph TD
    A[ User ] --> B[Frontend - Gerai Ayra]
    A --> C[Admin Panel]
    B --> D[Backend API]
    C --> D
    D --> E[MongoDB Database]
    D --> F[Cloudinary for Images]
    D --> G[Payment Gateways<br/>Midtrans/Stripe/Razorpay]

    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef admin fill:#fff3e0
    classDef external fill:#e8f5e8

    class B frontend
    class C admin
    class D backend
    class E,F,G external
```

## Backend API Structure

```mermaid
graph TB
    subgraph "Express Server"
        H[Routes] --> I[Controllers]
        I --> J[Models]
        H --> K[Middleware]
    end

    subgraph "Routes"
        L[/api/user] --> M[User Routes<br/>login/register/admin]
        N[/api/product] --> O[Product Routes<br/>add/list/remove/update]
        P[/api/cart] --> Q[Cart Routes<br/>add/get/update]
        R[/api/orders] --> S[Order Routes<br/>place/list/status/update]
        T[/api/review] --> U[Review Routes<br/>add/get/delete/update]
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

    classDef route fill:#bbdefb
    classDef controller fill:#c8e6c9
    classDef model fill:#ffcdd2
    classDef middleware fill:#fff9c4

    class L,N,P,R,T route
    class I controller
    class V,W,X,Y model
    class Z,AA,BB middleware
```

## Database Schema Relations

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS ||--o{ REVIEWS : writes
    USERS {
        string _id PK
        string name
        string email UK
        string password hashed
        object cartData
        date createdAt
    }

    PRODUCTS ||--o{ ORDERS : "ordered in"
    PRODUCTS {
        string _id PK
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
        string _id PK
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
        string _id PK
        string productId FK
        string userId FK
        string userName
        number rating
        string comment
        number date
    }
```

## Application Flow - User Journey

```mermaid
flowchart TD
    Start([User Visits Site]) --> LoginCheck{Logged In?}

    LoginCheck -->|No| Register[Register Account]
    Register --> Login[Login]
    LoginCheck -->|Yes| Browse[Browse Products]

    Login --> Browse

    Browse --> Search[Use Search/Filter]
    Search --> ViewProduct[View Product Details]
    Browse --> ViewProduct

    ViewProduct --> AddToCart[Add to Cart]
    AddToCart --> CartCheck{More Items?}
    CartCheck -->|Yes| Browse
    CartCheck -->|No| Checkout[Proceed to Checkout]

    Checkout --> Address[Enter Shipping Address]
    Address --> PaymentMethod{Choose Payment}

    PaymentMethod -->|COD| PlaceOrderCOD[Place Cash on Delivery Order]
    PaymentMethod -->|Online| PaymentGateway[Redirect to Payment Gateway<br/>Midtrans/Stripe/Razorpay]

    PaymentGateway --> PaymentSuccess{Payment Success?}
    PaymentSuccess -->|Yes| OrderConfirmation[Order Confirmation]
    PaymentSuccess -->|No| PaymentFailed[Payment Failed - Try Again]

    PlaceOrderCOD --> OrderConfirmation

    OrderConfirmation --> TrackOrder[Track Order]
    TrackOrder --> OrderStatus{Order Status}
    OrderStatus -->|Delivered| WriteReview[Write Product Review]
    OrderStatus -->|Other| TrackOrder

    WriteReview --> End([End])

    classDef startend fill:#d4edda
    classDef process fill:#cce7ff
    classDef decision fill:#fff3cd
    classDef external fill:#f8d7da

    class Start,End startend
    class Browse,Search,ViewProduct,AddToCart,Checkout,Address,PlaceOrderCOD,OrderConfirmation,TrackOrder,WriteReview process
    class LoginCheck,CartCheck,PaymentSuccess,OrderStatus decision
    class PaymentGateway external
```

## Admin Panel Flow

```mermaid
flowchart TD
    AdminStart([Admin Login]) --> AdminAuth[Authenticate Admin]
    AdminAuth --> Dashboard[Dashboard Overview]

    Dashboard --> ManageProducts{Manage Products}
    ManageProducts -->|Add| AddProduct[Add New Product]
    ManageProducts -->|List/Edit| ListProducts[List/Edit Products]
    ManageProducts -->|Delete| DeleteProduct[Delete Product]

    Dashboard --> ManageOrders{Manage Orders}
    ManageOrders -->|View| ViewOrders[View All Orders]
    ManageOrders -->|Update Status| UpdateOrderStatus[Update Order Status]

    Dashboard --> ManageReviews{Manage Reviews}
    ManageReviews -->|View| ViewReviews[View All Reviews]
    ManageReviews -->|Moderate| ModerateReview[Moderate Reviews]

    Dashboard --> ManageUsers{Manage Users}
    ManageUsers -->|View| ViewUsers[View User Statistics]

    AddProduct --> Dashboard
    ListProducts --> Dashboard
    DeleteProduct --> Dashboard
    ViewOrders --> Dashboard
    UpdateOrderStatus --> Dashboard
    ViewReviews --> Dashboard
    ModerateReview --> Dashboard
    ViewUsers --> Dashboard

    classDef auth fill:#f8d7da
    classDef process fill:#cce7ff
    classDef decision fill:#fff3cd
    classDef end fill:#d4edda

    class AdminAuth auth
    class AddProduct,ListProducts,DeleteProduct,ViewOrders,UpdateOrderStatus,ViewReviews,ModerateReview,ViewUsers process
    class ManageProducts,ManageOrders,ManageReviews,ManageUsers decision
    class Dashboard end
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Frontend (React + Context)"
        A1[User Interface]
        A2[ShopContext<br/>State Management]
        A3[API Calls with Axios]
    end

    subgraph "Backend (Express.js)"
        B1[Routes]
        B2[Middleware<br/>Auth/File Upload]
        B3[Controllers<br/>Business Logic]
        B4[Models<br/>Data Validation]
    end

    subgraph "Database & External Services"
        C1[MongoDB<br/>Data Persistence]
        C2[Cloudinary<br/>Image Storage]
        C3[Payment APIs<br/>Midtrans/Stripe]
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

    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef database fill:#fff3e0

    class A1,A2,A3 frontend
    class B1,B2,B3,B4 backend
    class C1,C2,C3 database
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

    classDef main fill:#bbdefb
    classDef page fill:#c8e6c9
    classDef component fill:#ffcdd2
    classDef utility fill:#fff9c4

    class Main main
    class Home,Collection,Product,Cart,Login,Orders,Profile page
    class Navbar,Footer,SearchBar,ProductItem,Hero,CartTotal component
    class Context,Assets utility
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

    classDef main fill:#bbdefb
    classDef page fill:#c8e6c9
    classDef component fill:#ffcdd2

    class AdminMain main
    class DashboardP,AddP,ListP,OrdersP,ReviewsP page
    class NavbarC,SidebarC,LoginC component
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database

    U->>F: Click Login/Register
    F->>F: Display Login Form
    U->>F: Enter Credentials
    F->>B: POST /api/user/login
    B->>DB: Query User
    DB-->>B: User Data
    B->>B: Verify Password (bcrypt)
    B->>B: Generate JWT Token
    B-->>F: Return Token
    F->>F: Store Token in localStorage
    F->>F: Set Auth State
    F-->>U: Redirect to Dashboard

    Note over U,B: Token required for protected routes
```

## Order Processing Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant PG as Payment Gateway
    participant DB as Database

    U->>F: Add to Cart & Checkout
    F->>B: POST /api/orders/place (COD)
    B->>DB: Create Order Document
    B->>DB: Clear User Cart
    B-->>F: Order Success
    F-->>U: Order Confirmation

    U->>F: Choose Online Payment
    F->>B: POST /api/orders/online
    B->>PG: Create Payment Transaction
    PG-->>B: Return Payment Token
    B->>DB: Save Order with Token
    B-->>F: Payment Token & Order ID
    F->>PG: Redirect to Payment Page
    PG->>PG: User Completes Payment
    PG-->>B: Payment Webhook/Callback
    B->>DB: Update Order Payment Status
    B-->>B: Send Confirmation

    Note over U,PG: Payment success/failure handling
```

## Technologies Used

- **Frontend**: React 18, React Router, Axios, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer, Cloudinary
- **Payment**: Midtrans, Stripe, Razorpay
- **Deployment**: Vercel

## Key Features

- 🛍️ **E-commerce Platform**: Product browsing, cart, checkout
- 👤 **User Management**: Registration, login, profile management
- ⚡ **Admin Panel**: Product/order/review management
- 💳 **Multiple Payment Options**: COD, online payments
- 📦 **Order Tracking**: Real-time order status updates
- ⭐ **Review System**: Product ratings and reviews
- 🖼️ **Media Management**: Cloudinary integration for images
- 🔍 **Search & Filters**: Advanced product search functionality
