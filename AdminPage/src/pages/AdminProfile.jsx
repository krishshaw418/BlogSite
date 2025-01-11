import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
function AdminProfile() {
    const [user, setUser] = useState({
        username:'',
        email:''
    })

    useEffect(()=>{
        const getUser = async () =>{
            try {
                const response = await fetch(`http://localhost:5000/user?email=amanshaw@gmail.com`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    credentials:'include',
                })
                if(!response.ok)
                    throw new Error('An error occured!')
                const data = await response.json();
                setUser({username:data.name, email:data.email})
            } catch (error) {
                console.error('Server Error: ',error);
            }
        }
        getUser();
    },[])

  return (
    <div>
        <Header></Header>
        <p>Name:{user.username}</p>
        <p>Email:{user.email}</p>
    </div>
  )
}

export default AdminProfile