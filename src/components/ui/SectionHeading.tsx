
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  centered = true, 
  className 
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-10 space-y-2", 
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-stone-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
