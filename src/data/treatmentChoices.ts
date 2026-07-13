export interface TreatmentChoice {
  id: string;
  slug: string;
  category: "Treatment Choice";
  title: string; // e.g. "UTI: Nitrofurantoin vs. Ciprofloxacin"
  subtitle: string; // e.g. "Uncomplicated cystitis treatment selection"
  linkedDiseases: string[]; // e.g. ["catheter-associated-urinary-tract-infection"]
  linkedPathogens?: string[];
  preferredTreatment: {
    name: string;
    reasons: string[];
  };
  alternativeTreatment: {
    name: string;
    reasonsNotPreferred: string[];
  };
  decisionFactors: string[];
  boardPearl: string;
  // Extra fields to match ComparisonModule interface so we can seamlessly map it
  intro: string;
  badgeColor: string;
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

export const treatmentChoicesData: TreatmentChoice[] = [
  {
    id: "uti-nitrofurantoin-vs-ciprofloxacin",
    slug: "uti-nitrofurantoin-vs-ciprofloxacin",
    category: "Treatment Choice",
    title: "UTI: Nitrofurantoin vs. Ciprofloxacin",
    subtitle: "Uncomplicated Cystitis Treatment Selection",
    linkedDiseases: ["catheter-associated-urinary-tract-infection"],
    linkedPathogens: ["e-coli", "s-saprophyticus", "k-pneumoniae"],
    preferredTreatment: {
      name: "Nitrofurantoin",
      reasons: [
        "Exceptional concentrations in urinary bladder tissue",
        "Narrow-spectrum targeting common urinary pathogens, minimizing systemic collateral damage",
        "Extremely low resistance pressure and low rates of resistance globally"
      ]
    },
    alternativeTreatment: {
      name: "Ciprofloxacin",
      reasonsNotPreferred: [
        "Widespread global resistance among Gram-negative rods",
        "High degree of systemic collateral damage and microflora disruption",
        "Carries severe black-box warnings (tendon rupture, QTc prolongation, aortic aneurysm, mental health effects)"
      ]
    },
    decisionFactors: [
      "Infection site (restricted to bladder vs. kidney/systemic involvement)",
      "Local uropathogen resistance patterns",
      "Patient age and kidney function (GFR < 30 mL/min limits nitrofurantoin efficacy)",
      "Pregnancy status and adverse profile tolerance"
    ],
    boardPearl: "Nitrofurantoin is highly concentrated in urine but achieves virtually zero therapeutic levels in blood or systemic tissues like the kidney. Therefore, it is highly effective for uncomplicated lower cystitis but absolutely contraindicated and ineffective for upper UTIs like pyelonephritis.",
    intro: "Empirical treatment for acute uncomplicated cystitis is focused on rapid mucosal clearance while practicing antibiotic stewardship. Nitrofurantoin remains a premier choice, whereas fluoroquinolones like Ciprofloxacin should be strictly reserved due to toxicity concerns.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Nitrofurantoin (Bladder-Restricted)",
    rightTitle: "Ciprofloxacin (Systemic Fluoroquinolone)",
    comparisonPoints: [
      {
        attribute: "Mechanism of Action",
        leftValue: "Binds ribosomes and damages DNA; multi-targeted mechanism makes resistance rare",
        rightValue: "Inhibits DNA gyrase (topoisomerase II) and topoisomerase IV, halting bacterial replication"
      },
      {
        attribute: "Urinary Concentration",
        leftValue: "Superb; rapidly concentrated in bladder urine, achieving 100-200 mcg/mL",
        rightValue: "Excellent; concentrates well in both urine and renal parenchymal tissues"
      },
      {
        attribute: "Systemic Tissue Levels",
        leftValue: "Negligible; virtually undetectable in serum, prostate, and kidney tissues",
        rightValue: "High; achieves wide distribution in blood, lung, kidney, bone, and prostate"
      },
      {
        attribute: "FDA Black-Box Warnings",
        leftValue: "None; safe and well-tolerated (though chronic use can cause pulmonary fibrosis)",
        rightValue: "Multiple: tendonitis/rupture, peripheral neuropathy, CNS effects, aortic rupture"
      },
      {
        attribute: "Primary Indication",
        leftValue: "Acute uncomplicated lower cystitis (bladder-only mucosal infection)",
        rightValue: "Pyelonephritis, prostatitis, or complicated urinary tract infections"
      }
    ],
    clinicalPearls: [
      "Nitrofurantoin's mechanism involves bacterial ribosomal inactivation and DNA damage, which requires multiple bacterial enzyme mutations to develop resistance. This is why resistance remains remarkably low (<5%) despite decades of use.",
      "Never use Nitrofurantoin for pyelonephritis! Because it has zero systemic tissue levels, the patient will remain bacteremic and their upper UTI will go untreated."
    ],
    examTraps: [
      "A classic boards question describes a female patient with flank pain, costovertebral angle (CVA) tenderness, high fever, and white blood cell casts in urine. Do NOT choose Nitrofurantoin or Fosfomycin; both are urinary-only agents. The patient has pyelonephritis and needs a systemic agent like Ciprofloxacin or Ceftriaxone."
    ],
    quiz: {
      question: "A 23-year-old female presents to the clinic with a 2-day history of dysuria, urinary frequency, and suprapubic pain. She denies fever, chills, flank pain, or vaginal discharge. Vital signs are normal. Urinalysis is positive for nitrites and leukocyte esterase. Her creatinine clearance is 85 mL/min. What is the most appropriate first-line treatment for this patient?",
      options: [
        "PO Oral Nitrofurantoin for 5 days",
        "PO Oral Ciprofloxacin for 3 days",
        "PO Oral Amoxicillin for 7 days",
        "Intravenous Ceftriaxone single dose"
      ],
      correctIndex: 0,
      explanation: "This patient has acute uncomplicated cystitis (suprapubic pain, dysuria, nitrite/LE positive, no systemic symptoms). According to IDSA guidelines, first-line empiric agents include Nitrofurantoin (for 5 days), TMP-SMX (for 3 days, if local resistance is <20%), or Fosfomycin (single dose). Fluoroquinolones like Ciprofloxacin are highly effective but should be avoided for uncomplicated cystitis due to extensive collateral damage and severe side-effect warnings (tendonitis, QTc prolongation). Ceftriaxone is an intravenous agent reserved for pyelonephritis or severe inpatient infections. Amoxicillin has high resistance rates when used empirically as monotherapy."
    }
  },
  {
    id: "cap-amoxicillin-vs-azithromycin",
    slug: "cap-amoxicillin-vs-azithromycin",
    category: "Treatment Choice",
    title: "Pneumonia: Amoxicillin vs. Azithromycin",
    subtitle: "Community-Acquired Pneumonia Outpatient Therapy Selection",
    linkedDiseases: ["community-acquired-pneumonia"],
    linkedPathogens: ["streptococcus-pneumoniae", "mycoplasma-pneumoniae"],
    preferredTreatment: {
      name: "Amoxicillin (High-Dose)",
      reasons: [
        "Highly bactericidal action targeting the cell wall",
        "Maintains outstanding activity against typical Streptococcus pneumoniae",
        "High therapeutic index with excellent tolerability in healthy outpatients"
      ]
    },
    alternativeTreatment: {
      name: "Azithromycin (Macrolide)",
      reasonsNotPreferred: [
        "Widespread global resistance in S. pneumoniae (exceeds 30% in many regions)",
        "Bacteriostatic action only (arrests translation rather than killing bacteria outright)",
        "Cardiovascular safety warnings (risk of QTc prolongation and torsades de pointes)"
      ]
    },
    decisionFactors: [
      "Local pneumococcal resistance rates",
      "Typical vs. atypical bacterial etiologies",
      "Bactericidal vs. bacteriostatic clinical urgency",
      "Patient cardiac history and QTc intervals"
    ],
    boardPearl: "Due to widespread macrolide resistance, monotherapy with Azithromycin is no longer recommended for typical community-acquired pneumonia in outpatient areas where S. pneumoniae resistance exceeds 25%. High-dose Amoxicillin is preferred to ensure bactericidal coverage of typical pneumococcus, or a combination of Amoxicillin + Azithromycin must be used to cover both typicals and atypicals.",
    intro: "Empirical antibiotic choice for outpatient Community-Acquired Pneumonia (CAP) must account for typical and atypical pathogens. While Azithromycin was once the universal empiric choice, rising pneumococcal resistance has restored high-dose Amoxicillin as the preferred bactericidal foundation.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "High-Dose Amoxicillin (Preferred Typicals)",
    rightTitle: "Azithromycin (Macrolide / Atypical Agent)",
    comparisonPoints: [
      {
        attribute: "Mechanism of Action",
        leftValue: "Bactericidal; binds penicillin-binding proteins (PBPs), inhibiting bacterial cell wall synthesis",
        rightValue: "Bacteriostatic; reversibly binds to the 50S ribosomal subunit, inhibiting protein synthesis"
      },
      {
        attribute: "Streptococcus pneumoniae Coverage",
        leftValue: "Excellent (bypasses intermediate resistance via high-dose 1g TID dosing)",
        rightValue: "Poor in many urban regions due to efflux pumps (mefA) and ribosomal methylation (ermB) genes"
      },
      {
        attribute: "Atypical Pathogen Coverage",
        leftValue: "None (atypicals like Mycoplasma and Chlamydia lack peptidoglycan cell walls altogether)",
        rightValue: "Excellent (highly active against Mycoplasma, Chlamydia, and Legionella species)"
      },
      {
        attribute: "Cardiac Safety Profile",
        leftValue: "Completely safe; no effect on cardiac electrophysiology",
        rightValue: "Carries FDA warning for QTc interval prolongation, increasing risk of fatal arrhythmias"
      },
      {
        attribute: "Empiric Clinical Strategy",
        leftValue: "First-line monotherapy for healthy outpatients without major comorbidities",
        rightValue: "Should only be added in combination with a beta-lactam, or used as monotherapy if local resistance is verified <25%"
      }
    ],
    clinicalPearls: [
      "Typical vs. Atypical coverage: Streptococcus pneumoniae is the leading cause of typical lobar pneumonia. Mycoplasma pneumoniae causes atypical interstitial pneumonia ('walking pneumonia'). Amoxicillin treats pneumococcus perfectly but has zero effect on Mycoplasma.",
      "The combination of high-dose Amoxicillin (for typicals) plus Azithromycin or Doxycycline (for atypicals) is highly favored for comprehensive empirical coverage."
    ],
    examTraps: [
      "If a clinical case description notes an elderly patient with typical lobar consolidation on chest X-ray and a history of chronic heart failure, do NOT select Azithromycin monotherapy. S. pneumoniae is highly resistant, and macrolides increase QTc-associated cardiac risk. High-dose Amoxicillin or Levofloxacin is clinically superior."
    ],
    quiz: {
      question: "A healthy 31-year-old male presents with a 3-day history of productive cough with rust-colored sputum, localized pleuritic chest pain, and high fever. Chest radiograph shows a dense left lower lobar consolidation. The local medical laboratory indicates that regional pneumococcal macrolide resistance is approximately 32%. What is the most appropriate empiric outpatient therapy?",
      options: [
        "PO Oral Azithromycin monotherapy",
        "PO Oral High-Dose Amoxicillin monotherapy",
        "PO Oral Ciprofloxacin monotherapy",
        "IV Intravenous Vancomycin"
      ],
      correctIndex: 1,
      explanation: "This patient is presenting with typical lobar pneumonia (dense lobar consolidation on X-ray, productive cough with rust-colored sputum) highly suggestive of Streptococcus pneumoniae. Because local macrolide resistance exceeds the 25% threshold, Azithromycin monotherapy carries a high risk of failure and is contraindicated. High-dose Amoxicillin (1g three times daily) provides excellent bactericidal pneumococcal coverage. Fluoroquinolones like Ciprofloxacin have poor pulmonary penetration and are not used for pneumonia (only 'respiratory' fluoroquinolones like Levofloxacin or Moxifloxacin are used). IV Vancomycin is an inpatient reserve drug and not indicated for healthy outpatient typical CAP."
    }
  },
  {
    id: "mrsa-vancomycin-vs-linezolid",
    slug: "mrsa-vancomycin-vs-linezolid",
    category: "Treatment Choice",
    title: "MRSA: Vancomycin vs. Linezolid",
    subtitle: "Severe MRSA Necrotizing Pneumonia Selection",
    linkedDiseases: ["community-acquired-pneumonia", "cellulitis-and-skin-infections"],
    linkedPathogens: ["staphylococcus-aureus"],
    preferredTreatment: {
      name: "Linezolid",
      reasons: [
        "Outstanding pulmonary tissue penetration (high ELF levels)",
        "Inhibits bacterial protein translation, successfully halting PVL toxin production",
        "No renal clearance requirement, avoiding any risk of drug-induced nephrotoxicity"
      ]
    },
    alternativeTreatment: {
      name: "Vancomycin",
      reasonsNotPreferred: [
        "Relatively poor lung tissue penetration (requires high serum troughs to achieve minimal lung levels)",
        "Carries significant risk of acute kidney injury (AKI) requiring intensive serum level monitoring",
        "Slower bactericidal clearance rates in alveolar spaces compared to systemic tissues"
      ]
    },
    decisionFactors: [
      "Anatomical compartment (lung vs. blood/endocardium)",
      "Bacterial toxin suppression necessity (PVL toxin-producing necrotizing strains)",
      "Baseline renal function and nephrotoxicity risk",
      "Serotonergic drug co-administration"
    ],
    boardPearl: "For severe, necrotizing MRSA pneumonia, Linezolid is clinically preferred over Vancomycin due to its exceptional pulmonary tissue penetration (alveolar lining fluid concentration is ~4 times serum levels) and its ability to inhibit ribosomal translation, shutting down the production of damaging Panton-Valentine Leukocidin (PVL) toxins.",
    intro: "When treating severe Methicillin-Resistant Staphylococcus aureus (MRSA) infections, site-specific pharmacokinetics are critical. In MRSA necrotizing pneumonia, Linezolid's superior lung penetration and anti-toxin mechanism favor it over the standard choice, Vancomycin.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Linezolid (Preferred for Lung & Toxin Block)",
    rightTitle: "Vancomycin (Alternative Glycopeptide)",
    comparisonPoints: [
      {
        attribute: "Pulmonary Penetration",
        leftValue: "Superb; active concentration in alveolar epithelial lining fluid is 400% of serum levels",
        rightValue: "Poor; lung tissue concentration is only about 10-15% of serum levels"
      },
      {
        attribute: "Impact on Bacterial Toxins",
        leftValue: "Halts toxin production (binds 50S ribosome, directly stopping PVL cytotoxin translation)",
        rightValue: "No direct effect on toxins; lyses bacterial cells, which can acutely release pre-formed toxins"
      },
      {
        attribute: "Renal Risk Profile",
        leftValue: "Completely safe for kidneys; no therapeutic drug monitoring (TDM) needed",
        rightValue: "Nephrotoxic; requires tight serum trough/AUC monitoring to avoid acute tubular necrosis"
      },
      {
        attribute: "Severe Side Effects",
        leftValue: "Thrombocytopenia/bone marrow suppression (>2 weeks), weak MAO inhibition (risk of Serotonin Syndrome)",
        rightValue: "Ototoxicity, Nephrotoxicity, and infusion-related 'Red Man Syndrome' (histamine release)"
      },
      {
        attribute: "Oral Bioavailability",
        leftValue: "100% PO Bioavailability (easily transitions from IV to identical PO outpatient dose)",
        rightValue: "0% PO Absorption (systemic infections must be treated intravenously)"
      }
    ],
    clinicalPearls: [
      "PVL Toxin Danger: Community-associated MRSA (CA-MRSA) necrotizing pneumonia produces Panton-Valentine Leukocidin (PVL), a cytotoxin that destroys white blood cells and causes severe lung necrosis. Protein synthesis inhibitors like Linezolid or Clindamycin are added to shut down this toxin production.",
      "The Serotonin Syndrome warning: Because Linezolid is a weak Monoamine Oxidase Inhibitor (MAOI), avoid combining it with SSRIs to prevent serotonin toxicity."
    ],
    examTraps: [
      "Watch out for MRSA bacteremia or infective endocarditis! For intravascular infections, Vancomycin or Daptomycin is preferred over Linezolid. Because Linezolid is bacteriostatic, it is less effective at clearing bacteremic infections compared to bactericidal glycopeptides."
    ],
    quiz: {
      question: "A 42-year-old male with a history of intravenous drug use is admitted to the intensive care unit with severe respiratory distress, high fevers, and cavitary lung lesions on chest CT. Sputum Gram stain shows Gram-positive cocci in clusters, and PCR is positive for MRSA. The patient has baseline chronic kidney disease (serum creatinine 2.4). Which of the following is the most appropriate antibiotic choice for this patient's pneumonia?",
      options: [
        "Intravenous Vancomycin",
        "Intravenous Linezolid",
        "Intravenous Daptomycin",
        "Oral Cephalexin"
      ],
      correctIndex: 1,
      explanation: "This patient has severe, necrotizing MRSA pneumonia. Linezolid is the ideal agent here for three key reasons: 1) outstanding pulmonary tissue penetration, 2) protein-synthesis inhibition which shuts down Panton-Valentine Leukocidin (PVL) toxin production, and 3) absence of renal clearance, avoiding nephrotoxicity in a patient with pre-existing kidney disease. Vancomycin is nephrotoxic, requires therapeutic drug monitoring, and has poor lung penetration. Daptomycin is highly bactericidal but is completely inactivated by pulmonary surfactant, making it entirely useless and contraindicated for pneumonia. Cephalexin is a first-generation cephalosporin and is ineffective against MRSA."
    }
  },
  {
    id: "cryptococcal-amphotericin-vs-fluconazole",
    slug: "cryptococcal-amphotericin-vs-fluconazole",
    category: "Treatment Choice",
    title: "Cryptococcal Meningitis: Amphotericin B + Flucytosine vs. Fluconazole",
    subtitle: "HIV-Associated Meningitis Induction Phase Selection",
    linkedDiseases: ["sepsis"],
    linkedPathogens: ["cryptococcus-neoformans"],
    preferredTreatment: {
      name: "Liposomal Amphotericin B + Flucytosine",
      reasons: [
        "Highly fungicidal synergy",
        "Rapidly clears yeast burden from cerebrospinal fluid (CSF)",
        "Reduces early mortality and prevents therapeutic failure or pressure-related complications"
      ]
    },
    alternativeTreatment: {
      name: "Fluconazole Monotherapy",
      reasonsNotPreferred: [
        "Fungistatic mechanism only (arrests fungal membrane synthesis but does not kill yeasts actively)",
        "Very slow clearance of fungal cells from CSF",
        "High risk of therapeutic failure, progressive elevated intracranial pressure, and early mortality during induction"
      ]
    },
    decisionFactors: [
      "Fungicidal vs. fungistatic action speed",
      "Infection severity and meningeal inflammation",
      "Host immune status (CD4 count < 100 cells/mm³)",
      "Risk of toxicities (nephrotoxicity vs. bone marrow suppression)"
    ],
    boardPearl: "For the induction phase of cryptococcal meningitis, the synergistically fungicidal combination of Liposomal Amphotericin B and Flucytosine is mandatory. Fluconazole monotherapy is highly inappropriate for induction because it is fungistatic, leading to slow fungal clearance, elevated intracranial pressure, and high early mortality. Fluconazole is reserved for the consolidation and maintenance phases.",
    intro: "Treating Cryptococcus neoformans meningitis in immunocompromised patients (typically CD4 < 100) requires a strict multi-phase protocol. The induction phase demands rapid, highly fungicidal synergy to clear yeasts from the brain and CSF, making single-drug static therapy highly dangerous.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Amphotericin B + Flucytosine (Induction)",
    rightTitle: "Fluconazole Monotherapy (Consolidation/Maintenance)",
    comparisonPoints: [
      {
        attribute: "Mechanism of Action",
        leftValue: "Amphotericin B binds ergosterol to form membrane pores (fungicidal); Flucytosine inhibits DNA/RNA synthesis (synergistic)",
        rightValue: "Inhibits lanosterol 14-alpha-demethylase, blocking ergosterol synthesis (fungistatic)"
      },
      {
        attribute: "Speed of Fungal Clearance",
        leftValue: "Extremely rapid; sterilizes cerebrospinal fluid (CSF) within 1-2 weeks",
        rightValue: "Slow; can take several weeks, resulting in prolonged elevated intracranial pressure"
      },
      {
        attribute: "Primary Clinical Phase",
        leftValue: "Strictly indicated for the initial Induction Phase (minimum 2 weeks)",
        rightValue: "Indicated for Consolidation (8 weeks) and long-term Maintenance suppression"
      },
      {
        attribute: "Key Toxicity Risks",
        leftValue: "Nephrotoxicity, severe hypokalemia, hypomagnesemia (Amphotericin); myelosuppression (Flucytosine)",
        rightValue: "Mild hepatotoxicity (elevated LFTs); generally extremely well-tolerated orally"
      },
      {
        attribute: "Administration Route",
        leftValue: "Requires intravenous access (Amphotericin) and oral capsules (Flucytosine)",
        rightValue: "Excellent oral absorption; easily administered as a simple daily tablet"
      }
    ],
    clinicalPearls: [
      "The CSF Tap: Intracranial pressure rises dramatically due to fungal capsule material clogging the arachnoid villi. Therapeutic lumbar punctures are frequently required to drain CSF and relieve pressure, in addition to aggressive induction therapy.",
      "Flucytosine (5-FC) is converted to 5-fluorouracil (5-FU) inside fungal cells. Its main clinical side effect in patients is bone marrow suppression."
    ],
    examTraps: [
      "Never select Fluconazole monotherapy as initial induction for a patient with positive India ink or Cryptococcal antigen in CSF! Fluconazole is fungistatic. If used alone during induction, it leads to early death. Choose Liposomal Amphotericin B + Flucytosine first, then step down to Fluconazole."
    ],
    quiz: {
      question: "A 35-year-old male with HIV and a CD4 count of 42 cells/mm³ presents with a 10-day history of progressive headache, photophobia, and low-grade fever. Physical exam reveals mild nuchal rigidity. Lumbar puncture reveals elevated opening pressure, and India ink preparation of the CSF shows encapsulated budding yeasts. What is the most appropriate initial treatment regimen for this patient?",
      options: [
        "High-dose Oral Fluconazole monotherapy",
        "Intravenous Liposomal Amphotericin B + Oral Flucytosine",
        "Intravenous Ceftriaxone + Vancomycin",
        "Oral Voriconazole monotherapy"
      ],
      correctIndex: 1,
      explanation: "This patient is presenting with acute HIV-associated Cryptococcal Meningitis (CD4 < 100, photophobia, encapsulated budding yeasts on India ink). For the induction phase, a highly fungicidal regimen is required to quickly sterilize the CSF and prevent death. The gold standard guidelines call for Intravenous Liposomal Amphotericin B synergistically combined with Oral Flucytosine for at least 2 weeks. Fluconazole monotherapy is fungistatic and is contraindicated during the induction phase because it is associated with unacceptably high early mortality. It is only used later in the consolidation and maintenance phases. Ceftriaxone and Vancomycin target bacterial meningitis, not fungal."
    }
  },
  {
    id: "mssa-nafcillin-vs-vancomycin",
    slug: "mssa-nafcillin-vs-vancomycin",
    category: "Treatment Choice",
    title: "MSSA: Nafcillin vs. Vancomycin",
    subtitle: "Methicillin-Susceptible Staphylococcus aureus Therapy Selection",
    linkedDiseases: ["bacteremia", "osteomyelitis", "septic-arthritis"],
    linkedPathogens: ["staphylococcus-aureus"],
    preferredTreatment: {
      name: "Nafcillin / Oxacillin",
      reasons: [
        "Superior rapid bactericidal speed and cell-wall clearance",
        "Significant reductions in relapse and treatment failure in staphylococcal endocarditis",
        "Avoids inappropriate selective glycopeptide pressure, preserving Vancomycin"
      ]
    },
    alternativeTreatment: {
      name: "Vancomycin",
      reasonsNotPreferred: [
        "Significantly slower rate of bacterial killing (slower time to clear bacteremia)",
        "Worse clinical outcomes, with higher recurrence rates and 30-day mortality in susceptible strains",
        "Demands therapeutic drug monitoring and poses direct risks of nephrotoxicity"
      ]
    },
    decisionFactors: [
      "Penicillin susceptibility profile (MSSA vs. MRSA)",
      "Severe penicillin allergy history (anaphylaxis vs. mild rash)",
      "Renal function and monitoring capacity"
    ],
    boardPearl: "For susceptible MSSA bloodstream infections, beta-lactams (Nafcillin, Oxacillin, or Cefazolin) are superior to glycopeptides. Vancomycin is a slower-killing drug associated with higher recurrence and mortality in MSSA. It should only be selected when a severe IgE-mediated anaphylactic beta-lactam allergy is documented.",
    intro: "Methicillin-Susceptible Staphylococcus aureus (MSSA) remains a highly virulent pathogen. While Vancomycin covers MSSA, anti-staphylococcal beta-lactams are the absolute first-line choice because their faster bactericidal action yields superior survival rates.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Nafcillin / Oxacillin (Preferred Beta-Lactam)",
    rightTitle: "Vancomycin (Alternative Glycopeptide)",
    comparisonPoints: [
      {
        attribute: "Bactericidal Velocity",
        leftValue: "Extremely rapid; highly active cell-wall disruption via PBP binding",
        rightValue: "Slowly bactericidal; delayed clearance kinetics"
      },
      {
        attribute: "Efficacy in Susceptible MSSA",
        leftValue: "First-line gold standard; lower relapse rates and lower mortality",
        rightValue: "Inferior outcomes; higher risk of persistent bacteremia and relapse"
      },
      {
        attribute: "Primary Indication",
        leftValue: "Definitive therapy for confirmed MSSA infections (bloodstream, joints, bone)",
        rightValue: "Empiric MRSA coverage, confirmed MRSA, or severe penicillin anaphylaxis"
      },
      {
        attribute: "Toxicity profile",
        leftValue: "Risk of acute interstitial nephritis (AIN) or drug fever; no serum monitoring needed",
        rightValue: "Direct nephrotoxicity; mandates therapeutic trough or AUC-guided monitoring"
      }
    ],
    clinicalPearls: [
      "Cefazolin (first-generation cephalosporin) is an excellent alternative to Nafcillin/Oxacillin for MSSA bacteremia. It has a significantly better tolerability profile, lower risk of interstitial nephritis, and is dosed less frequently, though Nafcillin remains preferred for central nervous system infections.",
      "Penicillinase resistance: Nafcillin and Oxacillin contain bulky side chains that sterically hinder and resist hydrolysis by staphylococcal beta-lactamases."
    ],
    examTraps: [
      "If a clinical vignette reports that a patient's S. aureus bacteremia has returned as 'oxacillin-susceptible', look for Nafcillin, Oxacillin, or Cefazolin. Continuing Vancomycin is a classic incorrect distractor that increases failure risk."
    ],
    quiz: {
      question: "A 55-year-old female with a history of osteoarthritis is admitted with a warm, swollen, painful right knee and high fever. Joint aspiration reveals Gram-positive cocci in clusters. Blood cultures grow Staphylococcus aureus susceptible to methicillin/oxacillin. The patient has no known drug allergies. What is the most appropriate definitive antibiotic therapy?",
      options: [
        "Intravenous Vancomycin",
        "Intravenous Nafcillin",
        "Intravenous Ceftriaxone",
        "Oral Linezolid"
      ],
      correctIndex: 1,
      explanation: "This patient has MSSA septic arthritis. Nafcillin (or Oxacillin, or Cefazolin) is the definitive drug of choice. Beta-lactams are clinically superior to Vancomycin for MSSA, exhibiting more rapid bacterial clearance and lower treatment failure rates. Vancomycin should only be used if there is MRSA or severe, IgE-mediated beta-lactam anaphylaxis."
    }
  },
  {
    id: "mrsa-bacteremia-vancomycin-vs-daptomycin",
    slug: "mrsa-bacteremia-vancomycin-vs-daptomycin",
    category: "Treatment Choice",
    title: "MRSA Bacteremia: Vancomycin vs. Daptomycin",
    subtitle: "Severe Intravascular MRSA Selection and Surfactant Inactivation",
    linkedDiseases: ["bacteremia", "sepsis"],
    linkedPathogens: ["staphylococcus-aureus"],
    preferredTreatment: {
      name: "Vancomycin",
      reasons: [
        "Time-tested standard of care with extensive clinical efficacy database",
        "Significantly lower rates of treatment-emergent resistance during therapy",
        "Inexpensive and highly accessible first-line empirical choice"
      ]
    },
    alternativeTreatment: {
      name: "Daptomycin",
      reasonsNotPreferred: [
        "Reserved for Vancomycin treatment failure, high MICs (>1.5 mcg/mL), or severe renal impairment",
        "Risk of rapid emergence of resistance in deep-seated, poorly controlled infections",
        "Inactivated by pulmonary surfactant, rendering it completely useless for concurrent pneumonia"
      ]
    },
    decisionFactors: [
      "Vancomycin MIC value (failure is common if MIC is 1.5 - 2.0 mcg/mL)",
      "Concomitant pulmonary infection (pneumonia or septic pulmonary emboli)",
      "Baseline renal impairment and risk of glycopeptide AKI"
    ],
    boardPearl: "Daptomycin is highly effective for MRSA bacteremia, but it is completely inactivated by pulmonary surfactant in the alveoli. Consequently, if a patient has MRSA bacteremia with concurrent pneumonia or septic pulmonary emboli, Daptomycin is strictly contraindicated, and Vancomycin must be used.",
    intro: "For Methicillin-Resistant S. aureus (MRSA) bacteremia and right-sided endocarditis, Vancomycin is the empirical first-line therapy. Daptomycin is a rapid-killing lipopeptide alternative, but its use is restricted by its fatal vulnerability to pulmonary surfactant.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Vancomycin (Empiric Glycopeptide)",
    rightTitle: "Daptomycin (Alternative Lipopeptide)",
    comparisonPoints: [
      {
        attribute: "Mechanism of Action",
        leftValue: "Inhibits cell wall peptidoglycan synthesis by binding D-Ala-D-Ala terminals",
        rightValue: "Binds and inserts calcium-dependent lipid tail into cell membrane, causing rapid depolarization"
      },
      {
        attribute: "Action in Alveolar Space",
        leftValue: "Fully active (though lung tissue penetration is mediocre)",
        rightValue: "Completely inactivated by lung surfactant; 0% clinical activity in lungs"
      },
      {
        attribute: "Killing Kinetics",
        leftValue: "Slowly bactericidal; cell-wall active",
        rightValue: "Rapidly bactericidal; membrane active"
      },
      {
        attribute: "Major Side Effects",
        leftValue: "Nephrotoxicity, Red Man Syndrome (infusion-related histamine release)",
        rightValue: "Myopathy, rhabdomyolysis (requires weekly monitoring of creatine kinase [CK] levels)"
      }
    ],
    clinicalPearls: [
      "When S. aureus has a Vancomycin MIC of 2.0 mcg/mL (still classified as 'susceptible'), the rate of treatment failure is extremely high. Daptomycin should be initiated early in this scenario.",
      "If daptomycin resistance emerges, it is often associated with cross-resistance to host defense peptides and changes in membrane charge."
    ],
    examTraps: [
      "A classic board trap: A patient with an infected IV catheter is found to have MRSA bacteremia and multiple bilateral cavitary nodules on chest CT (septic pulmonary emboli). The question asks why Daptomycin cannot be used. The correct answer is: 'Inactivated by pulmonary surfactant'."
    ],
    quiz: {
      question: "A 48-year-old male with MRSA bacteremia from an infected central line is being treated with intravenous Vancomycin. On day 5, his blood cultures remain persistently positive for MRSA. The microbiology laboratory reports the Vancomycin MIC is 2.0 mcg/mL. A chest CT shows several bilateral cavitary nodules consistent with septic emboli. Which of the following is the most appropriate action?",
      options: [
        "Switch to Daptomycin",
        "Continue Vancomycin and increase the dose",
        "Switch to Ceftaroline",
        "Add Clindamycin to Vancomycin"
      ],
      correctIndex: 2,
      explanation: "This patient has persistent MRSA bacteremia with a high Vancomycin MIC (2.0 mcg/mL) and pulmonary involvement (septic emboli from catheter seeding). Daptomycin is usually the drug of choice for Vancomycin clinical failure, but because it is inactivated by pulmonary surfactant, it will fail to clear the pulmonary septic emboli. In this specific scenario, Ceftaroline (an anti-MRSA 5th-generation cephalosporin) is the most appropriate choice because it is active against MRSA and remains fully active in the lungs."
    }
  },
  {
    id: "cdiff-vancomycin-vs-fidaxomicin",
    slug: "cdiff-vancomycin-vs-fidaxomicin",
    category: "Treatment Choice",
    title: "C. difficile: Vancomycin vs. Fidaxomicin",
    subtitle: "Clostridioides difficile Colitis Primary Therapy and Relapse Prevention",
    linkedDiseases: ["intra-abdominal-infection"],
    linkedPathogens: ["e-coli"], // Linked to e-coli as representational gut microbiome resident
    preferredTreatment: {
      name: "Fidaxomicin",
      reasons: [
        "Extremely narrow spectrum sparing key anaerobic colonic microflora (Bacteroidetes, Firmicutes)",
        "Reduces recurrence and relapse rates by approximately 40% compared to Vancomycin",
        "Inhibits RNA polymerase and halts spore formation and toxin synthesis directly"
      ]
    },
    alternativeTreatment: {
      name: "Oral Vancomycin",
      reasonsNotPreferred: [
        "Broadly disrupts the colonic microbiome, perpetuating gut dysbiosis",
        "Associated with higher rates of infection relapse (20-25%) after course completion",
        "While highly effective at resolving the acute episode, it lacks anti-spore activity"
      ]
    },
    decisionFactors: [
      "Infection episode history (initial presentation vs. frequent recurrences)",
      "Financial accessibility and drug coverage (Fidaxomicin is highly expensive)",
      "Clinical severity (non-severe vs. fulminant/megacolon)"
    ],
    boardPearl: "Fidaxomicin is the preferred first-line agent for Clostridioides difficile infection because its narrow spectrum spares the protective bowel microbiota, resulting in a dramatic reduction in recurrence. Note that oral Vancomycin remains a standard and highly effective choice. However, oral Metronidazole is no longer recommended for first-line treatment in adults.",
    intro: "Clinical guidelines for Clostridioides difficile infection (CDI) emphasize preventing recurrences. While oral Vancomycin effectively cures acute colitis, Fidaxomicin is preferred due to its microbiome-sparing properties and anti-spore activity.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Fidaxomicin (Microbiome-Sparing / Narrow)",
    rightTitle: "Oral Vancomycin (Standard Glycopeptide)",
    comparisonPoints: [
      {
        attribute: "Mechanism of Action",
        leftValue: "Inhibits RNA polymerase (transcription blocker); bactericidal for C. diff",
        rightValue: "Inhibits cell wall peptidoglycan synthesis; bacteriostatic for C. diff"
      },
      {
        attribute: "Impact on Gut Flora",
        leftValue: "Minimal; spares protective anaerobic Bacteroidetes and Firmicutes",
        rightValue: "Severe; destroys beneficial anaerobic Gram-negatives, delaying recovery"
      },
      {
        attribute: "Recurrence Rate",
        leftValue: "Low (~10-12% recurrence rate)",
        rightValue: "Higher (~20-25% recurrence rate)"
      },
      {
        attribute: "Systemic Absorption",
        leftValue: "Minimal; stays localized in gut lumen to act at the site of infection",
        rightValue: "0% absorbed; remains completely within the gastrointestinal tract"
      }
    ],
    clinicalPearls: [
      "For fulminant CDI (characterized by hypotension, shock, ileus, or toxic megacolon), combination therapy is required: high-dose oral Vancomycin (500mg q6h) + intravenous Metronidazole (500mg q8h), plus rectal Vancomycin instillations if ileus restricts oral passage.",
      "Fidaxomicin's narrow spectrum is described as 'selective' because it has little to no activity against Gram-negative anaerobes or aerobic Gram-negatives."
    ],
    examTraps: [
      "Never select intravenous Vancomycin to treat C. difficile colitis! IV Vancomycin is not secreted into the gut lumen and will achieve zero concentration in the colon. Vancomycin must be given ORALLY (or rectally) to be effective."
    ],
    quiz: {
      question: "A 68-year-old female presents with profuse watery diarrhea and abdominal cramping 10 days after completing a course of Clindamycin for cellulitis. Stool PCR is positive for Clostridioides difficile toxin. She has no previous history of CDI. Vital signs are stable, and white blood cell count is 11,000/mcL. What is the most appropriate first-line therapy according to the latest clinical guidelines?",
      options: [
        "Oral Fidaxomicin for 10 days",
        "Intravenous Vancomycin for 10 days",
        "Oral Metronidazole for 10 days",
        "Oral Amoxicillin for 10 days"
      ],
      correctIndex: 0,
      explanation: "According to current IDSA guidelines, oral Fidaxomicin is the preferred first-line agent for initial episodes of C. difficile infection because it reduces recurrence rates compared to oral Vancomycin. Oral Vancomycin is an acceptable alternative. Oral Metronidazole is no longer recommended as first-line monotherapy for adults. Intravenous Vancomycin is completely ineffective for CDI because it does not cross the gut wall into the bowel lumen."
    }
  },
  {
    id: "esbl-carbapenem-vs-ceftriaxone",
    slug: "esbl-carbapenem-vs-ceftriaxone",
    category: "Treatment Choice",
    title: "ESBL Infection: Carbapenem vs. Ceftriaxone",
    subtitle: "Extended-Spectrum Beta-Lactamase Enterobacterales Selection",
    linkedDiseases: ["pyelonephritis", "sepsis", "bacteremia"],
    linkedPathogens: ["escherichia-coli", "k-pneumoniae"],
    preferredTreatment: {
      name: "Carbapenems (e.g., Meropenem, Ertapenem)",
      reasons: [
        "Inherent stability against hydrolysis by extended-spectrum beta-lactamase (ESBL) enzymes",
        "Consistently maintains bactericidal activity against multi-drug resistant Gram-negative rods",
        "Proven clinical superiority with reduced mortality in ESBL bloodstream infections"
      ]
    },
    alternativeTreatment: {
      name: "Ceftriaxone",
      reasonsNotPreferred: [
        "Rapidly hydrolyzed and completely inactivated by plasmid-mediated ESBL enzymes",
        "Leads to extremely high rates of treatment failure and clinical relapse",
        "Higher dosing cannot overcome resistance due to complete degradation of the drug"
      ]
    },
    decisionFactors: [
      "Presence of ESBL gene on rapid diagnostics (e.g., CTX-M gene)",
      "Severity of illness (hemodynamically stable UTI vs. septic shock)",
      "Pseudomonas coverage requirement (Meropenem covers Pseudomonas; Ertapenem does not)"
    ],
    boardPearl: "Carbapenems (Ertapenem or Meropenem) are the definitive drugs of choice for ESBL-producing Enterobacterales (E. coli, Klebsiella). ESBL enzymes degrade all penicillins, and 1st, 2nd, and 3rd-generation cephalosporins (including Ceftriaxone), making cephalosporins completely ineffective regardless of in vitro 'susceptibility' in some tests.",
    intro: "Extended-Spectrum Beta-Lactamases (ESBL) are plasmid-mediated enzymes that hydrolyze most cephalosporins. Carbapenems possess a unique stereochemical configuration that resists ESBL degradation, making them the therapeutic gold standard.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Carbapenems (ESBL-Resistant)",
    rightTitle: "Ceftriaxone (ESBL-Vulnerable)",
    comparisonPoints: [
      {
        attribute: "ESBL Enzyme Resistance",
        leftValue: "100% stable; completely resists hydrolysis",
        rightValue: "Highly vulnerable; rapidly degraded and rendered inactive"
      },
      {
        attribute: "In vitro and In vivo Correlation",
        leftValue: "Excellent correlation; reliable clinical clearance",
        rightValue: "Poor; can sometimes appear susceptible in vitro but fails catastrophically in vivo"
      },
      {
        attribute: "Bloodstream Infection Survival",
        leftValue: "Proven superior; demonstrated in the landmark MERINO trial",
        rightValue: "High failure rates and increased mortality"
      },
      {
        attribute: "Beta-Lactam Subclass",
        leftValue: "Carbapenem (unique trans-hydroxyethyl group at position 6)",
        rightValue: "Third-generation Cephalosporin"
      }
    ],
    clinicalPearls: [
      "Ertapenem is unique among carbapenems because it does NOT cover Pseudomonas aeruginosa or Acinetobacter species. It is highly valued for ESBL infections because once-daily dosing simplifies outpatient therapy while sparing pseudomonal agents.",
      "The MERINO trial showed that even Piperacillin-Tazobactam is inferior to Meropenem for definitive therapy of ESBL bacteremia, cementing carbapenems as the undisputed standard."
    ],
    examTraps: [
      "If a laboratory report shows a Gram-negative bacillus is resistant to Ceftriaxone but sensitive to Piperacillin-Tazobactam, and the patient has bacteremia, do NOT choose Piperacillin-Tazobactam. The correct answer is always a Carbapenem (e.g., Meropenem)."
    ],
    quiz: {
      question: "A 72-year-old male is admitted with fever, altered mental status, and hypotension. Urine culture grows Escherichia coli that is positive for an extended-spectrum beta-lactamase (ESBL). Blood cultures are also positive for the same organism. What is the most appropriate definitive antibiotic therapy?",
      options: [
        "Intravenous Ceftriaxone",
        "Intravenous Meropenem",
        "Intravenous Ciprofloxacin",
        "Intravenous Ampicillin"
      ],
      correctIndex: 1,
      explanation: "For severe infections (such as bacteremia or sepsis) caused by ESBL-producing Enterobacterales, Carbapenems (like Meropenem or Ertapenem) are the definitive drugs of choice. ESBL enzymes hydrolyze and inactivate all third-generation cephalosporins (Ceftriaxone) and penicillins (Ampicillin). Fluoroquinolones like Ciprofloxacin have extremely high rates of co-resistance in ESBL-producing strains and are clinically unreliable."
    }
  },
  {
    id: "pseudomonas-cefepime-vs-piperacillin-tazobactam",
    slug: "pseudomonas-cefepime-vs-piperacillin-tazobactam",
    category: "Treatment Choice",
    title: "Pseudomonas: Cefepime vs. Piperacillin-Tazobactam",
    subtitle: "Anti-Pseudomonal Agent Selection and Anaerobic Coverage Needs",
    linkedDiseases: ["hospital-acquired-pneumonia", "sepsis"],
    linkedPathogens: ["p-aeruginosa"],
    preferredTreatment: {
      name: "Cefepime",
      reasons: [
        "Strong, targeted anti-pseudomonal Gram-negative activity with zero anaerobic coverage",
        "Ideal for pulmonary infections where anaerobic coverage is unnecessary (avoids collateral gut damage)",
        "Zwitterionic structure allows rapid penetration through Gram-negative outer membrane"
      ]
    },
    alternativeTreatment: {
      name: "Piperacillin-Tazobactam",
      reasonsNotPreferred: [
        "Broad anaerobic coverage which heavily disrupts colonic microflora, increasing C. diff risk",
        "Associated with higher rates of acute kidney injury when co-administered with Vancomycin",
        "Requires frequent, lengthy infusions (q6h or extended infusion) due to shorter half-life"
      ]
    },
    decisionFactors: [
      "Anatomical compartment (lungs vs. intra-abdominal/necrotizing infections)",
      "Co-administration of nephrotoxic drugs like Vancomycin",
      "Necessity for anaerobic coverage (B. fragilis or aspiration risk)"
    ],
    boardPearl: "Both Cefepime (4th-gen cephalosporin) and Piperacillin-Tazobactam (ureidopenicillin/inhibitor) have excellent activity against Pseudomonas aeruginosa. However, Piperacillin-Tazobactam also has broad anaerobic coverage (B. fragilis), whereas Cefepime does not. For pseudomonal pneumonia, Cefepime is preferred to avoid destroying the gut anaerobes, whereas Piperacillin-Tazobactam is reserved for intra-abdominal or mixed abscess infections.",
    intro: "Choosing between anti-pseudomonal beta-lactams is an exercise in antimicrobial stewardship. While both Cefepime and Piperacillin-Tazobactam cover Pseudomonas aeruginosa, the presence or absence of anaerobic coverage governs clinical selection.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Cefepime (Targeted Anti-Pseudomonal)",
    rightTitle: "Piperacillin-Tazobactam (Broad Anaerobic/Gram-Negative)",
    comparisonPoints: [
      {
        attribute: "Pseudomonas aeruginosa Activity",
        leftValue: "Excellent; binds multiple PBPs and resists chromosomal AmpC beta-lactamases",
        rightValue: "Excellent; ureidopenicillin foundation provides strong anti-pseudomonal coverage"
      },
      {
        attribute: "Anaerobic Activity (e.g., B. fragilis)",
        leftValue: "None; completely spares gut anaerobes",
        rightValue: "Excellent; Tazobactam inhibits anaerobic beta-lactamases"
      },
      {
        attribute: "Nephrotoxicity with Vancomycin",
        leftValue: "Low; safe combination for empirical sepsis",
        rightValue: "High; synergistic risk of acute kidney injury (AKI) when combined with Vancomycin"
      },
      {
        attribute: "Zwitterionic Charge",
        leftValue: "Yes; possesses both positive and negative charges, speeding bacterial entry",
        rightValue: "No; standard negative charge"
      }
    ],
    clinicalPearls: [
      "Cefepime can cause neurotoxicity (including non-convulsive status epilepticus) in elderly patients or those with renal impairment if the dose is not adjusted. Look for altered mental status and myoclonus.",
      "Piperacillin-Tazobactam is nicknamed 'Zosyn'. Combining it with Vancomycin is a classic emergency room empiric regimen but should be de-escalated quickly due to renal concerns."
    ],
    examTraps: [
      "If a patient in the ICU on Vancomycin + Piperacillin-Tazobactam develops rising creatinine without other causes of shock, identify the antibiotic combination as the cause. Switching Pip-Tazo to Cefepime or Meropenem reduces nephrotoxicity risk."
    ],
    quiz: {
      question: "A 62-year-old male is hospitalized for ventilator-associated pneumonia (VAP). Endotracheal aspirate grows Pseudomonas aeruginosa. The patient is also receiving Vancomycin for MRSA coverage. He has baseline mild renal insufficiency. Which anti-pseudomonal agent is most appropriate to minimize renal toxicity while maintaining targeted coverage?",
      options: [
        "Intravenous Cefepime",
        "Intravenous Piperacillin-Tazobactam",
        "Intravenous Ertapenem",
        "Oral Ciprofloxacin"
      ],
      correctIndex: 0,
      explanation: "For Pseudomonas aeruginosa lung infections, Cefepime is preferred over Piperacillin-Tazobactam when combined with Vancomycin because Piperacillin-Tazobactam + Vancomycin carries a significantly higher risk of acute kidney injury (AKI). Cefepime provides excellent targeted anti-pseudomonal activity and lacks anaerobic activity, which minimizes microflora disruption. Ertapenem does NOT cover Pseudomonas. Oral Ciprofloxacin is inappropriate for severe ventilator-associated pneumonia."
    }
  },
  {
    id: "meningitis-ceftriaxone-vs-alternatives",
    slug: "meningitis-ceftriaxone-vs-alternatives",
    category: "Treatment Choice",
    title: "Meningitis: Ceftriaxone vs. Alternatives",
    subtitle: "Acute Bacterial Meningitis Empirical Selection and Neonatal Risks",
    linkedDiseases: ["acute-bacterial-meningitis"],
    linkedPathogens: ["streptococcus-pneumoniae", "n-meningitidis", "h-influenzae"],
    preferredTreatment: {
      name: "Ceftriaxone",
      reasons: [
        "Superb penetration of the blood-brain barrier, reaching highly bactericidal CSF levels",
        "Highly potent bactericidal activity against primary meningitis pathogens (S. pneumoniae, N. meningitidis)",
        "Convenient high-dose, twice-daily administration (2g IV q12h) in adult populations"
      ]
    },
    alternativeTreatment: {
      name: "Cefotaxime or Meropenem",
      reasonsNotPreferred: [
        "Cefotaxime is mandatory in neonates (<1 month) to avoid biliary sludging and kernicterus",
        "Meropenem is reserved for cephalosporin-resistant pathogens or severe beta-lactam anaphylaxis",
        "Other cephalosporins (like Ceftazidime) either lack pneumococcal coverage or fail to cross the blood-brain barrier"
      ]
    },
    decisionFactors: [
      "Patient age (neonates <1 month vs. infants/adults)",
      "Risk of drug-induced hyperbilirubinemia",
      "Presence of penicillin-resistant Streptococcus pneumoniae"
    ],
    boardPearl: "Ceftriaxone is the gold standard for adult bacterial meningitis due to excellent CSF levels and bactericidal coverage. However, Ceftriaxone is strictly contraindicated in neonates (<1 month) because it displaces bilirubin from albumin, causing kernicterus, and can precipitate with calcium in neonatal lungs and kidneys. Cefotaxime is used instead.",
    intro: "Meningitis demands rapid, high-dose bactericidal therapy. Ceftriaxone is the standard of care for adults and children older than 1 month, but alternative cephalosporins are mandatory for neonates due to unique metabolic toxicities.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Ceftriaxone (Adult Gold Standard)",
    rightTitle: "Cefotaxime / Alternatives (Neonate Preferred)",
    comparisonPoints: [
      {
        attribute: "Blood-Brain Barrier Penetration",
        leftValue: "Excellent; achieves high therapeutic CSF levels in inflamed meninges",
        rightValue: "Cefotaxime is equally excellent; Meropenem is excellent; Ceftazidime has good entry but poor pneumococcal activity"
      },
      {
        attribute: "Neonatal Hyperbilirubinemia Risk",
        leftValue: "High; displaces bilirubin from albumin, causing bilirubin encephalopathy (kernicterus)",
        rightValue: "None; does not displace bilirubin, completely safe for newborns"
      },
      {
        attribute: "Biliary Sludging",
        leftValue: "Risk of precipitating in bile (ceftriaxone-calcium salts); causes 'pseudocholelithiasis'",
        rightValue: "None; metabolized and cleared without biliary precipitation"
      },
      {
        attribute: "Meningitis Dosing",
        leftValue: "2g IV every 12 hours (doubled from standard systemic dosing to maximize CNS entry)",
        rightValue: "Cefotaxime 2g IV every 4-6 hours (requires more frequent dosing due to shorter half-life)"
      }
    ],
    clinicalPearls: [
      "To cover penicillin-resistant S. pneumoniae, always add high-dose Vancomycin to Ceftriaxone/Cefotaxime empirically.",
      "Add Ampicillin to the empiric regimen for patients <1 month or >50 years (or those who are immunocompromised) to cover Listeria monocytogenes, which is intrinsically resistant to cephalosporins."
    ],
    examTraps: [
      "If a board question asks for empiric treatment of meningitis in a 2-week-old neonate, do NOT select Ceftriaxone. Look for Cefotaxime + Ampicillin + Gentamicin. Ceftriaxone is highly toxic to newborns."
    ],
    quiz: {
      question: "A 2-week-old neonate is brought to the emergency department with lethargy, poor feeding, and a bulging fontanelle. Lumbar puncture is performed, and CSF Gram stain reveals Gram-negative rods. What is the most appropriate empirical antibiotic regimen?",
      options: [
        "Intravenous Ceftriaxone + Ampicillin",
        "Intravenous Cefotaxime + Ampicillin + Gentamicin",
        "Intravenous Vancomycin + Ceftriaxone",
        "Oral Amoxicillin + Azithromycin"
      ],
      correctIndex: 1,
      explanation: "In neonates (<1 month), Ceftriaxone is strictly contraindicated due to the risk of displacing bilirubin from albumin, which can cause kernicterus (bilirubin-induced brain damage), and biliary sludge. Cefotaxime is used instead. For empiric neonatal coverage, Cefotaxime (covers GBS, E. coli) + Ampicillin (specifically for Listeria monocytogenes) + Gentamicin (synergy/Gram-negative) is the standard of care."
    }
  },
  {
    id: "candidemia-echinocandin-vs-fluconazole",
    slug: "candidemia-echinocandin-vs-fluconazole",
    category: "Treatment Choice",
    title: "Candidemia: Echinocandin vs. Fluconazole",
    subtitle: "Systemic Candida Bloodstream Infection First-Line Choice",
    linkedDiseases: ["sepsis", "bacteremia"],
    linkedPathogens: ["candida-albicans"],
    preferredTreatment: {
      name: "Echinocandins",
      reasons: [
        "Rapidly fungicidal activity against a broad spectrum of Candida species",
        "Excellent efficacy against azole-resistant strains (such as C. glabrata and C. krusei)",
        "Proven clinical superiority with reduced mortality rates in randomized trials"
      ]
    },
    alternativeTreatment: {
      name: "Fluconazole",
      reasonsNotPreferred: [
        "Fungistatic mechanism only (inhibits growth but does not actively kill yeasts)",
        "Zero activity against Candida krusei (intrinsically resistant) and variable against C. glabrata",
        "High risk of therapeutic failure if used empirically prior to species identification"
      ]
    },
    decisionFactors: [
      "Hemodynamic stability and immunosuppression level",
      "Candida species identification (C. albicans vs. non-albicans)",
      "Prior exposure to triazole prophylaxis"
    ],
    boardPearl: "Echinocandins (e.g., Caspofungin, Micafungin, Anidulafungin) are the first-line empiric choice for all patients with candidemia. Fluconazole is reserved strictly for de-escalation step-down therapy once the patient is hemodynamically stable, blood cultures have cleared, and the species is confirmed as azole-susceptible.",
    intro: "Systemic fungemia carries high mortality. Empiric therapy requires rapid fungicidal action. Echinocandins target the fungal cell wall (1,3-beta-D-glucan synthase) to achieve yeast lysis, whereas Fluconazole is a fungistatic membrane inhibitor reserved for stable step-down.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Echinocandins (Preferred Fungicidal)",
    rightTitle: "Fluconazole (Alternative Fungistatic)",
    comparisonPoints: [
      {
        attribute: "Antifungal Activity",
        leftValue: "Fungicidal (lyses yeast cells rapidly by destroying cell wall)",
        rightValue: "Fungistatic (slows growth by inhibiting ergosterol membrane synthesis)"
      },
      {
        attribute: "Mechanism / Target",
        leftValue: "Inhibits 1,3-beta-D-glucan synthase, halting cell wall construction",
        rightValue: "Inhibits lanosterol 14-alpha-demethylase, blocking cell membrane assembly"
      },
      {
        attribute: "Resistant Species Coverage",
        leftValue: "Superb; active against C. glabrata and C. krusei",
        rightValue: "Poor; C. krusei is intrinsically resistant; C. glabrata has high rates of resistance"
      },
      {
        attribute: "Guideline Status",
        leftValue: "Universal first-line empiric therapy for candidemia/bloodstream yeast infections",
        rightValue: "De-escalation only; highly inappropriate for initial empiric therapy"
      }
    ],
    clinicalPearls: [
      "Unlike azoles, Echinocandins have extremely poor penetration into the central nervous system, eyes, and urinary tract. They are completely ineffective and contraindicated for fungal meningitis, endophthalmitis, or urinary tract infections.",
      "Candidemia is a key indicator to perform a dilated eye exam to rule out ocular candidiasis, which requires systemic lipophilic azoles or amphotericin b due to poor echinocandin eye levels."
    ],
    examTraps: [
      "If a patient has Candida albicans isolated from their urine (candiduria), do NOT select an echinocandin. Echinocandins do not achieve therapeutic levels in urine. Fluconazole is the drug of choice for urinary tract candidiasis."
    ],
    quiz: {
      question: "A 64-year-old female in the intensive care unit on total parenteral nutrition (TPN) develops a new fever. Blood cultures grow yeast, which is subsequently identified as Candida. She is hemodynamically stable. What is the most appropriate initial therapy?",
      options: [
        "Intravenous Caspofungin",
        "Oral Fluconazole",
        "Intravenous Amphotericin B",
        "Oral Voriconazole"
      ],
      correctIndex: 0,
      explanation: "For all patients with candidemia (yeast in the blood), an Echinocandin (such as Caspofungin, Micafungin, or Anidulafungin) is the preferred first-line empiric therapy. Echinocandins are rapidly fungicidal and yield superior survival rates compared to Fluconazole. Once the patient is clinically stable and species susceptibility is confirmed (e.g., susceptible Candida albicans), therapy can be safely de-escalated to Fluconazole."
    }
  },
  {
    id: "aspergillosis-voriconazole-vs-amphotericin",
    slug: "aspergillosis-voriconazole-vs-amphotericin",
    category: "Treatment Choice",
    title: "Aspergillosis: Voriconazole vs. Amphotericin B",
    subtitle: "Invasive Pulmonary Aspergillosis Therapy Selection",
    linkedDiseases: ["community-acquired-pneumonia"],
    linkedPathogens: ["aspergillus-fumigatus"],
    preferredTreatment: {
      name: "Voriconazole",
      reasons: [
        "Demonstrated superior survival and clinical response rates in large randomized trials",
        "Outstanding pulmonary tissue penetration and alveolar concentration",
        "Significantly lower risk of severe, irreversible nephrotoxicity"
      ]
    },
    alternativeTreatment: {
      name: "Amphotericin B",
      reasonsNotPreferred: [
        "Associated with higher mortality and worse treatment outcomes in comparative trials",
        "Severe, dose-limiting acute kidney injury and renal arteriole constriction",
        "Inconvenient intravenous administration with high rates of infusion-related toxicity"
      ]
    },
    decisionFactors: [
      "Renal function and drug-drug interactions (Voriconazole is a major CYP inhibitor)",
      "Central nervous system involvement (Voriconazole crosses BBB excellently)",
      "Availability of Voriconazole therapeutic drug monitoring (TDM)"
    ],
    boardPearl: "Voriconazole is the undisputed first-line therapy for invasive pulmonary aspergillosis, showing superior survival and lower renal toxicity than Amphotericin B. Classic side effects of Voriconazole include transient visual disturbances (hallucinations, flashing lights, color distortion), phototoxicity, and elevated liver function tests (LFTs).",
    intro: "Invasive pulmonary aspergillosis primarily affects severely immunocompromised hosts (such as neutropenic leukemia patients). Voriconazole is the gold standard therapy, having displaced Amphotericin B due to superior survival and a far safer renal profile.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Voriconazole (Preferred Azole)",
    rightTitle: "Amphotericin B (Alternative Polyene)",
    comparisonPoints: [
      {
        attribute: "Clinical Efficacy",
        leftValue: "Superior survival; lower rates of treatment failure",
        rightValue: "Worse clinical response and lower overall survival"
      },
      {
        attribute: "Nephrotoxicity Risk",
        leftValue: "Minimal; does not cause renal tubular damage or vasoconstriction",
        rightValue: "High; causes direct tubular damage and severe arteriole constriction"
      },
      {
        attribute: "Classic Side Effects",
        leftValue: "Visual disturbances (flashing lights, color changes), phototoxic skin rash, fluorosis",
        rightValue: "Infusion-related fever/chills ('shake and bake'), hypokalemia, renal failure"
      },
      {
        attribute: "Bioavailability",
        leftValue: "Excellent PO and IV bioavailability (~96%); easily transitioned to oral outpatient care",
        rightValue: "Poor PO; must be administered intravenously (requires saline loading to protect kidneys)"
      }
    ],
    clinicalPearls: [
      "Voriconazole is metabolized by CYP2C19, CYP2C9, and CYP3A4. Due to genetic polymorphisms (rapid vs. slow metabolizers) and drug interactions, therapeutic drug monitoring (TDM) of trough levels is highly recommended to prevent neurologic toxicity (visual hallucinations/myoclonus) or treatment failure.",
      "On chest CT, invasive aspergillosis classically presents as a nodule with a surrounding ground-glass opacity, known as the 'halo sign', representing focal hemorrhage."
    ],
    examTraps: [
      "If a neutropenic clinical vignette describes a patient with a pulmonary 'halo sign' who develops transient flashing lights or altered color perception shortly after starting an antifungal, identify the drug as Voriconazole. These side effects are classic and transient."
    ],
    quiz: {
      question: "A 45-year-old male undergoing chemotherapy for acute myeloid leukemia (AML) develops severe neutropenia and a high fever. A chest CT scan reveals a nodular lesion with surrounding ground-glass attenuation ('halo sign') in the right upper lobe. Galactomannan assay is positive. What is the most appropriate first-line treatment?",
      options: [
        "Intravenous Voriconazole",
        "Intravenous Liposomal Amphotericin B",
        "Oral Fluconazole",
        "Intravenous Caspofungin"
      ],
      correctIndex: 0,
      explanation: "This patient is presenting with invasive pulmonary aspergillosis (classic 'halo sign' on CT in a neutropenic host, positive galactomannan). Voriconazole is the gold standard first-line treatment, having shown superior clinical response and survival rates compared to Amphotericin B. Fluconazole has absolutely no activity against Aspergillus species. Echinocandins like Caspofungin are only used as salvage/second-line therapy."
    }
  },
  {
    id: "hsv-valacyclovir-vs-acyclovir",
    slug: "hsv-valacyclovir-vs-acyclovir",
    category: "Treatment Choice",
    title: "HSV: Valacyclovir vs. Acyclovir",
    subtitle: "Oral Antiviral Bioavailability and Patient Adherence Optimization",
    linkedDiseases: ["acute-bacterial-meningitis"], // representational viral CNS involvement
    linkedPathogens: ["hsv-1", "hsv-2", "vzv"],
    preferredTreatment: {
      name: "Valacyclovir",
      reasons: [
        "Significantly superior oral bioavailability (~55% compared to only ~15-20% for Acyclovir)",
        "Much simpler dosing schedules (e.g., BID or daily vs. 5 times daily for oral Acyclovir)",
        "Achieves serum levels equivalent to intravenous Acyclovir, ensuring reliable suppression"
      ]
    },
    alternativeTreatment: {
      name: "Oral Acyclovir",
      reasonsNotPreferred: [
        "Extremely poor gastrointestinal absorption, resulting in low systemic bioavailability",
        "Requires taking pills 5 times daily for active shingles or herpes outbreaks",
        "High pill burden leads to poor patient compliance and higher rates of treatment failure"
      ]
    },
    decisionFactors: [
      "Oral vs. intravenous administration necessity (severe encephalitis requires IV)",
      "Patient compliance capacity and pill burden tolerance",
      "Renal function dosing adjustments (avoiding crystal nephropathy)"
    ],
    boardPearl: "Valacyclovir is an L-valyl ester prodrug of Acyclovir. By attaching an L-valine amino acid, it utilizes active intestinal peptide transporters to achieve 3 to 5 times higher oral bioavailability than Acyclovir itself, converting a highly inconvenient 5-times-daily oral Acyclovir regimen into a simple twice-daily Valacyclovir regimen.",
    intro: "Oral antiviral therapy for Herpes Simplex Virus (HSV) and Varicella Zoster Virus (VZV) requires sustained blood levels. Valacyclovir is an oral prodrug that dramatically improves pharmacokinetics, optimizing patient adherence and clinical efficacy.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Valacyclovir (Preferred Oral Prodrug)",
    rightTitle: "Oral Acyclovir (Alternative Antiviral)",
    comparisonPoints: [
      {
        attribute: "Oral Bioavailability",
        leftValue: "Excellent (~55%); rapidly converted to active acyclovir in first-pass hepatic metabolism",
        rightValue: "Poor (~15-20%); remains mostly unabsorbed in the intestinal tract"
      },
      {
        attribute: "Dosing for Active Shingles",
        leftValue: "1g twice daily (highly convenient and simple)",
        rightValue: "800mg five times daily (highly inconvenient pill burden)"
      },
      {
        attribute: "Mechanism of Action",
        leftValue: "Prodrug; cleaved by esterases, then phosphorylated by viral thymidine kinase to inhibit viral DNA polymerase",
        rightValue: "Directly phosphorylated by viral thymidine kinase, then fully triphosphorylated to inhibit viral DNA polymerase"
      },
      {
        attribute: "Indication boundaries",
        leftValue: "First-line oral choice for shingles, genital herpes outbreaks, and chronic suppression",
        rightValue: "Inexpensive alternative but poor absorption makes it inappropriate for severe outbreaks"
      }
    ],
    clinicalPearls: [
      "For severe, life-threatening herpes infections (such as HSV encephalitis or neonatal herpes), oral therapy is insufficient. High-dose IV Acyclovir is mandatory.",
      "Ensure aggressive intravenous hydration is provided during IV Acyclovir administration to prevent acyclovir crystal precipitation in renal tubules, which causes acute renal injury (crystal nephropathy)."
    ],
    examTraps: [
      "Do not choose Valacyclovir for IV therapy. Valacyclovir is only manufactured as an oral formulation. If a patient presents with HSV encephalitis (characterized by temporal lobe hemorrhages, seizures, CSF lymphocytic pleocytosis), they need intravenous ACYCLOVIR."
    ],
    quiz: {
      question: "A 62-year-old female presents with a painful, unilateral vesicular rash in a dermatomal distribution on her left flank, consistent with Herpes Zoster (shingles). She is within 48 hours of rash onset. What is the most appropriate oral antiviral therapy to reduce pain and duration of the illness?",
      options: [
        "Oral Valacyclovir twice daily",
        "Oral Acyclovir five times daily",
        "Intravenous Acyclovir every 8 hours",
        "Oral Famciclovir once weekly"
      ],
      correctIndex: 0,
      explanation: "Oral Valacyclovir is preferred over oral Acyclovir for shingles because of its superior bioavailability and simpler twice-daily dosing, which significantly improves patient adherence. Oral Acyclovir requires an inconvenient 5-times-daily dosing schedule. Intravenous Acyclovir is reserved for disseminated or ophthalmic zoster or immunocompromised hosts. Famciclovir is dosed three times daily, not once weekly."
    }
  },
  {
    id: "influenza-oseltamivir-vs-supportive",
    slug: "influenza-oseltamivir-vs-supportive",
    category: "Treatment Choice",
    title: "Influenza: Oseltamivir vs. Supportive Care",
    subtitle: "Acute Influenza Antiviral Therapy Selection and High-Risk Criteria",
    linkedDiseases: ["community-acquired-pneumonia"],
    linkedPathogens: ["influenza-a"],
    preferredTreatment: {
      name: "Oseltamivir",
      reasons: [
        "Inhibits viral neuraminidase, preventing the release of newly replicated virions from host cells",
        "Shortens symptom duration by 1 to 1.5 days when initiated within 48 hours of onset",
        "Significantly reduces secondary complications (such as bacterial pneumonia and hospitalizations) in high-risk groups"
      ]
    },
    alternativeTreatment: {
      name: "Supportive Care Only",
      reasonsNotPreferred: [
        "Does not target or halt the viral replication cycle directly",
        "Does not shorten the window of viral shedding or transmissibility",
        "Appropriate only for low-risk, healthy individuals presenting more than 48 hours after symptom onset"
      ]
    },
    decisionFactors: [
      "Timing of symptom onset (within 48 hours vs. later)",
      "High-risk criteria (age >65, chronic cardiopulmonary disease, pregnancy, immunosuppression)",
      "Disease severity (outpatient vs. inpatient admission for influenza)"
    ],
    boardPearl: "Oseltamivir is a neuraminidase inhibitor that prevents sialic acid cleavage, trapping newly synthesized influenza virions inside the host cell to halt viral spread. It is most effective when started within 48 hours of symptom onset. However, for hospitalized or high-risk patients, Oseltamivir should be initiated even if they present more than 48 hours after onset.",
    intro: "Managing acute Influenza involves deciding between targeted antiviral therapy and supportive care. Oseltamivir prevents viral release, offering clinical benefits particularly when initiated early or in patients at risk for severe complications.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Oseltamivir (Neuraminidase Inhibitor)",
    rightTitle: "Supportive Care (Symptomatic Therapy)",
    comparisonPoints: [
      {
        attribute: "Mechanism of Action",
        leftValue: "Neuraminidase inhibitor (blocks cleavage of sialic acid, trapping virions on host membrane)",
        rightValue: "No antiviral effect; focuses on comfort, hydration, and fever control"
      },
      {
        attribute: "Window of Benefit",
        leftValue: "Highest efficacy within 48 hours of onset; can be given later in severe/inpatient cases",
        rightValue: "Equally effective at any time during the illness for comfort"
      },
      {
        attribute: "Secondary Complications",
        leftValue: "Reduces risk of secondary bacterial pneumonia, otitis media, and hospitalization",
        rightValue: "No reduction in secondary bacterial complications"
      },
      {
        attribute: "Key Adverse Effects",
        leftValue: "Nausea, vomiting (mitigated by taking with food), rare neuropsychiatric events",
        rightValue: "None (extremely safe and standard)"
      }
    ],
    clinicalPearls: [
      "Do not use Aspirin for fever in pediatric influenza patients to avoid Reye's Syndrome (characterized by acute encephalopathy, cerebral edema, and fatty liver infiltration). Use Acetaminophen or Ibuprofen instead.",
      "The classic secondary bacterial pneumonia following influenza is caused by Staphylococcus aureus (especially MRSA) or Streptococcus pneumoniae, and presents as 'double sickening' (worsening fever/cough after initial flu recovery)."
    ],
    examTraps: [
      "If a 75-year-old COPD patient presents with influenza symptoms of 3 days duration, the correct answer is still to start Oseltamivir. Although the '48-hour rule' is standard for healthy outpatients, high-risk patients and hospitalized patients benefit from treatment even beyond the 48-hour window."
    ],
    quiz: {
      question: "A 74-year-old male with a history of severe emphysema presents with fever, dry cough, and myalgias. He tested positive for Influenza A. His symptoms began 3 days (72 hours) ago. He is hemodynamically stable. What is the most appropriate management?",
      options: [
        "Oral Oseltamivir",
        "Supportive care with fluids and rest only",
        "Intravenous Ceftriaxone",
        "Oral Amoxicillin"
      ],
      correctIndex: 0,
      explanation: "For healthy outpatients with uncomplicated influenza, Oseltamivir is only recommended if started within 48 hours of symptom onset. However, in high-risk patients (defined as age >65, chronic pulmonary disease like emphysema, or pregnant patients), antivirals are indicated regardless of the duration of symptoms. Therefore, starting Oseltamivir is correct. Antibiotics like Ceftriaxone or Amoxicillin do not treat viral influenza."
    }
  },
  {
    id: "malaria-artemisinin-vs-chloroquine",
    slug: "malaria-artemisinin-vs-chloroquine",
    category: "Treatment Choice",
    title: "Malaria: Artemisinin-Based Therapy vs. Chloroquine",
    subtitle: "Plasmodium falciparum Treatment Selection and Resistance Mechanisms",
    linkedDiseases: ["sepsis"],
    linkedPathogens: ["plasmodium-falciparum", "plasmodium-vivax"],
    preferredTreatment: {
      name: "Artemisinin-Based Combination Therapy (ACT)",
      reasons: [
        "Outstanding efficacy against multi-drug resistant Plasmodium falciparum strains globally",
        "Extremely rapid clearance of blood-stage parasites within hours of administration",
        "Combination format (with lumefantrine) prevents the selection of single-agent resistance"
      ]
    },
    alternativeTreatment: {
      name: "Chloroquine",
      reasonsNotPreferred: [
        "Widespread global resistance due to pfcrt gene mutations in P. falciparum",
        "Should only be used in specific geographic areas known to have chloroquine-sensitive strains",
        "Ineffective for empiric therapy in travelers returning from Sub-Saharan Africa or Southeast Asia"
      ]
    },
    decisionFactors: [
      "Geographic origin of the malaria infection (resistance profiles)",
      "Species of Plasmodium (falciparum vs. vivax/ovale)",
      "Disease severity (oral combination therapy vs. emergency IV Artesunate)"
    ],
    boardPearl: "Artemisinin-based combination therapies (ACTs), such as Artemether-Lumefantrine, are the global first-line standard for uncomplicated P. falciparum malaria. Chloroquine resistance is mediated by mutations in the PfCRT transporter, which effluxes chloroquine out of the parasite's acidic food vacuole, rendering it ineffective in almost all endemic regions.",
    intro: "Malaria treatment is guided by geography and resistance. Artemisinin-based combination therapy (ACT) is the preferred standard due to widespread chloroquine resistance, which is caused by a mutant vacuolar transporter in the parasite.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Artemisinin Combinations (ACT - Preferred)",
    rightTitle: "Chloroquine (Alternative/Sensitive Areas)",
    comparisonPoints: [
      {
        attribute: "Resistance Profile",
        leftValue: "Highly effective; active against chloroquine-resistant Plasmodium falciparum",
        rightValue: "Widespread resistance globally; limited to Central America and parts of the Middle East"
      },
      {
        attribute: "Mechanism of Action",
        leftValue: "Produces toxic free radicals in parasite vacuole after binding iron/heme",
        rightValue: "Blocks heme polymerase, causing toxic heme/hemozoin accumulation to kill parasite"
      },
      {
        attribute: "Speed of Clearance",
        leftValue: "Extremely rapid; clears blood-stage parasites within 24-48 hours",
        rightValue: "Rapid in sensitive strains but completely ineffective in resistant strains"
      },
      {
        attribute: "Indications",
        leftValue: "First-line for all uncomplicated P. falciparum infections globally",
        rightValue: "Reserved for chloroquine-sensitive P. falciparum, P. vivax, or P. ovale"
      }
    ],
    clinicalPearls: [
      "For Plasmodium vivax and Plasmodium ovale, chloroquine is still highly effective, but you must add Primaquine or Tafenoquine to eradicate the dormant liver stages (hypnozoites) and prevent late clinical relapse. Check for G6PD deficiency first!",
      "Artemisinins are derived from the sweet wormwood plant (Artemisia annua) and represent one of the most significant breakthroughs in modern tropical medicine."
    ],
    examTraps: [
      "Always screen patients for Glucose-6-Phosphate Dehydrogenase (G6PD) deficiency before administering Primaquine! In G6PD-deficient individuals, Primaquine triggers severe, acute intravascular hemolytic anemia."
    ],
    quiz: {
      question: "A 24-year-old male returned 1 week ago from a backpacking trip in Kenya. He presents with cyclical fevers, chills, and headache. Blood smear shows ring-stage trophozoites inside red blood cells, confirming Plasmodium falciparum malaria. He is alert and hemodynamically stable. What is the most appropriate first-line treatment?",
      options: [
        "Oral Artemether-Lumefantrine",
        "Oral Chloroquine",
        "Intravenous Quinidine",
        "Oral Primaquine monotherapy"
      ],
      correctIndex: 0,
      explanation: "This traveler has uncomplicated Plasmodium falciparum malaria contracted in Kenya (a highly chloroquine-resistant region). Artemisinin-based combination therapy (ACT), such as oral Artemether-Lumefantrine, is the global first-line standard of care. Chloroquine would fail due to widespread resistance. Intravenous therapy (such as IV Artesunate) is reserved for severe malaria, which is not present here since he is stable. Primaquine targets liver stages and is not used as monotherapy for active blood-stage P. falciparum."
    }
  },
  {
    id: "hepc-daas-vs-interferon",
    slug: "hepc-daas-vs-interferon",
    category: "Treatment Choice",
    title: "Hepatitis C: Modern DAAs vs. Older Therapy",
    subtitle: "Direct-Acting Antiviral (DAA) Regimen Selection and Obsolete Immunomodulators",
    linkedDiseases: ["sepsis"], // Representational systemic viral involvement
    linkedPathogens: ["hepc"],
    preferredTreatment: {
      name: "Direct-Acting Antivirals (DAAs)",
      reasons: [
        "Outstanding cure rates exceeding 95-98% across all major genotypes (Sustained Virologic Response, SVR)",
        "Short, convenient oral courses (typically 8 to 12 weeks of once-daily single tablets)",
        "Exceptional tolerability with minimal side effects compared to historic immunomodulators"
      ]
    },
    alternativeTreatment: {
      name: "Pegylated Interferon-Alpha + Ribavirin",
      reasonsNotPreferred: [
        "Extremely poor cure rates (~40-50%) requiring long, grueling treatment courses (24 to 48 weeks)",
        "Severe, highly toxic side effects including profound depression, suicidal ideation, and cytopenias",
        "Complex subcutaneous injection regimens combined with multiple daily oral pills"
      ]
    },
    decisionFactors: [
      "HCV Genotype (though many modern DAAs are pangenotypic)",
      "Presence of decompensated liver cirrhosis",
      "Drug-drug interaction profiles with other home medications"
    ],
    boardPearl: "Modern Hepatitis C therapy utilizes Direct-Acting Antivirals (DAAs) targeting specific viral proteins (NS3/4A protease inhibitors ending in '-previr', NS5A inhibitors ending in '-asvir', and NS5B polymerase inhibitors ending in '-buvir'). They achieve >95% cure (SVR) and have completely replaced the highly toxic Interferon/Ribavirin regimens.",
    intro: "Hepatitis C virus (HCV) treatment underwent a historic revolution. The highly toxic, low-efficacy Pegylated Interferon-alpha and Ribavirin regimens have been completely replaced by modern Direct-Acting Antivirals (DAAs) that directly inhibit viral proteins, yielding a virtual cure for HCV.",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-100",
    leftTitle: "Direct-Acting Antivirals (DAAs - Preferred)",
    rightTitle: "Pegylated Interferon + Ribavirin (Historic)",
    comparisonPoints: [
      {
        attribute: "Cure Rate (SVR12)",
        leftValue: "95% to 98% cure (Sustained Virologic Response at 12 weeks); highly reliable",
        rightValue: "Only 40% to 50% cure; frequent treatment failures and relapse"
      },
      {
        attribute: "Treatment Duration",
        leftValue: "8 to 12 weeks of simple once-daily oral tablets",
        rightValue: "24 to 48 weeks of complex combinations"
      },
      {
        attribute: "Target / Mechanism",
        leftValue: "Direct viral protein inhibition (NS3/4A, NS5A, NS5B inhibitors)",
        rightValue: "Non-specific host immune stimulation (Interferon) and mutagenic nucleotide analog (Ribavirin)"
      },
      {
        attribute: "Severe Toxicities",
        leftValue: "Extremely low; very well tolerated (mild headache or fatigue)",
        rightValue: "Severe; causes profound depression, suicidal ideation, hemolytic anemia, and neutropenia"
      }
    ],
    clinicalPearls: [
      "Sustained Virologic Response (SVR12) is defined as undetectable HCV RNA in the blood 12 weeks after completing treatment, which equates to a clinical cure.",
      "Ribavirin is highly teratogenic and requires two forms of contraception for both female and male patients during and for 6 months after therapy due to accumulation in erythrocytes."
    ],
    examTraps: [
      "On the boards, identify DAA drug classes by their suffixes: '-previr' for Protease inhibitors (NS3/4A), '-asvir' for NS5A replication complex inhibitors, and '-buvir' for NS5B RNA-dependent RNA polymerase inhibitors (e.g., Sofosbuvir). Remember: P for Protease, A for NS5A, B for NS5B."
    ],
    quiz: {
      question: "A 48-year-old female is diagnosed with chronic Hepatitis C virus (HCV) infection, Genotype 1a. She has no evidence of liver cirrhosis. What is the most appropriate first-line treatment according to modern clinical guidelines?",
      options: [
        "A 12-week oral course of a pangenotypic Direct-Acting Antiviral (DAA) regimen",
        "A 48-week course of subcutaneous Pegylated Interferon-Alpha and oral Ribavirin",
        "Long-term oral Lamivudine monotherapy",
        "Symptomatic supportive care and annual liver biopsies"
      ],
      correctIndex: 0,
      explanation: "Modern first-line therapy for chronic Hepatitis C is a short, highly effective (8-12 weeks) oral regimen of Direct-Acting Antivirals (DAAs), such as Sofosbuvir/Velpatasvir or Glecaprevir/Pibrentasvir. This achieves a cure rate (SVR) of >95% with excellent tolerability. Pegylated Interferon and Ribavirin are obsolete due to low efficacy (~50% cure) and severe toxicity (depression, anemia). Lamivudine treats HBV and HIV, not HCV."
    }
  }
];
