import React from "react";
import Provider from "./components/Provider/Provider";
import Product from "./components/Product/Product";
import LogIn from "./components/LogIn/LogIn";
import GoogleLogIn from "./components/LogIn/GoogleLogIn";
import GithubLogIn from "./components/LogIn/GitHubLogIn";
import SignIn from "./components/LogIn/SignIn";
import Bill from "./components/Bill/Bill";
import Receipt from "./components/Receipt/Receipt";
import Opening from "./components/Opening/Opening";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import { RootState } from "../src/app/store";
import { useSelector } from "react-redux";
function App() {
  const {user} = useSelector((state:RootState) => state.logged)
  
  return (
    <div className="App"> 
    <BrowserRouter>
    {user!==null?
      (<Navbar bg="ligth" expand="lg">
      <Container>
        <Navbar.Brand href="">Don Raul’s Hardware store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="welcome">Welcome</Nav.Link>
            <Nav.Link href="bill">Bill</Nav.Link>
            <Nav.Link href="receipt">Receipt</Nav.Link>
            <Nav.Link href="product">Product</Nav.Link>
            <Nav.Link href="provider">Provider</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      ):
      <Navbar bg="ligth" expand="lg">
      <Container>
        <Navbar.Brand href="">Don Raul’s Hardware store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="logInGithub">Log in with Github</Nav.Link>
            <Nav.Link href="logInGoogle">Log in with google</Nav.Link>
            <Nav.Link href="logIn">Log in</Nav.Link>
            <Nav.Link href="SignIn">Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      }
      <Routes>
        <Route path="logInGithub" element={<GithubLogIn />}/>
        <Route path="logInGoogle" element={<GoogleLogIn />}/>
        <Route path="SignIn" element={<SignIn />}/>
        <Route path="logIn" element={<LogIn />}/>
        <Route path="welcome" element={<Opening />}/>
        <Route path="product" element={<Product />} />
        <Route path="provider" element={<Provider />} />
        <Route path="bill" element={<Bill />} />
        <Route path="receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
    </div>
    /*
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
    </BrowserRouter>*/
  );
}

export default App;
