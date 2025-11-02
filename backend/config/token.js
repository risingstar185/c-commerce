
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const gentoken=async (userId)=>{
try {
  let token=await jwt.sign({userId}, process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
  return token;
} catch (error) {
  console.log('token error',error)
}
}

export const gentoken1=async (email)=>{
try {
  let token=await jwt.sign({email}, process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
  return token;
} catch (error) {
  console.log('token error',error)
}
}