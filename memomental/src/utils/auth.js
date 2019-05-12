import axios from 'axios';
import {basicHeaders} from './headers';

const burl = "http://localhost:8080";


export default {
    login : function(email,password) {
        return axios.post(burl + '/login',{
            'email' : email,
            'password' : password
        },{
            headers: basicHeaders
        })
    },
    signup : function(email,prenom,nom,password){
        return axios.post(burl + '/register',{
            'email' : email,
            'password' : password,
            'firstName' : prenom,
            'lastName' : nom
        },{
            headers: basicHeaders
        })
    },

    isAuth : function() {
        return localStorage.getItem('token') !== null;
    },
    logout : function() {
        localStorage.clear();
    }
}

