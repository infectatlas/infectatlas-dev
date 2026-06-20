import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Layers,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  BookOpen,
  BrainCircuit,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  Scale,
  Pill,
  Sparkles,
  Award,
  Database,
  Search,
  Zap
} from "lucide-react";

interface ComparisonModule {
  slug: string;
  title: string;
  subtitle: string;
  category: "Microbial Resistance" | "Antimicrobial Pharmacology" | "Clinical Diagnosis" | "Microbial Morphology";
  badgeColor: string;
  intro: string;
  leftTitle: string;
  rightTitle: string;
  comparisonPoints: {
    attribute: string;
    leftValue: string;
    rightValue: string;
  }[];
  clinicalPearls: string[];
  examTraps: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const COMPARISONS_DATA: ComparisonModule[] = [
  {
    slug: "mrsa-vs-mssa",
    title: "MRSA vs. MSSA",
    subtitle: "Methicillin-Resistant vs. Methicillin-Susceptible Staphylococcus aureus",
    category: "Microbial Resistance",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-100",
    intro: "Staphylococcus aureus is a formidable pathogen causing infections ranging from simple skin abscesses to fatal bacteremia. The critical therapeutic boundary lies in whether the bacterium has acquired the mecA gene, which encodes an altered penicillin-binding protein, transforming clinical management rules.",
    leftTitle: "MRSA (Resistant)",
    rightTitle: "MSSA (Susceptible)",
    comparisonPoints: [
      {
        attribute: "Resistance Mechanism",
        leftValue: "mecA gene acquisition, producing altered PBP2a with low affinity for beta-lactams",
        rightValue: "BlaZ beta-lactamase plasmid, destroying simple penicillins (Amoxicillin) but weak to penicillinase-resistants"
      },
      {
        attribute: "Affinity to Beta-Lactams",
        leftValue: "Low/No affinity for all standard beta-lactams (Penicillins, Cephalosporins, Carbapenems)",
        rightValue: "High affinity for anti-staphylococcal beta-lactams and cephalosporins"
      },
      {
        attribute: "Inpatient Gold Standard (IV)",
        leftValue: "Vancomycin, Linezolid, or Daptomycin",
        rightValue: "Nafcillin, Oxacillin, or Cefazolin"
      },
      {
        attribute: "Outpatient Gold Standard (PO)",
        leftValue: "TMP-SMX (Bactrim), Doxycycline, or Clindamycin",
        rightValue: "Cephalexin (Keflex) or Dicloxacillin"
      },
      {
        attribute: "Bactericidal Action Speed",
        leftValue: "Vanc/Linezolid/Dapto are slower to clear tissue than beta-lactams",
        rightValue: "Nafcillin/Cefazolin are rapidly bactericidal and clear bacteremia quicker"
      }
    ],
    clinicalPearls: [
      "The Nafcillin Speed Paradox: If a patient has MSSA bacteremia, treating them with Nafcillin or Cefazolin leads to significantly faster clearance and lower mortality rates than treating them with Vancomycin. Never use Vancomycin unless the patient has MRSA or a severe anaphylactic beta-lactam allergy.",
      "The Ceftaroline Exception: Ceftaroline (5th-generation cephalosporin) is the ONLY beta-lactam explicitly engineered to bind and inhibit PBP2a, making it effective against MRSA."
    ],
    examTraps: [
      "Watch out for the 'Beta-Lactamase Inhibitor' illusion! Adding Tazobactam, Clavulanate, or Sulbactam does NOT make a drug active against MRSA. Standard beta-lactams are useless against MRSA due to the altered target design (PBP2a), not enzyme degradation.",
      "Daptomycin is an excellent IV choice for MRSA bacteremia/osteomyelitis but is completely inactivated by pulmonary surfactant—never use Daptomycin for MRSA pneumonia."
    ],
    quiz: {
      question: "A 24-year-old male presents with a warm, fluctuant, erythematous abscess on his right forearm. Culture of the purulent drainage grows Gram-positive cocci in clusters that are catalase-positive and coagulase-positive. Sensitivity reports show mecA gene presence. What is the most appropriate initial oral therapy?",
      options: [
        "PO Oral Cephalexin",
        "PO Oral Nafcillin",
        "PO Oral Trimethoprim-Sulfamethoxazole",
        "IV Intravenous Vancomycin"
      ],
      correctIndex: 2,
      explanation: "The clinical presentation indicates Staphylococcus aureus (Gram-positive cocci, clusters, catalase-coagulase positive). The mecA gene signals MRSA. For a mild, uncomplicated skin abscess requiring oral outpatient therapy, oral TMP-SMX (Bactrim) or Doxycycline is the agent of choice. Cephalexin and Nafcillin are ineffective against MRSA due to PBP2a's low affinity. Intravenous Vancomycin is a heavy-duty option reservation for severe, systemic infections, not uncomplicated localized outpatient cellulitis or outpatient abscesses."
    }
  },
  {
    slug: "vancomycin-vs-linezolid",
    title: "Vancomycin vs. Linezolid",
    subtitle: "Heavyweight Glycopeptide vs. Ribosomal Oxazolidinone for G-Positives",
    category: "Antimicrobial Pharmacology",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    intro: "Both Vancomycin and Linezolid represent high-tier defense options against multi-drug resistant Gram-positives, especially MRSA. They operate on entirely different mechanical principles, which dictates their tissue penetration capacity and dangerous side-effect matrices.",
    leftTitle: "Vancomycin",
    rightTitle: "Linezolid",
    comparisonPoints: [
      {
        attribute: "Chemical Class",
        leftValue: "Glycopeptide (large hydrophobic polymer)",
        rightValue: "Oxazolidinone (small synthetic molecule)"
      },
      {
        attribute: "Mechanism of Action",
        leftValue: "Binds directly to D-Ala-D-Ala terminus of cell-wall peptidoglycan precursor units, blocking transpeptidation",
        rightValue: "Binds 50S ribosomal subunit, preventing assembly of the 70S initiation complex (inhibits translation)"
      },
      {
        attribute: "Action Nature",
        leftValue: "Bactericidal (disrupts structural integrity of dividing cell wall)",
        rightValue: "Bacteriostatic (arrests growth/synthesis, requires immune clearance)"
      },
      {
        attribute: "Oral Bioavailability",
        leftValue: "Near 0% PO Absorption. Oral route strictly used for localized Clostridioides difficile colitis.",
        rightValue: "100% Oral Bioavailability. Intravenous (IV) and Oral (PO) doses are identical (600mg)."
      },
      {
        attribute: "Systemic MRSA Administration",
        leftValue: "Must be administered Intravenously (IV) for systemics.",
        rightValue: "Can be administered IV or converted safely to identical PO doses."
      },
      {
        attribute: "Key Toxicities",
        leftValue: "Nephrotoxicity, Ototoxicity, Red Man Syndrome (infusion-rate related histamine release)",
        rightValue: "Bone marrow suppression (especially Thrombocytopenia >2 weeks), Serotonin Syndrome when combined with SSRIs"
      }
    ],
    clinicalPearls: [
      "Oral Vancomycin does not cross the GI barrier. If a patient is treated with oral Vancomycin for C. diff, it will not cure bacteremia, and conversely, IV Vancomycin is not actively excreted into the colon lumens, meaning it is ineffective for treating severe C. diff infections.",
      "Linezolid is a weak, non-selective Monoamine Oxidase Inhibitor (MAOI). If combined with SSRI medications, it can lead to acute Serotonin Syndrome (autonomic instability, hyperthermia, hyperreflexia)."
    ],
    examTraps: [
      "Do not choose Vancomycin for systemic bone or joint infections without warning the medical team of baseline chronic kidney disease (CKD) or concurrent aminoglycosides, as nephrotoxicity risk elevates rapidly.",
      "Pro tip: Linezolid-mediated bone marrow suppression takes approximately 10-14 days to emerge. Always monitor weekly Complete Blood Count (CBC) for thrombocytopenia when treating patients with long courses."
    ],
    quiz: {
      question: "A 62-year-old female is being treated for a severe hospital-caused MRSA pneumonia. She has a history of chronic kidney disease (creatinine 2.1). The attending lists a requirement for an antibiotic that carries no renal toxicity and has superior lung tissue penetration. Which choice is best?",
      options: [
        "Intravenous Vancomycin",
        "Intravenous Linezolid",
        "Intravenous Daptomycin",
        "Oral Cephalexin"
      ],
      correctIndex: 1,
      explanation: "Linezolid has superb pulmonary tissue penetration and carries no renal clearance or nephrotoxicity risks, making it ideal for hospital MRSA pneumonia in CKD patients. Vancomycin can trigger nephrotoxicity and requires intensive serum trough monitoring. Daptomycin is inactivated by pulmonary surfactant and is contraindicated for pneumonia. Cephalexin is a 1st-generation cephalosporin and fails against MRSA altogether."
    }
  },
  {
    slug: "cellulitis-vs-erysipelas",
    title: "Cellulitis vs. Erysipelas",
    subtitle: "Deep Subcutaneous Infection vs. Superficial Dermal Lymphatic Infection",
    category: "Clinical Diagnosis",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    intro: "Warm, swollen, erythematous legs are staples of clinical practice. Differentiating between cellulitis and erysipelas is a cardinal medical school testing theme, verifying that students understand dermal tissue depth and pathogen associations.",
    leftTitle: "Cellulitis",
    rightTitle: "Erysipelas",
    comparisonPoints: [
      {
        attribute: "Infection Tissue Depth",
        leftValue: "Deep dermis and subcutaneous fat",
        rightValue: "Superficial dermis and superficial lymphatics"
      },
      {
        attribute: "Edge Borders & Appearance",
        leftValue: "Flat, expanding, diffuse, ill-defined borders",
        rightValue: "Sharply demarcated, raised, indurated, bright red margins"
      },
      {
        attribute: "Primary Pathogen Causes",
        leftValue: "Staphylococcus aureus and Streptococcus pyogenes (Group A Strep)",
        rightValue: "Streptococcus pyogenes (Group A Strep) almost exclusively"
      },
      {
        attribute: "Clinical Onset",
        leftValue: "Gradual development over several days, minor initial systemic signs",
        rightValue: "Rapid, abrupt onset accompanied by high fever, chills, and malaise"
      },
      {
        attribute: "Classic Site",
        leftValue: "Unilateral lower extremities commonly",
        rightValue: "Cheeks (butterfly distribution) or lower extremity"
      }
    ],
    clinicalPearls: [
      "Because Erysipelas is almost exclusively streptococcal, narrow-spectrum agents targeting Group A Strep (like IV Amoxicillin or Penicillin) are highly successful.",
      "Milian's Ear Sign: Because the ear has no subcutaneous fat, an infection involving the external ear outer tissue suggests Erysipelas (upper dermis only) rather than Cellulitis."
    ],
    examTraps: [
      "Don't confuse Cellulitis with Stasis Dermatitis, which is typically bilateral, chronic, non-tender, and improved with leg elevation. True skin infections are unilateral and progress dynamically.",
      "Empirical cellulitis outpatient treatment MUST cover Staphylococcus. Therefore, simple cephalexin (covers Strep + MSSA) is selected over penicillin G."
    ],
    quiz: {
      question: "A 49-year-old female presents with a rapid-onset bright red, swollen area on her right cheek. On examination, the lesion is raised with a distinct, sharply defined border. She has a temperature of 102.1°F and chills. What is the most likely pathogen and depth of this infection?",
      options: [
        "S. aureus; Deep subcutaneous tissue",
        "S. pyogenes; Upper dermis and lymphatics",
        "S. epidermidis; Superficial epidermis",
        "Pseudomonas aeruginosa; Subcutaneous fat"
      ],
      correctIndex: 1,
      explanation: "The clinical presentation of a bright red, raised lesion with a sharply demarcated border on the face/cheek, accompanied by acute onset high fever and chills, is highly characteristic of Erysipelas. Erysipelas is a superficial dermal infection affecting the upper dermis and lymphatic channels, and is almost always caused by Streptococcus pyogenes (Group A Strep)."
    }
  },
  {
    slug: "gram-positive-vs-gram-negative",
    title: "Gram-Positive vs. Gram-Negative",
    subtitle: "The Structural Foundations of Bacteriology and Treatment Barriers",
    category: "Microbial Morphology",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-100",
    intro: "The division of bacteria into Gram-positive and Gram-negative based on their Gram stain retention properties stems from profound structural variances that influence metabolic pathways, toxin release, and antibiotic crossability.",
    leftTitle: "Gram-Positive",
    rightTitle: "Gram-Negative",
    comparisonPoints: [
      {
        attribute: "Peptidoglycan Matrix",
        leftValue: "Thick, multi-layered, porous mesh (retains crystal violet)",
        rightValue: "Thin, single-layered mesh located in the periplasmic space"
      },
      {
        attribute: "Gram Dye Color",
        leftValue: "Deep Purple / Royal Violet",
        rightValue: "Pink / Red (counter-stained with Safranin)"
      },
      {
        attribute: "Outer Membrane Barrier",
        leftValue: "None. Direct exposure to extracellular space.",
        rightValue: "Highly selective Outer Membrane present, lined with hydrophobic lipids"
      },
      {
        attribute: "Bulk Drug Sensitivity",
        leftValue: "Vulnerable to large bulky hydrophobic drugs (Vancomycin, Macrolides)",
        rightValue: "Naturally resistant to bulky drugs. Bulky drugs cannot fit through outer membrane porin channels."
      },
      {
        attribute: "Dominant Toxic Signatures",
        leftValue: "Teichoic acid and Lipoteichoic acid (shed during growth, milder)",
        rightValue: "Lipopolysaccharide (LPS). Lipid A component functions as a potent endotoxin."
      }
    ],
    clinicalPearls: [
      "Bulky molecule exclusion: This is why Vancomycin has exactly 0% efficacy against Gram-negative bacilli like E. coli or Pseudomonas. The Vancomycin molecule is far too massive to squeeze through the hydrophobic porins of the outer membrane.",
      "The Periplasmic Defense: Gram-negatives contain a periplasmic space between their inner and outer membranes. This is where enzymes like beta-lactamases are concentrated, making them highly effective back-line shields."
    ],
    examTraps: [
      "Don't confuse Lipid A with Gram-positive toxins. Gram-positives do NOT have LPS or Lipid A. If an exam question mentions a pink/red stain organism triggering septic shock after hospital IV therapy, think Gram-negative endotoxin (Lipid A).",
      "Stomach acid-fast bacteria (Mycobacteria) have mycolic acids, staining neither typical purple nor pink readily on classic stains. They require Zeihl-Neelsen (Acid-fast) staining."
    ],
    quiz: {
      question: "A Gram stain is performed on a blood culture, showing pink-colored rods under microscopy. Which of the following structural components is present in this organism and responsible for inducing septic shock via macrophage activation?",
      options: [
        "Lipoteichoic acid",
        "Lipid A of Lipopolysaccharide",
        "PBP2a encoded by mecA",
        "Peptidoglycan cross-links"
      ],
      correctIndex: 1,
      explanation: "Pink-colored rods signify Gram-negative bacilli. The outer membrane of Gram-negative bacteria contains lipopolysaccharide (LPS). The toxic, endotoxin component of LPS is Lipid A, which activates macrophages via TLR4, releasing massive amounts of IL-1, TNF-alpha, and IL-6, potentially leading to septic shock. Lipoteichoic acid is found in Gram-positives, which stain purple."
    }
  },
  {
    slug: "bactericidal-vs-bacteriostatic",
    title: "Bactericidal vs. Bacteriostatic",
    subtitle: "Direct Pathogen Overthrow vs. Growth Stagnant Interruption",
    category: "Antimicrobial Pharmacology",
    badgeColor: "bg-amber-50 text-amber-705 border-amber-100",
    intro: "While clinicians often use both classes interchangeably in uncomplicated cases, understanding when bactericidal agents are strictly required is a hallmark requirement for high-score boards performance and acute hospital care.",
    leftTitle: "Bactericidal",
    rightTitle: "Bacteriostatic",
    comparisonPoints: [
      {
        attribute: "Action on Target",
        leftValue: "Directly kills bacteria outright (rate of kill >99.9% in 24 hours)",
        rightValue: "Arrests bacterial growth and replication, freezing cell populations"
      },
      {
        attribute: "Host Immune Dependency",
        leftValue: "Low dependency. Effectively clears infection even with poor white cell counts.",
        rightValue: "High dependency. Relies heavily on host phagocytes (leukocytes) to dispatch stopped pathogens."
      },
      {
        attribute: "Causative Mechanism Types",
        leftValue: "Targets cell wall synthesis, DNA replication, cell membrane integrity",
        rightValue: "Targets protein ribosomal translation, non-lethal folate synthesis blocks"
      },
      {
        attribute: "Typical Classes",
        leftValue: "Penicillins, Cephalosporins, Carbapenems, Aminoglycosides, Fluoroquinolones, Vancomycin",
        rightValue: "Tetracyclines, Macrolides, Clindamycin, Linezolid, Sulfonamides"
      },
      {
        attribute: "Critical Mandatory Settings",
        leftValue: "Bacterial Meningitis, Osteomyelitis, Infective Endocarditis, Neutropenic Fever",
        rightValue: "Uncomplicated cystitis, atypical bronchitis, mild skin infections in healthy hosts"
      }
    ],
    clinicalPearls: [
      "In bacterially privileged sites like the central nervous system (Meningitis) or cardiovascular heart valves (Endocarditis), host antibody and leukocyte penetration is highly deficient. Bacteriostatic drugs will result in treatment relapse; bactericidal agents are mandatory.",
      "Gram-negative Exceptions: Aminoglycosides are protein-synthesis inhibitors, but they are uniquely bactericidal due to irreversible ribosome binding causing toxic protein accumulations that rupture the membrane."
    ],
    examTraps: [
      "Be careful in oncology patients! If a patient has an ANC < 500, they are severely neutropenic. Do NOT choose clindamycin or tetracyclines. You must select bactericidal, broad-spectrum coverages immediately.",
      "Bacteriostatic drugs can occasionally antagonize bactericidal drugs when administered together because bactericidal beta-lactams require actively dividing/growing cell walls to exert their lethal lysis effect."
    ],
    quiz: {
      question: "A 34-year-old oncology patient with severe neutropenia (Absolute Neutrophil Count = 150) develops a high fever. Blood cultures are positive for Pseudomonas aeruginosa. Why is a bactericidal class mandatory over a bacteriostatic alternative for this patient?",
      options: [
        "Host neutrophils are deficient, meaning bacteriostatic drugs would only pause growth without clearance",
        "Bacteriostatic drugs are chemically inactivated by blood serum",
        "Pseudomonas is naturally immune to all ribosomal inhibitors",
        "Bactericidal drugs operate faster in cold environments"
      ],
      correctIndex: 0,
      explanation: "Bacteriostatic drugs arrest bacterial protein synthesis or folate metabolism but do not kill the bacteria outright; they require intact host leukocytes to phagocytose and eliminate the resting bacteria. In a severely neutropenic patient (A.N.C. < 500) who has depleted immune defenses, bacteriostatic agents are highly prone to treatment failure. Therefore, rapidly bactericidal drugs (like double antipseudomonal beta-lactams or aminoglycosides) must be used."
    }
  }
];

export default function ComparisonsSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLaunchApp = (focusTask: string) => {
    localStorage.setItem("infectatlas_active_tab", focusTask);
    navigate("/app");
  };

