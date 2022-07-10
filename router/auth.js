const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const authenticate = require("../middleware/authenticate");

require("../db/conn");

const User = require("../model/userSchema");

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

router.get("/auth",async(req,res) =>{
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
            return res.status(200).json({user:rootUser});
        }else{
            throw new Error("User not loggined");
        }
    }catch(err){
        console.log(err);
        return res.status(401).send({error: "unauthorized: no token provided"});
    }
});

router.post("/login", async (req,res) => {
    const {email,password} = req.body;
    if(!email.trim() || !password.trim()){
        return res.status(422).json({error: "All fields should be filled properly"});
    }
    try{
        const userExist = await User.findOne({email: email});
        if(userExist){
            const isMatched = await bcrypt.compare(password,userExist.password);
            if(isMatched){
                const token = await userExist.generateAuthToken();
                res.cookie("developer",token,{
                    expire: new Date(Date.now()+25892000000),httpOnly:true
                });
                return res.status(200).json({userExist});
            }else{
                return res.status(422).json({error: "Invalid data"});
            }
        }else{
            return res.status(422).json({error: "Invalid data"});
        }
    }catch(err){
        console.log(err);
        res.status(401).send({error: "unauthorized: no token provided"});
    }
});

router.post("/register",async (req,res) => {
    const {name,email,password,cpassword,skills,phone} = req.body;
    
    if(!name || !email || !password || !cpassword || !skills || !name.trim() || !email.trim() || !password.trim() || !cpassword.trim() || !skills.trim() ||!phone.trim()){
        return res.status(422).json({error: "Fill all the fields properly"});
    }else if(password!==cpassword){
        return res.status(422).json({error: "Password and confirm password should be match"});
    }
    try{
        console.log("checking");
        const userExist = await User.findOne({email: email});
        if(userExist){
            return res.status(422).json({error: "Already registered"});
        }
        const user = new User({name,email,password,skills,phone});
        await user.save();
        res.status(200).json({message: "user registered successfully"});
    }catch(err){
        res.status(401).send(err);
    }
});
router.get("/logout",authenticate,(req,res) => {
    res.clearCookie("developer",{path: "/"});
    return res.status(200).json({message: "logout successfully"});
});

const mailToUser = (req,res,next) => {
    console.log("middleware");
    console.log(req.body);
    try{
        const {name,email,phone,content} = req.body;
        if(!name.trim() || !email.trim() || !phone.trim() || !content.trim()){
            throw new Error("fill all the fields properly");
        }
        let mailtodeveloper = {
            from: process.env.Email,
            to: email,
            subject: "your mail has been sent to developer team",
            text: `name: ${name}
            email: ${email}
            phone: ${phone}
            message: ${content}`
        };
        mailTransporter.sendMail(mailtodeveloper, function(err, data) {
            if(err) {
                console.log("error:",err);
                throw new Error("Invalid Email");
            }
        });
        next();
    }catch(err){
        console.log(err);
        return res.status(401).send({error: err});
    }
}

router.post("/message",mailToUser,(req,res) => {
    const {name,email,phone,content} = req.body;
 
    let mailtodeveloper = {
        from: process.env.Email,
        to: process.env.EMAIL,
        subject: name,
        text: `name: ${name}
        email: ${email}
        phone: ${phone}
        message: ${content}`
    };
    mailTransporter.sendMail(mailtodeveloper, function(err, data) {
        if(err) {
            console.log("error:",err);
            return res.status(401).send({error: "invalid email"});
        } else {
            console.log("message send");
            return res.status(200).json({message: "message send to admin"});
            
        }
    });
});

router.post("/updateDetail",authenticate, async(req,res) => {
    const {email,name,skills,phone} =req.body;
    if(!name.trim() || !skills.trim() || !phone.trim()){
        return res.status(422).json({error: "fill all the feilds properly"});
    }
    try{
        const result = await User.updateOne({email:email},{
            $set: {
                name: name,
                skills: skills,
                phone: phone
            }
        });
        res.status(200).json({message: "data updated"});
    }catch(err){
        res.status(401).send(err);
    }
});

module.exports = router;