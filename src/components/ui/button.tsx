import { clsx } from "clsx";
import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "default";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  solid:
    "bg-gradient-to-r from-slate-600/80 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white",
  outline:
    "border border-white/40 text-white hover:border-white/80 hover:text-white",
  ghost: "bg-white/5 text-white hover:bg-white/10"
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-base"
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "font-semibold rounded-full transition ease-in-out duration-300",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button };
