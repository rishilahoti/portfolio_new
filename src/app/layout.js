import './globals.css';
import Header from '../components/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Lexend } from 'next/font/google';

// Optimize font loading
const lexend = Lexend({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-lexend',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
	title: 'Rishi Lahoti - Software Developer',
	description: 'Portfolio of Rishi Lahoti - Software Developer specializing in modern web development with Next.js, React, and cutting-edge technologies.',
	keywords: ['Rishi Lahoti', 'Software Developer', 'Web Developer', 'Next.js', 'React', 'Portfolio'],
	authors: [{ name: 'Rishi Lahoti' }],
	openGraph: {
		title: 'Rishi Lahoti - Software Developer',
		description: 'Portfolio of Rishi Lahoti - Software Developer',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Rishi Lahoti - Software Developer',
		description: 'Portfolio of Rishi Lahoti - Software Developer',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={lexend.variable}>
			<head>
				<meta
					name="google-site-verification"
					content="StKnFVMdxYtC2pDJPSr7oQjfKmXrAl1UXRLLkokFj8o"
				/>
				<meta
					name="google-site-verification"
					content="P2_1zWxkE0R-QmgUGw4dGpmHqVlIO0X-SaoFDdH-ciM"
				/>
			</head>
			<body>
				<Header />
				<SpeedInsights />
				<Analytics />
				{children}
			</body>
		</html>
	);
}
