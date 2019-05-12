import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';

class gcard extends React.Component{

    state ={
        cards: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/card/getCardsByUser',{
            headers: tokenHeaders
        } )
            .then(res => {
                const cards = res.data;
                this.setState({ cards });
            })
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


                    { this.state.cards.map(cards => <div className="boxcarte">Nom : {cards.name} Cat : {cards.labels[0]}
                    </div>)}



            </div>
        )
    }

}
export default gcard;
