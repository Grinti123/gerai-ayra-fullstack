import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

const Promotions = () => {
    // Sample promotions data - in production, this would come from an API
    const allPromotions = [
        {
            id: 1,
            title: "Flash Sale Akhir Tahun",
            discount: "70%",
            description: "Diskon hingga 70% untuk koleksi pilihan! Buruan sebelum kehabisan stok.",
            code: "FLASHSALE70",
            validUntil: "2025-12-31",
            category: "Flash Sale",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop",
            terms: [
                "Berlaku untuk produk dengan label Flash Sale",
                "Tidak dapat digabung dengan promo lain",
                "Stok terbatas",
                "Berlaku untuk pembelian online"
            ],
            isActive: true,
            isFeatured: true
        },
        {
            id: 2,
            title: "Diskon Member Baru",
            discount: "25%",
            description: "Selamat datang! Dapatkan diskon 25% untuk pembelian pertama Anda sebagai member baru.",
            code: "WELCOME25",
            validUntil: "2025-12-31",
            category: "Member",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",
            terms: [
                "Khusus member baru",
                "Minimal pembelian Rp 300.000",
                "Berlaku untuk semua produk",
                "Satu kali penggunaan per akun"
            ],
            isActive: true,
            isFeatured: false
        },
        {
            id: 3,
            title: "Buy 2 Get 1 Free",
            discount: "33%",
            description: "Beli 2 produk pilihan, gratis 1 produk dengan harga terendah!",
            code: "BUY2GET1",
            validUntil: "2025-01-31",
            category: "Bundle",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            terms: [
                "Berlaku untuk produk dengan label promo",
                "Gratis produk dengan harga terendah",
                "Tidak berlaku untuk produk sale",
                "Berlaku kelipatan (beli 4 gratis 2, dst)"
            ],
            isActive: true,
            isFeatured: true
        },
        {
            id: 4,
            title: "Diskon Hari Kemerdekaan",
            discount: "17%",
            description: "Rayakan kemerdekaan dengan diskon spesial 17% untuk semua produk!",
            code: "MERDEKA17",
            validUntil: "2025-08-20",
            category: "Seasonal",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
            terms: [
                "Berlaku untuk semua produk",
                "Dapat digabung dengan member discount",
                "Minimal pembelian Rp 200.000",
                "Berlaku untuk pembelian online dan offline"
            ],
            isActive: true,
            isFeatured: false
        },
        {
            id: 5,
            title: "Gratis Ongkir Seluruh Indonesia",
            discount: "FREE",
            description: "Belanja tanpa batas! Gratis ongkir ke seluruh Indonesia untuk pembelian minimal Rp 500.000",
            code: "FREESHIPID",
            validUntil: "2025-12-31",
            category: "Shipping",
            image: "https://images.unsplash.com/photo-1558769132-cb1aea1f5e8a?w=800&h=600&fit=crop",
            terms: [
                "Minimal pembelian Rp 500.000",
                "Berlaku untuk semua ekspedisi",
                "Maksimal subsidi ongkir Rp 50.000",
                "Berlaku untuk alamat di Indonesia"
            ],
            isActive: true,
            isFeatured: false
        },
        {
            id: 6,
            title: "Cashback 50rb",
            discount: "50K",
            description: "Dapatkan cashback Rp 50.000 untuk pembelian minimal Rp 1.000.000!",
            code: "CASHBACK50K",
            validUntil: "2025-02-28",
            category: "Cashback",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
            terms: [
                "Minimal pembelian Rp 1.000.000",
                "Cashback masuk dalam 7 hari kerja",
                "Cashback dapat digunakan untuk pembelian berikutnya",
                "Berlaku untuk semua metode pembayaran"
            ],
            isActive: true,
            isFeatured: false
        },
        {
            id: 7,
            title: "Midnight Sale",
            discount: "40%",
            description: "Diskon 40% khusus untuk belanja tengah malam (00:00 - 06:00 WIB)!",
            code: "MIDNIGHT40",
            validUntil: "2025-01-15",
            category: "Flash Sale",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
            terms: [
                "Berlaku pukul 00:00 - 06:00 WIB",
                "Maksimal diskon Rp 200.000",
                "Berlaku untuk produk pilihan",
                "Stok terbatas"
            ],
            isActive: true,
            isFeatured: false
        },
        {
            id: 8,
            title: "Paket Lebaran Hemat",
            discount: "35%",
            description: "Siap-siap lebaran dengan paket hemat! Diskon 35% untuk paket baju keluarga.",
            code: "LEBARAN35",
            validUntil: "2025-04-15",
            category: "Seasonal",
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=600&fit=crop",
            terms: [
                "Berlaku untuk paket minimal 4 pcs",
                "Produk dalam satu kategori",
                "Tidak dapat ditukar atau dikembalikan",
                "Pre-order 2 minggu sebelum lebaran"
            ],
            isActive: true,
            isFeatured: true
        }
    ];

    const categories = ["Semua", "Flash Sale", "Member", "Bundle", "Seasonal", "Shipping", "Cashback"];

    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPromotions, setFilteredPromotions] = useState(allPromotions);
    const [copiedCode, setCopiedCode] = useState(null);

    // Filter promotions based on category and search
    useEffect(() => {
        let filtered = allPromotions.filter(promo => promo.isActive);

        // Filter by category
        if (selectedCategory !== "Semua") {
            filtered = filtered.filter(promo => promo.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(promo =>
                promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                promo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                promo.code.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredPromotions(filtered);
    }, [selectedCategory, searchQuery]);

    // Get featured promotions
    const featuredPromotions = allPromotions.filter(promo => promo.isFeatured && promo.isActive);

    // Copy promo code to clipboard
    const copyPromoCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    // Calculate days remaining
    const getDaysRemaining = (validUntil) => {
        const today = new Date();
        const endDate = new Date(validUntil);
        const diffTime = endDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Title text1={'PROMO &'} text2={'DISKON'} />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Jangan lewatkan penawaran spesial kami! Hemat lebih banyak dengan berbagai promo menarik yang tersedia
                    </p>
                </motion.div>

                {/* Featured Promotions Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="text-3xl">🔥</span>
                        Promo Unggulan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredPromotions.map((promo) => (
                            <motion.div
                                key={promo.id}
                                whileHover={{ scale: 1.02 }}
                                className="relative bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                            >
                                <div className="absolute inset-0 opacity-20">
                                    <img
                                        src={promo.image}
                                        alt={promo.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="relative p-8 text-white">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                                            {promo.category}
                                        </span>
                                        <div className="text-right">
                                            <div className="text-5xl font-black mb-1">
                                                {promo.discount}
                                            </div>
                                            <div className="text-sm opacity-90">OFF</div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{promo.title}</h3>
                                    <p className="text-white/90 mb-4 text-sm">{promo.description}</p>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 font-mono font-bold text-center">
                                            {promo.code}
                                        </div>
                                        <button
                                            onClick={() => copyPromoCode(promo.code)}
                                            className="px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                                        >
                                            {copiedCode === promo.code ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {getDaysRemaining(promo.validUntil)} hari lagi
                                        </span>
                                        <span className="text-xs opacity-75">
                                            s/d {new Date(promo.validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8"
                >
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Cari promo berdasarkan nama, kode, atau deskripsi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-colors shadow-lg"
                            />
                            <svg
                                className="w-6 h-6 text-orange-400 absolute left-5 top-1/2 transform -translate-y-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md border border-orange-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 text-center text-gray-600"
                >
                    Menampilkan {filteredPromotions.length} promo
                    {searchQuery && ` untuk "${searchQuery}"`}
                    {selectedCategory !== "Semua" && ` dalam kategori ${selectedCategory}`}
                </motion.div>

                {/* All Promotions Grid */}
                <AnimatePresence mode="wait">
                    {filteredPromotions.length > 0 ? (
                        <motion.div
                            key={`${selectedCategory}-${searchQuery}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                        >
                            {filteredPromotions.map((promo) => (
                                <motion.div
                                    key={promo.id}
                                    variants={itemVariants}
                                    layout
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={promo.image}
                                            alt={promo.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                            <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-xs font-semibold">
                                                {promo.category}
                                            </span>
                                            <div className="px-4 py-2 bg-white rounded-full font-black text-orange-600 text-xl shadow-lg">
                                                {promo.discount}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                                            {promo.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                                            {promo.description}
                                        </p>

                                        {/* Promo Code */}
                                        <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-dashed border-orange-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Kode Promo:</div>
                                                    <div className="font-mono font-bold text-orange-600">{promo.code}</div>
                                                </div>
                                                <button
                                                    onClick={() => copyPromoCode(promo.code)}
                                                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
                                                >
                                                    {copiedCode === promo.code ? '✓' : 'Copy'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Terms */}
                                        <div className="mb-4">
                                            <details className="group/details">
                                                <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors flex items-center justify-between">
                                                    Syarat & Ketentuan
                                                    <svg className="w-4 h-4 transition-transform group-open/details:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </summary>
                                                <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                                    {promo.terms.map((term, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <span className="text-orange-500 mt-1">•</span>
                                                            <span>{term}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        </div>

                                        {/* Valid Until */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-semibold text-orange-600">
                                                    {getDaysRemaining(promo.validUntil)} hari lagi
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                s/d {new Date(promo.validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">Promo Tidak Ditemukan</h3>
                            <p className="text-gray-500 mb-6">Coba kata kunci lain atau ubah filter kategori</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("Semua");
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                            >
                                Reset Filter
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center"
                >
                    <h3 className="text-3xl font-bold mb-4">Belum Menemukan Promo yang Cocok?</h3>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        Jangan khawatir! Kami selalu menambahkan promo baru setiap minggu. Subscribe newsletter kami untuk mendapatkan notifikasi promo terbaru!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                        <input
                            type="email"
                            placeholder="Masukkan email Anda"
                            className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="px-8 py-3 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg">
                            Subscribe
                        </button>
                    </div>
                    <Link to="/collection" className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-colors">
                        Lihat Semua Produk →
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Promotions;
