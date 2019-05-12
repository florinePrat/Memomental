const CardController = require('../../../api/controllers/CardController');

module.exports = async (req, res) => {
    try {
        console.log("arrivé route ajout carte");
          const  name = req.body.nom;
          console.log(name);
          const card = await CardController.createCard(name,"a","b","c","d");
          console.log(card);
        return res.status(200).json(card)
    }catch(error) {
        console.log("shit happens")
        res.status(error.code).json(error.message);
    }
    }


