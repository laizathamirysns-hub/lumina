
import { Home, Wind, Gamepad2, BookHeart, Music, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'breathing', icon: Wind, label: 'Respirar' },
    { id: 'games', icon: Gamepad2, label: 'Jogos' },
    { id: 'diary', icon: BookHeart, label: 'Diário' },
    { id: 'sounds', icon: Music, label: 'Sons' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-border px-4 py-2 flex justify-between items-center z-50 safe-area-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300",
              isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("w-6 h-6 mb-1", isActive && "fill-primary/20")} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
