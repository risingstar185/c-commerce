
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import Nav from '../src/components/Nav.jsx'
import { UserDataContext } from './context/UserContext.jsx'
import { useContext } from 'react'
import Collection from './pages/Collection.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
import { useLocation, Navigate } from "react-router-dom";
import About from './pages/About.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Order from './pages/Order.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const { userData } = useContext(UserDataContext)

  let location=useLocation()
  return (
    <>


      {userData && <Nav />}
      <Routes>
        <Route path='/signup' element={userData ? (<Navigate to={location.state?.from || "/"}/> ):(<Registration />)} />
        <Route path='/' element={userData ? <Home /> : <Navigate to='/login' state={{from :location.pathname}}/>} />
        <Route path='/Login' element={userData ? (<Navigate to={location.state?.from || "/"}/> ):(<Login />)} />
         <Route path='/collection' element={userData ? <Collection /> : <Navigate to='/login' state={{from :location.pathname}}/>} />
          <Route path='/product' element={userData ? <Product /> : <Navigate to='/login' state={{from :location.pathname}}/>} />
           <Route path='/contact' element={userData ? <Contact /> : <Navigate to='/login' state={{from :location.pathname}}/>}/>
 <Route path='/about' element={userData ? <About /> : <Navigate to='/login' state={{from :location.pathname}}/>}/>
<Route
  path="/productdetails/:productId"
  element={
    userData ? (
      <ProductDetail />
    ) : (
      <Navigate to="/login" state={{ from: location.pathname }} />
    )
  }
/>
<Route
  path="/productdetails/cart"
  element={
    userData ? (
      <Cart />
    ) : (
      <Navigate to="/login" state={{ from: location.pathname }} />
    )
  }
/>

<Route
  path="/placeorder"
  element={
    userData ? (
      <PlaceOrder />
    ) : (
      <Navigate to="/login" state={{ from: location.pathname }} />
    )
  }
/>
<Route
  path="/order"
  element={
    userData ? (
      <Order />
    ) : (
      <Navigate to="/login" state={{ from: location.pathname }} />
    )
  }
/>

<Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />

    </>
  )
}

export default App
