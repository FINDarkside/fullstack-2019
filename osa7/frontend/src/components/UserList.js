import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  if (!users)
    return null;

  console.log('Users', users);

  return (
    <div>
      <div>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id}>
                  <td>
                    <Link to={'/users/' + user.id} >{user.name}</Link>
                  </td>
                  <td>{user.blogCount}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </div >

  );
};

const mapStateToProps = (state) => {
  if (!state.users || !state.blogs)
    return []
  console.log('Users ', state.users);
  const userBlogs = {};
  for (const user of state.users)
    userBlogs[user.id] = { ...user, blogCount: 0 };
  for (const blog of state.blogs) {
    if (userBlogs[blog.user.id])
      userBlogs[blog.user.id].blogCount++
  }
  return { users: Object.values(userBlogs) }
}

const ConnectedUserList = connect(mapStateToProps, null)(UserList)
export default ConnectedUserList
