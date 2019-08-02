import React from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';
import { useField } from '../hooks'

const NewBlogForm = ({ blogCreated, createNotification }) => {
  const { setValue: setTitle, ...titleField } = useField('text');
  const { setValue: setAuthor, ...authorField } = useField('text');
  const { setValue: setUrl, ...urlField } = useField('text');

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      setTitle('');
      setAuthor('');
      setUrl('');
      const blog = { title: titleField.value, author: authorField.value, url: urlField.value };
      const newBlog = await blogService.create(blog);
      console.log(newBlog);
      blogCreated(newBlog);
      createNotification(`A new blog "${titleField.value}" by ${authorField.value} created`, true);
    } catch (exception) {
      if (exception.response && exception.response.data.error)
        createNotification(exception.response.data.error, false);
      else
        createNotification('Creating blog failed', false);
    }
  };


  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          Title
          <input name="title" {...titleField} />
        </div>
        <div>
          Author
          <input name="author" {...authorField} />
        </div>
        <div>
          Url
          <input name="url" {...urlField} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  blogCreated: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
};

export default NewBlogForm;