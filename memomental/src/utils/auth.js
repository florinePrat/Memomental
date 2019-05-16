import axios from 'axios';
import {basicHeaders} from './headers';

const burl = "https://memomental.herokuapp.com";

// this is the request for authentification
export default {
    login : function(email,password) {
        return axios.post(burl + '/login',{
            'email' : email,
            'password' : password
        },{
            headers: basicHeaders
        })
    },
    signup : function(email,prenom,password){
        return axios.post(burl + '/register',{
            'email' : email,
            'password' : password,
            'firstName' : prenom,
        },{
            headers: basicHeaders
        })
    },

    isAuth : function() {
        return true//localStorage.getItem('token') !== null;
    },

    logout : function() {
        localStorage.clear();
    }
}

