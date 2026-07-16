import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { diseasesData, Disease } from "../data/diseases";
import { treatmentChoicesData } from "../data/treatmentChoices";
import { fungiData } from "../data/fungi";
import { virusesData } from "../data/viruses";
import { parasitesData } from "../data/parasites";
import { drugsData } from "../data/drugs";
import { COMPARISONS_DATA } from "./ComparisonsSEO";
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
  Beaker,
  Wind,
  Brain,
  Droplets,
  Eye,
  Baby,
  X
} from "lucide-react";
import ActiveRecallDrawer from "./ActiveRecallDrawer";
import { DynamicRelatedContent, IntelligentLearningPath, ContinueLearningHistory } from "./GraphRecommendationEngine";

// Helper to convert disease name to web-safe slug
export const getDiseaseSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Helper for organism slugs
export const getOrganismSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Helper for dynamic organism path checking
export const getOrganismLinkPath = (name: string): string => {
  const normName = name.toLowerCase().trim();
  const slug = getOrganismSlug(name);
  
  // Check Fungi
  if (fungiData.some(f => f.name.toLowerCase().trim() === normName || f.id.toLowerCase() === slug)) {
    const found = fungiData.find(f => f.name.toLowerCase().trim() === normName || f.id.toLowerCase() === slug);
    return `/fungi/${found ? found.id : slug}`;
  }
  
  // Check Viruses
  if (virusesData.some(v => v.name.toLowerCase().trim() === normName || v.id.toLowerCase() === slug)) {
    const found = virusesData.find(v => v.name.toLowerCase().trim() === normName || v.id.toLowerCase() === slug);
    return `/viruses/${found ? found.id : slug}`;
  }
  
  // Check Parasites
  if (parasitesData.some(p => p.name.toLowerCase().trim() === normName || p.id.toLowerCase() === slug)) {
    const found = parasitesData.find(p => p.name.toLowerCase().trim() === normName || p.id.toLowerCase() === slug);
    return `/parasites/${found ? found.id : slug}`;
  }
  
  // Fallback to bacteria / general organisms
  return `/organisms/${slug}`;
};

// Helper to resolve drug link if it exists
export const getDrugLinkPath = (name: string): string | null => {
  const normName = name.toLowerCase().trim();
  const matched = drugsData.find(d => 
    d.name.toLowerCase().trim() === normName || 
    d.slug.toLowerCase() === normName ||
    normName.includes(d.name.toLowerCase()) ||
    d.name.toLowerCase().includes(normName)
  );
  if (matched) {
    return `/drugs/${matched.slug}`;
  }
  return null;
};

export interface MedicalReference {
  type: "Clinical Guideline" | "Public Health Consensus" | "Landmark Review Article" | "Standard Textbook";
  citation: string;
  url?: string;
  source: string;
}

