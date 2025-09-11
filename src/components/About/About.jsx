import styles from "./style.module.scss";
import about from "../../../public/images/About/contact_compressed.png";
import Image from "next/image";
import AnimatedHeaderText from "../Animatedtext/AnimatedHeader";
import AnimatedParagraphText from "../Animatedtext/AnimatedParagraph";
import { aboutText } from "@/data/aboutText";

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.imageContainer}>
        <Image src={about} alt={"About image"} fill />
      </div>
      <div className={styles.aboutText}>
        <div className={styles.headerText}>
          <AnimatedHeaderText text={"About"} isLoading={false} />
        </div>
        <div className={styles.contentText}>
          {aboutText.map((text, i) => (
            <div key={i}>
              <AnimatedParagraphText isLoading={false} text={text.txt} />
            </div>
          ))}
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
}
