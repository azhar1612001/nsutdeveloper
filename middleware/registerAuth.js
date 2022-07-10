const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const registerAuth = async (req,res,next) => {
    try{
        const token = req.cookies.developer;
        if(token){
            const verifytoken = jwt.verify(token,process.env.SECRET_KEY);
            const rootUser = await User.findOne({__id:verifytoken.__id,"tokens.token":token});
            if(rootUser){
                throw new Error("User not loggined");
            }
        }
        next();
    }catch(err){
        res.status(401).send({error: "unauthorized: no token provided"});
    }
}

module.exports = registerAuth;