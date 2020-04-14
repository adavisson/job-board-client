import React from 'react'
import Heading from './Heading'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from 'react-router'
import { Button } from 'react-bootstrap'
import { AUTH_TOKEN } from '../constants'
import { GET_APPLICATIONS } from '../graphql/queries'
import { DELETE_APPLICATION } from '../graphql/mutations'

const Applications = (props) => {
  const title = 'Applications'
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to see your applications.')
    return <Redirect to="/login" />
  }

  const _confirm = (data) => {
    const id = data.deleteApplication.id
    alert(`Note ${id} Deleted`)
    window.location.reload()
  }

  return (
    <div className="applications">
      <Heading title={title} />
      <br/>
      <Query query={GET_APPLICATIONS}>
        {({ loading, error, data }) => {
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
                    
                    <Mutation
                      mutation={DELETE_APPLICATION}
                      variables={{id}}
                      onCompleted={data => _confirm(data)}
                    >
                      {(mutation) => (
                        <Button variant="link" onClick={mutation}>Remove Application</Button>
                      )}
                    </Mutation>

                    <br/>
                    <br/>
                  </>
                )
              })}
            </>
          )
        }}
      </Query>
    </div>
  )
}

export default Applications
