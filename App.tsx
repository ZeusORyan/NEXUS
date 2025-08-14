import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnboardingGuide from './OnboardingGuide';
import SettingsPanel from './SettingsPanel';
import NotFound from './NotFound';
import { ErrorBoundary } from './ErrorBoundary';
import Login from './Login';
import NeuroChart from './NeuroChart';

export default function App() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [zone, setZone] = useState('motor_cortex');
  const [log, setLog] = useState<string[]>([]);
  const [settings, setSettings] = useState({
    color: '#2196f3',
    fontSize: 16,
    highContrast: false,
  });
  const [neuroData, setNeuroData] = useState<any[]>([]);

  const handleCommand = useCallback((cmd: string) => {
    if (cmd.includes('deploy')) {
      setZone('motor_cortex');
      setLog(l => [`[${new Date().toLocaleTimeString()}] Voice: Deploy`, ...l]);
    } else if (cmd.includes('move')) {
      setZone('immune_system');
      setLog(l => [`[${new Date().toLocaleTimeString()}] Voice: Move`, ...l]);
    } else if (cmd.includes('monitor')) {
      setZone('visual_cortex');
      setLog(l => [`[${new Date().toLocaleTimeString()}] Voice: Monitor`, ...l]);
    } else if (cmd.includes('standby')) {
      setZone('prefrontal_cortex');
      setLog(l => [`[${new Date().toLocaleTimeString()}] Voice: Standby`, ...l]);
    } else {
      setLog(l => [`[${new Date().toLocaleTimeString()}] Voice: ${cmd}`, ...l]);
    }
  }, []);

  // Show login screen if not authenticated
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <OnboardingGuide />
      <SettingsPanel settings={settings} setSettings={setSettings} />
      <Routes>
        <Route path="/" element={
          <ErrorBoundary>
            <div
              className="main-layout"
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 32,
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                maxWidth: '100vw',
                fontSize: settings.fontSize,
                background: settings.highContrast ? '#000' : '#181f2a',
                color: settings.highContrast ? '#fff' : '#cce6ff',
                minHeight: '100vh',
              }}
            >
              <div style={{ flex: 1, minWidth: 320 }}>
                {/* NeuroSync streams data and updates event log and chart */}
                <NeuroSync
                  onEvent={msg => setLog(l => [msg, ...l])}
                  onData={d => setNeuroData(d)}
                />
                <SwarmMap3D selectedZone={zone} color={settings.color} />
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => { setZone('motor_cortex'); setLog(l => [`[${new Date().toLocaleTimeString()}] UI: Deploy`, ...l]); }}>
                    Deploy Swarm
                  </button>
                  <button onClick={() => { setZone('immune_system'); setLog(l => [`[${new Date().toLocaleTimeString()}] UI: Move`, ...l]); }} style={{ marginLeft: 8 }}>
                    Move Swarm
                  </button>
                  <button onClick={() => { setZone('visual_cortex'); setLog(l => [`[${new Date().toLocaleTimeString()}] UI: Monitor`, ...l]); }} style={{ marginLeft: 8 }}>
                    Monitor
                  </button>
                  <button onClick={() => { setZone('prefrontal_cortex'); setLog(l => [`[${new Date().toLocaleTimeString()}] UI: Standby`, ...l]); }} style={{ marginLeft: 8 }}>
                    Standby
                  </button>
                </div>
              </div>
              <div style={{ minWidth: 350, maxWidth: 400, flex: 1 }}>
                <VoicePilot onCommand={handleCommand} />
                <h3 style={{ marginTop: 32 }}>Event Log</h3>
                <ul style={{
                  maxHeight: 300,
                  overflowY: 'auto',
                  background: settings.highContrast ? '#111' : '#222b38',
                  color: settings.highContrast ? '#fff' : '#cce6ff',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                }}>
                  {log.map((entry, i) => <li key={i} style={{ fontSize: 14 }}>{entry}</li>)}
                </ul>
                {/* NeuroChart visualizes the streamed data */}
                <NeuroChart data={neuroData} />
              </div>
              <style>
                {`
                  @media (max-width: 800px) {
                    .main-layout {
                      flex-direction: column !important;
                      gap: 16px !important;
                      align-items: stretch !important;
                    }
                  }
                `}
              </style>
            </div>
          </ErrorBoundary>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

interface VoicePilotProps {
  onCommand: (cmd: string) => void;
}

export function VoicePilot({ onCommand }: VoicePilotProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Voice Pilot</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type command..."
          style={{
            padding: 8,
            borderRadius: 4,
            border: '1px solid #888',
            width: '70%',
            marginRight: 8,
            fontSize: 16,
          }}
        />
        <button type="submit" style={{ padding: '8px 16px', fontSize: 16 }}>
          Send
        </button>
      </form>
    </div>
  );
}

// SwarmMap3D component implementation
interface SwarmMap3DProps {
  selectedZone: string;
  color: string;
}

export function SwarmMap3D({ selectedZone, color }: SwarmMap3DProps) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [selectedZone]);

  if (loading) return <div>Loading...</div>;
  return (
    <div style={{
      background: color,
      borderRadius: 12,
      padding: 24,
      marginBottom: 16,
      minHeight: 200,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <h2>Swarm Map 3D</h2>
      <p>Selected Zone: <strong>{selectedZone}</strong></p>
      {/* Add 3D visualization or placeholder here */}
    </div>
  );
}

interface NeuroSyncProps {
  onEvent?: (event: string) => void;
  onData?: (d: any) => void;
}

const NeuroSync: React.FC<NeuroSyncProps> = ({ onEvent, onData }) => {
  // Simulate streaming data and events
  React.useEffect(() => {
    if (onEvent) {
      onEvent(`[${new Date().toLocaleTimeString()}] NeuroSync: Connected`);
    }
    if (onData) {
      onData([
        { zone: 'motor_cortex', value: Math.random() * 100 },
        { zone: 'immune_system', value: Math.random() * 100 },
        { zone: 'visual_cortex', value: Math.random() * 100 },
        { zone: 'prefrontal_cortex', value: Math.random() * 100 },
      ]);
    }
    // You can add more streaming logic here
  }, [onEvent, onData]);

  return (
    <div style={{ marginBottom: 16 }}>
      <span style={{ fontSize: 14, color: '#888' }}>NeuroSync active</span>
    </div>
  );
};