import express from "express";
import { addToCart, getUserToCart, updateToCart } from "../controller/cartController.js";
import isAuth from "../middleware/isAuth.js";

const cartRouter = express.Router();

// 🛒 Cart Routes
cartRouter.post("/get", isAuth, getUserToCart);
cartRouter.post("/add", isAuth, addToCart);
cartRouter.post("/update", isAuth, updateToCart);

export default cartRouter;
