import React, { Component } from 'react';
import logo from './images/logo.jpg';
import {Link} from 'react-router-dom'

class Header extends Component{

    state = {
        active: false,
    };

    render(){
        return(
            <header>
                <div className="align">
                     <div className="logo">
                         <img src={logo} alt="logo"/>
                     </div>
                    <div className="titre">
                        <h2> Memomental </h2>
                    </div>
                </div>


                <nav>
                        <ul>
                            <li className="first">
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Signup">Login/Signup</Link>
                            </li>
                        </ul>
                </nav>

            </header>
        )
    }
}



export default Header;