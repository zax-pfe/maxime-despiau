import Gallery from "@/components/Gallery/Gallery";

import { productImages } from "@/data/works/productImage";
import gsap from "gsap";
import { useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
import styles from "./page.module.scss";
import TransitionLoader, {
  ExitLoader,
} from "@/components/TransitionLoader/TransitionLoader";

export default function Index() {
  const container = useRef();
  const { timeline } = useContext(TransitionContext);

  useGSAP(() => {
    gsap.fromTo(
      container.current,
      {
        x: "0%",
      },
      {
        x: "100%",
        ease: "power4.inOut",
        duration: 1,
      }
    );
    timeline.add(
      gsap.fromTo(
        container.current,
        {
          x: "-100%",
        },
        {
          x: "0%",
          ease: "power3.inOut",
          duration: 1,
        }
      )
    );
  });
  return (
    <>
      <div className={styles.exitLoader} ref={container}>
        <TransitionLoader />
      </div>
      <Gallery images={productImages} />
    </>
  );
}
