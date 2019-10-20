import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount,
    _id
  }
}`

export const ALL_BOOKS = gql`
query allBooks($genre: String){
  allBooks(genre: $genre)  {
    title
    published
    author{
      name
    }
    genres
    _id,
  }
}`

export const ALL_GENRES = gql`
{
  allGenres
}`

export const ME = gql`
{
  me{
    favoriteGenre
  }
}
`;