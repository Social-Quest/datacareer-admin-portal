import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  tooltip?: string;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatsCard = ({ title, value, icon, tooltip, change, className }: StatsCardProps) => {
  return (
    <div className={cn(
      "data-card flex items-start justify-between",
      className
    )}>
      <div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-help">
                    <Info size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
      </div>

      <div className="p-2 rounded-lg bg-primary-lightest bg-opacity-20">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
