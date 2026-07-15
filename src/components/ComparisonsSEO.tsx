import React, { useState, useEffect } from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { treatmentChoicesData } from "../data/treatmentChoices";
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
  Zap,
  X,
  ChevronDown
} from "lucide-react";

interface ComparisonModule {
  slug: string;
  title: string;
  subtitle: string;
  category: "Microbial Resistance" | "Antimicrobial Pharmacology" | "Clinical Diagnosis" | "Microbial Morphology" | "Treatment Choice";
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
  linkedLeftPathogens?: string[];
  linkedRightPathogens?: string[];
  linkedLeftDrugs?: string[];
  linkedRightDrugs?: string[];
  linkedLeftDiseases?: string[];
  linkedRightDiseases?: string[];
}

const BASE_COMPARISONS_DATA: ComparisonModule[] = [
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
  },
  {
    slug: "staph-aureus-vs-strep-pyogenes",
    title: "Staphylococcus aureus vs. Streptococcus pyogenes",
    subtitle: "Gram-Positive Clusters vs. Chains: Skin, Throat, and Toxin Pathways",
    category: "Clinical Diagnosis",
    badgeColor: "bg-red-50 text-red-700 border-red-100",
    intro: "S. aureus and S. pyogenes are the two primary Gram-positive pyogenic pathogens. While both cause severe skin infections, they differ fundamentally in biochemical identity (catalase) and the specific toxin-mediated systemic syndromes they trigger.",
    leftTitle: "Staphylococcus aureus",
    rightTitle: "Streptococcus pyogenes (Group A)",
    comparisonPoints: [
      {
        attribute: "Microscopic Morpology",
        leftValue: "Gram-positive cocci in clusters (grape-like)",
        rightValue: "Gram-positive cocci in pairs or chains"
      },
      {
        attribute: "Catalase Status",
        leftValue: "Catalase Positive (converts hydrogen peroxide into water and oxygen bubbles)",
        rightValue: "Catalase Negative"
      },
      {
        attribute: "Coagulase Status",
        leftValue: "Coagulase Positive (clots plasma; distinguishes S. aureus from other staph)",
        rightValue: "Not applicable (typically beta-hemolytic, Pyrrolidonyl Arylamidase/PYR positive)"
      },
      {
        attribute: "Impetigo Features",
        leftValue: "Causes bullous or non-bullous impetigo; can cause scalded skin syndrome",
        rightValue: "Causes non-bullous impetigo (honey-crusted lesions) exclusively"
      },
      {
        attribute: "Systemic Toxins",
        leftValue: "TSST-1 (superantigen causing Toxic Shock Syndrome), Exfoliatin (scalded skin), Enterotoxins (food poisoning)",
        rightValue: "Pyrogenic Exotoxin A (superantigen causing Streptococcal Toxic Shock Syndrome), Streptolysin O/S"
      }
    ],
    clinicalPearls: [
      "Staphylococcal TSS vs. Streptococcal TSS: Staphylococcal TSS is classic for vaginal tampon usage and blood cultures are typically negative (isolated localized toxin release). Streptococcal TSS is typically associated with necrotizing fasciitis, and blood cultures are frequently positive.",
      "Post-infectious sequelae: S. pyogenes pharyngitis or impetigo can lead to Acute Post-Streptococcal Glomerulonephritis (APSGN). Only S. pyogenes pharyngitis leads to Rheumatic Fever (highly preventable with early penicillin therapy)."
    ],
    examTraps: [
      "Watch out for Catalase positive organisms in patients with Chronic Granulomatous Disease (CGD). S. aureus goes on to cause recurrent abscesses because CGD neutrophils cannot generate reactive oxygen, while S. pyogenes is catalase-negative and does NOT pose a high risk.",
      "An impetigo prompt that mentions large fluid-filled blisters (bullae) points exclusively to S. aureus due to localized exfoliative toxin action cleavage of desmoglein 1."
    ],
    quiz: {
      question: "A 12-year-old child presents with a severe sore throat, fever, and a red rash with sandpaper texture that is more intense in skin folds. Throat culture grows Gram-positive cocci in chains that are catalase-negative and demonstrate a zone of clear beta-hemolysis around colonies. What is the classic long-term complication preventable with early antimicrobial therapy?",
      options: [
        "Infective Endocarditis",
        "Acute Rheumatic Fever",
        "Acute Post-Streptococcal Glomerulonephritis",
        "Epidermolytic Scalded Skin Syndrome"
      ],
      correctIndex: 1,
      explanation: "The clinical presentation (sore throat, sandpaper-like rash, accentuated in skin folds) indicates Scarlet Fever caused by Streptococcus pyogenes (Group A Strep, catalase-negative, beta-hemolytic cocci in chains). Early treatment of GAS pharyngitis with Penicillin G or Amoxicillin is highly indicated to prevent the development of Acute Rheumatic Fever. Antibiotic therapy does not reduce the risk of Post-Streptococcal Glomerulonephritis, which can occur after either phreatic or dermatological infections."
    }
  },
  {
    slug: "strep-pneumo-vs-strep-pyogenes",
    title: "Streptococcus pneumoniae vs. Streptococcus pyogenes",
    subtitle: "Alpha-Hemolytic Pneumococcus vs. Beta-Hemolytic Group A Strep",
    category: "Microbial Morphology",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    intro: "Both are formidable streptococci, but S. pneumoniae represents the absolute leader in community-acquired bacterial pneumonia and adult meningitis, while S. pyogenes reigns over clinical throat, skin, and necrotizing soft tissue infections.",
    leftTitle: "Streptococcus pneumoniae",
    rightTitle: "Streptococcus pyogenes",
    comparisonPoints: [
      {
        attribute: "Hemolysis Pattern",
        leftValue: "Alpha-hemolytic (partial greening on blood agar due to hydrogen peroxide production)",
        rightValue: "Beta-hemolytic (complete, clear zone of RBC lysis around colonies)"
      },
      {
        attribute: "Cell Arrangement",
        leftValue: "Lancet-shaped Gram-positive diplococci (pairs)",
        rightValue: "Gram-positive cocci in long chains"
      },
      {
        attribute: "Chemical Susceptibility Test",
        leftValue: "Optochin Sensitive; Bile Soluble (lysed by bile salts)",
        rightValue: "Bacitracin Sensitive; PYR Positive"
      },
      {
        attribute: "Major Virulence Shield",
        leftValue: "Thick Polysaccharide Capsule (inhibits phagocytosis; target of vaccine)",
        rightValue: "M Protein (destabilizes complement activation, inhibits phagocytosis, triggers molecular mimicry)"
      },
      {
        attribute: "Clinical Primary Target Sites",
        leftValue: "Pneumonia, Meningitis, Otitis media, Sinusitis (The MOPS bugs)",
        rightValue: "Pharyngitis, Cellulitis, Impetigo, Necrotizing fasciitis, Erysipelas"
      }
    ],
    clinicalPearls: [
      "Quellung Reaction: Adding antibodies specific to S. pneumoniae capsule leads to swelling of the polysaccharide coat, a classic diagnostic test for pneumococcus identity.",
      "Rusty Sputum: Pneumococcal pneumonia is classic for generating rusty, blood-tinged sputum as macrophages break down intra-alveolar erythrocytes."
    ],
    examTraps: [
      "Optochin-resistant alpha-hemolytic streptococci represent the Viridans group (S. mutans, S. sanguinis), which are responsible for dental caries and subacute infective endocarditis. Optochin-sensitive means S. pneumoniae.",
      "A patient presenting with a rapid, life-threatening skin infection that progresses to severe tenderness out of proportion to exam findings indicates Necrotizing Fasciitis ('flesh-eating disease') caused by S. pyogenes."
    ],
    quiz: {
      question: "A blood culture from a 68-year-old male with severe lobar pneumonia grows Gram-positive diplococci. On blood agar, the colonies exhibit alpha-hemolysis, are lysed upon exposure to bile salts, and demonstrate a zone of inhibition around an optochin disc. What is the primary virulence factor that protects this pathogen from splenic clearance?",
      options: [
        "M Protein",
        "Polysaccharide Capsule",
        "IgA Protease",
        "Pneumolysin"
      ],
      correctIndex: 1,
      explanation: "The pathogen is Streptococcus pneumoniae (alpha-hemolytic, bile soluble, optochin-sensitive lancet-shaped diplococci). Its most critical virulence factor is its thick polysaccharide capsule, which resists phagocytosis. Patients without a functional spleen (asplenic, sickle-cell) are extremely vulnerable to encapsulated organisms like S. pneumoniae because they rely on the spleen for opsonized clearance."
    }
  },
  {
    slug: "enterococcus-faecalis-vs-strep-bovis",
    title: "Enterococcus faecalis vs. Streptococcus bovis",
    subtitle: "Group D Streptococcal Subdivisions: UTI/Endocarditis vs. Colon Cancer Associations",
    category: "Clinical Diagnosis",
    badgeColor: "bg-slate-55 text-slate-700 border-slate-200",
    intro: "Prior classification grouped enterococci within Streptococcus. Today, they are distinguished because Enterococcus is intensely resistant to many standard antibiotics, while S. bovis bacteriuria/endocarditis holds a massive clinical correlation to colon malignancies.",
    leftTitle: "Enterococcus faecalis / faecium",
    rightTitle: "Streptococcus bovis (S. gallolyticus)",
    comparisonPoints: [
      {
        attribute: "Bile Esculin Agar Test",
        leftValue: "Positive (grows in bile and hydrolyzes esculin to blacken medium)",
        rightValue: "Positive (grows in bile and hydrolyzes esculin to blacken medium)"
      },
      {
        attribute: "Growth in 6.5% NaCl",
        leftValue: "Positive (readily grows in hyper-saline broth)",
        rightValue: "Negative (cannot tolerate 6.5% NaCl concentration)"
      },
      {
        attribute: "Major Clinical Settings",
        leftValue: "UTIs, Biliary tract infections, Nosocomial lines, Endocarditis",
        rightValue: "Infective Subacute Endocarditis with high-yield cancer indicators"
      },
      {
        attribute: "Drug Resistance Profile",
        leftValue: "Highly resistant to cephalosporins; can develop Vancomycin resistance (VRE via vanA gene)",
        rightValue: "Typically highly sensitive to Penicillin G and simple beta-lactams"
      }
    ],
    clinicalPearls: [
      "S. bovis and the GI screen: Finding Streptococcus gallolyticus (S. bovis) in blood cultures or endocarditis is highly associated with underlying colon cancer, micro-perforations in bowel mucosa are the suspected gateway. A diagnostic colonoscopy is MANDATORY.",
      "Enterococcal Synergism: Enterococci are naturally tolerant to Penicillin, meaning penicillins merely stop growth but do not kill them. To treat enterococcal endocarditis, you MUST combine Ampicillin with an aminoglycoside (Gentamicin) for synergistic bactericidal action."
    ],
    examTraps: [
      "Do not try to treat Enterococcus with any Cephalosporin (like Ceftriaxone or Ceftazidime)! They are inherently resistant to all cephalosporins because they contain low-affinity penicillin-binding proteins.",
      "Pay attention to salt growth: Both Enterococcus and Streptococcus bovis are Group D and hydrolyze bile esculin. However, Enterococcus grows safely in 6.5% NaCl, while S. bovis does not."
    ],
    quiz: {
      question: "A study of blood cultures from a 63-year-old male with low-grade fever reveals Gram-positive cocci. The organism is catalase-negative and is able to grow on bile esculin agar, blackening the medium. However, the organism fails to grow in 6.5% NaCl broth. What is the most appropriate next clinical step for this patient?",
      options: [
        "Schedule an urgent outpatient colonoscopy",
        "Add high-dose Vancomycin and coordinate renal monitoring",
        "Initiate a multi-drug course for suspected tuberculosis",
        "Refer for bone marrow aspiration to look for leukemia"
      ],
      correctIndex: 0,
      explanation: "The organism described is catalase-negative, bile-esculin positive, but salt (6.5% NaCl) intolerant. This profiles Streptococcus bovis (S. gallolyticus). S. bovis bacteremia and endocarditis are heavily associated with occult gastrointestinal malignancies (colorectal carcinoma). Therefore, the mandatory next step is a colonoscopy to screen for underlying colon cancer."
    }
  },
  {
    slug: "listeria-vs-bacillus-anthracis",
    title: "Listeria monocytogenes vs. Bacillus anthracis",
    subtitle: "Tumbling Non-spore Former vs. Medusa-Head Spore-Forming Rod",
    category: "Microbial Morphology",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
    intro: "These Gram-positive bacilli cause catastrophic systemic disease. Listeria is a cold-tolerant pathogen linked to unpasteurized cheese and milk, whereas Bacillus anthracis produces deadly biological toxins transported inside specialized military spores.",
    leftTitle: "Listeria monocytogenes",
    rightTitle: "Bacillus anthracis",
    comparisonPoints: [
      {
        attribute: "Spore Formation",
        leftValue: "Non-spore forming rod",
        rightValue: "Spore-forming rod (highly stable spores in soil/animal products)"
      },
      {
        attribute: "Pathogen Motility",
        leftValue: "Tumbling motility at room temp (22°C); projects 'actin rocket' tails inside host cells",
        rightValue: "Non-motile"
      },
      {
        attribute: "Capsule Composition",
        leftValue: "No Capsule present",
        rightValue: "D-Glutamic acid polypeptide capsule (unique poly-D-glutamate, resists protease digestion)"
      },
      {
        attribute: "Cold Growth (Cold Enrichment)",
        leftValue: "Cold-tolerant; replicates actively at refrigerator temps (4-10°C)",
        rightValue: "Cannot replicate or grow in refrigeration"
      },
      {
        attribute: "Clinical Manifestations",
        leftValue: "Neonatal meningitis, maternal miscarriage, septicemia in elderly or immunocompromised",
        rightValue: "Cutaneous black eschar, Inhalation Anthrax (Woolsorter's disease, widened mediastinum)"
      }
    ],
    clinicalPearls: [
      "Listeria Action: Listeria uses Listeriolysin O to escape macrophage phagosomes and hijack host cell actin (creating 'actin rockets') to move directly into adjacent cells, bypassing antibody-rich extracellular spaces.",
      "Anthrax Toxin Trio: Anthrax toxin consists of Protective Antigen (PA), Edema Factor (EF, an adenylate cyclase that increases cAMP), and Lethal Factor (LF, a zinc-dependent metalloprotease that cleaves MAPKK, causing tissue necrosis)."
    ],
    examTraps: [
      "Empiric meningitis therapy must be augmented with Ampicillin in infants (<1 month) and elderly adults (>50 years) specifically to cover Listeria monocytogenes, as standard ceftriaxone lacks efficacy against it.",
      "An inhalation anthrax chest X-ray does NOT show localized consolidation like typical pneumonias; it classicially demonstrates a dramatically Widened Mediastinum due to hemorrhagic mediastinal lymphadenitis."
    ],
    quiz: {
      question: "A pregnant woman presents with high fever, chills, and muscle aches. She reports eating unpasteurized feta cheese a week ago. Blood cultures grow Gram-positive rods that exhibit tumbling motility at room temperature and produce a small zone of beta-hemolysis on blood agar. What is the cellular mechanism this pathogen uses to relocate from cell-to-cell, avoiding host antibodies?",
      options: [
        "Invasion of host red cells via hemolysis receptors",
        "Direct cytoplasmic transition via actin polymerization",
        "Extracellular migration using polar flagella",
        "Toxin-mediated cellular lysis and systemic reinfection"
      ],
      correctIndex: 1,
      explanation: "The pathogen is Listeria monocytogenes (Gram-positive rods, tumbling motility, unpasteurized cheese link). Listeria is an intracellular pathogen that polymerizes host cell actin filaments to create 'actin rocket tails.' This allows it to move directly from the cytoplasm of one cell to another, avoiding neutralizing antibodies and extracellular host defenses."
    }
  },
  {
    slug: "clostridium-tetani-vs-clostridium-botulinum",
    title: "Clostridium tetani vs. Clostridium botulinum",
    subtitle: "Spastic Tetanus vs. Flaccid Botulism: The Mirror-Image Neurotoxins",
    category: "Antimicrobial Pharmacology",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-100",
    intro: "Two anaerobic, spore-forming Gram-positive bacilli produce some of the most lethal toxins known. Despite mechanical similarities (SNARE protein cleavage), their site-specific actions create two diametric clinical endpoints: rigid spasticity vs. flaccid paralysis.",
    leftTitle: "Clostridium tetani",
    rightTitle: "Clostridium botulinum",
    comparisonPoints: [
      {
        attribute: "Clinical Disease Effect",
        leftValue: "Tetanus: Spastic rigid paralysis (lockjaw/trismus, risus sardonicus, opisthotonus)",
        rightValue: "Botulism: Descending flaccid paralysis (diplopia, dysarthria, dysphagia, dyspnea)"
      },
      {
        attribute: "Toxin Name & Class",
        leftValue: "Tetanospasmin (retrograde axonal transport protein toxin)",
        rightValue: "Botulinum toxin (heat-labile enterotoxin)"
      },
      {
        attribute: "Primary Target Synapses",
        leftValue: "Renshaw inhibitory interneurons in the spinal cord",
        rightValue: "Peripheral neuromuscular junctions (motor nerve terminals)"
      },
      {
        attribute: "Neurotransmitter Blocked",
        leftValue: "Inhibits GABA and Glycine release (blocks inhibitory signals, causing constant contraction)",
        rightValue: "Inhibits Acetylcholine (ACh) release (blocks excitatory muscle signal, causing flaccidity)"
      },
      {
        attribute: "Source of Infection",
        leftValue: "Spore inoculation via deep dirty wounds (stepping on rusty nails, soil contact)",
        rightValue: "Adult: ingestion of preformed toxin in canned food. Infant: ingestion of raw honey spores"
      }
    ],
    clinicalPearls: [
      "In vivo infant botulism: Infants ingest environmental SPORES under 1 year of age (often in raw honey) because their microflora is underdeveloped. The spores germinate in the colon and produce toxin inside the gut ('Floppy Baby Syndrome'). Adults ingest PREFORMED TOXIN from anaerobic canned foods (spores germinate inside the can, not the adult gut).",
      "Therapeutic utility: Botulinum toxin injection (Botox) is clinically utilized for cosmetic wrinkle reduction, migraine prophylaxis, and dystonias by selectively inducing temporary minor muscle flaccidity."
    ],
    examTraps: [
      "Avoid giving raw honey to babies! Pediatric board exams frequently trap students with a 'constipated, weak-crying, hypotonic infant' who was fed raw honey for a cough - this is Botulism.",
      "Tetanus toxin travels retrogradely up motor axons to reach the spinal cord. Botulinum toxin does not undergo retrograde transport; it remains localized at the motor peripheral terminals."
    ],
    quiz: {
      question: "A 4-month-old infant is brought to the emergency department for severe progressive weakness. The parents report the child has been constipated, has a weak suck, and a feeble cry. They mention adding raw honey to the infant's formula over the past month. What is the fundamental cellular mechanism of the toxin responsible for this hypotonic status?",
      options: [
        "Irreversible inhibition of spinal inhibitory GABA interneurons",
        "Cleavage of SNARE proteins halting peripheral Acetylcholine release",
        "Direct destruction of the skeletal muscle sarcolemma",
        "Adenylate cyclase activation leading to local fluid secretion"
      ],
      correctIndex: 1,
      explanation: "This infant has infant botulism caused by ingested Clostridium botulinum spores found in honey. The botulinum toxin is a protease that cleaves SNARE proteins required for synaptic vesicle fusion, which blocks the release of the stimulatory neurotransmitter Acetylcholine at the neuromuscular junction. This leads to flaccid paralysis, characterized by poor muscle tone, constipation, and weak cry ('Floppy Baby Syndrome'). Tetanus toxin also cleaves SNAREs but acts centrally on Glycine/GABA interneurons."
    }
  },
  {
    slug: "clostridium-perfringens-vs-clostridioides-difficile",
    title: "Clostridium perfringens vs. Clostridioides difficile",
    subtitle: "Gas Gangrene and Food Poisoning vs. Pseudomembranous Colitis",
    category: "Clinical Diagnosis",
    badgeColor: "bg-yellow-50 text-yellow-700 border-yellow-105",
    intro: "Two anaerobic spore-formers dominate different clinical spheres: C. perfringens specializes in gas gangrene (myonecrosis) via hemolytic alpha toxin and re-heated meat food poisoning, while C. difficile targets the colon mucosa after antibiotic therapy wipes out local flora.",
    leftTitle: "Clostridium perfringens",
    rightTitle: "Clostridioides difficile",
    comparisonPoints: [
      {
        attribute: "Major Clinical Settings",
        leftValue: "Gas gangrene (myonecrosis after traumatic wounds), or delayed food poisoning (watery diarrhea from reheated meats)",
        rightValue: "Antibiotic-associated diarrhea, Pseudomembranous colitis (colon wall inflammation)"
      },
      {
        attribute: "Key Pathogenic Toxins",
        leftValue: "Alpha Toxin (lecithinase/phospholipase C causing cell membrane cleavage), and heat-labile Enterotoxin (foodborne)",
        rightValue: "Toxin A (enterotoxin binding brush border) and Toxin B (cytotoxin causing actin depolymerization)"
      },
      {
        attribute: "Predisposing Trigger",
        leftValue: "Traumatic soil-contaminated crush injuries, or eating leftover buffet food kept warm",
        rightValue: "Clindamycin, Cephalosporins, fluoroquinolones, or Proton Pump Inhibitor usage"
      },
      {
        attribute: "Diagnostic Features",
        leftValue: "Tissue crepitus (gas bubbles), double zone of hemolysis on blood agar, boxcar-shaped rods",
        rightValue: "Stool PCR or enzyme immunoassay for Toxin A/B; white pseudomembranes on colonoscopy"
      },
      {
        attribute: "First Line Therapy",
        leftValue: "Surgical debridement + Penicillin G paired with Clindamycin (inhibits toxin production)",
        rightValue: "Oral Vancomycin, or Fidaxomicin (narrow-spectrum macrocyclic)"
      }
    ],
    clinicalPearls: [
      "The Clindamycin Double Standard: Clindamycin is a premier culprit that wipes out gut flora and triggers C. difficile colitis. Yet, Clindamycin is actively added to C. perfringens gas gangrene therapy because it arrests bacterial ribosomal translation, instantly shutting down lethal alpha-toxin production.",
      "C. perfringens food poisoning is delayed (8-22 hours) because spores must germinate in the gut to release enterotoxtin. This is unlike S. aureus, which is rapid (1-6 hours) because you ingest preformed heat-stable toxins on potato salad."
    ],
    examTraps: [
      "Crepitus is the buzzword of buzzwords! If a patient has a dirty wound and you feel a crackling sensation (subcutaneous gas) under the skin, choose C. perfringens. Do not wait for cultures before starting Penicillin/Clindamycin.",
      "Do NOT use intravenous Vancomycin to treat C. difficile colitis; IV Vancomycin is not excreted into the colon bowel lumen and will completely fail. You must administer oral Vancomycin."
    ],
    quiz: {
      question: "A 54-year-old male is hospitalized for osteomyelitis and completes a 3-week course of IV Ceftriaxone. He develops profuse, foul-smelling watery diarrhea, abdominal cramping, and a white blood cell count of 19,000. Colonoscopy reveals yellowish-white plaques on erythematous colonic mucosa. What is the molecular action of the toxin causing these plaques?",
      options: [
        "Inactivation of EF-2 via ADP-ribosylation",
        "Cleavage of 28S ribosomal RNA halting translation",
        "Disruption of cell membrane lecithin causing cellular lysis",
        "Inhibition of Rho GTPase leading to actin depolymerization"
      ],
      correctIndex: 3,
      explanation: "This patient has pseudomembranous colitis caused by Clostridioides difficile (yellowish-white plaques on erythematous mucosa, post-cephalosporin history). The primary cytotoxin responsible for this damage is C. difficile Toxin B, which glycosylates and inactivates Rho GTPases. This leads to actin depolymerization, cellular cytoskeletal collapse, cell death, and mucosal inflammation, forming 'pseudomembranes'."
    }
  },
  {
    slug: "e-coli-vs-klebsiella-vs-proteus",
    title: "E. coli vs. Klebsiella vs. Proteus",
    subtitle: "The UTI Trio: Lactose Fermenters vs. Urease-Positive Staghorn Calculi",
    category: "Clinical Diagnosis",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
    intro: "These Gram-negative enteric bacilli represent the most common causative agents of Urinary Tract Infections (UTIs). Clinicians distinguish them immediately via MacConkey agar lactose fermentation and chemical urease status.",
    leftTitle: "Escherichia coli",
    rightTitle: "Klebsiella pneumoniae & Proteus mirabilis",
    comparisonPoints: [
      {
        attribute: "MacConkey Lactose Test",
        leftValue: "Strong Lactose Fermenter (pink colonies on MacConkey agar)",
        rightValue: "Klebsiella: Strong fermenter (highly mucoid pink colonies). Proteus: Non-fermenter (colorless)"
      },
      {
        attribute: "Urease Enzyme Status",
        leftValue: "Urease Negative",
        rightValue: "Proteus: Strongly Urease-positive (converts urea to ammonia, raises urine pH > 8.0). Klebsiella: Weakly positive"
      },
      {
        attribute: "Key Virulence Factors",
        leftValue: "Fimbriae/pili (adherence to uroepithelium), K1 capsule (neonatal meningitis), LPS Lipid A",
        rightValue: "Klebsiella: Abundant mucoid polysaccharide capsule. Proteus: Swarming motility"
      },
      {
        attribute: "Classic Pathognomonic Clue",
        leftValue: "Green metallic sheen on EMB agar; causes 80%+ of uncomplicated UTIs",
        rightValue: "Klebsiella: Currant jelly sputum. Proteus: Staghorn renal calculi (magnesium ammonium phosphate/struvite)"
      }
    ],
    clinicalPearls: [
      "Staghorn stone chemistry: Proteus's powerful urease enzyme breaks down urea into ammonia, creating highly alkaline urine (pH > 8.0). Ammonia alkaline environments precipitate magnesium, ammonium, and phosphate (struvite stones), forming massive branch-like staghorn calculi that can completely fill the renal pelvis.",
      "The Mucoid Factor: Klebsiella colonies are famously wet and slimy (mucoid) because the bacterium synthesizes an exceptionally thick carbohydrate-capsule shield."
    ],
    examTraps: [
      "Any UTI vignette that mentions a urine pH of 8.5, or a large branching stone in the kidney pelvis, is an immediate giveaway for Proteus. Do not select E. coli, as E. coli does not produce urease.",
      "Remember that E. coli is a common cause of neonatal meningitis, second only to Group B Strep. The specific virulence factor that allows it to bypass neonate blood-brain-barriers is the K1 capsular antigen."
    ],
    quiz: {
      question: "A 32-year-old female presents with flank pain, dysuria, and hematuria. Urinalysis shows a urine pH of 8.4, numerous white blood cells, and triple-phosphate crystals. A kidney ultrasound reveals a large staghorn calculus occupying the left renal pelvis. What is the most likely pathogen and its biochemical feature?",
      options: [
        "Escherichia coli; Metallic sheen on EMB agar",
        "Proteus mirabilis; Highly active urease producing alkaline urine",
        "Klebsiella pneumoniae; Abundant mucoid polysaccharide capsule",
        "Staphylococcus saprophyticus; Novobiocin resistance"
      ],
      correctIndex: 1,
      explanation: "A high urinary pH (8.4) with struvite (triple phosphate) staghorn renal stones points directly to Proteus mirabilis. Proteus's urease hydrolyzes urea into NH3 (ammonia) and CO2, raising the pH. This alkaline urine provides the chemical conditions for struvite (magnesium ammonium phosphate) crystals to precipitate, forming staghorn stones. E. coli and Klebsiella are not strongly urease-positive and typically do not raise urine pH to this level."
    }
  },
  {
    slug: "pseudomonas-vs-enterobacteriaceae",
    title: "Pseudomonas aeruginosa vs. Enterobacteriaceae",
    subtitle: "Non-Fermenting Opportunist vs. Glucose-Fermenting Enteric Family",
    category: "Microbial Morphology",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-100",
    intro: "In hospital medicine, distinguishing Pseudomonas aeruginosa from the Enterobacteriaceae (E. coli, Klebsiella, Enterobacter) is critical. Pseudomonas is a highly resistant, non-fermenting aerobe that is notorious for opportunistic hospital acquisitions.",
    leftTitle: "Pseudomonas aeruginosa",
    rightTitle: "Enterobacteriaceae (E. coli, Klebsiella, etc.)",
    comparisonPoints: [
      {
        attribute: "Oxidase Reaction Test",
        leftValue: "Oxidase Positive (contains cytochrome c oxidase; quickly turns blue with redox reagent)",
        rightValue: "Oxidase Negative"
      },
      {
        attribute: "Glucose Metabolism",
        leftValue: "Non-fermenter (obtains energy through aerobic respiration only, does not ferment sugars)",
        rightValue: "Glucose Fermenters (ferment glucose, active anaerobes)"
      },
      {
        attribute: "Natural Pigment & Odor",
        leftValue: "Produces Pyocyanin (blue-green pigment) and Pyoverdine (fluorescent); sweet grape-like odor",
        rightValue: "No intense metallic grape odor, typical colony colors on agar"
      },
      {
        attribute: "Major Pathologies",
        leftValue: "Pneumonia in Cystic Fibrosis, Otitis externa (swimmer's ear), ecthyma gangrenosum, hot tub folliculitis, burn wound infections",
        rightValue: "UTIs, abdominal sepsis, neonatal sepsis, standard community-acquired lobar pneumonias"
      },
      {
        attribute: "Empirical Susceptibility",
        leftValue: "Incredibly drug-resistant. Requires specific antipseudomonal agents (Pip-Tazo, Ceftazidime, Cefepime, Meropenem)",
        rightValue: "Varying susceptibility, many respond well to standard penicillins or early cephalosporins"
      }
    ],
    clinicalPearls: [
      "Pseudomonas and cystic fibrosis: P. aeruginosa utilizes a specialized alginate mucoid exopolysaccharide biofilm to shelter itself inside CF lung alveolar niches, making eradication nearly impossible once established.",
      "Ecthyma Gangrenosum: A severe neutropenic septicemia characterized by skin lesions containing black necrotic centers with surrounding redness - this is a classic systemic sign of Pseudomonas bacteremia causing vascular invasion."
    ],
    examTraps: [
      "Do NOT use Ceftriaxone to treat Pseudomonas! Ceftriaxone is an excellent broad-spectrum 3rd-generation cephalosporin, but it has exactly ZERO activity against Pseudomonas. You must use Ceftazidime (3rd gen with antipseudomonal cover) or Cefepime (4th gen).",
      "Pay attention to the oxygen environment: Pseudomonas is an obligate aerobe; it requires oxygen to synthesize ATP and cannot ferment."
    ],
    quiz: {
      question: "An oncology patient with severe neutropenia develops a high fever, and over 12 hours, a black, necrotic, indurated skin lesion with a surrounding erythematous halo appears on his groin. Blood cultures grow Gram-negative rods that are oxidase-positive, produce a green pigment, and do not ferment glucose. Which of the following cephalosporins is active against this pathogen?",
      options: [
        "Ceftriaxone",
        "Cefazolin",
        "Cefepime",
        "Cefuroxime"
      ],
      correctIndex: 2,
      explanation: "The clinical lesion (ecthyma gangrenosum in a neutropenic patient) and organism properties (oxidase-positive, non-fermenting, green pigment Gram-negative rod) indicate Pseudomonas aeruginosa. Uncomplicated pseudomonal sepsis requires broad antipseudomonal coverage. Cefepime (a 4th-generation cephalosporin) and Ceftazidime have powerful antipseudomonal activity. Ceftriaxone, Cefazolin, and Cefuroxime lack any activity against P. aeruginosa."
    }
  },
  {
    slug: "salmonella-vs-shigella-vs-campylobacter",
    title: "Salmonella vs. Shigella vs. Campylobacter",
    subtitle: "Invasive Diarrheas: Motile H2S Producer vs. Acid-Stable Dysentery vs. Seagull-Wing Thermophile",
    category: "Clinical Diagnosis",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    intro: "These three Gram-negative pathogens represent major causes of invasive, bloody diarrhea (dysentery). Clinical boards test their biochemical differences, animal reservoirs, and neurologic post-infectious manifestations.",
    leftTitle: "Salmonella & Shigella",
    rightTitle: "Campylobacter jejuni",
    comparisonPoints: [
      {
        attribute: "Microscopic Shape",
        leftValue: "Gram-negative rods (bacilli)",
        rightValue: "Curved, comma-shaped or seagull-wing Gram-negative rods"
      },
      {
        attribute: "Flagellar Motility & H2S",
        leftValue: "Salmonella: Motile, produces H2S (black colonies on Hektoen agar). Shigella: Non-motile, no H2S",
        rightValue: "Highly motile ('corkscrew' motility); does not produce H2S"
      },
      {
        attribute: "Infectious Dose (Acid)",
        leftValue: "Salmonella: High dose required (acid-sensitive, killed by stomach acid). Shigella: Extremely low dose (acid-stable)",
        rightValue: "Moderate dose; thrives in hot temperatures (thermophilic; grows at 42°C)"
      },
      {
        attribute: "Animal Reservoirs",
        leftValue: "Salmonella: Poultry, eggs, turtles, reptiles (S. typhi is human only). Shigella: Humans only",
        rightValue: "Poultry, chickens, birds, unpasteurized milk, domestic pets"
      },
      {
        attribute: "Severe Sequelae Risk",
        leftValue: "Salmonella: Osteomyelitis in sickle cell. Shigella: Hemolytic Uremic Syndrome (HUS via Shiga toxin)",
        rightValue: "Guillain-Barré Syndrome (ascending paralysis via antigenic mimicry), Reactive Arthritis"
      }
    ],
    clinicalPearls: [
      "The low-dose Shigella transmission: Because Shigella is highly resistant to stomach acid, as few as 10 to 100 organisms can survive ingestion and cause full-blown dysentery. This is why it spreads incredibly fast in daycare centers (fecal-oral route). Salmonella enteritidis requires massive populations (>10^5) to cause food poisoning.",
      "Campylobacter's neurological mimicry: C. jejuni's outer lipooligosaccharide (LOS) structurally mimics human peripheral myelin ganglioside GM1. After clearance, autoimmune antibodies mistakenly cross-react and damage host myelin, causing Guillain-Barré Syndrome."
    ],
    examTraps: [
      "If a sickle cell patient develops Osteomyelitis, the most common pathogen is Salmonella, even though S. aureus is the most common cause in the general population. Sickle cell splenic dysfunction impairs clearance of encapsulated Salmonella.",
      "Campylobacter jejuni is a thermophilic organism. If a bacterial culture from a stool sample must be grown at 42°C on Skirrow agar to isolate the bug, think Campylobacter."
    ],
    quiz: {
      question: "A stool culture from a 26-year-old male with severe bloody diarrhea. On Hektoen enteric agar, the isolated Gram-negative rods form translucent colonies with black centers, confirming H2S production and flagellar motility. The patient has a history of sickle cell anemia. What secondary bone-associated pathology is this patient highly predisposed to form?",
      options: [
        "Avascular necrosis of the femoral head",
        "Salmonella Osteomyelitis",
        "Reactive arthritis of the knee joint",
        "Post-infectious rhabdomyolysis"
      ],
      correctIndex: 1,
      explanation: "The pathogen described is Salmonella (Gram-negative motile rod producing H2S with black centers on Hektoen agar). Sickle-cell anemia patients suffer micro-infarcts in their gastrointestinal vasculature and have impaired splenic macrophage function. This allows Salmonella to transcend the bowel and seed the necrotic bone, making Salmonella the classic cause of bacterial Osteomyelitis in patients with sickle cell disease."
    }
  },
  {
    slug: "neisseria-meningitidis-vs-neisseria-gonorrhoeae",
    title: "Neisseria meningitidis vs. Neisseria gonorrhoeae",
    subtitle: "Gram-Negative Diplococci: Epidemic Meningitis vs. Sexually Transmitted Strains",
    category: "Microbial Morphology",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    intro: "The genus Neisseria consist of Gram-negative 'kidney bean' diplococci. Despite structural similarities, they split into two separate clinical emergencies: N. meningitidis, an encapsulated respiratory-borne pathogen causing rapid meningitis, and N. gonorrhoeae, a classic sexually transmitted infection.",
    leftTitle: "Neisseria meningitidis (Meningococcus)",
    rightTitle: "Neisseria gonorrhoeae (Gonococcus)",
    comparisonPoints: [
      {
        attribute: "Polysaccharide Capsule",
        leftValue: "Has thick protective capsule (antiphagocytic; base for conjugate vaccine)",
        rightValue: "No Capsule present"
      },
      {
        attribute: "Maltose Fermentation Test",
        leftValue: "Ferments both Maltose and Glucose (Meningococcus = Maltose + Glucose)",
        rightValue: "Ferments Glucose ONLY (Gonococcus = Glucose only)"
      },
      {
        attribute: "Primary Transmission Mode",
        leftValue: "Respiratory droplets, colonizes nasopharynx first, common in crowded college dorms",
        rightValue: "Sexual contact, or neonatal vertical transmission during childbirth"
      },
      {
        attribute: "Key Clinical Syndromes",
        leftValue: "Meningitis, acute meningococcemia (purpura fulminans, Waterhouse-Friderichsen syndrome)",
        rightValue: "Urethritis, cervicitis, PID, septic arthritis (uniarticular), neonatal ophthalmia neonatorum"
      },
      {
        attribute: "Vaccine Availability",
        leftValue: "Conjugate vaccines available (MenACWY and MenB)",
        rightValue: "None, due to extreme antigenic variation of pilin proteins"
      }
    ],
    clinicalPearls: [
      "Waterhouse-Friderichsen Syndrome: Severe meningococcemia causes disseminated intravascular coagulation (DIC), leading to hemorrhagic necrosis of both adrenal glands, triggering acute adrenal insufficiency, extreme shock, and death within hours.",
      "The Gonorrhea Antigenic Shuffle: N. gonorrhoeae has no vaccine because its main attachment organ, the pilus, undergoes constant antigenic variation via DNA genetic recombination. The human immune system cannot build long-lasting memory cells against it."
    ],
    examTraps: [
      "Neisseria meningitidis is an obligate encapsulated pathogen. If a patient is deficient in the late complement membrane attack complex (C5-C9), they are highly vulnerable to recurrent, systemic Neisseria infections.",
      "A young sexually active female presenting with a swollen, highly agonizing single knee joint (monoarticular septic arthritis) should make you suspect N. gonorrhoeae septic arthritis."
    ],
    quiz: {
      question: "A spinal fluid sample from an 18-year-old college freshman with altered mental status, high fever, and a petechial rash on both legs grows Gram-negative kidney bean-shaped diplococci. The isolated organism is able to ferment both glucose and maltose. What is the status of a capsule in this bacterium and what genetic deficiency would predispose a host to recurrent infections?",
      options: [
        "Unencapsulated; IgA deficiency",
        "Encapsulated; C5-C9 Membrane Attack Complex deficiency",
        "Encapsulated; NADPH Oxidase deficiency",
        "Unencapsulated; Splendore-Hoeppli phenomenon"
      ],
      correctIndex: 1,
      explanation: "The pathogen is Neisseria meningitidis (meningitis, petechial rash, college freshman, maltose + glucose fermenter). Unlike N. gonorrhoeae, N. meningitidis is encapsulated (protecting it from early phagocytosis). Individuals with a late complement terminal pathway deficiency (C5-C9) cannot assemble the Membrane Attack Complex (MAC), leaving them highly vulnerable to invasive bacteremia from Neisseria species."
    }
  },
  {
    slug: "strep-pneumo-vs-haemophilus-influenzae",
    title: "Streptococcus pneumoniae vs. Haemophilus influenzae",
    subtitle: "Encapsulated Foes: Lancet-Shaped Diplococcus vs. Chocolate Agar Growth Factor Dependent Coccobacillus",
    category: "Clinical Diagnosis",
    badgeColor: "bg-zinc-50 text-zinc-700 border-zinc-100",
    intro: "S. pneumoniae and H. influenzae represent the two primary encapsulated pathogens of the upper and lower respiratory tracts. In clinical exams, they are differentiated by direct morphology, hemolysis, and specific growth factor requirements on blood vs. chocolate agar.",
    leftTitle: "Streptococcus pneumoniae",
    rightTitle: "Haemophilus influenzae",
    comparisonPoints: [
      {
        attribute: "Microscopic Shape",
        leftValue: "Lancet-shaped Gram-positive diplococci (pairs)",
        rightValue: "Gram-negative pleomorphic coccobacillus (short rods)"
      },
      {
        attribute: "Culture Medium & Factors",
        leftValue: "Grows on blood agar, exhibits alpha-hemolysis (partial greening)",
        rightValue: "Requires Chocolate Agar with Hematine (Factor X) and NAD (Factor V) to support growth"
      },
      {
        attribute: "Satellite Phenomenon",
        leftValue: "No satellite association needed",
        rightValue: "Can grow on blood agar only as satellites directly surrounding colonies of helper S. aureus (which synthesizes Factor V)"
      },
      {
        attribute: "Major Capsular Serotype",
        leftValue: "Over 90 distinct polysaccharide capsular serotypes",
        rightValue: "Serotype b (Hib) is the historically most invasive capped subtype"
      },
      {
        attribute: "Vaccine Compositions",
        leftValue: "Pneumococcal vaccines: PCV13/PCV15/PCV20 (conjugate), PPSV23 (pure polysaccharide)",
        rightValue: "Hib Conjugate vaccine: Hib capsule polysaccharide conjugated to tetanus toxoid or diphtheria protein carrier"
      }
    ],
    clinicalPearls: [
      "The Satellite Phenomenon: H. influenzae cannot grow on raw blood agar because red cells shelter NAD (Factor V) inside healthy envelopes. However, if S. aureus is co-plated, S. aureus's hemolytic enzymes lyse surrounding RBCs (releasing hematin/Factor X) and actively excrete NAD (Factor V). H. influenzae then multiplies as satellite colonies surrounding the S. aureus colonies.",
      "The Conjugated Protection: Pure capsular polysaccharide vaccines are poor triggers for CD4 T helper lymphocytes. Conjugating the polysaccharide to an immunogenic protein allows antigen-presenting cells to present peptides to T cells, shifting immunity towards powerful antibody-secreting plasma memory B cell profiles."
    ],
    examTraps: [
      "If a child presents with rapid high fever, inspiratory stridor, drooling, and sitting in a 'tripod position' with an enlarged cherry-red epiglottis on lateral neck X-rays (Thumbprint sign), choose acute Epiglottitis from Hib. Never instrument the airway without an anesthesiologist ready to intubate.",
      "Hib refers to Haemophilus influenzae type B. This is separate from non-typeable H. influenzae (unencapsulated), which is a common cause of uncomplicated otitis media, acute sinusitis, and bronchitis."
    ],
    quiz: {
      question: "A throat swab from a pediatric patient with high fever and respiratory distress is plated on standard sheep blood agar. No growth of the primary gram-negative coccobacilli is observed, except as tiny 'satellite' colonies immediately adjacent to colonies of hemolytic Staphylococcus aureus. Why does this pathogen grow specifically in this arrangement?",
      options: [
        "Staphylococcus aureus generates hydrogen sulfide required for anaerobic metabolic processes",
        "Staphylococcus aureus provides Factor V (NAD) and releases Factor X (hemin) through red blood cell hemolysis",
        "Staphylococcus aureus neutralizes toxic lactic acids secreted by the mucosal host cells",
        "Staphylococcus aureus acts as an endocellular chaperone transport vector"
      ],
      correctIndex: 1,
      explanation: "The child's pathogen is Haemophilus influenzae (Gram-negative coccobacillus, fails to grow alone on blood agar but satellites S. aureus). H. influenzae requires Factor X (hemin) and Factor V (NAD) for growth. S. aureus lyses surrounding erythrocytes (releasing Factor X) and actively secretes Factor V as a metabolic by-product, permitting H. influenzae's growth nearby."
    }
  },
  {
    slug: "legionella-vs-mycoplasma-pneumoniae",
    title: "Legionella vs. Mycoplasma pneumoniae",
    subtitle: "Atypical Pneumonias: Pontiac Fever/Hyponatremia vs. Walking Pneumonia with Cold Agglutinins",
    category: "Clinical Diagnosis",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-100",
    intro: "Both are premier causes of 'atypical' or walking pneumonia (characterized by hazy chest X-rays contrasting with minor physical symptoms). They differ completely in environmental reservoirs and systemic extra-pulmonary clinical presentations.",
    leftTitle: "Legionella pneumophila",
    rightTitle: "Mycoplasma pneumoniae",
    comparisonPoints: [
      {
        attribute: "Cell Wall Structure",
        leftValue: "Gram-negative rod (stains poorly; requires silver stain to visualize)",
        rightValue: "No cell wall (no peptidoglycan; contains sterols in cell membrane to add stability; cannot Gram stain)"
      },
      {
        attribute: "Primary Reservoirs",
        leftValue: "Freshwater systems, cooling towers, showers, air conditioning units (no human-to-human spread)",
        rightValue: "Humans only; spreads rapidly via respiratory droplets in crowded military bases or dorms"
      },
      {
        attribute: "Extrapulmonary Signs",
        leftValue: "Hyponatremia (low sodium), neurological confusion, severe watery diarrhea",
        rightValue: "Erythema multiforme (targetoid lesions), cold autoimmune hemolytic anemia, bullous myringitis"
      },
      {
        attribute: "Diagnostic Modalities",
        leftValue: "Urinary antigen test (detects L. pneumophila serogroup 1), culture on BCYE charcoal agar",
        rightValue: "Cold agglutinin titer (IgM antibodies agglutinate RBCs at 4°C), PCR assay"
      },
      {
        attribute: "Empirical Classes",
        leftValue: "Fluoroquinolones (Levofloxacin) or Macrolides (Azithromycin)",
        rightValue: "Macrolides (Azithromycin), Doxycycline (beta-lactams are totally useless due to absent cell walls)"
      }
    ],
    clinicalPearls: [
      "The Hyponatremia Link: Legionnaires' disease is classic for triggering severe syndrome of inappropriate ADH (SIADH) or renal tubular damage, pushing plasma sodium levels below 130 mEq/L, which drives the altered mental status and confusion.",
      "Cold Agglutinins demystified: In Mycoplasma infection, human IgM antibodies generated against the bacterial antigen cross-react with the I-antigen on red blood cells at cold temperatures (like in the extremities). This leads to localized intravascular RBC agglutination, visible as a transient cold-induced autoimmune hemolysis."
    ],
    examTraps: [
      "If a patient presents with atypical pneumonia symptoms paired with gastrointestinal symptoms like diarrhea, and laboratory markers reveal hyponatremia and relative bradycardia, immediately prioritize Legionella.",
      "Mycoplasma pneumoniae is completely resistant to Penicillins, Cephalosporins, and Vancomycin because these drugs inhibit cell-wall synthesis. Since Mycoplasma literally lacks a cell wall, these drugs have no biological target."
    ],
    quiz: {
      question: "A 43-year-old hotel maintenance worker presents with high fever, respiratory distress, and dry cough. Labs show a sodium level of 124 mEq/L (severe hyponatremia), liver transaminases are elevated, and the patient has three loose watery stools today. Chest X-ray show patchy infiltrates. What is the most definitive culture medium required to isolate the causative organism?",
      options: [
        "Chocolate agar with Factors V and X",
        "Buffered Charcoal Yeast Extract (BCYE) agar supplemented with iron and L-cysteine",
        "Lowenstein-Jensen medium",
        "MacConkey agar with sorbitol fermentation"
      ],
      correctIndex: 1,
      explanation: "This patient is presenting with Legionnaires' disease (atypical pneumonia, hyponatremia 124, watery diarrhea, hotel maintenance water contact). Legionella pneumophila is a fastidious organism that requires Buffered Charcoal Yeast Extract (BCYE) agar supplemented with L-cysteine and iron to grow. Charcoal is added to absorb toxic fatty acids present in standard culture broths."
    }
  },
  {
    slug: "mycoplasma-vs-chlamydophila-vs-legionella",
    title: "Mycoplasma vs. Chlamydophila vs. Legionella",
    subtitle: "Atypical Respiratory Triangle: Cell Wall Absent vs. Obligate Intracellular vs. Environmental Reservoir",
    category: "Clinical Diagnosis",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-100",
    intro: "These three distinct atypical pathogens represent the absolute primary triad of community-acquired walking pneumonias. Because they do not respond to beta-lactam therapies, clinicians must master their biological identities and distinct diagnostic hallmarks.",
    leftTitle: "Mycoplasma / Chlamydophila",
    rightTitle: "Legionella pneumophila",
    comparisonPoints: [
      {
        attribute: "Biological Integrity",
        leftValue: "Mycoplasma: Free-living, lacks peptide walls. Chlamydophila: Obligate intracellular, cannot synthesize own ATP",
        rightValue: "Facultative intracellular, Gram-negative, lives inside flagellated aquatic amoebae"
      },
      {
        attribute: "Extrapulmonary Hallmark",
        leftValue: "Mycoplasma: Sore ears (bullous myringitis), target rash. Chlamydophila: Often associated with subacute asthma flareups",
        rightValue: "SIADH (extreme low sodium), severe diarrhea, neurological confusion"
      },
      {
        attribute: "Chlamydia Lifecycle",
        leftValue: "Chlamydophila uses Elementary body (infectious, enters cell) and Reticulate body (replicates inside cell)",
        rightValue: "Not applicable (typical binary fission inside amoedas/macrophages)"
      },
      {
        attribute: "First-Line Therapy",
        leftValue: "Azithromycin, Doxycycline, or Respiratory Fluoroquinolones (Moxifloxacin)",
        rightValue: "Levofloxacin, Azithromycin"
      }
    ],
    clinicalPearls: [
      "The Elementary / Reticulate shift: Chlamydia species are unable to produce their own high-energy phosphates (ATP), requiring them to exist as obligate parasites inside eukaryotic cells. The 'Elementary body' is the extracellular, spore-like infectious form. Once inside the host cell phagosome, it reorganizes into the metabolically active, replicating 'Reticulate body'."
    ],
    examTraps: [
      "Do not try to stain Mycoplasma or Chlamydia with a standard Gram stain! Choose PCR, serology, or special stains (Giemsa for Chlamydophila; Silver stain or fluorescent antibody stains for Legionella) in board-style diagnostic question pools."
    ],
    quiz: {
      question: "A basic science researcher is studying cellular replication under microscopes. She observes an infectious agent that undergoes an biphasic cell cycle. The agent's extracellular form is chemically inert and enters host lines via receptor-mediated endocytosis, reorganizing into a larger, ATP-dependent form that divides by binary fission. What is this organism?",
      options: [
        "Mycoplasma pneumoniae",
        "Chlamydophila pneumoniae",
        "Legionella pneumophila",
        "Streptococcus pneumoniae"
      ],
      correctIndex: 1,
      explanation: "This biphasic lifestyle (Elementary body for infectious entry, Reticulate body for intracellular replication) is the hallmark of the Chlamydiaceae family, which includes Chlamydophila pneumoniae. Mycoplasma is free-living and extracellular, and Legionella is a facultative intracellular flagellate."
    }
  },
  {
    slug: "bacterial-meningitis-pathogens",
    title: "Bacterial Meningitis: Pneumococcus vs. Meningococcus vs. Listeria",
    subtitle: "Age-Based Empiric Pathogens: Neonates, College Dorms, and Elderly Cohorts",
    category: "Clinical Diagnosis",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-100",
    intro: "Meningitis represents a high-criticality diagnostic emergency. Because delays lead to permanent neurological damage or death, empirical antibiotic therapies are dictated strictly by the most statistically likely age-based pathogens.",
    leftTitle: "S. pneumoniae & N. meningitidis",
    rightTitle: "Listeria monocytogenes",
    comparisonPoints: [
      {
        attribute: "Suspetible Populations",
        leftValue: "S. pneumoniae: Most common cause overall (all ages). N. meningitidis: Teenagers, young adults, military recruits, college dorms",
        rightValue: "Neonates (<1 month), Elderly (>50 years), pregnant women, immunocompromised (transplant patients)"
      },
      {
        attribute: "Microscopic Attributes",
        leftValue: "S. pneumoniae: Gram-positive lancet diplococci. N. meningitidis: Gram-negative kidney diplococci",
        rightValue: "Gram-positive rods; exhibits tumbling motility at room temp"
      },
      {
        attribute: "Key Invasive Virulence",
        leftValue: "IgA Proteases (cleaves IgA to colonize mucosa first), thick protective capsules",
        rightValue: "Listeriolysin O (destroys phagosome membrane), internalins (helps cell entry)"
      },
      {
        attribute: "Empiric Treatment Additions",
        leftValue: "Standard: Vancomycin + Ceftriaxone (highly active against resistant pneumococci and Neisseria)",
        rightValue: "Mandatory addition of Ampicillin to standard therapy to cover Listeria (which is resistant to Ceftriaxone)"
      }
    ],
    clinicalPearls: [
      "The Ampicillin mandate: Always add Ampicillin to empiric meningitis protocols if the patient is under 1 month of age, over 50 years of age, or possesses known cell-mediated immunofailures (HIV, transplants) specifically to cover Listeria monocytogenes. Ceftriaxone has zero coverage against Listeria.",
      "The Steroid Cushion: Give Dexamethasone just before or concurrent with the first dose of antibiotics. This dampens the massive, toxic inflammatory cascade triggered as the bactericidal drugs rupture bacterial membranes, preventing severe sensorineural hearing loss."
    ],
    examTraps: [
      "If you see a teenager with high fever, neck stiffness, and a petechial/purpuric rash, choose N. meningitidis. If you see an elderly patient with meningitis, choose S. pneumoniae as the most likely cause, but make sure Ampicillin is in their antibiotic order set."
    ],
    quiz: {
      question: "An empiric meningitis cocktail consisting of high-dose Vancomycin and Ceftriaxone is ordered for a 62-year-old female presenting with nuchal rigidity and high fever. Blood cultures later grow Gram-positive rods that survive under cold refrigeration. What drug is missing from this patient's empirical regimen?",
      options: [
        "Gentamicin",
        "Amoxicillin",
        "Ampicillin",
        "Linezolid"
      ],
      correctIndex: 2,
      explanation: "This patient is over 50 years of age, meaning she is at high risk for Listeria monocytogenes meningitis (Gram-positive cold-tolerant rod). The standard empiric cocktail (Vancomycin + Ceftriaxone) does not cover Listeria. Ampicillin must be added of all meningitis patients over 50 or under 1 month to prevent treatment failure."
    }
  },
  {
    slug: "viral-vs-bacterial-meningitis",
    title: "Viral vs. Bacterial Meningitis",
    subtitle: " Lumbar Puncture CSF Profiles: Glucose, Protein, and White Cell Differentials",
    category: "Clinical Diagnosis",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-100",
    intro: "Differentiating viral (aseptic) from bacterial meningitis is one of the most common, high-yield clinical evaluations. Lumbar puncture analysis of the cerebrospinal fluid (CSF) provides the objective biochemical maps to guide immediate therapies.",
    leftTitle: "Bacterial Meningitis CSF",
    rightTitle: "Viral (Aseptic) Meningitis CSF",
    comparisonPoints: [
      {
        attribute: "Cerebrospinal Opening Pressure",
        leftValue: "Markedly elevated (typically >200-250 mm H2O)",
        rightValue: "Normal or only mildly elevated (<200 mm H2O)"
      },
      {
        attribute: "Dominant White Cell Class",
        leftValue: "Neutrophils (PMNs) dominate (often >1,000 cells/uL)",
        rightValue: "Lymphocytes dominate (typically <500 cells/uL)"
      },
      {
        attribute: "CSF Glucose Levels",
        leftValue: "Markedly decreased (<40% of blood glucose; bacteria actively consume glucose)",
        rightValue: "Normal (typically 60-70% of blood glucose; viruses do not consume glucose)"
      },
      {
        attribute: "CSF Protein Levels",
        leftValue: "Markedly elevated (typically >250 mg/dL; blood-brain barrier is heavily damaged)",
        rightValue: "Normal or only mildly elevated (<100 mg/dL)"
      },
      {
        attribute: "Primary Organisms",
        leftValue: "S. pneumoniae, N. meningitidis, GBS, Listeria",
        rightValue: "Enteroviruses (coxsackievirus, echovirus), HSV-2 (mononuclear meningitis)"
      }
    ],
    clinicalPearls: [
      "The Glucose consumption rule: Why does glucose drop in bacterial meningitis? Transporter molecules on the inflamed blood-brain barrier are chemically damaged, and polymorphonuclear neutrophils (PMNs) consuming glucose via anaerobiosis, drastically depleting CSF glucose values.",
      "Aseptic Meningitis: The term 'aseptic' refers to a CSF profile showing lymphocytes and normal glucose with negative standard bacterial cultures. The vast majority of these cases are caused by non-polio Enteroviruses."
    ],
    examTraps: [
      "A lumbar puncture revealing high pressure, high protein (>250), low glucose (<40), but with lymphocytic dominance instead of neutrophils points directly to Fungal or Tuberculous meningitis. Do not select viral meningitis, which has normal glucose.",
      "Kernig's and Brudzinski's signs: Kernig's (pain on passive knee extension when hip is flexed) and Brudzinski's (passive neck flexion causes involuntary hip/knee flexion) indicate meningeal irritation but do not distinguish viral from bacterial."
    ],
    quiz: {
      question: "A lumbar puncture is performed on a 22-year-old male with severe headache, neck stiffness, and photophobia. CSF analysis reveals: opening pressure 140 mm H2O (normal), WBC 180/uL with 88% lymphocytes, glucose 65 mg/dL (serum level 100 mg/dL), and protein 45 mg/dL. What is the most likely etiology?",
      options: [
        "Streptococcus pneumoniae",
        "Cryptococcus neoformans",
        "Coxsackievirus",
        "Mycobacterium tuberculosis"
      ],
      correctIndex: 2,
      explanation: "This CSF profile (normal opening pressure, lymphocyte dominance, normal glucose around 65% of serum, and normal/mild protein) indicates classic Viral (aseptic) Meningitis. Non-polio enteroviruses (like Coxsackievirus or Echovirus) causes the vast majority of viral cases. Bacterial (S. pneumoniae), fungal (Cryptococcus), and tuberculous (Tuberculous) meningitis would show severely decreased glucose levels."
    }
  },
  {
    slug: "ehec-vs-etec-vs-eiec-vs-eaec",
    title: "EHEC vs. ETEC vs. EIEC vs. EAEC",
    subtitle: "Escherichia coli Pathotypes: Shiga-Like Toxins, Traveler's Diarrhea, and Tissue Invasion",
    category: "Clinical Diagnosis",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    intro: "Escherichia coli possesses multiple distinct clinical virulence strains (pathotypes). Distinguishing these strains is of paramount importance for board exams because therapies and systemic risks (such as renal failure) differ fundamentally.",
    leftTitle: "EHEC & ETEC",
    rightTitle: "EIEC & EAEC",
    comparisonPoints: [
      {
        attribute: "Full Pathology Name",
        leftValue: "EHEC: Enterohemorrhagic E. coli. ETEC: Enterotoxigenic E. coli",
        rightValue: "EIEC: Enteroinvasive E. coli. EAEC: Enteroaggregative E. coli"
      },
      {
        attribute: "Toxin & Mechanism",
        leftValue: "EHEC: Shiga-like toxin (Stx-1/2, halts protein synthesis). ETEC: Heat-labile (LT, increases cAMP) and Heat-stable (ST, increases cGMP)",
        rightValue: "EIEC: Invades colonic cell walls directly. EAEC: Plasmid-encoded fimbriae form stacked microcolonies ('stacked brick' pattern)"
      },
      {
        attribute: "Primary Clinical Manifestations",
        leftValue: "EHEC: Severe bloody diarrhea (hemorrhagic colitis). ETEC: Watery, secretory 'Traveler's' diarrhea (non-bloody)",
        rightValue: "EIEC: Severe bloody diarrhea with fever (dysentery mimicking Shigella). EAEC: Chronic pediatric watery diarrhea"
      },
      {
        attribute: "Hemolytic Uremic Syndrome risk",
        leftValue: "EHEC: High risk (O157:H7 subtype). ETEC: No HUS association",
        rightValue: "EIEC: No HUS association. EAEC: No classic association"
      },
      {
        attribute: "Antibiotic Treatment Guideline",
        leftValue: "EHEC: STRICTLY CONTRAINDICATED (antibiotics trigger massive releases of Shiga-like toxins, increasing HUS risk). ETEC: Self-limiting, hydration",
        rightValue: "EIEC: Supportive, hydration. EAEC: Rehydration"
      }
    ],
    clinicalPearls: [
      "The ETEC Toxin Mnemonic: 'Labile in the Air (cAMP), Stable on the Ground (cGMP)'. Heat-Labile toxin activates Adenylate cyclase (elevating cAMP); Heat-Stable toxin activates Guanylate cyclase (elevating cGMP). Both cause massive electrolyte secretion into the intestinal lumen, drawing water along and initiating watery diarhea.",
      "EHEC O157:H7 diagnostic trap: This specific strain does NOT ferment Sorbitol, whereas 95% of other E. coli strains do. Plating on MacConkey Sorbitol (SMAC) agar will yield colorless colonies for EHEC, confirming its presence."
    ],
    examTraps: [
      "In a pediatric patient presenting with bloody diarrhea after eating undercooked hamburger meat, do NOT prescribe antibiotics (like Ciprofloxacin)! Rupturing the dying EHEC cells releases massive amounts of Shiga-like toxins, promoting acute glomerular damage and Hemolytic Uremic Syndrome (characterized by thrombocytopenia, microangiopathic hemolytic anemia, and acute kidney injury).",
      "EIEC is structurally and pathologically almost identical to Shigella. EIEC uses the same actin-rocket intracellular movement system to invade and destroy the colonic epithelium."
    ],
    quiz: {
      question: "A 5-year-old child presents with bloody diarrhea after eating at a local barbecue. A stool specimen is positive for Escherichia coli that does not ferment sorbitol on sorbitol-MacConkey agar. Two days later, the child develops oliguria, pallor, and petechiae. Labs reveal a platelet count of 45,000, high creatinine, and numerous schistocytes on blood smear. What classic clinical syndrome has emerged?",
      options: [
        "Henoch-Schönlein Purpura",
        "Hemolytic Uremic Syndrome (HUS)",
        "Disseminated Intravascular Coagulation (DIC)",
        "Systemic Inflammatory Response Syndrome (SIRS)"
      ],
      correctIndex: 1,
      explanation: "This child has developed Hemolytic Uremic Syndrome (HUS), triggered by an infection with Enterohemorrhagic E. coli O157:H7 (bloody diarrhea, colorless non-sorbitol-fermenting colonies). The Shiga-like toxin binds glomerular endothelial cells, triggering local platelet activation, microvascular clots, and mechanical RBC destruction (schistocytes on blood smear). This leads to the classic HUS triad: Microangiopathic hemolytic anemia, Thrombocytopenia, and Acute Renal Failure."
    }
  },
  {
    slug: "giardia-vs-entamoeba",
    title: "Giardia lamblia vs. Entamoeba histolytica",
    subtitle: "Secretory Flagellate Protozoan vs. Invasive Tissue-Destroying Amoeba",
    category: "Clinical Diagnosis",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    intro: "These two high-yield gastrointestinal protozoans are contracted via contaminated water cysts. However, Giardia is a non-invasive flagellate that coats the duodenum, while Entamoeba is a cytotoxically invasive pathogen that deeply penetrates the mucosal wall.",
    leftTitle: "Giardia lamblia",
    rightTitle: "Entamoeba histolytica",
    comparisonPoints: [
      {
        attribute: "Pathology Type",
        leftValue: "Non-invasive flagellate trophozoite (looks like a face with 'owl eye' nuclei)",
        rightValue: "Invasive cytotoxically-destructive amoeba (trophozoites show engulfed RBCs inside cytoplasm)"
      },
      {
        attribute: "Primary Clinical Symptoms",
        leftValue: "Foul-smelling, greasy watery diarrhea (steatorrhea), flatulence, bloating, weight loss",
        rightValue: "Bloody dysentery (bloody stools), severe abdominal cramping, liver pain"
      },
      {
        attribute: "Anatomical Target Site",
        leftValue: "Duodenum and jejunum (adheres to brush border via a ventral suction disc)",
        rightValue: "Colon mucosal wall (causes deep flask-shaped mucosal ulcers)"
      },
      {
        attribute: "Extraintestinal Complications",
        leftValue: "Malabsorption of fat-soluble vitamins (A, D, E, K), severe weight loss",
        rightValue: "Amoebic Liver Abscess (classic 'anchovy paste' fluid with intense right upper quadrant pain)"
      },
      {
        attribute: "Microscopic Diagnosis",
        leftValue: "Trophozoites or cysts in stool; pear-shaped with 4 pairs of flagella and 2 nuclei",
        rightValue: "Stool O&P showing erythrophagocytosis (engulfed red blood cells within the amoebic trophozoite)"
      }
    ],
    clinicalPearls: [
      "The Ventral Suction Disc: Giardia does not invade tissue or secrete painful cytotoxins. Instead, it uses a highly specialized ventral adhesive disc to 'carpet' the microvillus brush border of the duodenum, mechanically blocking the absorption of fats and lipids. This causes the classic greasy, foul-smelling, floating stools (steatorrhea).",
      "The 'Anchovy Paste' Abscess: If Entamoeba migrates from the colon into the portal circulation, it seeds the liver (usually the right lobe) to form a sterile liver abscess containing fluid described in board questions as having an 'anchovy paste' appearance."
    ],
    examTraps: [
      "A wilderness hiker or camper who drinks untreated mountain stream water and develops severe bloating, flatulence, and bulky foul stools has Giardia. A patient who traveled internationally and presents with bloody stools and a liver mass has Entamoeba.",
      "Treatment for both includes Metronidazole (or Tinidazole). However, for Entamoeba, you must follow metronidazole with a luminal amebicide like Paromomycin or Iodoquinol to eradicate cyst reservoirs remaining in the colon wall."
    ],
    quiz: {
      question: "A 34-year-old aid worker returning from an international mission presents with right upper quadrant abdominal pain and low-grade fevers. Stool tests have been positive for bloody diarrhea. A liver ultrasound shows a single large abscess in the right hepatic lobe. Fluid aspiration reveals odor-free, reddish-brown fluid resembling 'anchovy paste'. What is the most likely microscopic hallmark of this pathogen?",
      options: [
        "Pyriform trophozoites with prominent ventral suction discs",
        "Trophozoites containing ingested erythrocytes inside the cytoplasm",
        "Spore-forming bacilli with terminal swelling",
        "Acid-fast positive developmental oocysts"
      ],
      correctIndex: 1,
      explanation: "This patient is presenting with an Amoebic Liver Abscess secondary to invasive Entamoeba histolytica (bloody dysentery history, standard right hepatic lobe liver mass with sterile, reddish-brown 'anchovy paste' fluid). E. histolytica's classic hallmark diagnostic signature is finding trophozoites with ingested red blood cells (erythrophagocytosis) in stool or tissue samples. Giardia trophozoites have ventral suction discs but do not ingest erythrocytes."
    }
  },
  {
    slug: "bacteroides-vs-clostridium",
    title: "Bacteroides fragilis vs. Clostridium species",
    subtitle: "Obligate Anaerobes: Lipopolysaccharide Non-Toxigenic Rod vs. Spore-Forming Toxin Producer",
    category: "Clinical Diagnosis",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-100",
    intro: "Anaerobic infections below the diaphragm represent severe clinical emergencies. Bacteroides fragilis dominates surgical intra-abdominal abscesses, while Clostridium species are spore-formers who utilize deadly specialized toxins.",
    leftTitle: "Bacteroides fragilis",
    rightTitle: "Clostridium species (perfringens, difficile)",
    comparisonPoints: [
      {
        attribute: "Spore-Forming Status",
        leftValue: "Non-spore forming Gram-negative rod",
        rightValue: "Spore-forming Gram-positive rods"
      },
      {
        attribute: "Lipopolysaccharide (LPS)",
        leftValue: "Possesses LPS but it has a unique Lipid A that does NOT trigger septic shock (non-toxic LPS)",
        rightValue: "No LPS present (Gram-positive wall, relies on protein exotoxins)"
      },
      {
        attribute: "Clinical Association",
        leftValue: "Intra-abdominal surgical abscesses (post-appendicitis, bowel perforations)",
        rightValue: "Gas gangrene, botulism, tetanus, pseudomembranous colitis"
      },
      {
        attribute: "Penicillin Resistance",
        leftValue: "Highly resistant to penicillin (produces natural beta-lactamases)",
        rightValue: "Typically highly sensitive to Penicillin G (except for cephalosporin-induced C. diff)"
      }
    ],
    clinicalPearls: [
      "The Surgical Abscess: Gunshots, appendicitis, or surgical bowel trauma lets Bacteroides fragilis breach the intestinal lumen into the sterile peritoneal cavity. B. fragilis cooperates with aerobic E. coli, taking advantage of the aerobe's oxygen consumption to form thick, anaerobic abdominal abscesses.",
      "Resistance profile: B. fragilis can synthesize beta-lactamases, meaning you must treat it with Metronidazole, Carbapenems (Meropenem), or beta-lactamase inhibitors (Piperacillin-Tazobactam)."
    ],
    examTraps: [
      "Do not choose simple penicillin or cephalosporins (like Ceftriaxone) to treat Bacteroides fragilis! Its beta-lactamase enzymes will easily destroy them. You must use Metronidazole or Pip-Tazo."
    ],
    quiz: {
      question: "Which of the following describes why Bacteroides fragilis is naturally resistant to early penicillins, whereas gas-gangrene causing Clostridium perfringens remains highly sensitive?",
      options: [
        "Bacteroides possesses an outer cell envelope that completely blocks small chemical molecules",
        "Bacteroides routinely produces beta-lactamase enzymes that hydrolyze the antibiotic ring structure",
        "Bacteroides lacks penicillin-binding proteins inside its cytoplasm",
        "Clostridium actively exports beta-lactams using a multi-drug resistance pump"
      ],
      correctIndex: 1,
      explanation: "Bacteroides fragilis is a Gram-negative anaerobe that routinely expresses beta-lactamase enzymes, destroying the core beta-lactam ring of simple penicillins. Therefore, B. fragilis requires Metronidazole, Meropenem, or Piperacillin-Tazobactam. In contrast, Clostridium perfringens is a Gram-positive anaerobe that does not produce beta-lactamase and remains sensitive to Penicillin G."
    }
  },
  {
    slug: "actinomyces-vs-nocardia",
    title: "Actinomyces israelii vs. Nocardia asteroides",
    subtitle: "Filamentous Branching Foes: Severe Oral-Jaw Abscesses vs. Acid-Fast Lung/Brain Lesions",
    category: "Microbial Morphology",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-100",
    intro: "These two unique bacteria grow as long, branching filamentous structures that mimic fungi. Yet, they are true bacteria, differentiated by their oxygen requirements, acid-fast staining, and primary target sites.",
    leftTitle: "Actinomyces israelii",
    rightTitle: "Nocardia asteroides",
    comparisonPoints: [
      {
        attribute: "Oxygen Environment",
        leftValue: "Obligate Anaerobe (must grow in zero-oxygen environments)",
        rightValue: "Obligate Aerobe (requires oxygen; targets lungs and brain)"
      },
      {
        attribute: "Acid-Fast Stain Status",
        leftValue: "Not Acid Fast (negative staining)",
        rightValue: "Weakly Acid-Fast (partially retains carbolfuchsin stain because cell wall contains mycolic acid)"
      },
      {
        attribute: "Primary Clinical Setting",
        leftValue: "Cervicofacial abscesses ('lumpy jaw') after dental trauma, pelvic infection linked to long-term IUDS",
        rightValue: "Pulmonary nodules/pneumonia in immunocompromised patients, migrating to form brain abscesses"
      },
      {
        attribute: "Pathognomonic Clue",
        leftValue: "Yellow 'sulfur granules' draining from sinus tracts (hard clumps of compressed bacteria and calcium)",
        rightValue: "Multi-lobed brain abscesses in patients with depleted T-cell lines; matches soil contact"
      },
      {
        attribute: "First-Line Drug Therapy",
        leftValue: "High-dose Penicillin G ('SNAP' mnemonic: Sulfa for Nocardia, Actinomyces gets Penicillin)",
        rightValue: "Trimethoprim-Sulfamethoxazole (TMP-SMX) ('SNAP' mnemonic)"
      }
    ],
    clinicalPearls: [
      "The 'SNAP' Mnemonic: How do you remember the therapy difference? **SNAP**: **S**ulfa for **N**ocardia, **A**ctinomyces gets **P**enicillin. This is highly tested because getting the drug choice wrong could result in treatment failure.",
      "The Sulfur Granule: The yellow sand-like specs draining from cervicofacial actinomycosis lesions are not made of sulfur. They are hard colonies of Actinomyces bound together with calcium and host inflammatory proteins."
    ],
    examTraps: [
      "If you see a cervicofacial mass after dental work with sinus tracts draining yellow granules, choose Actinomyces and treat with high-dose penicillin. If you see an immunocompromised patient with lung infiltrates and a brain abscess, choose Nocardia and treat with TMP-SMX.",
      "Nocardia's weak acid-fast positive staining is due to intermediate-length mycolic acids in its cell wall. True Mycobacterium tuberculosis has much longer mycolic acids and is strongly acid-fast."
    ],
    quiz: {
      question: "A 48-year-old male receives a kidney transplant and is on immunosuppressive drugs. He presents with fever, productive cough, and a new brain MRI shows three ring-enhancing abscesses. Sputum staining reveals Gram-positive, branching, filamentous rods that are weakly acid-fast. What is the drug combination of choice?",
      options: [
        "Penicillin G + Clindamycin",
        "Trimethoprim-Sulfamethoxazole (TMP-SMX)",
        "Amphotericin B + Flucytosine",
        "Ceftriaxone + Metronidazole"
      ],
      correctIndex: 1,
      explanation: "This immunocompromised patient has a systemic Nocardia asteroides infection (pulmonary symptoms paired with brain abscesses, Gram-positive, branching, filamentous, weakly acid-fast rods). The clinical mnemonic **SNAP** states that **S**ulfa is used for **N**ocardia, and **A**ctinomyces gets **P**enicillin. Therefore, Trimethoprim-Sulfamethoxazole (TMP-SMX) is the first-line treatment of choice."
    }
  }
];

