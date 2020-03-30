import React from 'react';
import { Redirect } from 'react-router'
import Heading from './Heading';
import { AUTH_TOKEN } from '../constants';
import { GET_CURRENT_USER } from '../graphql/queries';
import { Query } from 'react-apollo';

const Account = () => {
  const title="Account Page"
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (!authToken) {
    alert('Please login to view your contacts.')
    return <Redirect to="/login" />
  }

  return (
    <div className="account">
      <Heading title={title} />
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data}) => {
          if(loading) return <p>Loading...</p>
          if(error) return <p>Error :(</p>
          
          const user = data.currentUser

          return (
            <div>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              {user.age && <p>Age: {user.age}</p>}
              {user.bio && <p>About: {user.bio}</p>}
              {user.gender && <p>Gender: {user.gender}</p>}
            </div>
          )
        }}
      </Query>
    </div>
  );
}
 
export default Account;