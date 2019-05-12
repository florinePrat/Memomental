const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    points : { type : Number, required : true},
    frequence : { type : Date, required : true}
})

const State = mongoose.model('State', StateSchema);
module.exports = State;
