import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: Array, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'food processing' },
  date: { type: Date, default: Date.now }
});



const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;
