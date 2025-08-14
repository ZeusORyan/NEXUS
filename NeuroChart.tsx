import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function NeuroChart({ data }: { data: any[] }) {
  return (
    <div style={{ marginTop: 24 }}>
      <h3>Neuro Data Chart</h3>
      <LineChart width={350} height={200} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={t => new Date(t).toLocaleTimeString()}
          minTickGap={20}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="signal" stroke="#2196f3" name="Neural Signal" dot={false} />
        <Line type="monotone" dataKey="biometric.heartRate" stroke="#e63946" name="Heart Rate" dot={false} />
        <Line type="monotone" dataKey="biometric.oxygen" stroke="#8ecae6" name="Oxygen" dot={false} />
      </LineChart>
    </div>
  );
}