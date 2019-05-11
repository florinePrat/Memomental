import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'
import {
    Link
} from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            <header>

                
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

            </header>
        )
    }
}



export default Header;