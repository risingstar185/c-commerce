import React, { useContext, useState } from 'react'
import Logo from '../assets/vcart logo.png';
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { UserDataContext } from '../context/UserContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthDataContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { IoHome } from "react-icons/io5";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { shopDataConext } from '../context/ShopContext.jsx';

const Nav = () => {

  let { userData, getCurrentUser } = useContext(UserDataContext)
  const {search,setSearch,showSearch,setShowSearch,getCartCount}=useContext(shopDataConext)


  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate();

  const { serverUrl } = useContext(AuthDataContext)
  
  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/auth/logout',

        { withCredentials: true }
      )
      getCurrentUser();
      toast.success('User Logout successfully😒')
      navigate('/login')
      console.log(result.data)

    } catch (error) {
      console.error(error)
      toast.error('logout error:Please try again later.')
    }
  }
  return (
    <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
  {/* --- Left Logo Section --- */}
  <div className="flex items-center justify-start gap-2 pl-[20px] md:pl-[80px]">
    <img src={Logo} alt="ShopEase" className="w-[30px]" />
    <h1 className="text-[22px] md:text-[25px] text-black font-sans font-semibold">ShopEase</h1>
  </div>

  {/* --- Desktop Menu --- */}
  <div className="hidden md:flex">
    <ul className="flex items-center justify-center gap-5 text-black font-semibold">
      <li className="text-[15px] hover:bg-blue-200 px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/')}>Home</li>
      <li className="text-[15px] hover:bg-blue-200 px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/collection')}>Collections</li>
      <li className="text-[15px] hover:bg-blue-200 px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/about')}>About</li>
      <li className="text-[15px] hover:bg-blue-200 px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/contact')}>Contact</li>
    </ul>
  </div>

  {/* --- Right Icons Section --- */}
  <div className="flex items-center justify-end gap-6 md:gap-10 pr-[20px] md:pr-[100px] relative">
    {/* Search */}
    <FaSearch
      className="w-[24px] h-[24px] text-black cursor-pointer"
      onClick={() => {
        setShowSearch(prev => !prev);
        navigate('/collection');
      }}
    />

    {/* User */}
    {!userData ? (
      <FaUserCircle
        className="w-[24px] h-[24px] text-black cursor-pointer"
        onClick={() => setShowProfile(prev => !prev)}
      />
    ) : (
      <div
        className="w-[30px] h-[30px] bg-[#392323] text-white rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setShowProfile(prev => !prev)}
      >
        {userData?.name ? userData.name.slice(0, 1).toUpperCase() : 'A'}
      </div>
    )}

    {/* Cart */}
    <div className="relative hidden md:flex">
      <FaShoppingCart
        className="w-[25px] h-[25px] text-black cursor-pointer"
        onClick={() => navigate('/productdetails/cart')}
      />
      <p className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[10px]">
        {getCartCount()}
      </p>
    </div>
  </div>

  {/* --- Search Bar --- */}
  {showSearch && (
    <div className="w-full h-[80px] bg-[#f5f7f7dd] absolute top-[100%] left-0 flex items-center justify-center px-4">
      <input
        type="text"
        placeholder="Search the item here..."
        className="w-full sm:w-[60%] h-[50px] bg-[#3d5754] rounded-[30px] px-5 text-white placeholder:text-white"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  )}

  {/* --- Profile Dropdown --- */}
  {showProfile && (
    <div className="absolute w-[220px] bg-white text-black top-[110%] right-[4%] border border-gray-400 rounded-lg z-10 shadow-md">
      <ul className="divide-y divide-gray-200">
        {!userData && (
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              navigate('/login');
              setShowProfile(false);
            }}
          >
            Login
          </li>
        )}
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate('/about')}
        >
          About
        </li>
        {userData && (
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              handleLogout();
              setShowProfile(false);
            }}
          >
            Logout
          </li>
        )}
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate('/order')}
        >
          Orders
        </li>
      </ul>
    </div>
  )}

  {/* --- Mobile Bottom Nav --- */}
  <div className="w-full h-[70px] bg-[#191818] text-white fixed bottom-0 left-0 flex items-center justify-around md:hidden">
    <button
      className="flex flex-col items-center justify-center gap-1"
      onClick={() => navigate('/')}
    >
      <IoHome className="w-[25px] h-[25px]" />
      <span className="text-[12px]">Home</span>
    </button>

    <button
      className="flex flex-col items-center justify-center gap-1"
      onClick={() => navigate('/contact')}
    >
      <MdContacts className="w-[25px] h-[25px]" />
      <span className="text-[12px]">Contact</span>
    </button>

    <button
      className="flex flex-col items-center justify-center gap-1"
      onClick={() => navigate('/collection')}
    >
      <HiOutlineCollection className="w-[25px] h-[25px]" />
      <span className="text-[12px]">Collection</span>
    </button>

    <button
      className="flex flex-col items-center justify-center gap-1"
      onClick={() => navigate('/productdetails/cart')}
    >
      <FaShoppingCart className="w-[25px] h-[25px]" />
      <span className="text-[12px]">Cart</span>
    </button>
  </div>
</div>

  )
}

export default Nav
