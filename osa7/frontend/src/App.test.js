import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

beforeEach(() => {
  localStorage.setItem('currentUser', 'null');
});

describe('App', () => {

  test('does not renders only login form when not logged in', async () => {
    const component = render(<App />);
    await waitForElement(() => component.container.querySelector('form'));
    expect(component.container).toHaveTextContent('Login to application');
    expect(component.container.querySelector('.blog')).toBe(null);
  });

  test('renders blogs when logged in', async () => {
    localStorage.setItem('currentUser', JSON.stringify({ id: 'fffff', name: 'Jesse' }));
    const component = render(<App />);
    await waitForElement(() => component.container.querySelectorAll('.blog'));
    expect(component.container.querySelector('.blog')).toBeTruthy();
  });

});
