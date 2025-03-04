import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './home.js';
import Register from './register.js';
import { Deposit, Cashback } from './deposit';

import Alldata from './alldata.js';
import UserContext from './context.js';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
        <Container>
          <Navbar.Brand href="#home">Banking App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#register">Register</Nav.Link>
              <Nav.Link href="#deposit">Deposit</Nav.Link>
              <Nav.Link href="#cashback">Cashback</Nav.Link>
              <Nav.Link href="#alldata">All Data</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <HashRouter>
        <UserContext.Provider value={{ users: [{ name: "xyz", email: "xyz@gmail.com", password: "xyz", amount: 1000 }] }}>
          <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/cashback' element={<Cashback />} />
            <Route path='/alldata' element={<Alldata />} />
          </Routes>
        </UserContext.Provider>
      </HashRouter>
    </>
  );
}

export default App;
