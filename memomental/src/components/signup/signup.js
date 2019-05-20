import React from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import API from '../../utils/auth';
import service from '../../utils/serviceFunctions'

// this is the singup and login page swip with js
export class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            password: "",
            isLoggedIn: false,
            error:false
        };
        this.handleChange.bind(this);
        this.send.bind(this);

        this.sendLog.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
        this.setState({error:""});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
        this.setState({error:""});
    }

    send = event => {
        if (this.state.email.length === 0) {
            this.setState({error:"email vide"});
        }
        else if (this.state.firstName.length === 0) {
            this.setState({error:"prenom vide"});
        }
        else if (this.state.password.length === 0 ) {
            this.setState({error:"mot de passe vide"});
        }else{
            API.signup(this.state.email, this.state.firstName, this.state.password).then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('points', res.data.points);
                localStorage.setItem('firstName', res.data.firstName);
                window.location = "/tutorial"
            }, error =>{
                console.log(error);
                this.setState({error:error.response.data.error});
            })
        }
        }
        ;

    sendLog = async () => {
        if (this.state.email.length === 0) {
            this.setState({error: "email vide"});
        } else if (this.state.password.length === 0) {
            this.setState({error: "mot de passe vide"});
        } else {

            const login = await API.login(this.state.email, this.state.password);
            if(login.status===200) {
                console.log(login.data.token);
                localStorage.setItem('token', login.data.token);
                localStorage.setItem('points', login.data.points);
                localStorage.setItem('firstName', login.data.firstName);
                window.location = "/card";

            } else {
                if (login.response) {
                    console.log(login.response.data.error);
                    this.setState({error: login.response.data.error});
                } else {
                    console.log(login);
                }
            }
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    GuestGreeting() {
        return (
            <div className="boxcarte">
                <h1> Connexion </h1>
                {this.state.error ?
                    <div style={{color:"red"}}>
                        {this.state.error}
                    </div>:false
                }
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
                {this.state.error ?
                    <div style={{color:"red"}}>
                        {this.state.error}
                    </div>:false
                }
                <p>Email</p>
                <FormGroup controlId="email" bssize="large">
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <p>Prénom</p>
                <FormGroup controlId="firstName" bssize="large">
                    <FormControl value={this.state.firstName} onChange={this.handleChange} type="name"/>
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
