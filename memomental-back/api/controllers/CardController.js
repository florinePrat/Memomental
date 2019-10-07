/*
Card Controller handle all action with card database object : getting card by it's id and adding a new card
 */

const Card = require('../models/Card');
const Label = require('../models/Label');
const Learning = require('../models/Learning');

const getCardById = async (id) => {
    try {
        const card = await Card.findById(id);
        return card;
    } catch (error) {
        console.log("Impossible de trouver la carte demandée ");
        return error;
    }
};
const createCard = async (name, recto, verso,userId,labelId) => {
    try {
        const card = new Card({
            name: name,
            recto: recto,
            verso : verso,
            owners : [userId],
            labels : [labelId]
        });
        return  await card.save();
    } catch (error) {
        console.log(error.message);
        return error;
    }
};
const updateCard = async (id,name, recto, verso,labelId) => {
    try {
        console.log(id);
        return await Card.findOneAndUpdate({_id : id}, {$set :{ name: name,
                recto: recto,
                verso: verso,
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
        return cards;
    } catch(error)
    {
        console.log(error.message);
        return error;
    }
};

const getCardsByUserLabels = async(idUser,idLabel) =>
{
    try {
        //searching all cards by user and by labels
        const card = await Card.find({owners : idUser, labels : idLabel}).populate("labels");
        console.log("ketchi"+card[0].labels);
        return card;
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
        const deleteLearning = await Learning.remove({ card : idCard});
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
    deleteCard,
    getCardsByUserLabels,
};
