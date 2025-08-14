import React, { useEffect, useState } from 'react';

type NeuroData = {
  timestamp: number;
  signal: number; // Simulated neural signal strength
  biometric?: {
    heartRate: number;
    oxygen: number;
  };
};

export default function NeuroSync({ onEvent }: { onEvent?: (event: string) => void }) {
  const [data, setData] = useState<NeuroData[]>([]);
  const [streaming, setStreaming] = useState(false);

  // Simulate data stream
  useEffect(() => {
    if (!streaming) return;
    const interval = setInterval(() => {
      const newData: NeuroData = {
        timestamp: Date.now(),
        signal: Math.random() * 100,
        biometric: {
          heartRate: Math.floor(60 + Math.random() * 40),
          oxygen: Math.floor(95 + Math.random() * 5),
        },
      };
      setData(d => [...d.slice(-49), newData]);
      if (onEvent) onEvent(`NeuroSync: signal=${newData.signal.toFixed(1)}, HR=${newData.biometric?.heartRate ?? '--'}, O2=${newData.biometric?.oxygen ?? '--'}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [streaming, onEvent]);

  return (
    <section style={{ padding: 24, background: '#181f2a', color: '#cce6ff', borderRadius: 12, marginBottom: 24 }}>
      <h2>NeuroSync</h2>
      <button onClick={() => setStreaming(s => !s)} style={{ marginBottom: 12 }}>
        {streaming ? 'Stop Stream' : 'Start Stream'}
      </button>
      <div>
        <strong>Latest Signal:</strong> {data.length ? data[data.length - 1].signal.toFixed(1) : '--'}
        <br />
        <strong>Heart Rate:</strong> {data.length ? data[data.length - 1].biometric?.heartRate : '--'} bpm
        <br />
        <strong>Oxygen:</strong> {data.length ? data[data.length - 1].biometric?.oxygen : '--'}%
      </div>
      <div style={{ marginTop: 16, maxHeight: 120, overflowY: 'auto', fontSize: 13, background: '#222b38', borderRadius: 8, padding: 8 }}>
        {data.slice(-10).map(d => (
          <div key={d.timestamp}>
            [{new Date(d.timestamp).toLocaleTimeString()}] Signal: {d.signal.toFixed(1)}, HR: {d.biometric?.heartRate}, O2: {d.biometric?.oxygen}
          </div>
        ))}
      </div>
    </section>
  );
}

// Inside your main dashboard JSX (e.g., inside <ErrorBoundary> ... </ErrorBoundary>)
// <NeuroSync onEvent={msg => setLog(l => [msg, ...l])} />
