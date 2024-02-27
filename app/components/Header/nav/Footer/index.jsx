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
        <a>LinkedIn</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
      <Magnetic>
        <div className={styles.el}>
        <a>Instagram</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
      <Magnetic>
        <div className={styles.el}>
        <a>Twitter</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
      <Magnetic>
        <div className={styles.el}>
        <a>Spotify</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
    </div>
    </>
  )
}
