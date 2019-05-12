import React from 'react';
import API from "../../utils/auth";
import {Button, FormControl, FormGroup} from "react-bootstrap";

class Recto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quest1: "",
            rep1: "",
            quest2: "",
            rep2: "",
            isRectoIn: false
        };
        this.handleChange.bind(this);
        this.send.bind(this);
        this.handleRectoClick = this.handleRectoClick.bind(this);
        this.handleVersoClick = this.handleVersoClick.bind(this);
    }

    handleRectoClick() {
        this.setState({isRectoIn: true});
    }

    handleVersoClick() {
        this.setState({isRectoIn: false});
    }

    send = event => {
        if (this.state.quest1.length === 0) {
            return;
        }
        else if (this.state.rep1.length === 0) {
            return;
        }
        else if (this.state.quest2.length === 0) {
            return;
        }
        else if (this.state.rep2.length === 0) {
            return;
        }
        else {
            API.login(this.state.quest1, this.state.rep1,this.state.quest2, this.state.rep2).then(function (data) {
                localStorage.setItem('token', data.data.token);
                window.location = "/gcard"
            }, function (error) {
                console.log(error);
                return;
            })
        }

    };
    handleChange = event2 => {
        this.setState({
            [event2.target.id]: event2.target.value
        });
    };

    RectoCreation() {
        return (
            <div>
                <div className="container-fluid">
                    <h1> Ajout d'une carte </h1>

                    <div className="boxcarte">
                        <h2> Recto </h2>
                        <p>Question</p>
                        <FormGroup controlId="quest1" bssize="large">
                            <FormControl autoFocus type="text" value={this.state.quest1} onChange={this.handleChange}/>
                        </FormGroup>
                        <p>Réponse</p>
                        <FormGroup controlId="rep1" bssize="large">
                            <FormControl type="text" value={this.state.rep1} onChange={this.handleChange}/>
                        </FormGroup>
                        <Button
                            onClick={this.handleRectoClick}
                            block
                            bssize="large"
                            type="submit"
                        >
                            Suivant
                        </Button>

                    </div>
                </div>
            </div>
        )
    }

    VersoCreation() {
        return (
            <div>
                <div className="container-fluid">
                    <h1> Ajout d'une carte </h1>

                    <div className="boxcarte">
                        <h2> Verso </h2>
                        <p>Question</p>
                        <FormGroup controlId="rep2" bssize="large">
                            <FormControl autoFocus type="text" value={this.state.rep1} onChange={this.handleChange}/>
                        </FormGroup>
                        <p>Réponse</p>
                        <FormGroup controlId="quest2" bssize="large">
                            <FormControl type="text" value={this.state.quest1} onChange={this.handleChange}/>
                        </FormGroup>
                        <Button
                            onClick={this.send}
                            block
                            bssize="large"
                            type="submit"
                        >
                            Valider
                        </Button>

                    </div>
                </div>
                <button onClick={() => {
                    this.handleVersoClick()
                }}>
                    Retour
                </button>
            </div>
        )
    }


    render() {
        return (
            <div>
                {
                    this.state.isRectoIn
                        ? this.VersoCreation()
                        : this.RectoCreation()
                }
            </div>
        );
    }
}


export default Recto;