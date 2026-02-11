import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (
        <div className='group cursor-pointer bg-white rounded border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300'>
            <Link to={`/product/${props.id}`}>
                <div className='overflow-hidden bg-white'>
                    <img onClick={() => window.scrollTo(0,0)} src={props.image} alt="" className='w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500' />
                </div>
            </Link>
            <div className='p-3 md:p-4'>
                <p className='mt-2 text-gray-800 font-medium line-clamp-2 min-h-[3rem] text-sm md:text-base'>{props.name}</p>
                <div className='flex items-center gap-2 md:gap-4 mt-3 flex-wrap'>
                    <div className='text-xl md:text-2xl font-bold text-red-600'>
                        ${props.new_price}
                    </div>
                    <div className='text-gray-500 line-through text-xs md:text-sm'>
                        ${props.old_price}
                    </div>
                    <div className='ml-auto bg-red-600 text-white px-2 md:px-3 py-1 rounded text-xs font-bold'>
                        {Math.round(((props.old_price - props.new_price) / props.old_price) * 100)}% OFF
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item
