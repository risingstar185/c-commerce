import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Order.jsx'
import Login from './pages/Login.jsx'
import { ToastContainer } from 'react-toastify';
import { AdminDataContext } from './context/AdminContext.jsx'
import AdminUsers from './pages/Users.jsx'



const App = () => {
  const {adminData}=useContext(AdminDataContext)
  return (
    <>
      {!adminData ? <Login/>: <>
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/Add' element={<Add/>}/>
          <Route path='/List' element={<List/>}/>
           <Route path='/orders' element={<Orders/>}/>
            <Route path='/login' element={<Login/>}/>
             <Route path='/users' element={<AdminUsers/>}/>
      </Routes>
       <ToastContainer position="top-center" autoClose={3000} />
          </>
       }
    </>
  )
}

export default App
