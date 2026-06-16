import { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { microorganismsData, Microorganism } from "../data/microorganisms";
import { 
  ArrowLeft, 
  BrainCircuit, 
  Search, 
  BookOpen, 
  Layers, 
  CheckCircle, 
  Award, 
  Activity, 
  Tag, 
  ExternalLink,
  Table,
  Check,
  Zap,
  BookmarkPlus
} from "lucide-react";

// Helper to convert microorganism name to a web-safe slug
export const getPathogenSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Helper to get fully articulated SEO introductory hook paragraph
export const getSEOIntroduction = (m: Microorganism): string => {
  const defaultIntro = `${m.name} is a clinically significant ${m.gramStatus.toLowerCase()} ${m.shape} known to cause human infections such as ${m.diseases.map(d => d.name).slice(0, 3).join(", ")}. Understanding its microbiology structure, distinguishing biochemical tests, and guideline treatment choices is essential for board examination diagnostic questions and clinical practice.`;
  
  const nameLower = m.name.toLowerCase();
  if (nameLower.includes("staphylococcus aureus")) {
    return "Staphylococcus aureus is a Gram-positive coccus that causes skin infections, bacteremia, endocarditis, pneumonia, and osteomyelitis. Learn key diagnostic features, MRSA versus MSSA treatment strategies, and high-yield board review concepts.";
  }
  if (nameLower.includes("clostridioides difficile")) {
    return "Clostridioides difficile is a spore-forming, toxin-producing Gram-positive anaerobic bacillus that is a major cause of antibiotic-associated diarrhea and pseudomembranous colitis. Master identification assays, severity classification guidelines, and oral vancomycin vs fidaxomicin treatment routes.";
  }
  if (nameLower.includes("pseudomonas aeruginosa")) {
    return "Pseudomonas aeruginosa is an opportunistic Gram-negative bacillus characterized as lactose non-fermenting, oxidase-positive, and pigment-producing. It commonly causes hospital-acquired pneumonia, hot tub folliculitis, swimmer's ear, and osteomyelitis in IV drug users.";
  }
  if (nameLower.includes("escherichia coli")) {
    return "Escherichia coli is a Gram-negative bacillus, lactose-fermenting enteroflora of the bowel. It is the leading cause of urinary tract infections (UTIs) and neonatal meningitis, and contains strains like EHEC causing Hemolytic Uremic Syndrome (HUS).";
  }
  if (nameLower.includes("streptococcus pneumoniae")) {
    return "Streptococcus pneumoniae is a lancet-shaped, Gram-positive diplococcus that is alpha-hemolytic and optochin-sensitive. It is the premier etiology of community-acquired pneumonia, otitis media, meningitis, and sinusitis in adults.";
  }
  if (nameLower.includes("neisseria meningitidis")) {
    return "Neisseria meningitidis is a kidney-bean shaped, Gram-negative diplococcus that ferments both glucose and maltose. It causes severe meningococcemia and CSF meningitis, popularized by purpuric skin lesions and Waterhouse-Friderichsen syndrome.";
  }
  
  return defaultIntro;
};

export default function OrganismsSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug: routeSlug } = useParams<{ slug?: string }>();
  
  // Resolve slug from router params, or fallback to parsing the location pathname directly
  const slug = routeSlug || (location.pathname.startsWith("/organisms/") ? location.pathname.substring("/organisms/".length) : undefined);

  // Determine if we are viewing the general directory or a specific pathogen detail page
  const isDetailView = !!slug;

  // Find microorganism by slug or by its ID as a fallback
  const pathogen = isDetailView
    ? microorganismsData.find(
        (m) => getPathogenSlug(m.name) === slug || m.id.toLowerCase() === slug?.toLowerCase()
      )
    : undefined;

  // Dynamic Browser SEO Page Meta update
  useEffect(() => {
    if (isDetailView && pathogen) {
      // 1. Dynamic Search-Intent Title (Aim for 50-70 characters)
      let pageTitle = `${pathogen.name}: Diagnosis, Shapes & High-Yield Treatments | InfectAtlas`;
      if (pathogen.name.toLowerCase().includes("staphylococcus aureus")) {
        pageTitle = "Staphylococcus aureus: Symptoms, Diseases, Treatment & MRSA vs MSSA | InfectAtlas";
      } else if (pathogen.name.toLowerCase().includes("clostridioides difficile")) {
        pageTitle = "Clostridioides difficile: C. diff Symptoms, Diagnosis & Treatment | InfectAtlas";
      } else if (pathogen.name.toLowerCase().includes("pseudomonas aeruginosa")) {
        pageTitle = "Pseudomonas aeruginosa: Infections, Resistance & Treatments | InfectAtlas";
      } else if (pathogen.name.toLowerCase().includes("streptococcus pneumoniae")) {
        pageTitle = "Streptococcus pneumoniae: Symptoms, Infections & Treatments | InfectAtlas";
      } else if (pathogen.name.toLowerCase().includes("escherichia coli")) {
        pageTitle = "Escherichia coli: Symptoms, UTI, HUS & Empirical Treatment | InfectAtlas";
      }
      document.title = pageTitle;

      // 2. High-Yield Meta Description under 160 characters
      let metaDesc = `Learn ${pathogen.name} identification, diagnostic shapes, therapy choices, and high-yield board review concepts for USMLE, NCLEX, and NAPLEX.`;
      if (pathogen.name.toLowerCase().includes("staphylococcus aureus")) {
        metaDesc = "Learn Staphylococcus aureus identification, common infections, MRSA vs MSSA treatment, clinical pearls, and board-review concepts for USMLE, NCLEX, COMLEX, and NAPLEX.";
      } else if (pathogen.name.toLowerCase().includes("clostridioides difficile")) {
        metaDesc = "Master Clostridioides difficile (C. diff) identification, toxin assays, oral vancomycin vs fidaxomicin treatment, and high-yield board exam questions.";
      } else if (pathogen.name.toLowerCase().includes("pseudomonas aeruginosa")) {
        metaDesc = "Study Pseudomonas aeruginosa clinical manifestations, distinguishing biochemical tests, and anti-pseudomonal beta-lactam susceptibility guidelines.";
      }

      // Update or create meta tag for description
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', metaDesc);
      
      // Inject Schema.org JSON-LD microdata dynamically for maximum crawl efficiency
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": pathogen.name,
        "description": metaDesc,
        "aspect": ["microbiology", "diagnosis", "antimicrobial treatment", "clinical guidelines"],
        "mainEntity": {
          "@type": "MedicalCondition",
          "name": `${pathogen.name} infection`,
          "possibleTreatment": pathogen.diseases.map((d) => ({
            "@type": "MedicalTherapy",
            "name": d.treatment
          })),
          "associatedAnatomy": {
            "@type": "AnatomicalStructure",
            "name": "Human Host System"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "InfectAtlas",
          "logo": {
            "@type": "ImageObject",
            "url": "https://infectatlas.com/assets/favicon.ico"
          }
        }
      };

      const existingScript = document.getElementById("pathogen-jsonld-schema");
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schemaData);
      } else {
        const script = document.createElement("script");
        script.id = "pathogen-jsonld-schema";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
      }

      // Cleanup schema scripts on unmount
      return () => {
        const script = document.getElementById("pathogen-jsonld-schema");
        if (script) script.remove();
        
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) {
          descTag.setAttribute('content', "Comprehensive reference guide of clinically critical Gram-positive, Gram-negative, Spirochete, and atypical human pathogens with treatment guidelines.");
        }
      };
    } else {
      document.title = "High-Yield Medical Microorganisms & Pathogens Catalog | InfectAtlas Library";
      
      const directorySchema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "InfectAtlas Public Microorganism Reference Library",
        "description": "Comprehensive reference guide of clinically critical Gram-positive, Gram-negative, Spirochete, and atypical human pathogens with treatment guidelines.",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": microorganismsData.map((m, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://infectatlas.com/organisms/${getPathogenSlug(m.name)}`,
            "name": m.name
          }))
        }
      };

      const existingScript = document.getElementById("directory-jsonld-schema");
      if (existingScript) {
        existingScript.textContent = JSON.stringify(directorySchema);
      } else {
        const script = document.createElement("script");
        script.id = "directory-jsonld-schema";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(directorySchema);
        document.head.appendChild(script);
      }

      // Update directory meta description
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', "Comprehensive reference guide of clinically critical Gram-positive, Gram-negative, Spirochete, and atypical human pathogens with treatment guidelines.");

      return () => {
        const script = document.getElementById("directory-jsonld-schema");
        if (script) script.remove();
      };
    }
  }, [isDetailView, pathogen]);

  // Handle CTA actions: Route to specific tabs
  const handleLaunchApp = (tab: string, preselectedPathogenId?: string) => {
    if (preselectedPathogenId) {
      // Small state seeding trick in localStorage if they launch search or flashcards
      localStorage.setItem("infectatlas_search_prefill", preselectedPathogenId);
    }
    navigate(`/app/${tab}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Group directory list by gram status for rich index grouping
  const groupPathogensByGram = () => {
    const groups: Record<string, Microorganism[]> = {
      "Gram-positive": [],
      "Gram-negative": [],
      "Spirochete & Acid-fast": [],
      "Atypical & Others": []
    };

    microorganismsData.forEach((m) => {
      if (m.gramStatus === "Gram-positive") {
        groups["Gram-positive"].push(m);
      } else if (m.gramStatus === "Gram-negative") {
        groups["Gram-negative"].push(m);
      } else if (m.gramStatus === "Spirochete" || m.gramStatus === "Acid-fast") {
        groups["Spirochete & Acid-fast"].push(m);
      } else {
        groups["Atypical & Others"].push(m);
      }
    });

    return groups;
  };

  const groupedPathogens = groupPathogensByGram();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" id="seo-root">
      {/* Pristine Clinical Reference Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight block leading-none">
                InfectAtlas Library
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 block mt-1">
                Open Access Pathogen Reference
              </span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/app"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              Interactive Console
            </Link>
            <button
              onClick={() => handleLaunchApp("quiz")}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1"
            >
              <Activity className="h-3.5 w-3.5" />
              Practice boards
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {isDetailView && !pathogen ? (
          // Pathogen Not Found View
          <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-md mx-auto text-center space-y-4 shadow-sm">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-full inline-block">
              <Layers className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Pathogen Reference Not Found</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn't find a microorganism matching the key "<strong className="text-slate-800">{slug}</strong>" in the reference library.
            </p>
            <div className="pt-2">
              <Link
                to="/organisms"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Pathogens Index
              </Link>
            </div>
          </div>
        ) : pathogen ? (
          // Pathogen Detail SEO Structured Page
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12" id="pathogen-seo-detail">
            
            {/* Left/Middle Column: Clinical Literature */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Back navigation */}
              <div>
                <Link
                  to="/organisms"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-550 hover:text-slate-800 tracking-tight"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Reference Directory
                </Link>
              </div>

              {/* Title Card */}
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-3xs uppercase tracking-wide border ${
                    pathogen.gramStatus === "Gram-positive"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : pathogen.gramStatus === "Gram-negative"
                      ? "bg-pink-50 text-pink-700 border-pink-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {pathogen.gramStatus}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border border-slate-200 bg-white text-slate-600 capitalize">
                    {pathogen.shape} {pathogen.arrangement ? `• ${pathogen.arrangement}` : ""}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {pathogen.name}
                </h1>
                
                {/* 3. Strong H1 and introduction block */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal bg-indigo-50/25 border-l-4 border-indigo-600 p-4 rounded-r-xl">
                  {getSEOIntroduction(pathogen)}
                </p>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-200 pt-3">
                  <strong className="text-slate-700">Clinical Overview:</strong> {pathogen.description}
                </p>

                {/* Highly clear but non-annoyable CTA block to try the interactive app sandbox */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-3xs">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-extrabold text-indigo-600 tracking-wider flex items-center justify-center sm:justify-start gap-1">
                      <Layers className="h-3.5 w-3.5" /> Study Recall Practice Arena
                    </span>
                    <p className="text-xs text-slate-500 font-medium">
                      Simulate actual USMLE, NCLEX, or NAPLEX style board question workflows for <strong className="text-slate-700">{pathogen.name}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchApp("quiz", pathogen.id)}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-lg shadow-sm transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Activity className="h-4 w-4" />
                    Launch Practice Quiz
                  </button>
                </div>
              </div>

              {/* Biomarkers / Key Characteristics Identification Grid */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-indigo-500" />
                  Key Identifying Characteristics & Biochemical Marks
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pathogen.characteristics.map((char, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-50/40 hover:border-indigo-100 transition-all"
                    >
                      <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Diseases and Treatments Segment */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <Table className="h-5 w-5 text-indigo-500" />
                  <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Guideline-Aligned Clinical Conditions & Pharmacotherapy
                  </h2>
                </div>

                <div className="space-y-4">
                  {pathogen.diseases.map((disease) => (
                    <div
                      key={disease.id}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-slate-300 transition-all"
                    >
                      {/* Disease Header Banner */}
                      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 sm:px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                          {disease.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[10px] font-bold uppercase">
                          Administration: {disease.route}
                        </span>
                      </div>

                      {/* Detail Section */}
                      <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block">
                            Standard Empirical & Targeted Choice:
                          </span>
                          <p className="text-slate-800 font-bold bg-indigo-50/30 p-2.5 rounded-lg border border-indigo-50 inline-block leading-snug">
                            {disease.treatment}
                          </p>
                        </div>

                        {disease.clinicalPearl && (
                          <div className="bg-amber-50/50 border border-amber-200/50 rounded-lg p-3 sm:p-4 text-xs">
                            <span className="font-bold text-amber-800 tracking-wider uppercase text-[9px] block mb-1">
                              💡 Clinical Pearl / Boards Yield Indicator:
                            </span>
                            <p className="text-slate-700 leading-relaxed font-medium">
                              {disease.clinicalPearl}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guidelines / Authority references attribution */}
              <div className="bg-slate-100/50 rounded-xl p-4 border border-slate-200 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">Annotated Quality Medical Safeguards:</p>
                <p className="leading-relaxed">
                  Treatment outlines correspond to empirical protocol recommendations published by the Infectious Diseases Society of America (IDSA) and are cross-referenced against traditional nursing/medical school curriculums (USMLE, COMLEX, and NCLEX-RN parameters). Always confirm local susceptibility patterns (antibiograms) at your institution prior to therapy decisions.
                </p>
              </div>

            </div>

            {/* Right Column: Dynamic Conversion Funnel Sidebar */}
            <div className="space-y-6">
              
              <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-850 p-6 shadow-xl space-y-6 sticky top-24">
                
                {/* Branding inside Box */}
                <div className="space-y-2">
                  <div className="inline-flex p-2.5 bg-indigo-600/30 border border-indigo-500/35 rounded-xl text-indigo-300">
                    <BrainCircuit className="h-6 w-6 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">InfectAtlas Study Sandbox</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Reference directory lookups are just the starting point of retention. To truly master clinical micro for boards, you must test recall.
                  </p>
                </div>

                {/* Simulated Practice stats indicators */}
                <div className="bg-black/25 border border-white/5 rounded-xl p-3.5 space-y-3 text-xs">
                  <div className="font-bold text-[9px] text-slate-400 uppercase tracking-widest mb-1">Interactive Features Included:</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span><strong>Active Recall:</strong> Dynamic micro case-studies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span><strong>Spaced Repetition:</strong> Built-in Leitner scores</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span><strong>Therapy Comparison:</strong> Full susceptibility grid</span>
                    </li>
                  </ul>
                </div>

                {/* Conversion Funnel Callouts */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wide">
                    Master {pathogen.name} on Your Next Exam:
                  </h4>
                  <div className="space-y-2.5">
                    <button
                      onClick={() => handleLaunchApp("quiz", pathogen.id)}
                      className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      <Activity className="h-4 w-4" />
                      Practice Case Vignettes Now
                    </button>
                    
                    <button
                      onClick={() => handleLaunchApp("search", pathogen.id)}
                      className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <BookmarkPlus className="h-4 w-4 text-emerald-400" />
                      Save to Spaced Repetition Deck
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-white/5 uppercase tracking-widest font-bold">
                  ⚡ Unlimited Local Acccess (100% Free)
                </div>

              </div>

            </div>

          </div>
        ) : (
          // Comprehensive SEO directory listing index view
          <div id="pathogens-seo-directory" className="space-y-10">
            
            {/* Elegant Marketing Landing Header for Public View */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex bg-indigo-50 text-indigo-700 border border-indigo-150 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="h-3 w-3 shrink-0 mr-1 mt-0.5" /> High-Yield Pathogen Repository
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                Medical Microbiology Reference Library
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Deconstruct clinical Human Pathogens, Gram-staining characteristics, clinical manifestations, and IDSA-aligned treatment choices. Click on any pathogen below to explore deep-dive clinical pearls and review study guides.
              </p>
            </div>

            {/* Clean Grouped Directory Index Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {Object.keys(groupedPathogens).map((groupName) => (
                <div
                  key={groupName}
                  className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden"
                >
                  {/* Category Title */}
                  <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5">
                    <h2 className="font-extrabold text-sm sm:text-base text-slate-800 uppercase tracking-wider">
                      {groupName} Groupings
                    </h2>
                  </div>

                  {/* List items */}
                  <div className="p-4 sm:p-5 divide-y divide-slate-100">
                    {groupedPathogens[groupName].map((m) => (
                      <Link
                        key={m.id}
                        to={`/organisms/${getPathogenSlug(m.name)}`}
                        className="py-3 px-1.5 flex items-center justify-between hover:bg-slate-50 rounded-lg group transition-colors"
                      >
                        <div className="min-w-0 pr-4">
                          <span className="font-bold text-xs sm:text-sm text-indigo-600 group-hover:text-indigo-800 transition-colors block italic">
                            {m.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 truncate leading-tight">
                            {m.description}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0 bg-indigo-50 py-1 px-2.5 rounded-lg border border-indigo-100">
                          Review Pearls
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion Bottom Hero */}
            <div className="bg-gradient-to-br from-indigo-50 via-slate-50 to-emerald-50 rounded-2xl border border-slate-200 p-6 sm:p-8 md:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-2xs">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-full inline-block shadow-inner">
                <BrainCircuit className="h-8 w-8" />
              </div>
              
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Accelerate Veterinary, Medical & Nursing Recall
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                  Memorizing treatment regimens fails without active application. Open the InfectAtlas console to simulate real board exam questions, monitor weak diagnostic categories, and configure flashcards for optimal spaced retrieval.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-sm mx-auto">
                <button
                  onClick={() => handleLaunchApp("quiz")}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Activity className="h-4.5 w-4.5" />
                  Launch Quiz Sandbox
                </button>
                <button
                  onClick={() => handleLaunchApp("search")}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white text-slate-700 hover:text-slate-900 border border-slate-350 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="h-4.5 w-4.5 text-indigo-500" />
                  Explore Catalog
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Pristine Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-medium text-slate-500">
              InfectAtlas Public Directory &copy; 2026. Free reference platform for healthcare training. 
            </p>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              All clinical indications correspond to standards developed by IDSA. Practice scopes are non-promotional and meant exclusively for academic preparation.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-[10px] sm:text-xs">
            <Link to="/" className="hover:underline text-indigo-600 font-semibold cursor-pointer">InfectAtlas Home</Link>
            <span>&bull;</span>
            <Link to="/app" className="hover:underline text-indigo-600 font-semibold cursor-pointer">Open App Console</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
