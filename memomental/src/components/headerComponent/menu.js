import React, { Component } from 'react';
import RBN from 'react-burger-nav';
import {
    Link
} from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            <header>

                <RBN>
                    <ul>
                        <li className="first">
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Signup">Inscription</Link>
                        </li>
                        <li className="last">
                            <Link to="/Login">Connexion</Link>
                        </li>
                    </ul>
                </RBN>

            </header>
        )
    }
}



export default Header;