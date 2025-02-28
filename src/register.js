// import userContext from "./context.js";
import { useContext, useState } from "react";
import axios from 'axios';
import { Button, Form, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        let item = { name: name, email: email, password: password,amount:1000};
        console.log(item);
        axios.post('https://bank-server-auoy.onrender.com/create', item)
            .then(response => console.log(response))
            .catch(error => console.error('There was an error!', error));
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
