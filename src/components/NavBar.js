import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';

const NavBar = (props) => {  
  const [login, setLogin] = useState("");

  const authToken = localStorage.getItem(AUTH_TOKEN);

  const handleClick = (eventKey) => {
    localStorage.removeItem(AUTH_TOKEN);
    props.history.push('/');
    setLogin(!login);
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
      <Navbar.Brand href="/">Job Board</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/job-postings">Job Postings</Nav.Link>
          <Nav.Link href="/companies">Companies</Nav.Link>
          {authToken ? (
            <Nav.Link href="/contacts">Contacts</Nav.Link>
            ) : (
            null
          )}
        </Nav>
        <Nav inline="true" onSelect={handleClick}>
          {authToken ? (
            <Nav.Link eventKey="logout"
            >Logout</Nav.Link>
            ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
 
export default withRouter(NavBar);