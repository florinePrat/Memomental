const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    name : { type : String, required : true},
    versoQuestion : { type : String, required : true},
    rectoQuestion : { type : String, required : true},
    versoAnswer : { type : String, required : true},
    rectoAnswer : { type : String, required : true},
    //labels : [{type:mongoose.Schema.Label.ObjectId, ref:"Label"}]
})

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;
