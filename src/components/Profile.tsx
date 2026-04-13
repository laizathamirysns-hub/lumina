
import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Bell, Palette, Shield, LogOut, Heart, Star, Settings, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ProfileProps {
  userName: string;
  setUserName: (name: string) => void;
}

export default function Profile({ userName, setUserName }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSave = () => {
    setUserName(tempName);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (confirm('Deseja realmente sair? Seus dados locais serão mantidos, mas você voltará para a tela inicial.')) {
      localStorage.removeItem('lumina_user_name');
      window.location.reload();
    }
  };

  return (
    <div className="p-6 pb-24 space-y-8 max-w-md mx-auto">
      <header className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-3xl font-serif shadow-xl">
            {userName ? userName[0].toUpperCase() : 'A'}
          </div>
          <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-border">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-1">
          {isEditing ? (
            <div className="flex gap-2 max-w-[200px] mx-auto">
              <Input 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="text-center rounded-xl"
                autoFocus
              />
              <Button size="sm" onClick={handleSave}>OK</Button>
            </div>
          ) : (
            <h2 className="text-2xl font-serif font-bold flex items-center justify-center gap-2">
              {userName || 'Seu Nome'}
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditing(true)}>
                <User className="w-3 h-3" />
              </Button>
            </h2>
          )}
          <p className="text-sm text-muted-foreground italic">"Cultivando paz interior"</p>
        </div>
      </header>

      <div className="grid gap-4">
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-2">Preferências</h3>
          <div className="grid gap-2">
            <MenuButton icon={Palette} label="Temas e Cores" subLabel="Personalize sua experiência" color="bg-rose-100" />
            <MenuButton icon={Bell} label="Notificações" subLabel="Lembretes de autocuidado" color="bg-lilac-100" />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-2">Sobre o Lumina</h3>
          <div className="grid gap-2">
            <MenuButton icon={Heart} label="Nossa Missão" color="bg-beige-100" />
            <MenuButton icon={Shield} label="Privacidade" color="bg-sage-100" />
            <MenuButton icon={Star} label="Avaliar App" color="bg-yellow-100" />
          </div>
        </section>

        <Button 
          variant="ghost" 
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-2xl h-14"
          onClick={handleReset}
        >
          <LogOut className="mr-2 w-5 h-5" /> Sair da conta
        </Button>
      </div>

      <footer className="text-center py-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Lumina v1.0.0 • Feito com amor</p>
      </footer>
    </div>
  );
}

function MenuButton({ icon: Icon, label, subLabel, color }: { icon: any, label: string, subLabel?: string, color: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-border hover:border-primary/30 transition-all group">
      <div className="flex items-center gap-4">
        <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", color)}>
          <Icon className="w-5 h-5 text-foreground/60" />
        </div>
        <div className="text-left">
          <p className="font-bold text-sm">{label}</p>
          {subLabel && <p className="text-xs text-muted-foreground">{subLabel}</p>}
        </div>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-muted transition-colors">
        <span className="text-muted-foreground">→</span>
      </div>
    </button>
  );
}
