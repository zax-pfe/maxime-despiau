import styles from "./style.module.scss";
import AnimatedHeaderText from "../Animatedtext/AnimatedHeader";
import { motion } from "framer-motion";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";

export default function Contact() {
  const [hoveredContact, setHoveredContact] = useState(null);
  return (
    <div className={styles.contact}>
      <div className={styles.header}>
        <AnimatedHeaderText text={"Contact"} isLoading={false} />
      </div>
      <div className={styles.infos}>
        <InfoElement
          name={"Insta"}
          content={"Maxime.Depsiau"}
          link={"linkInsta"}
          hoveredContact={hoveredContact}
          setHoveredContact={setHoveredContact}
        />
        <InfoElement
          name={"Linkedin"}
          content={"Maxime Depsiau"}
          link={"linkedein"}
          hoveredContact={hoveredContact}
          setHoveredContact={setHoveredContact}
        />
        <InfoElement
          name={"Mail"}
          content={"Maxime Depsiau"}
          link={"linkedein"}
          hoveredContact={hoveredContact}
          setHoveredContact={setHoveredContact}
        />
      </div>
    </div>
  );
}

function InfoElement({
  name,
  content,
  link,
  hoveredContact,
  setHoveredContact,
}) {
  return (
    <div
      className={styles.infoElement}
      onMouseOver={() => setHoveredContact(name)}
      onMouseOut={() => setHoveredContact(null)}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>{content}</div>
        <div className={styles.copy}>
          <MdContentCopy />
        </div>
      </div>
      <div className={styles.lineContainer}>
        <div className={styles.line} />
        <motion.div
          initial={{ x: 0 }}
          animate={
            hoveredContact === name
              ? {
                  x: "100%",
                  transition: { duration: 0.2, ease: [0.77, 0, 0.175, 1] },
                }
              : {
                  x: 0,
                  transition: { duration: 0.2, ease: [0.77, 0, 0.175, 1] },
                }
          }
          className={styles.screen}
        />
      </div>
    </div>
  );
}
