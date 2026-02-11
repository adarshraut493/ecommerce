import React from 'react'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();
    
    return (
        <div className='bg-light py-12 md:py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12'>
                <div className='flex-1 space-y-4 md:space-y-6 text-center md:text-left'>
                    <h2 className='text-lg md:text-xl font-semibold text-gray-600'>NEW ARRIVALS ONLY</h2>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-3 md:gap-4 justify-center md:justify-start'>
                            <p className='text-4xl md:text-6xl font-bold text-primary'>New</p>
                            <img src={hand_icon} alt="" className='w-12 h-12 md:w-20 md:h-20' />
                        </div>
                        <p className='text-4xl md:text-6xl font-bold text-primary'>collections</p>
                        <p className='text-4xl md:text-6xl font-bold text-primary'>for everyone</p>
                    </div>
                    <button onClick={() => {navigate('/'); window.scrollTo(0, 800);}} className='flex items-center gap-3 md:gap-4 bg-orange text-white px-6 md:px-8 py-3 md:py-4 rounded hover:bg-orange-600 transition mt-6 md:mt-8 font-semibold mx-auto md:mx-0'>
                        <span>Latest Collections</span>
                        <img src={arrow_icon} alt=" " className='w-5 h-5 md:w-6 md:h-6' />
                    </button>
                </div>
                <div className='flex-1 w-full'>
                    <img src={hero_image} alt="" className='w-full h-auto max-w-md mx-auto' />
                </div>
            </div>
        </div>
    )
}

export default Hero
