import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password);
    setUser(user)(dispatch);
  }
}

export const setUser = (user) => {
  return (dispatch) => {
    blogService.setToken(user ? user.token : null)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export default reducer