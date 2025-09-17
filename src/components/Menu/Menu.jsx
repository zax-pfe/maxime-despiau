import styles from "./style.module.scss";
import { useState } from "react";
import Drawer from "../Drawer/Drawer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import DrawerPhone from "../phone/DrawerPhone/DrawerPhone";

// Le menu est le composant en haut a doite de la fetchInternalImage,
// c'est un burger menu
// qui quand on clique dessus ouvre le panel

const iconVariant = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function Menu({ activeSection, setActiveSection, device }) {
  const [activeMenu, setActiveMenu] = useState(false);
  useEffect(() => {
    if (activeMenu) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden"; // bloque <html>
    } else {
      document.body.style.paddingRight = "0px";

      document.documentElement.style.overflow = "";
    }
  }, [activeMenu]);

  return (
    <>
      <div className={styles.menu} onClick={() => setActiveMenu(!activeMenu)}>
        <AnimatePresence mode="wait">
          {activeMenu ? (
            <>
              <motion.div
                key="cross"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariant}
                className={styles.burgerContainer}
              >
                <div className={styles.cross1} />
                <div className={styles.cross2} />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                key="lines"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariant}
                className={styles.burgerContainer}
              >
                <div className={styles.line} />
                <div className={styles.line} />
                <div className={styles.line} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      {device === "phone" ? (
        <DrawerPhone
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      ) : (
        <Drawer
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
    </>
  );
}
