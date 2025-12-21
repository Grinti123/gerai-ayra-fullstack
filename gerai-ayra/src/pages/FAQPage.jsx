import React from 'react'
import FAQ from '../components/FAQ'

const FAQPage = () => {
    return (
        <div className='min-h-screen bg-gradient-to-b from-white via-accent-50/30 to-primary-50/30'>
            {/* Page Header */}
            <div className='text-center pt-10 pb-4 animate-fade-in-up'>
                <h1 className='text-4xl sm:text-5xl font-bold text-gray-800 mb-4'>
                    Frequently Asked Questions
                </h1>
                <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
                    Semua yang perlu Anda ketahui tentang Gerai Ayra
                </p>
            </div>

            {/* FAQ Component */}
            <section className='animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
                <FAQ />
            </section>
        </div>
    )
}

export default FAQPage
