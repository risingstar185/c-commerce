import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import axios from "axios";
import { shopDataConext } from "../context/ShopContext";
import { AuthDataContext } from "../context/AuthContext";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataConext);
  const { serverUrl } = useContext(AuthDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/userorder`,
        {},
        { withCredentials: true }
      );

      console.log("📦 Orders fetched:", result.data);

      if (result.data) {
        const allOrdersItem = [];

        result.data.forEach((order) => {
          // ✅ Fix: Use order.items (not order.data)
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach((item) => {
              item.status = order.status;
              item.payment = order.payment;
              item.paymentMethod = order.paymentMethod;
              item.date = order.date;
              allOrdersItem.push(item);
            });
          } else {
            console.warn("⚠️ order.items is missing in:", order);
          }
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="min-h-screen p-5 pb-[150px] overflow-hidden bg-gradient-to-br from-[#50b8c4] to-[#2b26ac] mt-[70px]">
      <div className="text-center mt-[80px] rounded-2xl">
        <Title text1="Delivery" text2="Information" />
      </div>

      <div className="w-full flex flex-wrap gap-5 mt-10">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="w-[100%] h-[10%] md:w-[48%] bg-[#51808048] flex items-center gap-4 p-4 rounded-2xl"
            >
              <img
                src={item.image1}
                alt={item.name}
                className="w-[100px] h-[140px] rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-gray-200">
                  Size: {item.size} | Qty: {item.quantity}
                </p>
                <p className="text-gray-300 ">
                  {currency} {item.price * item.quantity}
                </p>
                <p className="text-green-500 font-semibold">
                  Status: {item.status} 
                </p>
                <p className="text-gray-300 ">
                  Payment: {item.paymentMethod}
                </p>
                 <p className="text-black-300 ">
                Date: {new Date(item.date).toDateString()}
                </p>
                    
              </div>
                <p className="ml-[220px]">
                <button className="px-[15px] py-[10px] rounded-sm bg-[#101919] hover:bg-slate-400 text-white text-[12px] cursor-pointer" onClick={loadOrderData}>Track Order
                  </button> </p>
        
            </div>
          ))
        ) : (
          <p className="text-white mt-10 text-center w-full">
            🛒 No orders found yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;
