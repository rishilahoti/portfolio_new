import './globals.css';
import Header from '../components/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Lexend } from 'next/font/google';
import { ResumeModalProvider } from '../common/ResumeModal';

// Optimize font loading
const lexend = Lexend({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-lexend',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const siteUrl = 'https://rishilahoti.vercel.app';

export const metadata = {
	metadataBase: new URL(siteUrl),
	title: 'Rishi Lahoti - Software Engineer, Full Stack & AI Systems',
	description: 'Portfolio of Rishi Lahoti, a Software Engineer specializing in full-stack and AI systems: Next.js, Go, multi-agent pipelines, and cloud infrastructure.',
	keywords: ['Rishi Lahoti', 'Software Engineer', 'AI Engineer', 'Full Stack Developer', 'Next.js', 'Go', 'React', 'Portfolio'],
	authors: [{ name: 'Rishi Lahoti' }],
	alternates: {
		canonical: '/',
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: 'Rishi Lahoti - Software Engineer, Full Stack & AI Systems',
		description: 'Portfolio of Rishi Lahoti, a Software Engineer specializing in full-stack and AI systems.',
		url: siteUrl,
		siteName: 'Rishi Lahoti',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Rishi Lahoti - Software Engineer, Full Stack & AI Systems',
		description: 'Portfolio of Rishi Lahoti, a Software Engineer specializing in full-stack and AI systems.',
	},
};

const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Rishi Lahoti',
	url: siteUrl,
	jobTitle: 'Software Engineer - Full Stack & AI Systems',
	sameAs: [
		'https://github.com/rishilahoti',
		'https://www.linkedin.com/in/rishilahoti/',
		'https://twitter.com/rishii_lahoti',
	],
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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
			</head>
			<body>
				<ResumeModalProvider>
					<Header />
					<SpeedInsights />
					<Analytics />
					{children}
				</ResumeModalProvider>
			</body>
		</html>
	);
}
