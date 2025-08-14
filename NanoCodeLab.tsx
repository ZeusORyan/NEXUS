// NanoCodeLab.tsx - Component for N.E.X.U.S. NanoCodeLab
// Authentication, role-based permissions, and sandboxing scaffold

import React, { useState } from 'react';

// TODO: Replace with real authentication (JWT or OAuth)
const mockUsers = [
	{ username: 'admin', password: 'admin', role: 'admin' },
	{ username: 'user', password: 'user', role: 'user' }
];

function authenticate(username: string, password: string): User | undefined {
	return mockUsers.find(u => u.username === username && u.password === password);
}

type User = { username: string; password: string; role: string };

export default function NanoCodeLab() {
	const [user, setUser] = useState<User | null>(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('// Write nanobot control code here\n');
	const [output, setOutput] = useState('');
	const [error, setError] = useState('');

	// Simple login handler
	const handleLogin = e => {
		e.preventDefault();
		const u = authenticate(username, password);
		if (u) setUser(u);
		else alert('Invalid credentials');
	};

	// Role-based permission check
	const canExecute = user && user.role === 'admin';

	// Sandbox execution (stub)
	const runCodeInSandbox = code => {
		// TODO: Replace with real sandboxed execution (e.g., Web Worker, serverless function)
		if (code.includes('dangerous')) return 'Blocked: Unsafe command.';
		return 'Executed: ' + code;
	};

	const runCode = () => {
		try {
			// Simulate code execution
			setOutput('Nanobot code executed successfully.');
			setError('');
		} catch (err) {
			setError('Code execution failed.');
		}
	};

	const handleRun = () => {
		if (!canExecute) {
			setOutput('Insufficient permissions.');
			return;
		}
		setOutput(runCodeInSandbox(code));
	};

	if (!user) {
		return (
			<form onSubmit={handleLogin} style={{ padding: 20 }}>
				<h2>NanoCodeLab Login</h2>
				<input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
				<input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
				<button type="submit">Login</button>
			</form>
		);
	}

	return (
		<div style={{ padding: 20 }}>
			<h2>Welcome, {user.username} ({user.role})</h2>
			<textarea
				aria-label="Nanobot code editor"
				value={code}
				onChange={e => setCode(e.target.value)}
				rows={8}
				style={{ width: '100%', borderRadius: 8, padding: 8, fontFamily: 'monospace', fontSize: 14, marginBottom: 12 }}
			/>
			<br />
			<button aria-label="Run nanobot code" tabIndex={0} onClick={runCode} style={{ marginBottom: 12 }} disabled={!canExecute}>Run Code</button>
			<div style={{ background: '#222b38', borderRadius: 8, padding: 8, minHeight: 40 }}>
				<strong>Output:</strong> {output}
			</div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<div style={{ marginTop: 20, color: 'gray' }}>
				{/* TODO: Integrate real JWT/OAuth, role management, and secure sandboxing */}
			</div>
		</div>
	);
}
