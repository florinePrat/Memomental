/*
Card Controller handle all action with card database object : getting card by it's id and adding a new card
 */

const Card = require('../models/Card');
const Learning = require('../models/Card');

const getCardById = async (id) => {
    try {
        const card = await Card.findById(id);
        return card;
    } catch (error) {
        console.log("Impossible de trouver la carte demandée ");
        return error;
    }
};
const createCard = async (name, rectoQuestion, rectoAnswer, versoQuestion, versoAnswer,userId,labelId) => {
    try {
        console.log(name);
        const card = new Card({
            name: name,
            rectoQuestion: rectoQuestion,
            rectoAnswer: rectoAnswer,
            versoQuestion: versoQuestion,
            versoAnswer : versoAnswer,
            owners : [userId],
            labels : [labelId]
        });
        console.log('carte cree');
        const savedCard= await card.save();
        return savedCard
    } catch (error) {
        console.log(error.message);
        return error;
    }
};
const updateCard = async (id,name, rectoQuestion, rectoAnswer, versoQuestion, versoAnswer,labelId) => {
    try {
        console.log(id);
        return await Card.findOneAndUpdate({_id : id}, {$set :{ name: name,
                rectoQuestion: rectoQuestion,
                rectoAnswer: rectoAnswer,
                versoQuestion: versoQuestion,
                versoAnswer : versoAnswer,
                labels : [labelId]} },
            { new : true});
    } catch (error) {
        console.log(error.message);
        return error;
    }
};
const getCardsByUser = async(idUser) =>
{
    try {
        //searching all cards by user
        const cards = await Card.find({ owners : idUser}).populate('labels');
        console.log(cards);
        return cards;
    } catch(error)
    {
        console.log(error.message);
        return error;
    }
};
const isOwner = async(idUser,idCard) =>
{
    try {

        const isOwner = await Card.find({owners : idUser, _id : idCard });
        console.log(isOwner);
        return isOwner;
    } catch (error) {
        console.log(error.message);
        return error;
    }
};
const deleteCard = async(idCard) =>
{
    try {

        const deleted = await Card.deleteOne({_id : idCard});
        const deleteLearning = await Learning.deleteMany({ card : idCard});
        return deleted;
    } catch (error) {
        console.log("erreur lors de la suppression",error.message);
        return error;
    }
};

module.exports = {
    getCardById,
    createCard,
    getCardsByUser,
    updateCard,
    isOwner,
    deleteCard
};
