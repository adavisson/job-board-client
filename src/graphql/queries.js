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
    compaies {
      name
      address
      phoneNumber
      website
    }
  }
`