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

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user ? user.token : null)
    dispatch({
      type: 'ADD_BLOG',
      data: user
    })
  }
}

export const initUser = () => {
  return async (dispatch) => {
    const oldUser = JSON.parse(localStorage.getItem('currentUser'))
    if (oldUser)
      await setUser(oldUser)(dispatch)
  }
}

export default reducer