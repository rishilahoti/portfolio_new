import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './Circuit.module.scss';

const Circuit = () => {
	const pathRef = useRef(null);
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: false });
	const controls = useAnimation();
	const [animationProgress, setAnimationProgress] = useState(0);
	const milestones = [
		{
			position: 35,
			title: 'Maiti Labs',
			date: 'Feb-2024 - May-2024',
			description: 'Engineering Intern',
			side: 'top',
			startDate: new Date('2024-02-01'),
		},
		{
			position: 59,
			title: 'Darak Agriveda',
			date: 'Oct-2024 - Feb-2025',
			description: 'Frontend Developer',
			side: 'top',
			startDate: new Date('2024-10-01'),
		},
		{
			position: 83,
			title: 'Nature Crave',
			date: 'Feb-2025 - Aug-2025',
			description: 'Frontend Developer',
			side: 'bottom',
			startDate: new Date('2025-02-01'),
		},
		{
			position: 100,
			title: 'Instavid/Postship',
			date: 'Nov-2025 - Feb-2026',
			description: 'Software Engineer',
			side: 'neutral',
			startDate: new Date('2025-09-01'),
		},
	].sort((a, b) => a.startDate - b.startDate);
	useEffect(() => {
		if (!isInView || !pathRef.current) return;

		const path = pathRef.current;
		const pathLength = path.getTotalLength();
		path.style.strokeDasharray = pathLength;
		path.style.strokeDashoffset = pathLength;

		controls.start('visible');

		let animationFrame;
		let startTime;
		// const startPositionPercentage = 0;
		// const startPositionOffset =
		// 	pathLength * (startPositionPercentage / 100);

		const animatePath = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / 6000, 1);
			const easedProgress = 1 - Math.pow(1 - progress, 3);
			setAnimationProgress(easedProgress * 100);
			path.style.strokeDashoffset = pathLength * (1 - easedProgress);
			if (progress < 1) {
				animationFrame = requestAnimationFrame(animatePath);
			}
		};
		animationFrame = requestAnimationFrame(animatePath);
		return () => {
			cancelAnimationFrame(animationFrame);
		};
	}, [isInView, controls]);

	const getPointAndAngleAtLength = (percentage) => {
		if (!pathRef.current) return { x: 0, y: 0, angle: 0 };
		const path = pathRef.current;
		const pathLength = path.getTotalLength();
		const pos = Math.max(
			0,
			Math.min((percentage / 100) * pathLength, pathLength)
		);
		const point = path.getPointAtLength(pos);
		const delta = 1;
		const prevPos = Math.max(0, pos - delta);
		const nextPos = Math.min(pos + delta, pathLength);
		const prevPoint = path.getPointAtLength(prevPos);
		const nextPoint = path.getPointAtLength(nextPos);
		const dx = nextPoint.x - prevPoint.x;
		const dy = nextPoint.y - prevPoint.y;
		let angle = Math.atan2(dy, dx) * (180 / Math.PI);
		return { x: point.x, y: point.y, angle };
	};
	const carPos = getPointAndAngleAtLength(animationProgress);
	return (
		<motion.div
			ref={containerRef}
			className={styles.circuitContainer}
			initial="hidden"
			animate={controls}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						duration: 0.5,
						staggerChildren: 0.1,
					},
				},
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 375 375"
				className={styles.svg}
			>
				<path
					ref={pathRef}
					d="M73.765625 96.984375c3.851563 2.023437 6.359375 5.484375 8.679687 9.039063.488282.742187.976563 1.480468 1.46875 2.21875l.613282.917968.335937.503906c.703125 1.050782 1.402344 2.101563 2.105469 3.152344l3.089844 4.636719c1.695312 2.542969 3.394531 5.089844 5.085937 7.640625l2.195313 3.296875c.34375.519531.6875 1.035156 1.03125 1.554687 2.792968 4.210938 5.625 8.398438 8.675781 12.425782l.445313.585937c4.839843 6.390625 10.269531 12.179688 15.941406 17.835938.703125.703125 1.40625 1.410156 2.109375 2.113281.457031.457031.914062.914062 1.367187 1.367188l.625.628906c1.164063 1.160156 2.371094 2.277344 3.617188 3.347656.695312.601562 1.335937 1.25 1.980468 1.910156.84375.855469 1.691407 1.683594 2.605469 2.460938 1.199219 1.023437 2.300781 2.136718 3.398438 3.261718.785156.800782 1.589843 1.554688 2.441406 2.285157 1.179687 1.027343 2.292969 2.109375 3.390625 3.226562l.585938.585938c.816406.824219 1.628906 1.644531 2.445312 2.464843.597656.605469 1.199219 1.210938 1.800781 1.816407l.542969.550781c1.09375 1.097656 2.226562 2.128906 3.398438 3.144531.757812.664063 1.464843 1.371094 2.175781 2.089844l.425781.429687c.589844.597657 1.179688 1.195313 1.769531 1.792969 1.539063 1.554688 3.078125 3.085938 4.746094 4.507813.960937.847656 1.847656 1.769531 2.746094 2.683594 1.308593 1.320312 2.617187 2.609374 4.039062 3.808593.59375.519531 1.140625 1.066407 1.691407 1.628907 1.125 1.136718 2.304687 2.195312 3.527343 3.230468l.789063.816406.972656.652344c.914062.054688 1.742188-.144531 2.628906-.347656.5-.097656 1-.191406 1.5-.28125l.75-.136719c3.660156-.589843 7.574219-.085937 11.046875 1.199219 2.722657 1.089844 5.453125 2.457031 7.347657 4.757812.726562.878907 1.355468 1.503907 2.296874 2.15625.878907.242188 1.753907.308594 2.664063.367188l.785156.066406c2.808594.214844 5.617188.28125 8.433594.332032.578125.011718 1.15625.023437 1.738281.039062 1.242188.023438 2.484375.050781 3.730469.074219 2.011719.039062 4.023437.078125 6.03125.121093l8.683594.175782c8.007812.164062 16.011719.332031 24.019531.503906 15.441406.328125 30.878906.722656 46.316406 1.164062l2.527344.070313c8.769531.246094 17.539062.5 26.304688.773437l1.171874.035157c11.832032.371093 11.832032.371093 17.179688 3.332031 1.078125.699219 2.015625 1.464844 2.941406 2.351562l.617188.570313c2.65625 2.699219 4.09375 6.351563 5.054687 9.953125.949219 4.371094 1.003907 9.328125-.269531 13.632812-1.261719 3.59375-2.945312 6.722657-5.402344 9.640626l-.621094.753906c-4.449218 5.1875-10.464843 8.875-16.828124 11.261718-9.792969 3.429688-20.464844 3.898438-30.730469 4.644532-.367188.023437-.367188.023437-.746094.050781-1.714844.125-3.433594.234375-5.148437.332031-.25.015625-.496094.03125-.75.046875-5.839844.332031-11.6875.292969-17.53125.285157H279.5625c-27.578125-.023438-55.152344-.21875-94.578125-.597657-1.925781-.015625-3.855469-.035156-5.78125-.054687-3.347656-.03125-6.695313-.066406-10.042969-.101563-1.113281-.011719-2.226562-.023437-3.335937-.035156-3.144531-.027344-6.285157-.070313-9.425781-.121094-.625-.007812-1.25-.015625-1.875-.023437-1.125-.015625-2.246094-.039063-3.371094-.066406l-.957032-.011719c-2.558593-.074219-5.054687-.578125-7.3125-1.839844-1.628906-1.046875-1.628906-1.046875-2.199218-1.8125l-.5-.367187c-1.839844.0625-3.578125.726562-5.324219 1.265624-2.304687.6875-4.601563 1.3125-6.964844 1.761719l-.664062.132813c-4.945313.894531-9.882813 1.050781-14.890625 1.027344l-.957032-.003907c-12.976562-.042969-25.371093-.984375-36.851562-7.582031-8.433594-5.011719-15.222656-12.15625-20.070312-20.664062-8.613282-15.582032-10.25-34.574219-12.824219-51.90625-.207031-1.371094-.410157-2.742188-.617188-4.113282-.378906-2.546875-.757812-5.09375-1.136719-7.636718l-.296874-2c-.152344-1.042969-.308594-2.089844-.460938-3.132813-.085938-.566406-.167969-1.132813-.253906-1.703125l-.148438-1.027344-.132812-.890625c-.085938-.765625-.109375-1.503906-.089844-2.273437l-.71875-.167969c-1.703125-.6875-3.003906-1.734375-4.246094-3.082031-1.925781-2.503906-2.820312-5.566406-3.875-8.503906-2.457031-6.84375-5.367187-13.40625-8.5625-19.929688-3.800781-7.769531-7.402344-15.488281-7.042968-24.335938.246093-3.453124 1.367187-6.683593 3.226562-9.597656 2.050781-2.960937 4.757812-5.40625 7.976562-7.03125 1.484376-.640625 2.929688-1.070312 4.511719-1.402344l.695313-.152343c2.511718-.535157 5.039062-.980469 7.574218-1.410157l1.519532-.261718c1.058594-.179688 2.117187-.359375 3.175781-.539063 1.0625-.179687 2.121094-.363281 3.183594-.546875 5.316406-.914062 10.636719-1.8125 15.976562-2.585937.449219-.066407.898438-.132813 1.347657-.199219 3.773437-.566406 7.007812-.644531 10.523437.984375"
					fill="none"
					stroke="#000000"
					strokeWidth="4"
					strokeLinecap="round"
					strokeLinejoin="round"
					outline="white"
				/>

				{milestones.map((milestone, index) => {
					const point = getPointAndAngleAtLength(milestone.position);
					const appearanceThreshold = milestone.position - 5;
					const shouldShow = animationProgress >= appearanceThreshold;

					return (
						<motion.g
							key={index}
							ref={containerRef}
							initial={{ opacity: 0 }}
							animate={{ opacity: shouldShow ? 1 : 0 }}
							transition={{
								duration: 0.5,
								// delay: appearanceThreshold / 30,
							}}
						>
							{shouldShow && (
								<motion.line
									ref={containerRef}
									x1={point.x}
									y1={point.y}
									x2={point.x}
									y2={
										milestone.side === 'top'
											? point.y - 135
											: milestone.side === 'bottom'
											? point.y + 130
											: point.y - 50
									}
									stroke="#94a3b8"
									strokeWidth="1"
									strokeDasharray="4"
									// initial={{ pathLength: 0 }}
									// animate={{ pathLength: 1 }}
									// transition={{ duration: 0.3 }}
								/>
							)}
							<motion.circle
								ref={containerRef}
								cx={point.x}
								cy={point.y}
								r="6"
								fill="#ffffff"
								stroke="#7cc900"
								strokeWidth="2"
								// initial={{ scale: 0 }}
								// animate={{ scale: shouldShow ? 1.1 : 0 }}
								// transition={{
								// 	duration: 0.3,
								// 	delay: appearanceThreshold / 30,
								// }}
							/>
							<title>{milestone.description}</title>
							<motion.g
								ref={containerRef}
								// initial={{ opacity: 0, y: 10 }}
								// animate={{
								// 	opacity: shouldShow ? 1 : 0,
								// 	y: shouldShow ? 0 : 10,
								// }}
								// transition={{
								// 	duration: 0.5,
								// 	delay: appearanceThreshold / 25,
								// }}
								transform={`translate(${point.x}, ${
									milestone.side === 'top'
										? point.y - 120
                                        : milestone.side === 'bottom'
										? point.y + 120
                                        : point.y - 85
								})`}
							>
								<motion.rect
									className={styles.milestoneBox}
									ref={containerRef}
									// x={point.x - 60}
									y={milestone.side === 'top' ? -60 : 0}
									x="-60.3"
									// y="-60"
									width="120"
									height="50"
									rx="6"
									fill="#ffffff"
									stroke="#e2e8f0"
									strokeWidth="1"
									// initial={{ scale: 0.8 }}
									// animate={{ scale: shouldShow ? 1 : 0.8 }}
									// transition={{ duration: 0.3 }}
								/>
								<title>{milestone.description}</title>
								<motion.text
									ref={containerRef}
									y={milestone.side === 'top' ? -40 : 20}
									// x={point.x}
									// y={
									// 	milestone.side === 'top'
									// 		? point.y - 140
									// 		: point.y + 140
									// }
									textAnchor="middle"
									fontSize="12"
									fontWeight="bold"
									fill="#1e293b"
									// initial={{ opacity: 0 }}
									// animate={{
									// 	opacity: shouldShow ? 1 : 0,
									// }}
									// transition={{
									// 	duration: 0.3,
									// 	delay: 0.1,
									// }}
									className={styles.milestoneTitle}
								>
									{milestone.title}
								</motion.text>
								<motion.text
									ref={containerRef}
									y={milestone.side === 'top' ? -23 : 37}
									// x={point.x}
									// y={
									// 	milestone.side === 'top'
									// 		? point.y - 120
									// 		: point.y + 160
									// }
									textAnchor="middle"
									fontSize="10"
									fill="#64748b"
									// initial={{ opacity: 0 }}
									// animate={{
									// 	opacity: shouldShow ? 1 : 0,
									// }}
									// transition={{
									// 	duration: 0.3,
									// 	delaay: 0.2,
									// }}
									className={styles.milestoneDate}
								>
									{milestone.date}
								</motion.text>
							</motion.g>
						</motion.g>
					);
				})}
				<motion.g transform={`translate(${carPos.x}, ${carPos.y})`}>
					<motion.g transform={`rotate(${carPos.angle})`}>
						<motion.image
							href="/images/car.svg"
							x="-15"
							y="-18.5"
							height="16"
							width="30"
							className={styles.car}
						/>
					</motion.g>
				</motion.g>
			</svg>
		</motion.div>
	);
};

export default Circuit;
