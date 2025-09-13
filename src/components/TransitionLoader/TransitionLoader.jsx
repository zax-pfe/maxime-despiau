import styles from "./style.module.scss";
import { useContext } from "react";
import { ActivePageContext } from "@/context/ActivePageContext";

export default function TransitionLoader() {
  const { activePage, setActivePage } = useContext(ActivePageContext);

  return (
    <div className={styles.transitionLoader}>
      <div className={styles.transitionText}>{activePage}</div>
    </div>
  );
}
