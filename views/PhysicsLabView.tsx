
import React, { useEffect, useRef, useState } from 'react';
import { MousePointer2, Activity, RefreshCw, Sparkles, Brain, Info, Zap } from 'lucide-react';

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  density: number;
  offset: number;
  color: string;
  vx: number;
  vy: number;
}

const PhysicsLabView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMath, setActiveMath] = useState<'magnet' | 'fluid'>('fluid');
  const [particleCount, setParticleCount] = useState(400);
  
  const mouse = useRef({ x: 0, y: 0, radius: 200, active: false });
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  const init = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = (Math.random() * 2 + 1) * dpr;
      particles.current.push({
        baseX: x, baseY: y, x: x, y: y, size: size,
        density: (Math.random() * 30) + 1,
        offset: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '#3b82f6' : '#6366f1',
        vx: 0, vy: 0
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    mouse.current.x = (e.clientX - rect.left) * dpr;
    mouse.current.y = (e.clientY - rect.top) * dpr;
    mouse.current.active = true;
  };

  const draw = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;

    ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.002;

    particles.current.forEach(p => {
      const dx = mouse.current.x - p.x;
      const dy = mouse.current.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = (mouse.current.radius * dpr - dist) / (mouse.current.radius * dpr);

      if (dist < mouse.current.radius * dpr && mouse.current.active) {
        if (activeMath === 'magnet') {
          p.vx += (dx / dist) * force * p.density * 0.2;
          p.vy += (dy / dist) * force * p.density * 0.2;
        } else {
          p.vx -= (dx / dist) * force * p.density * 0.5;
          p.vy -= (dy / dist) * force * p.density * 0.5;
        }
      }

      // Return to base
      const dBaseX = p.baseX - p.x;
      const dBaseY = p.baseY - p.y;
      p.vx += dBaseX * 0.05;
      p.vy += dBaseY * 0.05;

      // Friction
      p.vx *= 0.9;
      p.vy *= 0.9;

      p.x += p.vx;
      p.y += p.vy;

      // Sinusoidal Float
      const floatY = Math.sin(time + p.offset) * (2 * dpr);
      
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y + floatY, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    init();
    draw();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [particleCount, activeMath]);

  return (
    <div className="space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest">
            <Zap size={14} /> Neural Physics Lab
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
            DYNAMIC <span className="text-indigo-600">LIQUID.</span>
          </h1>
        </div>
        <div className="flex bg-slate-100 p-2 rounded-3xl">
           <button onClick={() => setActiveMath('fluid')} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${activeMath === 'fluid' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400'}`}>Fluid Engine</button>
           <button onClick={() => setActiveMath('magnet')} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${activeMath === 'magnet' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400'}`}>Magnet Engine</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="relative p-2 bg-slate-950 rounded-[64px] shadow-4xl overflow-hidden h-[600px] border-[16px] border-slate-900">
            <canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseLeave={() => mouse.current.active = false} className="w-full h-full cursor-none rounded-[40px]" />
            <div className="absolute bottom-10 left-10 p-6 glass-dark rounded-3xl border border-white/10">
               <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest mb-1">Calculation Method</p>
               <p className="text-white text-lg font-bold">Pythagoras-Based Force Field</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10 flex flex-col justify-center">
          <div className="p-10 bg-white rounded-[48px] border border-slate-200 shadow-2xl space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 italic"><Brain size={24} className="text-indigo-600" /> Interaction Specs</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Eksperimen kursor ini pake **Teorema Pythagoras** buat ngetung jarak (`dist`) kursor lo ke tiap partikel secara real-time. *Which is* logic yang sama dipake buat bikin efek hover di web-web mahal.
            </p>
            <div className="space-y-6">
               <div>
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-3">Density <span>{particleCount} Units</span></div>
                  <input type="range" min="100" max="800" step="50" value={particleCount} onChange={e => setParticleCount(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
               </div>
               <button onClick={init} className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 transition-all hover:bg-slate-800">
                 <RefreshCw size={18} /> REFRESH ENVIRONMENT
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsLabView;
