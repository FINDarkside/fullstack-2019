import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, deleteBlog, showDeleteButton }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog)}>Delete</button>
  );

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
      <div onClick={toggleExpanded}>
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

export default Blog;