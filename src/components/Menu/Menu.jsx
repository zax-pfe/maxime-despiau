import styles from "./style.module.scss";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.burgerContainer}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
    </div>
  );
}