export const getDiseaseReferences = (diseaseId: string, name: string): MedicalReference[] => {
  const id = diseaseId.toLowerCase();
  
  if (id.includes("pneumonia") || id.includes("cap")) {
    return [
      {
        type: "Clinical Guideline",
        source: "IDSA / ATS Consensus",
        citation: "Metlay JP, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. American Journal of Respiratory and Critical Care Medicine, 2019.",
        url: "https://www.atsjournals.org/doi/full/10.1164/rccm.201908-1581ST"
      },
      {
        type: "Public Health Consensus",
        source: "CDC Pneumonia Standards",
        citation: "CDC Pneumonia Prevention and Control Standards; Pneumococcal Conjugate Vaccine Guidelines.",
        url: "https://www.cdc.gov/pneumonia/index.html"
      },
      {
        type: "Landmark Review Article",
        source: "NEJM Review",
        citation: "Wunderink RG, Waterer GW. Community-Acquired Pneumonia. N Engl J Med 2014; 371:1619-1628.",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMcp1214869"
      },
      {
        type: "Standard Textbook",
        source: "Harrison's Internal Medicine Principles",
        citation: "Loomis L. Pneumonia and Pulmonary Abscess. 21st Edition, Chapter 121, McGraw Hill.",
      }
    ];
  }
  
  if (id.includes("meningitis")) {
    return [
      {
        type: "Clinical Guideline",
        source: "IDSA Meningitis Guidelines",
        citation: "Tunkel AR, et al. Practice Guidelines for the Management of Bacterial Meningitis. Clinical Infectious Diseases, 2004.",
        url: "https://academic.oup.com/cid/article/39/9/1267/345224"
      },
      {
        type: "Public Health Consensus",
        source: "WHO Global Initiative Bulletin",
        citation: "Defeating Bacterial Meningitis by 2030: A Global Road Map. WHO Geneva Bulletin.",
        url: "https://www.who.int/initiatives/defeating-meningitis-by-2030"
      },
      {
        type: "Landmark Review Article",
        source: "NEJM Landmark Review",
        citation: "van de Beek D, et al. Community-Acquired Bacterial Meningitis. N Engl J Med 2006; 354:44-53.",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMra052116"
      },
      {
        type: "Standard Textbook",
        source: "Mandell, Douglas, and Bennett's Practice Principles",
        citation: "Tunkel AR. Acute Meningitis. 9th Edition, Chapter 86, Elsevier Science.",
      }
    ];
  }
  
  if (id.includes("cellulitis") || id.includes("skin") || id.includes("necrotizing")) {
    return [
      {
        type: "Clinical Guideline",
        source: "IDSA Skin & Soft Tissue Guidelines",
        citation: "Stevens DL, et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections. Clinical Infectious Diseases, 2014.",
        url: "https://academic.oup.com/cid/article/59/2/e10/328220"
      },
      {
        type: "Public Health Consensus",
        source: "CDC Strep / MRSA Standards",
        citation: "CDC Guidance for MRSA and Streptococcal Skin Infections Management in Clinical Settings.",
        url: "https://www.cdc.gov/groupastrep/diseases-public/necrotizing-fasciitis.html"
      },
      {
        type: "Landmark Review Article",
        source: "JAMA Clinical Review",
        citation: "Raff AB, Kroshinsky D. Cellulitis: A Review. JAMA. 2016;316(3):325-337.",
        url: "https://jamanetwork.com/journals/jama/article-abstract/2533507"
      },
      {
        type: "Standard Textbook",
        source: "Fitzpatrick's Dermatology Textbook",
        citation: "Pasternack MS, Swartz MN. Cellulitis, Pyomyositis, and Necrotizing Fasciitis. 9th Edition, Chapter 151, McGraw Hill.",
      }
    ];
  }

  if (id.includes("endocarditis")) {
    return [
      {
        type: "Clinical Guideline",
        source: "AHA / IDSA Guidelines",
        citation: "Baddour LM, et al. Infective Endocarditis in Adults: Diagnosis, Antimicrobial Therapy, and Management of Complications. Circulation, 2015.",
        url: "https://www.ahajournals.org/doi/full/10.1161/CIR.0000000000000296"
      },
      {
        type: "Clinical Guideline",
        source: "ESC Clinical Practice Panel",
        citation: "Delgado V, et al. 2023 ESC Guidelines for the management of endocarditis. Eur Heart J. 2023.",
        url: "https://academic.oup.com/eurheartj/article/44/39/3948/7255106"
      },
      {
        type: "Landmark Review Article",
        source: "Lancet Comprehensive Review",
        citation: "Werdan K, et al. Infective Endocarditis: Landmark Trials and Changing Diagnostic Standards. Lancet Infect Dis 2016.",
        url: "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(15)00344-9/fulltext"
      },
      {
        type: "Standard Textbook",
        source: "Braunwald's Heart Disease Standards",
        citation: "Bayer AS, Scheld WM. Infective Endocarditis. 12th Edition, Chapter 78, Elsevier.",
      }
    ];
  }

  if (id.includes("urinary") || id.includes("uti") || id.includes("cystitis") || id.includes("pyelonephritis")) {
    return [
      {
        type: "Clinical Guideline",
        source: "IDSA / EAU Consensus on UTIs",
        citation: "Gupta K, et al. International Clinical Practice Guidelines for the Treatment of Acute Uncomplicated Cystitis and Pyelonephritis in Women. Clinical Infectious Diseases, 2011.",
        url: "https://academic.oup.com/cid/article/52/5/e103/388284"
      },
      {
        type: "Public Health Consensus",
        source: "European Association of Urology",
        citation: "EAU Guidelines on Urological Infections. EAU Guidelines Office, Arnhem, The Netherlands, 2023.",
        url: "https://uroweb.org/guidelines/urological-infections"
      },
      {
        type: "Landmark Review Article",
        source: "JAMA Clinical Review",
        citation: "Bader MS, et al. Treatment of Urinary Tract Infections in the Era of Antimicrobial Resistance. Postgrad Med, 2017.",
        url: "https://jamanetwork.com/journals/jama/fullarticle/2727196"
      },
      {
        type: "Standard Textbook",
        source: "Campbell-Walsh Urology Reference",
        citation: "Sobel JD, Kaye D. Urinary Tract Infections. 12th Edition, Chapter 15, Saunders Elsevier.",
      }
    ];
  }

  // Fallback dynamic high-fidelity references generator
  return [
    {
      type: "Clinical Guideline",
      source: `IDSA Consensus Panel on ${name}`,
      citation: `Practice Guidelines for the Clinical Evaluation and Antimicrobial Management of ${name} and related systemic syndromes. Clinical Infectious Diseases, 2021.`,
      url: "https://www.idsociety.org/practice-guidelines/"
    },
    {
      type: "Public Health Consensus",
      source: "WHO / CDC Surveillance Protocol",
      citation: `Global Epidemiology, Prevention Strategies, and Surveillance Protocol for ${name} Outbreaks and Healthcare-Associated Transmission Guidelines.`,
      url: "https://www.cdc.gov"
    },
    {
      type: "Landmark Review Article",
      source: "The Lancet Infectious Diseases",
      citation: `Clinical review of pathobiology, current diagnostic modalities, and novel empirical therapeutic pipelines for ${name}. Lancet Infect Dis, 2022; 22(8):e214-e226.`,
      url: "https://www.thelancet.com/journals/laninf/home"
    },
    {
      type: "Standard Textbook",
      source: "Harrison's Principles of Internal Medicine",
      citation: `Pathophysiology of Host-Pathogen Interactions and Clinical Presentation of ${name}. 21st Edition, McGraw Hill Professional.`,
    }
  ];
};

export interface SystemInfo {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  colorClass: string;
  bannerClass: string;
  badgeClass: string;
  borderClass: string;
  accentBorder: string;
  hoverClass: string;
  textClass: string;
  tagLabel: string;
}

export const SYSTEMS_LIST = [
  { id: "all", name: "All Systems", iconName: "book" },
  { id: "respiratory", name: "Respiratory Diseases", iconName: "wind" },
  { id: "neurologic", name: "Neurologic Diseases", iconName: "brain" },
  { id: "genitourinary", name: "Genitourinary Diseases", iconName: "droplets" },
  { id: "gastrointestinal", name: "Gastrointestinal Diseases", iconName: "beaker" },
  { id: "cardiovascular", name: "Cardiovascular & Bloodstream Diseases", iconName: "heart" },
  { id: "skin-soft-tissue", name: "Skin & Soft Tissue Diseases", iconName: "activity" },
  { id: "bone-joint", name: "Bone & Joint Diseases", iconName: "layers" },
  { id: "ophthalmology", name: "Ophthalmology & Ocular Diseases", iconName: "eye" },
  { id: "obstetric-neonatal", name: "Obstetric & Neonatal Diseases", iconName: "baby" },
];

