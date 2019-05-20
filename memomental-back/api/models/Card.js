const mongoose = require('mongoose');
const UserController = require('../../api/controllers/UserController');
const sgMail = require('@sendgrid/mail');
const CardSchema = new mongoose.Schema({
    name : { type : String, required : true},
    versoQuestion : { type : String, required : true},
    rectoQuestion : { type : String, required : true},
    versoAnswer : { type : String, required : true},
    rectoAnswer : { type : String, required : true},
    owners : [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    labels : [{type:mongoose.Schema.Types.ObjectId, ref:"Label"}]
});







CardSchema.post('save',    async  (doc) => {
    try {
        console.log('event add card  detected ',doc._id)

        const count = await Card.count({owners :  doc.owners[0]});
        console.log("nombre de cartes de l'utilisateur",count)
        //if the card is 10th of the user, we send him a mail to congratulate
        if(count===10) {
            const user = await UserController.getUserById(doc.owners[0]);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: user.email.toString(),
                from: 'memomental.app@gmail.com',
                subject: '10ème carte ajoutée',
                text: 'Félicitations',
                html: "<strong>Félicitations, vous venez d'ajouter votre dixième carte. Vous pourrez bientôt acheter des packs de cartes par thématiques </strong>",
            };

            const res = await sgMail.send(msg);
            console.log("envoi réussi")
        }
    } catch (error) {
        console.log(error.response.body);
    }
})
const Card = mongoose.model('Card', CardSchema);
module.exports = Card;
