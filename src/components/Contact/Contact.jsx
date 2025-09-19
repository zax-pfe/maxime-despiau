import styles from "./style.module.scss";
import AnimatedHeaderText from "../Animatedtext/AnimatedHeader";
import { motion } from "framer-motion";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

export default function Contact({ isLoading }) {
  const [hoveredContact, setHoveredContact] = useState(null);
  return (
    <section className={styles.contact} id="Contact">
      <div className={styles.header}>
        <AnimatedHeaderText text={"Contact"} isLoading={isLoading} />
      </div>
      <div className={styles.infos}>
        <InfoElement
          name={"Insta"}
          content={"maxime.despiau"}
          link={"https://www.instagram.com/maxime.despiau/?__pwa=1"}
          hoveredContact={hoveredContact}
          setHoveredContact={setHoveredContact}
        />
        <InfoElement
          name={"Linkedin"}
          content={"Maxime Depsiau"}
          link={"https://www.linkedin.com/in/maxime-despiau-355991229/"}
          hoveredContact={hoveredContact}
          setHoveredContact={setHoveredContact}
        />
        <InfoElement
          name={"Mail"}
          content={"maximedespiau@gmail.com"}
          link={"mailto:maximedespiau@gmail.com"}
          hoveredContact={hoveredContact}
          setHoveredContact={setHoveredContact}
        />
      </div>
    </section>
  );
}

function InfoElement({
  name,
  content,
  link,
  hoveredContact,
  setHoveredContact,
}) {
  const handleCopy = (e) => {
    e.preventDefault(); // empêche d'ouvrir le lien quand on clique sur l’icône
    navigator.clipboard.writeText(content);
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.infoElement}
      onMouseOver={() => setHoveredContact(name)}
      onMouseOut={() => setHoveredContact(null)}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>{content}</div>
        <div className={styles.copy} onClick={handleCopy}>
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
    </a>
  );
}
