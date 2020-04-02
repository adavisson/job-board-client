import React, { useState, useEffect } from 'react';
import { AUTH_TOKEN } from '../constants';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { GET_COMPANIES } from '../graphql/queries';

const NewJobPosting = (props) => {
  const pageTitle = "Job Posting"
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [companyId, setCompanyId] = useState("")
  const authToken = localStorage.getItem(AUTH_TOKEN)
  
  if (!authToken) {
    alert('Please login to create a Job Posting')
    return <Redirect to='/login' />
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(`Company ID ${companyId}`)
  }

  const newJobPostingForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="titleInput">
          <Form.Label column smj="2">Title: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={title} onChange={e => setTitle(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="linkInput">
          <Form.Label column smj="2">Link to Posting: </Form.Label>
          <Col sm="10">
            <Form.Control type="input" value={link} onChange={e => setLink(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="nameInput">
          <Form.Label column smj="2">Company: </Form.Label>
          <Col sm="10">
            <Form.Control as="select" value={companyId} placeholder="Select" onChange={e => setCompanyId(e.target.value)}>
              <Query query={GET_COMPANIES}>
                {({ loading, error, data}) => {
                  if (loading) return <></>
                  if (error) return <></>
                  
                  return(
                    <>
                      <option value="">Select</option>
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
        <Button variant="dark" type="submit">Submit</Button>
      </Form>
    )
  }

  return (
    <div className="container">
      <Card className="text-center">
        <Card.Header>{pageTitle}</Card.Header>
        <Card.Body>
          {newJobPostingForm()}
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default NewJobPosting;