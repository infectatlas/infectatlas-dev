import { PathogenLifecycle } from "../types";

export const pathogenLifecycles: Record<string, PathogenLifecycle> = {
  // ==========================================
  // PARASITES (15 SPECIES IN SITE INVENTORY)
  // ==========================================

  // 1. Giardia lamblia (duodenalis) - Standard Single Table (5 rows)
  "giardia-lamblia": {
    id: "giardia-lamblia",
    name: "Giardia duodenalis (lamblia)",
    type: "standard",
    subtitle: "Flagellate Protozoan Lifecycle (CDC DPDx Benchmark)",
    sourceNote: "CDC DPDx / Adam RD. Biology of Giardia lamblia",
    steps: [
      {
        step: "1",
        event: "Ingestion of infectious quadrinucleated cysts",
        site: "Host: Human / Animal reservoir • Anatomical Site: Upper GI tract (oral entry)",
        significance: "Infective stage; hardy outer cyst wall resists gastric acid and environmental chlorination; infectious dose is low (10–100 cysts)."
      },
      {
        step: "2",
        event: "Gastric acid activation and duodenal excystation",
        site: "Host: Human • Anatomical Site: Duodenum and proximal jejunum",
        significance: "Pancreatic enzymes and alkaline pH trigger cyst rupture; each cyst yields two motile, binucleated trophozoites."
      },
      {
        step: "3",
        event: "Trophozoite mucosal adherence and binary fission",
        site: "Host: Human • Anatomical Site: Duodenal brush border epithelium (lumen)",
        significance: "Adheres via ventral adhesive sucking disk without mucosal tissue invasion; causes enterocyte apoptosis, microvillar blunting, malabsorption, and foul-smelling steatorrhea."
      },
      {
        step: "4",
        event: "Luminal encystation in distal intestine",
        site: "Host: Human • Anatomical Site: Lower ileum and ascending colon",
        significance: "Bile salt depletion and dehydration stimulate trophozoites to retract flagella and secrete a protective extracellular cyst matrix."
      },
      {
        step: "5",
        event: "Fecal passage of cysts and trophozoites into environment",
        site: "Host: External environment (freshwater, soil, fomites)",
        significance: "Diagnostic stage; quadrinucleated cysts and pyriform trophozoites detectable on stool O&P and antigen tests; cysts are immediately infectious upon excretion."
      }
    ]
  },

  // 2. Strongyloides stercoralis - Branched Table (6 rows)
  "strongyloides-stercoralis": {
    id: "strongyloides-stercoralis",
    name: "Strongyloides stercoralis",
    type: "branched",
    subtitle: "Nematode Branched Lifecycle (Primary, Free-Living & Autoinfection Pathways)",
    sourceNote: "CDC DPDx / Grove DI. Human Strongyloidiasis Reference",
    steps: [
      {
        step: "1",
        branch: "Primary Parasitic Pathway",
        event: "Percutaneous penetration of filariform (L3) larvae",
        site: "Host: Human • Anatomical Site: Skin (bare feet, exposed dermis)",
        significance: "Infective stage; microscopic L3 filariform larvae actively burrow through intact skin from contaminated warm soil."
      },
      {
        step: "2",
        branch: "Primary Parasitic Pathway",
        event: "Venous transit, trans-alveolar migration, and deglutition",
        site: "Host: Human • Anatomical Site: Venous circulation → Alveoli → Trachea → Pharynx",
        significance: "Larvae break into alveolar air spaces (causing transient eosinophilic pneumonitis / Löffler syndrome) and are swallowed via the mucociliary escalator."
      },
      {
        step: "3",
        branch: "Primary Parasitic Pathway",
        event: "Mucosal maturation of parthenogenetic females and oviposition",
        site: "Host: Human • Anatomical Site: Duodenal and jejunal submucosa",
        significance: "Adult parasitic females embed in mucosal crypts and lay eggs that hatch in situ into non-infective rhabditiform (L1) larvae."
      },
      {
        step: "4",
        branch: "Primary Parasitic Pathway",
        event: "Fecal shedding of rhabditiform (L1) larvae",
        site: "Host: Human / Soil • Anatomical Site: Stool and warm moist soil",
        significance: "Diagnostic stage; rhabditiform larvae (not eggs) are shed in stool; detected by stool microscopy, agar plate culture, or serology."
      },
      {
        step: "5",
        branch: "Branch A (Environmental Free-Living Cycle)",
        event: "Soil maturation into dioecious free-living adults",
        site: "Host: External Environment • Anatomical Site: Warm, moist soil",
        significance: "L1 larvae in soil can develop into adult male and female worms, replicating indefinitely in soil without human contact and generating infective L3 larvae."
      },
      {
        step: "6",
        branch: "Branch B (Internal Autoinfection Cycle)",
        event: "Accelerated intraluminal transformation into invasive L3 larvae",
        site: "Host: Human • Anatomical Site: Lower ileum / perianal skin → Systemic circulation",
        significance: "L1 larvae prematurely molt to L3 larvae within the gut and reinvade intestinal wall or perianal skin; enables decades-long carriage and fatal hyperinfection syndrome with bacteremia during corticosteroid therapy."
      }
    ]
  },

  // 3. Taenia solium - Separate Pathways (2 Sub-Tables)
  "taenia-solium": {
    id: "taenia-solium",
    name: "Taenia solium",
    type: "separate_pathways",
    subtitle: "Cestode Dual Lifecycle (Definitive Host vs Accidental Intermediate Host Pathways)",
    sourceNote: "CDC DPDx / Garcia HH. Taenia solium cysticercosis and taeniasis guidelines",
    pathways: [
      {
        title: "Pathway A: Intestinal Taeniasis",
        hostRole: "Definitive Host (Human)",
        description: "Acquired exclusively by ingesting larval cysticerci embedded in undercooked pork. Results in adult gut tapeworm infection.",
        steps: [
          {
            step: "A1",
            event: "Ingestion of viable cysticerci (Cysticercus cellulosae) in undercooked pork",
            site: "Host: Human • Anatomical Site: Upper GI tract (oral entry)",
            significance: "Infective stage for intestinal taeniasis; larval cysts survive sub-lethal thermal cooking and excyst upon reaching the duodenum."
          },
          {
            step: "A2",
            event: "Scolex evagination and anchoring to jejunal mucosa",
            site: "Host: Human • Anatomical Site: Proximal small intestine (jejunum)",
            significance: "Scolex evaginates, anchoring firmly to intestinal mucosa using 4 muscular suckers and a rostellum of chitinous hooklets."
          },
          {
            step: "A3",
            event: "Strobilation and development into adult tapeworm",
            site: "Host: Human • Anatomical Site: Small intestine lumen",
            significance: "Grows over 2–3 months into a 2–7 meter adult tapeworm comprised of hundreds of proglottids; clinically mild or asymptomatic."
          },
          {
            step: "A4",
            event: "Shedding of gravid proglottids and embryonated eggs in stool",
            site: "Host: Human / External Environment • Anatomical Site: Feces → Soil/Vegetation",
            significance: "Diagnostic stage for taeniasis; eggs and gravid proglottids (7–13 lateral uterine branches) shed in feces; eggs are infective to pigs and humans."
          },
          {
            step: "A5",
            event: "Swine intermediate host cycle",
            site: "Host: Domestic Pig (Sus scrofa) • Anatomical Site: Porcine skeletal and cardiac muscle",
            significance: "Swine ingest human fecal eggs; hexacanth oncospheres hatch, penetrate intestinal veins, and encyst into cysticerci in porcine muscle."
          }
        ]
      },
      {
        title: "Pathway B: Cysticercosis & Neurocysticercosis",
        hostRole: "Accidental Intermediate Host (Human)",
        description: "Acquired exclusively by ingesting microscopic T. solium eggs via human fecal-oral contamination. Results in invasive tissue cysts.",
        steps: [
          {
            step: "B1",
            event: "Ingestion of microscopic T. solium eggs via human fecal-oral route",
            site: "Host: Human • Anatomical Site: Upper GI tract (oral entry)",
            significance: "Crucial medical distinction: caused by eating human fecal eggs (not pork cysts); food handlers and close contacts of tapeworm carriers are at high risk."
          },
          {
            step: "B2",
            event: "Gastric acid activation and oncosphere hatching",
            site: "Host: Human • Anatomical Site: Stomach and duodenum lumen",
            significance: "Gastric acid dissolves outer embryophore; motile hexacanth oncospheres hatch and actively penetrate the intestinal mesenteric mucosa."
          },
          {
            step: "B3",
            event: "Hematogenous dissemination across blood-tissue barriers",
            site: "Host: Human • Anatomical Site: Mesenteric venules → Systemic arterial circulation",
            significance: "Oncospheres enter microcirculation and breach the blood-brain barrier, seeding brain parenchyma, subarachnoid space, striated muscle, and eyes."
          },
          {
            step: "B4",
            event: "Parenchymal encystment (Cysticercus cellulosae formation)",
            site: "Host: Human • Anatomical Site: Cerebral parenchyma, ventricles, subcutaneous tissue",
            significance: "Diagnostic stage on neuroimaging; oncospheres mature into 0.5–2 cm fluid-filled cysticerci with invaginated scolex; leading cause of acquired adult-onset epilepsy in endemic regions."
          },
          {
            step: "B5",
            event: "Cyst degeneration and inflammatory host crisis",
            site: "Host: Human • Anatomical Site: CNS parenchyma and cerebrospinal fluid",
            significance: "As viable cysts lose immune-evasive masking and die, host inflammatory response triggers severe perilesional edema, acute seizures, or hydrocephalus; pre-treatment with corticosteroids is mandatory before anthelminthics."
          }
        ]
      }
    ]
  },

  // 4. Plasmodium falciparum - Phase-Grouped Table (8 rows)
  "plasmodium-falciparum": {
    id: "plasmodium-falciparum",
    name: "Plasmodium falciparum",
    type: "phase_grouped",
    subtitle: "Apicomplexan Multi-Compartment Lifecycle (Hepatic, Erythrocytic & Vector Phases)",
    sourceNote: "CDC DPDx / WHO Malaria Treatment Guidelines",
    steps: [
      {
        step: "1",
        phase: "Phase 1: Hepatic Phase (Exoerythrocytic Schizogony)",
        event: "Sporozoite inoculation during female Anopheles blood meal",
        site: "Host: Human • Anatomical Site: Dermal microvasculature → Sinusoidal liver circulation",
        significance: "Infective stage for humans; motile sporozoites travel through blood and invade hepatocytes within 30–60 minutes."
      },
      {
        step: "2",
        phase: "Phase 1: Hepatic Phase (Exoerythrocytic Schizogony)",
        event: "Intrahepatic asexual replication (tissue schizogony)",
        site: "Host: Human • Anatomical Site: Liver parenchymal hepatocytes",
        significance: "Single sporozoite produces 30,000–40,000 merozoites over 6–14 days; no dormant hypnozoite liver stage exists in P. falciparum; clinically asymptomatic."
      },
      {
        step: "3",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Hepatocyte rupture and pan-erythrocyte invasion",
        site: "Host: Human • Anatomical Site: Peripheral blood circulation",
        significance: "Merozoites invade erythrocytes of all maturities (reticulocytes and mature RBCs), permitting unrestricted, life-threatening hyperparasitemia (>5%)."
      },
      {
        step: "4",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Trophozoite maturation: ring forms, trophozoites, and schizonts",
        site: "Host: Human • Anatomical Site: Circulating red blood cells",
        significance: "Diagnostic stage; delicate ring forms with double chromatin dots and Maurer clefts visible on Giemsa-stained thin/thick smears."
      },
      {
        step: "5",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Synchronized schizont lysis and cytokine release",
        site: "Host: Human • Anatomical Site: Bloodstream / Splenic microvasculature",
        significance: "Synchronized rupture releases hemozoin, pyrogens, and TNF-alpha, triggering irregular tertian fevers (36–48h paroxysms) and intravascular hemolysis (blackwater fever)."
      },
      {
        step: "6",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "PfEMP-1 cytoadherence and microvascular sequestration",
        site: "Host: Human • Anatomical Site: Cerebral, placental, and renal deep capillary beds",
        significance: "Parasite-derived PfEMP-1 knobs bind endothelial CD36 and ICAM-1; prevents splenic filtration while causing fatal microvascular plugging, cerebral malaria, and lactic acidosis."
      },
      {
        step: "7",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Gametocytogenesis into sexual forms",
        site: "Host: Human • Anatomical Site: Bone marrow and peripheral bloodstream",
        significance: "Transmissible stage to mosquito vector; distinctive banana- or crescent-shaped gametocytes appear in peripheral blood 7–10 days post-infection."
      },
      {
        step: "8",
        phase: "Phase 3: Mosquito Vector Phase (Sporogonic Cycle)",
        event: "Sexual fertilization, ookinete motile invasion, and oocyst sporogony",
        site: "Host: Female Anopheles mosquito • Anatomical Site: Midgut lumen and salivary glands",
        significance: "Definitive host; gametes fuse to form motile ookinete, penetrating midgut to produce oocyst yielding thousands of infectious sporozoites."
      }
    ]
  },

  // 5. Schistosoma species - Standard Single Table (7 rows)
  "schistosoma": {
    id: "schistosoma",
    name: "Schistosoma species (Blood Flukes)",
    type: "standard",
    subtitle: "Digenetic Trematode Lifecycle (S. mansoni, S. haematobium, S. japonicum)",
    sourceNote: "CDC DPDx / Colley DG. Human Schistosomiasis Benchmark",
    steps: [
      {
        step: "1",
        event: "Elimination of embryonated eggs in human urine or feces into water",
        site: "Host: Human • Anatomical Site: Feces (S. mansoni, S. japonicum) or Urine (S. haematobium) → Freshwater",
        significance: "Diagnostic stage; species identified by spine morphology: S. mansoni (large lateral spine), S. haematobium (terminal spine), S. japonicum (small rudimentary lateral knob)."
      },
      {
        step: "2",
        event: "Miracidial hatching and intermediate snail penetration",
        site: "Host: Amphibious Freshwater Snails • Anatomical Site: Biomphalaria (mansoni), Bulinus (haematobium), Oncomelania (japonicum)",
        significance: "Hypotonic freshwater triggers egg hatching; free-swimming ciliated miracidia must find and penetrate a compatible snail host within 24 hours."
      },
      {
        step: "3",
        event: "Asexual polyembryony and daily shedding of fork-tailed cercariae",
        site: "Host: Snail Intermediate Host • Anatomical Site: Snail digestive gland / mantle cavity",
        significance: "Two generations of sporocysts yield tens of thousands of fork-tailed, phototactic cercariae shed daily into freshwater."
      },
      {
        step: "4",
        event: "Percutaneous skin penetration and schistosomule transformation",
        site: "Host: Human • Anatomical Site: Epidermis and dermis (water exposure)",
        significance: "Infective stage; cercariae burrow through intact skin, shed bifurcated tails, and transform into schistosomulae; can cause transient cercarial dermatitis ('swimmer's itch')."
      },
      {
        step: "5",
        event: "Systemic cardiopulmonary vascular migration",
        site: "Host: Human • Anatomical Site: Venules → Right heart → Pulmonary capillaries → Portal veins",
        significance: "Schistosomulae circulate through pulmonary vasculature (can trigger Katayama fever immune complex syndrome) and mature within the intrahepatic portal system."
      },
      {
        step: "6",
        event: "Worm pairing and lifelong intravascular residency",
        site: "Host: Human • Anatomical Site: Mesenteric venules (mansoni/japonicum) or Vesical/pelvic plexus (haematobium)",
        significance: "Adult male holds slender female in gynaecophoric canal; worm pairs reside in microvenules for 5–15 years, producing hundreds of eggs daily."
      },
      {
        step: "7",
        event: "Transmural egg extrusion and chronic granulomatous pathology",
        site: "Host: Human • Anatomical Site: Intestinal wall / Bladder wall, liver parenchyma",
        significance: "Eggs secrete lytic enzymes to traverse tissue into lumen (~50%); trapped eggs incite intense Th2 granulomatous fibrosis (causing Symmers pipe-stem portal cirrhosis or squamous cell carcinoma of the bladder)."
      }
    ]
  },

  // 6. Plasmodium vivax / ovale - Phase-Grouped Table (8 rows)
  "plasmodium-vivax": {
    id: "plasmodium-vivax",
    name: "Plasmodium vivax / Plasmodium ovale",
    type: "phase_grouped",
    subtitle: "Relapsing Malaria Lifecycle (Hypnozoite Hepatic Dormancy & Reticulocyte Cycle)",
    sourceNote: "CDC DPDx / Baird JK. Radical cure of Plasmodium vivax malaria",
    steps: [
      {
        step: "1",
        phase: "Phase 1: Hepatic Phase (Hypnozoite Dormancy & Exoerythrocytic Schizogony)",
        event: "Inoculation of motile sporozoites by female Anopheles mosquito",
        site: "Host: Human • Anatomical Site: Dermis → Peripheral circulation → Hepatocytes",
        significance: "Infective stage for humans; sporozoites reach liver parenchyma within minutes of vector bite."
      },
      {
        step: "2",
        phase: "Phase 1: Hepatic Phase (Hypnozoite Dormancy & Exoerythrocytic Schizogony)",
        event: "Primary schizogony AND differentiation into dormant hypnozoites",
        site: "Host: Human • Anatomical Site: Liver parenchymal hepatocytes",
        significance: "Landmark biological hallmark: a subset of parasites enter dormant hypnozoite state; reactivate months to years later, driving relapsing malaria; primaquine or tafenoquine required for radical cure (check G6PD first)."
      },
      {
        step: "3",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Merozoite release and selective invasion of reticulocytes",
        site: "Host: Human • Anatomical Site: Peripheral bloodstream",
        significance: "Merozoites strictly invade young reticulocytes (<1–2% of circulating RBCs) via Duffy blood group antigen (Fy); limits peak parasitemia; Duffy-negative individuals are refractory to P. vivax."
      },
      {
        step: "4",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Trophozoite maturation and induction of Schüffner dots",
        site: "Host: Human • Anatomical Site: Circulating young erythrocytes",
        significance: "Diagnostic stage; infected red blood cells appear enlarged, pale, and stippled with prominent eosinophilic Schüffner dots on Giemsa stain."
      },
      {
        step: "5",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Synchronized schizont lysis and tertian paroxysms",
        site: "Host: Human • Anatomical Site: Peripheral blood circulation",
        significance: "Strict 48-hour synchronized schizont rupture drives classic 'benign tertian' fever spikes (shivering rigor, burning fever, profuse diaphoresis)."
      },
      {
        step: "6",
        phase: "Phase 2: Erythrocytic Phase (Intraerythrocytic Cycle & Pathology)",
        event: "Sexual differentiation into spherical gametocytes",
        site: "Host: Human • Anatomical Site: Circulating peripheral blood",
        significance: "Transmissible stage; compact, round micro- and macrogametocytes develop early in the clinical course."
      },
      {
        step: "7",
        phase: "Phase 3: Mosquito Vector Phase (Sporogonic Cycle)",
        event: "Gametocyte uptake and fertilization in mosquito midgut",
        site: "Host: Female Anopheles mosquito • Anatomical Site: Midgut lumen",
        significance: "Definitive host; exflagellation of microgametocytes and fertilization produces motile ookinetes."
      },
      {
        step: "8",
        phase: "Phase 3: Mosquito Vector Phase (Sporogonic Cycle)",
        event: "Oocyst development and sporozoite migration to salivary glands",
        site: "Host: Female Anopheles mosquito • Anatomical Site: Midgut wall → Salivary glands",
        significance: "Oocyst matures, ruptures into hemolymph, and releases thousands of sporozoites into vector salivary glands."
      }
    ]
  },

  // 7. Entamoeba histolytica - Standard Single Table (5 rows)
  "entamoeba-histolytica": {
    id: "entamoeba-histolytica",
    name: "Entamoeba histolytica",
    type: "standard",
    subtitle: "Invasive Amoebic Lifecycle (Intestinal Ulceration & Extraintestinal Abscess)",
    sourceNote: "CDC DPDx / Haque R. Amebiasis Review",
    steps: [
      {
        step: "1",
        event: "Ingestion of quadrinucleated cysts via contaminated water or food",
        site: "Host: Human • Anatomical Site: Upper GI tract (oral entry)",
        significance: "Infective stage; durable cyst wall with chitin withstands gastric acid and environmental chlorination."
      },
      {
        step: "2",
        event: "Excystation in the terminal ileum and cecum",
        site: "Host: Human • Anatomical Site: Distal ileum and cecum lumen",
        significance: "Each ingested cyst undergoes nuclear division and excysts to release 8 motile metacystic trophozoites."
      },
      {
        step: "3",
        event: "Trophozoite mucosal adherence and contact-dependent cytolysis",
        site: "Host: Human • Anatomical Site: Colonic mucosa (cecum, ascending colon, rectum)",
        significance: "Gal/GalNAc lectin mediates enterocyte attachment; secretes amoebapores and cysteine proteases causing flask-shaped mucosal ulcers, bloody amebic dysentery, and erythrophagocytosis (ingested RBCs inside trophozoites)."
      },
      {
        step: "4",
        event: "Extra-intestinal hematogenous dissemination to liver",
        site: "Host: Human • Anatomical Site: Portal venules → Hepatic parenchyma (and rarely lung/brain)",
        significance: "Trophozoites enter mesenteric venules, seeding the liver to form solitary amebic liver abscesses filled with sterile, necrotic 'anchovy paste' exudate."
      },
      {
        step: "5",
        event: "Encystation and passage of infectious cysts in feces",
        site: "Host: Human / Environment • Anatomical Site: Colonic lumen → Feces → Soil/Water",
        significance: "Diagnostic stage; quadrinucleated cysts with chromatoid bodies and hematophagous trophozoites detectable on stool microscopy, antigen EIA, or PCR; cysts remain infectious in soil/water for weeks."
      }
    ]
  },

  // 8. Trichomonas vaginalis - Standard Single Table (4 rows)
  "trichomonas-vaginalis": {
    id: "trichomonas-vaginalis",
    name: "Trichomonas vaginalis",
    type: "standard",
    subtitle: "Urogenital Flagellate Lifecycle (Direct Venereal Transmission, No Cyst Stage)",
    sourceNote: "CDC DPDx / Schwebke JR. Trichomoniasis Guidelines",
    steps: [
      {
        step: "1",
        event: "Direct venereal transmission of motile flagellated trophozoites",
        site: "Host: Human • Anatomical Site: Urogenital mucosa (vaginal canal, cervix, urethra)",
        significance: "Infective stage; uniquely lacks any cyst stage; strict human parasite unable to survive external environmental desiccation."
      },
      {
        step: "2",
        event: "Adherence to squamous epithelium of the lower urogenital tract",
        site: "Host: Human • Anatomical Site: Squamous epithelium of vagina/cervix (females) or urethra/prostate (males)",
        significance: "Surface lipophosphoglycan (LPG) binds host galectins; induces mucosal micro-hemorrhages ('strawberry cervix') and elevates vaginal pH (>4.5)."
      },
      {
        step: "3",
        event: "Longitudinal binary fission on mucosal surfaces",
        site: "Host: Human • Anatomical Site: Vaginal lumen and urethral epithelium",
        significance: "Multiplies purely as flagellated trophozoite; produces copious frothy, malodorous yellow-green discharge and pruritus in women, while men remain largely asymptomatic carriers."
      },
      {
        step: "4",
        event: "Direct shedding in genital secretions and urine",
        site: "Host: Human • Anatomical Site: Vaginal secretions, semen, urethral discharge",
        significance: "Diagnostic stage; actively motile, pyriform flagellates with characteristic jerky/tumbling motility identified on fresh saline wet mount, OSOM rapid test, or NAAT; partner co-treatment is mandatory."
      }
    ]
  },

  // 9. Toxoplasma gondii - Phase-Grouped Table (6 rows)
  "toxoplasma-gondii": {
    id: "toxoplasma-gondii",
    name: "Toxoplasma gondii",
    type: "phase_grouped",
    subtitle: "Zoonotic Apicomplexan Lifecycle (Feline Enteric & Human Intermediate Host Cycles)",
    sourceNote: "CDC DPDx / Montoya JG. Toxoplasmosis Review",
    steps: [
      {
        step: "1",
        phase: "Phase 1: Feline Definitive Host (Enteric Sexual Cycle)",
        event: "Feline ingestion of bradyzoite tissue cysts in prey or oocysts",
        site: "Host: Domestic and wild felids • Anatomical Site: Feline small intestinal epithelium",
        significance: "Felids are the sole definitive hosts supporting sexual reproduction (gametogony); asexual schizogony precedes gamete fusion."
      },
      {
        step: "2",
        phase: "Phase 1: Feline Definitive Host (Enteric Sexual Cycle)",
        event: "Fecal shedding of unsporulated oocysts and environmental sporulation",
        site: "Host: Felid feces / Environment • Anatomical Site: Litter box, garden soil, outdoor sand",
        significance: "Unsporulated oocysts shed for 1–2 weeks; sporulate within 1–5 days in moist soil into infectious oocysts containing 8 sporozoites; viable in soil for over a year."
      },
      {
        step: "3",
        phase: "Phase 2: Human & Intermediate Host Phase (Asexual Dissemination & Latency)",
        event: "Ingestion of sporulated oocysts or undercooked meat containing tissue cysts",
        site: "Host: Human • Anatomical Site: Upper gastrointestinal tract (oral entry)",
        significance: "Dual infective stages: oocysts (contaminated unwashed produce/cat litter) or bradyzoite cysts (undercooked lamb/pork); transplacental transmission during primary maternal infection."
      },
      {
        step: "4",
        phase: "Phase 2: Human & Intermediate Host Phase (Asexual Dissemination & Latency)",
        event: "Excystation and rapid intracellular replication as motile tachyzoites",
        site: "Host: Human • Anatomical Site: Intestinal lamina propria → Systemic lymphatics and blood",
        significance: "Tachyzoites actively invade all nucleated host cells, replicating inside parasitophorous vacuoles; drives acute systemic dissemination, lymphadenopathy, or congenital retinochoroiditis/hydrocephalus."
      },
      {
        step: "5",
        phase: "Phase 2: Human & Intermediate Host Phase (Asexual Dissemination & Latency)",
        event: "Immune containment and transformation into latent bradyzoite tissue cysts",
        site: "Host: Human • Anatomical Site: Brain parenchyma, myocardium, retina, skeletal muscle",
        significance: "Cell-mediated immunity (CD4+ T cells, IFN-gamma) controls tachyzoites, forcing conversion into dormant bradyzoites encased in durable intracellular tissue cysts; establishes lifelong clinical latency."
      },
      {
        step: "6",
        phase: "Phase 2: Human & Intermediate Host Phase (Asexual Dissemination & Latency)",
        event: "Opportunistic reactivation in immunocompromised hosts",
        site: "Host: Human • Anatomical Site: Central nervous system (basal ganglia, corticomedullary junction)",
        significance: "Diagnostic stage on neuroimaging; CD4 depletion (<100 cells/uL) allows bradyzoites to revert to lytic tachyzoites, producing multiple ring-enhancing brain lesions and necrotizing toxoplasmic encephalitis."
      }
    ]
  },

  // 10. Cryptosporidium species - Standard Single Table (5 rows)
  "cryptosporidium": {
    id: "cryptosporidium",
    name: "Cryptosporidium species (parvum / hominis)",
    type: "standard",
    subtitle: "Apicomplexan Waterborne Lifecycle (Chlorine-Resistant Oocysts & Autoinfection)",
    sourceNote: "CDC DPDx / Checkley W. Cryptosporidiosis Guidelines",
    steps: [
      {
        step: "1",
        event: "Ingestion of environmentally resistant thick-walled sporulated oocysts",
        site: "Host: Human / Cattle reservoir • Anatomical Site: Upper GI tract (oral entry)",
        significance: "Infective stage; hardy oocyst wall is exceptionally resistant to municipal chlorine disinfection; low infectious dose (10–30 oocysts); common in recreational water venues."
      },
      {
        step: "2",
        event: "Excystation in the upper gastrointestinal lumen",
        site: "Host: Human • Anatomical Site: Duodenum and jejunum lumen",
        significance: "Gastric acidity and body temperature trigger suture dissolution on the oocyst wall, releasing 4 motile, infectious sporozoites."
      },
      {
        step: "3",
        event: "Intracellular but extracytoplasmic localization on enterocyte brush border",
        site: "Host: Human • Anatomical Site: Apical brush border of small intestinal enterocytes",
        significance: "Sporozoites attach to enterocytes and become enveloped by host cell membrane within an apical parasitophorous vacuole; causes microvillar effacement, crypt hyperplasia, and severe watery secretory diarrhea."
      },
      {
        step: "4",
        event: "Asexual schizogony, sexual gametogony, and thin-walled autoinfection",
        site: "Host: Human • Anatomical Site: Small intestinal mucosal epithelium",
        significance: "Merozoites differentiate sexually into thin-walled (~20%) and thick-walled (~80%) oocysts; thin-walled oocysts excyst in situ, driving continuous internal autoinfection cycles."
      },
      {
        step: "5",
        event: "Fecal excretion of fully sporulated thick-walled oocysts",
        site: "Host: Human / External Environment • Anatomical Site: Feces → Water sources / Soil",
        significance: "Diagnostic stage; round 4–6 µm oocysts staining bright red/magenta on modified Kinyoun acid-fast stain; oocysts are immediately infectious upon excretion."
      }
    ]
  },

  // 11. Leishmania species - Phase-Grouped Table (6 rows)
  "leishmania": {
    id: "leishmania",
    name: "Leishmania species (donovani, infantum, major, braziliensis)",
    type: "phase_grouped",
    subtitle: "Kinetoplastid Vector-Borne Lifecycle (Sandfly Promastigotes & Macrophage Amastigotes)",
    sourceNote: "CDC DPDx / Burza S. Leishmaniasis Lancet Seminar",
    steps: [
      {
        step: "1",
        phase: "Phase 1: Sandfly Vector Phase (Promastigote Stage)",
        event: "Sandfly ingestion of amastigote-infected macrophages during blood meal",
        site: "Host: Female Phlebotomine sandfly (Phlebotomus / Lutzomyia) • Anatomical Site: Vector midgut",
        significance: "Sandfly acquires intracellular amastigotes from infected human or canine reservoir skin/blood."
      },
      {
        step: "2",
        phase: "Phase 1: Sandfly Vector Phase (Promastigote Stage)",
        event: "Transformation into flagellated promastigotes and anterior migration",
        site: "Host: Sandfly Vector • Anatomical Site: Vector midgut → Foregut and proboscis",
        significance: "Amastigotes transform into elongate, flagellated promastigotes, multiply by binary fission, and migrate to vector proboscis ready for inoculation."
      },
      {
        step: "3",
        phase: "Phase 2: Mammalian / Human Phase (Intracellular Amastigote Stage)",
        event: "Inoculation of metacyclic promastigotes during sandfly bite",
        site: "Host: Human • Anatomical Site: Dermis / Subcutaneous tissue",
        significance: "Infective stage; sandfly regurgitates motile promastigotes into dermal feeding pool."
      },
      {
        step: "4",
        phase: "Phase 2: Mammalian / Human Phase (Intracellular Amastigote Stage)",
        event: "Phagocytosis by host macrophages and conversion to amastigotes",
        site: "Host: Human • Anatomical Site: Mononuclear phagocyte system (tissue histiocytes/macrophages)",
        significance: "Promastigotes are engulfed by tissue macrophages; shed flagella to become non-motile amastigotes; resist and neutralize phagolysosomal acidic hydrolases."
      },
      {
        step: "5",
        phase: "Phase 2: Mammalian / Human Phase (Intracellular Amastigote Stage)",
        event: "Intracellular multiplication, host cell lysis, and tissue seeding",
        site: "Host: Human • Anatomical Site: Dermal histiocytes (cutaneous) or Reticuloendothelial organs (visceral / kala-azar)",
        significance: "Amastigotes divide by binary fission until macrophage ruptures, reinvading neighboring cells; causes chronic ulcerating granulomas (cutaneous) or massive hepatosplenomegaly, pancytopenia, and fatal kala-azar (visceral)."
      },
      {
        step: "6",
        phase: "Phase 2: Mammalian / Human Phase (Intracellular Amastigote Stage)",
        event: "Tissue demonstration of intracellular amastigotes (Leishman-Donovan bodies)",
        site: "Host: Human • Anatomical Site: Bone marrow, splenic aspirate, lymph node, or skin biopsy",
        significance: "Diagnostic stage; round 2–4 µm amastigotes with rod-shaped kinetoplast and nucleus visible inside macrophages on Giemsa stain."
      }
    ]
  },

  // 12. Enterobius vermicularis - Standard Single Table (5 rows)
  "enterobius-vermicularis": {
    id: "enterobius-vermicularis",
    name: "Enterobius vermicularis (Pinworm)",
    type: "standard",
    subtitle: "Intestinal Nematode Lifecycle (Perianal Oviposition & Direct Retroinfection)",
    sourceNote: "CDC DPDx / Burkhart CN. Assessment of Enterobiasis",
    steps: [
      {
        step: "1",
        event: "Ingestion of embryonated eggs via contaminated fingers, fomites, or clothing",
        site: "Host: Human • Anatomical Site: Upper gastrointestinal tract (oral entry)",
        significance: "Infective stage; fingernail contamination following nocturnal scratching is the primary route; eggs remain viable on clothing, bedding, and indoor dust for up to 3 weeks."
      },
      {
        step: "2",
        event: "Egg hatching and larval emergence in the small intestine",
        site: "Host: Human • Anatomical Site: Duodenum and jejunum lumen",
        significance: "Duodenal secretions stimulate egg dissolution; rhabditiform larvae hatch and migrate down the lumen toward the cecum."
      },
      {
        step: "3",
        event: "Maturation to adult pinworms and lumen residency in the ileocecal region",
        site: "Host: Human • Anatomical Site: Cecum, appendix, and ascending colon lumen",
        significance: "Larvae mature into small white adults (females 8–13 mm); adhere loosely to mucosa without tissue invasion; usually benign, occasionally causing appendicitis."
      },
      {
        step: "4",
        event: "Nocturnal perianal migration of gravid females and oviposition",
        site: "Host: Human • Anatomical Site: Perianal and perineal skin folds",
        significance: "Gravid female crawls out of anus at night and deposits 10,000–15,000 eggs with an irritant gelatinous secretion; incites intense nocturnal perianal pruritus (pruritus ani)."
      },
      {
        step: "5",
        event: "Rapid egg embryonation and direct reinfection or retroinfection",
        site: "Host: Human / Household environment • Anatomical Site: Perianal folds → Fingers / Bedding",
        significance: "Diagnostic stage; asymmetric 'D-shaped' flattened eggs detected via morning cellulose tape test or pinworm paddle; eggs mature and become infective within 4–6 hours; household co-treatment is required."
      }
    ]
  },

  // 13. Ascaris lumbricoides - Standard Single Table (6 rows)
  "ascaris-lumbricoides": {
    id: "ascaris-lumbricoides",
    name: "Ascaris lumbricoides (Giant Roundworm)",
    type: "standard",
    subtitle: "Soil-Transmitted Nematode Lifecycle (Cardiopulmonary Migration & Intestinal Residency)",
    sourceNote: "CDC DPDx / Dold C. Ascaris and Ascariasis Review",
    steps: [
      {
        step: "1",
        event: "Ingestion of fully embryonated (infectious) eggs from soil or raw produce",
        site: "Host: Human • Anatomical Site: Upper GI tract (oral entry)",
        significance: "Infective stage; unembryonated eggs passed in stool must incubate 2–4 weeks in warm soil to embryonate; thick mammillated shell resists environmental desiccation and chemicals."
      },
      {
        step: "2",
        event: "Larval hatching in the small intestine and mesenteric venous penetration",
        site: "Host: Human • Anatomical Site: Duodenum lumen → Mesenteric venules / Lymphatics",
        significance: "Alkaline intestinal environment triggers hatching; rhabditiform larvae penetrate the bowel wall and enter portal circulation."
      },
      {
        step: "3",
        event: "Cardiopulmonary vascular transit, alveolar rupture, and bronchial ascent",
        site: "Host: Human • Anatomical Site: Hepatic venules → Right heart → Alveolar air spaces → Bronchi",
        significance: "Larvae break out of alveolar capillaries into air spaces (days 9–14); causes eosinophilic pneumonitis (Löffler syndrome: cough, wheezing, blood-tinged sputum); larvae ascend via mucociliary escalator."
      },
      {
        step: "4",
        event: "Deglutition (swallowing) and return to the small intestine",
        site: "Host: Human • Anatomical Site: Epiglottis → Esophagus → Stomach → Small intestine",
        significance: "Coughed-up larvae are swallowed, passing gastric acid unharmed to re-enter their definitive anatomical niche."
      },
      {
        step: "5",
        event: "Maturation to giant adult worms and luminal residency",
        site: "Host: Human • Anatomical Site: Jejunum and ileum lumen",
        significance: "Adult worms grow to 15–35 cm; live unattached in lumen feeding on chyme; high worm burdens cause mechanical bowel obstruction, intussusception, or biliary tree migration (acute cholangitis)."
      },
      {
        step: "6",
        event: "Massive oviposition and fecal shedding of unembryonated eggs",
        site: "Host: Human / Soil • Anatomical Site: Feces → Warm, moist soil",
        significance: "Diagnostic stage; golden-brown, thick-shelled mammillated eggs (fertile or unfertile) readily identified on stool O&P; each female lays ~200,000 eggs per day."
      }
    ]
  },

  // 14. Ancylostoma duodenale / Necator americanus - Standard Single Table (6 rows)
  "hookworms": {
    id: "hookworms",
    name: "Ancylostoma duodenale / Necator americanus (Hookworms)",
    type: "standard",
    subtitle: "Soil-Transmitted Hookworm Lifecycle (Percutaneous Entry & Hematophagous Gut Residency)",
    sourceNote: "CDC DPDx / Hotez PJ. Hookworm Infection Review",
    steps: [
      {
        step: "1",
        event: "Percutaneous penetration of infective filariform (L3) larvae from soil",
        site: "Host: Human • Anatomical Site: Skin (interdigital web spaces of bare feet, hands)",
        significance: "Infective stage; sheathed L3 larvae actively burrow through intact skin; induces localized pruritic papulovesicular dermatitis ('ground itch')."
      },
      {
        step: "2",
        event: "Venous transit, trans-alveolar pulmonary migration, and tracheal escalation",
        site: "Host: Human • Anatomical Site: Dermal venules → Right heart → Alveolar capillary bed → Trachea",
        significance: "Larvae break into alveolar spaces; can cause transient eosinophilic pulmonary symptoms; swept upward by ciliated bronchial epithelium."
      },
      {
        step: "3",
        event: "Swallowing and transit to the proximal small intestine",
        site: "Host: Human • Anatomical Site: Epiglottis → Esophagus → Stomach → Duodenum/Jejunum",
        significance: "Larvae swallowed down alimentary tract into upper small bowel; undergo molting to adolescent stages."
      },
      {
        step: "4",
        event: "Mucosal attachment via cutting mouthparts and adult maturation",
        site: "Host: Human • Anatomical Site: Duodenal and jejunal mucosa",
        significance: "Adults attach to villi using cutting plates (Necator americanus) or sharp teeth (Ancylostoma duodenale); secrete anticoagulants to consume host blood and tissue fluids."
      },
      {
        step: "5",
        event: "Chronic blood feeding and adult worm residency",
        site: "Host: Human • Anatomical Site: Upper small intestine lumen",
        significance: "Landmark pathophysiology: blood ingestion (0.03–0.2 mL/worm/day) causes progressive microcytic hypochromic iron-deficiency anemia, hypoproteinemia, and physical/cognitive growth stunting in children."
      },
      {
        step: "6",
        event: "Oviposition and elimination of unembryonated eggs in feces",
        site: "Host: Human • Anatomical Site: Stool → Warm, moist sandy soil",
        significance: "Diagnostic stage; thin-shelled, oval, segmented eggs with 4–8 blastomeres on stool O&P; eggs hatch in soil within 24–48 hours into rhabditiform larvae, which molt to infective L3 larvae in 5–10 days."
      }
    ]
  },

  // 15. Sarcoptes scabiei - Standard Single Table (5 rows)
  "sarcoptes-scabiei": {
    id: "sarcoptes-scabiei",
    name: "Sarcoptes scabiei var. hominis",
    type: "standard",
    subtitle: "Ectoparasitic Mite Lifecycle (Epidermal Burrowing & Type IV Hypersensitivity)",
    sourceNote: "CDC DPDx / Walton SF. Problems in Diagnosing Scabies",
    steps: [
      {
        step: "1",
        event: "Direct skin-to-skin contact transmission of fertilized adult female mites",
        site: "Host: Human • Anatomical Site: Epidermis (stratum corneum)",
        significance: "Infective stage; transmission requires prolonged direct cutaneous contact (~15–20 minutes, sexual contact, co-sleeping) or rarely via heavily infested fomites/bedding in crusted scabies."
      },
      {
        step: "2",
        event: "Stratum corneum excavation and permanent intra-epidermal burrowing",
        site: "Host: Human • Anatomical Site: Epidermal stratum corneum (interdigital finger webs, flexor wrists, axillae, genitalia)",
        significance: "Female mite secretes proteolytic enzymes to dissolve stratum corneum, excavating 0.5–1 cm serpentine intra-epidermal burrows at 2–3 mm/day."
      },
      {
        step: "3",
        event: "Oviposition and scybala (fecal pellet) deposition in burrows",
        site: "Host: Human • Anatomical Site: Serpentine burrows within the stratum corneum",
        significance: "Gravid female deposits 2–3 eggs and fecal pellets (scybala) daily over 4–6 week lifespan; foreign mite proteins and fecal antigens trigger delayed (Type IV) hypersensitivity."
      },
      {
        step: "4",
        event: "Delayed hypersensitivity reaction and intense nocturnal pruritus",
        site: "Host: Human • Anatomical Site: Generalized skin surface (often sparing head and neck in adults)",
        significance: "Host sensitization takes 3–6 weeks in primary infection (24–48 hours in re-infestation); causes severe intractable pruritus (exacerbated at night and by hot showers) and excoriated erythematous papules."
      },
      {
        step: "5",
        event: "Egg hatching, larval maturation to adults, and cycle repetition",
        site: "Host: Human • Anatomical Site: Skin surface and hair follicles",
        significance: "Diagnostic stage; microscopic demonstration of adult mites, hexapod larvae, ova, or scybala on mineral oil skin scrapings of unexcoriated burrows or dermoscopy; 10–15 total mites present in classic scabies (vs. millions in crusted Norwegian scabies)."
      }
    ]
  },

  // ==========================================
  // CORE BACTERIAL PATHOGENS (10 ORGANISMS)
  // ==========================================

  // 16. Staphylococcus aureus - Standard Single Table (5 rows)
  "s-aureus": {
    id: "s-aureus",
    name: "Staphylococcus aureus",
    type: "standard",
    subtitle: "Gram-Positive Pyogenic Lifecycle (Colonization, Invasive Suppuration & Metastatic Seeding)",
    sourceNote: "Tong SYC. Staphylococcus aureus infections: Lancet / IDSA Guidelines",
    steps: [
      {
        step: "1",
        event: "Asymptomatic colonization of mucosal and cutaneous niches",
        site: "Host: Human • Anatomical Site: Anterior nares (primary reservoir, 20–30% persistent carriage), skin folds, perineum",
        significance: "Commensal state; cell-wall adhesins (clumping factor, MSCRAMMs) bind squamous epithelial cytokeratins; serves as endogenous reservoir for subsequent invasive infection."
      },
      {
        step: "2",
        event: "Contact transmission via hands and fomites",
        site: "Host: Human / Healthcare environment • Anatomical Site: Hands of healthcare workers, clothing, hospital surfaces",
        significance: "High environmental durability; tolerates elevated salt (7.5–10% NaCl) and prolonged desiccation; direct horizontal transmission in hospital and athletic locker room settings."
      },
      {
        step: "3",
        event: "Mechanical barrier breach and acute suppurative infection",
        site: "Host: Human • Anatomical Site: Cutaneous dermis, subcutaneous tissue, surgical incisions, IV catheters",
        significance: "Trauma allows entry; coagulase, protein A, and alpha-hemolysin promote fibrin clotting, antiphagocytic IgG binding, and intense neutrophilic abscess formation (folliculitis, furuncles, carbuncles, surgical site infections)."
      },
      {
        step: "4",
        event: "Vascular angioinvasion and conditional metastatic seeding",
        site: "Host: Human • Anatomical Site: Systemic bloodstream → Endocardium, bone matrix, renal parenchyma",
        significance: "Bacteremia seeds native or prosthetic heart valves (acute infective endocarditis with destructive vegetations) and metaphysical bone (hematogenous osteomyelitis); conditional upon host compromise and bacterial toxin repertoire."
      },
      {
        step: "5",
        event: "Shedding and environmental persistence",
        site: "Host: Human / Hospital environment • Anatomical Site: Desquamated skin scales, purulent drainage, nasal secretions",
        significance: "Prolonged survival on abiotic surfaces facilitates transmission cycles; standard contact isolation precautions required for MRSA."
      }
    ]
  },

  // 17. Streptococcus pyogenes - Standard Single Table (5 rows)
  "s-pyogenes": {
    id: "s-pyogenes",
    name: "Streptococcus pyogenes (Group A)",
    type: "standard",
    subtitle: "Group A Beta-Hemolytic Streptococcus Lifecycle (Mucocutaneous Invasion & Toxin Release)",
    sourceNote: "Walker MJ. Disease manifestations of Streptococcus pyogenes: Nat Rev Dis Primers",
    steps: [
      {
        step: "1",
        event: "Asymptomatic mucosal or cutaneous colonization",
        site: "Host: Human • Anatomical Site: Oropharynx (10–20% pediatric carriage) and epidermal skin",
        significance: "Human-restricted reservoir; lipoteichoic acid and M protein mediate adherence to pharyngeal and keratinocyte fibronectin; transient colonization precedes clinical infection."
      },
      {
        step: "2",
        event: "Respiratory droplet or direct cutaneous contact transmission",
        site: "Host: Human • Anatomical Site: Upper respiratory secretions, cutaneous lesions, close contact settings",
        significance: "Direct person-to-person spread via large aerosol droplets or direct physical contact with impetiginous exudate; crowded conditions (daycares, barracks) accelerate spread."
      },
      {
        step: "3",
        event: "Local suppurative tissue infection",
        site: "Host: Human • Anatomical Site: Pharyngeal mucosa / tonsils (pharyngitis) or epidermis (impetigo, erysipelas, cellulitis)",
        significance: "Streptolysins (O and S), hyaluronidase, and streptokinase destroy tissue matrix, inciting intense neutrophilic infiltration, throat exudate, or rapidly advancing erythematous rash."
      },
      {
        step: "4",
        event: "Deep fascial or vascular invasion",
        site: "Host: Human • Anatomical Site: Deep fascial planes (necrotizing fasciitis) and bloodstream (toxic shock syndrome / bacteremia)",
        significance: "Pyrogenic exotoxins (SpeA, SpeC) act as superantigens causing massive cytokine storm (TSS); rapidly spreading fascial necrosis requires emergency surgical debridement; post-infectious immune sequelae (rheumatic fever, PSGN) are non-suppurative complications."
      },
      {
        step: "5",
        event: "Respiratory and exudative shedding",
        site: "Host: Human • Anatomical Site: Saliva, pharyngeal droplets, skin weeping → Environment/Contacts",
        significance: "Direct shedding during symptomatic disease; antibiotic treatment (penicillin) eliminates infectivity within 24 hours."
      }
    ]
  },

  // 18. Streptococcus pneumoniae - Standard Single Table (6 rows)
  "s-pneumoniae": {
    id: "s-pneumoniae",
    name: "Streptococcus pneumoniae (Pneumococcus)",
    type: "standard",
    subtitle: "Encapsulated Diplococcal Lifecycle (Nasopharyngeal Carriage, Aspiration & Invasive Disease)",
    sourceNote: "Weiser JN. Streptococcus pneumoniae: colonization and invasion: Nat Rev Microbiol",
    steps: [
      {
        step: "1",
        event: "Asymptomatic nasopharyngeal carriage",
        site: "Host: Human • Anatomical Site: Nasopharyngeal mucosa (20–60% children, 5–10% adults)",
        significance: "Obligate human commensal; surface choline-binding proteins (PspA, CbpA) anchor to mucosal epithelial carbohydrates; critical prerequisite reservoir for all pneumococcal disease."
      },
      {
        step: "2",
        event: "Airborne droplet transmission",
        site: "Host: Human • Anatomical Site: Upper respiratory secretions between household or daycare contacts",
        significance: "Spread via coughing, sneezing, and close aerosol contact; horizontal acquisition of new capsular serotypes occurs continuously."
      },
      {
        step: "3",
        event: "Contiguous mucosal extension or micro-aspiration",
        site: "Host: Human • Anatomical Site: Eustachian tube (otitis media), paranasal sinuses (sinusitis), or lower tracheobronchial tree (bronchopneumonia)",
        significance: "Impairment of mucociliary clearance (viral infection, smoking, chilling) enables aspirated bacteria to descend into lower airways or enter middle ear/sinuses."
      },
      {
        step: "4",
        event: "Alveolar multiplication and lobar consolidation",
        site: "Host: Human • Anatomical Site: Pulmonary alveoli (lower respiratory tract)",
        significance: "Anti-phagocytic polysaccharide capsule inhibits complement deposition; pneumolysin pore-forming cytotoxin destroys alveolar-capillary barriers, driving red/gray hepatization and lobar consolidation with rusty sputum."
      },
      {
        step: "5",
        event: "Trans-endothelial invasion and hematogenous dissemination",
        site: "Host: Human • Anatomical Site: Bloodstream → Meninges (bacterial meningitis), heart, or peritoneal cavity",
        significance: "High-risk in asplenic patients (lack of splenic opsonization); passes blood-brain barrier via PAF receptor interactions, leading to purulent CSF meningitis with high mortality and sensorineural hearing loss."
      },
      {
        step: "6",
        event: "Respiratory aerosol expulsion",
        site: "Host: Human • Anatomical Site: Expectorated sputum and cough aerosols",
        significance: "Shedding occurs during active pulmonary disease; capsular conjugate vaccines (PCV15/PCV20) reduce nasopharyngeal carriage and herd transmission."
      }
    ]
  },

  // 19. Enterococcus faecalis - Standard Single Table (5 rows)
  "e-faecalis": {
    id: "e-faecalis",
    name: "Enterococcus faecalis",
    type: "standard",
    subtitle: "Enterococcal Commensal & Opportunistic Lifecycle (Dysbiosis, Biofilm & Persistence)",
    sourceNote: "Gilmore MS. Enterococcal Genomics, Colonization, and Infection",
    steps: [
      {
        step: "1",
        event: "Gastrointestinal commensal carriage",
        site: "Host: Human • Anatomical Site: Lower intestinal tract (normal colonic enteroflora)",
        significance: "Natural non-pathogenic commensal; represents ~1% of adult fecal flora; survives high bile salts and basic intestinal environments."
      },
      {
        step: "2",
        event: "Antibiotic-induced dysbiosis and luminal expansion",
        site: "Host: Human • Anatomical Site: Large intestine lumen during broad-spectrum antibiotic therapy (cephalosporins, fluoroquinolones)",
        significance: "Innate resistance to cephalosporins allows Enterococcus to overgrow other microflora when competing commensals are eradicated; increases fecal density and transmission risk."
      },
      {
        step: "3",
        event: "Translocation or ascending intraluminal migration",
        site: "Host: Human • Anatomical Site: Urethra → Urinary bladder (catheterized UTI), peritoneal cavity, or mesenteric lymphatics",
        significance: "Frequently colonizes urinary catheters; ascending cystitis and pyelonephritis; can translocate across impaired gut barrier during critical illness."
      },
      {
        step: "4",
        event: "Biofilm formation and intravascular persistence",
        site: "Host: Human • Anatomical Site: Foreign bodies (foley catheters, IV catheters, prosthetic valves) and endocardium",
        significance: "Surface protein (Esp) and aggregation substance (AS) promote dense abiotic biofilms; seeds damaged native or prosthetic heart valves causing subacute bacterial endocarditis."
      },
      {
        step: "5",
        event: "Fecal shedding and hospital environmental contamination",
        site: "Host: Human / Healthcare environment • Anatomical Site: Patient feces → Bed rails, medical equipment, healthcare worker hands",
        significance: "Remarkable environmental resilience; tolerates drying, 60°C heat, and chemical disinfectants; hospital acquisition of VRE requires rigorous isolation hygiene."
      }
    ]
  },

  // 20. Escherichia coli - Branched Table (5 rows)
  "e-coli": {
    id: "e-coli",
    name: "Escherichia coli",
    type: "branched",
    subtitle: "Branched Enterobacterales Lifecycle (UPEC Urinary Ascent, Ingestion & Neonatal Invasion)",
    sourceNote: "Kaper JB. Pathogenic Escherichia coli: Nat Rev Microbiol",
    steps: [
      {
        step: "1",
        branch: "Commensal State",
        event: "Commensal colonization of the distal gastrointestinal tract",
        site: "Host: Human • Anatomical Site: Distal human large intestine / Colonic mucosa",
        significance: "Predominant facultative anaerobe in normal colonic microbiome; colonizes infants within 48 hours of birth; synthesizes vitamin K and prevents pathogen colonization."
      },
      {
        step: "2",
        branch: "Pathway A (Endogenous Urinary Ascent / UPEC)",
        event: "Perineal-urethral ascent and bladder urothelial invasion",
        site: "Host: Human • Anatomical Site: Perianal skin → Urethra → Bladder (cystitis) → Ureters/Kidneys (pyelonephritis)",
        significance: "Uropathogenic E. coli (UPEC) utilizes Type 1 fimbriae (cystitis) and P-fimbriae (pyelonephritis) to adhere to uroplakin on bladder epithelial cells; premier cause of community-acquired UTI."
      },
      {
        step: "3",
        branch: "Pathway B (Exogenous Foodborne Ingestion / EHEC & ETEC)",
        event: "Ingestion of contaminated food/water from animal reservoirs",
        site: "Host: Bovine reservoir (beef, raw milk) → Human upper/lower GI tract",
        significance: "ETEC heat-labile/stable toxins drive secretory diarrhea ('traveler's diarrhea'); Shiga toxin-producing EHEC (O157:H7) causes hemorrhagic colitis and endothelial microangiopathy (Hemolytic Uremic Syndrome - HUS)."
      },
      {
        step: "4",
        branch: "Pathway C (Neonatal Intrapartum Invasion)",
        event: "Vaginal colonization and vertical intrapartum transmission",
        site: "Host: Maternal birth canal → Neonatal respiratory tract → Bloodstream → Meninges",
        significance: "Strains expressing K1 capsular antigen resist neonatal macrophage killing; second leading cause of neonatal sepsis and meningitis."
      },
      {
        step: "5",
        branch: "Environmental Exit",
        event: "Fecal shedding and environmental persistence",
        site: "Host: Human and animal feces • Anatomical Site: Municipal water systems and agricultural runoff",
        significance: "Ubiquitous fecal marker in water quality testing; readily transfers plasmid-mediated antimicrobial resistance (ESBL, carbapenemases)."
      }
    ]
  },

  // 21. Klebsiella pneumoniae - Standard Single Table (6 rows)
  "k-pneumoniae": {
    id: "k-pneumoniae",
    name: "Klebsiella pneumoniae",
    type: "standard",
    subtitle: "Encapsulated Gram-Negative Bacillary Lifecycle (Hospital Carriage, Necrotizing Pneumonia & Dissemination)",
    sourceNote: "Paczosa MK. Klebsiella pneumoniae: Going on the Offense with a Strong Defense: Microbiol Mol Biol Rev",
    steps: [
      {
        step: "1",
        event: "Gastrointestinal and pharyngeal colonization",
        site: "Host: Human • Anatomical Site: Gastrointestinal tract (primary reservoir, 40–70% hospital carriage) and nasopharynx",
        significance: "Commensal in healthy bowel; carriage rates dramatically escalate upon hospital admission and broad-spectrum antibiotic exposure."
      },
      {
        step: "2",
        event: "Nosocomial contact transmission",
        site: "Host: Healthcare environment • Anatomical Site: Contaminated hands of healthcare personnel and indwelling devices",
        significance: "Rapid horizontal transfer in intensive care units; readily colonizes patient skin, ventilator circuits, and urinary catheters."
      },
      {
        step: "3",
        event: "Aspiration or indwelling catheter entry",
        site: "Host: Human • Anatomical Site: Lower tracheobronchial tree (ventilator-associated) or urethra/bladder (CAUTI)",
        significance: "Aspiration of pharyngeal secretions in alcoholics, diabetics, or intubated patients; bypasses upper airway filtration."
      },
      {
        step: "4",
        event: "Encapsulated replication and extensive tissue necrosis",
        site: "Host: Human • Anatomical Site: Pulmonary parenchyma or urinary tract / hepatobiliary system",
        significance: "Hyper-mucoviscous polysaccharide capsule (K antigen) prevents complement deposition and neutrophil phagocytosis; induces microvascular thrombosis, alveolar cavitation, and 'currant jelly' sputum (Friedländer pneumonia) or pyogenic liver abscesses."
      },
      {
        step: "5",
        event: "Hematogenous angioinvasion and metastatic dissemination",
        site: "Host: Human • Anatomical Site: Pulmonary/urinary vasculature → Bloodstream → Endophthalmitis, brain abscesses",
        significance: "High propensity for septic bacteremia; hypervirulent capsular strains (K1/K2) cause invasive endophthalmitis and metastatic abscesses."
      },
      {
        step: "6",
        event: "Environmental shedding and hospital persistence",
        site: "Host: Healthcare environment • Anatomical Site: Feces, respiratory secretions, inanimate hospital surfaces",
        significance: "Persistent colonization of sink drains and medical equipment; prominent vector for plasmid-borne beta-lactamases (ESBL, KPC carbapenemases)."
      }
    ]
  },

  // 22. Pseudomonas aeruginosa - Standard Single Table (6 rows)
  "p-aeruginosa": {
    id: "p-aeruginosa",
    name: "Pseudomonas aeruginosa",
    type: "standard",
    subtitle: "Opportunistic Environmental Bacillary Lifecycle (Biofilm, Angioinvasion & Hospital Sinks)",
    sourceNote: "Gellatly SL. Pseudomonas aeruginosa: new insights into pathogenesis and host defenses",
    steps: [
      {
        step: "1",
        event: "Environmental persistence in water and moist reservoirs",
        site: "Host: Environment / Hospital plumbing • Anatomical Site: Soil, freshwater, municipal water, hospital sinks, respiratory therapy equipment",
        significance: "Minimal nutritional requirements; grows in distilled water and disinfectant solutions; intrinsic resistance to many standard sanitizers."
      },
      {
        step: "2",
        event: "Inoculation of compromised epithelial or mucosal barriers",
        site: "Host: Human • Anatomical Site: Burn wounds, cystic fibrosis airway epithelium, corneal contact lenses, puncture wounds",
        significance: "Non-pathogenic in healthy intact mucosa; exploits disrupted host defenses (burns, mechanical ventilation, neutropenia, diabetic foot ulcers)."
      },
      {
        step: "3",
        event: "Epithelial surface adherence and twitching motility",
        site: "Host: Human • Anatomical Site: Denuded skin or mucosal surface (bronchial epithelium)",
        significance: "Type IV pili and flagella mediate adherence and twitching motility; Las/Rhl quorum-sensing systems coordinate virulence factor expression."
      },
      {
        step: "4",
        event: "Conversion to sessile biofilm phenotype",
        site: "Host: Human • Anatomical Site: Bronchial mucus plugs (cystic fibrosis), endotracheal tubes, indwelling catheters",
        significance: "Alginate overproduction creates thick mucoid biofilm matrix; blocks phagocytosis, antibody access, and antimicrobial penetration, establishing untreatable chronic respiratory infections."
      },
      {
        step: "5",
        event: "Tissue destruction and vascular angioinvasion",
        site: "Host: Human • Anatomical Site: Microvasculature and deep tissue parenchyma",
        significance: "Exotoxin A (EF-2 ADP-ribosylation), elastase, and pyocyanin cause vessel wall necrosis; hematogenous seeding manifests as ecthyma gangrenosum (necrotic cutaneous ulcers) and septic shock."
      },
      {
        step: "6",
        event: "Waste stream shedding and hospital recirculation",
        site: "Host: Healthcare environment • Anatomical Site: Respiratory secretions, wound exudates, hospital plumbing and drains",
        significance: "Constant re-inoculation of clinical environments from hospital plumbing biofilms."
      }
    ]
  },

  // 23. Neisseria gonorrhoeae - Standard Single Table (6 rows)
  "n-gonorrhoeae": {
    id: "n-gonorrhoeae",
    name: "Neisseria gonorrhoeae (Gonococcus)",
    type: "standard",
    subtitle: "Fastidious Diplococcal Mucosal Lifecycle (Pili Adherence, Transcytosis & Neutrophilic Exudate)",
    sourceNote: "Quillin SJ. Neisseria gonorrhoeae: host-adaptation and virulence: Nat Rev Microbiol",
    steps: [
      {
        step: "1",
        event: "Direct mucosal sexual transmission",
        site: "Host: Human • Anatomical Site: Urogenital, anorectal, or oropharyngeal mucosal surfaces",
        significance: "Strict human pathogen; transmitted by direct intimate contact with infected secretions; no animal reservoir or environmental survival."
      },
      {
        step: "2",
        event: "Epithelial adherence via surface pili and opacity proteins",
        site: "Host: Human • Anatomical Site: Non-ciliated columnar epithelial cells of the urethra, endocervix, rectum, or conjunctiva",
        significance: "Type IV pili and Opa (opacity) proteins anchor to host CD66 receptors; antigenic variation of pili frustrates vaccine development and confers no lasting post-infection immunity."
      },
      {
        step: "3",
        event: "Cellular invasion and transcytosis to submucosa",
        site: "Host: Human • Anatomical Site: Subepithelial lamina propria",
        significance: "Parasite-directed endocytosis carries gonococci across epithelial cells into submucosal spaces; release of lipooligosaccharide (LOS) triggers intense local inflammation."
      },
      {
        step: "4",
        event: "Neutrophilic recruitment and purulent exudate formation",
        site: "Host: Human • Anatomical Site: Urethral or cervical lumen",
        significance: "LOS endotoxin drives massive polymorphonuclear leukocyte (PMN) influx; manifests as copious purulent urethritis in men or purulent cervicitis in women."
      },
      {
        step: "5",
        event: "Ascending mucosal migration or hematogenous dissemination",
        site: "Host: Human • Anatomical Site: Upper genital tract (uterus/fallopian tubes) or bloodstream → Synovial joints and skin",
        significance: "Ascends to cause Pelvic Inflammatory Disease (PID), ectopic pregnancy, and tubal infertility; dissemination (DGI) produces classic triad of tenosynovitis, polyarthralgias, and pustular dermatitis."
      },
      {
        step: "6",
        event: "Shedding in genital secretions and intrapartum vertical transmission",
        site: "Host: Human • Anatomical Site: Vaginal/urethral discharge or neonate during vaginal delivery",
        significance: "Shedding continues in untreated asymptomatic carriers (especially females); vertical transmission causes ophthalmia neonatorum (prevented by erythromycin eye ointment)."
      }
    ]
  },

  // 24. Treponema pallidum - Standard Single Table (7 rows)
  "t-pallidum": {
    id: "t-pallidum",
    name: "Treponema pallidum subsp. pallidum",
    type: "standard",
    subtitle: "Spirochetal Invasive Lifecycle (Microabrasion Entry, Primary Chancre, Dissemination & Latency)",
    sourceNote: "Radolf JD. Treponema pallidum and Syphilis: Nat Rev Microbiol / CDC Guidelines",
    steps: [
      {
        step: "1",
        event: "Direct sexual microabrasion entry",
        site: "Host: Human • Anatomical Site: Genital, anal, or oral mucosa and stratified squamous skin",
        significance: "Strict human pathogen; fragile spirochete enters microscopic abrasions during sexual contact; cannot survive environmental drying."
      },
      {
        step: "2",
        event: "Local replication and painless primary chancre formation",
        site: "Host: Human • Anatomical Site: Inoculation site (glans penis, vulva, cervix, perianal skin)",
        significance: "Endoflagella-driven corkscrew motility drives tissue penetration; primary lesion (chancre) is an indurated, clean-based, completely painless ulcer packed with active spirochetes; heals spontaneously in 3–6 weeks."
      },
      {
        step: "3",
        event: "Early lymphatic and hematogenous dissemination",
        site: "Host: Human • Anatomical Site: Regional lymph nodes → Thoracic duct → Systemic bloodstream",
        significance: "Dissemination begins within hours of inoculation, long before the primary chancre appears; spirochetes seed nearly every organ system including the CNS."
      },
      {
        step: "4",
        event: "Secondary stage mucocutaneous eruption",
        site: "Host: Human • Anatomical Site: Widespread dermis, palms, soles, mucosal surfaces, and lymph nodes",
        significance: "Arises 2–10 weeks after chancre; diffuse non-pruritic maculopapular rash involving palms and soles; condylomata lata (flat, moist, highly contagious genital plaques); systemic lymphadenopathy."
      },
      {
        step: "5",
        event: "Clinical latency (Early and Late Latent Syphilis)",
        site: "Host: Human • Anatomical Site: Quiescent in deep tissue vascular beds (spleen, bones, CNS)",
        significance: "Asymptomatic period with positive serology (RPR/VDRL and treponemal tests); early latent (<1 year) has potential for secondary relapse; late latent (>1 year) is non-infectious sexually but can transmit vertically."
      },
      {
        step: "6",
        event: "Tertiary stage destructive obliterative endarteritis",
        site: "Host: Human • Anatomical Site: Thoracic aorta (vasa vasorum), CNS (parenchyma, dorsal columns), bones/skin",
        significance: "Endarteritis obliterans causes aortic aneurysms / aortitis, neurosyphilis (tabes dorsalis, general paresis, Argyll Robertson pupil), and destructive chronic granulomas (gummas)."
      },
      {
        step: "7",
        event: "Vertical transplacental transmission",
        site: "Host: Maternal bloodstream → Placenta → Developing fetus",
        significance: "Can occur at any stage of pregnancy; leads to stillbirth, hydrops fetalis, or congenital syphilis (Hutchinson triad: notched teeth, interstitial keratitis, 8th nerve deafness; saddle nose, saber shins)."
      }
    ]
  },

  // 25. Mycobacterium tuberculosis - Standard Single Table (6 rows)
  "m-tuberculosis": {
    id: "m-tuberculosis",
    name: "Mycobacterium tuberculosis (Tubercle Bacillus)",
    type: "standard",
    subtitle: "Acid-Fast Intracellular Bacillary Lifecycle (Aerosol Inhalation, Caseous Granuloma & Reactivation)",
    sourceNote: "Flynn JL. Immunology of Tuberculosis: Annu Rev Immunol / WHO Guidelines",
    steps: [
      {
        step: "1",
        event: "Inhalation of microscopic droplet nuclei into pulmonary alveoli",
        site: "Host: Human • Anatomical Site: Upper respiratory tract → Distal subpleural pulmonary alveoli",
        significance: "Infective stage; aerosolized droplet nuclei (1–5 µm) generated by coughing remain suspended in indoor air for hours; bypass upper airway filtration to reach terminal respiratory bronchioles."
      },
      {
        step: "2",
        event: "Alveolar macrophage phagocytosis and intracellular arrest",
        site: "Host: Human • Anatomical Site: Alveolar macrophages in lower/middle lung zones",
        significance: "Cord factor and sulfatides inhibit phagolysosomal fusion; tubercle bacilli replicate uninhibited inside immature macrophage phagosomes."
      },
      {
        step: "3",
        event: "Primary granuloma containment and Ghon complex formation",
        site: "Host: Human • Anatomical Site: Pulmonary parenchymal focus + draining hilar lymph nodes (Ghon complex)",
        significance: "CD4+ T helper cells release IFN-gamma, activating macrophages into epithelioid cells and multinucleated Langhans giant cells; central caseous necrosis contains infection in ~90% of immunocompetent individuals."
      },
      {
        step: "4",
        event: "Clinical latency (Latent Tuberculosis Infection - LTBI)",
        site: "Host: Human • Anatomical Site: Fibrotic, calcified caseous pulmonary/lymphatic granulomas",
        significance: "Bacilli enter dormant low-metabolic state; non-infectious; positive tuberculin skin test (TST) or interferon-gamma release assay (IGRA); can persist for host lifetime."
      },
      {
        step: "5",
        event: "Apical cavitary reactivation",
        site: "Host: Human • Anatomical Site: Upper lobe pulmonary segments (apical/posterior segments)",
        significance: "Waning cell-mediated immunity (aging, immunosuppression, HIV/AIDS, TNF-alpha inhibitors) triggers caseous liquefaction and cavitation; high oxygen tension in lung apices fuels massive bacillary proliferation."
      },
      {
        step: "6",
        event: "Bronchial erosion and infectious aerosol expulsion",
        site: "Host: Human • Anatomical Site: Eroded bronchial tree → Airways → Atmospheric air",
        significance: "Cavities erode into bronchial airways; patient sheds billions of acid-fast bacilli in cough aerosols; active transmission cycle restored; extrapulmonary hematogenous spread (miliary TB, Pott disease, tuberculous meningitis) can occur concurrently."
      }
    ]
  }
};

