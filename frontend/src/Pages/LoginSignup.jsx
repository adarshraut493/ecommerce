import React, { useState } from 'react'
import { toast } from 'react-toastify';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    let responseData;
    await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('isAdmin', responseData.isAdmin || false);
      toast.success('Login successful!');
      window.location.replace("/");

    } else {
      toast.error(responseData.errors || 'Login failed');
    }
  }

  const signup = async () => {
    console.log("signup function", formData);
    let responseData;
    await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      toast.success('Account created successfully!');
      window.location.replace("/");
    } else {
      toast.error(responseData.error || 'Signup failed');
    }
  }

  return (
    <div className='bg-light min-h-screen flex items-center justify-center py-8 md:py-12 px-4'>
      <div className='bg-white p-6 md:p-12 rounded border border-gray-300 shadow-md w-full max-w-md'>
        <h1 className='text-3xl md:text-4xl font-black text-center text-primary mb-6 md:mb-10'>{state}</h1>
        <div className='space-y-4 md:space-y-5 mb-6 md:mb-8'>
          {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' className='w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange bg-white text-gray-800 placeholder-gray-400 text-sm md:text-base' />}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' className='w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange bg-white text-gray-800 placeholder-gray-400 text-sm md:text-base' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' className='w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange bg-white text-gray-800 placeholder-gray-400 text-sm md:text-base' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }} className='w-full bg-orange text-white py-3 md:py-5 rounded hover:bg-orange-600 transition-all font-black text-base md:text-lg mb-4 md:mb-6 shadow-md'>Continue →</button>
        {state === "Sign Up" ? 
          <p className='text-center text-gray-700 font-medium text-sm md:text-base'>Already have an Account? <span onClick={() => { setState("Login") }} className='text-orange font-bold cursor-pointer hover:underline'>Login here</span></p>
          : <p className='text-center text-gray-700 font-medium text-sm md:text-base'>Create an account <span onClick={() => { setState("Sign Up") }} className='text-orange font-bold cursor-pointer hover:underline'>Click here</span></p>}
        <div className='flex items-start gap-2 md:gap-3 mt-6 md:mt-8 p-3 md:p-4 bg-gray-50 rounded border border-gray-200'>
          <input type="checkbox" className='mt-1 w-4 h-4 md:w-5 md:h-5' />
          <p className='text-xs md:text-sm text-gray-700'>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup

