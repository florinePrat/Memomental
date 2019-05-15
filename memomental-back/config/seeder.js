const State = require('../api/models/State');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('dotenv').config();

// Connect to Mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})

mongoose.connection.once('open', function() {
    console.log('Connected to mongoDB')
    init().then(function(res){console.log("state added")}).catch(function(res){console.log("erreur")});

}).on('error', function(error){
    console.log('Connection error:', error)
})

const init = async() => {
    try{
        const insert = async (obj) => {
            try {
                const alreadyExec = await State.findById(obj._id);
                if (alreadyExec === null) {
                    let state = new State(obj);
                    await state.save();
                }
            } catch(error){
                console.log("cet état est déjà dans la base ");
                return error;
            }
        }
        await insert({
                _id: "5cda740a1a0c8ee06c7f369e",
                level: "1",
                frequence: "1"
            });

        await insert({
                _id: "5cda949573bfe407ebe643e8",
                level: "2",
                frequence: "2"
            });
        await insert({
                _id: "5cda949ba6a61871c8c3907a",
                level: "3",
                frequence: "4"
            });
            await insert({
                _id: "5cda94a068d21796f447d707",
                level: "4",
                frequence: "8"
            });
            await insert({
                _id: "5cda94a4ed872d92e1f38248",
                level: "5",
                frequence: "16"
            });
            await insert({
                _id: "5cdaa7b90bac0fb5ea63facf",
                level: "6",
                frequence: "32"
            });
            await insert({
                _id: "5cda94ed86d3a1987fad21c7",
                level: "7",
                frequence: "64"
            });
            await insert({
                _id: "5cda94f40bc06048429a1370",
                level: "8",
                frequence: "128"
            });
            return true;
    } catch (error) {
        console.log(error.message)
        return error;
    }
}


