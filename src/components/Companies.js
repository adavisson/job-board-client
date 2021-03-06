import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Query } from 'react-apollo'
import { GET_COMPANIES } from '../graphql/queries'
import { AUTH_TOKEN } from '../constants'
import Heading from './Heading'

const Companies = () => {
  const title = 'Companies'
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div className="companies">
      <Heading title={title} />
      {authToken && (
        <Button variant="dark" href="/company/new">
          Add Company
        </Button>
      )}
      <Query query={GET_COMPANIES}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <>
                <p>Loading...</p>
              </>
            )
          if (error) return <p>Error :(</p>

          // Put into alphabetical order
          data.companies.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )

          return (
            <div className="card-container">
              {data.companies.map(
                ({ id, name, address, phoneNumber, website }) => (
                  <Card className="company-card">
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>
                      {address && <Card.Text>Address: {address}</Card.Text>}
                      {phoneNumber && (
                        <Card.Text>Phone: {phoneNumber}</Card.Text>
                      )}
                      {website && (
                        <Card.Text>
                          Website: <a href={website}>{website}</a>
                        </Card.Text>
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="dark" href={`/companies/${id}`}>
                        Company Page
                      </Button>
                    </Card.Footer>
                  </Card>
                )
              )}
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default Companies
