import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rishi Lahoti - Software Engineer, Full Stack & AI Systems';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					padding: '80px',
					background: '#0a0a0a',
					color: '#fff',
					fontFamily: 'sans-serif',
				}}
			>
				<div style={{ fontSize: 72, fontWeight: 700 }}>Rishi Lahoti</div>
				<div style={{ fontSize: 36, color: '#c1ff5d', marginTop: 20 }}>
					Software Engineer — Full Stack &amp; AI Systems
				</div>
			</div>
		),
		{ ...size }
	);
}
