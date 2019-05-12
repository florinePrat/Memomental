import React from 'react';
import cardsRequest from "../../utils/cards";
import {Button, FormControl, FormGroup} from "react-bootstrap";

class Addcarte extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            nom : "",
            cat : ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
        if(this.state.nom.length === 0){
            return;
        }
        else if(this.state.cat.length === 0){
            return;
        }
        else {
            cardsRequest.addcard(this.state.nom,this.state.cat).then(function(data){
                console.log(data);
                window.location = "/Recto"
            },function(error){
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


    render(){
        return(
            <div className="container-fluid">
                <h1> Ajout d'une carte </h1>

                <div className="boxcarte">
                    <h2> Informations </h2>
                    <p>Nom</p>
                    <FormGroup controlId="nom" bssize="large">
                        <FormControl autoFocus type="text" value={this.state.nom} onChange={this.handleChange}/>
                    </FormGroup>
                    <p>Catégorie</p>
                    <FormGroup controlId="cat" bssize="large">
                        <FormControl type="text" value={this.state.cat} onChange={this.handleChange}/>
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
export default Addcarte;
