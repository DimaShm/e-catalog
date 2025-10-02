import { useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  label?: string;
}

export default function Slider({ min, max, step = 1, value, onValueChange, label }: SliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1]);
    const newValue: [number, number] = [newMin, localValue[1]];
    setLocalValue(newValue);
    onValueChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0]);
    const newValue: [number, number] = [localValue[0], newMax];
    setLocalValue(newValue);
    onValueChange(newValue);
  };

  const minPercent = ((localValue[0] - min) / (max - min)) * 100;
  const maxPercent = ((localValue[1] - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-3">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-full bg-blue-600 rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          className={cn(
            'absolute w-full h-2 appearance-none bg-transparent pointer-events-none',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600',
            '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto',
            '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4',
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600',
            '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto',
            '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white',
            '[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0'
          )}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          className={cn(
            'absolute w-full h-2 appearance-none bg-transparent pointer-events-none',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600',
            '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto',
            '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4',
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600',
            '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto',
            '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white',
            '[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0'
          )}
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Min:</span>
          <span className="font-semibold text-gray-900">${localValue[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Max:</span>
          <span className="font-semibold text-gray-900">${localValue[1]}</span>
        </div>
      </div>
    </div>
  );
}
