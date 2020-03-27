import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// Use this component to test out getting companies without authentication

const GET_COMPANIES = gql`
  {
    companies {
      name
      phone
      website
    }
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="test">
      <h1>Testing Page</h1>
      {data.companies.map(({name, phone, website}) => (
          <>
            <p>{name}</p>
            <p>{phone}</p>
            <p>{website}</p><br/>
          </>
        )
      )}
    </div>
  );
}
 
export default Test;