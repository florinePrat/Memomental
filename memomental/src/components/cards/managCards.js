import React from 'react';
import Mycard from './card';
import {Button} from "react-bootstrap";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';

const burl = process.env.REACT_APP_API_URL;
// this class display all of the cards for 1 user and propose to manage them
class gcard extends React.Component{



    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }


    componentDidMount() {

       axios.get(burl + '/api/card/getCardsByUser',{
            headers: tokenHeaders
        } )
            .then(res => {
                const cards = res.data;
                this.setState({ cards });
                console.log(this.state.cards);
            }, function(data){
                console.log(data);
            })
    }



    render(){
        return(
            <div className="container-fluid">
                <h1> Gestion des cartes </h1>

                <nav>
                    <ul>
                        <Button
                            className="btn-info"
                            href="/addCard">Ajouter une carte
                        </Button>
                    </ul>
                </nav>


                    { this.state.cards.map(card =>
                        <Mycard
                            _id={card._id}
                            name={card.name}
                            labels={card.labels}
                            rectoQuestion={card.rectoQuestion}
                            rectoAnswer={card.rectoAnswer}
                            versoQuestion={card.versoQuestion}
                            versoAnswer={card.versoAnswer}
                        />
                        )}

            </div>
        )
    }

}
export default gcard;
