# Timeline Pengerjaan Proyek Gerai Ayra Fullstack

**Durasi Total:** 6 Minggu
**Status:** Perencanaan

---

## 1. Minggu 1: Perencanaan & Analisis
**Fokus:** Memahami kebutuhan bisnis dan merancang arsitektur dasar.

| Peran | Aktivitas Utama | Output |
| :--- | :--- | :--- |
| **Project Manager** | Kick-off meeting, penetapan timeline, pembagian tugas. | Project Charter, Timeline Final. |
| **System Analyst** | Wawancara klien, analisis kebutuhan fungsional, pembuatan diagram (Use Case, Flowchart). | Dokumen `ANALISIS_KEBUTUHAN_SISTEM.md`. |
| **Database Engineer**| Perancangan ERD awal, identifikasi entitas utama. | Draft ERD. |
| **QA** | Mempelajari requirement untuk persiapan skenario tes. | Draft Test Plan. |

---

## 2. Minggu 2: Desain Sistem & Database
**Fokus:** Mematangkan struktur data dan desain antarmuka.

| Peran | Aktivitas Utama | Output |
| :--- | :--- | :--- |
| **System Analyst** | Finalisasi BPMN dan detail alur proses bisnis. | Dokumen Alur Proses Final. |
| **Database Engineer**| Pembuatan skema MongoDB (Mongoose), setup cluster database, indexing strategy. | Dokumen `DATABASE_DESIGN.md`, Koneksi DB. |
| **Backend Dev** | Setup repository, konfigurasi server (Express), setup environment variables. | Repo Backend Ready, Server "Hello World". |
| **Frontend Dev** | Membuat wireframe/mockup UI (Figma), setup proyek React/Vite + Tailwind. | Mockup UI, Repo Frontend Ready. |

---

## 3. Minggu 3: Pengembangan Backend (API)
**Fokus:** Membangun logika bisnis dan endpoint API.

| Peran | Aktivitas Utama | Output |
| :--- | :--- | :--- |
| **Backend Dev** | Implementasi Auth (JWT), CRUD Produk, Modul Upload Gambar (Cloudinary). | API: `/user`, `/product`. |
| **Database Engineer**| Optimasi query, validasi skema data, seed data dummy. | Database terisi data dummy. |
| **Frontend Dev** | Slicing UI komponen dasar (Navbar, Hero, Product Card). | Library Komponen UI. |
| **QA** | Membuat Test Case untuk API Testing (Postman/Jest). | List Test Case API. |

---

## 4. Minggu 4: Pengembangan Frontend & Integrasi Dasar
**Fokus:** Menghubungkan antarmuka dengan data backend.

| Peran | Aktivitas Utama | Output |
| :--- | :--- | :--- |
| **Frontend Dev** | Integrasi Login/Register, Halaman Produk, Detail Produk, Keranjang (Context). | Frontend Berfungsi (Browse & Cart). |
| **Backend Dev** | Implementasi API Transaksi (Order Place) dan Logika Stok. | API: `/order`, `/cart`. |
| **Project Manager** | Review progress tengah jalan (Mid-Review), mitigasi risiko keterlambatan. | Laporan Progress Mingguan. |
| **QA** | Testing integrasi Frontend-Backend tahap awal. | Laporan Bug Tahap 1. |

---

## 5. Minggu 5: Fitur Lanjutan & Admin Panel
**Fokus:** Fitur kompleks (Payment, Voucher) dan manajemen backoffice.

| Peran | Aktivitas Utama | Output |
| :--- | :--- | :--- |
| **Backend Dev** | Integrasi Payment Gateway (Midtrans), API Voucher, API CRM/Analytics. | API Full Feature. |
| **Frontend Dev** | Halaman Checkout (Payment), Dashboard Admin (Chart, Table), Fitur Profile User. | Frontend Full Feature, Admin Panel. |
| **System Analyst** | Validasi kesesuaian fitur dengan requirement awal. | Checklist Requirement. |
| **QA** | Melakukan tes fungsional menyeluruh (End-to-End). | Laporan Hasil Uji (Pass/Fail). |

---

## 6. Minggu 6: Testing, Fix, & Deployment
**Fokus:** Stabilitas sistem, perbaikan bug, dan peluncuran.

| Peran | Aktivitas Utama | Output |
| :--- | :--- | :--- |
| **QA** | Blackbox testing final, Regression testing, UAT (User Acceptance Test). | Dokumen `TEST_REPORT.md` Final. |
| **Dev Team** | Bug fixing berdasarkan laporan QA, optimasi performa. | Codebase Stabil (v1.0). |
| **Database Engineer**| Backup data, setup environment produksi. | Database Production Ready. |
| **Project Manager** | Final presentation, serah terima dokumen & source code. | Project Sign-off. |

---

## Gantt Chart Detail

```mermaid
gantt
    title Jadwal Pengembangan Gerai Ayra Fullstack (6 Minggu)
    dateFormat  YYYY-MM-DD
    axisFormat  %W
    
    section Tahap 1: Inisiasi
    Analisis Kebutuhan (SA)       :done, a1, 2025-12-01, 3d
    Perancangan ERD (DB)          :done, a2, 2025-12-03, 3d
    Desain UI/UX (FE)             :active, a3, 2025-12-05, 4d
    
    section Tahap 2: Konstruksi
    Setup Backend & DB (BE/DB)    :active, b1, 2025-12-09, 5d
    Dev API Produk & Auth (BE)    :b2, after b1, 5d
    Slicing Frontend UI (FE)      :b3, after a3, 7d
    Integrasi Dasar (FE/BE)       :b4, after b2, 5d
    
    section Tahap 3: Implementasi Fitur
    Fitur Payment & Order (BE)    :c1, after b4, 4d
    Dashboard Admin (FE)          :c2, after c1, 4d
    Integrasi Midtrans (BE/FE)    :c3, after c2, 3d
    
    section Tahap 4: Finalisasi
    Testing & QA (QA)             :d1, after c3, 5d
    Bug Fixing (Dev)              :d2, after d1, 3d
    Deployment (DevOps)           :d3, after d2, 2d
    Serah Terima (PM)             :crit, d4, after d3, 1d
```
