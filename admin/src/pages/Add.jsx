import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from '../components/Loading.jsx'

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [size, setSize] = useState([]);

  const { serverUrl } = useContext(AuthDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("size", JSON.stringify(size));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      const result = await axios.post(
        `${serverUrl}/api/product/addProduct`,
        formData,
        { withCredentials: true }
      );

      console.log(result.data);
      setLoading(false);

      if (result.data) {
        // Reset all states after successful upload
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("Topwear");
        setSize([]);

        toast.success(" Product added successfully!");
      }
    } catch (error) {
      console.error("Add product error", error);
      toast.error("❌ Failed to add product");
      setLoading(false);
    }
  };

  return (
<div className="w-full min-h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] animate-gradient-x flex flex-col md:flex-row relative">
  {/* Navbar and Sidebar */}
  <Nav />
  <Sidebar />

  {/* Form Section */}
  <div className="flex-1 flex items-start justify-center mt-[70px] ml-[15px] md:mt-0 py-10 px-10 sm:px-6 md:px-10 overflow-y-auto">
    <form
      onSubmit={handleAddProduct}
      className="w-full max-w-3xl flex flex-col gap-8 bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 md:p-10 shadow-lg"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold text-center">
        Add Product Page
      </h1>

      {/* Image Upload Section */}
      <div className="flex flex-col gap-4">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Upload Images
        </p>
        <div className="flex flex-wrap gap-5 sm:gap-8 justify-center md:justify-start">
          {[1, 2, 3, 4].map((num) => {
            const image = eval(`image${num}`);
            const setImage = eval(`setImage${num}`);
            return (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative cursor-pointer border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center hover:border-[#46d1f7]"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${num}`}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-2xl sm:text-3xl md:text-4xl text-gray-200" />
                    <p className="absolute bottom-1 text-xs sm:text-sm text-gray-100">
                      Image{num}
                    </p>
                  </>
                )}
                <input
                  type="file"
                  id={`image${num}`}
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Name */}
      <div className="flex flex-col gap-2">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Product Name
        </p>
        <input
          type="text"
          placeholder="Enter the product name"
          className="w-full h-10 sm:h-12 rounded-lg border-2 border-white/40 placeholder:text-gray-300 text-black px-4 focus:outline-none focus:border-[#46d1f7]"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Product Description
        </p>
        <textarea
          placeholder="Enter the product description"
          className="w-full h-28 sm:h-32 rounded-lg border-2 border-white/40 placeholder:text-gray-300 text-black px-4 py-2 focus:outline-none focus:border-[#46d1f7]"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      {/* Category & SubCategory */}
      <div className="flex flex-wrap gap-6 sm:gap-10">
        <div className="flex flex-col gap-2 w-full sm:w-[45%]">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
            Category
          </p>
          <select
            className="bg-[#51b8c4] px-3 py-2 rounded-lg border-2 border-white/40 focus:outline-none focus:border-[#46d1f7]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-[45%]">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
            Sub Category
          </p>
          <select
            className="bg-[#51b8c4] px-3 py-2 rounded-lg border-2 border-white/40 focus:outline-none focus:border-[#46d1f7]"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Product Price
        </p>
        <input
          type="number"
          placeholder="Enter price (e.g. ₹200)"
          className="w-full sm:w-[80%] h-10 sm:h-12 rounded-lg border-2 border-white/40 text-black px-4 focus:outline-none focus:border-[#46d1f7]"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />
      </div>

      {/* Size Selection */}
      <div className="flex flex-col gap-2">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Available Sizes
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {["S", "M", "L", "XL", "XXL"].map((label) => (
            <div
              key={label}
              className={`px-4 py-2 rounded-lg border-2 cursor-pointer text-sm sm:text-base md:text-lg transition-all duration-200 ${
                size.includes(label)
                  ? "bg-green-400 text-black border-[#46d1f7]"
                  : "bg-[#51b8c4] hover:border-[#46d1f7]"
              }`}
              onClick={() =>
                setSize((prev) =>
                  prev.includes(label)
                    ? prev.filter((item) => item !== label)
                    : [...prev, label]
                )
              }
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-3 mt-3">
        <input
          type="checkbox"
          id="checkbox"
          className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label
          htmlFor="checkbox"
          className="text-base sm:text-lg md:text-xl font-semibold text-white"
        >
          Add to Best Seller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full sm:w-[60%] md:w-[160px] py-3 rounded-xl text-black font-semibold self-center transition-all duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#65d8f7] hover:bg-[#0f749d] hover:text-white"
        }`}
      >
        {loading ? <Loading /> : "Add Product"}
      </button>
    </form>
  </div>
</div>


  );
};

export default Add;
