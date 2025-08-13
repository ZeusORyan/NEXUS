import React, { useState } from 'react';
import VoicePilot from './VoicePilot';
import OnboardingGuide from './OnboardingGuide';
import SettingsPanel from './SettingsPanel';

export default function App() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.7)', color: '#fff', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#222b38', padding: 32, borderRadius: 16, maxWidth: 420, textAlign: 'center', boxShadow: '0 4px 32px #000'
      }}>
        <h2>Welcome to N.E.X.U.S.</h2>
        <ul style={{ textAlign: 'left', margin: '18px 0 24px 0' }}>
          <li>Use <b>VoicePilot</b> or the buttons to control the swarm.</li>
          <li>Switch neural zones to see different effects.</li>
          <li>Check the event log for recent actions.</li>
          <li>Adjust settings for accessibility and appearance.</li>
        </ul>
        <button onClick={() => setOpen(false)} style={{ padding: '8px 24px', borderRadius: 8, background: '#2196f3', color: '#fff', border: 'none' }}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export function SwarmMap3D() {
  // TODO: Implement SwarmMap3D or leave as placeholder
  return null;
}

export function SwarmMap3DPlaceholder() {
  return null; // Placeholder for the SwarmMap3D component
}