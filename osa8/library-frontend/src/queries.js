import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount,
    id
  }
}`

export const ALL_BOOKS = gql`
{
  allBooks  {
    title
    published
    author,
    id,
  }
}`
