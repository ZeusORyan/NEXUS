import { useState, useEffect } from 'react';

export function usePersistentSettings(defaults: any) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('nexus-settings');
    return saved ? JSON.parse(saved) : defaults;
  });
  useEffect(() => {
    localStorage.setItem('nexus-settings', JSON.stringify(settings));
  }, [settings]);
  return [settings, setSettings] as const;
}