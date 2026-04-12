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
import { supabase } from '@/lib/supabase';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Breathing from './components/Breathing';
import Games from './components/Games';
import Diary from './components/Diary';
import Sounds from './components/Sounds';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-serif text-2xl">Lumina...</div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const userName = session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'querida';

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
            {activeTab === 'home' && <Home userName={userName} userId={session.user.id} />}
            {activeTab === 'breathing' && <Breathing />}
            {activeTab === 'games' && <Games />}
            {activeTab === 'diary' && <Diary userId={session.user.id} />}
            {activeTab === 'sounds' && <Sounds />}
            {activeTab === 'profile' && <Profile session={session} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

