const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const register = async (req,res) => {
    console.log(req.body);
    const {name,email,password,cpassword,skills,phone} = req.body;
    console.log(name,email,password,cpassword,skills,phone);
    if(!name || !email || !password || !cpassword || !skills || !name.trim() || !email.trim() || !password.trim() || !cpassword.trim() || !skills.trim() ||!phone.trim()){
        return res.status(422).json({error: "Fill all the fields properly"});
    }else if(password!==cpassword){
        return res.status(422).json({error: "Password and confirm password should be match"});
    }
    try{
        const userExist = await User.findOne({email: email});
        if(userExist){
            return res.status(422).json({error: "Already registered"});
        }
        const user = new User({name,email,password,skills,phone});
        await user.save();
        res.status(200).json({message: "user registered successfully"});
    }catch(err){
        res.status(401).send({error});
    }
}

module.exports = register;