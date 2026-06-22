import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  BrainCircuit, 
  ArrowLeft, 
  Layers, 
  HelpCircle, 
  GitCompare, 
  CheckCircle,
  Play,
  Zap,
  BookOpen,
  Activity,
  AlertTriangle,
  RotateCcw,
  X
} from "lucide-react";

export default function HowItWorks() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Interactive Sandbox state
  const [activeSandboxTab, setActiveSandboxTab] = useState<"flashcard" | "differentiate">("flashcard");
  const [demoFlip, setDemoFlip] = useState(false);
  const [demoScore, setDemoScore] = useState<string | null>(null);
  const [diffCategory, setDiffCategory] = useState<"staph_strep" | "legionella_mycoplasma">("staph_strep");

  const handleLaunchApp = (focusTask: string) => {
    localStorage.setItem("infectatlas_active_tab", focusTask);
    navigate("/app");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white" id="howitworks-root">
      
      {/* Sticky Navigation (Maintains identity consistency across legal/marketing pages) */}
      <nav id="sticky-header" className="sticky top-0 z-50 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-indigo-600 rounded-lg p-1" id="nav-logo">
            <div className="p-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm shrink-0">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight hover:text-indigo-600 transition-colors block leading-none font-sans">
                InfectAtlas
              </span>
              <span className="text-[9px] sm:text-[10px] text-indigo-600 font-bold uppercase tracking-wider block mt-1 leading-none font-sans">
                Medical Microbiology
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop only) */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" id="nav-links">
            <Link 
              to="/organisms" 
              className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            >
              Organisms
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

          {/* Right CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-3" id="nav-right">
            <button
              onClick={() => handleLaunchApp("dashboard")}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[36px] cursor-pointer flex items-center gap-1.5"
              id="cta-nav-start"
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span>Study App</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-indigo-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
            id="mobile-menu-trigger"
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
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 animate-fade-in" id="mobile-menu-drawer">
            <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
              <Link 
                to="/organisms" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
              >
                Organisms
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
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-16 space-y-12">
        
        {/* Page Top Header */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col gap-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-1" />
          
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[9px] sm:text-[10px] uppercase font-black tracking-wider text-indigo-300 border border-indigo-500/30 bg-indigo-950/40 rounded-full font-mono">
              Learning Methodology
            </span>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans">
              How InfectAtlas Works
            </h1>
            <p className="text-slate-350 text-base sm:text-lg lg:text-xl font-bold font-sans italic">
              Learn. Differentiate. Recall. Retain.
            </p>
          </div>
          <div className="border-t border-slate-800/80 pt-5 mt-2 text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl space-y-4">
            <p>
              Most medical resources help you <span className="text-indigo-305 underline decoration-indigo-400 font-bold">read information</span>.
            </p>
            <p>
              InfectAtlas is built to help you <span className="text-emerald-400 font-extrabold uppercase tracking-wide">remember it</span> when it matters.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 border-l-2 border-indigo-500 pl-3 italic">
              Medical exams don't test what you recognize — they test what you can retrieve under pressure. That's what this system is designed for.
            </p>
          </div>
        </div>

        {/* SECTION: Why passive learning fails */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-3xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 text-red-600">
            <AlertTriangle className="h-6 w-6 shrink-0" />
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Why traditional studying fails
            </h2>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            Most medical students rely on passive learning methods during coursework:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Reading Textbooks", icon: "📚" },
              { label: "Watching Videos", icon: "📺" },
              { label: "Highlighting Notes", icon: "🖍️" },
              { label: "Passive Flashcards", icon: "🎴" }
            ].map(item => (
              <div key={item.label} className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
                <span className="block text-xl mb-1.5">{item.icon}</span>
                <span className="text-xs font-bold text-slate-700 block">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-rose-50 border-l-4 border-rose-500 p-4.5 rounded-r-xl space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 font-mono">
              The Illusion of Competence
            </h4>
            <div className="text-sm font-bold text-rose-950 leading-relaxed italic">
              "I've seen this before, so I know it."
            </div>
            <p className="text-xs text-rose-800 leading-normal">
              But <strong>recognition is not recall</strong>. And recall is what board exams and stressful clinical wards actually measure.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3.5">
            <p className="text-slate-600 text-sm">
              In addition, similar organisms on paper often blur together under the ticking clock of an exam:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { title: "Staphylococcus vs. Streptococcus" },
                { title: "E. coli vs. Klebsiella" },
                { title: "Listeria vs. Bacillus" }
              ].map(comp => (
                <span key={comp.title} className="text-xs font-mono font-bold px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200/80 rounded-lg">
                  {comp.title}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              That confusion is highly predictable — and completely fixable.
            </p>
          </div>
        </div>

        {/* INTERACTIVE STUDY SIMULATOR */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800/80 shadow-2xl relative overflow-hidden space-y-6" id="interactive-simulator-container">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-1" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 text-[9px] uppercase font-black tracking-widest text-emerald-400 border border-emerald-500/20 bg-emerald-950/40 rounded-full font-mono">
                Interactive Sandbox
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                Try the Mechanics Live
              </h2>
              <p className="text-slate-400 text-xs font-semibold">
                Click below to experience active memory retrieval right now.
              </p>
            </div>

            {/* Selector Buttons */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/60 self-start sm:self-auto shrink-0">
              <button
                onClick={() => {
                  setActiveSandboxTab("flashcard");
                  setDemoFlip(false);
                  setDemoScore(null);
                }}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                  activeSandboxTab === "flashcard"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Active Flashcard
              </button>
              <button
                onClick={() => setActiveSandboxTab("differentiate")}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                  activeSandboxTab === "differentiate"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Differentiate Trait
              </button>
            </div>
          </div>

          {activeSandboxTab === "flashcard" ? (
            <div className="space-y-4 animate-fade-in" id="sandbox-flashcard">
              {/* Card Container */}
              <div 
                onClick={() => setDemoFlip(!demoFlip)}
                className={`bg-slate-950 p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  demoFlip ? "border-emerald-500/50 shadow-md shadow-emerald-950/20" : "border-slate-800 hover:border-indigo-500/65 hover:bg-slate-800/30"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-bold font-mono tracking-wider text-slate-500 mb-3 uppercase">
                  <span>Front: Prompt</span>
                  <span className="text-indigo-400 text-xs flex items-center gap-1 font-bold">
                    <RotateCcw className="h-3 w-3 inline" /> Click card to flip
                  </span>
                </div>

                {!demoFlip ? (
                  <div className="space-y-4">
                    <p className="text-slate-200 font-extrabold text-sm sm:text-base leading-relaxed">
                      "A patient with a deep, rusty nail puncture presents with locks of jaw muscles. The bug is an obligate anaerobe that is spore-forming. Name the bug and its precise cellular toxin trigger."
                    </p>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                        USMLE Step 1 High-Yield
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5 animate-fade-in">
                    <div className="space-y-1">
                      <span className="text-emerald-400 text-xs font-black uppercase tracking-wider font-mono">
                        Correct Answer:
                      </span>
                      <h4 className="text-lg font-black text-white">
                        Clostridium tetani & Tetanospasmin
                      </h4>
                    </div>
                    
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      The retrograde-transported toxin <strong className="text-white">Tetanospasmin</strong> cleaves <strong className="text-white font-mono">synaptobrevin (SNARE protein)</strong> inside inhibitory interneurons (Renshaw cells), blocking the release of <strong className="text-indigo-300">GABA & glycine</strong>.
                    </p>
                    <div className="bg-emerald-950/40 border border-emerald-500/20 p-2.5 rounded-lg text-xs text-emerald-300 italic">
                      💡 <strong>Clinical Pearl:</strong> Contrast with <span className="underline">C. botulinum</span> which blocks acetylcholine release at the neuromuscular junction, leading to flaccid paralysis instead of spastic.
                    </div>
                  </div>
                )}
              </div>

              {/* Simulated Spaced Repetition Buttons */}
              {demoFlip && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-3.5 animate-slide-up">
                  <div className="text-[10.5px] font-black tracking-widest uppercase text-slate-400 font-mono">
                    Self-Rate Your Active Retrieval:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setDemoScore("🔴 Assigned to repeat immediately (1 min)")}
                      className="px-3 py-2 bg-red-950/80 hover:bg-red-900 border border-red-500/30 rounded-lg text-xs font-extrabold text-red-300 transition-colors cursor-pointer"
                    >
                      Forgot (1 min)
                    </button>
                    <button
                      onClick={() => setDemoScore("🟡 Scheduled for repeat today (10 min)")}
                      className="px-3 py-2 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/30 rounded-lg text-xs font-extrabold text-amber-305 transition-colors cursor-pointer"
                    >
                      Hard (10 min)
                    </button>
                    <button
                      onClick={() => setDemoScore("🟢 Scheduled for tomorrow (1 day)")}
                      className="px-3 py-2 bg-emerald-955/80 hover:bg-emerald-900 border border-emerald-500/30 rounded-lg text-xs font-extrabold text-emerald-300 transition-colors cursor-pointer"
                    >
                      Good (1 day)
                    </button>
                    <button
                      onClick={() => setDemoScore("🔵 Mastered! Scheduled in 4 days")}
                      className="px-3 py-2 bg-blue-955/80 hover:bg-blue-900 border border-blue-500/30 rounded-lg text-xs font-extrabold text-blue-300 transition-colors cursor-pointer"
                    >
                      Easy (4 days)
                    </button>
                  </div>

                  {demoScore && (
                    <div className="text-xs font-bold text-indigo-300 font-mono py-1 animate-fade-in block">
                      🔄 Spaced Repetition Logic: {demoScore}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in" id="sandbox-differentiate">
              {/* Category selector */}
              <div className="flex gap-2.5 overflow-x-auto pb-1 relative z-10 scrollbar-none">
                <button
                  onClick={() => setDiffCategory("staph_strep")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                    diffCategory === "staph_strep"
                      ? "bg-slate-800 border-slate-600 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Staphylococcus vs Streptococcus
                </button>
                <button
                  onClick={() => setDiffCategory("legionella_mycoplasma")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                    diffCategory === "legionella_mycoplasma"
                      ? "bg-slate-800 border-slate-600 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Legionella vs Mycoplasma
                </button>
              </div>

              {diffCategory === "staph_strep" ? (
                <div className="bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs animate-fade-in">
                  <div className="flex items-center gap-1 text-slate-400 font-bold mb-1">
                    <span className="font-mono text-[10px] uppercase text-indigo-400">Head-to-Head Decider Traits</span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 pb-2 border-b border-slate-800 font-extrabold text-slate-400">
                      <div>Biological Trait</div>
                      <div>Staphylococcus</div>
                      <div>Streptococcus</div>
                    </div>

                    <div className="grid grid-cols-3 py-1 border-b border-slate-900 hover:bg-slate-900 p-1.5 rounded-md transition-colors">
                      <div className="font-bold text-slate-300">Gram Organization</div>
                      <div className="text-amber-300 font-bold font-mono">Clusters (grapes)</div>
                      <div className="text-slate-400 font-mono">Chains / Pairs</div>
                    </div>

                    <div className="grid grid-cols-3 py-1 border-b border-slate-900 hover:bg-slate-900 p-1.5 rounded-md transition-colors">
                      <div className="font-bold text-slate-300">Catalase enzyme</div>
                      <div className="text-red-405 font-black font-mono">Positive (+)</div>
                      <div className="text-slate-500 font-mono">Negative (-)</div>
                    </div>

                    <div className="grid grid-cols-3 py-1 hover:bg-slate-900 p-1.5 rounded-md transition-colors">
                      <div className="font-bold text-slate-350">Major Pathogens</div>
                      <div className="text-slate-205">S. aureus, S. epidermidis</div>
                      <div className="text-slate-205">S. pyogenes, S. pneumoniae</div>
                    </div>
                  </div>

                  <div className="bg-indigo-950/40 border border-indigo-500/10 p-3 rounded-lg text-slate-300 sm:leading-relaxed">
                    🎓 <strong>Clinical Trap:</strong> Catalase is the primary divider. Staph generates active bubbles in presence of hydrogen peroxide; Strep does not. This is card 01 on any exam!
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4 font-sans text-xs animate-fade-in">
                  <div className="flex items-center gap-1 text-slate-400 font-bold mb-1">
                    <span className="font-mono text-[10px] uppercase text-indigo-400">Head-to-Head Decider Traits</span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 pb-2 border-b border-slate-800 font-extrabold text-slate-400">
                      <div>Biological Trait</div>
                      <div>Legionella</div>
                      <div>Mycoplasma pneumoniae</div>
                    </div>

                    <div className="grid grid-cols-3 py-1 border-b border-slate-900 hover:bg-slate-900 p-1.5 rounded-md transition-colors">
                      <div className="font-bold text-slate-300">Cell Wall</div>
                      <div className="text-slate-400">Poorly-stained Gram-rod</div>
                      <div className="text-amber-300 font-bold">No cell wall (sterols)</div>
                    </div>

                    <div className="grid grid-cols-3 py-1 border-b border-slate-900 hover:bg-slate-900 p-1.5 rounded-md transition-colors">
                      <div className="font-bold text-slate-305">Systemic Signs</div>
                      <div className="text-red-405 font-bold">Hyponatremia, Diarrhea</div>
                      <div className="text-slate-300">Cold Agglutinins, Target Rash</div>
                    </div>

                    <div className="grid grid-cols-3 py-1 hover:bg-slate-900 p-1.5 rounded-md transition-colors">
                      <div className="font-bold text-slate-350">Culture Needs</div>
                      <div className="text-slate-205 font-mono font-bold">Charcoal Yeast (BCYE)</div>
                      <div className="text-slate-405 font-mono">Eaton Agar</div>
                    </div>
                  </div>

                  <div className="bg-indigo-950/40 border border-indigo-500/10 p-3 rounded-lg text-slate-300 sm:leading-relaxed">
                    🎓 <strong>Clinical Trap:</strong> Because Mycoplasma completely lacks a peptidoglycan cell wall, penicillin or cephalosporin drugs have <strong>zero target</strong>. Throwing a beta-lactam at walking pneumonia is a lethal mistake!
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION: The 4 layers */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider font-mono">
              Methodology Breakdown
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              The InfectAtlas Learning System
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold">
              InfectAtlas is built around how memory actually works: 
              <span className="text-indigo-650 ml-1">Memory is formed through retrieval, not exposure.</span>
            </p>
          </div>

          {/* 4 Layers Grid */}
          <div className="space-y-6">
            
            {/* Layer 1: Learn */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row gap-5 hover:border-indigo-200 transition-all shadow-3xs" id="layer-learn">
              <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Layer 01
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Learn (Knowledge Layer)
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Start with structured medical reference pages tailored specifically for immediate intake:
                </p>
                <div className="flex flex-wrap gap-2 text-slate-700 text-xs font-bold">
                  <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">Organisms</span>
                  <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">Diseases</span>
                  <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">Treatments (IV / PO)</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Each microorganism profile is constructed as a clean mental schema: identity markers, clinical patterns, and treatment tables. This constructs your initial baseline understanding. But understanding alone is not enough.
                </p>
              </div>
            </div>

            {/* Layer 2: Differentiate */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row gap-5 hover:border-emerald-200 transition-all shadow-3xs" id="layer-differentiate">
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <GitCompare className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Layer 02
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Differentiate (Compare Layer)
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  This is the step where most traditional studying fails. InfectAtlas actively targets similarity confusion points.
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Instead of studying topics in isolated tables, you train to distinguish close pairings side-by-side:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-slate-700">
                  <div className="bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-lg text-center">
                    Staph aureus vs. Strep pyogenes
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-lg text-center">
                    N. meningitidis vs. N. gonorrhoeae
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-2.5 py-2 rounded-lg text-center">
                    E. coli vs. Klebsiella pneumoniae
                  </div>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold text-slate-700">
                  Each comparison trains your brain to recognize key diagnostic separators, eliminate incorrect answers on questions, and bypass similarity interference.
                </p>
              </div>
            </div>

            {/* Layer 3: Recall */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row gap-5 hover:border-indigo-200 transition-all shadow-3xs" id="layer-recall">
              <div className="p-3 bg-purple-50 border border-purple-150 text-purple-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <Activity className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                    Layer 03
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Recall (Active Testing Engine)
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                  Reading tables is passive. InfectAtlas immediately converts what you read into questions.
                </p>
                <p className="text-slate-505 text-xs">
                  Whenever you explore, you can initiate immediate retrieval checks:
                </p>
                <ul className="list-disc pl-5 text-slate-550 text-xs space-y-1">
                  <li>Test yourself instantly using active flashcard flip counters.</li>
                  <li>Answer highly aligned organism-based diagnostic prompts.</li>
                  <li>Practice interactive treatment and susceptibility recall grids.</li>
                </ul>
                <p className="text-indigo-600 text-xs font-extrabold leading-normal bg-indigo-50 p-2.5 rounded-lg border border-indigo-100">
                  No passive scrolling. No postponing recall checks. Immediate active retrieval strengthens the neural pathways for retention.
                </p>
              </div>
            </div>

            {/* Layer 4: Retain */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row gap-5 hover:border-amber-200 transition-all shadow-3xs" id="layer-retain">
              <div className="p-3 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    Layer 04
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Retain (Spaced Repetition System)
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Forgetting is normal and clinically guaranteed. InfectAtlas schedules cards dynamically:
                </p>
                <ul className="list-disc pl-5 text-slate-555 text-xs space-y-1">
                  <li>Promotes weak cards automatically at shorter intervals.</li>
                  <li>Schedules mastered areas further into the future.</li>
                  <li>Saves your study effort for topics that are fading.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION: The Loop result */}
        <div className="bg-indigo-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-lg text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-bold">The result: how real mastery is built</h3>
          <p className="text-slate-350 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Most study platforms serve as a simple directory. InfectAtlas builds a tight, consistent loop:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 uppercase text-xs font-black tracking-widest text-indigo-200 py-3">
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg text-white">Learn</span>
            <ArrowRight className="h-3.5 w-3.5 hidden sm:block text-slate-500" />
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg text-emerald-300">Differentiate</span>
            <ArrowRight className="h-3.5 w-3.5 hidden sm:block text-slate-500" />
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg text-purple-300">Recall</span>
            <ArrowRight className="h-3.5 w-3.5 hidden sm:block text-slate-500" />
            <span className="bg-white/10 px-3.5 py-1.5 rounded-lg text-amber-300">Retain</span>
          </div>
          <p className="text-xs text-slate-400">
            This circular feedback loops transform flighty short-term impressions into robust long-term knowledge.
          </p>
        </div>

        {/* SECTION: What makes us different */}
        <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-mono">
            What makes InfectAtlas different
          </h3>
          <p className="text-slate-800 font-extrabold text-sm sm:text-base leading-relaxed">
            Most online tools organize knowledge by topic. We organize it by clinical confusion. That is the core difference.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-4.5 rounded-xl border border-slate-250">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">Passively Taught:</span>
              <p className="text-xs font-bold text-slate-600">"What is Staphylococcus aureus?"</p>
            </div>
            <div className="bg-white p-4.5 rounded-xl border border-indigo-200 shadow-2xs">
              <span className="text-[10px] uppercase font-black tracking-wider text-indigo-600 block mb-1">InfectAtlas Dynamic:</span>
              <p className="text-xs font-bold text-indigo-900 font-sans">"Can you distinguish Staphylococcus from Streptococcus under exam pressure?"</p>
            </div>
          </div>
        </div>

        {/* SECTION: Actionables */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">What you can do inside InfectAtlas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 hover:border-indigo-300 transition-colors">
              <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                Explore Organisms
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Understand and scan structures of high-yield clinical bacterial profiles quickly.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 hover:border-indigo-300 transition-colors">
              <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                Compare Similar Pathogens
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Study direct differences between matching bugs to eliminate common exam pitfalls.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 hover:border-indigo-300 transition-colors">
              <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                Take Instant Recall Quizzes
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Convert content checklists into interactive test sessions to strengthen recall.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 hover:border-indigo-300 transition-colors">
              <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                Spaced Repetition Core
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Review cards timed dynamically to prevent forgetting curves from clearing out memory.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: CTA */}
        <div className="bg-indigo-600 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-indigo-600/10">
          <div className="space-y-1 sm:max-w-md text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center justify-center sm:justify-start gap-1">
              <Zap className="h-4.5 w-4.5 fill-white" /> Start Learning the Right Way
            </h3>
            <p className="text-xs text-indigo-100">
              Stop re-reading. Trigger active retrieval on a high-yield pathogen profile today.
            </p>
          </div>
          <button
            onClick={() => handleLaunchApp("search")}
            className="px-5 py-2.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-indigo-700 font-black text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0 shadow-sm shadow-indigo-805/20 group"
          >
            <span>👉 Choose a Pathogen</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Philosophy Footer Card */}
        <div className="border-t border-slate-200 pt-8 text-center text-xs space-y-2">
          <p className="text-slate-500 font-semibold italic max-w-md mx-auto">
            "If you can't retrieve it under pressure, you don't know it yet."
          </p>
          <p className="text-[10.5px] font-black uppercase text-indigo-600 tracking-wider">
            InfectAtlas exists to fix that.
          </p>
        </div>

      </main>

      {/* Page Footer (Consistent layout) */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p>&copy; 2026 InfectAtlas. Strictly for educational study and prep. IDSA-Aligned.</p>
          <div className="flex justify-center gap-4 text-slate-500 font-bold">
            <Link to="/" className="hover:underline hover:text-indigo-600">Home</Link>
            <span>&bull;</span>
            <Link to="/organisms" className="hover:underline hover:text-indigo-600">Organisms</Link>
            <span>&bull;</span>
            <Link to="/diseases" className="hover:underline hover:text-indigo-600">Diseases</Link>
            <span>&bull;</span>
            <Link to="/drugs" className="hover:underline hover:text-indigo-600">Drugs</Link>
            <span>&bull;</span>
            <Link to="/comparisons" className="hover:underline hover:text-indigo-600">Comparisons</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
