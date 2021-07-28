import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from './Game';

test('renders Game of Pairs', () => {
  render(<Game />);
  const linkElement = screen.getByText(/Game of Pairs/i);
  expect(linkElement).toBeInTheDocument();
});
