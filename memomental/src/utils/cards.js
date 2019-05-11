import axios from 'axios';
import {basicHeaders,tokenHeaders} from './headers';

const burl = "http://localhost:8080";


export default {
    addcard : function(nom,cat) {
        return axios.post(burl + '/card/add',{
            'nom' : nom,
            'cat' : cat
        },{
            headers: tokenHeaders
        })
    },

}

