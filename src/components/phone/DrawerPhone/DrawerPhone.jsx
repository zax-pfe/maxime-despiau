import styles from "./style.module.scss";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navlist } from "@/data/navlist";
import Image from "next/image";
import { navListImage } from "@/data/navlistImage";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

const menuVariant = {
  hidden: {
    x: "100%",

    transition: { duration: 1, ease: [0.85, 0, 0.15, 1] },
  },
  visible: {
    x: "0%",
    transition: { duration: 1, ease: [0.85, 0, 0.15, 1] },
  },
};

export default function DrawerPhone({
  activeMenu,
  setActiveMenu,
  activeSection,
  setActiveSection,
}) {
  const [hoveredItem, setHoverredItem] = useState(0);

  return (
    <AnimatePresence>
      {activeMenu && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariant}
          className={styles.drawer}
        >
          <div className={styles.navigationContainer}>
            {navlist.map((item, i) => (
              <DrawerItem
                setHoverredItem={setHoverredItem}
                id={i}
                hoveredItem={hoveredItem}
                item={item}
                setActiveMenu={setActiveMenu}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DrawerItem({ setHoverredItem, id, hoveredItem, item, setActiveMenu }) {
  const textRef = useRef(null);

  function actionOnClick() {
    if (item.name === "Home") {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const section = document.getElementById(item.name);
      if (section) {
        section.scrollIntoView({ behavior: "instant" });
      }
    }
    setActiveMenu(false);
  }

  useGSAP(() => {
    document.fonts.ready.then(() => {
      let split = SplitText.create(textRef.current, {
        type: "chars, lines",
        autoSplit: true,
        mask: "lines",
      });
      const timeline = gsap.timeline({
        defaults: { duration: 2, autoAlpha: 0, yPercent: 100 },
      });
      timeline.to({}, { duration: 0.5 }).from(split.chars, {
        y: 100,
        yPercent: 100,
        autoAlpha: 1,
        ease: "power4.out",
        stagger: {
          amount: 0.2,
        },
        delay: id * 0.15,
      });
      gsap.to(timeline, {
        progress: 1,
        duration: timeline.duration(),
        ease: "power1.Out",
      });
    });
  }, []);

  return (
    <motion.div
      className={styles.navItem}
      onMouseOver={() => setHoverredItem(id)}
      onMouseOut={() => setHoverredItem(0)}
      onClick={() => actionOnClick()}
      initial={{ opacity: 0.3 }}
      animate={
        hoveredItem === id
          ? { opacity: 1, transition: { duration: 0.3 } }
          : { opacity: 0.3, transition: { duration: 0.3 } }
      }
    >
      <span ref={textRef} key={item.name}>
        {item.name}
      </span>
    </motion.div>
  );
}
