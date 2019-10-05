import React from 'react';
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

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
      await createBlog(blog)
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
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" placeholder="Title" {...titleField} />
          </div>
        </div>
        <div class="field">
          <label class="label">Author</label>
          <div class="control">
            <input class="input" placeholder="Author" {...authorField} />
          </div>
        </div>
        <div class="field">
          <label class="label">Url</label>
          <div class="control">
            <input class="input" placeholder="Url" {...urlField} />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
};

const ConnectedNewBlogForm = connect(null, { createBlog, createNotification })(NewBlogForm)
export default ConnectedNewBlogForm
