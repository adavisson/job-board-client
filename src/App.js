import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SERVER_URI, AUTH_TOKEN } from './constants';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {
  Home,
  Test,
  Login,
  NavBar,
  JobPostings,
} from './components';

const httpLink = craeteHttpLink({
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
    <Router> 
      <ApolloProvider client={client}>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/job-postings" component={JobPostings} />
        <Route path="/test" component={Test} />
      </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
