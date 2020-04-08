import { gql } from 'apollo-boost';

export const GET_JOB_POSTINGS = gql`
  {
    jobPostings {
      id
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
      id
      name
      address
      phoneNumber
      website
    }
  }
`

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    company (id: $id) {
      name
      address
      phoneNumber
      website
      employees {
        id
        name
        jobTitle
      }
      jobPostings {
        id
        title
      }
      notes {
        id
        body
      }

    }
  }
`

export const GET_CONTACTS = gql`
  {
    contacts {
      id
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

export const GET_CONTACT = gql`
  query GetContact($id: ID!) {
    contact(id: $id) {
      name
      email
      phoneNumber
      jobTitle
      company {
        id
        name
      }
      notes {
        id
        body
      }
    }
  }
`

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      name
      email
      age
      bio
      gender
      contacts {
        id
        name
      }
      applications {
        id
        jobPosting{
          title
        }
      }
      notes {
        body
      }
    }
  }
`

export const GET_NOTES = gql`
  {
    notes {
      id
      body
      user{
        id
        name
      }
      company {
        id
        name
      }
      application {
        id
        jobPosting {
          title
          company {
            name
          }
        }
      }
      contact {
        id
        name
      }
      updatedAt
    }
  }
`

export const GET_APPLICATIONS = gql`
  {
    applications {
      id
      applied
      jobPosting {
        title
        link
        company {
          name
        }
      }
    }
  }
`