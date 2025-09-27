'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';

const words = [
	'स्वागत हे',
	'Hello',
	'Bonjour',
	'Ciao',
	'Olà',
	'やあ',
	'Hallå',
	'Guten tag',
	'Hallo',
];

export default function Index() {
	const [index, setIndex] = useState(0);
	const [dimension, setDimension] = useState({ width: 0, height: 0 });

	// Handle window resize
	useEffect(() => {
		function updateSize() {
			setDimension({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	// Cycle through words
	useEffect(() => {
		if (index >= words.length - 1) return;
		const delay = index === 0 ? 1000 : 150;
		const timeoutId = setTimeout(() => {
			setIndex((prev) => prev + 1);
		}, delay);
		return () => clearTimeout(timeoutId);
	}, [index]);

	const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height + 300} 0 ${
		dimension.height
	}  L0 0`;
	const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

	const curve = {
		initial: {
			d: initialPath,
			transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
		},
		animate: {
			d: targetPath,
			transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
		},
	};

	return (
		<motion.div
			variants={slideUp}
			initial="initial"
			animate="enter"
			exit="exit"
			className={styles.introduction}
		>
			{dimension.width > 0 && (
				<>
					<motion.p
						variants={opacity}
						initial="initial"
						animate="enter"
					>
						<span></span>
						{words[index]}
					</motion.p>
					<svg
						
					>
						<motion.path
							variants={curve}
							initial="initial"
							animate="animate"
						/>
					</svg>
				</>
			)}
		</motion.div>
	);
}
