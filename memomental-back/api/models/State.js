const mongoose = require('mongoose');

/* State :
level : represent level of learning and also points to win at each good answer at this level
frequence : stored in number of days, represent de gap between two learning
 */
const StateSchema = new mongoose.Schema({
    level : { type : Number, required : true},
    frequence : { type : Number, required : true}
})

const State = mongoose.model('State', StateSchema);
module.exports = State;
