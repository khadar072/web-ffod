import Order from '../models/orderSchema.js';
import User from '../models/userSchema.js';


export const order = async (req, res) => {
    try {
        const userId = req.user.id; // assuming you have auth middleware
        const { address, phone, name, email, items } = req.body;

        // find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const order = new Order({
            user: userId,
            items,
            name,
            email,
            address,
            phone,
            amount: totalPrice
        });


        await order.save();

        res.status(201).json({ success: true, order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const myOrder= async (req,res) =>{
    try {
        const user = req.user.id; 
        const myfood= await Order.find({user})
         res.status(200).json({ success: true, myfood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
} 


export const listOrrder = async (req,res) =>{
    try {
        
        const listFood= await Order.find({})
        res.status(200).json({ success: true, listFood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
} 

export const updateStatus = async (req,res) =>{
    try {
        
        const updatestatus= await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.status(200).json({ success: true, message:"status updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
} 