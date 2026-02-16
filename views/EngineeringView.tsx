
import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart, Area
} from 'recharts';
import { Zap, Target, MousePointer2, ShieldAlert, Crosshair, Cpu } from 'lucide-react';

const EngineeringView: React.FC = () => {
  const [velocity, setVelocity] = useState(45);
  const [angle, setAngle] = useState(45);
  const gravity = 9.8;

  const sim = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    const v0x = velocity * Math.cos(rad);
    const v0y = velocity * Math.sin(rad);
    const totalTime = (2 * v0y) / gravity;
    const data = [];
    for (let t = 0; t <= totalTime; t += totalTime / 50) {
      data.push({ x: Number((v0x * t).toFixed(1)), y: Number((v0y * t - 0.5 * gravity * t * t).toFixed(1)) });
    }
    return { data, stats: { dist: v0x * totalTime, height: (v0y * v0y) / (2 * gravity) } };
  }, [velocity, angle]);

  return (
    <div className="space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-widest">
            <Crosshair size={14} /> Ballistic Control System
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
            ENGINEERING <span className="text-blue-600">HUD.</span>
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="p-10 bg-white rounded-[48px] border border-slate-200 shadow-2xl space-y-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Target size={18} className="text-red-500" /> Launch Control</h3>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between text-[11px] font-black text-slate-600 uppercase mb-4">Velocity (v₀) <span>{velocity} m/s</span></div>
                <input type="range" min="10" max="100" value={velocity} onChange={e => setVelocity(Number(e.target.value))} className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-red-600" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-black text-slate-600 uppercase mb-4">Sudut θ <span>{angle}°</span></div>
                <input type="range" min="5" max="85" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600" />
              </div>
            </div>
            <div className="pt-10 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Max Range</p>
                <p className="text-2xl font-black text-slate-900">{sim.stats.dist.toFixed(1)}m</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Max Height</p>
                <p className="text-2xl font-black text-slate-900">{sim.stats.height.toFixed(1)}m</p>
              </div>
            </div>
          </div>
          
          <div className="p-10 bg-slate-950 rounded-[48px] text-white space-y-4">
            <h4 className="text-blue-400 font-black text-xs uppercase flex items-center gap-2"><ShieldAlert size={16} /> Physics Alert</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              *Which is* kalo lo ganti gravitasi (Variabel `a` di rumus ABC), titik jatuh roket lo bakal meleset. Inilah kenapa engineer NASA harus hafal luar kepala rumus ini.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="p-1 glass-dark rounded-[64px] shadow-3xl overflow-hidden border border-white/5 h-[600px] flex flex-col">
            <div className="p-10 flex items-center justify-between">
              <h3 className="text-white font-black uppercase text-xl italic flex items-center gap-4">
                <Zap className="text-yellow-400" /> Trajectory Radar
              </h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Simulating...</span>
              </div>
            </div>
            <div className="flex-1 w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sim.data}>
                  <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="x" type="number" hide />
                  <YAxis hide domain={[0, 'auto']} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: '#fff' }} />
                  <Area type="monotone" dataKey="y" stroke="#3b82f6" fillOpacity={0.2} fill="#3b82f6" strokeWidth={8} />
                  <ReferenceLine y={0} stroke="#475569" strokeWidth={4} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringView;