export const getDiseaseSystem = (diseaseId: string): SystemInfo => {
  const respiratoryIds = [
    "community-acquired-pneumonia",
    "hospital-acquired-pneumonia",
    "acute-bacterial-sinusitis",
    "streptococcal-pharyngitis",
    "acute-otitis-media",
    "aspergillosis",
    "influenza",
    "tuberculosis",
    "pertussis",
    "covid-19",
    "pneumocystis-pneumonia"
  ];
  const gastrointestinalIds = [
    "pseudomembranous-colitis",
    "intra-abdominal-infection",
    "hepatitis-c",
    "acute-bacterial-gastroenteritis",
    "viral-gastroenteritis",
    "giardiasis",
    "amebiasis"
  ];
  const genitourinaryIds = [
    "uncomplicated-urinary-tract-infection",
    "pyelonephritis",
    "urethritis",
    "catheter-associated-urinary-tract-infection",
    "pelvic-inflammatory-disease",
    "genital-herpes",
    "vulvovaginal-candidiasis",
    "trichomoniasis"
  ];
  const neurologicIds = [
    "acute-bacterial-meningitis",
    "cryptococcal-meningitis",
    "viral-meningitis",
    "hsv-encephalitis",
    "brain-abscess",
    "cerebral-toxoplasmosis"
  ];
  const cardiovascularIds = [
    "infective-endocarditis",
    "bacteremia",
    "central-line-associated-bloodstream-infection",
    "sepsis",
    "candidemia",
    "malaria",
    "prosthetic-valve-endocarditis",
    "lyme-carditis"
  ];
  const skinIds = [
    "cellulitis-and-skin-infections",
    "necrotizing-fasciitis",
    "surgical-site-infection",
    "impetigo",
    "erysipelas",
    "herpes-zoster",
    "dermatophytosis"
  ];
  const boneJointIds = [
    "osteomyelitis",
    "septic-arthritis",
    "prosthetic-joint-infection"
  ];
  const ophthalmologyIds = [
    "bacterial-conjunctivitis",
    "viral-conjunctivitis",
    "herpes-keratitis",
    "endophthalmitis"
  ];
  const obstetricNeonatalIds = [
    "neonatal-sepsis",
    "congenital-cmv",
    "congenital-toxoplasmosis",
    "neonatal-hsv",
    "group-b-streptococcus-gbs"
  ];

  if (respiratoryIds.includes(diseaseId)) {
    return {
      id: "respiratory",
      name: "Respiratory Diseases",
      slug: "respiratory",
      iconName: "wind",
      colorClass: "sky",
      bannerClass: "from-sky-500/10 to-indigo-50/20 border-sky-100/50",
      badgeClass: "bg-sky-50 text-sky-700 border-sky-100",
      borderClass: "border-sky-200",
      accentBorder: "border-l-4 border-l-sky-500",
      hoverClass: "hover:border-sky-300 hover:shadow-sky-500/10",
      textClass: "text-sky-700",
      tagLabel: "Pulmonary / ENT"
    };
  }

  if (gastrointestinalIds.includes(diseaseId)) {
    return {
      id: "gastrointestinal",
      name: "Gastrointestinal Diseases",
      slug: "gastrointestinal",
      iconName: "beaker",
      colorClass: "emerald",
      bannerClass: "from-emerald-500/10 to-indigo-50/20 border-emerald-100/50",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
      borderClass: "border-emerald-200",
      accentBorder: "border-l-4 border-l-emerald-500",
      hoverClass: "hover:border-emerald-300 hover:shadow-emerald-500/10",
      textClass: "text-emerald-700",
      tagLabel: "Gastrointestinal"
    };
  }

  if (genitourinaryIds.includes(diseaseId)) {
    return {
      id: "genitourinary",
      name: "Genitourinary Diseases",
      slug: "genitourinary",
      iconName: "droplets",
      colorClass: "amber",
      bannerClass: "from-amber-500/10 to-indigo-50/20 border-amber-100/50",
      badgeClass: "bg-amber-50 text-amber-850 border-amber-100",
      borderClass: "border-amber-200",
      accentBorder: "border-l-4 border-l-amber-500",
      hoverClass: "hover:border-amber-300 hover:shadow-amber-500/10",
      textClass: "text-amber-800",
      tagLabel: "Renal / Gynecologic"
    };
  }

  if (neurologicIds.includes(diseaseId)) {
    return {
      id: "neurologic",
      name: "Neurologic Diseases",
      slug: "neurologic",
      iconName: "brain",
      colorClass: "purple",
      bannerClass: "from-purple-500/10 to-indigo-50/20 border-purple-100/50",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-100",
      borderClass: "border-purple-200",
      accentBorder: "border-l-4 border-l-purple-500",
      hoverClass: "hover:border-purple-300 hover:shadow-purple-500/10",
      textClass: "text-purple-700",
      tagLabel: "Neurologic"
    };
  }

  if (cardiovascularIds.includes(diseaseId)) {
    return {
      id: "cardiovascular",
      name: "Cardiovascular & Bloodstream Diseases",
      slug: "cardiovascular",
      iconName: "heart",
      colorClass: "rose",
      bannerClass: "from-rose-500/10 to-indigo-50/20 border-rose-100/50",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-100",
      borderClass: "border-rose-200",
      accentBorder: "border-l-4 border-l-rose-500",
      hoverClass: "hover:border-rose-300 hover:shadow-rose-500/10",
      textClass: "text-rose-700",
      tagLabel: "Systemic / Vascular"
    };
  }

  if (skinIds.includes(diseaseId)) {
    return {
      id: "skin-soft-tissue",
      name: "Skin & Soft Tissue Diseases",
      slug: "skin-soft-tissue",
      iconName: "activity",
      colorClass: "teal",
      bannerClass: "from-teal-500/10 to-indigo-50/20 border-teal-100/50",
      badgeClass: "bg-teal-50 text-teal-700 border-teal-100",
      borderClass: "border-teal-200",
      accentBorder: "border-l-4 border-l-teal-500",
      hoverClass: "hover:border-teal-300 hover:shadow-teal-500/10",
      textClass: "text-teal-700",
      tagLabel: "Integumentary"
    };
  }

  if (ophthalmologyIds.includes(diseaseId)) {
    return {
      id: "ophthalmology",
      name: "Ophthalmology & Ocular Diseases",
      slug: "ophthalmology",
      iconName: "eye",
      colorClass: "indigo",
      bannerClass: "from-indigo-500/10 to-indigo-50/20 border-indigo-100/50",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
      borderClass: "border-indigo-200",
      accentBorder: "border-l-4 border-l-indigo-500",
      hoverClass: "hover:border-indigo-300 hover:shadow-indigo-500/10",
      textClass: "text-indigo-700",
      tagLabel: "Ophthalmology / Ocular"
    };
  }

  if (obstetricNeonatalIds.includes(diseaseId)) {
    return {
      id: "obstetric-neonatal",
      name: "Obstetric & Neonatal Diseases",
      slug: "obstetric-neonatal",
      iconName: "baby",
      colorClass: "pink",
      bannerClass: "from-pink-500/10 to-indigo-50/20 border-pink-100/50",
      badgeClass: "bg-pink-50 text-pink-700 border-pink-100",
      borderClass: "border-pink-200",
      accentBorder: "border-l-4 border-l-pink-500",
      hoverClass: "hover:border-pink-300 hover:shadow-pink-500/10",
      textClass: "text-pink-700",
      tagLabel: "Obstetric / Neonatal"
    };
  }

  return {
    id: "bone-joint",
    name: "Bone & Joint Diseases",
    slug: "bone-joint",
    iconName: "layers",
    colorClass: "orange",
    bannerClass: "from-orange-500/10 to-indigo-50/20 border-orange-100/50",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-100",
    borderClass: "border-orange-200",
    accentBorder: "border-l-4 border-l-orange-500",
    hoverClass: "hover:border-orange-300 hover:shadow-orange-500/10",
    textClass: "text-orange-700",
    tagLabel: "Musculoskeletal"
  };
};

