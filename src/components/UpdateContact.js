import React, { useState } from 'react'
import Heading from './Heading'
import { Query, Mutation } from 'react-apollo'
import { GET_CONTACT, GET_COMPANIES } from '../graphql/queries'
import { Redirect } from 'react-router'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { AUTH_TOKEN } from '../constants'

const UpdateContact = (props) => {
  const title = "Update Contact"
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

  const updateForm = (contact) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="nameInput">
          <Form.Label column sm="2">
            Name:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="emailInput">
          <Form.Label column smj="2">
            Email:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="phoneNumberInput">
          <Form.Label column smj="2">
            Phone Number:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="jobTitleInput">
          <Form.Label column smj="2">
            Job Title:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="input"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="nameInput">
          <Form.Label column smj="2">
            Company:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={companyId}
              placeholder="Select"
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <Query query={GET_COMPANIES}>
                {({ loading, error, data }) => {
                  if (loading) return <></>
                  if (error) return <></>

                  return (
                    <>
                      <option value="">Select</option>
                      {data.companies.map(({ id, name }) => {
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
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
    <>
      <Heading title={title} />
      <Query
        query={GET_CONTACT}
        variables={{ id: contactId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error</p>

          setName(data.contact.name)
          setEmail(data.contact.email)
          setPhoneNumber(data.contact.phoneNumber)
          setJobTitle(data.contact.jobTitle)
          setCompanyId(data.contact.companyId)

          return (
            <div className="container">
              <Card className="text-center">
                <Card.Header>{data.contact.name}</Card.Header>
                <Card.Body>{updateForm(data.contact)}</Card.Body>
                <Card.Footer>
                  <Button variant="dark">Update</Button>{' '}
                  <Button variant="secondary" onClick={() => props.history.push(`/contacts/${contactId}`)}>Cancel</Button>
                </Card.Footer>
              </Card>
            </div>
          )
        }}
      </Query>
    </>
  );
}
 
export default UpdateContact;