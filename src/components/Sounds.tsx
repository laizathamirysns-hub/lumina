
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, Timer, CloudRain, Trees, Waves, Music as MusicIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { SOUNDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Sounds() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [volume, setVolume] = useState([50]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSound = (sound: typeof SOUNDS[0]) => {
    if (playingId === sound.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = sound.url;
        audioRef.current.volume = volume[0] / 100;
        audioRef.current.play();
      }
      setPlayingId(sound.id);
    }
  };

  const startTimer = (minutes: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(minutes * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timerRef.current!);
          audioRef.current?.pause();
          setPlayingId(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'rain': return CloudRain;
      case 'nature': return Trees;
      case 'waves': return Waves;
      default: return MusicIcon;
    }
  };

  return (
    <div className="p-6 pb-24 space-y-8 max-w-md mx-auto h-full flex flex-col">
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold">Ambiente de Paz</h2>
        <p className="text-muted-foreground">Sons relaxantes para focar ou descansar.</p>
      </header>

      <audio ref={audioRef} loop />

      <div className="grid grid-cols-2 gap-4">
        {SOUNDS.map((sound) => {
          const Icon = getIcon(sound.id);
          const isPlaying = playingId === sound.id;
          return (
            <motion.div key={sound.id} whileTap={{ scale: 0.95 }}>
              <Card 
                onClick={() => toggleSound(sound)}
                className={cn(
                  "cursor-pointer border-none transition-all duration-300 relative overflow-hidden",
                  isPlaying ? "bg-primary text-white shadow-lg scale-105" : "bg-white hover:bg-muted/50"
                )}
              >
                {isPlaying && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 bg-primary opacity-20 animate-pulse"
                  />
                )}
                <CardContent className="p-6 flex flex-col items-center gap-3 relative z-10">
                  <div className={cn("p-3 rounded-2xl", isPlaying ? "bg-white/20" : "bg-secondary")}>
                    <Icon className={cn("w-8 h-8", isPlaying ? "text-white" : "text-primary")} />
                  </div>
                  <span className="font-bold text-sm">{sound.label}</span>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 opacity-40" />}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="border-none shadow-sm bg-secondary/30">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Volume2 className="text-muted-foreground w-5 h-5" />
            <Slider 
              value={volume} 
              onValueChange={(v) => {
                setVolume(v);
                if (audioRef.current) audioRef.current.volume = v[0] / 100;
              }} 
              max={100} 
              step={1} 
              className="flex-1"
            />
            <span className="text-xs font-mono w-8 text-right">{volume[0]}%</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Timer className="w-4 h-4" />
                Timer de Relaxamento
              </div>
              {timeLeft !== null && (
                <span className="text-primary font-mono font-bold animate-pulse">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {[5, 15, 30, 60].map((m) => (
                <Button 
                  key={m} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 rounded-xl"
                  onClick={() => startTimer(m)}
                >
                  {m}m
                </Button>
              ))}
              {timeLeft !== null && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="rounded-xl"
                  onClick={() => {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setTimeLeft(null);
                  }}
                >
                  Parar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 flex items-center justify-center opacity-20">
        <Sparkles className="w-24 h-24 text-primary animate-slow-spin" />
      </div>
    </div>
  );
}
