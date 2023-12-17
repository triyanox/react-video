/**
 * `framer-motion` typescript definitions are not up to date.
 *  So, I have to use `@ts-ignore` to ignore the errors.
 * I will remove it once the definitions are up to date.
 */
import { AnimatePresence, motion } from "framer-motion";
import { IfElseProps, IfProps } from "../types/helpers.types";
import { cn } from "@/lib/utils";

export function If({ condition, children }: IfProps) {
  return <>{condition && children}</>;
}
export function IfElse({
  condition,
  children,
  fallback,
  className,
  fallbackClassName,
}: IfElseProps) {
  return (
    // @ts-ignore
    <AnimatePresence key={JSON.stringify(condition)} mode="wait">
      {condition && (
        // @ts-ignore
        <motion.div
          className={cn(className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
      {!condition && (
        // @ts-ignore
        <motion.div
          className={cn(fallbackClassName)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {fallback}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
