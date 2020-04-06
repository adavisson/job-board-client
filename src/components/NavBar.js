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
            <>
              <Nav.Link href="/contacts">Contacts</Nav.Link>
              <Nav.Link href="/applications">Applications</Nav.Link>
              <Nav.Link href="/notes">Notes</Nav.Link>
            </>
            ) : (
            null
          )}
        </Nav>
        <Nav inline="true">
          {authToken ? (
            <>
              <Nav.Link href="/account">Account</Nav.Link>
              <Nav.Link eventKey="logout" onSelect={handleClick}>Logout</Nav.Link>
            </>
            ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
 
export default withRouter(NavBar);