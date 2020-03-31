import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  Test,
  Login,
  NavBar,
  JobPostings,
  Companies,
  Contacts,
  Account,
} from '.';


const Routes = () => {
  return (  
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/job-postings" component={JobPostings} />
        <Route path="/companies" component={Companies} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/test" component={Test} />
        <Route path="/account" component={Account} />
      </Switch>
    </div>
  );
}
 
export default Routes;