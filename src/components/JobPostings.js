import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_JOB_POSTINGS } from '../graphql/queries';
import { Card } from 'react-bootstrap';
import Heading from './Heading';

const JobPostings = () => {
  const title="Job Postings";

  const { loading, error, data } = useQuery(GET_JOB_POSTINGS);

  if (loading) return (
    <>
      <Heading title={title}/>
      <p>Loading...</p>
    </>
  )
  if (error) return <p>Error :(</p>

  return (
    <div className="job-postings">
      <Heading title={title} />
      <div className="card-container">
        {data.jobPostings.map(({title, company, link}) => (
            <Card>
              <Card.Header>{title}</Card.Header>
              <Card.Body>
                <Card.Text>Company: {company.name}</Card.Text>
                <Card.Text>Link to Posting: <a href={link}>{link}</a></Card.Text>
              </Card.Body>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
 
export default JobPostings;