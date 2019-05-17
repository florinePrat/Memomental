import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from 'axios';
import {tokenHeaders} from '../../utils/headers';

const burl = process.env.REACT_APP_API_URL;

// this class is the home page for card, display nb of cards for the current day
class card extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    componentDidMount() {

        axios.get(burl + '/api/card/today',{
             headers: tokenHeaders
         } )
             .then(res => {
                 const cards = res.data;
                 this.setState({ cards });
             }, function(data)
             {
                 console.log("Impossible de récupérer les cartes :",data.message)
             })
    }


    render(){
        return(
            <div className="container-fluid">
                <h1> Mes cartes </h1>

                <div className="boxcarte">

                    <p>Aujourd'hui vous avez </p>
                    <p>{this.state.cards.length} </p>
                    <p> cartes à réviser </p>

                    <Link to="/myCard">
                        <Button
                            className="btn-info"
                            bssize="small"
                            type="submit"
                        >
                            C'est parti !
                        </Button>
                    </Link>
                    <Link to="/gcard">
                        <Button
                            className="btn-info"
                            bssize="small"
                            type="submit"
                        >
                            Gérer mes cartes
                        </Button>
                    </Link>

                </div>

            </div>
        )
    }
}
export default card;
