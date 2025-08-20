import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:String,required:true},
    category: {type:String,required:true},
    image: {type:String,required:true},
})

const Food= mongoose.model.food || mongoose.model('food',foodSchema)

export default Food