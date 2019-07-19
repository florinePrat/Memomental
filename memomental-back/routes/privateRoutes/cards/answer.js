const CardController = require('../../../api/controllers/CardController');
const LearningController = require('../../../api/controllers/LearningController');
const UserController = require('../../../api/controllers/UserController');
const State = require('../../../api/controllers/StateController');
const decodeToken = require('../../../api/encryption/decodeToken');
const moment = require('moment');
const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i


module.exports = async (req, res) => {
    try {
        const decoded=await decodeToken(req);
        const  {_id,answer} = req.body.rep;
        if (!_id.match(checkForHexRegExp)){
            //if id card is an mongoose objectId
            return res.status(400).json({error : "Cette carte n'est reconnu"});
        }else if (!answer){
            return res.status(400).json({error : "Veuillez fournir une réponse"});
        }else{
            const card = await CardController.getCardById(_id);
            //if user can answer to this card
            if(card.owners.indexOf(decoded.id)!==-1)
            {
                //getting learning of this card for this user
                const learning = await LearningController.getLearningByUserAndCard(decoded.id,_id);
                let validAnswer,wantedAnswer;
                if(learning.recto) {
                    validAnswer = answer.toString().trim().toLowerCase()===card.verso;
                    wantedAnswer = card.verso;
                }
                else {
                    validAnswer = answer.toString().trim().toLowerCase()===card.versoAnswer;
                    wantedAnswer = card.versoAnswer;
                }
                let  updatedLearning,message, user;
                if(validAnswer) {
                    //getting state of this level +1
                    if (learning.level===8){
                        const message = "Félicitations vous avez atteint le niveau maximum pour cette carte";
                    }
                    const state = await State.getStateByLevel(learning.level+1);
                    const nextDate = moment().add(state.frequence,"d").format();
                    updatedLearning  = await LearningController.updateLearning(learning._id,nextDate,learning.level+1,!learning.recto);
                    user = await UserController.addPoint(decoded.id, learning.level);
                    message = "Vous avez gagné "+learning.level+" points"
                }
                else {
                    if(learning.level<="1"){
                        console.log('learning level =1');
                        //if already in level 1 we just put it for tomorrow
                        const nextDate = moment().add("1","d").format();
                        updatedLearning = await LearningController.updateLearning(learning._id,nextDate,1,!learning.recto);
                    } else {
                        //getting state of this level -1
                        const state = await State.getStateByLevel(learning.level - 1);
                        console.log("state",state);
                        //setting next date at frequence of -1 level
                        let nextDate = moment();
                        nextDate.add(state.frequence,"d");
                        updatedLearning = await LearningController.updateLearning(learning._id, nextDate, learning.level - 1, !learning.recto);
                    }
                }
                return res.status(200).json( {validAnswer,wantedAnswer,message,points:user?user.points:false})
            }
            else{
                //else return unauthorized
                return res.status(403).send( {message : "Vous n'avez pas les droits pour répondre à cette carte"});
            }
        }

    }catch(error) {
        res.status(500).json({error : "Error lors de la gestion des reponses :"+error});
    }
};
