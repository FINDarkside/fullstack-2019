import React from 'react';
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

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
      <form onSubmit={onSubmit}>
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

const ConnectedNewBlogForm = connect(null, { createBlog })(NewBlogForm)
export default ConnectedNewBlogForm
