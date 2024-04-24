import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../../../common/RoundedButton';
import Magnetic from '../../../../common/Magnetic';
import { usePathname } from 'next/navigation';

export default function index() {
  return (
    <>
    <div className={styles.footer}>
      <Magnetic>
        <div className={styles.el}>
        <a href='https://www.linkedin.com/in/rishi-lahoti-665889166/' target='_blank'>LinkedIn</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
      <Magnetic>
        <div className={styles.el}>
        <a href='https://github.com/rishilahoti' target='_blank'>GitHub</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
      <Magnetic>
        <div className={styles.el}>
        <a href='https://twitter.com/rishii_lahoti' target='_blank'>Twitter</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
      <Magnetic>
        <div className={styles.el}>
        <a href='https://drive.google.com/file/d/18StCZFuKOo7RkzZxnvuk93OuQuct0Svi/view?usp=sharing' target='_blank'>Resume</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
    </div>
    </>
  )
}
