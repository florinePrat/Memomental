import React, { Component } from 'react';
import API from "../../utils/API";
import {Button, FormControl, FormGroup} from "react-bootstrap";

class Recto extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            quest : "",
            rep : ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
        if(this.state.quest.length === 0){
            return;
        }
        if(this.state.rep.length === 0){
            return;
        }
        API.login(this.state.quest,this.state.rep).then(function(data){
            localStorage.setItem('token', data.data.token);
            window.location = "/Verso"
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
                <h1> Ajout d'une carte </h1>

                <div className="boxcarte">
                    <h2> Recto </h2>
                    <p>Question</p>
                    <FormGroup controlId="quest" bssize="large">
                        <FormControl autoFocus type="text" value={this.state.quest} onChange={this.handleChange}/>
                    </FormGroup>
                    <p>Réponse</p>
                    <FormGroup controlId="rep" bssize="large">
                        <FormControl type="text" value={this.state.rep} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button
                        onClick={this.send}
                        block
                        bssize="large"
                        type="submit"
                    >
                        Suivant
                    </Button>

                </div>
            </div>
        )
    }

}
export default Recto;