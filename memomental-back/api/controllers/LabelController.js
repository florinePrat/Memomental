/*
Label Controller handle all action with label database object :
 */

const Label = require('../models/Label');

const getLabelById = async (id) => {
    try {
        const label = await Label.findById(id);
        return label;
    } catch (error) {
        console.log("Impossible de trouver la catégorie demandée ");
        return error;
    }
};
const createLabel = async (name,color) => {
    try {
        console.log(name);
        const label = new Label({
            name: name,
            color : color,
        });
        console.log('label ajouté');
        const savedLabel= await label.save();
        return savedLabel;
    } catch (error) {
        console.log(error.message);
        return error;
    }
};
const getLabelByName = async(name) => {
    try {
        console.log("est appelé");
        const label = await Label.find({name: name});
        console.log(label);
        return label[0];
    } catch (error) {
        console.log("erreur lors de la recheche")
    }
};


module.exports = {
    getLabelById,
    createLabel,
    getLabelByName,
};
