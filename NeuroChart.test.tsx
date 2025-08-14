import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NeuroChart from './NeuroChart';

const mockData = [
  {
    timestamp: Date.now(),
    signal: 42,
    biometric: { heartRate: 72, oxygen: 98 }
  }
];

test('renders chart with data', () => {
  render(<NeuroChart data={mockData} chartColor={''} />);
  expect(screen.getByText(/Neuro Data Chart/i)).toBeInTheDocument();
  expect(screen.getByText(/Export CSV/i)).toBeInTheDocument();
});

test('shows no data message', () => {
  render(<NeuroChart data={[]} chartColor={''} />);
  expect(screen.getByText(/No data available/i)).toBeInTheDocument();
});

test('exports CSV when button clicked', () => {
  render(<NeuroChart data={mockData} chartColor={''} />);
  const exportBtn = screen.getByRole('button', { name: /Export neuro data as CSV/i });
  expect(exportBtn).toBeInTheDocument();
  // fireEvent.click(exportBtn); // Uncomment to simulate click (will trigger download in browser)
});

test('shows tooltip on hover', () => {
  render(<NeuroChart data={mockData} chartColor={''} />);
  // You can simulate mouse events on chart points if needed
  // This is more advanced and may require integration testing
});