import React, { useContext, useState ,useEffect} from 'react'
import Title from './Title'
import { shopDataConext } from '../context/ShopContext'
import Card from './Card'

function Bestseller() {

  const {products}=useContext(shopDataConext)
  const [bestSeller,setBestSeller]=useState([])


   useEffect(() => {
      // handle case: products is object with nested array
     const FilterproductList =
  (products?.data || products?.products || products?.items || [])
    .filter((item) => item.bestSeller === true);

      //  products?.data || products?.products || products?.items || [];
  
      if (Array.isArray(FilterproductList)) {
        setBestSeller(FilterproductList.slice(0, 4));
      }
    }, [products]);
  return (
    <div>
        <div className="h-[8%] w-full text-center md:mt-[50px]">
        <Title text1="Best" text2="Seller" />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-[10px] text-black-100">
          Tried ,Trusted,Loved . Discover our all -Time Best seller 
        </p>
      </div>
      <div className="w-full h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              image={item.image1}
              id={item._id || item.id}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-gray-500">Loading latest collection...</p>
        )}
      </div>
    </div>
  )
}

export default Bestseller
