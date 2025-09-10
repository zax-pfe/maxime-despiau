import styles from "./style.module.scss";
import { heroImages } from "@/data/imageList";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  MotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

const imageVariant = {
  hidden: {
    opacity: 0,
    size: 0.8,
    transition: { duration: 0.7, ease: [0.61, 1, 0.88, 1] },
  },
  visible: {
    opacity: 1,
    size: 1,
    transition: { duration: 0.7, ease: [0.61, 1, 0.88, 1] },
  },
};

export default function Hero() {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveHero((prev) =>
        prev < heroImages.length - 1 ? activeHero + 1 : 0
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [activeHero]);

  return (
    <div className={styles.hero}>
      {/* <div className={styles.imageContainer}> */}

      <AnimatePresence mode="sync">
        <motion.div
          key={activeHero}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={imageVariant}
        >
          <Image
            src={heroImages[activeHero].src}
            alt={heroImages[activeHero].name}
            fill
            priority
            sizes="100vw"
            quality={80}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* </div> */}
      <div className={styles.heroText}>
        <div className={styles.header}>
          <p>profesionnal photographer</p>
          <span className={styles.line} />
          <p>based in toulouse - france</p>
        </div>
        <div className={styles.name}>Maxime Despiau</div>
      </div>
    </div>
  );
}
