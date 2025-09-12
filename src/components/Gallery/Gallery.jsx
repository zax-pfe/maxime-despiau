import VerticalText from "../VerticalText/VerticalText";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const carouselVariant = {
  hidden: {
    opacity: 0,
    // x: 50,
    transition: {
      duration: 0.4,
    },
  },

  visible: {
    opacity: 1,
    // x: 0,
    transition: {
      duration: 0.4,
    },
  },
};
const carouselImagesVariant = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Gallery({ images }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className={styles.gallery}>
      <div className={styles.panel}>
        <div className={styles.smallLine} />
        <Link href="/test">
          <VerticalText>Back</VerticalText>
        </Link>
        <div className={styles.longLine} />
      </div>
      <div className={styles.imageGrid}>
        {images.map((image, i) => (
          <GalleryImage
            image={image}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        ))}
      </div>
      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={carouselVariant}
          >
            <Carousel
              images={images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryImage({ image, activeImage, setActiveImage }) {
  return (
    <div
      className={styles.galleryImage}
      onClick={() => setActiveImage(image.id)}
    >
      <div className={styles.imageContainer}>
        <Image
          src={image.src}
          alt={image.name}
          fill
          placeholder="blur"
          quality={40}
        />
      </div>
    </div>
  );
}

function Carousel({ activeImage, setActiveImage, images }) {
  const len = images.length;

  function next() {
    if (activeImage < len - 1) {
      setActiveImage(activeImage + 1);
    } else {
      setActiveImage(0);
    }
  }

  function previous() {
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    } else {
      setActiveImage(len - 1);
    }
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.mainContainer}>
        <div className={styles.leftArrowContainer}>
          <IoIosArrowBack
            onClick={() => previous()}
            style={{ color: "var(--text)", cursor: "pointer" }}
            size={45}
            className={styles.carouselButton}
          />
        </div>
        <div className={styles.mainImage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={images[activeImage].name}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={styles.mainImgeContainer}
              variants={carouselImagesVariant}
            >
              <Image
                src={images[activeImage].src}
                alt={images[activeImage].name}
                fill
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.rightArrowContainer}>
          <div className={styles.cross} onClick={() => setActiveImage(null)}>
            <IoMdClose
              className={styles.carouselButton}
              // onClick={() => setActiveImage(null)}
              style={{ color: "var(--text)" }}
              size={40}
            />
          </div>

          <IoIosArrowForward
            onClick={() => next()}
            style={{ color: "var(--text)", cursor: "pointer" }}
            size={45}
            className={styles.carouselButton}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        {images.map((_, i) => (
          <Dot
            key={i}
            index={i}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        ))}
      </div>
    </div>
  );
}

function Dot({ index, activeImage, setActiveImage }) {
  return (
    <motion.div
      className={styles.dot}
      onClick={() => setActiveImage(index)}
      animate={{ opacity: activeImage === index ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    />
  );
}
