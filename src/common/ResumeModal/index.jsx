'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import styles from './style.module.scss';

const ResumeModalContext = createContext(null);

export function ResumeModalProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return;
		document.body.style.overflow = 'hidden';
		const onKeyDown = (e) => {
			if (e.key === 'Escape') setIsOpen(false);
		};
		window.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen]);

	return (
		<ResumeModalContext.Provider value={{ openResume: () => setIsOpen(true) }}>
			{children}
			{isOpen && (
				<div className={styles.overlay} onClick={() => setIsOpen(false)}>
					<div className={styles.panel} onClick={(e) => e.stopPropagation()}>
						<div className={styles.toolbar}>
							<a href="/rishi_resume.pdf" download className={styles.download}>
								Download
							</a>
							<button
								type="button"
								className={styles.close}
								onClick={() => setIsOpen(false)}
								aria-label="Close resume"
							>
								×
							</button>
						</div>
						<iframe
							src="/rishi_resume.pdf"
							title="Rishi Lahoti - Resume"
							className={styles.frame}
						/>
					</div>
				</div>
			)}
		</ResumeModalContext.Provider>
	);
}

export function useResumeModal() {
	return useContext(ResumeModalContext);
}
