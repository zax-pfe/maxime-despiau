"use client";
import Loader from "@/components/Loader/Loader";
import Menu from "@/components/Menu/Menu";
import Hero from "@/components/Hero/Hero";
import Lenis from "lenis";
import { useState, useEffect, useRef, useContext } from "react";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
import styles from "./page.module.scss";
import TransitionLoader from "@/components/TransitionLoader/TransitionLoader";

export default function Index() {
  const container = useRef();
  const { timeline } = useContext(TransitionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";

    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.scrollTo(0, 0);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      setActiveSection(0);
    }, 2200);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  useGSAP(() => {
    timeline.add(
      gsap.fromTo(
        container.current,
        {
          x: "-100%",
        },
        {
          x: "0%",
          ease: "power4.inOut",
          duration: 1,
        }
      )
    );
  });
  return (
    <div>
      {isLoading && <Loader />}
      <div className={styles.exitLoader} ref={container}>
        <TransitionLoader />
      </div>

      <Menu activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}
