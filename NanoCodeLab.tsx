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
	const [code, setCode] = useState('');
	const [output, setOutput] = useState('');

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
			<textarea rows={6} cols={60} value={code} onChange={e => setCode(e.target.value)} placeholder="Enter nanobot code..." />
			<br />
			<button onClick={handleRun} disabled={!canExecute}>Run Code</button>
			<div style={{ marginTop: 10 }}><b>Output:</b> <pre>{output}</pre></div>
			<div style={{ marginTop: 20, color: 'gray' }}>
				{/* TODO: Integrate real JWT/OAuth, role management, and secure sandboxing */}
			</div>
		</div>
	);
}
