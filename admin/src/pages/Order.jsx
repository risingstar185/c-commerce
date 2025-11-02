import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { AuthDataContext } from '../context/AuthContext';
import axios from 'axios';
import { IoLogoDropbox } from "react-icons/io5";
import { toast } from 'react-toastify';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  // Fetch all orders (admin)
  const fetchOrders = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setOrders(result.data.reverse());
    } catch (error) {
      console.log('Error fetching orders:', error);
      toast.error("Failed to fetch orders");
    }
  };

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.post(
        `${serverUrl}/api/order/updatestatus`,
        { orderId, status: newStatus },
        { withCredentials: true }
      );
      toast.success("Status updated successfully!");
      fetchOrders(); // refresh list
    } catch (error) {
      console.log("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] animate-gradient-x flex">
      <Nav />
      <Sidebar />

      <div className="w-full md:w-[82%] h-full absolute  ml-[20px] md:right-0 px-10 md:px-15 pt-20 overflow-y-auto">
        <h1 className="text-[25px] md:text-[40px] text-white mb-6 font-semibold">
          All Listed Orders
        </h1>

        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="w-full bg-slate-700/60 rounded-xl flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between p-4 md:px-6 mb-6 text-white transition-all duration-300 hover:bg-slate-700/80"
            >
              {/* Left: Icon */}
              <div className="flex justify-center md:justify-start items-center">
                <IoLogoDropbox className="w-[90px] h-[90px] text-black p-3 rounded-lg bg-white" />
              </div>

              {/* Middle: Order info */}
              <div className="flex flex-col gap-2 text-sm md:text-base px-[50px] md:w-[40%]">
                <div className="flex flex-col gap-[4px]">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name.toUpperCase()} × {item.quantity}{' '}
                      <span className="opacity-80">({item.size})</span>
                    </p>
                  ))}
                </div>

                <div className="text-green-100 text-sm mt-2 leading-5">
                  <p>{order.address.firstName + ' ' + order.address.lastName}</p>
                  <p>{order.address.street}, {order.address.city}</p>
                  <p>
                    {order.address.state}, {order.address.country} - {order.address.pinCode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Right: Summary + Status */}
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm md:text-base">
                <p>Items: <span className="font-semibold">{order.items.length}</span></p>
                <p>Payment: <span className="font-semibold">{order.paymentMethod}</span></p>
                <p>Status: <span className="font-semibold">{order.payment ? 'Done' : 'Pending'}</span></p>
                <p>Date: <span className="font-semibold">{new Date(order.date).toLocaleDateString()}</span></p>
                <p>Total: <span className="font-semibold text-green-400">₹{order.amount}</span></p>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="px-3 py-2 w-[150px] rounded-md bg-slate-600 border border-slate-400 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out of Delivery">Out of Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/70 text-lg">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
