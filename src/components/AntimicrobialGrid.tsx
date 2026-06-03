import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  RotateCcw, 
  Award,
  BookOpen,
  Filter,
  ArrowRight
} from "lucide-react";

// Types
export interface GridPathogen {
  id: string;
  name: string;
  category: "Gram-positive" | "Gram-negative" | "Anaerobe" | "Atypical";
  subDesc: string;
}

export interface GridDrug {
  id: string;
  name: string;
  category: "Penicillins" | "Cephalosporins" | "Carbapenems" | "Glycopeptides" | "Others / Proteins";
  mechanism: string;
  sideEffects: string[];
  clinicalPearl: string;
}

export type Susceptibility = "effective" | "intermediate" | "resistant";

export interface ExplanationCell {
  status: Susceptibility;
  explanation: string;
}

// Data Sets
const PATHOGENS: GridPathogen[] = [
  { id: "s-aureus-mssa", name: "S. aureus (MSSA)", category: "Gram-positive", subDesc: "Catalase (+), Coagulase (+)" },
  { id: "s-aureus-mrsa", name: "S. aureus (MRSA)", category: "Gram-positive", subDesc: "MecA gene, altered PBP2a" },
  { id: "s-pneumoniae", name: "S. pneumoniae", category: "Gram-positive", subDesc: "Lancet diplococcus" },
  { id: "s-pyogenes", name: "S. pyogenes (GAS)", category: "Gram-positive", subDesc: "Beta-hemolytic, Bacitracin (S)" },
  { id: "e-faecalis", name: "E. faecalis", category: "Gram-positive", subDesc: "Gamma-hemolytic, Bile Esculin (+)" },
  { id: "e-coli", name: "E. coli", category: "Gram-negative", subDesc: "Lactose fermenter GNR" },
  { id: "k-pneumoniae", name: "K. pneumoniae", category: "Gram-negative", subDesc: "Capsulated, Mucoid GNR" },
  { id: "p-aeruginosa", name: "P. aeruginosa", category: "Gram-negative", subDesc: "Oxidase (+), Non-lactose ferm." },
  { id: "a-baumannii", name: "A. baumannii", category: "Gram-negative", subDesc: "Opportunistic MDR hospital GNR" },
  { id: "b-fragilis", name: "B. fragilis", category: "Anaerobe", subDesc: "G- obligate anaerobic rod" },
  { id: "c-difficile", name: "C. difficile", category: "Anaerobe", subDesc: "G+ spore-forming anaerobe" },
  { id: "l-pneumophila", name: "L. pneumophila", category: "Atypical", subDesc: "Intracellular atypical pathogen" }
];

const DRUGS: GridDrug[] = [
  {
    id: "nafcillin",
    name: "Nafcillin",
    category: "Penicillins",
    mechanism: "Binds PBPs, inhibits bacterial cell wall synthesis. Resistant to staph β-lactamase.",
    sideEffects: ["Hypersensitivity", "Interstitial nephritis", "Neutropenia"],
    clinicalPearl: "Nafcillin is the drug of choice for serious MSSA because it clears bacteremia faster than vancomycin!"
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    category: "Penicillins",
    mechanism: "Aminopenicillin. Cell wall inhibitor with wider Gram-negative passage than classic penicillin G/V.",
    sideEffects: ["Hypersensitivity", "Maculopapular rash in EBV mononucleosis", "Diarrhea"],
    clinicalPearl: "First line for S. pneumoniae otitis media and uncomplicated pneumonia. Sensitive to β-lactamases."
  },
  {
    id: "pip_tazo",
    name: "Pip-Tazo",
    category: "Penicillins",
    mechanism: "Antipseudomonal Penicillin + β-lactamase inhibitor combo. Halts cell wall synthesis and prevents enzymatic breakdown.",
    sideEffects: ["Hypersensitivity", "AKI risk when paired with Vancomycin", "Thrombocytopenia"],
    clinicalPearl: "Zosyn is the empiric workhorse for nosocomial infections due to anti-pseudomonal + anaerobic coverage."
  },
  {
    id: "cefazolin",
    name: "Cefazolin",
    category: "Cephalosporins",
    mechanism: "1st Generation Cephalosporin. Inhibits cell wall cross-linking. Highly active against Gram-positive cocci.",
    sideEffects: ["Hypersensitivity", "Cross-reactivity with penicillin (~3% risk)"],
    clinicalPearl: "First-line surgical prophylaxis drug to prevent S. aureus grid infections. Does not cross the blood-brain barrier."
  },
  {
    id: "ceftriaxone",
    name: "Ceftriaxone",
    category: "Cephalosporins",
    mechanism: "3rd Gen Cephalosporin. Inhibits cell wall cross-linking. Crosses blood-brain barrier expertly.",
    sideEffects: ["Biliary sludge / pseudocholelithiasis", "Displaces bilirubin in neonates"],
    clinicalPearl: "Standard therapy for pneumococcal meningitis, pyelonephritis, and Lyme disease. DOES NOT cover Pseudomonas or MRSA."
  },
  {
    id: "cefepime",
    name: "Cefepime",
    category: "Cephalosporins",
    mechanism: "4th Gen Cephalosporin. Cell wall inhibitor highly stable to many chromosomal β-lactamases (AmpC).",
    sideEffects: ["Neurotoxicity (encephalopathy, seizures, especially in renal impairment)"],
    clinicalPearl: "Provides outstanding Gram-positive coverage combined with anti-pseudomonal Gram-negative power."
  },
  {
    id: "ceftaroline",
    name: "Ceftaroline",
    category: "Cephalosporins",
    mechanism: "5th Gen Cephalosporin. Specially engineered to bind the mutated PBP2a of MRSA.",
    sideEffects: ["Hypersensitivity", "Direct Coombs positive hemolytic anemia"],
    clinicalPearl: "The ONLY cephalosporin class containing activity against MRSA. Completely inactive against Pseudomonas."
  },
  {
    id: "meropenem",
    name: "Meropenem",
    category: "Carbapenems",
    mechanism: "Broad spectrum β-lactam cell wall inhibitor. Highly stable against standard β-lactamases and ESBLs.",
    sideEffects: ["Lowers seizure threshold (mostly Imipenem, Meropenem is lower risk)", "Nausea"],
    clinicalPearl: "The definitive gold standard empiric treatment when ESBL-producing GNRs are suspected."
  },
  {
    id: "vancomycin",
    name: "Vancomycin",
    category: "Glycopeptides",
    mechanism: "Glycopeptide. Directly binds to the D-Ala-D-Ala terminus of peptidoglycan monomers, sterically halting cell wall cross-linking.",
    sideEffects: ["Red man/flushing syndrome (infusion rate mediated mast cell release)", "Nephrotoxicity", "Ototoxicity"],
    clinicalPearl: "Standard of care IV drug for MRSA. Must be taken ORALLY for C. difficile to retain therapeutic concentrations inside the gut."
  },
  {
    id: "linezolid",
    name: "Linezolid",
    category: "Others / Proteins",
    mechanism: "Oxazolidinone. Binds 50S ribosomal subunit, preventing formation of the 70S initiation complex (bacteriostatic).",
    sideEffects: ["Bone marrow suppression (thrombocytopenia)", "Serotonin Syndrome (mild MAOI - avoid SSRIs)"],
    clinicalPearl: "Has outstanding oral bioavailability (100% IV-to-PO). Excellent backup for VRE and MRSA pneumonia."
  },
  {
    id: "clindamycin",
    name: "Clindamycin",
    category: "Others / Proteins",
    mechanism: "Lincosamide. Binds 50S subunit to inhibit protein ribosomal translocation. Direct toxin synthesis inhibitor.",
    sideEffects: ["Clostridioides difficile pseudomembranous colitis (black box warning)"],
    clinicalPearl: "Added to penicillin in necrotizing fasciitis or toxic shock syndrome to switch off toxic shock toxin expression."
  },
  {
    id: "metronidazole",
    name: "Metronidazole",
    category: "Others / Proteins",
    mechanism: "Forms toxic free radical intermediates inside anaerobic cells, directly fracturing bacterial DNA.",
    sideEffects: ["Disulfiram-like reaction with alcohol", "Metallic taste", "Peripheral neuropathy"],
    clinicalPearl: "Strictly anaerobe-focused. Covers Bacteroides and Clostridium. Remember: 'Below diaphragm' is Metronidazole; 'Above' is Clindamycin."
  }
];

