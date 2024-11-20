import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

import crest from '../../assets/uw-crest.svg';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import BadgerLogout from "../auth/BadgerLogout";
function BadgerLayout(props) {
    const navigate = useNavigate();
    
    const [loginName, setloginName] = useState(() => {
        const storedStatus = sessionStorage.getItem('loginName');
        return storedStatus === 'true'; // Convert the session value to boolean
    });

   

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        
                        {loginName ? (
                            <Nav.Link as={Link} to ='logout'>Logout</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="login">Login</Nav.Link>
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                            </>
                        )}
                        
                        <NavDropdown title="Chatrooms">
                            {props.chatrooms.map((chatroom, index) => (
                                <NavDropdown.Item
                                    key={index}
                                    as={Link}
                                    to={`/chatrooms/${chatroom}`}
                                >
                                    {chatroom}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginName, setloginName]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;
