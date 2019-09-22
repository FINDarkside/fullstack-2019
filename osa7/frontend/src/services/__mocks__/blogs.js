
const blogs = [
  {
    likes: 8,
    title: 'test',
    author: 'Minä',
    url: 'google.com',
    user: {
      username: 'Jesse2',
      name: 'Jesse Niininen',
      id: '5d350a67ee300818c8f49ffa'
    },
    id: '5d350a6aee300818c8f49ffb'
  },
  {
    likes: 11,
    title: 'Joku huono',
    author: 'Minä',
    url: 'google.com',
    user: {
      username: 'Jesse2',
      name: 'Jesse Niininen',
      id: '5d350a67ee300818c8f49ffa'
    },
    id: '5d35130c6e08cc405095fe7a'
  },
  {
    likes: 22,
    title: 'asdasd',
    author: 'asdasd',
    url: 'asdasd',
    user: {
      username: 'Jesse2',
      name: 'Jesse Niininen',
      id: '5d350a67ee300818c8f49ffa'
    },
    id: '5d372778989d952fecffae27'
  },
  {
    likes: 2,
    title: 'TestTitle',
    author: 'Minä Jesse',
    url: 'pöö.köö',
    user: {
      username: 'Jesse2',
      name: 'Jesse Niininen',
      id: '5d350a67ee300818c8f49ffa'
    },
    id: '5d3cf91444d7fc43b4263d58'
  },
  {
    likes: 0,
    title: 'ASdasd',
    author: 'asdasd',
    url: 'asdasd',
    user: {
      username: 'Jesse2',
      name: 'Jesse Niininen',
      id: '5d350a67ee300818c8f49ffa'
    },
    id: '5d44820610974115d4a82ea2'
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const f = () => Promise.resolve(null);

export default { getAll, setToken: f, create: f, like: f, delteBlog: f };
