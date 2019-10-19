require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const Book = require('./models/Book');
const Author = require('./models/Author');
const defaultData = require('./defaultData');


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID! 
    genres: [String!]!
  }

  type Author  {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
    
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.count(),
    authorCount: () => Author.count(),
    allBooks: async (root, args) => {
      const books = await Book.find({
        genres: args.genre ? { $elemMatch: { $eq: args.genre } } : undefined
      }).populate('author');
      console.log(books);
      return books;
    },
    allAuthors: async () => {
      const authors = await Book.aggregate([
        {
          $group: {
            _id: '$author',
            bookCount: { $sum: 1 }
          },
        }, {
          $lookup: {
            from: 'authors',
            localField: '_id',
            foreignField: '_id',
            as: 'asd'
          }
        }, {
          $unwind: '$asd'
        }, {
          $project: {
            name: '$asd.name',
            born: '$asd.born',
            _id: 1,
            bookCount: 1
          }
        }]);
      console.log(authors)
      return authors;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('ASD');
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({
          name: args.author,
        });
        await author.save();
      }
      const book = new Book({
        ...args,
        author,
      });
      await book.save();
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
      );
      return author;
    }
  },
  Author: {
    name: root => root.name,
    id: root => root.id,
    born: root => root.born,
    bookCount: root => Book.count({ author: root.name })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

async function init() {
  //await initDb();
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

async function initDb() {
  await Book.deleteMany({});
  await Author.deleteMany({});
  const authors = defaultData.authors.map(a => new Author(a));
  await Author.insertMany(authors);
  await Book.insertMany(defaultData.books.map(b => new Book({
    ...b,
    author: authors.find(a => a.name === b.author)._id
  })));
}

init().catch(err => {
  console.error(err);
  process.exit(1);
})
