import React from 'react';
import { Button } from 'react-bootstrap'

const UpdateContact = (props) => {
  const contactId = props.match.params.id
  
  return (
    <Button variant="secondary" onClick={() => props.history.push(`/contacts/${contactId}`)}>Cancel</Button>
  );
}
 
export default UpdateContact;