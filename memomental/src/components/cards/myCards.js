import React from 'react';
import dayCard from './dayCard';
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';

// this class manage myCard for the request to display the card of day
class myCard extends React.Component{

    state ={
        cards: []
    };

    constructor(props) {
        super(props);
        this.state = {
            rep : "",
            labels : "",
            rectoQuestion: ""
        };


    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/card/today',{
               headers: tokenHeaders
           } )
               .then(res => {
                   const cards = res.data;
                    console.log(res.data);
                   this.setState({ cards });
               });
    }


    render(){
        return(
            <div className="container-fluid">
                <h1> Mes cartes </h1>

                { this.state.cards.map(card =>
                    <dayCard
                        name={card.name}
                        labels={card.labels}
                        rectoQuestion={card.rectoQuestion}
                    />
                )}

            </div>
        )
    }

}
export default myCard;