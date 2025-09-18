import VerticalText from "@/components/VerticalText/VerticalText";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ActivePageContext } from "@/context/ActivePageContext";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

export default function GalleryPhone({ images }) {
  const [activeImage, setActiveImage] = useState(null);
  const { activePage, setActivePage } = useContext(ActivePageContext);

  return (
    <div className={styles.gallery}>
      <div className={styles.panel}>
        <div className={styles.smallLine} />
        <Link href="/" onClick={() => setActivePage("")}>
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

function ImageSlider({ activeImage, setActiveImage, images }) {
  return (
    <div className={styles.carousel}>
      <div className={styles.topContainer}>x</div>
      <div className={styles.imageSlider}>This is the image slider</div>
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
