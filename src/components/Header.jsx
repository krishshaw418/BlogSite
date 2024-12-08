import React from 'react';
import logoWhite from '../assets/Logo White.png';
import logoYoutube from '../assets/Youtube_logo.png';

function Header() {
  return (
    <div className="sticky top-0 z-10 bg-gray-800 bg-opacity-50 shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4">
        <img src={logoWhite} className="w-[80px] p-2" alt="Logo" />
        <ul className="text-white flex gap-4 md:gap-14">
          <a href="https://www.ecellnita.in/">
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
        <a href="https://www.youtube.com/@e-cellnita6756">
        <button className="text-white font-bold bg-opacity-50 py-2 px-4 rounded hover:bg-red-800 transition-all flex gap-2 items-center">
          <div>
            <img src={logoYoutube} className="w-[50px]" alt="error" />
          </div>
          <div>YouTube</div>
        </button>
        </a>
      </div>
    </div>
  );
}

export default Header;
