import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-accent-50/30 to-primary-50/30'>
      {/* Hero Section */}
      <section className='mb-20 animate-fade-in-up'>
        <Hero />
      </section>
      
      {/* Latest Collection Section */}
      <section className='relative mb-24 animate-fade-in-up' style={{animationDelay: '0.2s'}}>
        <div className='absolute inset-0 bg-hero-pattern opacity-5'></div>
        <div className='relative z-10'>
          <LatestCollection />
        </div>
      </section>
      
      {/* Best Seller Section */}
      <section className='mb-24 bg-gradient-to-r from-accent-50/50 to-primary-50/50 py-12 rounded-3xl animate-fade-in-up' style={{animationDelay: '0.4s'}}>
        <BestSeller />
      </section>
      
      {/* Policy Section */}
      <section className='mb-24 animate-fade-in-up' style={{animationDelay: '0.6s'}}>
        <OurPolicy />
      </section>
      
      {/* Newsletter Section */}
      <section className='mb-12 animate-fade-in-up' style={{animationDelay: '0.8s'}}>
        <NewsletterBox />
      </section>
    </div>
  )
}

export default Home