import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const List = () => {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      // If backend sends { products: [...] }
      setList(result.data.products || result.data);
      console.log(result.data);
      toast.success("Products listed successfully 👍");
    } catch (error) {
      console.error("listing error", error);
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

const removeList=async(id)=>{
  try {
    const result=await axios.post(`${serverUrl}/api/product/remove/${id}`,{},{withCredentials:true})

    if(result.data){
      fetchList()

    }
    else{
      console.log('failed to remove product')
    }
    toast.success('product remove successfully😒')
  } catch (error) {
    console.error('failer remove',error)
  }
}

  return (
    <div className="w-screen min-h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] animate-gradient-x flex">
      <Nav />
      <Sidebar />

      <div className="w-[82%] h-full absolute right-0 px-8 pt-20 overflow-y-auto">
        <h1 className="text-[25px] md:text-[40px] text-white mb-6">
          All Listed Products
        </h1>

        {list && list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="w-[90%] md:h-[120px] h-[90px] bg-slate-700/60 rounded-xl flex items-center justify-between p-[10px] md:px-[30px] mb-4"
            >
              {/* Product Info Section */}
              <div className="flex h-[100px] items-center gap-[15px] md:gap-[30px]">
               <img
                src={item.image1}
                alt={item.name}
                className="w-[90px] h-[90%] md:w-[120px] rounded-lg object-cover"
              />
                <div className="text-white flex flex-col">
                  <h2 className="text-[18px] font-semibold">{item.name}</h2>
                  <p className="text-gray-300 text-[14px]">{item.category}</p>
                  <p className="text-[#46d1f7] font-bold">₹{item.price}</p>
                  {item.bestseller && (
                    <span className="text-green-400 text-[13px]">
                      ⭐ Bestseller
                    </span>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeList(item._id)}
                className="text-red-500 hover:text-red-600 transition-all"
                title="Delete Product"
              >
                <MdDelete size={28} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg mt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
