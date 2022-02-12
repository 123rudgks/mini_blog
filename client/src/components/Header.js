import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button, Nav, Navbar, Container } from "react-bootstrap";
import Icon from "@mui/material/Icon";

function Header() {
  // TODO: 로그인 하자마자 헤더도 리-렌더 되게 하자
  const { authState, setAuthState } = useContext(AuthContext);
  const logOut = ()=>{
    localStorage.removeItem("accessToken");
    setAuthState({
      username:"",
      id:"",
      status:false
    });
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Icon baseClassName="fas" className="fa-moon" color="light" />
            PO,Em
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/posts">Posts</Link>
            </Nav.Link>
          </Nav>
          <Navbar.Text>
            {authState.status ? (
              <>
               Welcome! , <a href="#login">{authState.username}</a>
                <button onClick={logOut}>X</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Navbar.Text>
        </Container>
      </Navbar>
      <br />
    </div>
  );
}

export default Header;
