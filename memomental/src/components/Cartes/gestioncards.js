import React from 'react';
import {Link} from "react-router-dom";
import MyCard from './card';
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';
import {Button} from "react-bootstrap";

class gcard extends React.Component{

    state ={
        cards: []
    };

    constructor(props) {
        super(props);

        this.isView = this.isView.bind(this);
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
        return(
        this.state.cards.map(cards =>
            <div className="boxcarte">
                <p>Nom : {cards.name} </p>
                <p>Cat : {cards.labels[0]}</p>
                <p>Question : {cards.rectoQuestion} </p>
            </div>
        ))
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


                    { this.state.cards.map(card =>
                        <MyCard
                            name={card.name}
                            labels={card.labels[0]}
                            rectoQuestion={card.rectoQuestion}
                            fn={(id)=>console.log(id)}
                        />
                        )}



            </div>
        )
    }

}
export default gcard;
