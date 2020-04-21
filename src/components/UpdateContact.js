import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from 'react-router'
import { Button, Card, Form } from 'react-bootstrap'
import { AUTH_TOKEN } from '../constants'

const UpdateContact = (props) => {
  const contactId = props.match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [companyId, setCompanyId] = useState('')
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to edit contact')
    return <Redirect to="/login" />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const updateForm = () => {
    return (
      <Form onSubmit={handleSubmit}>

      </Form>
    )
  }
  
  return (
    <div className="container">
      <Card className="text-center">
        <Card.Header>{contactId}</Card.Header>
        <Card.Body>{updateForm()}</Card.Body>
        <Card.Footer>
          <Button variant="secondary" onClick={() => props.history.push(`/contacts/${contactId}`)}>Cancel</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
 
export default UpdateContact;