  const isIndexView = location.pathname.toLowerCase().trim().replace(/\/$/, "") === "/comparisons";

  // Find active comparison based on slug route
  const getActiveSlug = () => {
    const path = location.pathname.toLowerCase();
    const cleanPath = path.replace(/^\/|\/$/g, ""); // remove slashes
    // Check if path direct matches any of the registered comparison slugs
    const found = COMPARISONS_DATA.find((c) => c.slug === cleanPath);
    return found ? found.slug : "mrsa-vs-mssa";
  };

  const activeSlug = getActiveSlug();
  const item = COMPARISONS_DATA.find((c) => c.slug === activeSlug) || COMPARISONS_DATA[0];

  // Dynamic state for quiz
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  
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

  // Reset quiz when active page changes & handle browser metadata dynamically
  useEffect(() => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);

    if (isIndexView) {
      document.title = "High-Yield Medical Comparisons & Clinical Differentials | InfectAtlas";

      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', "Master clinical differentials, resistance mechanisms, and drug treatments side-by-side with high-yield USMLE & COMLEX board review guides.");

      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', "https://infectatlas.com/comparisons");
    } else if (item) {
      document.title = `${item.title} - ${item.subtitle} | Study Comparison | InfectAtlas`;

      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', item.intro.substring(0, 155) + "...");

      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', `https://infectatlas.com/${item.slug}`);
    }
  }, [activeSlug, item, isIndexView]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" id="comparisons-root">
      
      {/* Dynamic Header */}
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
              className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            >
              Drugs
            </Link>
            <Link 
              to="/comparisons" 
              className="px-4 py-2 text-[14px] font-semibold text-indigo-600 bg-indigo-50/50 focus:outline-indigo-600 rounded-lg transition-colors"
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Compact Breadcrumb */}
        {isIndexView ? (
          <nav className="mb-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-indigo-600">Comparisons</span>
          </nav>
        ) : (
          <nav className="mb-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/comparisons" className="text-slate-505 hover:text-indigo-600 transition-colors">Comparisons</Link>
            <span>/</span>
            <span className="text-indigo-600">{item.title}</span>
          </nav>
        )}

        {isIndexView ? (
          <div className="space-y-8 animate-fade-in" id="comparisons-directory-index">
            {/* Compact Unified Hero & Search Panel */}
            <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6 overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-[radial-gradient(circle_at_bottom_right,#6366f1,transparent)] pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider leading-none inline-block shadow-3xs">
                    Clinical Dual Reference Catalog
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-none italic font-sans animate-fade-in">
                    High-Yield Clinical Comparisons
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed font-sans mt-1">
                    Master key pathogen distinctions, antibiotic resistance profiles, and drug selection criteria side-by-side. Designed to assist with USMLE, COMLEX, and infectious diseases clerkships.
                  </p>
                </div>

                <div className="w-full lg:max-w-md shrink-0 relative group">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search clinical comparisons, pathogens, drugs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 focus:bg-slate-950/90 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 transition-all text-white placeholder:text-slate-400 shadow-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3.5 top-3.5 text-slate-450 hover:text-white font-bold text-xs cursor-pointer bg-transparent border-0"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Comparisons Cards Grid */}
            {(() => {
              const query = searchTerm.toLowerCase().trim();
              const filtered = COMPARISONS_DATA.filter((c) => 
                c.title.toLowerCase().includes(query) ||
                c.subtitle.toLowerCase().includes(query) ||
                c.intro.toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query)
              );

              if (filtered.length === 0) {
                return (
                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 shadow-3xs">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-full inline-block">
                      <Scale className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-sm">No comparisons found</h3>
                      <p className="text-xs text-slate-500">We couldn't find any clinical comparisons matching "{searchTerm}".</p>
                    </div>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {filtered.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-3xs hover:shadow-2xs transition-all duration-300 hover:border-slate-350 h-full flex flex-col justify-between group"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full border ${
                            c.category === "Microbial Resistance" ? "bg-rose-50 text-rose-700 border-rose-100" :
                            c.category === "Antimicrobial Pharmacology" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                            c.category === "Clinical Diagnosis" ? "bg-amber-50 text-amber-700 border-amber-100" :
                            "bg-indigo-50 text-indigo-700 border-indigo-100"
                          } tracking-wider`}>
                            {c.category}
                          </span>
                          <Scale className="h-4 w-4 text-slate-350 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        
                        <div className="space-y-1.5">
                          <h2 className="font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors italic font-sans animate-fade-in">
                            {c.title}
                          </h2>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2">
                            {c.subtitle}
                          </p>
                        </div>
                        
                        <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-3 pt-2.5 border-t border-slate-100 font-medium">
                          {c.intro}
                        </p>
                      </div>
                      
                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-indigo-650 font-extrabold text-xs">
                        <span>Explore Differential Module</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform text-indigo-600" />
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })()}

            {/* Bottom traffic conversion / study funnel block (Index copy) */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-indigo-950 shadow-md text-center space-y-5 relative overflow-hidden mt-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl -z-1" />
              
              <div className="max-w-xl mx-auto space-y-3.5">
                <div className="inline-flex items-center justify-center p-2.5 bg-indigo-800/40 text-indigo-300 rounded-full border border-indigo-705/30">
                  <BrainCircuit className="h-7 w-7 text-indigo-400 animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight italic font-sans">
                  Ready to Master Medical School Microorganisms?
                </h3>
                <p className="text-slate-355 text-xs sm:text-sm font-medium leading-relaxed font-sans">
                  Study smart with Spaced Repetition decks, complete dynamic AI clinical vignetting exercises, and review IDSA drug administration route protocols in a fully interactive practice suite!
                </p>
                <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                  <Link
                    to="/app/dashboard"
                    className="flex-1 py-3 px-5 bg-indigo-600 hover:bg-indigo-505 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-[1.015] font-sans inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Enter Student Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Banner Grid layout */}
            <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-md overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -z-1" />
              <div className="absolute bottom-0 left-10 w-60 h-60 bg-emerald-600/5 rounded-full blur-2xl -z-1" />
              
              <div className="max-w-3xl space-y-4">
                <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border border-indigo-400/20 text-indigo-300 bg-indigo-950/40 tracking-wider inline-block`}>
                  {item.category} Module
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-none italic font-sans">
                  {item.title} Study Module
                </h1>
                <p className="text-slate-350 text-sm sm:text-base font-medium leading-relaxed font-sans max-w-2xl">
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800 font-medium">
                  {item.intro}
                </p>
              </div>
            </div>

            {/* Two-Column split layout: Sticky Selection Sidecorridors & Active View contents */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Side navigation drawer/corridor */}
              <div className="lg:col-span-4 space-y-4 md:sticky md:top-24">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-slate-400" />
                    Comparison Corridor
                  </h2>
              
              <div className="space-y-2.5">
                {COMPARISONS_DATA.map((c) => {
                  const isActive = c.slug === item.slug;
                  return (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      className={`block p-3.5 rounded-xl border transition-all text-left relative overflow-hidden group ${
                        isActive
                          ? "bg-slate-900 border-slate-900 text-white shadow-sm scale-[1.01]"
                          : "bg-white hover:bg-slate-50 border-slate-200/85 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2.5 relative z-10">
                        <div className="space-y-1">
                          <span className={`text-[9px] font-black uppercase tracking-wide block ${
                            isActive ? "text-indigo-300" : "text-slate-450"
                          }`}>
                            {c.category}
                          </span>
                          <span className="font-extrabold text-xs sm:text-sm block font-sans tracking-tight">
                            {c.title}
                          </span>
                        </div>
                        <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${
                          isActive ? "text-indigo-400 translate-x-1" : "text-slate-300 group-hover:translate-x-1"
                        }`} />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Study Funnel Call-To-Action Box */}
              <div className="bg-indigo-950 text-white rounded-xl p-4 border border-indigo-900/30 mt-6 space-y-3 shadow-inner">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-1.5 shrink-0 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                    <BrainCircuit className="h-4.5 w-4.5 animate-pulse" />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-indigo-200">Boards Practice</h4>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                  Want to practice multi-choice clinical board vignettes tailored to these high-yield concepts?
                </p>
                <Link
                  to="/app/quiz"
                  className="w-full inline-flex items-center justify-center py-2 px-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-extrabold text-[11px] shadow-sm transition-all text-center gap-1 cursor-pointer"
                >
                  <span>Launch Exam Simulator</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Active View focus components */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Split Comparison Cards layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column focus card */}
              <div className="bg-white border border-slate-250 border-t-4 border-t-indigo-500 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-extrabold text-[9px] uppercase rounded-full border border-indigo-100 tracking-wider">
                    Attribute Target A
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none italic font-sans">
                    {item.leftTitle}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Key diagnostic reference profiles, therapeutics, and spectrum criteria parameters.
                  </p>
                </div>
                {/* Specific link parameters based on slug to guide traffic */}
                <div className="pt-4 mt-6 border-t border-slate-100/80">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Linked Clinical Profiles:</span>
                  <div className="flex flex-wrap gap-2">
                    {item.slug === "mrsa-vs-mssa" && (
                      <Link to="/organisms/staphylococcus-aureus" className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        S. aureus <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "vancomycin-vs-linezolid" && (
                      <Link to="/drugs/vancomycin" className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        Vancomycin <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "cellulitis-vs-erysipelas" && (
                      <Link to="/organisms/staphylococcus-aureus" className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        S. aureus <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "gram-positive-vs-gram-negative" && (
                      <Link to="/organisms/staphylococcus-aureus" className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        S. aureus (G-Pos) <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "bactericidal-vs-bacteriostatic" && (
                      <Link to="/drugs/vancomycin" className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        Beta-lactams (Cidal) <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column focus card */}
              <div className="bg-white border border-slate-250 border-t-4 border-t-emerald-500 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-extrabold text-[9px] uppercase rounded-full border border-emerald-100 tracking-wider">
                    Attribute Target B
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none italic font-sans">
                    {item.rightTitle}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Key diagnostic reference profiles, therapeutics, and spectrum criteria parameters.
                  </p>
                </div>
                {/* Linked Clinical Profiles for Side B */}
                <div className="pt-4 mt-6 border-t border-slate-100/80">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Linked Clinical Profiles:</span>
                  <div className="flex flex-wrap gap-2">
                    {item.slug === "mrsa-vs-mssa" && (
                      <Link to="/drugs/vancomycin" className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        Nafcillin <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "vancomycin-vs-linezolid" && (
                      <Link to="/drugs/linezolid" className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        Linezolid <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "cellulitis-vs-erysipelas" && (
                      <Link to="/organisms/streptococcus-pyogenes" className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        S. pyogenes <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "gram-positive-vs-gram-negative" && (
                      <Link to="/organisms/pseudomonas-aeruginosa" className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        Pseudomonas (G-Neg) <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                    {item.slug === "bactericidal-vs-bacteriostatic" && (
                      <Link to="/drugs/linezolid" className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                        Linezolid (Static) <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Deep Clinical Points Comparison Table */}
            <div className="bg-white border border-slate-250 rounded-2xl overflow-hidden shadow-3xs">
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-800 uppercase tracking-wider">
                  Side-By-Side Diagnostic Grid
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-4 w-1/4">Attribute</th>
                      <th className="p-4 w-3/8 text-indigo-600 font-extrabold">{item.leftTitle}</th>
                      <th className="p-4 w-3/8 text-emerald-700 font-extrabold">{item.rightTitle}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {item.comparisonPoints.map((pt, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-black text-slate-800 font-sans tracking-tight bg-slate-50/40">{pt.attribute}</td>
                        <td className="p-4 text-slate-700 leading-relaxed font-semibold">{pt.leftValue}</td>
                        <td className="p-4 text-slate-700 leading-relaxed font-semibold">{pt.rightValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clinical Pearls & High-Yield traps boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Clinical Pearls info container */}
              <div className="bg-emerald-50/60 border border-emerald-150 rounded-2xl p-6 space-y-4 shadow-3xs">
                <div className="flex items-center gap-2.5 text-emerald-800">
                  <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600 shadow-3xs shrink-0">
                    <Lightbulb className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider font-sans">
                    Clinical Board Pearls
                  </h4>
                </div>
                <div className="space-y-3.5">
                  {item.clinicalPearls.map((prl, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-760 leading-relaxed font-semibold">
                      <span className="text-emerald-500 font-extrabold block text-sm select-none leading-none shrink-0">•</span>
                      <p>{prl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* High Yield Exam traps warnings */}
              <div className="bg-rose-50/60 border border-rose-150 rounded-2xl p-6 space-y-4 shadow-3xs">
                <div className="flex items-center gap-2.5 text-rose-800">
                  <div className="p-1.5 bg-rose-100 rounded-lg text-rose-600 shadow-3xs shrink-0">
                    <AlertTriangle className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider font-sans">
                    Examiners' Trap Clues
                  </h4>
                </div>
                <div className="space-y-3.5">
                  {item.examTraps.map((trp, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-760 leading-relaxed font-semibold">
                      <span className="text-rose-500 font-extrabold block text-sm select-none leading-none shrink-0">⚠</span>
                      <p>{trp}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Interactive Clinical Case Vignette Module (Board Simulation Sandbox) */}
            <div className="bg-white border border-slate-250 rounded-2xl p-6 shadow-3xs space-y-5">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shadow-3xs">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">Board-Style Recall Sandbox</h4>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Concept-Test Micro Module</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-50 border border-slate-200 text-slate-500 font-bold px-2.5 py-1 rounded inline-block font-mono">
                  Q-ID: {item.slug}-01
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-755 leading-relaxed border border-slate-100 italic font-medium">
                  "{item.quiz.question}"
                </div>

                <div className="space-y-2.5">
                  {item.quiz.options.map((opt, oIdx) => {
                    const isSelected = selectedQuizOption === oIdx;
                    const isCorrect = oIdx === item.quiz.correctIndex;
                    let optionStyles = "bg-white hover:bg-slate-50/80 border-slate-200/90 text-slate-700";
                    
                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyles = "bg-emerald-50 border-emerald-300 text-emerald-850 shadow-emerald-50/30";
                      } else if (isSelected) {
                        optionStyles = "bg-rose-50 border-rose-300 text-rose-850 shadow-rose-50/30";
                      } else {
                        optionStyles = "bg-white border-slate-100 text-slate-450 opacity-60";
                      }
                    } else if (isSelected) {
                      optionStyles = "bg-indigo-50 border-indigo-400 text-indigo-900 font-bold shadow-indigo-100/50 scale-[1.005]";
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(oIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 ${optionStyles} ${!quizSubmitted ? "cursor-pointer" : "cursor-default"}`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => setQuizSubmitted(true)}
                    className={`w-full mt-2 py-3 bg-indigo-600 text-white hover:bg-indigo-505 font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-50 ${selectedQuizOption !== null ? "cursor-pointer" : "cursor-not-allowed"}`}
                  >
                    <CheckCircle className="h-4.5 w-4.5" />
                    Submit Selected Choice
                  </button>
                ) : (
                  <div className="p-5 bg-indigo-50/40 rounded-xl border border-indigo-150 space-y-3 animate-fade-in mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚀</span>
                      <h5 className="font-extrabold text-xs sm:text-sm text-indigo-900 uppercase tracking-wide">Detailed Board Explanation:</h5>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-725 leading-relaxed font-semibold">
                      {item.quiz.explanation}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSelectedQuizOption(null);
                          setQuizSubmitted(false);
                        }}
                        className="text-xs font-black text-indigo-600 hover:text-indigo-805 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Try Sandbox Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom traffic conversion / study funnel block */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-indigo-950 shadow-md text-center space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl -z-1" />
              
              <div className="max-w-xl mx-auto space-y-3.5">
                <div className="inline-flex items-center justify-center p-2.5 bg-indigo-800/40 text-indigo-300 rounded-full border border-indigo-705/30">
                  <BrainCircuit className="h-7 w-7 text-indigo-400 animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight italic font-sans">
                  Ready to Master Medical School Microorganisms?
                </h3>
                <p className="text-slate-350 text-xs sm:text-sm font-medium leading-relaxed">
                  Study smart with Spaced Repetition decks, complete dynamic AI clinical vignetting exercises, and review IDSA drug administration route protocols in a fully interactive practice suite!
                </p>
                <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                  <Link
                    to="/app/dashboard"
                    className="flex-1 py-3 px-5 bg-indigo-600 hover:bg-indigo-505 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-[1.015] font-sans inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Enter Student Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
        </>
        )}

      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-medium text-slate-500">
              &copy; 2026 InfectAtlas Memory Tool. Strictly for educational use & exam preparation purposes only.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-[10px] text-indigo-600 font-semibold mt-1">
              <Link to="/app/guide" className="hover:underline">Study Guide</Link>
              <span>&bull;</span>
              <span className="text-slate-400">IDSA Guideline Grounded</span>
              <span>&bull;</span>
              <span>Developer Reference: support@infectatlas.com</span>
            </div>
          </div>
          <div className="flex gap-4 shrink-0 text-[11px] font-bold text-slate-400">
            <span>Clinically Aligned IDSA References</span>
            <span>&bull;</span>
            <span>Gemini AI Integrations</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
