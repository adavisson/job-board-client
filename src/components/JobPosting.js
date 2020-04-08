import React from 'react';
import Heading from './Heading';
import { Query } from 'react-apollo';
import { GET_JOB_POSTING } from '../graphql/queries';

const JobPosting = (props) => {
  const jobPostingId = props.match.params.id
  return (
    <div className="job-posting">
      <Query query={GET_JOB_POSTING}
        variables={{id: jobPostingId}}>
        {({ loading, error, data}) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error</p>

          return (
            <>
              <Heading title={data.jobPosting.title} />
              <p>Link to Posting: {data.jobPosting.link}</p>
              <p>Company: {data.jobPosting.company.name}</p>
            </>
          )
        }}
      </Query>
    </div>
  );
}
 
export default JobPosting;