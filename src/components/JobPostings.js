import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_JOB_POSTINGS = gql`
  {
    jobPostings {
      title
      company {
        id
        name
      }
      link
    }
  }
`

const JobPostings = () => {
  const { loading, error, data } = useQuery(GET_JOB_POSTINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div className="job-postings">
      <h1>Job Postings</h1>
      {data.jobPostings.map(({title, company, link}) => (
          <>
            <h5>{title}</h5>
            <p>Company: {company.name}</p>
            <p>Website: <a href={link}>{link}</a></p>
          </>
        )
      )}
    </div>
  );
}
 
export default JobPostings;