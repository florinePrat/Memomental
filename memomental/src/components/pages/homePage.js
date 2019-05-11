import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class Homepage extends Component{
    render(){
        return(
            <div className="background">
                <div className="container-fluid">

                    <p> Est-tu prêt à booster ta mémoire ??</p>

                    <Link to="/Signup">
                        <Button
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
export default Homepage;