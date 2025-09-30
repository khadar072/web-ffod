 import express from 'express'
 import 'dotenv/config'
 import cors from 'cors'
import { connectDB } from './config/db.js'
import admintRouter from './router/adminRouter.js'
import userRouter from './router/userRouter.js'
import connectCloudinary from './config/cloudinary.js'

 const app = express()


 app.use(express.json())
 app.use(express.urlencoded({extended:false}))

 app.use(cors())

 app.get('/',(req , res)=>{
    res.send('khadar12')
 })


 app.use('/admin/api',admintRouter)
 app.use('/user/api',userRouter)
 app.use("/upload", express.static("upload"));

connectCloudinary()
 connectDB()
const PORT =process.env.PORT || 5002
 app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    
 })


