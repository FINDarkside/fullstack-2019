import React from 'react';
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer';
import { createNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import { useField } from '../hooks';

const Blog = ({ blog, likeBlog, deleteBlog, createNotification, currentUser, addComment }) => {
  const { setValue: setComment, ...commentField } = useField('text');

  if (!blog)
    return null;

  const deleteButton = () => (
    <button onClick={deleteClicked}>Delete</button>
  );

  const handleError = (err, fallbackMessage) => {
    console.error(err, fallbackMessage);
    if (err.response && err.response.data.error)
      createNotification(err.response.data.error, 'error');
    else
      createNotification(fallbackMessage, 'error');
  };

  const likeClicked = async () => {
    try {
      await likeBlog(blog);
      createNotification('Blog liked', 'info');
    } catch (err) {
      handleError(err, 'liking blog failed');
    }
  };

  const deleteClicked = async () => {
    try {
      if (!window.confirm(`Delete blog "${blog.name}" by ${blog.author}?`))
        return;
      await deleteBlog(blog);
      createNotification('Blog deleted', 'info');
    } catch (err) {
      handleError(err, 'deleting blog failed');
    }
  };

  const onAddComment = async (event) => {
    event.preventDefault();
    try {
      await addComment(blog, commentField.value);
      setComment('');
      createNotification('Comment created', 'info');
    } catch (err) {
      handleError(err, 'Creating comment failed');
    }
  };

  const showDeleteButton = currentUser && currentUser.id === blog.user.id;

  return (
    <div>
      <h1 className="title">{blog.title} {blog.author}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={likeClicked}>like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      {showDeleteButton && deleteButton()}
      <h2>Comments</h2>
      <form onSubmit={onAddComment}>
        <input name="author" {...commentField} />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {
          blog.comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))
        }
      </ul>

    </div >
  );

};

const ConnectedBlog = connect((state) => ({ currentUser: state.currentUser }), { likeBlog, deleteBlog, createNotification, addComment })(Blog);
export default ConnectedBlog;
