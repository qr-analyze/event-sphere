// Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page after logout
        navigate("/login");
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Event Management System API</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>

                        <NavDropdown title="Options" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/expos/add">Create Expo</NavDropdown.Item>
                            <NavDropdown.Item href="/expos">View Expos</NavDropdown.Item>

                            <NavDropdown.Item href="/scheduals/add">Create Schedule</NavDropdown.Item>
                            <NavDropdown.Item href="/scheduals">Schedules List</NavDropdown.Item>
                            <NavDropdown.Item href="/exhibitors">Exhibitors</NavDropdown.Item>
                            <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                            <NavDropdown.Item href="/users/add">Add Users</NavDropdown.Item>


                        </NavDropdown>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

                        <Nav.Link href="/register">Register</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
