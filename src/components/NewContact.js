import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
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

  const newContactForm = () => {
    return (
      <p>form</p>
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