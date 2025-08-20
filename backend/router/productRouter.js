import express from 'express'
import { addProduct, adminLogin, deleteProducts, getProducts, getSingleProducts, updateProducts } from '../controller/adminController.js';
import upload from '../config/multer.js';
import { adminAuth } from '../auth/adminAuth.js';

const admintRouter = express.Router();


//admin login
admintRouter.post('/admin-login',adminLogin)
admintRouter.post('/add-product',upload.single('image'),adminAuth,addProduct)
admintRouter.put('/update-product/:id',upload.single('image'),adminAuth,updateProducts)
admintRouter.get('/get-product',adminAuth,getProducts)
admintRouter.get('/get-single-product/:id',adminAuth,getSingleProducts)
admintRouter.delete('/delete-product/:id',adminAuth,deleteProducts)

export default admintRouter