// Matrix Coverage Dataset
const COVERAGE_MATRIX: Record<string, Record<string, ExplanationCell>> = {
  "s-aureus-mssa": {
    "nafcillin": { status: "effective", explanation: "Definitive drug of choice. Superior, rapid bactericidal clearance for MSSA bacteremia/endocarditis." },
    "amoxicillin": { status: "resistant", explanation: "MSSA produces β-lactamases that rapidly hydrolyze simple aminopenicillins." },
    "pip_tazo": { status: "effective", explanation: "Excellent activity; Tazobactam successfully inhibits staph β-lactamases." },
    "cefazolin": { status: "effective", explanation: "Highly active. Often used as first-line surgical prophylaxis and outpatient IV therapy." },
    "ceftriaxone": { status: "effective", explanation: "Active, but Nafcillin or Cefazolin is clinically preferred for bacteremia." },
    "cefepime": { status: "effective", explanation: "Covers MSSA perfectly, but saved for mixed infections requiring GNR coverage." },
    "ceftaroline": { status: "effective", explanation: "Highly effective, though usually reserved for suspected or proven MRSA." },
    "meropenem": { status: "effective", explanation: "Extremely active, but complete over-treatment for MSSA unless part of a polymicrobial sepsis." },
    "vancomycin": { status: "effective", explanation: "Covers MSSA, but clinically inferior to Nafcillin or Cefazolin due to slower bactericidal rate." },
    "linezolid": { status: "effective", explanation: "Active bacteriostatic option, usually saved to spare kidney function or for oral switch." },
    "clindamycin": { status: "intermediate", explanation: "Decent oral alternative, but requires a negative D-test to rule out inducible resistance." },
    "metronidazole": { status: "resistant", explanation: "Metronidazole has zero activity against Gram-positive aerobes." }
  },
  "s-aureus-mrsa": {
    "nafcillin": { status: "resistant", explanation: "High resistance via the mecA gene, which encodes PBP2a with poor Nafcillin binding affinity." },
    "amoxicillin": { status: "resistant", explanation: "Simple aminopenicillins cannot bind to mutated structural PBP2a." },
    "pip_tazo": { status: "resistant", explanation: "Tazobactam does not overcome mutated PBP2a structural resistance." },
    "cefazolin": { status: "resistant", explanation: "Cephalosporins generations 1 to 4 fail to bind MRSA PBP2a." },
    "ceftriaxone": { status: "resistant", explanation: "Ceftriaxone binds poorly to MRSA PBP2a." },
    "cefepime": { status: "resistant", explanation: "Cefepime lacks adequate affinity for PBP2a." },
    "ceftaroline": { status: "effective", explanation: "The ONLY cephalosporin engineered with an physical side anchor to bind PBP2a." },
    "meropenem": { status: "resistant", explanation: "Carbapenems have extremely low binding affinity for MRSA PBP2a." },
    "vancomycin": { status: "effective", explanation: "Definitive IV standard. Binds cell wall precursors (D-Ala-D-Ala) directly, bypassing altered PBPs." },
    "linezolid": { status: "effective", explanation: "Excellent bacteriostatic choice for MRSA pneumonia (excellent lung lining fluid penetration)." },
    "clindamycin": { status: "intermediate", explanation: "Frequently active against community-acquired MRSA, but perform D-test first." },
    "metronidazole": { status: "resistant", explanation: "Completely inactive against MRSA." }
  },
  "s-pneumoniae": {
    "nafcillin": { status: "intermediate", explanation: "Resistance via altered PBPs is increasingly common; Nafcillin is not used empirically." },
    "amoxicillin": { status: "effective", explanation: "High-dose amoxicillin is first-line empirical oral therapy for simple community pneumococci." },
    "pip_tazo": { status: "effective", explanation: "Highly active, but excessive unless treating mixed hospital-acquired infections." },
    "cefazolin": { status: "intermediate", explanation: "Clinically active, but contraindicated in pneumococcal meningitis due to poor CSF penetration." },
    "ceftriaxone": { status: "effective", explanation: "Definitive first-line agent, particularly for pneumococcal meningitis (outstanding CSF levels)." },
    "cefepime": { status: "effective", explanation: "Outstanding coverage, used for heavy hospital-acquired lung or soft tissue infections." },
    "ceftaroline": { status: "effective", explanation: "Highly potent against multidrug-resistant Pneumococci." },
    "meropenem": { status: "effective", explanation: "Highly active, kept in reserve for highly penicillin-resistant meningitis strains." },
    "vancomycin": { status: "effective", explanation: "Empirically added to Ceftriaxone to cover highly resistant pneumococci in suspected meningitis." },
    "linezolid": { status: "effective", explanation: "Active bacteriostatic agent used for severe multi-drug resistant strains." },
    "clindamycin": { status: "intermediate", explanation: "Subject to rising resistance rates locally." },
    "metronidazole": { status: "resistant", explanation: "Streptococcus lacks anaerobic metabolic pathways for free radical drug activation." }
  },
  "e-coli": {
    "nafcillin": { status: "resistant", explanation: "Nafcillin cannot pass through the dense outer membrane of Gram-negative rods." },
    "amoxicillin": { status: "intermediate", explanation: "High rate (~50%) of plasmid β-lactamases makes uninhibited amoxicillin highly unreliable." },
    "pip_tazo": { status: "effective", explanation: "Active. Tazobactam protects the piperacillin core against standard Gram-negative β-lactamases." },
    "cefazolin": { status: "effective", explanation: "Used effectively for simple E. coli UTIs, but unacceptable for systemic bacteremia." },
    "ceftriaxone": { status: "effective", explanation: "Workhorse agent for urinary tract infections, pyelonephritis, and intra-abdominal infections." },
    "cefepime": { status: "effective", explanation: "Excellent coverage. Active against AmpC-chromosomal hyperproducing GNR strains." },
    "ceftaroline": { status: "effective", explanation: "Provides basic Gram-negative cover, but Ceftriaxone is much preferred; saved for MRSA." },
    "meropenem": { status: "effective", explanation: "The absolute gold standard treatment for ESBL-producing E. coli strains." },
    "vancomycin": { status: "resistant", explanation: "Glycopeptides are too bulky to slide through the porin channels of Gram-negative rods." },
    "linezolid": { status: "resistant", explanation: "Gram-negatives are intrinsically resistant; linezolid cannot reach ribosomes in sufficient levels." },
    "clindamycin": { status: "resistant", explanation: "Strictly lacks Gram-negative coverage spectrum." },
    "metronidazole": { status: "resistant", explanation: "E. coli is a facultative aerobe and remains immune to anaerobic free radicals." }
  },
  "p-aeruginosa": {
    "nafcillin": { status: "resistant", explanation: "No Gram-negative outer envelope penetration." },
    "amoxicillin": { status: "resistant", explanation: "Pseudomonas is intrinsically resistant due to multi-drug efflux channels and AmpC." },
    "pip_tazo": { status: "effective", explanation: "The key clinical antipseudomonal β-lactam combo. Empiric ICU workhorse." },
    "cefazolin": { status: "resistant", explanation: "1st Generation cephalosporins possess zero Pseudomonas coverage." },
    "ceftriaxone": { status: "resistant", explanation: "Extremely high-yield fact: Ceftriaxone is completely inactive against Pseudomonas." },
    "cefepime": { status: "effective", explanation: "Classic antipseudomonal 4th Gen cephalosporin. Standard empiric choice." },
    "ceftaroline": { status: "resistant", explanation: "Unlike Cefepime, this 5th Gen MRSA agent completely lacks Pseudomonas coverage." },
    "meropenem": { status: "effective", explanation: "Highly potent anti-pseudomonal carbapenem saved for critical pseudomonal sepsis." },
    "vancomycin": { status: "resistant", explanation: "Too large to enter the outer membrane barrier." },
    "linezolid": { status: "resistant", explanation: "Intrinsic Gram-negative resistance." },
    "clindamycin": { status: "resistant", explanation: "Intrinsic Gram-negative resistance." },
    "metronidazole": { status: "resistant", explanation: "Pseudomonas is an obligate aerobe; metronidazole only works on obligate anaerobes." }
  },
  "s-pyogenes": {
    "nafcillin": { status: "effective", explanation: "Extremely sensitive, though simple Penicillin G or V is clinically preferred over Nafcillin." },
    "amoxicillin": { status: "effective", explanation: "Amoxicillin is standard and highly active oral treatment for GAS pharyngitis." },
    "pip_tazo": { status: "effective", explanation: "Active but extreme, unnecessary broad-spectrum coverage for Streptococcus pyogenes." },
    "cefazolin": { status: "effective", explanation: "Highly active, often used for skin/soft tissue infections caused by GAS." },
    "ceftriaxone": { status: "effective", explanation: "Highly active broad-spectrum cephalosporin, rarely required but effective." },
    "cefepime": { status: "effective", explanation: "Overkill, reserved for heavy polymicrobial or hospital-acquired infections." },
    "ceftaroline": { status: "effective", explanation: "Excellent coverage, usually saved for resistant MRSA." },
    "meropenem": { status: "effective", explanation: "Active but extreme clinical overkill for simple Group A Strep." },
    "vancomycin": { status: "effective", explanation: "Uniformly active, reserved for severe beta-lactam anaphylaxis." },
    "linezolid": { status: "effective", explanation: "Active bacteriostatic drug that disables protein/toxin synthesis." },
    "clindamycin": { status: "effective", explanation: "Added to penicillin in necrotizing fasciitis or toxic shock to switch off lethal toxin production." },
    "metronidazole": { status: "resistant", explanation: "Strictly aerobic/facultative; Metronidazole lacks activity." }
  },
  "e-faecalis": {
    "nafcillin": { status: "resistant", explanation: "Enterococci are intrinsically resistant to anti-staphylococcal penicillins." },
    "amoxicillin": { status: "effective", explanation: "Ampicillin/Amoxicillin is first-line treatment for susceptible Enterococcal UTIs." },
    "pip_tazo": { status: "effective", explanation: "Maintains standard enterococcal coverage; includes piperacillin core." },
    "cefazolin": { status: "resistant", explanation: "Extremely high-yield: Enterococcus is uniformly resistant to ALL cephalosporins!" },
    "ceftriaxone": { status: "resistant", explanation: "Lacks single-agent coverage. Cephalosporins are clinically inactive against Enterococcus." },
    "cefepime": { status: "resistant", explanation: "No activity against Enterococci." },
    "ceftaroline": { status: "intermediate", explanation: "Lacks reliable, established imperial activity." },
    "meropenem": { status: "effective", explanation: "Active against most E. faecalis strains, though Ampicillin is preferred." },
    "vancomycin": { status: "effective", explanation: "Historically standard active agent for Enterococcus, unless VRE." },
    "linezolid": { status: "effective", explanation: "Core bacteriostatic agent of choice for Vancomycin-Resistant Enterococcus (VRE)." },
    "clindamycin": { status: "resistant", explanation: "No useful enterococcal coverage." },
    "metronidazole": { status: "resistant", explanation: "No coverage against aerobic/facultative Gram-positive Enterococci." }
  },
  "k-pneumoniae": {
    "nafcillin": { status: "resistant", explanation: "Nafcillin is unable to penetrate the outer membrane of Gram-negative rods." },
    "amoxicillin": { status: "resistant", explanation: "Klebsiella is intrinsically resistant to amoxicillin due to chromosomal SHV-1 beta-lactamase." },
    "pip_tazo": { status: "effective", explanation: "Pip-Tazo covers standard Klebsiella, unless it is a carbapenemase-producer." },
    "cefazolin": { status: "effective", explanation: "First-generation cephalosporins cover non-ESBL Klebsiella in uncomplicated UTIs." },
    "ceftriaxone": { status: "effective", explanation: "First-line standard coverage for susceptible Klebsiella pneumoniae." },
    "cefepime": { status: "effective", explanation: "Highly active; covers AmpC hyperproducing strains and standard Klebsiella." },
    "ceftaroline": { status: "effective", explanation: "Provides basic GNR coverage, but Ceftriaxone or Cefepime is highly preferred." },
    "meropenem": { status: "effective", explanation: "Definitive treatment for ESBL-producing Klebsiella. Highly stable." },
    "vancomycin": { status: "resistant", explanation: "Glycopeptides are too large/bulky to cross GNR inner/outer membranes." },
    "linezolid": { status: "resistant", explanation: "No activity against Gram-negative organisms." },
    "clindamycin": { status: "resistant", explanation: "Lacks Gram-negative GNR coverage spectrum completely." },
    "metronidazole": { status: "resistant", explanation: "No activity; Klebsiella is a facultative aerobe." }
  },
  "a-baumannii": {
    "nafcillin": { status: "resistant", explanation: "Nafcillin has no Gram-negative envelope penetration." },
    "amoxicillin": { status: "resistant", explanation: "Acinetobacter shows high intrinsic beta-lactam resistance." },
    "pip_tazo": { status: "intermediate", explanation: "Has variable clinical coverage, but vulnerable to multidrug resistance." },
    "cefazolin": { status: "resistant", explanation: "First-generation cephalosporins have zero activity here." },
    "ceftriaxone": { status: "resistant", explanation: "Third-generation Ceftriaxone completely lacks clinical coverage against Acinetobacter." },
    "cefepime": { status: "intermediate", explanation: "May hold borderline coverage, but rarely relied upon as first-line single agent." },
    "ceftaroline": { status: "resistant", explanation: "Fifth-generation Ceftaroline lacks activity." },
    "meropenem": { status: "effective", explanation: "Carbapenems are the gold standard empirical therapy for severe Acinetobacter infections." },
    "vancomycin": { status: "resistant", explanation: "Glycopeptides cannot pass Gram-negative outer cell walls." },
    "linezolid": { status: "resistant", explanation: "No Gram-negative clinical spectrum." },
    "clindamycin": { status: "resistant", explanation: "No Gram-negative spectrum." },
    "metronidazole": { status: "resistant", explanation: "Acinetobacter is a strict aerobe; metronidazole holds zero action." }
  },
  "b-fragilis": {
    "nafcillin": { status: "resistant", explanation: "Strictly active for Gram-positives; lacks anaerobic GNR activity." },
    "amoxicillin": { status: "resistant", explanation: "Bacteroides species produce highly active metallic β-lactamases." },
    "pip_tazo": { status: "effective", explanation: "Superb anaerobic coverage. Tazobactam restores piperacillin's effectiveness." },
    "cefazolin": { status: "resistant", explanation: "First-generation cephalosporins lack clinically useful anaerobic range." },
    "ceftriaxone": { status: "resistant", explanation: "Ceftriaxone lacks reliable anaerobic cover; requires metronidazole for intra-abdominal disease." },
    "cefepime": { status: "resistant", explanation: "Requires co-administration of metronidazole for intra-abdominal infections." },
    "ceftaroline": { status: "resistant", explanation: "No clinically meaningful anaerobic coverage." },
    "meropenem": { status: "effective", explanation: "Carbapenems are structurally stable, providing superb, comprehensive anaerobic coverage." },
    "vancomycin": { status: "resistant", explanation: "Gram-negative anaerobes are resistant to glycopeptides." },
    "linezolid": { status: "resistant", explanation: "Sub-therapeutic clinical levels; ineffective." },
    "clindamycin": { status: "intermediate", explanation: "Historically standard, but B. fragilis resistance to clindamycin is now high (~30%)." },
    "metronidazole": { status: "effective", explanation: "The gold standard bactericidal agent for below-the-diaphragm anaerobic infections." }
  },
  "c-difficile": {
    "nafcillin": { status: "resistant", explanation: "Completely inactive against Clostridioides spores or vegetative forms." },
    "amoxicillin": { status: "resistant", explanation: "Inactive. Amoxicillin can precipitate C. difficile by clearing healthy gut flora." },
    "pip_tazo": { status: "resistant", explanation: "Not active on C. diff. Will trigger colonic microbiome disruption." },
    "cefazolin": { status: "resistant", explanation: "Unsuitable template. Cephalosporins are highly associated with triggering C. diff infections." },
    "ceftriaxone": { status: "resistant", explanation: "No direct activity. Highly notorious for sparking C. diff pseudomembranous colitis." },
    "cefepime": { status: "resistant", explanation: "Inactive on C. diff; high risk catalyst for hospital-onset colitis." },
    "ceftaroline": { status: "resistant", explanation: "No clinical activity." },
    "meropenem": { status: "resistant", explanation: "Inactive. Carbapenem overuse actively facilitates spore germination." },
    "vancomycin": { status: "effective", explanation: "Treats C. diff only via the oral (PO) route. Stays in the gut lumen to kill pathogens." },
    "linezolid": { status: "resistant", explanation: "No role in treating C. difficile colitis." },
    "clindamycin": { status: "resistant", explanation: "Intrinsic resistant. Highly culprit for triggering colitis (Black Box warning)." },
    "metronidazole": { status: "effective", explanation: "Given orally for mild disease, or IV as an adjunct in severe C. diff with ileus." }
  },
  "l-pneumophila": {
    "nafcillin": { status: "resistant", explanation: "Legionella lives inside host macrophages. Cell-wall inhibitors cannot cross eukaryotic membranes." },
    "amoxicillin": { status: "resistant", explanation: "Atypicals lack peptidoglycan or live intracellularly, escaping cell wall drugs entirely." },
    "pip_tazo": { status: "resistant", explanation: "β-lactams are totally ineffective because they cannot penetrate the host cells." },
    "cefazolin": { status: "resistant", explanation: "Cephalosporins cannot cross human cell boundaries to reach Legionella." },
    "ceftriaxone": { status: "resistant", explanation: "Completely inactive on atypical intracellular organisms." },
    "cefepime": { status: "resistant", explanation: "No atypical range." },
    "ceftaroline": { status: "resistant", explanation: "No atypical range." },
    "meropenem": { status: "resistant", explanation: "Unable to attain therapeutic intracellular levels." },
    "vancomycin": { status: "resistant", explanation: "Massive size prevents vacuolar entry inside human macrophages." },
    "linezolid": { status: "resistant", explanation: "Lacks meaningful clinical utility for atypical pneumonias." },
    "clindamycin": { status: "resistant", explanation: "Poor Legionella clearance." },
    "metronidazole": { status: "resistant", explanation: "Lacks biological targets in Legionella's aerobically respiring system." }
  }
};

