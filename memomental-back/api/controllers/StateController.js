/*
State Controller handle all action with state database object :
 */

const State = require('../models/State');

const getStateByLevel = async (level) => {
    try {
        return await State.find({ level : level});
    } catch (error) {
        console.log("Impossible de trouver le state demandé ");
        return error;
    }
}
module.exports = {
    getStateByLevel
}
