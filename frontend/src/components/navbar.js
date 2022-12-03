import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Login from "../components/login";
import Home from "../components/home";
import Profile from "../components/profile";
import Register from "./register";
import Saving from "../routes/saving";
import Current from "../routes/current";
import Multiplier from "../routes/multiplier";
import AuthService from "../services/auth";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    AuthService.logout();
  };

  return (
    <div>
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="/">Team 4</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            data-bs-target="#navbarScroll"
          />
          <Navbar.Collapse>
            <div className="navbar-nav mr-auto">
              {currentUser && <Nav.Link href="/">Home</Nav.Link>}
              {currentUser && <Nav.Link href="/savings">Savings</Nav.Link>}
              {currentUser && <Nav.Link href="/current">Current</Nav.Link>}
              {currentUser && (
                <Nav.Link href="/multiplier">Multiplier</Nav.Link>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ms-auto">
                <Nav className="me-auto">
                  <Nav.Link href="/profile">
                    <strong>Hi, {currentUser.Name}</strong>{" "}
                    <strong>ID: {currentUser.Id}</strong>
                  </Nav.Link>

                  <Nav.Link href="/profile">Profile</Nav.Link>

                  <Nav.Link href="/login" onClick={logout}>
                    Logout
                  </Nav.Link>
                </Nav>
              </div>
            ) : (
              <div className="navbar-nav ms-auto">
                <Nav className="me-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />}>
            <Route path="/saving" element={<Saving />} />
            <Route path="/current" element={<Current />} />
            <Route path="/multiplier" element={<Multiplier />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default NavBar;
