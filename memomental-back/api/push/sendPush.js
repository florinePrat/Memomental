const webpush = require('web-push') //requiring the web-push module

const vapidKeys = {
    "subject": "mailto:memomental.app@gmail.com",
    "publicKey": "BON_Xmz-R2iIpUcyZmG4areWKYrtYayP9W1apwudRfdTRMqFzsbrlQ2vF-QDfTXXvOwimqHolwz1f7sNr-spGMA",
    "privateKey": "Skyt5hwHWUW5qOpGZlfe63MZDo-w81Y7oCyjRJc46Ww"
}
webpush.setVapidDetails(
    vapidKeys.subject,
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const sendNotification = (subscription, title, content) => {
    try {
        console.log('notification envoyée');
        const data = {title,content}
       return  webpush.sendNotification(subscription,data).catch((err) => {
           console.log(err);
       })
    }catch(error)
    {
        console.log(error)
    }

}


module.exports = {
    sendNotification,
}
