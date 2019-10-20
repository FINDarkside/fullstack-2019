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
    author{
      name
    }
    published
    genres
    _id
  }
}`

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $birthyear: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $birthyear,
  ) {
    name
    _id
    born
    bookCount
  }
}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password,
  ) {
    value
  }
}`

