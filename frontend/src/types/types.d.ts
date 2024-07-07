import type { InputHTMLAttributes, ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
