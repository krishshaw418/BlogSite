import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import {Button} from './Button';
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
                <Button>Admin Dashboard</Button>
                <Button>Admin Profile</Button>
                <Button>Editor</Button>
                <Button>Settings</Button>
                <Button>Log Out</Button>
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
