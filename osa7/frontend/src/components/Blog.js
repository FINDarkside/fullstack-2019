import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Blog = ({ blog, likeBlog, deleteBlog, createNotification, user }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const deleteButton = () => (
    <button onClick={deleteClicked}>Delete</button>
  );

  const likeClicked = async () => {
    try {
      await likeBlog(blog)
      createNotification('Blog liked', 'success');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error)
        createNotification(err.response.data.error, 'error');
      else
        createNotification('Liking blog failed', 'error');
    }
  }

  const deleteClicked = async () => {
    try {
      if (!window.confirm(`Delete blog "${blog.name}" by ${blog.author}?`))
        return;
      await deleteBlog(blog)
      createNotification('Blog deleted', 'success');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error)
        createNotification(err.response.data.error, 'error');
      else
        createNotification('Deleting blog failed', 'error');
    }
  };

  const showDeleteButton = user && user.id === blog.user.id;

  const expandedData = () => (
    <div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={likeClicked}>like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      {showDeleteButton && deleteButton()}
    </div>
  );

  return (
    <div className="blog">
      <div onClick={toggleExpanded} className="blogTitle">
        {blog.title} {blog.author}
      </div>
      {expanded && expandedData()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
};

const ConnectedBlog = connect((state) => ({user: state.user}), { likeBlog, deleteBlog, createNotification })(Blog)
export default ConnectedBlog
