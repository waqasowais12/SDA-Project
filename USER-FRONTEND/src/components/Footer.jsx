import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Social Media Icons
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handleFeedback = () => {
    navigate('/feedback');
};

const handleAboutUs = () => {
  navigate('/about-us');
};

const handleHome = () => {
navigate('/');
};

  return (
    <footer className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white py-12 mt-16 w-full relative">
      {/* Full Width Footer Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* Footer Content */}
      <div className="relative z-10 w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About Us */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-100"><button onClick={handleAboutUs}>About Us</button></h3>
            <p className="text-gray-300">
              We are an online store offering a variety of men's and women's fashion products. Our aim is to provide trendy and affordable clothing to everyone.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={handleHome} className="hover:text-blue-400 transition-all duration-300 ease-in-out">Home</button></li>
              <li><button onClick={handleHome} className="hover:text-blue-400 transition-all duration-300 ease-in-out">Shop</button></li>
              <li><button onClick={handleFeedback} className="hover:text-blue-400 transition-all duration-300 ease-in-out">Feedback</button></li>
            </ul>
          </div>

          {/* Column 3: Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-100">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-110">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-gray-400">
          <p className="text-sm">
            &copy; 2024 YourCompany. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
