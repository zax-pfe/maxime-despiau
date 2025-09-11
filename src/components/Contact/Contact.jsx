import styles from "./style.module.scss";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.header}>Contact</div>
      <div className={styles.infos}>
        <InfoElement
          name={"insta"}
          content={"Maxime.Depsiau"}
          link={"linkInsta"}
        />
      </div>
    </div>
  );
}

function InfoElement({ name, content, link }) {
  return (
    <div className={styles.infoElement}>
      <div className={styles.name}>{name}</div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>{content}</div>
        <div className={styles.copy}>copy</div>
      </div>
    </div>
  );
}
