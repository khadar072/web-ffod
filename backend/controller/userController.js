import bcrypt from 'bcrypt'
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import Food from '../models/foodSchema.js';


export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).send({ success: false, message: "messing detail" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)




        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        return res.status(200).send({ success: true, message: "user registered", user })


    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getFood = async (req,res)=>{
  try {
    const foot = await Food.find()
    return res.status(200).send({success:true,foot})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    
  }
}

export const getFood8 = async (req,res)=>{
  try {
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    
  }
}
