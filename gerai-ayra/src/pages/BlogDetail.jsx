import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Sample blog data - should match the data in Blog.jsx
    const allArticles = [
        {
            id: 1,
            title: "Tren Fashion 2025: Warna-Warna yang Akan Mendominasi",
            excerpt: "Temukan palet warna yang akan menjadi favorit di tahun 2025. Dari earth tones hingga vibrant colors, simak prediksi tren warna fashion tahun depan.",
            category: "Trend",
            author: "Sarah Johnson",
            date: "2025-01-15",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop",
            tags: ["Fashion", "Trend 2025", "Color Palette"],
            content: `
        <p>Dunia fashion selalu berevolusi, dan tahun 2025 membawa palet warna yang segar dan berani. Berdasarkan analisis dari berbagai fashion week internasional dan prediksi dari para ahli, berikut adalah warna-warna yang akan mendominasi tahun depan.</p>

        <h2>1. Earth Tones yang Sophisticated</h2>
        <p>Warna-warna tanah seperti terracotta, warm brown, dan sage green akan tetap menjadi favorit. Warna-warna ini memberikan kesan natural dan grounded yang sempurna untuk berbagai kesempatan.</p>

        <h2>2. Vibrant Purple dan Lavender</h2>
        <p>Ungu dalam berbagai shade, dari lavender lembut hingga deep purple yang dramatis, akan menjadi statement color di 2025. Warna ini memberikan kesan mewah dan modern.</p>

        <h2>3. Electric Blue</h2>
        <p>Biru elektrik yang bold dan eye-catching akan menjadi pilihan untuk mereka yang ingin tampil berani. Warna ini sempurna untuk statement pieces.</p>

        <h2>4. Soft Pastels</h2>
        <p>Pastel colors seperti baby pink, mint green, dan powder blue tetap relevan dengan sentuhan yang lebih sophisticated dan mature.</p>

        <h2>Tips Mengadopsi Tren Warna</h2>
        <ul>
          <li>Mulai dengan accessories jika Anda belum yakin dengan warna bold</li>
          <li>Mix and match warna-warna earth tone untuk look yang cohesive</li>
          <li>Gunakan vibrant colors sebagai accent untuk outfit netral</li>
          <li>Jangan takut bereksperimen dengan color blocking</li>
        </ul>

        <p>Ingat, fashion adalah tentang mengekspresikan diri. Pilih warna yang membuat Anda merasa percaya diri dan nyaman!</p>
      `
        },
        {
            id: 2,
            title: "Cara Merawat Pakaian Agar Awet dan Tahan Lama",
            excerpt: "Tips praktis merawat berbagai jenis kain agar pakaian favorit Anda tetap awet. Pelajari teknik mencuci, menyimpan, dan merawat pakaian dengan benar.",
            category: "Tips",
            author: "Maria Ulfah",
            date: "2025-01-12",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1200&h=800&fit=crop",
            tags: ["Perawatan", "Tips", "Laundry"],
            content: `
        <p>Merawat pakaian dengan benar tidak hanya membuat pakaian lebih awet, tetapi juga menghemat budget Anda dalam jangka panjang. Berikut adalah panduan lengkap merawat pakaian berdasarkan jenis kainnya.</p>

        <h2>Perawatan Berdasarkan Jenis Kain</h2>

        <h3>Katun</h3>
        <p>Katun adalah bahan yang relatif mudah dirawat, namun tetap memerlukan perhatian khusus:</p>
        <ul>
          <li>Cuci dengan air dingin atau hangat (tidak lebih dari 30°C)</li>
          <li>Hindari penggunaan pemutih berlebihan</li>
          <li>Jemur di tempat teduh untuk mencegah warna pudar</li>
          <li>Setrika saat masih sedikit lembab untuk hasil terbaik</li>
        </ul>

        <h3>Polyester dan Sintetis</h3>
        <ul>
          <li>Cuci dengan air dingin</li>
          <li>Gunakan detergen mild</li>
          <li>Hindari suhu tinggi saat menyetrika</li>
          <li>Jangan gunakan fabric softener berlebihan</li>
        </ul>

        <h3>Wool dan Cashmere</h3>
        <ul>
          <li>Cuci dengan tangan menggunakan detergen khusus wool</li>
          <li>Jangan diperas, cukup tekan perlahan</li>
          <li>Keringkan dengan cara direbahkan di permukaan datar</li>
          <li>Simpan dengan moth balls untuk mencegah ngengat</li>
        </ul>

        <h2>Tips Umum Perawatan Pakaian</h2>
        <ol>
          <li><strong>Pisahkan berdasarkan warna:</strong> Cuci pakaian putih, warna gelap, dan warna terang secara terpisah</li>
          <li><strong>Balik pakaian:</strong> Cuci pakaian dalam keadaan terbalik untuk melindungi warna dan print</li>
          <li><strong>Jangan overload mesin cuci:</strong> Beri ruang agar pakaian tercuci dengan bersih</li>
          <li><strong>Segera keluarkan dari mesin:</strong> Jangan biarkan pakaian basah terlalu lama di mesin cuci</li>
          <li><strong>Gunakan hanger yang tepat:</strong> Investasi pada hanger berkualitas untuk menjaga bentuk pakaian</li>
        </ol>

        <h2>Penyimpanan yang Benar</h2>
        <p>Cara penyimpanan juga mempengaruhi ketahanan pakaian:</p>
        <ul>
          <li>Simpan di tempat kering dan berventilasi baik</li>
          <li>Gunakan silica gel untuk mencegah kelembaban</li>
          <li>Lipat sweater dan knit, jangan digantung</li>
          <li>Gantung kemeja dan dress untuk mencegah kusut</li>
        </ul>
      `
        },
        // Add more articles with full content...
    ];

    const article = allArticles.find(a => a.id === parseInt(id));
    const relatedArticles = allArticles
        .filter(a => a.id !== parseInt(id) && a.category === article?.category)
        .slice(0, 3);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h2>
                    <Link to="/blog" className="text-indigo-600 hover:text-indigo-700">
                        Kembali ke Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Blog
                </motion.button>

                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-semibold">
                            {article.category}
                        </span>
                        <span className="text-gray-500 text-sm">{article.readTime} read</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-6 text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {article.author.charAt(0)}
                            </div>
                            <span className="font-medium">{article.author}</span>
                        </div>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(article.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm border border-gray-200"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-[500px] object-cover"
                    />
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-12"
                >
                    <div
                        className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-strong:text-gray-900 prose-strong:font-semibold"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Share Buttons */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bagikan Artikel Ini</h3>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                            <button className="px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Twitter
                            </button>
                            <button className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Artikel Terkait</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => (
                                <Link key={related.id} to={`/blog/${related.id}`}>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={related.image}
                                                alt={related.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-xs font-semibold text-indigo-600 mb-2 block">
                                                {related.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                {related.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {related.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;
