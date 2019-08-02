import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const blog = {
  author: 'Very long author',
  title: 'This is blog title',
  likes: 293710586,
};

test('renders content', () => {
  const component = render(<SimpleBlog blog={blog} />);
  expect(component.container).toHaveTextContent(blog.author);
  expect(component.container).toHaveTextContent(blog.title);
  expect(component.container).toHaveTextContent(blog.likes);
});

test('onClick is called when like button is clicked', () => {
  const stub = jest.fn();
  const component = render(<SimpleBlog blog={blog} onClick={stub} />);
  const button = component.container.querySelector('.likeButton');
  fireEvent.click(button);
  fireEvent.click(button);
  expect(stub.mock.calls.length).toBe(2);
});

