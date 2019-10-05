import React from 'react';
import { connect } from 'react-redux'

const User = ({ user, userBlogs }) => {
  console.log({ user, userBlogs })
  if (!user || !userBlogs)
    return null;

  return (
    <div>
      <div>
        <h1 className="title">{user.name}</h1>
        <h4>Added blogs</h4>
        <ul>
          {userBlogs.map(b => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div >
    </div >

  );
};

const mapStateToProps = (state, props) => {
  console.log({ state, props })
  if (!props.user || !state.users)
    return { ...props, userBlogs: null, user: null }
  return {
    ...props,
    user: props.user,
    userBlogs: state.blogs.filter(b => b.user.id === props.user.id),
  }
}

const ConnectedUser = connect(mapStateToProps, null)(User)
export default ConnectedUser
