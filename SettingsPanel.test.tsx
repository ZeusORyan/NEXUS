import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPanel from './SettingsPanel';

test('renders SettingsPanel and changes color scheme', () => {
  const settings = { color: '#2196f3', fontSize: 16, highContrast: false };
  const setSettings = jest.fn();
  render(<SettingsPanel settings={settings} setSettings={setSettings} />);
  expect(screen.getByLabelText(/Color scheme/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Color scheme/i), { target: { value: '#f55' } });
  expect(setSettings).toHaveBeenCalled();
});