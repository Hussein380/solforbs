"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  // Split text into words, then words into characters for a very high-end cascade
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.25em" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(className)}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
