const route = require('express').Router();
const User=require("../models/user.model");
const mongoose = require('mongoose')

async function getUser(req, res){
    try {
        const user=await User.findById(req.user_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
}

async function getAllUsers(req,res){
    try{
        const users=await User.find({})
        if(!users){
            return res.status(404).send();
        }
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
}

async function updateUser(req, res) {
    try {
        const id=req.user_id;
        const {username,email,password,age }=req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id ${id}`);
        const updatedUser={username,email,password,age, _id:id};
        await User.findByIdAndUpdate(id,updatedUser,{new :true});
        res.json(updatedUser);
    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteUser(req, res)  {
    try{
        const  user=await User.findByIdAndRemove({ _id :req.user_id});
        if(!user){
            return res.status(404).send();
        }
        res.send(user)
    }catch(e){
        res.status(500).send();
    }
}

module.exports = {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
}