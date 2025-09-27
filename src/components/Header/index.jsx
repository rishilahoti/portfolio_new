'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function Index() {
	const header = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const pathname = usePathname();
	const button = useRef(null);

	// Close nav if path changes
	useEffect(() => {
		if (isActive) setIsActive(false);
	}, [pathname]);

	// GSAP ScrollTrigger
	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		// start with button scaled to 0
		gsap.set(button.current, { scale: 0 });

		const trigger = ScrollTrigger.create({
			trigger: document.documentElement,
			start: 0,
			end: window.innerHeight,
			onLeave: () => {
				gsap.to(button.current, {
					scale: 1,
					duration: 0.25,
					ease: 'power1.out',
				});
			},
			onEnterBack: () => {
				gsap.to(button.current, {
					scale: 0,
					duration: 0.25,
					ease: 'power1.out',
					onComplete: () => setIsActive(false),
				});
			},
		});

		return () => {
			trigger.kill(); // important cleanup
		};
	}, []);

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<div ref={header} className={styles.header}>
				<div className={styles.logo}>
					<p className={styles.copyright}>©</p>
					<div className={styles.name}>
						<p className={styles.RecodeBy}>ReCode by</p>
						<p className={styles.rishi}>Rishi</p>
						<p className={styles.lahoti}>Lahoti</p>
					</div>
				</div>

				<div className={styles.nav}>
					<Magnetic>
						<div
							className={styles.el}
							onClick={() => scrollToSection('work')}
						>
							<a>Work</a>
							<div className={styles.indicator}></div>
						</div>
					</Magnetic>
					<Magnetic>
						<div
							className={styles.el}
							onClick={() => scrollToSection('about')}
						>
							<a>About</a>
							<div className={styles.indicator}></div>
						</div>
					</Magnetic>
					<Magnetic>
						<div
							className={styles.el}
							onClick={() => scrollToSection('contact')}
						>
							<a>Contact</a>
							<div className={styles.indicator}></div>
						</div>
					</Magnetic>
				</div>
			</div>

			<div ref={button} className={styles.headerButtonContainer}>
				<Rounded
					onClick={() => setIsActive((prev) => !prev)}
					className={styles.button}
				>
					<div
						className={`${styles.burger} ${
							isActive ? styles.burgerActive : ''
						}`}
					/>
				</Rounded>
			</div>

			<AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
		</>
	);
}
