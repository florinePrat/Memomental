const CardController = require('../../../api/controllers/CardController');
const LabelController = require('../../../api/controllers/LabelController');
const LearningController = require('../../../api/controllers/LearningController');
const decodeToken = require('../../../api/encryption/decodeToken');
const moment = require('moment');

module.exports = async (req, res) => {
    try {
        const  {nom, cat, quest1, rep1, quest2 , rep2} = req.body;
        if (!nom || !cat || !quest1 || !rep1 || !quest2 || !rep2){
            return res.status(400).json({error : "Erreur : le formulaire est incomplet"});
        }else{
            const decoded= await decodeToken(req);
            console.log("id de l'utilisateur" ,decoded);
            catclean = cat.toString().toLowerCase().trim();
            let label = await  LabelController.getLabelByName(catclean);
            if(label ===undefined)
            {
                //creating random color
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                //if this label doesn't exit we create one
                label = await LabelController.createLabel(catclean,color);
            }
            const card = await CardController.createCard(nom.toLowerCase(),quest1.toLowerCase(),rep1.toLowerCase(),quest2.toLowerCase(),rep2.toLowerCase(),decoded.id,label._id);
            //we add one day to current date to set de first learning of the new card at tomorrow
            const nextDate = moment();
            console.log("nouvelle date",nextDate);
            const learning = await LearningController.createLearning(nextDate,decoded.id,card._id,true);
            //@TODO : return card with good name label
            console.log("learning ajouté :",learning);
            console.log("création de carte");
            console.log(card);
            return res.status(200).json(card)
        }

    }catch(e) {
        return{
            error : "Impossible d'ajouter la carte"
        };
    }
};


