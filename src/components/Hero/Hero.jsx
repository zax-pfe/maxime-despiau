import styles from "./style.module.scss";
import { heroImages } from "@/data/imageList";
import { useState, useEffect, useRef, useContext } from "react";
import {
  motion,
  useScroll,
  MotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import { IsLoadingContext } from "@/context/IsLoadingContext";

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
  const textRef = useRef();
  gsap.registerPlugin(SplitText);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveHero((prev) =>
        prev < heroImages.length - 1 ? activeHero + 1 : 0
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [activeHero]);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      let split = SplitText.create(textRef.current, {
        type: "chars, lines",
        autoSplit: true,
        mask: "lines",
      });
      const timeline = gsap.timeline();

      if (isLoading === true) {
        timeline.to({}, { duration: 1.7 }).from(split.chars, {
          y: 100,
          yPercent: 100,
          ease: "power4.out",
          stagger: {
            amount: 1,
            from: "random",
          },
        });
      }
    });
  }, []);

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
          // style={{ position: "relative" }}
          //
        >
          {/* <div className={styles.imageContainer}> */}
          <Image
            src={heroImages[activeHero].src}
            alt={heroImages[activeHero].name}
            fill
            priority
            // sizes="100vw"
            quality={80}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
          {/* </div> */}
        </motion.div>
      </AnimatePresence>

      {/* </div> */}
      <div className={styles.heroText}>
        <div className={styles.header}>
          <p>profesionnal photographer</p>
          <span className={styles.line} />
          <p>based in toulouse - france</p>
        </div>
        <div className={styles.name} ref={textRef}>
          Maxime Despiau
        </div>
      </div>
    </div>
  );
}
