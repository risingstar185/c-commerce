import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { AuthDataContext } from './AuthContext';
import axios from 'axios';

export const AdminDataContext=createContext();

export const AdminProvider=({children})=>{
 const [adminData,setAdminData]=useState('')
 const{serverUrl}=useContext(AuthDataContext);

 const getCurrentAdmin=async()=>{
  try {
    let result=await axios.get(serverUrl +'/api/user/getCurrentAdmin',{withCredentials:true}
    )
    setAdminData(result.data);
    console.log(result.data)
  } catch (error) {
    setAdminData(null)
    console.log(error)
  }
 }
 useEffect(()=>{
  getCurrentAdmin()
 },[])

 let value={
  getCurrentAdmin,adminData,setAdminData
 }

 return (
  <div>
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  </div>
 )
}
