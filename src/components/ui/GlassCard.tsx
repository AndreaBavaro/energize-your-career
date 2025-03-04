
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 md:p-8 rounded-2xl bg-white bg-opacity-70 backdrop-filter backdrop-blur-md border border-white border-opacity-20 shadow-md",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]",
        className
      )}
    >
      {children}
    </div>
  );
}
