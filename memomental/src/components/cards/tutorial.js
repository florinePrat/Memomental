import React, { Component } from 'react';
import tuto from './images/tuto.gif'
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class tutorial extends Component{

    render(){
        return(
            <div className="tuto">
                <h1>Tutoriel </h1>
                <img src={tuto} alt="tutorial" />
                <Link to="/card">
                    <Button
                        className="btn-info"
                        bssize="small"
                        type="submit"
                    >
                        C'est parti !
                    </Button>
                </Link>
            </div>
        )
    }

}

export default tutorial;


