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
  NewCompany,
  NewContact,
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
        <Route path="/new-company" component={NewCompany} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/new-contact" component={NewContact} />
        <Route path="/test" component={Test} />
        <Route path="/account" component={Account} />
      </Switch>
    </div>
  );
}
 
export default Routes;