import React, { useRef, useState } from 'react';

export default function ImagingPanel() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) throw new Error('No file selected');
      const reader = new FileReader();
      reader.onload = ev => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to load image.');
    }
  };

  return (
    <section style={{ padding: 24, background: '#181f2a', color: '#cce6ff', borderRadius: 12, marginBottom: 24 }}>
      <h2>Imaging Panel</h2>
      <p>Upload and view medical or neural imaging data (e.g., MRI, CT, EEG).</p>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUpload}
        style={{ marginBottom: 16 }}
        aria-label="Upload medical or neural image"
      />
      <button aria-label="View next image" tabIndex={0}>Next</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {image && (
        <div style={{ marginTop: 16 }}>
          <img
            src={image}
            alt="Medical or neural imaging"
            style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          />
        </div>
      )}
    </section>
  );
}