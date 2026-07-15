import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { parasitesData, Parasite } from "../data/parasites";
import { diseasesData } from "../data/diseases";
import { drugsData } from "../data/drugs";
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
  X,
  ShieldAlert
} from "lucide-react";
import ActiveRecallDrawer from "./ActiveRecallDrawer";
import { DynamicRelatedContent, IntelligentLearningPath, ContinueLearningHistory } from "./GraphRecommendationEngine";

// Helper to convert microparasite name to a web-safe slug
export const getPathogenSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Helper to get fully articulated SEO introductory hook paragraph
export const getSEOIntroduction = (m: Parasite): string => {
  return m.description;
};

export const getPathogenSynonyms = (m: Parasite): string[] => {
  return [m.name];
};

export interface PathogenReference {
  type: "Clinical Guideline" | "Public Health Consensus" | "Landmark Review Article" | "Standard Textbook";
  citation: string;
  url?: string;
  source: string;
}

export const getPathogenReferences = (pathogenId: string, name: string): PathogenReference[] => {
  return [
    {
      type: "Clinical Guideline",
      source: "CDC / IDSA",
      citation: `Guideline standards and pathogen-specific treatment directives for human infections caused by ${name}.`,
      url: "https://www.cdc.gov"
    },
    {
      type: "Landmark Review Article",
      source: "Clinical Parasitology Reviews",
      citation: `Pathogenesis, Laboratory Identification, and Therapy of ${name} Associated Infections.`,
    }
  ];
};

export const getPathogenStyles = (type: string) => {
  switch (type) {
    case "Protozoa":
      return {
        bannerBg: "from-blue-50/50 via-white to-blue-50/30",
        lightBorder: "border-blue-100",
        accentText: "text-blue-600",
        pill: "bg-blue-50 text-blue-700 border-blue-100",
        accentLine: "border-l-blue-500",
        hover: "hover:border-blue-300 hover:shadow-blue-50/40",
      };
    case "Helminth":
      return {
        bannerBg: "from-orange-50/50 via-white to-orange-50/30",
        lightBorder: "border-orange-100",
        accentText: "text-orange-600",
        pill: "bg-orange-50 text-orange-700 border-orange-100",
        accentLine: "border-l-orange-500",
        hover: "hover:border-orange-300 hover:shadow-orange-50/40",
      };
    case "Ectoparasite":
      return {
        bannerBg: "from-emerald-50/50 via-white to-emerald-50/30",
        lightBorder: "border-emerald-100",
        accentText: "text-emerald-600",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-100",
        accentLine: "border-l-emerald-500",
        hover: "hover:border-emerald-300 hover:shadow-emerald-50/40",
      };
    default:
      return {
        bannerBg: "from-slate-50/50 via-white to-slate-50/30",
        lightBorder: "border-slate-100",
        accentText: "text-slate-700",
        pill: "bg-slate-50 text-slate-805 border-slate-105",
        accentLine: "border-l-slate-500",
        hover: "hover:border-slate-300 hover:shadow-slate-50/40",
      };
  }
};

