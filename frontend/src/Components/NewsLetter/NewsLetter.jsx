import React from 'react'
import { toast } from 'react-toastify';

const NewLetter = () => {
    return (
        <div className='bg-gray-800 py-12 md:py-20'>
            <div className='max-w-3xl mx-auto px-4 text-center'>
                <h1 className='text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4'>Get Exclusive Offers</h1>
                <p className='text-gray-300 text-base md:text-lg mb-6 md:mb-10'>Subscribe to our newsletter and stay updated with latest deals</p>
                <div className='flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto'>
                    <input type="email" placeholder='Enter your email address' className='flex-1 px-4 md:px-8 py-3 md:py-5 rounded border-2 border-gray-600 focus:border-orange bg-primary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange shadow-sm text-sm md:text-base' />
                    <button onClick={() => toast.success('Subscribed successfully!')} className='bg-orange text-white px-6 md:px-10 py-3 md:py-5 rounded hover:bg-orange-600 transition-all font-bold text-sm md:text-lg shadow-md whitespace-nowrap'>Subscribe Now</button>
                </div>
            </div>
        </div>
    )
}

export default NewLetter

