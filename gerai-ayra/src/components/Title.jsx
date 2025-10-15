import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-4 items-center mb-6 group animate-fade-in-up' >
        <p className='text-2xl md:text-3xl font-bold' >
          <span className='text-gray-800'>{text1}</span> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-600 ml-2">{text2}</span>
        </p>
        <div className='w-12 sm:w-16 h-[3px] bg-gradient-to-r from-accent-400 to-primary-400 rounded-full group-hover:animate-glow transition-all duration-300' ></div>
    </div>
  )
}

export default Title