import React, { useContext, useEffect, useState } from "react";
import { FaAngleRight, FaChevronDown } from "react-icons/fa";
import Title from "../components/Title";
import { shopDataConext } from "../context/ShopContext";
import Card from "../components/Card";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const {products,search,showSearch}=useContext(shopDataConext);
  const [filterProduct,setFilterProduct]=useState([])
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([])
  const [sortType,setSortType]=useState([])

  const toogleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev =>prev.filter(item=>item !==e.target.value))
    }
    else{
      setCategory(prev =>[...prev,e.target.value])
    }
  }

  const toogleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev =>prev.filter(item=>item !==e.target.value))
    }
    else{
      setSubCategory(prev =>[...prev,e.target.value])
    }
  }


  const applyFilter=()=>{
    let productCopy=products.products|| products?.data.slice()
    if(showSearch && search){
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length >0){
      productCopy=productCopy.filter(item=>category.includes(item.category))
    }
  
  if(subCategory.length >0){
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }
useEffect(()=>{
  setFilterProduct(products)
},[products])

useEffect(()=>{
  applyFilter()
},[category,subCategory,search,showSearch])

const sortProducts=(e)=>{
  let fbCopy=filterProduct.slice()


  switch(sortType){
case 'low-high':
  setFilterProduct(fbCopy.sort((a,b)=>(a.price-b.price)))
  break;

  case 'high-low':
  setFilterProduct(fbCopy.sort((a,b)=>(b.price-a.price)))
  break;

  default:
    applyFilter()
    break;
  }
}

useEffect(()=>{
  sortProducts()
},[setSortType])

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac]  mt-[75px] flex flex-col md:flex-row overflow-x-hidden z-[2]">
      {/* Sidebar */}
      <div className="w-full md:w-[30vw] lg:w-[20vw] min-h-[100vh] p-8 border-r-2 border-gray-400 text-[#085425] bg-[#4b647a]/30 md:fixed">
        <p
          className="text-[25px] font-semibold flex gap-2 items-center justify-start cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS{" "}
          {!showFilter && <FaAngleRight className="text-[18px] md:hidden" />}
          {showFilter && <FaChevronDown className="text-[18px] md:hidden" />}
        </p>

        {/* Category Filter */}
        <div
          className={`border-2 border-[#dedcdc] pl-5 h-[150px] mt-6 rounded-md bg-slate-500 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#091717]">Categories</p>
          <div className="w-full h-[120px] flex flex-col items-start justify-center gap-[10px] mt-1">
            <label className="flex items-center gap-[10px] text-[16px]">
              <input type="checkbox" value="Men" className="w-3" onChange={toogleCategory} /> Men
            </label>
            <label className="flex items-center gap-[10px] text-[16px]">
              <input type="checkbox" value="Women" className="w-3"  onChange={toogleCategory}/> Women
            </label>
            <label className="flex items-center gap-[10px] text-[16px]">
              <input type="checkbox" value="Kids" className="w-3"  onChange={toogleCategory}/> Kids
            </label>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border-2 border-[#dedcdc] pl-5 h-[150px] mt-6 rounded-md bg-slate-500 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#091717]" >Sub Categories</p>
          <div className="w-full h-[120px] flex flex-col items-start justify-center gap-[10px] mt-1">
            <label className="flex items-center gap-[10px] text-[16px]">
              <input type="checkbox" value="Topwear" className="w-3" onChange={toogleSubCategory} /> Topwear
            </label>
            <label className="flex items-center gap-[10px] text-[16px]">
              <input type="checkbox" value="Bottomwear" className="w-3"  onChange={toogleSubCategory} /> Bottomwear
            </label>
            <label className="flex items-center gap-[10px] text-[16px]">
              <input type="checkbox" value="Winterwear" className="w-3" onChange={toogleSubCategory}  /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[30vw] lg:ml-[20vw] lg:pl-[5%] md:py-4">
        <div className="w-full p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:px-[100px]">
          <Title text1="ALL" text2="Collection" />

          <select className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg border-2 border-transparent hover:border-[#46d1f7] transition-all duration-200 cursor-pointer" onChange={(e)=>setSortType(e.target.value)} >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
        <div className="lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-70vh flex items-center justify-center flex-wrap gap-[30px]">
{ filterProduct.map((item,index)=>(
  <Card key={index} id={item._id} image={item.image1} name={item.name} price={item.price}/>
))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
