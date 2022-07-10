const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");

const login = async (req,res) => {
    const {email,password} = req.body;
    if(!email.trim() || !password.trim()){
        return res.status(422).json({error: "All fields should be filled properly"});
    }
    try{
        const userExist = User.find({email: email});
        if(userExist){
            const isMatched = await bcrypt.compare(password,userExist.password);
            if(isMatched){
                const token = await userExist.generateAuthToken();
                res.cookie("developer",token,{
                    expire: new Date(Date.now()+25892000000),httpOnly:true
                });
                return res.status(200).json({message: "loggined successfully"});
            }else{
                return res.status(422).json({error: "Invalid data"});
            }
        }else{
            return res.status(422).json({error: "Invalid data"});
        }
    }catch(err){
        res.status(401).send({error: "unauthorized: no token provided"});
    }
}

module.exports = login;