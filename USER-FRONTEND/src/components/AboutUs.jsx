import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();
    const handleStartShopping = () => {
        navigate('/');
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E849A0] via-[#B453E6] to-[#5B74F6] p-6">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <motion.div
          className="bg-cover bg-center h-64"
          style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20210911/pngtree-happy-girl-on-a-shopping-spree-image_860818.jpg')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <div className="p-8">
          <motion.h1
            className="text-4xl font-bold text-gray-800 mb-4 text-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-[#E849A0]">Us</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 leading-relaxed mb-6 text-justify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to <strong>Fashionista</strong>, your one-stop destination for all things fashion. Our mission is
            to empower individuals to express themselves through clothing and accessories that resonate with their
            personality. From trendy apparel to timeless classics, we offer a diverse range of high-quality products
            curated just for you.
          </motion.p>
          <motion.p
            className="text-lg text-gray-700 leading-relaxed mb-6 text-justify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            At Fashionista, we believe that fashion is not just about style—it's about identity. We source our
            collections from the finest designers and brands to bring you the latest trends and timeless pieces. Our
            categories include Men's Fashion, Women's Fashion, and Accessories, catering to all styles and occasions.
          </motion.p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <motion.div
              className="w-full md:w-1/3 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-[#B453E6] mb-2">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize the fashion industry by making high-quality, affordable fashion accessible to everyone.
              </p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/3 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-[#5B74F6] mb-2">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To inspire confidence and self-expression through innovative designs and exceptional customer service.
              </p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/3 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-[#E849A0] mb-2">Why Choose Us</h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize quality, style, and affordability while offering a seamless shopping experience.
              </p>
            </motion.div>
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={handleStartShopping}
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#E849A0] via-[#B453E6] to-[#5B74F6] text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
