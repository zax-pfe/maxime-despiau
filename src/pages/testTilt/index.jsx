"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function Tilt({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Inverser les rotations pour que le coin "s'enfonce"
  const rotateX = useSpring(useTransform(y, [-100, 100], [-15, 15]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [15, -15]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;

    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        perspective: 600,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function Index() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {[1, 2, 3].map((i) => (
        <Tilt
          key={i}
          className="w-64 h-64 rounded-xl overflow-hidden shadow-lg bg-gray-100"
        >
          <img
            src={`/image${i}.jpg`}
            alt={`Image ${i}`}
            className="w-full h-full object-cover"
          />
        </Tilt>
      ))}
    </div>
  );
}
