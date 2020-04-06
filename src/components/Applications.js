import React from 'react';
import Heading from './Heading';
import { Redirect } from 'react-router';
import { AUTH_TOKEN } from '../constants';

const Applications = () => {
  const title = "Applications"
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (!authToken) {
    alert('Please login to see your applications.')
    return <Redirect to="/login" />
  }

  return (  
    <Heading title={title} />
  );
}
 
export default Applications;