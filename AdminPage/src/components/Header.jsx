import React from 'react';
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
        Hello Admin!
      </div>
      </div>
    </div>
  );
}

export default Header;