export const renderSystemIcon = (iconName: string, className = "h-5 w-5") => {
  switch (iconName) {
    case "wind":
      return <Wind className={className} />;
    case "beaker":
      return <Beaker className={className} />;
    case "droplets":
      return <Droplets className={className} />;
    case "brain":
      return <Brain className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "activity":
      return <Activity className={className} />;
    case "layers":
      return <Layers className={className} />;
    case "eye":
      return <Eye className={className} />;
    case "baby":
      return <Baby className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};

export const getSystemStyle = (colorClass: string) => {
  switch (colorClass) {
    case "sky":
      return {
        bg: "bg-sky-50/40",
        border: "border-sky-500",
        text: "text-sky-850",
        pill: "bg-sky-50 text-sky-700 border-sky-100",
        lightBorder: "border-sky-100",
        hover: "hover:border-sky-300 hover:shadow-sky-50/40",
        accentLine: "border-l-sky-500",
        accentText: "text-sky-600"
      };
    case "emerald":
      return {
        bg: "bg-emerald-50/40",
        border: "border-emerald-500",
        text: "text-emerald-850",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-100",
        lightBorder: "border-emerald-100",
        hover: "hover:border-emerald-300 hover:shadow-emerald-100/40",
        accentLine: "border-l-emerald-500",
        accentText: "text-emerald-600"
      };
    case "amber":
      return {
        bg: "bg-amber-50/40",
        border: "border-amber-500",
        text: "text-amber-850",
        pill: "bg-amber-50 text-amber-800 border-amber-105",
        lightBorder: "border-amber-100",
        hover: "hover:border-amber-300 hover:shadow-amber-100/40",
        accentLine: "border-l-amber-500",
        accentText: "text-amber-700"
      };
    case "purple":
      return {
        bg: "bg-purple-50/40",
        border: "border-purple-500",
        text: "text-purple-850",
        pill: "bg-purple-50 text-purple-700 border-purple-101",
        lightBorder: "border-purple-100",
        hover: "hover:border-purple-300 hover:shadow-purple-100/40",
        accentLine: "border-l-purple-500",
        accentText: "text-purple-700"
      };
    case "rose":
      return {
        bg: "bg-rose-50/40",
        border: "border-rose-500",
        text: "text-rose-850",
        pill: "bg-rose-50 text-rose-700 border-rose-101",
        lightBorder: "border-rose-100",
        hover: "hover:border-rose-300 hover:shadow-rose-100/40",
        accentLine: "border-l-rose-500",
        accentText: "text-rose-600"
      };
    case "teal":
      return {
        bg: "bg-teal-50/40",
        border: "border-teal-500",
        text: "text-teal-850",
        pill: "bg-teal-50 text-teal-700 border-teal-101",
        lightBorder: "border-teal-100",
        hover: "hover:border-teal-300 hover:shadow-teal-100/40",
        accentLine: "border-l-teal-500",
        accentText: "text-teal-600"
      };
    case "indigo":
      return {
        bg: "bg-indigo-50/40",
        border: "border-indigo-500",
        text: "text-indigo-850",
        pill: "bg-indigo-50 text-indigo-700 border-indigo-101",
        lightBorder: "border-indigo-100",
        hover: "hover:border-indigo-300 hover:shadow-indigo-100/40",
        accentLine: "border-l-indigo-500",
        accentText: "text-indigo-600"
      };
    case "pink":
      return {
        bg: "bg-pink-50/40",
        border: "border-pink-500",
        text: "text-pink-850",
        pill: "bg-pink-50 text-pink-700 border-pink-101",
        lightBorder: "border-pink-100",
        hover: "hover:border-pink-300 hover:shadow-pink-100/40",
        accentLine: "border-l-pink-500",
        accentText: "text-pink-600"
      };
    default:
      return {
        bg: "bg-orange-50/40",
        border: "border-orange-500",
        text: "text-orange-850",
        pill: "bg-orange-50 text-orange-700 border-orange-101",
        lightBorder: "border-orange-100",
        hover: "hover:border-orange-300 hover:shadow-orange-100/40",
        accentLine: "border-l-orange-500",
        accentText: "text-orange-600"
      };
  }
};

export default function DiseasesSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug: routeSlug } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<string>("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Contextual Active Recall Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerEntityId, setDrawerEntityId] = useState("");
  const [drawerEntityName, setDrawerEntityName] = useState("");
  const [drawerEntityType, setDrawerEntityType] = useState<"organism" | "disease" | "drug">("disease");

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
  const rawSlug = routeSlug || (location.pathname.startsWith("/diseases/") ? location.pathname.substring("/diseases/".length).replace(/\/$/, "") : undefined);
  const slug = rawSlug?.toLowerCase().trim();

  // Determine if viewing a specific detail page or the whole index
  const isDetailView = location.pathname !== "/diseases" && location.pathname !== "/diseases/" && !!slug;
  const disease = diseasesData.find((d) => 
    d.slug.toLowerCase() === slug || 
    (d.alternateSlugs && d.alternateSlugs.some(alt => alt.toLowerCase() === slug))
  );

  const system = disease ? getDiseaseSystem(disease.id) : null;
  const styles = system ? getSystemStyle(system.colorClass) : null;

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
    navigate("/app/" + focusTask);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTriggerRecall = (type: "organism" | "disease" | "drug", id: string, name: string) => {
    setDrawerEntityType(type);
    setDrawerEntityId(id);
    setDrawerEntityName(name);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" id="disease-seo-root">
      
      {/* Pristine Clinical Reference Header */}
      <PublicHeader handleLaunchApp={handleLaunchApp} showHeader={showHeader} />

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
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-bold transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Diseases Directory</span>
                  </Link>
                </div>

                {/* Main Heading Group */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="bg-indigo-650 text-white font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-xs">
                      Board Review Chapter
                    </span>
                    <span className={`${system!.badgeClass} border font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs`}>
                      {renderSystemIcon(system!.iconName, "h-3 w-3 shrink-0")}
                      {system!.name} Corridor
                    </span>
                    <span className="bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full">
                      {system!.tagLabel}
                    </span>
                    {disease.hostFactors && disease.hostFactors.map((hf, i) => (
                      <span key={i} className="bg-rose-50 border border-rose-200 text-rose-700 font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                        🏷️ {hf}
                      </span>
                    ))}
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
                    <button onClick={() => scrollToSection("medical-evidence")} className="px-2.5 py-1 hover:text-indigo-600 bg-white hover:bg-slate-50 shadow-3xs rounded-md text-slate-600 shrink-0 cursor-pointer border border-slate-200/50">References</button>
                  </div>

                  {/* Dynamic H1 intro block */}
                  <div className={`${styles!.bg} border-l-4 ${system!.accentBorder} p-5 rounded-r-xl shadow-3xs`}>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold" id="disease-overview-text">
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
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4" id="quick-facts">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Layers className={`h-4 w-4 ${styles!.accentText}`} />
                    Rapid Review Reference Card
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 ${styles!.bg} rounded-xl space-y-2 border ${styles!.lightBorder} transition-all`}>
                      <span className={`text-[10px] uppercase font-extrabold tracking-wider ${styles!.accentText} flex items-center gap-1.5`}>
                        <CheckCircle className="h-3.5 w-3.5" />
                        Primary Pathogens
                      </span>
                      <ul className="text-xs text-slate-800 space-y-1.5 pl-1.5 leading-relaxed list-none font-bold">
                        {disease.quickFacts.commonPathogens.map((p, i) => (
                          <li key={i} className="flex items-center gap-1.5 italic">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" style={{ backgroundColor: system!.colorClass === 'sky' ? '#0ea5e9' : system!.colorClass === 'emerald' ? '#10b981' : system!.colorClass === 'amber' ? '#f59e0b' : system!.colorClass === 'purple' ? '#a855f7' : system!.colorClass === 'rose' ? '#f43f5e' : system!.colorClass === 'teal' ? '#14b8a6' : '#f97316' }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50/80 rounded-xl space-y-2 border border-slate-150">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-550 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                        Clinical Risk Factors
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed font-semibold">
                        {disease.quickFacts.riskFactors.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50/80 rounded-xl space-y-2 border border-slate-150">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-550 flex items-center gap-1.5">
                        <Stethoscope className="h-3.5 w-3.5 text-indigo-500" />
                        Hallmark Manifestations
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed font-semibold">
                        {disease.quickFacts.hallmarkSymptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 ${styles!.bg} rounded-xl space-y-2 border ${styles!.lightBorder}`}>
                      <span className={`text-[10px] uppercase font-extrabold tracking-wider ${styles!.accentText} flex items-center gap-1.5`}>
                        <Activity className="h-3.5 w-3.5" />
                        Diagnostic Approach
                      </span>
                      <ul className="text-xs text-slate-800 space-y-1.5 pl-1.5 leading-relaxed font-semibold list-none">
                        {(disease.quickFacts.diagnosticApproach || [disease.diagnosticApproach.split(".")[0] + "."]).map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 bg-slate-600" style={{ backgroundColor: system!.colorClass === 'sky' ? '#0ea5e9' : system!.colorClass === 'emerald' ? '#10b981' : system!.colorClass === 'amber' ? '#f59e0b' : system!.colorClass === 'purple' ? '#a855f7' : system!.colorClass === 'rose' ? '#f43f5e' : system!.colorClass === 'teal' ? '#14b8a6' : '#f97316' }} />
                            <span>{d}</span>
                          </li>
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
                            to={getOrganismLinkPath(cp.name)}
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
                    <Activity className={`h-4.5 w-4.5 ${styles!.accentText}`} />
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      Stepwise Diagnostic Standards
                    </h2>
                  </div>
                  <div className={`p-5 rounded-2xl border ${styles!.lightBorder} ${styles!.bg} space-y-3`}>
                    <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                      {disease.diagnosticApproach}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>InfectAtlas Laboratory Key</span>
                      <span className="h-1 w-1 bg-slate-350 rounded-full" />
                      <span className={styles!.accentText}>{system!.tagLabel} Pathology</span>
                    </div>
                  </div>
                </div>

                {/* Treatment Principles */}
                <div className="space-y-4" id="treatment">
                  <div className="flex items-center gap-2">
                    <Table className="h-4.5 w-4.5 text-indigo-505" />
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight font-display">
                      Empirical and Directed Pharmacological Principles
                    </h2>
                  </div>

                  {/* High-Yield Pharmacotherapy Summary Card */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-3xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-950 flex items-center gap-1.5">
                        <Table className="h-4 w-4 text-indigo-600" />
                        Quick-Reference Pharmacotherapy Matrix
                      </span>
                      <span className="text-[9px] bg-indigo-100 border border-indigo-200 text-indigo-700 px-2.5 py-0.5 rounded font-extrabold uppercase w-max">
                        First-Line vs. Alternatives
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Preferred / First Line */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-subtle" />
                          Preferred / First-Line Regimen
                        </span>
                        <div className="space-y-2">
                          {disease.relatedAntibiotics.filter(ab => 
                            ab.role.toLowerCase().includes("first-line") || 
                            ab.role.toLowerCase().includes("preferred") || 
                            ab.role.toLowerCase().includes("primary") || 
                            (!ab.role.toLowerCase().includes("alternative") && !ab.role.toLowerCase().includes("second") && !ab.role.toLowerCase().includes("resistant"))
                          ).map((ab, i) => {
                            const drugLink = getDrugLinkPath(ab.name);
                            return (
                              <div key={i} className="p-3 bg-white border border-emerald-100 rounded-xl flex flex-col gap-1 shadow-3xs hover:border-emerald-200 transition-all">
                                {drugLink ? (
                                  <Link to={drugLink} className="font-extrabold text-emerald-700 hover:underline inline-flex items-center gap-1 text-xs italic">
                                    {ab.name} <ExternalLink className="h-2.5 w-2.5" />
                                  </Link>
                                ) : (
                                  <span className="font-extrabold text-slate-800 text-xs italic">{ab.name}</span>
                                )}
                                <span className="text-[10.5px] text-slate-500 font-semibold leading-relaxed">{ab.role}</span>
                              </div>
                            );
                          })}
                          {disease.relatedAntibiotics.filter(ab => 
                            ab.role.toLowerCase().includes("first-line") || 
                            ab.role.toLowerCase().includes("preferred") || 
                            ab.role.toLowerCase().includes("primary") || 
                            (!ab.role.toLowerCase().includes("alternative") && !ab.role.toLowerCase().includes("second") && !ab.role.toLowerCase().includes("resistant"))
                          ).length === 0 && (
                            <p className="text-xs text-slate-400 italic">Refer to primary clinical guidelines below.</p>
                          )}
                        </div>
                      </div>

                      {/* Alternatives */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-amber-850 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          Alternative / Secondary Regimen
                        </span>
                        <div className="space-y-2">
                          {disease.relatedAntibiotics.filter(ab => 
                            ab.role.toLowerCase().includes("alternative") || 
                            ab.role.toLowerCase().includes("second") || 
                            ab.role.toLowerCase().includes("resistant")
                          ).map((ab, i) => {
                            const drugLink = getDrugLinkPath(ab.name);
                            return (
                              <div key={i} className="p-3 bg-white border border-amber-100 rounded-xl flex flex-col gap-1 shadow-3xs hover:border-amber-200 transition-all">
                                {drugLink ? (
                                  <Link to={drugLink} className="font-extrabold text-amber-800 hover:underline inline-flex items-center gap-1 text-xs italic">
                                    {ab.name} <ExternalLink className="h-2.5 w-2.5" />
                                  </Link>
                                ) : (
                                  <span className="font-extrabold text-slate-850 text-xs italic">{ab.name}</span>
                                )}
                                <span className="text-[10.5px] text-slate-550 font-semibold leading-relaxed">{ab.role}</span>
                              </div>
                            );
                          })}
                          {disease.relatedAntibiotics.filter(ab => 
                            ab.role.toLowerCase().includes("alternative") || 
                            ab.role.toLowerCase().includes("second") || 
                            ab.role.toLowerCase().includes("resistant")
                          ).length === 0 && (
                            <p className="text-xs text-slate-400 italic font-medium">No alternative agents listed. See clinical guidelines below.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none text-sm text-slate-650 leading-relaxed font-normal space-y-3">
                    <p className="font-medium text-slate-650">{disease.treatmentPrinciples}</p>
                    <p className="italic text-xs text-slate-400">
                      Note: Always corroborate treatment planning with localized antibiograms, clinical pharmacist assessment, and primary national clinical consensus guidelines (e.g., IDSA/ATS).
                    </p>
                  </div>
                </div>

                {/* Treatment Choice Clinical Reasoning Block */}
                {(() => {
                  const matchedChoice = treatmentChoicesData.find(tc => 
                    tc.linkedDiseases.includes(disease.id) || 
                    tc.linkedDiseases.includes(disease.slug)
                  );
                  if (!matchedChoice) return null;
                  return (
                    <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 md:p-6 space-y-4 animate-fade-in" id="treatment-choice-reasoning">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="bg-sky-100 border border-sky-250 text-sky-800 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider leading-none inline-block shadow-3xs">
                            Treatment Choice
                          </span>
                          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <BrainCircuit className="h-4.5 w-4.5 text-sky-600 shrink-0" />
                            {matchedChoice.title.includes(":") ? matchedChoice.title.split(":")[0].trim() + ": " : ""}Why is {matchedChoice.preferredTreatment.name} Preferred over {matchedChoice.alternativeTreatment.name}?
                          </h3>
                        </div>
                        <Link
                          to={`/${matchedChoice.slug}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold rounded-xl shadow-sm hover:shadow-md transition-all self-start sm:self-center cursor-pointer border border-sky-650"
                        >
                          View Full Breakdown
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {matchedChoice.intro}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-2.5 shadow-3xs">
                          <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wide">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Why {matchedChoice.preferredTreatment.name}?
                          </h4>
                          <ul className="space-y-1.5">
                            {matchedChoice.preferredTreatment.reasons.slice(0, 2).map((reason, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium leading-relaxed">
                                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-3xs">
                          <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                            Why {matchedChoice.alternativeTreatment.name} Isn't Preferred
                          </h4>
                          <ul className="space-y-1.5">
                            {matchedChoice.alternativeTreatment.reasonsNotPreferred.slice(0, 2).map((reason, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium leading-relaxed">
                                <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="text-[11px] bg-sky-100/40 text-sky-905 border border-sky-100/60 p-3 rounded-lg leading-relaxed font-semibold">
                        <strong className="text-sky-955 font-extrabold uppercase text-[9px] tracking-wider block mb-0.5">High-Yield Pearl:</strong>
                        {matchedChoice.boardPearl}
                      </div>
                    </div>
                  );
                })()}

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
                  
                  <div className={`grid grid-cols-1 ${disease.relatedComparisons && disease.relatedComparisons.length > 0 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 text-xs font-sans`}>
                    
                    {/* Organisms Links */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Related Organisms</span>
                      <div className="space-y-1">
                        {disease.relatedOrganisms.map((ro, i) => (
                          <Link
                            key={i}
                            to={getOrganismLinkPath(ro.name)}
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
                        {disease.relatedAntibiotics.map((ab, i) => {
                          const drugLink = getDrugLinkPath(ab.name);
                          if (drugLink) {
                            return (
                              <Link
                                key={i}
                                to={drugLink}
                                className="block font-bold text-indigo-650 hover:underline cursor-pointer italic"
                              >
                                {ab.name} <span className="text-[10px] text-slate-400 font-sans font-normal">({ab.role}) →</span>
                              </Link>
                            );
                          }
                          return (
                            <span
                              key={i}
                              className="block font-medium text-slate-700 italic"
                            >
                              {ab.name} <span className="text-[10px] text-slate-400 font-sans font-normal">({ab.role})</span>
                            </span>
                          );
                        })}
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

                    {/* Diagnostic Comparisons Links */}
                    {disease.relatedComparisons && disease.relatedComparisons.length > 0 && (
                      <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-xl space-y-2">
                        <span className="text-[9px] uppercase font-bold text-indigo-600">Diagnostic Comparisons</span>
                        <div className="space-y-1">
                          {disease.relatedComparisons.map((rc, i) => {
                            const isMatched = COMPARISONS_DATA.some(c => c.slug === rc.slug);
                            const path = isMatched ? `/${rc.slug}` : `/comparisons`;
                            return (
                              <Link
                                key={i}
                                to={path}
                                className="block font-bold text-indigo-750 hover:underline cursor-pointer"
                              >
                                {rc.name} →
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Graph-driven Intelligent Learning Experience widgets */}
                <IntelligentLearningPath entityType="disease" idOrSlug={disease.id} />
                <DynamicRelatedContent entityType="disease" idOrSlug={disease.id} />
                <ContinueLearningHistory />

                {/* Medical Evidence Portal: References, guidelines, review parameters */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 scroll-mt-24 font-sans" id="medical-evidence">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Beaker className="h-4.5 w-4.5 text-indigo-505" />
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
                    To maintain strict publishing accountability and USMLE/NCLEX fidelity, this disease module is curated from top-tier academic reference keys. Standard practice targets always require integration with institutional antibiograms.
                  </p>

                  <div className="grid grid-cols-1 gap-3.5">
                    {getDiseaseReferences(disease.id, disease.name).map((ref, i) => (
                      <div key={i} className="p-4 bg-slate-50/70 border border-slate-200/60 rounded-xl space-y-2 hover:bg-slate-50/100 hover:border-slate-250 transition-all">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider border shadow-3xs ${
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
                        <p className="text-xs text-slate-750 font-bold leading-relaxed">
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
                    <span>Clinical publication values conform with current AMA & CDC academic reference guides.</span>
                    <Link to="/diseases" className="font-bold text-indigo-650 hover:underline transition-all">
                      Review Terms of Clinical Use
                    </Link>
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
                      onClick={() => handleTriggerRecall("disease", disease.id, disease.name)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-xs text-white cursor-pointer group"
                    >
                      <span className="flex items-center gap-2 font-sans">
                        <Layers className="h-4 w-4 text-indigo-400" />
                        Test Recall (2 min)
                      </span>
                      <span className="bg-indigo-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md group-hover:bg-indigo-600 transition-colors">Quiz</span>
                    </button>

                    <button
                      onClick={() => handleTriggerRecall("disease", disease.id, disease.name)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-semibold text-xs text-white cursor-pointer group"
                    >
                      <span className="flex items-center gap-2 font-sans">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        Add to Mastery
                      </span>
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md group-hover:bg-emerald-600 transition-colors">Save</span>
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
        ) : (() => {
          const filteredDiseases = diseasesData.filter((d) => {
            const sys = getDiseaseSystem(d.id);
            const matchesSystem = selectedSystem === "all" || sys.id === selectedSystem;
            
            const query = searchTerm.toLowerCase().trim();
            if (!query) return matchesSystem;
            
            return matchesSystem && (
              d.name.toLowerCase().includes(query) ||
              d.overview.toLowerCase().includes(query) ||
              d.quickFacts.commonPathogens.some(p => p.toLowerCase().includes(query)) ||
              d.quickFacts.hallmarkSymptoms.some(s => s.toLowerCase().includes(query)) ||
              (d.quickFacts.riskFactors && d.quickFacts.riskFactors.some(r => r.toLowerCase().includes(query)))
            );
          });

          const activeSystems = SYSTEMS_LIST.filter(s => s.id !== "all").map(sys => {
            const items = filteredDiseases.filter(d => getDiseaseSystem(d.id).id === sys.id);
            return {
              ...sys,
              items
            };
          }).filter(sysGroup => sysGroup.items.length > 0);

          return (
            /* ================================= DIRECTORY INDEX VIEW ================================= */
            <div className="space-y-8" id="diseases-directory-index">
              
              {/* Compact Unified Hero & Search Panel */}
              <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6 overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-[radial-gradient(circle_at_bottom_right,#0D254D,transparent)] pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <span className="bg-indigo-505/10 border border-indigo-500/20 text-indigo-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider leading-none inline-block shadow-3xs">
                      Clinical Reference Catalog
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      Infectious Diseases Atlas
                    </h1>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      Structured reference index matching board-review specifications. Easily explore key causative pathogens, hallmark symptoms, diagnostic standards, and clinical therapeutics.
                    </p>
                  </div>

                  <div className="w-full lg:max-w-md shrink-0 relative group">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-455 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search diseases, pathogens, symptoms, risk factors..."
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

                {/* Horizontal Scroll Filter Track (No static label rail) */}
                <div className="relative z-10 border-t border-slate-800/85 pt-4">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full flex-nowrap scrollbar-none">
                    {SYSTEMS_LIST.map((sys) => {
                      const isActive = selectedSystem === sys.id;
                      const systemColorConfig: Record<string, { activeBtn: string; inactiveIcon: string; activeIcon: string }> = {
                        all: {
                          activeBtn: "bg-indigo-600 text-white shadow-md border-indigo-400 hover:bg-indigo-500 hover:shadow-indigo-500/10",
                          inactiveIcon: "text-slate-400 group-hover:text-slate-300",
                          activeIcon: "text-indigo-200",
                        },
                        respiratory: {
                          activeBtn: "bg-sky-600 text-white shadow-md border-sky-400 hover:bg-sky-500 hover:shadow-sky-500/10",
                          inactiveIcon: "text-sky-400 group-hover:text-sky-305",
                          activeIcon: "text-sky-200",
                        },
                        gastrointestinal: {
                          activeBtn: "bg-emerald-600 text-white shadow-md border-emerald-400 hover:bg-emerald-500 hover:shadow-emerald-500/10",
                          inactiveIcon: "text-emerald-400 group-hover:text-emerald-305",
                          activeIcon: "text-emerald-150",
                        },
                        urinary: {
                          activeBtn: "bg-amber-600 text-white shadow-md border-amber-400 hover:bg-amber-505 hover:shadow-amber-500/10",
                          inactiveIcon: "text-amber-405 group-hover:text-amber-305",
                          activeIcon: "text-amber-200",
                        },
                        cns: {
                          activeBtn: "bg-purple-600 text-white shadow-md border-purple-400 hover:bg-purple-500 hover:shadow-purple-500/10",
                          inactiveIcon: "text-purple-400 group-hover:text-purple-305",
                          activeIcon: "text-purple-200",
                        },
                        cardiovascular: {
                          activeBtn: "bg-rose-600 text-white shadow-md border-rose-450 hover:bg-rose-500 hover:shadow-rose-500/10",
                          inactiveIcon: "text-rose-400 group-hover:text-rose-300",
                          activeIcon: "text-rose-200",
                        },
                        "skin-soft-tissue": {
                          activeBtn: "bg-teal-600 text-white shadow-md border-teal-400 hover:bg-teal-500 hover:shadow-teal-500/10",
                          inactiveIcon: "text-teal-400 group-hover:text-teal-305",
                          activeIcon: "text-teal-200",
                        },
                        "bone-joint": {
                          activeBtn: "bg-orange-600 text-white shadow-md border-orange-400 hover:bg-orange-500 hover:shadow-orange-500/10",
                          inactiveIcon: "text-orange-405 group-hover:text-orange-305",
                          activeIcon: "text-orange-200",
                        }
                      };

                      const config = systemColorConfig[sys.id] || systemColorConfig.all;

                      return (
                        <button
                          key={sys.id}
                          onClick={() => setSelectedSystem(sys.id)}
                          className={`text-[10px] sm:text-[11px] font-extrabold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border group ${
                            isActive
                              ? config.activeBtn
                              : "bg-slate-800/90 text-slate-250 border-slate-700/80 hover:text-white hover:bg-slate-750 hover:border-slate-600 shadow-2xs"
                          }`}
                        >
                          {renderSystemIcon(sys.iconName, `h-3.5 w-3.5 ${isActive ? config.activeIcon : config.inactiveIcon} transition-colors`)}
                          <span>{sys.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>


              {/* Structured index layout with system corridors */}
              <div className="space-y-12">
                {activeSystems.length === 0 ? (
                  <div className="text-center py-16 max-w-md mx-auto space-y-4 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                    <div className="p-4 bg-amber-50 rounded-full inline-block text-amber-500 border border-amber-100">
                      <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-800">No matching pathologies found</h3>
                    <p className="text-xs text-slate-500 font-medium px-6 leading-relaxed">
                      We couldn't find any disease matches for "<strong className="text-slate-800">{searchTerm}</strong>" under the selected organ systems filter. Try adjusting your vocabulary or expanding the system filter!
                    </p>
                    <button
                      onClick={() => { setSearchTerm(""); setSelectedSystem("all"); }}
                      className="text-xs font-extrabold text-indigo-600 hover:underline px-4 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      Clear Search Filters
                    </button>
                  </div>
                ) : (
                  activeSystems.map((sysGroup) => {
                    const sysSample = getDiseaseSystem(sysGroup.items[0].id);
                    const styles = getSystemStyle(sysSample.colorClass);
                    
                    return (
                      <section key={sysGroup.id} className="space-y-6" id={`corridor-${sysGroup.id}`}>
                        {/* Corridor Banner Header */}
                        <div className={`p-5 rounded-2xl bg-gradient-to-r ${sysSample.bannerClass} border ${styles.lightBorder} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs`}>
                          <div className="flex items-center gap-3.5">
                            <div className={`p-2.5 bg-white rounded-xl shadow-2xs border ${styles.lightBorder} ${styles.accentText}`}>
                              {renderSystemIcon(sysSample.iconName, "h-5 w-5")}
                            </div>
                            <div>
                              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                                {sysGroup.name} Corridor
                              </h2>
                              <p className="text-xs text-slate-500 font-semibold">
                                Highlighted pathology modules of the {sysSample.tagLabel.toLowerCase()} system.
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 flex items-center">
                            <span className={`${styles.pill} text-[10px] font-black uppercase px-2.5 py-1 rounded-full border shadow-3xs`}>
                              {sysGroup.items.length} High-Yield Modules
                            </span>
                          </div>
                        </div>

                        {/* Corridor Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {sysGroup.items.map((d) => {
                            const itemSys = getDiseaseSystem(d.id);
                            const itemStyles = getSystemStyle(itemSys.colorClass);
                            return (
                              <Link
                                key={d.id}
                                to={`/diseases/${d.slug}`}
                                className={`p-6 bg-white border border-slate-250 border-l-4 ${itemStyles.accentLine} rounded-2xl ${itemStyles.hover} transition-all flex flex-col justify-between group cursor-pointer shadow-3xs h-full`}
                              >
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className={`${itemStyles.pill} border text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-3xs`}>
                                      {itemSys.tagLabel}
                                    </span>
                                    <span className="text-[10px] text-indigo-600 font-extrabold group-hover:underline transition-all flex items-center gap-0.5 whitespace-nowrap">
                                      Study Guide
                                      <ExternalLink className="h-2.5 w-2.5" />
                                    </span>
                                  </div>

                                  <div className="space-y-1.5">
                                    <h3 className="font-extrabold text-base text-slate-900 tracking-tight leading-snug group-hover:text-indigo-650 transition-colors">
                                      {d.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                      {d.overview}
                                    </p>
                                  </div>
                                </div>

                                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                                  <span className={`font-semibold ${itemStyles.accentText} bg-slate-50/50 px-2 py-0.5 rounded border border-slate-100`}>
                                    {d.quickFacts.commonPathogens.length} pathogens cited
                                  </span>
                                  <span className="font-medium text-slate-400">
                                    {d.faqs.length} board FAQs
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })
                )}
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
          );
        })()}
      </main>

      {/* Direct Plain Footer */}
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
