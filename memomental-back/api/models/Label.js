const mongoose = require('mongoose')

const LabelSchema = new mongoose.Schema({
    name : { type : String, required : true},
    color : { type : String, required : true},
    cards : [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }]
})

const Label = mongoose.model('Label', LabelSchema);
module.exports = Label;
