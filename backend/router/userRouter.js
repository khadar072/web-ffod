import express from 'express'
import { deleteUser, getFood, getUser, updateUser, userLogin,userRegister } from '../controller/userController.js';
import { userAuth } from '../auth/userAuth.js'
import { myOrder, order } from '../controller/orderController.js';

const userRouter = express.Router();


//admin login
userRouter.post('/user-register',userRegister)
userRouter.post('/user-login',userLogin)
userRouter.get('/get-foot',getFood)
userRouter.get('/user',getUser)
userRouter.delete('/user/:id',deleteUser)
userRouter.put('/update/:id',updateUser)
userRouter.post('/order',userAuth,order)
userRouter.get('/my-order',userAuth,myOrder)


export default userRouter