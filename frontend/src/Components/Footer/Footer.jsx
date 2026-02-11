import React from 'react'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <footer className='bg-primary text-white py-8 md:py-12 mt-12 md:mt-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8'>
                <img src={footer_logo} alt="" className='w-12 h-12 md:w-16 md:h-16' />
                <p className='text-2xl md:text-3xl font-bold'>SHOPPER</p>
            </div>
            <ul className='flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-8 text-gray-300 text-sm md:text-base'>
                <li className='hover:text-orange cursor-pointer transition'>Company</li>
                <li className='hover:text-orange cursor-pointer transition'>Products</li>
                <li className='hover:text-orange cursor-pointer transition'>Office</li>
                <li className='hover:text-orange cursor-pointer transition'>About</li>
                <li className='hover:text-orange cursor-pointer transition'>Contact</li>
            </ul>
            <div className='flex justify-center gap-4 md:gap-6 mb-6 md:mb-8'>
                <div className='bg-orange p-2 md:p-3 rounded-full hover:bg-orange-600 cursor-pointer transition'>
                    <img src={instagram_icon} alt="" className='w-5 h-5 md:w-6 md:h-6' />
                </div>
                <div className='bg-orange p-2 md:p-3 rounded-full hover:bg-orange-600 cursor-pointer transition'>
                    <img src={pinterest_icon} alt="" className='w-5 h-5 md:w-6 md:h-6' />
                </div>
                <div className='bg-orange p-2 md:p-3 rounded-full hover:bg-orange-600 cursor-pointer transition'>
                    <img src={whatapp_icon} alt="" className='w-5 h-5 md:w-6 md:h-6' />
                </div>
            </div>
            <div className='border-t border-gray-700 pt-4 md:pt-6 text-center text-gray-400 text-sm md:text-base'>
                <p>Copyright @ 2024 - All rights reserved</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
