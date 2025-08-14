import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SwarmMap3D } from './App';

test('renders SwarmMap3D with selected zone', () => {
  render(<SwarmMap3D selectedZone="motor_cortex" color="#2196f3" />);
  expect(screen.getByText(/Swarm Map 3D/i)).toBeInTheDocument();
  expect(screen.getByText(/Selected Zone:/i)).toBeInTheDocument();
  expect(screen.getByText(/motor_cortex/i)).toBeInTheDocument();
});