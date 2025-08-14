import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingGuide from './OnboardingGuide';

test('shows and dismisses onboarding', () => {
  render(<OnboardingGuide />);
  expect(screen.getByText(/Welcome to N.E.X.U.S./i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Get Started/i));
  expect(screen.queryByText(/Welcome to N.E.X.U.S./i)).toBeNull();
});


