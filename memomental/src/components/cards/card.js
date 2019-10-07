import {Component} from "react";
import React from "react";
import {Button} from "react-bootstrap";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';
import Badge from "react-bootstrap/Badge";
import Mylabel from "./lookcard";

const burl = process.env.REACT_APP_API_URL;


// this class return the front of managcards and use js to view details of cards
class myCards  extends Component{


    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
        this.getlabelCard.bind(this);
    }

    getlabelCard() {
        console.log("card",this.props._id);
        axios.get(burl + '/api/card/getCardsByUserLabels/',{
            headers: tokenHeaders, params:{labelId:this.props._id}
        } )
            .then(res => {
                console.log("cardsss"+res.data[0]._id);
                const cards = res.data[0];
                console.log("cardsss"+cards);
                this.setState({ cards });
                console.log(this.state.cards);
                window.location = "/lookcard";
            }, function(data){
                console.log(data);
            });

            console.log("tesssst"+this.state.cards);
            { this.state.cards.map(card =>
                <Mylabel
                    _id={card._id}
                    name={card.name}
                    labels={card.labels}
                    recto={card.recto}
                    verso={card.verso}
                />
            )}
    }

    render(){
        return(

                <div className="boxcarte" >
                        <h3  style={{backgroundColor:this.props.color}}>{this.props.name}</h3>
                        <Badge className="nombrelabel" pill variant="success">{this.props.number}</Badge>

                        <Button
                            className="btn-info"
                            onClick={() => {
                                this.getlabelCard();
                            }}
                            bssize="large"
                        >
                            Voir mes cartes
                        </Button>


                </div>

        )
    }
}
export default myCards;
