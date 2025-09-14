import styles from "./style.module.scss";
import { useContext, useRef } from "react";
import { ActivePageContext } from "@/context/ActivePageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";

export default function TransitionLoader() {
  const { activePage, setActivePage } = useContext(ActivePageContext);

  return (
    <div className={styles.transitionLoader}>
      <div className={styles.transitionText}>{activePage}</div>
    </div>
  );
}

// export function ExitLoader() {
//   const textRef = useRef(null);

//   const { activePage, setActivePage } = useContext(ActivePageContext);

//   useGSAP(() => {
//     gsap.registerPlugin(SplitText);

//     document.fonts.ready.then(() => {
//       const split = new SplitText(textRef.current, {
//         type: "chars, lines",
//         autoSplit: true,
//         mask: "lines",
//       });
//       const timeline = gsap.timeline({
//         defaults: { duration: 1.2, autoAlpha: 1, yPercent: 100 },
//       });

//       timeline.to({}, { duration: 0.1 }).from(split.chars, {
//         y: 100,
//         yPercent: 100,
//         autoAlpha: 1,
//         ease: "power4.out",
//         stagger: {
//           amount: 0.2,
//         },
//       });
//     });
//   });

//   return (
//     <div className={styles.exitLoader}>
//       <div ref={textRef} className={styles.transitionText}>
//         {/* {activePage} */}
//         Bonjour
//       </div>
//     </div>
//   );
// }
