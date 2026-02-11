import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredProducts = all_product.filter(item => props.category === item.category)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className='min-h-screen bg-light'>
      <div className='relative'>
        <img className='w-full h-48 md:h-80 object-cover' src={props.banner} alt="" />
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12'>
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16'>
          {currentProducts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image}
              new_price={item.new_price} old_price={item.old_price}
            />
          ))}
        </div>
        <div className='flex justify-center items-center gap-2'>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-orange text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopCategory
