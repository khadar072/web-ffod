import jwt from 'jsonwebtoken'
import Food from '../models/foodSchema.js';
import cloudinary from '../config/cloudinary.js';

export const adminLogin = async (req , res) =>{
    try {
        const {email, password}=req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const atoken = await jwt.sign(email+password,process.env.JWT_SECRET_KEY)
            return res.status(200).send({success: true,message: "login successfully",atoken})
        }else{
            return res.status(400).send({success: false,message: "your are not credintial"})
        }
    }catch (error) {
        console.log(error)
        res.status(400).send({success:false,message:error.message})
   }
}




// helper for uploading to Cloudinary
const uploadToCloudinary = (fileBuffer, folder = 'products') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(fileBuffer);
  });

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ success: false, message: "All product details are required" });
    }

    const uploadResult = await uploadToCloudinary(image.buffer, 'products');

    const newProduct = new Food({
      name,
      description,
      price,
      category,
      image: uploadResult.secure_url,
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error('AddProduct Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const image = req.file;

    const product = await Food.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // only upload new image if provided
    if (image) {
      const uploadResult = await uploadToCloudinary(image.buffer, 'products');
      product.image = uploadResult.secure_url;
    }

    // update fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;

    const updatedProduct = await product.save();

    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error('UpdateProduct Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getProducts = async (req,res) => {
    try {
        

        const products = await Food.find()

        return res.send({success: true,message: "all products",products})
    } catch (error) {
        console.log(error);
        res.send({success:false,message:error.message})
        
    }
}

export const getSingleProducts = async (req,res) => {
    try {
        const {id}= req.params


        const product =await Food.findById(id)

        if (!product) {
            return res.send({success: false,message: "there isno this product"})
        }
        return res.send({success: true,message: "product is avialable",product})

    } catch (error) {
        console.log(error);
        res.send({success:false,message:error.message})
        
    }
}

export const deleteProducts = async (req,res) => {
    try {
        const {id}= req.params


        const product =await Food.findByIdAndDelete(id)

       return res.send({success: true,message: "pruduct deleted",product})
        
    } catch (error) {
        console.log(error);
        res.send({success:false,message:error.message})
        
    }
}

