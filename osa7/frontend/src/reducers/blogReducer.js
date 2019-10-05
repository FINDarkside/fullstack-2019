import blogService from '../services/blogs';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.data);
    case 'SET_BLOGS':
      return action.data;
    case 'LIKE_BLOG':
      return state.map(b => b.id !== action.data.id ? b : {
        ...b,
        likes: b.likes + 1
      });
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id);
    case 'ADD_BLOG_COMMENT':
      return state.map(b => b.id !== action.data.id ? b : {
        ...b,
        comments: [...b.comments, action.data.comment]
      });
    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    });
  };
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.like(blog);
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: blog.id }
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.delete(blog);
    dispatch({
      type: 'DELETE_BLOG',
      data: { id: blog.id }
    });
  };
};

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    console.log({ blog, comment });
    await blogService.addComment(blog.id, comment);
    dispatch({
      type: 'ADD_BLOG_COMMENT',
      data: { id: blog.id, comment: comment }
    });
  };
};


export default reducer;