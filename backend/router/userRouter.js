import express from 'express'
import { getFood, userLogin,userRegister } from '../controller/userController.js';
import { userAuth } from '../auth/userAuth.js'

const userRouter = express.Router();


//admin login
userRouter.post('/user-register',userRegister)
userRouter.post('/user-login',userLogin)
userRouter.get('/get-foot',getFood)


export default userRouter