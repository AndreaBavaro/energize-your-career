import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  size?: 'default' | 'small';
}

export function SectionHeading({ 
  title, 
  subtitle, 
  centered = true, 
  className,
  size = 'default'
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-10 space-y-2", 
      centered && "text-center",
      className
    )}>
      <h2 className={cn(
        "font-bold tracking-tight",
        size === 'default' ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-stone-600 max-w-3xl mx-auto",
          size === 'default' ? "text-lg" : "text-base"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
