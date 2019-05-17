const CardController = require('../../../api/controllers/CardController');
const LabelController = require('../../../api/controllers/LabelController');
const LearningController = require('../../../api/controllers/LearningController');
const decodeToken = require('../../../api/encryption/decodeToken');
const moment = require('moment');

module.exports = async (req, res) => {
    try {
          const  {nom, cat, quest1, rep1, quest2 , rep2} = req.body;
        const decoded= await decodeToken(req);
        console.log("id de l'utilisateur" ,decoded);
          let label = await  LabelController.getLabelByName(cat);
          if(label ===undefined)
          {
              //if this label doesn't exit we create one
              label = await LabelController.createLabel(cat,'blue');
          }
          const card = await CardController.createCard(nom,quest1,rep1,quest2,rep2,decoded.id,label._id)
        //we add one day to current date to set de first learning of the new card at tomorrow
        const nextDate = moment();
          console.log("nouvelle date",nextDate)
            const learning = await LearningController.createLearning(nextDate,decoded.id,card._id,true);
          //@TODO : return card with good name label
          console.log("learning ajouté :",learning);
          console.log("création de carte");
          console.log(card);
        return res.status(200).json(card)
    }catch(error) {
        console.log("shit happens in add card :",error);
        res.status(error.code).json(error.message);
    }
    }


