import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  Login,
  NavBar,
  JobPostings,
  Companies,
  Contacts,
  Account,
  NewCompany,
  NewContact,
  NewJobPosting,
  Notes,
  NewNote,
} from '.';


const Routes = () => {
  return (  
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/job-postings" component={JobPostings} />
        <Route path="/new-job-posting" component={NewJobPosting} />
        <Route path="/companies" component={Companies} />
        <Route path="/new-company" component={NewCompany} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/new-contact" component={NewContact} />
        <Route path="/account" component={Account} />
        <Route path="/notes" component={Notes} />
        <Route path="/new-note" component={NewNote} />
      </Switch>
    </div>
  );
}
 
export default Routes;