import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'SET_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      return state.map(b => b.id !== action.data.id ? b : {
        ...b,
        likes: b.likes + 1
      });
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const initBlogs = (content) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.like(blog);
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: blog.id }
    })
  }
}

export default reducer