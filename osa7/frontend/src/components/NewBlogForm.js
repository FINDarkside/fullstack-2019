import React from 'react';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';
import { connect } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';

const NewBlogForm = ({ createBlog, createNotification }) => {
  const { setValue: setTitle, ...titleField } = useField('text');
  const { setValue: setAuthor, ...authorField } = useField('text');
  const { setValue: setUrl, ...urlField } = useField('text');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setTitle('');
      setAuthor('');
      setUrl('');
      const blog = { title: titleField.value, author: authorField.value, url: urlField.value };
      await createBlog(blog);
      createNotification(`A new blog "${titleField.value}" by ${authorField.value} created`, 'info');
    } catch (exception) {
      if (exception.response && exception.response.data.error)
        createNotification(exception.response.data.error, 'error');
      else
        createNotification('Creating blog failed', 'error');
    }
  };

  return (
    <div>
      <h2 className="title">Create new</h2>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" placeholder="Title" {...titleField} />
          </div>
        </div>
        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <input className="input" placeholder="Author" {...authorField} />
          </div>
        </div>
        <div className="field">
          <label className="label">Url</label>
          <div className="control">
            <input className="input" placeholder="Url" {...urlField} />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const ConnectedNewBlogForm = connect(null, { createBlog, createNotification })(NewBlogForm);
export default ConnectedNewBlogForm;
