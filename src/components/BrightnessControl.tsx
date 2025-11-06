import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";

interface BrightnessControlProps {
  value: number;
  onChange: (value: number) => void;
}

export const BrightnessControl = ({ value, onChange }: BrightnessControlProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Яркость</h3>
            <p className="text-sm text-muted-foreground">Управление освещением</p>
          </div>
        </div>
        <div className="text-3xl font-bold text-primary">{localValue}%</div>
      </div>

      <div className="relative">
        <style>{`
          .brightness-slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            box-shadow: 0 0 15px hsl(var(--primary) / 0.5);
            transition: all 0.3s ease;
          }
          .brightness-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 20px hsl(var(--primary) / 0.8);
          }
          .brightness-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: none;
            box-shadow: 0 0 15px hsl(var(--primary) / 0.5);
            transition: all 0.3s ease;
          }
          .brightness-slider::-moz-range-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 20px hsl(var(--primary) / 0.8);
          }
        `}</style>
        <input
          type="range"
          min="0"
          max="100"
          value={localValue}
          onChange={handleChange}
          className="brightness-slider w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${localValue}%, hsl(var(--secondary)) ${localValue}%, hsl(var(--secondary)) 100%)`
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};
