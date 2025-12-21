import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Testimonials from '../components/Testimonials'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='mb-16 sm:mb-20 animate-fade-in-up'>
        <Hero />
      </section>

      {/* Latest Collection Section */}
      <section className='relative mb-16 sm:mb-24 animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
        <div className='absolute inset-0 bg-hero-pattern opacity-5'></div>
        <div className='relative z-10'>
          <LatestCollection />
        </div>
      </section>

      {/* Best Seller Section */}
      <section className='mb-16 sm:mb-24 py-8 sm:py-12 animate-fade-in-up' style={{ animationDelay: '0.4s' }}>
        <BestSeller />
      </section>

      {/* Policy Section */}
      <section className='mb-16 sm:mb-24 animate-fade-in-up' style={{ animationDelay: '0.6s' }}>
        <OurPolicy />
      </section>

      {/* Testimonials Section */}
      <section className='mb-16 sm:mb-24 animate-fade-in-up' style={{ animationDelay: '0.8s' }}>
        <Testimonials />
      </section>

      {/* Newsletter Section */}
      <section className='mb-8 sm:mb-12 animate-fade-in-up' style={{ animationDelay: '1.0s' }}>
        <NewsletterBox />
      </section>
    </div>
  )
}

export default Home