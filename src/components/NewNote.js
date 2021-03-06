import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { Query, Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../constants'
import { Card, Form, Col, Row, Button } from 'react-bootstrap'
import {
  GET_COMPANIES,
  GET_CONTACTS,
  GET_APPLICATIONS,
} from '../graphql/queries'
import { CREATE_NOTE } from '../graphql/mutations'

const NewNote = (props) => {
  const title = 'New Note'
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const [body, setBody] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [applicationId, setApplicationId] = useState('')
  const [contactId, setContactId] = useState('')

  if (!authToken) {
    alert('Please login to create a note.')
    return <Redirect to="/login" />
  }

  const _confirm = async (data) => {
    const { id } = data.createNote
    props.history.push(`/notes/${id}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const newNoteForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="bodyInput">
          <Form.Label column sm="2">
            Note:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              type="input"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Col>
        </Form.Group>
        <p>Associate Note with:</p>
        <Form.Group as={Row} controlId="applicationId">
          <Form.Label column sm="2">
            Application:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={applicationId}
              placeholder="None"
              onChange={(e) => setApplicationId(e.target.value)}
            >
              <Query query={GET_APPLICATIONS}>
                {({ loading, error, data }) => {
                  if (loading) return <></>
                  if (error) return <></>

                  return (
                    <>
                      <option value="">None</option>
                      {data.applications.map(({ id, jobPosting }) => {
                        return (
                          <option key={id} value={id}>
                            {jobPosting.title} at {jobPosting.company.name}
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
        <Form.Group as={Row} controlId="companyInput">
          <Form.Label column sm="2">
            Company:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={companyId}
              placeholder="None"
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <Query query={GET_COMPANIES}>
                {({ loading, error, data }) => {
                  if (loading) return <></>
                  if (error) return <></>

                  return (
                    <>
                      <option value="">None</option>
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
        <Form.Group as={Row} controlId="contactInput">
          <Form.Label column sm="2">
            Contact:{' '}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={contactId}
              placeholder="None"
              onChange={(e) => setContactId(e.target.value)}
            >
              <Query query={GET_CONTACTS}>
                {({ loading, error, data }) => {
                  if (loading) return <></>
                  if (error) return <></>

                  return (
                    <>
                      <option value="">None</option>
                      {data.contacts.map(({ id, name }) => {
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
        <Mutation
          mutation={CREATE_NOTE}
          variables={{ body, applicationId, companyId, contactId }}
          onCompleted={(data) => _confirm(data)}
        >
          {(mutation) =>
            body && (
              <Button variant="dark" type="submit" onClick={mutation}>
                Submit
              </Button>
            )
          }
        </Mutation>
      </Form>
    )
  }

  return (
    <div className="container">
      <Card className="text-center">
        <Card.Header>{title}</Card.Header>
        <Card.Body>{newNoteForm()}</Card.Body>
      </Card>
    </div>
  )
}

export default NewNote
