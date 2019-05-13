import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';
import {Button} from "react-bootstrap";

class gcard extends React.Component{

    state ={
        cards: []
    }


    componentDidMount() {
     /*   axios.get('http://localhost:8080/api/card/getCardsByUser',{
            headers: tokenHeaders
        } )
            .then(res => {
                const cards = res.data;

                this.setState({ cards });
            })*/

    const cards = [
        {
            name : "name",
            labels : ["cat"],
            rectoQuestion: "question d'une recto"
        },
        {
            name : "name2",
            labels : ["cat2"]
        }];
        this.setState({cards});

    }

    isView(){
        { this.state.cards.map(cards =>
            <div className="boxcarte">
                <p>Nom : {cards.name} </p>
                <p>Cat : {cards.labels[0]}</p>
                <p>Question : {cards.rectoQuestion} </p>
            </div>
        )}
    }


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


                    { this.state.cards.map(cards =>
                        <div className="boxcarte">
                            <p>Nom : {cards.name} </p>
                            <p>Cat : {cards.labels[0]}</p>

                            <Button
                                onClick={this.isView()}
                                bssize="large"
                            >
                                Voir
                            </Button>

                            <Button
                                onClick={""}
                                bssize="large"
                                type="submit"
                            >
                                Modifier
                            </Button>

                            <Button
                                onClick={""}
                                bssize="large"
                                type="submit"
                            >
                                Supprimer
                            </Button>

                        </div>)}



            </div>
        )
    }

}
export default gcard;
