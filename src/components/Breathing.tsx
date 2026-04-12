
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Wind, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BREATHING_TECHNIQUES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Breathing() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [technique, setTechnique] = useState(BREATHING_TECHNIQUES[0]);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      let currentPhase = phase;
      let phaseTime = 0;

      intervalRef.current = setInterval(() => {
        setTimer(t => t + 1);
        phaseTime += 1;

        const targetTime = currentPhase === 'inhale' 
          ? technique.duration 
          : currentPhase === 'hold' 
            ? technique.hold 
            : technique.exhale;

        if (phaseTime >= targetTime) {
          phaseTime = 0;
          if (currentPhase === 'inhale') {
            if (technique.hold > 0) {
              currentPhase = 'hold';
              setPhase('hold');
            } else {
              currentPhase = 'exhale';
              setPhase('exhale');
            }
          } else if (currentPhase === 'hold') {
            currentPhase = 'exhale';
            setPhase('exhale');
          } else {
            currentPhase = 'inhale';
            setPhase('inhale');
          }
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, technique, phase]);

  const toggleBreathing = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('inhale');
      setTimer(0);
    }
  };

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimer(0);
  };

  return (
    <div className="p-6 pb-24 space-y-8 max-w-md mx-auto">
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold">Respire e Acalme</h2>
        <p className="text-muted-foreground">Encontre seu ritmo e deixe a tensão ir embora.</p>
      </header>

      <div className="relative flex justify-center items-center py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 0.8,
              opacity: 1 
            }}
            transition={{ 
              duration: phase === 'inhale' ? technique.duration : phase === 'hold' ? technique.hold : technique.exhale,
              ease: "easeInOut"
            }}
            className={cn(
              "w-48 h-48 rounded-full flex flex-col items-center justify-center text-white font-medium shadow-2xl",
              phase === 'inhale' ? "bg-primary" : phase === 'hold' ? "bg-muted-foreground" : "bg-secondary-foreground"
            )}
          >
            <Wind className="w-8 h-8 mb-2" />
            <span className="text-xl uppercase tracking-widest">
              {phase === 'inhale' ? 'Inspire' : phase === 'hold' ? 'Segure' : 'Expire'}
            </span>
          </motion.div>
        </AnimatePresence>
        
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-64 h-64 rounded-full border border-primary/30"
          />
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-80 h-80 rounded-full border border-primary/20"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          size="lg" 
          onClick={toggleBreathing}
          className="rounded-full px-8 h-14 text-lg"
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? 'Pausar' : 'Começar'}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={reset}
          className="rounded-full w-14 h-14"
        >
          <RotateCcw />
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-xl font-medium">Escolha uma técnica</h3>
        <div className="grid gap-3">
          {BREATHING_TECHNIQUES.map((t) => (
            <Card 
              key={t.id}
              onClick={() => {
                setTechnique(t);
                reset();
              }}
              className={cn(
                "cursor-pointer transition-all duration-300 border-none",
                technique.id === t.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
              )}
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div className="bg-secondary p-2 rounded-xl">
                  <Wind className="text-primary w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">{t.label}</h4>
                    <span className="text-xs text-muted-foreground">{t.duration}-{t.hold}-{t.exhale}s</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-tight mt-1">{t.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
