import React, {useState} from 'react';
import {Form, Card, Col, Row, Button} from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { LOGIN, SIGNUP } from '../graphql/mutations';
import { AUTH_TOKEN } from '../constants';

const Login = (props) => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const _confirm = async data => {
    const { token } = login ? data.login : data.signup
    _saveUserData(token)
    props.history.push('/')
  }

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  const handleClick = (e) => {
    e.preventDefault()
    setLogin(!login)
    setName("")
    setEmail("")
    setPassword("")
  }

  const handleVisible = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
  const loginForm = () => {
    return (
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
        {visible && (<p>{password}</p>)}
        <Form.Group controlId="showPassword">
          <Button variant="link" onClick={handleVisible}>
            {!visible && "Show Password"}
            {visible && "Hide Password"}
          </Button>
        </Form.Group>
        <Mutation
          mutation={LOGIN}
          variables={{ email, password }}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
              <Button variant="dark" type="submit" onClick={mutation}>
                Login
              </Button>
          )}
        </Mutation>
      </Form>
    )
  }
  
  const signupForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="nameInput">
          <Form.Label column sm="2">Name: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={name} onChange={e => setName(e.target.value)} />
          </Col>
        </Form.Group>
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
        {visible && (<p>{password}</p>)}
        <Form.Group controlId="showPassword">
          <Button variant="link" onClick={handleVisible}>
            {!visible && "Show Password"}
            {visible && "Hide Password"}
          </Button>
        </Form.Group>
        <Mutation
          mutation={SIGNUP}
          variables={{ name, email, password }}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
              <Button variant="dark" type="submit" onClick={mutation}>
                Sign Up
              </Button>
          )}
        </Mutation>
      </Form>
    )
  }

  return (
    <div className="container">
      <Card className="text-center">
        {login && <Card.Header>Login</Card.Header>}
        {!login && <Card.Header>Sign Up</Card.Header>}
        <Card.Body>
          {login && loginForm()}
          {!login && signupForm()}
          <Button variant="link" onClick={handleClick}>
            {login && "Don't have an account?"}
            {!login && "Already have an account?"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default Login;