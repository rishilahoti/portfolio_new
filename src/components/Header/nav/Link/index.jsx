import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { slide, scale } from '../../animation';

export default function Index({ data, isActive, setSelectedIndicator }) {
    const { title, href, index } = data;
  
    const handleScroll = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById(href.replace("#", ""));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            setSelectedIndicator(href);
        }
    };

    return (
      <motion.div 
        className={styles.link} 
        onMouseEnter={() => { setSelectedIndicator(href) }} 
        custom={index} 
        variants={slide} 
        initial="initial" 
        animate="enter" 
        exit="exit"
        onClick={handleScroll}
      >
        <motion.div 
          variants={scale} 
          animate={isActive ? "open" : "closed"} 
          className={styles.indicator}
        >
        </motion.div>
        <a href={href} onClick={handleScroll}>{title}</a>
      </motion.div>
    );
}