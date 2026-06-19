import { Link } from "react-router-dom";
import { BrainCircuit, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function MarketingLandingPage() {
  return (
    <div id="marketing-root-container" className="min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white w-full overflow-x-hidden relative">
      {/* Decorative ambient background lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-550/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              <BrainCircuit className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none block">InfectAtlas</span>
              <span className="text-[8px] sm:text-[9px] text-indigo-400 font-bold uppercase tracking-widest block mt-0.5">
                Medical Microbiology
              </span>
            </div>
          </div>
          <Link
            to="/app"
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer inline-flex items-center"
          >
            Launch Console
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16 md:py-24 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 w-full">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Clinical Interactive Atlas
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-tight bg-linear-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent px-1">
            The Interactive Map of <br />
            <span className="bg-linear-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Medical Microbiology</span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Deconstruct complex pathogens, master first-line antimicrobial coverages, and practice high-yield clinical board exam vignettes with modern active recall.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 max-w-xs sm:max-w-none mx-auto w-full">
            <Link
              to="/app"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Enter Application <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              to="/app/guide"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Read Study Guide
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 xs:gap-4 sm:gap-6 max-w-lg mx-auto pt-8 sm:pt-10 border-t border-slate-905 w-full">
            <div>
              <div className="text-sm xs:text-base sm:text-xl font-extrabold text-white tracking-tight">Full Atlas</div>
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1 block">Organism Profiles</div>
            </div>
            <div>
              <div className="text-sm xs:text-base sm:text-xl font-extrabold text-white tracking-tight">Interactive</div>
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1 block">Susceptibility Grid</div>
            </div>
            <div>
              <div className="text-sm xs:text-base sm:text-xl font-extrabold text-white tracking-tight font-sans">USMLE / NCLEX</div>
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1 block">Practice Boards</div>
            </div>
          </div>

          {/* High-Yield Clinical Comparisons Suite */}
          <div className="pt-12 sm:pt-16 border-t border-slate-900/60 w-full text-left space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded text-[10px] sm:text-xs font-black select-none">Suite</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-sans">
                High-Yield Clinical Comparisons
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-450 max-w-2xl font-medium leading-relaxed">
              Explore side-by-side conceptual diagnostic grids, examiners' trap warnings, and clinical recall questions engineered to maximize USMLE, COMLEX, or NCLEX performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/mrsa-vs-mssa" className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all block group">
                <span className="text-[9px] text-indigo-405 font-bold uppercase tracking-wider block mb-1">Microbial Resistance</span>
                <span className="font-extrabold text-white text-xs sm:text-sm block group-hover:text-indigo-300 transition-colors">MRSA vs. MSSA</span>
                <span className="text-[10px] text-slate-500 block mt-1 leading-normal font-medium">PBP2a alteration dynamics & drug affinities</span>
              </Link>
              
              <Link to="/vancomycin-vs-linezolid" className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all block group">
                <span className="text-[9px] text-emerald-405 font-bold uppercase tracking-wider block mb-1">Pharmacology</span>
                <span className="font-extrabold text-white text-xs sm:text-sm block group-hover:text-emerald-300 transition-colors">Vancomycin vs. Linezolid</span>
                <span className="text-[10px] text-slate-500 block mt-1 leading-normal font-medium">Bioavailability, troughs, & serotonin risks</span>
              </Link>

              <Link to="/cellulitis-vs-erysipelas" className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all block group">
                <span className="text-[9px] text-purple-405 font-bold uppercase tracking-wider block mb-1">Clinical Diagnosis</span>
                <span className="font-extrabold text-white text-xs sm:text-sm block group-hover:text-purple-300 transition-colors">Cellulitis vs. Erysipelas</span>
                <span className="text-[10px] text-slate-500 block mt-1 leading-normal font-medium">Demarcated margins & tissue infection depth</span>
              </Link>

              <Link to="/gram-positive-vs-gram-negative" className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all block group">
                <span className="text-[9px] text-pink-405 font-bold uppercase tracking-wider block mb-1">Microbial Morphology</span>
                <span className="font-extrabold text-white text-xs sm:text-sm block group-hover:text-pink-300 transition-colors">Gram+ vs. Gram-</span>
                <span className="text-[10px] text-slate-500 block mt-1 leading-normal font-medium">Outer membranes, Lipid A, & porin channels</span>
              </Link>

              <Link to="/bactericidal-vs-bacteriostatic" className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all block group">
                <span className="text-[9px] text-amber-505 font-bold uppercase tracking-wider block mb-1">Pharmacology</span>
                <span className="font-extrabold text-white text-xs sm:text-sm block group-hover:text-amber-400 transition-colors">Cidal vs. Static</span>
                <span className="text-[10px] text-slate-500 block mt-1 leading-normal font-medium">ANC & meningitis therapy CSF constraints</span>
              </Link>
              
              <Link to="/app" className="p-4 bg-indigo-950 hover:bg-indigo-900 border border-indigo-850 hover:border-indigo-500/60 rounded-xl transition-all block text-center flex flex-col justify-center items-center group">
                <span className="font-black text-[10px] text-indigo-305 uppercase tracking-widest block mb-1 animate-pulse">Practice Sandbox</span>
                <span className="font-black text-white text-xs sm:text-sm block group-hover:scale-[1.01] transition-transform">Launch Practice App</span>
                <span className="text-[10px] text-indigo-205 block mt-0.5 leading-normal font-medium">Enter Study Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/40 py-6 text-center text-[10px] sm:text-[11px] text-slate-500 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
            <span>&copy; 2026 InfectAtlas. Built for medical training, clinical pharmacy, and boards prep.</span>
            <span className="hidden sm:inline text-slate-800">|</span>
            <Link to="/organisms" className="hover:underline text-indigo-455 font-extrabold cursor-pointer">
              Organisms
            </Link>
            <span className="text-slate-800 font-extrabold">|</span>
            <Link to="/diseases" className="hover:underline text-indigo-455 font-extrabold cursor-pointer">
              Diseases
            </Link>
            <span className="text-slate-800 font-extrabold">|</span>
            <Link to="/drugs" className="hover:underline text-indigo-455 font-extrabold cursor-pointer">
              Drugs
            </Link>
          </p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
            <span>IDSA Aligned Clinical Standards</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
