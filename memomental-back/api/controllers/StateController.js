/*
State Controller handle all action with state database object :
 */

const State = require('../models/State');

const getStateByLevel = async (level) => {
    try {
        const state = await State.find({ level : level});
        return state[0];
    } catch (error) {
        console.log("Impossible de trouver le state demandé ");
        return error;
    }
};
module.exports = {
    getStateByLevel
};
