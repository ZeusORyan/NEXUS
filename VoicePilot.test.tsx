import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { VoicePilot } from './App';

test('renders VoicePilot and submits command', () => {
  const mockOnCommand = jest.fn();
  render(<VoicePilot onCommand={mockOnCommand} />);
  expect(screen.getByText(/Voice Pilot/i)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/Type command/i);
  fireEvent.change(input, { target: { value: 'deploy' } });
  fireEvent.submit(screen.getByRole('form'));
  expect(mockOnCommand).toHaveBeenCalledWith('deploy');
});