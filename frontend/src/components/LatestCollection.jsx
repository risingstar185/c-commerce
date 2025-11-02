import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataConext } from "../context/ShopContext";
import Card from "./Card";

const LatestCollection = () => {
  const { products } = useContext(shopDataConext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    // handle case: products is object with nested array
    const productList =
      products?.data || products?.products || products?.items || [];

    if (Array.isArray(productList)) {
      setLatestProduct(productList.slice(0, 8));
    }
  }, [products]);

  return (
    <div>
      {/* Title Section */}
      <div className="h-[8%] w-full text-center   md:mt-[50px]">
        <Title text1="Latest" text2="Collection" />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-[10px] text-black-100">
          Step Into Style - New Collection Dropping This Season
        </p>
      </div>

      {/* Product Cards */}
      <div className="w-full h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {latestProduct.length > 0 ? (
          latestProduct.map((item, index) => (
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
  );
};

export default LatestCollection;
