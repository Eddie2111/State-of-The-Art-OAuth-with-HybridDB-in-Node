const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});
const schema = mongoose.model('users', userSchema);
module.exports =  schema;
