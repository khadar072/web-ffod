import jwt from 'jsonwebtoken'
import Food from '../models/foodSchema.js';

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

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
     const image = req.file;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All product details are required",
      });
    }

   // Upload image to Cloudinary
    let imageUrl = null;
    if (image) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "doctors" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    if (!imageUrl) {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    const newProduct = new Food({
      name,
      description,           // make sure this matches your schema
      price,
      category,
      image: imageUrl, // save only the filename as string
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProducts = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
     const image = req.file;
    const { id } = req.params;

    const product = await Food.findById(id);
    if (!product) {
      return res.send({ success: false, message: "Product not found" });
    }

       // Upload image to Cloudinary
    let imageUrl = null;
    if (image) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "doctors" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    if (!imageUrl) {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.image = imageUrl;

   

    const updatedproduct = await product.save();

    return res.send({ success: true, message: "Product updated", updatedproduct });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
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

