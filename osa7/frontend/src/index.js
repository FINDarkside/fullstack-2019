
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import currentUserReducer from './reducers/currentUserReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogService from './services/blogs';
import userService from './services/users';

const reducer = combineReducers({
  blogs: blogReducer,
  currentUser: currentUserReducer,
  notifications: notificationReducer,
  users: userReducer,
})
const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => {
  const state = store.getState();
  let newToken = state.currentUser ? state.currentUser.token : null;
  blogService.setToken(newToken);
  localStorage.setItem('currentUser', JSON.stringify(state.currentUser || null));
})

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
