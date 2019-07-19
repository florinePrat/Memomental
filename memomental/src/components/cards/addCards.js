import React from 'react';
import cardsRequest from "../../utils/cards";
import {Button, FormControl, FormGroup} from "react-bootstrap";

// this class is for add a new card in db with a name, cat(labels), a recto question and answer and verso question and answer
class addCard extends React.Component{


    constructor(props) {
        super(props);
        if(props.card) {
            const card = props.card;
            console.log(card)
            this.state = {
                _id : card._id,
                quest1: card.rectoQuestion,
                rep2: card.versoAnswer,
                nom : card.name,
                cat : card.labels[0].name,
                isRectoIn: false,
                isAddIn: false }
        }

        else {
            this.state = {
                quest1: "",
                rep2: "",
                nom : "",
                cat : "",
                isRectoIn: false,
                isAddIn: false
            };
        }

        this.handleChange.bind(this);
        this.send.bind(this);
        this.handleRectoClick = this.handleRectoClick.bind(this);
        this.handleNoAddClick = this.handleNoAddClick.bind(this);
        this.handleVersoClick = this.handleVersoClick.bind(this);
    }


    handleRectoClick() {
        if(this.state.nom.length === 0){
            this.setState({error:"Nom vide"});
        }
        else if(this.state.cat.length === 0){
            this.setState({error:"categorie vide"});
        }
        else {
            this.setState({error:""});
            this.setState({isRectoIn: true});
            this.setState({isAddIn: true});
        }
    }

    handleVersoClick() {
        if (this.state.quest1.length === 0) {
            this.setState({error:"champ question recto vide"});
        }else{
            this.setState({error:""});
            this.setState({isRectoIn: false});
        }

    }


    handleNoAddClick() {
        this.setState({isAddIn: false});
    }


    send = event => {
        if(this.state.nom.length === 0){
            this.setState({error:"nom vide"});
        }
        else if(this.state.cat.length === 0){
            this.setState({error:"categorie vide"});
        }
        else if (this.state.quest1.length === 0) {
            this.setState({error:"champ question recto vide"});
        }
        else if (this.state.rep2.length === 0) {
            this.setState({error:"champ reponse verso vide"});
        }
        else {
            if(this.state._id) {
                cardsRequest.updateCard(this.state._id,this.state.nom,this.state.cat, this.state.quest1, this.state.rep2).then(res => {
                    window.location = "/gcard"
                }, error => {
                    console.log(error);
                    this.setState({error:error.response.res.error});
                })
            }
            else {
                cardsRequest.addcard(this.state.nom,this.state.cat, this.state.quest1, this.state.rep2).then(res => {
                    window.location = "/gcard"
                }, error => {
                    console.log(error);
                    //this.setState({error:error.response.res.error});
                })
            }

        }

    };

    handleChange = event2 => {
        this.setState({
            [event2.target.id]: event2.target.value
        });
    };


    addCreation(){
        return(
            <div className="container-fluid">
                <h1> {this.state._id?"Edition d'une carte" :"Ajout d'une carte"}</h1>

                <div className="boxcarte">
                    <h2> Informations </h2>
                    {this.state.error ?
                        <div style={{color:"red"}}>
                            {this.state.error}
                        </div>:false
                    }
                    <p>Nom</p>
                    <FormGroup controlId="nom" bssize="large">
                        <FormControl autoComplete="off" autoFocus type="text" value={this.state.nom} onChange={this.handleChange}/>
                    </FormGroup>
                    <p>Catégorie</p>
                    <FormGroup controlId="cat" bssize="large">
                        <FormControl type="text" value={this.state.cat} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button
                        onClick={() => {
                                this.handleRectoClick()
                        }}
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


    RectoCreation() {
        return (
            <div>
                <div className="container-fluid">
                    <h1> Ajout d'une carte </h1>
                    <div className="boxcarte">
                        <h2> Recto </h2>
                        {this.state.error ?
                            <div style={{color:"red"}}>
                                {this.state.error}
                            </div>:false
                        }
                        <p>Question</p>
                        <FormGroup controlId="quest1" bssize="large">
                            <FormControl autoFocus type="text" value={this.state.quest1} onChange={this.handleChange}/>
                        </FormGroup>
                        <Button
                            onClick={this.handleVersoClick}
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
                        {this.state.error ?
                            <div style={{color:"red"}}>
                                {this.state.error}
                            </div>:false
                        }
                        <p>Réponse</p>
                        <FormGroup controlId="rep2" bssize="large">
                            <FormControl type="text" value={this.state.rep2} onChange={this.handleChange}/>
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
                    this.handleRectoClick()
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
                    this.state.isAddIn
                        ? this.state.isRectoIn
                            ? this.RectoCreation()
                            : this.VersoCreation()
                        : this.addCreation()
                }
            </div>

        );
    }

}
export default addCard;
