import React from 'react';
import DayCard from './dayCard';
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';
import service from '../../utils/serviceFunctions'

const burl = process.env.REACT_APP_API_URL;
// this class manage myCard for the request to display the card of day
class myCard extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            rep : "",
            labels : "",
            question: "",
            cards: []
        };


    }

    componentDidMount() {
      //  service().then( res => {console.log("service appelé")});
        axios.get(burl + '/api/card/today',{
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
                {this.state.cards.length ?
                    this.state.cards.map(card =>
                            <DayCard
                                _id={card._id}
                                name={card.name}
                                labels={card.labels}
                                question={card.question}
                            />
                        )
                     :
                    <p> Vous n'avez aucune carte à réviser</p>
                }
            </div>
        )
    }

}
export default myCard;
