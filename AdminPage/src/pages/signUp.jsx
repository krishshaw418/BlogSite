import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// require('dotenv').config();
// const port = process.env.REACT_APP_PORT;
import { Button, buttonVariants } from '../components/Button';
function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

const handleSubmit = async (e) =>{

    e.preventDefault();

    if(loading) return;
    setLoading(true);

    try {
        const response = await fetch(`http://localhost:5000/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        if(response.ok){
            const data = await response.json();
            alert(data.message);
            setUserData({
                name: '',
                email: '',
                password: ''
            });
            navigate('/admin/dashboard', { replace: true });
        }
        else{
            const errorData = await response.json();
                alert(errorData.message || "Invalid credentials");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to sign up");
    }finally{
        setLoading(false);
    }
}

const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  return (
    <div>
        <div className="min-h-screen flex flex-col gap-2 items-center justify-center px-4 sm-px-10">
        <h1 className='text-3xl font-bold text-center'>Welcome to Entrepreneurial Horizon!</h1>
        <h2 className='text-2xl font-bold text-center'>Please Sign Up</h2>
        <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} autoComplete="name" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} autoComplete="email" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} autoComplete="password" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4">Sign Up</Button>
        </form>
        <span>Already have an account? <a href="/signIn" className='text-blue-500'>SignIn</a></span>
        </div>
    </div>
  )
}

export default SignUp