export const COMPARISONS_DATA: ComparisonModule[] = [
  ...BASE_COMPARISONS_DATA,
  ...(treatmentChoicesData as unknown as ComparisonModule[])
];

const normalizeCategory = (category: string) => {
  const c = category.trim().toLowerCase();
  if (c.includes("diagnosis")) return "clinical";
  if (c.includes("morphology")) return "morphology";
  if (c.includes("pharmacology")) return "pharmacology";
  if (c.includes("resistance")) return "resistance";
  if (c.includes("treatment")) return "treatment";
  return "other";
};

const getPathogenPath = (slug: string) => {
  const fungiIds = [
    "candida-albicans", "aspergillus-fumigatus", "cryptococcus-neoformans", "pneumocystis-jirovecii",
    "histoplasma-capsulatum", "coccidioides-immitis", "blastomyces-dermatitidis", "rhizopus-spp",
    "sporothrix-schenckii", "malassezia-furfur", "trichophyton-spp", "microsporum-spp",
    "epidermophyton-spp", "fusarium-spp", "talaromyces-marneffei", "paracoccidioides-brasiliensis",
    "scedosporium-spp"
  ];
  
  const virusIds = [
    "hsv-1", "hsv-2", "vzv", "ebv", "cmv", "hhv-6", "influenza-a", "rsv", "rhinovirus",
    "adenovirus", "rotavirus", "norovirus", "hpv", "hepa", "hepb", "hepc", "hiv",
    "sars-cov-2", "rabies", "measles", "mumps", "rubella", "parvovirus-b19"
  ];
  
  const parasiteIds = [
    "plasmodium-falciparum", "plasmodium-vivax", "giardia-lamblia", "entamoeba-histolytica",
    "trichomonas-vaginalis", "toxoplasma-gondii", "cryptosporidium", "leishmania",
    "enterobius-vermicularis", "ascaris-lumbricoides", "strongyloides-stercoralis", "hookworms",
    "taenia-solium", "schistosoma", "sarcoptes-scabiei"
  ];

  if (fungiIds.includes(slug)) return `/fungi/${slug}`;
  if (virusIds.includes(slug)) return `/viruses/${slug}`;
  if (parasiteIds.includes(slug)) return `/parasites/${slug}`;
  return `/organisms/${slug}`;
};

