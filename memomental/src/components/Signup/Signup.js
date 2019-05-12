import React from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import API from '../../utils/auth';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            prenom: "",
            nom: "",
            password: "",
            cpassword: "",
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
            return;
        }
        if (this.state.prenom.length === 0) {
            return;
        }
        if (this.state.nom.length === 0) {
            return;
        }
        if (this.state.password.length === 0 || this.state.password !== this.state.cpassword) {
            return;
        }
        API.signup(this.state.email, this.state.prenom, this.state.nom, this.state.password).then(function (data) {
           if(data.status=="200")
           {
               localStorage.setItem('token', data.data.token);
               window.location = "/Cartes"
           }
           else
           {
               console.log('erreur lors de la connexion ',data.message);
           }


        }, function (error) {
            console.log(error);
            return;
        })
    };

    sendLog = event => {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        API.login(this.state.email, this.state.password).then(function(data){
            localStorage.setItem('token', data.data.token);
            window.location = "/Cartes"
        },function(error){
            console.log(error);
            return;
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    GuestGreeting() {
        return (
            <div className="Login">
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
                    <Button
                        onClick={this.handleLoginClick}
                        bssize="large"
                        type="submit"
                    >
                        S'inscrire
                    </Button>
                </p>
                <Button
                    onClick={this.sendLog}
                    block
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
            <div className="Login">
                <h1> Inscription </h1>
                <p>Email</p>
                <FormGroup controlId="email" bsSize="large">
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <p>Prénom</p>
                <FormGroup controlId="prenom" bsSize="large">
                    <FormControl value={this.state.prenom} onChange={this.handleChange} type="name"/>
                </FormGroup>
                <p>Nom</p>
                <FormGroup controlId="nom" bsSize="large">
                    <FormControl value={this.state.nom} onChange={this.handleChange} type="name"/>
                </FormGroup>
                <p>Mot de passe</p>
                <FormGroup controlId="password" bsSize="large">
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <p>Confirmez mot de passe</p>
                <FormGroup controlId="cpassword" bsSize="large">
                    <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <p> Déjà inscrit ?
                    <Button
                        onClick={this.handleLogoutClick}
                        bssize="large"
                        type="submit"
                    >
                        Se connecter
                    </Button>
                </p>
                <Button
                    onClick={this.send}
                    block
                    bsSize="large"
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

export default Signup;