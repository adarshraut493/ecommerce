import React, { useContext, useState } from 'react'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { toast } from 'react-toastify';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, isAdmin } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-primary shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center gap-2'>
            <img src={logo} alt="Logo" className='w-10 h-10' />
            <p className='text-xl font-bold text-white'>SHOPPER</p>
          </Link>
          
          <button onClick={() => setIsOpen(!isOpen)} className='md:hidden p-2 text-white'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>

          <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-secondary md:bg-transparent shadow-md md:shadow-none gap-6 p-4 md:p-0`}>
            <li onClick={() => {setMenu("shop"); setIsOpen(false); window.scrollTo(0, 0);}} className='relative'>
              <Link to='/' className='text-white hover:text-orange font-medium transition-colors'>Shop</Link>
              {menu === "shop" && <div className='h-0.5 bg-orange mt-1'></div>}
            </li>
            <li onClick={() => {setMenu("mens"); setIsOpen(false); window.scrollTo(0, 0);}} className='relative'>
              <Link to='/mens' className='text-white hover:text-orange font-medium transition-colors'>Men</Link>
              {menu === "mens" && <div className='h-0.5 bg-orange mt-1'></div>}
            </li>
            <li onClick={() => {setMenu("womens"); setIsOpen(false); window.scrollTo(0, 0);}} className='relative'>
              <Link to='/womens' className='text-white hover:text-orange font-medium transition-colors'>Women</Link>
              {menu === "womens" && <div className='h-0.5 bg-orange mt-1'></div>}
            </li>
            <li onClick={() => {setMenu("kids"); setIsOpen(false); window.scrollTo(0, 0);}} className='relative'>
              <Link to='/kids' className='text-white hover:text-orange font-medium transition-colors'>Kids</Link>
              {menu === "kids" && <div className='h-0.5 bg-orange mt-1'></div>}
            </li>
            {isAdmin && <li onClick={() => {setMenu("admin"); setIsOpen(false); window.scrollTo(0, 0);}} className='relative'>
              <Link to='/admin/listproduct' className='text-white hover:text-orange font-medium transition-colors'>Admin</Link>
              {menu === "admin" && <div className='h-0.5 bg-orange mt-1'></div>}
            </li>}
          </ul>

          <div className='flex items-center gap-4'>
            {localStorage.getItem('auth-token')
              ? <button onClick={() => { localStorage.removeItem('auth-token'); localStorage.removeItem('isAdmin'); toast.info('Logged out successfully'); window.location.replace('/'); }} className='hidden md:block px-5 py-2 rounded hover:opacity-90 transition-all font-bold' style={{backgroundColor: '#FF6B35', color: '#fff'}}>Logout</button>
              : <Link to='/login'><button className='hidden md:block px-5 py-2 rounded hover:opacity-90 transition-all font-bold' style={{backgroundColor: '#FF6B35', color: '#fff'}}>Login</button></Link>}

            <Link to='/cart' className='relative'>
              <img src={cart_icon} alt="Cart" className='w-7 h-7 brightness-0 invert' />
              {getTotalCartItems() > 0 && <div className='absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold' style={{backgroundColor: '#FF6B35', color: '#fff'}}>{getTotalCartItems()}</div>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
