import React, { useContext } from "react";
import Logo from '../../../frontend/src/assets/vcart logo.png'
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "../context/AdminContext";



const Nav = () => {
const navigate=useNavigate();
  const {serverUrl}=useContext(AuthDataContext)
 const {getCurrentAdmin}=useContext(AdminDataContext)

const handlelogout=async()=>{
  try {
    const result=await axios.get(serverUrl +'/api/auth/logout',{
      withCredentials:true
    })

    console.log(result.data)
    getCurrentAdmin();
    toast.success("Logout succesfull 👍")
   navigate('/login')
  } catch (error) {
    console.log('logout error',error)
  }
}

  return (
    <>
     <div className="fixed top-0 left-0 w-full h-[70px] bg-[#ecfafaec] z-10 flex items-center justify-between px-6 md:px-16 shadow-md shadow-black">
  <div className="flex items-center gap-3">
    <img src={Logo} alt="ShopEase Logo" className="w-[35px]" />
    <h1 className="text-[22px] md:text-[25px] font-semibold text-black font-sans">
      ShopEase
    </h1> </div>
  <button
    onClick={handlelogout}
    className="text-[15px] bg-[#119de3] hover:bg-[#0cb3ea] text-white px-5 py-2 rounded-lg border-2 border-transparent hover:border-[#0cb3ea] transition-all duration-300"
  >
    Logout
  </button>
</div>

    </>
  );
};

export default Nav;

