import { Link } from "react-router-dom";
import { BrainCircuit, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function MarketingLandingPage() {
  return (
    <div id="marketing-root-container" className="min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      {/* Decorative ambient background lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-550/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight leading-none block">InfectAtlas</span>
              <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest block mt-0.5">
                Medical Microbiology
              </span>
            </div>
          </div>
          <Link
            to="/app"
            className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Launch Study Console
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Clinical Interactive Atlas
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight bg-linear-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            The Interactive Map of <br />
            <span className="bg-linear-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Medical Microbiology</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Deconstruct complex pathogens, master first-line antimicrobial coverages, and practice high-yield clinical board exam vignettes with modern active recall.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/app"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Enter Application <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/app/guide"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-850 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Read Study Guide
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-10 border-t border-slate-900">
            <div>
              <div className="text-xl font-bold text-white">Full Atlas</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Organism Profiles</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">Interactive</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Susceptibility Grid</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">USMLE / NCLEX</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Practice Boards</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/40 py-6 text-center text-[11px] text-slate-600">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 InfectAtlas. Built for medical training, clinical pharmacy, and boards prep.</p>
          <div className="flex items-center gap-1.5 text-slate-504">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
            <span>IDSA Aligned Clinical Standards</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
