/*
Card Controller handle all action with card database object : getting card by it's id and adding a new card
 */

const Card = require('../models/Card');

getCardById = async (id) => {
    try {
        const card = await Card.findById(id)
        return card
    } catch (error) {
        console.log("Impossible de trouver la carte demandée ");
        throw error
    }
}
const createCard = async (name, rectoQuestion, rectoAnswer, versoQuestion, versionAnswer) => {
    try {
        console.log(name);
        const card = new Card({
            name: name,
            rectoQuestion: "rectoQuestion",
            rectoAnswer: "rectoAnswer",
            versoQuestion: "versoQuestion",
            versoAnswer : "versionAnswer",
        });
        console.log('carte cree');
        const savedCard= await card.save()
        return savedCard
    } catch (error) {
        console.log(error.message)
        return error;
    }
}

module.exports = {
    getCardById,
    createCard,
};
