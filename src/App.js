import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SERVER_URI, AUTH_TOKEN } from './constants';
import Routes from './components/Routes';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { BrowserRouter } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: SERVER_URI
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <BrowserRouter> 
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
