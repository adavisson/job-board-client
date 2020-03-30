import { gql } from 'apollo-boost';

export const GET_JOB_POSTINGS = gql`
  {
    jobPostings {
      title
      company {
        id
        name
      }
      link
    }
  }
`

export const GET_COMPANIES = gql`
  {
    companies {
      name
      address
      phoneNumber
      website
    }
  }
`

export const GET_CONTACTS = gql`
  {
    contacts {
      name
      jobTitle
      company{
        name
      }
      phoneNumber
      email
    }
  }
`