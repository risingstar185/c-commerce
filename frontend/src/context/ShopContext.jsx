import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'
import { UserDataContext } from './UserContext'
import { toast } from 'react-toastify'



export const shopDataConext=createContext()
const ShopContext = ({children}) => {
let [products ,setProduct]=useState([])

const [search,setSearch]=useState('')
const [showSearch,setShowSearch]=useState(false)
  const [cartItem, setCartItem] = useState({});
let {serverUrl}=useContext(AuthDataContext)
const {userData}=useContext(UserDataContext)
let currency='₹';
let delivery_fee=40;

const getProducts=async()=>{
  try {
    let result=await axios.get(serverUrl +
      '/api/product/list')
      console.log(result.data)
      setProduct(result.data)
  } catch (error) {
    console.error('fetching list error',error)
    
  }
}


  const addToCartHandler = async ({ itemId, size }) => {
    if (!size) {
      console.log('Select product size');
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      // If product already in cart
      if (cartData[itemId][size]) {
        cartData[itemId][size]+= 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      // New product
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    console.log(userData)

    if (userData) {
  try {
    await axios.post(`${serverUrl}/api/cart/add`, { itemId, size }, { withCredentials: true });
    toast.success("Added to cart successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to add to cart");
  }
} else {
  console.log("User not logged in");
}
  }
 
 

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        const quantity = cartItem[itemId][size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }
    return totalCount;
  };
   const getUserCart=async()=>{
    try {
      const result=await axios.post(serverUrl + '/api/cart/get',{},{withCredentials:true})

      setCartItem(result.data)
    } catch (error) {
      console.log(error)
    
    }
  }

  const updateQuantity=async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItem);
    cartData[itemId][size]=quantity
    setCartItem(cartData)
    if(userData){
      try {
        await axios.post(serverUrl +'/api/cart/update',{itemId,size,quantity},{withCredentials:true})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

useEffect(()=>{
  getProducts()
},[])
useEffect(()=>{
  getUserCart();
},[])

const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItem) {
    const itemInfo = products.products?.find((product) => product._id === itemId);

    // If itemInfo doesn't exist, skip it
    if (!itemInfo) continue;

    for (const size in cartItem[itemId]) {
      try {
        if (cartItem[itemId][size] > 0) {
          totalAmount += itemInfo.price * cartItem[itemId][size];
        }
      } catch (error) {
        console.error("Error calculating cart total:", error);
      }
    }
  }

  return totalAmount;
};


delivery_fee=45;
  let value={
products,currency,delivery_fee,getProducts,search,setSearch,showSearch,setShowSearch,cartItem,setCartItem,addToCartHandler,getCartCount,updateQuantity
 ,getCartAmount,delivery_fee }
  return (
    <div>
      
<shopDataConext.Provider value={value}>
  {children}
</shopDataConext.Provider>

    </div>
  )
}

export default ShopContext
