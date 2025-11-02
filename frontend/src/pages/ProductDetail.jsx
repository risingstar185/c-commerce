import React, { useContext, useEffect, useState } from 'react';
import { shopDataConext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import RelatedProduct from '../components/RelatedProduct';


const ProductDetail = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const { products, currency,addToCartHandler } = useContext(shopDataConext);

  console.log('prodata',productData)
  useEffect(() => {
    const fetchProductDetails = () => {
      const productArray = Array.isArray(products)
        ? products
        : products?.data || products?.products || [];

      if (!productArray || productArray.length === 0) return;

      const foundProduct = productArray.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image1);
      }
    };

    fetchProductDetails();
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10 text-white">Loading product details...</div>;
  }

  return (
    <div>
      <div className="w-[100vw] min-h-[130vh] md:min-h-[100vh] bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] flex flex-col items-center justify-start gap-[20px] py-1  md:px-20 text-white">
        {/* Product section */}
        <div className='lg:w-[50vw] md:w-[90vw] lg:h-[100vh] h-auto mt-[70px] flex flex-col-reverse lg:flex-row items-center justify-center md:gap-[10px] gap-[50px]'>
          
          {/* Image thumbnails */}
          <div className='lg:w-[25%] -ml-[200px] md:w-[80%] h-auto lg:h-[100%] flex items-center justify-center gap-[50px] lg:gap-[45px] lg:flex-col flex-wrap'>
            {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, index) => (
              img && (
                <div
                  key={index}
                  className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md overflow-hidden'
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className='w-[100%] h-full cursor-pointer object-cover rounded-md'
                    onClick={() => setImage(img)}
                  />
                </div>
              )
            ))}
          </div>

          {/* Main image */}
          <div className='lg:w-[110%] w-[500px] lg:h-[78%] h-[100%] border border-[#80808049] rounded-md overflow-hidden'>
            <img
              src={image}
              alt={productData.name}
              className='w-full h-full object-fill rounded-md'
            />
          </div>

          {/* Product Info */}
          <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-auto  flex flex-col items-start justify-start -py-[20px] px-[10px] md:pb-[20px] md:pl-[20px] lg:pl-[150px] gap-[20px]'>
            <h1 className='text-[40px] font-semibold'>{productData.name?.toUpperCase()}</h1>
            <div className='flex items-center gap-1'>
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className='text-[20px] fill-[#FFD700]' />
              ))}
              <FaStarHalfAlt className='text-[20px] fill-[#FFD700]' />
              <p className='text-[18px] font-semibold pl-[5px]'>(124)</p>
            </div>
            <p className='text-[30px] font-semibold pl-[5px]'>{currency}{productData.price}</p>
            <p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px]'>
              {productData.description} and styles, breathable {productData.name} with a modern fit.
              Easy to wash, super comfortable and designed for effortless style.
            </p>

          {/* Size selection */}
<div className='flex flex-col gap-[10px] my-[10px]'>
  <p className='text-[25px] font-semibold'>Select Size</p>
  <div className='flex gap-2 flex-wrap'>
    {productData.size?.map((item, index) => (
      <button
        key={index}
        onClick={() => setSize(item)}
        className={`border py-2 px-4 rounded-md transition-all duration-200
          ${size === item ? 'bg-[#86f8b7] border-[#06c167] text-black font-semibold' : 'bg-slate-300 hover:bg-slate-200'}
        `}
      >
        {item}
      </button>
    ))}
  </div>





          <button
      className="text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border border-[#80808049] text-white shadow-md shadow-black"
                 onClick={() => addToCartHandler({itemId: productData._id, size})} // example size
    >
      Add To Cart
    </button>
            </div>

            <div className='w-[90%] h-[1px] bg-black-700'></div>
            <div className='w-[80%] -mt-[50px] text-[16px]'>
              <p>✅ 100% Original Product</p>
              <p>💰 Cash on Delivery Available</p>
              <p>🔁 Easy Return & Exchange within 7 days</p>
            </div>
          </div>
        </div>

        {/* Description + Related Section */}
        <div className='w-[100%] min-h-[70vh] mt-[100px] py-[70px] bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] flex flex-col items-start justify-start '>
          <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-0 lg:mt-0'>
            <p className='border px-5 py-3 text-sm'>Description</p>
            <p className='border px-5 py-3 text-sm'>Reviews (124)</p>
          </div>
          <div className='w-[80%] md:h-[150px] h-[220px] border text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px]'>
            <p className='w-[95%] h-[90%] flex items-center justify-center text-center'>
              Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart.
              Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style.
            </p>
          </div>
          <RelatedProduct
            category={productData?.
category
}
            subCategory={productData?.subCategory}
            currentProductId={productData?._id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
