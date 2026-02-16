
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Gamepad2, Timer, Trophy, Heart, Sparkles, CheckCircle2, XCircle, 
  Play, RotateCcw, Save, Loader2, Target, Zap, ChevronLeft 
} from 'lucide-react';
import { saveScore } from '../lib/db';

type GameMode = 'hub' | 'roots' | 'ballistics';

const GameView: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('hub');
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  
  // Saving Score State
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // Quick Roots Data
  const [currentQuestion, setCurrentQuestion] = useState<{ equation: string, answer: number, options: number[] } | null>(null);
  
  // Ballistics Data
  const [targetDist, setTargetDist] = useState(0);
  const [userGuess, setUserGuess] = useState(45);

  const generateRootsQuestion = useCallback(() => {
    const r1 = Math.floor(Math.random() * 10) - 5;
    const r2 = Math.floor(Math.random() * 10) - 5;
    const b = -(r1 + r2);
    const c = r1 * r2;
    const equation = `x² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0`;
    const options = new Set<number>();
    options.add(r1);
    while (options.size < 4) options.add(Math.floor(Math.random() * 20) - 10);
    setCurrentQuestion({
      equation,
      answer: r1,
      options: Array.from(options).sort((a, b) => a - b)
    });
  }, []);

  const generateBallisticsQuestion = useCallback(() => {
    const dist = Math.floor(Math.random() * 80) + 20; // 20m - 100m
    setTargetDist(dist);
    setUserGuess(45);
  }, []);

  const startGame = (selectedMode: GameMode) => {
    setMode(selectedMode);
    setGameState('playing');
    setScore(0);
    setLives(3);
    setTimeLeft(30);
    // Reset save states
    setPlayerName('');
    setHasSaved(false);
    setIsSaving(false);
    
    if (selectedMode === 'roots') generateRootsQuestion();
    if (selectedMode === 'ballistics') generateBallisticsQuestion();
  };

  const handleRootsAnswer = (option: number) => {
    if (option === currentQuestion?.answer) {
      setScore(s => s + 10);
      setFeedback('correct');
      setTimeLeft(t => t + 5);
    } else {
      setLives(l => l - 1);
      setFeedback('wrong');
      if (lives <= 1) setGameState('end');
    }
    setTimeout(() => { setFeedback(null); generateRootsQuestion(); }, 800);
  };

  const handleBallisticsFire = () => {
    // Logic: v=40m/s, g=9.8. Range = (v^2 * sin(2theta)) / g
    const v = 40;
    const g = 9.8;
    const rad = (userGuess * Math.PI) / 180;
    const range = (v * v * Math.sin(2 * rad)) / g;
    const diff = Math.abs(range - targetDist);

    if (diff < 5) {
      setScore(s => s + 20);
      setFeedback('correct');
      setTimeLeft(t => t + 8);
    } else {
      setLives(l => l - 1);
      setFeedback('wrong');
      if (lives <= 1) setGameState('end');
    }
    setTimeout(() => { setFeedback(null); generateBallisticsQuestion(); }, 1200);
  };

  const handleSaveScore = async () => {
    if (!playerName.trim()) return;
    setIsSaving(true);
    try {
      await saveScore({
        name: playerName,
        score: score,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      setHasSaved(true);
    } catch (error) {
      console.error("Failed to save score", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('end');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  if (mode === 'hub') {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-blue-600 text-white rounded-3xl shadow-2xl mb-4"><Gamepad2 size={48} /></div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase">Fun Arena</h1>
          <p className="text-slate-500 text-lg font-medium">Literally tempat lo asah skill matematika biar nggak gampang burnout.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group p-10 rounded-[48px] bg-white border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-xl hover:shadow-2xl" onClick={() => startGame('roots')}>
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Zap size={32} /></div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Quick Roots</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Tebak salah satu akar persamaan kuadrat secepat mungkin. *Which is* basic logic ABC.</p>
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">Mulai Challenge <Play size={14} fill="currentColor" /></div>
          </div>

          <div className="group p-10 rounded-[48px] bg-slate-900 text-white border border-slate-800 hover:border-blue-500 transition-all cursor-pointer shadow-xl hover:shadow-2xl" onClick={() => startGame('ballistics')}>
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Target size={32} /></div>
            <h3 className="text-2xl font-black mb-2">Target Lock</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Gunakan variabel sudut buat hantam target. Implementasi nyata proyektil (Parabola).</p>
            <div className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-widest">Mulai Challenge <Play size={14} fill="currentColor" /></div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-2xl text-white"><Trophy size={48} /></div>
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900">GG, BESTIE!</h1>
          <p className="text-slate-500 uppercase font-black tracking-widest">Skor Akhir: <span className="text-blue-600">{score}</span></p>
        </div>

        {/* Save Score Section */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-[40px] shadow-xl border border-slate-200">
            {!hasSaved ? (
                <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Abadikan Record Lo</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Nama / Nickname..."
                            className="flex-1 p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-blue-500 outline-none transition-all"
                            disabled={isSaving}
                        />
                        <button
                            onClick={handleSaveScore}
                            disabled={isSaving || !playerName.trim()}
                            className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium italic">
                        *Score lo bakal masuk ke global leaderboard (Hype List).
                    </p>
                </div>
            ) : (
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center gap-2 font-black animate-in zoom-in">
                    <CheckCircle2 /> SAVED TO HYPE LIST!
                </div>
            )}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={() => setMode('hub')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center gap-2"><ChevronLeft size={20} /> Back to Hub</button>
          <button onClick={() => startGame(mode)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-500/20"><RotateCcw size={20} /> Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Game Header */}
      <div className="flex items-center justify-between px-8 py-5 bg-white rounded-3xl border border-slate-200 shadow-xl sticky top-24 z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Trophy size={24} /></div>
          <span className="text-2xl font-black">{score}</span>
        </div>
        <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl font-mono text-xl font-bold ${timeLeft < 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
          <Timer size={20} /> {timeLeft}s
        </div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} size={24} fill={i < lives ? '#ef4444' : 'none'} className={i < lives ? 'text-red-500' : 'text-slate-200'} />
          ))}
        </div>
      </div>

      <div className="p-12 rounded-[56px] bg-slate-900 text-white text-center shadow-3xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
        {mode === 'roots' ? (
          <div className="space-y-10 relative z-10">
            <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">Cari Akar X</p>
            <div className="text-5xl md:text-6xl font-mono font-black tracking-tighter">{currentQuestion?.equation}</div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {currentQuestion?.options.map((opt, i) => (
                <button key={i} onClick={() => handleRootsAnswer(opt)} disabled={feedback !== null} className={`p-6 rounded-3xl text-2xl font-black transition-all ${feedback === 'correct' && opt === currentQuestion.answer ? 'bg-emerald-500 shadow-lg' : feedback === 'wrong' && opt !== currentQuestion.answer ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/10 hover:bg-white/20'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-10 relative z-10">
            <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">Ballistic Target Lock</p>
            <div className="text-4xl font-black">Target Jarak: <span className="text-blue-400 font-mono">{targetDist}m</span></div>
            <div className="space-y-8 bg-white/5 p-10 rounded-[40px] border border-white/10">
              <div className="space-y-4">
                <label className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">Adjust Sudut (θ): <span>{userGuess}°</span></label>
                <input type="range" min="0" max="90" value={userGuess} onChange={(e) => setUserGuess(Number(e.target.value))} className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" />
              </div>
              <button onClick={handleBallisticsFire} disabled={feedback !== null} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-blue-600/30 active:scale-95 transition-all">FIRE MISSILE!</button>
            </div>
          </div>
        )}

        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-md z-20 rounded-[56px] animate-in fade-in">
            {feedback === 'correct' ? (
              <div className="text-center space-y-4 animate-in zoom-in">
                <CheckCircle2 size={100} className="text-emerald-500 mx-auto" />
                <p className="text-4xl font-black">LIT! 🔥</p>
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm">+Bonus Point & Time</p>
              </div>
            ) : (
              <div className="text-center space-y-4 animate-in zoom-in">
                <XCircle size={100} className="text-red-500 mx-auto" />
                <p className="text-4xl font-black">MISS! 💀</p>
                <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Hati-hati burnout!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameView;
