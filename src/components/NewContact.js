import React from 'react';
import { Redirect } from 'react-router';
import { AUTH_TOKEN } from '../constants';

const NewContact = () => {
  const title = "Add Contact"
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to add a contact')
    return <Redirect to="/login" />
  }

  return (  
    <h1>New Contact</h1>
  );
}
 
export default NewContact;