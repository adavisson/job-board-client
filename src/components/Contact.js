import React from 'react';
import Heading from './Heading';
import { Redirect } from 'react-router';
import { AUTH_TOKEN } from '../constants';

const Contact = () => {
  const name = "Contact"
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to view contact.')
    return <Redirect to="/login" />
  }

  return (
    <Heading title={name} />
  );
}
 
export default Contact;