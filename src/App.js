import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {
  Home,
  Test,
} from './components';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router> 
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/test" component={Test} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
