
import React from 'react';
import { 
  Cpu, Zap, BarChart3, ShieldCheck, Rocket, ChevronRight, 
  Workflow, MousePointer2, Activity, FlaskConical, Play, ArrowRight
} from 'lucide-react';
import { ViewState } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 pb-32">
      {/* Hero Section */}
      <header className="relative p-12 md:p-24 rounded-[64px] bg-slate-950 overflow-hidden border border-white/5 shadow-2xl group">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -mr-64 -mt-64 animate-pulse duration-3000" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] -ml-20 -mb-20" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.25em] uppercase hover:bg-blue-500/20 transition-colors cursor-default">
              <ShieldCheck size={16} className="text-blue-500" />
              Advanced Computation Engine v2.5
            </div>
            <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
              AAM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">LABS.</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-lg leading-relaxed font-medium">
              Bridge the gap between <span className="text-white font-bold">Theory</span> and <span className="text-white font-bold">Reality</span>. 
              Tools matematika interaktif buat Engineering, Bisnis, sampe Game Dev. *No more boring calculations.*
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <button 
                onClick={() => onNavigate('megalab')}
                className="group px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-xl shadow-blue-600/30 flex items-center gap-3 transform hover:scale-[1.02] active:scale-95"
              >
                OPEN MEGA LAB <FlaskConical size={20} className="group-hover:rotate-12 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('calculator')}
                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[24px] font-black transition-all backdrop-blur-xl flex items-center gap-3"
              >
                CORE ENGINE <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block relative perspective-1000">
            <div className="p-10 glass-dark rounded-[48px] border border-white/10 relative overflow-hidden transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white"><Activity size={24} /></div>
                  <div>
                    <p className="text-white font-black text-sm uppercase">System Status</p>
                    <p className="text-blue-400 text-[10px] font-bold">All Modules Active</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>Logic Processing</span>
                      <span>100%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-full" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                    <p className="text-slate-500 text-[9px] font-black uppercase mb-1">Tools</p>
                    <p className="text-white text-2xl font-black">20+</p>
                  </div>
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                    <p className="text-slate-500 text-[9px] font-black uppercase mb-1">Latency</p>
                    <p className="text-emerald-400 text-2xl font-black">0ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Highlight Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Elite Modules</h2>
              <p className="text-slate-500 font-medium max-w-xl">
                 Pilih "Divisi" riset lo. Dari hitungan Fisika (Engineering) sampe cuan (Business), semua ada rumusnya.
              </p>
           </div>
           <button onClick={() => onNavigate('theory')} className="text-blue-600 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:underline">
              View Documentation <ArrowRight size={16} />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'engineering', title: 'Ballistics HUD', icon: Zap, color: 'bg-blue-600', text: 'Simulasi gerak parabola peluru/roket dengan variabel fisika nyata.', tag: 'Physics' },
            { id: 'business', title: 'Profit Optima', icon: BarChart3, color: 'bg-emerald-600', text: 'Cari titik cuan maksimal (Vertex) pake analisis fungsi kuadrat.', tag: 'Economy' },
            { id: 'physics-lab', title: 'Interactive UI', icon: MousePointer2, color: 'bg-indigo-600', text: 'Eksperimen fluid physics pake kursor lo. Pythagoras in action.', tag: 'Design' }
          ].map((m) => (
            <div 
              key={m.id}
              onClick={() => onNavigate(m.id as ViewState)}
              className="group p-8 bg-white rounded-[40px] hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer border border-slate-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                 <m.icon size={120} />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className={`w-16 h-16 rounded-2xl ${m.color} text-white flex items-center justify-center shadow-lg`}>
                  <m.icon size={32} />
                </div>
                <div>
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 inline-block">{m.tag}</span>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">{m.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{m.text}</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:gap-4 transition-all">
                   Launch Module <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
