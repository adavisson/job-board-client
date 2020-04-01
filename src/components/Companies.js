import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Query } from 'react-apollo';
import { GET_COMPANIES } from '../graphql/queries';
import { AUTH_TOKEN } from '../constants';
import Heading from './Heading';

const Companies = () => {
  const title = "Companies"
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="companies">
      <Heading title={title} />
      {authToken && (<Button variant="dark" href="/new-company">Add Company</Button>)}
      <Query query={GET_COMPANIES}>
        {({ loading, error, data }) => {
          if (loading) return (
            <>
              <p>Loading...</p>
            </>
          )
          if (error) return <p>Error :(</p>

          // Put into alphabetical order
          data.companies.sort((a,b) => (a.name > b.name) ? 1 : -1)

          return (
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
          )
        }}
      </Query>
    </div>
  );
}
 
export default Companies;