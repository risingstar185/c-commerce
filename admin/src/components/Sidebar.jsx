import React from 'react'

import { IoMdAddCircle } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  let navigate=useNavigate();
  return (
   <div className='w-[14%] min-h-screen border-r border-white py-[60px] fixed left-0 top-0 bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] mt-[70px]'>
  <div className="flex flex-col pt-[40px] pl-[0] text-[15px] gap-6 -mt-[70px]">
     <div className="flex items-center justify-center md:justify-start border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] rounded-lg transition-colors duration-300" onClick={()=>navigate('/')}>
      <IoIosHome className='w-[20px] h-[20px] text-white'/>
      <p className='hidden md:block text-white ml-2'>Home</p>
    </div>
     <div className="flex items-center justify-center md:justify-start border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] rounded-lg transition-colors duration-300" onClick={()=>navigate('/users')}>
      <FaUsers className='w-[20px] h-[20px] text-white'/>
      <p className='hidden md:block text-white ml-2'>Admin User</p>
    </div>
    <div className="flex items-center justify-center md:justify-start border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] rounded-lg transition-colors duration-300" onClick={()=>navigate('/Add')}>
      <IoMdAddCircle className='w-[20px] h-[20px] text-white'/>
      <p className='hidden md:block text-white ml-2'>Add items</p>
    </div>
     <div className="flex items-center justify-center md:justify-start border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] rounded-lg transition-colors duration-300" onClick={()=>navigate('/List')} >
      <FaClipboardList className='w-[20px] h-[20px] text-white'/>
      <p className='hidden md:block text-white ml-2'>List items</p>
    </div>
     <div className="flex items-center justify-center md:justify-start border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] rounded-lg transition-colors duration-300"onClick={()=>navigate('/Orders')} >
      <SiTicktick className='w-[20px] h-[20px] text-white'/>
      <p className='hidden md:block text-white ml-2'>View Orders</p>
    </div>
  </div>
</div>

  )
}

export default Sidebar
