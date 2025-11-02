import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../frontend/src/assets/vcart logo.png';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthDataContext } from '../context/AuthContext';
import { getCurrentAdmin } from '../../../backend/controller/userController';
import { AdminDataContext } from '../context/AdminContext';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();
const{getCurrentAdmin}=useContext(AdminDataContext)


  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminLogin`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(' admin Login Successful 👍');
      setEmail('');
      setPassword('');
      navigate('/');
      getCurrentAdmin()
      console.log(result.data);
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error(error.response?.data?.message || 'Invalid Email and password.');
    }
  };

  return (
    <div className="w-screen h-screen  bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] text-white flex flex-col items-center justify-start">
      {/* Header */}
      <div className="w-full h-20 flex items-center justify-start px-8 gap-3 cursor-pointer">
        <img className="w-10" src={Logo} alt="OneCart Logo" />
        <h1 className="text-[22px] font-sans font-semibold">OneCart</h1>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-2 mt-4">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px] text-gray-300">
          Welcome Back to OneCart, Apply to Admin Login?
        </span>
      </div>

      {/* Login Box */}
      <div className="max-w-[400px] w-[90%] h-auto bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center mt-6">
        <form
          onSubmit={handleAdminLogin}
          className="w-[90%] flex flex-col items-center justify-start gap-6 py-8"
        >
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-4">
            {/* Email Input */}
            <input
              type="email"
              className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 focus:outline-none focus:border-[#6060f5]"
              placeholder="Enter your email..."
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password Input with Eye Icon */}
            <div className="w-full relative">
              <input
                type={show ? 'text' : 'password'}
                className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 focus:outline-none focus:border-[#6060f5]"
                placeholder="Enter your password..."
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {!show ? (
                <IoMdEyeOff
                  className="w-[22px] h-[22px] cursor-pointer text-black absolute top-[50%] right-[5%] transform -translate-y-1/2"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <FaEye
                  className="w-[22px] h-[22px] cursor-pointer text-black absolute top-[50%] right-[5%] transform -translate-y-1/2"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#6060f5] hover:bg-[#4a4ae3] rounded-lg mt-4 text-[17px] font-semibold transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
