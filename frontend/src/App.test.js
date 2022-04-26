import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Product from './components/Product/Product';
import ShopCreate from './components/Shop/ShopCreate';
import {unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {BrowserRouter, Route} from 'react-router-dom';
import * as PropTypes from 'prop-types';
import {Navbar} from './components/Navbar/Navbar';
import {Footer} from './components/Footer/Footer';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function Routes(props) {
  return null;
}

Routes.propTypes = {children: PropTypes.node};


describe('Landing Page', () => {
  const initialState = {  };
  const mockStore = configureStore();
  let store;

  it('App -Shows Register Login when user hasnt logged in yet', () => {
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




test('Nav Bar - finds nav items on login', () => {
  const initialState = { 'login': 'Bearer bahblah' };
  const mockStore = configureStore();
  let store;

  act(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      </Provider>
      , container);
  });
  // console.log(screen)
  expect(screen.getByText('Favorites'))
  expect(screen.getByText('Cart'))
  expect(screen.getByText('Purchase'))
  expect(screen.getByText('Logout'))
});


test('Footer - finds nav items on login', () => {
  const initialState = { 'login': 'Bearer bahblah' };
  const mockStore = configureStore();
  let store;

  act(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>
      , container);
  });
  // console.log(screen)
  expect(screen.getByText('Country:'))
  expect(screen.getByText('USD'))
});
