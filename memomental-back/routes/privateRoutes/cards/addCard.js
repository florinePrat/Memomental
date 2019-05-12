const CardController = require('../../../api/controllers/CardController');
const LabelController = require('../../../api/controllers/LabelController');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        console.log("arrivé route ajout carte");
          const  {nom, cat, quest1, rep1, quest2 , rep2} = req.body;
          console.log("ctégorie :", cat)
          console.log(req.body);
        const token = req.headers["authorization"].split(" ")[1];
        const decoded = jwt.decode(token);
          let label = await  LabelController.getLabelByName(cat);
          console.log('label by name OK ',label);
          if(label ===undefined)
          {
              console.log("poas de label");
              label = await LabelController.createLabel(cat,'blue');
          }
          console.log("id du label créé  :",label._id);
          const card = await CardController.createCard(nom,quest1,rep1,quest2,rep2,decoded.id,label._id);
          console.log("création de carte");
          label = await LabelController.addCard(label._id,card._id)
        console.log("maj du label")
         console.log(label);
          console.log(card);
        return res.status(200).json(card)
    }catch(error) {
        console.log("shit happens in add card ")
        res.status(error.code).json(error.message);
    }
    }


