import { ReactNode } from "react";

type IfProps = {
  condition: boolean;
  children: ReactNode;
};
type IfElseProps = {
  condition: boolean;
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  fallbackClassName?: string;
};

export type { IfProps, IfElseProps };
