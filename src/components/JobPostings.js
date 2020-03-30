import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_JOB_POSTINGS } from '../graphql/queries';
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