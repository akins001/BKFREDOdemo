import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  once?: boolean;
}

const offset = 40;

const getInitial = (direction: Direction) => {
  switch (direction) {
    case "up": return { opacity: 0, y: offset };
    case "down": return { opacity: 0, y: -offset };
    case "left": return { opacity: 0, x: offset };
    case "right": return { opacity: 0, x: -offset };
    default: return { opacity: 0 };
  }
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  amount = 0.2,
  once = true,
}: ScrollRevealProps) => {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : getInitial(direction),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
