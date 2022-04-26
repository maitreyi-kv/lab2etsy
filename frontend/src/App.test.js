import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Etsy Part 2/i);
  expect(linkElement).toBeInTheDocument();


});

describe('Landing Page', () => {
  const initialState = {  };
  const mockStore = configureStore();
  let store;

  it('Shows Register Login when user hasnt logged in yet', () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Etsy')).not.toBeNull();
    expect(getByText('Register')).not.toBeNull();
    expect(getByText('Login')).not.toBeNull();
  });
});
