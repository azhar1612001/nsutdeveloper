const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req,res,next) => {
    try{
        const token = req.cookies.developer;
        if(token){
            const verifytoken = jwt.verify(token,process.env.SECRET_KEY);
            const rootUser = await User.findOne({__id:verifytoken.__id,token:token});
            if(!rootUser){
                throw new Error("User not loggined");
            }
            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser._id;
            next();
            return rootUser;
        }else{
            throw new Error("User not loggined");
        }
        next();
    }catch(err){
        console.log(err);
        return res.status(401).send({error: "unauthorized: no token provided"});
    }
}

module.exports = authenticate;