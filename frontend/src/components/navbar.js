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

const NavBar = () => {
  return (
    <>
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="/">Team 4</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/login">Logout</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
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
    </>
  );
};

export default NavBar;