const getSlugLabel = (slug: string) => {
  const PATHOGEN_LABELS: Record<string, string> = {
    "s-aureus": "S. aureus",
    "s-epidermidis": "S. epidermidis",
    "s-saprophyticus": "S. saprophyticus",
    "s-pneumoniae": "S. pneumoniae",
    "s-pyogenes": "S. pyogenes",
    "s-agalactiae": "S. agalactiae",
    "e-faecalis": "E. faecalis",
    "e-faecium": "E. faecium",
    "s-bovis": "S. bovis",
    "s-mutans": "S. mutans",
    "c-difficile": "C. difficile",
    "c-tetani": "C. tetani",
    "c-botulinum": "C. botulinum",
    "c-perfringens": "C. perfringens",
    "b-anthracis": "B. anthracis",
    "b-cereus": "B. cereus",
    "l-monocytogenes": "L. monocytogenes",
    "c-diphtheriae": "C. diphtheriae",
    "n-asteroides": "N. asteroides",
    "a-israelii": "A. israelii",
    "c-acnes": "C. acnes",
    "n-meningitidis": "N. meningitidis",
    "n-gonorrhoeae": "N. gonorrhoeae",
    "e-coli": "E. coli",
    "k-pneumoniae": "K. pneumoniae",
    "k-oxytoca": "K. oxytoca",
    "e-cloacae": "E. cloacae",
    "s-marcescens": "S. marcescens",
    "p-mirabilis": "P. mirabilis",
    "p-vulgaris": "P. vulgaris",
    "m-morganii": "M. morganii",
    "c-freundii": "C. freundii",
    "c-koseri": "C. koseri",
    "s-typhi": "S. typhi",
    "s-paratyphi": "S. paratyphi",
    "s-nontyphoidal": "Non-typhoidal Salmonella",
    "s-sonnei": "S. sonnei",
    "s-flexneri": "S. flexneri",
    "s-dysenteriae": "S. dysenteriae",
    "p-aeruginosa": "P. aeruginosa",
    "a-baumannii": "A. baumannii",
    "c-jejuni": "C. jejuni",
    "c-coli": "C. coli",
    "v-cholerae": "V. cholerae",
    "v-vulnificus": "V. vulnificus",
    "v-parahaemolyticus": "V. parahaemolyticus",
    "y-pestis": "Y. pestis",
    "y-enterocolitica": "Y. enterocolitica",
    "h-influenzae": "H. influenzae",
    "b-pertussis": "B. pertussis",
    "l-pneumophila": "L. pneumophila",
    "h-pylori": "H. pylori",
    "b-melitensis": "B. melitensis",
    "b-abortus": "B. abortus",
    "f-tularensis": "F. tularensis",
    "t-pallidum": "T. pallidum",
    "b-burgdorferi": "B. burgdorferi",
    "l-interrogans": "L. interrogans",
    "c-trachomatis": "C. trachomatis",
    "c-pneumoniae": "C. pneumoniae",
    "c-burnetii": "C. burnetii",
    "r-rickettsii": "R. rickettsii",
    "r-prowazekii": "R. prowazekii",
    "e-chaffeensis": "E. chaffeensis",
    "a-phagocytophilum": "A. phagocytophilum",
    "b-henselae": "B. henselae",
    "b-quintana": "B. quintana",
    "p-multocida": "P. multocida",
    "b-fragilis": "B. fragilis",
    "p-melaninogenica": "P. melaninogenica",
    "f-nucleatum": "F. nucleatum",
    "p-anaerobius": "P. anaerobius",
    "f-magna": "F. magna",
    "v-parvula": "V. parvula",
    "e-corrodens": "E. corrodens",
    "a-actinomycete": "A. actinomycetemcomitans",
    "p-gingivalis": "P. gingivalis",
    "t-forsythia": "T. forsythia",
    "a-hydrophila": "A. hydrophila",
    "myco-pneumoniae": "M. pneumoniae",
    "u-urealyticum": "U. urealyticum",
    "m-tuberculosis": "M. tuberculosis",
    "m-leprae": "M. leprae",
    "m-avium": "M. avium",
    "b-cepacia": "B. cepacia",
    "s-maltophilia": "S. maltophilia",
    "a-xylosoxidans": "A. xylosoxidans",
    "g-vaginalis": "G. vaginalis",
    "s-mitis": "S. mitis",
    "s-viridans-gp": "S. viridans",
    "candida-albicans": "C. albicans",
    "aspergillus-fumigatus": "A. fumigatus",
    "cryptococcus-neoformans": "C. neoformans",
    "pneumocystis-jirovecii": "P. jirovecii",
    "histoplasma-capsulatum": "H. capsulatum",
    "coccidioides-immitis": "C. immitis",
    "blastomyces-dermatitidis": "B. dermatitidis",
    "rhizopus-spp": "Rhizopus spp.",
    "sporothrix-schenckii": "S. schenckii",
    "malassezia-furfur": "M. furfur",
    "trichophyton-spp": "Trichophyton spp.",
    "microsporum-spp": "Microsporum spp.",
    "epidermophyton-spp": "Epidermophyton spp.",
    "fusarium-spp": "Fusarium spp.",
    "talaromyces-marneffei": "T. marneffei",
    "paracoccidioides-brasiliensis": "P. brasiliensis",
    "scedosporium-spp": "Scedosporium spp.",
    "hsv-1": "HSV-1",
    "hsv-2": "HSV-2",
    "vzv": "VZV",
    "ebv": "EBV",
    "cmv": "CMV",
    "hhv-6": "HHV-6",
    "influenza-a": "Influenza A",
    "rsv": "RSV",
    "rhinovirus": "Rhinovirus",
    "adenovirus": "Adenovirus",
    "rotavirus": "Rotavirus",
    "norovirus": "Norovirus",
    "hpv": "HPV",
    "hepa": "Hepatitis A",
    "hepb": "Hepatitis B",
    "hepc": "Hepatitis C",
    "hiv": "HIV",
    "sars-cov-2": "SARS-CoV-2",
    "rabies": "Rabies",
    "measles": "Measles",
    "mumps": "Mumps",
    "rubella": "Rubella",
    "parvovirus-b19": "Parvovirus B19",
    "plasmodium-falciparum": "P. falciparum",
    "plasmodium-vivax": "P. vivax",
    "giardia-lamblia": "Giardia lamblia",
    "entamoeba-histolytica": "E. histolytica",
    "trichomonas-vaginalis": "T. vaginalis",
    "toxoplasma-gondii": "T. gondii",
    "cryptosporidium": "Cryptosporidium",
    "leishmania": "Leishmania",
    "enterobius-vermicularis": "E. vermicularis",
    "ascaris-lumbricoides": "A. lumbricoides",
    "strongyloides-stercoralis": "S. stercoralis",
    "hookworms": "Hookworms",
    "taenia-solium": "T. solium",
    "schistosoma": "Schistosoma",
    "sarcoptes-scabiei": "S. scabiei"
  };

  if (PATHOGEN_LABELS[slug]) return PATHOGEN_LABELS[slug];

  if (slug === "catheter-associated-urinary-tract-infection") return "CA-UTI";
  if (slug === "community-acquired-pneumonia") return "CAP (Pneumonia)";
  if (slug === "cellulitis-and-skin-infections") return "SSTIs / Cellulitis";
  if (slug === "sepsis") return "Sepsis";
  
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const getDrugLink = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("nitrofurantoin")) return "/drugs/nitrofurantoin";
  if (n.includes("ciprofloxacin")) return "/drugs/ciprofloxacin";
  if (n.includes("amoxicillin")) return "/drugs/amoxicillin";
  if (n.includes("azithromycin")) return "/drugs/azithromycin";
  if (n.includes("vancomycin")) return "/drugs/vancomycin";
  if (n.includes("linezolid")) return "/drugs/linezolid";
  if (n.includes("amphotericin")) return "/drugs/amphotericin-b";
  if (n.includes("fluconazole")) return "/drugs/fluconazole";
  return null;
};

