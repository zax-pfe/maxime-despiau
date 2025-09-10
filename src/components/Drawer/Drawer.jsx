import styles from "./style.module.scss";

export default function Drawer() {
  return (
    <div className={styles.drawer}>
      <div className={styles.imageContainer}></div>

      <div className={styles.navigationContainer}></div>
    </div>
  );
}
