import React, { Component } from 'react';
import logo from './images/logo.png';
import {Navbar, Nav} from "react-bootstrap";
import auth from "../../utils/auth";

// the navbar of application
class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth : auth.isAuth(),
            firstName:localStorage.getItem("firstName"),
            points:localStorage.getItem("points")
        };
        this.logout.bind(this);
        this.updatePoints.bind(this);

    }
    //@TODO : make listener to update point in header work
    componentDidMount() {
        console.log("called");
        window.addEventListener('storage', this.updatePoints   );
    }

    updatePoints = data => {
        console.log("set points");
        this.setState({points : localStorage.getItem('points')})
    };


    logout = event => {
        console.log("logout called");
        auth.logout();
        window.location= '/';
    };
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg">

                <Navbar.Brand href="/">
                    <img
                        alt="logo"
                        src={logo}
                        width="50"
                        height="50"
                        className="logo"
                    />
                    {' Memomental'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                        { !this.state.isAuth
                            ?(
                            <Nav className="mr-auto">
                                 <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/signup">Login/Signup</Nav.Link>
                            </Nav>
                            )
                            :(
                                <Nav className="mr-auto">
                                    <Nav.Link href="/card">Home</Nav.Link>
                                    <Nav.Link href='/gcard' >Mes cartes</Nav.Link>
                                    <Nav.Link href='/myCard' >Mes cartes du jour</Nav.Link>
                                    <Nav.Link onClick={this.logout} >Logout</Nav.Link>
                                    <Navbar.Text>
                                        {this.state.firstName} : {this.state.points} points
                                    </Navbar.Text>
                                </Nav>
                            )

                        }
                </Navbar.Collapse>
            </Navbar>
        )

    }
}
export default NavBar;
