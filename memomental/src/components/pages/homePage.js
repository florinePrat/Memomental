import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import imacc from './images/imacc.jpg';

class Homepage extends Component{
    render(){
        return(
            <div className="container-fluid">

                <div className="imacc">
                    <img src={imacc} alt="image d'accueil"/>
                </div>

                <p> Est-tu prêt à booster ta mémoire ??</p>

                <Link to="/Signup">
                    <Button
                        block
                        bssize="large"
                        type="submit"
                    >
                        C'est parti !

                    </Button>
                </Link>

            </div>
        )
    }
}
export default Homepage;