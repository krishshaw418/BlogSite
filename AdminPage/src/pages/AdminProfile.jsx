import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
function AdminProfile() {
    const [user, setUser] = useState(null);
    const [image, setimage] = useState(null);
    useEffect(()=>{
        const getUser = async () =>{
            try {
                const response = await fetch(`http://localhost:5000/user`,{
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
      {/* <div className="min-h-screen flex flex-col gap-2 items-center justify-center px-4 sm-px-10">
      <div>
      <span><p>Name: {user.username}</p></span>
      <span><p>Email: {user.email}</p></span>
      </div>
      </div> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {user ? (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="w-32 h-32 mb-4 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={
                    image
                      ? `https://<your-s3-bucket-name>.s3.amazonaws.com/${image}` // Replace with your S3 bucket name
                      : "https://via.placeholder.com/150?text=Profile+Pic"
                  }
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </label>
            <input
              id="imageUpload"
              type="file"
              className="hidden"
              accept="image/*"
            //   onChange={handleImageUpload}
            //   disabled={loading}
            />
            {/* {loading && <p className="text-sm text-blue-500">Uploading...</p>} */}
          </div>

          {/* User Info */}
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Loading user data...</p>
      )}
    </div>
    </div>
  )
}

export default AdminProfile