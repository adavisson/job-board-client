import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { CREATE_COMPANY } from '../graphql/mutations';
import { AUTH_TOKEN } from '../constants';

const NewCompany = (props) => {
  const title = "Add Company"
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (!authToken) {
    alert('Please login to add a company')
    return <Redirect to="/login" />
  }

  const _confirm = async data => {
    const { id } = data.createCompany
    props.history.push('/companies')
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  const newCompanyForm = () => {
    return(
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="nameInput">
          <Form.Label column smj="2">Name: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={name} onChange={e => setName(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="addressInput">
          <Form.Label column smj="2">Address: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={address} onChange={e => setAddress(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="phoneNumberInput">
          <Form.Label column smj="2">Phone Number: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="websiteInput">
          <Form.Label column smj="2">Website: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={website} onChange={e => setWebsite(e.target.value)} />
          </Col>
        </Form.Group>
        <Mutation
          mutation={CREATE_COMPANY}
          variables={{ name, address, phoneNumber, website}}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
            <Button variant="dark" type="submit" onClick={mutation}>
              Add Company
            </Button>
          )}
        </Mutation>
      </Form>
    )
  }

  return (
    <div className="container">
      <Card className="text-center">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          {newCompanyForm()}
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default NewCompany;