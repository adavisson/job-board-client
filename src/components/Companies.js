import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANIES } from '../graphql/queries';
import Heading from './Heading';

const Companies = () => {
  const title = "Companies"

  const { loading, error, data } = useQuery(GET_COMPANIES);

  if (loading) return (
    <>
      <Heading title={title} />
      <p>Loading...</p>
    </>
  )
  if (error) return <p>Error :(</p>
  return (
    <div className="companies">
      <Heading title={title} />
      {data.companies.map(({name, address, phoneNumber, website}) => (
          <>
            <h5>{name}</h5>
            <p>Address: {address}</p>
            <p>Phone: {phoneNumber}</p>
            <p>Website: <a href={website}>{website}</a></p>
            <br/>
          </>
        )
      )}
    </div>
  );
}
 
export default Companies;