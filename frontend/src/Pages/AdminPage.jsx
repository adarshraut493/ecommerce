import React from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ListProduct from '../Components/Admin/ListProduct/ListProduct'
import AddProduct from '../Components/Admin/AddProduct/AddProduct'

const AdminPage = () => {
    return (
        <div className='flex bg-gray-50 min-h-screen'>
            <Sidebar />
            <div className='flex-1'>
                <Routes>
                    <Route path='/addproduct' element={<AddProduct />} />
                    <Route path='/listproduct' element={<ListProduct />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPage
