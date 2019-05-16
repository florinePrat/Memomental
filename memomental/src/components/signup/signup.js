import React from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import API from '../../utils/auth';
import Alert from "react-bootstrap/Alert";

// this is the singup and login page swip with js
export class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            prenom: "",
            password: "",
            isLoggedIn: false
        };
        this.handleChange.bind(this);
        this.send.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    send = event => {
        if (this.state.email.length === 0) {
            return(
                [
                    'danger',
                ].map((variant, idx) => (
                    <Alert key={idx} variant={variant}>
                        This is a {variant} alert—check it out!
                    </Alert>
                )
                ));
        }
        if (this.state.prenom.length === 0) {
            return(
                alert('prenom vide')
            );
        }
        if (this.state.password.length === 0 ) {
            return(
                alert('votre mot de passe est vide ou il est different de la confirmation')
            );
        }
        API.signup(this.state.email, this.state.prenom, this.state.password).then(function (data) {
           if(data.status==="200")
           {
               localStorage.setItem('token', data.token);
                window.location = "/card"
           }
           else
           {
               alert(data.message);
           }


        }, function (error) {
            console.log(error);
            return;
        })
    };

    sendLog = event => {
        if(this.state.email.length === 0){
            return(
                alert('mail vide')
            );
        }
        else if(this.state.password.length === 0){
            return(
                alert('mot de passe vide')
            );
        }
        else{
            API.login(this.state.email, this.state.password).then(function(data){
                console.log(data.data.token);
                localStorage.setItem('token', data.data.token);
                window.location = "/card"
            }).catch(function(error){
                console.log(error);
                return;})

            }
        }

    ;

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    GuestGreeting() {
        return (
            <div className="boxcarte">
                <h1> Connexion </h1>
                <p>Email</p>
                <FormGroup controlId="email" bssize="large">
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <p>Mot de passe</p>
                <FormGroup controlId="password" bssize="large">
                    <FormControl  value={this.state.password} onChange={this.handleChange}  type="password" />
                </FormGroup>
                <p> Pas de compte ?
                    <a href="#"
                        onClick={this.handleLoginClick}
                    >
                        S'inscrire
                    </a>
                </p>
                <Button
                    className="btn-info"
                    onClick={this.sendLog}
                    bssize="large"
                    type="submit"
                >
                    Se connecter
                </Button>
            </div>
        )
    }

    UserGreeting() {
        return (
            <div className="boxcarte">
                <h1> Inscription </h1>
                <p>Email</p>
                <FormGroup controlId="email" bssize="large">
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <p>Prénom</p>
                <FormGroup controlId="prenom" bssize="large">
                    <FormControl value={this.state.prenom} onChange={this.handleChange} type="name"/>
                </FormGroup>
                <p>Mot de passe</p>
                <FormGroup controlId="password" bssize="large">
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <p> Déjà inscrit ?
                    <a href = "#"
                        onClick={this.handleLogoutClick}
                    >
                        Se connecter
                    </a>
                </p>
                <Button
                    className="btn-info"
                    onClick={this.send}
                    bssize="large"
                    type="submit"
                >
                    Inscription
                </Button>
            </div>
        )
    }



    render() {
        return (

            <div>
                {
                    this.state.isLoggedIn
                        ? this.UserGreeting()
                        : this.GuestGreeting()
                }
            </div>
        );
    }
}

export default signup;
