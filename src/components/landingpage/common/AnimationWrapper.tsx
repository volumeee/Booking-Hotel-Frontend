"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, MotionProps } from "framer-motion";

interface AnimationWrapperProps extends MotionProps {
  children: React.ReactNode;
  type?: "fadeIn" | "slideUp" | "scale";
}

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
};

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  type = "fadeIn",
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={animationVariants[type]}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
