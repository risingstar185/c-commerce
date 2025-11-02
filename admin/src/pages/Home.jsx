import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import { useEffect } from "react";
import axios from 'axios'
import { motion } from "framer-motion";


const Home = () => {

  const[totalProduct,setTotalProduct]=useState(0)
  const [totalOrders,setTotalOrders]=useState(0)
const {serverUrl}=useContext(AuthDataContext)
const [user,setUsers]=useState(0)
const [totalPayment, setTotalPayment] = useState(0);




console.log(totalProduct)
const fetchCount=async()=>{
  try {
  const result = await axios.get(serverUrl + "/api/product/list");

setTotalProduct(result.data.products.length);


    const orders=await axios.post(serverUrl +'/api/order/list',{},{withCredentials:true})
    setTotalOrders(orders.data.length);

     const res = await axios.get(`${serverUrl}/api/admin/users`, {
        withCredentials: true,
      });
      setUsers(res.data.length);

       const payment = await axios.get(`${serverUrl}/api/admin/totalpayment`, {
          withCredentials: true,
        });
        setTotalPayment(payment.data.totalPayment);
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  fetchCount()
},[])

  return (
     <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        
      >
    <div className="w-screen h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac]
      bg-[length:200%_200%] animate-gradient-x flex flex-col md:flex-row mt-[70px] overflow-hidden">
 
      
    
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-8 text-white overflow-y-auto">
        <Nav />

        {/* Welcome Message */}
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back, Admin 👋</h1>
          <p className="text-gray-300">Here’s a quick overview of your store performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 w-full max-w-5xl">
          <div className="bg-[#61a8d1] p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaUsers className="text-[#5eead4] text-3xl mb-3" />
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl font-bold">{user}</p>
          </div>

          <div className="bg-[#61a8d1] p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaBoxOpen className="text-[#fde68a] text-3xl mb-3" />
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-2xl font-bold">{totalProduct}</p>
          </div>

          <div className="bg-[#61a8d1] p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaShoppingCart className="text-[#93c5fd] text-3xl mb-3" />
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>

          <div className="bg-[#61a8d1] p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaMoneyBillWave className="text-[#86efac] text-3xl mb-3" />
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-2xl font-bold">₹{totalPayment}</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-[#61a8d1] w-full max-w-5xl mt-10 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-3 text-gray-300">
            <li>🛍️ New order received from <span className="text-white font-medium">Ayush Patel</span></li>
            <li>📦 Product <span className="text-white font-medium">"Wireless Earbuds"</span> stock updated.</li>
            <li>💰 Payment of ₹2,499 received via Razorpay.</li>
            <li>👤 New user <span className="text-white font-medium">Riya Sharma</span> joined.</li>
          </ul>
        </div>
      </div>
    </div>
        </motion.h1>
  );
};

export default Home;
