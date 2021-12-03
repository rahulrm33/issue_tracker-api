const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const redis_client = require('../redis_connect');
const bcrypt = require('bcryptjs');
const {sendWelcomeEmail}=require('../email/account')

async function Register(req, res){
    const email=req.body.email
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email:req.body.email,
            age:req.body.age
        });
        const saved_user = await user.save();
        console.log(saved_user)
        sendWelcomeEmail(req.body.email,req.body.username)
        res.json({status: true, message: "Registered successfully.", data: saved_user});
    } catch (error) {
        
        res.status(400).json({status: false, message: "Something went wrong.", data: error});
    }
}

async function Login (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const user = await User.findOne({ email }).exec()
        if (!user) {
            return res.status('401').json({
                error: "User not found"
              })
        }
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) {
            return res.status('401').send({
                error: "Incorrect username or password."
            })
        }
        if(user === null) res.status(401).json({status: false, message: "username or password is not valid."});
        const access_token = jwt.sign({sub: user._id}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME});
        const refresh_token = GenerateRefreshToken(user._id);
        return res.json({status: true, message: "login success", data: {access_token, refresh_token}});
    } catch (error) {
        return res.status(401).json({status: true, message: "login fail", data: error});
    }

    
}

async function Logout (req, res) {
    const user_id = req.userData.sub;
    const token = req.token;

    await redis_client.del(user_id.toString());
    await redis_client.set('BL_' + user_id.toString(), token);
    
    return res.json({status: true, message: "success."});
}

function GetAccessToken (req, res) {
    const user_id = req.userData.sub;
    const access_token = jwt.sign({sub: user_id}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME});
    const refresh_token = GenerateRefreshToken(user_id);
    return res.json({status: true, message: "success", data: {access_token, refresh_token}});
}

function GenerateRefreshToken(user_id) {
    const refresh_token = jwt.sign({ sub: user_id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TIME });
    
    redis_client.get(user_id.toString(), (err, data) => {
        if(err) throw err;

        redis_client.set(user_id.toString(), JSON.stringify({token: refresh_token}));
    })

    return refresh_token;
}

module.exports = {
    Register,
    Login,
    Logout,
    GetAccessToken
}