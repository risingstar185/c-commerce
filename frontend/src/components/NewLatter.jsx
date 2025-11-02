import React, { useState } from 'react';
import Title from './Title';
import { toast } from 'react-toastify';

const NewLatter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter a valid email');
      return;
    }

    toast.success('Email has been sent successfully!');
    setEmail('');
  };

  return (
   <div className="w-full bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] flex flex-col items-center justify-center py-12 px-4 md:px-8">
  {/* Heading and Description */}
  <div className="text-center w-full max-w-3xl">
    <Title text2="Subscribe now & get 20% off" />
    <p className="text-sm sm:text-base md:text-lg text-black mt-3 px-2 sm:px-6">
      Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
    </p>
  </div>

  {/* Form Section */}
  <form
    onSubmit={handleSubmit}
    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-xl px-2"
  >
    <input
      type="email"
      placeholder="Enter your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="placeholder:text-gray-700 border border-gray-400 bg-slate-200 w-full sm:flex-1 h-[45px] px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2b26ac]"
      required
    />
    <button
      type="submit"
      className="text-sm md:text-base px-6 py-3 bg-[#2e3030c9] text-white hover:bg-[#1f1f1f] rounded-lg shadow-md transition-all duration-200 w-full sm:w-auto"
    >
      Subscribe
    </button>
  </form>

  {/* Footer Message */}
  <p className="text-xs sm:text-sm text-gray-800 mt-6 text-center px-4">
    We respect your privacy. No spam, only great offers ✨
  </p>
</div>

  );
};

export default NewLatter;
