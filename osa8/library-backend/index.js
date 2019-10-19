require('dotenv').config();
const { ApolloServer } = require('apollo-server')
const Book = require('./models/Book');
const Author = require('./models/Author');
const defaultData = require('./defaultData');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req.headers.authorization;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substr(7), process.env.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
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
