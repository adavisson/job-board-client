import React from 'react';
import Heading from './Heading';

const Account = () => {
  const title="Account Page"
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (!authToken) {
    alert('Please login to view your contacts.')
    return <Redirect to="/login" />
  }

  return (
    <div className="account">
      <Heading title={title} />
    </div>
  );
}
 
export default Account;