const express = require('express')
const Issue = require('../models/issue.model')
const mongoose = require('mongoose');
const redis_client = require('../redis_connect');
const router = new express.Router()

async function createIssue (req, res) {
    const issue = new Issue({
        ...req.body,
        created_By: req.user_id
    })
    try {
        await issue.save()
        res.status(201).send(issue)
    } catch (e) {
        res.status(400).send(e)
    }
}

async function getIssue (req, res){
    const _id = req.params.id
    try {
        const issue = await Issue.findById(_id)
                                        .populate({path :'updated_By', select: 'username -_id',})
                                        .populate({path :'created_By', select: 'username -_id',}) .exec()
        console.log("before")
        if (!issue) {
            return res.status(404).send()
        }
        await redis_client.set(_id, JSON.stringify(issue),'EX', 60 * 60 * 24);
        console.log('Response is cached with key: router');
        res.send(issue)
    } catch (e) {
        res.status(500).send()
    }
}

async function getAllIssue(req, res)  {
    try {
        const issues = await Issue.find()
                                    .populate({path :'created_By', select: 'username -_id',}) 
                                    .populate({path :'updated_By', select: 'username -_id',}).exec()
        if(!issues){
            return res.status(404).send();
        }
        res.send(issues)
    } catch (e) {
        res.status(500).send()
    }
}

async function getByQuery (req, res,next){
    if(req.query.status) return next();
    const query_Phase=req.query.phase;
    const prior=req.query.priority;
    try {
        const issues = await Issue.find({phase:query_Phase,priority:prior})
                                    .populate({path :'created_By', select: 'username -_id',}) 
                                    .populate({path :'updated_By', select: 'username -_id',}).exec()
        if(!issues){
            return res.status(404).send();
        }
        res.send(issues)
    } catch (e) {
        res.status(500).send()
    }
}


async function getByStatus(req, res){
    var query = req.query.status;
    try {
        const issues = await Issue.find({status:query})
                                    .populate({path :'created_By', select: 'username -_id',}) 
                                    .populate({path :'updated_By', select: 'username -_id',}).exec()
        if(!issues){
            return res.status(404).send();
        }
        await redis_client.set(query, JSON.stringify(issues),'EX', 60 * 60 * 24);
        res.send(issues)
    } catch (e) {
        res.status(500).send()
    }
}

async function updateIssue(req, res){
    const { id } = req.params;
        const { title, description, status,phase, priority} = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No issue with id: ${id}`);
    try{
        const a = await Issue.findById(id)
        console.log(a)
        const updatedPost = { title, description, status,phase, priority, _id: id, updated_By:req.user_id ,updated_At:new Date(),created_By:a.created_By,created_At:a.created_At};
        await Issue.findByIdAndUpdate(id, updatedPost, { new: true });
        await redis_client.get(id, (err, data) => {
            if(err) throw err;
    
            redis_client.set(id, JSON.stringify(updatedPost));
        })
        res.json(updatedPost);
    }catch(e){
        res.status(400).send(e)
    }
}

async function deleteIssue(req, res) {
    const { id } = req.params;
    try {
        const issue = await Issue.findByIdAndDelete(id)
        await redis_client.get(id, (err, data) => {
            if(err) throw err;
            redis_client.del(id);
        })
        if (!issue) {
            res.status(404).send()
        }
        
        res.send(issue)
    } catch (e) {
        res.status(500).send()
    }
}
module.exports = {
    createIssue,
    getAllIssue,
    getIssue,
    getByQuery,
    getByStatus,
    updateIssue,
    deleteIssue
}
