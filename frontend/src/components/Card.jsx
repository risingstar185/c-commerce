import React, { useContext } from "react";
import { shopDataConext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";


const Card = ({ name, image, id, price }) => {
  const { currency } = useContext(shopDataConext);
  const navigate=useNavigate();

  return (
    <div
      key={id}
      className="w-[300px] max-w-[90%] bg-white rounded-2xl  border-[1px] mt-[20px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"   onClick={() => navigate(`/productdetails/${id}`)}
    >
      {/* Product Image */}
      <div className="relative w-full h-[200px]  overflow-hidden bg-gray-100">
        <img
          src={image || "/placeholder.png"}
          alt={name || "Product image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
          NEW
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-gray-900 font-semibold text-lg truncate">
          {name || "Unnamed Product"}
        </h3>
        {/* Bestseller && ( <p className="text-gray-500 text-sm text-red-500">BestSeller</p>)*/}
        <p className="text-gray-500 text-sm text-red-500">Limited stock available</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-blue-700 font-bold text-lg">
            {currency || "₹"}
            {price || "N/A"}
          </span>
          <button className="bg-blue-500 h-[40px]  w-[110px] hover:bg-blue-500 text-white text-sm px-3 py-1 rounded-lg transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
