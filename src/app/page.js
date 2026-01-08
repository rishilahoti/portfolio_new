'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './page.module.scss';
import { AnimatePresence } from 'framer-motion';
import { useScroll } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import Contact from '../components/Contact';
import Lenis from '@studio-freight/lenis';
import { projects } from './data';

// Preloader timeout constant
const PRELOADER_TIMEOUT = 2000;

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	useEffect(() => {
		const lenis = new Lenis();
		let rafId;

		function raf(time) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);

		// cleanup on unmount
		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			document.body.style.cursor = 'default';
			window.scrollTo(0, 0);
		}, PRELOADER_TIMEOUT);

		return () => clearTimeout(timer);
	}, []);

	const filteredProjects = projects.filter((project) => project.title && project.src);

	return (
		<main ref={container} className={styles.main}>
			<AnimatePresence mode="wait">
				{isLoading && <Preloader />}
			</AnimatePresence>
			<Landing />
			<Description />
            <Toaster position="top-left" />
			<div className={styles.projectsContainer}>
				{filteredProjects.map((project, i) => {
					const targetScale = 1 - (filteredProjects.length - i) * 0.05;
					const isLast = i === filteredProjects.length - 1;
					return (
						<Projects
							key={`p_${i}`}
							i={i}
							{...project}
							progress={scrollYProgress}
							range={[i * 0.25, 1]}
							targetScale={targetScale}
							isLast={isLast}
						/>
					);
				})}
			</div>
			<div className={styles.spacer}></div>
			<Contact />
		</main>
	);
}
