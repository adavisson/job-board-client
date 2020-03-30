import React from 'react';
import Heading from './Heading';
import { useQuery } from '@apollo/react-hooks';
import { AUTH_TOKEN } from '../constants';
import { Redirect } from 'react-router';
import { GET_CONTACTS } from '../graphql/queries';

const Contacts = () => {
  const title = "Contacts"
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const { loading, error, data } = useQuery(GET_CONTACTS);

  if (!authToken) {
    alert('Please login to view your contacts.')
    return <Redirect to="/login" />
  }

  if (loading) return (
    <>
      <Heading title={title} />
      <p>Loading...</p>
    </>
  )
  if (error) return <p>Error :(</p>

  return (
    <div className="contacts">
      <Heading title={title} />
      {data.contacts.map(({name, jobTitle, company, phoneNumber, email})=> (
          <>
            <h5>{name}</h5>
            <p>{jobTitle} at {company.name}</p>
            <p>Phone: {phoneNumber}</p>
            <p>Email: {email}</p>
            <br/>
          </>
        )
      )}
    </div>
  );
}
 
export default Contacts;