 let schedule = require('node-schedule');
 const User = require('../models/User');
 const LearningController = require('../controllers/LearningController');
 const webpush = require("web-push");

 schedule.scheduleJob('*50 * * * * *', async () => {
     console.log('try to send push');
     const users = await User.find({});
     webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
     webpush.setVapidDetails(
         "mailto:your-email-address@example-domain.com",
         "BON_Xmz-R2iIpUcyZmG4areWKYrtYayP9W1apwudRfdTRMqFzsbrlQ2vF-QDfTXXvOwimqHolwz1f7sNr-spGMA",
         "Skyt5hwHWUW5qOpGZlfe63MZDo-w81Y7oCyjRJc46Ww"
     )
     users.forEach( async user => {
         console.log(user)
         if (user.pushKey) {
             const learning = await LearningController.getTodayLearnings(user._id);
             console.log(user.pushKey)
             if(learning.length)
             {
                 const notif  = {
                     title: "Notification quotidienne",
                     body: "Vous avez "+learning.length+" cartes aujourd'hui",
                     icon: "./favicon.ico"
                 }
                 webpush.sendNotification(user.pushKey,JSON.stringify(notif)  )
                     .then( res => {console.log(res)})
                     .catch( err => { console.log(err)});
             }
         }
     })
     console.log("send push")
 })


