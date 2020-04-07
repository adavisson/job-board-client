import React, { useState } from 'react';
import Heading from './Heading';

const Company = (props) => {
  const title = props.name || "company page";
  const [companyId, setCompanyId] = useState(props.match.params.id)

  return (
    <div className="company">
      <Heading title={title} />
      <p>{companyId}</p>
    </div>
  );
}
 
export default Company;