
import React from 'react';
import { BookOpen, Brain, Activity, TrendingUp, Anchor, Target, Zap, CheckCircle2, Info, ShieldCheck, Lock } from 'lucide-react';

const TheoryView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-32">
      <header className="text-center space-y-6">
        <div className="inline-flex p-6 rounded-[32px] bg-blue-600 text-white shadow-2xl shadow-blue-500/30 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <BookOpen size={56} />
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase">
            Basic <br/>
            <span className="text-blue-600">Knowledge.</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Ngertiin dasar komputasi biar nggak FOMO sama masa depan. *Which is very important for your career journey!*
          </p>
        </div>
      </header>

      <section className="bg-white p-10 md:p-16 rounded-[64px] border border-slate-200 shadow-2xl space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck size={200} />
        </div>
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 relative z-10">
          <Info className="text-blue-600" size={32} />
          <h2 className="text-3xl font-black text-slate-900">Maksud & Tujuan AAM TOOLS</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-blue-600 uppercase tracking-widest text-sm flex items-center gap-2">
              <Zap size={18} /> Vibes Kami
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Website <b>AAM TOOLS</b> literally diciptakan biar matematika nggak cuma jadi hafalan *which is* membosankan. Kita mau bantu kamu visualisasi data secara aesthetic dan presisi buat *work-life balance* yang lebih oke. 
              <br/><br/>
              Gak cuma hitung, kita juga mentingin **Data Integrity**. Semua kalkulasi di sini diproses secara aman di *client-side engine* kami.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-black text-blue-600 uppercase tracking-widest text-sm flex items-center gap-2">
              <Activity size={18} /> Main Function
            </h3>
            <ul className="space-y-3">
              {[
                "Optimasi profit bisnis biar nggak gampang burnout pas scaling.",
                "Prediksi lintasan proyektil buat safety vibes di industri pertahanan.",
                "Basically ngertiin Big Data secara gampang lewat Complexity O(n).",
                "UI design yang terintegrasi langsung sama asisten AI pintar.",
                "Keamanan tingkat tinggi buat jaga privasi input data kamu."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-bold">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="space-y-10">
        <h2 className="text-3xl font-black text-slate-900 text-center uppercase tracking-widest">The Core Formulas</h2>
        
        <div className="grid grid-cols-1 gap-10">
          <div className="p-10 rounded-[48px] bg-slate-900 text-white relative overflow-hidden group border border-blue-500/20 shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
              <Zap size={200} />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-6">
                <div className="px-4 py-1 bg-blue-600 rounded-full inline-block text-[10px] font-bold uppercase tracking-widest">The Legend</div>
                <h3 className="text-3xl font-black">Rumus ABC</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-blue-400 font-black text-xs uppercase mb-1">Function:</p>
                        <p className="text-slate-300 text-sm leading-relaxed">Literally nyari akar-akar dari masalah hidup (persamaan kuadrat) secara matematis.</p>
                    </div>
                    <div>
                        <p className="text-blue-400 font-black text-xs uppercase mb-1">Vibes Manfaat:</p>
                        <p className="text-slate-300 text-sm leading-relaxed">Membantu kamu nyari titik balik atau puncak karir di masa depan lewat analisis tren parabolik.</p>
                    </div>
                </div>
              </div>
              <div className="lg:col-span-8 flex items-center justify-center bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-serif tracking-widest text-center animate-in fade-in duration-1000">
                  x = <span className="inline-block align-middle">
                    <span className="block border-b-4 border-white pb-3">-b {'\u00B1'} {'\u221A'}b{'²'} - 4ac</span>
                    <span className="block pt-3">2a</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[48px] bg-white border border-slate-200 shadow-xl space-y-6 hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200"><Target size={32} /></div>
              <h3 className="text-2xl font-black text-slate-900">Teorema Pythagoras</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                <b>Kegunaan:</b> Ngitung jarak terpendek (Hipotenusa) antar dua titik. <br/><br/>
                <b>Industri:</b> Dipake buat navigasi GPS, desain game engine, sampe arsitektur jembatan biar gak gampang *collapse*.
              </p>
            </div>
            <div className="p-10 rounded-[48px] bg-white border border-slate-200 shadow-xl space-y-6 hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200"><Activity size={32} /></div>
              <h3 className="text-2xl font-black text-slate-900">Trigonometri Sinus</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                <b>Kegunaan:</b> Memodelkan gerakan naik-turun yang berulang (osilasi). <br/><br/>
                <b>Industri:</b> Analisis gelombang radio, sinyal Wi-Fi, sampe detak jantung di alat medis. *Literally keeping the world in sync.*
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-12 rounded-[56px] bg-blue-600 text-white shadow-3xl text-center space-y-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="inline-flex p-4 bg-white/20 rounded-2xl backdrop-blur-md mb-2">
            <Lock size={32} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Security & Reliability</h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Dengan **AAM TOOLS**, lo nggak perlu takut data bocor atau aplikasi crash pas lagi krusial. Sistem kita didesain anti-hacker dan anti-lag. *Safe vibes only.*
        </p>
      </div>
    </div>
  );
};

export default TheoryView;
