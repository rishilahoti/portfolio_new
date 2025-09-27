import styles from './styles.module.scss';
import { useInView, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { slideUp, opacity } from './animation';
import Magnetic from '../../common/Magnetic';
import Circuit from '../Circuit/Circuit';
import toast from 'react-hot-toast';

export default function index() {
	const phrase = `Seeking remote/hybrid opportunities in Software Development, would really appreciate the chance to contribute.`;
	const description = useRef(null);
	const isInView = useInView(description);
	const handleDownload = () => {
		window.open('/rishi_resume.pdf', '_blank');
	};
	const hasPlayed = useRef(false);
	useEffect(() => {
		if (isInView && !hasPlayed.current) {
			hasPlayed.current = true;
			const timers = [];
			timers.push(
				setTimeout(() => toast.success(`It's lights out and away we go`), 500)
			);
			timers.push(
				setTimeout(() => toast.success('Hover over milestone to view position', {duration: 6000}), 3200)
			);
			return () => timers.forEach(clearTimeout);
		}
	}, [isInView]);

	return (
		<div>
			<div ref={description} className={styles.description}>
				<div className={styles.body}>
					<p>
						{phrase.split(' ').map((word, index) => (
							<span key={index} className={styles.mask}>
								<motion.span
									variants={slideUp}
									custom={index}
									animate={isInView ? 'open' : 'closed'}
								>
									{word}
								</motion.span>
							</span>
						))}
					</p>
					<motion.p
						variants={opacity}
						animate={isInView ? 'open' : 'closed'}
					>
						Other than that, I like Video Games, Anime, Formula 1,
						NBA and e-Sports. I touch grass by playing Basketball
						and Swimming.
					</motion.p>
					<div id="about">
						<Magnetic>
							<div
								className={styles.button}
								onClick={handleDownload}
							>
								Download Resume
							</div>
						</Magnetic>
					</div>
				</div>
			</div>
			<div>
				<Circuit />
			</div>
		</div>
	);
}
