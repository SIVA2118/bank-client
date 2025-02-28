import userContext from "./context.js";
import { useContext, useState } from "react";
import { Button, Form, Container, Card } from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Cashback() {
    let users = useContext(userContext);
    let n = users.users.length;
    let [Balance, setBalance] = useState(users.users[n - 1].amount);
    let [cashback, setCashback] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();
        let cash = Number(cashback);
        let newBalance = Balance - cash;
        setBalance(newBalance);
        users.users[n - 1].amount = newBalance;

        try {
            await axios.put(`https://bank-server-auoy.onrender.com/update/${users.users[n - 1]._id}`, { amount: newBalance });
            await axios.post("https://bank-server-auoy.onrender.com/update", {
                userId: users.users[n - 1]._id,
                type: "Withdrawal",
                amount: cash
            });
        } catch (error) {
            console.error("Error updating balance or logging transaction:", error);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card style={{ width: '30rem' }} className="p-4 shadow-lg rounded-4">
                <Card.Body>
                    <h1 className="text-center mb-4 text-danger">Cashback Withdrawal</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount to Withdraw</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter cashback amount" 
                                value={cashback}
                                onChange={(e) => setCashback(e.target.value)}
                                className="rounded-3"
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button type="submit" variant="danger" size="lg" className="rounded-3">Withdraw Cashback</Button>
                        </div>
                    </Form>
                    <h2 className="text-center mt-4 text-secondary">Current Balance: ₹{Balance}</h2>
                </Card.Body>
            </Card>
        </Container>
    );
}
