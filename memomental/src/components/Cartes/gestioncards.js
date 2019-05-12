import React from 'react';
import cardsRequest from "../../utils/cards";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

var nom = "nom de la carte";
var cat = "cat de la carte";
class gcard extends React.Component{

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
                <h1> Gestion des cartes </h1>

                <nav>
                    <ul>
                        <li className="first">
                            <Link to="/Addcarte">Ajouter une carte</Link>
                        </li>
                    </ul>
                </nav>

                <div className="boxcarte">
                    <p>{nom}</p>
                    <p>{cat}</p>
                    <Button
                        onClick={this.send}
                        bssize="large"
                        type="submit"
                    >
                        Voir
                    </Button>
                    <Button
                        onClick={this.send}
                        bssize="large"
                        type="submit"
                    >
                        Modifier
                    </Button>
                    <Button
                        onClick={this.send}
                        bssize="large"
                        type="submit"
                    >
                        Supprimer
                    </Button>

                </div>


            </div>
        )
    }

}
export default gcard;
