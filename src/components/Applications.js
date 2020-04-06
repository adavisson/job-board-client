import React from 'react';
import Heading from './Heading';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import { GET_APPLICATIONS } from '../graphql/queries';

const Applications = () => {
  const title = "Applications"
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to see your applications.')
    return <Redirect to="/login" />
  }

  return (  
    <div className="applications">
      <Heading title={title} />
      <Query query={GET_APPLICATIONS}>
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return (
            <>
              {data.applications.map(({ id, applied, jobPosting }) => {
                return (
                  <>
                    <p>Job Title: {jobPosting.title}</p>
                    <p>Company: {jobPosting.company.name}</p>
                    <p>Link to Posting: {jobPosting.link}</p>
                    <p>Applied: {applied ? 'Yes' : 'No'}</p>
                  </>
                )
              })}
            </>
          )
        }}
      </Query>
    </div>
  );
}
 
export default Applications;