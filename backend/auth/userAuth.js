import jwt from 'jsonwebtoken'


export const userAuth = async (req , res ,next) => {
   try {
     const {token} = req.headers

    if (!token) {
        return res.send({success: false,message: "there is no token"})
    }

    const decoded_token = await jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = decoded_token
     next()
   } catch (error) {
        console.log(error)
        res.send({success:false,message:error.message})
   }
}