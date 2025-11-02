import React from 'react'
import Background from '../components/Background'
import Product from './Product'
import OurPolicy from '../components/OurPolicy'
import NewLatter from '../components/NewLatter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className='h-auto w-auto  bg-gradient-to-l from-[#51b8c4] to-[#2b26ac]  mt-[75px]'>
    <Background/>

    <Product/>

    <OurPolicy/>
    <NewLatter/>
    <Footer/>
    </div>
  )
}

export default Home
