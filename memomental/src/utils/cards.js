import axios from 'axios';
import {tokenHeaders} from './headers';

const burl = "http://localhost:8080";


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
        console.log(tokenHeaders)
        return axios.post(burl + '/api/card/day',{
            'rep' : rep
        },{
            headers: tokenHeaders
        })
    },



}

