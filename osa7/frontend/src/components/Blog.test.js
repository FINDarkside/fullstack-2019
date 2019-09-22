import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  author: 'Very long author',
  title: 'This is blog title',
  likes: 293710586,
  url: 'google.com',
  user: { id: 'asd', name: 'Minäpä Tässä' }
};

test('renders only name and author by default', () => {
  const f = () => null;
  const component = render(<Blog blog={blog} {...{ likeBlog: f, deleteBlog: f, showDeleteButton: false }} />);
  expect(component.container).toHaveTextContent(blog.author);
  expect(component.container).toHaveTextContent(blog.title);
  expect(component.container).not.toHaveTextContent(blog.likes);
});

test('renders likes and user name after clicking blog', () => {
  const f = () => null;
  const component = render(<Blog blog={blog} {...{ likeBlog: f, deleteBlog: f, showDeleteButton: false }} />);
  fireEvent.click((component.container.querySelector('.blogTitle')));
  expect(component.container).toHaveTextContent(blog.author);
  expect(component.container).toHaveTextContent(blog.title);
  expect(component.container).toHaveTextContent(blog.likes);
  expect(component.container).toHaveTextContent(blog.user.name);
});

