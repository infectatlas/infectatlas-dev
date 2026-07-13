import { useState } from "react";
import { Link } from "react-router-dom";
import { BrainCircuit, Zap, X } from "lucide-react";

interface PublicHeaderProps {
  handleLaunchApp: (route: string) => void;
  showHeader?: boolean; // Some pages use scroll-based showHeader
}

export default function PublicHeader({ handleLaunchApp, showHeader = true }: PublicHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`bg-white/90 backdrop-blur-md border-b border-slate-200/80 active:bg-white sticky top-0 z-50 w-full h-16 transition-transform duration-300 ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 relative">
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-indigo-600 rounded-lg p-1" title="Back to Homepage">
          <div className="p-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm shrink-0">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-indigo-600 transition-colors block leading-none">
              InfectAtlas
            </span>
            <span className="text-[9px] sm:text-[10px] text-indigo-600 font-bold uppercase tracking-wider block mt-1 leading-none">
              Medical Microbiology
            </span>
          </div>
        </Link>
        {/* Center Links (Desktop only, match homepage) */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" id="nav-links">
          <Link
            to="/organisms"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
          >
            Bacteria
          </Link>
          <Link
            to="/fungi"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
          >
            Fungi
          </Link>
          <Link
            to="/viruses"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
          >
            Viruses
          </Link>
          <Link
            to="/parasites"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
          >
            Parasites
          </Link>
          <Link
            to="/diseases"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
          >
            Diseases
          </Link>
          <Link
            to="/drugs"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
          >
            Drugs
          </Link>
          <Link
            to="/comparisons"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
          >
            Comparisons
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleLaunchApp("dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[36px] cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span>Study App</span>
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-indigo-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 animate-fade-in">
          <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
            <Link
              to="/organisms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            >
              Bacteria
            </Link>
            <Link
              to="/fungi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            >
              Fungi
            </Link>
            <Link
              to="/viruses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            >
              Viruses
            </Link>
            <Link
              to="/parasites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            >
              Parasites
            </Link>
            <Link
              to="/diseases"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            >
              Diseases
            </Link>
            <Link
              to="/drugs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            >
              Drugs
            </Link>
            <Link
              to="/comparisons"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            >
              Comparisons
            </Link>
            
            <div className="pt-4 border-t border-slate-100 mt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLaunchApp("dashboard");
                }}
                className="w-full py-3 text-center font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Study App</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
