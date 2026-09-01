import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  direction?: 'bottom' | 'left';
  aspectRatio?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  direction = 'bottom',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden relative ${className}`}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
      </div>
    );
  }

  const isBottom = direction === 'bottom';

  return (
    <div className={`overflow-hidden relative group ${className}`}>
      <motion.div
        initial={{
          clipPath: isBottom ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
        }}
        whileInView={{
          clipPath: 'inset(0% 0% 0% 0%)',
        }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1], // Smooth elegant ease
        }}
        className="w-full h-full"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
};
