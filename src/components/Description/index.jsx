import styles from './styles.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function index() {

    const phrase = "j";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                    return <span className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={`${word}-${index}`}>{word}</motion.span></span>
                })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>ppppppppppppppppppppppppppppppp</motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <div className={styles.button}>
                        <p>About me</p>
                    </div>
                </div>
            </div>
        </div>
    )
}