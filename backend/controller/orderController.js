import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import  Razorpay  from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const currency = "INR";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export const PlaceOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // Razorpay needs amount in paise
      currency: currency,
      receipt: newOrder._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

 export const verifyPayment=async(req,res)=>{
  try {
    const userId=req.userId;
    const {razorpay_order_id}=req.body;
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==='paid'){
      await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      await User.findByIdAndUpdate(userId,{cartData:{}})
      res.status(200).json({message:'Payment Successful'})
    }
    else{
      res.json({message:'Payment Failed'})
    }
  } catch (error) {
    console.log(error)
        res.status(501).json({message:'Payment verification failed'})
  }
}





export const PlaceOrder = async (req, res) => {
  try {
    const { items, address,amount } = req.body;
    const userId = req.userId; // coming from isAuth middleware

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Cash On Delivery",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

export const userOrder=async(req,res)=>{
  try {
  
  const userId=req.userId;
  const orders =await Order.find({userId})
return res.status(201).json(orders)
 } catch (error) {
    console.error(error)
    return res.status(501).json({message:
     ' failed to get order'
    })
  }
}

export const allOrders=async(req,res)=>{
  try {
  const orders =await Order.find({})
return res.status(201).json(orders)
 } catch (error) {
    console.error(error)
    return res.status(501).json({message:
     'admin  failed to get all order'
    })
  }
}

export const updateOrder=async(req,res)=>{
  try {
  
const {orderId,status}=req.body;

 await Order.findByIdAndUpdate(orderId,{status})

 
return res.status(200).json({message:'status update successfully'})
 } catch (error) {
    console.error(error)
    return res.status(501).json({message:
     ' status update error'
    })
  }
}


// 🧮 Get total successful payments
export const getTotalPayment = async (req, res) => {
  try {
    // Find all paid orders
    const paidOrders = await Order.find({ payment: true });

    // Sum all amounts
    const totalPayment = paidOrders.reduce((sum, order) => sum + order.amount, 0);

    res.status(200).json({
      success: true,
      totalPayment,
      totalOrders: paidOrders.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};