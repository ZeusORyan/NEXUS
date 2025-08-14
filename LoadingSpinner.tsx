import React from 'react';

export default function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <div style={{
        width: 48,
        height: 48,
        border: '6px solid #8ecae6',
        borderTop: '6px solid #2196f3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: 'auto'
      }} />
      <style>
        {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
      </style>
      <p>Loading...</p>
    </div>
  );
}

{loading ? <LoadingSpinner aria-label="Loading data" /> : <Component />}