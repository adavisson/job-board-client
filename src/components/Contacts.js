import React from 'react';
import Heading from './Heading';
import { AUTH_TOKEN } from '../constants';
import { Redirect } from 'react-router';

const Contacts = () => {
  const title = "Contacts"
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (!authToken) {
    alert('Please login to view your contacts.')
    return <Redirect to="/login" />
  }

  return (
    <div className="contacts">
      <Heading title={title} />
    </div>
  );
}
 
export default Contacts;