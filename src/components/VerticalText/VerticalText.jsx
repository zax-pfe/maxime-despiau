import styles from "./style.module.scss";

export default function VerticalText({ children }) {
  const words = typeof children === "string" ? children.split(" ") : [""];

  return (
    <p className={styles.verticalText}>
      {words.map((word, i) => {
        const characters = word.split("");
        return (
          <span key={i}>
            {characters.map((char, j) => (
              <span key={j} className={styles.charContainer}>
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </p>
  );
}
