// VoicePilot.tsx - Component stub for N.E.X.U.S.
import React, { useState, useRef } from 'react';

// Check for browser support
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export default function VoicePilot() {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleStart = () => {
    if (!SpeechRecognition) {
      setTranscript('Voice recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = (event: any) => {
      setTranscript('Error: ' + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setTranscript('Listening...');
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
    setTranscript('');
  };

  return (
    <section
      aria-label="VoicePilot voice control"
      style={{
        padding: 24,
        background: '#181f2a',
        color: '#cce6ff',
        borderRadius: 12,
        maxWidth: 400,
        outline: 'none'
      }}
      tabIndex={-1}
    >
      <h2 style={{ marginTop: 0 }}>VoicePilot</h2>
      <p>
        Control N.E.X.U.S. with your voice.<br />
        <span style={{ fontSize: '0.95em', color: '#8ecae6' }}>
          (Try saying a command!)
        </span>
      </p>
      <nav aria-label="VoicePilot controls" style={{ margin: '16px 0' }}>
        <button
          onClick={handleStart}
          disabled={listening}
          aria-label="Start voice recognition"
          style={{
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            marginRight: 8,
            cursor: listening ? 'not-allowed' : 'pointer',
            outline: 'none',
            boxShadow: listening ? '0 0 0 2px #2196f3' : undefined
          }}
          tabIndex={0}
          onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px #8ecae6')}
          onBlur={e => (e.currentTarget.style.boxShadow = listening ? '0 0 0 2px #2196f3' : 'none')}
        >
          Start Listening
        </button>
        <button
          onClick={handleStop}
          disabled={!listening}
          aria-label="Stop voice recognition"
          style={{
            background: '#555',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            cursor: !listening ? 'not-allowed' : 'pointer',
            outline: 'none',
            boxShadow: !listening ? '0 0 0 2px #555' : undefined
          }}
          tabIndex={0}
          onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px #8ecae6')}
          onBlur={e => (e.currentTarget.style.boxShadow = !listening ? '0 0 0 2px #555' : 'none')}
        >
          Stop
        </button>
      </nav>
      <div
        aria-live="polite"
        aria-label="Voice transcript"
        style={{
          minHeight: 32,
          background: '#222b38',
          borderRadius: 6,
          padding: 8,
          fontFamily: 'monospace',
          fontSize: 15,
          outline: 'none'
        }}
        tabIndex={0}
      >
        {transcript}
      </div>
      <img
        src="/docs/logo.png"
        alt="N.E.X.U.S. Logo"
        style={{
          marginTop: 24,
          width: 80,
          opacity: 0.25,
          display: 'block'
        }}
      />
    </section>
  );
}