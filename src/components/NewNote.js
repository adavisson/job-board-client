import React, {useState} from 'react';
import { Redirect } from 'react-router';
import { Query } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { Card, Form, Col, Row } from 'react-bootstrap';
import { GET_COMPANIES, GET_CONTACTS } from '../graphql/queries';

const NewNote = () => {
  const title = "New Note"
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const [body, setBody] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [applicationId, setApplicationId] = useState("")
  const [contactId, setContactId] = useState("")

  if (!authToken) {
    alert('Please login to create a note.')
    return <Redirect to="/login" />
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const newNoteForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="bodyInput">
          <Form.Label column sm="2">Note: </Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" type="input" value={body} onChange={e => setBody(e.target.value)} />
          </Col>
        </Form.Group>
        <p>Associate Note with:</p>
        <Form.Group as={Row} controlId="companyInput">
          <Form.Label column sm="2">Company: </Form.Label>
          <Col sm="10">
            <Form.Control as="select" value={companyId} placeholder="None" onChange={e => setCompanyId(e.target.value)}>
              <Query query={GET_COMPANIES}>
                {({ loading, error, data}) => {
                  if (loading) return <></>
                  if (error) return <></>
                  
                  return(
                    <>
                      <option value="">None</option>
                      {data.companies.map(({id, name}) => {
                        return (
                          <option key={id} value={id}>{name}</option>
                        )
                      })}
                    </>
                  )
                }}
              </Query>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="contactInput">
          <Form.Label column sm="2">Contact: </Form.Label>
          <Col sm="10">
            <Form.Control as="select" value={contactId} placeholder="None" onChange={e => setContactId(e.target.value)}>
              <Query query={GET_CONTACTS}>
                {({ loading, error, data}) => {
                  if (loading) return <></>
                  if (error) return <></>

                  return (
                    <>
                      <option value="">None</option>
                      {data.contacts.map(({id, name}) => {
                        return (
                          <option key={id} value={id}>{name}</option>
                        )
                      })}
                    </>
                  )
                }}
              </Query>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
    )
  }

  return ( 
    <div className="container">
      <Card className="text-center">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          {newNoteForm()}
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default NewNote;