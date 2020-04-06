import React from 'react';
import { Redirect } from 'react-router';

export const loggedIn = (authToken, response) => {
  if (!authToken) {
    alert(response)
    return <Redirect to="/login"/>
  }
}