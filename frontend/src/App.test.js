import { render, screen } from '@testing-library/react';
import App from './App';
import Product from './components/Product/Product';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Etsy Part 2/i);
  expect(linkElement).toBeInTheDocument();
});
