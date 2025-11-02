import React from 'react'
import logo from '../assets/vcart logo.png'


const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] text-black mt-[75px]">
  {/* Footer content */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-6">
    
    {/* --- Brand Section --- */}
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-3 mb-3">
        <img src={logo} alt="OneCart Logo" className="w-10 h-10 md:w-12 md:h-12" />
        <p className="text-xl font-bold">OneCart</p>
      </div>
      <p className="text-sm md:text-base text-[#1e2223] hidden md:block leading-relaxed">
        OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery — all backed by trusted services designed to make your life easier every day.
      </p>
      <p className="text-sm text-[#1e2223] md:hidden">
        Fast, Easy, Reliable — OneCart Shopping.
      </p>
    </div>

    {/* --- Pages Section --- */}
    <div className="flex flex-col items-center text-center">
      <p className="text-lg font-semibold mb-3">Pages</p>
      <ul className="space-y-2">
        {["Home", "About", "Collection", "Contact", "Policy"].map((item, idx) => (
          <li
            key={idx}
            className="text-sm md:text-base font-medium cursor-pointer hover:text-white transition-all"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* --- Contact Section --- */}
    <div className="flex flex-col items-center text-center">
      <p className="text-lg font-semibold mb-3">Get In Touch</p>
      <ul className="space-y-2">
        <li className="text-sm md:text-base font-medium"> +91-8747368747</li>
        <li className="text-sm md:text-base font-medium"> onecart84@gmail.com</li>
        <li className="text-sm md:text-base font-medium"> +91-39284381348</li>
        <li className="text-sm md:text-base font-medium">patelayush@gmail.com</li>
        <li className="text-sm md:text-base font-semibold text-black">Thank You!</li>
      </ul>
    </div>
  </div>

  {/* Divider */}
  <div className="w-full h-[1px] bg-gray-300"></div>

  {/* Copyright */}
  <div className="w-full text-center py-4 text-sm text-gray-800">
    © 2025 <span className="font-semibold">OneCart.com</span> — All Rights Reserved
  </div>
</div>

  )
}

export default Footer
