
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: "fade-in-up" | "fade-in" | "slide-in-left" | "slide-in-right";
  delay?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  animation = "fade-in-up",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);

  const delayStyle = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div 
      ref={ref} 
      className={cn(
        "opacity-0",
        isVisible && `animate-${animation}`,
        isVisible && "animate-fill-forwards",
        className
      )}
      style={delayStyle}
    >
      {text}
    </div>
  );
}
