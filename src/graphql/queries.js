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