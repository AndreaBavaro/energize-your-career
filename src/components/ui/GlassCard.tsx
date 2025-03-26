
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
        "bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      style={animationDelay ? { animationDelay } : undefined}
    >
      {children}
    </div>
  );
}
