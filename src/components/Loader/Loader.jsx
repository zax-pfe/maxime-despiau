"use client";
import styles from "./style.module.scss";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";

export default function Loader() {
  const textRef = useRef(null);
  const screenRef = useRef(null);
  const containerRef = useRef(null);
  const textScreenRef = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(SplitText);

    document.fonts.ready.then(() => {
      const split = new SplitText(textRef.current, {
        type: "chars, lines",
        autoSplit: true,
        mask: "lines",
      });

      const timeline = gsap.timeline({
        defaults: { duration: 1.2, autoAlpha: 0, yPercent: 100 },
      });

      timeline.from(split.chars, {
        y: 100,
        yPercent: 100,
        autoAlpha: 1,
        ease: "power4.out",
        // stagger: 0.02,
        stagger: {
          amount: 0.2,
        },
      });

      timeline.to(
        screenRef.current,
        {
          x: "100%", // décale complètement vers la droite
          autoAlpha: 1, // reste visible
          yPercent: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.8"
      );

      timeline.to(
        containerRef.current,
        {
          yPercent: -100,
          autoAlpha: 1, // reste visible
          ease: "power4.inOut",
          duration: 1,
        },
        "-=0.2"

        //
      );
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.loader}>
      <div ref={textRef} className={styles.textContainer}>
        <h1>Maxime</h1>
        <h1>Despiau</h1>
        {/* Le screen ici sert juste a eviter le petit glitch du texte */}
        <div ref={textScreenRef} className={styles.textScreen} />
      </div>
      <div className={styles.lineContianer}>
        <div className={styles.line} />
        <div ref={screenRef} className={styles.screen} />
      </div>
    </div>
  );
}
