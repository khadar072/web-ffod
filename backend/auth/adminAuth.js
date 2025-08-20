import jwt from 'jsonwebtoken'


export const adminAuth = async (req , res ,next) => {
   try {
     const {atoken} = req.headers

    if (!atoken) {
        return res.send({success: false,message: "there is no token"})
    }

    const decoded_token = await jwt.verify(atoken,process.env.JWT_SECRET_KEY);

    if (decoded_token !== process.env.ADMIN_EMAIL &&  process.env.ADMON_PASS) {
        return res.send({success: false,message: "no authorization"})
    }
     next()
   } catch (error) {
        console.log(error)
        res.send({success:false,message:error.message})
   }
}