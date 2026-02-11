import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, [])
  return (
    <div className='bg-white py-12 md:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl md:text-5xl font-bold text-center text-primary mb-2'>POPULAR IN WOMEN</h1>
        <div className='w-24 h-1 bg-orange mx-auto mb-8 md:mb-16'></div>
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
          {popularProducts.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image}
              new_price={item.new_price} old_price={item.old_price}
            />
          })}
        </div>
      </div>
    </div>
  )
}

export default Popular
