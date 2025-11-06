import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  className?: string;
}

export const StatusCard = ({ icon, label, value, subtitle, progress, className }: StatusCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-lg p-4 shadow-card transition-all duration-300 hover:shadow-glow hover:scale-105",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-muted-foreground text-sm">{label}</div>
        <div className="text-primary">{icon}</div>
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
