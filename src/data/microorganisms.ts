export interface DiseaseTreatment {
  id: string;
  name: string; // e.g., "Skin/Soft Tissue Infection (SSTI)"
  treatment: string; // e.g., "MSSA: Cephalexin; MRSA: TMP-SMX or Doxycycline"
  route: "PO" | "IV" | "IM" | "IV/PO" | "Supportive" | "multiple";
  clinicalPearl?: string; // High-yield medical school tip
}

export interface Microorganism {
  id: string;
  name: string; // e.g., "Staphylococcus aureus"
  gramStatus: "Gram-positive" | "Gram-negative" | "Acid-fast" | "No Cell Wall" | "Spirochete" | "Gram-variable";
  shape: "Cocci" | "Rods" | "Coccobacillus" | "Diplococci" | "Curved rods" | "Branching rods" | "Spirochetes" | "Pleomorphic rods" | "Pleomorphic";
  arrangement: string; // e.g., "Clusters", "Chains", "Pairs", "None"
  characteristics: string[]; // e.g., ["Catalase-positive", "Coagulase-positive"]
  description: string; // Full text from table or study guide
  diseases: DiseaseTreatment[];
}

export const microorganismsData: Microorganism[] = [
  // GROUP 1: GRAM-POSITIVE COCCI (10)
  {
    id: "s-aureus",
    name: "Staphylococcus aureus",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Clusters",
    characteristics: ["Catalase-positive", "Coagulase-positive", "Beta-hemolytic", "Mannitol-fermenter (yellow)"],
    description: "Gram-positive cocci in clusters; catalase-positive; may be MSSA or MRSA.",
    diseases: [
      {
        id: "sa-ssti",
        name: "Cellulitis / SSTI",
        treatment: "MSSA: cephalexin or dicloxacillin; MRSA: TMP-SMX, doxycycline, or clindamycin",
        route: "PO",
        clinicalPearl: "Oral TMP-SMX or Doxycycline is preferred for uncomplicated CA-MRSA skin infections."
      },
      {
        id: "sa-bacteremia",
        name: "Bacteremia",
        treatment: "MSSA: cefazolin or nafcillin; MRSA: vancomycin or daptomycin",
        route: "IV",
        clinicalPearl: "Never use daptomycin for lung infections because it is inactivated by pulmonary surfactant."
      },
      {
        id: "sa-endocarditis",
        name: "Endocarditis",
        treatment: "MSSA: nafcillin/oxacillin or cefazolin; MRSA: vancomycin",
        route: "IV",
        clinicalPearl: "Requires long-term IV therapy under close monitoring."
      },
      {
        id: "sa-pneumonia",
        name: "Pneumonia",
        treatment: "MSSA: cefazolin/nafcillin; MRSA: vancomycin or linezolid",
        route: "IV",
        clinicalPearl: "MRSA necrotizing pneumonia can follow influenza infections."
      },
      {
        id: "sa-osteomyelitis",
        name: "Osteomyelitis",
        treatment: "Cefazolin/nafcillin for MSSA; vancomycin for MRSA",
        route: "IV",
        clinicalPearl: "Treatment typically lasts for 4 to 6 weeks."
      }
    ]
  },
  {
    id: "s-epidermidis",
    name: "Staphylococcus epidermidis",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Clusters",
    characteristics: ["Catalase-positive", "Coagulase-negative", "Novobiocin-sensitive", "Urease-positive"],
    description: "Gram-positive cocci in clusters. Normal skin flora; secretes biofilms on prosthetic joints, heart valves, and indwelling central catheters.",
    diseases: [
      {
        id: "se-prosthetic",
        name: "Prosthetic Device / Catheter Infection",
        treatment: "Vancomycin + Rifampin (for biofilm penetration).",
        route: "IV",
        clinicalPearl: "Biofilm production allows it to adhere to foreign materials. Often requires device removal."
      }
    ]
  },
  {
    id: "s-saprophyticus",
    name: "Staphylococcus saprophyticus",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Clusters",
    characteristics: ["Catalase-positive", "Coagulase-negative", "Novobiocin-resistant", "Urease-positive"],
    description: "Gram-positive cocci in clusters. Frequently colonizes the female genital tract. Second most common cause of uncomplicated UTI in young, sexually active females.",
    diseases: [
      {
        id: "ss-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Nitrofurantoin, Amoxicillin-clavulanate, or TMP-SMX.",
        route: "PO",
        clinicalPearl: "Classic 'honeymoon cystitis' finding in young women; distinguished from S. epidermidis by novobiocin resistance."
      }
    ]
  },
  {
    id: "s-pneumoniae",
    name: "Streptococcus pneumoniae",
    gramStatus: "Gram-positive",
    shape: "Diplococci",
    arrangement: "Lancet-shaped pairs",
    characteristics: ["Catalase-negative", "Alpha-hemolytic", "Optochin-sensitive", "Bile-soluble", "Encapsulated"],
    description: "Gram-positive lancet-shaped diplococci; alpha-hemolytic.",
    diseases: [
      {
        id: "sp-cap",
        name: "Pneumonia",
        treatment: "Ceftriaxone + azithromycin or respiratory fluoroquinolone",
        route: "IV/PO",
        clinicalPearl: "Produces 'rusty' colored sputum. Key risk in splenectomy patients due to polysaccharide capsule."
      },
      {
        id: "sp-meningitis",
        name: "Meningitis",
        treatment: "Ceftriaxone + vancomycin",
        route: "IV",
        clinicalPearl: "Give dexamethasone first to reduce clinical swelling and long-term hearing loss."
      },
      {
        id: "sp-otitis",
        name: "Otitis Media",
        treatment: "High-dose amoxicillin",
        route: "PO",
        clinicalPearl: "Most common bacterial cause of pediatric middle ear infections."
      },
      {
        id: "sp-sinusitis",
        name: "Sinusitis",
        treatment: "Amoxicillin-clavulanate",
        route: "PO",
        clinicalPearl: "Usually viral; reserve antibiotic therapy for prolonged symptoms (e.g., >10 days)."
      }
    ]
  },
  {
    id: "s-pyogenes",
    name: "Streptococcus pyogenes (Group A)",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Chains",
    characteristics: ["Catalase-negative", "Beta-hemolytic", "Bacitracin-sensitive", "PYR-positive"],
    description: "Group A Streptococcus; Gram positive cocci in chains; beta hemolytic.",
    diseases: [
      {
        id: "spy-pharyngitis",
        name: "Pharyngitis",
        treatment: "Penicillin V or amoxicillin",
        route: "PO",
        clinicalPearl: "We treat pharyngitis primarily to prevent Rheumatic Fever, which has immunologic cross-reactivity (M-protein)."
      },
      {
        id: "spy-cellulitis",
        name: "Cellulitis / SSTI",
        treatment: "Cephalexin or penicillin",
        route: "PO",
        clinicalPearl: "A classic cause of localized, spreading acute skin infections."
      },
      {
        id: "spy-necrotizing",
        name: "Necrotizing Fasciitis",
        treatment: "Penicillin + clindamycin",
        route: "IV",
        clinicalPearl: "Clindamycin is added as an toxin-suppression agent to halt streptococcal pyrogenic toxin production."
      },
      {
        id: "spy-scarlet",
        name: "Scarlet Fever",
        treatment: "Penicillin or amoxicillin",
        route: "PO",
        clinicalPearl: "Features a diffuse sand-paper rash, strawberry tongue, and circumoral pallor."
      }
    ]
  },
  {
    id: "s-agalactiae",
    name: "Streptococcus agalactiae (Group B)",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Chains",
    characteristics: ["Catalase-negative", "Beta-hemolytic", "Bacitracin-resistant", "CAMP test positive", "Hippurate-positive"],
    description: "Group B Streptococcus; Gram positive cocci in chains.",
    diseases: [
      {
        id: "sag-sepsis",
        name: "Neonatal Sepsis",
        treatment: "Ampicillin + gentamicin",
        route: "IV",
        clinicalPearl: "Screen mothers at 35-37 weeks. Prophylax positively screened mothers with intrapartum IV Penicillin G."
      },
      {
        id: "sag-meningitis",
        name: "Meningitis",
        treatment: "Ampicillin + cefotaxime",
        route: "IV",
        clinicalPearl: "A principal cause of pediatric central nervous system infection in newborns."
      },
      {
        id: "sag-bacteremia",
        name: "Bacteremia",
        treatment: "Penicillin G or ampicillin",
        route: "IV",
        clinicalPearl: "Can cause severe maternal bacteremia or post-partum endometritis."
      }
    ]
  },
  {
    id: "e-faecalis",
    name: "Enterococcus faecalis",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Pairs/Chains",
    characteristics: ["Catalase-negative", "Gamma-hemolytic", "Growth in 6.5% NaCl", "Bile-esculin positive"],
    description: "Gram-positive cocci in pairs/chains; intrinsic resistance to many antibiotics.",
    diseases: [
      {
        id: "ef-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Ampicillin or nitrofurantoin",
        route: "PO",
        clinicalPearl: "Nitrofurantoin holds superb bladder concentrations but does not act in kidney parenchyma."
      },
      {
        id: "ef-endocarditis",
        name: "Endocarditis",
        treatment: "Ampicillin + ceftriaxone",
        route: "IV",
        clinicalPearl: "Double beta-lactam therapy (Ampicillin + Ceftriaxone) provides high synergy by saturating multiple PBPs without aminoglycoside nephrotoxicity."
      },
      {
        id: "ef-iai",
        name: "Intra-abdominal Infection",
        treatment: "Ampicillin-sulbactam",
        route: "IV",
        clinicalPearl: "Part of polymicrobial abdominal infections, treated with beta-lactamase inhibitor combos."
      }
    ]
  },
  {
    id: "e-faecium",
    name: "Enterococcus faecium",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Pairs/Chains",
    characteristics: ["Catalase-negative", "Bile-esculin positive", "Often Vancomycin-Resistant (VRE)"],
    description: "Gram-positive cocci; commonly vancomycin-resistant (VRE).",
    diseases: [
      {
        id: "efm-vre-bact",
        name: "VRE Bacteremia",
        treatment: "Linezolid or high-dose daptomycin",
        route: "IV",
        clinicalPearl: "Ensure susceptibility checking. Linezolid is bacteriostatic; daptomycin is bactericidal."
      },
      {
        id: "efm-vre-uti",
        name: "VRE UTI",
        treatment: "Linezolid or daptomycin",
        route: "PO",
        clinicalPearl: "Daptomycin does not concentrate well in the urine and is not used unless other options fail."
      }
    ]
  },
  {
    id: "s-bovis",
    name: "Streptococcus bovis (S. gallolyticus)",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Pairs/Chains",
    characteristics: ["Catalase-negative", "Gamma-hemolytic", "Bile-esculin positive", "Unable to grow in 6.5% NaCl"],
    description: "Gram-positive cocci in pairs/chains; resides in colon. Group D Streptococcus. Strong correlation with colonic malignancy.",
    diseases: [
      {
        id: "sb-bacteremia",
        name: "Bacteremia & Endocarditis with Colon Cancer",
        treatment: "Ceftriaxone or Penicillin G.",
        route: "IV",
        clinicalPearl: "Finding S. bovis bacteremia demands a screening colonoscopy to rule out occult colon cancer!"
      }
    ]
  },
  {
    id: "s-mutans",
    name: "Streptococcus mutans",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Chains",
    characteristics: ["Catalase-negative", "Alpha-hemolytic", "Optochin-resistant", "Bile-insoluble"],
    description: "Gram-positive alpha-hemolytic cocci; dental caries organism.",
    diseases: [
      {
        id: "smut-caries",
        name: "Dental Caries",
        treatment: "Fluoride + dental restoration (no antibiotics)",
        route: "Supportive",
        clinicalPearl: "Metabolizes sucrose to synthesize extracellular glucans (dextran), facilitating enamel plaque binding."
      },
      {
        id: "smut-endocarditis",
        name: "Endocarditis",
        treatment: "Penicillin G or ceftriaxone",
        route: "IV",
        clinicalPearl: "Can cause subacute bacterial endocarditis on previously damaged/prosthetic heart valves."
      },
      {
        id: "smut-bacteremia",
        name: "Bacteremia (rare)",
        treatment: "Penicillin",
        route: "IV/PO",
        clinicalPearl: "Usually occurs, following dental procedures or aggressive flossing, transiently."
      }
    ]
  },

  // GROUP 2: GRAM-POSITIVE RODS (12)
  {
    id: "c-difficile",
    name: "Clostridioides difficile",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Anaerobic", "Spore-forming", "Toxin A & B positive"],
    description: "Anaerobic Gram-positive spore forming rod; antibiotic associated colitis.",
    diseases: [
      {
        id: "cd-nonsevere",
        name: "Non-Severe C. difficile Infection",
        treatment: "Fidaxomicin (preferred first-line) or Oral Vancomycin",
        route: "PO",
        clinicalPearl: "Fidaxomicin is preferred by IDSA over oral vancomycin for initial episodes of CDI to prevent recurrences. Metronidazole is restricted to mild cases if first-line options are unavailable."
      },
      {
        id: "cd-severe",
        name: "Severe C. difficile Infection",
        treatment: "Fidaxomicin (preferred first-line) or Oral Vancomycin",
        route: "PO",
        clinicalPearl: "Defined by WBC > 15,000 cells/µL or Creatinine > 1.5 mg/dL. Fidaxomicin is preferred over oral vancomycin by IDSA to limit potential recurrence."
      },
      {
        id: "cd-fulminant",
        name: "Fulminant C. difficile",
        treatment: "Oral + rectal vancomycin + IV metronidazole",
        route: "multiple",
        clinicalPearl: "Presents with hypotension, shock, megacolon, or ileus. Adding instillation of rectal vancomycin bypassing standard intestinal obstruction is standard IDSA protocol."
      }
    ]
  },
  {
    id: "c-tetani",
    name: "Clostridium tetani",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "Strap-like with terminal drumstick spores",
    characteristics: ["Anaerobic", "Spore-forming", "Tetanospasmin neurotoxin"],
    description: "Anaerobic Gram-positive spore forming rod; neurotoxin producer.",
    diseases: [
      {
        id: "ct-tetanus",
        name: "Tetanus",
        treatment: "Metronidazole + tetanus immune globulin (TIG)",
        route: "IV",
        clinicalPearl: "Avoid penicillin as it can act as a GABA antagonist and potentially worsen spasms."
      },
      {
        id: "ct-severe",
        name: "Severe Tetanus",
        treatment: "Metronidazole + TIG + ICU supportive care",
        route: "IV",
        clinicalPearl: "Requires airway control, darkness, and benzodiazepines or neuromuscular blockers to manage spasm storm."
      },
      {
        id: "ct-prophylaxis",
        name: "Wound Prophylaxis",
        treatment: "Tetanus vaccine ± TIG",
        route: "IM",
        clinicalPearl: "Clean minor wounds only need vaccine booster if last doses >10 years ago; dirty wounds get TIG if unvaccinated."
      }
    ]
  },
  {
    id: "c-botulinum",
    name: "Clostridium botulinum",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Anaerobic", "Spore-forming", "Heat-labile Botulinum neurotoxin"],
    description: "Anaerobic Gram-positive spore forming rod; neurotoxin producer.",
    diseases: [
      {
        id: "cb-botulism",
        name: "Botulism",
        treatment: "Botulinum antitoxin + supportive care",
        route: "Supportive",
        clinicalPearl: "Causes symmetric descending flaccid paralysis starting with cranial nerves (diplopia, dysphagia)."
      },
      {
        id: "cb-wound",
        name: "Wound Botulism",
        treatment: "Antitoxin + penicillin or metronidazole",
        route: "IV",
        clinicalPearl: "Usually associated with black tar heroin skin-popping or severe dirty compound wounds."
      },
      {
        id: "cb-infant",
        name: "Infant Botulism",
        treatment: "Human-derived immune globulin (BIG-IV)",
        route: "IV",
        clinicalPearl: "Often called infant floppy-baby syndrome, associated with eating raw honey containing bacterial spores."
      }
    ]
  },
  {
    id: "c-perfringens",
    name: "Clostridium perfringens",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "Large boxcar-shaped rods",
    characteristics: ["Anaerobic", "Double zone of beta-hemolysis on blood agar", "Lecithinase (alpha toxin) positive"],
    description: "Anaerobic, spore-forming boxcar-shaped Gram-positive rod. Produces alpha toxin (lecithinase) that destroys cell membranes. Associated with deep dirty wounds and food contaminated with warmed meats.",
    diseases: [
      {
        id: "cp-gangrene",
        name: "Gas Gangrene (Clostridial Myonecrosis)",
        treatment: "Penicillin G + clindamycin + urgent surgical debridement",
        route: "IV",
        clinicalPearl: "Gas under tissues (crepitus) is highly diagnostic. Urgent amputation or radical mechanical debridement is crucial."
      },
      {
        id: "cp-food",
        name: "Food Poisoning",
        treatment: "Supportive care",
        route: "Supportive",
        clinicalPearl: "Late-onset watery diarrhea (8-21h) due to sporulation of toxin in gut. Self-limiting."
      },
      {
        id: "cp-bacteremia",
        name: "Bacteremia",
        treatment: "Penicillin G or broad-spectrum IV therapy",
        route: "IV",
        clinicalPearl: "Can complicate massive hemolysis and myonecrosis."
      }
    ]
  },
  {
    id: "b-anthracis",
    name: "Bacillus anthracis",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "Chains with medusa-head borders",
    characteristics: ["Aerobic", "Spore-forming", "D-glutamate polypeptide capsule", "Anthrax Toxin (PA + LF + EF)"],
    description: "Large, non-motile aerobic G+ rod forming long chains. Features a unique protein capsule (D-glutamic acid). Major biological threat agent. Transmitted from animal skins.",
    diseases: [
      {
        id: "ba-cutaneous",
        name: "Cutaneous Anthrax",
        treatment: "Ciprofloxacin or doxycycline",
        route: "PO",
        clinicalPearl: "Presents as a painless, ulcerated black eschar surrounded by massive localized edema."
      },
      {
        id: "ba-pulmonary",
        name: "Inhalational Anthrax",
        treatment: "Ciprofloxacin + additional IV agents (e.g., clindamycin, meropenem)",
        route: "IV",
        clinicalPearl: "Widened mediastinum on chest X-ray due to hemorrhagic mediastinitis. Extremely deadly."
      },
      {
        id: "ba-systemic",
        name: "Systemic Anthrax",
        treatment: "Multidrug therapy + antitoxin",
        route: "IV",
        clinicalPearl: "Required for disseminated or meningeal signs in confirmed clinical cases."
      }
    ]
  },
  {
    id: "b-cereus",
    name: "Bacillus cereus",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Aerobic", "Spore-forming", "Heat-stable & Heat-labile toxins"],
    description: "Aerobic spore-forming Gram-positive rod. Spores survive cooking of rice; reheating causes germination and toxin production.",
    diseases: [
      {
        id: "bcer-food",
        name: "Reheated Rice Food Poisoning",
        treatment: "Supportive Care.",
        route: "Supportive",
        clinicalPearl: "Emetic syndrome starts within 1-5 hours (due to preformed heat-stable cerulide toxin), mimics S. aureus."
      }
    ]
  },
  {
    id: "l-monocytogenes",
    name: "Listeria monocytogenes",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "Short single rods",
    characteristics: ["Facultative intracellular", "Tumbling motility at 22°C", "Actin rockets intracellularly", "Cold enrichment"],
    description: "Gram-positive rod; unpasteurized milk, cheeses, cold cuts. Crosses placenta. Does not cause spore forms.",
    diseases: [
      {
        id: "lm-neonatal",
        name: "Meningitis",
        treatment: "Ampicillin + gentamicin",
        route: "IV",
        clinicalPearl: "Always screen pregnant patients; Listeria is a classic neonatal meningitis driver alongside Group B Strep and E. coli."
      },
      {
        id: "lm-adult",
        name: "Meningitis",
        treatment: "Ampicillin ± gentamicin",
        route: "IV",
        clinicalPearl: "Requires empiric ampicillin addition for patients over 50 or immunocompromised due to high Listeria risk."
      },
      {
        id: "lm-bacteremia",
        name: "Bacteremia",
        treatment: "Ampicillin",
        route: "IV",
        clinicalPearl: "Risk is elevated in patients with iron overload or undergoing cancer chemotherapy."
      }
    ]
  },
  {
    id: "c-diphtheriae",
    name: "Corynebacterium diphtheriae",
    gramStatus: "Gram-positive",
    shape: "Pleomorphic rods",
    arrangement: "Chinese letters / club-shaped V/L angles",
    characteristics: ["Metachromatic granules", "Black colonies on Cystine-Tellurite agar", "Elek test for toxigenesis"],
    description: "Club-shaped, non-spore forming G+ pleomorphic rods. Diphtheria toxin ADP-ribosylates Elongation Factor 2 (EF-2), blocking cell translation.",
    diseases: [
      {
        id: "cdiph-respiratory",
        name: "Respiratory Diphtheria",
        treatment: "Erythromycin or penicillin + diphtheria antitoxin",
        route: "IV/PO",
        clinicalPearl: "Gray pseudomembrane over pharynx; scraping causes mucosal bleeding. Can cause myocarditis and neuropathies."
      },
      {
        id: "cdiph-cutaneous",
        name: "Cutaneous Diphtheria",
        treatment: "Erythromycin or penicillin",
        route: "PO",
        clinicalPearl: "Presents as chronic, non-healing ulcers with a gray/dirty-looking membrane."
      },
      {
        id: "cdiph-carrier",
        name: "Carrier State",
        treatment: "Erythromycin",
        route: "PO",
        clinicalPearl: "Helps clear nasopharyngeal populations to prevent transmission of toxigenic strains."
      }
    ]
  },
  {
    id: "n-asteroides",
    name: "Nocardia asteroides",
    gramStatus: "Gram-positive",
    shape: "Branching rods",
    arrangement: "Filamentous branching structures",
    characteristics: ["Aerobic", "Weakly Acid-Fast (modified Kinyoun staining)", "Catalase-positive/Urease-positive"],
    description: "Strictly aerobic branching G+ filaments. Found in soil. Immunocompromised hosts inhale spores, leading to lung abscesses and metastatic CNS brain lesions.",
    diseases: [
      {
        id: "nas-pulmonary",
        name: "Pulmonary Nocardiosis",
        treatment: "TMP-SMX",
        route: "PO",
        clinicalPearl: "Mimics tuberculosis or lung malignancy, but is weakly acid-fast. Use high-dose sulfonamide."
      },
      {
        id: "nas-cns",
        name: "CNS Nocardiosis",
        treatment: "TMP-SMX + imipenem or linezolid",
        route: "IV",
        clinicalPearl: "Multidrug therapy including brain-penetrating agents is required for positive rings in cerebral tissues."
      },
      {
        id: "nas-disseminated",
        name: "Disseminated Infection",
        treatment: "TMP-SMX-based combination therapy",
        route: "IV/PO",
        clinicalPearl: "Frequently spreads to skin/subcutaneous tissue and standard organ sites in transplant recipients."
      }
    ]
  },
  {
    id: "a-israelii",
    name: "Actinomyces israelii",
    gramStatus: "Gram-positive",
    shape: "Branching rods",
    arrangement: "Clumped filamentous colonies with sulfur granules",
    characteristics: ["Anaerobic", "Not Acid-Fast", "Yellow 'Sulfur' granules on discharge"],
    description: "Anaerobic, slow-growing G+ branching filaments. Part of normal oral/GIS flora. Trauma or dental work triggers deep tissue infection.",
    diseases: [
      {
        id: "ais-cervicofacial",
        name: "Cervicofacial Actinomycosis",
        treatment: "Penicillin G or amoxicillin (prolonged therapy)",
        route: "IV/PO",
        clinicalPearl: "Presents as hard, painless, expanding mandibular mass that drains via sinus tracts, releasing yellow sulfur granules."
      },
      {
        id: "ais-thoracic",
        name: "Thoracic Actinomycosis",
        treatment: "Penicillin G IV then oral amoxicillin",
        route: "IV/PO",
        clinicalPearl: "Mimics neoplasm or tuberculosis, often triggered by aspiration of oral contents."
      },
      {
        id: "ais-abdominal",
        name: "Abdominal Actinomycosis",
        treatment: "Penicillin-based prolonged therapy",
        route: "PO",
        clinicalPearl: "Associated historically with long-standing intrauterine devices (IUDs) or ruptured appendos."
      }
    ]
  },
  {
    id: "c-acnes",
    name: "Cutibacterium acnes",
    gramStatus: "Gram-positive",
    shape: "Pleomorphic rods",
    arrangement: "Clumps/Pairs",
    characteristics: ["Anaerobic", "Lipase-positive", "Normal follicular flora"],
    description: "Anaerobic G+ rod. Digests sebum, releasing free fatty acids that provoke inflammatory acne lesions. Also infects implants.",
    diseases: [
      {
        id: "ca-acne",
        name: "Acne Vulgaris",
        treatment: "Topical benzoyl peroxide ± topical retinoids; oral doxycycline if moderate",
        route: "PO",
        clinicalPearl: "PO doxycycline used for inflammatory papulopustular acne primarily as an anti-inflammatory agent."
      },
      {
        id: "ca-prosthetic",
        name: "Prosthetic Joint Infection",
        treatment: "Penicillin or vancomycin (device removal often needed)",
        route: "IV",
        clinicalPearl: "Known for causing low-grade post-arthroplasty shoulder pain several months after surgery."
      },
      {
        id: "ca-postsurgical",
        name: "Post-surgical Infection",
        treatment: "Doxycycline or beta-lactam therapy",
        route: "IV/PO",
        clinicalPearl: "Slow-growing anaerobe; hold cultures for at least 14 days if suspected."
      }
    ]
  },
  {
    id: "lacto-spp",
    name: "Lactobacillus spp.",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "Chains",
    characteristics: ["Aerotolerant anaerobic", "Produces lactic acid", "Maintains low vaginal pH (<4.5)"],
    description: "Gram-positive rod. Beneficial normal mucosal flora inside mouth and vagina. Produces lactic acid to block opportunistic overgrowths.",
    diseases: [
      {
        id: "lact-endocarditis",
        name: "Endocarditis",
        treatment: "Penicillin G ± gentamicin",
        route: "IV",
        clinicalPearl: "Usually highly benign and protective. Rare cause of endocarditis in severely immunocompromised patients."
      },
      {
        id: "lact-bacteremia",
        name: "Bacteremia (immunocompromised)",
        treatment: "Penicillin or ampicillin",
        route: "IV",
        clinicalPearl: "Often occurs at the tail of severe chemotherapy, gut mucositis, or massive probiotic intake."
      },
      {
        id: "lact-probiotic",
        name: "Probiotic-associated infection",
        treatment: "Penicillin-based therapy",
        route: "PO",
        clinicalPearl: "Extremely sensitive to penicillin-focused regimens; intrinsically resistant to vancomycin."
      }
    ]
  },

  // GROUP 3: GRAM-NEGATIVE DIPLOCOCCI (2)
  {
    id: "n-meningitidis",
    name: "Neisseria meningitidis",
    gramStatus: "Gram-negative",
    shape: "Diplococci",
    arrangement: "Pairs (Kidney bean shaped)",
    characteristics: ["Maltose & Glucose fermenter", "Oxidase-positive", "IgA protease producer", "Polysaccharide capsule"],
    description: "Gram-negative diplococci. Columnar spread via respiratory droplets in military barracks or college dorms. Triggers rapid meningococcemia.",
    diseases: [
      {
        id: "nm-meningitis",
        name: "Meningitis",
        treatment: "Ceftriaxone (or cefotaxime) ± vancomycin initially",
        route: "IV",
        clinicalPearl: "Presents with high-grade fever, neck stiffness, and photophobia. Add dexamethasone prior to antibiotics to reduce neurologic damage."
      },
      {
        id: "nm-bacteremia",
        name: "Meningococcemia",
        treatment: "Ceftriaxone IV",
        route: "IV",
        clinicalPearl: "Presents with a rapid petechial purpuric rash. Waterhouse-Friderichsen syndrome is hemorrhagic adrenal infarction and shock."
      },
      {
        id: "nm-prophylaxis",
        name: "Prophylaxis (contacts)",
        treatment: "Rifampin or ciprofloxacin or ceftriaxone",
        route: "PO",
        clinicalPearl: "Close contacts (e.g., roommates or exposure to secretions) must receive prophylaxis; Rifampin is standard but cipro/ceftriaxone are options."
      }
    ]
  },
  {
    id: "n-gonorrhoeae",
    name: "Neisseria gonorrhoeae",
    gramStatus: "Gram-negative",
    shape: "Diplococci",
    arrangement: "Pairs (Intracellular in neutrophils)",
    characteristics: ["Glucose-only fermenter", "Oxidase-positive", "No Capsule", "Thayer-Martin agar growth"],
    description: "Intracellular G- diplococci. STI causing urethritis, cervicitis, PID, septic arthritis, and neonatal ophthalmia.",
    diseases: [
      {
        id: "ng-uncomplicated",
        name: "Uncomplicated Gonorrhea",
        treatment: "Ceftriaxone IM single dose",
        route: "IM",
        clinicalPearl: "Presents with thick purulent penile/cervical discharge. Empirically add doxycycline to cover presumptive Chlamydia co-infection."
      },
      {
        id: "ng-disseminated",
        name: "Disseminated Gonococcal Infection",
        treatment: "Ceftriaxone IV/IM",
        route: "IV",
        clinicalPearl: "Features triad of polyarthralgias, tenosynovitis, and dermatitis (pustular lesions), or purulent septic arthritis."
      },
      {
        id: "ng-pid",
        name: "Gonococcal PID",
        treatment: "Ceftriaxone + doxycycline (± metronidazole)",
        route: "multiple",
        clinicalPearl: "Pelvic Inflammatory Disease risks hydrosalpinx, infertility, ectopic pregnancy, and Fitz-Hugh-Curtis syndrome."
      }
    ]
  },

  // GROUP 4: ENTERIC GRAM-NEGATIVE RODS (16)
  {
    id: "e-coli",
    name: "Escherichia coli",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Lactose-fermenting (pink on MacConkey)", "Indole-positive", "Green metallic sheen on EMB agar"],
    description: "Gram-negative rod; lactose fermenter; indole-positive.",
    diseases: [
      {
        id: "ec-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Nitrofurantoin, TMP-SMX, or fosfomycin",
        route: "PO",
        clinicalPearl: "Oral Nitrofurantoin is first-line. Safe in pregnancy (except at term). Avoid in pyelonephritis."
      },
      {
        id: "ec-pyelo",
        name: "Pyelonephritis",
        treatment: "Ceftriaxone then oral fluoroquinolone/TMP-SMX",
        route: "IV/PO",
        clinicalPearl: "Requires systemic levels to penetrate kidney parenchyma."
      },
      {
        id: "ec-iai",
        name: "Intra-abdominal Infection",
        treatment: "Ceftriaxone + metronidazole",
        route: "IV",
        clinicalPearl: "Metronidazole adds superb coverage against strict gut anaerobes."
      },
      {
        id: "ec-esbl",
        name: "ESBL Infection",
        treatment: "Systemic: Carbapenems (Meropenem/Ertapenem); Cystitis: Nitrofurantoin, TMP-SMX, or Fosfomycin",
        route: "multiple",
        clinicalPearl: "IDSA recommends oral nitrofurantoin, oral sulfamethoxazole-trimethoprim, or oral fosfomycin as first-line for uncomplicated ESBL cystitis, reserving carbapenems for pyelonephritis or systemic infections."
      },
      {
        id: "ec-sepsis",
        name: "Sepsis",
        treatment: "Cefepime, piperacillin-tazobactam, or carbapenem depending on resistance",
        route: "IV",
        clinicalPearl: "Broad empiric coverage should be initiated quickly for systemic bacteremic signs."
      },
      {
        id: "ec-meningitis",
        name: "Meningitis",
        treatment: "Ampicillin + Cefotaxime",
        route: "IV",
        clinicalPearl: "E. coli strains causing neonatal meningitis possess the K1 capsular antigen."
      }
    ]
  },
  {
    id: "k-pneumoniae",
    name: "Klebsiella pneumoniae",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Lactose-fermenting", "Prominent capsule", "Mucoid colonies", "Urease-positive"],
    description: "Encapsulated Gram-negative rod; lactose fermenter.",
    diseases: [
      {
        id: "kp-pneumonia",
        name: "Pneumonia",
        treatment: "Ceftriaxone if susceptible",
        route: "IV",
        clinicalPearl: "Thick mucoid capsule yields 'currant jelly' sputum. Key cause in alcoholics or diabetics."
      },
      {
        id: "kp-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Ceftriaxone or cefepime",
        route: "IV/PO",
        clinicalPearl: "A frequent culprit behind catheter-associated or complicated urosepsis."
      },
      {
        id: "kp-liver",
        name: "Liver Abscess",
        treatment: "Ceftriaxone + drainage",
        route: "IV",
        clinicalPearl: "Classical hypermucoviscous strains can cause key metastatic primary hepatic abscesses."
      },
      {
        id: "kp-esbl",
        name: "ESBL Infection",
        treatment: "Systemic: Carbapenems (Meropenem/Ertapenem); Cystitis: Nitrofurantoin, TMP-SMX, or Fosfomycin",
        route: "multiple",
        clinicalPearl: "For uncomplicated cystitis due to ESBL-producers, oral nitrofurantoin, TMP-SMX, or single-dose fosfomycin are preferred; carbapenems are first-line for invasive or systemic ESBL infections."
      }
    ]
  },
  {
    id: "k-oxytoca",
    name: "Klebsiella oxytoca",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Lactose-fermenting", "Indole-positive", "Urease-positive", "Capsulated"],
    description: "Gram-negative rod; healthcare associated pathogen.",
    diseases: [
      {
        id: "ko-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Cefepime or ceftriaxone if susceptible",
        route: "IV/PO",
        clinicalPearl: "Indole-positive status reliably distinguishes it from K. pneumoniae."
      },
      {
        id: "ko-bacteremia",
        name: "Bacteremia",
        treatment: "Cefepime or carbapenem",
        route: "IV",
        clinicalPearl: "Often occurs in nosocomial settings or with indwelling urinary lines."
      }
    ]
  },
  {
    id: "e-cloacae",
    name: "Enterobacter cloacae",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Lactose-fermenting", "Inducible AmpC beta-lactamase", "Highly motile"],
    description: "Gram-negative rod; inducible AmpC beta-lactamase producer.",
    diseases: [
      {
        id: "ecl-hap",
        name: "Pneumonia",
        treatment: "Cefepime or meropenem",
        route: "IV",
        clinicalPearl: "Cefepime resists hydrolysis by chromosomal AmpC beta-lactamases."
      },
      {
        id: "ecl-bacteremia",
        name: "Bacteremia",
        treatment: "Cefepime or carbapenem",
        route: "IV",
        clinicalPearl: "IDSA strongly warns against using ceftriaxone or ceftazidime for moderate-to-high risk AmpC producers (E. cloacae, K. aerogenes, C. freundii) as it risks rapid emergence of resistance in-vivo, even if initially reported as susceptible. Cefepime or carbapenems are preferred."
      },
      {
        id: "ecl-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Cefepime, fluoroquinolone, or carbapenem depending on resistance",
        route: "IV/PO",
        clinicalPearl: "Avoid simple third-generation cephalosporins (like Ceftriaxone) to prevent resistance emergence."
      },
      {
        id: "ecl-iai",
        name: "Intra-abdominal Infection",
        treatment: "Cefepime + metronidazole",
        route: "IV",
        clinicalPearl: "Usually part of mixed polymicrobial hospital abdominal complications."
      }
    ]
  },
  {
    id: "s-marcescens",
    name: "Serratia marcescens",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Red prodigiosin pigment on agar", "Slow lactose fermenter", "DNase-positive"],
    description: "Gram-negative rod capable of expressing a red-pink pigment at room temperature. Causes opportunistic UTIs and line sepsis.",
    diseases: [
      {
        id: "sm-cabi",
        name: "Catheter-Associated Bloodstream Infection",
        treatment: "Cefepime or carbapenem",
        route: "IV",
        clinicalPearl: "Classically associated with indwelling IV catheters and intensive care hospitalizations."
      },
      {
        id: "sm-pneumonia",
        name: "Pneumonia",
        treatment: "Cefepime",
        route: "IV",
        clinicalPearl: "Occurs primarily in ventilated patients; often highly resistant to earlier cephalosporins."
      },
      {
        id: "sm-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Cefepime or TMP-SMX if susceptible",
        route: "IV/PO",
        clinicalPearl: "Urine may appear red or pink due to the pathogen's characteristic prodigiosin pigment."
      },
      {
        id: "sm-endocarditis",
        name: "Endocarditis",
        treatment: "Cefepime or carbapenem + ID consult",
        route: "IV",
        clinicalPearl: "Associated historically with injection drug users; highly destructive on cardiac valves."
      }
    ]
  },
  {
    id: "p-mirabilis",
    name: "Proteus mirabilis",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "Swarms on agar (concentric rings)",
    characteristics: ["Highly Urease-positive", "Swarming motility", "Produces H2S (black on TSI)"],
    description: "Very motile G- rod. Urease splits urea into ammonia, raising urinary pH (>7.5). High pH precipitates struvite stones.",
    diseases: [
      {
        id: "pm-uncomplicated",
        name: "Urinary Tract Infection (UTI)",
        treatment: "TMP-SMX or ciprofloxacin",
        route: "PO",
        clinicalPearl: "Often fully sensitive to oral beta-lactams and common urinary agents."
      },
      {
        id: "pm-pyelo",
        name: "Pyelonephritis",
        treatment: "Ceftriaxone then oral step-down (TMP-SMX or fluoroquinolone)",
        route: "IV/PO",
        clinicalPearl: "Urinary tract infections can ascend rapidly due to the organism's hyper-flagellated swarming motility."
      },
      {
        id: "pm-cauti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Ceftriaxone or cefepime",
        route: "IV",
        clinicalPearl: "Commonly forms stubborn biofilms on urine drainage catheters."
      },
      {
        id: "pm-stones",
        name: "Struvite Stone Infection",
        treatment: "Antibiotics + urologic source control (ceftriaxone-based)",
        route: "IV/PO",
        clinicalPearl: "Urease splits urea into NH3, raising pH to precipitate magnesium ammonium phosphate (struvite/staghorn) calculi. Bacteria hide in stones; must remove them to cure."
      }
    ]
  },
  {
    id: "p-vulgaris",
    name: "Proteus vulgaris",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "Swarms on agar",
    characteristics: ["Indole-positive", "Urease-positive", "Produces H2S", "Swarming motility"],
    description: "Gram-negative rod, differs from P. mirabilis by being indole-positive and far more resistant to beta-lactams.",
    diseases: [
      {
        id: "pv-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Cefepime or fluoroquinolone",
        route: "IV/PO",
        clinicalPearl: "Indole-positive status signals resistance to ampicillin; requires fluoroquinolones or advanced cephalosporins."
      },
      {
        id: "pv-bacteremia",
        name: "Bacteremia",
        treatment: "Cefepime or carbapenem",
        route: "IV",
        clinicalPearl: "Can arise from ascending urosepsis, especially in patients with urinary tract obstructions."
      }
    ]
  },
  {
    id: "m-morganii",
    name: "Morganella morganii",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Urease-positive", "Indole-positive", "Phenylalanine deaminase positive"],
    description: "Opportunistic G- rod found in colon. Highly associated with healthcare infections and post-operative complications.",
    diseases: [
      {
        id: "mm-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Cefepime or piperacillin-tazobactam",
        route: "IV/PO",
        clinicalPearl: "Usually hospital-acquired; avoid simple earlier cephalosporins to prevent treatment failure."
      },
      {
        id: "mm-bacteremia",
        name: "Bacteremia",
        treatment: "Cefepime or carbapenem",
        route: "IV",
        clinicalPearl: "Usually associated with severe underlying hepatobiliary pathology or indwelling urinary catheters."
      },
      {
        id: "mm-wound",
        name: "Cellulitis / SSTI",
        treatment: "Cefepime if susceptible",
        route: "IV/PO",
        clinicalPearl: "Often occurs post-operatively following major abdominal or pelvic operations."
      },
      {
        id: "mm-iai",
        name: "Intra-abdominal Infection",
        treatment: "Cefepime + metronidazole",
        route: "IV",
        clinicalPearl: "Part of mixed, synergistic polymicrobial gut surgical leakage issues."
      }
    ]
  },
  {
    id: "c-freundii",
    name: "Citrobacter freundii",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Lactose-fermenting (slow)", "Produces H2S", "Citrate-positive", "AmpC beta-lactamase carrier"],
    description: "Gram-negative rod; utilizes citrate as sole carbon source. Known for hospital-acquired infections, expressing AmpC.",
    diseases: [
      {
        id: "cf-hap",
        name: "Pneumonia",
        treatment: "Cefepime or meropenem",
        route: "IV",
        clinicalPearl: "AmpC carrier risking rapid active resistance if treated with ceftriaxone or ceftazidime alone."
      },
      {
        id: "cf-bacteremia",
        name: "Bacteremia",
        treatment: "Cefepime or carbapenem",
        route: "IV",
        clinicalPearl: "Can cause acute, severe sepsis in debilitated or neutropenic patients."
      },
      {
        id: "cf-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Cefepime or fluoroquinolone if susceptible",
        route: "IV/PO",
        clinicalPearl: "Common in patients who have undergone urinary tract instrumentation or surgeries."
      },
      {
        id: "cf-iai",
        name: "Intra-abdominal Infection",
        treatment: "Cefepime + metronidazole",
        route: "IV",
        clinicalPearl: "Usually part of a polymicrobial mix. Metronidazole provides excellent coverage of obligate anaerobes."
      }
    ]
  },
  {
    id: "c-koseri",
    name: "Citrobacter koseri",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Lactose-fermenting (slow)", "H2S negative", "Hydrogen sulfide negative", "Citrate-positive"],
    description: "Gram-negative rod. Infamous trigger of neonatal CNS abscesses and meningitis inside nurseries.",
    diseases: [
      {
        id: "ck-meningitis",
        name: "Meningitis",
        treatment: "Meropenem or cefepime (IV, prolonged course)",
        route: "IV",
        clinicalPearl: "Requires careful lumbar puncture and immediate initiation of broad CNS-penetrating agents."
      },
      {
        id: "ck-abscess",
        name: "Brain Abscess",
        treatment: "Meropenem + neurosurgical drainage if needed",
        route: "IV",
        clinicalPearl: "Strong neurotropic potential; neonatal meningitis with C. koseri very often forms localized brain abscesses."
      },
      {
        id: "ck-bacteremia",
        name: "Bacteremia",
        treatment: "Cefepime or carbapenem depending on susceptibility",
        route: "IV",
        clinicalPearl: "Often healthcare-associated, occurring in fragile infants or ICU patients."
      }
    ]
  },
  {
    id: "s-typhi",
    name: "Salmonella enterica Typhi",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Produces H2S (black on TSI)", "Non-lactose fermenter", "Acid-sensitive", "Vi capsular antigen"],
    description: "Gram-negative enteric rod; causes systemic enteric fever.",
    diseases: [
      {
        id: "st-fever",
        name: "Typhoid Fever",
        treatment: "Ceftriaxone or azithromycin",
        route: "IV/PO",
        clinicalPearl: "Presents with step-ladder high fever, rose spots on abdomen, and relative bradycardia."
      },
      {
        id: "st-severe",
        name: "Severe/Systemic Typhoid",
        treatment: "Ceftriaxone IV (or carbapenem if resistant)",
        route: "IV",
        clinicalPearl: "Watch closely for life-threatening intestinal perforation near the terminal ileum (Peyer's patches)."
      },
      {
        id: "st-bacteremia",
        name: "Bacteremia",
        treatment: "Ceftriaxone or azithromycin depending on susceptibility",
        route: "IV",
        clinicalPearl: "Spreads systemically through macrophages; high fever and toxic state are common."
      },
      {
        id: "st-carrier",
        name: "Chronic Carrier State",
        treatment: "Ciprofloxacin or ampicillin",
        route: "PO",
        clinicalPearl: "Organisms reside long-term in the gallbladder; cholecystectomy is occasionally required for clearance."
      }
    ]
  },
  {
    id: "s-paratyphi",
    name: "Salmonella enterica Paratyphi",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Produces H2S", "Non-lactose fermenter", "Vi capsular antigen negative frequently"],
    description: "Gram-negative enteric rod; causes enteric fever similar to typhoid.",
    diseases: [
      {
        id: "sp-para",
        name: "Paratyphoid Fever",
        treatment: "Ceftriaxone or azithromycin",
        route: "IV/PO",
        clinicalPearl: "Spread via contaminated food or water in tropical regions. Monitored similarly to classic typhoid."
      },
      {
        id: "sp-enteric",
        name: "Enteric Fever",
        treatment: "Ceftriaxone or azithromycin",
        route: "IV/PO",
        clinicalPearl: "Often milder course than S. typhi, but remains highly systemic and infectious."
      },
      {
        id: "sp-bacteremia",
        name: "Bacteremia",
        treatment: "Ceftriaxone",
        route: "IV",
        clinicalPearl: "Can seed vascular sites or cause osteomyelitis in vulnerable patient populations."
      }
    ]
  },
  {
    id: "s-nontyphoidal",
    name: "Non-typhoidal Salmonella",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Produces H2S (black on TSI)", "Non-lactose fermenter", "Acid-sensitive", "Animal reservoirs (reptiles, poultry)"],
    description: "Gram-negative foodborne pathogen; invasive disease in immunocompromised.",
    diseases: [
      {
        id: "sn-gastro",
        name: "Gastroenteritis",
        treatment: "Supportive care (fluids)",
        route: "Supportive",
        clinicalPearl: "Commonly self-limiting. Antibiotics are withheld in uncomplicated cases as they delay clearance."
      },
      {
        id: "sn-invasive",
        name: "Invasive Salmonellosis",
        treatment: "Ceftriaxone",
        route: "IV",
        clinicalPearl: "A serious condition in immunocompromised patients, infants, and seniors."
      },
      {
        id: "sn-bacteremia",
        name: "Bacteremia",
        treatment: "Ceftriaxone or fluoroquinolone if susceptible",
        route: "IV/PO",
        clinicalPearl: "High risk of vascular seeding, leading to mycotic aneurysms, especially in the elderly."
      },
      {
        id: "sn-osteo",
        name: "Osteomyelitis (e.g., sickle cell disease)",
        treatment: "Ceftriaxone or fluoroquinolone with prolonged therapy",
        route: "IV/PO",
        clinicalPearl: "Sickle cell patients are functionally asplenic; microvascular bone necrosis allows colonizing Salmonella to settle, causing osteomyelitis."
      }
    ]
  },
  {
    id: "s-sonnei",
    name: "Shigella sonnei",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Non-lactose fermenter", "Acid-stable (extremely low infectious dose)", "Immotile", "No H2S"],
    description: "Gram-negative non-motile rod; highly contagious enteric pathogen.",
    diseases: [
      {
        id: "sson-mild",
        name: "Shigellosis (mild)",
        treatment: "Supportive care; azithromycin if needed",
        route: "Supportive",
        clinicalPearl: "High transmission in daycare centers. Extremely low infectious dose (10-100 bacteria) resists stomach acid."
      },
      {
        id: "sson-modsevere",
        name: "Shigellosis (moderate–severe)",
        treatment: "Azithromycin or ceftriaxone",
        route: "IV/PO",
        clinicalPearl: "Used to limit spread and shorten duration of symptoms."
      },
      {
        id: "sson-dysentery",
        name: "Dysentery",
        treatment: "Azithromycin or ceftriaxone",
        route: "IV/PO",
        clinicalPearl: "Can cause high fevers, abdominal cramps, and tenesmus with bloody, mucoid volume."
      }
    ]
  },
  {
    id: "s-flexneri",
    name: "Shigella flexneri",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Non-lactose fermenter", "Immotile", "No H2S", "Acid-stable"],
    description: "Gram-negative rod; invasive enteric pathogen causing bacillary dysentery.",
    diseases: [
      {
        id: "sf-shigellosis",
        name: "Shigellosis",
        treatment: "Azithromycin or ceftriaxone",
        route: "IV/PO",
        clinicalPearl: "Key cause of bacillary dysentery in resource-poor areas. Highly infectious."
      },
      {
        id: "sf-severe",
        name: "Severe bloody diarrhea",
        treatment: "Ceftriaxone or azithromycin",
        route: "IV/PO",
        clinicalPearl: "Always prioritize correction of dehydration. Monitor for systemic complications."
      },
      {
        id: "sf-outbreak",
        name: "Outbreak-related infection",
        treatment: "Azithromycin (first-line in many IDSA-aligned regimens)",
        route: "PO",
        clinicalPearl: "Azithromycin is heavily leveraged as empirical outbreak treatment due to oral ease and safety details."
      },
      {
        id: "sf-reactive-arthritis",
        name: "Reactive Arthritis",
        treatment: "Supportive care + NSAIDs",
        route: "Supportive",
        clinicalPearl: "Potential trigger of Reiter's reactive syndrome: 'Can't see, can't pee, can't climb a tree'."
      }
    ]
  },
  {
    id: "s-dysenteriae",
    name: "Shigella dysenteriae",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Shiga Toxin production", "Immotile", "No H2S", "Non-lactose fermenter"],
    description: "Gram-negative rod producing potent Shiga Toxin (inactivates 60S ribosome). Leads to severe toxic mucosal damage and hemolytic uremic syndrome (HUS).",
    diseases: [
      {
        id: "sdys-dysentery",
        name: "Bacillary Dysentery",
        treatment: "Supportive care (avoid antibiotics unless severe, to prevent HUS risk)",
        route: "Supportive",
        clinicalPearl: "Produces Shiga toxin, causing mucosal cell death and severe sloughing, leading to bloody stools with mucus."
      },
      {
        id: "sdys-hus",
        name: "HUS (Hemolytic Uremic Syndrome)",
        treatment: "Supportive care (dialysis, plasmapheresis if indicated)",
        route: "Supportive",
        clinicalPearl: "HUS displays thrombocytopenia, microangiopathic hemolytic anemia, and acute kidney injury. Antibiotics increase toxin surge."
      }
    ]
  },

  // GROUP 5: OTHER G- RODS, CURVED RODS, COCCOBACILLI (16)
  {
    id: "p-aeruginosa",
    name: "Pseudomonas aeruginosa",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Non-lactose fermenting", "Oxidase-positive", "Pyocyanin (green/blue pigment)", "Sweet grape-like odor"],
    description: "Non-lactose fermenting Gram-negative rod; highly resistant opportunistic pathogen.",
    diseases: [
      {
        id: "pa-hap-vap",
        name: "Pneumonia",
        treatment: "Cefepime, piperacillin-tazobactam, or meropenem",
        route: "IV",
        clinicalPearl: "Common in cystic fibrosis (biofilms) and severe burns; often double-covered empirically."
      },
      {
        id: "pa-bacteremia",
        name: "Bacteremia",
        treatment: "Cefepime or piperacillin-tazobactam",
        route: "IV",
        clinicalPearl: "Requires immediate active antipseudomonal agent; double-covering should be considered in septic shock."
      },
      {
        id: "pa-uti",
        name: "Urinary Tract Infection (UTI)",
        treatment: "Cefepime or fluoroquinolone if susceptible",
        route: "IV/PO",
        clinicalPearl: "Avoid nitrofurantoin or simple first-generation cephalosporins; usually associated with urinary catheters."
      },
      {
        id: "pa-neutropenic",
        name: "Neutropenic Fever",
        treatment: "Cefepime, piperacillin-tazobactam, or meropenem",
        route: "IV",
        clinicalPearl: "Requires immediate empiric IV coverage. Monotherapy with an antipseudomonal beta-lactam is standard."
      },
            {
        id: "pa-otitis-0",
        name: "Malignant Otitis Externa",
        treatment: "Ciprofloxacin",
        route: "IV/PO",
        clinicalPearl: "Ciprofloxacin is the only reliable oral choice against Pseudomonas. Swimmer's ear clinic rules."
      },
      {
        id: "pa-otitis-1",
        name: "Folliculitis",
        treatment: "Ciprofloxacin",
        route: "IV/PO",
        clinicalPearl: "Ciprofloxacin is the only reliable oral choice against Pseudomonas. Swimmer's ear clinic rules."
      },
      {
        id: "pa-dtr",
        name: "Difficult-to-Treat Resistant (DTR-P)",
        treatment: "Ceftolozane-tazobactam, Ceftazidime-avibactam, or Imipenem-relebactam",
        route: "IV",
        clinicalPearl: "DTR-P is defined by resistance to all traditional beta-lactams and fluoroquinolones. IDSA recommends these novel beta-lactam/beta-lactamase inhibitors as preferred first-line choices."
      }
    ]
  },
  {
    id: "a-baumannii",
    name: "Acinetobacter baumannii",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "Pairs/Short chains",
    characteristics: ["Oxidase-negative", "Strict aerobe", "Multi-drug resistant (MDR)"],
    description: "Gram-negative coccobacillus; MDR hospital pathogen, survives on surfaces.",
    diseases: [
      {
        id: "ab-vap",
        name: "Pneumonia",
        treatment: "Sulbactam-based therapy (ampicillin-sulbactam if susceptible); MDR: polymyxins (colistin) or cefiderocol",
        route: "IV",
        clinicalPearl: "Sulbactam has unique direct bactericidal efficacy against Acinetobacter, demanding huge therapeutic levels."
      },
      {
        id: "ab-bacteremia",
        name: "Bacteremia",
        treatment: "Ampicillin-sulbactam if susceptible; otherwise polymyxin-based regimen or cefiderocol",
        route: "IV",
        clinicalPearl: "Common in patients with indwelling medical devices in intensive care settings."
      },
      {
        id: "ab-wound",
        name: "Cellulitis / SSTI",
        treatment: "Ampicillin-sulbactam or carbapenem if susceptible + source control",
        route: "IV",
        clinicalPearl: "Commonly contaminates war wounds or trauma sites; active source control is vital."
      },
      {
        id: "ab-catheter",
        name: "Catheter-Associated Infection",
        treatment: "Device removal + targeted IV therapy based on susceptibilities",
        route: "IV",
        clinicalPearl: "Prompt line or catheter removal is critical to resolve persistent bacteremia."
      }
    ]
  },
  {
    id: "c-jejuni",
    name: "Campylobacter jejuni",
    gramStatus: "Gram-negative",
    shape: "Curved rods",
    arrangement: "S-shaped / seagull wings",
    characteristics: ["Thermophilic (grows at 42°C)", "Oxidase-positive", "Motile (darting)"],
    description: "Curved Gram-negative rod; common foodborne pathogen (poultry).",
    diseases: [
      {
        id: "cj-gastro",
        name: "Acute Gastroenteritis",
        treatment: "Supportive care (fluids)",
        route: "Supportive",
        clinicalPearl: "Presents with bloody inflammatory diarrhea. Self-limiting in most hosts."
      },
      {
        id: "cj-severe",
        name: "Severe or prolonged diarrhea",
        treatment: "Azithromycin",
        route: "PO",
        clinicalPearl: "Indicated for high fevers, bloody stools, or symptoms lasting over a week."
      },
      {
        id: "cj-invasive",
        name: "Invasive disease (rare)",
        treatment: "Azithromycin or fluoroquinolone if susceptible",
        route: "PO",
        clinicalPearl: "Strong post-infection trigger of Guillain-Barré syndrome via molecular mimicry of gangliosides."
      }
    ]
  },
  {
    id: "c-coli",
    name: "Campylobacter coli",
    gramStatus: "Gram-negative",
    shape: "Curved rods",
    arrangement: "S-shaped",
    characteristics: ["Thermophilic", "Oxidase-positive", "Differentiated by hippurate hydrolysis negative"],
    description: "Curved Gram-negative rod; similar to C. jejuni.",
    diseases: [
      {
        id: "cc-gastro",
        name: "Gastroenteritis",
        treatment: "Supportive care",
        route: "Supportive",
        clinicalPearl: "Commonly associated with undercooked pork. Indistinguishable clinically from C. jejuni."
      },
      {
        id: "cc-severe",
        name: "Severe diarrhea",
        treatment: "Azithromycin",
        route: "PO",
        clinicalPearl: "Binds to 50S ribosomes to shorten illness in severe cases."
      },
      {
        id: "cc-persistent",
        name: "Persistent infection",
        treatment: "Azithromycin or fluoroquinolone depending on susceptibility",
        route: "PO",
        clinicalPearl: "Requires careful guidance via susceptibilities due to rising fluoroquinolone resistance."
      }
    ]
  },
  {
    id: "v-cholerae",
    name: "Vibrio cholerae",
    gramStatus: "Gram-negative",
    shape: "Curved rods",
    arrangement: "Comma-shaped with flagella",
    characteristics: ["Grows on TCBS agar (yellow/orange)", "Oxidase-positive", "Cholera Toxin (activates Gs/cAMP)"],
    description: "Curved Gram-negative rod; toxin-mediated secretory diarrhea.",
    diseases: [
      {
        id: "vch-severe",
        name: "Cholera (severe watery diarrhea)",
        treatment: "Aggressive IV/oral rehydration + doxycycline or azithromycin",
        route: "multiple",
        clinicalPearl: "Profuse, odorless 'rice-water' stool (up to 15L/day). Dehydration must be treated aggressively."
      },
      {
        id: "vch-moderate",
        name: "Moderate cholera",
        treatment: "Oral rehydration + azithromycin",
        route: "PO",
        clinicalPearl: "Speeds clinical resolution and reduces overall diarrhea volume in less severe forms."
      },
      {
        id: "vch-dehydration",
        name: "Severe dehydration",
        treatment: "IV fluids + doxycycline/azithromycin",
        route: "IV",
        clinicalPearl: "Immediate IV fluid restoration is lifesaving; do not rely on oral agents initially."
      }
    ]
  },
  {
    id: "v-vulnificus",
    name: "Vibrio vulnificus",
    gramStatus: "Gram-negative",
    shape: "Curved rods",
    arrangement: "None",
    characteristics: ["Oxidase-positive", "Halophilic (demands salt)", "Acquired from warm ocean water or oysters"],
    description: "Curved Gram-negative rod; halophilic; seawater exposure; rapidly progressive infection.",
    diseases: [
      {
        id: "vv-wound",
        name: "Cellulitis / SSTI",
        treatment: "Doxycycline + ceftazidime",
        route: "IV",
        clinicalPearl: "Enters through cuts in warm brackish seawater. Demands rapid surgical debridement."
      },
      {
        id: "vv-sepsis",
        name: "Sepsis",
        treatment: "Doxycycline + ceftazidime (urgent IV therapy)",
        route: "IV",
        clinicalPearl: "Oyster-borne septicemia. Patients with liver disease/hemochromatosis are at extremely high risk."
      },
      {
        id: "vv-gastro",
        name: "Gastroenteritis",
        treatment: "Supportive care (fluids)",
        route: "Supportive",
        clinicalPearl: "Causes acute self-limiting diarrhea in completely healthy hosts after dining on raw shellfish."
      }
    ]
  },
  {
    id: "v-parahaemolyticus",
    name: "Vibrio parahaemolyticus",
    gramStatus: "Gram-negative",
    shape: "Curved rods",
    arrangement: "None",
    characteristics: ["Halophilic", "TCBS growth (green colonies)", "Kanagawa phenomenon positive"],
    description: "Curved Gram-negative rod; seafood-associated pathogen.",
    diseases: [
      {
        id: "vpara-gastro",
        name: "Acute Gastroenteritis",
        treatment: "Supportive care (fluids, electrolytes)",
        route: "Supportive",
        clinicalPearl: "Very common presentation after sushi or oyster banquets. Resolves in 2-3 days without antibiotics."
      },
      {
        id: "vpara-severe",
        name: "Severe Diarrhea",
        treatment: "Azithromycin (if needed)",
        route: "PO",
        clinicalPearl: "Antibacterials are reserved solely for prolonged or highly severe diarrhea presentations."
      },
      {
        id: "vpara-mild",
        name: "Mild Foodborne Illness",
        treatment: "No antibiotics (supportive only)",
        route: "Supportive",
        clinicalPearl: "Ensuring hydration is the sole necessity; resolves completely on its own."
      }
    ]
  },
  {
    id: "y-pestis",
    name: "Yersinia pestis",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Safety-pin appearance (Wayside/Giemsa stain)", "Capsulated (F1 antigen)", "Zoonotic (fleas on rodents)"],
    description: "Gram-negative coccobacillus; flea-borne zoonosis causing plague.",
    diseases: [
      {
        id: "yp-bubonic",
        name: "Bubonic Plague",
        treatment: "Gentamicin or streptomycin",
        route: "IV",
        clinicalPearl: "Presents with extremely swollen, hot, agonizingly painful lymph nodes (buboes) in groin or axilla."
      },
      {
        id: "yp-pneumonic",
        name: "Pneumonic Plague",
        treatment: "Gentamicin + respiratory isolation",
        route: "IV",
        clinicalPearl: "Highly lethal; spreads person-to-person via respiratory droplets. Prompts immediate strict quarantine."
      },
      {
        id: "yp-septicemic",
        name: "Septicemic Plague",
        treatment: "Gentamicin or streptomycin",
        route: "IV",
        clinicalPearl: "Sepsis leading to tissue necrosis, gangrene of extremities ('black death'), and severe DIC."
      }
    ]
  },
  {
    id: "y-enterocolitica",
    name: "Yersinia enterocolitica",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Cold enrichment growth", "Urease-positive", "Acquired from undercooked pork (chitterlings)"],
    description: "Gram-negative rod; foodborne (pork) infection; mesenteric lymphadenitis mimic.",
    diseases: [
      {
        id: "ye-enterocolitis",
        name: "Enterocolitis",
        treatment: "Supportive care",
        route: "Supportive",
        clinicalPearl: "Diarrhea syndrome, often in young youngsters; can survive and grow in cold environments."
      },
      {
        id: "ye-severe",
        name: "Severe or invasive disease",
        treatment: "Ciprofloxacin or TMP-SMX",
        route: "IV/PO",
        clinicalPearl: "Used for elderly, iron-overloaded, or immunocompromised patients at risk of bacteremia."
      },
      {
        id: "ye-mesenteric",
        name: "Mesenteric Adenitis",
        treatment: "Supportive care or antibiotics if severe",
        route: "Supportive",
        clinicalPearl: "Swollen mesenteric lymph nodes concentrating around terminal ileum, mimicking acute appendicitis (pseudoappendicitis)."
      },
      {
        id: "ye-reactive",
        name: "Reactive Arthritis",
        treatment: "Supportive care + NSAIDs",
        route: "PO",
        clinicalPearl: "Associated with HLA-B27; occurs weeks after the resolution of diarrheal symptoms."
      }
    ]
  },
  {
    id: "h-influenzae",
    name: "Haemophilus influenzae",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Requires Factor V (NAD) & X (hemin) for growth", "Chocolate agar growth", "Encapsulated (Type B is most virulent)"],
    description: "Gram-negative coccobacillus; respiratory tract pathogen.",
    diseases: [
      {
        id: "hi-meningitis",
        name: "Meningitis",
        treatment: "Ceftriaxone or cefotaxime",
        route: "IV",
        clinicalPearl: "Always double-check immunization records. Hib conjugate vaccine has drastically reduced childhood meningitis."
      },
      {
        id: "hi-epiglottitis",
        name: "Epiglottitis",
        treatment: "Ceftriaxone + airway management",
        route: "IV",
        clinicalPearl: "Classic pediatric emergency: drooling, respiratory 'tripod' positioning, 'thumbprint sign' on lateral neck films."
      },
      {
        id: "hi-otitis",
        name: "Otitis Media",
        treatment: "Amoxicillin or amoxicillin-clavulanate",
        route: "PO",
        clinicalPearl: "Often caused by non-typeable (unencapsulated) strains; amoxicillin is standard initial selection."
      },
      {
        id: "hi-copd",
        name: "COPD Exacerbation",
        treatment: "Amoxicillin-clavulanate or doxycycline",
        route: "PO",
        clinicalPearl: "Common cause of exacerbations in patients with chronic obstructive pulmonary disease (COPD)."
      }
    ]
  },
  {
    id: "b-pertussis",
    name: "Bordetella pertussis",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Bordet-Gengou or Regan-Lowe media", "Pertussis toxin ADP-ribosylates Gi", "Strict aerobe"],
    description: "Gram-negative coccobacillus causing 'whooping cough'.",
    diseases: [
      {
        id: "bp-pertussis",
        name: "Whooping Cough (Pertussis)",
        treatment: "Azithromycin",
        route: "PO",
        clinicalPearl: "Treat in first catarrhal phase. Once paroxysmal whoops develop, antibiotics only serve to limit contagion."
      },
      {
        id: "bp-prophylaxis",
        name: "Post-exposure Prophylaxis",
        treatment: "Azithromycin",
        route: "PO",
        clinicalPearl: "High-priority PEP should be given to all household contacts regardless of vaccination status."
      },
      {
        id: "bp-infant",
        name: "Severe Infant Infection",
        treatment: "Azithromycin + supportive care",
        route: "IV/PO",
        clinicalPearl: "Infants under 6 months are at extremely high risk of apnea, severe cough, and hypoxemia."
      }
    ]
  },
  {
    id: "l-pneumophila",
    name: "Legionella pneumophila",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "Silver stain visualization",
    characteristics: ["Charcoal yeast extract (BCYE) agar with iron/cysteine", "Waterborne aerosol transmission", "Hyponatremia common"],
    description: "Poorly staining G- rod; water reservoir pathogen causing pneumonia.",
    diseases: [
      {
        id: "lp-legionnaires",
        name: "Legionnaires’ Disease",
        treatment: "Azithromycin or levofloxacin",
        route: "IV/PO",
        clinicalPearl: "Beta-lactams are useless (intracellular pathogen). Look for lung consolidation, high fever, diarrhea, and hyponatremia."
      },
      {
        id: "lp-severe",
        name: "Pneumonia",
        treatment: "Levofloxacin or azithromycin IV",
        route: "IV",
        clinicalPearl: "Requires intensive respiratory tracking and high-potency macrolide or quinolone coverage."
      },
      {
        id: "lp-pontiac",
        name: "Pontiac Fever",
        treatment: "Supportive care",
        route: "Supportive",
        clinicalPearl: "A mild, self-limiting flu-like illness without signs of pneumonia; resolves spontaneously."
      }
    ]
  },
  {
    id: "h-pylori",
    name: "Helicobacter pylori",
    gramStatus: "Gram-negative",
    shape: "Curved rods",
    arrangement: "Helical/Flagellated",
    characteristics: ["Highly Urease-positive", "Oxidase-positive", "Catalase-positive"],
    description: "Curved, motile G- rod. Synthesizes urease to convert gastric urea into neutralizing ammonia cloud.",
    diseases: [
      {
        id: "hp-ulcers",
        name: "Peptic Ulcer Disease",
        treatment: "Bismuth quadruple therapy (PPI + bismuth + tetracycline + metronidazole)",
        route: "PO",
        clinicalPearl: "Active therapy taken strictly over 10-14 days. Eradicates infection and heals underlying gastric ulcers."
      },
      {
        id: "hp-gastritis",
        name: "Chronic Gastritis",
        treatment: "Same eradication therapy (bismuth-based or concomitant therapy)",
        route: "PO",
        clinicalPearl: "Halts chronic inflammatory processes leading to gastric mucous atrophy."
      },
      {
        id: "hp-lymphoma",
        name: "Gastric MALT Lymphoma",
        treatment: "H. pylori eradication regimen",
        route: "PO",
        clinicalPearl: "Eradicating the bacterial infection often results in complete regression of early-stage MALT tumors."
      }
    ]
  },
  {
    id: "b-melitensis",
    name: "Brucella melitensis",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Facultative intracellular", "Undulant fever", "Acquired from unpasteurized goat cheese"],
    description: "Small gram-negative coccobacillus infecting animal herds. Spreads to humans who ingest unpasteurized dairy products.",
    diseases: [
      {
        id: "bmel-fever",
        name: "Brucellosis (Undulant Fever)",
        treatment: "Doxycycline + rifampin",
        route: "PO",
        clinicalPearl: "Characterized by rising-and-falling (undulant) fevers, profuse moldy sweat, and focal osteoarticular symptoms."
      },
      {
        id: "bmel-osteo",
        name: "Focal Osteoarticular Disease",
        treatment: "Doxycycline + streptomycin (or gentamicin)",
        route: "IV/PO",
        clinicalPearl: "Spondylodiscitis is a common localized complication; requires prolonged course of double therapy."
      }
    ]
  },
  {
    id: "b-abortus",
    name: "Brucella abortus",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Facultative intracellular", "Zoonosis (cattle exposure)"],
    description: "Gram-negative coccobacillus. Highly associated with occupational exposure in veterinarians and slaughterhouse employees.",
    diseases: [
      {
        id: "babor-disease",
        name: "Systemic occupational Brucellosis",
        treatment: "Doxycycline + Streptomycin (or Rifampin).",
        route: "IV/PO",
        clinicalPearl: "Can form focal granulomas in liver/bone. Standard precautions are vital in blood labs (highly infectious aerosol risk)."
      }
    ]
  },
  {
    id: "f-tularensis",
    name: "Francisella tularensis",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Requires cysteine for growth", "Zoonosis from rabbits or Dermacentor tick bites", "Low infectious dose"],
    description: "Extremely infectious G- coccobacillus. Picked up from skinning wild rabbits or tick bites. Classed as a dangerous select biodefense agent.",
    diseases: [
      {
        id: "ft-tularemia",
        name: "Ulceroglandular Tularemia",
        treatment: "Streptomycin or Gentamicin.",
        route: "IV",
        clinicalPearl: "Presents with a painful punched-out skin ulcer accompanied by agonizingly swollen regional lymph nodes."
      }
    ]
  },

  // GROUP 6: SPIROCHETES (3)
  {
    id: "t-pallidum",
    name: "Treponema pallidum",
    gramStatus: "Spirochete",
    shape: "Spirochetes",
    arrangement: "None",
    characteristics: ["Visualized via darkfield microscopy", "VDRL/RPR screening", "FTA-ABS confirmatory"],
    description: "Spirochete bacterium causing Syphilis; sexually transmitted infection.",
    diseases: [
      {
        id: "tp-primary",
        name: "Primary Syphilis",
        treatment: "Benzathine penicillin G (IM single dose)",
        route: "IM",
        clinicalPearl: "Presents with a single, painless chancre at the site of inoculation."
      },
      {
        id: "tp-secondary",
        name: "Secondary Syphilis",
        treatment: "Benzathine penicillin G (IM)",
        route: "IM",
        clinicalPearl: "Presents with a maculopapular rash on palms and soles, condylomata lata, and lymphadenopathy."
      },
      {
        id: "tp-neuro",
        name: "Neurosyphilis",
        treatment: "Aqueous penicillin G IV",
        route: "IV",
        clinicalPearl: "Never treat neurosyphilis with Benzathine penicillin; it does not cross the blood-brain barrier. Intravenous penicillin G is needed."
      },
      {
        id: "tp-latent",
        name: "Latent Syphilis",
        treatment: "Benzathine penicillin G (multiple doses depending on stage)",
        route: "IM",
        clinicalPearl: "Asymptomatic stage; defined as early latent or late latent depending on time since initial infection."
      }
    ]
  },
  {
    id: "b-burgdorferi",
    name: "Borrelia burgdorferi",
    gramStatus: "Spirochete",
    shape: "Spirochetes",
    arrangement: "None",
    characteristics: ["Tick-borne (Ixodes tick)", "Erythema migrans", "Stains with Giemsa/Wright stain"],
    description: "Spirochete bacterium causing Lyme disease; tick-borne illness.",
    diseases: [
      {
        id: "bb-localized",
        name: "Early Localized Lyme (erythema migrans)",
        treatment: "Doxycycline",
        route: "PO",
        clinicalPearl: "Presents as a target-like 'bullseye' rash (erythema migrans). Amoxicillin is preferred in pregnant patients."
      },
      {
        id: "bb-disseminated",
        name: "Early Disseminated Lyme",
        treatment: "Doxycycline or ceftriaxone",
        route: "IV/PO",
        clinicalPearl: "Presents with multiple erythema migrans lesions, AV block, and/or bilateral Bell's Palsy."
      },
      {
        id: "bb-arthritis",
        name: "Lyme Arthritis",
        treatment: "Doxycycline or ceftriaxone",
        route: "IV/PO",
        clinicalPearl: "Lyme arthritis typically involves large joints, most commonly the knee, as a late manifestation."
      },
      {
        id: "bb-neuro",
        name: "Neuroborreliosis",
        treatment: "IV ceftriaxone",
        route: "IV",
        clinicalPearl: "Requires systemic intravenous therapy to cross into central nervous system tissues."
      }
    ]
  },
  {
    id: "l-interrogans",
    name: "Leptospira interrogans",
    gramStatus: "Spirochete",
    shape: "Spirochetes",
    arrangement: "Question mark shaped hooks",
    characteristics: ["Water contaminated with animal urine (rats)", "Spirochete with hooked ends"],
    description: "Spirochete featuring question-mark shaped hooks; spreads through contaminated water.",
    diseases: [
      {
        id: "li-mild",
        name: "Mild Leptospirosis",
        treatment: "Doxycycline or amoxicillin",
        route: "PO",
        clinicalPearl: "Self-limiting febrile syndrome; standardly associated with swimming in contaminated fresh water."
      },
      {
        id: "li-severe",
        name: "Severe (Weil disease)",
        treatment: "IV penicillin G or ceftriaxone",
        route: "IV",
        clinicalPearl: "Weil disease features severe jaundice, acute renal dysfunction, and high-frequency hemorrhage."
      },
      {
        id: "li-meningeal",
        name: "Meningeal Form",
        treatment: "Ceftriaxone",
        route: "IV",
        clinicalPearl: "Can present with aseptic meningitis symptoms; requires broad system penetrance."
      }
    ]
  },

  // GROUP 7: OBLIGATE INTRACELLULAR & SMALL G- (10)
  {
    id: "c-trachomatis",
    name: "Chlamydia trachomatis",
    gramStatus: "No Cell Wall",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Obligate intracellular (cannot make own ATP)", "Giemsa stain for inclusion bodies", "Lacks peptidoglycan cell wall"],
    description: "Intracellular pathogen exists as elementary bodies (infectious) & reticulate bodies (replicating). Drives non-gonococcal urethritis.",
    diseases: [
            {
        id: "ct-urethritis-0",
        name: "Chlamydia Urethritis",
        treatment: "Doxycycline (first-line) or Azithromycin (preferred in pregnancy).",
        route: "PO",
        clinicalPearl: "Often silent. Standard clinic protocol co-treats for Chlamydia and Gonorrhea jointly."
      },
      {
        id: "ct-urethritis-1",
        name: "Trachoma",
        treatment: "Doxycycline (first-line) or Azithromycin (preferred in pregnancy).",
        route: "PO",
        clinicalPearl: "Often silent. Standard clinic protocol co-treats for Chlamydia and Gonorrhea jointly."
      }
    ]
  },
  {
    id: "c-pneumoniae",
    name: "Chlamydia pneumoniae",
    gramStatus: "No Cell Wall",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Obligate intracellular", "Atypical lung pattern"],
    description: "Intracellular pathogen. Primary driver of moderate, atypical CAP in young adults and college environments.",
    diseases: [
      {
        id: "cpn-cap",
        name: "Atypical Pneumonia",
        treatment: "Doxycycline, Azithromycin, or Levofloxacin.",
        route: "PO",
        clinicalPearl: "Beta-lactam antibiotics have no target because of Chlamydia's unique lack of cell wall peptidoglycan."
      }
    ]
  },
  {
    id: "c-burnetii",
    name: "Coxiella burnetii",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Obligate intracellular G-", "No vector (acquired via cattle spore inhalation)"],
    description: "Obligate intracellular bacterium. Endulates inside livestock placenta. Inhaling dust from animal amniotic fluid triggers Q fever.",
    diseases: [
      {
        id: "cb-qfever",
        name: "Q Fever",
        treatment: "Doxycycline.",
        route: "PO",
        clinicalPearl: "Presents as a culture-negative endocarditis or atypical pneumonia alongside liver function elevation (granulomatous hepatitis)."
      }
    ]
  },
  {
    id: "r-rickettsii",
    name: "Rickettsia rickettsii",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Obligate intracellular G-", "Tick-borne (Dermacentor tick)", "Weil-Felix reaction positive"],
    description: "Obligate G- intracellular; invades vascular endothelial cells. Causes Rocky Mountain Spotted Fever (RMSF).",
    diseases: [
      {
        id: "rr-rmsf",
        name: "Rocky Mountain Spotted Fever",
        treatment: "Doxycycline.",
        route: "IV/PO",
        clinicalPearl: "Classic rash starts on wrists and ankles, spreading centripetally to palms, soles, and trunk. Do not delay doxycycline treatment!"
      }
    ]
  },
  {
    id: "r-prowazekii",
    name: "Rickettsia prowazekii",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Obligate intracellular", "Vector: human body louse"],
    description: "Obligate intracellular pathogen spreading via body louse scratch contamination. Causes epidemic typhus.",
    diseases: [
      {
        id: "rp-typhus",
        name: "Epidemic Typhus",
        treatment: "Doxycycline.",
        route: "IV/PO",
        clinicalPearl: "Classic rash starts on trunk and spreads outward to extremities, sparing the face, palms, and soles."
      }
    ]
  },
  {
    id: "e-chaffeensis",
    name: "Ehrlichia chaffeensis",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Morulae inside monocytes", "Vector: Lone Star tick (Amblyomma)"],
    description: "Zoonotic intracellular pathogen leading to human monocytic ehrlichiosis. Infects circulating white blood cells.",
    diseases: [
      {
        id: "ec-ehrlichiosis",
        name: "Human Monocytic Ehrlichiosis (HME)",
        treatment: "Doxycycline.",
        route: "PO",
        clinicalPearl: "Hallmark: 'Morulae' (berry-like intracellular clusters) visible inside monocytes. Leucopenia & thrombocytopenia are typical."
      }
    ]
  },
  {
    id: "a-phagocytophilum",
    name: "Anaplasma phagocytophilum",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Morulae inside granulocytes/neutrophils", "Vector: Ixodes tick"],
    description: "Intracellular tick-borne bug producing human granulocytic anaplasmosis. Mimics ehrlichia but infects neutrophils.",
    diseases: [
      {
        id: "ap-anaplasmosis",
        name: "Human Granulocytic Anaplasmosis",
        treatment: "Doxycycline.",
        route: "PO",
        clinicalPearl: "Look for berry-like morulae inside neutrophils. Transmitted by the same tick (Ixodes) that transmits Lyme disease."
      }
    ]
  },
  {
    id: "b-henselae",
    name: "Bartonella henselae",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Facultative intracellular G-", "Warthin-Starry silver stain positive", "Spread by cat scratches/bites"],
    description: "Fastidious, silver-staining G- rod. Causes Cat Scratch Disease in immunocompetent, and vascular angiomatosis in AIDS patients.",
    diseases: [
            {
        id: "bh-catscratch-0",
        name: "Cat Scratch Disease",
        treatment: "Azithromycin (Cat Scratch) or Doxycycline (Bacillary Angiomatosis).",
        route: "PO",
        clinicalPearl: "Bacillary angiomatosis presents with benign bright red vascular skin nodules in AIDS patients; mimics Kaposi sarcoma."
      },
      {
        id: "bh-catscratch-1",
        name: "Bacillary Angiomatosis",
        treatment: "Azithromycin (Cat Scratch) or Doxycycline (Bacillary Angiomatosis).",
        route: "PO",
        clinicalPearl: "Bacillary angiomatosis presents with benign bright red vascular skin nodules in AIDS patients; mimics Kaposi sarcoma."
      }
    ]
  },
  {
    id: "b-quintana",
    name: "Bartonella quintana",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "None",
    characteristics: ["Vector: Body louse", "Warthin-Starry stain positive"],
    description: "Gram-negative rod behind 'Trench Fever'. Transmitted in poor hygienic conditions/homeless populations by body lice.",
    diseases: [
            {
        id: "bq-trench-0",
        name: "Trench Fever",
        treatment: "Doxycycline + Rifampin.",
        route: "PO",
        clinicalPearl: "Presents as recurring 5-day cyclic fevers, severe shin pains, and potential endocarditis on heart valves."
      },
      {
        id: "bq-trench-1",
        name: "Culture-Negative Endocarditis",
        treatment: "Doxycycline + Rifampin.",
        route: "PO",
        clinicalPearl: "Presents as recurring 5-day cyclic fevers, severe shin pains, and potential endocarditis on heart valves."
      }
    ]
  },
  {
    id: "p-multocida",
    name: "Pasteurella multocida",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "None",
    characteristics: ["Oxidase-positive", "Catalase-positive", "Bipolar safety-pin staining", "Acquired from animal bites (cats/dogs)"],
    description: "Small aerobic G- coccobacillus. Highly colonizes oral cavities of healthy domestic cats and dogs.",
    diseases: [
            {
        id: "pmul-wound-0",
        name: "Rapid Bite Wound Cellulitis",
        treatment: "Amoxicillin-clavulanate (Augmentin) or Ampicillin-sulbactam",
        route: "IV/PO",
        clinicalPearl: "Presents as rapid, extremely tender localized cellulitis starting within 24 hours of a domestic cat bite."
      },
      {
        id: "pmul-wound-1",
        name: "Osteomyelitis",
        treatment: "Amoxicillin-clavulanate (Augmentin) or Ampicillin-sulbactam",
        route: "IV/PO",
        clinicalPearl: "Presents as rapid, extremely tender localized cellulitis starting within 24 hours of a domestic cat bite."
      }
    ]
  },

  // GROUP 8: ANAEROBES (GRAM-NEG and G+ MISC) (7)
  {
    id: "b-fragilis",
    name: "Bacteroides fragilis",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Anaerobic", "Bile-resistant", "Encapsulated with capsule causing direct abscesses"],
    description: "Strictly anaerobic G- rod. Dominant gut flora species. Trauma or surgical breaches spill it into peritoneum.",
    diseases: [
            {
        id: "bf-abscess-0",
        name: "Intra-abdominal Abscess",
        treatment: "Metronidazole, Piperacillin-tazobactam, or Carbapenems.",
        route: "IV",
        clinicalPearl: "Metronidazole holds superb anaerobic cover. Avoid cephalosporins (e.g., ceftriaxone) alone as they lack anaerobic coverage."
      },
      {
        id: "bf-abscess-1",
        name: "Peritonitis",
        treatment: "Metronidazole, Piperacillin-tazobactam, or Carbapenems.",
        route: "IV",
        clinicalPearl: "Metronidazole holds superb anaerobic cover. Avoid cephalosporins (e.g., ceftriaxone) alone as they lack anaerobic coverage."
      }
    ]
  },
  {
    id: "p-melaninogenica",
    name: "Prevotella melaninogenica",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Anaerobic", "Black pigment on blood agar", "Brick-red fluorescence under UV"],
    description: "Anaerobic G- rod colonizing the oral cavity and genital secretions.",
    diseases: [
            {
        id: "pmel-lung-0",
        name: "Aspiration Pneumonia",
        treatment: "Clindamycin or Ampicillin-sulbactam.",
        route: "IV/PO",
        clinicalPearl: "Classic cause of foul-smelling lung abscesses in alcoholics following aspiration of oral secretions."
      },
      {
        id: "pmel-lung-1",
        name: "Periodontitis",
        treatment: "Clindamycin or Ampicillin-sulbactam.",
        route: "IV/PO",
        clinicalPearl: "Classic cause of foul-smelling lung abscesses in alcoholics following aspiration of oral secretions."
      }
    ]
  },
  {
    id: "f-nucleatum",
    name: "Fusobacterium nucleatum",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "Long spindle-like needle shape",
    characteristics: ["Anaerobic", "Spindle or needle-shaped morphology", "Highly virulent outer membrane adhesins"],
    description: "Elongated, thin anaerobic G- rod causing severe gingival and metastatic deep neck abscesses.",
    diseases: [
            {
        id: "fn-abscess-0",
        name: "Vincent's Angina",
        treatment: "Penicillin G or Metronidazole or Clindamycin.",
        route: "IV",
        clinicalPearl: "Lemierre syndrome is a deep neck infection leading to septic thrombophlebitis of the internal jugular vein."
      },
      {
        id: "fn-abscess-1",
        name: "Lemierre Syndrome",
        treatment: "Penicillin G or Metronidazole or Clindamycin.",
        route: "IV",
        clinicalPearl: "Lemierre syndrome is a deep neck infection leading to septic thrombophlebitis of the internal jugular vein."
      }
    ]
  },
  {
    id: "p-anaerobius",
    name: "Peptostreptococcus anaerobius",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Chains/Pairs",
    characteristics: ["Anaerobic", "SPS (Sodium polyanethol sulfonate) sensitive"],
    description: "Anaerobic G+ cocci. Part of normal oral, gut, and vaginal flora. Often found in mixed synergistic infections.",
    diseases: [
            {
        id: "pa-mixed-0",
        name: "Pelvic Inflammatory Disease",
        treatment: "Penicillin G, Metronidazole, or Clindamycin.",
        route: "IV/PO",
        clinicalPearl: "Frequently isolates alongside G- anaerobes in diabetic foot ulcers and pelvic organ abscesses."
      },
      {
        id: "pa-mixed-1",
        name: "Aspiration Abscess",
        treatment: "Penicillin G, Metronidazole, or Clindamycin.",
        route: "IV/PO",
        clinicalPearl: "Frequently isolates alongside G- anaerobes in diabetic foot ulcers and pelvic organ abscesses."
      }
    ]
  },
  {
    id: "f-magna",
    name: "Finegoldia magna",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Clusters/Pairs",
    characteristics: ["Anaerobic G+ cocci", "SPS resistant", "Produces gelatinase"],
    description: "Opportunistic anaerobic G+ coccus. Second most common Gram-positive anaerobe found in bone, skin, and prosthetic infections.",
    diseases: [
            {
        id: "fmag-bone-0",
        name: "Prosthetic Joint Injury",
        treatment: "Penicillin G, Ampicillin, or Metronidazole.",
        route: "IV",
        clinicalPearl: "Frequently present in decubitus ulcers and diabetic pressure sores; requires standard necrotic debridement."
      },
      {
        id: "fmag-bone-1",
        name: "Decubitus Ulcer Sepsis",
        treatment: "Penicillin G, Ampicillin, or Metronidazole.",
        route: "IV",
        clinicalPearl: "Frequently present in decubitus ulcers and diabetic pressure sores; requires standard necrotic debridement."
      }
    ]
  },
  {
    id: "v-parvula",
    name: "Veillonella parvula",
    gramStatus: "Gram-negative",
    shape: "Cocci",
    arrangement: "Pairs/Clusters",
    characteristics: ["Anaerobic G- cocci", "Oxidase-negative", "Metabolizes lactate"],
    description: "Only major anaerobic G- coccus family in humans. Concentrated in plaque and mucosal membranes.",
    diseases: [
            {
        id: "vp-infection-0",
        name: "Dental Plaque",
        treatment: "Penicillin G or Clindamycin.",
        route: "IV/PO",
        clinicalPearl: "Highly protective oral colonizer that consumes toxic lactate, but acts as an opportunistic pathogen when aspirated."
      },
      {
        id: "vp-infection-1",
        name: "Pulmonary Aspiration Sepsis",
        treatment: "Penicillin G or Clindamycin.",
        route: "IV/PO",
        clinicalPearl: "Highly protective oral colonizer that consumes toxic lactate, but acts as an opportunistic pathogen when aspirated."
      }
    ]
  },
  {
    id: "bif-spp",
    name: "Bifidobacterium spp.",
    gramStatus: "Gram-positive",
    shape: "Rods",
    arrangement: "Y-shaped / branching clubs",
    characteristics: ["Anaerobic G+ rod", "Highly branched club morphology", "Dominates breastfed infant colon"],
    description: "Non-spore forming anaerobic G+ rod. Key component of gut microbiota. Extremely scarce pathogenicity.",
    diseases: [
      {
        id: "bif-probiotic",
        name: "Infant Digestion support & Sepsis (very rare)",
        treatment: "Penicillin G or Vancomycin.",
        route: "Supportive",
        clinicalPearl: "Drives lactic acid synthesis to maintain a safe acidic gut environment, preventing G- overgrowth."
      }
    ]
  },

  // GROUP 9: SPECIALIZED HACEK and others (5)
  {
    id: "e-corrodens",
    name: "Eikenella corrodens",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["HACEK family", "Bleach-like odor", "Pits/corrodes the agar"],
    description: "Fastidious G- rod in the HACEK group. Normal oral flora. Key driver of infection following human bites.",
    diseases: [
            {
        id: "ecorr-bite-0",
        name: "Human Bite Wound / Fight Bite",
        treatment: "Ampicillin-sulbactam, Ceftriaxone, or Penicillin G.",
        route: "IV/PO",
        clinicalPearl: "Presents as a hand infection ('fight bite') after punching someone in the teeth. Differentiated by bleach-like agar odor."
      },
      {
        id: "ecorr-bite-1",
        name: "Endocarditis",
        treatment: "Ampicillin-sulbactam, Ceftriaxone, or Penicillin G.",
        route: "IV/PO",
        clinicalPearl: "Presents as a hand infection ('fight bite') after punching someone in the teeth. Differentiated by bleach-like agar odor."
      }
    ]
  },
  {
    id: "a-actinomycete",
    name: "Aggregatibacter actinomycetemcomitans",
    gramStatus: "Gram-negative",
    shape: "Coccobacillus",
    arrangement: "Star-like inner structure on agar",
    characteristics: ["HACEK group", "Leukotoxin producer"],
    description: "Highly aggressive oral HACEK pathogen. Noted for driving rapid adolescent periodontitis and slow-growing endocarditis.",
    diseases: [
      {
        id: "agg-endocarditis",
        name: "HACEK Culture-Negative Endocarditis",
        treatment: "Ceftriaxone.",
        route: "IV",
        clinicalPearl: "Classically causes slow, progressive endocarditis in patients with preexisting valvular damage; hard to culture."
      }
    ]
  },
  {
    id: "p-gingivalis",
    name: "Porphyromonas gingivalis",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Anaerobic G- rod", "Produces black colonies on blood agar", "Gingipain synthesis"],
    description: "Anaerobic G- rod. Chief etiological driver of severe chronic periodontal bone recession.",
    diseases: [
            {
        id: "pg-periodontitis-0",
        name: "Gingivitis",
        treatment: "Metronidazole, Amoxicillin, or Topical Chlorhexidine.",
        route: "PO",
        clinicalPearl: "Destroys bone and periodontal ligament through collagenase and protease release. Linked in research to alzheimer's."
      },
      {
        id: "pg-periodontitis-1",
        name: "Chronic Periodontitis",
        treatment: "Metronidazole, Amoxicillin, or Topical Chlorhexidine.",
        route: "PO",
        clinicalPearl: "Destroys bone and periodontal ligament through collagenase and protease release. Linked in research to alzheimer's."
      }
    ]
  },
  {
    id: "t-forsythia",
    name: "Tannerella forsythia",
    gramStatus: "Gram-negative",
    shape: "Pleomorphic rods",
    arrangement: "Spindles",
    characteristics: ["Anaerobic G- spindle", "Demands NAC (N-acetylmuramic acid)"],
    description: "Anaerobic G- spindle. Forms the destructive 'Red Complex' of periodontal disease alongside P. gingivalis.",
    diseases: [
      {
        id: "tf-periodontitis",
        name: "Advanced Adult Periodontal Disease",
        treatment: "Metronidazole + Amoxicillin.",
        route: "PO",
        clinicalPearl: "Requires physical dental scaling to break open the subgingival plaque matrix."
      }
    ]
  },
  {
    id: "a-hydrophila",
    name: "Aeromonas hydrophila",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Oxidase-positive", "Beta-hemolytic", "Grows in fresh water"],
    description: "Gram-negative rod. Found in fresh or brackish water. Associated with wound cellulitis after fresh-water trauma.",
    diseases: [
            {
        id: "ah-cellulitis-0",
        name: "Freshwater Wound Necrosis",
        treatment: "Ciprofloxacin or Ceftriaxone.",
        route: "IV/PO",
        clinicalPearl: "Strong resemblance to Vibrio infections but differentiates by growing in zero-salt fresh water."
      },
      {
        id: "ah-cellulitis-1",
        name: "Diarrhea",
        treatment: "Ciprofloxacin or Ceftriaxone.",
        route: "IV/PO",
        clinicalPearl: "Strong resemblance to Vibrio infections but differentiates by growing in zero-salt fresh water."
      }
    ]
  },

  // GROUP 10: OPPORTUNISTIC, ATYPICAL, & ACID-FAST (11)
  {
    id: "myco-pneumoniae",
    name: "Mycoplasma pneumoniae",
    gramStatus: "No Cell Wall",
    shape: "Pleomorphic",
    arrangement: "None",
    characteristics: ["No cell wall (rich in cholesterol)", "Cold agglutinins (IgM anti-I) positive", "Eaton's agar ('fried-egg' appearance)"],
    description: "Bacteria packing no cell wall. Traditional cause of 'walking' atypical pneumonia in military camps and schools.",
    diseases: [
      {
        id: "mp-atypical",
        name: "Atypical Pneumonia",
        treatment: "Azithromycin, Doxycycline, or Levofloxacin.",
        route: "PO",
        clinicalPearl: "Beta-lactams (e.g. penicillin) are totally useless because Mycoplasma has NO cell wall to target. High IgM titers can cause mild anemia."
      }
    ]
  },
  {
    id: "u-urealyticum",
    name: "Ureaplasma urealyticum",
    gramStatus: "No Cell Wall",
    shape: "Pleomorphic",
    arrangement: "None",
    characteristics: ["No cell wall", "Urease-positive"],
    description: "Bacteria lacking a cell wall. Urease activity splits urea, triggering struvite stones or genitourinary inflammation.",
    diseases: [
      {
        id: "uu-urethritis",
        name: "Non-Gonococcal Non-Chlamydial Urethritis",
        treatment: "Doxycycline or Azithromycin.",
        route: "PO",
        clinicalPearl: "Consider this pathogen if urethritis symptoms persist after gonorrhea and chlamydia are covered."
      }
    ]
  },
  {
    id: "m-tuberculosis",
    name: "Mycobacterium tuberculosis",
    gramStatus: "Acid-fast",
    shape: "Rods",
    arrangement: "Chains / Clumps (Serpentine cording)",
    characteristics: ["Acid-fast (Ziehl-Neelsen stain)", "Obligate aerobe", "Mycolic acid cell wall", "Lowenstein-Jensen agar growth"],
    description: "Acid-fast, obligate aerobe rod with a mycolic acid-rich cell wall. Serpentine cording factor correlates with virulence.",
    diseases: [
      {
        id: "mtb-pulmonary",
        name: "Pulmonary Tuberculosis",
        treatment: "RIPE therapy (rifampin + isoniazid + pyrazinamide + ethambutol)",
        route: "PO",
        clinicalPearl: "Presents with classic night sweats, weight loss, hemoptysis, and cavitary upper lobe lesions on chest X-ray."
      },
      {
        id: "mtb-latent",
        name: "Latent TB Infection",
        treatment: "Isoniazid or rifampin monotherapy regimens",
        route: "PO",
        clinicalPearl: "Positive PPD or IGRA without clinical or radiographic signs of active infection; treat to prevent future reactivation."
      },
      {
        id: "mtb-meningitis",
        name: "TB Meningitis",
        treatment: "RIPE + prolonged therapy + adjunct steroids",
        route: "multiple",
        clinicalPearl: "Severe presentation featuring thick gelatinous exudate at the base of the brain; corticosteroids reduce mortality."
      }
    ]
  },
  {
    id: "m-leprae",
    name: "Mycobacterium leprae",
    gramStatus: "Acid-fast",
    shape: "Rods",
    arrangement: "Clumps (Globi)",
    characteristics: ["Acid-fast bacillus", "Cannot be cultured in vitro (grown in armadillos)", "Enjoys cool temperatures"],
    description: "Acid-fast rod. Lives obligately intracellularly; has predilection for cool peripheral tissues and nerves.",
    diseases: [
      {
        id: "mlep-tuberculoid",
        name: "Tuberculoid Leprosy",
        treatment: "Dapsone + rifampin",
        route: "PO",
        clinicalPearl: "Hypoesthetic, hairless skin plaques; strong cell-mediated Th1 helper response keeps bacillary load low."
      },
      {
        id: "mlep-lepromatous",
        name: "Lepromatous Leprosy",
        treatment: "Dapsone + rifampin + clofazimine",
        route: "PO",
        clinicalPearl: "Facial 'leonine' appearance due to weak cell-mediated immunity (Th2 predominant) failing to suppress replication."
      },
      {
        id: "mlep-borderline",
        name: "Borderline Leprosy",
        treatment: "Multidrug therapy (WHO/IDSA-aligned regimens)",
        route: "PO",
        clinicalPearl: "An intermediate, clinically volatile stage that can transition to either polar form."
      }
    ]
  },
  {
    id: "m-avium",
    name: "Mycobacterium avium-intracellulare (MAC)",
    gramStatus: "Acid-fast",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Acid-fast", "Atypical mycobacterium", "Severe opportunist in advanced AIDS"],
    description: "Acid-fast intracellular organism. Ubiquitous in soil/water. Causes disseminated wasting disease in advanced immunocompromised stages.",
    diseases: [
      {
        id: "mac-aids",
        name: "Disseminated MAC infection in AIDS",
        treatment: "Clarithromycin + Ethambutol (+ Rifabutin).",
        route: "PO",
        clinicalPearl: "Occurs when CD4 < 50. Presents with fever, heavy night sweats, diarrhea, and high alkaline phosphatase."
      }
    ]
  },
  {
    id: "b-cepacia",
    name: "Burkholderia cepacia",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Oxidase-positive", "Catalase-positive", "Highly resistant G- rod"],
    description: "Gram-negative, slow-growing opportunist. Colonizes respiratory tracts of CF (cystic fibrosis) patients.",
    diseases: [
      {
        id: "bc-pneumonia",
         name: "CF Necrotizing Pneumonia (Cepacia Syndrome)",
         treatment: "TMP-SMX, Ceftazidime, or Meropenem.",
         route: "IV",
         clinicalPearl: "Cepacia Syndrome is sudden destructive necrotizing pneumonia and sepsis in CF patients, with poor prognosis."
      }
    ]
  },
  {
    id: "s-maltophilia",
    name: "Stenotrophomonas maltophilia",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Oxidase-negative", "Intrinsically resistant to carbapenems", "Biofilm generator"],
    description: "Gram-negative rod notorious for emerging inside hospital ICUs. Differentiated by being highly resistant to meropenem.",
    diseases: [
      {
        id: "smalt-nosocomial",
        name: "Carbapenem-Resistant ICU Sepsis",
        treatment: "TMP-SMX (Bactrim).",
        route: "IV/PO",
        clinicalPearl: "Intrinsically resistant to carbapenems! Sulfamethoxazole-trimethoprim is the drug of choice."
      }
    ]
  },
  {
    id: "a-xylosoxidans",
    name: "Achromobacter xylosoxidans",
    gramStatus: "Gram-negative",
    shape: "Rods",
    arrangement: "None",
    characteristics: ["Oxidase-positive", "Catalase-positive", "Highly motile peritrichous flagella"],
    description: "Gram-negative rod commonly infecting wet hospital circuits, CF lungs, and oncology lines.",
    diseases: [
            {
        id: "ax-sepsis-0",
        name: "Oncology Catheter Sepsis",
        treatment: "Piperacillin-tazobactam or Meropenem.",
        route: "IV",
        clinicalPearl: "High environmental tolerance makes it a persistent challenge on wet sterile equipment."
      },
      {
        id: "ax-sepsis-1",
        name: "CF exacerbation",
        treatment: "Piperacillin-tazobactam or Meropenem.",
        route: "IV",
        clinicalPearl: "High environmental tolerance makes it a persistent challenge on wet sterile equipment."
      }
    ]
  },
  {
    id: "g-vaginalis",
    name: "Gardnerella vaginalis",
    gramStatus: "Gram-variable",
    shape: "Pleomorphic rods",
    arrangement: "Adheres to squamous epithelial cells (clue cells)",
    characteristics: ["Gram-variable pleomorphic rod", "Clue cells on saline wet mount", "Fishy odor with 10% KOH (Whiff test)"],
    description: "Gram-variable pleomorphic rod; associated with vaginal dysbiosis.",
    diseases: [
      {
        id: "gv-vaginosis",
        name: "Bacterial Vaginosis (BV)",
        treatment: "Metronidazole (oral or intravaginal) or clindamycin",
        route: "PO",
        clinicalPearl: "Presents with a thin, grayish-white vaginal discharge and fishy vaginal odor. Clue cells are scaled epithelial cells covered in bacteria."
      },
      {
        id: "gv-recurrent",
        name: "Recurrent BV",
        treatment: "Metronidazole suppressive therapy (e.g., gel regimen)",
        route: "multiple",
        clinicalPearl: "Required for multiple recurrences within a year."
      },
      {
        id: "gv-postproc",
        name: "Post-procedure infection (rare)",
        treatment: "Metronidazole",
        route: "PO",
        clinicalPearl: "Prophylaxis or treatment surrounding gynecologic procedures."
      }
    ]
  },
  {
    id: "s-mitis",
    name: "Streptococcus mitis",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Chains",
    characteristics: ["Catalase-negative", "Alpha-hemolytic", "Optochin-resistant"],
    description: "Viridans group streptococcus; oral flora.",
    diseases: [
      {
        id: "smit-endocarditis",
        name: "Endocarditis",
        treatment: "Penicillin G ± gentamicin",
        route: "IV",
        clinicalPearl: "Frequently leaks into blood during dental scaling or in patients with severe mucositis."
      },
      {
        id: "smit-bacteremia",
        name: "Bacteremia",
        treatment: "Ceftriaxone or penicillin",
        route: "IV",
        clinicalPearl: "Secondary bacteremia in neutropenic patients."
      },
      {
        id: "smit-oral",
        name: "Oral-source infection",
        treatment: "Penicillin-based therapy",
        route: "PO",
        clinicalPearl: "Local tissue or odontogenic abscess spread."
      }
    ]
  },
  {
    id: "s-viridans-gp",
    name: "Streptococcus viridans group",
    gramStatus: "Gram-positive",
    shape: "Cocci",
    arrangement: "Chains",
    characteristics: ["Alpha-hemolytic", "Optochin-resistant", "Bile-insoluble"],
    description: "Alpha-hemolytic streptococci group; oral flora.",
    diseases: [
      {
        id: "svir-endocarditis",
        name: "Endocarditis",
        treatment: "Penicillin G ± gentamicin or ceftriaxone",
        route: "IV",
        clinicalPearl: "Primary driver of subacute bacterial endocarditis on abnormal or calcified native heart valves."
      },
      {
        id: "svir-bacteremia",
        name: "Bacteremia",
        treatment: "Ceftriaxone or penicillin",
        route: "IV",
        clinicalPearl: "Often transient after simple dental work."
      },
      {
        id: "svir-dental",
        name: "Dental-source infection",
        treatment: "Penicillin-based therapy",
        route: "PO",
        clinicalPearl: "Endogenous spread following gum barrier breakage."
      }
    ]
  }
];
