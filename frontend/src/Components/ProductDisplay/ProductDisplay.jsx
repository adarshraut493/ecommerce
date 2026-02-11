import React from 'react'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { useContext } from 'react'
import BuyNow from "../BuyNow/BuyNow.jsx"
import { ShopContext } from '../../Context/ShopContext'
import { toast } from 'react-toastify'

const ProductDisplay = (props) => {
    const { product } = props;
    const {addToCart} = useContext(ShopContext)
    const [selectedSize, setSelectedSize] = React.useState('');
    
    if (!product) return <div className='text-center py-20'>Loading...</div>;
    
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 bg-white'>
            <div className='flex flex-col lg:flex-row gap-6 md:gap-12'>
                <div className='flex-1 flex flex-col-reverse md:flex-row gap-4'>
                    <div className='flex md:flex-col gap-3 overflow-x-auto md:overflow-visible'>
                        <img src={product.image} alt="" className='w-20 h-20 md:w-24 md:h-24 object-cover rounded border-2 border-gray-300 cursor-pointer hover:border-orange flex-shrink-0' />
                        <img src={product.image} alt="" className='w-20 h-20 md:w-24 md:h-24 object-cover rounded border-2 border-gray-300 cursor-pointer hover:border-orange flex-shrink-0' />
                        <img src={product.image} alt="" className='w-20 h-20 md:w-24 md:h-24 object-cover rounded border-2 border-gray-300 cursor-pointer hover:border-orange flex-shrink-0' />
                        <img src={product.image} alt="" className='w-20 h-20 md:w-24 md:h-24 object-cover rounded border-2 border-gray-300 cursor-pointer hover:border-orange flex-shrink-0' />
                    </div>
                    <div className='flex-1'>
                        <img className='w-full h-auto max-h-[500px] object-contain rounded' src={product.image} alt="" />
                    </div>
                </div>
                <div className='flex-1 space-y-4 md:space-y-6'>
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>{product.name}</h1>
                    <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                            <img src={star_icon} alt="" className='w-4 h-4 md:w-5 md:h-5' />
                            <img src={star_icon} alt="" className='w-4 h-4 md:w-5 md:h-5' />
                            <img src={star_icon} alt="" className='w-4 h-4 md:w-5 md:h-5' />
                            <img src={star_icon} alt="" className='w-4 h-4 md:w-5 md:h-5' />
                            <img src={star_dull_icon} alt="" className='w-4 h-4 md:w-5 md:h-5' />
                        </div>
                        <p className='text-orange text-sm md:text-base hover:underline cursor-pointer'>(122 ratings)</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='text-gray-500 line-through text-lg md:text-xl'>${product.old_price}</div>
                        <div className="text-red-600 text-3xl md:text-4xl font-bold">${product.new_price}</div>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quasi similique quibusdam recusandae quis quia, illum nisi nobis unde ad numquam eligendi tempora commodi.
                    </div>
                    <div>
                        <h1 className='text-lg md:text-xl font-semibold text-gray-900 mb-3'>Select Size</h1>
                        <div className='flex gap-3 flex-wrap'>
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <div key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-3 border-2 rounded cursor-pointer hover:shadow transition font-medium ${selectedSize === size ? 'border-orange bg-orange text-white' : 'border-gray-300 bg-white text-gray-900'}`}>{size}</div>
                            ))}
                        </div>
                    </div>
                    <BuyNow/>
                    <button onClick={()=>{addToCart(product.id); toast.success('Product added to cart!');}} className='w-full md:w-auto px-8 md:px-12 py-3 md:py-4 bg-orange text-white rounded hover:bg-orange-600 transition-all font-bold text-base md:text-lg shadow-md'>ADD TO CART</button>
                    <p className='text-gray-700 text-sm md:text-base'><span className='font-semibold text-gray-900'>Category:</span> Women, T-shirt, Crop Top</p>
                    <p className='text-gray-700 text-sm md:text-base'><span className='font-semibold text-gray-900'>Tags:</span> Modern, Latest</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay

