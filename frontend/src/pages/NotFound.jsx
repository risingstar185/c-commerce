import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[80px] md:text-[120px] font-bold text-white drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[20px] md:text-[28px] text-white/90 font-semibold mb-6"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-white text-[#2b26ac] font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Go Back Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 text-white/70 text-sm"
      >
        © {new Date().getFullYear()} E-Cart. All rights reserved.
      </motion.div>
    </div>
  );
};

export default NotFound;
