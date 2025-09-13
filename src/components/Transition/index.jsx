import { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
gsap.registerPlugin(useGSAP);
export default function Transition({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  useGSAP(() => {
    if (children.key !== displayChildren.key) {
      timeline.play().then(() => {
        setDisplayChildren(children);
        window.scrollTo(0, 0);
        timeline.pause().clear();
      });
    }
  }, [children]);

  return <div ref={container}>{displayChildren}</div>;
}
