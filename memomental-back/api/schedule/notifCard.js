const push = require('../push/sendPush');
let schedule = require('node-schedule');
const User = require('../models/User');


        schedule.scheduleJob('* */5 * * * *', async () => {
            console.log('try to send push')
            const users = await User.find({});
            users.forEach(function (user) {
                console.log(user.pushKey)
                if (user.pushKey) {
                    push.sendNotification(user.pushKey, "Notification quotidienne", "Vous avez 3 cartes aujourd'hui");
                }
            })
            console.log("send push")
        })


