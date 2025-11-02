import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CardTotal from "../components/CardTotal";
import razorpayLogo from "../assets/rozarpay.png";
import { shopDataConext } from "../context/ShopContext";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const { products, delivery_fee, getCartAmount, cartItem,setCartItem } =
    useContext(shopDataConext);
    const navigate=useNavigate()
  const { serverUrl } = useContext(AuthDataContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  console.log(cartItem)
  console.log(getCartAmount())
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleRazorpayPayment = async (orderData) => {
  try {
    // Step 1: Create order on backend
    const res = await axios.post(
      `${serverUrl}/api/order/razorpay`,
      orderData,
      { withCredentials: true }
    );

    const order = res.data;
    console.log("Razorpay Order Created:", order);

    // Step 2: Initialize Razorpay payment
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Payment for your order",
      order_id: order.id, // comes from Razorpay response
      handler: async function (response) {
        console.log("Payment success:", response);

       const data=await axios.post(serverUrl +'/api/order/verifyrazorpay',response,{withCredentials:true})

       if(data){
        navigate('/order')
        setCartItem({})
       }
       toast.success('payment verify succesful👍')
      },
    
      theme: {
        color: "#3399cc",
      },
        method: {
    upi: true, // ✅ ensure this
    card: true,
    netbanking: true,
    wallet: true,
  },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment error:", error);
  }
};


const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const orderItems = []; // ✅ Must be inside try so it’s accessible below

    console.log("📦 CartItem object:", cartItem);
    console.log("🛍️ Products object:", products);

    // 🧩 Build orderItems from cartItem (both are objects)
    for (const productId in cartItem) {
      const productData = Array.isArray(products)
        ? products.find((p) => String(p._id) === String(productId))
        : products.products?.find((p) => String(p._id) === String(productId));

      console.log("🔹 Checking productId:", productId, "→ productData:", productData);

      if (!productData) {
        console.warn("⚠️ Product not found for id:", productId);
        continue;
      }

      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        console.log(`📏 Size: ${size} | Qty: ${quantity}`);

        if (quantity > 0) {
          const itemInfo = structuredClone(productData);
          itemInfo.size = size;
          itemInfo.quantity = quantity;
          orderItems.push(itemInfo);
          console.log("✅ Item added:", itemInfo);
        } else {
          console.log(`⚠️ Skipped size "${size}" with quantity 0`);
        }
      }
    }

    console.log("🧾 Final orderItems array:", orderItems);

    // ✅ Check empty cart
    if (orderItems.length === 0) {
      toast.warn("🛒 Please add at least one item to your cart!");
      console.warn("❌ No items in cart — aborting order placement");
      return;
    }

    // ✅ Create order payload
    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + (delivery_fee || 0),
    };

    console.log("📦 Final orderData to send:", orderData);

    // ✅ Choose payment method
    switch (method) {
      case "COD":
        const result = await axios.post(
          `${serverUrl}/api/order/placeorder`,
          orderData,
          { withCredentials: true }
        );
        if(result.data){
        navigate('/order')
        setCartItem({})
        setFormData('')
        }
        console.log("Order placed:", result.data);
        toast.success("✅ Order placed successfully!");
        break;

      case "razorpay":
       await handleRazorpayPayment(orderData);
  
        break;

      default:
        toast.warn("⚠️ Please select a valid payment method!");
        break;
    }
  } catch (error) {
    console.error("❌ Error placing order:", error);
    toast.error("Something went wrong while placing your order!");
  }
};

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#50b8c4] to-[#2b26ac] py-10 px-6 flex flex-col lg:flex-row items-start justify-center gap-12 mt-[70px]">
      {/* Delivery Form */}
      <div className="lg:w-[50%] w-full max-w-[600px] bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <Title text1={"Delivery"} text2={"Information"} />
        <form onSubmit={onSubmitHandler} className="space-y-4 mt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            required
          />

          <input
            type="text"
            placeholder="Street Address"
            className="w-full h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            required
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="City"
              className="flex-1 h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="flex-1 h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              placeholder="Pin Code"
              className="flex-1 h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
              onChange={onChangeHandler}
              name="pinCode"
              value={formData.pinCode}
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="flex-1 h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              required
            />
          </div>

          <input
            type="number"
            placeholder="Phone Number"
            className="w-full h-[48px] rounded-lg px-4 outline-none border border-white/30 bg-white/10 text-white placeholder:text-gray-300 focus:border-blue-400"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
          />
         

       <button
            type="submit"
            className="w-full h-[50px] bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-semibold mt-4"
          >
            Place Order
          </button>

        </form>
      </div>

      {/* Payment Section */}
      <div className="lg:w-[50%] w-[100%] flex flex-col items-center">
        <CardTotal />
        <div className="py-[15px]">
          <Title text1={"Payment"} text2={"Method"} />
        </div>
        <div className="flex gap-6 mt-4">
          <button
            onClick={() => setMethod("razorpay")}
            className={`w-[150px] h-[60px] rounded-md overflow-hidden border-4 ${method === "razorpay" ? "border-blue-900" : "border-transparent"}`}
          >
            <img src={razorpayLogo} alt="Razorpay" className="w-full h-full object-contain" />
          </button>
          <button
            onClick={() => setMethod("COD")}
            className={`w-[150px] h-[60px] rounded-md text-white font-medium bg-gray-700 ${
              method === "COD" ? "border-4 border-blue-900" : ""
            }`}
          >
            Cash On Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
