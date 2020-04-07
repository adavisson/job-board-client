import React from 'react';
import { Query } from 'react-apollo';
import { GET_JOB_POSTINGS } from '../graphql/queries';
import { Card, Button } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import Heading from './Heading';

const JobPostings = () => {
  const title="Job Postings";
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div className="job-postings">
      <Heading title={title} />
      {authToken && (<Button variant="dark" href="/job-posting/new">Add Job Posting</Button>)}
      <Query query={GET_JOB_POSTINGS}>
        {({ loading, error, data }) => {
          if (loading) return (
            <>
              <p>Loading...</p>
            </>
          )
          if (error) return <p>Error :(</p>

          return (
            <div className="card-container">
              {data.jobPostings.map(({title, company, link}) => (
                <Card className="job-posting-card">
                  <Card.Header>{title}</Card.Header>
                  <Card.Body>
                    <Card.Text>Company: {company.name}</Card.Text>
                    <Card.Text>Link to Posting: <a href={link}>{link}</a></Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )
        }}
      </Query>
    </div>
  );
}
 
export default JobPostings;