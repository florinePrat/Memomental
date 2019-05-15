import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class homePage extends Component{
    render(){
        return(
            <div className="background">
                    <div className="boxcarte">

                        <p> Est-tu prêt à booster ta mémoire ??</p>


                        <Link to="/Signup">
                            <Button
                                className="btn-acc"
                                bssize="large"
                                type="submit"
                            >
                                C'est parti !

                            </Button>
                        </Link>
                    </div>

                </div>
        )
    }
}
export default homePage;