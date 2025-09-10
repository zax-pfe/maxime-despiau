"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedHeaderText({ text, isLoading }) {
  const headerRef = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    document.fonts.ready.then(() => {
      const split = new SplitText(headerRef.current, {
        type: "chars, lines",
        autoSplit: true,
        mask: "lines",
      });

      const timeline = gsap.timeline({
        defaults: { duration: 1.2, autoAlpha: 0, yPercent: 100 },
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          onEnter: () => timeline.play(),
          onEnterBack: () => {},
          // toggleActions: "restart none play none",
        },
      });

      timeline.from(split.chars, {
        y: 100,
        yPercent: 100,
        autoAlpha: 0,
        ease: "power4.out",
        stagger: 0.02,
      });
    });
  }, [isLoading]);
  return <div ref={headerRef}>{text}</div>;
}
