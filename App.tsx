import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnboardingGuide from './OnboardingGuide';
import SettingsPanel from './SettingsPanel';
import NotFound from './NotFound';
import { ErrorBoundary } from './ErrorBoundary';
import Login from './Login';
import NeuroChart from './NeuroChart';
import ImagingPanel from './ImagingPanel';
import NanoCodeLab from './NanoCodeLab';
import GridLayout from 'react-grid-layout';

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

  // Example chart appearance controls
  const [chartColor, setChartColor] = React.useState('#2196f3');
  const [showHeartRate, setShowHeartRate] = React.useState(true);
  const [showOxygen, setShowOxygen] = React.useState(true);

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

  // Layout for react-grid-layout
  const layout = [
    { i: 'imaging', x: 0, y: 0, w: 1, h: 2 },
    { i: 'nano', x: 1, y: 0, w: 1, h: 2 },
    { i: 'neuro', x: 0, y: 2, w: 2, h: 2 },
    { i: 'swarm', x: 2, y: 0, w: 1, h: 2 },
    { i: 'chart', x: 2, y: 2, w: 1, h: 2 },
    { i: 'voice', x: 0, y: 4, w: 3, h: 1 },
  ];

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
              <GridLayout className="layout" layout={layout} cols={3} rowHeight={140} width={1200}>
                <div key="imaging"><ImagingPanel /></div>
                <div key="nano"><NanoCodeLab /></div>
                <div key="neuro"><NeuroSync onEvent={msg => setLog(l => [msg, ...l])} onData={d => setNeuroData(d)} /></div>
                <div key="swarm"><SwarmMap3D selectedZone={zone} color={settings.color} /></div>
                <div key="chart">
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Chart Color:
                      <input type="color" value={chartColor} onChange={e => setChartColor(e.target.value)} style={{ marginLeft: 8 }} />
                    </label>
                    <label style={{ marginLeft: 16 }}>
                      <input type="checkbox" checked={showHeartRate} onChange={e => setShowHeartRate(e.target.checked)} />
                      Show Heart Rate
                    </label>
                    <label style={{ marginLeft: 16 }}>
                      <input type="checkbox" checked={showOxygen} onChange={e => setShowOxygen(e.target.checked)} />
                      Show Oxygen
                    </label>
                  </div>
                  <NeuroChart
                    data={neuroData}
                    chartColor={chartColor}
                    showHeartRate={showHeartRate}
                    showOxygen={showOxygen}
                  />
                </div>
                <div key="voice"><VoicePilot onCommand={handleCommand} /></div>
              </GridLayout>
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