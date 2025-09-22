import jwt from "jsonwebtoken"

export const generateToken = (userId,res) =>{
    const {JWT_SECRET} =process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not cconfigured")
    }
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt", token,{
        maxAge:7 *24*60*60*1000 , //MS
        httpOnly : true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "develoment" ? false :true,
    })

    return token;
}