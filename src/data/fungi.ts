export interface DiseaseTreatment {
  id: string;
  name: string; // e.g., "Candidemia"
  treatment: string; // e.g., "Fluconazole or Echinocandin"
  route: "PO" | "IV" | "IM" | "IV/PO" | "Topical" | "Supportive" | "multiple";
  clinicalPearl?: string; // High-yield medical school tip
}

export interface Fungus {
  id: string;
  name: string; // e.g., "Candida albicans"
  type: "Yeast" | "Mold" | "Dimorphic" | "Dermatophyte";
  morphology: string; // e.g., "Pseudohyphae, budding yeasts"
  characteristics: string[]; // e.g., ["Germ tube positive"]
  description: string; // Full text from table or study guide
  diseases: DiseaseTreatment[];
}

export const fungiData: Fungus[] = [
  {
    id: "candida-albicans",
    name: "Candida albicans",
    type: "Yeast",
    morphology: "Pseudohyphae and budding yeasts at 20°C, germ tubes at 37°C",
    characteristics: ["Germ tube positive", "Normal flora of GI tract and oral cavity"],
    description: "An opportunistic dimorphic fungus (forms germ tubes at 37°C). It is part of the normal human microbiome but can cause opportunistic mucosal or invasive infections.",
    diseases: [
      {
        id: "ca-oral",
        name: "Oral Candidiasis (Thrush)",
        treatment: "Nystatin swish and swallow, or oral fluconazole",
        route: "Topical",
        clinicalPearl: "Presents as white, scrapeable plaques. Often seen in neonates, diabetics, or immunocompromised (HIV/AIDS or steroid inhaler use)."
      },
      {
        id: "ca-vulvovaginal",
        name: "Vulvovaginal Candidiasis",
        treatment: "Oral fluconazole or topical azoles (e.g., miconazole)",
        route: "PO",
        clinicalPearl: "Presents with 'cottage cheese' discharge and pruritus. Associated with antibiotic use, diabetes, and pregnancy."
      },
      {
        id: "ca-candidemia",
        name: "Candidemia / Invasive Candidiasis",
        treatment: "Echinocandin (e.g., caspofungin, micafungin)",
        route: "IV",
        clinicalPearl: "Bloodstream infection commonly associated with central venous catheters or TPN."
      },
      {
        id: "ca-esophagitis",
        name: "Candida Esophagitis",
        treatment: "Oral or IV fluconazole",
        route: "IV/PO",
        clinicalPearl: "An AIDS-defining illness in HIV patients; typically presents with odynophagia."
      }
    ]
  },
  {
    id: "aspergillus-fumigatus",
    name: "Aspergillus fumigatus",
    type: "Mold",
    morphology: "Septate hyphae branching at acute angles (45°)",
    characteristics: ["Catalase-positive", "Conidiophores with radiating chains of spores"],
    description: "A ubiquitous mold found in decaying vegetation. Causes varied diseases from allergic responses to severe invasive infections in immunocompromised individuals.",
    diseases: [
      {
        id: "af-abpa",
        name: "Allergic Bronchopulmonary Aspergillosis (ABPA)",
        treatment: "Corticosteroids ± itraconazole",
        route: "PO",
        clinicalPearl: "Hypersensitivity reaction associated with asthma and cystic fibrosis. Causes bronchiectasis and eosinophilia."
      },
      {
        id: "af-aspergilloma",
        name: "Aspergilloma (Fungus Ball)",
        treatment: "Surgical resection (if symptomatic) or observation",
        route: "multiple",
        clinicalPearl: "Colonizes pre-existing lung cavities (e.g., from old tuberculosis). Often presents with hemoptysis."
      },
      {
        id: "af-invasive",
        name: "Invasive Pulmonary Aspergillosis",
        treatment: "Voriconazole or Amphotericin B",
        route: "IV/PO",
        clinicalPearl: "Severe infection in immunocompromised (neutropenic) patients. CXR shows 'halo sign' or 'crescent sign'."
      }
    ]
  },
  {
    id: "cryptococcus-neoformans",
    name: "Cryptococcus neoformans",
    type: "Yeast",
    morphology: "Heavily encapsulated budding yeast",
    characteristics: ["India ink stain positive (clear halo)", "Urease-positive", "Mucicarmine stain positive (red capsule)", "Found in pigeon droppings"],
    description: "An encapsulated yeast found in soil and pigeon guano. Acquired via inhalation and typically causes disease in immunocompromised hosts (especially HIV/AIDS).",
    diseases: [
      {
        id: "cn-meningitis",
        name: "Cryptococcal Meningitis",
        treatment: "Amphotericin B + flucytosine (induction), followed by fluconazole (maintenance)",
        route: "IV/PO",
        clinicalPearl: "Major cause of meningoencephalitis in HIV patients with low CD4 counts. 'Soap bubble' lesions seen on brain MRI."
      },
      {
        id: "cn-pneumonia",
        name: "Pulmonary Cryptococcosis",
        treatment: "Fluconazole (mild) or Amphotericin B (severe)",
        route: "PO",
        clinicalPearl: "Usually asymptomatic but can cause symptomatic pneumonia before disseminating to the CNS."
      }
    ]
  },
  {
    id: "pneumocystis-jirovecii",
    name: "Pneumocystis jirovecii",
    type: "Yeast",
    morphology: "Disc-shaped yeast-like fungus",
    characteristics: ["Methenamine silver stain positive", "Lacks ergosterol in cell membrane"],
    description: "An atypical fungus that causes severe pneumonia in immunocompromised hosts. Because it lacks ergosterol, standard antifungals like azoles are ineffective.",
    diseases: [
      {
        id: "pj-pcp",
        name: "Pneumocystis Pneumonia (PCP)",
        treatment: "TMP-SMX (trimethoprim-sulfamethoxazole)",
        route: "IV/PO",
        clinicalPearl: "Ground-glass opacities on chest imaging. Add corticosteroids if PaO2 < 70 mmHg or A-a gradient > 35 mmHg."
      },
      {
        id: "pj-prophylaxis",
        name: "PCP Prophylaxis",
        treatment: "TMP-SMX",
        route: "PO",
        clinicalPearl: "Initiated in HIV patients when CD4 count falls below 200 cells/mm³."
      }
    ]
  },
  {
    id: "histoplasma-capsulatum",
    name: "Histoplasma capsulatum",
    type: "Dimorphic",
    morphology: "Mold in cold (20°C), yeast in heat (37°C); yeasts are small and intracellular within macrophages",
    characteristics: ["Endemic to Ohio and Mississippi River valleys", "Associated with bird and bat droppings (caves/coops)", "Urine/serum antigen test positive"],
    description: "A thermally dimorphic systemic mycosis endemic to the central United States. Infection occurs via inhalation of spores from contaminated soil.",
    diseases: [
      {
        id: "hc-pneumonia",
        name: "Histoplasmosis (Pulmonary)",
        treatment: "Itraconazole for mild/moderate; Amphotericin B for severe",
        route: "IV/PO",
        clinicalPearl: "Can mimic tuberculosis with granulomas and cavitations. Often asymptomatic in healthy individuals."
      },
      {
        id: "hc-disseminated",
        name: "Disseminated Histoplasmosis",
        treatment: "Amphotericin B followed by itraconazole",
        route: "IV/PO",
        clinicalPearl: "Occurs in immunocompromised patients; presents with hepatosplenomegaly, pancytopenia, and mucocutaneous lesions."
      }
    ]
  },
  {
    id: "coccidioides-immitis",
    name: "Coccidioides immitis",
    type: "Dimorphic",
    morphology: "Mold in cold, spherules containing endospores in heat (tissues)",
    characteristics: ["Endemic to Southwestern US (San Joaquin Valley) and Mexico", "Spherules are larger than RBCs"],
    description: "A highly infectious dimorphic fungus endemic to arid regions. Causes 'Valley Fever'.",
    diseases: [
      {
        id: "ci-valley-fever",
        name: "Valley Fever (Primary Pulmonary Coccidioidomycosis)",
        treatment: "Supportive (often self-limiting); Fluconazole or Itraconazole for severe/high-risk",
        route: "PO",
        clinicalPearl: "Associated with dust storms, earthquakes, or archeological digs. Can present with erythema nodosum (good prognostic sign) or arthralgias."
      },
      {
        id: "ci-disseminated",
        name: "Disseminated Coccidioidomycosis",
        treatment: "Amphotericin B or high-dose Fluconazole",
        route: "IV/PO",
        clinicalPearl: "Can disseminate to skin, bone, and CNS (meningitis). Dissemination is more common in immunocompromised, pregnant, and specific ethnic groups."
      }
    ]
  },
  {
    id: "blastomyces-dermatitidis",
    name: "Blastomyces dermatitidis",
    type: "Dimorphic",
    morphology: "Broad-based budding yeast at 37°C",
    characteristics: ["Endemic to Eastern US, Great Lakes, and Ohio River Valley", "Yeast forms are same size as RBCs"],
    description: "A dimorphic fungus found in soil and decaying wood. Can cause pulmonary, cutaneous, and systemic infections.",
    diseases: [
      {
        id: "bd-pulmonary",
        name: "Pulmonary Blastomycosis",
        treatment: "Itraconazole (mild/moderate); Amphotericin B (severe)",
        route: "IV/PO",
        clinicalPearl: "Presents as acute or chronic pneumonia; imaging may show a mass-like infiltrate mimicking squamous cell carcinoma."
      },
      {
        id: "bd-disseminated",
        name: "Disseminated Blastomycosis",
        treatment: "Amphotericin B followed by Itraconazole",
        route: "IV/PO",
        clinicalPearl: "Commonly disseminates to skin (verrucous lesions mimicking squamous cell cancer) and bone (lytic lesions)."
      }
    ]
  },
  {
    id: "rhizopus-spp",
    name: "Rhizopus species",
    type: "Mold",
    morphology: "Broad, non-septate hyphae branching at wide angles (90°)",
    characteristics: ["Angioinvasive", "Rapidly growing"],
    description: "Environmental molds causing mucormycosis, primarily in severely immunocompromised or diabetic patients.",
    diseases: [
      {
        id: "rz-mucormycosis",
        name: "Rhinocerebral Mucormycosis",
        treatment: "Surgical debridement + Amphotericin B",
        route: "IV",
        clinicalPearl: "Classic presentation: facial pain, headache, and black necrotic eschar on face/palate in a patient with Diabetic Ketoacidosis (DKA). Highly fatal without rapid intervention."
      }
    ]
  },
  {
    id: "sporothrix-schenckii",
    name: "Sporothrix schenckii",
    type: "Dimorphic",
    morphology: "Cigar-shaped budding yeast at 37°C; rosette-like conidia at 25°C",
    characteristics: ["Associated with rose thorns, sphagnum moss, and gardening"],
    description: "A dimorphic fungus introduced through traumatic skin inoculation, typically via plant material.",
    diseases: [
      {
        id: "ss-sporotrichosis",
        name: "Sporotrichosis ('Rose Gardener's Disease')",
        treatment: "Itraconazole or Potassium Iodide (SSKI)",
        route: "PO",
        clinicalPearl: "Presents as a local pustule or ulcer with ascending nodular lesions spreading along the draining lymphatic tracts."
      }
    ]
  },
  {
    id: "malassezia-furfur",
    name: "Malassezia furfur",
    type: "Yeast",
    morphology: "Spaghetti and meatballs appearance (short hyphae and clusters of spores)",
    characteristics: ["Lipophilic yeast", "Degrades lipids producing melanocyte-damaging acids"],
    description: "A lipophilic yeast that is part of the normal skin flora but can overgrow under hot/humid conditions.",
    diseases: [
      {
        id: "mf-tinea",
        name: "Tinea Versicolor (Pityriasis Versicolor)",
        treatment: "Topical selenium sulfide, ketoconazole cream, or oral fluconazole",
        route: "Topical",
        clinicalPearl: "Presents as hypopigmented or hyperpigmented macules on the chest/back. Does not tan in the sun."
      },
      {
        id: "mf-fungemia",
        name: "Catheter-Associated Fungemia",
        treatment: "Remove catheter and stop lipid infusions",
        route: "Supportive",
        clinicalPearl: "Can cause fungemia in neonates receiving total parenteral nutrition (TPN) with lipid emulsions."
      }
    ]
  },
  {
    id: "trichophyton-spp",
    name: "Trichophyton species",
    type: "Dermatophyte",
    morphology: "Branching septate hyphae visible on KOH preparation",
    characteristics: ["Infects skin, hair, and nails", "Wood's lamp usually negative"],
    description: "A major genus of dermatophytes causing superficial fungal infections (tinea) by digesting keratin.",
    diseases: [
      {
        id: "tc-tinea",
        name: "Tinea Corporis / Tinea Pedis",
        treatment: "Topical antifungals (terbinafine, clotrimazole)",
        route: "Topical",
        clinicalPearl: "Classic annular 'ringworm' lesions with an active, scaling border and central clearing."
      },
      {
        id: "tc-onychomycosis",
        name: "Onychomycosis",
        treatment: "Oral terbinafine or itraconazole",
        route: "PO",
        clinicalPearl: "Topical treatments generally fail due to poor nail bed penetration. Requires months of oral therapy."
      }
    ]
  },
  {
    id: "microsporum-spp",
    name: "Microsporum species",
    type: "Dermatophyte",
    morphology: "Large, rough-walled macroconidia",
    characteristics: ["Infects skin and hair (but rarely nails)", "Often Wood's lamp positive (fluoresces green)"],
    description: "A genus of dermatophytes commonly acquired from infected animals (cats/dogs) or contaminated soil.",
    diseases: [
      {
        id: "mc-tinea-capitis",
        name: "Tinea Capitis",
        treatment: "Oral griseofulvin or terbinafine",
        route: "PO",
        clinicalPearl: "Often presents as patchy alopecia with scaling in children. Must use oral therapy to penetrate hair follicles."
      }
    ]
  },
  {
    id: "epidermophyton-spp",
    name: "Epidermophyton species",
    type: "Dermatophyte",
    morphology: "Septate hyphae; large, smooth-walled, club-shaped macroconidia",
    characteristics: ["Infects skin and nails (rarely hair)", "Often restricted to E. floccosum in human clinical disease"],
    description: "A dermatophyte genus causing superficial skin and nail infections by keratin digestion. E. floccosum is the primary human pathogen in this genus.",
    diseases: [
      {
        id: "ef-tinea-cruris",
        name: "Tinea Cruris ('Jock Itch')",
        treatment: "Topical terbinafine or clotrimazole",
        route: "Topical",
        clinicalPearl: "Common in groin area, especially in athletes. Often associated with tinea pedis."
      },
      {
        id: "ef-tinea-corporis",
        name: "Tinea Corporis",
        treatment: "Topical antifungals",
        route: "Topical",
        clinicalPearl: "Classical ringworm lesion."
      }
    ]
  },
  {
    id: "fusarium-spp",
    name: "Fusarium species",
    type: "Mold",
    morphology: "Septate hyphae with characteristic crescent-shaped macroconidia",
    characteristics: ["Angioinvasive", "Can produce mycotoxins"],
    description: "An opportunistic environmental mold. Can cause localized infections (keratitis, onychomycosis) in healthy hosts and severe disseminated infections in immunocompromised individuals.",
    diseases: [
      {
        id: "fs-disseminated",
        name: "Disseminated Fusariosis",
        treatment: "Voriconazole or Amphotericin B",
        route: "IV",
        clinicalPearl: "Common in patients with severe neutropenia/hematologic malignancy. Often presents with skin lesions and positive blood cultures (unlike other molds)."
      }
    ]
  },
  {
    id: "talaromyces-marneffei",
    name: "Talaromyces marneffei",
    type: "Dimorphic",
    morphology: "Mold in cold (20°C); small fission yeast in heat (37°C)",
    characteristics: ["Endemic to Southeast Asia", "Associated with bamboo rats"],
    description: "A thermally dimorphic fungus endemic to Southeast Asia. It is a major opportunistic pathogen in patients with advanced HIV/AIDS.",
    diseases: [
      {
        id: "tm-infection",
        name: "Talaromycosis",
        treatment: "Amphotericin B (induction) followed by Itraconazole (maintenance)",
        route: "IV/PO",
        clinicalPearl: "Consider in HIV patients from Southeast Asia presenting with fever, weight loss, lymphadenopathy, and papular skin lesions with central necrosis (resembling molluscum contagiosum)."
      }
    ]
  },
  {
    id: "paracoccidioides-brasiliensis",
    name: "Paracoccidioides brasiliensis",
    type: "Dimorphic",
    morphology: "Mold in cold; large yeast with 'captain's wheel' budding in heat (37°C)",
    characteristics: ["Endemic to Latin America (especially Brazil)"],
    description: "A thermally dimorphic systemic fungus endemic to Central and South America.",
    diseases: [
      {
        id: "pb-paracoccidioidomycosis",
        name: "Paracoccidioidomycosis",
        treatment: "Itraconazole",
        route: "PO",
        clinicalPearl: "Common in adult males (hormonal protective effect of estrogen). Presentation includes chronic cough, lymphadenopathy, and mucocutaneous ulcerative lesions (especially on the face/mouth)."
      }
    ]
  },
  {
    id: "scedosporium-spp",
    name: "Scedosporium species",
    type: "Mold",
    morphology: "Septate hyphae with annelloconidia",
    characteristics: ["Can be resistant to common antifungals like Amphotericin B"],
    description: "An opportunistic mold found in soil and water. Causes infections in both immunocompromised and healthy individuals (often post-traumatic).",
    diseases: [
      {
        id: "ss-scedosporiosis",
        name: "Invasive Scedosporiosis",
        treatment: "Voriconazole",
        route: "IV/PO",
        clinicalPearl: "Frequent cause of infection in near-drowning victims (aspiration of contaminated water) and disseminated disease in transplant recipients."
      }
    ]
  }
];
