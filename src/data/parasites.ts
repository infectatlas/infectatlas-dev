export interface ParasiteDisease {
  id: string;
  name: string;
  treatment: string;
  route: "PO" | "IV" | "IM" | "Topical" | "Supportive" | "multiple" | "Vaccine";
  clinicalPearl?: string;
}

export interface Parasite {
  id: string;
  name: string;
  type: "Protozoa" | "Helminth" | "Ectoparasite";
  organismClass: string;
  family: string;
  morphology: string;
  lifeCycle: string;
  transmission: string;
  vector: string;
  intermediateHost: string;
  reservoir: string;
  characteristics: string[];
  diagnosis: string;
  prevention: string;
  treatmentConcepts: string;
  clinicalMemoryAids: string;
  description: string;
  diseases: ParasiteDisease[];
}

export const parasitesData: Parasite[] = [
  {
    id: "plasmodium-falciparum",
    name: "Plasmodium falciparum",
    type: "Protozoa",
    organismClass: "Sporozoa",
    family: "Plasmodiidae",
    morphology: "Rings, trophozoites, schizonts, banana-shaped gametocytes in RBCs",
    lifeCycle: "Sporozoites injected by mosquito -> liver (schizonts) -> blood (trophozoites/schizonts/gametocytes)",
    transmission: "Vector-borne",
    vector: "Female Anopheles mosquito",
    intermediateHost: "Humans",
    reservoir: "Humans",
    characteristics: ["Banana-shaped gametocytes", "Irregular fever pattern", "Maurer clefts"],
    diagnosis: "Thick/thin blood smears, rapid diagnostic tests (RDTs)",
    prevention: "Mosquito nets, DEET, chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine)",
    treatmentConcepts: "Artemisinin-based combination therapies (ACTs). Often chloroquine-resistant.",
    clinicalMemoryAids: "Falciparum is 'False' (irregular fevers) and 'Fierce' (severe disease, cerebral malaria).",
    description: "Plasmodium falciparum is the most virulent species of malaria. It infects RBCs of all ages, leading to high parasitemia and severe complications like cerebral malaria due to RBC sickling and rosetting.",
    diseases: [
      {
        id: "malaria-falciparum",
        name: "Malaria (Severe)",
        treatment: "Artemether-lumefantrine or IV artesunate",
        route: "multiple",
        clinicalPearl: "Always suspect P. falciparum in a returning traveler with fever. Medical emergency."
      }
    ]
  },
  {
    id: "plasmodium-vivax",
    name: "Plasmodium vivax / ovale",
    type: "Protozoa",
    organismClass: "Sporozoa",
    family: "Plasmodiidae",
    morphology: "Enlarged RBCs, Schüffner dots",
    lifeCycle: "Forms dormant hypnozoites in the liver.",
    transmission: "Vector-borne",
    vector: "Female Anopheles mosquito",
    intermediateHost: "Humans",
    reservoir: "Humans",
    characteristics: ["Tertian fever pattern (every 48 hours)", "Hypnozoites in liver", "Schüffner dots"],
    diagnosis: "Thick/thin blood smears",
    prevention: "Mosquito nets, DEET",
    treatmentConcepts: "Chloroquine (if sensitive) + Primaquine or Tafenoquine (to eradicate liver hypnozoites)",
    clinicalMemoryAids: "Vivax/Ovale have 'O' for dOrmant hypnozoites.",
    description: "P. vivax and P. ovale cause tertian malaria. They are unique in forming dormant liver stages (hypnozoites) that can cause relapses months or years later. Primaquine is required for radical cure.",
    diseases: [
      {
        id: "malaria-vivax",
        name: "Malaria (Tertian)",
        treatment: "Chloroquine + Primaquine",
        route: "PO",
        clinicalPearl: "Must check G6PD status before giving Primaquine to avoid severe hemolytic anemia."
      }
    ]
  },
  {
    id: "giardia-lamblia",
    name: "Giardia lamblia",
    type: "Protozoa",
    organismClass: "Flagellate",
    family: "Hexamitidae",
    morphology: "Trophozoite (pear-shaped, 2 nuclei, 'old man face'), Cyst (oval, 4 nuclei)",
    lifeCycle: "Ingestion of cysts -> excystation in duodenum -> multiplication of trophozoites -> encystation in colon",
    transmission: "Fecal-oral (waterborne, foodborne, person-to-person)",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans, beavers, cats, dogs",
    characteristics: ["Foul-smelling, fatty diarrhea", "Falling leaf motility"],
    diagnosis: "Stool antigen test, O&P (cysts or trophozoites in stool)",
    prevention: "Boiling or filtering water when camping",
    treatmentConcepts: "Metronidazole, Tinidazole, or Nitazoxanide",
    clinicalMemoryAids: "Fat-rich Ghastly diarrhea from Giardia (campsite water).",
    description: "Giardia is a common cause of waterborne diarrhea in campers/hikers ('beaver fever'). It attaches to the intestinal wall but does not invade, causing malabsorption and steatorrhea.",
    diseases: [
      {
        id: "giardiasis",
        name: "Giardiasis",
        treatment: "Metronidazole",
        route: "PO",
        clinicalPearl: "Classically presents with foul-smelling, non-bloody, fatty stools and flatulence after a camping trip."
      }
    ]
  },
  {
    id: "entamoeba-histolytica",
    name: "Entamoeba histolytica",
    type: "Protozoa",
    organismClass: "Amoeba",
    family: "Entamoebidae",
    morphology: "Trophozoites with engulfed RBCs; cysts with up to 4 nuclei",
    lifeCycle: "Ingestion of cysts -> excystation -> trophozoites invade colonic mucosa -> can disseminate to liver",
    transmission: "Fecal-oral",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans",
    characteristics: ["Flask-shaped colonic ulcers", "Engulfed RBCs", "Anchovy paste liver abscess"],
    diagnosis: "Stool antigen, serology, O&P (trophozoites with RBCs)",
    prevention: "Water sanitation",
    treatmentConcepts: "Metronidazole (for tissue) + Paromomycin (for luminal cysts)",
    clinicalMemoryAids: "Histolytica = Tissue lysing (ulcers, abscesses, bloody diarrhea).",
    description: "Entamoeba histolytica causes amebic dysentery and can disseminate to form liver abscesses (classically 'anchovy paste' exudate).",
    diseases: [
      {
        id: "amebiasis",
        name: "Amebic Dysentery / Amebiasis",
        treatment: "Metronidazole + Paromomycin",
        route: "PO",
        clinicalPearl: "If an amebic liver abscess is suspected, avoid surgical drainage unless absolutely necessary (responds well to metronidazole)."
      }
    ]
  },
  {
    id: "trichomonas-vaginalis",
    name: "Trichomonas vaginalis",
    type: "Protozoa",
    organismClass: "Flagellate",
    family: "Trichomonadidae",
    morphology: "Trophozoite only (pear-shaped, flagellated, undulating membrane). No cyst form.",
    lifeCycle: "Direct transmission of trophozoite",
    transmission: "Sexual",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans",
    characteristics: ["Strawberry cervix", "Motile trophozoites on wet mount", "Frothy, yellow-green discharge"],
    diagnosis: "Wet mount, NAAT",
    prevention: "Condoms, treating partners",
    treatmentConcepts: "Metronidazole (patient and partner)",
    clinicalMemoryAids: "Trichomonas = Tricks on wet mount (motile), strawberry cervix.",
    description: "A common sexually transmitted parasite causing vaginitis. Uniquely, it has no cyst stage and cannot survive outside the host.",
    diseases: [
      {
        id: "trichomoniasis",
        name: "Trichomoniasis",
        treatment: "Metronidazole",
        route: "PO",
        clinicalPearl: "Must treat both the patient and sexual partners simultaneously to prevent reinfection."
      }
    ]
  },
  {
    id: "toxoplasma-gondii",
    name: "Toxoplasma gondii",
    type: "Protozoa",
    organismClass: "Sporozoa",
    family: "Sarcocystidae",
    morphology: "Tachyzoites, bradyzoites in tissue cysts, oocysts",
    lifeCycle: "Cats shed oocysts -> ingested by intermediate hosts (mice, humans) -> tachyzoites disseminate -> bradyzoites form tissue cysts",
    transmission: "Ingestion of cysts in undercooked meat, contact with cat feces, transplacental",
    vector: "None",
    intermediateHost: "Humans, livestock, rodents",
    reservoir: "Cats (definitive host)",
    characteristics: ["Ring-enhancing brain lesions", "Chorioretinitis", "Intracranial calcifications"],
    diagnosis: "Serology, PCR, MRI",
    prevention: "Pregnant women should avoid changing litter boxes; cook meat thoroughly",
    treatmentConcepts: "Sulfadiazine + Pyrimethamine + Folinic acid",
    clinicalMemoryAids: "Toxo = Ring-enhancing lesions in HIV, TORCH infection in pregnancy.",
    description: "Toxoplasma gondii is a major opportunistic pathogen in HIV/AIDS, classically presenting with multiple ring-enhancing lesions on MRI. It is also a classic TORCH infection causing congenital defects.",
    diseases: [
      {
        id: "toxoplasmosis",
        name: "Toxoplasmosis (Encephalitis)",
        treatment: "Sulfadiazine + Pyrimethamine",
        route: "PO",
        clinicalPearl: "In AIDS patients with CD4 < 100, TMP-SMX is used for prophylaxis against Toxoplasma."
      },
      {
        id: "congenital-toxo",
        name: "Congenital Toxoplasmosis",
        treatment: "Pyrimethamine + Sulfadiazine + Folinic Acid",
        route: "PO",
        clinicalPearl: "Classic triad: Chorioretinitis, Hydrocephalus, Intracranial calcifications."
      }
    ]
  },
  {
    id: "cryptosporidium",
    name: "Cryptosporidium species",
    type: "Protozoa",
    organismClass: "Sporozoa",
    family: "Cryptosporidiidae",
    morphology: "Oocysts (4-6 µm) staining acid-fast",
    lifeCycle: "Ingestion of oocysts -> excyst in intestine -> sexual/asexual reproduction in epithelium -> oocysts shed",
    transmission: "Fecal-oral (waterborne)",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans, cattle",
    characteristics: ["Acid-fast oocysts in stool", "Severe diarrhea in HIV/AIDS"],
    diagnosis: "Stool acid-fast stain, antigen test, PCR",
    prevention: "Water filtration (resistant to chlorination)",
    treatmentConcepts: "Nitazoxanide (immunocompetent); ART (immunocompromised)",
    clinicalMemoryAids: "Crypto = Cysts in water, Acid-fast, watery diarrhea in AIDS.",
    description: "Cryptosporidium causes self-limiting diarrhea in healthy individuals but severe, intractable, life-threatening diarrhea in patients with advanced HIV/AIDS. Oocysts are highly resistant to chlorination.",
    diseases: [
      {
        id: "cryptosporidiosis",
        name: "Cryptosporidiosis",
        treatment: "Nitazoxanide (if healthy) / ART (if HIV+)",
        route: "PO",
        clinicalPearl: "Consider in HIV patients with CD4 < 100 presenting with profound, watery diarrhea."
      }
    ]
  },
  {
    id: "leishmania",
    name: "Leishmania species",
    type: "Protozoa",
    organismClass: "Kinetoplastid",
    family: "Trypanosomatidae",
    morphology: "Amastigotes inside macrophages, promastigotes in sandfly",
    lifeCycle: "Sandfly injects promastigotes -> phagocytosed by macrophages -> transform into amastigotes and multiply",
    transmission: "Vector-borne",
    vector: "Sandfly",
    intermediateHost: "None",
    reservoir: "Dogs, rodents, foxes",
    characteristics: ["Amastigotes in macrophages", "Kala-azar (Visceral)", "Cutaneous ulcers"],
    diagnosis: "Tissue biopsy (amastigotes), PCR",
    prevention: "Sandfly protection",
    treatmentConcepts: "Amphotericin B (Visceral), Sodium stibogluconate",
    clinicalMemoryAids: "Leishmania = Sandfly, macrophages packed with amastigotes.",
    description: "Leishmania causes diverse clinical syndromes ranging from cutaneous leishmaniasis (ulcers) to visceral leishmaniasis (kala-azar), characterized by massive hepatosplenomegaly, pancytopenia, and spiking fevers.",
    diseases: [
      {
        id: "visceral-leishmaniasis",
        name: "Visceral Leishmaniasis (Kala-azar)",
        treatment: "Liposomal Amphotericin B",
        route: "IV",
        clinicalPearl: "Presents with massive splenomegaly, pancytopenia, and hypergammaglobulinemia. Fatal if untreated."
      }
    ]
  },
  {
    id: "enterobius-vermicularis",
    name: "Enterobius vermicularis",
    type: "Helminth",
    organismClass: "Nematode (Roundworm)",
    family: "Oxyuridae",
    morphology: "Small white worms; eggs are asymmetrically flattened",
    lifeCycle: "Ingestion of eggs -> hatch in small intestine -> mature in colon -> females migrate to perianal skin at night to lay eggs",
    transmission: "Fecal-oral",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans",
    characteristics: ["Pinworm", "Perianal pruritus (especially at night)"],
    diagnosis: "Tape test (Scotch tape on perianal area looking for eggs)",
    prevention: "Handwashing, clipping fingernails",
    treatmentConcepts: "Albendazole, Mebendazole, or Pyrantel pamoate",
    clinicalMemoryAids: "Enterobius = 'Enter' the butt (Pinworm, perianal itch, tape test).",
    description: "E. vermicularis is the pinworm, the most common helminth infection in the US. It classically causes intense perianal itching in young children.",
    diseases: [
      {
        id: "enterobiasis",
        name: "Enterobiasis (Pinworm Infection)",
        treatment: "Albendazole (treat entire household)",
        route: "PO",
        clinicalPearl: "Always treat the entire household due to high transmissibility."
      }
    ]
  },
  {
    id: "ascaris-lumbricoides",
    name: "Ascaris lumbricoides",
    type: "Helminth",
    organismClass: "Nematode (Roundworm)",
    family: "Ascarididae",
    morphology: "Large roundworms; bumpy, knobby eggs",
    lifeCycle: "Ingestion of eggs -> hatch -> larvae migrate to lungs -> coughed up & swallowed -> mature to adults in intestine",
    transmission: "Fecal-oral (contaminated soil)",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans",
    characteristics: ["Largest intestinal nematode", "Löffler syndrome (eosinophilic pneumonitis)", "Intestinal obstruction"],
    diagnosis: "O&P (eggs in stool), passage of adult worm",
    prevention: "Proper sanitation",
    treatmentConcepts: "Albendazole or Mebendazole",
    clinicalMemoryAids: "Ascaris = A 'Scary' large worm blocking the gut/bile duct.",
    description: "Ascaris lumbricoides is a giant roundworm. Larval migration through the lungs can cause eosinophilic pneumonitis, while large worm burdens in the gut can cause bowel or biliary obstruction.",
    diseases: [
      {
        id: "ascariasis",
        name: "Ascariasis",
        treatment: "Albendazole",
        route: "PO",
        clinicalPearl: "Can cause acute cholangitis or appendicitis if an adult worm migrates into the biliary tree or appendix."
      }
    ]
  },
  {
    id: "strongyloides-stercoralis",
    name: "Strongyloides stercoralis",
    type: "Helminth",
    organismClass: "Nematode (Roundworm)",
    family: "Strongyloididae",
    morphology: "Rhabditiform larvae (stool), filariform larvae (infective)",
    lifeCycle: "Filariform larvae penetrate intact skin -> lungs -> swallowed -> adult females in intestine -> larvae excreted OR autoinfect",
    transmission: "Skin penetration",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans, dogs",
    characteristics: ["Autoinfection cycle", "Hyperinfection syndrome in immunocompromised", "Larva currens"],
    diagnosis: "Rhabditiform larvae in stool (NOT eggs), serology",
    prevention: "Wear shoes, proper sanitation",
    treatmentConcepts: "Ivermectin",
    clinicalMemoryAids: "Strongyloides = Strong autoinfection loop, Larvae in stool, Ivermectin.",
    description: "Unique among nematodes for its ability to replicate within the human host (autoinfection). Can cause a fatal disseminated hyperinfection syndrome in patients given systemic corticosteroids.",
    diseases: [
      {
        id: "strongyloidiasis",
        name: "Strongyloidiasis",
        treatment: "Ivermectin",
        route: "PO",
        clinicalPearl: "Check for Strongyloides before starting high-dose steroids in patients from endemic areas to prevent hyperinfection."
      }
    ]
  },
  {
    id: "hookworms",
    name: "Ancylostoma / Necator",
    type: "Helminth",
    organismClass: "Nematode (Roundworm)",
    family: "Ancylostomatidae",
    morphology: "Filariform larvae (infective), eggs in stool",
    lifeCycle: "Larvae penetrate skin -> lungs -> swallowed -> mature in small intestine, attaching to mucosa and sucking blood",
    transmission: "Skin penetration",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans",
    characteristics: ["Microcytic anemia", "Ground itch", "Eosinophilia"],
    diagnosis: "O&P (eggs in stool)",
    prevention: "Wear shoes",
    treatmentConcepts: "Albendazole",
    clinicalMemoryAids: "Hookworms 'hook' your blood -> Iron deficiency anemia.",
    description: "Ancylostoma duodenale and Necator americanus are hookworms. They attach to the intestinal villi and consume blood, making them a leading cause of iron deficiency anemia globally.",
    diseases: [
      {
        id: "hookworm-infection",
        name: "Hookworm Infection",
        treatment: "Albendazole + Iron supplementation",
        route: "PO",
        clinicalPearl: "Classic presentation is a barefoot child with profound microcytic anemia, pica, and eosinophilia."
      }
    ]
  },
  {
    id: "taenia-solium",
    name: "Taenia solium",
    type: "Helminth",
    organismClass: "Cestode (Tapeworm)",
    family: "Taeniidae",
    morphology: "Adult tapeworm (scolex with 4 suckers and hooks), Cysticerci in tissue",
    lifeCycle: "Ingestion of undercooked pork (tapeworm) OR ingestion of eggs (cysticercosis)",
    transmission: "Fecal-oral (eggs), Foodborne (cysts)",
    vector: "None",
    intermediateHost: "Pigs (humans can be accidental intermediate hosts)",
    reservoir: "Humans, Pigs",
    characteristics: ["Pork tapeworm", "Neurocysticercosis (seizures, brain cysts)"],
    diagnosis: "O&P (eggs/proglottids in stool), MRI (brain cysts), serology",
    prevention: "Cook pork thoroughly, proper sanitation",
    treatmentConcepts: "Praziquantel (tapeworm), Albendazole + Steroids (neurocysticercosis)",
    clinicalMemoryAids: "Solium = Swine (Pork). Eggs = Brain cysts. Cysts = Gut tapeworm.",
    description: "T. solium can cause two distinct diseases depending on the infectious stage ingested: adult tapeworm infection (from eating cyst-laden pork) and cysticercosis (from eating eggs via fecal-oral route). Neurocysticercosis is a leading cause of adult-onset seizures globally.",
    diseases: [
      {
        id: "neurocysticercosis",
        name: "Neurocysticercosis",
        treatment: "Albendazole + Dexamethasone",
        route: "PO",
        clinicalPearl: "Steroids must be given before anthelminthic therapy to prevent severe inflammation from dying cysts in the brain."
      }
    ]
  },
  {
    id: "schistosoma",
    name: "Schistosoma species",
    type: "Helminth",
    organismClass: "Trematode (Fluke)",
    family: "Schistosomatidae",
    morphology: "Adults in copula (blood vessels), eggs with spines (lateral or terminal)",
    lifeCycle: "Eggs hatch in water -> infect snails -> cercariae emerge -> penetrate human skin -> mature in veins",
    transmission: "Skin penetration in fresh water",
    vector: "None",
    intermediateHost: "Freshwater snails",
    reservoir: "Humans, cattle",
    characteristics: ["Swimmer's itch", "Portal hypertension (S. mansoni)", "Squamous cell carcinoma of bladder (S. haematobium)"],
    diagnosis: "O&P (eggs in stool or urine), serology",
    prevention: "Avoid swimming in endemic freshwater",
    treatmentConcepts: "Praziquantel",
    clinicalMemoryAids: "Schistosoma = Snails, Skin penetration, Spined eggs, Squamous cell CA.",
    description: "Blood flukes that cause schistosomiasis. S. mansoni (lateral spine) and S. japonicum affect the GI/liver causing portal hypertension. S. haematobium (terminal spine) affects the bladder, increasing risk of squamous cell carcinoma.",
    diseases: [
      {
        id: "schistosomiasis",
        name: "Schistosomiasis",
        treatment: "Praziquantel",
        route: "PO",
        clinicalPearl: "S. haematobium is a classic cause of painless terminal hematuria in a patient from Africa/Middle East."
      }
    ]
  },
  {
    id: "sarcoptes-scabiei",
    name: "Sarcoptes scabiei",
    type: "Ectoparasite",
    organismClass: "Arachnid (Mite)",
    family: "Sarcoptidae",
    morphology: "Microscopic mite",
    lifeCycle: "Females burrow into epidermis to lay eggs",
    transmission: "Direct skin-to-skin contact, fomites",
    vector: "None",
    intermediateHost: "None",
    reservoir: "Humans",
    characteristics: ["Intensely pruritic burrows", "Worse at night", "Web spaces of fingers/toes"],
    diagnosis: "Clinical, skin scraping showing mites/eggs",
    prevention: "Avoid direct contact, wash clothes/bedding in hot water",
    treatmentConcepts: "Permethrin cream or oral Ivermectin",
    clinicalMemoryAids: "Scabies = Sarcoptes, severely itchy skin burrows.",
    description: "Scabies is caused by a mite burrowing into the stratum corneum, causing a delayed type IV hypersensitivity reaction to the mite and its feces. Highly contagious.",
    diseases: [
      {
        id: "scabies",
        name: "Scabies",
        treatment: "Permethrin 5% cream (topical)",
        route: "Topical",
        clinicalPearl: "Crusted (Norwegian) scabies can occur in immunocompromised patients, presenting with thick crusts and thousands of mites."
      }
    ]
  }
];
