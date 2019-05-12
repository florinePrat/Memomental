import React from 'react';
import {Link} from "react-router-dom";

class gcard extends React.Component{

    state ={
        cards: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/getCardsByUser')
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

                <ul>
                    { this.state.cards.map(cards => <li>{cards.name}</li>)}
                </ul>


            </div>
        )
    }

}
export default gcard;
