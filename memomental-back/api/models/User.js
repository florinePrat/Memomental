const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : { type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true},
    points : { type: Number,default : 0 },
    pushKey : { type : Object},
    labels : [ {label : {type:mongoose.Schema.Types.ObjectId, ref:"Label"},number : {type : Number, default : 1}}]
});



const LearningController = require('../../api/controllers/LearningController');
const moment = require('moment');
const User = mongoose.model('User', UserSchema);
module.exports = User;
