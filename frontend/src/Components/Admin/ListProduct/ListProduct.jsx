import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify';

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const menRef = useRef(null);
    const womenRef = useRef(null);
    const kidRef = useRef(null);

    const fetchInfo = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/allproducts`)
            .then((resp) => resp.json())
            .then((data) => { setAllProducts(data) });
    }
    useEffect(() => {
        fetchInfo();
    }, [])

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setShowDialog(true);
    };

    const confirmDelete = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/removeproduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: productToDelete })
        })
        toast.success('Product removed successfully!');
        setShowDialog(false);
        setProductToDelete(null);
        await fetchInfo();
    };

    const cancelDelete = () => {
        setShowDialog(false);
        setProductToDelete(null);
    };

    const scrollToSection = (ref) => {
        if (ref.current) {
            const yOffset = -120;
            const element = ref.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const menProducts = allproducts.filter(p => p.category === 'men');
    const womenProducts = allproducts.filter(p => p.category === 'women');
    const kidProducts = allproducts.filter(p => p.category === 'kid');

    const renderProductSection = (title, products, ref, prefix) => (
        <div ref={ref} className='mb-8'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>{title} ({products.length})</h2>
            <div className='overflow-x-auto'>
                <div className='grid grid-cols-[100px_100px_200px_100px_100px_100px_80px] gap-4 p-4 bg-gray-50 rounded-lg font-semibold text-gray-800 mb-4'>
                    <p>Product ID</p>
                    <p>Product</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Remove</p>
                </div>
                <div className='max-h-[400px] overflow-y-auto'>
                    {products.map((product, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-[100px_100px_200px_100px_100px_100px_80px] gap-4 p-4 items-center hover:bg-gray-50 transition'>
                                <p className='text-gray-800 font-semibold'>{prefix}{String(index + 1).padStart(2, '0')}</p>
                                <img src={product.image} alt="" className='w-20 h-20 object-cover rounded' />
                                <p className='text-gray-800'>{product.name}</p>
                                <p className='text-gray-800'>${product.old_price}</p>
                                <p className='text-gray-800'>${product.new_price}</p>
                                <p className='text-gray-800'>{product.category}</p>
                                <button onClick={() => { handleDeleteClick(product.id) }} className='text-red-600 hover:text-red-800 hover:scale-110 transition'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                            <hr className='border-gray-200' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className='bg-white rounded-lg shadow-lg p-8 m-8 border border-gray-200'>
            {showDialog && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>Delete Product</h2>
                        <p className='text-gray-700 mb-6'>Are you sure you want to delete this product? This action cannot be undone.</p>
                        <div className='flex gap-3 justify-end'>
                            <button onClick={cancelDelete} className='px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold'>Cancel</button>
                            <button onClick={confirmDelete} className='px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold'>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='sticky top-0 bg-white z-10 pb-4'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6'>All Products List</h1>
                <div className='flex gap-4 mb-6 border-b border-gray-200'>
                    <button onClick={() => scrollToSection(menRef)} className='px-6 py-3 font-semibold text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition'>Men's</button>
                    <button onClick={() => scrollToSection(womenRef)} className='px-6 py-3 font-semibold text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition'>Women's</button>
                    <button onClick={() => scrollToSection(kidRef)} className='px-6 py-3 font-semibold text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition'>Kids'</button>
                </div>
            </div>
            {renderProductSection("Men's Products", menProducts, menRef, 'ECM')}
            {renderProductSection("Women's Products", womenProducts, womenRef, 'ECW')}
            {renderProductSection("Kids' Products", kidProducts, kidRef, 'ECK')}
        </div>
    )
}

export default ListProduct
