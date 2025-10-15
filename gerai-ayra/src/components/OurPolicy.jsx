import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      description: "We provide 7 days return policy",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      description: "We provide 24/7 Customer Support",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    }
  ];

  return (
    <div className='py-20'>
      <div className='text-center mb-16 animate-fade-in-up'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
          Why Choose <span className='text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-600'>Us?</span>
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>Kami berkomitmen memberikan pelayanan terbaik untuk kepuasan Anda</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {policies.map((policy, index) => (
          <div 
            key={index}
            className={`group relative bg-gradient-to-br ${policy.bgGradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up border border-white/50`}
            style={{animationDelay: `${0.2 * index}s`}}
          >
            {/* Background decoration */}
            <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500'></div>
            
            {/* Icon with gradient background */}
            <div className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${policy.gradient} p-3 shadow-lg group-hover:scale-110 transition-all duration-300`}>
              <img src={policy.icon} className='w-full h-full object-contain filter brightness-0 invert' alt={policy.title} />
            </div>
            
            {/* Content */}
            <div className='text-center relative z-10'>
              <h3 className='font-bold text-lg md:text-xl text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300'>
                {policy.title}
              </h3>
              <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                {policy.description}
              </p>
            </div>
            
            {/* Hover effect overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy