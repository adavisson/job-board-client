import React, { useState } from 'react'
import Heading from './Heading'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import { GET_CONTACT } from '../graphql/queries'
import { DELETE_CONTACT } from '../graphql/mutations'
import { Button } from 'react-bootstrap';

const Contact = (props) => {
  const contactId = props.match.params.id
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const [confirm, setConfirm] = useState(false)

  if (!authToken) {
    alert('Please login to view contact.')
    return <Redirect to="/login" />
  }

  const _confirm = (data) => {
    const id = data.deleteContact.id
    alert(`Contact deleted`)
    props.history.push('/contacts')
  }

  const confirmDeletion = () => {
    return (
      <Mutation
        mutation={DELETE_CONTACT}
        variables={{id: contactId}}
        onCompleted={(data)=> _confirm(data)}
      >
        {(mutation)=> (
          <div>
            <Button variant="dark" onClick={mutation}>Confirm</Button>{" "}
            <Button variant="light" onClick={() => setConfirm(false)}>Cancel</Button>
          </div>
        )}
      </Mutation>
    )
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
                    {data.contact.company && <> at <a href={`/companies/${data.contact.company.id}`}>{data.contact.company.name}</a></>}
                  </h4>
                  {data.contact.email && <p>Email: <a href={`mailto:${data.contact.email}`} target="_blank">{data.contact.email}</a></p>}
                  {data.contact.phoneNumber && (
                    <p>Phone Number: {data.contact.phoneNumber}</p>
                  )}
                </div>
                {data.contact.notes.length > 0 && (
                  <div>
                    <h3>Notes</h3>
                    <ol>
                      {data.contact.notes.map((note) => {
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
      {!confirm && <Button variant="link" onClick={() => setConfirm(true)}>Delete Contact</Button>}
      {confirm && confirmDeletion()}
    </div>
  )
}

export default Contact
