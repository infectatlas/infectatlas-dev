import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Search, 
  X, 
  Activity, 
  Pill, 
  BookOpen, 
  Scale, 
  CheckCircle, 
  ChevronRight, 
  GraduationCap, 
  Clock,
  ShieldCheck,
  BrainCircuit,
  Heart,
  ClipboardList,
  Zap, Bug
} from "lucide-react";
import { microorganismsData } from "../data/microorganisms";
import { diseasesData } from "../data/diseases";
import { drugsData } from "../data/drugs";
import { COMPARISONS_DATA } from "./ComparisonsSEO";
import InteractiveSandbox from "./InteractiveSandbox";
import { getOrganismCanonicalUrl } from "../lib/organismUrlUtils";

interface SearchResultItem {
  type: "organism" | "disease" | "drug" | "comparison";
  title: string;
  subtitle: string;
  url: string;
  badgeText: string;
  badgeStyle: string;
}

export default function MarketingLandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleLaunchApp = (focusTask: string) => {
    localStorage.setItem("infectatlas_active_tab", focusTask);
    navigate("/app/" + focusTask);
  };

  // Close search suggestion overlay on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live search ranking and resolution
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      setResults([]);
      return;
    }

    const matchedResults: SearchResultItem[] = [];

    // 1. Search in Microorganisms
    microorganismsData.forEach(org => {
      const matchName = org.name.toLowerCase().includes(q);
      const matchClass = org.gramStatus.toLowerCase().includes(q) || org.shape.toLowerCase().includes(q);
      const matchDesc = org.description.toLowerCase().includes(q);
      
      if (matchName || matchClass || matchDesc) {
        matchedResults.push({
          type: "organism",
          title: org.name,
          subtitle: `${org.gramStatus} • ${org.shape}`,
          url: getOrganismCanonicalUrl(org),
          badgeText: org.gramStatus,
          badgeStyle: org.gramStatus === "Gram-positive" 
            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
            : org.gramStatus === "Gram-negative"
            ? "bg-rose-50 text-rose-700 border-rose-100"
            : "bg-indigo-50 text-indigo-700 border-indigo-100"
        });
      }
    });

    // 2. Search in Diseases
    diseasesData.forEach(dis => {
      const matchName = dis.name.toLowerCase().includes(q);
      const matchDesc = dis.metaDescription.toLowerCase().includes(q) || dis.overview.toLowerCase().includes(q);
      
      if (matchName || matchDesc) {
        matchedResults.push({
          type: "disease",
          title: dis.name,
          subtitle: dis.metaDescription.split("|")[0],
          url: `/diseases/${dis.slug}`,
          badgeText: "Clinical Infection",
          badgeStyle: "bg-amber-50 text-amber-700 border-amber-100"
        });
      }
    });

    // 3. Search in Drugs
    drugsData.forEach(drug => {
      const matchName = drug.name.toLowerCase().includes(q);
      const matchClass = drug.drugClass.toLowerCase().includes(q) || drug.mechanismOfAction.toLowerCase().includes(q);
      
      if (matchName || matchClass) {
        matchedResults.push({
          type: "drug",
          title: drug.name,
          subtitle: drug.drugClass,
          url: `/drugs/${drug.slug}`,
          badgeText: "Antimicrobial",
          badgeStyle: "bg-teal-50 text-teal-700 border-teal-100"
        });
      }
    });

    // 4. Search in Comparisons
    COMPARISONS_DATA.forEach(comp => {
      const matchTitle = comp.title.toLowerCase().includes(q);
      const matchSubtitle = comp.subtitle.toLowerCase().includes(q) || comp.intro.toLowerCase().includes(q);
      
      if (matchTitle || matchSubtitle) {
        matchedResults.push({
          type: "comparison",
          title: comp.title,
          subtitle: comp.subtitle,
          url: `/${comp.slug}`,
          badgeText: "Comparison",
          badgeStyle: "bg-slate-100 text-slate-700 border-slate-200"
        });
      }
    });

    // Prioritize results that match starting substring
    matchedResults.sort((a, b) => {
      const aStarts = a.title.toLowerCase().startsWith(q);
      const bStarts = b.title.toLowerCase().startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.title.localeCompare(b.title);
    });

    setResults(matchedResults.slice(0, 5));
  }, [searchQuery]);

  const handleSelectResult = (url: string) => {
    navigate(url);
    setIsFocused(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden" id="marketing-container">
      
      {/* 1. STICKY NAVIGATION */}
      <PublicHeader handleLaunchApp={handleLaunchApp} />      {/* 2. HERO SECTION */}
      <section id="hero-section" className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-indigo-50/15 to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center lg:items-start">
            
            {/* Intro Text */}
            <div className="lg:col-span-7 space-y-6 flex flex-col items-start" id="hero-text-content">
              
              {/* Category Highlight Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-155" id="hero-tag">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Active Recall Learning Platform</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-tight" id="hero-heading">
                Master Medical <br />
                <span className="text-indigo-600">Microbiology</span> Faster
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-[17.5px] text-slate-600 font-sans max-w-2xl leading-relaxed" id="hero-subheading">
                Master pathogens, diseases, and first-line treatments through active recall, boards-style flashcards, and evidence-based reference guides.
              </p>

              {/* Active Search Component Container */}
              <div ref={searchContainerRef} className="relative w-full max-w-md mt-2 z-35" id="hero-search-wrapper">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Search pathogens, drugs, or clinical diseases..."
                    className="block w-full pl-11 pr-10 py-3.5 text-[14.5px] bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-slate-205 shadow-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all focus:outline-none"
                    aria-label="Search pathogens, diseases, or drugs"
                    id="search-input-box"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-hidden"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Suggestions Overlay */}
                {isFocused && (results.length > 0 || searchQuery.trim() !== "") && (
                  <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-fade-in" id="search-suggestion-portal">
                    <div className="py-2.5 max-h-[380px] overflow-y-auto">
                      {results.length > 0 ? (
                        results.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(item.url)}
                            className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors border-b border-slate-200/50 last:border-0"
                            id={`search-result-item-${idx}`}
                          >
                            <div className="flex-1 min-w-0 pr-3">
                              <div className="text-[13.5px] font-bold text-slate-900 truncate">
                                {item.title}
                              </div>
                              <div className="text-[11.5px] text-slate-500 truncate mt-0.5">
                                {item.subtitle}
                              </div>
                            </div>
                            <span className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${item.badgeStyle}`}>
                              {item.badgeText}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-4 text-center text-[12.5px] text-slate-450 font-medium">
                          No resources found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2" id="hero-actions">
                <Link
                  to="/app"
                  className="bg-indigo-600 text-white font-bold text-[15px] py-3.5 px-7 rounded-xl border border-transparent shadow-sm hover:bg-indigo-700 hover:shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-505 focus:ring-offset-2 min-h-[48px] flex items-center justify-center gap-1.5"
                  id="hero-cta-start"
                >
                  <span>Start Studying Free</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/organisms"
                  className="bg-white text-slate-700 border border-slate-200 hover:border-slate-300 font-bold text-[15px] py-3.5 px-7 rounded-xl hover:bg-slate-52 transition duration-150 focus:outline-none min-h-[48px] flex items-center justify-center"
                  id="hero-cta-library"
                >
                  Browse Reference Library
                </Link>
              </div>

              {/* Credibility statement */}
              <div className="pt-4 border-t border-slate-100 w-full" id="hero-credibility">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
                  Built for USMLE, COMLEX, NCLEX, NAPLEX, and clinical rotations.
                </p>
              </div>
            </div>

            {/* Interactive Sandbox Preview */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end" id="hero-visual-panel">
              <InteractiveSandbox />
            </div>

          </div>
        </div>
      </section>

      {/* 3. TRUST INDICATORS (OUTCOME-FOCUSED STRIP) */}
      <section id="trust-strip" className="w-full bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3 p-2 group" id="trust-card-1">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">140+ High-Yield Pathogens</h3>
                <p className="text-xs text-slate-550 mt-1 leading-relaxed">
                  Every high-yield bacteria, virus, fungus, and parasite systematized for board exams.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 group" id="trust-card-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">IDSA-Aligned Regimens</h3>
                <p className="text-xs text-slate-550 mt-1 leading-relaxed">
                  First-line empirically validated recommendations matching standard clinical guidelines.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 group" id="trust-card-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Interactive Recall Exercises</h3>
                <p className="text-xs text-slate-550 mt-1 leading-relaxed">
                  Self-assessment templates using spaced repetition to reinforce active clinical retrieval.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 group" id="trust-card-4">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Built for Board Exams</h3>
                <p className="text-xs text-slate-550 mt-1 leading-relaxed">
                  Tailored structure targeted for USMLE, COMLEX, NCLEX, and NAPLEX preparation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (LEARNING LOOP) */}
      <section id="how-it-works" className="py-16 sm:py-20 w-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 font-sans block">
              The Learning Loop
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">
              Proven Learning Mechanics Built for Retention
            </h2>
            <p className="text-slate-550 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
              Stop passive re-reading. InfectAtlas reinforces your diagnostic recall systematically through circular active recall triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 relative hover:shadow-md transition duration-200" id="step-1">
              <div className="absolute top-6 right-6 text-slate-100 font-black text-4xl select-none font-mono">
                01
              </div>
              <div className="space-y-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 inline-block">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">1. Search & Browse</h3>
                  <p className="text-slate-550 text-xs mt-2 leading-relaxed">
                    Instantly research organisms, clinical infections, antimicrobials, and comparative lists on the high-yield registry.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 relative hover:shadow-md transition duration-200" id="step-2">
              <div className="absolute top-6 right-6 text-slate-100 font-black text-4xl select-none font-mono">
                02
              </div>
              <div className="space-y-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 inline-block">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">2. Test Your Memory</h3>
                  <p className="text-slate-550 text-xs mt-2 leading-relaxed">
                    Flip open active boards-style flashcards or start randomized study quizzes designed to expose quick diagnostic gaps.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 relative hover:shadow-md transition duration-200" id="step-3">
              <div className="absolute top-6 right-6 text-slate-100 font-black text-4xl select-none font-mono">
                03
              </div>
              <div className="space-y-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 inline-block">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">3. Reinforce with References</h3>
                  <p className="text-slate-550 text-xs mt-2 leading-relaxed">
                    Anchor correct answers with IDSA-aligned clinical monographs, comparative differentiation matrices, and biochemical keys.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. REFERENCE LIBRARY GRID */}
      <section id="reference-library-sec" className="py-16 sm:py-20 w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700 font-sans block">
              Reference Catalogues
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Clinical Reference Library
            </h2>
            <p className="text-slate-550 text-sm max-w-xl mx-auto leading-relaxed mt-1">
              Index high-yield medical microbiology topics dynamically with zero clutter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="library-catalogues-grid">
            
            {/* Library Card 1: Organisms */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all duration-200 flex flex-col justify-between h-56 group" id="lib-card-organisms">
              <div className="space-y-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100 inline-block">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    Bacteria Directory
                  </h3>
                  <p className="text-slate-550 text-xs mt-1.5 leading-relaxed font-medium">
                    Explore high-yield bacterial pathogens, Gram statuses, biochemistry arrangements, and physical profiles.
                  </p>
                </div>
              </div>
              <Link 
                to="/organisms" 
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline pt-2 group-hover:gap-1.5 transition-all text-left"
              >
                <span>Browse Bacteria</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Library Card: Fungi */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all duration-200 flex flex-col justify-between h-56 group" id="lib-card-fungi">
              <div className="space-y-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 inline-block">
                  <Bug className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                    Fungi Directory
                  </h3>
                  <p className="text-slate-550 text-xs mt-1.5 leading-relaxed font-medium">
                    Explore high-yield fungal pathogens, dimorphic transitions, spore morphologies, and clinical profiles.
                  </p>
                </div>
              </div>
              <Link 
                to="/fungi" 
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline pt-2 group-hover:gap-1.5 transition-all text-left"
              >
                <span>Browse Fungi</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Library Card 2: Diseases */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all duration-200 flex flex-col justify-between h-56 group" id="lib-card-diseases">
              <div className="space-y-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 inline-block">
                  <ClipboardList className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                    Clinical Disease profiles
                  </h3>
                  <p className="text-slate-550 text-xs mt-1.5 leading-relaxed font-medium">
                    Understand physical infectious presentation templates, diagnostic tests, and empiric protocols.
                  </p>
                </div>
              </div>
              <Link 
                to="/diseases" 
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline pt-2 group-hover:gap-1.5 transition-all text-left"
              >
                <span>Browse Diseases</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Library Card 3: Drugs */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all duration-200 flex flex-col justify-between h-56 group" id="lib-card-drugs">
              <div className="space-y-3">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg border border-teal-100 inline-block">
                  <Pill className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">
                    Antimicrobials Spectra
                  </h3>
                  <p className="text-slate-550 text-xs mt-1.5 leading-relaxed font-medium">
                    Review biochemical pharmacological mechanisms, spectrum coverage matrices, and warning toxicities.
                  </p>
                </div>
              </div>
              <Link 
                to="/drugs" 
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline pt-2 group-hover:gap-1.5 transition-all text-left"
              >
                <span>Browse Antimicrobials</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Library Card 4: Comparisons */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-white transition-all duration-200 flex flex-col justify-between h-56 group" id="lib-card-comparisons">
              <div className="space-y-3">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 inline-block">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                    Differential Comparisons
                  </h3>
                  <p className="text-slate-550 text-xs mt-1.5 leading-relaxed font-medium">
                    Analyze side-by-side diagnostic check matrices, medical examiner traps, and quick differentiation reviews.
                  </p>
                </div>
              </div>
              <Link 
                to="/comparisons" 
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline pt-2 group-hover:gap-1.5 transition-all text-left"
              >
                <span>Browse Comparisons</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. POPULAR CLINICAL COMPARISONS */}
      <section id="popular-comparisons" className="py-16 sm:py-20 w-full bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 font-sans block">
              Study Hotspots
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display italic">
              Popular Board Diferentials
            </h2>
            <p className="text-slate-550 text-sm max-w-xl mx-auto leading-relaxed mt-1">
              Classic diagnostic traps and high-frequency examination targets organized side-by-side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" id="comparisons-showcase-grid">
            
            {/* Comp 1: MRSA vs MSSA */}
            <Link 
              to="/mrsa-vs-mssa" 
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs hover:border-indigo-400 group hover:shadow-sm transition-all duration-150 flex flex-col justify-between h-52 text-left"
              id="comp-item-mrsa-mssa"
            >
              <div>
                <span className="text-[9px] font-black uppercase text-indigo-600 tracking-wider font-mono">
                  Bacteria Category
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors mt-1">
                  MRSA vs MSSA
                </h3>
                <p className="text-slate-550 text-xs mt-2 leading-relaxed">
                  Master the critical choice of empiric vancomycin versus targeted nafcillin or cefazolin therapy for S. aureus infections.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1 mt-4">
                <span>Examine Differential</span>
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 duration-150" />
              </span>
            </Link>

            {/* Comp 2: Vancomycin vs Linezolid */}
            <Link 
              to="/vancomycin-vs-linezolid" 
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs hover:border-indigo-400 group hover:shadow-sm transition-all duration-150 flex flex-col justify-between h-52 text-left"
              id="comp-item-vanc-lin"
            >
              <div>
                <span className="text-[9px] font-black uppercase text-teal-600 tracking-wider font-mono">
                  Pharmacology Category
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors mt-1">
                  Vancomycin vs Linezolid
                </h3>
                <p className="text-slate-550 text-xs mt-2 leading-relaxed">
                  Compare cell wall glycopeptides against 50S protein synthesis blockers for treating drug-resistant Gram-positives.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1 mt-4">
                <span>Examine Differential</span>
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 duration-150" />
              </span>
            </Link>

            {/* Comp 3: Cellulitis vs Erysipelas */}
            <Link 
              to="/cellulitis-vs-erysipelas" 
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs hover:border-indigo-400 group hover:shadow-sm transition-all duration-150 flex flex-col justify-between h-52 text-left"
              id="comp-item-cell-ery"
            >
              <div>
                <span className="text-[9px] font-black uppercase text-amber-605 tracking-wider font-mono">
                  Clinical Infection Category
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors mt-1">
                  Cellulitis vs Erysipelas
                </h3>
                <p className="text-slate-550 text-xs mt-2 leading-relaxed">
                  Distinguish deep dermal cellulitis from sharply margins raised superficial-lymphatic erysipelas.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1 mt-4">
                <span>Examine Differential</span>
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 duration-150" />
              </span>
            </Link>

            {/* Comp 4: Gram-Positive vs Gram-Negative */}
            <Link 
              to="/gram-positive-vs-gram-negative" 
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs hover:border-indigo-400 group hover:shadow-sm transition-all duration-150 flex flex-col justify-between h-52 text-left"
              id="comp-item-gram-status"
            >
              <div>
                <span className="text-[9px] font-black uppercase text-indigo-600 tracking-wider font-mono">
                  Microbiology Category
                </span>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors mt-1">
                  Gram Positive vs Negative
                </h3>
                <p className="text-slate-550 text-xs mt-2 leading-relaxed">
                  Contrast thick peptidoglycan cell walls with lipid-double bilayer outer membranes, LPS contents, and staining flags.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1 mt-4">
                <span>Examine Differential</span>
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 duration-150" />
              </span>
            </Link>

          </div>

          <div className="flex justify-center pt-6">
            <Link 
              to="/comparisons" 
              className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-750 hover:underline transition-all"
              id="all-comparisons-link"
            >
              <span>View All Board Differentials</span>
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. AUDIENCE SECTION */}
      <section id="audience-section" className="py-16 sm:py-20 w-full bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 font-sans block">
              Audience Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Designed for Every Stage of Healthcare Training
            </h2>
            <p className="text-slate-550 text-sm max-w-xl mx-auto leading-relaxed mt-2">
              Microbiology is foundational. InfectAtlas provides adaptive resolutions for medical, nursing, pharmacy, and clinical students at any step.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5" id="audience-chips">
            
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-200 transition-all font-semibold text-slate-750 text-sm" id="audience-med">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>Medical Students (MD/DO)</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/20 hover:border-emerald-200 transition-all font-semibold text-slate-750 text-sm" id="audience-pharm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Pharmacy Students (PharmD)</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/20 hover:border-amber-200 transition-all font-semibold text-slate-750 text-sm" id="audience-nursing">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Nursing & NP Students</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-teal-50/20 hover:border-teal-200 transition-all font-semibold text-slate-750 text-sm" id="audience-pa">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span>Physician Assistant Students</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-200 transition-all font-semibold text-slate-750 text-sm" id="audience-resident">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>Clinical Residents & Trainees</span>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <div className="px-4 py-8 sm:p-0 w-full bg-white">
        <section id="final-cta-section" className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 to-slate-900 text-white relative overflow-hidden text-center rounded-3xl sm:rounded-none w-full shadow-lg sm:shadow-none">
          
          {/* Background decorative vector grids */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <div className="absolute -top-12 -left-12 w-96 h-96 bg-indigo-505 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-emerald-505 rounded-full filter blur-xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display italic">
              Ready to remember microbiology instead of rereading it?
            </h2>
            <p className="text-indigo-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Stop losing clinical boards points. Activate dynamic testing templates with first-choice guidelines coverages completely free.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4 max-w-sm sm:max-w-none mx-auto">
              <Link
                to="/app"
                className="bg-white text-indigo-950 font-bold text-[15px] py-3.5 px-8 rounded-xl shadow-md hover:bg-slate-50 hover:shadow-lg transition duration-150 focus:outline-[3px] focus:outline-white min-h-[48px] flex items-center justify-center gap-1.5"
                id="final-cta-start"
              >
                <span>Start Studying Free</span>
                <ArrowRight className="h-4 w-4 text-indigo-700" />
              </Link>
              <Link
                to="/organisms"
                className="bg-indigo-950/40 text-indigo-100 hover:text-white border border-indigo-500/30 hover:border-indigo-400 font-bold text-[15px] py-3.5 px-8 rounded-xl transition duration-150 focus:outline-none min-h-[48px] flex items-center justify-center"
                id="final-cta-library"
              >
                Browse Reference Library
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 9. FOOTER */}
      <PublicFooter />

    </div>
  );
}
