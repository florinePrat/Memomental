const webpush = require("web-push");
const UserController = require("../controllers/UserController");
const decodeToken = require('../encryption/decodeToken');
require('dotenv').config()

module.exports = async (req, res) => {
    try {
        console.log(process.env.GOOGLE_API_KEY)
        webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
        webpush.setVapidDetails(
            "mailto:your-email-address@example-domain.com",
            "BON_Xmz-R2iIpUcyZmG4areWKYrtYayP9W1apwudRfdTRMqFzsbrlQ2vF-QDfTXXvOwimqHolwz1f7sNr-spGMA",
            "Skyt5hwHWUW5qOpGZlfe63MZDo-w81Y7oCyjRJc46Ww"
        )
        const token = await decodeToken(req)
    console.log("token",token)
        let subscription = req.body
        console.log(subscription)
        const user =  await UserController.addPushKey(token.id,subscription)
        console.log(user)
        const testData = {
            title: "Bienvenue sur Memomental",
            body: "Memomental vous avertira tous les jours à 18h pour apprendre vos cartes",
            icon: "./favicon.ico"
        }
        webpush.sendNotification(subscription, JSON.stringify(testData))
        return res.status(201).json("registered")
    } catch (error){
        return res.status(500).json({error : "Impossible d'enregistrer l'utilisateur"+error})
    }
}
