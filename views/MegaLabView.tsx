
import React, { useState } from 'react';
import { 
  Zap, Target, Share2, MousePointer2, ShieldAlert, Cpu, 
  Layers, FlaskConical, TrendingUp, DollarSign, Activity, 
  Wifi, Battery, Wind, Box, Sun, Search, Layout, Code2, 
  Lock, Smartphone, Network, Palette, Database, X, ChevronRight,
  Play, RotateCcw, CheckCircle2
} from 'lucide-react';

interface LabTool {
  id: number;
  icon: any;
  title: string;
  category: 'Physics' | 'Data' | 'Design' | 'Business';
  math: string;
  desc: string;
  realWorld: string;
  // Simulation Config
  simType: 'quadratic' | 'pythagoras' | 'linear' | 'ratio';
  inputs: { label: string; key: string; def: number; unit: string }[];
  calc: (vals: any) => string;
}

// Helper component defined outside to prevent re-creation or hoisting issues
const CryptoTrend = (props: any) => <TrendingUp {...props} />;

const MegaLabView: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<LabTool | null>(null);
  const [simValues, setSimValues] = useState<Record<string, number>>({});
  const [simResult, setSimResult] = useState<string | null>(null);

  const tools: LabTool[] = [
    { 
      id: 1, icon: Zap, title: "Projectile Jump", category: "Physics",
      math: "f(t) = -0.5gt² + v₀t",
      desc: "Hitung tinggi lompatan karakter game biar nggak 'melayang' aneh.",
      realWorld: "Dipake di Unity/Unreal Engine buat bikin movement player terasa natural.",
      simType: 'quadratic',
      inputs: [{ label: 'Jump Force (v₀)', key: 'v', def: 15, unit: 'm/s' }, { label: 'Gravity (g)', key: 'g', def: 9.8, unit: 'm/s²' }],
      calc: (v) => `Max Height: ${((v.v * v.v) / (2 * v.g)).toFixed(2)} meters`
    },
    { 
      id: 2, icon: Target, title: "Hitbox Distance", category: "Physics",
      math: "c = √(a² + b²)",
      desc: "Ngecek jarak player ke musuh. Kalo jarak < radius serangan = Kena Damage.",
      realWorld: "Core mechanic dari game MOBA atau FPS buat deteksi tembakan.",
      simType: 'pythagoras',
      inputs: [{ label: 'Distance X', key: 'x', def: 30, unit: 'px' }, { label: 'Distance Y', key: 'y', def: 40, unit: 'px' }],
      calc: (v) => `Direct Distance: ${Math.sqrt(v.x*v.x + v.y*v.y).toFixed(2)} px`
    },
    { 
      id: 3, icon: Box, title: "Responsive Ratio", category: "Design",
      math: "Aspect Ratio = w / h",
      desc: "Nentuin ukuran elemen UI biar proporsional di semua layar HP/Laptop.",
      realWorld: "Dipake Frontend Dev biar tampilan web nggak peyang di HP user.",
      simType: 'ratio',
      inputs: [{ label: 'Width', key: 'w', def: 1920, unit: 'px' }, { label: 'Height', key: 'h', def: 1080, unit: 'px' }],
      calc: (v) => `Ratio: ${(v.w/v.h).toFixed(2)} (Approx ${Math.round(v.w/120)}:${Math.round(v.h/120)})`
    },
    { 
      id: 4, icon: DollarSign, title: "ROI Forecaster", category: "Business",
      math: "ROI = (Net / Cost) * 100",
      desc: "Ngitung seberapa worth it investasi lo dibanding modal yang keluar.",
      realWorld: "Wajib buat Pitch Deck startup biar investor mau naruh duit.",
      simType: 'linear',
      inputs: [{ label: 'Revenue', key: 'rev', def: 5000, unit: '$' }, { label: 'Cost', key: 'cost', def: 2000, unit: '$' }],
      calc: (v) => `ROI: ${(((v.rev - v.cost) / v.cost) * 100).toFixed(1)}%`
    },
    { 
      id: 5, icon: Wifi, title: "Signal Strength", category: "Physics",
      math: "I = P / 4πr²",
      desc: "Kekuatan sinyal Wi-Fi turun drastis seiring kuadrat jarak.",
      realWorld: "Desain jaringan 5G tower biar sinyal merata di kota.",
      simType: 'quadratic',
      inputs: [{ label: 'Power (P)', key: 'p', def: 100, unit: 'W' }, { label: 'Distance (r)', key: 'r', def: 10, unit: 'm' }],
      calc: (v) => `Intensity: ${(v.p / (4 * Math.PI * v.r * v.r)).toFixed(4)} W/m²`
    },
    {
       id: 6, icon: Database, title: "Search Speed", category: "Data",
       math: "O(log n)",
       desc: "Efisiensi pencarian data pake metode Binary Search vs Linear.",
       realWorld: "Database SQL/Google Search biar hasil keluar dalam milidetik.",
       simType: 'ratio',
       inputs: [{ label: 'Data Size', key: 'n', def: 1000000, unit: 'rows' }],
       calc: (v) => `Max Steps needed: ${Math.ceil(Math.log2(v.n))} steps only!`
    },
    { 
      id: 11, icon: CryptoTrend, title: "Parabolic Trend", category: "Business",
      math: "Y = aX² + bX + c", 
      desc: "Identifikasi kapan harga koin bakal 'to the moon' lewat tren curve.", 
      realWorld: "Analisis teknikal trading buat nentuin entry point (Buy the dip).", 
      simType: "quadratic", 
      inputs: [
        { label: 'Trend/Accel (a)', key: 'a', def: 2, unit: 'mult' }, 
        { label: 'Growth (b)', key: 'b', def: 10, unit: '$' },
        { label: 'Base Price (c)', key: 'c', def: 100, unit: '$' }
      ],
      // Menghitung prediksi harga pada T=10 (Next Period)
      calc: (v) => `Next Price (t=10): $${(v.a * 10 * 10 + v.b * 10 + v.c).toFixed(2)}`
    }
  ];

  const handleOpen = (tool: LabTool) => {
    const defaults: Record<string, number> = {};
    tool.inputs.forEach(i => defaults[i.key] = i.def);
    setSimValues(defaults);
    setSimResult(null);
    setSelectedTool(tool);
  };

  const runSimulation = () => {
    if (!selectedTool) return;
    setSimResult(selectedTool.calc(simValues));
  };

  return (
    <div className="space-y-16 pb-32">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-600/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-600/20">
          <FlaskConical size={14} /> The Grand Laboratory
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] italic">
          MEGA <br/><span className="text-blue-600 underline decoration-8 decoration-blue-600/30 underline-offset-[12px]">ENGINE.</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl font-medium leading-relaxed">
          Kumpulan *Micro-Tools* yang buktiin kalo Matematika itu tulang punggung teknologi modern. Klik salah satu buat cobain **Live Simulation**-nya.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            onClick={() => handleOpen(tool)}
            className="group bg-white p-8 rounded-[40px] border border-slate-200 hover:border-blue-500 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <tool.icon size={28} />
               </div>
               <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">{tool.category}</span>
            </div>
            
            <div className="space-y-3 mb-8 flex-1">
              <h3 className="text-xl font-black text-slate-900">{tool.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">{tool.desc}</p>
            </div>

            <div className="pt-6 border-t border-slate-100">
               <div className="text-[10px] font-mono text-blue-600 bg-blue-50 px-3 py-2 rounded-lg inline-block">
                  {tool.math}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[48px] overflow-hidden shadow-4xl flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 bg-slate-900 text-white flex justify-between items-start">
               <div className="flex gap-6 items-center">
                  <div className="p-4 bg-white/10 rounded-2xl"><selectedTool.icon size={32} /></div>
                  <div>
                     <h2 className="text-2xl font-black uppercase italic tracking-wider">{selectedTool.title}</h2>
                     <p className="text-blue-400 text-xs font-mono mt-1">{selectedTool.math}</p>
                  </div>
               </div>
               <button onClick={() => setSelectedTool(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={20} /></button>
            </div>

            {/* Simulation Area */}
            <div className="p-8 md:p-10 space-y-8">
               <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-2">
                  <h4 className="text-blue-700 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                     <Cpu size={14} /> Real-World Application
                  </h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                     {selectedTool.realWorld}
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">Input Variables</h4>
                     <div className="space-y-4">
                        {selectedTool.inputs.map((inp, idx) => (
                           <div key={idx}>
                              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">{inp.label}</label>
                              <div className="flex items-center gap-2">
                                 <input 
                                    type="number" 
                                    value={simValues[inp.key]}
                                    onChange={(e) => setSimValues({...simValues, [inp.key]: parseFloat(e.target.value) || 0})}
                                    className="flex-1 p-3 bg-slate-100 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 />
                                 <span className="text-xs font-bold text-slate-400 w-8">{inp.unit}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                     <button onClick={runSimulation} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex justify-center items-center gap-2">
                        <Play size={16} fill="currentColor" /> Run Simulation
                     </button>
                  </div>

                  <div className="flex flex-col justify-center">
                     <div className="p-6 bg-slate-900 rounded-[32px] text-center space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10"><Activity size={100} /></div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Output Result</p>
                        {simResult ? (
                           <div className="animate-in zoom-in duration-300">
                              <p className="text-2xl md:text-3xl font-black text-white leading-tight">{simResult}</p>
                              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase">
                                 <CheckCircle2 size={12} /> Calculation Verified
                              </div>
                           </div>
                        ) : (
                           <p className="text-slate-600 text-sm font-medium italic">"Waiting for inputs..."</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaLabView;
