import React from 'react';
import Heading from './Heading';
import { AUTH_TOKEN } from '../constants';
import { Redirect } from 'react-router';
import { Query } from 'react-apollo';
import { GET_NOTES } from '../graphql/queries';
import { Table } from 'react-bootstrap';

const Notes = () => {
  const title = "Notes"
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken){
    alert('Please login to view your notes.')
    return <Redirect to="/login" />
  }

  return (
    <div className="table-container">
      <Heading title={title} />

      <Table responsive striped bordered size="sm">
        <thead>
          <tr>
            <th>Date: (last updated)</th>
            <th>Text</th>
            <th>Application</th>
            <th>Company</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <Query query={GET_NOTES}>
            {({loading, error, data}) => {
              if (loading) return (
                <p>Loading...</p>
              )
              if (error) return <p>Error :(</p>

              data.notes.sort((a,b) => (a.updatedAt > b.updatedAt ? 1 : -1))

              return (
                <>
                  {data.notes.map(({updatedAt, body, application, company, contact}) => {
                    return (
                      <tr>
                        <td>{updatedAt}</td>
                        <td>{body}</td>
                        <td>{application && (`${application.jobPosting.title} at ${application.jobPosting.company.name}`)}</td>
                        <td>{company && company.name}</td>
                        <td>{contact && contact.name}</td>
                      </tr>
                    )
                  })}
                </>
              )
            }}
          </Query>
        </tbody>
      </Table>
    </div>
  )
}
 
export default Notes;