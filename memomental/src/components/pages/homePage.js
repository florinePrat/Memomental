import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import giphy from "./images/giphy.gif";

// this page is the home page before the signup
class homePage extends Component{
    render(){
        return(
                    <div className="homePage">

                        <p> Est-tu prêt à booster ta mémoire ??</p>
                        <img
                            className="d-block w-100"
                            src={giphy}
                            alt="First slide"
                        />
                        <Link to="/signup">
                            <Button
                                className="btn-info"
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
export default homePage;