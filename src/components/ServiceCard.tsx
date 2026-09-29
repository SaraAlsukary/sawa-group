import React from "react";
import { motion } from "framer-motion";

interface CardServicesProps {
  image?: string | React.ReactNode;
  alt?: string;
  className?: string;
}

export default function ServiceCard({
  image,
  alt = "Service Icon",
  className = "",
}: CardServicesProps): React.JSX.Element {
  return (
    <div className={`w-full overflow-hidden rounded-2xl ${className}`}>
      {typeof image === "string" ? (
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-52 sm:h-60 object-cover rounded-2xl transition-transform duration-300"
          src={image}
          alt={alt}
          loading="lazy"
        />
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-52 sm:h-60 flex items-center justify-center text-[var(--color-brand-red)] [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full"
        >
          {image}
        </motion.div>
      )}
    </div>
  );
}