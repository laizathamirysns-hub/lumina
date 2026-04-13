/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Breathing from './components/Breathing';
import Games from './components/Games';
import Diary from './components/Diary';
import Sounds from './components/Sounds';
import Profile from './components/Profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Heart, Flower2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userName, setUserName] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem('lumina_user_name');
    if (savedName) {
      setUserName(savedName);
      setIsFirstTime(false);
    }
    setLoading(false);
  }, []);

  const handleStart = (name: string) => {
    setUserName(name);
    localStorage.setItem('lumina_user_name', name);
    setIsFirstTime(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-serif text-2xl">Lumina...</div>
      </div>
    );
  }

  if (isFirstTime) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <main className="pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <Home userName={userName} />}
            {activeTab === 'breathing' && <Breathing />}
            {activeTab === 'games' && <Games />}
            {activeTab === 'diary' && <Diary />}
            {activeTab === 'sounds' && <Sounds />}
            {activeTab === 'profile' && <Profile userName={userName} setUserName={(name) => {
              setUserName(name);
              localStorage.setItem('lumina_user_name', name);
            }} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-secondary to-background text-center space-y-12 relative overflow-hidden">
      {/* Decorative Flowers */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -left-10 text-primary/10"
      >
        <Flower2 size={200} />
      </motion.div>
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 text-primary/10"
      >
        <Flower2 size={300} />
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-4 relative z-10"
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-primary/20">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-6xl font-serif font-bold text-primary tracking-tight">Lumina</h1>
        <p className="text-muted-foreground text-lg italic">Seu refúgio diário de paz e bem-estar.</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs space-y-6 relative z-10"
      >
        <div className="space-y-3">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Como podemos te chamar?</p>
          <Input 
            placeholder="Seu nome" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center h-16 rounded-2xl border-primary/30 focus-visible:ring-primary text-xl bg-white/80 backdrop-blur-sm shadow-inner"
          />
        </div>
        <Button 
          size="lg" 
          className="w-full h-16 rounded-2xl text-xl shadow-xl hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
          disabled={!name.trim()}
          onClick={() => onStart(name)}
        >
          Começar Jornada <Heart className="ml-2 w-6 h-6 fill-white" />
        </Button>
      </motion.div>

      <footer className="absolute bottom-8 opacity-60 text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
        Feito para florescer
      </footer>
    </div>
  );
}

