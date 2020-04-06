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
    createCompany(name: $name, address: $address, phoneNumber: $phoneNumber, website: $website) {
      id
    }
  }
`

export const CREATE_CONTACT = gql`
  mutation CreateContact($name: String!, $email: String, $phoneNumber: String, $jobTitle: String, $companyId: ID) {
    createContact(name: $name, email: $email, phoneNumber: $phoneNumber, jobTitle: $jobTitle, companyId: $companyId) {
      id
    }
  }
`

export const CREATE_JOB_POSTING = gql`
  mutation CreateJobPosting($title: String!, $link: String!, $companyId: ID!) {
    createJobPosting(title: $title, link: $link, companyId: $companyId) {
      id
    }
  }
`

export const CREATE_NOTE = gql`
  mutation CreateNote($body: String!, $applicationId: ID, $companyId: ID, $contactId: ID) {
    createNote(body: $body, applicationId: $applicationId, companyId: $companyId, contactId: $contactId) {
      id
    }
  }
`