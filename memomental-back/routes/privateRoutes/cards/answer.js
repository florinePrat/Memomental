const CardController = require('../../../api/controllers/CardController');
const LearningController = require('../../../api/controllers/LearningController');
const UserController = require('../../../api/controllers/CardController');
const State = require('../../../api/controllers/StateController');
const decodeToken = require('../../../api/encryption/decodeToken');
const moment = require('moment');

//@TODO : see how handle edit and add card in same file to avoid code duplication
module.exports = async (req, res) => {
    try {
        //@TODO : check id card id is mongo id and respond 400 if not
        const decoded=await decodeToken(req);
        console.log("arrivé dans answer");
        const  {_id,answer} = req.body.rep;
        console.log("requête " ,req.body.rep);
        console.log("token :" ,decoded.id);
        const card = await CardController.getCardById(_id);
        console.log(card)
        if(card.owners.indexOf(decoded.id)!==-1)
        { //if user can answer to this card
            console.log("is owner");
            const learning = await LearningController.getLearningByUserAndCard(decoded.id,_id);
            let validAnswer;
            if(learning.recto) {
                validAnswer = answer ===card.rectoAnswer?true:card.rectoAnswer;
            }
            else {
                validAnswer = answer ===card.versoAnswer?true:card.versoAnswer;
            }
            console.log("réponse valide :",validAnswer);
            //getting learning of this card for this user

            console.log("récupération du learning associé",learning);
            let  updatedLearning;
            if(validAnswer) {
                //getting state of this level +1
                const state = await State.getStateByLevel(learning.level+1);
                const nextDate = moment(learning.nextDate).add(state.frequence,"d")
                 updatedLearning  = await LearningController.updateLearning(learning._id,nextDate,state.level+1,!learning.recto);
            }
            else {
                if(learning.level===1)
                {
                    console.log('learning level =1');
                    //if already in level 1 we juste put it for tomorrow
                    const nextDate = moment(Date.now()).add("1","d");
                    console.log("nouvelle date",nextDate);
                   updatedLearning = await LearningController.updateLearning(learning._id,nextDate,"1",!learning.recto);
                }
                else {
                    console.log('learning level >1');
                    //getting state of this level -1
                    const state = await State.getStateByLevel(learning.level - 1);
                    //setting next date at frequence of -1 level
                    const nextDate = moment(learning.nextDate).add(state.frequence, "d");
                     updatedLearning = await LearningController.updateLearning(learning._id, nextDate, learning.level - 1, !learning.recto);
                }
            }
            console.log("nouveau learning",updatedLearning);
            return res.status(200).json( {validAnswer})
        }
        else{
            //else return unauthorized
            return res.status(403).send( {message : "Vous n'avez pas les droits pour répondre à cette carte"});
        }
    }catch(error) {
        console.log("shit happens in answer ")
        res.status(500).json(error.message);
    }
}
