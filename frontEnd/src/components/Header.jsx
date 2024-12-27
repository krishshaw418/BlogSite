import React from 'react';
import logoWhite from '../assets/Logo White.png';
import logoYoutube from '../assets/Youtube_logo.png';

function Header() {
  return (
    <div className="sticky top-0 z-10 bg-gray-800 bg-opacity-50 shadow-md transition-all duration-300 ease-in-out">
      <div className="flex items-center px-4">
        <img src={logoWhite} className="w-[80px] p-2" alt="Logo" />
        <div className='container'>
        <ul className="text-white flex justify-center gap-4 md:gap-14">
          <a href="/">
            <li className="hover:font-bold cursor-pointer">Home</li>
          </a>
          <a href="#about">
            <li className="hover:font-bold cursor-pointer">About Us</li>
          </a>
          <a href="#blogs">
          <li className="hover:font-bold cursor-pointer">Blogs</li>
          </a>
          <a href="#contact">
          <li className="hover:font-bold cursor-pointer">Contact Us</li>
          </a>
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
