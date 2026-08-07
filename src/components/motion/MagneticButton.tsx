"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  primary = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for the button translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the translation
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // Adjust multiplier for stronger/weaker pull
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-colors duration-300",
        primary
          ? "bg-white text-black hover:bg-gray-100" // Premium white button for primary CTA on dark background
          : "border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] text-white backdrop-blur-md hover:bg-[rgba(255,255,255,0.06)]",
        "px-6 py-3 text-[15px]",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Glow effect on hover */}
      {isHovered && primary && (
        <motion.div
          layoutId="glow"
          className="absolute inset-0 z-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return <button onClick={onClick}>{buttonContent}</button>;
}
