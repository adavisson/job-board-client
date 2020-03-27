import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {
  Home,
  Test,
} from './components';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/test" component={Test} />
      </div>
    </Router>
  );
}

export default App;
