import React from 'react';

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: 'red', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please reload or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}