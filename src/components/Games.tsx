
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Sparkles, MousePointer2, LayoutGrid, Target, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function Games() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    { id: 'breathe', title: 'Toque e Respire', icon: MousePointer2, description: 'Siga o ritmo suave da respiração.', color: 'bg-rose-100' },
    { id: 'organize', title: 'Organizar Elementos', icon: LayoutGrid, description: 'Traga ordem e calma ao caos.', color: 'bg-lilac-100' },
    { id: 'calm', title: 'Jardim de Atenção', icon: Target, description: 'Toques suaves para focar no agora.', color: 'bg-sage-100' },
  ];

  if (activeGame === 'breathe') return <BreatheGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'organize') return <OrganizeGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'calm') return <CalmGame onBack={() => setActiveGame(null)} />;

  return (
    <div className="p-6 pb-24 space-y-8 max-w-md mx-auto">
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold">Momentos de Leveza</h2>
        <p className="text-muted-foreground">Pequenas pausas para distrair a mente e relaxar.</p>
      </header>

      <div className="grid gap-4">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                onClick={() => setActiveGame(game.id)}
                className="cursor-pointer border-none shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <CardContent className="p-0 flex h-32">
                  <div className={cn("w-32 flex items-center justify-center", game.color)}>
                    <Icon className="w-10 h-10 text-foreground/60" />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <h3 className="font-bold text-lg">{game.title}</h3>
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function BreatheGame({ onBack }: { onBack: () => void }) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 }, colors: ['#F9A8D4', '#C4B5FD'] });
            return 0;
          }
          return p + 2;
        });
      }, 50);
    } else {
      interval = setInterval(() => {
        setProgress(p => Math.max(0, p - 1));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isHolding]);

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center space-y-12">
      <Button variant="ghost" className="absolute top-6 left-6" onClick={onBack}>
        <ArrowLeft className="mr-2" /> Voltar
      </Button>
      
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif font-bold">Toque e Respire</h3>
        <p className="text-muted-foreground">Mantenha pressionado para inspirar.</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          animate={{ scale: 1 + progress / 100 }}
          className="absolute inset-0 bg-primary/20 rounded-full"
        />
        <button
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className={cn(
            "w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center transition-transform active:scale-95 shadow-xl z-10",
            isHolding && "ring-8 ring-primary/30"
          )}
        >
          <Sparkles className={cn("w-8 h-8", isHolding && "animate-pulse")} />
        </button>
      </div>
      
      <div className="w-full max-w-xs bg-muted rounded-full h-2 overflow-hidden">
        <div className="bg-primary h-full transition-all duration-75" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function OrganizeGame({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState(() => 
    [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
  );

  const moveItem = (index: number) => {
    const newItems = [...items];
    const emptyIndex = newItems.indexOf(9);
    
    const isAdjacent = (
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / 3) === Math.floor(emptyIndex / 3)) ||
      Math.abs(index - emptyIndex) === 3
    );

    if (isAdjacent) {
      [newItems[index], newItems[emptyIndex]] = [newItems[emptyIndex], newItems[index]];
      setItems(newItems);
      
      if (newItems.every((val, i) => val === i + 1)) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center space-y-8">
      <Button variant="ghost" className="absolute top-6 left-6" onClick={onBack}>
        <ArrowLeft className="mr-2" /> Voltar
      </Button>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif font-bold">Organizar Elementos</h3>
        <p className="text-muted-foreground">Coloque os números em ordem (1-8).</p>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-muted p-2 rounded-2xl shadow-inner">
        {items.map((item, index) => (
          <motion.button
            key={item}
            layout
            onClick={() => moveItem(index)}
            className={cn(
              "w-20 h-20 rounded-xl flex items-center justify-center text-xl font-bold transition-all shadow-sm",
              item === 9 ? "bg-transparent shadow-none" : "bg-white text-primary hover:bg-primary/5"
            )}
          >
            {item !== 9 && item}
          </motion.button>
        ))}
      </div>
      
      <Button variant="outline" onClick={() => setItems([...items].sort(() => Math.random() - 0.5))}>
        Embaralhar
      </Button>
    </div>
  );
}

function CalmGame({ onBack }: { onBack: () => void }) {
  const [petals, setPetals] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const nextId = useRef(0);

  const addPetal = (e: any) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const newPetal = { id: nextId.current++, x: clientX - rect.left, y: clientY - rect.top, size: Math.random() * 20 + 20 };
    setPetals(prev => [...prev, newPetal]);
    
    setTimeout(() => {
      setPetals(prev => prev.filter(p => p.id !== newPetal.id));
    }, 2000);
  };

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center space-y-8">
      <Button variant="ghost" className="absolute top-6 left-6" onClick={onBack}>
        <ArrowLeft className="mr-2" /> Voltar
      </Button>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif font-bold">Jardim de Atenção</h3>
        <p className="text-muted-foreground">Toque na tela para criar pétalas suaves.</p>
      </div>

      <div 
        onClick={addPetal}
        className="w-full h-96 bg-secondary/30 rounded-3xl relative overflow-hidden cursor-crosshair border border-dashed border-primary/30"
      >
        <AnimatePresence>
          {petals.map(petal => (
            <motion.div
              key={petal.id}
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ scale: 1, opacity: 0.6, y: 100, rotate: 180 }}
              exit={{ opacity: 0 }}
              style={{ 
                position: 'absolute', 
                left: petal.x - petal.size / 2, 
                top: petal.y - petal.size / 2,
                width: petal.size,
                height: petal.size,
              }}
              className="bg-rose-200 rounded-full"
            />
          ))}
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <Target className="w-24 h-24 text-primary" />
        </div>
      </div>
    </div>
  );
}
