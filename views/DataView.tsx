
import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Database, Cpu, Search, Code2, Info, Share2 } from 'lucide-react';

const DataView: React.FC = () => {
  const [dataSize, setDataSize] = useState(100);

  const complexityData = useMemo(() => {
    const data = [];
    for (let n = 1; n <= dataSize; n += dataSize / 20) {
      data.push({
        n: Math.floor(n),
        linear: Math.floor(n),
        quadratic: Math.floor(n * n),
        loglinear: Math.floor(n * Math.log2(n || 1))
      });
    }
    return data;
  }, [dataSize]);

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-indigo-600 text-white rounded-2xl">
          <Database size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Informatics & Data</h1>
          <p className="text-slate-500">Visualisasi Algoritma O(n²) dan Pemodelan Tren Data.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Cpu size={18} /> System Load Scaling
            </h3>
            
            <div>
              <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                Input Size (n) <span>{dataSize} elements</span>
              </label>
              <input 
                type="range" min="10" max="1000" step="10" value={dataSize}
                onChange={(e) => setDataSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="mt-10 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">O(n) Operations</span>
                  <span className="text-sm font-mono font-bold">{dataSize.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '10%' }} />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">O(n²) Operations</span>
                  <span className="text-sm font-mono font-bold text-indigo-700">{(dataSize * dataSize).toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[32px] bg-slate-900 text-white">
            <Code2 className="text-indigo-400 mb-4" size={32} />
            <h3 className="font-bold mb-2">Bubble Sort & Nested Loops</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Banyak algoritma fundamental memiliki kompleksitas kuadratik. Optimasi seringkali berarti mengubah model <code className="text-indigo-400 font-mono">ax²</code> menjadi <code className="text-emerald-400 font-mono">n log n</code>.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-[40px] bg-white border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Complexity Scaling Visualization</h3>
              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-slate-400 cursor-pointer" />
              </div>
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complexityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="n" label={{ value: 'Input Size (n)', position: 'bottom', offset: -5 }} />
                  <YAxis scale="sqrt" label={{ value: 'Op Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="linear" name="O(n)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="loglinear" name="O(n log n)" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="quadratic" name="O(n²)" stroke="#6366f1" strokeWidth={4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-100 rounded-3xl flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm">
                <Search size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Predictive Modeling</h4>
                <p className="text-xs text-slate-500 mt-1">Regresi kuadratik digunakan dalam data science untuk memprediksi titik jenuh (saturation point) dalam data pertumbuhan user.</p>
              </div>
            </div>
            <div className="p-6 bg-slate-100 rounded-3xl flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm">
                <Info size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Bottleneck Analysis</h4>
                <p className="text-xs text-slate-500 mt-1">Identifikasi bagian sistem yang memicu beban kuadratik adalah kunci skalabilitas infrastruktur cloud modern.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataView;
