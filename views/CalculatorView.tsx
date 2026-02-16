
import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  ComposedChart, Area
} from 'recharts';
import { RefreshCw, TrendingUp, Calculator, ShieldCheck, Cpu, Code2, AlertTriangle, ArrowRight } from 'lucide-react';
import { QuadraticResult } from '../types';

const CalculatorView: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-4);
  const [c, setC] = useState<number>(3);

  // Core Calculation Logic
  const result = useMemo(() => {
    const valA = a;
    const valB = b;
    const valC = c;

    if (valA === 0) return { type: 'error', msg: "Nilai 'a' gak boleh 0, bestie. Itu jadi linear, bukan kuadratik." };

    const D = (valB * valB) - (4 * valA * valC);
    const vertexX = -valB / (2 * valA);
    const vertexY = (valA * vertexX * vertexX) + (valB * vertexX) + valC;

    let x1: string | number = 'N/A';
    let x2: string | number = 'N/A';
    let type = '';

    if (D > 0) {
      x1 = ((-valB + Math.sqrt(D)) / (2 * valA));
      x2 = ((-valB - Math.sqrt(D)) / (2 * valA));
      type = 'Dua Akar Real (Memotong Sumbu X)';
    } else if (D === 0) {
      x1 = -valB / (2 * valA);
      x2 = x1;
      type = 'Satu Akar Kembar (Menyinggung Sumbu X)';
    } else {
      type = 'Akar Imajiner (Melayang diatas/bawah Sumbu X)';
    }

    return { 
      D, x1, x2, type, vertexX, vertexY,
      analysis: valA > 0 ? "Kurva Senyum (Minimum Point)" : "Kurva Cemberut (Maximum Point)"
    };
  }, [a, b, c]);

  // Graph Data Generator
  const graphData = useMemo(() => {
    if (a === 0) return [];
    const data = [];
    const vx = -b / (2 * a); // Center graph on vertex
    const range = 10; 
    
    for (let x = vx - range; x <= vx + range; x += 0.5) {
      const y = (a * x * x) + (b * x) + c;
      data.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
    }
    return data;
  }, [a, b, c]);

  return (
    <div className="space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
            <Cpu size={14} /> Compute Engine v2.5
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase italic">
            CORE <span className="text-blue-600 underline decoration-4 underline-offset-8">CALCULATOR.</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl">
            Input koefisien <code className="bg-slate-200 px-1 rounded text-slate-900 font-bold">ax² + bx + c</code> lo di sini. Mesin bakal ngerender grafik parabolik dan nyari titik akar + puncaknya secara *real-time*.
          </p>
        </div>
        <button onClick={() => {setA(1); setB(-4); setC(3);}} className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-slate-800 transition-colors">
          <RefreshCw size={14} /> RESET DEFAULTS
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-white rounded-[40px] border border-slate-200 shadow-xl space-y-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calculator size={16} className="text-blue-600" /> Input Variables
            </h3>
            
            {[
              { label: 'Quadratic (a)', val: a, set: setA, desc: "Kelengkungan (Gravitasi/Akselerasi)" },
              { label: 'Linear (b)', val: b, set: setB, desc: "Slope Awal (Kecepatan Awal)" },
              { label: 'Constant (c)', val: c, set: setC, desc: "Offset (Posisi Awal)" }
            ].map((inp, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-black text-slate-900 uppercase">{inp.label}</label>
                  <span className="text-[10px] text-slate-400 font-medium">{inp.desc}</span>
                </div>
                <input 
                  type="number" 
                  value={inp.val} 
                  onChange={(e) => inp.set(parseFloat(e.target.value) || 0)}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl font-black text-xl transition-all outline-none"
                />
              </div>
            ))}
          </div>

          <div className="p-8 bg-indigo-600 rounded-[40px] text-white space-y-4 shadow-xl shadow-indigo-600/20">
             <div className="flex items-center gap-2 mb-2">
                <Code2 size={20} />
                <span className="font-black uppercase text-xs tracking-widest">Logic Insight</span>
             </div>
             <p className="text-indigo-100 text-sm leading-relaxed font-medium">
                Kalo lo set <b>a &lt; 0</b>, grafik bakal cemberut (turun). Ini dipake di fisika buat simulasi lempar batu (gravitasi negatif). Kalo <b>a &gt; 0</b>, itu kurva profit bisnis (senyum).
             </p>
          </div>
        </div>

        {/* Output & Graph */}
        <div className="lg:col-span-8 space-y-8">
          {/* Graph Container - EXPLICIT HEIGHT IS KEY HERE */}
          <div className="p-8 bg-white rounded-[48px] border border-slate-200 shadow-2xl flex flex-col h-[500px]">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-black text-slate-900 uppercase italic flex items-center gap-2">
                 <TrendingUp className="text-blue-600" size={20} /> Visualizer
               </h3>
               {result.type !== 'error' && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {result.analysis}
                  </span>
               )}
             </div>
             
             <div className="flex-1 w-full bg-slate-50 rounded-3xl overflow-hidden relative border border-slate-100">
               {a === 0 ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                    <AlertTriangle size={48} className="mb-4 text-amber-500" />
                    <p className="font-bold">Set 'a' variable != 0</p>
                 </div>
               ) : (
                 <ResponsiveContainer width="100%" height="100%">
                   <ComposedChart data={graphData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="x" type="number" domain={['auto', 'auto']} tick={{fontSize: 10}} stroke="#94a3b8" />
                     <YAxis domain={['auto', 'auto']} tick={{fontSize: 10}} stroke="#94a3b8" />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                        formatter={(val: number) => val.toFixed(2)}
                        labelFormatter={(lbl) => `X: ${lbl}`}
                     />
                     <ReferenceLine y={0} stroke="#64748b" strokeWidth={2} />
                     <ReferenceLine x={0} stroke="#64748b" strokeWidth={2} />
                     {/* Vertex Line */}
                     {result.vertexX !== undefined && (
                        <ReferenceLine x={result.vertexX} stroke="#ec4899" strokeDasharray="3 3" label="Vertex" />
                     )}
                     <Area type="monotone" dataKey="y" stroke="#2563eb" fillOpacity={0.1} fill="#2563eb" strokeWidth={4} />
                   </ComposedChart>
                 </ResponsiveContainer>
               )}
             </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 rounded-[32px] text-white">
              <p className="text-blue-400 font-black text-[9px] uppercase tracking-widest mb-2">Akar x1 (Root)</p>
              <p className="text-2xl font-mono font-black truncate">
                {typeof result.x1 === 'number' ? result.x1.toFixed(3) : result.x1}
              </p>
            </div>
            <div className="p-6 bg-slate-900 rounded-[32px] text-white">
              <p className="text-blue-400 font-black text-[9px] uppercase tracking-widest mb-2">Akar x2 (Root)</p>
              <p className="text-2xl font-mono font-black truncate">
                {typeof result.x2 === 'number' ? result.x2.toFixed(3) : result.x2}
              </p>
            </div>
            <div className="p-6 bg-emerald-900 rounded-[32px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={60} /></div>
              <p className="text-emerald-400 font-black text-[9px] uppercase tracking-widest mb-2">Vertex (Puncak)</p>
              <p className="text-xl font-mono font-black truncate">
                ({result.vertexX?.toFixed(2)}, {result.vertexY?.toFixed(2)})
              </p>
              <p className="text-[10px] text-emerald-200 mt-2 font-medium">Titik Balik Max/Min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorView;
