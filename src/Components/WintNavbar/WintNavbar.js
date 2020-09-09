import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function WintNavbar(props) {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="/">
                <img
                    src={require("../../Images/wint-logo-small.png")}
                    alt="logo"
                />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Flowrates">Flowrates</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}