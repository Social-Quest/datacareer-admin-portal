import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // Value to display below the progress bar (e.g., 1.4)
  progress: number; // Progress percentage (0-100)
  className?: string;
  showValue?: boolean; // Whether to show the value below the progress bar
  completedColor?: string; // Color for completed section
  uncompletedColor?: string; // Color for uncompleted section
  height?: string; // Height of the progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  progress,
  className,
  showValue = true,
  completedColor = "#7692FF", // Medium blue/teal
  uncompletedColor = "#ABD3FA", // Lighter blue
  height = "h-3"
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Progress Bar Container */}
      <div 
        className={cn(
          "w-full relative overflow-hidden rounded-full",
          height
        )}
        style={{ backgroundColor: "#f5f5f5" }} // Light gray background
      >
        {/* Completed Section */}
        <div
          className="h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: completedColor,
          }}
        />
        
        {/* Uncompleted Section */}
        <div
          className="absolute top-0 right-0 h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${100 - clampedProgress}%`,
            backgroundColor: uncompletedColor,
          }}
        />
      </div>
      
      {/* Value Display */}
      {showValue && (
        <div className="mt-2 text-sm font-medium text-gray-900">
          {typeof value === 'number' ? value.toFixed(1) : value}
        </div>
      )}
    </div>
  );
};

export { ProgressBar }; 