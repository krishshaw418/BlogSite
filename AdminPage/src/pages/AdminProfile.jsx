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

    const handleImageUpload = () => {
        alert("Upload functionality not implemented yet!");
      };

  return (
    <div>
      <Header></Header>
      <div className="min-h-screen flex flex-col gap-2 items-center justify-center px-4 sm-px-10">
      <div>
      <span><p>Name: {user.username}</p></span>
      <span><p>Email: {user.email}</p></span>
      </div>
    </div>
    </div>
  )
}

export default AdminProfile