import React from 'react'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'

const Product = () => {
  return (
   <div className="w-auto min-h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] mt-[75px] py-10 flex flex-col items-center">
  {/* Latest Collection Section */}
  <div className="w-full flex flex-col items-center justify-center mb-10 px-4">
    <LatestCollection />
  </div>

  {/* Best Seller Section */}
  <div className="w-full flex flex-col items-center justify-center px-4">
    <Bestseller />
  </div>
</div>

  )
}

export default Product
