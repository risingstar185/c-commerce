import express from "express";
import multer from "multer";
import { addProduct, ListProduct, removeProduct } from "../controller/productController.js";
import adminAuh from '../middleware/adminAuth.js'

const upload = multer({ dest: "uploads/" }); // temporary folder for uploads
const ProdutRoutes = express.Router();

ProdutRoutes.post(
  "/addProduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

ProdutRoutes.get('/list',ListProduct)
ProdutRoutes.post('/remove/:id',adminAuh,removeProduct)

export default ProdutRoutes;
