import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, likeBlog, deleteBlog, showDeleteButton }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog)}>Delete</button>
  );

  const likeClicked = async () => {
    try {
      await blogService.like(blog);
      const newBlogs = [...blogs];
      newBlogs[blogs.findIndex((b) => b.id === blog.id)].likes++;
      setBlogs(newBlogs);
      createNotification('Blog liked', true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error)
        createNotification(err.response.data.error, false);
      else
        createNotification('Liking blog failed', false);
    }
  }

  const expandedData = () => (
    <div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={() => likeBlog(blog)}>like</button>
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
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
};

const ConnectedBlog = connect(null, { likeBlog, deleteBlog })(Blog)
export default ConnectedBlog
