
import { cn } from "@/lib/utils";
import React from "react";

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  animationDelay?: string;
}

export function GlassCard({ 
  children, 
  className, 
  hoverEffect = true,
  animationDelay
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass rounded-xl p-6 transition duration-300 ease-in-out",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      style={animationDelay ? { animationDelay } : undefined}
    >
      {children}
    </div>
  );
}
