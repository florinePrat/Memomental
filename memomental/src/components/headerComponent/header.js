import React, { Component } from 'react';
import logo from './images/logo.png';
import {Navbar, Nav} from "react-bootstrap";


class NavBar extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">

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
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Signup">Login/Signup</Nav.Link>
                        <Nav.Link href='/cartes' >Mes cartes</Nav.Link>
                        <Nav.Link href='/Mycarte' >Mes cartes du jour</Nav.Link>
                        <Nav.Link href='/' >Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavBar;