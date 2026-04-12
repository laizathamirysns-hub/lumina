
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Sun, Cloud, Moon, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MOTIVATIONAL_PHRASES, SELF_CARE_TASKS } from '@/lib/constants';

export default function Home({ userName }: { userName: string }) {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'night'>('morning');
  const [phrase, setPhrase] = useState('');
  const [tasks, setTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const hour = new Date().getHours();
    let period: 'morning' | 'afternoon' | 'night' = 'morning';
    if (hour >= 5 && hour < 12) period = 'morning';
    else if (hour >= 12 && hour < 18) period = 'afternoon';
    else period = 'night';
    
    setTimeOfDay(period);
    const phrases = MOTIVATIONAL_PHRASES[period];
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(tasks).filter(Boolean).length;
  const progress = (completedCount / SELF_CARE_TASKS.length) * 100;

  const getGreeting = () => {
    if (timeOfDay === 'morning') return { text: 'Bom dia', icon: Sun, color: 'text-orange-400' };
    if (timeOfDay === 'afternoon') return { text: 'Boa tarde', icon: Cloud, color: 'text-blue-400' };
    return { text: 'Boa noite', icon: Moon, color: 'text-purple-400' };
  };

  const Greeting = getGreeting();

  return (
    <div className="p-6 pb-24 space-y-8 max-w-md mx-auto">
      <header className="space-y-2">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Greeting.icon className={Greeting.color} />
          <h1 className="text-3xl font-serif font-bold text-foreground">
            {Greeting.text}, {userName || 'querida'}
          </h1>
        </motion.div>
        <p className="text-muted-foreground italic">Como você está se sentindo hoje?</p>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-none shadow-sm bg-secondary/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-12 h-12" />
          </div>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-serif text-xl font-medium text-primary">Reflexão do Momento</h3>
            <p className="text-lg leading-relaxed text-foreground/80">"{phrase}"</p>
          </CardContent>
        </Card>
      </motion.div>

      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-serif text-xl font-medium">Autocuidado</h3>
          <span className="text-sm text-muted-foreground">{completedCount}/{SELF_CARE_TASKS.length} concluídos</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="grid gap-3">
          {SELF_CARE_TASKS.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                  tasks[task.id] 
                    ? "bg-primary/10 border-primary/20 text-primary" 
                    : "bg-white border-border hover:border-primary/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tasks[task.id] ? '✨' : '🌸'}</span>
                  <span className="font-medium">{task.label}</span>
                </div>
                {tasks[task.id] ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5 opacity-20" />}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
