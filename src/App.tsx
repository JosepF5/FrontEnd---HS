import React from "react";
import Provider from "./components/Provider/Provider";
import Product from "./components/Product/Product";
import Bill from "./components/Bill/Bill";
import Receipt from "./components/Receipt/Receipt";
import Opening from "./components/Opening/Opening";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="ligth" expand="lg">
        <Container>
          <Navbar.Brand href="">Don Raul’s Hardware store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="bill">Bill</Nav.Link>
              <Nav.Link href="receipt">Receipt</Nav.Link>
              <Nav.Link href="product">Product</Nav.Link>
              <Nav.Link href="provider">Provider</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Opening />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/product" element={<Product />} />
        <Route path="/provider" element={<Provider />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
