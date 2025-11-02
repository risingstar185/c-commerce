import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const CONNECTDB=async()=>{
  try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected succesfully..")
   } catch (error) {
    console.error("Database connection failed",error)
  }
}

export default CONNECTDB;