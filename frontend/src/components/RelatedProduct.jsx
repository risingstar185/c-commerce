import React, { useContext, useEffect, useState } from 'react';
import { shopDataConext } from '../context/ShopContext';
import Title from '../components/Title.jsx';
import Card from '../components/Card.jsx';

const RelatedProduct = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(shopDataConext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // ✅ Extract array safely from object
    const productArray = Array.isArray(products)
      ? products
      : products?.data || products?.products || products?.items || [];

    if (productArray.length > 0) {
      let filtered = [...productArray];

      // ✅ Apply correct filtering
      filtered = filtered.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== currentProductId
      );

      setRelated(filtered.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>
      <div className='ml-[20px] lg:ml-[80px]'>
        <Title text1={'Related'} text2={'Products'} />
        <div className='w-full mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
          {related.length > 0 ? (
            related.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className='text-white text-center'>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
