import React from 'react';
import { Card } from 'react-bootstrap';
import Heading from './Heading';
import { useQuery } from '@apollo/react-hooks';
import { AUTH_TOKEN } from '../constants';
import { Redirect } from 'react-router';
import { GET_CONTACTS } from '../graphql/queries';

const Contacts = () => {
  const title = "Contacts"
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const { loading, error, data } = useQuery(GET_CONTACTS);

  if (!authToken) {
    alert('Please login to view your contacts.')
    return <Redirect to="/login" />
  }

  if (loading) return (
    <>
      <Heading title={title} />
      <p>Loading...</p>
    </>
  )
  if (error) return <p>Error :(</p>

  // Put into alphabetical order
  data.contacts.sort((a,b) =>  (a.name > b.name) ? 1 : -1)

  return (
    <div className="contacts">
      <Heading title={title} />
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
    </div>
  );
}
 
export default Contacts;