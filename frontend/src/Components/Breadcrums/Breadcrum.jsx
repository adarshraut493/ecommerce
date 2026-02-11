import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const { product } = props;
    if (!product) return null;
    return (
        <div className='flex items-center gap-2 md:gap-3 px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm text-gray-600 bg-gray-50'>
            <span className='hover:text-orange cursor-pointer font-medium'>HOME</span>
            <img src={arrow_icon} alt='' className='w-3 h-3 md:w-4 md:h-4'/>
            <span className='hover:text-orange cursor-pointer font-medium'>SHOP</span>
            <img src={arrow_icon} alt="" className='w-3 h-3 md:w-4 md:h-4'/>
            <span className='hover:text-orange cursor-pointer font-medium'>{product.category}</span>
            <img src={arrow_icon} alt="" className='w-3 h-3 md:w-4 md:h-4'/>
            <span className='text-gray-800 font-semibold truncate'>{product.name}</span>
        </div>
    )
}

export default Breadcrum
