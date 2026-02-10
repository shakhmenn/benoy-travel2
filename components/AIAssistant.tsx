import React, { useState } from 'react';
import { getTourRecommendation } from '../services/geminiService';
import { Send, Loader2, Sparkles, Bot } from 'lucide-react';

export const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    
    const result = await getTourRecommendation(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <section className="py-24 px-4 bg-slate-950 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] border border-slate-800 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-[300px] h-[300px] border border-slate-800 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden relative group">
                
                {/* Neon Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="text-center mb-12">
                   <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                      <Bot className="w-4 h-4" /> AI Гид 2.0
                   </div>
                   <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                      Планируй с умом
                   </h2>
                   <p className="text-slate-400">
                      Наш ИИ знает каждый камень в Беное. Спроси, куда поехать на выходные.
                   </p>
                </div>

                <div className="relative">
                   <form onSubmit={handleAsk} className="relative z-20">
                      <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Например: Хочу увидеть водопады и поесть шашлык..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-6 pr-16 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all text-lg"
                      />
                      <button 
                        type="submit"
                        disabled={loading}
                        className="absolute right-3 top-3 bottom-3 aspect-square bg-orange-600 hover:bg-orange-500 rounded-xl flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                   </form>

                   {/* Response Area */}
                   {response && (
                      <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl animate-fade-in relative">
                         <Sparkles className="absolute top-4 right-4 w-5 h-5 text-indigo-400 opacity-50" />
                         <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                            {response}
                         </p>
                      </div>
                   )}
                </div>
            </div>
        </div>
    </section>
  );
};