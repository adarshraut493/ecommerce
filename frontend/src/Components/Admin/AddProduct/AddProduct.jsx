import React, { useState } from 'react'
import upload_area from '../assets/upload_area.svg'
import { toast } from 'react-toastify';

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product', image);
    await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data })
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch(`${process.env.REACT_APP_API_URL}/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        if(data.success) {
          toast.success('Product added successfully!');
          setProductDetails({ name: "", image: "", category: "women", new_price: "", old_price: "" });
          setImage(false);
        } else {
          toast.error('Failed to add product');
        }
      })

    } else {
      toast.error('Failed to upload image');
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-8 m-8 max-w-4xl border border-gray-200'>
      <div className='mb-6'>
        <p className='text-gray-800 font-medium mb-2'>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent' />
      </div>
      <div className='grid grid-cols-2 gap-6 mb-6'>
        <div>
          <p className='text-gray-800 font-medium mb-2'>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent' />
        </div>
        <div>
          <p className='text-gray-800 font-medium mb-2'>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent' />
        </div>
      </div>
      <div className='mb-6'>
        <p className='text-gray-800 font-medium mb-2'>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className='mb-6'>
        <label htmlFor="file-input" className='cursor-pointer'>
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="Product" className='w-32 h-32 object-contain border-2 border-dashed border-gray-300 rounded-lg p-4' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={() => { Add_Product() }} className='bg-orange text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-semibold'>ADD</button>
    </div>
  )
}

export default AddProduct
