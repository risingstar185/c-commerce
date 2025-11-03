import express from 'express';
import dotenv from 'dotenv'
import CONNECTDB from './config/databaseconnection.js' 
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import cors from 'cors'
import userRoutes from './routes/userRoute.js';
import ProdutRoutes from './routes/productRoute.js';
import cartRouter from './routes/cardRoute.js';
import orderRoute from './routes/OrderRoute.js';
import adminRoute from "./routes/adminRoute.js";


dotenv.config();

let PORT=process.env.PORT||6000;
let app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:['https://shopeaseone.onrender.com',
'https://adminshop0.netlify.app'
    ],
  credentials:true
}))

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes);
app.use('/api/product',ProdutRoutes)
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT,()=>{
  console.log(`Server is running on  port ${PORT}`);
  CONNECTDB();
})

