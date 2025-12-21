import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

const Blog = () => {
    // Sample blog data - in production, this would come from an API
    const allArticles = [
        {
            id: 1,
            title: "Tren Fashion 2025: Warna-Warna yang Akan Mendominasi",
            excerpt: "Temukan palet warna yang akan menjadi favorit di tahun 2025. Dari earth tones hingga vibrant colors, simak prediksi tren warna fashion tahun depan.",
            category: "Trend",
            author: "Sarah Johnson",
            date: "2025-01-15",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
            tags: ["Fashion", "Trend 2025", "Color Palette"]
        },
        {
            id: 2,
            title: "Cara Merawat Pakaian Agar Awet dan Tahan Lama",
            excerpt: "Tips praktis merawat berbagai jenis kain agar pakaian favorit Anda tetap awet. Pelajari teknik mencuci, menyimpan, dan merawat pakaian dengan benar.",
            category: "Tips",
            author: "Maria Ulfah",
            date: "2025-01-12",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&h=600&fit=crop",
            tags: ["Perawatan", "Tips", "Laundry"]
        },
        {
            id: 3,
            title: "Koleksi Terbaru Gerai Ayra: Spring Collection 2025",
            excerpt: "Sambut musim semi dengan koleksi terbaru kami! Desain fresh dengan material berkualitas tinggi yang nyaman untuk aktivitas sehari-hari.",
            category: "Produk",
            author: "Gerai Ayra Team",
            date: "2025-01-10",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
            tags: ["New Arrival", "Spring", "Collection"]
        },
        {
            id: 4,
            title: "Sustainable Fashion: Memilih Pakaian Ramah Lingkungan",
            excerpt: "Kenali pentingnya sustainable fashion dan bagaimana Anda bisa berkontribusi untuk lingkungan melalui pilihan fashion yang bijak.",
            category: "Industri",
            author: "Dr. Eco Fashion",
            date: "2025-01-08",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&h=600&fit=crop",
            tags: ["Sustainability", "Eco-Friendly", "Environment"]
        },
        {
            id: 5,
            title: "Mix and Match: Panduan Styling untuk Pemula",
            excerpt: "Bingung cara mix and match outfit? Pelajari dasar-dasar styling yang akan membuat penampilan Anda selalu on point dengan budget terbatas.",
            category: "Tips",
            author: "Fashion Stylist Pro",
            date: "2025-01-05",
            readTime: "8 min",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
            tags: ["Styling", "Mix Match", "Fashion Tips"]
        },
        {
            id: 6,
            title: "Industri Fashion Indonesia: Peluang dan Tantangan 2025",
            excerpt: "Analisis mendalam tentang perkembangan industri fashion lokal, dari UMKM hingga brand besar, serta peluang yang bisa dimanfaatkan.",
            category: "Industri",
            author: "Business Analyst",
            date: "2025-01-03",
            readTime: "10 min",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            tags: ["Industry", "Business", "Indonesia"]
        },
        {
            id: 7,
            title: "Capsule Wardrobe: Minimalis Tapi Tetap Stylish",
            excerpt: "Konsep capsule wardrobe untuk Anda yang ingin tampil stylish dengan koleksi pakaian minimal. Hemat ruang, hemat budget, tetap fashionable!",
            category: "Tips",
            author: "Minimalist Style",
            date: "2024-12-28",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=600&fit=crop",
            tags: ["Capsule Wardrobe", "Minimalist", "Smart Shopping"]
        },
        {
            id: 8,
            title: "Behind The Scenes: Proses Produksi di Gerai Ayra",
            excerpt: "Intip proses di balik layar pembuatan produk Gerai Ayra, dari pemilihan bahan hingga quality control yang ketat untuk kepuasan Anda.",
            category: "Produk",
            author: "Gerai Ayra Team",
            date: "2024-12-25",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1558769132-cb1aea1f5e8a?w=800&h=600&fit=crop",
            tags: ["Behind The Scenes", "Production", "Quality"]
        },
        {
            id: 9,
            title: "Fashion untuk Berbagai Bentuk Tubuh",
            excerpt: "Setiap bentuk tubuh itu indah! Pelajari cara memilih pakaian yang sesuai dengan bentuk tubuh Anda untuk tampil percaya diri maksimal.",
            category: "Tips",
            author: "Body Positivity Coach",
            date: "2024-12-20",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
            tags: ["Body Type", "Confidence", "Fashion Guide"]
        },
        {
            id: 10,
            title: "Teknologi dalam Industri Fashion: AI dan Virtual Try-On",
            excerpt: "Bagaimana teknologi AI dan AR mengubah cara kita berbelanja fashion? Eksplorasi inovasi terbaru di industri fashion digital.",
            category: "Industri",
            author: "Tech Fashion Insider",
            date: "2024-12-18",
            readTime: "9 min",
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
            tags: ["Technology", "AI", "Innovation"]
        },
        {
            id: 11,
            title: "Trend Streetwear 2025: Dari Jalanan ke Runway",
            excerpt: "Streetwear terus berkembang dan menjadi mainstream. Simak tren streetwear yang akan hits di 2025 dan cara mengadopsinya ke gaya Anda.",
            category: "Trend",
            author: "Streetwear Expert",
            date: "2024-12-15",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
            tags: ["Streetwear", "Urban Fashion", "Trend"]
        },
        {
            id: 12,
            title: "Panduan Lengkap Memilih Pakaian untuk Interview Kerja",
            excerpt: "First impression matters! Pelajari cara berpakaian yang tepat untuk interview kerja di berbagai industri agar tampil profesional dan percaya diri.",
            category: "Tips",
            author: "Career Coach",
            date: "2024-12-12",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=600&fit=crop",
            tags: ["Professional", "Career", "Interview"]
        }
    ];

    const categories = ["Semua", "Trend", "Tips", "Produk", "Industri"];

    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredArticles, setFilteredArticles] = useState(allArticles);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    // Filter articles based on category and search
    useEffect(() => {
        let filtered = allArticles;

        // Filter by category
        if (selectedCategory !== "Semua") {
            filtered = filtered.filter(article => article.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredArticles(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [selectedCategory, searchQuery]);

    // Pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get featured article (latest)
    const featuredArticle = allArticles[0];

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Title text1={'BLOG &'} text2={'BERITA'} />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Temukan artikel menarik seputar fashion, tips styling, tren terbaru, dan berita industri fashion Indonesia
                    </p>
                </motion.div>

                {/* Featured Article */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <Link to={`/blog/${featuredArticle.id}`}>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                            <img
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-sm font-semibold">
                                        Featured
                                    </span>
                                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                                        {featuredArticle.category}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
                                    {featuredArticle.title}
                                </h2>
                                <p className="text-gray-200 text-lg mb-4 max-w-3xl">
                                    {featuredArticle.excerpt}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-gray-300">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {featuredArticle.author}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(featuredArticle.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {featuredArticle.readTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
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
                                placeholder="Cari artikel, topik, atau tag..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors shadow-lg"
                            />
                            <svg
                                className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 transform -translate-y-1/2"
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
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
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
                    Menampilkan {filteredArticles.length} artikel
                    {searchQuery && ` untuk "${searchQuery}"`}
                    {selectedCategory !== "Semua" && ` dalam kategori ${selectedCategory}`}
                </motion.div>

                {/* Articles Grid */}
                <AnimatePresence mode="wait">
                    {currentArticles.length > 0 ? (
                        <motion.div
                            key={`${selectedCategory}-${searchQuery}-${currentPage}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                        >
                            {currentArticles.map((article) => (
                                <motion.div
                                    key={article.id}
                                    variants={itemVariants}
                                    layout
                                >
                                    <Link to={`/blog/${article.id}`}>
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xs font-semibold">
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {article.tags.slice(0, 2).map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {article.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">Artikel Tidak Ditemukan</h3>
                            <p className="text-gray-500 mb-6">Coba kata kunci lain atau ubah filter kategori</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("Semua");
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                            >
                                Reset Filter
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center items-center gap-2 mt-12"
                    >
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-indigo-500 hover:text-white shadow-md'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === index + 1
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-110'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-indigo-500 hover:text-white shadow-md'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                )}

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center"
                >
                    <h3 className="text-3xl font-bold mb-4">Jangan Lewatkan Update Terbaru!</h3>
                    <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                        Subscribe newsletter kami untuk mendapatkan artikel terbaru, tips fashion, dan promo eksklusif langsung ke email Anda
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Masukkan email Anda"
                            className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
