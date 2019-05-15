import axios from 'axios';
import {tokenHeaders} from './headers';

const burl = "http://localhost:8080";

// this is the request for card's actions
export default {
    addcard : function(nom,cat,quest1,rep1,quest2,rep2) {
        console.log(tokenHeaders)
        return axios.post(burl + '/api/card/add',{
            'nom' : nom,
            'cat' : cat,
            'quest1' : quest1,
            'rep1' : rep1,
            'quest2' : quest2,
            'rep2' : rep2
        },{
            headers: tokenHeaders
        })
    },

    dayCard : function(rep) {
        console.log(tokenHeaders);
        return axios.post(burl + '/api/card/answer',{
            'rep' : rep
        },{
            headers: tokenHeaders
        })
    },

    myDayCard : function(res) {
        console.log(tokenHeaders);
        return axios.get(burl + '/api/card/today',{
            headers: tokenHeaders
        })
            .then(res => {
                    const cards = res.data;
                    this.setState({cards})
                }
            )
    },

    userCard : function(res) {
        console.log(tokenHeaders);
        return axios.get(burl + '/api/card/getCardsByUser',{
            headers: tokenHeaders
        })
            .then(res => {
                    const cards = res.data;
                    this.setState({cards})
                }
            )
    },

    updateCard : function(_id, name, label, rectoQuestion, versoQuestion, rectoAnswer, versoAnswer) {
        console.log(tokenHeaders);
        return axios.put(burl + '/api/card/edit',{
            '_id' : _id,
            'name': name,
            'label': label,
            'rectoQuestion': rectoQuestion,
            'versoQuestion': versoQuestion,
            'rectoAnswer': versoAnswer,
            'versoAnswer': versoAnswer
        },{
            headers: tokenHeaders
        })
    },



}

