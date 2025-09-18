import Gallery from "@/components/Gallery/Gallery";
import { eventImages } from "@/data/works/eventImages";
import GalleryPhone from "@/components/phone/GalleryPhone/GalleryPhone";
import useDevice from "@/hooks/useDevice";

import gsap from "gsap";
import { useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
import styles from "./page.module.scss";
import TransitionLoader from "@/components/TransitionLoader/TransitionLoader";

export default function Index() {
  const container = useRef();
  const { timeline } = useContext(TransitionContext);
  const device = useDevice();

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
      {device === "phone" ? (
        <GalleryPhone images={eventImages} />
      ) : (
        <Gallery images={eventImages} />
      )}
    </>
  );
}
