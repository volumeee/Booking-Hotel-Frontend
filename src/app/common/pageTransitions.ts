import { Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(10px)" },
};

export const pageTransition = { duration: 0.7 };
