import { gql } from 'apollo-boost'

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
    id
  }
}`

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $birthyear: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $birthyear,
  ) {
    name
    id
    born
    bookCount
  }
}`

