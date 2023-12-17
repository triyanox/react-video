import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/button.types";
import { motion } from "framer-motion";

function Button({
  size = "md",
  radius = "md",
  className,
  children,
  onClick,
}: ButtonProps) {
  const buttonVariants = {
    hover: { scale: 1.1 },
    press: { scale: 0.9 },
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "flex justify-center items-center",
        {
          "w-8 h-8": size === "sm",
          "w-10 h-10": size === "md",
          "w-12 h-12": size === "lg",
          "rounded-none": radius === "none",
          "rounded-sm": radius === "sm",
          "rounded-md": radius === "md",
          "rounded-lg": radius === "lg",
          "rounded-full": radius === "full",
        },
        className
      )}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="press"
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
    >
      {children}
    </motion.button>
  );
}

export default Button;
