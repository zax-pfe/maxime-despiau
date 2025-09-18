import VerticalText from "@/components/VerticalText/VerticalText";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

import { useState, useContext, useEffect } from "react";
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
            <ImageSlider
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
  console.log("active image egal:", activeImage);
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(activeImage);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    if (activeImage !== null) {
      api.scrollTo(activeImage, true);
      setCurrent(activeImage + 1);
    } else {
      setCurrent(api.selectedScrollSnap() + 1);
    }
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={styles.carousel}>
      <div className={styles.topContainer} onClick={() => setActiveImage(null)}>
        <IoMdClose
          className={styles.carouselButton}
          // onClick={() => setActiveImage(null)}
          style={{ color: "var(--text)" }}
          size={30}
        />
      </div>
      <div className={styles.imageSlider}>
        <Carousel setApi={setApi} className={styles.carouselContainer}>
          <CarouselContent>
            {images.map((item, index) => (
              <CarouselItem key={index} className={styles.carouselItem}>
                <Image key={index} src={item.src} alt={item.name} fill />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className={styles.bottom}>
        {images.map((_, i) => (
          <Dot key={i} index={i} current={current} />
        ))}
      </div>
    </div>
  );
}

function Dot({ index, current }) {
  return (
    <motion.div
      className={styles.dot}
      animate={{ opacity: current - 1 === index ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    />
  );
}
