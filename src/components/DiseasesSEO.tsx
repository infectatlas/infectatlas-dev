import { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { diseasesData, Disease } from "../data/diseases";
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
  BookmarkPlus,
  Stethoscope,
  Heart,
  HelpCircle,
  AlertTriangle,
  Beaker
} from "lucide-react";

// Helper to convert disease name to web-safe slug
export const getDiseaseSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Helper for organism slugs
export const getOrganismSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

export default function DiseasesSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug: routeSlug } = useParams();

  // Resolve slug from router params, or fallback to parsing the location pathname directly
  const rawSlug = routeSlug || (location.pathname.startsWith("/diseases/") ? location.pathname.substring("/diseases/".length).replace(/\/$/, "") : undefined);
  const slug = rawSlug?.toLowerCase().trim();

  // Determine if viewing a specific detail page or the whole index
  const isDetailView = location.pathname !== "/diseases" && location.pathname !== "/diseases/" && !!slug;
  const disease = diseasesData.find((d) => 
    d.slug.toLowerCase() === slug || 
    (d.alternateSlugs && d.alternateSlugs.some(alt => alt.toLowerCase() === slug))
  );

  // Dynamic Metadata Sync
  useEffect(() => {
    if (isDetailView && disease) {
      // 1. Dynamic Search-Intent Title (Aim for 50-70 characters)
      const pageTitle = `${disease.name}: Symptoms, Causes, Pathogens & Treatment | InfectAtlas`;
      document.title = pageTitle;

      // 2. High-Yield Meta Description under 160 characters
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', disease.metaDescription);

      // 3. Dynamic Canonical Link tag injection
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', `https://infectatlas.com/diseases/${disease.slug}`);

      // 4. JSON-LD Graph Injection (Combination of MedicalCondition, FAQPage, BreadcrumbList)
      const listElement = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Clinical Reference Catalog",
          "item": "https://infectatlas.com/organisms"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Clinical Infectious Diseases",
          "item": "https://infectatlas.com/diseases"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": disease.name,
          "item": `https://infectatlas.com/diseases/${disease.slug}`
        }
      ];

      const qaList = disease.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }));

      const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalWebPage",
            "@id": `https://infectatlas.com/diseases/${disease.slug}#webpage`,
            "url": `https://infectatlas.com/diseases/${disease.slug}`,
            "name": pageTitle,
            "description": disease.metaDescription,
            "aspect": ["pathology", "diagnosis", "antimicrobial principles", "clinical presentation"],
            "mainEntity": {
              "@type": "MedicalCondition",
              "name": disease.name,
              "possibleTreatment": disease.relatedAntibiotics.map((ab) => ({
                "@type": "MedicalTherapy",
                "name": ab.name
              })),
              "associatedAnatomy": {
                "@type": "AnatomicalStructure",
                "name": "Human Host Organ System"
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
          },
          {
            "@type": "FAQPage",
            "@id": `https://infectatlas.com/diseases/${disease.slug}#faq`,
            "mainEntity": qaList
          },
          {
            "@type": "BreadcrumbList",
            "@id": `https://infectatlas.com/diseases/${disease.slug}#breadcrumb`,
            "itemListElement": listElement
          }
        ]
      };

      const existingScript = document.getElementById("disease-jsonld-schema");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = "disease-jsonld-schema";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(script);

      return () => {
        const currentScript = document.getElementById("disease-jsonld-schema");
        if (currentScript) currentScript.remove();
        
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) {
          descTag.setAttribute('content', "Interactive medical microbiology library containing high-yield disease-pathogen relationships and antimicrobial guidance for board examinations.");
        }

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', "https://infectatlas.com/diseases");
        }
      };
    } else {
      // Index View Meta Setup
      document.title = "High-Yield Clinical Infectious Diseases Reference Guide | InfectAtlas Catalog";
      
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', "Explore the index of clinically significant human infectious diseases, including causative agents, board-review diagnostics, guidelines, and treatment protocols.");

      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', "https://infectatlas.com/diseases");

      // Inject Directory-level JSON-LD schema
      const directorySchema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "url": "https://infectatlas.com/diseases",
        "name": "High-Yield Clinical Infectious Diseases Reference Guide | InfectAtlas",
        "description": "Index of critical clinical human infectious diseases featuring diagnostic keys and reference pharmacology guidelines.",
        "publisher": {
          "@type": "Organization",
          "name": "InfectAtlas",
          "logo": {
            "@type": "ImageObject",
            "url": "https://infectatlas.com/assets/favicon.ico"
          }
        }
      };

      const existingScript = document.getElementById("directory-diseases-jsonld");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = "directory-diseases-jsonld";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(directorySchema);
      document.head.appendChild(script);

      return () => {
        const currentScript = document.getElementById("directory-diseases-jsonld");
        if (currentScript) currentScript.remove();
      };
    }
  }, [isDetailView, disease]);

  // Jump to specific visual target on detail page
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Launch interactive app console
  const handleLaunchApp = (focusTask: string) => {
    // Return path to start app mode
    localStorage.setItem("study_focus_preference", focusTask);
    navigate("/app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" id="disease-seo-root">
      
      {/* Pristine Clinical Reference Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group" title="Back to Homepage">
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm group-hover:bg-indigo-700 transition-colors">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight block leading-none group-hover:text-indigo-600 transition-colors">
                InfectAtlas Library
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-indigo-650 block mt-1">
                Clinical Disease Modules
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLaunchApp("dashboard")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1"
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span>Launch Practice Console</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Stage */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {isDetailView ? (
          /* ================================= DETAIL VIEW ================================= */
          !disease ? (
            <div className="max-w-md mx-auto text-center py-16 space-y-4" id="disease-not-found">
              <div className="inline-flex p-4 bg-amber-50 rounded-full text-amber-600 border border-amber-100">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Disease Chapter Not Found</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn't locate an infectious disease chapter matching the key "<strong className="text-slate-800">{slug}</strong>" in the reference catalog.
              </p>
              <div className="pt-2">
                <Link
                  to="/diseases"
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-650 font-semibold hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Return to Disease Catalog
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12" id="disease-seo-detail">
              
              {/* Left & Center Column: Detailed Medical Literature & High-Yield Information */}
              <div className="lg:col-span-2 space-y-8" id="overview">
                
                {/* Back Link */}
                <div>
                  <Link
                    to="/diseases"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-650 font-bold transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Diseases Directory</span>
                  </Link>
                </div>

                {/* Main Heading Group */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full">
                      Board Review Chapter
                    </span>
                    <span className="bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full">
                      Infectious Diseases
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {disease.name}
                  </h1>

                  {/* Horizontal Sub-navigation jumpbar to optimize index scanning */}
                  <div className="bg-slate-100/90 p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold text-slate-500 border border-slate-200 hide-scrollbar scroll-smooth">
                    <span className="text-[10px] uppercase font-bold text-slate-400 px-2 select-none shrink-0">Jump To:</span>
                    <button onClick={() => scrollToSection("overview")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Overview</button>
                    <button onClick={() => scrollToSection("presentation")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Presentation</button>
                    <button onClick={() => scrollToSection("causatives")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Causative Pathogens</button>
                    <button onClick={() => scrollToSection("diagnostics")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Diagnostic Path</button>
                    <button onClick={() => scrollToSection("treatment")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Treatment</button>
                    <button onClick={() => scrollToSection("faqs")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">FAQs</button>
                  </div>

                  {/* Dynamic H1 intro block */}
                  <div className="bg-indigo-50/25 border-l-4 border-indigo-600 p-5 rounded-r-xl">
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal" id="disease-overview-text">
                      {disease.overview}
                    </p>
                  </div>
                </div>

                {/* CONVERSION BAR 1: After overview */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-3xs">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider flex items-center justify-center sm:justify-start gap-1">
                      <Zap className="h-3 w-3 fill-indigo-600" />
                      Active Recall Challenge
                    </span>
                    <p className="text-xs text-slate-500 font-medium">
                      Trigger USMLE & NCLEX flashcards specifically curated for <strong className="text-slate-700">{disease.name}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchApp("flashcards")}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all shrink-0 cursor-pointer"
                  >
                    Review Flashcards
                  </button>
                </div>

                {/* Quick Facts Card layout */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4" id="quick-facts">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-indigo-500" />
                    Rapid Review Reference Card
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-50 rounded-lg space-y-1 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-indigo-950">Primary Pathogens</span>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 font-semibold leading-relaxed">
                        {disease.quickFacts.commonPathogens.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-lg space-y-1 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-indigo-950">Clinical Risk Factors</span>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 leading-relaxed">
                        {disease.quickFacts.riskFactors.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-lg space-y-1 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-indigo-950">Hallmark Manifestations</span>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 leading-relaxed">
                        {disease.quickFacts.hallmarkSymptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-lg space-y-1 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-indigo-950">Diagnostic Approach</span>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 leading-relaxed">
                        {(disease.quickFacts.diagnosticApproach || [disease.diagnosticApproach.split(".")[0] + "."]).map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Clinical Presentation section */}
                <div className="space-y-3" id="presentation">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4.5 w-4.5 text-indigo-505" />
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      Clinical Presentation & Pathology
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {disease.clinicalPresentation}
                  </p>
                </div>

                {/* Common Causative Pathogens Listing (with rich crosslinking links) */}
                <div className="space-y-4" id="causatives">
                  <div className="flex items-center gap-2">
                    <Beaker className="h-4.5 w-4.5 text-indigo-500" />
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      Primary Etiologies & Pathogen Profiles
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {disease.causativePathogens.map((cp, idx) => (
                      <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-3xs">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-xs text-slate-900 italic">
                            {cp.name}
                          </h3>
                          <Link
                            to={`/organisms/${getOrganismSlug(cp.name)}`}
                            className="text-[10px] text-indigo-650 font-bold hover:underline flex items-center gap-0.5 whitespace-nowrap cursor-pointer"
                          >
                            Organism Details <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {cp.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnostic Approach detail */}
                <div className="space-y-3" id="diagnostics">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4.5 w-4.5 text-indigo-505" />
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      Stepwise Diagnostic Standards
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-100/50 p-4 rounded-xl border border-slate-200">
                    {disease.diagnosticApproach}
                  </p>
                </div>

                {/* Treatment Principles */}
                <div className="space-y-3" id="treatment">
                  <div className="flex items-center gap-2">
                    <Table className="h-4.5 w-4.5 text-indigo-505" />
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      Empirical and Directed Pharmacological Principles
                    </h2>
                  </div>
                  <div className="prose max-w-none text-sm text-slate-600 leading-relaxed font-normal space-y-3">
                    <p>{disease.treatmentPrinciples}</p>
                    <p className="italic text-xs text-slate-400">
                      Note: Always corroborate treatment planning with institutional antibiograms, clinical pharmacist assessment, and primary national clinical consensus guidelines (e.g., IDSA/ATS).
                    </p>
                  </div>
                </div>

                {/* Clinical Pearls with high engagement board highlights */}
                <div className="bg-indigo-950 text-indigo-100 rounded-2xl p-6 shadow-sm space-y-4" id="clinical-pearls">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-indigo-300" />
                    Board Review Clinical Pearls
                  </h3>
                  <div className="space-y-3">
                    {disease.clinicalPearls.map((pearl, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className="flex items-center justify-center h-4.5 w-4.5 rounded-full bg-indigo-800 text-[10px] font-extrabold text-white shrink-0 mt-0.5 select-none">
                          {idx + 1}
                        </span>
                        <p className="text-xs leading-relaxed text-slate-200">
                          {pearl}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CONVERSION BAR 2: After clinical pearls */}
                <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-800 shadow-sm">
                  <div className="space-y-1.5 text-center md:text-left">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center justify-center md:justify-start gap-1">
                      <Zap className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      Antimicrobial Coverage Grid
                    </span>
                    <h4 className="text-xs font-extrabold">Struggling with empirical decisions for {disease.name}?</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                      Simulate actual antibiotic susceptibility spectra against standard pathogens with our interactive active recall spectrum matrices.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchApp("grid")}
                    className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-lg transition-all shrink-0 cursor-pointer"
                  >
                    Compare Drug Coverage
                  </button>
                </div>

                {/* Differential Diagnoses comparison table */}
                <div className="space-y-3" id="differentials">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4.5 w-4.5 text-indigo-505" />
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      Differential Diagnosis & Mitigating Manifestations
                    </h2>
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-3xs">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                          <th className="py-2.5 px-3.5 w-[20%]">Differential</th>
                          <th className="py-2.5 px-3.5">Distinguishing Characteristics</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs divide-y divide-slate-100 text-slate-600">
                        {disease.differentialDiagnoses.map((diff, index) => {
                          const parts = diff.split(" (");
                          const title = parts[0];
                          const desc = parts[1] ? parts[1].replace(")", "") : "";
                          return (
                            <tr key={index}>
                              <td className="py-2.5 px-3.5 font-bold text-indigo-950 bg-slate-50/30">{title}</td>
                              <td className="py-2.5 px-3.5 leading-relaxed">{desc || "Must exclude based on clinical history, laboratory assays, and cross-sectional diagnostic films."}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* FAQ list for rich snippet execution */}
                <div className="space-y-4" id="faqs">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-base font-extrabold text-slate-950 tracking-tight">
                      Frequently Asked Questions ({disease.name})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {disease.faqs.map((faq, i) => (
                      <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                        <h4 className="text-xs font-extrabold text-indigo-950 flex items-center gap-1.5 leading-snug">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                          {faq.question}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal pl-3">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Comparative related assets internal linking (Self-contained schema requirements) */}
                <div className="border-t border-slate-200 py-6 space-y-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-4.5 w-4.5 text-indigo-505" />
                    <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider">
                      Study Progression Links for Board Prep
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                    
                    {/* Organisms Links */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Related Organisms</span>
                      <div className="space-y-1">
                        {disease.relatedOrganisms.map((ro, i) => (
                          <Link
                            key={i}
                            to={`/organisms/${ro.slug}`}
                            className="block font-bold text-indigo-650 hover:underline cursor-pointer italic"
                          >
                            {ro.name} →
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Antibiotic Links */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Target Antibiotics</span>
                      <div className="space-y-1">
                        {disease.relatedAntibiotics.map((ab, i) => (
                          <span
                            key={i}
                            className="block font-medium text-slate-700 italic"
                          >
                            {ab.name} <span className="text-[10px] text-slate-400 font-sans font-normal">({ab.role})</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Diseases Links */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Comparative Pathologies</span>
                      <div className="space-y-1">
                        {disease.relatedDiseases.map((rd, i) => (
                          <Link
                            key={i}
                            to={`/diseases/${rd.slug}`}
                            className="block font-bold text-indigo-650 hover:underline cursor-pointer"
                          >
                            {rd.name} →
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Trust / Compliance disclaimer footer */}
                <div className="bg-slate-100 text-[11px] text-slate-400 p-4 rounded-xl border border-slate-200 leading-relaxed font-normal">
                  <p className="font-bold text-slate-500 mb-1">InfectAtlas Educational Disclaimer:</p>
                  <p>
                    InfectAtlas is intended for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Medical professionals should align practical assessment with localized institutional protocols and primary ID guidance, as regional drug susceptibility metrics hold broad variability. Code and visual content does not supersede direct medical board parameters.
                  </p>
                </div>

              </div>

              {/* Right Column: CTA visual board conversion segment, staying locked during vertical scroll */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-850 p-6 shadow-xl space-y-6 sticky top-24" id="conversion-sidebar">
                  
                  <div className="space-y-2 text-center md:text-left">
                    <span className="inline-flex gap-1 items-center bg-indigo-500/30 text-indigo-300 font-extrabold text-[9px] tracking-widest uppercase py-1 px-2.5 rounded-full border border-indigo-805/30">
                      <Zap className="h-3 w-3 fill-indigo-300 shrink-0" />
                      Study Sandbox
                    </span>
                    <h3 className="text-lg font-extrabold tracking-tight text-white leading-snug">
                      Master {disease.name} pathology & therapeutics
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      Stop passive flashcard skimming. Access authentic interactive USMLE, NCLEX, and NAPLEX study tools.
                    </p>
                  </div>

                  {/* Progressive features buttons to route into app */}
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => handleLaunchApp("quiz")}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-xs text-white cursor-pointer group"
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-indigo-400" />
                        Interactive Active Recall Quiz
                      </span>
                      <span className="bg-indigo-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md group-hover:bg-indigo-600 transition-colors">Launch</span>
                    </button>

                    <button
                      onClick={() => handleLaunchApp("flashcards")}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-xs text-white cursor-pointer group"
                    >
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        Microbiology Flashcards
                      </span>
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md group-hover:bg-emerald-600 transition-colors">Start</span>
                    </button>

                    <button
                      onClick={() => handleLaunchApp("grid")}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-xs text-white cursor-pointer group"
                    >
                      <span className="flex items-center gap-2">
                        <Table className="h-4 w-4 text-amber-400" />
                        Antimicrobial Susceptibility Grid
                      </span>
                      <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-md group-hover:bg-amber-600 transition-colors">View</span>
                    </button>
                  </div>

                  {/* PWA conversion subtle reminder */}
                  <div className="pt-4 border-t border-white/5 text-center">
                    <p className="text-[10px] text-indigo-300 font-bold tracking-wider uppercase mb-1">🎓 Offline Ready</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Install InfectAtlas as a progressive web application (PWA). Re-study and bookmark chapters during hospital clinical shifts with zero connectivity requirements.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )
        ) : (
          /* ================================= DIRECTORY INDEX VIEW ================================= */
          <div className="space-y-12" id="diseases-directory-index">
            
            {/* Elegant Header Hero */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-widest leading-none">
                Clinical Reference Guide
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                Human Infectious Diseases Atlas
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                Structured medical reference index outlining key causative pathogens, hallmark symptoms, diagnostic algorithms, and clinical therapeutics matching USMLE, COMLEX, or NCLEX parameters.
              </p>
            </div>

            {/* Structured index layout with search filter */}
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-2">
                <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-650" />
                  Index of High-Yield Pathologies (Clinical Chapters)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {diseasesData.map((d) => (
                  <Link
                    key={d.id}
                    to={`/diseases/${d.slug}`}
                    className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">
                          Medical Condition
                        </span>
                        <span className="text-[10px] text-indigo-650 font-bold group-hover:underline transition-all flex items-center gap-0.5 whitespace-nowrap">
                          Study Guide
                          <ExternalLink className="h-2.5 w-2.5" />
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900 tracking-tight leading-snug group-hover:text-indigo-650 transition-colors">
                        {d.name}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {d.overview}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-600">
                        {d.quickFacts.commonPathogens.length} key pathogens cited
                      </span>
                      <span>
                        {d.faqs.length} board-style FAQs
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Subtle Conversion Sandbox Card at bottom of index */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-indigo-850 shadow-md">
              <div className="space-y-3 max-w-xl text-center md:text-left">
                <span className="inline-flex gap-1 items-center bg-indigo-500/20 text-indigo-300 font-extrabold text-[9px] tracking-wider uppercase py-1 px-2.5 rounded-full border border-indigo-805/30">
                  <Zap className="h-3.5 w-3.5 fill-indigo-300 text-indigo-300 shrink-0" />
                  BOARD EXAM WORKOUT
                </span>
                <h3 className="text-lg md:text-xl font-extrabold tracking-tight">Ready to test your memory across all clinical modules?</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  InfectAtlas wraps our medical literature database inside an interactive adaptive study suite. Instantly trigger active recall challenges, diagnose patient-cases in multi-choice questions, and build structural memory.
                </p>
              </div>
              <button
                onClick={() => handleLaunchApp("dashboard")}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer text-center"
              >
                Launch Study App Platform
              </button>
            </div>

          </div>
        )}
      </main>

      {/* Direct Plain Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-xs text-slate-400 font-medium">
            InfectAtlas • High-Yield Medical Microbiology Study Hub for Students
          </p>
          <p className="text-[10px] text-slate-400 font-normal">
            For visual feedback or requests, contact premium support at <strong className="text-slate-600 font-medium">infectatlas@gmail.com</strong>
          </p>
        </div>
      </footer>

    </div>
  );
}
