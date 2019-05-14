const CardController = require('../../../api/controllers/CardController');
const decodeToken = require('../../../api/encryption/decodeToken');
//@TODO : see how handle edit and add card in same file to avoid code duplication
module.exports = async (req, res) => {
    try {
        //@TODO : check id card id is mongo id and respond 400 if not
        const decoded=await decodeToken(req);
        console.log("arrivé dans answer");
        const  {_id,recto,answer} = req.body;
        console.log(decoded.id);
        const card = await CardController.getCardById(_id)
        console.log(card)
        if(card.owners.indexOf(decoded.id)!==-1)
        { //if user can answer to this card
            console.log("is owner");
            let validAnswer;
            if(recto)
            {
                validAnswer = answer ===card.rectoAnswer;
            }
            else
            {
                validAnswer = answer ===card.versoAnswer;
            }
            console.log('valide ou non valide');
            return res.status(200).json( {validAnswer})
        }
        else
        {
            //else return unauthorized

            return res.status(403).send( {message : "Vous n'avez pas les droits pour répondre à cette carte"});
        }
    }catch(error) {
        console.log("shit happens in answer ")
        res.status(error.code).json(error.message);
    }
}
