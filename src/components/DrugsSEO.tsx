import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { drugsData, Drug, DrugPathogenRelation, DrugDiseaseRelation } from "../data/drugs";
import {
  ArrowLeft,
  BrainCircuit,
  Search,
  BookOpen,
  Pill,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Table,
  Check,
  Zap,
  BookmarkPlus,
  Stethoscope,
  Heart,
  HelpCircle,
  Brain,
  Filter,
  RotateCcw,
  Database,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Award
} from "lucide-react";
import ActiveRecallDrawer from "./ActiveRecallDrawer";

// Helper to categorize drugs for filters
const CLASS_FILTERS = [
  { id: "all", name: "All Agents" },
  { id: "penicillins", name: "Penicillins/Combinations" },
  { id: "cephalosporins", name: "Cephalosporins" },
  { id: "carbapenems", name: "Carbapenems" },
  { id: "protein-inhibitors", name: "Protein Inhibitors" },
  { id: "quinolones", name: "Fluoroquinolones" },
  { id: "others", name: "Other Classes" }
];

export const getDrugStyle = (cat: string) => {
  switch (cat) {
    case "antibacterial":
      return {
        accentLine: "border-l-emerald-500",
        hover: "hover:border-emerald-300 hover:shadow-emerald-50/40",
        pill: "bg-emerald-50 text-emerald-850 border-emerald-100",
        accentText: "text-emerald-600"
      };
    case "antiviral":
      return {
        accentLine: "border-l-rose-500",
        hover: "hover:border-rose-300 hover:shadow-rose-50/40",
        pill: "bg-rose-50 text-rose-850 border-rose-100",
        accentText: "text-rose-600"
      };
    case "antifungal":
      return {
        accentLine: "border-l-purple-500",
        hover: "hover:border-purple-300 hover:shadow-purple-50/40",
        pill: "bg-purple-50 text-purple-850 border-purple-100",
        accentText: "text-purple-600"
      };
    default:
      return {
        accentLine: "border-l-amber-500",
        hover: "hover:border-amber-300 hover:shadow-amber-50/40",
        pill: "bg-amber-50 text-amber-800 border-amber-100",
        accentText: "text-amber-700"
      };
  }
};