const COMPARISON_LINKS_MAP: Record<string, {
  linkedLeftPathogens?: string[];
  linkedRightPathogens?: string[];
  linkedLeftDrugs?: string[];
  linkedRightDrugs?: string[];
  linkedLeftDiseases?: string[];
  linkedRightDiseases?: string[];
}> = {
  "mrsa-vs-mssa": {
    linkedLeftPathogens: ["s-aureus"],
    linkedLeftDrugs: ["vancomycin", "linezolid"],
    linkedRightPathogens: ["s-aureus"],
    linkedRightDrugs: ["nafcillin"]
  },
  "vancomycin-vs-linezolid": {
    linkedLeftDrugs: ["vancomycin"],
    linkedRightDrugs: ["linezolid"]
  },
  "cellulitis-vs-erysipelas": {
    linkedLeftPathogens: ["s-aureus", "s-pyogenes"],
    linkedLeftDiseases: ["cellulitis-and-skin-infections"],
    linkedRightPathogens: ["s-pyogenes"],
    linkedRightDiseases: ["erysipelas"]
  },
  "gram-positive-vs-gram-negative": {
    linkedLeftPathogens: ["s-aureus", "s-pneumoniae"],
    linkedRightPathogens: ["p-aeruginosa", "e-coli"]
  },
  "bactericidal-vs-bacteriostatic": {
    linkedLeftDrugs: ["amoxicillin", "vancomycin", "ciprofloxacin"],
    linkedRightDrugs: ["linezolid", "azithromycin"]
  },
  "staph-aureus-vs-strep-pyogenes": {
    linkedLeftPathogens: ["s-aureus"],
    linkedRightPathogens: ["s-pyogenes"]
  },
  "strep-pneumo-vs-strep-pyogenes": {
    linkedLeftPathogens: ["s-pneumoniae"],
    linkedRightPathogens: ["s-pyogenes"]
  },
  "enterococcus-faecalis-vs-strep-bovis": {
    linkedLeftPathogens: ["e-faecalis", "e-faecium"],
    linkedRightPathogens: ["s-bovis"]
  },
  "listeria-vs-bacillus-anthracis": {
    linkedLeftPathogens: ["l-monocytogenes"],
    linkedRightPathogens: ["b-anthracis"]
  },
  "clostridium-tetani-vs-clostridium-botulinum": {
    linkedLeftPathogens: ["c-tetani"],
    linkedRightPathogens: ["c-botulinum"]
  },
  "clostridium-perfringens-vs-clostridioides-difficile": {
    linkedLeftPathogens: ["c-perfringens"],
    linkedRightPathogens: ["c-difficile"]
  },
  "e-coli-vs-klebsiella-vs-proteus": {
    linkedLeftPathogens: ["e-coli"],
    linkedRightPathogens: ["k-pneumoniae", "p-mirabilis"]
  },
  "pseudomonas-vs-enterobacteriaceae": {
    linkedLeftPathogens: ["p-aeruginosa"],
    linkedRightPathogens: ["e-coli", "k-pneumoniae"]
  },
  "salmonella-vs-shigella-vs-campylobacter": {
    linkedLeftPathogens: ["s-typhi", "s-nontyphoidal", "s-sonnei"],
    linkedRightPathogens: ["c-jejuni"]
  },
  "neisseria-meningitidis-vs-neisseria-gonorrhoeae": {
    linkedLeftPathogens: ["n-meningitidis"],
    linkedRightPathogens: ["n-gonorrhoeae"]
  },
  "strep-pneumo-vs-haemophilus-influenzae": {
    linkedLeftPathogens: ["s-pneumoniae"],
    linkedRightPathogens: ["h-influenzae"]
  },
  "legionella-vs-mycoplasma-pneumoniae": {
    linkedLeftPathogens: ["l-pneumophila"],
    linkedRightPathogens: ["myco-pneumoniae"]
  },
  "mycoplasma-vs-chlamydophila-vs-legionella": {
    linkedLeftPathogens: ["myco-pneumoniae", "c-pneumoniae"],
    linkedRightPathogens: ["l-pneumophila"]
  },
  "bacterial-meningitis-pathogens": {
    linkedLeftPathogens: ["s-pneumoniae", "n-meningitidis"],
    linkedRightPathogens: ["l-monocytogenes"]
  },
  "viral-vs-bacterial-meningitis": {
    linkedLeftPathogens: ["s-pneumoniae", "n-meningitidis", "l-monocytogenes"],
    linkedRightPathogens: ["hsv-2"]
  },
  "ehec-vs-etec-vs-eiec-vs-eaec": {
    linkedLeftPathogens: ["e-coli"],
    linkedRightPathogens: ["e-coli"]
  },
  "giardia-vs-entamoeba": {
    linkedLeftPathogens: ["giardia-lamblia"],
    linkedRightPathogens: ["entamoeba-histolytica"]
  },
  "bacteroides-vs-clostridium": {
    linkedLeftPathogens: ["b-fragilis"],
    linkedRightPathogens: ["c-perfringens", "c-difficile"]
  },
  "actinomyces-vs-nocardia": {
    linkedLeftPathogens: ["a-israelii"],
    linkedRightPathogens: ["n-asteroides"]
  }
};

