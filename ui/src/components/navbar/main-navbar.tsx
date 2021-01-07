import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export class MainNavbar extends React.Component<{}, {}> {

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            src="/pokeball-logo.png"
            // width="30"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/searcher">Searcher</Nav.Link>
            <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}