export default function DrugsSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug: routeSlug } = useParams<{ slug?: string }>();

  // Determine active slug
  const slug = routeSlug || (location.pathname.startsWith("/drugs/") ? location.pathname.substring("/drugs/".length) : undefined);
  const isDetailView = !!slug;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [activeCategory, setActiveCategory] = useState<"all" | "antibacterial" | "antiviral" | "antifungal">("all");

  // Dynamic Smart Header state on scroll
  const [showHeader, setShowHeader] = useState(true);

  // Contextual Active Recall Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerEntityId, setDrawerEntityId] = useState("");
  const [drawerEntityName, setDrawerEntityName] = useState("");
  const [drawerEntityType, setDrawerEntityType] = useState<"organism" | "disease" | "drug">("drug");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 80) {
        setShowHeader(true);
        lastScrollY = currentScrollY;
        return;
      }
      const diff = Math.abs(currentScrollY - lastScrollY);
      if (diff > 12) {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false); // scrolling down
        } else {
          setShowHeader(true); // scrolling up
        }
        lastScrollY = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Locate current drug if detail view
  const drug = isDetailView
    ? drugsData.find((d) => d.slug === slug || d.id.toLowerCase() === slug?.toLowerCase())
    : undefined;

  // Jump to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Launch interactive app console
  const handleLaunchApp = (focusTask: string) => {
    localStorage.setItem("study_focus_preference", focusTask);
    navigate("/app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTriggerRecall = (type: "organism" | "disease" | "drug", id: string, name: string) => {
    setDrawerEntityType(type);
    setDrawerEntityId(id);
    setDrawerEntityName(name);
    setDrawerOpen(true);
  };

  // Dynamic Browser SEO Page Meta update
  useEffect(() => {
    if (isDetailView && drug) {
      // 1. Dynamic Search-Intent Title (Aim for 50-70 characters)
      const pageTitle = `${drug.name}: MoA, Spectrum, Adverse Effects & Board Pearls | InfectAtlas`;
      document.title = pageTitle;

      // 2. High-Yield Meta Description under 160 characters
      const metaDesc = `Study ${drug.name} (${drug.drugClass}) mechanism of action, spectrum of activity, warnings, monitoring, and high-yield board review concepts for USMLE and NCLEX.`;

      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', metaDesc);

      // Canonical link
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', `https://infectatlas.com/drugs/${drug.slug}`);

      // Inject Schema.org JSON-LD structured data for search engine discovery
      const schemaMarkup = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalWebPage",
            "@id": `https://infectatlas.com/drugs/${drug.slug}#medicalwebpage`,
            "url": `https://infectatlas.com/drugs/${drug.slug}`,
            "name": `${drug.name} Pharmacology Study Guide (USMLE/NCLEX)`,
            "description": metaDesc,
            "about": {
              "@type": "Drug",
              "name": drug.name,
              "activeIngredient": drug.name,
              "mechanismOfAction": drug.mechanismOfAction,
              "proprietaryName": drug.name,
              "drugClass": {
                "@type": "MedicalDrugClass",
                "name": drug.drugClass
              }
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": `https://infectatlas.com/drugs/${drug.slug}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://infectatlas.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Antimicrobial Directory",
                "item": "https://infectatlas.com/drugs"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": drug.name,
                "item": `https://infectatlas.com/drugs/${drug.slug}`
              }
            ]
          }
        ]
      };

      const existingScript = document.getElementById("drug-seo-jsonld");
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schemaMarkup);
      } else {
        const script = document.createElement("script");
        script.id = "drug-seo-jsonld";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schemaMarkup);
        document.head.appendChild(script);
      }

      return () => {
        const currentScript = document.getElementById("drug-seo-jsonld");
        if (currentScript) {
          currentScript.remove();
        }
      };
    } else {
      // General directory titles
      document.title = "High-Yield Medical Drugs Directory & Study Guides | InfectAtlas";
      
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute(
          "content",
          "Explore our compendium of high-yield medical drugs (including antibiotics, antivirals, and antifungals) with detailed mechanism of action, spectrum, and pearls."
        );
      }

      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute("href", "https://infectatlas.com/drugs");
      }

      const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "@id": "https://infectatlas.com/drugs#directorywebpage",
        "url": "https://infectatlas.com/drugs",
        "name": "Antimicrobial Reference Index & Study Dashboard",
        "description": "Index of critical clinical human antimicrobials featuring spectrum details, side effects, contraindications, and high-yield cards.",
        "about": {
          "@type": "MedicalSpecialty",
          "name": "Infectious Diseases / Pharmacology"
        }
      };

      const existingScript = document.getElementById("directory-drugs-jsonld");
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schemaMarkup);
      } else {
        const script = document.createElement("script");
        script.id = "directory-drugs-jsonld";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schemaMarkup);
        document.head.appendChild(script);
      }

      return () => {
        const currentScript = document.getElementById("directory-drugs-jsonld");
        if (currentScript) {
          currentScript.remove();
        }
      };
    }
  }, [isDetailView, drug]);

  // Scroll to page top upon entering routes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  // Filter logic helper
  const matchesFilterClass = (d: Drug, filter: string): boolean => {
    if (filter === "all") return true;
    const drugClass = d.drugClass.toLowerCase();
    
    if (filter === "penicillins") {
      return drugClass.includes("penicillin");
    }
    if (filter === "cephalosporins") {
      return drugClass.includes("cephalosporin");
    }
    if (filter === "carbapenems") {
      return drugClass.includes("carbapenem");
    }
    if (filter === "protein-inhibitors") {
      return (
        drugClass.includes("macrolide") ||
        drugClass.includes("tetracycline") ||
        drugClass.includes("lincosamide") ||
        drugClass.includes("oxazolidinone") ||
        drugClass.includes("aminoglycoside")
      );
    }
    if (filter === "quinolones") {
      return drugClass.includes("fluoroquinolone") || drugClass.includes("quinolone");
    }
    if (filter === "others") {
      return (
        drugClass.includes("glycopeptide") ||
        drugClass.includes("lipopeptide") ||
        drugClass.includes("nitroimidazole") ||
        drugClass.includes("folate") ||
        drugClass.includes("antiseptic") ||
        drugClass.includes("rifamycin")
      );
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" id="drug-seo-root">
      
      {/* Pristine Master Header */}
      <header className={`bg-white border-b border-slate-200 active:bg-white sticky top-0 z-20 w-full h-16 transition-transform duration-300 ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
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
              className="px-4 py-2 text-[14px] font-semibold text-indigo-600 bg-indigo-50/50 focus:outline-indigo-600 rounded-lg transition-colors"
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLaunchApp("dashboard")}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[36px] cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span>Study App</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {isDetailView ? (
          !drug ? (
            /* Drug Not Found Error View */
            <div className="text-center py-16 space-y-4">
              <Pill className="h-12 w-12 text-slate-350 mx-auto" />
              <h2 className="text-xl font-bold text-slate-850">Antimicrobial Profile Not Active</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                The requested antimicrobial agent identifier is either unrecognized or currently undergoing peer review for medical accuracy alignment.
              </p>
              <Link to="/drugs" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-3xs">
                Back to Reference Directory
              </Link>
            </div>
          ) : (
            /* ================================= DETAILED DRUG PHARMACOLOGY VIEW ================================= */
            <div className="space-y-8 animate-fade-in">
              
              {/* Breadcrumb path */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Link
                  to="/drugs"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-bold transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Antimicrobial Directory</span>
                </Link>
              </div>

              {/* Main Heading Group */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center animate-pulse-subtle">
                  <span className="bg-indigo-650 text-white font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-xs">
                    Board Review Pharmacology
                  </span>
                  <span className="bg-emerald-50 border border-emerald-150 text-emerald-850 font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                    <Pill className="h-3 w-3 text-emerald-500 shrink-0" />
                    {drug.drugClass}
                  </span>
                  <span className="bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full">
                    USMLE High-Yield
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {drug.name}
                </h1>

                {/* Horizontal Jumpbar navigation */}
                <div className="bg-slate-100/90 p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold text-slate-500 border border-slate-200 hide-scrollbar scroll-smooth">
                  <span className="text-[10px] uppercase font-bold text-slate-400 px-2 select-none shrink-0 border-r border-slate-200 pr-3">Jump To:</span>
                  <button onClick={() => scrollToSection("overview")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Mechanism</button>
                  <button onClick={() => scrollToSection("spectrum")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Spectrum of Activity</button>
                  <button onClick={() => scrollToSection("indications")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Common Indications</button>
                  <button onClick={() => scrollToSection("safety-warnings")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Safety & Side Effects</button>
                  <button onClick={() => scrollToSection("monitoring")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Monitoring Parameters</button>
                  <button onClick={() => scrollToSection("pearls")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Clinical Pearls</button>
                  <button onClick={() => scrollToSection("relationships")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-650 shrink-0 cursor-pointer border border-slate-200/50">Clinical Cross-links</button>
                </div>

                {/* Substantive intro */}
                <div className="bg-emerald-50/40 border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-3xs" id="overview">
                  <h2 className="text-[10px] font-black uppercase text-emerald-800 tracking-wider mb-1">Mechanism and Biochemical Class:</h2>
                  <p className="text-sm sm:text-base text-slate-850 leading-relaxed font-semibold">
                    {drug.mechanismOfAction}
                  </p>
                </div>
              </div>

              {/* Layout Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Center / Left Content Column */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* CONVERSION BAR 1: Call to Action */}
                  <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 border border-indigo-805 shadow-md">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] uppercase font-bold text-indigo-305 tracking-wider flex items-center justify-center sm:justify-start gap-1">
                        <Zap className="h-3.5 w-3.5 fill-indigo-400 text-indigo-400" />
                        Antimicrobial Susceptibility Matrix
                      </span>
                      <p className="text-xs text-indigo-150 font-semibold leading-relaxed">
                        Interactive cross-referencing of <strong className="text-white font-bold">{drug.name}</strong> against Gram-positives, Gram-negatives, and anaerobes.
                      </p>
                    </div>
                    <button
                      onClick={() => handleLaunchApp("grid")}
                      className="w-full sm:w-auto bg-white hover:bg-indigo-50 text-indigo-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-sm"
                    >
                      Open Susceptibility Grid
                    </button>
                  </div>

                  {/* Section: Spectrum of Activity */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 scroll-mt-24" id="spectrum">
                    <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 border-b border-rose-100 pb-2.5">
                      <Sparkles className="h-4 w-4 text-pink-500" />
                      Antimicrobial Coverage Spectrum
                    </h2>
                    <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                      Pathogens are structurally vulnerable or resistant based on cellular membrane characteristics and biochemical affinities:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {drug.spectrumOfActivity.map((spec, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-start gap-2.5 border border-slate-150">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-800 font-bold leading-normal">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Common Indications */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 scroll-mt-24" id="indications">
                    <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 border-b border-rose-100 pb-2.5">
                      <Stethoscope className="h-4 w-4 text-indigo-500 animate-pulse-subtle" />
                      Common Board Exam & Guideline Indications
                    </h2>
                    <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                      Recommended clinical indications matching the CDC, IDSA guidelines, and standard board curricula (USMLE, NCLEX, COMLEX):
                    </p>
                    <div className="space-y-3 pt-1">
                      {drug.commonIndications.map((ind, i) => (
                        <div key={i} className="p-4 bg-emerald-50/30 rounded-xl border border-emerald-100 flex items-start gap-3">
                          <div className="p-1 bg-emerald-100 text-emerald-850 rounded-lg shrink-0 mt-0.5 shadow-3xs">
                            <CheckCircle className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-850 font-bold leading-relaxed">{ind}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Safety, Warnings & Adverse Effects */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 scroll-mt-24" id="safety-warnings">
                    
                    <div className="space-y-4">
                      <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 border-b border-rose-100 pb-2.5">
                        <ShieldAlert className="h-4 w-4 text-rose-500" />
                        Pathological Adverse Effects
                      </h2>
                      <div className="grid grid-cols-1 gap-3">
                        {drug.adverseEffects.map((ae, i) => (
                          <div key={i} className="p-4 bg-rose-50/40 border border-rose-100 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-800 font-bold leading-relaxed">{ae}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-4">
                      <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-tight flex items-center gap-1.5">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Major Contraindications & Precautions
                      </h3>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <ul className="text-xs text-slate-700 space-y-2 pl-4 list-disc leading-relaxed font-semibold">
                          {drug.contraindications.map((contra, i) => (
                            <li key={i}>{contra}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>

                  {/* Section: Monitoring Considerations */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 scroll-mt-24" id="monitoring">
                    <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 border-b border-rose-100 pb-2.5">
                      <Heart className="h-4 w-4 text-amber-550" />
                      High-Priority Monitoring & Safeguards
                    </h2>
                    <p className="text-xs text-slate-550 leading-relaxed font-semibold font-sans">
                      To prevent systemic toxicity or chronic complications, medical clinicians must organize ongoing laboratory/kinetic surveillance parameters:
                    </p>
                    <div className="space-y-3">
                      {drug.monitoringConsiderations.map((mon, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/50">
                          <span className="font-mono text-xs font-extrabold text-slate-400 mt-0.5">{(i + 1).toString().padStart(2, '0')}.</span>
                          <p className="text-xs text-slate-755 font-semibold leading-relaxed">{mon}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Clinical Pearls */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-2xs space-y-3.5 scroll-mt-24" id="pearls">
                    <h2 className="text-xs font-black text-amber-900 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-amber-200/50">
                      <Award className="h-4 w-4 text-amber-600 animate-pulse-subtle" />
                      Academic & Clinical Study Pearls (USMLE / COMLEX / NCLEX)
                    </h2>
                    <div className="space-y-3.5 font-sans">
                      {drug.clinicalPearls.map((pearl, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="p-1 px-2.5 bg-amber-100 border border-amber-250/50 rounded-md text-amber-800 text-[11px] font-black shrink-0 mt-0.5 shadow-3xs">
                            PEARL
                          </div>
                          <p className="text-xs text-amber-950 font-bold leading-relaxed">
                            {pearl}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right-Hand Clinical Info & Links Sidebar */}
                <div className="space-y-6">

                  {/* Quick Identification Desk */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                      <BookOpen className="h-4 w-4 text-emerald-505" />
                      Clinical Rapid-Review
                    </h2>
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col gap-0.5">
                        <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Classification</span>
                        <span className="text-slate-800 font-extrabold">{drug.drugClass}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col gap-0.5">
                        <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Absorption Profile</span>
                        <span className="text-slate-800 font-extrabold">
                          {drug.id.includes("vancomycin") ? "IV (100% systemic), PO (0% systemic)" : "Agent-specific (check bioavailability kinetics)"}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col gap-0.5">
                        <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Guideline Source</span>
                        <span className="text-slate-850 font-bold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          IDSA Empirical Alignments
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Related Entities Map (Clinical Relationships) */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 scroll-mt-24 font-sans" id="relationships">
                    <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                      <Database className="h-4 w-4 text-indigo-505" />
                      Pathogen & Disease Cross-links
                    </h2>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Click related profiles in our clinical library to jump to their specific pathology, biochemistry, and visual diagnostics:
                    </p>

                    <div className="space-y-4 pt-1">
                      
                      {/* Pathogens relation block */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-extrabold uppercase text-slate-450 tracking-wider">Target Pathogens ({drug.relatedPathogens.length})</h4>
                        <div className="flex flex-col gap-1.5">
                          {drug.relatedPathogens.map((pathRelation, i) => (
                            <Link
                              key={i}
                              to={`/organisms/${pathRelation.id}`}
                              className="group p-2.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-150 hover:border-indigo-150 rounded-xl flex items-center justify-between text-xs transition-all"
                            >
                              <span className="font-bold text-slate-800 group-hover:text-indigo-950 transition-colors italic">
                                {pathRelation.name}
                              </span>
                              <span className="bg-indigo-50 text-indigo-705 group-hover:bg-indigo-100 font-bold text-[9px] uppercase px-2 py-0.5 rounded-md transition-colors shadow-3xs">
                                {pathRelation.relation}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Diseases relation block */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-extrabold uppercase text-slate-450 tracking-wider">Associated Diseases ({drug.relatedDiseases.length})</h4>
                        <div className="flex flex-col gap-1.5">
                          {drug.relatedDiseases.map((disRelation, i) => (
                            <Link
                              key={i}
                              to={`/diseases/${disRelation.id}`}
                              className="group p-2.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-150 hover:border-emerald-150 rounded-xl flex items-center justify-between text-xs transition-all"
                            >
                              <span className="font-bold text-slate-800 group-hover:text-emerald-950 transition-colors">
                                {disRelation.name}
                              </span>
                              <span className="bg-emerald-50 text-emerald-705 group-hover:bg-emerald-100 font-bold text-[9px] uppercase px-2 py-0.5 rounded-md transition-colors shadow-3xs">
                                {disRelation.relation}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Active Recall Callout sidebar block */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm space-y-4">
                    <div className="space-y-1">
                      <span className="bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider">
                        Study Challenge
                      </span>
                      <h3 className="text-sm font-black tracking-tight pt-1">Ready to Exam-Test Your Knowledge?</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                        Interactive clinical flashcards are loaded offline to lock in mechanisms, side effects, and pearls.
                      </p>
                    </div>
                    <div className="space-y-2.5 pt-1 text-xs">
                      <button
                        onClick={() => handleTriggerRecall("drug", drug.id, drug.name)}
                        className="w-full flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-[11px] text-white cursor-pointer group font-sans"
                      >
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                          Add to Mastery
                        </span>
                        <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded group-hover:bg-emerald-600 transition-all">Save</span>
                      </button>
                      <button
                        onClick={() => handleTriggerRecall("drug", drug.id, drug.name)}
                        className="w-full flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-[11px] text-white cursor-pointer group font-sans"
                      >
                        <span className="flex items-center gap-1.5">
                          <Brain className="h-3.5 w-3.5 text-indigo-400" />
                          Test Recall (2 min)
                        </span>
                        <span className="bg-indigo-500 text-white text-[9px] font-bold px-2 py-0.5 rounded group-hover:bg-indigo-650 transition-all">Quiz</span>
                      </button>
                    </div>
                  </div>

                  {/* Annotated Safeguards */}
                  <div className="bg-slate-100/60 rounded-2xl p-4 border border-slate-200/60 text-[10px] text-slate-500 space-y-2 font-semibold">
                    <p className="font-extrabold text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      Educational Clinical Standard
                    </p>
                    <p className="leading-relaxed">
                      To maintain absolute educational integrity, this pathobiology segment is peer-cross-referenced with contemporary Infectious Diseases Society of America (IDSA) empirical standards.
                    </p>
                    <p className="leading-relaxed text-slate-450 italic">
                      Disclaimer: This portal is designed exclusively for educational preparation (USMLE, COMLEX, NCLEX, NAPLEX). Dosing coordinates or therapeutic decisions are strictly secondary to local institution antibiograms.
                    </p>
                    <div className="border-t border-slate-205/60 pt-2 flex items-center justify-between flex-wrap gap-2 text-[10px]">
                      <span>Last Audited: June 2026</span>
                      <span>Review Cycle: Annual</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )
        ) : (() => {
          /* ================================= DEEP REFERENCE DIRECTORY INDEX VIEW ================================= */
          const filteredDrugs = drugsData.filter((d) => {
            const cat = d.category || "antibacterial";
            const matchesCategory = activeCategory === "all" || cat === activeCategory;
            
            if (!matchesCategory) return false;

            const matchesClass = matchesFilterClass(d, selectedClass);
            
            const query = searchTerm.toLowerCase().trim();
            if (!query) return matchesClass;
            
            return matchesClass && (
              d.name.toLowerCase().includes(query) ||
              d.drugClass.toLowerCase().includes(query) ||
              d.mechanismOfAction.toLowerCase().includes(query) ||
              d.spectrumOfActivity.some(s => s.toLowerCase().includes(query)) ||
              d.commonIndications.some(i => i.toLowerCase().includes(query)) ||
              d.clinicalPearls.some(p => p.toLowerCase().includes(query))
            );
          });

          return (
            <div className="space-y-8 animate-fade-in" id="drugs-directory-index">
              
              {/* Compact Unified Hero & Search Panel */}
              <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6 overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-[radial-gradient(circle_at_bottom_right,#0D254D,transparent)] pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider leading-none inline-block shadow-3xs">
                      Clinical Reference Compendium
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      Drug Pharmacology Library
                    </h1>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      Deconstruct clinical pharmacology mechanisms, coverage spectra, adverse effects, and IDSA-aligned pearls. Click on any drug below to explore deep-dive clinical profiles.
                    </p>
                  </div>

                  <div className="w-full lg:max-w-md shrink-0 relative group">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-emerald-450 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search drugs, mechanism, spectrum, pearls..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 focus:bg-slate-950/90 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-450 transition-all text-white placeholder:text-slate-400 shadow-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3.5 top-3.5 text-xs font-extrabold text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Horizontal Scroll Filter Track */}
                <div className="relative z-10 border-t border-slate-800/85 pt-4">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full flex-nowrap scrollbar-none">
                    {[
                      { id: "all", name: "All Medications", color: "bg-indigo-600 text-white shadow-md border-indigo-400 hover:bg-indigo-500 hover:shadow-indigo-500/10" },
                      { id: "antibacterial", name: "Antibiotics / Antibacterials", color: "bg-emerald-600 text-white shadow-md border-emerald-400 hover:bg-emerald-500 hover:shadow-emerald-500/10" },
                      { id: "antiviral", name: "Antiviral Therapy", color: "bg-rose-600 text-white shadow-md border-rose-450 hover:bg-rose-500 hover:shadow-rose-500/10" },
                      { id: "antifungal", name: "Antifungal Agents", color: "bg-purple-600 text-white shadow-md border-purple-400 hover:bg-purple-500 hover:shadow-purple-500/10" }
                    ].map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.id as any);
                            setSelectedClass("all");
                          }}
                          className={`text-[10px] sm:text-[11px] font-extrabold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border group ${
                            isActive
                              ? cat.color
                              : "bg-slate-800/90 text-slate-250 border-slate-700/80 hover:text-white hover:bg-slate-755 hover:border-slate-600 shadow-2xs"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-400 group-hover:bg-slate-300'}`} />
                          <span>{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Grid content and sidebar layouts */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Main list grid */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {filteredDrugs.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-6">
                      <HelpCircle className="h-10 w-10 text-slate-350 mx-auto mb-2" />
                      <h3 className="text-sm font-bold text-slate-800">No matching antimicrobial agents</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-sans leading-relaxed">
                        Refine your search terms or select "All Agents" to display the full spectrum of high-yield antimicrobials.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDrugs.map((d) => {
                        const styleCat = d.category || "antibacterial";
                        const itemStyles = getDrugStyle(styleCat);
                        return (
                          <Link
                            key={d.id}
                            to={`/drugs/${d.slug}`}
                            className={`bg-white border border-slate-250 border-l-4 ${itemStyles.accentLine} ${itemStyles.hover} rounded-2xl p-5 flex flex-col justify-between transition-all group cursor-pointer shadow-3xs`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-2.5">
                                <span className={`${itemStyles.pill} border text-[9px] uppercase px-2 py-0.5 rounded-md tracking-wider shadow-3xs font-extrabold`}>
                                  {d.drugClass}
                                </span>
                                <span className={`text-[10px] ${itemStyles.accentText} font-bold font-mono uppercase bg-slate-50/50 px-1.5 py-0.5 rounded border border-slate-100`}>
                                  {styleCat}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <h3 className="text-base font-black text-slate-900 tracking-tight font-sans group-hover:text-indigo-650 transition-colors">
                                  {d.name}
                                </h3>
                                <p className="text-xs text-slate-450 leading-relaxed font-semibold line-clamp-2">
                                  {d.mechanismOfAction}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-slate-100/60 overflow-hidden">
                                <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-wider block mb-1.5 select-none font-bold">Top Indication:</span>
                                <div className="flex items-center gap-1.5 text-xs text-slate-755 font-bold">
                                  <CheckCircle className={`h-3.5 w-3.5 ${itemStyles.accentText} shrink-0`} />
                                  <span className="truncate">{d.commonIndications[0]}</span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100/60 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                              <span className="text-[10px] font-extrabold text-slate-400 bg-slate-50 px-2.5 py-1 rounded inline-block">
                                {d.relatedPathogens.length} Targets
                              </span>
                              <div
                                className="text-xs font-black text-indigo-600 group-hover:text-indigo-805 transition-colors inline-flex items-center gap-1"
                              >
                                <span>Review Profile</span>
                                <ArrowLeft className="h-3 w-3 rotate-180" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                </div>

                {/* Sidebar Widget Area */}
                <div className="space-y-6">

                  {/* Interactive App Hub */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm space-y-4">
                    <div className="space-y-1 pt-1">
                      <span className="bg-emerald-505/10 border border-emerald-300/20 text-emerald-300 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider inline-block">
                        Active recall
                      </span>
                      <h3 className="text-sm font-black tracking-tight leading-tight">Active recall challenge</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        Launch active flashcards or the clinical board exam simulator to test mechanisms and key side effects.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 text-xs">
                      <button
                        onClick={() => handleLaunchApp("grid")}
                        className="w-full flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-[11px] text-white cursor-pointer group"
                      >
                        <span className="flex items-center gap-1.5">
                          <Table className="h-3.5 w-3.5 text-amber-400" />
                          Susceptibility Matrix
                        </span>
                        <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded group-hover:bg-amber-600 transition-all">Launch</span>
                      </button>

                      <button
                        onClick={() => handleLaunchApp("flashcards")}
                        className="w-full flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-[11px] text-white cursor-pointer group"
                      >
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                          Flashcard Flashcards
                        </span>
                        <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded group-hover:bg-emerald-600 transition-all">Start</span>
                      </button>

                      <button
                        onClick={() => handleLaunchApp("quiz")}
                        className="w-full flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-[11px] text-white cursor-pointer group"
                      >
                        <span className="flex items-center gap-1.5">
                          <Brain className="h-3.5 w-3.5 text-indigo-400 animate-pulse-subtle" />
                          Board Review Simulator
                        </span>
                        <span className="bg-indigo-550 text-white text-[9px] font-bold px-2 py-0.5 rounded group-hover:bg-indigo-650 transition-all">Start</span>
                      </button>
                    </div>

                    <div className="pt-3 border-t border-white/5 text-center">
                      <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                        Offline active persistence allows studying with zero connection delays.
                      </p>
                    </div>
                  </div>

                  {/* Study strategy tip block */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                    <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-indigo-505" />
                      Study Strategy: Pharmacology
                    </h4>
                    <p className="text-[11px] text-slate-550 leading-relaxed font-semibold">
                      Board examinations (USMLE, NCLEX, COMLEX) focus heavily on matching classic clinical profiles with mechanisms, unique side effects, or contraindications.
                    </p>
                    <ul className="text-[11.5px] text-slate-700 pl-4 list-disc space-y-1 font-bold">
                      <li>Identify narrow-spectrum vs broad-spectrum agents.</li>
                      <li>Learn the exception classes (e.g. ceftaroline covers MRSA).</li>
                      <li>Remember exact unique side effects like biliary sludge, QTc prolonging, or thrombocytopenia.</li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>
          );
        })()}
      </main>

      {/* Exquisite Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-12 px-4 shadow-inner mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-semibold leading-relaxed">
          <div className="space-y-3">
            <span className="font-extrabold text-indigo-400 tracking-tight text-sm flex items-center gap-1.5">
              <BrainCircuit className="h-4.5 w-4.5" />
              InfectAtlas reference Portal
            </span>
            <p className="text-slate-400 max-w-sm">
              Highly organized, peer-cross-referenced microbiology and antimicrobial database for medical education, hospital context alignments, and board reviews.
            </p>
          </div>
          <div className="space-y-3">
            <span className="font-extrabold text-slate-200 text-xs uppercase tracking-wider block">Academic Navigation</span>
            <ul className="space-y-1.5">
              <li>
                <Link to="/diseases" className="text-slate-400 hover:text-white transition-colors">Diseases Index Directory</Link>
              </li>
              <li>
                <Link to="/organisms" className="text-slate-400 hover:text-white transition-colors">Pathogen Pathologies Index</Link>
              </li>
              <li>
                <Link to="/drugs" className="text-slate-400 hover:text-white transition-colors block">Drugs & Pharmacology Directory</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <span className="font-extrabold text-slate-200 text-xs uppercase tracking-wider block">Clinical Agreement</span>
            <p className="text-slate-400">
              By accessing this database, you acknowledge that all coordinates are maintained exclusively for diagnostic educational simulations. Standard dosing decisions must prioritize the institution's localized antibiogram.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800/85 text-center text-[10px] text-slate-500">
          <p>© 2026 InfectAtlas Academic Publishing. Standard IDSA / CDC alignments reviewed yearly.</p>
        </div>
      </footer>

      <ActiveRecallDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        entityType={drawerEntityType}
        entityId={drawerEntityId}
        entityName={drawerEntityName}
      />

    </div>
  );
}
