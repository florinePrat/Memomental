import React from 'react';
import DayCard from './dayCard';
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';

// this class manage myCard for the request to display the card of day
class myCard extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            rep : "",
            labels : "",
            rectoQuestion: "",
            cards: []
        };


    }

    componentDidMount() {
        axios.get('https://memomental.herokuapp.com/api/card/today',{
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
                    <DayCard
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
