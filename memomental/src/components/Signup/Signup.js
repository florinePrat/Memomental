import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from '../../utils/API';
import { Link } from 'react-router-dom'

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            prenom: "",
            nom: "",
            password: "",
            cpassword: ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
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
        var _send = {
            email: this.state.email,
            prenom: this.state.prenom,
            nom: this.state.nom,
            password: this.state.password
        };
        API.signup(_send).then(function (data) {
            localStorage.setItem('token', data.data.token);
            window.location = "/dashboard"
        }, function (error) {
            console.log(error);
            return 0;
        })
    };
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
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
                <p> Déjà inscrit ?  <Link to="/Login"> Se connecter </Link> </p>
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
}