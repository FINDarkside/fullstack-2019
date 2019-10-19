const { gql } = require('apollo-server')

module.exports = gql`
type Book {
  _id: ID!
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
}

type Author  {
  _id: ID!
  name: String!
  born: Int
  bookCount: Int!
}

type User {
  _id: ID!
  username: String!
  favoriteGenre: String!
}

type Token {
  value: String!
}  

type Query {
  hello: String!
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
  
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  
  login(
    username: String!
    password: String!
  ): Token
}`;
