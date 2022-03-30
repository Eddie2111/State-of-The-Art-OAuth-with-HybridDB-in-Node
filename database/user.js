const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userID    : {
        type:String, 
        lowercase: true,
        required:true
    },
    name    : {
        type:String, 
        lowercase: true,
        required:true
    },
    age     : {
        type:Number, 
        min:18, 
        max:80,
        required:true
    },
    email   : {
        type:String,
        lowercase: true,
        required: true
    },
    createdate:{
        type:Date,
        default: Date.now}
});
const schema = mongoose.model('users', userSchema);
module.exports =  schema;
