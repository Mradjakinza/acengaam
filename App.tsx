
import React, { useState } from 'react';
import { 
  Calculator, BookOpen, Trophy, Gamepad2, Home, Info, Cpu, Zap, 
  BarChart3, Database, MousePointer2, FlaskConical, ShieldCheck 
} from 'lucide-react';
import { ViewState, NavGroup } from './types';
import HomeView from './views/HomeView';
import TheoryView from './views/TheoryView';
import CalculatorView from './views/CalculatorView';
import GameView from './views/GameView';
import LeaderboardView from './views/LeaderboardView';
import AboutView from './views/AboutView';
import EngineeringView from './views/EngineeringView';
import BusinessView from './views/BusinessView';
import DataView from './views/DataView';
import PhysicsLabView from './views/PhysicsLabView';
import MegaLabView from './views/MegaLabView';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navGroups: NavGroup[] = [
    {
      label: 'Main Dashboard',
      items: [
        { id: 'home', label: 'Main Base', icon: Home },
        { id: 'theory', label: 'Basic Knowledge', icon: BookOpen },
        { id: 'calculator', label: 'Compute Engine', icon: Calculator }
      ]
    },
    {
      label: 'Research Hub',
      items: [
        { id: 'megalab', label: 'Mega Lab 2.0', icon: FlaskConical, badge: '20+ Tools' },
        { id: 'engineering', label: 'Engineering Lab', icon: Zap },
        { id: 'business', label: 'Profit Optimization', icon: BarChart3 },
        { id: 'data', label: 'Algorithm Data', icon: Database }
      ]
    },
    {
      label: 'Playground',
      items: [
        { id: 'physics-lab', label: 'UI Physics', icon: MousePointer2 },
        { id: 'game', label: 'Fun Arena', icon: Gamepad2 },
        { id: 'leaderboard', label: 'Hype List', icon: Trophy },
        { id: 'about', label: 'System Specs', icon: Info }
      ]
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigate={navigate} />;
      case 'theory': return <TheoryView />;
      case 'calculator': return <CalculatorView />;
      case 'engineering': return <EngineeringView />;
      case 'business': return <BusinessView />;
      case 'data': return <DataView />;
      case 'physics-lab': return <PhysicsLabView />;
      case 'game': return <GameView />;
      case 'leaderboard': return <LeaderboardView />;
      case 'about': return <AboutView />;
      case 'megalab': return <MegaLabView />;
      default: return <HomeView onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-900">
      <nav className="hidden md:flex flex-col w-72 bg-slate-900 text-white p-6 sticky top-0 h-screen overflow-y-auto border-r border-white/5">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('home')}>
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
            <Cpu size={24} />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block">AAM TOOLS</span>
            <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Mega Engine v2.5</span>
          </div>
        </div>
        
        <div className="space-y-8">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{group.label}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                      currentView === item.id 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={18} />
                      <span className="text-sm font-bold">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="p-5 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-[28px] border border-blue-500/20">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-blue-400 uppercase tracking-widest font-black">Firewall Status</p>
              <ShieldCheck size={14} className="text-emerald-400" />
            </div>
            <p className="text-[11px] text-white font-medium leading-relaxed italic">"Security is literally active, Bestie."</p>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-10 lg:p-12 overflow-y-auto bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
        <AIAssistant context={`View: ${currentView}. AAM Mega Lab fokus ke 20+ fitur berbasis rumus ABC, Pythagoras & Trig. Jelasin gimana rumus ini kepake di game development & web apps.`} />
      </main>
    </div>
  );
};

export default App;
