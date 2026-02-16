
import React from 'react';
import { ShieldCheck, Cpu, Database, Layout, Code2, Sparkles, Brain, Globe, Zap, Network, Layers, GitBranch, Box, Lock, TrendingUp, Palette } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32">
      <header className="text-center space-y-8">
        <div className="inline-block p-8 bg-slate-950 text-white rounded-[48px] shadow-4xl border border-white/10 relative">
          <Cpu size={80} className="animate-pulse text-blue-500" />
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
             <ShieldCheck size={20} />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            SYSTEM <br/><span className="text-blue-600">ARCHITECTURE.</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Bedah daleman **AAM TOOLS**. Kenapa web ini bisa *smooth*, *fast*, dan *secure*? Karena kita pake stack teknologi yang *literally* standar industri Global.
          </p>
        </div>
      </header>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "React 19", desc: "Core Framework", detail: "Rendering engine terbaru, bikin transisi antar halaman instant tanpa reload (SPA).", icon: Box, color: "text-blue-500", bg: "bg-blue-50" },
          { title: "TypeScript", desc: "Type Safety", detail: "Strict typing system. Mencegah bug 'undefined' yang cringe sebelum kode dijalankan.", icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-50" },
          { title: "Recharts", desc: "Data Viz", detail: "Library grafik berbasis SVG. Ringan dan responsif buat visualisasi parabola.", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
          { title: "Tailwind CSS", desc: "Styling Engine", detail: "Utility-first CSS. Bikin UI modern yang 'mahal' tapi file sizenya kecil banget.", icon: Palette, color: "text-pink-500", bg: "bg-pink-50" }
        ].map((item, i) => (
           <div key={i} className="p-8 rounded-[32px] bg-white border border-slate-200 hover:shadow-xl transition-all space-y-4 group">
              <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4">
                {item.detail}
              </p>
           </div>
        ))}
      </div>

      {/* Deep Dive Section */}
      <section className="p-12 md:p-20 bg-slate-900 rounded-[64px] text-white relative overflow-hidden shadow-4xl">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Network size={500} />
         </div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />

         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                 Client-Side <br/><span className="text-blue-400">Processing.</span>
               </h2>
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="p-3 bg-white/10 rounded-xl h-fit"><Zap size={24} className="text-yellow-400" /></div>
                    <div>
                      <h4 className="font-bold text-lg">Zero Latency Math</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mt-2">
                        Perhitungan rumus ABC dan Fisika dijalankan langsung di browser (laptop/HP lo). Gak perlu kirim data ke server. Hasilnya? *Instant*.
                      </p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="p-3 bg-white/10 rounded-xl h-fit"><Lock size={24} className="text-emerald-400" /></div>
                    <div>
                      <h4 className="font-bold text-lg">Privacy by Default</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mt-2">
                        Karena diproses lokal, data input lo gak pernah ninggalin device lo. Aman dari kebocoran data.
                      </p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="p-10 glass-dark rounded-[48px] border border-white/10 space-y-8 backdrop-blur-md">
               <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <GitBranch size={24} className="text-blue-400" />
                  <span className="font-mono text-sm font-bold text-blue-200">logic/core_kernel.ts</span>
               </div>
               <div className="space-y-4 font-mono text-xs md:text-sm text-slate-300">
                  <p><span className="text-purple-400">const</span> <span className="text-yellow-400">engine</span> = <span className="text-blue-400">new</span> ComputationalCore();</p>
                  <p><span className="text-slate-500">// Math is universal language</span></p>
                  <p>engine.<span className="text-blue-400">optimize</span>(<span className="text-green-400">'O(n)'</span>);</p>
                  <p>engine.<span className="text-blue-400">secure</span>(<span className="text-green-400">true</span>);</p>
               </div>
               <div className="pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Build Status: Passing</span>
                  <span>v2.5.0-stable</span>
               </div>
            </div>
         </div>
      </section>

      {/* Footer Quote */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Sparkles size={32} className="mx-auto text-blue-600" />
        <p className="text-xl font-bold text-slate-900 italic">
          "Technology is best when it brings people together... and solves their math homework."
        </p>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Crafted with ❤️ by AAM Engineering Team
        </p>
      </div>
    </div>
  );
};

export default AboutView;
