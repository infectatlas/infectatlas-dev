import { PathogenLifecycleSection } from "../types";

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
  lifecycleSection?: PathogenLifecycleSection;
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              phase: "Hepatic Stage",
              event: "Sporozoite inoculation",
              location: "Human: Dermal tissue → bloodstream",
              significance: "Infective stage. Sporozoites are injected by an infected female Anopheles mosquito during a blood meal and rapidly enter the bloodstream."
            },
            {
              step: 2,
              phase: "Hepatic Stage",
              event: "Primary hepatic schizogony",
              location: "Human: Hepatocytes",
              significance: "Sporozoites invade hepatocytes and undergo asexual multiplication, producing thousands of merozoites. P. falciparum does not form dormant hypnozoites."
            },
            {
              step: 3,
              phase: "Hepatic Stage",
              event: "Hepatic rupture & merozoite release",
              location: "Human: Liver → bloodstream",
              significance: "Mature hepatic schizonts rupture and release merozoites into the circulation, initiating the erythrocytic stage."
            },
            {
              step: 4,
              phase: "Erythrocytic Stage",
              event: "Red blood cell invasion",
              location: "Human: Erythrocytes",
              significance: "Merozoites invade red blood cells. Unlike P. vivax, P. falciparum can invade erythrocytes of all ages."
            },
            {
              step: 5,
              phase: "Erythrocytic Stage",
              event: "Trophozoite development & microvascular sequestration",
              location: "Human: Erythrocytes → microvasculature",
              significance: "Maturing infected erythrocytes express parasite-derived surface adhesins and sequester in microvascular beds, including the brain, kidneys, and placenta."
            },
            {
              step: 6,
              phase: "Erythrocytic Stage",
              event: "Erythrocytic schizogony & rupture",
              location: "Human: Erythrocytes",
              significance: "Schizonts mature and rupture infected erythrocytes, releasing new merozoites. The approximately 48-hour erythrocytic cycle contributes to periodic febrile paroxysms."
            },
            {
              step: 7,
              phase: "Mosquito Stage",
              event: "Gametocytogenesis",
              location: "Human: Peripheral blood",
              significance: "A subset of parasites differentiates into sexual-stage gametocytes. Mature P. falciparum gametocytes have characteristic crescent or banana shapes."
            },
            {
              step: 8,
              phase: "Mosquito Stage",
              event: "Mosquito ingestion & sexual reproduction",
              location: "Anopheles mosquito: Midgut",
              significance: "A mosquito ingests gametocytes during a blood meal. Gametogenesis, fertilization, and development through the ookinete stage occur in the mosquito midgut."
            },
            {
              step: 9,
              phase: "Mosquito Stage",
              event: "Oocyst maturation & sporozoite migration",
              location: "Anopheles mosquito: Midgut wall → salivary glands",
              significance: "Ookinetes penetrate the midgut wall and develop into oocysts. Sporozoites form within mature oocysts and migrate to the mosquito salivary glands, ready for transmission during a subsequent blood meal."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Malaria — Life Cycle",
          url: "https://www.cdc.gov/dpdx/malaria/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "WHO Guidelines for Malaria",
          url: "https://www.who.int/publications/i/item/guidelines-for-malaria"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Medical Microbiology — Chapter 83: Malaria",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK8584/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              phase: "Hepatic Stage",
              event: "Sporozoite inoculation",
              location: "Human: Dermal tissue → bloodstream",
              significance: "Infective stage. Sporozoites are injected by an infected female Anopheles mosquito during a blood meal and rapidly enter the bloodstream."
            },
            {
              step: 2,
              phase: "Hepatic Stage",
              event: "Hepatic schizogony & hypnozoite formation",
              location: "Human: Hepatocytes",
              significance: "Sporozoites invade hepatocytes. Some develop through active hepatic schizogony, while others become dormant hypnozoites capable of later reactivation."
            },
            {
              step: 3,
              phase: "Hepatic Stage",
              event: "Primary hepatic release & delayed relapse",
              location: "Human: Liver → bloodstream",
              significance: "Hepatic schizonts rupture and release merozoites into the circulation. Reactivation of dormant hypnozoites can produce relapses weeks to years after the initial infection."
            },
            {
              step: 4,
              phase: "Erythrocytic Stage",
              event: "Reticulocyte-restricted invasion",
              location: "Human: Reticulocytes",
              significance: "Merozoites preferentially invade young red blood cells (reticulocytes), which limits parasitemia; typically fewer than 2% of circulating erythrocytes are infected."
            },
            {
              step: 5,
              phase: "Erythrocytic Stage",
              event: "Trophozoite development & erythrocytic schizogony",
              location: "Human: Reticulocytes / erythrocytes",
              significance: "Trophozoites develop within infected cells, with characteristic amoeboid forms and Schüffner dots. Schizonts mature and rupture approximately every 48 hours, releasing new merozoites."
            },
            {
              step: 6,
              phase: "Erythrocytic Stage",
              event: "Gametocytogenesis",
              location: "Human: Peripheral blood",
              significance: "A subset of parasites differentiates into sexual-stage gametocytes that circulate in peripheral blood and become available for uptake by Anopheles mosquitoes."
            },
            {
              step: 7,
              phase: "Mosquito Stage",
              event: "Mosquito ingestion, fertilization & sporogony",
              location: "Anopheles mosquito: Midgut → salivary glands",
              significance: "A mosquito ingests gametocytes during a blood meal. Gametogenesis and fertilization produce a zygote and ookinete, followed by oocyst development and formation of sporozoites that migrate to the salivary glands."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Malaria — Life Cycle",
          url: "https://www.cdc.gov/dpdx/malaria/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "WHO Technical Brief for Malaria — P. vivax",
          url: "https://www.who.int/publications/i/item/guidelines-for-malaria"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Medical Microbiology — Chapter 83: Malaria",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK8584/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Ingestion of cysts",
              location: "Human: Gastrointestinal tract",
              significance: "Infective stage. Cysts are acquired through ingestion of fecally contaminated water or food and by fecal-oral transmission."
            },
            {
              step: 2,
              event: "Excystation",
              location: "Human: Duodenum / proximal small intestine",
              significance: "Each cyst releases two trophozoites."
            },
            {
              step: 3,
              event: "Trophozoite adherence and replication",
              location: "Human: Duodenum / proximal jejunum",
              significance: "Trophozoites attach to intestinal mucosa by a ventral disk and multiply by binary fission. They remain non-invasive and may contribute to mucosal dysfunction and malabsorption."
            },
            {
              step: 4,
              event: "Encystation",
              location: "Human: Distal small intestine / colon",
              significance: "During transit toward colon, trophozoites transform into environmentally resistant cysts."
            },
            {
              step: 5,
              event: "Fecal shedding",
              location: "Human: Stool → external environment",
              significance: "Diagnostic stage. Cysts are commonly found in formed stool and are principal transmissible form; trophozoites may be found in diarrheal stool but are fragile outside host."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Giardiasis — Laboratory Identification of Parasites of Public Health Concern",
          url: "https://www.cdc.gov/dpdx/giardiasis/index.html"
        },
        {
          sourceName: "Adam RD",
          title: "Biology of Giardia lamblia. Clinical Microbiology Reviews. 2001;14(3):447–475.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11432810/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Ingestion of mature cysts",
              location: "Human host: Oral cavity",
              significance: "Infective stage. Ingestion of mature, quadrinucleate cysts via fecally contaminated water, food, or hands. Cysts are environmentally resistant and survive passage through the stomach."
            },
            {
              step: 2,
              event: "Excystation",
              location: "Human host: Small intestine",
              significance: "The cyst wall opens in the small intestine, releasing a transient four-nucleate metacyst that divides into eight motile, single-nucleated trophozoites."
            },
            {
              step: 3,
              event: "Luminal colonization & binary fission",
              location: "Human host: Large intestine lumen",
              significance: "Trophozoites colonize lumen of cecum and colon, replicating asexually by binary fission. In many infections, trophozoites remain non-invasive within the lumen without penetrating tissue."
            },
            {
              step: 4,
              event: "Mucosal invasion & extraintestinal migration",
              location: "Human host: Colonic mucosa & portal circulation",
              significance: "In a subset of infections, trophozoites invade intestinal mucosa and can enter portal circulation to reach liver and other extraintestinal sites. Extraintestinal trophozoites do not encyst and do not contribute to onward transmission."
            },
            {
              step: 5,
              event: "Encystation & fecal excretion",
              location: "Human host / Environment: Colonic lumen & stool",
              significance: "Diagnostic and infective stage. During transit through the colon, luminal trophozoites round up into precysts that mature into quadrinucleate cysts passed in formed stool to continue transmission. Fragile trophozoites passed in liquid diarrheal stool rapidly degenerate in environment."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Amebiasis: Biology and Life Cycle",
          url: "https://www.cdc.gov/dpdx/amebiasis/index.html"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Amebiasis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK519536/"
        },
        {
          sourceName: "World Health Organization",
          title: "Amoebiasis: Report of a WHO Expert Committee",
          url: "https://apps.who.int/iris/handle/10665/42079"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Venereal transmission",
              location: "Human: Urogenital tract",
              significance: "Infective stage. Trophozoites are transmitted primarily through direct sexual contact, including exposure to infected genital secretions."
            },
            {
              step: 2,
              event: "Mucosal colonization",
              location: "Human: Lower urogenital tract",
              significance: "Trophozoites colonize the genital mucosa. T. vaginalis lacks a cyst stage and exists as a motile trophozoite."
            },
            {
              step: 3,
              event: "Binary fission",
              location: "Human: Urogenital tract",
              significance: "Trophozoites multiply asexually by longitudinal binary fission."
            },
            {
              step: 4,
              event: "Excretion & onward transmission",
              location: "Human: Vaginal discharge / semen / urine → new host",
              significance: "Trophozoites present in genital secretions can be transmitted to another person, primarily through sexual contact."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Trichomoniasis — Life Cycle",
          url: "https://www.cdc.gov/dpdx/trichomoniasis/index.html"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Trichomoniasis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK534826/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Feline sexual reproduction (Enteroepithelial cycle)",
              location: "Definitive host felid intestinal epithelium",
              significance: "Cats ingest tissue cysts or oocysts from prey. Sexual reproduction produces unsporulated oocysts shed in feces."
            },
            {
              step: 2,
              event: "Environmental sporulation",
              location: "Soil / water / plant material",
              significance: "Infective stage. Unsporulated oocysts sporulate over 1–5 days and develop infectious sporulated oocysts containing sporozoites."
            },
            {
              step: 3,
              event: "Intermediate host infection",
              location: "Intermediate host: Oral route",
              significance: "Infective stage. Humans and other intermediate hosts acquire infection by ingesting sporulated oocysts from contaminated soil, water, or food, or by eating undercooked meat containing tissue cysts with bradyzoites."
            },
            {
              step: 4,
              event: "Tachyzoite conversion & dissemination",
              location: "Intermediate host: Small intestine → systemic circulation",
              significance: "Ingested sporozoites or bradyzoites give rise to rapidly dividing tachyzoites, which disseminate through the bloodstream and lymphatic system and invade tissues."
            },
            {
              step: 5,
              event: "Chronic tissue encystation & persistence",
              location: "Brain / myocardium / skeletal muscle",
              significance: "Immune pressure drives tachyzoite-to-bradyzoite conversion within intracellular tissue cysts, allowing persistent infection. Ingestion by felids completes the definitive lifecycle. Newly acquired maternal infection during pregnancy can result in circulating tachyzoites crossing the placenta to infect the developing fetus."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Toxoplasmosis",
          url: "https://www.cdc.gov/dpdx/toxoplasmosis/index.html"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Toxoplasma gondii: Cellular and Molecular Biology",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        },
        {
          sourceName: "World Health Organization",
          title: "Foodborne Disease Burden: Toxoplasmosis",
          url: "https://www.who.int/news-room/fact-sheets/detail/toxoplasmosis"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Ingestion of thick-walled sporulated oocysts",
              location: "Human/mammalian host: Oral cavity",
              significance: "Infective stage. Thick-walled oocysts are acquired through fecally contaminated drinking water, recreational water, or food. They are fully sporulated and immediately infectious upon excretion."
            },
            {
              step: 2,
              event: "Excystation",
              location: "Small intestine lumen",
              significance: "Oocysts excyst, each releasing four motile sporozoites."
            },
            {
              step: 3,
              event: "Epithelial colonization",
              location: "Enterocyte apical brush border",
              significance: "Sporozoites attach to enterocytes and become enveloped by the host cell membrane, remaining intracellular but extracytoplasmic at the apical brush border."
            },
            {
              step: 4,
              event: "Merogony & gametogony",
              location: "Enterocyte brush border",
              significance: "Asexual multiplication is followed by sexual differentiation. Microgametes and macrogametes fuse to form zygotes."
            },
            {
              step: "5a",
              event: "Autoinfection branch (thin-walled oocysts)",
              location: "Intestinal lumen",
              significance: "A portion of zygotes develop into thin-walled oocysts that excyst within the host intestinal lumen without exiting, releasing sporozoites for another round of epithelial infection."
            },
            {
              step: "5b",
              event: "Environmental transmission branch (thick-walled oocysts)",
              location: "Intestinal lumen / stool",
              significance: "Infective stage. The majority of zygotes develop into thick-walled oocysts that sporulate within the host and pass in feces, remaining immediately infectious to new hosts."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Cryptosporidiosis",
          url: "https://www.cdc.gov/dpdx/cryptosporidiosis/index.html"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Cryptosporidiosis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        },
        {
          sourceName: "World Health Organization",
          title: "Cryptosporidium in Water Supplies",
          url: "https://www.who.int/publications/i/item/cryptosporidium-in-water-supplies"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Promastigote inoculation",
              location: "Human/mammalian host: Skin/dermal tissue",
              significance: "Infective stage. Female phlebotomine sandflies (Phlebotomus or Lutzomyia) inject motile flagellated metacyclic promastigotes into dermal tissue during blood meal."
            },
            {
              step: 2,
              event: "Phagocytosis & amastigote transformation",
              location: "Human/mammalian host: Macrophages/mononuclear phagocytes",
              significance: "Promastigotes are phagocytosed, lose external flagella, and transform into non-motile amastigotes."
            },
            {
              step: 3,
              event: "Intracellular replication",
              location: "Human/mammalian host: Macrophage phagolysosomes",
              significance: "Diagnostic stage. Amastigotes multiply by binary fission within phagolysosomes; host-cell disruption releases amastigotes to infect additional phagocytes."
            },
            {
              step: 4,
              event: "Vector ingestion of amastigotes",
              location: "Sandfly vector: Midgut",
              significance: "Female sandfly ingests amastigotes during blood meal."
            },
            {
              step: 5,
              event: "Promastigote transformation & anterior migration",
              location: "Vector: Midgut → proboscis",
              significance: "Amastigotes transform to flagellated promastigotes, multiply, migrate toward anterior gut/proboscis, develop into infective metacyclic promastigotes."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Leishmaniasis — Life Cycle",
          url: "https://www.cdc.gov/dpdx/leishmaniasis/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "Leishmaniasis",
          url: "https://www.who.int/news-room/fact-sheets/detail/leishmaniasis"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Leishmaniasis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK531478/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Ingestion of embryonated eggs",
              location: "Human: Oral cavity → gastrointestinal tract",
              significance: "Infective stage. Embryonated eggs are acquired through contaminated hands, food, or surfaces and are swallowed."
            },
            {
              step: 2,
              event: "Hatching & maturation",
              location: "Human: Small intestine → cecum / appendix",
              significance: "Eggs hatch in the small intestine. Larvae mature as they migrate toward the cecum and appendix, where adults reside."
            },
            {
              step: 3,
              event: "Nocturnal perianal migration & oviposition",
              location: "Human: Perianal skin",
              significance: "Gravid female worms migrate out of the anus at night and deposit eggs on perianal skin, where the eggs become infective."
            },
            {
              step: 4,
              event: "Embryonation & autoinfection",
              location: "Human: Perianal skin → hands / mouth",
              significance: "Eggs can become infective within approximately 4–6 hours. Scratching transfers eggs to fingers and surfaces, enabling fecal-oral autoinfection and transmission to others. Retroinfection can occasionally occur when larvae hatch near the anus and migrate back into the rectum."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Enterobiasis — Life Cycle",
          url: "https://www.cdc.gov/dpdx/enterobiasis/index.html"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Enterobius vermicularis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK536974/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Ingestion of embryonated eggs",
              location: "Human: Oral cavity → gastrointestinal tract",
              significance: "Infective stage. Fully embryonated eggs are ingested from soil or food contaminated with human feces. Eggs require approximately 2–4 weeks in warm, moist soil to become infective."
            },
            {
              step: 2,
              event: "Hatching & intestinal penetration",
              location: "Human: Duodenum → intestinal wall",
              significance: "Larvae hatch in the duodenum, penetrate the intestinal mucosa, and enter the circulation."
            },
            {
              step: 3,
              event: "Hepatic-cardiac-pulmonary migration",
              location: "Human: Portal circulation → liver → heart → lungs",
              significance: "Larvae migrate through the portal and systemic circulation to the lungs, where pulmonary development continues."
            },
            {
              step: 4,
              event: "Alveolar breakthrough & bronchial ascent",
              location: "Human: Pulmonary alveoli → bronchi → pharynx",
              significance: "Larvae enter alveoli, ascend the bronchial tree, reach the pharynx, and are swallowed."
            },
            {
              step: 5,
              event: "Adult maturation & oviposition",
              location: "Human: Small intestine → feces → soil",
              significance: "Larvae return to the small intestine and mature into adult worms. Females produce unembryonated eggs that are passed in feces and develop in soil, completing the cycle."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Ascariasis — Life Cycle",
          url: "https://www.cdc.gov/dpdx/ascariasis/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "Soil-transmitted helminth infections",
          url: "https://www.who.int/news-room/fact-sheets/detail/soil-transmitted-helminth-infections"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Ascaris lumbricoides",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          pathwayTitle: "Parasitic Cycle & Internal Autoinfection",
          pathwayDescription: "Infection begins with skin penetration by L3 larvae. Autoinfection can allow infection to persist for years or decades without new environmental exposure.",
          rows: [
            {
              step: 1,
              event: "Percutaneous larval penetration",
              location: "Human skin",
              significance: "Infective stage. Filariform L3 larvae penetrate intact skin into venous capillaries."
            },
            {
              step: 2,
              event: "Venous-pulmonary migration & swallowing",
              location: "Venous circulation → lungs → pharynx",
              significance: "Larvae travel to lungs, break through alveolar capillaries, ascend the tracheobronchial tree, and are swallowed."
            },
            {
              step: 3,
              event: "Enteric maturation into adult females",
              location: "Small intestinal mucosa",
              significance: "Parasitic adult females reproduce by parthenogenesis."
            },
            {
              step: 4,
              event: "Enteric oviposition & rhabditiform hatching",
              location: "Small intestinal mucosa → lumen",
              significance: "Diagnostic stage. Adult females deposit eggs in mucosa; eggs hatch rapidly in situ into rhabditiform L1, pass into bowel lumen and feces."
            },
            {
              step: 5,
              event: "Autoinfection",
              location: "Lower bowel mucosa / perianal skin",
              significance: "Rhabditiform L1 molt into infective L3 within gut lumen/perianal skin, penetrate intestinal mucosa or perianal skin, re-enter circulation and repeat migration."
            }
          ]
        },
        {
          pathwayTitle: "Free-Living Environmental Cycle",
          pathwayDescription: "Rhabditiform larvae passed in stool can develop through a free-living adult generation in warm, moist soil before producing infective L3 larvae.",
          rows: [
            {
              step: 1,
              event: "Fecal excretion of rhabditiform larvae",
              location: "Soil",
              significance: "Noninfective L1 pass in feces."
            },
            {
              step: 2,
              event: "Maturation into free-living adults",
              location: "Soil",
              significance: "Successive molts produce free-living adult male and female worms."
            },
            {
              step: 3,
              event: "Free-living sexual reproduction",
              location: "Soil",
              significance: "Adults mate; females produce eggs that hatch into L1."
            },
            {
              step: 4,
              event: "Transformation into infective filariform larvae",
              location: "Soil",
              significance: "L1 molt into non-feeding infective L3 larvae that seek human skin."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Strongyloidiasis — Life Cycle",
          url: "https://www.cdc.gov/dpdx/strongyloidiasis/index.html"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Strongyloidiasis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        },
        {
          sourceName: "World Health Organization",
          title: "Strongyloidiasis",
          url: "https://www.who.int/news-room/fact-sheets/detail/strongyloidiasis"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Percutaneous L3 larval entry",
              location: "Human: Skin → venous circulation",
              significance: "Infective stage. Filariform L3 larvae in contaminated soil penetrate intact human skin, typically through the feet. Ancylostoma duodenale can also infect humans through oral ingestion of larvae."
            },
            {
              step: 2,
              event: "Venous-pulmonary migration",
              location: "Human: Venous circulation → heart → lungs → pharynx",
              significance: "Larvae travel through the circulation to the lungs, penetrate the alveoli, ascend the bronchial tree, reach the pharynx, and are swallowed."
            },
            {
              step: 3,
              event: "Intestinal maturation & blood-feeding",
              location: "Human: Small intestine",
              significance: "Larvae mature into adult hookworms and attach to the small-intestinal mucosa, where they feed on blood. Chronic blood loss can contribute to iron-deficiency anemia."
            },
            {
              step: 4,
              event: "Egg production & fecal excretion",
              location: "Human: Small intestine → stool → environment",
              significance: "Adult females produce eggs that pass into the intestinal lumen and are excreted in feces. Eggs are not immediately infective to humans."
            },
            {
              step: 5,
              event: "Environmental development to infective L3",
              location: "Environment: Soil",
              significance: "Eggs hatch in warm, moist soil, releasing rhabditiform L1 larvae that develop through successive molts into filariform L3 larvae capable of penetrating human skin."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Hookworm — Life Cycle",
          url: "https://www.cdc.gov/dpdx/hookworm/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "Soil-transmitted helminth infections",
          url: "https://www.who.int/news-room/fact-sheets/detail/soil-transmitted-helminth-infections"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Hookworm",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          pathwayTitle: "Intestinal Taeniasis",
          rows: [
            {
              step: 1,
              event: "Ingestion of cysticerci",
              location: "Human definitive host: Oral cavity",
              significance: "Infective stage. Humans acquire intestinal infection by eating raw or undercooked pork containing viable larval cysts (cysticerci)."
            },
            {
              step: 2,
              event: "Scolex evagination & intestinal attachment",
              location: "Human: Small intestine",
              significance: "The scolex evaginates and anchors to the intestinal mucosa using suckers and hooks."
            },
            {
              step: 3,
              event: "Strobilation & adult tapeworm development",
              location: "Human: Small intestinal lumen",
              significance: "The tapeworm matures into an adult worm, reproduces sexually, and produces gravid proglottids."
            },
            {
              step: 4,
              event: "Proglottid & egg excretion",
              location: "Human / environment: Feces",
              significance: "Diagnostic stage. Gravid proglottids detach and pass in feces, releasing embryonated eggs."
            },
            {
              step: 5,
              event: "Swine intermediate host infection",
              location: "Domestic pigs",
              significance: "Pigs ingest eggs; oncospheres hatch, penetrate the intestinal wall, and encyst as cysticerci in muscle."
            }
          ]
        },
        {
          pathwayTitle: "Human Cysticercosis",
          rows: [
            {
              step: 1,
              event: "Ingestion of T. solium eggs",
              location: "Accidental human intermediate host: Oral cavity",
              significance: "Infective stage. Eggs are acquired from food, water, or soil contaminated with human feces or through fecal-oral autoinfection in an individual harboring an adult tapeworm. Eating undercooked pork does not directly cause cysticercosis."
            },
            {
              step: 2,
              event: "Oncosphere hatching & intestinal penetration",
              location: "Small intestine → mesenteric venules",
              significance: "Eggs hatch; six-hooked oncospheres penetrate the bowel wall and enter mesenteric venules."
            },
            {
              step: 3,
              event: "Systemic dissemination",
              location: "Bloodstream → multiple tissues/organs",
              significance: "Oncospheres disseminate to striated muscle, subcutaneous tissues, eyes, and the central nervous system."
            },
            {
              step: 4,
              event: "Cysticercus development & tissue localization",
              location: "Skeletal muscle, subcutaneous tissue, eyes, CNS",
              significance: "Oncospheres develop over 2–3 months into fluid-filled larval vesicles (cysticerci). CNS infection by cysticerci is neurocysticercosis."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Taeniasis",
          url: "https://www.cdc.gov/dpdx/taeniasis/index.html"
        },
        {
          sourceName: "CDC DPDx",
          title: "Cysticercosis",
          url: "https://www.cdc.gov/dpdx/cysticercosis/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "Taeniasis/Cysticercosis Fact Sheet",
          url: "https://www.who.int/news-room/fact-sheets/detail/taeniasis-cysticercosis"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Neurocysticercosis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Egg shedding into freshwater",
              location: "Human: Venous plexuses → stool or urine → freshwater",
              significance: "Diagnostic stage. Adult worms release eggs that cross the intestinal or urinary tract wall and are excreted in stool or urine, depending on species. Eggs must reach freshwater for the lifecycle to continue."
            },
            {
              step: 2,
              event: "Miracidium hatching & snail invasion",
              location: "Freshwater → freshwater snail",
              significance: "Eggs hatch in freshwater, releasing ciliated miracidia that actively penetrate compatible freshwater snails, the intermediate hosts."
            },
            {
              step: 3,
              event: "Sporocyst development & cercarial production",
              location: "Freshwater snail tissues",
              significance: "Within the snail, miracidia develop into sporocysts and multiply asexually, producing large numbers of fork-tailed cercariae that are released into freshwater."
            },
            {
              step: 4,
              event: "Cercarial skin penetration",
              location: "Human: Skin → bloodstream",
              significance: "Infective stage. Free-swimming cercariae penetrate human skin during freshwater exposure, shed their tails, and become schistosomula."
            },
            {
              step: 5,
              event: "Vascular migration & maturation",
              location: "Human: Bloodstream → liver / portal circulation",
              significance: "Schistosomula migrate through the circulation to the liver and mature into adult male and female worms."
            },
            {
              step: 6,
              event: "Adult worm migration",
              location: "Human: Portal circulation → species-specific venous plexuses",
              significance: "Mature paired worms migrate to species-specific venous plexuses, where females begin producing eggs."
            },
            {
              step: 7,
              event: "Oviposition, tissue passage & excretion",
              location: "Human: Venous plexuses → intestinal or urinary tract → freshwater",
              significance: "Eggs are deposited in venules. Some traverse surrounding tissues and reach the intestinal or urinary lumen for excretion, while retained eggs can provoke granulomatous inflammation and chronic tissue injury."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Schistosomiasis — Life Cycle",
          url: "https://www.cdc.gov/dpdx/schistosomiasis/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "Schistosomiasis",
          url: "https://www.who.int/news-room/fact-sheets/detail/schistosomiasis"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Schistosomiasis",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        }
      ]
    }
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
    ],
    lifecycleSection: {
      title: "Pathogen Lifecycle & Transmission",
      pathways: [
        {
          rows: [
            {
              step: 1,
              event: "Direct skin-to-skin transmission",
              location: "Human: Skin surface",
              significance: "Infective stage. Transmission occurs primarily through prolonged direct skin-to-skin contact, with a fertilized adult female entering a new host."
            },
            {
              step: 2,
              event: "Stratum corneum burrowing & oviposition",
              location: "Human: Stratum corneum",
              significance: "Fertilized females burrow within the superficial stratum corneum and lay eggs. The mites remain within the superficial epidermis rather than invading deeper tissue."
            },
            {
              step: 3,
              event: "Egg hatching & larval emergence",
              location: "Human: Stratum corneum",
              significance: "Eggs hatch after approximately 3–4 days, releasing six-legged larvae that emerge from the burrows."
            },
            {
              step: 4,
              event: "Nymphal development & molting",
              location: "Human: Epidermal surface / skin crevices",
              significance: "Larvae develop through nymphal stages and molt while remaining within the superficial epidermal environment."
            },
            {
              step: 5,
              event: "Adult maturation & mating",
              location: "Human: Skin surface / superficial epidermis",
              significance: "Adults mate on or near the skin surface. Males die after mating, while fertilized females establish new burrows and continue oviposition."
            }
          ]
        }
      ],
      references: [
        {
          sourceName: "CDC DPDx",
          title: "Scabies — Life Cycle",
          url: "https://www.cdc.gov/dpdx/scabies/index.html"
        },
        {
          sourceName: "World Health Organization",
          title: "Scabies",
          url: "https://www.who.int/news-room/fact-sheets/detail/scabies"
        },
        {
          sourceName: "NIH NCBI Bookshelf",
          title: "Scabies",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK430796/"
        }
      ]
    }
  }
];
