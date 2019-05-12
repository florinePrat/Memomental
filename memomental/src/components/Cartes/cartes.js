import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
var nbcarteday = '';

class Carte extends Component{
    render(){
        return(
            <div className="container-fluid">
                <h1> Mes cartes </h1>

                <div className="boxcarte">

                    <p>Aujourd'hui vous avez </p>
                    {nbcarteday} <p> cartes à réviser </p>

                    <Link to="/Mycarte">
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
export default Carte;