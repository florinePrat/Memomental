import React, { Component } from 'react';
import logo from './images/logo.jpg';
import RBN from 'react-burger-nav';
import {
    Link
} from 'react-router-dom';

class Header extends Component{

    state = {
        active: false,
    };

    render(){
        return(
            <header>
                 <div className="logo">
                     <img src={logo} alt="logo"/>
                 </div>
                <div className="titre">
                    <h2> Memomental </h2>
                </div>

                <RBN id={ "sidebar" }>
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