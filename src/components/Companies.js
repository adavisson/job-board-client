import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANIES } from '../graphql/queries';
import { AUTH_TOKEN } from '../constants';
import Heading from './Heading';

const Companies = () => {
  const title = "Companies"
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const { loading, error, data } = useQuery(GET_COMPANIES);

  if (loading) return (
    <>
      <Heading title={title} />
      <p>Loading...</p>
    </>
  )
  if (error) return <p>Error :(</p>
  return (
    <div className="companies">
      <Heading title={title} />
      {authToken && (<Button variant="dark" href="/new-company">Add Company</Button>)}
      <div className="card-container">
        {data.companies.map(({name, address, phoneNumber, website}) => (
            <Card className="company-card">
              <Card.Header>{name}</Card.Header>
              <Card.Body>
                <Card.Text>Address: {address}</Card.Text>
                <Card.Text>Phone: {phoneNumber}</Card.Text>
                <Card.Text>Website: <a href={website}>{website}</a></Card.Text>
              </Card.Body>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
 
export default Companies;