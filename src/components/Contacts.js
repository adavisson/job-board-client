import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Query } from 'react-apollo';
import Heading from './Heading';
import { AUTH_TOKEN } from '../constants';
import { Redirect } from 'react-router';
import { GET_CONTACTS } from '../graphql/queries';

const Contacts = () => {
  const title = "Contacts"
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (!authToken) {
    alert('Please login to view your contacts.')
    return <Redirect to="/login" />
  }

  return (
    <div className="contacts">
      <Heading title={title} />
      <Button variant="dark" href="/new-contact">Add Contact</Button>
      <Query query={GET_CONTACTS}>
        {({ loading, error, data }) => {
          if (loading) return (
            <>
              <Heading title={title} />
              <p>Loading...</p>
            </>
          )
          if (error) return <p>Error :(</p>

          // Put into alphabetical order
          data.contacts.sort((a,b) =>  (a.name > b.name) ? 1 : -1)
          
          return(
            <div className="card-container">
              {data.contacts.map(({name, jobTitle, company, phoneNumber, email})=> (
                  <Card className="contact-card">
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>
                      <Card.Text>{jobTitle} at {company.name}</Card.Text>
                      <Card.Text>Phone: {phoneNumber}</Card.Text>
                      <Card.Text>Email: {email}</Card.Text>
                    </Card.Body>
                  </Card>
                )
              )}
            </div>
          )
        }}
      </Query>
    </div>
  );
}
 
export default Contacts;