export default function ComparisonsSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showDeepDive, setShowDeepDive] = useState(false);

  const handleLaunchApp = (focusTask: string) => {
    localStorage.setItem("infectatlas_active_tab", focusTask);
    navigate("/app/" + focusTask);
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    setShowDeepDive(false);

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
      <PublicHeader handleLaunchApp={handleLaunchApp} showHeader={showHeader} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Compact Breadcrumb */}

        {isIndexView ? (
          <div className="space-y-8 animate-fade-in" id="comparisons-directory-index">
            {/* Compact Unified Hero & Search Panel */}
            <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6 overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-[radial-gradient(circle_at_bottom_right,#0D254D,transparent)] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider leading-none inline-block shadow-3xs">
                    Clinical Reference Compendium
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    High-Yield Clinical Comparisons
                  </h1>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Master key pathogen distinctions, antibiotic resistance profiles, and drug selection criteria side-by-side. Designed to assist with USMLE, COMLEX, and infectious diseases clerkships.
                  </p>
                </div>

                <div className="w-full lg:max-w-md shrink-0 relative group">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-emerald-450 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search clinical comparisons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 focus:bg-slate-950/90 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-450 transition-all text-white placeholder:text-slate-400 shadow-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3.5 top-3.5 text-xs font-extrabold text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Group selection ribbon (similar to /drugs) */}
              <div className="relative z-10 border-t border-slate-800/85 pt-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full flex-nowrap scrollbar-none">
                  {[
                    { id: "all", name: "All Comparisons", color: "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-650/10 hover:bg-indigo-500" },
                    { id: "clinical", name: "Clinical Diagnosis", color: "bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-650/10 hover:bg-amber-500" },
                    { id: "morphology", name: "Microbial Morphology", color: "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-650/10 hover:bg-purple-500" },
                    { id: "pharmacology", name: "Antimicrobial Pharmacology", color: "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-650/10 hover:bg-emerald-500" },
                    { id: "resistance", name: "Microbial Resistance", color: "bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-650/10 hover:bg-rose-500" },
                    { id: "treatment", name: "Treatment Choice", color: "bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-650/10 hover:bg-sky-500" }
                  ].map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
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

            {/* Comparisons Cards Grid */}
            {(() => {
              const query = searchTerm.toLowerCase().trim();
              const filtered = COMPARISONS_DATA.filter((c) => {
                // Category Filter selection
                if (activeCategory !== "all") {
                  const norm = normalizeCategory(c.category);
                  if (norm !== activeCategory) return false;
                }
                // Text Search selection
                if (query) {
                  return (
                    c.title.toLowerCase().includes(query) ||
                    c.subtitle.toLowerCase().includes(query) ||
                    c.intro.toLowerCase().includes(query) ||
                    c.category.toLowerCase().includes(query)
                  );
                }
                return true;
              });

              // Sort comparisons based on tab order when "All comparisons" tab is selected
              const categoryOrder = ["clinical", "morphology", "pharmacology", "resistance", "treatment", "other"];
              const getCategoryOrderIndex = (category: string) => {
                const norm = normalizeCategory(category);
                const idx = categoryOrder.indexOf(norm);
                return idx === -1 ? categoryOrder.length : idx;
              };

              const sorted = [...filtered].sort((a, b) => {
                return getCategoryOrderIndex(a.category) - getCategoryOrderIndex(b.category);
              });

              if (sorted.length === 0) {
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
                  {sorted.map((c) => {
                    const norm = normalizeCategory(c.category);
                    const styleMap = {
                      clinical: {
                        border: "border-l-amber-500 hover:border-amber-300 hover:shadow-amber-50/40",
                        badge: "bg-amber-50 text-amber-700 border-amber-100"
                      },
                      morphology: {
                        border: "border-l-purple-500 hover:border-purple-300 hover:shadow-purple-50/40",
                        badge: "bg-purple-50 text-purple-700 border-purple-100"
                      },
                      pharmacology: {
                        border: "border-l-emerald-500 hover:border-emerald-300 hover:shadow-emerald-50/40",
                        badge: "bg-emerald-50 text-emerald-700 border-emerald-100"
                      },
                      resistance: {
                        border: "border-l-rose-500 hover:border-rose-300 hover:shadow-rose-50/40",
                        badge: "bg-rose-50 text-rose-700 border-rose-100"
                      },
                      treatment: {
                        border: "border-l-sky-500 hover:border-sky-300 hover:shadow-sky-50/40",
                        badge: "bg-sky-50 text-sky-700 border-sky-100"
                      },
                      other: {
                        border: "border-l-indigo-500 hover:border-indigo-300 hover:shadow-indigo-50/40",
                        badge: "bg-indigo-50 text-indigo-700 border-indigo-100"
                      }
                    };
                    const activeStyles = styleMap[norm as keyof typeof styleMap] || styleMap.other;

                    return (
                      <Link
                        key={c.slug}
                        to={`/${c.slug}`}
                        className={`bg-white rounded-2xl border border-slate-200/80 border-l-4 ${activeStyles.border} p-6 shadow-3xs hover:shadow-2xs transition-all duration-300 h-full flex flex-col justify-between group`}
                      >
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full border ${activeStyles.badge} tracking-wider`}>
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
                    );
                  })}
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
          <div className="space-y-8 animate-fade-in">
            {/* Elegant Back Navigation */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Link
                to="/comparisons"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-650 font-bold transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Clinical Comparisons</span>
              </Link>
            </div>

            {/* Main Heading Group */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-full border border-indigo-150 text-indigo-700 bg-indigo-50/50 tracking-wider shadow-2xs`}>
                  {item.category} Module
                </span>
                <span className="bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full">
                  USMLE High-Yield
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                {item.title} Study Module
              </h1>

              {/* Substantive intro */}
              <div className="bg-indigo-50/30 border-l-4 border-indigo-505 p-5 rounded-r-xl shadow-3xs">
                <h2 className="text-[10px] font-black uppercase text-indigo-805 tracking-wider mb-1">Module Overview:</h2>
                <p className="text-sm sm:text-base text-slate-850 leading-relaxed font-semibold">
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mt-2">
                  {item.intro}
                </p>
              </div>
            </div>

            {/* Two-Column split layout: Sticky Selection Sidecorridors & Active View contents */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Side navigation drawer/corridor */}
              <div className="lg:col-span-4 space-y-4 md:sticky md:top-24 order-2 lg:order-1">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-slate-400" />
                    Comparison Corridor
                  </h2>
              
              <div className="space-y-2.5 max-h-[480px] overflow-y-auto custom-scrollbar pr-1.5">
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
          <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
            
            {item.category === "Treatment Choice" ? (
              <>
                {/* Treatment Choice Visual Summary Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-3xs relative overflow-hidden animate-fade-in" id="treatment-choice-summary">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
                  
                  {/* Header */}
                  <div className="space-y-2 relative z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-sky-50 border border-sky-100 text-sky-700 font-extrabold text-[9px] uppercase px-3 py-1 rounded-full tracking-wider leading-none shadow-3xs">
                        Treatment Choice
                      </span>
                      <span className="bg-slate-50 border border-slate-100 text-slate-500 font-extrabold text-[9px] uppercase px-3 py-1 rounded-full tracking-wider leading-none">
                        Board-Yield Reasoning
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                      {item.title.includes(":") ? item.title.split(":")[0].trim() + ": " : ""}Why is {(item as any).preferredTreatment.name} preferred over {(item as any).alternativeTreatment.name}?
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      Quick educational reasoning breakdown for {item.title.split(":")[0] || "this clinical scenario"}.
                    </p>
                  </div>

                  {/* Split Reasons Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 relative z-10">
                    
                    {/* Preferred Column */}
                    <div className="bg-emerald-50/20 border border-emerald-100/70 rounded-2xl p-5 md:p-6 space-y-4 shadow-3xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-800">
                          Why {(item as any).preferredTreatment.name}?
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {(item as any).preferredTreatment.reasons.map((reason: string, rIdx: number) => (
                          <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                            <span className="text-emerald-600 font-black text-base leading-none shrink-0 mt-0.5">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Alternative Column */}
                    <div className="bg-slate-50/40 border border-slate-150 rounded-2xl p-5 md:p-6 space-y-4 shadow-3xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-sm" />
                        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                          Why {(item as any).alternativeTreatment.name} Isn't Preferred
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {(item as any).alternativeTreatment.reasonsNotPreferred.map((reason: string, rIdx: number) => (
                          <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                            <span className="text-slate-400 font-extrabold text-base leading-none shrink-0 mt-0.5">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* High-Yield Board Pearl Callout */}
                  <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 md:p-6 space-y-2.5 relative z-10 shadow-3xs">
                    <div className="flex items-center gap-2 text-sky-900">
                      <BrainCircuit className="h-4.5 w-4.5 text-sky-600 shrink-0" />
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-850">
                        High-Yield Pearl
                      </h4>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-750 leading-relaxed font-semibold">
                      {(item as any).boardPearl}
                    </p>
                  </div>
                </div>

                {/* Optional Deep Dive Section */}
                <div className="border-t border-slate-200 pt-8 mt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Scale className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
                        Detailed Drug Comparison <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">(Optional)</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        Pharmacology Deep Dive for students who want more depth.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDeepDive(!showDeepDive)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-black rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-3xs hover:scale-[1.015]"
                    >
                      <span>{showDeepDive ? "Hide Pharmacology Deep Dive" : "Show Pharmacology Deep Dive"}</span>
                      <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-250 ${showDeepDive ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {showDeepDive && (
                    <div className="space-y-8 animate-fade-in">
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
                          <div className="pt-4 mt-6 border-t border-slate-100/80">
                            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Linked Clinical Profiles:</span>
                            <div className="flex flex-wrap gap-2">
                              {(item as any).preferredTreatment && (() => {
                                const drugLink = getDrugLink((item as any).preferredTreatment.name);
                                return drugLink ? (
                                  <Link to={drugLink} className="text-xs font-bold text-indigo-650 hover:underline bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                                    {(item as any).preferredTreatment.name} <ExternalLink className="h-2.5 w-2.5" />
                                  </Link>
                                ) : null;
                              })()}

                              {(item as any).linkedDiseases?.map((disSlug: string) => (
                                <Link key={disSlug} to={`/diseases/${disSlug}`} className="text-xs font-bold text-slate-600 hover:underline bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-0.5">
                                  {getSlugLabel(disSlug)} <ExternalLink className="h-2.5 w-2.5" />
                                </Link>
                              ))}

                              {(item as any).linkedPathogens?.map((patSlug: string) => (
                                <Link key={patSlug} to={getPathogenPath(patSlug)} className="text-xs font-bold text-emerald-700 hover:underline bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded flex items-center gap-0.5">
                                  {getSlugLabel(patSlug)} <ExternalLink className="h-2.5 w-2.5" />
                                </Link>
                              ))}
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
                          <div className="pt-4 mt-6 border-t border-slate-100/80">
                            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Linked Clinical Profiles:</span>
                            <div className="flex flex-wrap gap-2">
                              {(item as any).alternativeTreatment && (() => {
                                const drugLink = getDrugLink((item as any).alternativeTreatment.name);
                                return drugLink ? (
                                  <Link to={drugLink} className="text-xs font-bold text-emerald-700 hover:underline bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                                    {(item as any).alternativeTreatment.name} <ExternalLink className="h-2.5 w-2.5" />
                                  </Link>
                                ) : null;
                              })()}

                              {(item as any).linkedDiseases?.map((disSlug: string) => (
                                <Link key={disSlug} to={`/diseases/${disSlug}`} className="text-xs font-bold text-slate-600 hover:underline bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-0.5">
                                  {getSlugLabel(disSlug)} <ExternalLink className="h-2.5 w-2.5" />
                                </Link>
                              ))}

                              {(item as any).linkedPathogens?.map((patSlug: string) => (
                                <Link key={patSlug} to={getPathogenPath(patSlug)} className="text-xs font-bold text-emerald-700 hover:underline bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded flex items-center gap-0.5">
                                  {getSlugLabel(patSlug)} <ExternalLink className="h-2.5 w-2.5" />
                                </Link>
                              ))}
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
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Default Non-Collapsible Category Layout */}
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
                        {(() => {
                          const links = COMPARISON_LINKS_MAP[item.slug];
                          if (!links) return <span className="text-xs text-slate-400 italic">None linked</span>;
                          
                          const renderPathogen = (slug: string) => (
                            <Link key={slug} to={getPathogenPath(slug)} className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                              {getSlugLabel(slug)} <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          );

                          const renderDrug = (slug: string) => (
                            <Link key={slug} to={`/drugs/${slug}`} className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                              {slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          );

                          const renderDisease = (slug: string) => (
                            <Link key={slug} to={`/diseases/${slug}`} className="text-xs font-bold text-indigo-650 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                              {getSlugLabel(slug)} <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          );

                          return (
                            <>
                              {links.linkedLeftPathogens?.map(renderPathogen)}
                              {links.linkedLeftDrugs?.map(renderDrug)}
                              {links.linkedLeftDiseases?.map(renderDisease)}
                            </>
                          );
                        })()}
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
                        {(() => {
                          const links = COMPARISON_LINKS_MAP[item.slug];
                          if (!links) return <span className="text-xs text-slate-400 italic">None linked</span>;
                          
                          const renderPathogen = (slug: string) => (
                            <Link key={slug} to={getPathogenPath(slug)} className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                              {getSlugLabel(slug)} <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          );

                          const renderDrug = (slug: string) => (
                            <Link key={slug} to={`/drugs/${slug}`} className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                              {slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          );

                          const renderDisease = (slug: string) => (
                            <Link key={slug} to={`/diseases/${slug}`} className="text-xs font-bold text-emerald-700 hover:underline bg-slate-50 border border-slate-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                              {getSlugLabel(slug)} <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          );

                          return (
                            <>
                              {links.linkedRightPathogens?.map(renderPathogen)}
                              {links.linkedRightDrugs?.map(renderDrug)}
                              {links.linkedRightDiseases?.map(renderDisease)}
                            </>
                          );
                        })()}
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
              </>
            )}

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
        </div>
        )}

      </main>

      {/* Institutional Footer */}
      <PublicFooter />

    </div>
  );
}
