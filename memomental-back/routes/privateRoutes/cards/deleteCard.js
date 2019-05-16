const CardController = require('../../../api/controllers/CardController');
const LearningController = require('../../../api/controllers/LearningController');
const decodeToken = require('../../../api/encryption/decodeToken');
//@TODO : see how handle edit and add card in same file to avoid code duplication
module.exports = async (req, res) => {
    try {
        //@TODO : check if card id is mongo id, return  400 if not
        const decoded= await decodeToken(req);
        const _id = req.params.idCard;

        console.log("les paramètres sont ",req.params, "et l'utilisater : ",decoded.id)
        if( await CardController.isOwner(decoded.id,_id))
        { //if user can delete this card
            console.log("delete en cours")
            const deleted = await CardController.deleteCard(_id);
            if(deleted.deletedCount>0)
            {
                res.status(200).json({ message : "suppression réussie"});
            }
            else
            {
                res.status(400).json({message : "la suppression de la carte n'a pas fonctionné"});
            }

        }
        else
        {
            //else return unauthorized
            return res.status(403).send({message : "Vous n'avez pas les droits pour modifier cette carte"});
        }


    }catch(error) {
        console.log("shit happens in edit card ")
        return res.status(500).json(error.message);
    }
}
