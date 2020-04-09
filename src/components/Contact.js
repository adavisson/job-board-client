import React from 'react'
import Heading from './Heading'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import { GET_CONTACT } from '../graphql/queries'

const Contact = (props) => {
  const contactId = props.match.params.id
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to view contact.')
    return <Redirect to="/login" />
  }

  return (
    <div className="contact">
      <Query query={GET_CONTACT} variables={{ id: contactId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error</p>

          return (
            <>
              <Heading title={data.contact.name} />
              <div className="container">
                <div className="contact-info">
                  <h4>
                    {data.contact.jobTitle}
                    {data.contact.company && ` at ${data.contact.company.name}`}
                  </h4>
                  {data.contact.email && <p>Email: {data.contact.email}</p>}
                  {data.contact.phoneNumber && (
                    <p>Phone Number: {data.contact.phoneNumber}</p>
                  )}
                </div>
                {data.contact.notes.length > 0 && (
                  <div>
                    <h3>Notes</h3>
                    <ol>
                      {data.contact.notes.map((note) => {
                        return <li>{note.body.substring(0, 25)}</li>
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

export default Contact
