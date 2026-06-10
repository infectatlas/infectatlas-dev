import { Layers, Search, Grid, BookOpen, Activity, ArrowRight, Zap, Award, CheckCircle, HelpCircle, Sparkles } from "lucide-react";

interface LandingPageProps {
  onStartStudying: (tab: "dashboard" | "search" | "flashcards" | "quiz" | "grid") => void;
}

export default function LandingPage({ onStartStudying }: LandingPageProps) {
  return (
    <div id="landing-page-container" className="space-y-12 pb-12">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden bg-radial from-indigo-900 via-slate-900 to-slate-950 rounded-3xl text-white py-12 px-6 sm:py-16 sm:px-12 md:py-20 md:px-16 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse">
            <Sparkles className="h-3.5 w-3.5" /> High-Yield Board Prep
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight bg-linear-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
            Master Medical Microbiology <br className="hidden sm:inline" />
            <span className="text-indigo-400">Pathogens, Diseases, and Treatments</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop relying on scattered flashcard decks. Retain critical pathogen-to-treatment linkages using clinical active recall, board exam vignettes, and interactive susceptibility matrices.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartStudying("dashboard")}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/35 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              Start Free Study Session <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onStartStudying("grid")}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold bg-slate-805/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Susceptibility Matrix
            </button>
          </div>
        </div>

        {/* Feature quick-stats for immediate alignment preview */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12 pt-10 border-t border-slate-800 text-center">
          <div>
            <div className="text-2xl font-black text-indigo-400">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">High-Yield Coverage</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-400">Active</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Recall System</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-400">Boards</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Clinical Vignettes</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-400">Empiric</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Antimicrobial Grids</div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY INFECTATLAS */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">The Problem</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Stop Memorizing in Silos. Connect the Dots.
          </h2>
          <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
            Medical students are forced to study microbiology in disjointed formats. You memorize Gram stains on one app, disease presentations in text banks, and treatments in clinical tables. 
            <strong className="text-indigo-650 font-semibold"> InfectAtlas</strong> consolidates these into a single mental matrix, uniting pathogens, diseases, and drugs of choice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-2.5">
            <div className="h-8 w-8 rounded-lg bg-red-50 text-red-650 flex items-center justify-center font-bold text-sm">✕</div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">Standard Memorization</h3>
            <p className="text-xs text-slate-600 leading-normal">
              Rote-learning isolated facts. You struggle to answer composite exam queries connecting Gram status to preferred therapy under clinical stress.
            </p>
          </div>
          <div className="bg-indigo-50/55 border border-indigo-150 p-5 rounded-xl space-y-2.5 md:scale-[1.03] shadow-xs relative">
            <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Optimal
            </div>
            <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">⚡</div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">InfectAtlas Mapping</h3>
            <p className="text-xs text-slate-600 leading-normal">
              A holistic <strong>Pathogen &rarr; Disease &rarr; Treatment</strong> loop. Learning a bug teaches you its clinical manifestation and treatment simultaneously.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-2.5">
            <div className="h-8 w-8 rounded-lg bg-red-50 text-red-650 flex items-center justify-center font-bold text-sm">✕</div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide">The "Exam-Day Panic"</h3>
            <p className="text-xs text-slate-600 leading-normal">
              Forgetting drug resistance or empiric rules on Step 1, Step 2 CK, or NCLEX because your study aids lacked comparative visual grids.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">The Workflow</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Three Steps to Microbiology Mastery</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Our study model matches the cognitive steps required to excel in clinical settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs relative">
            <div className="text-slate-300 font-extrabold text-3xl absolute top-4 right-5">01</div>
            <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-lg w-max mb-4">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Cross-Reference</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Deconstruct bugs instantly. Understand their clinical microbiology parameters, disease characteristics, and the precise empirical therapy in our catalog.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs relative">
            <div className="text-slate-300 font-extrabold text-3xl absolute top-4 right-5">02</div>
            <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-lg w-max mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Active Recall Review</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Test your recall on targeted attributes. Instead of reading lists passively, rate physical characteristics or antibiotic classifications until they are retained.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs relative">
            <div className="text-slate-300 font-extrabold text-3xl absolute top-4 right-5">03</div>
            <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-lg w-max mb-4">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Clinical Board Practice</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Simulate actual patient presentations. Read diagnostic details, analyze lab cultures, and select the correct empirical drug of choice under USMLE standards.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PRODUCT FEATURES (STRICTLY EXISTING) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">The Toolkit</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Built-in Modules Available Unlocked Right Now</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            InfectAtlas contains full-featured learning consoles immediately available in your browser session. No hidden modules or unfulfilled promises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start pb-6 border-b border-slate-100 sm:border-b-0">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
              <Grid className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Interactive Empiric Treatment Grid</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our dynamic susceptibility matrix maps coverage of Gram-positives, Gram-negatives, and atypical organisms. Click any cell to read the specific clinical rationale behind treatment choices.
              </p>
              <button onClick={() => onStartStudying("grid")} className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
                Go to Treatment Grid &rarr;
              </button>
            </div>
          </div>

          <div className="flex gap-4 items-start pb-6 border-b border-slate-100 sm:border-b-0">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl shrink-0 mt-0.5">
              <Layers className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Adaptive Recall Focus Chamber</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drill through micro-organism taxonomy, classifications, clinical pathologies, and preferred therapies. Confid-rate your recall to schedule upcoming study cycles where memory is weakest.
              </p>
              <button onClick={() => onStartStudying("dashboard")} className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
                Open Spaced Repetition Console &rarr;
              </button>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl shrink-0 mt-0.5">
              <Activity className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Board Vignette Practicum</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Put your knowledge to the test with real-world medical situations. Analyze clinical signs (e.g., green-sputum ICU ventilation symptoms or aspiration pneumonia complications) and match them with the right antimicrobials.
              </p>
              <button onClick={() => onStartStudying("quiz")} className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
                Launch Boards Practicum &rarr;
              </button>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl shrink-0 mt-0.5">
              <Search className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">High-Yield Microorganism Catalog</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly search, sort, and filter high-yield pathogens (e.g. S. aureus, Pseudomonas, Legionella). Group pathogens into custom study lists to organize key clinical boards parameters.
              </p>
              <button onClick={() => onStartStudying("search")} className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
                Search High-Yield Catalog &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRODUCT PREVIEW (LIVE INTERACTIVE WRAPPER) */}
      <section className="bg-radial from-slate-800 to-slate-950 rounded-2xl p-6 sm:p-10 border border-slate-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.15),transparent_40%)]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-550/15 border border-indigo-500/20 px-2.5 py-1 rounded-full w-max">
              Interactive Preview
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Active Recall Live Deck</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Below is a visual simulation of our core study layout. Hover or tap the interactive controls key on the interface to swap learning modules immediately!
            </p>
            
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-indigo-200">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Fast search by Gram stain status
              </div>
              <div className="flex items-center gap-2.5 text-xs text-indigo-200">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Drag-and-drop custom list builders
              </div>
              <div className="flex items-center gap-2.5 text-xs text-indigo-200">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Immediate rationale explainers
              </div>
            </div>
          </div>

          {/* Interactive Mockup Container */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-550" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-mono text-slate-500 ml-1">infectatlas.org/practice</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 rounded py-0.5">Practice View</span>
            </div>

            <div className="pt-4 space-y-4">
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
                <div className="flex justify-between items-start text-[10px]">
                  <span className="font-mono text-slate-500">MOCKUP PATHOGEN</span>
                  <span className="bg-red-400/15 text-red-300 font-extrabold tracking-wider px-1.5 py-0.5 rounded uppercase">Gram-Negative Rod</span>
                </div>
                <h4 className="font-black text-sm text-white mt-1">Pseudomonas aeruginosa</h4>
                <p className="text-[11px] text-slate-450 mt-1 leading-normal">
                  Common opportunistic pathogen in ICU patients. Known for multidrug resistance and blue-green pigment producing colonies.
                </p>
              </div>

              {/* Treatment and clinical indicators breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 rounded-lg p-2 px-3 border border-slate-850">
                  <div className="text-[9px] font-mono text-slate-500 uppercase">Primary Therapy</div>
                  <div className="text-[11px] font-bold text-emerald-300 mt-0.5">Piperacillin/Tazobactam</div>
                </div>
                <div className="bg-slate-950 rounded-lg p-2 px-3 border border-slate-850">
                  <div className="text-[9px] font-mono text-slate-500 uppercase">Alternative</div>
                  <div className="text-[11px] font-bold text-indigo-300 mt-0.5">Cefepime / Meropenem</div>
                </div>
              </div>

              {/* CTA switches tabs */}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => onStartStudying("search")}
                  className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-600 rounded-lg text-[11px] font-bold text-white transition-all cursor-pointer"
                >
                  Inspect Full Bug Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-850 to-violet-900 text-white rounded-2xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden border border-indigo-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_50%5)]" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <Award className="h-10 w-10 text-amber-300 mx-auto animate-bounce" />
          
          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
            Stop Guessing on Clinical Vignettes. <br />
            Secure Your Study Schedule.
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md mx-auto">
            InfectAtlas runs 100% locally in your session. All core micro boards features, study grids, and flashcards are completely free during our open pilot stage.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onStartStudying("dashboard")}
              className="w-full sm:w-auto px-7 py-3 bg-white hover:bg-slate-100 text-indigo-700 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all transform hover:scale-102 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              🚀 Learn Pathogens Instantly
            </button>
          </div>

          <div className="text-[10px] text-slate-300 font-medium pt-2">
            No registration or email credit cards required &bull; Perfect for USMLE Step 1, Step 2 CK, & NCLEX preparation.
          </div>
        </div>
      </section>
    </div>
  );
}
