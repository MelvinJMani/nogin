import { render, screen } from '@testing-library/react';
import App from './App';

test('renders nogin title', () => {
  render(<App />);
  expect(screen.getByText(/nogin/i)).toBeInTheDocument();
});
