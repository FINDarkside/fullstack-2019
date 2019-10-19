const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server')

module.exports = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.count(),
    authorCount: () => Author.count(),
    allBooks: async (root, args) => {
      const query = {
        genres: { $elemMatch: { $eq: args.genre } }
      };
      if (!args.genre)
        delete query.genres;
      const books = await Book.find(query).populate('author');
      return books;
    },
    allAuthors: Author.find(),
    me: (root, args, context) => {
      if (!context.currentUser)
        return null;
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('Forbidden');
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({
          name: args.author,
        });
        try {
          await author.save();
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args });
        }
      }
      const book = new Book({
        ...args,
        author,
      });
      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('Forbidden');
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
      ).lean();
      console.log({ ...author, born: args.setBornTo })
      return { ...author, born: args.setBornTo };
    },
    createUser: async (root, args) => {
      const user = new User({
        ...args
      });
      try {
        await user.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user)
        throw new UserInputError('User does not exist', { username: args.username });
      if (args.password !== 'C#>java')
        throw new UserInputError('Incorrect password');
      const tokenData = {
        username: args.username,
        id: user._id,
      }
      return { value: jwt.sign(tokenData, process.env.JWT_SECRET) };
    }
  },
  Author: {
    _id: root => root._id,
    name: root => root.name,
    born: root => root.born,
    bookCount: root => Book.count({ author: root._id })
  }
}
