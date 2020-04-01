import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`

export const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!, $address: String, $phoneNumber: String, $website: String) {
    createCompany(name: $name, address: $address, phoneNumber: $phonNumber, website: $website) {
      id
    }
  }
`