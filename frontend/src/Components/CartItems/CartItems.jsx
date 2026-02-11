import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { toast } from 'react-toastify'

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [promoCode, setPromoCode] = React.useState('');
    const [discount, setDiscount] = React.useState(0);
    const [showDialog, setShowDialog] = React.useState(false);
    const [itemToRemove, setItemToRemove] = React.useState(null);
    
    const handleRemoveClick = (id) => {
        setItemToRemove(id);
        setShowDialog(true);
    };

    const confirmRemove = () => {
        removeFromCart(itemToRemove);
        toast.success('Item removed from cart!');
        setShowDialog(false);
        setItemToRemove(null);
    };

    const cancelRemove = () => {
        setShowDialog(false);
        setItemToRemove(null);
    };
    
    const handlePromoCode = () => {
        if (promoCode.toUpperCase() === 'SAVE10') {
            setDiscount(10);
            toast.success('Promo code applied! 10% discount');
        } else if (promoCode.toUpperCase() === 'SAVE20') {
            setDiscount(20);
            toast.success('Promo code applied! 20% discount');
        } else {
            toast.error('Invalid promo code');
        }
    };
    
    const getFinalAmount = () => {
        const subtotal = getTotalCartAmount();
        return subtotal - (subtotal * discount / 100);
    };
    
    const handleCheckout = () => {
        const amount = getTotalCartAmount();
        if (amount === 0) {
            alert('Your cart is empty!');
            return;
        }
        initiatePayment(amount);
    };
    
    const initiatePayment = async (amount) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
                method: "POST",
                body: JSON.stringify({
                    amount: amount * 100,
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const order = await response.json();
            
            var options = {
                "key": process.env.REACT_APP_RAZORPAY_KEY,
                amount: amount * 100,
                currency: "INR",
                "name": "Shopify",
                "description": "Purchase",
                "order_id": order.id,
                "handler": async function (response) {
                    alert('Payment Successful!');
                },
                "prefill": {
                    "name": "Customer",
                    "email": "customer@example.com",
                    "contact": "9999999999"
                },
                "theme": {
                    "color": "#FF6B35"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            alert('Payment failed. Please try again.');
        }
    };
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 bg-light'>
            {showDialog && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>Remove Item</h2>
                        <p className='text-gray-700 mb-6'>Are you sure you want to remove this item from your cart?</p>
                        <div className='flex gap-3 justify-end'>
                            <button onClick={cancelRemove} className='px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-semibold'>Cancel</button>
                            <button onClick={confirmRemove} className='px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold'>Remove</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='overflow-x-auto'>
                <div className='hidden md:grid grid-cols-6 gap-4 p-4 bg-white rounded border border-gray-200 font-semibold text-gray-700 mb-4 min-w-[600px]'>
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <div className='space-y-4'>
                    {all_product.map((e) => {
                        if (cartItems[e.id] > 0) {
                            return (
                                <div key={e.id} className='bg-white p-4 rounded border border-gray-200'>
                                    <div className='grid grid-cols-2 md:grid-cols-6 gap-4 items-center min-w-[600px] md:min-w-0'>
                                        <img src={e.image} className='w-16 h-16 md:w-20 md:h-20 object-cover rounded' alt="" />
                                        <p className='text-sm md:text-base text-gray-800 font-medium'>{e.name}</p>
                                        <p className='text-sm md:text-base text-gray-700'>${e.new_price}</p>
                                        <button className='px-4 py-2 bg-gray-100 border border-gray-300 rounded font-semibold w-fit'>{cartItems[e.id]}</button>
                                        <p className='text-sm md:text-base text-gray-700 font-semibold'>${e.new_price * cartItems[e.id]}</p>
                                        <button onClick={() => handleRemoveClick(e.id)} className='text-red-600 hover:text-red-800 hover:scale-110 transition'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-8 md:mt-12">
                <div className='flex-1 bg-white p-6 md:p-8 rounded border border-gray-200'>
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>Cart Totals</h1>
                    <div className='space-y-4'>
                        <div className='flex justify-between items-center pb-4 border-b'>
                            <p className='text-gray-700'>Subtotal</p>
                            <p className='font-semibold text-gray-900'>${getTotalCartAmount()}</p>
                        </div>
                        {discount > 0 && <div className='flex justify-between items-center pb-4 border-b'>
                            <p className='text-gray-700'>Discount ({discount}%)</p>
                            <p className='font-semibold text-green-600'>-${(getTotalCartAmount() * discount / 100).toFixed(2)}</p>
                        </div>}
                        <div className='flex justify-between items-center pb-4 border-b'>
                            <p className='text-gray-700'>Shipping fee</p>
                            <p className='font-semibold text-green-600'>Free</p>
                        </div>
                        <div className='flex justify-between items-center pt-2'>
                            <h3 className='text-xl font-bold text-gray-900'>Total</h3>
                            <h3 className='text-xl font-bold text-red-600'>${getFinalAmount().toFixed(2)}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout} className='w-full mt-6 px-8 py-4 bg-orange text-white rounded hover:bg-orange-600 transition-all font-bold text-lg shadow-md'>PROCEED TO CHECKOUT</button>
                </div>
                <div className='flex-1 bg-white p-6 md:p-8 rounded border border-gray-200'>
                    <p className='text-gray-700 mb-4 font-medium'>If you have a promo code, Enter it here</p>
                    <p className='text-sm text-gray-500 mb-3'>Try: SAVE10 or SAVE20</p>
                    <div className="flex gap-3">
                        <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder='Promo code' className='flex-1 px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange' />
                        <button onClick={handlePromoCode} className='px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-all font-semibold'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
