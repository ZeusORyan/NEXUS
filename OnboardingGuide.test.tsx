// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};

// src/setupTests.js
import '@testing-library/jest-dom';

// src/OnboardingGuide.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingGuide from './OnboardingGuide';

test('shows and dismisses onboarding', () => {
  render(<OnboardingGuide />);
  expect(screen.getByText(/Welcome to N.E.X.U.S./i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Get Started/i));
  expect(screen.queryByText(/Welcome to N.E.X.U.S./i)).toBeNull();
});


