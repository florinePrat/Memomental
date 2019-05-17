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
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    send = event => {
        if (this.state.email.length === 0) {
            return(
                alert('email vide')
            );
        }
        else if (this.state.firstName.length === 0) {
            return(
                alert('firstName vide')
            );
        }
        else if (this.state.password.length === 0 ) {
            return(
                alert('votre mot de passe est vide ou il est different de la confirmation')
            );
        }else{
            API.signup(this.state.email, this.state.firstName, this.state.password).then(res => {
                localStorage.setItem('token', res.data.token);
                window.location = "/card"
            }, error =>{
                console.log(error);
                this.setState({error:error.response.data.error});
            })
        }
        }
        ;

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
            API.login(this.state.email, this.state.password).then(res =>{
                console.log(res.data.token);
                localStorage.setItem('token', res.data.token);
                window.location = "/card"
            }, error=>{
                console.log(error.response.data.error);
                this.setState({error:error.response.data.error});})

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
