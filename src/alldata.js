import axios from "axios";
import { useState } from "react";
import { Button, Table, Form, Container, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Alldata() {
  let [data, setData] = useState([]);
  let [editId, setEditId] = useState(null);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    amount: ""
  });

  async function handleClick(e) {
    if (e && e.preventDefault) e.preventDefault();
    try {
      let result = await axios.get("https://bank-server-auoy.onrender.com/data");
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://bank-server-auoy.onrender.com/delete/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }

  function handleEdit(item) {
    setEditId(item._id);
    setFormData({
      name: item.name,
      email: item.email,
      password: item.password,
      amount: item.amount
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate() {
    try {
      await axios.put(`https://bank-server-auoy.onrender.com/update/${editId}`, formData);
      setEditId(null);
      handleClick();
    } catch (error) {
      console.error("Error updating:", error);
    }
  }

  return (
    <Container className="py-5">
      <Card className="shadow-lg p-4 rounded-4">
        <h1 className="text-center text-primary mb-4">All Data</h1>
        <Button variant="info" onClick={handleClick} className="mb-4">Fetch Data</Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>Password</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.amount}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(item)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={!!editId} onHide={() => setEditId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Balance" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditId(null)}>Cancel</Button>
          <Button variant="success" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
