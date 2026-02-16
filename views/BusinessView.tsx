
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Target, Briefcase, AlertCircle } from 'lucide-react';

const BusinessView: React.FC = () => {
  const [fixedCost, setFixedCost] = useState(5000);
  const [variableCost, setVariableCost] = useState(20);
  const [priceFactor, setPriceFactor] = useState(0.5); // Price = 100 - priceFactor * units

  const simulation = useMemo(() => {
    const data = [];
    let maxProfit = -Infinity;
    let optimalUnits = 0;

    for (let units = 0; units <= 200; units += 5) {
      const pricePerUnit = 100 - (priceFactor * units);
      const totalRevenue = pricePerUnit * units;
      const totalCost = fixedCost + (variableCost * units);
      const profit = totalRevenue - totalCost;

      if (profit > maxProfit) {
        maxProfit = profit;
        optimalUnits = units;
      }

      data.push({
        units,
        revenue: Math.max(0, Number(totalRevenue.toFixed(0))),
        cost: Number(totalCost.toFixed(0)),
        profit: Number(profit.toFixed(0))
      });
    }

    return { data, maxProfit, optimalUnits };
  }, [fixedCost, variableCost, priceFactor]);

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-emerald-600 text-white rounded-2xl">
          <BarChart3 size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Business Optimization</h1>
          <p className="text-slate-500">Analisis Keuntungan Maksimum dengan Model Pendapatan Kuadratik.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Briefcase size={18} /> Market Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                  Fixed Costs <span>${fixedCost}</span>
                </label>
                <input 
                  type="range" min="1000" max="10000" step="500" value={fixedCost}
                  onChange={(e) => setFixedCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                  Variable Cost / Unit <span>${variableCost}</span>
                </label>
                <input 
                  type="range" min="5" max="50" value={variableCost}
                  onChange={(e) => setVariableCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                  Price Elasticity <span>{priceFactor}</span>
                </label>
                <input 
                  type="range" min="0.1" max="1" step="0.1" value={priceFactor}
                  onChange={(e) => setPriceFactor(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            <div className="mt-10 p-6 bg-emerald-900 text-white rounded-3xl space-y-4">
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Optimal Output</p>
                <p className="text-2xl font-black">{simulation.optimalUnits} Units</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Max Estimated Profit</p>
                <p className="text-2xl font-black text-emerald-400">${simulation.maxProfit.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-[28px]">
            <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertCircle size={16} /> Business Logic
            </h4>
            <p className="text-xs text-amber-800/70 leading-relaxed">
              Keuntungan (Profit) adalah selisih Revenue (TR) dan Cost (TC). <br/>
              <code className="bg-amber-200/50 px-1 rounded text-amber-900 font-bold">P(x) = ax² + bx + c</code><br/>
              Dimana <code className="bg-amber-200/50 px-1 rounded">a</code> adalah negatif karena hukum utilitas marjinal yang menurun.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-[40px] bg-white border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Profit Curve Analysis</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> Profit
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                  <div className="w-2 h-2 rounded-full bg-slate-300" /> Revenue
                </div>
              </div>
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulation.data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="units" label={{ value: 'Production Units', position: 'bottom', offset: -5 }} />
                  <YAxis tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#cbd5e1" fill="#f1f5f9" />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" fill="#ecfdf5" strokeWidth={4} />
                  <ReferenceLine x={simulation.optimalUnits} stroke="#10b981" strokeDasharray="3 3" label="Max Profit" />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[32px] bg-emerald-600 text-white shadow-xl shadow-emerald-600/20">
              <TrendingUp className="mb-4" size={32} />
              <h3 className="font-bold mb-2">Law of Diminishing Returns</h3>
              <p className="text-sm text-emerald-50 text-opacity-80">Terbukti dengan kurva parabola yang melengkung ke bawah: penambahan input tidak selamanya meningkatkan profit.</p>
            </div>
            <div className="p-8 rounded-[32px] bg-slate-900 text-white">
              <DollarSign className="text-emerald-400 mb-4" size={32} />
              <h3 className="font-bold mb-2">Break Even Point</h3>
              <p className="text-sm text-slate-400">Titik potong akar x pada fungsi profit menunjukkan ambang batas unit produksi agar tidak rugi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessView;
