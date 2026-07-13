import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, LayoutDashboard, ShieldAlert } from "lucide-react";

export default function ContentUnavailable() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 font-sans antialiased selection:bg-indigo-150 selection:text-indigo-900">
      {/* Visual Floating Cards Backdrop decoration (Subtle & clean) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-indigo-300/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-center">
        {/* Animated Warning Icon Indicator */}
        <div className="mx-auto inline-flex items-center justify-center p-4 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-inner animate-pulse-subtle">
          <ShieldAlert className="h-8 w-8 text-indigo-650" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
            Study Path Unavailable
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
            The requested module path does not correspond to an active pathogen index, disease chapter, or practice sandbox in InfectAtlas.
          </p>
        </div>

        {/* Suggestion Box */}
        <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-left space-y-2">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block">
            Clinical Recommendation
          </span>
          <p className="text-[11.5px] text-slate-650 leading-relaxed font-medium">
            If you followed an outdated reference link or typed a custom path, use the options below to find the correct organism, antibiotic class, or active diagnostic recall session.
          </p>
        </div>

        {/* Stacked Primary Action Controls */}
        <div className="space-y-2.5 pt-2">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-250 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-3xs cursor-pointer active:scale-98"
          >
            <ArrowLeft className="h-4 w-4 text-slate-550" />
            Go Back to Previous Page
          </button>

          {/* Search Index */}
          <button
            onClick={() => navigate("/app/search")}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-extrabold transition-all shadow-sm cursor-pointer hover:scale-[1.01] active:scale-98"
          >
            <Search className="h-4 w-4" />
            Search InfectAtlas Database
          </button>

          {/* Dashboard */}
          <button
            onClick={() => navigate("/app/dashboard")}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-transparent hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-all cursor-pointer"
          >
            <LayoutDashboard className="h-4 w-4 text-slate-400" />
            Return to Study Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
