const webpush = require('web-push') //requiring the web-push module

const vapidKeys = {
    "subject": "mailto:memomental.app@gmail.com",
        "publicKey": "BD0TmPuPu0nkeq5fNbe5_KGdK3n3Uj-w97aS1Gw3QiIopbbVsr9tzz5boJmO2h8Na3mOOeTNfGo4sC32QN1oATU",
        "privateKey": "GMomZDsqO9j9qZRyPQ4uKGpMMIl9LNNux2dDj-vVnXM"
}
webpush.setVapidDetails(
    vapidKeys.subject,
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const sendNotification = (subscription, dataToSend) => {
    webpush.sendNotification(subscription, "Premier push")
}


module.exports = {
    sendNotification,
}
