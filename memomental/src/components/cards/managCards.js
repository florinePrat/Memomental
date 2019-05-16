import React from 'react';
import {Link} from "react-router-dom";
import Mycard from './card';
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';
import {Button} from "react-bootstrap";

// this class display all of the cards for 1 user and propose to manage them
class gcard extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }


    componentDidMount() {

       /*axios.get('http://localhost:8080/api/card/getCardsByUser',{
            headers: tokenHeaders
        } )
            .then(res => {
                const cards = res.data;
                this.setState({ cards });
                console.log(this.setState({cards}));
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
        console.log(this.setState({cards}));
    }



    render(){
        return(
            <div className="container-fluid">
                <h1> Gestion des cartes </h1>

                <nav>
                    <ul>
                        <li className="first">
                            <Link to="/addCard">Ajouter une carte</Link>
                        </li>
                    </ul>
                </nav>


                    { this.state.cards.map(card =>
                        <Mycard
                            name={card.name}
                            labels={card.labels}
                            rectoQuestion={card.rectoQuestion}
                            fn={(id)=>console.log(id)}
                        />
                        )}



            </div>
        )
    }

}
export default gcard;
