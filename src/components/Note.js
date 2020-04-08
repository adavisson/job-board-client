import React from 'react';
import Heading from './Heading';
import { AUTH_TOKEN } from '../constants';
import { Redirect } from 'react-router';

const Note = () => {
  const title = "Note"
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (!authToken) {
    alert("Please login to view note.")
    return <Redirect to="/login" />
  }

  return (
    <Heading title={title} />
  );
}
 
export default Note;