import React, { useContext, useEffect, useState } from "react";
import { shopDataConext } from "../context/ShopContext";
import Title from "../components/Title";
import { MdDelete } from "react-icons/md";
import CardTotal from "../components/CardTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataConext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        if (cartItem[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItem[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  console.log("Products 👉", products);
  console.log("Cart item IDs 👉", Object.keys(cartItem));

  return (
    <div className="min-h-screen w-full bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] mt-[75px] py-[50px] flex flex-col justify-start items-center">
      {/* Title */}
      <div className="text-center mt-[80px]">
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      {/* Cart Items */}
      <div className="w-full flex flex-col gap-[20px] mt-8 px-4 sm:px-8 md:px-12">
        {cartData.length === 0 ? (
          <p className="text-white text-xl text-center">🛒 Your cart is empty</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.products?.find((p) => p._id === item._id);

            if (!productData) {
              console.warn("Missing product for ID:", item._id);
              return null;
            }

            return (
              <div
                key={index}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between bg-[#51808048] py-[10px] px-[15px] sm:px-[20px] rounded-2xl border border-[#ffffff2e] gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-[10px]">
                  <img
                    src={productData.image1}
                    alt={productData.name}
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-md object-cover"
                  />
                  <div className="flex flex-col justify-center gap-[6px]">
                    <p className="text-[18px] sm:text-[22px] md:text-[25px] text-white font-semibold">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-[15px]">
                      <p className="text-[18px] sm:text-[20px] text-white">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] text-[14px] sm:text-[16px] text-white bg-[#447a74b4] rounded-md flex items-center justify-center border border-[#9ff9f9]">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity + Delete */}
                <div className="flex items-center gap-3 sm:gap-5 justify-between sm:justify-end w-full sm:w-auto">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    className="w-[60px] sm:w-[80px] md:w-[100px] text-white text-[16px] sm:text-[18px] font-semibold bg-[#3a5f5b85] py-[6px] px-[8px] rounded-md border border-[#9ff9f9] text-center outline-none"
                  />
                  <MdDelete
                    className="text-red-500 text-[25px] sm:text-[30px] cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Total */}
      {cartData.length > 0 && (
        <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-end items-center sm:items-end gap-6 mt-10 px-6">
          <div className="w-full sm:w-[450px]">
            <CardTotal />
            <button
              className="text-[16px] sm:text-[18px] h-[45px] sm:h-[50px] w-full sm:w-[400px] hover:bg-slate-500 cursor-pointer bg-[#16212147] px-[20px] rounded-2xl text-white flex items-center justify-center gap-[10px] border border-[#80808049] mt-[20px] ml-[40px]"
              onClick={() => navigate("/placeorder")}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
