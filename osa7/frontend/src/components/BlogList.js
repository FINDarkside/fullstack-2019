import React from 'react';
import { connect } from 'react-redux';
import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {

  const blogFormToggleRef = React.createRef();

  return (
    <div>
      <div>
        <h1 className="title">Blogs</h1>
        <Togglable buttonLabel="Create blog" ref={blogFormToggleRef}>
          <NewBlogForm />
        </Togglable>
        {
          blogs.map(blog => (
            <div key={blog.id}>
              <Link to={'/blogs/' + blog.id}>{blog.title + ' ' + blog.author}</Link>
            </div>
          ))
        }
      </div>
    </div>

  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.sort((a, b) => b.likes - a.likes),
});

const ConnectedBlogList = connect(mapStateToProps, null)(BlogList);
export default ConnectedBlogList;
