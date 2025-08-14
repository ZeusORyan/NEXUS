import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NeuroSync from './NeuroSync';

test('renders NeuroSync and start/stop button', () => {
  render(<NeuroSync />);
  expect(screen.getByText(/NeuroSync/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveTextContent(/Start Stream/i);
});