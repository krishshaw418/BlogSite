import React from 'react';
import {useState, useEffect} from 'react';
import HamburgerMenu from './HamburgerMenu';
import {Button} from './Button';
import { replace, useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './ui/Sheet';

function Header() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState("");
  useEffect(()=>{
    const getUser = async ()=>{
      try {
        const response = await fetch(`http://localhost:5000/user`, {
          method: 'GET',
          headers:{
            'content-Type' : 'application/json',
          },
          credentials:'include'
        })
        if(!response.ok) throw new Error("Failed to fetch user info!")
          const data = await response.json();
          setUser(data.name);
      } catch (error) {
        return console.log("Error:", error)
      }
    }
    getUser();
  },[])
  return (
    <div className="sticky top-0 z-10 bg-gray-800 bg-opacity-50 shadow-md transition-all duration-300 ease-in-out">
      <div className='flex justify-between items-center p-4'>
      <div>
      <Sheet>
        <SheetTrigger asChild><HamburgerMenu></HamburgerMenu></SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription asChild>
              <div className="flex flex-col space-y-2">
                <Button onClick={()=>{navigate(`/admin/dashboard`)}}>Admin Dashboard</Button>
                <Button onClick={()=>{navigate(`/admin/profile`)}}>Admin Profile</Button>
                <Button onClick={()=>{navigate(`/admin/editor`)}}>Editor</Button>
                <Button>Settings</Button>
                <Button onClick={async ()=>{
                  const response = await fetch(`http://localhost:5000/logout`,{
                    method:'POST',
                    credentials:'include',
                  })
                  const data = await response.json();
                  navigate(`/`,{replace:true})
                }}>Log Out</Button>
              </div>
              </SheetDescription>
          </SheetHeader>
         </SheetContent>
      </Sheet>
      </div>
      <div className="text-3xl">
        Hello {user}!
      </div>
      </div>
    </div>
  );
}
export default Header;