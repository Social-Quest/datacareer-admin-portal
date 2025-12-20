import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  value: string | number;
  options: (string | number)[];
  className?: string;
  onChange: (value: string | number) => void;
}

const DropDown: React.FC<DropdownProps> = ({
  value,
  options,
  className,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{value}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bottom-full mb-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-100",
                    String(value) === String(option) && "bg-blue-50 text-blue-600"
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;

