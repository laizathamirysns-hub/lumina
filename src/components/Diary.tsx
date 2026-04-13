
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Calendar, Smile, Heart, MessageSquare, BookHeart, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MOODS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DiaryEntry {
  id: string;
  created_at: string;
  mood: string;
  text: string;
}

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [selectedMood, setSelectedMood] = useState(MOODS[0].id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('lumina_diary');
    if (saved) setEntries(JSON.parse(saved));
    setLoading(false);
  }, []);

  const saveEntry = () => {
    if (!newText.trim()) return;
    const entry: DiaryEntry = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      mood: selectedMood,
      text: newText
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('lumina_diary', JSON.stringify(updated));
    setNewText('');
    setIsAdding(false);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('lumina_diary', JSON.stringify(updated));
  };

  return (
    <div className="p-6 pb-24 space-y-8 max-w-md mx-auto h-full flex flex-col">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif font-bold">Meu Diário</h2>
          <p className="text-muted-foreground">Um espaço seguro para seus sentimentos.</p>
        </div>
        <Button 
          size="icon" 
          className="rounded-full h-12 w-12 shadow-lg"
          onClick={() => setIsAdding(true)}
        >
          <Plus />
        </Button>
      </header>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-4 bg-white p-6 rounded-3xl shadow-xl border border-primary/10"
          >
            <div className="space-y-3">
              <label className="text-sm font-medium">Como você está se sentindo?</label>
              <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {MOODS.map(mood => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-2xl min-w-[64px] transition-all",
                      selectedMood === mood.id ? "bg-primary text-white scale-105" : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    <span className="text-2xl mb-1">{mood.icon}</span>
                    <span className="text-[10px] uppercase font-bold">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Escreva seus pensamentos...</label>
              <Textarea
                placeholder="Hoje eu me senti..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="min-h-[150px] rounded-2xl border-primary/20 focus-visible:ring-primary"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => {
                setIsAdding(false);
                setNewText('');
              }}>Cancelar</Button>
              <Button 
                className="flex-1 rounded-xl" 
                onClick={saveEntry}
                disabled={!newText.trim()}
              >
                Salvar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 space-y-4 opacity-40">
              <BookHeart className="w-16 h-16 mx-auto" />
              <p>Nenhuma entrada ainda. Que tal começar agora?</p>
            </div>
          ) : (
            entries.map((entry) => {
              const mood = MOODS.find(m => m.id === entry.mood) || MOODS[0];
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="border-none shadow-sm overflow-hidden group">
                    <CardContent className="p-0">
                      <div className={cn("h-2", mood.color)} />
                      <div className="p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{mood.icon}</span>
                            <div>
                              <p className="font-bold text-sm">{mood.label}</p>
                              <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(entry.created_at), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                            onClick={() => deleteEntry(entry.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">{entry.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
