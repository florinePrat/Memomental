const State = require('../api/models/State');
const Card = require('../api/models/Card');
const Label = require('../api/models/Label');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('dotenv').config();

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI, {
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
            //insert 3 default card in database
        const insertLabel  = async (obj) => {
            try {
                let label  = await Label.findById(obj._id);
                if (label === null) {
                    label = new Label(obj);
                    await label.save();
                }
                return label
            } catch(error){
                console.log("cette carte est déjà dans la base ");
                return error;
            }
        }
        const label1  = await insertLabel({
            _id : "5ce2ac2421a8b34a99f6ba34",
            name : "Histoire",
            color : "orange"
        })
        const label2  = await insertLabel({
            _id : "5ce2ac97ac87c8937a60f06e",
            name : "Capitale",
            color : "green"
        });
        const label3  = await insertLabel({
            _id : "5ce2ae6593ca0ecd7278d53b",
            name : "Langue française",
            color : "blue"
        })
        const insertCard = async (obj) => {
            try {
                const alreadyExec = await Card.findById(obj._id);
                if (alreadyExec === null) {
                    let card = new Card(obj);
                    await card.save();
                }
            } catch(error){
                console.log("cette carte est déjà dans la base ");
                return error;
            }
        }

        await insertCard( {
            _id : "5ce2ab0f18a9822a7ef05b7f",
            name : "Capitale de l'Australie",
            labels : [label2._id],
            recto : "Quelle est la capitale de l'Australie",
            verso : "Canberra",
            versoQuestion : "De quel pays Canberra est elle la capitale ?",
            versoAnswer : "Australie"
            })
        await insertCard( {
                _id : "5ce2ad5a50fe89bc88676cc1",
                name : "Année de naissance d'Albert Einstein",
                labels : [label1._id],
                recto : "Quelle est l'année de naissance d'Albert Einstein ?",
                verso : "1879",
                versoQuestion : "Quel scientifique est né en 1879 ?",
                versoAnswer : "Albert Einstein"
            })
        await insertCard( {
            _id : "5ce2add898c50b2a5c2d042f",
            name : "Alexandrin",
            labels : [label3._id],
            recto : "Qu'est ce qu'un vers de 12 syllabes ?",
            verso : "Alexandrin",
            versoQuestion : "Qu'est ce qu'un Alexandrin ?",
            versoAnswer : "Vers de 12 syllabes"
        })
        console.log("db set");
            return true;
    } catch (error) {
        console.log(error.message)
        return error;
    }
}


