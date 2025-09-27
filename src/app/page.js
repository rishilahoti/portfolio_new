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
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll'))
				.default;
			const locomotiveScroll = new LocomotiveScroll();

			setTimeout(() => {
				setIsLoading(false);
				document.body.style.cursor = 'default';
				window.scrollTo(0, 0);
			}, 2000);
			return () => clearTimeout(timer);
		})();
	}, []);

	return (
		<main ref={container} className={styles.main}>
			<AnimatePresence mode="wait">
				{isLoading && <Preloader />}
			</AnimatePresence>
			<Landing />
			<Description />
            <Toaster position="top-left" />
			{projects.map((project, i) => {
				const targetScale = 1 - (projects.length - i) * 0.05;
				return (
					<Projects
						key={`p_${i}`}
						i={i}
						{...project}
						progress={scrollYProgress}
						range={[i * 0.25, 1]}
						targetScale={targetScale}
					/>
				);
			})}

			<Contact />
		</main>
	);
}
