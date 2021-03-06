import React from 'react'
import Heading from './Heading'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router'
import { GET_COMPANY } from '../graphql/queries'
import { AUTH_TOKEN } from '../constants'

const Company = (props) => {
  const companyId = props.match.params.id
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to view company.')
    return <Redirect to="/login" />
  }

  return (
    <div className="company">
      <Query query={GET_COMPANY} variables={{ id: companyId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error</p>

          return (
            <>
              <Heading title={data.company.name} />
              <div className="container">
                <div className="company-info">
                  <p>Address: {data.company.address}</p>
                  <p>Phone Number: {data.company.phoneNumber}</p>
                  <p>Website: <a href={data.company.website}>{data.company.website}</a></p>
                </div>
                {data.company.employees.length > 0 && (
                  <div>
                    <h3>Employees</h3>
                    <ul>
                      {data.company.employees.map((employee) => {
                        return (
                          <li>
                            <a href={`/contacts/${employee.id}`}>{employee.name}</a> - {employee.jobTitle}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                {data.company.jobPostings.length > 0 && (
                  <div>
                    <h3>Job Postings</h3>
                    <ul>
                      {data.company.jobPostings.map((posting) => {
                        return <li><a href={`/job-postings/${posting.id}`}>{posting.title}</a></li>
                      })}
                    </ul>
                  </div>
                )}
                {data.company.notes.length > 0 && (
                  <div>
                    <h3>Notes</h3>
                    <ol>
                      {data.company.notes.map((note) => {
                        return <li><a href={`/notes/${note.id}`}>{note.body.substring(0, 25)}</a></li>
                      })}
                    </ol>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </Query>
    </div>
  )
}

export default Company
