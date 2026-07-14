import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
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
  X,
  Target,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import InteractiveSandbox from "./InteractiveSandbox";

export default function HowItWorks() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLaunchApp = (focusTask: string) => {
    localStorage.setItem("infectatlas_active_tab", focusTask);
    navigate("/app/" + focusTask);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden" id="howitworks-root">
      
      {/* Sticky Navigation (Maintains identity consistency across legal/marketing pages) */}
      <PublicHeader handleLaunchApp={handleLaunchApp} />

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-rose-100 shadow-3xs p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-2.5 text-rose-700/90">
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

          <div className="bg-rose-50/50 border-l-4 border-rose-400/60 p-4.5 rounded-r-xl space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-rose-800/80 font-mono">
              The Illusion of Competence
            </h4>
            <div className="text-sm font-bold text-slate-800 leading-relaxed italic">
              "I've seen this before, so I know it."
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              But <strong className="text-rose-700/80">recognition is not recall</strong>. And recall is what board exams and stressful clinical wards actually measure.
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
        </motion.div>

        {/* INTERACTIVE STUDY SIMULATOR */}
        <div className="flex justify-center w-full mx-auto" id="interactive-simulator-container">
          <InteractiveSandbox />
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
                  <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">Bacteria</span>
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden"
        >
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">What makes InfectAtlas different</h3>
            </div>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-2xl">
              Most online tools organize knowledge by topic. We organize it by clinical confusion. That is the core difference.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 relative z-10">
            <div className="bg-white p-5 rounded-2xl border border-slate-250 shadow-3xs group transition-all hover:shadow-xs">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" /> Passively Taught:
              </span>
              <p className="text-xs font-bold text-slate-600 italic">"What is Staphylococcus aureus?"</p>
            </div>
            <div className="bg-indigo-600 p-5 rounded-2xl border border-indigo-500 shadow-md group transition-all hover:scale-[1.02]">
              <span className="text-[10px] uppercase font-black tracking-wider text-indigo-200 block mb-1.5 flex items-center gap-1.5">
                <Target className="h-3 w-3" /> InfectAtlas Dynamic:
              </span>
              <p className="text-xs font-bold text-white font-sans">"Can you distinguish Staphylococcus from Streptococcus under exam pressure?"</p>
            </div>
          </div>
        </motion.div>

        {/* Visual Connector */}
        <div className="flex justify-center items-center py-6 relative opacity-50">
           <div className="h-12 w-px bg-gradient-to-b from-slate-300 to-indigo-300" />
        </div>

        {/* SECTION: Actionables */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">What you can do inside InfectAtlas</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Explore Bacteria",
                desc: "Understand and scan structures of high-yield clinical bacterial profiles quickly.",
                icon: <Activity className="h-4 w-4" />
              },
              {
                title: "Compare Similar Pathogens",
                desc: "Study direct differences between matching bugs to eliminate common exam pitfalls.",
                icon: <GitCompare className="h-4 w-4" />
              },
              {
                title: "Take Instant Recall Quizzes",
                desc: "Convert content checklists into interactive test sessions to strengthen recall.",
                icon: <Zap className="h-4 w-4" />
              },
              {
                title: "Spaced Repetition Core",
                desc: "Review cards timed dynamically to prevent forgetting curves from clearing out memory.",
                icon: <RotateCcw className="h-4 w-4" />
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 hover:border-indigo-300 hover:shadow-sm transition-all group">
                <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors w-fit">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-extrabold text-slate-900 block">
                    {feature.title}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

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
      <PublicFooter />

    </div>
  );
}
