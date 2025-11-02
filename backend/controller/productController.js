import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js"; // ✅ keep at top

// ✅ Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, bestSeller, size } = req.body;

    // Upload images to Cloudinary
    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);
    const image4 = await uploadOnCloudinary(req.files.image4[0].path);

    const productData = {
      name,
      image1,
      image2,
      image3,
      image4,
      description,
      price: Number(price),
      category,
      subCategory,
      size: JSON.parse(size),
      bestSeller: bestSeller === "true",
    };

    const newProduct = await Product.create(productData);
    return res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.log("Product Add Error:", error);
    return res.status(500).json({ message: "Error adding product" });
  }
};

// ✅ List Product
export const ListProduct = async (req, res) => {
  try {
    const products = await Product.find(); // ✅ use lowercase variable
    res.status(200).json({ message: "Product list fetched successfully", products });
  } catch (error) {
    console.log("Product list Error:", error);
    return res.status(500).json({ message: "Error listing product" });
  }
};

// ✅ Remove Product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id); // ✅ use lowercase variable
    res.status(200).json({ message: "Product removed successfully", product });
  } catch (error) {
    console.log("Product remove Error:", error);
    return res.status(500).json({ message: "Error removing product" });
  }
};
