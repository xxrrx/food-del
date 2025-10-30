import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next)=>{
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if (!req.body) req.body = {};
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Error"})
    }
}

export default authMiddleware;