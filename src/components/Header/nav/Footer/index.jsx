import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../../../common/RoundedButton';
import Magnetic from '../../../../common/Magnetic';
import { usePathname } from 'next/navigation';
import { useResumeModal } from '../../../../common/ResumeModal';

export default function index() {
	const { openResume } = useResumeModal();
	return (
		<>
			<div className={styles.footer}>
				<Magnetic>
					<div className={styles.el}>
						<a
							href="https://www.linkedin.com/in/rishilahoti/"
							target="_blank"
						>
							LinkedIn
						</a>
						<div className={styles.indicator}></div>
					</div>
				</Magnetic>
				<Magnetic>
					<div className={styles.el}>
						<a
							href="https://github.com/rishilahoti"
							target="_blank"
						>
							GitHub
						</a>
						<div className={styles.indicator}></div>
					</div>
				</Magnetic>
				<Magnetic>
					<div className={styles.el}>
						<a
							href="https://twitter.com/rishii_lahoti"
							target="_blank"
						>
							Twitter
						</a>
						<div className={styles.indicator}></div>
					</div>
				</Magnetic>
				<Magnetic>
					<div className={styles.el}>
						<a href="#" onClick={(e) => { e.preventDefault(); openResume(); }}>
							Resume
						</a>
						<div className={styles.indicator}></div>
					</div>
				</Magnetic>
			</div>
		</>
	);
}
