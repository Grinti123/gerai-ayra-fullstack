import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Hubungi Kita</p>
        <p className='text-gray-400 mt-3'>
        </p>
        <form onSubmit={onSubmitHandler} className='w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 border p-1'>
            <input className='w-full flex-grow outline-none px-4 py-3' type="email" placeholder='Enter your Email' required/>
            <button type='submit' className='bg-black text-white text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-4 whitespace-nowrap'>Submit</button>
        </form>
    </div>
  )
}

export default NewsletterBox