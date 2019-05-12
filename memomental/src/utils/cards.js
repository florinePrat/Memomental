import axios from 'axios';
import {tokenHeaders} from './headers';

const burl = "http://localhost:8080";


export default {
    addcard : function(nom,cat) {
        return axios.post(burl + 'api/card/add',{
            'nom' : nom,
            'cat' : cat
        },{
            headers: tokenHeaders
        })
    },

}

