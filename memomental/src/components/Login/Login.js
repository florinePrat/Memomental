import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from '../../utils/API';
import { Link } from 'react-router-dom'

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
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
    handleChange = event2 => {
        this.setState({
            [event2.target.id]: event2.target.value
        });
    };

    render() {
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
                <p> Pas de compte ?  <Link to="/Signup"> S'inscrire </Link> </p>
                    <Button
                        onClick={this.send}
                        block
                        bssize="large"
                        type="submit"
                    >
                        Se connecter
                    </Button>
            </div>
        )
    }
}
