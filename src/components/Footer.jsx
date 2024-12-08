import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook, FaLinkedin} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 bg-opacity-50 text-white my-2 py-4">
      <div className="container mx-auto text-center">
        {/* <h3 className="text-lg font-semibold mb-4">Follow Us</h3> */}
        <p className="text-sm p-4">&copy; {new Date().getFullYear()} E-Cell NIT-A. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://x.com/ecellnita"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition duration-200"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://www.instagram.com/ecellnita/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition duration-200"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.facebook.com/ecellnita"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition duration-200"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.youtube.com/@e-cellnita6756"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 transition duration-200"
          >
            <FaYoutube size={30} />
          </a>
          <a
            href="https://www.linkedin.com/company/ecellnita"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 transition duration-200"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
        {/* <p className="text-sm">&copy; {new Date().getFullYear()} E-Cell NIT-A. All rights reserved.</p> */}
      </div>
    </footer>
  );
};

export default Footer;