import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { AUTH_TOKEN } from '../constants';

const NewContact = () => {
  const title = "Add Contact"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to add a contact')
    return <Redirect to="/login" />
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const newContactForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="nameInput">
          <Form.Label column smj="2">Name: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={name} onChange={e => setName(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="emailInput">
          <Form.Label column smj="2">Email: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={email} onChange={e => setEmail(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="phoneNumberInput">
          <Form.Label column smj="2">Phone Number: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="jobTitleInput">
          <Form.Label column smj="2">Job Title: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
          </Col>
        </Form.Group>
        <Button variant="dark" type="submit">
          Add Contact
        </Button>
      </Form>
    )
  }

  return (  
    <div className="container">
      <Card className="text-center">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          {newContactForm()}
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default NewContact;