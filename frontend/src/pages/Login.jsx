import React, { useState, useContext } from 'react'
import Logo from '../assets/vcart logo.png';
import { useNavigate } from 'react-router-dom';
import google from '../assets/vcart logo.png'; // You can replace this with the actual Google logo later
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { AuthDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../utils/Firebase'
import { UserDataContext } from '../context/UserContext';
import { motion } from "framer-motion";


const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { serverUrl } = useContext(AuthDataContext);
  const provider = new GoogleAuthProvider();
  const { getCurrentUser } = useContext(UserDataContext);


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + '/api/auth/login', {
        email,
        password
      }, { withCredentials: true })
      toast.success('login Successful 👍')

      setEmail('')
      setPassword('')
      getCurrentUser();
      navigate('/')
      console.log(result.data)
    } catch (error) {
      toast.error('login error:Please try again later.')
    }
  }
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Correct properties from Firebase
      const name = user.displayName;
      const email = user.email;

      // Send to backend
      const response = await axios.post(`${serverUrl}/api/auth/gooleLogin`, {
        name,
        email,
      }, { withCredentials: true });

      console.log(response.data);
      toast.success(`Welcome ${user.displayName}! 🎉`);
      console.log("User Info:", user);

      navigate('/');

    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed!");
    }
  };

  return (
      <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        
          >
    <div className="w-screen h-screen  bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] text-white flex flex-col items-center justify-start">
      {/* Header */}
      <div
        className="w-full h-20 flex items-center justify-start px-8 gap-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img className="w-10" src={Logo} alt="OneCart Logo" />
        <h1 className="text-[22px] font-sans font-semibold">OneCart</h1>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-2 mt-4">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px] text-gray-300">
          Welcome Back to OneCart , find your order?
        </span>
      </div>

      {/* Registration Box */}
      <div className="max-w-[600px] w-[90%] h-auto bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center mt-6">
        <form
          onSubmit={handleLogin}
          className="w-[90%] flex flex-col items-center justify-start gap-6 py-8"
        >
          {/* Google Login */}
          <div className="w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-[#557f86] transition-all" onClick={handleGoogleLogin}>
            <img src={google} alt="Google logo" className="w-5" />
            <span>Login with Google</span>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-3 mt-4">
            <div className="w-[40%] h-[1px] bg-[#96969635]" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="w-[40%] h-[1px] bg-[#96969635]" />
          </div>

          {/* Input Fields */}
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-4">

            <input
              type="email"
              className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 focus:outline-none focus:border-[#6060f5]"
              placeholder="Enter your email..."
              required onChange={(e) => setEmail(e.target.value)} value={email}
            /> <input
              type={show ? 'text' : "password"}
              className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 focus:outline-none focus:border-[#6060f5]"
              placeholder="Enter your password..."
              required onChange={(e) => setPassword(e.target.value)} value={password}
            /> {!show && <IoMdEyeOff className='w-[20px] h[20px] cursor-pointer absolute  bottom-[40%] right-[6%]' onClick={() => setShow(prev => !prev)} />}
            {show && <FaEye className='w-[20px] h[20px] cursor-pointer absolute bottom-[40%] right-[6%]' onClick={() => setShow(prev => !prev)} />}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#6060f5] hover:bg-[#4a4ae3] rounded-lg mt-4 text-[17px] font-semibold transition-all"
            >
              Login
            </button>

            {/* Login Redirect */}
            <p className="text-sm text-black-500 mt-2">
              You have no account?{' '}
              <span
                className="text-[#5555f6cf] font-semibold text-black cursor-pointer hover:underline"
                onClick={() => navigate('/Signup')}
              >
                Create Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
    </motion.h1>
  );
}

export default Login
