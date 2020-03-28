import React, {useState} from 'react';
import {Form, Card, Col, Row, Button} from 'react-bootstrap';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data }] = useMutation(LOGIN);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`email: ${email}`);
    console.log(`password: ${password}`)

    const result = login({ variables: {email: email, password: password}});
    console.log(result);
  }

  return (
    <div className="container">
      <Card className="text-center">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="emailInput">
              <Form.Label column sm="2">Email: </Form.Label>
              <Col sm="10">
                <Form.Control type="input" value={email} onChange={e => setEmail(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="passwordInput">
              <Form.Label column sm="2">Password: </Form.Label>
              <Col sm="10">
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </Col>
            </Form.Group>
            <Button variant="dark" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default Login;