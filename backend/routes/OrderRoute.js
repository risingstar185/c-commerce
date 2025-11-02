import express from "express";
import { allOrders, PlaceOrder, PlaceOrderRazorpay, updateOrder, userOrder, verifyPayment } from "../controller/orderController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from '../middleware/adminAuth.js'

const orderRoute = express.Router();

//users
orderRoute.post("/placeorder", isAuth, PlaceOrder);
orderRoute.post("/razorpay", isAuth, PlaceOrderRazorpay);
orderRoute.post("/verifyrazorpay", isAuth, verifyPayment);
orderRoute.post("/userorder", isAuth, userOrder);


//update admin

orderRoute.post("/list", adminAuth, allOrders);

orderRoute.post("/updatestatus", adminAuth, updateOrder);
export default orderRoute;
