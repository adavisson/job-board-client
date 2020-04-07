import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  Login,
  NavBar,
  JobPostings,
  Companies,
  Company,
  Contacts,
  Contact,
  Account,
  NewCompany,
  NewContact,
  NewJobPosting,
  Notes,
  NewNote,
  Applications,
} from '.';


const Routes = () => {
  return (  
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/job-postings" component={JobPostings} />
        <Route path="/job-posting/new" component={NewJobPosting} />
        <Route path="/companies/:id" component={Company} />
        <Route path="/companies" component={Companies} />
        <Route path="/company/new" component={NewCompany} />
        <Route path="/contacts/:id" component={Contact} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/contact/new" component={NewContact} />
        <Route path="/account" component={Account} />
        <Route path="/notes" component={Notes} />
        <Route path="/note/new" component={NewNote} />
        <Route path="/applications" component={Applications} />
      </Switch>
    </div>
  );
}
 
export default Routes;