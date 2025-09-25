import styles from "./style.module.scss";
import { heroImages } from "@/data/imageList";
import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
export default function HeroPhone() {
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
    <div className={styles.heroPhone}>
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
            // priority
            quality={80}
          />
        </motion.div>
      </AnimatePresence>

      <div className={styles.heroText} ref={textRef}>
        <h1>Maxime</h1>
        <h1>Despiau</h1>
      </div>
    </div>
  );
}
