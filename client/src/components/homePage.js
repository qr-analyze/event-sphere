import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const HomePage = () => {

    return (
        <div>
            {/* Bootstrap Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Event Management System API</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="exhibitors/">Exhibitors</Nav.Link>
                            <NavDropdown title="Expos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="expos/add">Create Expo</NavDropdown.Item>
                                <NavDropdown.Item href="expos/">Manage Expos</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <div className="container">
                <h2>HomePage</h2>
            </div>
        </div>
    );
};

export default HomePage;
