import React, {useState} from 'react';
import {Form, Card, Col, Row, Button} from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { LOGIN } from '../graphql/mutations';
import { AUTH_TOKEN } from '../constants';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _confirm = async data => {
    const { token } = data.login
    _saveUserData(token)
    props.history.push('/')
  }

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="container">
      <Card className="text-center">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Mutation
            mutation={LOGIN}
            variables={{ email, password }}
            onCompleted={data => _confirm(data)}
          >
            {mutation => (
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
                <Button variant="dark" type="submit" onClick={mutation}>
                  Login
                </Button>
              </Form>
            )}
          </Mutation>
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default Login;