import { forwardRef, useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface DropdownOption {
  value: string | number;
  label: string;
}

interface DropdownProps {
  label?: string;
  error?: string;
  options: DropdownOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({ label, error, options, value, onChange, placeholder, disabled, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption?.label || placeholder || 'Select...';

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (optionValue: string | number) => {
      onChange?.(optionValue);
      setIsOpen(false);
    };

    return (
      <div className={cn('w-full', className)} ref={dropdownRef}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          <button
            ref={ref}
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              'w-full px-3 py-2 text-left border rounded-md shadow-sm bg-white',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'transition-all duration-200',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
              isOpen && !error && 'ring-2 ring-blue-500 border-transparent',
              !selectedOption && 'text-gray-400'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="block truncate">{displayValue}</span>
              <ChevronDown
                size={16}
                className={cn(
                  'text-gray-400 transition-transform duration-200',
                  isOpen && 'transform rotate-180'
                )}
              />
            </div>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'w-full px-3 py-2 text-left flex items-center justify-between',
                      'hover:bg-blue-50 transition-colors duration-150',
                      isSelected && 'bg-blue-50 text-blue-700 font-medium'
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={16} className="text-blue-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
