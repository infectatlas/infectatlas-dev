import { useState } from "react";
import { RotateCcw } from "lucide-react";

export default function InteractiveSandbox() {
  // Interactive Sandbox state
  const [activeSandboxTab, setActiveSandboxTab] = useState<"flashcard" | "differentiate">("flashcard");
  const [demoFlip, setDemoFlip] = useState(false);
  const [demoScore, setDemoScore] = useState<string | null>(null);
  const [diffCategory, setDiffCategory] = useState<"staph_strep" | "legionella_mycoplasma">("staph_strep");

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800/80 shadow-2xl relative overflow-hidden space-y-6 w-full max-w-[500px]" id="interactive-simulator-container">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-1" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 text-[9px] uppercase font-black tracking-widest text-emerald-400 border border-emerald-500/20 bg-emerald-950/40 rounded-full font-mono">
            Interactive Sandbox
          </span>
          <h2 className="text-xl font-black tracking-tight text-white leading-tight mt-1">
            Try the Mechanics Live
          </h2>
          <p className="text-slate-400 text-[11px] font-semibold">
            Experience active memory retrieval right now.
          </p>
        </div>
      </div>

      {/* Selector Buttons */}
      <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/60 self-start sm:self-auto shrink-0 w-fit">
        <button
          onClick={() => {
            setActiveSandboxTab("flashcard");
            setDemoFlip(false);
            setDemoScore(null);
          }}
          className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
            activeSandboxTab === "flashcard"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-400 hover:text-white cursor-pointer"
          }`}
        >
          Active Flashcard
        </button>
        <button
          onClick={() => setActiveSandboxTab("differentiate")}
          className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
            activeSandboxTab === "differentiate"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-400 hover:text-white cursor-pointer"
          }`}
        >
          Differentiate
        </button>
      </div>

      {activeSandboxTab === "flashcard" ? (
        <div className="space-y-4 animate-fade-in" id="sandbox-flashcard">
          {/* Card Container */}
          <div 
            onClick={() => setDemoFlip(!demoFlip)}
            className={`bg-slate-950 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
              demoFlip ? "border-emerald-500/50 shadow-md shadow-emerald-950/20" : "border-slate-800 hover:border-indigo-500/65 hover:bg-slate-800/30"
            }`}
          >
            <div className="flex justify-between items-center text-[10px] font-bold font-mono tracking-wider text-slate-500 mb-3 uppercase">
              <span>Front: Prompt</span>
              <span className="text-indigo-400 text-[10px] flex items-center gap-1 font-bold">
                <RotateCcw className="h-3 w-3 inline" /> Click to flip
              </span>
            </div>

            {!demoFlip ? (
              <div className="space-y-4">
                <p className="text-slate-200 font-extrabold text-sm leading-relaxed">
                  "A patient with a deep, rusty nail puncture presents with locks of jaw muscles. The bug is an obligate anaerobe that is spore-forming. Name the bug and its precise cellular toxin trigger."
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                    USMLE Step 1 High-Yield
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider font-mono">
                    Correct Answer:
                  </span>
                  <h4 className="text-sm font-black text-white">
                    Clostridium tetani & Tetanospasmin
                  </h4>
                </div>
                
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  The retrograde-transported toxin <strong className="text-white">Tetanospasmin</strong> cleaves <strong className="text-white font-mono">synaptobrevin (SNARE protein)</strong> inside inhibitory interneurons, blocking the release of <strong className="text-indigo-300">GABA & glycine</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Simulated Spaced Repetition Buttons */}
          {demoFlip && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-2.5 animate-slide-up">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setDemoScore("🔴 1 min"); }}
                  className="px-2 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/30 rounded-lg text-[10px] font-extrabold text-red-300 transition-colors cursor-pointer"
                >
                  Forgot (1m)
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDemoScore("🟡 10 min"); }}
                  className="px-2 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/30 rounded-lg text-[10px] font-extrabold text-amber-305 transition-colors cursor-pointer"
                >
                  Hard (10m)
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDemoScore("🟢 1 day"); }}
                  className="px-2 py-1.5 bg-emerald-955/80 hover:bg-emerald-900 border border-emerald-500/30 rounded-lg text-[10px] font-extrabold text-emerald-300 transition-colors cursor-pointer"
                >
                  Good (1d)
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDemoScore("🔵 4 days"); }}
                  className="px-2 py-1.5 bg-blue-955/80 hover:bg-blue-900 border border-blue-500/30 rounded-lg text-[10px] font-extrabold text-blue-300 transition-colors cursor-pointer"
                >
                  Easy (4d)
                </button>
              </div>

              {demoScore && (
                <div className="text-[10px] font-bold text-indigo-300 font-mono py-0.5 animate-fade-in block">
                  🔄 Scheduled: {demoScore}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in" id="sandbox-differentiate">
          {/* Category selector */}
          <div className="flex gap-2 overflow-x-auto pb-1 relative z-10 no-scrollbar">
            <button
              onClick={() => setDiffCategory("staph_strep")}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                diffCategory === "staph_strep"
                  ? "bg-slate-800 border-slate-600 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Staph vs Strep
            </button>
            <button
              onClick={() => setDiffCategory("legionella_mycoplasma")}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                diffCategory === "legionella_mycoplasma"
                  ? "bg-slate-800 border-slate-600 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Legionella vs Mycoplasma
            </button>
          </div>

          {diffCategory === "staph_strep" ? (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-sans text-[11px] animate-fade-in">
              <div className="flex items-center gap-1 text-slate-400 font-bold mb-1">
                <span className="font-mono text-[9px] uppercase text-indigo-400">Head-to-Head Decider Traits</span>
              </div>

              <div className="space-y-2 overflow-x-auto no-scrollbar">
                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] pb-1.5 border-b border-slate-800 font-extrabold text-slate-400 text-[10px]">
                  <div>Trait</div>
                  <div>Staph</div>
                  <div>Strep</div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] py-1 border-b border-slate-900 hover:bg-slate-900 p-1 rounded transition-colors">
                  <div className="font-bold text-slate-300">Organization</div>
                  <div className="text-amber-300 font-bold font-mono">Clusters</div>
                  <div className="text-slate-400 font-mono">Chains</div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] py-1 border-b border-slate-900 hover:bg-slate-900 p-1 rounded transition-colors">
                  <div className="font-bold text-slate-300">Catalase</div>
                  <div className="text-red-405 font-black font-mono">Pos (+)</div>
                  <div className="text-slate-500 font-mono">Neg (-)</div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] py-1 hover:bg-slate-900 p-1 rounded transition-colors">
                  <div className="font-bold text-slate-300">Skin Finding</div>
                  <div className="text-emerald-300 font-bold">Abscess</div>
                  <div className="text-slate-400">Erysipelas</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-sans text-[11px] animate-fade-in">
              <div className="flex items-center gap-1 text-slate-400 font-bold mb-1">
                <span className="font-mono text-[9px] uppercase text-amber-400">Head-to-Head Decider Traits</span>
              </div>

              <div className="space-y-2 overflow-x-auto no-scrollbar">
                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] pb-1.5 border-b border-slate-800 font-extrabold text-slate-400 text-[10px]">
                  <div>Trait</div>
                  <div>Legionella</div>
                  <div>Mycoplasma</div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] py-1 border-b border-slate-900 hover:bg-slate-900 p-1 rounded transition-colors">
                  <div className="font-bold text-slate-300">Labs</div>
                  <div className="text-red-400 font-bold font-mono">Hyponatremia</div>
                  <div className="text-slate-400 font-mono">Cold agglutinins</div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] py-1 border-b border-slate-900 hover:bg-slate-900 p-1 rounded transition-colors">
                  <div className="font-bold text-slate-300">Symptoms</div>
                  <div className="text-emerald-300 font-black font-mono">GI / Diarrhea</div>
                  <div className="text-slate-400 font-mono">Walking PNA</div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] min-w-[280px] py-1 hover:bg-slate-900 p-1 rounded transition-colors">
                  <div className="font-bold text-slate-300">Exposure</div>
                  <div className="text-amber-300 font-bold">Water / AC</div>
                  <div className="text-slate-400">Dorms / Military</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
