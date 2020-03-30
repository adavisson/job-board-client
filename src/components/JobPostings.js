import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_JOB_POSTINGS } from '../graphql/queries';

const JobPostings = () => {

  const Heading = () => {
    return (
      <h1>JobPostings</h1>
    )
  }
  
  const { loading, error, data } = useQuery(GET_JOB_POSTINGS);

  if (loading) return (
    <>
      <Heading/>
      <p>Loading...</p>
    </>
  )

  if (error) return <p>Error :(</p>;

  return (
    <div className="job-postings">
      <Heading />
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