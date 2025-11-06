import { useState, useEffect } from "react";
import { StatusCard } from "@/components/StatusCard";
import { BrightnessControl } from "@/components/BrightnessControl";
import { Clock, Zap, Battery, Power, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SystemStatus {
  time: string;
  mode: "manual" | "auto";
  brightness: number;
  battery: {
    percent: number;
    voltage: number;
    charging: boolean;
  };
}

const Index = () => {
  const [status, setStatus] = useState<SystemStatus>({
    time: new Date().toLocaleTimeString("ru-RU"),
    mode: "manual",
    brightness: 75,
    battery: {
      percent: 85,
      voltage: 3.7,
      charging: false
    }
  });

  const [isLightOn, setIsLightOn] = useState(true);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString("ru-RU")
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate status updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        battery: {
          ...prev.battery,
          percent: Math.max(0, Math.min(100, prev.battery.percent + (Math.random() - 0.5) * 2)),
          voltage: 3.6 + Math.random() * 0.3
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleBrightnessChange = (value: number) => {
    setStatus(prev => ({ ...prev, brightness: value }));
    // Simulate API call
    console.log("Setting brightness to:", value);
  };

  const handleToggleLight = () => {
    const newState = !isLightOn;
    setIsLightOn(newState);
    
    if (!newState) {
      setStatus(prev => ({ ...prev, brightness: 0 }));
    }
    
    toast({
      title: newState ? "Свет включен" : "Свет выключен",
      description: newState ? "Освещение активировано" : "Освещение деактивировано",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Умный светильник
          </h1>
          <p className="text-2xl md:text-3xl font-light text-primary tabular-nums">
            {status.time}
          </p>
        </header>

        {/* Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatusCard
            icon={<Clock className="w-5 h-5" />}
            label="Текущее время"
            value={status.time}
            subtitle="Системное время"
          />
          
          <StatusCard
            icon={<Gauge className="w-5 h-5" />}
            label="Режим работы"
            value={status.mode === "manual" ? "Ручной" : "Авто"}
            subtitle={status.mode === "manual" ? "Управление вручную" : "Автоматический"}
          />
          
          <StatusCard
            icon={<Zap className="w-5 h-5" />}
            label="Яркость"
            value={`${status.brightness}%`}
            subtitle={isLightOn ? "Активно" : "Выключено"}
            progress={status.brightness}
          />
          
          <StatusCard
            icon={<Battery className="w-5 h-5" />}
            label="Батарея"
            value={`${Math.round(status.battery.percent)}%`}
            subtitle={`${status.battery.voltage.toFixed(2)}V ${status.battery.charging ? "⚡" : ""}`}
            progress={status.battery.percent}
          />
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          <BrightnessControl 
            value={status.brightness} 
            onChange={handleBrightnessChange}
          />

          <Button
            onClick={handleToggleLight}
            size="lg"
            variant={isLightOn ? "destructive" : "default"}
            className="w-full h-14 text-lg font-semibold transition-all duration-300"
          >
            <Power className="w-5 h-5 mr-2" />
            {isLightOn ? "Выключить свет" : "Включить свет"}
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>Автообновление каждые 2 секунды</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
