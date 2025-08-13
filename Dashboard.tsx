// Dashboard.tsx - Component for N.E.X.U.S.

import React from 'react';

// TODO: Replace with actual logo file path
const LOGO_URL = './A_logo_design_for_N.E.X.U.S._(Nanobot-Enabled_eXpe.png';

export default function Dashboard({ children }) {
	return (
		<div style={{ position: 'relative', minHeight: '100vh' }}>
			{/* Logo watermark in corner */}
			<img
				src={LOGO_URL}
				alt="N.E.X.U.S. Logo"
				style={{
					position: 'absolute',
					bottom: 20,
					right: 20,
					width: 120,
					opacity: 0.15,
					pointerEvents: 'none',
					zIndex: 1000
				}}
			/>
			{/* Main dashboard content */}
			<div>{children}</div>
		</div>
	);
}