// Aliases mapping to support alternative slugs, IDs, and scientific names
const lifecycleAliases: Record<string, string> = {
  // Parasites aliases
  "plasmodium-vivax-ovale": "plasmodium-vivax",
  "giardia-duodenalis": "giardia-lamblia",
  "cryptosporidium-species": "cryptosporidium",
  "leishmania-species": "leishmania",
  "ancylostoma-necator": "hookworms",
  "schistosoma-species": "schistosoma",
  // Bacteria aliases
  "staphylococcus-aureus": "s-aureus",
  "streptococcus-pyogenes": "s-pyogenes",
  "group-a-strep": "s-pyogenes",
  "streptococcus-pneumoniae": "s-pneumoniae",
  "enterococcus-faecalis": "e-faecalis",
  "escherichia-coli": "e-coli",
  "klebsiella-pneumoniae": "k-pneumoniae",
  "pseudomonas-aeruginosa": "p-aeruginosa",
  "neisseria-gonorrhoeae": "n-gonorrhoeae",
  "treponema-pallidum": "t-pallidum",
  "mycobacterium-tuberculosis": "m-tuberculosis"
};

/**
 * Resolves a pathogen lifecycle record by ID, slug, or scientific name.
 */
export const getPathogenLifecycle = (identifier?: string): PathogenLifecycle | undefined => {
  if (!identifier) return undefined;
  
  const clean = identifier.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  // 1. Direct match
  if (pathogenLifecycles[clean]) {
    return pathogenLifecycles[clean];
  }
  
  // 2. Direct match with raw identifier
  if (pathogenLifecycles[identifier]) {
    return pathogenLifecycles[identifier];
  }
  
  // 3. Alias match
  const aliasTarget = lifecycleAliases[clean];
  if (aliasTarget && pathogenLifecycles[aliasTarget]) {
    return pathogenLifecycles[aliasTarget];
  }
  
  // 4. Fuzzy / partial match against keys and names
  const match = Object.values(pathogenLifecycles).find(p => {
    const pSlug = p.id.toLowerCase();
    const pName = p.name.toLowerCase();
    const query = identifier.toLowerCase();
    return pSlug === clean || pSlug.includes(clean) || clean.includes(pSlug) || pName.includes(query) || query.includes(pName);
  });
  
  return match;
};
