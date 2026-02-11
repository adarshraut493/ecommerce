import React from 'react'
import { Link } from 'react-router-dom'
import add_product_icon from '../assets/Product_Cart.svg'
import list_product_icon from '../assets/Product_list_icon.svg'

const Sidebar = () => {
    return (
        <div className='bg-white shadow-lg min-h-screen w-64 p-6 border-r border-gray-200'>
            <Link to={'/admin/addproduct'}>
                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-orange hover:text-white transition cursor-pointer mb-4 group'>
                    <img src={add_product_icon} alt="" className='w-8 h-8' />
                    <p className='font-semibold text-gray-800 group-hover:text-white'>Add Product</p>
                </div>
            </Link>
            <Link to={'/admin/listproduct'}>
                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-orange hover:text-white transition cursor-pointer group'>
                    <img src={list_product_icon} alt="" className='w-8 h-8' />
                    <p className='font-semibold text-gray-800 group-hover:text-white'>Product List</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar
