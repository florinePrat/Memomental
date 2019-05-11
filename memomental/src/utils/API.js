import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}
const burl = "http://localhost:8080"

export default {
    login : function(email,password) {
        return axios.post(burl + '/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })
    },
    signup : function(email,password,prenom,nom){
        return axios.post(burl + '/register',{
            'email' : email,
            'password' : password,
            'fisrtName' : prenom,
            'lastName' : nom
        },{
            headers: headers
        })
    },

    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    }
}
