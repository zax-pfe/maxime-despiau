import styles from "./style.module.scss";
import AnimatedHeaderText from "@/components/Animatedtext/AnimatedHeader";
import { useState, useContext, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useInView } from "framer-motion";

import { categories } from "@/data/categoriesList";
import Image from "next/image";
import Link from "next/link";
import { ActivePageContext } from "@/context/ActivePageContext";

const popupVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.3 },
  },
};

export default function ProjectsPhone() {
  const [activeProject, setActiveProject] = useState("");

  return (
    <section className={styles.projects} id="Works">
      <div className={styles.projectTitle}>
        <AnimatedHeaderText text={"works"} isLoading={false} />
      </div>
      <div className={styles.line} />

      {categories.map((item, i) => (
        <ProjectItem
          key={item.name}
          name={item.name}
          id={i}
          setActiveProject={setActiveProject}
        />
      ))}
    </section>
  );
}

function ProjectItem({ name, id, setActiveProject }) {
  const [hoverStatus, setHoverStatus] = useState(false);
  const { activePage, setActivePage } = useContext(ActivePageContext);

  const itemRef = useRef(null);
  const isInView = useInView(itemRef, {
    amount: 0.5,
    margin: "-20% 0px -60% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setHoverStatus(true);
      setActiveProject(id);
    } else {
      setHoverStatus(false);
    }
  }, [isInView, id, setActiveProject]);

  function mouseHoverAction() {
    setHoverStatus(true);
    setActiveProject(id);
  }

  function mouseLeavingAction() {
    setHoverStatus(false);
    setActiveProject(null);
  }
  return (
    <Link href={`/${name}`} scroll={false} onClick={() => setActivePage(name)}>
      <motion.div
        ref={itemRef}
        className={styles.projectItem}
        onMouseOver={() => mouseHoverAction()}
        onMouseOut={() => mouseLeavingAction()}
        initial={{ opacity: 0.3 }}
        animate={
          hoverStatus
            ? { opacity: 1, transition: { duration: 0.3 } }
            : { opacity: 0.3, transition: { duration: 0.3 } }
        }
      >
        <h1>{name}</h1>

        <AnimatePresence mode="wait">
          {hoverStatus && (
            <motion.div
              className={styles.imagePopUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={popupVariant}
            >
              <Image
                src={categories[id].src}
                alt={categories[id].name}
                fill={true}
                placeholder="blur"
                quality={40}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* </div> */}
      </motion.div>
    </Link>
  );
}
