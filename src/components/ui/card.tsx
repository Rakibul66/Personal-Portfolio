import { clsx } from "clsx";
import React from "react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "bg-white/5 border border-white/5 rounded-3xl shadow-premium backdrop-blur-xl",
        "p-6",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-semibold text-white">{children}</h3>
);

const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-slate-300 mt-2">{children}</p>
);

export { Card, CardTitle, CardDescription };
