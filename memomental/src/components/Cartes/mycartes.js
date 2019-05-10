import React, { Component } from 'react';
import API from "../../utils/API";
import {Button, FormControl, FormGroup} from "react-bootstrap";
var question = 'Quelle est la capitale de l autralie ? ';
var cat = 'Geographie';

class Mycarte extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            rep : ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
        if(this.state.rep.length === 0){
            return;
        }
        API.login(this.state.rep).then(function(data){
            localStorage.setItem('token', data.data.token);
            window.location = "/Mycarte"
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


    render(){
        return(
            <div className="container-fluid">
                <h1> Mes cartes </h1>

                <div className="boxcarte">
                    <h3>{cat}</h3>
                    <h2>{question}</h2>

                    <FormGroup controlId="rep" bssize="large">
                        <FormControl autoFocus type="text" value={this.state.rep} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button
                        onClick={this.send}
                        block
                        bssize="large"
                        type="submit"
                    >
                        Envoyer
                    </Button>

                </div>
            </div>
        )
    }

}
export default Mycarte;