interface GridScenario {
  id: string;
  caseText: string;
  question: string;
  options: { id: string; name: string }[];
  correctAnswerId: string;
  explanation: string;
}

const SCENARIOS: GridScenario[] = [
  {
    id: "scen-pseudo",
    caseText: "A 58-year-old intensive care patient on mechanical ventilation for 7 days develops high fever, leukocytosis, and thick purulent green sputum. Chest X-ray indicates new cavities. Sputum Gram stain reveals Gram-negative oxidase-positive rods. Cultures are pending.",
    question: "Which of the following beta-lactams offers appropriate empirical coverage targeting this organism?",
    options: [
      { id: "ceftriaxone", name: "Ceftriaxone" },
      { id: "cefepime", name: "Cefepime" },
      { id: "ceftaroline", name: "Ceftaroline" },
      { id: "cefazolin", name: "Cefazolin" }
    ],
    correctAnswerId: "cefepime",
    explanation: "The clinical cues point to Pseudomonas aeruginosa (Gram-negative, oxidase-positive rod, characteristic green pyocyanin sputum pigment). Cefepime (4th generation) has antipseudomonal activity. Ceftriaxone, Ceftaroline, and Cefazolin offer absolutely zero anti-pseudomonal coverage."
  },
  {
    id: "scen-dapto",
    caseText: "A 45-year-old male with persistent MRSA bacteremia is started on a lipopeptide antibiotic after failing vancomycin. Three days later, he is diagnosed with a secondary lobar pneumonia. Culturing confirms heavy MRSA growth in his lung. The resident realizes they must switch his lipopeptide immediately.",
    question: "Why does Daptomycin fail to clear MRSA in localized pulmonary tissue?",
    options: [
      { id: "surfactant", name: "It is bound and inactivated by alveolar surfactant" },
      { id: "resistance", name: "MRSA mutated its mecA gene specifically in the lung" },
      { id: "absorption", name: "It is fully metabolized by liver first-pass before reaching the lung tissue" },
      { id: "size", name: "The daptomycin molecule is too large to cross the bronchioles" }
    ],
    correctAnswerId: "surfactant",
    explanation: "Daptomycin is highly bactericidal against Gram-positive MRSA but is bound and inactivated by surfactant inside the alveoli. Therefore, it is clinically useless for respiratory infections like pneumonia. Linezolid or Ceftaroline is preferred here."
  },
  {
    id: "scen-mssa",
    caseText: "A 32-year-old female presents with severe septic shock and high fevers due to Staphylococcus aureus bacteremia originating from an intravenous cannula. Susceptibility testing subsequently confirms Methicillin-Susceptible S. aureus (MSSA).",
    question: "What is the definitive therapeutic drug of choice for high-burden systemic MSSA infections?",
    options: [
      { id: "vancomycin", name: "Vancomycin" },
      { id: "nafcillin", name: "Nafcillin" },
      { id: "amoxicillin", name: "Amoxicillin" },
      { id: "clindamycin", name: "Clindamycin" }
    ],
    correctAnswerId: "nafcillin",
    explanation: "The definitive therapy choice for MSSA bacteremia is an anti-staphylococcal penicillin like Nafcillin, or a first-generation cephalosporin like Cefazolin. Vancomycin is clinically inferior due to slower clearance and higher rates of treatment failure."
  },
  {
    id: "scen-cdiff",
    caseText: "An elderly patient is treated with a 14-day course of intravenous Clindamycin for aspiration pneumonia. She subsequently develops severe, watery, foul-smelling diarrhea with marked leukocytosis. Stool toxin assays are positive for Clostridioides difficile.",
    question: "Which antibiotic is first-line, but must be administered strictly via the ORAL route to ensure clinical efficacy?",
    options: [
      { id: "vanco-po", name: "Oral Vancomycin" },
      { id: "vanco-iv", name: "Intravenous Vancomycin" },
      { id: "clinda-po", name: "Oral Clindamycin" },
      { id: "metron-iv", name: "IV Metronidazole" }
    ],
    correctAnswerId: "vanco-po",
    explanation: "Oral Vancomycin is first-line for C. difficile colitis. Intravenous Vancomycin is NOT excreted into the gastrointestinal lumen and is completely ineffective. Oral Vancomycin has virtually zero systemic absorption, remaining in the gut where it kills the bacteria."
  },
  {
    id: "scen-atypical",
    caseText: "A 19-year-old college sophomore presents with a slow-onset, non-productive-cough, low-grade fever, headache, and severe fatigue. Chest examination reveals diffuse rales, but chest X-ray reveals bilateral patchy infiltrates. Cold agglutinin titers are positive.",
    question: "Which of the following antibiotics is effective against this cell wall-deficient 'atypical' cause of pneumonia?",
    options: [
      { id: "cefazolin", name: "Cefazolin" },
      { id: "pip_tazo", name: "Piperacillin-Tazobactam" },
      { id: "azithromycin", name: "Azithromycin" },
      { id: "meropenem", name: "Meropenem" }
    ],
    correctAnswerId: "azithromycin",
    explanation: "The clinical presentation (walking pneumonia in a young adult, positive cold agglutinins, interstitial X-ray mismatch) points to Mycoplasma pneumoniae. M M. pneumoniae lacks a peptidoglycan cell wall; therefore, all β-lactams (Cefazolin, Pip-Tazo, Meropenem) are ineffective. Macrolides (Azithromycin) or Tetracyclines are the choice."
  }
];

