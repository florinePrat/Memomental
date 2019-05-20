const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : { type : String, required : true},
    email : { type : String, required : true},
    password : { type : String, required : true},
    points : { type: Number,default : 0 },
    pushKey : { type : Object}
});



const LearningController = require('../../api/controllers/LearningController');
const moment = require('moment');


UserSchema.post('save',    async  (doc,next) =>{
    console.log('event user registering detected ',doc._id)
    const Card = require('../../api/models/Card');
    //add the new user to default cards owners and create learning for today
        let card = await  Card.findOneAndUpdate({_id : "5ce2ab0f18a9822a7ef05b7f"},{$push : { owners : doc._id} })
        await LearningController.createLearning(moment(),doc._id,card._id,true)
        card = await Card.findOneAndUpdate({_id : "5ce2ad5a50fe89bc88676cc1"},{$push : { owners : doc._id} })
        await LearningController.createLearning(moment(),doc._id,card._id,true)
        card = await Card.findOneAndUpdate({_id : "5ce2add898c50b2a5c2d042f"},{$push : { owners : doc._id} })
        await  LearningController.createLearning(moment(),doc._id,card._id,true);
    next()
})
const User = mongoose.model('User', UserSchema);
module.exports = User;
