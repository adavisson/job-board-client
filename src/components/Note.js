import React, { useState } from 'react'
import Heading from './Heading'
import { Query, Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../constants'
import { GET_NOTE } from '../graphql/queries'
import { DELETE_NOTE } from '../graphql/mutations'
import { Redirect } from 'react-router'
import { Button } from 'react-bootstrap';

const Note = (props) => {
  const title = 'Note'
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const noteId = props.match.params.id
  const [confirm, setConfirm] = useState(false)

  if (!authToken) {
    alert('Please login to view note.')
    return <Redirect to="/login" />
  }

  const _confirm = (data) => {
    const { id } = data.deleteNote
    alert(`Note deleted`)
    props.history.push('/notes')
  }

  const confirmDeletion = () => {
    return (
      <Mutation
        mutation={DELETE_NOTE}
        variables={{id: noteId}}
        onCompleted={(data) => _confirm(data)}
      >
        {(mutation) => (
          <span>
            <Button variant="dark" onClick={mutation}>Confirm Deletion</Button>{" "}
            <Button variant="light" onClick={() => setConfirm(false)}>Cancel</Button>
          </span>
        )}
      </Mutation>
    )
  }

  return (
    <div className="note">
      <Query query={GET_NOTE} variables={{ id: noteId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error</p>

          return (
            <>
              <Heading title={title} />
              <div className="container">
                <h5>Note: </h5>
                <p>{data.note.body}</p>
                {(data.note.company ||
                  data.note.contact ||
                  data.note.application) && (
                  <>
                    <h5>Associated with: </h5>
                    {data.note.application && (
                      <p>
                        Application:{' '}
                        <a
                          href={`/job-postings/${data.note.application.jobPosting.id}`}
                        >
                          {data.note.application.jobPosting.title} at{' '}
                          {data.note.application.jobPosting.company.name}
                        </a>
                      </p>
                    )}
                    {data.note.company && (
                      <p>
                        Company:{' '}
                        <a href={`/companies/${data.note.company.id}`}>
                          {data.note.company.name}
                        </a>
                      </p>
                    )}
                    {data.note.contact && (
                      <p>
                        Contact:{' '}
                        <a href={`/contacts/${data.note.contact.id}`}>
                          {data.note.contact.name}
                        </a>
                      </p>
                    )}
                  </>
                )}
              </div>
            </>
          )
        }}
      </Query>
      {!confirm && <Button variant="link" onClick={() => setConfirm(true)}>Delete Note</Button>}
      {confirm && confirmDeletion()}
    </div>
  )
}

export default Note
