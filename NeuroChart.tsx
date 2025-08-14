import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#222b38', color: '#cce6ff', padding: 8, borderRadius: 8 }}>
        <strong>{new Date(label).toLocaleTimeString()}</strong>
        <br />
        Signal: {payload[0].value}
        <br />
        Heart Rate: {payload[1].value} bpm
        <br />
        Oxygen: {payload[2].value}%
      </div>
    );
  }
  return null;
};

// Helper to convert data to CSV
function toCSV(data: any[]) {
  const header = ['timestamp', 'signal', 'heartRate', 'oxygen'];
  const rows = data.map(d =>
    [
      new Date(d.timestamp).toLocaleString(),
      d.signal,
      d.biometric?.heartRate ?? '',
      d.biometric?.oxygen ?? ''
    ].join(',')
  );
  return [header.join(','), ...rows].join('\n');
}

export default function NeuroChart({ data }: { data: any[] }) {
  const handleDownload = () => {
    const csv = toCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neuro_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!data || data.length === 0) {
    return (
      <div style={{ marginTop: 24, color: '#888', textAlign: 'center' }}>
        <h3>Neuro Data Chart</h3>
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Neuro Data Chart</h3>
      <button
        onClick={handleDownload}
        style={{ marginBottom: 8 }}
        aria-label="Export neuro data as CSV"
      >
        Export CSV
      </button>
      <div aria-label="Neuro Data Line Chart" role="region">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid stroke="#444" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={t => new Date(t).toLocaleTimeString()}
              minTickGap={20}
            >
              <Label value="Time" position="insideBottom" offset={-5} />
            </XAxis>
            <YAxis>
              <Label value="Value" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="signal" stroke="#2196f3" name="Neural Signal" dot={false} />
            <Line type="monotone" dataKey="biometric.heartRate" stroke="#e63946" name="Heart Rate" dot={false} />
            <Line type="monotone" dataKey="biometric.oxygen" stroke="#8ecae6" name="Oxygen" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}