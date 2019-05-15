/*
Learning Controller handle all action with learning database object : getting learning by it's id and adding a new learning
 */

const Learning = require('../models/Learning');
const moment = require('moment');


const getLearningByUserAndCard = async (userId,cardId) => {
    try {
        const learning =  await Learning.find({ user : userId, card : cardId});
        return learning[0];
    } catch (error) {
        console.log("Impossible de trouver le learning demandé ");
        return error;
    }
}
const createLearning = async (nextDate, userId, cardId,recto) => {
    try {
        console.log(nextDate);
        const learning = new Learning({
            nextDate: nextDate,
            recto: recto,
            user: userId,
            card: cardId,
        });
        const savedLearning= await learning.save();
        console.log('learning cree');
        return savedLearning
    } catch (error) {
        console.log(error.message)
        return error;
    }
}
const updateLearning = async(id,nextDate, level,recto) =>
{
    try {
        console.log("id : ",id,"nextDate",nextDate,level,recto);
        const learning = await Learning.findOneAndUpdate(
            {_id : id},
            {$set : { nextDate : nextDate, level : level, recto : recto}},
            {new : true});
        console.log("in update",learning);
        return learning;
    } catch(error)
    {
        console.log(error.message)
        return error;
    }
}
/*  today is in date format : dd/MM/YYYY" */
const getTodayLearnings = async(idUser) =>
{
    try {
        //searching all learnings by user of today
        const today = moment().add("3","d").format("YYYY-MM-DD");
            console.log(today)
        const cards = await Learning.find({ user : idUser, nextDate : {$lte: today}}).populate([{path : 'card', populate : ["labels"]}]);
        console.log(cards);
        return cards;
    } catch(error)
    {
        console.log(error.message)
        return error;
    }
}
module.exports = {
    getLearningByUserAndCard,
    createLearning,
    updateLearning,
    getTodayLearnings,
}
