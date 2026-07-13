export interface VirusDisease {
  id: string;
  name: string; // e.g., "Genital Herpes"
  treatment: string; // e.g., "Acyclovir, Valacyclovir"
  route: "PO" | "IV" | "IM" | "Topical" | "Supportive" | "multiple" | "Vaccine";
  clinicalPearl?: string; // High-yield medical school tip
}

export interface Virus {
  id: string;
  name: string; // e.g., "HSV-1"
  type: "DNA" | "RNA";
  envelope: "Enveloped" | "Non-enveloped";
  polarity: string; // e.g. "Positive-sense ssRNA", "dsDNA (linear)"
  family: string; // e.g., "Herpesviridae"
  transmission: string; // e.g., "Respiratory droplets, direct contact"
  reservoir: string; // e.g., "Humans"
  characteristics: string[];
  diagnosis: string;
  prevention: string;
  treatmentConcepts: string;
  vaccinationStatus: string;
  clinicalMemoryAids: string;
  description: string; // Full text describing manifestations, etc.
  diseases: VirusDisease[];
}

export const virusesData: Virus[] = [
  {
    id: "hsv-1",
    name: "Herpes Simplex Virus 1 (HSV-1)",
    type: "DNA",
    envelope: "Enveloped",
    polarity: "dsDNA (linear)",
    family: "Herpesviridae",
    transmission: "Respiratory secretions, saliva",
    reservoir: "Humans (Trigeminal ganglia)",
    characteristics: ["Intranuclear inclusion bodies (Cowdry A)", "Tzanck smear positive (multinucleated giant cells)"],
    diagnosis: "PCR (test of choice), Tzanck smear, viral culture",
    prevention: "Avoid contact with active lesions",
    treatmentConcepts: "Acyclovir, Valacyclovir, Famciclovir (Guanosine analogs)",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "HSV-1: '1' is above the waist (oral).",
    description: "HSV-1 typically causes oral infections (cold sores) and establishes latency in the trigeminal ganglion. It is a leading cause of sporadic encephalitis in the United States, characteristically affecting the temporal lobe.",
    diseases: [
      {
        id: "hsv1-herpes-labialis",
        name: "Herpes Labialis",
        treatment: "Topical or oral acyclovir/valacyclovir",
        route: "PO",
        clinicalPearl: "Presents as grouped vesicles on an erythematous base around the lips."
      },
      {
        id: "hsv1-encephalitis",
        name: "Herpes Encephalitis",
        treatment: "IV Acyclovir",
        route: "IV",
        clinicalPearl: "Most common cause of sporadic, fatal encephalitis; presents with altered mental status, seizures, and temporal lobe edema on MRI."
      },
      {
        id: "hsv1-gingivostomatitis",
        name: "Herpetic Gingivostomatitis",
        treatment: "Oral acyclovir (if severe)",
        route: "PO",
        clinicalPearl: "Common primary presentation in children; painful oral ulcers leading to dehydration."
      }
    ]
  },
  {
    id: "hsv-2",
    name: "Herpes Simplex Virus 2 (HSV-2)",
    type: "DNA",
    envelope: "Enveloped",
    polarity: "dsDNA (linear)",
    family: "Herpesviridae",
    transmission: "Sexual contact, perinatal",
    reservoir: "Humans (Sacral ganglia)",
    characteristics: ["Intranuclear inclusion bodies", "Painful genital ulcers"],
    diagnosis: "PCR (test of choice)",
    prevention: "Barrier contraception, maternal antiviral suppression to prevent neonatal transmission",
    treatmentConcepts: "Acyclovir, Valacyclovir, Famciclovir",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "HSV-2: '2' is below the waist (genital).",
    description: "HSV-2 primarily causes genital herpes and establishes latency in the sacral ganglia. It can also cause neonatal herpes if transmitted during delivery.",
    diseases: [
      {
        id: "hsv2-genital-herpes",
        name: "Genital Herpes",
        treatment: "Oral valacyclovir or acyclovir",
        route: "PO",
        clinicalPearl: "Painful, grouped genital vesicles. Can recur; daily suppression may be needed."
      },
      {
        id: "hsv2-neonatal",
        name: "Neonatal Herpes",
        treatment: "IV Acyclovir",
        route: "IV",
        clinicalPearl: "Can present as SEM (skin, eye, mouth), CNS involvement, or disseminated disease."
      }
    ]
  },
  {
    id: "vzv",
    name: "Varicella-Zoster Virus (VZV)",
    type: "DNA",
    envelope: "Enveloped",
    polarity: "dsDNA (linear)",
    family: "Herpesviridae (HHV-3)",
    transmission: "Respiratory secretions, contact with fluid from vesicles",
    reservoir: "Humans (Dorsal root or trigeminal ganglia)",
    characteristics: ["Lesions in different stages of healing", "Dewdrops on a rose petal appearance"],
    diagnosis: "Clinical diagnosis, PCR of vesicle fluid",
    prevention: "Live attenuated vaccines (Varivax, Zostavax), Recombinant vaccine (Shingrix)",
    treatmentConcepts: "Acyclovir, Valacyclovir, Famciclovir; VZIG for post-exposure prophylaxis in high-risk",
    vaccinationStatus: "Vaccine available (Routine childhood, adults >50)",
    clinicalMemoryAids: "Chickenpox = kids (diffuse); Shingles = adults (dermatomal).",
    description: "VZV causes chickenpox (varicella) on primary infection and shingles (zoster) upon reactivation. Reactivation typically occurs along a single dermatome and does not cross the midline.",
    diseases: [
      {
        id: "vzv-varicella",
        name: "Varicella (Chickenpox)",
        treatment: "Supportive (children), Acyclovir (adults or immunocompromised)",
        route: "PO",
        clinicalPearl: "Pruritic, vesicular rash appearing in 'crops' (different stages simultaneously)."
      },
      {
        id: "vzv-zoster",
        name: "Herpes Zoster (Shingles)",
        treatment: "Valacyclovir or Famciclovir",
        route: "PO",
        clinicalPearl: "Unilateral vesicular rash in a dermatomal distribution. Post-herpetic neuralgia is a major complication."
      }
    ]
  },
  {
    id: "ebv",
    name: "Epstein-Barr Virus (EBV)",
    type: "DNA",
    envelope: "Enveloped",
    polarity: "dsDNA (linear)",
    family: "Herpesviridae (HHV-4)",
    transmission: "Saliva ('kissing disease')",
    reservoir: "Humans (B cells)",
    characteristics: ["Atypical lymphocytes (Downey cells)", "Heterophile antibody positive"],
    diagnosis: "Monospot test (heterophile antibodies), EBV specific serology",
    prevention: "Avoid sharing utensils, kissing during active infection",
    treatmentConcepts: "Supportive care",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "EBV: Enlarged spleen, B-cells, V-shaped Downey cells.",
    description: "EBV infects B cells via CD21. It causes infectious mononucleosis and is strongly associated with several malignancies including Burkitt lymphoma, Hodgkin lymphoma, and nasopharyngeal carcinoma.",
    diseases: [
      {
        id: "ebv-mono",
        name: "Infectious Mononucleosis",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Presents with fever, hepatosplenomegaly, pharyngitis, and posterior cervical lymphadenopathy. Avoid contact sports due to risk of splenic rupture."
      },
      {
        id: "ebv-burkitt",
        name: "Burkitt Lymphoma",
        treatment: "Chemotherapy",
        route: "IV",
        clinicalPearl: "Endemic (African) form often presents as a jaw mass; 'starry sky' appearance on histology."
      }
    ]
  },
  {
    id: "cmv",
    name: "Cytomegalovirus (CMV)",
    type: "DNA",
    envelope: "Enveloped",
    polarity: "dsDNA (linear)",
    family: "Herpesviridae (HHV-5)",
    transmission: "Congenital, transfusion, sexual contact, saliva, urine, transplant",
    reservoir: "Humans (Mononuclear cells)",
    characteristics: ["Owl's eye inclusions", "Heterophile antibody negative"],
    diagnosis: "PCR, viral culture, histology",
    prevention: "Screening of blood/organs for transplant, safe sex",
    treatmentConcepts: "Ganciclovir, Foscarnet, Cidofovir",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "CMV is 'Sight' (Retinitis) and 'Marrow' (Immunocompromised), Very bad for neonates.",
    description: "CMV is a ubiquitous virus that remains latent in mononuclear cells. It is a major opportunistic pathogen in immunocompromised patients (e.g., AIDS, transplant recipients) and a leading cause of congenital infection.",
    diseases: [
      {
        id: "cmv-retinitis",
        name: "CMV Retinitis",
        treatment: "Ganciclovir or Foscarnet",
        route: "IV",
        clinicalPearl: "Occurs in AIDS patients with CD4 < 50; 'pizza pie' appearance on fundoscopy."
      },
      {
        id: "cmv-congenital",
        name: "Congenital CMV",
        treatment: "Valganciclovir",
        route: "PO",
        clinicalPearl: "Presents with periventricular calcifications, hearing loss, and petechial rash ('blueberry muffin')."
      }
    ]
  },
  {
    id: "hhv-6",
    name: "Human Herpesvirus 6 (HHV-6)",
    type: "DNA",
    envelope: "Enveloped",
    polarity: "dsDNA (linear)",
    family: "Herpesviridae",
    transmission: "Saliva",
    reservoir: "Humans",
    characteristics: ["Infects CD4+ T cells", "High fever followed by rash"],
    diagnosis: "Clinical diagnosis",
    prevention: "None specific",
    treatmentConcepts: "Supportive care",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "HHV-6: 6 months of age, high fever for days, then rash appears.",
    description: "HHV-6 is the causative agent of Roseola infantum (Exanthem subitum). It is characterized by several days of high fever (which can cause febrile seizures) followed by a maculopapular rash that starts on the trunk and spreads outward.",
    diseases: [
      {
        id: "hhv6-roseola",
        name: "Roseola Infantum",
        treatment: "Supportive (Antipyretics)",
        route: "Supportive",
        clinicalPearl: "Classic presentation: 3-5 days of very high fever (risk of febrile seizures), followed by a blanching maculopapular rash as the fever breaks."
      }
    ]
  },
  {
    id: "influenza-a",
    name: "Influenza A Virus",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Negative-sense ssRNA (segmented)",
    family: "Orthomyxoviridae",
    transmission: "Respiratory droplets",
    reservoir: "Humans, pigs, birds",
    characteristics: ["8 segments", "Hemagglutinin (HA) and Neuraminidase (NA)", "Antigenic shift and drift"],
    diagnosis: "Rapid antigen test, RT-PCR",
    prevention: "Annual vaccination (inactivated or live-attenuated)",
    treatmentConcepts: "Neuraminidase inhibitors (Oseltamivir, Zanamivir), Endonuclease inhibitors (Baloxavir)",
    vaccinationStatus: "Annual vaccine available",
    clinicalMemoryAids: "Influenza A = Avian/Animal reservoirs (Shift & Drift).",
    description: "Influenza A causes seasonal flu epidemics and worldwide pandemics. It undergoes both antigenic drift (minor mutations, causing epidemics) and antigenic shift (reassortment of segments, causing pandemics).",
    diseases: [
      {
        id: "flu-a-influenza",
        name: "Influenza",
        treatment: "Oseltamivir (if within 48h of onset)",
        route: "PO",
        clinicalPearl: "Presents with abrupt onset of fever, myalgias, chills, and non-productive cough. High risk of secondary bacterial pneumonia (S. aureus, S. pneumoniae)."
      }
    ]
  },
  {
    id: "rsv",
    name: "Respiratory Syncytial Virus (RSV)",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Negative-sense ssRNA",
    family: "Paramyxoviridae",
    transmission: "Respiratory droplets",
    reservoir: "Humans",
    characteristics: ["F (fusion) protein causes syncytia formation", "Attaches to G protein"],
    diagnosis: "RT-PCR, rapid antigen testing",
    prevention: "Palivizumab (monoclonal antibody for high-risk infants), new RSV vaccines for older adults and pregnant women",
    treatmentConcepts: "Supportive care (oxygen, fluids); Ribavirin (severe cases in immunocompromised)",
    vaccinationStatus: "Vaccines available for adults >60 and maternal administration",
    clinicalMemoryAids: "RSV = 'Respiratory Syncytia Virus', #1 cause of bronchiolitis.",
    description: "RSV is the most common cause of bronchiolitis and pneumonia in infants < 1 year old. It causes seasonal winter outbreaks.",
    diseases: [
      {
        id: "rsv-bronchiolitis",
        name: "Bronchiolitis",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Infant with wheezing, tachypnea, and nasal flaring in the winter months."
      }
    ]
  },
  {
    id: "rhinovirus",
    name: "Rhinovirus",
    type: "RNA",
    envelope: "Non-enveloped",
    polarity: "Positive-sense ssRNA",
    family: "Picornaviridae",
    transmission: "Respiratory droplets, fomites",
    reservoir: "Humans",
    characteristics: ["Acid-labile (destroyed by stomach acid)", ">100 serotypes"],
    diagnosis: "Clinical diagnosis",
    prevention: "Hand hygiene",
    treatmentConcepts: "Supportive care",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "Rhinovirus = 'Rhino' (Nose), acid-labile so it stays in the respiratory tract.",
    description: "Rhinovirus is the most common cause of the common cold. It grows best at 33°C (temperature of the nasal mucosa). Its acid lability prevents it from infecting the GI tract.",
    diseases: [
      {
        id: "rhino-cold",
        name: "Common Cold",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Runny nose, scratchy throat, cough. No fever typically. Extremely common."
      }
    ]
  },
  {
    id: "adenovirus",
    name: "Adenovirus",
    type: "DNA",
    envelope: "Non-enveloped",
    polarity: "dsDNA (linear)",
    family: "Adenoviridae",
    transmission: "Respiratory droplets, fecal-oral",
    reservoir: "Humans",
    characteristics: ["Icosahedral capsid with fibers", "Causes diverse infections"],
    diagnosis: "PCR, viral culture",
    prevention: "Live attenuated oral vaccine (available only for military recruits)",
    treatmentConcepts: "Supportive care",
    vaccinationStatus: "Military only (Types 4 and 7)",
    clinicalMemoryAids: "A-deno: Pharyngitis, Adenopathy, conjunctivitis (pink eye).",
    description: "Adenovirus is a hardy, non-enveloped virus that causes febrile pharyngitis, conjunctivitis ('pink eye'), pneumonia, and hemorrhagic cystitis. It is a common cause of outbreaks in crowded conditions like military barracks or summer camps.",
    diseases: [
      {
        id: "adeno-pharyngoconjunctival",
        name: "Pharyngoconjunctival Fever",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Classic presentation of sore throat, fever, and red watery eyes ('pink eye')."
      },
      {
        id: "adeno-cystitis",
        name: "Hemorrhagic Cystitis",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Presents with dysuria and hematuria in young boys."
      }
    ]
  },
  {
    id: "rotavirus",
    name: "Rotavirus",
    type: "RNA",
    envelope: "Non-enveloped",
    polarity: "dsRNA (segmented)",
    family: "Reoviridae",
    transmission: "Fecal-oral",
    reservoir: "Humans",
    characteristics: ["Wheel-like shape", "11 segments of dsRNA", "Produces NSP4 enterotoxin"],
    diagnosis: "Stool antigen test, PCR",
    prevention: "Live attenuated oral vaccine",
    treatmentConcepts: "Oral rehydration therapy",
    vaccinationStatus: "Vaccine available (Routine childhood)",
    clinicalMemoryAids: "Rota = Wheel (shape). Causes watery diarrhea in winter. Has an enterotoxin.",
    description: "Rotavirus was the leading cause of severe, dehydrating diarrhea in infants globally before the introduction of the vaccine. It destroys enterocytes, causing a villous blunting and osmotic diarrhea, and produces NSP4, a viral enterotoxin.",
    diseases: [
      {
        id: "rota-gastroenteritis",
        name: "Viral Gastroenteritis",
        treatment: "Rehydration",
        route: "Supportive",
        clinicalPearl: "Causes severe watery diarrhea in unvaccinated infants, primarily in winter."
      }
    ]
  },
  {
    id: "norovirus",
    name: "Norovirus",
    type: "RNA",
    envelope: "Non-enveloped",
    polarity: "Positive-sense ssRNA",
    family: "Caliciviridae",
    transmission: "Fecal-oral, contaminated food/water",
    reservoir: "Humans",
    characteristics: ["Extremely low infectious dose", "Resistant to many disinfectants"],
    diagnosis: "RT-PCR of stool",
    prevention: "Handwashing with soap and water (alcohol sanitizers are less effective)",
    treatmentConcepts: "Supportive care (hydration)",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "Noro = 'No room' on the cruise ship (outbreaks in close quarters).",
    description: "Norovirus is the most common cause of viral gastroenteritis in adults and children (post-rotavirus vaccine). It is notorious for outbreaks on cruise ships, in hospitals, and schools.",
    diseases: [
      {
        id: "noro-gastroenteritis",
        name: "Viral Gastroenteritis",
        treatment: "Rehydration",
        route: "Supportive",
        clinicalPearl: "Abrupt onset of prominent vomiting and watery diarrhea lasting 1-3 days."
      }
    ]
  },
  {
    id: "hpv",
    name: "Human Papillomavirus (HPV)",
    type: "DNA",
    envelope: "Non-enveloped",
    polarity: "dsDNA (circular)",
    family: "Papillomaviridae",
    transmission: "Direct contact, sexual contact",
    reservoir: "Humans",
    characteristics: ["Infects basal squamous epithelial cells", "E6 inhibits p53, E7 inhibits Rb"],
    diagnosis: "Pap smear (koilocytes), HPV DNA testing",
    prevention: "HPV Vaccine (Gardasil-9), Pap smears",
    treatmentConcepts: "Ablation (cryotherapy, LEEP), Topical agents (imiquimod, podophyllin)",
    vaccinationStatus: "Vaccine available (Gardasil 9)",
    clinicalMemoryAids: "HPV 16 & 18 = Cancer (E6/E7). HPV 6 & 11 = Warts.",
    description: "HPV causes warts and is strongly associated with cervical, anal, penile, and oropharyngeal squamous cell carcinomas. High-risk types (16, 18) produce E6 and E7 proteins which inactivate tumor suppressors p53 and Rb.",
    diseases: [
      {
        id: "hpv-warts",
        name: "Anogenital Warts (Condylomata acuminata)",
        treatment: "Imiquimod, Podophyllin, Cryotherapy",
        route: "Topical",
        clinicalPearl: "Caused by low-risk types 6 and 11. Cauliflower-like lesions."
      },
      {
        id: "hpv-cervical-cancer",
        name: "Cervical Intraepithelial Neoplasia / Cancer",
        treatment: "Ablation, Excision (LEEP)",
        route: "Supportive",
        clinicalPearl: "Koilocytes (cells with wrinkled nuclei and perinuclear halos) are the hallmark on Pap smear."
      }
    ]
  },
  {
    id: "hepa",
    name: "Hepatitis A Virus (HAV)",
    type: "RNA",
    envelope: "Non-enveloped",
    polarity: "Positive-sense ssRNA",
    family: "Picornaviridae",
    transmission: "Fecal-oral",
    reservoir: "Humans",
    characteristics: ["Acid-stable", "Shed in stool"],
    diagnosis: "Anti-HAV IgM",
    prevention: "Vaccination, proper sanitation/food handling",
    treatmentConcepts: "Supportive",
    vaccinationStatus: "Vaccine available",
    clinicalMemoryAids: "Hep A = Asymptomatic (often in kids), Acute, Alone (no carriers).",
    description: "HAV causes an acute, self-limiting hepatitis. It is often transmitted via contaminated water or food (e.g., shellfish) or in daycares. It does not establish a chronic carrier state.",
    diseases: [
      {
        id: "hepa-acute",
        name: "Acute Hepatitis A",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Presents with jaundice, fever, and hepatomegaly. Travelers to endemic regions."
      }
    ]
  },
  {
    id: "hepb",
    name: "Hepatitis B Virus (HBV)",
    type: "DNA",
    envelope: "Enveloped",
    polarity: "Partially dsDNA (circular)",
    family: "Hepadnaviridae",
    transmission: "Parenteral, sexual, perinatal",
    reservoir: "Humans",
    characteristics: ["Uses reverse transcriptase", "Dane particle"],
    diagnosis: "Serology (HBsAg, Anti-HBc, Anti-HBs)",
    prevention: "Recombinant vaccine (HBsAg), HBIG for post-exposure",
    treatmentConcepts: "Pegylated interferon-alpha, Entecavir, Tenofovir",
    vaccinationStatus: "Vaccine available",
    clinicalMemoryAids: "Hep B = Blood, Baby, Booty. DNA virus with reverse transcriptase.",
    description: "HBV is the only DNA hepatitis virus. It carries its own DNA-dependent DNA polymerase with reverse transcriptase activity. It can cause acute and chronic hepatitis, cirrhosis, and hepatocellular carcinoma.",
    diseases: [
      {
        id: "hepb-chronic",
        name: "Chronic Hepatitis B",
        treatment: "Tenofovir or Entecavir",
        route: "PO",
        clinicalPearl: "High risk of hepatocellular carcinoma, which can occur even in the absence of cirrhosis."
      }
    ]
  },
  {
    id: "hepc",
    name: "Hepatitis C Virus (HCV)",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Positive-sense ssRNA",
    family: "Flaviviridae",
    transmission: "Blood (IVDU, transfusions)",
    reservoir: "Humans",
    characteristics: ["Lacks 3'-5' exonuclease activity (highly mutable)", "Frequent antigenic variation"],
    diagnosis: "Anti-HCV antibodies (screen), HCV RNA PCR (confirm)",
    prevention: "Blood screening, harm reduction (clean needles)",
    treatmentConcepts: "Direct-acting antivirals (DAAs) e.g., Sofosbuvir, Velpatasvir",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "Hep C = Chronic, Cirrhosis, Carcinoma, Carrier.",
    description: "HCV primarily causes chronic hepatitis due to its high mutation rate, which prevents effective immune clearance. It is the leading indication for liver transplantation in the US and is now curable with oral DAAs.",
    diseases: [
      {
        id: "hepc-chronic",
        name: "Chronic Hepatitis C",
        treatment: "Direct-acting antivirals",
        route: "PO",
        clinicalPearl: "The majority of infections become chronic. Strongly associated with cryoglobulinemia."
      }
    ]
  },
  {
    id: "hiv",
    name: "Human Immunodeficiency Virus (HIV)",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Positive-sense ssRNA (diploid)",
    family: "Retroviridae",
    transmission: "Sexual, parenteral, perinatal",
    reservoir: "Humans",
    characteristics: ["Diploid RNA genome", "Reverse transcriptase, Integrase, Protease"],
    diagnosis: "4th generation Ag/Ab screen, confirmed by HIV-1/HIV-2 differentiation assay",
    prevention: "Condoms, PrEP (Pre-exposure prophylaxis), TasP (Treatment as Prevention)",
    treatmentConcepts: "Antiretroviral therapy (ART) - usually 2 NRTIs + Integrase inhibitor",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "HIV: Infects CD4 T cells and macrophages (binds CCR5/CXCR4).",
    description: "HIV-1 is a lentivirus that infects and depletes CD4+ T cells, ultimately leading to Acquired Immunodeficiency Syndrome (AIDS). The viral reverse transcriptase lacks proofreading, leading to rapid mutation.",
    diseases: [
      {
        id: "hiv-aids",
        name: "HIV/AIDS",
        treatment: "Biktarvy (Bictegravir/Emtricitabine/Tenofovir alafenamide) or similar ART",
        route: "PO",
        clinicalPearl: "AIDS is defined as CD4 < 200 or the presence of an AIDS-defining illness (e.g., PCP pneumonia, Kaposi sarcoma)."
      }
    ]
  },
  {
    id: "sars-cov-2",
    name: "Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2)",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Positive-sense ssRNA",
    family: "Coronaviridae",
    transmission: "Respiratory droplets, airborne",
    reservoir: "Humans (origins likely bats/zoonotic)",
    characteristics: ["Spike (S) protein binds ACE2 receptor", "Helical capsid", "Largest RNA genome"],
    diagnosis: "RT-PCR, Rapid Antigen testing",
    prevention: "mRNA vaccines (Pfizer, Moderna), protein subunit vaccines",
    treatmentConcepts: "Nirmatrelvir/Ritonavir (Paxlovid), Remdesivir, Dexamethasone (if hypoxic)",
    vaccinationStatus: "Vaccine available",
    clinicalMemoryAids: "SARS-CoV-2: Binds ACE2. Loss of taste/smell, ground-glass opacities.",
    description: "SARS-CoV-2 is the causative agent of COVID-19. It uses the ACE2 receptor for entry and causes a spectrum of disease ranging from asymptomatic infection to severe ARDS and 'long COVID'.",
    diseases: [
      {
        id: "covid-19",
        name: "COVID-19",
        treatment: "Paxlovid (outpatient mild/mod), Dexamethasone (inpatient severe)",
        route: "PO",
        clinicalPearl: "Severe disease is often characterized by a hyperinflammatory state ('cytokine storm') leading to ARDS and coagulopathy."
      }
    ]
  },
  {
    id: "rabies",
    name: "Rabies Virus",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Negative-sense ssRNA",
    family: "Rhabdoviridae",
    transmission: "Animal bite (saliva)",
    reservoir: "Bats, raccoons, skunks, foxes (dogs worldwide)",
    characteristics: ["Bullet-shaped", "Negri bodies in Purkinje cells"],
    diagnosis: "RT-PCR, direct fluorescent antibody on brain biopsy (post-mortem)",
    prevention: "Vaccination of pets; Post-exposure prophylaxis (PEP) with Rabies IG + Vaccine",
    treatmentConcepts: "Post-exposure prophylaxis is lifesaving; almost 100% fatal once symptoms start",
    vaccinationStatus: "Vaccine available (Pre-exposure for high-risk, PEP for exposures)",
    clinicalMemoryAids: "Rabies: Retrograde axonal transport to the CNS. Bullet-shaped.",
    description: "Rabies virus binds to ACh receptors, travels retrograde via peripheral nerves to the CNS, and causes a fatal encephalitis. Clinical features include hydrophobia, hypersalivation, and agitation.",
    diseases: [
      {
        id: "rabies-encephalitis",
        name: "Rabies Encephalitis",
        treatment: "Post-Exposure Prophylaxis (RIG + Vaccine series)",
        route: "IM",
        clinicalPearl: "Once symptoms appear (hydrophobia, delirium, coma), the disease is almost universally fatal."
      }
    ]
  },
  {
    id: "measles",
    name: "Measles Virus (Rubeola)",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Negative-sense ssRNA",
    family: "Paramyxoviridae",
    transmission: "Airborne (highly contagious)",
    reservoir: "Humans",
    characteristics: ["Hemagglutinin and Fusion protein", "Multinucleated giant cells (Warthin-Finkeldey)"],
    diagnosis: "Clinical presentation, serology (IgM), RT-PCR",
    prevention: "Live attenuated vaccine (MMR)",
    treatmentConcepts: "Supportive care, Vitamin A",
    vaccinationStatus: "Vaccine available (MMR)",
    clinicalMemoryAids: "Measles = 4 C's: Cough, Coryza, Conjunctivitis, and Koplik spots.",
    description: "Measles is a highly contagious virus characterized by a prodrome of fever and the '4 C's', followed by Koplik spots in the mouth, and then a descending maculopapular rash. A rare, late complication is Subacute Sclerosing Panencephalitis (SSPE).",
    diseases: [
      {
        id: "measles-rubeola",
        name: "Measles (Rubeola)",
        treatment: "Supportive, Vitamin A reduces morbidity",
        route: "Supportive",
        clinicalPearl: "Maculopapular rash starts on the head/face and spreads downward. Koplik spots are pathognomonic."
      }
    ]
  },
  {
    id: "mumps",
    name: "Mumps Virus",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Negative-sense ssRNA",
    family: "Paramyxoviridae",
    transmission: "Respiratory droplets",
    reservoir: "Humans",
    characteristics: ["Hemagglutinin, Neuraminidase, and Fusion protein"],
    diagnosis: "Clinical presentation, PCR, serology",
    prevention: "Live attenuated vaccine (MMR)",
    treatmentConcepts: "Supportive care",
    vaccinationStatus: "Vaccine available (MMR)",
    clinicalMemoryAids: "Mumps makes your parotid glands and testes as big as POM-poms (Parotitis, Orchitis, Meningitis).",
    description: "Mumps classically causes bilateral parotitis. Post-pubertal males can develop orchitis, which rarely leads to sterility. It can also cause aseptic meningitis.",
    diseases: [
      {
        id: "mumps-disease",
        name: "Mumps",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Unilateral or bilateral parotid swelling. Look for orchitis in post-pubertal males."
      }
    ]
  },
  {
    id: "rubella",
    name: "Rubella Virus (German Measles)",
    type: "RNA",
    envelope: "Enveloped",
    polarity: "Positive-sense ssRNA",
    family: "Togaviridae",
    transmission: "Respiratory droplets",
    reservoir: "Humans",
    characteristics: ["Postauricular lymphadenopathy"],
    diagnosis: "Serology (IgM), PCR",
    prevention: "Live attenuated vaccine (MMR)",
    treatmentConcepts: "Supportive care",
    vaccinationStatus: "Vaccine available (MMR)",
    clinicalMemoryAids: "Rubella: German measles. Causes congenital cataracts, deafness, and PDA.",
    description: "Rubella causes a mild maculopapular rash (lasting ~3 days) with prominent postauricular lymphadenopathy in children. The major concern is Congenital Rubella Syndrome if contracted during early pregnancy.",
    diseases: [
      {
        id: "rubella-congenital",
        name: "Congenital Rubella Syndrome",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Classic triad: Sensorineural deafness, Cataracts, and Patent Ductus Arteriosus (PDA)."
      }
    ]
  },
  {
    id: "parvovirus-b19",
    name: "Parvovirus B19",
    type: "DNA",
    envelope: "Non-enveloped",
    polarity: "ssDNA",
    family: "Parvoviridae",
    transmission: "Respiratory droplets, transplacental",
    reservoir: "Humans",
    characteristics: ["Smallest DNA virus", "Single-stranded DNA"],
    diagnosis: "Clinical, Serology (IgM), PCR",
    prevention: "None",
    treatmentConcepts: "Supportive care",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "Parvovirus: 'Slapped cheek' (Erythema infectiosum), Aplastic crisis in Sickle Cell.",
    description: "Parvovirus B19 infects erythroid precursor cells. It causes Erythema infectiosum (Fifth disease) in children, arthropathy in adults, aplastic crises in patients with chronic hemolytic anemias (e.g., Sickle Cell), and hydrops fetalis in utero.",
    diseases: [
      {
        id: "b19-erythema",
        name: "Erythema Infectiosum",
        treatment: "Supportive",
        route: "Supportive",
        clinicalPearl: "Classic 'slapped cheek' rash on face, followed by a lacy, reticular rash on the body."
      },
      {
        id: "b19-aplastic",
        name: "Aplastic Crisis",
        treatment: "Blood transfusions if severe",
        route: "Supportive",
        clinicalPearl: "Temporary cessation of red blood cell production; severe in sickle cell patients."
      }
    ]
  },
  {
    id: "coxsackievirus",
    name: "Coxsackievirus",
    type: "RNA",
    envelope: "Non-enveloped",
    polarity: "Positive-sense ssRNA",
    family: "Picornaviridae",
    transmission: "Fecal-oral",
    reservoir: "Humans",
    characteristics: ["Enterovirus", "Non-enveloped"],
    diagnosis: "RT-PCR",
    prevention: "Hygiene",
    treatmentConcepts: "Supportive",
    vaccinationStatus: "No vaccine available",
    clinicalMemoryAids: "Coxsackie = Aseptic meningitis, Hand-Foot-Mouth disease.",
    description: "Coxsackievirus is a genus of enteroviruses that causes a wide range of illnesses, most notably aseptic meningitis and hand-foot-mouth disease.",
    diseases: []
  }
];
