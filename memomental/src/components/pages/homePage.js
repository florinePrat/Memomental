import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

// this page is the home page before the signup
class homePage extends Component{
    render(){
        return(
                    <div className="boxcarte">

                        <p> Est-tu prêt à booster ta mémoire ??</p>


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