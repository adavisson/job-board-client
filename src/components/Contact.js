import React from 'react';
import Heading from './Heading';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router';
import { AUTH_TOKEN } from '../constants';

const Contact = (props) => {
  const name = "Contact"
  const contactId = props.match.params.id
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to view contact.')
    return <Redirect to="/login" />
  }

  return (
    <div className="contact">
      <Heading title={name} />
      <p>{contactId}</p>
    </div>
  );
}
 
export default Contact;