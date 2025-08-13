import React from 'react';

export default function SettingsPanel({ settings, setSettings }: {
  settings: { color: string; fontSize: number; highContrast: boolean },
  setSettings: (s: any) => void
}) {
  return (
    <div style={{
      position: 'absolute', top: 10, right: 10, zIndex: 10, background: '#222a', padding: 14, borderRadius: 10
    }}>
      <label>
        Color Scheme:&nbsp;
        <select
          value={settings.color}
          onChange={e => setSettings((s: any) => ({ ...s, color: e.target.value }))}
          aria-label="Color scheme"
        >
          <option value="#2196f3">Blue</option>
          <option value="#8ecae6">Cyan</option>
          <option value="#f55">Red</option>
        </select>
      </label>
      <br />
      <label>
        Font Size:&nbsp;
        <input
          type="range"
          min={12}
          max={24}
          value={settings.fontSize}
          onChange={e => setSettings((s: any) => ({ ...s, fontSize: Number(e.target.value) }))}
          aria-label="Font size"
        />
        {settings.fontSize}px
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={settings.highContrast}
          onChange={e => setSettings((s: any) => ({ ...s, highContrast: e.target.checked }))}
          aria-label="High contrast mode"
        />
        High Contrast
      </label>
    </div>
  );
}