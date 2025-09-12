"use client";
import Loader from "@/components/Loader/Loader";
import Menu from "@/components/Menu/Menu";
import Hero from "@/components/Hero/Hero";
import Lenis from "lenis";
import { useState, useEffect, useRef } from "react";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  // const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    // Hide the loader and scroll to the top while loading
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    window.scrollTo(0, 0);

    const timeout = setTimeout(() => {
      // window.scrollTo(0, 0);
      setIsLoading(false);
      document.body.style.cursor = "default";
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      setActiveSection(0);
    }, 2200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <Menu activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}