export default function AntimicrobialGrid() {
  const [selectedCell, setSelectedCell] = useState<{ pathogenId: string; drugId: string } | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<GridDrug | null>(null);
  const [gramFilter, setGramFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isBannerCollapsed, setIsBannerCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("grid_banner_collapsed");
      if (saved !== null) return saved === "true";
    } catch (e) {
      // Ignore
    }
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const handleToggleBanner = () => {
    const nextState = !isBannerCollapsed;
    setIsBannerCollapsed(nextState);
    try {
      localStorage.setItem("grid_banner_collapsed", String(nextState));
    } catch (e) {
      // ignore
    }
  };

  const explanationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedCell) {
      const timer = setTimeout(() => {
        explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedCell]);

  // Scenarios State
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedScenarioAnswerId, setSelectedScenarioAnswerId] = useState<string | null>(null);
  const [isScenarioSubmitted, setIsScenarioSubmitted] = useState<boolean>(false);
  const [scenarioScore, setScenarioScore] = useState<number>(0);

  const filteredPathogens = PATHOGENS.filter(path => {
    const matchesGram = gramFilter === "all" || path.category.toLowerCase() === gramFilter.toLowerCase();
    const matchesQuery = path.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         path.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGram && matchesQuery;
  });

  const handleCellClick = (pathogenId: string, drugId: string) => {
    setSelectedCell({ pathogenId, drugId });
    const drugObj = DRUGS.find(d => d.id === drugId);
    if (drugObj) {
      setSelectedDrug(drugObj);
    }
  };

  const handleResetChallenge = () => {
    setActiveScenarioIdx(0);
    setSelectedScenarioAnswerId(null);
    setIsScenarioSubmitted(false);
    setScenarioScore(0);
  };

  const handleScenarioOptionClick = (optId: string) => {
    if (isScenarioSubmitted) return;
    setSelectedScenarioAnswerId(optId);
  };

  const handleScenarioSubmit = () => {
    if (!selectedScenarioAnswerId) return;
    setIsScenarioSubmitted(true);
    if (selectedScenarioAnswerId === SCENARIOS[activeScenarioIdx].correctAnswerId) {
      setScenarioScore(prev => prev + 1);
    }
  };

  const handleNextScenario = () => {
    setSelectedScenarioAnswerId(null);
    setIsScenarioSubmitted(false);
    setActiveScenarioIdx(prev => prev + 1);
  };

  const getCellDetails = (pathogenId: string, drugId: string): ExplanationCell => {
    const pathogenMap = COVERAGE_MATRIX[pathogenId];
    if (pathogenMap && pathogenMap[drugId]) {
      return pathogenMap[drugId];
    }
    return { status: "resistant", explanation: "No proven clinical suitability." };
  };

  return (
    <div id="antimicrobial-grid-wrapper" className="space-y-8">
      {/* Intro Header Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 md:p-6 text-white shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="w-full md:max-w-2xl">
            <div className="flex items-center gap-1.5 xs:gap-2 flex-nowrap overflow-x-auto no-scrollbar">
              <span className="bg-emerald-400/30 text-emerald-100 text-[9px] xs:text-[10px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                Pharmacology Engine
              </span>
              <button
                type="button"
                onClick={handleToggleBanner}
                className="text-emerald-100 hover:text-white text-[9px] xs:text-[10px] md:text-xs font-medium bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-full border border-white/5 transition-all flex items-center gap-1 cursor-pointer select-none shrink-0 whitespace-nowrap"
                title={isBannerCollapsed ? "Show details" : "Collapse details"}
              >
                {isBannerCollapsed ? "ℹ️ Expand Info" : "Collapse Info"}
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-3 text-white">
              Interactive Empiric Antimicrobial Grid
            </h2>
            <AnimatePresence initial={false}>
              {!isBannerCollapsed && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs md:text-sm text-emerald-50 leading-relaxed overflow-hidden"
                >
                  Bridge the knowledge gap between bacterial identification and clinical pharmacology. 
                  Click cells in the matrix to view detailed clinical justifications, or test your 
                  empirical coverage intuition in the board review widget.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-4 bg-emerald-700/20 rounded-xl p-3 border border-emerald-400/20 text-xs text-emerald-100 w-full md:w-auto md:justify-end shrink-0">
            <div className="text-center flex-1 md:flex-none min-w-[70px]">
              <span className="block font-bold text-white text-sm md:text-base text-center">12</span>
              <span className="text-[10px] text-emerald-200">Classes</span>
            </div>
            <div className="border-r border-emerald-400/20" />
            <div className="text-center flex-1 md:flex-none min-w-[70px]">
              <span className="block font-bold text-white text-sm md:text-base text-center">12</span>
              <span className="text-[10px] text-emerald-200">Pathogens</span>
            </div>
            <div className="border-r border-emerald-400/20" />
            <div className="text-center flex-1 md:flex-none min-w-[70px]">
              <span className="block font-bold text-white text-sm md:text-base text-center">5</span>
              <span className="text-[10px] text-emerald-200">Boards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Filter Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Filter className="h-4 w-4 text-slate-400" />
          <span>Pathogen Gram Lens:</span>
          <div className="flex flex-wrap gap-1 ml-2">
            {[
              { id: "all", label: "All Biological Groups" },
              { id: "gram-positive", label: "Gram-Positive" },
              { id: "gram-negative", label: "Gram-Negative" },
              { id: "anaerobe", label: "Anaerobe" },
              { id: "atypical", label: "Atypical" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setGramFilter(btn.id)}
                className={`py-1 px-3 rounded-md border text-[11px] font-medium transition-all ${
                  gramFilter === btn.id
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search grid pathogens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs py-2 pl-9 pr-4 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Master Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Matrix and Class Details Table (Takes 2 Columns) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Scrollable Matrix Grid Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 flex items-center justify-between gap-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Susceptibility & Coverage Matrix
              </h3>
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Standard / First-line
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Scenario/Marginal
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> No Action/Resistant
                </span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="sticky left-0 bg-slate-50 border-r border-b border-slate-200 p-3 text-left text-[11px] font-bold text-slate-600 min-w-40 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                      Microorganism
                    </th>
                    {DRUGS.map(drug => (
                      <th 
                        key={drug.id} 
                        className="py-2 px-1 text-center text-[10px] font-bold text-slate-700 min-w-20 border-b border-slate-200"
                      >
                        <span className="block truncate max-w-20 mx-auto" title={drug.name}>{drug.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPathogens.length === 0 ? (
                    <tr>
                      <td colSpan={DRUGS.length + 1} className="py-8 text-center text-xs text-slate-400 italic">
                        No matching pathogens found.
                      </td>
                    </tr>
                  ) : (
                    filteredPathogens.map((path) => (
                      <tr key={path.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100">
                        <td className="sticky left-0 bg-white border-r border-slate-200 p-3 font-semibold text-xs z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                          <span className="block italic text-slate-900">{path.name}</span>
                          <span className="block text-[9px] text-slate-400 font-normal">{path.subDesc}</span>
                        </td>
                        
                        {DRUGS.map((drug) => {
                          const cell = getCellDetails(path.id, drug.id);
                          const isSelected = selectedCell?.pathogenId === path.id && selectedCell?.drugId === drug.id;
                          
                          let cellBg = "bg-rose-50/40 text-rose-600 hover:bg-rose-100/50";
                          let iconNode = <XCircle className="h-3.5 w-3.5 mx-auto text-rose-400" />;

                          if (cell.status === "effective") {
                            cellBg = "bg-emerald-50/40 text-emerald-700 hover:bg-emerald-100/50";
                            iconNode = <CheckCircle2 className="h-3.5 w-3.5 mx-auto text-emerald-500" />;
                          } else if (cell.status === "intermediate") {
                            cellBg = "bg-amber-50/40 text-amber-700 hover:bg-amber-100/50";
                            iconNode = <AlertCircle className="h-3.5 w-3.5 mx-auto text-amber-500" />;
                          }

                          return (
                            <td 
                              key={drug.id} 
                              onClick={() => handleCellClick(path.id, drug.id)}
                              className={`p-2 border-r border-slate-150 text-center cursor-pointer transition-all ${cellBg} ${
                                isSelected ? "ring-2 ring-indigo-500 ring-inset shadow-xs" : ""
                              }`}
                            >
                              {iconNode}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50/40 border-t border-slate-100 text-[10px] text-slate-400 text-right">
              * Click any cell inside the matrix grid to inspect biological resistance and therapy reasoning.
            </div>
          </div>

          {/* Explanation Panel */}
          {selectedCell && (
            <motion.div 
              ref={explanationRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded ${
                      getCellDetails(selectedCell.pathogenId, selectedCell.drugId).status === "effective"
                        ? "bg-emerald-100 text-emerald-800"
                        : getCellDetails(selectedCell.pathogenId, selectedCell.drugId).status === "intermediate"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}>
                      {getCellDetails(selectedCell.pathogenId, selectedCell.drugId).status === "effective" && "First-Line Empirical Coverage"}
                      {getCellDetails(selectedCell.pathogenId, selectedCell.drugId).status === "intermediate" && "Reserve / Specific Situational Use"}
                      {getCellDetails(selectedCell.pathogenId, selectedCell.drugId).status === "resistant" && "Resistant / clinically ineffectual"}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-450 font-mono">Matrix Match: {selectedCell.pathogenId} + {selectedCell.drugId}</span>
                </div>
                <button 
                  id="close-explanation-btn"
                  onClick={() => {
                    setSelectedCell(null);
                    setSelectedDrug(null);
                  }}
                  className="text-xs font-semibold px-2.5 py-1 text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded cursor-pointer self-start sm:self-auto shrink-0 transition-colors"
                >
                  Close Explanation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Pathogen Targeted</h4>
                  <p className="text-sm font-bold text-slate-900 italic mt-0.5">
                    {PATHOGENS.find(p => p.id === selectedCell.pathogenId)?.name}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Group Lens: {PATHOGENS.find(p => p.id === selectedCell.pathogenId)?.category}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Drug Mechanism</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {selectedDrug?.name}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Group class: {selectedDrug?.category}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Therapeutic Clinical Logic</h4>
                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-150 text-xs text-slate-700 leading-relaxed font-sans">
                  {getCellDetails(selectedCell.pathogenId, selectedCell.drugId).explanation}
                </div>
              </div>

              {selectedDrug && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-900 block mb-0.5">Mechanism of Action:</span>
                    {selectedDrug.mechanism}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-amber-900 block mb-0.5">High-Yield Pharmacology Pearl:</span>
                    <div className="border-l-2 border-amber-500 pl-2 leading-relaxed italic bg-amber-50/50 p-2 rounded-r-lg text-slate-800">
                      {selectedDrug.clinicalPearl}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Quick Info Study Deck */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-3">
              <BookOpen className="h-4.5 w-4.5 text-emerald-600" />
              Empiric Grid Pharmacology Cards
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              A quick review of specific mechanisms and toxicities mapped within our treatment matrix.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DRUGS.slice(4, 8).map((drug) => (
                <div key={drug.id} className="p-3 border border-slate-150 hover:border-emerald-300 rounded-lg bg-slate-50/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-xs">{drug.name}</h4>
                      <span className="text-[9px] bg-slate-200/60 text-slate-705 font-bold uppercase rounded px-1.5 py-0.5">{drug.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 italic mt-1 leading-relaxed">{drug.mechanism}</p>
                    <div className="mt-2 text-[10px]">
                      <span className="font-bold text-rose-800">Classic Side Effects: </span>
                      <span className="text-slate-500">{drug.sideEffects.join(", ")}</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-700 italic bg-amber-50/45 p-1.5 rounded">
                    <strong>Pearl:</strong> {drug.clinicalPearl}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Boards Case Mini-Game Widget (Takes 1 Column) */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm border border-slate-800 flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <span className="text-[10px] uppercase tracking-wider font-black text-emerald-300">Boards empirical challenge</span>
                </div>
                <div className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 font-mono">
                  Case {activeScenarioIdx + 1} of {SCENARIOS.length}
                </div>
              </div>

              {activeScenarioIdx < SCENARIOS.length ? (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs text-slate-300 leading-relaxed italic">
                    &ldquo;{SCENARIOS[activeScenarioIdx].caseText}&rdquo;
                  </div>

                  <h4 className="text-xs font-bold text-white tracking-wide">
                    {SCENARIOS[activeScenarioIdx].question}
                  </h4>

                  <div className="space-y-2">
                    {SCENARIOS[activeScenarioIdx].options.map((opt) => {
                      const isSelected = selectedScenarioAnswerId === opt.id;
                      const isCorrect = opt.id === SCENARIOS[activeScenarioIdx].correctAnswerId;
                      
                      let optionStyle = "border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:border-slate-600";
                      
                      if (isScenarioSubmitted) {
                        if (isCorrect) {
                          optionStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-400 font-medium";
                        } else if (isSelected) {
                          optionStyle = "border-rose-500 bg-rose-950/50 text-rose-400";
                        } else {
                          optionStyle = "border-slate-800 opacity-40 text-slate-500 bg-slate-900";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-indigo-400 bg-indigo-950/60 text-indigo-300 font-medium ring-1 ring-indigo-500";
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={isScenarioSubmitted}
                          onClick={() => handleScenarioOptionClick(opt.id)}
                          className={`w-full text-left text-xs p-2.5 rounded-lg border transition-all ${optionStyle}`}
                        >
                          {opt.name}
                        </button>
                      );
                    })}
                  </div>

                  {isScenarioSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-slate-850 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed"
                    >
                      <span className={`block font-bold mb-1 ${
                        selectedScenarioAnswerId === SCENARIOS[activeScenarioIdx].correctAnswerId
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}>
                        {selectedScenarioAnswerId === SCENARIOS[activeScenarioIdx].correctAnswerId ? "✓ Correct Answer!" : "✗ Incorrect."}
                      </span>
                      {SCENARIOS[activeScenarioIdx].explanation}
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/5">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white">Board Review Finished!</h3>
                  <div className="text-stone-300 text-xs">
                    You scored <strong className="text-emerald-400 text-sm">{scenarioScore}</strong> out of <strong className="text-white text-sm">{SCENARIOS.length}</strong> patient-centric cases successfully.
                  </div>
                  <button
                    onClick={handleResetChallenge}
                    className="mt-2 text-xs py-1.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-all"
                  >
                    Restart Empirical Board Deck
                  </button>
                </div>
              )}
            </div>

            {activeScenarioIdx < SCENARIOS.length && (
              <div className="border-t border-slate-850 pt-4 mt-6 flex justify-between items-center bg-slate-900 z-10">
                <div className="text-[11px] text-slate-400 font-mono">
                  Current Score: {scenarioScore} / {SCENARIOS.length}
                </div>
                {!isScenarioSubmitted ? (
                  <button
                    disabled={!selectedScenarioAnswerId}
                    onClick={handleScenarioSubmit}
                    className="text-xs font-semibold py-1.5 px-4 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Submit Case Choice
                  </button>
                ) : (
                  <button
                    onClick={handleNextScenario}
                    className="text-xs font-semibold py-1.5 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition-all flex items-center gap-1"
                  >
                    Next Case
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="bg-white/65 backdrop-blur-xs rounded-xl border border-slate-200 p-4 shadow-3xs text-xs space-y-2">
            <span className="block font-bold text-slate-800">Antimicrobial Target Key:</span>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600">
              <span className="flex items-center gap-1"><strong>MSSA:</strong> Methicillin-Susceptible S. aureus</span>
              <span className="flex items-center gap-1"><strong>MRSA:</strong> Methicillin-Resistant S. aureus</span>
              <span className="flex items-center gap-1"><strong>ESBL:</strong> Extended Spectrum β-Lactamase</span>
              <span className="flex items-center gap-1"><strong>VRE:</strong> Vancomycin-Resistant Enterococcus</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
