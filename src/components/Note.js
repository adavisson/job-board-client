import React from 'react'
import Heading from './Heading'
import { Query } from 'react-apollo'
import { AUTH_TOKEN } from '../constants'
import { GET_NOTE } from '../graphql/queries'
import { Redirect } from 'react-router'

const Note = (props) => {
  const title = 'Note'
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const noteId = props.match.params.id

  if (!authToken) {
    alert('Please login to view note.')
    return <Redirect to="/login" />
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
    </div>
  )
}

export default Note
