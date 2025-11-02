import express from "express";
import { getAllUsers } from "../controller/adminController.js";
import adminAuth  from "../middleware/adminAuth.js"; // optional if you have admin check middleware
import { getTotalPayment } from "../controller/orderController.js";


const router = express.Router();

router.get("/users", adminAuth, getAllUsers);

router.get("/totalpayment", adminAuth, getTotalPayment);

export default router;
