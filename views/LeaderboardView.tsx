
import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Star, User, Loader2, RefreshCw } from 'lucide-react';
import { ScoreEntry } from '../types';
import { getScores } from '../lib/db';

const LeaderboardView: React.FC = () => {
  const [leaders, setLeaders] = useState<ScoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaders = async () => {
    setIsLoading(true);
    try {
      const data = await getScores();
      setLeaders(data);
    } catch (err) {
      console.error("Error fetching leaders", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const topThree = leaders.slice(0, 3);
  const others = leaders.slice(3);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-medium">Memuat Papan Peringkat...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Trophy className="text-yellow-500" />
            Hall of Fame
          </h1>
          <p className="text-slate-500">Peringkat master persamaan kuadrat yang terdaftar.</p>
        </div>
        <button 
          onClick={fetchLeaders}
          className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
          title="Segarkan Data"
        >
          <RefreshCw size={20} />
        </button>
      </header>

      {topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
          {/* Silver - Rank 2 */}
          {topThree[1] && (
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center relative overflow-hidden group order-2 md:order-1">
              <Medal className="text-slate-400 mx-auto mb-4" size={40} />
              <h3 className="text-lg font-bold text-slate-900 truncate">#2 {topThree[1].name}</h3>
              <p className="text-2xl font-black text-blue-600">{topThree[1].score}</p>
              <div className="absolute top-0 right-0 p-2 bg-slate-200 rounded-bl-xl text-[10px] font-bold">SILVER</div>
            </div>
          )}
          
          {/* Gold - Rank 1 */}
          {topThree[0] && (
            <div className="p-10 rounded-3xl bg-slate-900 text-white text-center shadow-2xl scale-110 relative z-10 border border-blue-500/30 order-1 md:order-2">
              <Trophy className="text-yellow-400 mx-auto mb-4 animate-pulse" size={48} />
              <h3 className="text-xl font-bold truncate">#1 {topThree[0].name}</h3>
              <p className="text-3xl font-black text-blue-400">{topThree[0].score}</p>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 px-4 py-1 bg-yellow-500 rounded-full text-xs font-bold text-slate-900 shadow-lg">MASTER</div>
            </div>
          )}
          
          {/* Bronze - Rank 3 */}
          {topThree[2] && (
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center relative overflow-hidden order-3">
              <Medal className="text-orange-400 mx-auto mb-4" size={40} />
              <h3 className="text-lg font-bold text-slate-900 truncate">#3 {topThree[2].name}</h3>
              <p className="text-2xl font-black text-blue-600">{topThree[2].score}</p>
              <div className="absolute top-0 right-0 p-2 bg-orange-100 text-orange-600 rounded-bl-xl text-[10px] font-bold">BRONZE</div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="grid grid-cols-12 p-6 border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-7">Pemain</div>
          <div className="col-span-2 text-right">Skor</div>
          <div className="col-span-2 text-right">Tanggal</div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {others.length > 0 ? others.map((player, idx) => (
            <div key={idx} className="grid grid-cols-12 p-6 items-center hover:bg-slate-50 transition-colors group">
              <div className="col-span-2 md:col-span-1 text-center font-bold text-slate-400">#{idx + 4}</div>
              <div className="col-span-6 md:col-span-7 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                  <User size={20} />
                </div>
                <span className="font-bold text-slate-900 truncate">{player.name}</span>
              </div>
              <div className="col-span-2 text-right font-black text-blue-600">{player.score}</div>
              <div className="col-span-2 text-right text-[10px] md:text-xs font-bold text-slate-400">{player.date}</div>
            </div>
          )) : (
            <div className="p-12 text-center text-slate-400 italic">
              Belum ada pemain lain di peringkat ini.
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
        <Star size={18} />
        <span className="text-sm font-medium">Buktikan kemampuanmu dan jadilah yang terbaik di QuadraMaster!</span>
      </div>
    </div>
  );
};

export default LeaderboardView;
