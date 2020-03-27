import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// Use this component to test out getting companies without authentication

const GET_COMPANIES = gql`
  {
    companies {
      name
      phoneNumber
      website
    }
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="test">
      <h1>Testing Page</h1>
      {data.companies.map(({name, phoneNumber, website}) => (
          <>
            <p>{name}</p>
            <p>{phoneNumber}</p>
            <p>{website}</p><br/>
          </>
        )
      )}
    </div>
  );
}
 
export default Test;