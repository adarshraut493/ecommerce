import React from 'react'
import exclusive_image from '../Assets/exclusive_image.png'
import { useNavigate } from 'react-router-dom'

const Offers = () => {
    const navigate = useNavigate();
    
    return (
        <div className='bg-gradient-to-r from-orange-50 to-orange-100 my-0 py-12 md:py-20 border-y border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
                    <div className='flex-1 space-y-4 md:space-y-6 text-center md:text-left'>
                        <h1 className='text-4xl md:text-6xl font-black text-primary'>Exclusive</h1>
                        <h1 className='text-4xl md:text-6xl font-black text-primary'>Offers For You</h1>
                        <p className='text-base md:text-xl text-gray-700 font-bold'>ONLY ON BEST SELLERS PRODUCTS</p>
                        <button onClick={() => {navigate('/'); window.scrollTo(0, 1200);}} className='bg-orange text-white px-8 md:px-10 py-3 md:py-5 rounded hover:bg-orange-600 transition-all font-bold text-base md:text-lg shadow-md mx-auto md:mx-0 block md:inline-block'>CHECK NOW →</button>
                    </div>
                    <div className='flex-1 w-full'>
                        <img src={exclusive_image} alt="" className='w-full h-auto max-w-md mx-auto' />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Offers
