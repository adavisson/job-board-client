import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Query } from 'react-apollo'
import Heading from './Heading'
import { AUTH_TOKEN } from '../constants'
import { Redirect } from 'react-router'
import { GET_CONTACTS } from '../graphql/queries'

const Contacts = () => {
  const title = 'Contacts'
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to view your contacts.')
    return <Redirect to="/login" />
  }

  return (
    <div className="contacts">
      <Heading title={title} />
      <Button variant="dark" href="/contact/new">
        Add Contact
      </Button>
      <Query query={GET_CONTACTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          // Put into alphabetical order
          data.contacts.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )

          return (
            <div className="card-container">
              {data.contacts.map(
                ({ id, name, jobTitle, company, phoneNumber, email }) => (
                  <Card className="contact-card">
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>
                      {company && jobTitle && (
                        <Card.Text>
                          {jobTitle} at <a href={`/companies/${company.id}`}>{company.name}</a>
                        </Card.Text>
                      )}
                      {!company && jobTitle && (
                        <Card.Text>{jobTitle}</Card.Text>
                      )}
                      {phoneNumber && (
                        <Card.Text>Phone: {phoneNumber}</Card.Text>
                      )}
                      {email && <Card.Text>Email: <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a></Card.Text>}
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="dark" href={`/contacts/${id}`}>
                        View Contact
                      </Button>
                    </Card.Footer>
                  </Card>
                )
              )}
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default Contacts
