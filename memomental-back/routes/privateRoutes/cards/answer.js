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
        console.log("answer " ,answer);
        console.log("token :" ,decoded.id);
        const card = await CardController.getCardById(_id);
        console.log(card)
        if(card.owners.indexOf(decoded.id)!==-1)
        { //if user can answer to this card
            console.log("is owner");
            const learning = await LearningController.getLearningByUserAndCard(decoded.id,_id);
            console.log('learning associé',learning)
            let validAnswer,wantedAnswer;
            if(learning.recto) {
                validAnswer = answer.toString().trim().toLowerCase()===card.rectoAnswer;
                wantedAnswer = card.rectoAnswer;
            }
            else {
                validAnswer = answer.toString().trim().toLowerCase()===card.versoAnswer;
                wantedAnswer = card.versoAnswer;
            }
            console.log("réponse valide :",validAnswer);
            //getting learning of this card for this user

            console.log("récupération du learning associé",learning);
            let  updatedLearning;
            if(validAnswer) {
                //getting state of this level +1
                const state = await State.getStateByLevel(learning.level+1);
                console.log("state",state)
                const nextDate = moment().add(state.frequence,"d").format();
                 updatedLearning  = await LearningController.updateLearning(learning._id,nextDate,learning.level+1,!learning.recto);
            }
            else {
                if(learning.level<="1")
                {
                    console.log('learning level =1');
                    //if already in level 1 we juste put it for tomorrow
                    const nextDate = moment().add("1","d").format();
                    console.log("nouvelle date",nextDate);
                   updatedLearning = await LearningController.updateLearning(learning._id,nextDate,"1",!learning.recto);
                }
                else {
                    console.log('learning level >1');
                    //getting state of this level -1
                    const state = await State.getStateByLevel(learning.level - 1);
                    console.log("state",state)
                    //setting next date at frequence of -1 level
                    let nextDate = moment();
                    nextDate.add(state.frequence,"d")
                    console.log(nextDate);
                     updatedLearning = await LearningController.updateLearning(learning._id, nextDate, learning.level - 1, !learning.recto);
                }
            }
            console.log("nouveau learning",updatedLearning);
            return res.status(200).json( {validAnswer,wantedAnswer})
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
