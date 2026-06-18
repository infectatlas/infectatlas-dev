export interface DrugPathogenRelation {
  id: string;
  name: string;
  relation: "Primary Target" | "Spectrum Cover" | "Resistance Risk" | "Alternative Target";
}

export interface DrugDiseaseRelation {
  id: string;
  name: string;
  relation: "First-Line Treatment" | "Empirical Choice" | "Alternative Option" | "Prophylaxis Only";
}

export interface Drug {
  id: string;
  name: string;
  slug: string;
  category?: "antibacterial" | "antiviral" | "antifungal" | "antiparasitic";
  drugClass: string;
  mechanismOfAction: string;
  spectrumOfActivity: string[];
  commonIndications: string[];
  adverseEffects: string[];
  contraindications: string[];
  monitoringConsiderations: string[];
  clinicalPearls: string[];
  relatedPathogens: DrugPathogenRelation[];
  relatedDiseases: DrugDiseaseRelation[];
}

export const drugsData: Drug[] = [
  {
    id: "vancomycin",
    name: "Vancomycin",
    slug: "vancomycin",
    drugClass: "Glycopeptide",
    mechanismOfAction: "Sterically inhibits bacterial cell wall synthesis by directly binding to the D-alanyl-D-alanine (D-Ala-D-Ala) terminus of peptidoglycan cell wall precursor units, preventing transglycosylase and transpeptidase cross-linking.",
    spectrumOfActivity: [
      "Strictly Gram-positive bacteria, including multidrug-resistant isolates.",
      "Methicillin-Resistant Staphylococcus aureus (MRSA).",
      "Methicillin-Resistant Staphylococcus epidermidis (MRSE).",
      "Penicillin-resistant Streptococcus pneumoniae.",
      "Clostridioides difficile (colonic lumen coverage only when given orally)."
    ],
    commonIndications: [
      "Empiric and definitive therapy for serious MRSA infections (sepsis, endocarditis, osteomyelitis, pneumonia).",
      "Penicillin-allergic patients with severe Gram-positive infections.",
      "First-line oral therapy for Clostridioides difficile-associated pseudomembranous colitis."
    ],
    adverseEffects: [
      "Infusion reaction (formerly 'Red Man Syndrome'): Histamine-mediated flushing, pruritus, and hypotension from rapid IV infusion rates.",
      "Nephrotoxicity: Increased risk when paired with Piperacillin-Tazobactam or in patients with pre-existing renal dysfunction.",
      "Ototoxicity: Typically reversible; risk increases with prolonged supertherapeutic serum concentrations or co-administration of aminoglycosides.",
      "Drug Reaction with Eosinophilia and Systemic Symptoms (DRESS Syndrome).",
      "Neutropenia or thrombocytopenia on prolonged therapy (>2 weeks)."
    ],
    contraindications: [
      "History of severe vancomycin-induced hypersensitivity or anaphylaxis.",
      "Avoid rapid IV push or infusion rates faster than 10-15 mg/min (infuse over at least 60 minutes) to prevent severe infusion reactions."
    ],
    monitoringConsiderations: [
      "Therapeutic Drug Monitoring (TDM): Target Area Under the Curve to Minimum Inhibitory Concentration ratio (AUC/MIC) of 400-600, or trough level monitoring in selected populations.",
      "Renal Function: Serum creatinine and BUN at baseline and periodically (e.g., 2-3 times/week).",
      "Complete Blood Count (CBC): Weekly for patients on prolonged courses to screen for bone marrow suppression."
    ],
    clinicalPearls: [
      "Oral Vancomycin is NOT absorbed systemically from the gastrointestinal tract. To treat systemic infections, it must be given intravenously. Conversely, IV Vancomycin is not actively excreted into the gut and is entirely ineffective for C. difficile; oral dosing is strictly required for colitis.",
      "Vancomycin-resistant Enterococcus (VRE) occurs via modification of the peptidoglycan precursor from D-Ala-D-Ala to D-Ala-D-Lac or D-Ala-D-Ser, preventing Vancomycin binding."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MRSA)", relation: "Primary Target" },
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae", relation: "Spectrum Cover" },
      { id: "c-difficile", name: "Clostridioides difficile", relation: "Primary Target" },
      { id: "e-faecalis", name: "Enterococcus faecalis", relation: "Alternative Target" }
    ],
    relatedDiseases: [
      { id: "pseudomembranous-colitis", name: "C. diff Pseudomembranous Colitis", relation: "First-Line Treatment" },
      { id: "infective-endocarditis", name: "Infective Endocarditis", relation: "Empirical Choice" },
      { id: "osteomyelitis", name: "Osteomyelitis", relation: "Empirical Choice" },
      { id: "community-acquired-pneumonia", name: "Community-Acquired Pneumonia (CAP)", relation: "Alternative Option" }
    ]
  },
  {
    id: "linezolid",
    name: "Linezolid",
    slug: "linezolid",
    drugClass: "Oxazolidinone",
    mechanismOfAction: "Inhibits bacterial protein synthesis by selectively binding to the 23S ribosomal RNA of the 50S subunit. This prevents the formation of the functional 70S initiation complex, halting translation.",
    spectrumOfActivity: [
      "Gram-positive organisms.",
      "Methicillin-Resistant Staphylococcus aureus (MRSA).",
      "Vancomycin-Resistant Enterococci (VRE; both E. faecium and E. faecalis).",
      "Streptococcus pneumoniae (including penicillin-resistant strains)."
    ],
    commonIndications: [
      "Pneumonia (both CAP and nosocomial) caused by MRSA or susceptible S. pneumoniae.",
      "Complicated skin and soft tissue infections (SSTIs) caused by MRSA.",
      "Infections caused by Vancomycin-Resistant Enterococcus (VRE)."
    ],
    adverseEffects: [
      "Myelosuppression: Reversible thrombocytopenia, anemia, and leukopenia, especially when therapy exceeds 14 days.",
      "Neuropathy: Peripheral and optic neuropathy (potentially irreversible) associated with prolonged treatment (>28 days).",
      "Serotonin Syndrome: Precipitated by co-administration with SSRIs, SNRIs, or other serotonergic agents due to weak, reversible monoamine oxidase inhibition (MAOI).",
      "Lactic Acidosis: Related to mitochondrial ribosome inhibition on extended courses."
    ],
    contraindications: [
      "Use within 14 days of monoamine oxidase inhibitors (MAOIs).",
      "Uncontrolled hypertension, pheochromocytoma, or severe thyrotoxicosis (due to risk of catecholamine pressor responses)."
    ],
    monitoringConsiderations: [
      "Complete Blood Count (CBC): Weekly monitoring is strongly recommended to detect drug-induced thrombocytopenia and anemia.",
      "Visual Assessment: Baseline and periodic visual examinations for patients taking linezolid for 3 months or longer.",
      "Clinical screen for symptoms of serotonin syndromic state (clonus, hyperreflexia, agitation)."
    ],
    clinicalPearls: [
      "Linezolid exhibits nearly 100% oral bioavailability. The oral (PO) dose is identical to the intravenous (IV) dose, making it an exceptional option for early hospital discharge and outpatient oral antibiotic continuation.",
      "It acts as a bacteriostatic agent against staphylococci and enterococci, but is bactericidal against most streptococci.",
      "Because it is a protein synthesis inhibitor, it suppresses the production of bacterial toxins like Panton-Valentine Leukocidin (PVL) in MRSA."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MRSA)", relation: "Primary Target" },
      { id: "e-faecium", name: "Enterococcus faecium (VRE)", relation: "Primary Target" },
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "hospital-acquired-pneumonia", name: "Hospital-Acquired Pneumonia (HAP)", relation: "First-Line Treatment" },
      { id: "cellulitis-and-skin-infections", name: "Cellulitis and Skin Infections", relation: "Alternative Option" },
      { id: "sepsis", name: "Sepsis", relation: "Alternative Option" }
    ]
  },
  {
    id: "daptomycin",
    name: "Daptomycin",
    slug: "daptomycin",
    drugClass: "Lipopeptide",
    mechanismOfAction: "Binds to bacterial cell membranes in a calcium-dependent manner, inserting its lipophilic tail into the phospholipid bilayer. This triggers rapid depolarization of the cell membrane, potassium ion efflux, and subsequent arrest of DNA, RNA, and protein synthesis, leading to rapid cell death.",
    spectrumOfActivity: [
      "Strictly Gram-positive bacteria.",
      "Methicillin-Resistant Staphylococcus aureus (MRSA), including Vancomycin-intermediate (VISA) and Vancomycin-resistant strains.",
      "Vancomycin-Resistant Enterococci (VRE)."
    ],
    commonIndications: [
      "Complicated skin and skin structure infections (SSTIs) caused by Gram-positive pathogens.",
      "Staphylococcus aureus bloodstream infections (bacteremia), including right-sided infective endocarditis."
    ],
    adverseEffects: [
      "Myopathy and Rhabdomyolysis: Skeletal muscle toxicity manifesting as elevated creatine phosphokinase (CPK) levels, muscle pain, or weakness.",
      "Eosinophilic Pneumonia: A rare, life-threatening immunological reaction characterized by fever, progressive dyspnea, and pulmonary infiltrates.",
      "Peripheral Neuropathy: Transient numbness or tingling."
    ],
    contraindications: [
      "Hypersensitivity to daptomycin.",
      "Should NEVER be used to treat community-acquired or nosocomial pneumonia, as it is binds to and is inactivated by pulmonary surfactant."
    ],
    monitoringConsiderations: [
      "Creatine Phosphokinase (CPK): Baseline and at least weekly monitoring (more frequent if patients are on statins or have renal impairment).",
      "Renal Function: Adjust dosing interval for patients with creatinine clearance <30 mL/min.",
      "Screen for new onset cough, fever, or shortness of breath to rule out eosinophilic pneumonia."
    ],
    clinicalPearls: [
      "Surfactant Inactivation: Surfactant actively binds and neutralizes Daptomycin. Even though S. pneumoniae is highly sensitive in vitro, using Daptomycin for pulmonary consolidation will lead to immediate clinical failure.",
      "Unlike Vancomycin, Daptomycin is rapidly bactericidal (cell-killing rather than growth-halting), making it highly valuable in deep-seated, high-inoculum endovascular infections."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MRSA)", relation: "Primary Target" },
      { id: "e-faecalis", name: "Enterococcus faecalis (VRE)", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "bacteremia", name: "Bacteremia", relation: "First-Line Treatment" },
      { id: "infective-endocarditis", name: "Infective Endocarditis", relation: "First-Line Treatment" },
      { id: "cellulitis-and-skin-infections", name: "Cellulitis and Skin Infections", relation: "Empirical Choice" }
    ]
  },
  {
    id: "nafcillin",
    name: "Nafcillin",
    slug: "nafcillin",
    drugClass: "Penicillinase-Resistant Penicillin",
    mechanismOfAction: "Inhibits bacterial cell wall synthesis by binding to and inactivating penicillin-binding proteins (PBPs), halting peptidoglycan cross-linking. Contains a bulky hydrophobic side chain that sterically blocks staphylococcal beta-lactamase (penicillinase) from hydrolyzing the beta-lactam ring.",
    spectrumOfActivity: [
      "Narrow-spectrum Gram-positive coverage.",
      "Methicillin-Susceptible Staphylococcus aureus (MSSA).",
      "Streptococcus pyogenes (Group A Strep) and other beta-hemolytic streptococci."
    ],
    commonIndications: [
      "Serious infections caused by Methicillin-Susceptible Staphylococcus aureus (MSSA) such as bacteremia, endocarditis, osteomyelitis, and skin/soft-tissue infections."
    ],
    adverseEffects: [
      "Acute Interstitial Nephritis (AIN): Immune-mediated renal hypersensitivity with fever, rash, and eosinophiluria.",
      "Hepatotoxicity: Transient elevation of transaminases; neutropenia (typically on high-dose therapy exceeding 2 weeks).",
      "Local infusion site reactions (phlebitis, extravasation tissue necrosis)."
    ],
    contraindications: [
      "History of serious immediate hypersensitivity (e.g., anaphylaxis, hives) to penicillin class drugs."
    ],
    monitoringConsiderations: [
      "Renal Function (BUN/Creatinine): Daily to weekly to monitor for acute interstitial nephritis.",
      "Hepatic Enzymes (AST/ALT): Periodically during extended intravenous courses.",
      "Complete Blood Count (CBC): Weekly to monitor for drug-induced neutropenia."
    ],
    clinicalPearls: [
      "Nafcillin is cleared primarily via hepatic excretion and biliary secretion. Therefore, unlike almost all other beta-lactam drugs, no dosage adjustment is required in patients with renal impairment.",
      "For serious MSSA bacteremia, Nafcillin clears bloodstream infections substantially faster and reduces treatment failure compared to Vancomycin. Vancomycin should only be used for MSSA if patients have a severe penicillin allergy.",
      "Extravasation of Nafcillin can cause severe tissue necrosis. Hyaluronidase injections and cold compresses are recommended to manage extravasation."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MSSA)", relation: "Primary Target" },
      { id: "s-pyogenes", name: "Streptococcus pyogenes", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "infective-endocarditis", name: "Infective Endocarditis", relation: "First-Line Treatment" },
      { id: "osteomyelitis", name: "Osteomyelitis", relation: "First-Line Treatment" },
      { id: "cellulitis-and-skin-infections", name: "Cellulitis and Skin Infections", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "piperacillin-tazobactam",
    name: "Piperacillin-Tazobactam",
    slug: "piperacillin-tazobactam",
    drugClass: "Antipseudomonal Penicillin & Beta-Lactamase Inhibitor",
    mechanismOfAction: "Piperacillin binds and disables penicillin-binding proteins (PBPs) to halt cell wall synthesis. Tazobactam is a suicide inhibitor of beta-lactamases (specifically class A and C), preserving piperacillin from enzymatic inactivation.",
    spectrumOfActivity: [
      "Extremely broad spectrum cover.",
      "Gram-negative bacilli, including Pseudomonas aeruginosa.",
      "Gram-positive cocci (MSSA, streptococci, Enterococcus faecalis; NOT MRSA).",
      "Anaerobes (including Bacteroides fragilis and oral anaerobes)."
    ],
    commonIndications: [
      "Empiric therapy for severe nosocomial infections: Healthcare-associated pneumonia (HAP), intra-abdominal sepsis, complicated urinary tract infections, and neutropenic fever."
    ],
    adverseEffects: [
      "Hypersensitivity reactions (mild rash to anaphylaxis).",
      "Acute Kidney Injury (AKI): Significantly increased risk of nephrotoxicity when co-administered with IV Vancomycin.",
      "Thrombocytopenia and platelet dysfunction.",
      "Clostridioides difficile-associated diarrhea."
    ],
    contraindications: [
      "Severe immediate hypersensitivity reaction to any penicillin, cephalosporin, or beta-lactamase inhibitor."
    ],
    monitoringConsiderations: [
      "Renal Function (Creatinine/eGFR): Baseline & daily, especially if combined with Vancomycin.",
      "Complete Blood Count (CBC): Screen for leukopenia or thrombocytopenia on prolonged courses.",
      "Coagulation studies (PT/INR) in patients on high doses."
    ],
    clinicalPearls: [
      "Often referred to by its brand name, Zosyn. It is the core workhorse antibiotic in inpatient wards because of its dual cover against Pseudomonas and Bacteroides fragilis.",
      "Does NOT cover MRSA, Atypical pathogens (Mycoplasma, Chlamydia, Legionella), or ESBL-producing Gram-negative rods reliably."
    ],
    relatedPathogens: [
      { id: "p-aeruginosa", name: "Pseudomonas aeruginosa", relation: "Primary Target" },
      { id: "s-aureus", name: "Staphylococcus aureus (MSSA)", relation: "Spectrum Cover" },
      { id: "e-coli", name: "Escherichia coli", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "hospital-acquired-pneumonia", name: "Hospital-Acquired Pneumonia (HAP)", relation: "First-Line Treatment" },
      { id: "intra-abdominal-infection", name: "Intra-Abdominal Infection", relation: "First-Line Treatment" },
      { id: "sepsis", name: "Sepsis", relation: "Empirical Choice" }
    ]
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    slug: "amoxicillin",
    drugClass: "Aminopenicillin",
    mechanismOfAction: "Inhibits cell wall synthesis by binding to penicillin-binding proteins (PBPs), blocks transpeptidation cross-linking. Possesses a charged amino side chain, enabling ready passage through polar outer membrane porins of Gram-negative bacteria.",
    spectrumOfActivity: [
      "Gram-positive organisms (S. pneumoniae, S. pyogenes, Listeria monocytogenes, Enterococcus faecalis).",
      "Selected Gram-negative bacilli (Proteus mirabilis, Escherichia coli, Haemophilus influenzae; abbreviation: 'HELP' staves)."
    ],
    commonIndications: [
      "Acute otitis media, acute bacterial sinusitis, and streptococcal pharyngitis.",
      "Uncomplicated community-acquired pneumonia (CAP) in healthy outpatients.",
      "Prophylaxis for infective endocarditis before dental procedures.",
      "Part of triple-therapy regimens for Helicobacter pylori eradication."
    ],
    adverseEffects: [
      "Gastrointestinal: Diarrhea and nausea.",
      "Hypersensitivity: Morbilliform skin rash (especially when inadvertently administered to patients with acute EBV infectious mononucleosis).",
      "Clostridioides difficile-associated colitis."
    ],
    contraindications: [
      "History of severe immediate hypersensitivity (e.g., anaphylaxis, Stevens-Johnson syndrome) to penicillins."
    ],
    monitoringConsiderations: [
      "Minimal monitoring on short courses; screen for resolution of local symptoms and signs.",
      "Renal function in elderly or severely dehydrated infants (requires dose adjustment if CrCl <30 mL/min)."
    ],
    clinicalPearls: [
      "Amoxicillin has excellent oral absorption (food does not delay absorption), making it highly superior to oral ampicillin.",
      "Amoxicillin is susceptible to hydrolysis by standard beta-lactamases produced by S. aureus, H. influenzae, and E. coli. Hence, severe or resistant infections often require pairing with clavulanic acid."
    ],
    relatedPathogens: [
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae", relation: "Primary Target" },
      { id: "s-pyogenes", name: "Streptococcus pyogenes", relation: "Primary Target" },
      { id: "h-influenzae", name: "Haemophilus influenzae", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "acute-otitis-media", name: "Acute Otitis Media", relation: "First-Line Treatment" },
      { id: "streptococcal-pharyngitis", name: "Streptococcal Pharyngitis", relation: "First-Line Treatment" },
      { id: "acute-bacterial-sinusitis", name: "Acute Bacterial Sinusitis", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "ceftriaxone",
    name: "Ceftriaxone",
    slug: "ceftriaxone",
    drugClass: "Third-Generation Cephalosporin",
    mechanismOfAction: "Inhibits bacterial cell wall synthesis by binding to one or more penicillin-binding proteins (PBPs), preventing peptidoglycan cross-linking cataloged in active replication.",
    spectrumOfActivity: [
      "Broad-spectrum, covering most Gram-negative bacilli.",
      "Gram-positive coverage includes Streptococcus pneumoniae and S. pyogenes.",
      "Highly active against Neisseria meningitidis and Neisseria gonorrhoeae.",
      "DOES NOT cover Pseudomonas aeruginosa, MRSA, Listeria monocytogenes, or Enterococcus species."
    ],
    commonIndications: [
      "Community-acquired bacterial meningitis (crosses the blood-brain barrier expertly).",
      "Disseminated Lyme disease (carditis, arthritis, meningitis).",
      "Pyelonephritis and complicated urinary tract infections.",
      "First-line single-dose therapy for Neisseria gonorrhoeae infections.",
      "Empiric community-acquired pneumonia (CAP) in hospitalized patients."
    ],
    adverseEffects: [
      "Biliary Sludge & Pseudocholelithiasis: Ceftriaxone precipitates with calcium in the gallbladder, causing reversible biliary colic.",
      "Neonatal Kernicterus: Displaces bilirubin from albumin binding sites, contraindicating use in neonates (<28 days).",
      "Immune-mediated hemolytic anemia."
    ],
    contraindications: [
      "Hypersensitivity to cephalosporins.",
      "Neonatal usage (<28 days) if requiring calcium-containing IV solutions (due to risk of fatal crystalline precipitates in lung and kidney vasculature)."
    ],
    monitoringConsiderations: [
      "Liver functions and serum bilirubin if biliary pseudocholelithiasis is suspected clinically.",
      "Renal and hepatic status periodically during prolonged, high-dosage therapy."
    ],
    clinicalPearls: [
      "Unlike almost all other cephalosporins, Ceftriaxone is eliminated via dual renal and biliary pathways. No dosage adjustments are necessary in patients with isolated renal or hepatic dysfunction.",
      "Has a remarkably long half-life, allowing for convenient once-daily dosing in clinical practice.",
      "Remember: Ceftriaxone has ZERO activity against 'LAME' pathogens (Listeria, Atypicals like Mycoplasma, MRSA, and Enterococcus)."
    ],
    relatedPathogens: [
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae", relation: "Primary Target" },
      { id: "n-meningitidis", name: "Neisseria meningitidis", relation: "Primary Target" },
      { id: "e-coli", name: "Escherichia coli", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "acute-bacterial-meningitis", name: "Acute Bacterial Meningitis", relation: "First-Line Treatment" },
      { id: "pyelonephritis", name: "Pyelonephritis", relation: "First-Line Treatment" },
      { id: "community-acquired-pneumonia", name: "Community-Acquired Pneumonia (CAP)", relation: "Empirical Choice" }
    ]
  },
  {
    id: "cefepime",
    name: "Cefepime",
    slug: "cefepime",
    drugClass: "Fourth-Generation Cephalosporin",
    mechanismOfAction: "Zwitterionic structure enables rapid penetration across the outer membrane of Gram-negative bacteria. Binds to PBPs to disrupt cell wall synthesis; exhibits unique resistance to hydrolysis by early-class chromosomal beta-lactamases (AmpC).",
    spectrumOfActivity: [
      "Broad-spectrum covering both Gram-positive cocci and Gram-negative bacilli.",
      "Excellent anti-pseudomonal activity (Pseudomonas aeruginosa).",
      "MSSA, S. pneumoniae, and other streptococci.",
      "DOES NOT cover MRSA, Enterococcus, or anaerobes reliably."
    ],
    commonIndications: [
      "Empirical monotherapy for febrile neutropenia.",
      "Hospital-acquired and ventilator-associated pneumonia (HAP/VAP).",
      "Complicated urinary-tract infections and pyelonephritis."
    ],
    adverseEffects: [
      "Neurotoxicity: Manifests as encephalopathy, altered mental status, myoclonus, or non-convulsive status epilepticus. Highly correlated with overdosage in undetected renal failure.",
      "Hypersensitivity (rash, drug fever).",
      "Clostridioides difficile-associated colitis."
    ],
    contraindications: [
      "History of deep anaphylaxis to cephalosporins or other beta-lactam classes."
    ],
    monitoringConsiderations: [
      "Renal Function (Creatinine Clearance): Absolute necessity. Must adjust dosage to avoid neurotoxic accumulation.",
      "Neurological exams for patients with renal impairment who present with altered sleep-wake cycles or confusion."
    ],
    clinicalPearls: [
      "Cefepime is a prime choice for hospital infections due to its high AmpC beta-lactamase stability compared to Ceftriaxone.",
      "If a patient on Cefepime developed acute-onset confusion, do not automatically assume a worsening infection—rule out Cefepime-induced neurotoxicity first."
    ],
    relatedPathogens: [
      { id: "p-aeruginosa", name: "Pseudomonas aeruginosa", relation: "Primary Target" },
      { id: "s-aureus", name: "Staphylococcus aureus (MSSA)", relation: "Spectrum Cover" },
      { id: "k-pneumoniae", name: "Kelev-pneumoniae (K. pneumoniae)", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "hospital-acquired-pneumonia", name: "Hospital-Acquired Pneumonia (HAP)", relation: "First-Line Treatment" },
      { id: "pyelonephritis", name: "Pyelonephritis", relation: "Empirical Choice" },
      { id: "sepsis", name: "Sepsis", relation: "Empirical Choice" }
    ]
  },
  {
    id: "ceftaroline",
    name: "Ceftaroline",
    slug: "ceftaroline",
    drugClass: "Fifth-Generation Cephalosporin",
    mechanismOfAction: "Disrupts cell wall cross-linking by binding to PBPs. Specifically designed with an active 1,3-thiazole ring that has high binding affinity for the mutated PBP2a found in MRSA, which other cephalosporins cannot bind.",
    spectrumOfActivity: [
      "Gram-positive cocci, including MRSA, MRSE, VISA, and VRSA.",
      "Multidrug-resistant Streptococcus pneumoniae.",
      "Common Gram-negative respiratory pathogens.",
      "No activity against Pseudomonas aeruginosa or anaerobes."
    ],
    commonIndications: [
      "Complicated skin and skin structure infections (SSTIs) caused by MRSA.",
      "Community-acquired bacterial pneumonia (CAP) caused by multidrug-resistant S. pneumoniae."
    ],
    adverseEffects: [
      "Positive direct Coombs' test, occasionally progressing to autoimmune hemolytic anemia.",
      "Gastrointestinal upset (diarrhea, nausea).",
      "Hypersensitivity reactions."
    ],
    contraindications: [
      "Severe immediate hypersensitivity reaction to Ceftaroline or other cephalosporins."
    ],
    monitoringConsiderations: [
      "Renal function (dose must be adjusted for CrCl <50 mL/min).",
      "Complete Blood Count (CBC) and direct Coombs' test if hemolytico-anemic signs are encountered."
    ],
    clinicalPearls: [
      "Ceftaroline is the ONLY beta-lactam antibiotic in clinical use that effectively covers MRSA.",
      "It represents an excellent alternative for patients with MRSA bacteremia who cannot tolerate Vancomycin or Daptomycin, or who have experienced treatment failures on those agents."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MRSA)", relation: "Primary Target" },
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae (MDR)", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "cellulitis-and-skin-infections", name: "Cellulitis and Skin Infections", relation: "First-Line Treatment" },
      { id: "community-acquired-pneumonia", name: "Community-Acquired Pneumonia (CAP)", relation: "Alternative Option" }
    ]
  },
  {
    id: "meropenem",
    name: "Meropenem",
    slug: "meropenem",
    drugClass: "Carbapenem",
    mechanismOfAction: "Ultra-broad spectrum beta-lactam. Highly resistant to breakdown by most beta-lactamases, including Extended-Spectrum Beta-Lactamases (ESBLs) and AmpC enzymes. Binds and halts multiple critical PBPs.",
    spectrumOfActivity: [
      "Very broad spectrum.",
      "Gram-negative bacilli, including Pseudomonas aeruginosa and ESBL-producing Enterobacteriaceae.",
      "Gram-positive organisms (MSSA, streptococci; NOT MRSA or VRE).",
      "Anaerobes (including Bacteroides fragilis)."
    ],
    commonIndications: [
      "Empiric and definitive therapy for suspected or documented multidrug-resistant Gram-negative bacterial infections, particularly ESBL-producing GNRs.",
      "Intra-abdominal sepsis, complicated skin and soft tissue infections.",
      "High-risk febrile neutropenia."
    ],
    adverseEffects: [
      "Decreased seizure threshold (lower incidence than imipenem).",
      "Hypersensitivity reactions (cross-reactivity with penicillins is low, ~1%).",
      "Nausea, vomiting, local phlebitis."
    ],
    contraindications: [
      "Severe immediate anaphylactic reactions to penicillins or carbapenems."
    ],
    monitoringConsiderations: [
      "Renal Function (dose adjustment required for renal clearance parameters).",
      "Mental status monitoring in patients with pre-existing CNS disorders or compromised renal clearing."
    ],
    clinicalPearls: [
      "The ultimate drug of choice for ESBL-producing Enterobacteriaceae (E. coli, K. pneumoniae). Using Ceftriaxone for an ESBL-producer will lead to rapid clinical failure.",
      "Unlike Imipenem, Meropenem does not require co-administration with cilastatin, because it is stable against degradation by renal dehydropeptidase-I."
    ],
    relatedPathogens: [
      { id: "p-aeruginosa", name: "Pseudomonas aeruginosa", relation: "Primary Target" },
      { id: "e-coli", name: "Escherichia coli (ESBL)", relation: "Primary Target" },
      { id: "k-pneumoniae", name: "Klebsiella pneumoniae", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "intra-abdominal-infection", name: "Intra-Abdominal Infection", relation: "First-Line Treatment" },
      { id: "sepsis", name: "Sepsis", relation: "First-Line Treatment" },
      { id: "hospital-acquired-pneumonia", name: "Hospital-Acquired Pneumonia (HAP)", relation: "Empirical Choice" }
    ]
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    slug: "azithromycin",
    drugClass: "Macrolide",
    mechanismOfAction: "Reversibly binds to the 50S ribosomal subunit (specifically the 23S rRNA), blocking peptidyltransferase-mediated peptide bond initiation and inhibiting protein synthesis (bacteriostatic).",
    spectrumOfActivity: [
      "Atypical pathogens (Mycoplasma pneumoniae, Chlamydia pneumoniae, Legionella pneumophila, Chlamydia trachomatis).",
      "Gram-negative respiratory pathogens (Haemophilus influenzae, Moraxella catarrhalis).",
      "Some Gram-positive Streptococci (moderate coverage; resistance is rising)."
    ],
    commonIndications: [
      "Atypical (walking) community-acquired pneumonia.",
      "Urethritis or cervicitis due to Chlamydia trachomatis.",
      "Acute bacterial exacerbation of chronic obstructive pulmonary disease (COPD).",
      "Mycobacterium avium complex (MAC) prophylaxis in advanced AIDS."
    ],
    adverseEffects: [
      "Gastrointestinal: Hypermotility, abdominal cramping, and nausea (stimulates motilin receptors).",
      "Cardiovascular: Prolongation of the QT interval, putting patients at risk for Torsades de Pointes (risk elevated with underlying cardiac disease).",
      "Hepatotoxicity: Cholestatic hepatitis."
    ],
    contraindications: [
      "History of cholestatic jaundice or hepatic dysfunction on previous macrolide dosing.",
      "Avoid in patients with congenital long QT syndrome or taking other QT-prolonging drugs."
    ],
    monitoringConsiderations: [
      "Electrocardiogram (ECG) for baseline QTc interval check in high-risk patients.",
      "Hepatic enzymes (AST/ALT) during prolonged macrolide therapy."
    ],
    clinicalPearls: [
      "Unlike Erythromycin and Clarithromycin, Azithromycin does NOT inhibit cytochrome P450 enzymes (CYP3A4), making it much safer regarding drug-drug interactions.",
      "Exhibits extraordinarily high intracellular concentration and tissue distribution; serum levels are low, but drug concentrations in alveolar macrophages and lung tissues are exceptionally high."
    ],
    relatedPathogens: [
      { id: "l-pneumophila", name: "Legionella pneumophila", relation: "Primary Target" },
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae (Atypical)", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "community-acquired-pneumonia", name: "Community-Acquired Pneumonia (CAP)", relation: "First-Line Treatment" },
      { id: "urethritis", name: "Urethritis", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "doxycycline",
    name: "Doxycycline",
    slug: "doxycycline",
    drugClass: "Tetracycline",
    mechanismOfAction: "Reversibly binds to the 30S ribosomal subunit, preventing the attachment of aminoacyl-tRNA to the ribosomal acceptor site. This halts codon translation and bacterial protein synthesis (bacteriostatic).",
    spectrumOfActivity: [
      "Atypical organisms (Mycoplasma pneumoniae, Chlamydia species).",
      "Zoonotic/Vector-borne pathogens (Rickettsia rickettsii, Borrelia burgdorferi, Anaplasma, Coxiella burnetii, Brucella).",
      "Gram-positive cocci (including community-acquired MRSA)."
    ],
    commonIndications: [
      "Lyme disease (early localized stage).",
      "Rocky Mountain Spotted Fever (RMSF).",
      "Community-acquired pneumonia.",
      "Pelvic Inflammatory Disease (PID) in combination with Ceftriaxone.",
      "Moderate-to-severe acne vulgaris."
    ],
    adverseEffects: [
      "Gastrointestinal: Esophageal ulceration and erosive esophagitis (must take with fluids and remain upright).",
      "Photosensitivity: Severe exaggerated sunburn reactions.",
      "Tooth discoloration and bone growth deceleration in fetuses and pediatric populations."
    ],
    contraindications: [
      "Pregnancy (category D) and breast-feeding.",
      "Historically avoided in children <8 years of age (however, CDC actively recommends it as first-line for RMSF in ALL ages due to high mortality of the infection)."
    ],
    monitoringConsiderations: [
      "Minimal lab monitoring on short courses.",
      "Evaluate skin status and warn patients to avoid direct sun exposure/tanning beds."
    ],
    clinicalPearls: [
      "Must be taken with a full glass of water and the patient should remain upright for at least 30 minutes to avoid devastating pill-induced esophagitis.",
      "Doxycycline binds (chelates) with divalent/trivalent cations (calcium, magnesium, iron, aluminum). Therefore, taking it with antacids, iron supplements, calcium-fortified juices, or dairy products will severely reduce its gastrointestinal absorption.",
      "Excreted primarily in feces as inactive complexes; safe for patients with end-stage renal disease without dose adjustments."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MRSA)", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "pelvic-inflammatory-disease", name: "Pelvic Inflammatory Disease (PID)", relation: "First-Line Treatment" },
      { id: "community-acquired-pneumonia", name: "Community-Acquired Pneumonia (CAP)", relation: "Alternative Option" }
    ]
  },
  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    slug: "ciprofloxacin",
    drugClass: "Fluoroquinolone",
    mechanismOfAction: "Inhibits bacterial DNA topoisomerase II (DNA gyrase) in Gram-negative bacteria and topoisomerase IV in Gram-positive bacteria. This prevents the relaxation of supercoiled DNA and halts DNA replication, causing double-stranded DNA fractures and rapid cell death (bactericidal).",
    spectrumOfActivity: [
      "Excellent Gram-negative coverage, including Pseudomonas aeruginosa.",
      "Atypical pathogens.",
      "Minimal to no activity against Gram-positive cocci (such as S. pneumoniae; NOT a 'respiratory quinolone')."
    ],
    commonIndications: [
      "Complicated urinary-tract infections, pyelonephritis, and acute bacterial prostatitis.",
      "Traveler's diarrhea and infectious bacterial gastroenteritis.",
      "Pseudomonas-induced osteomyelitis or skin infections in diabetics."
    ],
    adverseEffects: [
      "Tendonitis & Tendon Rupture: Black box warning; primarily targets the Achilles tendon.",
      "QT Prolongation & Aortic Aneurysm Dissection: Quinolones degrade collagen structures.",
      "Neurotoxicity: Sleep disturbances, confusion, and lowering of seizure threshold.",
      "Cartilage Toxicity: Joint damage in juvenile animal models."
    ],
    contraindications: [
      "Concomitant administration of tizanidine (CYP1A2 inhibition).",
      "History of fluoroquinolone-induced tendon rupture or pathology."
    ],
    monitoringConsiderations: [
      "Renal status (dosage must be adapted for CrCl <50 mL/min).",
      "Baseline ECG for QT check in patients with pre-existing arrhythmia risks."
    ],
    clinicalPearls: [
      "Ciprofloxacin is a strong CYP1A2 inhibitor; it can raise levels of drugs like theophylline and caffeine.",
      "Like tetracyclines, fluoroquinolones are chelated by multivalent cations. Absorbance is completely blocked if taken with antacids or iron.",
      "Do NOT use Ciprofloxacin to treat Community-Acquired Pneumonia (CAP). S. pneumoniae coverage is extremely weak."
    ],
    relatedPathogens: [
      { id: "p-aeruginosa", name: "Pseudomonas aeruginosa", relation: "Primary Target" },
      { id: "e-coli", name: "Escherichia coli", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "pyelonephritis", name: "Pyelonephritis", relation: "First-Line Treatment" },
      { id: "uncomplicated-urinary-tract-infection", name: "Uncomplicated Urinary Tract Infection (Cystitis)", relation: "Alternative Option" }
    ]
  },
  {
    id: "levofloxacin",
    name: "Levofloxacin",
    slug: "levofloxacin",
    drugClass: "Respiratory Fluoroquinolone",
    mechanismOfAction: "Blocks bacterial DNA replication by targeting DNA gyrase and topoisomerase IV. Exhibits expanded binding capability against Gram-positive topoisomerases compared to older quinolones.",
    spectrumOfActivity: [
      "Broad-spectrum GNR cover, including Pseudomonas aeruginosa.",
      "Highly active against Streptococcus pneumoniae.",
      "Atypical pathogens."
    ],
    commonIndications: [
      "Community-acquired pneumonia (especially in patients with severe comorbidities or structural lung diseases).",
      "Complicated UTI and chronic prostatitis.",
      "Acute bacterial exacerbation of chronic bronchitis."
    ],
    adverseEffects: [
      "Achilles tendonitis or rupture.",
      "QTc interval prolongation.",
      "Dysglycemia (hypoglycemia/hyperglycemia shifts, especially in elderly diabetics).",
      "Aortic aneurysm rupture risk."
    ],
    contraindications: [
      "Concomitant QT-prolonging agents.",
      "History of tendon disorders."
    ],
    monitoringConsiderations: [
      "Serum glucose monitoring in diabetic patients on oral hypoglycemics.",
      "Renal clearance (requires dose adjustments)."
    ],
    clinicalPearls: [
      "Often termed a 'respiratory quinolone' because it provides stellar, bactericidal monotherapy coverage for community-acquired pneumonia, capturing both S. pneumoniae and atypicals in a single agent."
    ],
    relatedPathogens: [
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae", relation: "Primary Target" },
      { id: "p-aeruginosa", name: "Pseudomonas aeruginosa", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "community-acquired-pneumonia", name: "Community-Acquired Pneumonia (CAP)", relation: "First-Line Treatment" },
      { id: "pyelonephritis", name: "Pyelonephritis", relation: "Empirical Choice" }
    ]
  },
  {
    id: "clindamycin",
    name: "Clindamycin",
    slug: "clindamycin",
    drugClass: "Lincosamide (Protein & Toxin Inhibitor)",
    mechanismOfAction: "Binds to the 50S ribosomal subunit, blocking peptide bond formation and halting protein translation. Uniquely blocks ribosomal synthesis of bacterial toxins immediately.",
    spectrumOfActivity: [
      "Gram-positive bacteria (S. pyogenes, S. aureus including some community-acquired MRSA).",
      "Anaerobes (including oral cavity and standard tissue anaerobes).",
      "DOES NOT cover Gram-negatives (intrinsically resistant)."
    ],
    commonIndications: [
      "Toxic Shock Syndrome (TSS) and necrotizing fasciitis (Group A Strep or S. aureus) as a protein-shutoff adjunct to penicillin.",
      "Infections of the oral cavity and neck space abscesses.",
      "Aspiration pneumonia."
    ],
    adverseEffects: [
      "Pseudomembranous Colitis (Black Box Warning): Unmatched predisposition for enabling Clostridioides difficile colonization by wiping out protective anaerobic gut bacterial niches."
    ],
    contraindications: [
      "History of severe antibiotic-related pseudomembranous colitis."
    ],
    monitoringConsiderations: [
      "Frequent bowel movement counts. Patients should immediately stop taking Clindamycin and contact a provider if watery diarrhea restarts."
    ],
    clinicalPearls: [
      "The 'Eagle Effect': Beta-lactams are ineffective in heavy, stationary-phase infections because bacteria aren't dividing. Clindamycin, by directly blocking ribosomal translation, works immediately regardless of division speed, shuting down lethal streptococcal pyrogenic exotoxins and staphylococcal toxic shock toxins.",
      "Think: 'Above the diaphragm' anaerobes are Clindamycin; 'Below the diaphragm' anaerobes are Metronidazole."
    ],
    relatedPathogens: [
      { id: "s-pyogenes", name: "Streptococcus pyogenes", relation: "Primary Target" },
      { id: "s-aureus", name: "Staphylococcus aureus (MSSA)", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "necrotizing-fasciitis", name: "Necrotizing Fasciitis", relation: "First-Line Treatment" },
      { id: "cellulitis-and-skin-infections", name: "Cellulitis and Skin Infections", relation: "Empirical Choice" }
    ]
  },
  {
    id: "metronidazole",
    name: "Metronidazole",
    slug: "metronidazole",
    drugClass: "Nitroimidazole (Anaerobic / DNA Disruptor)",
    mechanismOfAction: "Diffuses into anaerobic cells where its nitro group is enzymatically reduced by electron transport proteins (ferredoxin). This forms highly reactive, cytotoxic free radical intermediates that interact with and fracture bacterial DNA, causing helical structure destabilization and cell death.",
    spectrumOfActivity: [
      "Strictly anaerobic bacteria (Bacteroides fragilis, Clostridium species, Fusobacterium).",
      "Protozoa (Giardia, Entamoeba histolytica, Trichomonas vaginalis)."
    ],
    commonIndications: [
      "Complicated intra-abdominal infections (in combination with a Gram-negative active agent).",
      "Trichomoniasis urethritis/vaginitis."
    ],
    adverseEffects: [
      "Disulfiram-like Reaction: Severe nausea, flushing, vomiting, tachycardia, and headache if taken concurrently with alcohol. Inhibits acetaldehyde dehydrogenase.",
      "Metallic Taste & Glossitis.",
      "Peripheral neuropathy on high-dose, long-term courses."
    ],
    contraindications: [
      "Use of alcohol or propylene glycol-containing products during or within 3 days of therapy completion."
    ],
    monitoringConsiderations: [
      "Counseling: Extreme warnings against any ethanol products.",
      "Neurological check in cases of long-term therapy."
    ],
    clinicalPearls: [
      "Covers Bacteroides fragilis, the premier Gram-negative anaerobe of the GI tract.",
      "Remember: 'Below the diaphragm' is Metronidazole; 'Above the diaphragm' is Clindamycin."
    ],
    relatedPathogens: [
      { id: "c-difficile", name: "Clostridioides difficile", relation: "Alternative Target" }
    ],
    relatedDiseases: [
      { id: "intra-abdominal-infection", name: "Intra-Abdominal Infection", relation: "First-Line Treatment" },
      { id: "pelvic-inflammatory-disease", name: "Pelvic Inflammatory Disease (PID)", relation: "Empirical Choice" }
    ]
  },
  {
    id: "gentamicin",
    name: "Gentamicin",
    slug: "gentamicin",
    drugClass: "Aminoglycoside",
    mechanismOfAction: "Irreversibly binds to the 30S ribosomal subunit. This induces mRNA misreading, creating abnormal, non-functional proteins that insert into and damage the bacterial cell membrane, speeding up bactericidal cell death.",
    spectrumOfActivity: [
      "Aerobic Gram-negative bacilli, including Pseudomonas aeruginosa.",
      "Synergistic Gram-positive cocci coverage (when combined with beta-lactams or vancomycin)."
    ],
    commonIndications: [
      "Severe endovascular infections (e.g., enterococcal or streptococcal endocarditis) for synergistic clearance.",
      "Sepsis or pyelonephritis due to multi-drug resistant Gram-negative rods."
    ],
    adverseEffects: [
      "Nephrotoxicity: Proximal tubular necrosis; typically reversible but increases with higher troughs.",
      "Ototoxicity: Bilateral, irreversible vestibular (disequilibrium) and cochlear (tinnitus, hearing loss) damage. Accumulates in hair cells.",
      "Neuromuscular Blockade: Blocks acetylcholine release; contraindicated in Myasthenia Gravis."
    ],
    contraindications: [
      "Pre-existing Myasthenia Gravis.",
      "Hypersensitivity to aminoglycosides."
    ],
    monitoringConsiderations: [
      "Serum drug levels (peaks and troughs; or single daily dose kinetics).",
      "Renal clearance markers baseline and daily.",
      "Screen for tinnitus, dizziness, or hearing loss."
    ],
    clinicalPearls: [
      "Requires oxygen for active transport across the bacterial cell membrane. Therefore, Aminoglycosides are intrinsically inactive against anaerobic bacteria.",
      "Shows a strong post-antibiotic effect (PAE), permitting high-dose, once-daily interval dosing schemes."
    ],
    relatedPathogens: [
      { id: "p-aeruginosa", name: "Pseudomonas aeruginosa", relation: "Primary Target" },
      { id: "e-faecalis", name: "Enterococcus faecalis", relation: "Alternative Target" }
    ],
    relatedDiseases: [
      { id: "infective-endocarditis", name: "Infective Endocarditis", relation: "Alternative Option" },
      { id: "sepsis", name: "Sepsis", relation: "Empirical Choice" }
    ]
  },
  {
    id: "trimethoprim-sulfamethoxazole",
    name: "Trimethoprim-Sulfamethoxazole",
    slug: "trimethoprim-sulfamethoxazole",
    drugClass: "Folate Antagonist / Sulfonamide",
    mechanismOfAction: "Dual-step sequential blockade of bacterial folate synthesis. Sulfamethoxazole blocks dihydropteroate synthase; Trimethoprim blocks dihydrofolate reductase. This halts bacterial DNA synthesis.",
    spectrumOfActivity: [
      "Gram-negative rods (except Pseudomonas).",
      "Community-acquired MRSA.",
      "Nocardia species, Pneumocystis jirovecii."
    ],
    commonIndications: [
      "Uncomplicated acute cystitis.",
      "Pneumocystis jirovecii pneumonia (PJP) treatment and prophylaxis in immunocompromised hosts.",
      "Gram-positive skin infections suspicious for community-acquired MRSA."
    ],
    adverseEffects: [
      "Severe Cutaneous Adverse Reactions (SCAR): Stevens-Johnson Syndrome (SJS) or Toxic Epidermal Necrolysis (TEN).",
      "Bone Marrow Suppression (megaloblastic anemia/leukopenia).",
      "Hyperkalemia: Trimethoprim blocks sodium channels in the distal tubule of the kidney.",
      "Aplastic anemia in G6PD deficiency."
    ],
    contraindications: [
      "Severe folate-deficiency anemias.",
      "History of sulfonamide-induced anaphylaxis."
    ],
    monitoringConsiderations: [
      "Potassium levels and renal clearing parameters.",
      "Complete Blood Count (CBC) on prolonged courses."
    ],
    clinicalPearls: [
      "Also known as Bactrim. It can cause a false elevation in serum creatinine because trimethoprim competes for creatinine secretion in the proximal tubule, though GFR remains unchanged.",
      "Warfarin interaction: Displaces Warfarin from albumin and inhibits CYP2C9, leading to a dramatic rise in INR."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MRSA)", relation: "Primary Target" },
      { id: "e-coli", name: "Escherichia coli", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "uncomplicated-urinary-tract-infection", name: "Uncomplicated Urinary Tract Infection (Cystitis)", relation: "First-Line Treatment" },
      { id: "cellulitis-and-skin-infections", name: "Cellulitis and Skin Infections", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "nitrofurantoin",
    name: "Nitrofurantoin",
    slug: "nitrofurantoin",
    drugClass: "Urinary Tract Antiseptic",
    mechanismOfAction: "Enzmatically reduced inside bacterial cells to highly reactive electrophilic intermediates. These intermediates attack ribonuclear proteins, DNA, cell wall components, and multiple metabolic processes.",
    spectrumOfActivity: [
      "Strictly limited to urinary concentrations.",
      "Escherichia coli, Staphylococcus saprophyticus, Enterococcus species.",
      "DOES NOT cover Proteus or Pseudomonas."
    ],
    commonIndications: [
      "First-line treatment and prophylaxis of uncomplicated lower urinary tract infections (cystitis)."
    ],
    adverseEffects: [
      "Pulmonary Toxicity: Acute hypersensitivity pneumonitis or chronic interstitial pulmonary fibrosis (typically on courses >6 months).",
      "Drug-induced hepatitis.",
      "Hemolytic anemia in infants or G6PD-deficient patients."
    ],
    contraindications: [
      "Severe renal impairment (eGFR <30 mL/min) because the drug will not reach bactericidal concentrations in the urine bladder context.",
      "Pregnancy at term (38-42 weeks) due to risk of fetal hemolytic anemia."
    ],
    monitoringConsiderations: [
      "eGFR evaluation prior to therapy initiation.",
      "Routine screening for fever, cough, and dyspnea on chronic suppressive prophylaxis schedules."
    ],
    clinicalPearls: [
      "Bacterruria with Proteus mirabilis remains resistant because urinary alkalinization by Proteus degrades Nitrofurantoin effectiveness.",
      "Does NOT treat systemic pyelonephritis or perinephritic abscesses, as blood concentrations are virtually non-existent."
    ],
    relatedPathogens: [
      { id: "e-coli", name: "Escherichia coli", relation: "Primary Target" },
      { id: "s-saprophyticus", name: "Staphylococcus saprophyticus", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "uncomplicated-urinary-tract-infection", name: "Uncomplicated Urinary Tract Infection (Cystitis)", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "penicillin-g",
    name: "Penicillin G",
    slug: "penicillin-g",
    drugClass: "Natural Penicillin",
    mechanismOfAction: "Binds tightly to penicillin-binding proteins (PBPs), inhibiting peptidoglycan cell wall transpeptidation cross-linking and activating autolytic enzymes, driving osmotic lysis.",
    spectrumOfActivity: [
      "Gram-positive bacteria (Streptococcus pyogenes, Streptococcus agalactiae, Actinomyces).",
      "Gram-negative cocci (Neisseria meningitidis).",
      "Spirochetes (Treponema pallidum - syphilis)."
    ],
    commonIndications: [
      "Definitive therapy for Syphilis (primary, secondary, latent, and neurosyphilis).",
      "Severe bacteriogenic meningitis caused by susceptible S. pneumoniae or N. meningitidis.",
      "Pharyngitis due to Group A Strep."
    ],
    adverseEffects: [
      "Jarisch-Herxheimer Reaction: Sudden release of endotoxins/pathogen debris from dying spirochetes during syphilis treatment, presenting as self-limiting fevers, headaches, and myalgias.",
      "Type I immediate hypersensitivity (hives, anaphylaxis).",
      "Hemolytic anemia."
    ],
    contraindications: [
      "History of penicillin-induced anaphylaxis."
    ],
    monitoringConsiderations: [
      "Visual assessment for cutaneous reactions.",
      "Therapeutic warning to patients treating syphilis regarding Jarisch-Herxheimer fever flares within 24 hours."
    ],
    clinicalPearls: [
      "Intravenous Penicillin G has high clearance, but Benzathine Penicillin G is a intramuscular long-acting suspension that provides depot release over weeks, perfect for treating latent syphilis.",
      "Widely susceptible to staphylococcal beta-lactamases; almost all S. aureus isolates are now completely resistant."
    ],
    relatedPathogens: [
      { id: "s-pyogenes", name: "Streptococcus pyogenes", relation: "Primary Target" },
      { id: "s-agalactiae", name: "Streptococcus agalactiae", relation: "Primary Target" },
      { id: "n-meningitidis", name: "Neisseria meningitidis", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "streptococcal-pharyngitis", name: "Streptococcal Pharyngitis", relation: "First-Line Treatment" },
      { id: "acute-bacterial-meningitis", name: "Acute Bacterial Meningitis", relation: "Empirical Choice" }
    ]
  },
  {
    id: "cefazolin",
    name: "Cefazolin",
    slug: "cefazolin",
    drugClass: "First-Generation Cephalosporin",
    mechanismOfAction: "Disrupts bacterial cell wall synthesis by binding and inactivating transpeptidase PBPs, resulting in cell wall weakening and osmotic lysis.",
    spectrumOfActivity: [
      "Narrow spectrum Gram-positive coverage (MSSA, streptococci).",
      "Very limited Gram-negative coverage (E. coli, Proteus)."
    ],
    commonIndications: [
      "Surgical site infection prophylaxis.",
      "Susceptible MSSA endocarditis, bacteremia, or bone infections in patients with non-severe penicillin allergy."
    ],
    adverseEffects: [
      "Allergic rash, cross-allerginic reactivity with penicillin (~1-3% risk).",
      "Hematologic changes (leukopenia)."
    ],
    contraindications: [
      "History of severe immediate anaphylaxis to penicillins or cephalosporins."
    ],
    monitoringConsiderations: [
      "Renal adjustments.",
      "Observe infusion site for phlebitis."
    ],
    clinicalPearls: [
      "Does NOT cross the blood-brain barrier. Therefore, it is strictly useless for treating bacterial meningitis.",
      "Uniquely favored for surgical prophylaxis because it has a long tissue half-life and specifically targets S. aureus, the primary driver of incision infections."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (MSSA)", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "surgical-site-infection", name: "Surgical Site Infection", relation: "Prophylaxis Only" },
      { id: "cellulitis-and-skin-infections", name: "Cellulitis and Skin Infections", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "ertapenem",
    name: "Ertapenem",
    slug: "ertapenem",
    drugClass: "Carbapenem",
    mechanismOfAction: "Binds tightly to multiple PBPs to disrupt cell wall integrity. Possesses full stability against ESBL cleavage, but contains bulky biochemical additions preventing passage through porins of certain specific non-fermenting rods.",
    spectrumOfActivity: [
      "Broad spectrum coverage.",
      "ESBL-producing Enterobacteriaceae (E. coli, Klebsiella pneumoniae).",
      "Anaerobes.",
      "Lacks target activity against 'APE' pathogens: Pseudomonas, Acinetobacter, and Enterococcus."
    ],
    commonIndications: [
      "Complicated intra-abdominal, skin, and pelvic infections.",
      "Empirical management of multi-drug resistant Gram-negative infections that do not involve Pseudomonas."
    ],
    adverseEffects: [
      "Headache, infusion site reactions, diarrhea.",
      "Slightly lowers seizure threshold."
    ],
    contraindications: [
      "Hypersensitivity to Carbapenems.",
      "History of severe intramuscular injection allergies to ampicillin classes."
    ],
    monitoringConsiderations: [
      "Renal status (does require clearance clearance adjustments)."
    ],
    clinicalPearls: [
      "Remember the mnemonic 'Ertapenem is the ESBL-carbapenem that lacks APE': Covers Anaerobes & Enterobacteriaceae, but lacks Pseudomonas, Acinetobacter, Enterococcus cover.",
      "Its once-daily dosing (versus 3-4 times daily for Meropenem) makes it highly popular for Outpatient Parenteral Antimicrobial Therapy (OPAT)."
    ],
    relatedPathogens: [
      { id: "e-coli", name: "Escherichia coli (ESBL)", relation: "Primary Target" },
      { id: "k-pneumoniae", name: "Klebsiella pneumoniae", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "intra-abdominal-infection", name: "Intra-Abdominal Infection", relation: "First-Line Treatment" },
      { id: "pelvic-inflammatory-disease", name: "Pelvic Inflammatory Disease (PID)", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "amoxicillin-clavulanate",
    name: "Amoxicillin-Clavulanate",
    slug: "amoxicillin-clavulanate",
    drugClass: "Aminopenicillin & Beta-Lactamase Inhibitor Combo",
    mechanismOfAction: "Amoxicillin inhibits peptidoglycan transpeptidases. Clavulanate is a beta-lactamase inhibitor that acts as a decoy substrate, binding irreversibly to plasmid-mediated beta-lactamases to protect amoxicillin.",
    spectrumOfActivity: [
      "Gram-positive organisms.",
      "Beta-lactamase-producing Gram-negatives (Haemophilus influenzae, Moraxella catarrhalis).",
      "Anaerobes (oral cavity and gastrointestinal; NOT B. fragilis reliably)."
    ],
    commonIndications: [
      "Acute otitis media (second-line or failed amoxicillin), pediatric sinusitis.",
      "Aspiration pneumonia.",
      "Animal and human bites (prophylaxis and treatment)."
    ],
    adverseEffects: [
      "Gastrointestinal: High incidence of diarrhea and loose stools (Clavulanate stimulates intestinal contractility).",
      "Hepatotoxicity (cholestatic jaundice, primarily in adult populations)."
    ],
    contraindications: [
      "History of amoxicillin-clavulanate-associated cholestatic liver injury."
    ],
    monitoringConsiderations: [
      "Minimal lab tests on brief courses.",
      "Periodical hepatic studies on extended courses exceeding 2 weeks."
    ],
    clinicalPearls: [
      "Widely known as Augmentin. To minimize the incidence of severe diarrhea, use formulations with higher amoxicillin-to-clavulanate ratios (such as 14:1 used in pediatric otitis media).",
      "Excellent coverage for bite wounds because it covers both Eikenella corrodens (human bites) and Pasteurella multocida (dog/cat bites)."
    ],
    relatedPathogens: [
      { id: "h-influenzae", name: "Haemophilus influenzae (BL+)", relation: "Primary Target" },
      { id: "s-pneumoniae", name: "Streptococcus pneumoniae", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "acute-otitis-media", name: "Acute Otitis Media", relation: "First-Line Treatment" },
      { id: "acute-bacterial-sinusitis", name: "Acute Bacterial Sinusitis", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "rifampin",
    name: "Rifampin",
    slug: "rifampin",
    drugClass: "Rifamycins (RNA Polymerase Inhibitor)",
    mechanismOfAction: "Inhibits bacterial protein synthesis by specifically binding to the beta-subunit of DNA-dependent RNA polymerase (rpoB), preventing RNA sequence transcription. Exhibits excellent biofilm traversal.",
    spectrumOfActivity: [
      "Mycobacteria (Mycobacterium tuberculosis).",
      "Gram-positive organisms (in heavy combination settings; highly active against staphylococci in biofilms)."
    ],
    commonIndications: [
      "Part of the standard RIPE multidrug treatment regimen for active pulmonary tuberculosis.",
      "Adjunctive treatment for prosthetic valve endocarditis and orthopedic implant infections caused by S. aureus.",
      "Prophylaxis for close contacts of Neisseria meningitidis or Haemophilus influenzae type b meningitis."
    ],
    adverseEffects: [
      "Orange-red discoloration: Body secretions (tears, sweat, urine, saliva) take on a harmless but alarming orange/red hue.",
      "Hepatotoxicity: Drug-induced hepatocellular injury.",
      "Cytochrome P450 induction: Massive inducer of multiple CYP families."
    ],
    contraindications: [
      "Concomitant direct-acting antivirals (protease inhibitors for HIV/HCV) due to massive interaction clearing.",
      "Hypersensitivity to Rifamycins."
    ],
    monitoringConsiderations: [
      "Liver function indices daily to weekly during tuberculosis therapy initiation.",
      "Careful evaluation of the patient's medication list for CYP interactions (oral contraceptives, warfarin, anticonvulsants, cyclosporins)."
    ],
    clinicalPearls: [
      "Never use Rifampin as monotherapy for active bacterial or mycobacterial infections (mutation of a single rpoB gene codon leads to ultra-rapid resistance development).",
      "Inform patients wearing contact lenses that Rifampin will permanently stain soft lenses orange."
    ],
    relatedPathogens: [
      { id: "s-aureus", name: "Staphylococcus aureus (Biofilm)", relation: "Alternative Target" },
      { id: "n-meningitidis", name: "Neisseria meningitidis (Phx)", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "infective-endocarditis", name: "Infective Endocarditis", relation: "Alternative Option" },
      { id: "osteomyelitis", name: "Osteomyelitis", relation: "Alternative Option" }
    ]
  },
  {
    id: "acyclovir",
    name: "Acyclovir / Valacyclovir",
    slug: "acyclovir",
    category: "antiviral",
    drugClass: "Nucleoside Analog (DNA Polymerase Inhibitor)",
    mechanismOfAction: "Selectively phosphorylated by viral thymidine kinase to acyclovir monophosphate, then by host cellular enzymes to acyclovir triphosphate. This active metabolite competitively inhibits viral DNA polymerase and acts as an obligate chain terminator upon DNA incorporation.",
    spectrumOfActivity: [
      "Herpes Simplex Virus type 1 (HSV-1).",
      "Herpes Simplex Virus type 2 (HSV-2).",
      "Varicella-Zoster Virus (VZV)."
    ],
    commonIndications: [
      "Treatment of herpes simplex encephalitis (IV formulation preferred).",
      "Management of acute genital herpes outbreaks and recurrent suppression therapy.",
      "Treatment of varicella (chickenpox) or acute shingles (herpes zoster) within 72 hours of rash onset."
    ],
    adverseEffects: [
      "Obstructive Crystalline Nephropathy: Intravenous formulation can precipitate in renal tubules, causing acute kidney injury.",
      "Neurotoxicity: Manifests as confusion, tremors, hallucinations, or seizures, especially in elderly or renal-impaired patients.",
      "Local phlebitis at the intravenous injection site."
    ],
    contraindications: [
      "Hypersensitivity to acyclovir or valacyclovir.",
      "Use extreme caution with rapid IV administration or without adequate systemic hydration."
    ],
    monitoringConsiderations: [
      "Renal function parameters (serum creatinine, BUN) at baseline and during prolonged IV courses.",
      "Enforce aggressive intravenous hydration (normal saline infusion) to prevent crystallization in the kidneys.",
      "Neurological examination for signs of neurotoxicity."
    ],
    clinicalPearls: [
      "Valacyclovir is an oral L-valine ester prodrug of acyclovir. It features substantially higher oral bioavailability (3- to 5-fold greater), allowing for less frequent oral dosing compared to oral acyclovir.",
      "Resistance occurs due to mutations or absence of the viral thymidine kinase gene, preventing activation phase phosphorylation. Ganciclovir-resistant strains may also show cross-resistance, requiring Foscarnet or Cidofovir."
    ],
    relatedPathogens: [
      { id: "hsv-1", name: "Herpes Simplex Virus 1 (HSV-1)", relation: "Primary Target" },
      { id: "hsv-2", name: "Herpes Simplex Virus 2 (HSV-2)", relation: "Primary Target" },
      { id: "vzv", name: "Varicella-Zoster Virus (VZV)", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "encephalitis", name: "Herpes Encephalitis", relation: "First-Line Treatment" },
      { id: "herpes-zoster", name: "Herpes Zoster (Shingles)", relation: "First-Line Treatment" },
      { id: "genital-herpes", name: "Genital Herpes", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "oseltamivir",
    name: "Oseltamivir",
    slug: "oseltamivir",
    category: "antiviral",
    drugClass: "Neuraminidase Inhibitor",
    mechanismOfAction: "Orally administered prodrug metabolized to its active carboxylate form, which selectively inhibits viral neuraminidase. This enzyme is responsible for cleaving sialic acid residues on host cells, thereby blocking release of mature virions from the host cell membrane and limiting further viral spread.",
    spectrumOfActivity: [
      "Influenza A virus (including subtypes like H1N1, H3N2).",
      "Influenza B virus."
    ],
    commonIndications: [
      "Treatment of acute, uncomplicated influenza infection in patients symptomatic for ≤48 hours.",
      "Prophylaxis of influenza A and B post-exposure in high-risk individuals."
    ],
    adverseEffects: [
      "Gastrointestinal intolerance: Nausea and vomiting (reduced if taken with food).",
      "Neuropsychiatric events: Transient self-injury, delirium, and abnormal behavior reported primarily in pediatric patients.",
      "Hypersensitivity reactions: Rare cases of Stevens-Johnson syndrome or toxic epidermal necrolysis."
    ],
    contraindications: [
      "Hypersensitivity to oseltamivir phosphate.",
      "Avoid use within 2 weeks of administering live-attenuated intranasal influenza vaccine (may decrease vaccine efficacy)."
    ],
    monitoringConsiderations: [
      "Observe for signs of unusual behavior or altered mental state, particularly in children and adolescents.",
      "Renal impairment: Adjust dosage in patients with creatinine clearance <60 mL/min."
    ],
    clinicalPearls: [
      "Commonly known as Tamiflu. The therapeutic window for maximum benefit is strictly within 48 hours of symptom onset (decreases symptom duration by ~1 to 1.5 days). However, in severely ill or hospitalized patients, treatment remains recommended even beyond the 48-hour threshold.",
      "Unlike rimantadine or amantadine, which only cover Influenza A by blocking the M2 proton channel, oseltamivir and zanamivir successfully target both Influenza A and B."
    ],
    relatedPathogens: [
      { id: "influenza-a", name: "Influenza A Virus", relation: "Primary Target" },
      { id: "influenza-b", name: "Influenza B Virus", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "influenza", name: "Influenza (Flu)", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "fluconazole",
    name: "Fluconazole",
    slug: "fluconazole",
    category: "antifungal",
    drugClass: "Triazole Antifungal & CYP3A4 Inhibitor",
    mechanismOfAction: "Inhibits fungal lanosterol 14-alpha-demethylase, a cytochrome P450 enzyme responsible for converting lanosterol to ergosterol. This depletion of ergosterol disrupts fungal cell membrane integrity and increases permeability, halting growth.",
    spectrumOfActivity: [
      "Candida albicans & other susceptible Candida species (NOT Candida krusei or reliably Candida glabrata).",
      "Cryptococcus neoformans.",
      "Endemic mycoses (Coccidioides immitis, Histoplasma capsulatum) in mild-to-moderate settings."
    ],
    commonIndications: [
      "Treatment of esophageal and oropharyngeal candidiasis (thrush).",
      "Maintenance/consolidation therapy for Cryptococcal meningitis (after induction with Amphotericin B).",
      "Single-dose treatment for acute vulvovaginal candidiasis (yeast infection)."
    ],
    adverseEffects: [
      "Hepatotoxicity: Elevated transaminases or rare liver failure.",
      "QTc Interval Prolongation: Increased risk of Torsades de Pointes, especially when paired with other QTc-prolonging agents.",
      "Gastrointestinal distress: Abdominal pain, nausea, and diarrhea."
    ],
    contraindications: [
      "Co-administration of drugs metabolized by CYP3A4 that prolong the QTc interval (e.g., astemizole, pimozide).",
      "Known hypersensitivity to azole class antifungals."
    ],
    monitoringConsiderations: [
      "Liver function panels (AST, ALT, Bilirubin) at baseline and periodically.",
      "Electrocardiogram (ECG) for QTc duration in patients with pre-existing cardiac risks.",
      "Review concurrent medications closely for CYP3A4-mediated drug-drug interactions (e.g., cyclosporine, tacrolimus, phenytoin, warfarin)."
    ],
    clinicalPearls: [
      "Fluconazole features outstanding aqueous solubility and near-complete oral bioavailability. It is the only classic azole that concentrates in therapeutic amounts in the urine and cerebrospinal fluid (CSF), making it ideal for renal candidiasis and fungal meningitis.",
      "Candida krusei is intrinsically resistant to fluconazole, and Candida glabrata exhibits dosage-dependent or complete resistance. For these pathogens, Echinocandins (like micafungin) are first-line."
    ],
    relatedPathogens: [
      { id: "c-albicans", name: "Candida albicans", relation: "Primary Target" },
      { id: "c-neoformans", name: "Cryptococcus neoformans", relation: "Primary Target" }
    ],
    relatedDiseases: [
      { id: "esophageal-candidiasis", name: "Esophageal Candidiasis", relation: "First-Line Treatment" },
      { id: "cryptococcal-meningitis", name: "Cryptococcal Meningitis", relation: "Alternative Option" },
      { id: "vaginal-yeast-infection", name: "Vaginal Yeast Infection", relation: "First-Line Treatment" }
    ]
  },
  {
    id: "amphotericin-b",
    name: "Amphotericin B",
    slug: "amphotericin-b",
    category: "antifungal",
    drugClass: "Polyene Antifungal (Membrane Pore Former)",
    mechanismOfAction: "Binds directly to ergosterol in the fungal cell membrane, forming transmembrane hydrophobic pores. This leads to rapid cellular depolarization, leakage of essential intracellular monovalent cations (K+, Na+, Cl-), metabolic collapse, and rapid fungal cell death.",
    spectrumOfActivity: [
      "Broad-spectrum fungal coverage.",
      "Systemic Candida species.",
      "Cryptococcus neoformans.",
      "Aspergillus species.",
      "Endemic dimorphic mycoses (Blastomyces, Coccidioides, Histoplasma).",
      "Mucorales order (Mucor, Rhizopus causing invasive mucormycosis)."
    ],
    commonIndications: [
      "Initial induction therapy for cryptococcal meningitis (usually in combination with flucytosine).",
      "Empiric and definitive therapy for severe, life-threatening systemic fungal infections.",
      "Treatment of invasive mucormycosis or pulmonary aspergillosis."
    ],
    adverseEffects: [
      "Nephrotoxicity: Renal tubular acidosis, vasoconstriction, and direct toxicity. Causes severe wasting of potassium and magnesium (hypokalemia and hypomagnesemia).",
      "Infusion-Related Reactions: Fever, chills ('shake and bake'), headaches, and rigors mediated by cytokine release during IV infusion.",
      "Anemia: Typically normochromic normocytic due to decreased erythropoietin production by renal cells.",
      "Thrombophlebitis in peripheral veins."
    ],
    contraindications: [
      "Hypersensitivity to amphotericin B formulations.",
      "Avoid use of the conventional formulation in pre-existing renal insufficiency when lipid-formulation (liposomal) is available."
    ],
    monitoringConsiderations: [
      "Daily serum electrolytes, specifically monitoring potassium and magnesium levels (aggressive supplementation is almost universally required).",
      "Renal panel (BUN and serum creatinine) daily or multiple times a week to track onset of nephrotoxicity.",
      "Complete blood count (CBC) to monitor hematocrit for drug-induced anemia."
    ],
    clinicalPearls: [
      "Often referred to as 'Amphoterrible' due to its taxing profile. However, its unmatched spectrum and rapid bactericidal-like kill rate keep it indispensable for induction of serious fungal diseases.",
      "Liposomal Amphotericin B (AmBisome) packages the drug inside a lipid carrier. This selectively delivers the drug to fungal cells while lowering toxic binding to human cell membranes, significantly reduces nephrotoxicity and infusion-related reactions."
    ],
    relatedPathogens: [
      { id: "c-neoformans", name: "Cryptococcus neoformans", relation: "Primary Target" },
      { id: "c-albicans", name: "Candida albicans", relation: "Spectrum Cover" }
    ],
    relatedDiseases: [
      { id: "cryptococcal-meningitis", name: "Cryptococcal Meningitis", relation: "First-Line Treatment" },
      { id: "mucormycosis", name: "Invasive Mucormycosis", relation: "First-Line Treatment" }
    ]
  }
];