export default function ParasitesSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug: routeSlug } = useParams<{ slug?: string }>();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Contextual Active Recall Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerEntityId, setDrawerEntityId] = useState("");
  const [drawerEntityName, setDrawerEntityName] = useState("");
  const [drawerEntityType, setDrawerEntityType] = useState<"parasite" | "disease" | "drug">("parasite");

  // Dynamic Smart Header state on scroll
  const [showHeader, setShowHeader] = useState(true);

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
  
  // Resolve slug from router params, or fallback to parsing the location pathname directly
  const slug = routeSlug || (location.pathname.startsWith("/parasites/") ? location.pathname.substring("/parasites/".length) : undefined);

  // Determine if we are viewing the general directory or a specific pathogen detail page
  const isDetailView = !!slug;

  // Find microparasite by slug or by its ID as a fallback
  const pathogen = isDetailView
    ? parasitesData.find(
        (m) => getPathogenSlug(m.name) === slug || m.id.toLowerCase() === slug?.toLowerCase()
      )
    : undefined;

  // Dynamic Browser SEO Page Meta update
  useEffect(() => {
    if (isDetailView && pathogen) {
      // 1. Dynamic Search-Intent Title (Aim for 50-70 characters)
      let pageTitle = `${pathogen.name}: Life Cycle, Host Transmission & Antiparasitic Treatment | InfectAtlas`;
      const nameLower = pathogen.name.toLowerCase();
      if (nameLower.includes("plasmodium falciparum") || nameLower.includes("malaria")) {
        pageTitle = "Plasmodium falciparum: Malaria Life Cycle, Symptoms, Artemisinins | InfectAtlas";
      } else if (nameLower.includes("toxoplasma gondii")) {
        pageTitle = "Toxoplasma gondii: Tachyzoites, Transmission, Pyrimethamine | InfectAtlas";
      } else if (nameLower.includes("giardia lamblia")) {
        pageTitle = "Giardia lamblia: Trophozoites, Diarrhea, Metronidazole | InfectAtlas";
      } else if (nameLower.includes("trypanosoma cruzi")) {
        pageTitle = "Trypanosoma cruzi: Chagas Disease, Vectors, Nifurtimox | InfectAtlas";
      } else if (nameLower.includes("enterobius vermicularis")) {
        pageTitle = "Enterobius vermicularis: Pinworm Tape Test, Pyrantel Pamoate | InfectAtlas";
      }
      document.title = pageTitle;

      // 2. High-Yield Meta Description under 160 characters with synonyms included
      const synonyms = getPathogenSynonyms(pathogen).slice(0, 2).join(", ");
      let metaDesc = `Learn ${pathogen.name} (${synonyms}) classification, life cycle stages, intermediate hosts, and antiparasitic regimens for board exams.`;
      if (nameLower.includes("plasmodium falciparum") || nameLower.includes("malaria")) {
        metaDesc = "Master Plasmodium falciparum malaria lifecycle (merozoites, trophozoites), erythrocyte smear diagnosis, chloroquine resistance, and treatment.";
      } else if (nameLower.includes("toxoplasma gondii")) {
        metaDesc = "Study Toxoplasma gondii feline host transmission, brain ring-enhancing lesions in HIV, sulfadiazine plus pyrimethamine, and clinical pearls.";
      } else if (nameLower.includes("giardia lamblia")) {
        metaDesc = "Learn Giardia lamblia teardrop trophozoites, waterborne transmission, steatorrhea manifestations, metronidazole therapy, and USMLE yield.";
      }

      // Update or create meta tag for description
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', metaDesc);

      // 1. Dynamic Canonical Link tag Injection
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', `https://infectatlas.com/parasites/${getPathogenSlug(pathogen.name)}`);
      
      // 2. High-Yield "Frequently Asked Questions" (FAQ) Schema.org Microdata + MedicalWebPage Graph
      const mainDisease = pathogen.diseases[0];
      const qaList = [
        {
          "@type": "Question",
          "name": `What type of parasite is ${pathogen.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${pathogen.name} is classified as a ${pathogen.type} parasite. It is ${pathogen.organismClass} and its genome is ${pathogen.type}.`
          }
        },
        {
          "@type": "Question",
          "name": `What are the laboratory identification features of ${pathogen.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${pathogen.name} exhibits critical diagnostic biomarkers and clinical characteristics including: ${pathogen.characteristics.join(", ")}.`
          }
        }
      ];

      if (mainDisease) {
        qaList.push({
          "@type": "Question",
          "name": `What is the standard treatment for ${mainDisease.name} caused by ${pathogen.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Standard guideline antimicrobial treatment suggests: ${mainDisease.treatment}. ${mainDisease.clinicalPearl ? `Clinical Pearl: ${mainDisease.clinicalPearl}` : ""}`
          }
        });
      }

      const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalWebPage",
            "@id": `https://infectatlas.com/parasites/${getPathogenSlug(pathogen.name)}#webpage`,
            "url": `https://infectatlas.com/parasites/${getPathogenSlug(pathogen.name)}`,
            "name": pageTitle,
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
          },
          {
            "@type": "FAQPage",
            "@id": `https://infectatlas.com/parasites/${getPathogenSlug(pathogen.name)}#faq`,
            "mainEntity": qaList
          }
        ]
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

      // Cleanup schema scripts and headers on unmount or updates
      return () => {
        const script = document.getElementById("pathogen-jsonld-schema");
        if (script) script.remove();
        
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) {
          descTag.setAttribute('content', "Comprehensive reference guide of clinically critical Protozoa, Helminths, and Ectoparasites human pathogens with treatment guidelines.");
        }

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', "https://infectatlas.com/parasites");
        }
      };
    } else {
      document.title = "High-Yield Medical Parasitees & Pathogens Catalog | InfectAtlas Library";
      
      const directorySchema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "InfectAtlas Public Parasite Reference Library",
        "description": "Comprehensive reference guide of clinically critical Protozoa, Helminths, and Ectoparasites human pathogens with treatment guidelines.",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": parasitesData.map((m, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://infectatlas.com/parasites/${getPathogenSlug(m.name)}`,
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

      // Update directory meta description and canonical link
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', "Comprehensive reference guide of clinically critical Protozoa, Helminths, and Ectoparasites human pathogens with treatment guidelines.");

      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', "https://infectatlas.com/parasites");

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

  const handleTriggerRecall = (type: "parasite" | "disease" | "drug", id: string, name: string) => {
    setDrawerEntityType(type);
    setDrawerEntityId(id);
    setDrawerEntityName(name);
    setDrawerOpen(true);
  };

  // Scroll smoothly to selected sections to trigger Google Sitelinks targets
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Internal visual linking list builder
  const getRelatedPathogens = (current: Parasite): Parasite[] => {
    return parasitesData
      .filter((m) => m.id !== current.id && m.type === current.type)
      .slice(0, 2);
  };

  // Group directory list by category for rich index grouping
  const groupPathogensByCategory = () => {
    const groups: Record<string, Parasite[]> = {
      "Protozoa": [],
      "Helminth": [],
      "Ectoparasite": [],
      "Dimorphic & Dermatophyte": []
    };

    parasitesData.forEach((m) => {
      // Search term filtration check
      const query = searchTerm.toLowerCase().trim();
      if (query) {
        const matchesQuery = 
          m.name.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.type.toLowerCase().includes(query) ||
          m.characteristics.some(c => c.toLowerCase().includes(query)) ||
          m.diseases.some(d => d.name.toLowerCase().includes(query) || d.treatment.toLowerCase().includes(query));
        
        if (!matchesQuery) return;
      }

      // Category filter check
      if (selectedCategory !== "all") {
        if (selectedCategory === "Protozoa" && m.type !== "Protozoa") return;
        if (selectedCategory === "Helminth" && m.type !== "Helminth") return;
        if (selectedCategory === "Ectoparasite" && m.type !== "Ectoparasite") return;
      }

      if (m.type === "Protozoa") {
        groups["Protozoa"].push(m);
      } else if (m.type === "Helminth") {
        groups["Helminth"].push(m);
      } else if (m.type === "Ectoparasite") {
        groups["Ectoparasite"].push(m);
      }
    });

    return groups;
  };

  const groupedPathogens = groupPathogensByCategory();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans animate-fade-in" id="seo-root">
      {/* Pristine Clinical Reference Header */}
      <PublicHeader handleLaunchApp={handleLaunchApp} showHeader={showHeader} />

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
              We couldn\'t find a microparasite matching the key "<strong className="text-slate-800">{slug}</strong>" in the reference library.
            </p>
            <div className="pt-2">
              <Link
                to="/parasites"
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
            <div className="lg:col-span-2 space-y-8" id="overview">
              
              {/* Back navigation */}
              <div>
                <Link
                  to="/parasites"
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
                    pathogen.type === "Protozoa"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : pathogen.type === "Helminth"
                      ? "bg-pink-50 text-pink-700 border-pink-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {pathogen.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border border-slate-200 bg-white text-slate-600 capitalize">
                    
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans italic">
                    {pathogen.name}
                  </h1>
                  
                  {/* Standardized Clinical Nomenclature Indicators / Buzzwords field to capture long-tail query volumes */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 bg-slate-100/60 p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest shrink-0">Synonyms & Buzzwords:</span>
                    {getPathogenSynonyms(pathogen).map((syn, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-xs select-all text-indigo-950 font-semibold italic">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Interactive sub-navigation bar (Triggers Google Sitelinks) */}
                <div className="bg-slate-100/80 p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold text-slate-500 border border-slate-200 hide-scrollbar scroll-smooth">
                  <span className="text-[10px] uppercase font-bold text-slate-400 px-2 select-none shrink-0">Jump To:</span>
                  <button onClick={() => scrollToSection("overview")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Overview</button>
                  <button onClick={() => scrollToSection("identification")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Laboratory ID</button>
                  <button onClick={() => scrollToSection("clinical-regimens")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">IDSA Regimens</button>
                  <button onClick={() => scrollToSection("study-simulator")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">Practice Sandbox</button>
                  <button onClick={() => scrollToSection("medical-evidence")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">References</button>
                </div>
                
                {/* 3. Strong H1 and introduction block */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal bg-indigo-50/25 border-l-4 border-indigo-650 p-4 rounded-r-xl">
                  {getSEOIntroduction(pathogen)}
                </p>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-200 pt-3">
                  <strong className="text-slate-700">Clinical Overview:</strong> {pathogen.type} ({pathogen.organismClass}); Transmitted via {pathogen.transmission.toLowerCase()}. {pathogen.characteristics.join("; ")}.
                </p>

                {/* Highly visible but user-friendly CTA block to try the interactive app sandbox */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-3xs">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-extrabold text-indigo-600 tracking-wider flex items-center justify-center sm:justify-start gap-1">
                      <Layers className="h-3.5 w-3.5" /> Study Recall Practice Arena
                    </span>
                    <p className="text-xs text-slate-500 font-medium">
                      Simulate actual USMLE, NCLEX, or COMLEX style clinical vignettes for <strong className="text-slate-700">{pathogen.name}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => handleTriggerRecall("parasite", pathogen.id, pathogen.name)}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-lg shadow-sm transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Activity className="h-4 w-4" />
                    Test Recall (2 min)
                  </button>
                </div>
              </div>

              {/* Biomarkers / Key Characteristics Identification Grid */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4" id="identification">
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
              <div className="space-y-5" id="clinical-regimens">
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
                        {(() => {
                          const d = diseasesData.find(dx => dx.name.toLowerCase() === disease.name.toLowerCase() || (dx.alternateSlugs && dx.alternateSlugs.some(slug => disease.name.toLowerCase().includes(slug.replace(/-/g, ' ')))));
                          return d ? (
                            <Link to={`/diseases/${d.slug}`} className="font-extrabold text-sm sm:text-base text-indigo-650 hover:underline inline-flex items-center gap-1.5">
                              {disease.name} <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
                            </Link>
                          ) : (
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{disease.name}</h3>
                          );
                        })()}
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
                          <div className="text-slate-800 font-bold bg-indigo-50/30 p-2.5 rounded-lg border border-indigo-50 inline-block leading-snug">
                            {disease.treatment.split(/[,+]/).map((part, i, arr) => {
                              const tName = part.trim();
                              const drg = drugsData.find(dr => dr.name.toLowerCase().includes(tName.toLowerCase()) || tName.toLowerCase().includes(dr.name.toLowerCase()));
                              return (
                                <span key={i}>
                                  {drg ? (
                                    <Link to={`/drugs/${drg.slug}`} className="text-indigo-600 hover:underline">
                                      {tName}
                                    </Link>
                                  ) : (
                                    <span>{tName}</span>
                                  )}
                                  {i < arr.length - 1 ? (disease.treatment.includes('+') ? ' + ' : ', ') : ''}
                                </span>
                              );
                            })}
                          </div>
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

              {/* Related human pathogens section for internal linking SEO flow */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4.5 w-4.5 text-indigo-500" />
                  <h3 className="text-sm font-bold text-slate-950 uppercase tracking-tight">
                    Related human pathogens for exam comparative study
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getRelatedPathogens(pathogen).map((related) => (
                    <Link
                      key={related.id}
                      to={`/parasites/${getPathogenSlug(related.name)}`}
                      className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all shadow-3xs group flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-bold uppercase text-slate-400">
                            {related.type}
                          </span>
                          <span className="text-[10px] text-indigo-600 font-bold group-hover:underline transition-all inline-flex items-center gap-0.5">
                            Study <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-indigo-700 italic group-hover:text-indigo-900 transition-colors">
                          {related.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {related.type} ({related.organismClass}); Transmitted via {related.transmission.toLowerCase()}. {related.characteristics.join("; ")}.
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Medical Evidence Portal: References, guidelines, review parameters */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 scroll-mt-24 font-sans" id="medical-evidence">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4.5 w-4.5 text-indigo-505" />
                    <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-tight">
                      Authoritative Evidence & Quality Standards
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-extrabold uppercase tracking-wider bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-full shadow-3xs shrink-0 self-start sm:self-auto">
                    <span className="text-slate-450 font-semibold">Last Reviewed:</span>
                    <span className="text-slate-650">June 2026</span>
                    <span className="h-1 w-1 bg-slate-300 rounded-full" />
                    <span>Annual Cycle</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  To maintain strict clinical fidelity and board review accuracy (USMLE, COMLEX, NCLEX), this pathobiology profile has been cross-referenced with top-tier guidelines. Empirical choices must consistently align with your institution's local antibiogram safeguards.
                </p>

                <div className="grid grid-cols-1 gap-3.5">
                  {getPathogenReferences(pathogen.id, pathogen.name).map((ref, i) => (
                    <div key={i} className="p-4 bg-slate-50/70 border border-slate-200/60 rounded-xl space-y-2 hover:bg-slate-50/100 hover:border-slate-250 transition-all">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider border shadow-3xs ${
                          ref.type === "Clinical Guideline" 
                            ? "bg-indigo-50 border-indigo-100/80 text-indigo-700" 
                            : ref.type === "Public Health Consensus"
                            ? "bg-sky-50 border-sky-100/80 text-sky-700"
                            : ref.type === "Landmark Review Article"
                            ? "bg-emerald-50 border-emerald-100/80 text-emerald-700"
                            : "bg-slate-100 border-slate-200 text-slate-700"
                        }`}>
                          {ref.type}
                        </span>
                        <span className="text-[10px] text-slate-450 font-bold tracking-tight italic bg-white/70 px-2 py-0.5 rounded border border-slate-100/70 shadow-3xs">{ref.source}</span>
                      </div>
                      <p className="text-xs text-slate-755 font-bold leading-relaxed">
                        {ref.citation}
                      </p>
                      {ref.url && (
                        <a 
                          href={ref.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1 text-[10px] font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                        >
                          <span>Verify Source / Clinical Guideline Library</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Inline Legal/Compliance Agreement bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100/50 p-3 rounded-xl border border-slate-200/60 text-[10px] text-slate-500 font-semibold mb-1">
                  <span>Clinical references correspond with standard CDC & IDSA peer protocols.</span>
                  <Link to="/" className="font-bold text-indigo-650 hover:underline transition-all font-sans">
                    Review Terms of Clinical Use
                  </Link>
                </div>
              </div>

              {/* Graph-driven Intelligent Learning Experience widgets */}
              <IntelligentLearningPath entityType="pathogen" idOrSlug={pathogen.id} />
              <DynamicRelatedContent entityType="pathogen" idOrSlug={pathogen.id} />
              <ContinueLearningHistory />

            </div>

            {/* Right Column: Dynamic Conversion Funnel Sidebar */}
            <div className="space-y-6" id="study-simulator">
              
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
                      onClick={() => handleTriggerRecall("parasite", pathogen.id, pathogen.name)}
                      className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2 font-sans"
                    >
                      <Activity className="h-4 w-4 text-white" />
                      Quick Quiz: {pathogen.name}
                    </button>
                    
                    <button
                      onClick={() => handleTriggerRecall("parasite", pathogen.id, pathogen.name)}
                      className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-sans"
                    >
                      <BookmarkPlus className="h-4 w-4 text-emerald-400" />
                      Add to Mastery
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
            
            {/* Compact Unified Hero & Search Panel */}
            <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6 overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-[radial-gradient(circle_at_bottom_right,#0D254D,transparent)] pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="bg-indigo-505/10 border border-indigo-500/20 text-indigo-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider leading-none inline-block shadow-3xs">
                    Clinical Reference Catalog
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    Parasites Reference Library
                  </h1>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Deconstruct clinical Protozoa, Helminth, and Ectoparasite pathogens, complex life cycles, intermediate hosts, and IDSA-aligned treatment choices. Click on any pathogen below to explore deep-dive clinical pearls.
                  </p>
                </div>

                <div className="w-full lg:max-w-md shrink-0 relative group">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-455 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search parasites, protozoa, helminth, vector, characteristics, diseases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 focus:bg-slate-950/90 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 transition-all text-white placeholder:text-slate-400 shadow-sm"
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
                    { id: "all", name: "All Pathogens", color: "bg-indigo-600 text-white shadow-md border-indigo-400 hover:bg-indigo-500 hover:shadow-indigo-500/10" },
                    { id: "Protozoa", name: "Protozoa", color: "bg-blue-600 text-white shadow-md border-blue-400 hover:bg-blue-500 hover:shadow-blue-500/10" },
                    { id: "Helminth", name: "Helminths", color: "bg-orange-600 text-white shadow-md border-orange-450 hover:bg-orange-500 hover:shadow-orange-500/10" },
                    { id: "Ectoparasite", name: "Ectoparasites", color: "bg-emerald-600 text-white shadow-md border-emerald-450 hover:bg-emerald-500 hover:shadow-emerald-500/10" },
                    { id: "dimorphic-dermatophyte", name: "Dimorphics & Dermatophyte", color: "bg-purple-600 text-white shadow-md border-purple-400 hover:bg-purple-500 hover:shadow-purple-500/10" }
                  ].map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
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

            {/* Structured index layout with group corridors */}
            <div className="space-y-12">
              {Object.keys(groupedPathogens).filter(k => groupedPathogens[k].length > 0).map((groupName) => {
                const pathogens = groupedPathogens[groupName];
                const sample = pathogens[0];
                const styles = getPathogenStyles(sample.type);
                
                return (
                  <section key={groupName} className="space-y-6">
                    {/* Corridor Banner Header */}
                    <div className={`p-5 rounded-2xl bg-gradient-to-r ${styles.bannerBg} border ${styles.lightBorder} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs`}>
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 bg-white rounded-xl shadow-2xs border ${styles.lightBorder} ${styles.accentText}`}>
                          <Layers className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                            {groupName} Corridor
                          </h2>
                          <p className="text-xs text-slate-500 font-semibold">
                            Clinical reference modules of the {groupName} category.
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center">
                        <span className={`${styles.pill} text-[10px] font-black uppercase px-2.5 py-1 rounded-full border shadow-3xs`}>
                          {pathogens.length} Parasitees
                        </span>
                      </div>
                    </div>

                    {/* Corridor Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pathogens.map((m) => {
                        const mStyles = getPathogenStyles(m.type);
                        return (
                          <Link
                            key={m.id}
                            to={`/parasites/${getPathogenSlug(m.name)}`}
                            className={`p-6 bg-white border border-slate-250 border-l-4 ${mStyles.accentLine} rounded-2xl ${mStyles.hover} transition-all flex flex-col justify-between group cursor-pointer shadow-3xs`}
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className={`${mStyles.pill} border text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-3xs`}>
                                  {m.type}
                                </span>
                                <span className="text-[10px] text-indigo-600 font-extrabold group-hover:underline transition-all flex items-center gap-0.5 whitespace-nowrap">
                                  Micro Pearls
                                  <ExternalLink className="h-2.5 w-2.5" />
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                <h3 className="font-extrabold text-base text-slate-900 tracking-tight leading-snug group-hover:text-indigo-650 transition-colors italic">
                                  {m.name}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                  {m.type} ({m.organismClass}); Transmitted via {m.transmission.toLowerCase()}. {m.characteristics.join("; ")}.
                                </p>
                              </div>
                            </div>

                            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-400 min-w-0">
                              <span className={`font-semibold ${mStyles.accentText} bg-slate-50/50 px-2 py-0.5 rounded border border-slate-100 line-clamp-2 flex-1 min-w-0 block`} title={m.characteristics.slice(0, 2).join(", ")}>
                                {m.characteristics.slice(0, 2).join(", ")}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-amber-600 bg-amber-50/80 px-1.5 py-0.5 rounded border border-amber-100/70 shrink-0" title={`${m.diseases.length} associated pathologies`}>
                                <span>{m.diseases.length}</span>
                                <ShieldAlert className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>

            {Object.keys(groupedPathogens).filter(k => groupedPathogens[k].length > 0).length === 0 && (
              <div className="max-w-sm mx-auto text-center py-10 space-y-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
                <p className="text-xs font-bold text-slate-850">No matching microparasites found.</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Try adjusting your keywords or clearing the filter category in the header.
                </p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="mt-2 text-xs font-extrabold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Reset Directory
                </button>
              </div>
            )}

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
      <PublicFooter />

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
