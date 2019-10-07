const CardController = require('../../../api/controllers/CardController');
const LabelController = require('../../../api/controllers/LabelController');
const decodeToken = require('../../../api/encryption/decodeToken');
//@TODO : see how handle edit and add card in same file to avoid code duplication
module.exports = async (req, res) => {
    try {
        //@TODO : check if card id is mongo id, return  400 if not
        const decoded= await decodeToken(req);
        const  {_id,name, recto, verso, label} = req.body;
        if( await CardController.isOwner(decoded.id,_id))
        { //if user can edit this card
            let labelObject = await  LabelController.getLabelByName(label);
            if(labelObject ===undefined)
            {
                console.log("le label n'existe pas");
                labelObject = await LabelController.createLabel(label,'blue');
            }
            const card = await CardController.updateCard(_id,name,recto, verso,labelObject._id);
            return card===null?res.status(404):res.status(200).json(card);
        }
        else
        {
            //else return unauthorized
            return res.status(403).send({message : "Vous n'avez pas les droits pour modifier cette carte"});
        }


    }catch(error) {
        console.log("shit happens in edit card ");
        return res.status(500).json(error.message);
    }
}


