const mongoose = require('mongoose');

const LearningSchema = new mongoose.Schema({
    nextDate : { type : Date, required : true},
    recto : { type : Boolean, required : true},
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required : true},
    card : { type: mongoose.Schema.Types.ObjectId, ref: "Card", required : true },
    level : { type: Number, default : 1}
});

const Learning = mongoose.model('Learning', LearningSchema);
module.exports = Learning;
