import { login } from '../services/login'
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
    const user = await login(username, password);
    setUser(user)();
  }
}

export const setUser = (user) => {
  return (dispatch) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    blogService.setToken(user ? user.token : null)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const initUser = () => {
  return (dispatch) => {
    const oldUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(oldUser)
    if (oldUser)
      setUser(oldUser)(dispatch)
  }
}

export default reducer