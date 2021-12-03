const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'New'  
    },
    phase:{
        type:String,
        default:'Prepare'
    },
    priority:{
        type:Number,
        min:1,
        max:5,
        default:5
    },
    created_By: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created_At:{
        type : Date, 
        default: Date.now 
    },
    updated_By: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_At: Date

}, {
    versionKey: false // You should be aware of the outcome after set to false
});
const issue = mongoose.model('issue', issueSchema)

module.exports = issue