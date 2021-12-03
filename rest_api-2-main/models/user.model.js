const mongoose = require('mongoose');
const validator=require("validator");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: 'User Already Exist',
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid')
                }
            }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validator(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('try different password !')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error ("Age should be positive number !");
            }
        }
    }
});

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    return userObject
}


userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

module.exports = mongoose.model('User', userSchema);