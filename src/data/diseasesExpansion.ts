import { Disease } from "./diseases";

export const expansionDiseases: Disease[] = [
  // ==================== RESPIRATORY ====================
  {
    id: "tuberculosis",
    name: "Tuberculosis (TB)",
    slug: "tuberculosis",
    metaDescription: "Learn Mycobacterium tuberculosis presentation, diagnostic acid-fast smear/PCR, and RIPE therapeutic regimen.",
    overview: "Tuberculosis is a chronic granulomatous disease caused by Mycobacterium tuberculosis, primarily affecting the lungs but capable of systemic dissemination.",
    quickFacts: {
      commonPathogens: ["Mycobacterium tuberculosis"],
      riskFactors: ["Immunosuppression (HIV)", "Immigrants from endemic areas", "Close contacts", "Substance abuse"],
      hallmarkSymptoms: ["Chronic productive cough", "Night sweats", "Weight loss", "Hemoptysis"],
      diagnosticApproach: ["Tuberculin skin test (TST) or IGRA", "Sputum acid-fast bacilli (AFB) smear/culture", "Chest X-ray (cavitary lesions in upper lobes)"]
    },
    clinicalPresentation: "Presents insidiously with chronic productive cough, fever, drenching night sweats, and unexplained weight loss. Physical exam may reveal dullness to percussion and decreased breath sounds in the upper lung zones.",
    causativePathogens: [
      { name: "Mycobacterium tuberculosis", slug: "m-tuberculosis", role: "Acid-fast bacillus with a waxy mycolic acid cell wall. Facultative intracellular pathogen." }
    ],
    diagnosticApproach: "Diagnosed by sputum acid-fast smear (sensitive for infectivity) and culture (gold standard, takes weeks). Nucleic acid amplification tests (NAAT) offer rapid confirmation.",
    treatmentPrinciples: "Standard treatment is the 2-month RIPE phase (Rifampin, Isoniazid, Pyrazinamide, Ethambutol) followed by a 4-month continuation phase (Rifampin, Isoniazid).",
    clinicalPearls: [
      "Secondary (reactivation) TB classically affects the upper lobes with cavitary lesions.",
      "Ethambutol can cause reversible optic neuritis (red-green color blindness).",
      "Isoniazid must be given with Vitamin B6 (pyridoxine) to prevent peripheral neuropathy."
    ],
    relatedAntibiotics: [
      { name: "Rifampin", slug: "rifampin", role: "Inhibits bacterial RNA polymerase; turns secretions orange." },
      { name: "Isoniazid", slug: "isoniazid", role: "Inhibits mycolic acid synthesis; requires Vitamin B6 co-administration." }
    ],
    differentialDiagnoses: ["Fungal Pneumonia (Histoplasmosis/Coccidioidomycosis)", "Lung Cancer (weight loss, chronic cough, solitary mass)", "Bacterial Abscess"],
    faqs: [
      { question: "What is Latent TB Infection (LTBI)?", answer: "Infection without active disease, diagnosed by positive TST/IGRA with normal chest X-ray and no symptoms. Treated with Isoniazid monotherapy." }
    ],
    relatedDiseases: [{ name: "Community-Acquired Pneumonia", slug: "community-acquired-pneumonia", description: "Acute parenchymal infection presenting with more hyperacute onset." }],
    relatedOrganisms: [{ name: "Mycobacterium tuberculosis", slug: "mycobacterium-tuberculosis" }]
  },
  {
    id: "pertussis",
    name: "Pertussis (Whooping Cough)",
    slug: "pertussis",
    metaDescription: "Master Bordetella pertussis diagnostics, three clinical phases, whooping cough hallmark, and macrolide treatments.",
    overview: "Pertussis is a highly contagious respiratory infection caused by Bordetella pertussis, characterized by severe paroxysmal coughing fits followed by an inspiratory 'whoop'.",
    quickFacts: {
      commonPathogens: ["Bordetella pertussis"],
      riskFactors: ["Unvaccinated or undervaccinated infants", "Waning vaccine-induced immunity in adolescents/adults"],
      hallmarkSymptoms: ["Inspiratory 'whoop' sound", "Paroxysmal coughing fits", "Post-tussive emesis", "Subconjunctival hemorrhages"],
      diagnosticApproach: ["Nasopharyngeal swab PCR (highly sensitive early on)", "Nasopharyngeal culture on Regan-Lowe or Bordet-Gengou agar", "Serology"]
    },
    clinicalPresentation: "Begins with catarrhal phase (1-2 weeks of mild URI symptoms). Progresses to the paroxysmal phase (2-6 weeks of severe cough bursts with whooping sound and post-tussive vomiting). Concludes with convalescent phase.",
    causativePathogens: [
      { name: "Bordetella pertussis", slug: "b-pertussis", role: "Gram-negative, encapsulated coccobacillus. Produces pertussis toxin which disables Gi, leading to increased cAMP." }
    ],
    diagnosticApproach: "PCR of nasopharyngeal secretions is the fastest and most sensitive diagnostic standard. Regan-Lowe or Bordet-Gengou charcoal-horse blood-agar culture remains highly specific.",
    treatmentPrinciples: "Macrolides (Azithromycin or Clarithromycin) are first-line to decrease transmissibility. Early initiation (during catarrhal phase) is critical to reduce symptom duration.",
    clinicalPearls: [
      "Pertussis toxin induces severe lymphocytic leukocytosis (unusual for bacterial infections; due to blockage of lymphocyte entry into lymph nodes).",
      "Post-tussive emesis in an adolescent or adult with a chronic dry cough is highly suggestive of pertussis.",
      "Prophylaxis with Azithromycin is indicated for all close contacts regardless of vaccination status."
    ],
    relatedAntibiotics: [
      { name: "Azithromycin", slug: "azithromycin", role: "Macrolide of choice. Stops bacterial protein synthesis by targeting the 50S subunit." }
    ],
    differentialDiagnoses: ["Mycoplasma Pneumonia (chronic dry cough, but features fever and wheezing)", "Croup (barking cough in younger infants)", "Foreign body aspiration"],
    faqs: [
      { question: "Why is vaccination critical for infants?", answer: "Infants under 6 months have the highest risk of life-threatening complications, including severe apnea, seizures, and encephalopathy." }
    ],
    relatedDiseases: [{ name: "Community-Acquired Pneumonia", slug: "community-acquired-pneumonia", description: "Differentiated by consolidation on X-ray and productive sputum." }],
    relatedOrganisms: [{ name: "Bordetella pertussis", slug: "bordetella-pertussis" }]
  },
  {
    id: "covid-19",
    name: "COVID-19",
    slug: "covid-19",
    metaDescription: "Understand COVID-19 respiratory and systemic presentation, viral diagnostics, and Paxlovid / Remdesivir therapies.",
    overview: "COVID-19 is a highly infectious disease caused by the SARS-CoV-2 coronavirus, presenting as an acute respiratory illness with severe systemic thromboinflammatory potential.",
    quickFacts: {
      commonPathogens: ["SARS-CoV-2"],
      riskFactors: ["Advanced age", "Obesity", "Diabetes mellitus", "Chronic kidney disease", "Unvaccinated status"],
      hallmarkSymptoms: ["Fever, dry cough, dyspnea", "Anosmia (loss of smell) or dysgeusia", "Fatigue and myalgias", "Prothrombotic state (DVT/PE)"],
      diagnosticApproach: ["Rapid antigen assay (nasal swab)", "RT-PCR (gold standard for accuracy)", "Chest CT (bilateral peripheral ground-glass opacities)"]
    },
    clinicalPresentation: "Manifests with acute onset of fever, cough, shortness of breath, and distinctive loss of smell or taste. Severe cases progress rapidly to Acute Respiratory Distress Syndrome (ARDS), cytokine release syndrome, and multi-organ failure.",
    causativePathogens: [
      { name: "SARS-CoV-2", slug: "sars-cov-2", role: "Enveloped, positive-sense single-stranded RNA virus. Binds to host ACE2 receptors via its spike protein to gain entry." }
    ],
    diagnosticApproach: "Nasopharyngeal or anterior nasal RT-PCR is the diagnostic gold standard. Rapid antigen testing is widely used for initial screening but has lower sensitivity in early infection.",
    treatmentPrinciples: "Mild-to-moderate outpatients at risk of progression get Paxlovid (Nirmatrelvir-Ritonavir) or Remdesivir. Hospitalized patients requiring oxygen receive Dexamethasone and Remdesivir.",
    clinicalPearls: [
      "Paxlovid is a potent inhibitor of CYP3A4 due to Ritonavir; always check for dangerous drug interactions before prescribing.",
      "COVID-19 is associated with a hypercoagulable state; hospitalized patients require prophylactic anticoagulation.",
      "Bilateral, peripheral, lower-lobe-predominant ground-glass opacities are classic chest CT findings."
    ],
    relatedAntibiotics: [
      { name: "Paxlovid", slug: "paxlovid", role: "Nirmatrelvir (Mpro protease inhibitor) boosted by Ritonavir (CYP3A4 inhibitor to extend nirmatrelvir half-life)." }
    ],
    differentialDiagnoses: ["Influenza (similar fever and cough, but lacks anosmia)", "Mycoplasma Pneumonia (atypical pneumonia, slower onset)", "Pulmonary Embolism"],
    faqs: [
      { question: "What is the mechanism of Paxlovid?", answer: "Nirmatrelvir inhibits the SARS-CoV-2 main protease (Mpro), preventing viral replication. Ritonavir is added purely as a pharmacokinetic enhancer to slow nirmatrelvir's hepatic metabolism." }
    ],
    relatedDiseases: [{ name: "Influenza", slug: "influenza", description: "Viral respiratory syndrome presenting during winter seasons with acute high fevers." }],
    relatedOrganisms: [{ name: "SARS-CoV-2", slug: "sars-cov-2" }]
  },
  {
    id: "pneumocystis-pneumonia",
    name: "Pneumocystis Pneumonia (PCP)",
    slug: "pneumocystis-pneumonia",
    metaDescription: "Master Pneumocystis jirovecii opportunistic pneumonia, CD4 < 200 cutoff, diagnostic silver stain, and TMP-SMX treatment.",
    overview: "Pneumocystis Pneumonia is a life-threatening opportunistic fungal infection of the lungs, occurring almost exclusively in severely immunocompromised hosts.",
    quickFacts: {
      commonPathogens: ["Pneumocystis jirovecii"],
      riskFactors: ["HIV/AIDS with CD4 < 200 cells/µL", "Chronic high-dose corticosteroid use", "Solid organ transplant recipients"],
      hallmarkSymptoms: ["Progressive exertional dyspnea", "Dry cough", "Fever", "Severe hypoxemia out of proportion to exam"],
      diagnosticApproach: ["Induced sputum or bronchoalveolar lavage (BAL) fluid analysis", "Methenamine silver stain (reveals crushed ping-pong ball cysts)", "Beta-D-glucan assay", "Chest X-ray (diffuse bilateral ground-glass infiltrates)"]
    },
    clinicalPresentation: "Presents with subacute, progressive shortness of breath on exertion, fever, and non-productive cough. Clinicians will note a striking discrepancy: severe hypoxemia and desaturation on ambulation, despite a normal or clear lung auscultation.",
    causativePathogens: [
      { name: "Pneumocystis jirovecii", slug: "pneumocystis-jirovecii", role: "Unicellular atypical fungus with cholesterol instead of ergosterol in its cell membrane. Unculturable in vitro." }
    ],
    diagnosticApproach: "Diagnosed by microscopic examination of BAL fluid or induced sputum using Gomori methenamine silver (GMS) stain (shows round cysts) or direct fluorescent antibody (DFA) assay. Serum beta-D-glucan is highly sensitive but non-specific.",
    treatmentPrinciples: "First-line therapy is high-dose Trimethoprim-Sulfamethoxazole (TMP-SMX) for 21 days. If PaO2 < 70 mmHg or A-a gradient >= 35, adjunctive systemic Corticosteroids must be added to prevent inflammatory lung damage.",
    clinicalPearls: [
      "PCP cell membrane contains cholesterol, making standard ergosterol-targeting antifungals (Azoles, Amphotericin) completely useless.",
      "Prophylaxis with daily single-strength TMP-SMX is mandatory in HIV patients once CD4 counts drop below 200 cells/µL.",
      "Microscopic GMS staining classically shows 'crushed cup' or 'ping-pong ball' yeast-like structures with central nuclei."
    ],
    relatedAntibiotics: [
      { name: "Trimethoprim-Sulfamethoxazole", slug: "tmp-smx", role: "Inhibits folate synthesis pathways sequentially. Used as first-line treatment and prophylaxis." }
    ],
    differentialDiagnoses: ["Community-Acquired Pneumonia (features productive cough, lobar infiltrate)", "Cytomegalovirus Pneumonitis (interstitial pneumonitis in similar host)", "Pulmonary Kaposi Sarcoma"],
    faqs: [
      { question: "When should steroids be added to PCP treatment?", answer: "Corticosteroids must be added within 72 hours of starting antibiotic therapy if arterial blood gas reveals a PaO2 < 70 mmHg or an alveolar-arterial (A-a) oxygen gradient >= 35 mmHg." }
    ],
    relatedDiseases: [{ name: "Community-Acquired Pneumonia", slug: "community-acquired-pneumonia", description: "Bacterial pneumonia presenting with more rapid onset and focal lobar findings." }],
    relatedOrganisms: [{ name: "Pneumocystis jirovecii", slug: "pneumocystis-jirovecii" }],
    hostFactors: ["Opportunistic Infection", "HIV/AIDS (CD4 < 200)", "Organ transplant"],
    relatedComparisons: [{ name: "Typical vs. Atypical Pneumonias", slug: "mycoplasma-vs-chlamydophila-vs-legionella" }]
  },

  // ==================== NEUROLOGIC ====================
  {
    id: "viral-meningitis",
    name: "Viral Meningitis (Aseptic)",
    slug: "viral-meningitis",
    alternateSlugs: ["viral-aseptic-meningitis", "aseptic-meningitis"],
    metaDescription: "Differentiate viral vs bacterial CSF profiles (lymphocytes, normal glucose), enterovirus causes, and supportive treatments.",
    overview: "Viral Meningitis is an acute inflammation of the leptomeninges caused by viral pathogens, presenting with a milder clinical course than bacterial meningitis and characterized by normal CSF glucose.",
    quickFacts: {
      commonPathogens: ["Enteroviruses (Coxsackievirus, Echovirus)", "Herpes Simplex Virus 2 (HSV-2)", "Arboviruses (West Nile, St. Louis)"],
      riskFactors: ["Summer/fall seasons", "Young age", "Close quarters"],
      hallmarkSymptoms: ["Fever, headache, photophobia", "Nuchal rigidity (stiff neck)", "Kernig and Brudzinski signs", "Absence of focal neurologic deficits"],
      diagnosticApproach: ["Lumbar puncture (CSF reveals lymphocytic pleocytosis, normal glucose, mild protein)", "CSF viral PCR (highly sensitive for Enteroviruses, HSV)"]
    },
    clinicalPresentation: "Presents acutely with fever, frontal headache, neck stiffness, and photophobia. Patients remain alert and oriented, lacking the profound lethargy, seizures, or focal deficits seen in bacterial meningitis or viral encephalitis.",
    causativePathogens: [
      { name: "Coxsackievirus", slug: "coxsackievirus", role: "Non-polio enterovirus (picornavirus family). The leading cause of viral meningitis, especially in summer months." }
    ],
    diagnosticApproach: "Lumbar puncture is diagnostic: CSF pressure is normal/mildly elevated; leukocyte count is moderately elevated (10-500 cells/µL) with clear lymphocytic dominance (neutrophils may dominate in the first 24 hours); glucose is strictly normal; protein is normal or mildly elevated.",
    treatmentPrinciples: "Management is primarily supportive, consisting of IV hydration, analgesics, and antipyretics. Prognosis is excellent with spontaneous resolution within 7-10 days. Acyclovir is reserved for HSV/VZV etiologies.",
    clinicalPearls: [
      "Board Examination Pearl: CSF showing lymphocytic pleocytosis paired with completely normal glucose is the absolute signature of aseptic (viral) meningitis.",
      "Enteroviruses are positive-sense, single-stranded, non-enveloped RNA viruses spread via fecal-oral transmission.",
      "HSV-2 classically causes recurrent benign lymphocytic meningitis (Mollaret meningitis)."
    ],
    relatedAntibiotics: [],
    differentialDiagnoses: ["Acute Bacterial Meningitis (neutrophils, low glucose, high protein)", "Cryptococcal Meningitis", "HSV Encephalitis (altered mental status, focal temporal deficits)"],
    faqs: [
      { question: "Why is CSF glucose normal in viral meningitis?", answer: "Viruses do not utilize glucose for metabolism, unlike bacteria and fungi which actively consume CSF glucose, leading to severe hypoglycorrachia." }
    ],
    relatedDiseases: [{ name: "Acute Bacterial Meningitis", slug: "acute-bacterial-meningitis", description: "Bacterial counterpart presenting with profound illness, low CSF glucose, and high mortality." }],
    relatedOrganisms: [],
    relatedComparisons: [{ name: "Viral vs. Bacterial Meningitis CSF Profiles", slug: "viral-vs-bacterial-meningitis" }]
  },
  {
    id: "hsv-encephalitis",
    name: "HSV Encephalitis",
    slug: "hsv-encephalitis",
    metaDescription: "Understand HSV-1 temporal lobe necrosis, focal neurological presentation, red blood cells in CSF, and IV Acyclovir guidelines.",
    overview: "HSV Encephalitis is a severe, necrotizing viral infection of the brain parenchyma, localized characteristically to the temporal lobes and caused by Herpes Simplex Virus 1 (HSV-1).",
    quickFacts: {
      commonPathogens: ["Herpes Simplex Virus 1 (HSV-1)"],
      riskFactors: ["Immunocompetent or immunocompromised hosts of any age"],
      hallmarkSymptoms: ["Acute onset fever and hemicranial headache", "Altered mental status and behavioral changes", "Focal seizures (temporal origin)", "Olfactory hallucinations"],
      diagnosticApproach: ["Brain MRI (T2/FLAIR hyperintensity in temporal lobes)", "CSF HSV-1 PCR (diagnostic gold standard)", "CSF analysis (lymphocytosis, elevated RBCs due to hemorrhagic necrosis)", "EEG (periodic lateralizing epileptiform discharges)"]
    },
    clinicalPresentation: "Presents acutely with high fever, severe localized headache, rapid behavioral deterioration (confusion, psychosis, aphasia), and focal seizures. Olfactory hallucinations may occur due to temporal/orbitofrontal tissue destruction.",
    causativePathogens: [
      { name: "Herpes Simplex Virus 1", slug: "hsv-1", role: "Double-stranded DNA enveloped virus. Travels retrogradely from trigeminal ganglia to the temporal cortex during reactivation." }
    ],
    diagnosticApproach: "CSF PCR for HSV-1 DNA is the diagnostic gold standard (>98% sensitive). Brain MRI is highly specific, showing asymmetric swelling and high T2/FLAIR signal in the temporal lobes and insula.",
    treatmentPrinciples: "Empirical intravenous Acyclovir (10 mg/kg every 8 hours) must be initiated immediately upon suspicion to prevent permanent cognitive impairment or death. Treat for a full 14-21 days.",
    clinicalPearls: [
      "The presence of elevated red blood cells (RBCs) in a non-traumatic CSF tap suggests hemorrhagic temporal lobe necrosis, highly indicative of HSV encephalitis.",
      "Acyclovir is a guanosine analog that must be monophosphorylated by viral thymidine kinase before inhibiting viral DNA polymerase.",
      "Monitor renal function closely during IV Acyclovir therapy due to risks of crystalline nephropathy; ensure vigorous hydration."
    ],
    relatedAntibiotics: [
      { name: "Acyclovir", slug: "acyclovir", role: "Guanosine analog requiring viral thymidine kinase for activation. Inhibits viral DNA polymerase." }
    ],
    differentialDiagnoses: ["Autoimmune Encephalitis (similar temporal findings, subacute, positive autoantibodies)", "Brain Abscess", "Bacterial Meningitis"],
    faqs: [
      { question: "Why does HSV encephalitis localize to the temporal lobes?", answer: "HSV-1 establishes latency in the trigeminal ganglion. Upon reactivation, the virus spreads retrogradely along meningeal branches of the trigeminal nerve, entering the anterior and middle cranial fossae to target the temporal and frontal lobes." }
    ],
    relatedDiseases: [{ name: "Cryptococcal Meningitis", slug: "cryptococcal-meningitis", description: "Subacute opportunistic infection with elevated intracranial pressure." }],
    relatedOrganisms: []
  },
  {
    id: "brain-abscess",
    name: "Brain Abscess",
    slug: "brain-abscess",
    metaDescription: "Learn brain abscess etiology (Streptococci, anaerobes), diagnostic ring-enhancing MRI scan, and empiric triple antibiotic regimen.",
    overview: "A Brain Abscess is a focal, suppurative infection within the brain parenchyma, typically presenting as a ring-enhancing lesion on neuroimaging.",
    quickFacts: {
      commonPathogens: ["Viridans Streptococci (e.g., S. anginosus)", "Obligate Anaerobes (Bacteroides, Prevotella)", "Staphylococcus aureus (post-trauma/surgery)", "Toxoplasma gondii or Nocardia (immunocompromised)"],
      riskFactors: ["Local contiguous infection (otitis media, mastoiditis, sinusitis, dental caries)", "Hematogenous spread (cyanotic heart disease, infective endocarditis)"],
      hallmarkSymptoms: ["Dull, constant headache (most common symptom)", "Focal neurological deficits", "Fever (absent in half of cases)", "Seizures of new onset"],
      diagnosticApproach: ["Brain MRI or CT with contrast (reveals classic ring-enhancing lesion with vasogenic edema)", "Surgical aspiration with Gram stain and culture", "Blood cultures"]
    },
    clinicalPresentation: "Presents with a progressive, constant headache that fails to respond to analgesics. Fever is only present in 50% of cases. Depending on the abscess location (e.g., temporal, frontal, cerebellar), patients manifest focal deficits, aphasia, ataxia, or generalized seizures.",
    causativePathogens: [
      { name: "Streptococcus anginosus", slug: "s-anginosus", role: "Part of the S. milleri group; highly pyogenic microaerophilic organism with a propensity for abscess formation." }
    ],
    diagnosticApproach: "Contrast-enhanced brain MRI is the diagnostic modality of choice, demonstrating a smooth, thin-walled, ring-enhancing capsule surrounded by significant vasogenic edema. Lumbar puncture is strictly contraindicated due to herniation risk.",
    treatmentPrinciples: "Empirical therapy consists of Ceftriaxone (targets streptococci/Gram-negatives), Metronidazole (targets anaerobes), and Vancomycin (targets staphylococci). Surgical drainage via stereotactic needle aspiration is often required.",
    clinicalPearls: [
      "Otitis media or mastoiditis classically spreads to the temporal lobe or cerebellum; sinusitis spreads to the frontal lobe.",
      "Metronidazole is uniquely suited for brain abscesses because it has outstanding penetration into the CNS and targets anaerobes.",
      "The ring-enhancing lesion on MRI represents the vascularized collagen capsule formed by macrophages and fibroblasts."
    ],
    relatedAntibiotics: [
      { name: "Ceftriaxone", slug: "ceftriaxone", role: "Third-generation cephalosporin; crosses blood-brain barrier." },
      { name: "Metronidazole", slug: "metronidazole", role: "Anaerobic agent; generates destructive free radicals." }
    ],
    differentialDiagnoses: ["Glioblastoma Multiforme (thick, irregular, ragged ring enhancement)", "Metastatic Brain Tumor", "Cerebral Toxoplasmosis (multiple ring-enhancing lesions in HIV)"],
    faqs: [
      { question: "Why is lumbar puncture contraindicated in suspected brain abscess?", answer: "The localized mass effect and surrounding vasogenic edema from a brain abscess create significant intracranial pressure gradients. Performing a lumbar puncture can rapidly lead to fatal transtentorial or tonsillar herniation." }
    ],
    relatedDiseases: [{ name: "Acute Bacterial Meningitis", slug: "acute-bacterial-meningitis", description: "Diffuse meningeal infection without a focal parenchymal fluid collection." }],
    relatedOrganisms: []
  },
  {
    id: "cerebral-toxoplasmosis",
    name: "Cerebral Toxoplasmosis",
    slug: "cerebral-toxoplasmosis",
    metaDescription: "Master Toxoplasma gondii CNS infections, CD4 < 100 threshold, multiple ring-enhancing MRI lesions, and Pyrimethamine-Sulfadiazine therapy.",
    overview: "Cerebral Toxoplasmosis is an opportunistic parasitic infection of the central nervous system caused by reactivation of Toxoplasma gondii, classically occurring in patients with advanced HIV/AIDS.",
    quickFacts: {
      commonPathogens: ["Toxoplasma gondii"],
      riskFactors: ["HIV/AIDS with CD4 < 100 cells/µL", "Absence of TMP-SMX prophylaxis", "Ingestion of undercooked meat or contact with cat feces"],
      hallmarkSymptoms: ["Headache and fever", "Focal neurological deficits (hemiparesis, sensory loss)", "Seizures", "Cognitive decline"],
      diagnosticApproach: ["Brain MRI (multiple ring-enhancing lesions in basal ganglia/cortex)", "Serum anti-Toxoplasma IgG antibodies (positive in >95%)", "CSF Toxoplasma PCR", "Brain biopsy (definitive; shows tachyzoites)"]
    },
    clinicalPresentation: "Presents subacutely with fever, headache, altered mental status, and focal neurologic signs (such as hemiparesis, cranial nerve palsies, or cerebellar ataxia). Seizures are common initial manifestations.",
    causativePathogens: [
      { name: "Toxoplasma gondii", slug: "toxoplasma-gondii", role: "Obligate intracellular protozoan parasite. Forms tissue cysts (bradyzoites) that reactivate when cellular immunity fails." }
    ],
    diagnosticApproach: "Brain MRI with contrast is highly characteristic, displaying multiple ring-enhancing lesions localized to the basal ganglia and corticomedullary junction. Diagnosis is usually presumptive based on CD4 count < 100, positive serum IgG, and characteristic MRI findings.",
    treatmentPrinciples: "First-line regimen is combination Pyrimethamine and Sulfadiazine, co-administered with Leucovorin (folinic acid) to prevent bone marrow toxicity. TMP-SMX is used if first-line is unavailable or for prophylaxis.",
    clinicalPearls: [
      "Presumptive therapy with Pyrimethamine-Sulfadiazine is started immediately; if no clinical/radiological improvement is seen in 10-14 days, a brain biopsy is indicated to rule out Primary CNS Lymphoma.",
      "Prophylaxis with daily double-strength TMP-SMX is indicated for Toxoplasma-seropositive HIV patients with CD4 < 100 cells/µL.",
      "Leucovorin (folinic acid) bypasses dihydrofolate reductase inhibition in human cells but not in Toxoplasma, protecting host bone marrow."
    ],
    relatedAntibiotics: [
      { name: "Trimethoprim-Sulfamethoxazole", slug: "tmp-smx", role: "First-line alternative agent for treatment and the primary agent for prophylaxis." }
    ],
    differentialDiagnoses: ["Primary CNS Lymphoma (classically a solitary ring-enhancing lesion, EBV PCR positive in CSF)", "Brain Abscess (bacterial)", "Progressive Multifocal Leukoencephalopathy (PML; non-enhancing white matter lesions)"],
    faqs: [
      { question: "Why is folinic acid (Leucovorin) mandatory during Pyrimethamine-Sulfadiazine treatment?", answer: "Pyrimethamine is a potent inhibitor of dihydrofolate reductase. Without folinic acid supplementation, severe bone marrow suppression (leukopenia, anemia, thrombocytopenia) would occur." }
    ],
    relatedDiseases: [{ name: "Cryptococcal Meningitis", slug: "cryptococcal-meningitis", description: "Another major opportunistic CNS infection in advanced HIV, presenting with diffuse meningeal signs rather than focal mass lesions." }],
    relatedOrganisms: [],
    hostFactors: ["Opportunistic Infection", "HIV/AIDS (CD4 < 100)"]
  },

  // ==================== GENITOURINARY ====================
  {
    id: "vulvovaginal-candidiasis",
    name: "Vulvovaginal Candidiasis (Yeast Infection)",
    slug: "vulvovaginal-candidiasis",
    metaDescription: "Master Candida albicans vulvovaginitis symptoms, cottage cheese discharge, normal pH (<4.5), and Fluconazole treatment.",
    overview: "Vulvovaginal Candidiasis is a highly common superficial fungal infection of the vulva and vagina, primarily caused by Candida albicans overgrowth.",
    quickFacts: {
      commonPathogens: ["Candida albicans"],
      riskFactors: ["Recent antibiotic use", "Elevated estrogen levels (pregnancy, oral contraceptives)", "Uncontrolled diabetes mellitus", "Immunosuppression"],
      hallmarkSymptoms: ["Thick, white, curd-like 'cottage cheese' vaginal discharge", "Severe vulvar pruritus (itching) and burning", "Dysuria (external) and dyspareunia (painful intercourse)", "Erythema and edema of the vulva"],
      diagnosticApproach: ["Vaginal fluid pH (strictly normal: < 4.5)", "Wet mount with 10% KOH (reveals pseudohypae and budding yeast)", "Fungal culture"]
    },
    clinicalPresentation: "Presents with intense itching and burning of the external vulva and vagina, accompanied by a thick, white vaginal discharge that adheres to the vaginal walls. Examination shows vulvar erythema, swelling, and excoriations from scratching.",
    causativePathogens: [
      { name: "Candida albicans", slug: "candida-albicans", role: "Dimorphic opportunistic yeast; forms pseudohypae and budding yeasts at 20C, and germ tubes at 37C." }
    ],
    diagnosticApproach: "Evaluated by measuring vaginal pH, which remains normal (<4.5) in isolated candidiasis. High-yield diagnosis is confirmed by microscopy of vaginal discharge mixed with 10% KOH, revealing distinct pseudohypae and budding yeast cells.",
    treatmentPrinciples: "Uncomplicated episodes are treated with a single oral dose of Fluconazole (150 mg) or topical azole creams (Miconazole, Clotrimazole) for 1-3 days. Complicated cases require longer courses.",
    clinicalPearls: [
      "Board Examination Pearl: A patient with thick white discharge, severe vulvar pruritus, but a strictly normal vaginal pH of 4.2 has vulvovaginal candidiasis.",
      "Recent broad-spectrum antibiotic therapy (e.g., for a UTI) wipes out vaginal Lactobacillus, raising glycogen levels and encouraging Candida overgrowth.",
      "In contrast to Trichomoniasis and Bacterial Vaginosis, Candida does NOT produce a fishy odor on KOH whiff testing."
    ],
    relatedAntibiotics: [
      { name: "Fluconazole", slug: "fluconazole", role: "Oral azole; inhibits lanosterol 14-alpha-demethylase, blocking fungal cell membrane synthesis." }
    ],
    differentialDiagnoses: ["Bacterial Vaginosis (thin gray discharge, pH > 4.5, positive whiff test, clue cells)", "Trichomoniasis (frothy yellow-green discharge, strawberry cervix, pH > 4.5)", "Contact Dermatitis"],
    faqs: [
      { question: "Why do broad-spectrum antibiotics trigger yeast infections?", answer: "Antibiotics destroy the vaginal Lactobacillus population, which normally produces lactic acid to maintain an acidic protective environment. Loss of Lactobacillus allows Candida yeast to proliferate uncontrollably." }
    ],
    relatedDiseases: [{ name: "Urethritis", slug: "urethritis", description: "Sexually transmitted inflammation of the urethra presenting with purulent discharge." }],
    relatedOrganisms: [{ name: "Candida albicans", slug: "candida-albicans" }]
  },
  {
    id: "trichomoniasis",
    name: "Trichomoniasis",
    slug: "trichomoniasis",
    metaDescription: "Learn Trichomonas vaginalis STI hallmarks, frothy yellow-green discharge, strawberry cervix, motile trophozoites, and Metronidazole therapy.",
    overview: "Trichomoniasis is a highly prevalent sexually transmitted infection (STI) caused by the flagellated protozoan parasite Trichomonas vaginalis, presenting with inflammatory vaginitis and elevated pH.",
    quickFacts: {
      commonPathogens: ["Trichomonas vaginalis"],
      riskFactors: ["Multiple sexual partners", "Unprotected intercourse", "History of other STIs"],
      hallmarkSymptoms: ["Frothy, yellow-green, foul-smelling vaginal discharge", "Severe vaginal pruritus, burning, and dysuria", "Erythema of vaginal walls and 'strawberry cervix'", "Elevated vaginal pH (> 4.5)"],
      diagnosticApproach: ["Saline wet mount of vaginal discharge (reveals highly motile, flagellated trophozoites)", "Nucleic Acid Amplification Test (NAAT; gold standard for sensitivity)", "OSOM Trichomonas rapid test"]
    },
    clinicalPresentation: "Women present with a profuse, frothy, malodorous yellow-green discharge, burning with urination, and deep dyspareunia. Physical exam reveals marked colpitis macularis, characterized by punctate hemorrhages on the cervix ('strawberry cervix').",
    causativePathogens: [
      { name: "Trichomonas vaginalis", slug: "trichomonas-vaginalis", role: "Flagellated, anaerobic, motile protozoan parasite. Exists only as a trophozoite; does not form cysts." }
    ],
    diagnosticApproach: "NAAT of vaginal swabs is the diagnostic gold standard. Wet mount of fresh secretions in normal saline provides rapid, high-yield examination by demonstrating actively twitching, pear-shaped motile protozoa.",
    treatmentPrinciples: "First-line therapy is oral Metronidazole (either a single 2g dose or 500mg twice daily for 7 days). It is mandatory to treat the sexual partner concurrently to prevent reinfection.",
    clinicalPearls: [
      "Board Examination Clue: Look for 'strawberry cervix' and pear-shaped, flagellated, motile organisms on wet mount to identify Trichomonas.",
      "Trichomonas vaginalis lacks a cyst stage, meaning it cannot survive long in the environment and must be transmitted via direct sexual contact.",
      "Warn patients strictly to avoid alcohol consumption while taking Metronidazole due to a severe disulfiram-like reaction."
    ],
    relatedAntibiotics: [
      { name: "Metronidazole", slug: "metronidazole", role: "Oral nitroimidazole; generates reactive free radicals that damage parasite DNA. Requires abstaining from alcohol." }
    ],
    differentialDiagnoses: ["Bacterial Vaginosis (gray-white discharge, clue cells, positive whiff test, no motility)", "Vulvovaginal Candidiasis (cottage-cheese discharge, normal pH, pseudohyphae)", "Gonococcal Urethritis"],
    faqs: [
      { question: "Why must sexual partners be treated simultaneously?", answer: "Trichomoniasis is a highly communicable STI. Infected partners are often completely asymptomatic but carry the parasite; failing to treat partners simultaneously leads to immediate clinical reinfection." }
    ],
    relatedDiseases: [{ name: "Urethritis", slug: "urethritis", description: "Sexually transmitted urethral infection caused by Chlamydia or Gonorrhea." }],
    relatedOrganisms: []
  },

  // ==================== GASTROINTESTINAL ====================
  {
    id: "acute-bacterial-gastroenteritis",
    name: "Acute Bacterial Gastroenteritis (Invasive)",
    slug: "acute-bacterial-gastroenteritis",
    metaDescription: "Understand invasive bacterial diarrhea causes (Salmonella, Shigella, Campylobacter), fever, bloody stools, and supportive care principles.",
    overview: "Acute Bacterial Gastroenteritis is an inflammation of the mucous membranes of the stomach and intestines caused by invasive bacterial pathogens, classically presenting with fever and inflammatory/bloody stools.",
    quickFacts: {
      commonPathogens: ["Salmonella enterica (non-typhoidal)", "Campylobacter jejuni", "Shigella sonnei", "Enterohemorrhagic E. coli (EHEC/STEC)"],
      riskFactors: ["Ingestion of undercooked poultry, eggs, or unpasteurized milk", "Fecal-oral transmission (shigellosis in daycare centers)", "Recent travel"],
      hallmarkSymptoms: ["Inflammatory, bloody or mucoid diarrhea (dysentery)", "High fevers and severe abdominal cramps", "Tenesmus (painful spasm of anal sphincter)", "Dehydration"],
      diagnosticApproach: ["Stool culture on selective media (MacConkey, Hektoen)", "Stool PCR panel (multiplex molecular detection)", "Fecal leukocytes or fecal calprotectin assay"]
    },
    clinicalPresentation: "Presents acutely with fever, systemic toxicity, lower abdominal cramping, and frequent small-volume stools containing visible blood and mucus. Signs of volume depletion are common.",
    causativePathogens: [
      { name: "Campylobacter jejuni", slug: "c-jejuni", role: "Gram-negative, curved, comma-shaped rod. Thrives at 42C. Leading bacterial cause of diarrhea in developed nations." }
    ],
    diagnosticApproach: "Stool PCR multiplex assay is the modern diagnostic standard. Selective stool cultures differentiate salmonella (black colonies on Hektoen agar due to H2S production) from shigella (green colonies, no H2S).",
    treatmentPrinciples: "Primary therapy is aggressive oral or IV fluid rehydration. Routine antibiotics are avoided to prevent antibiotic-associated complications. Fluoroquinolones or Azithromycin are reserved for severe or systemic cases.",
    clinicalPearls: [
      "Board Examination Warning: Never give antibiotics to a child with suspected EHEC (E. coli O157:H7) as this increases toxin release, triggering fatal Hemolytic Uremic Syndrome (HUS).",
      "Campylobacter jejuni infection is the leading antecedent trigger of Guillain-Barré syndrome due to molecular mimicry.",
      "Shigella has an extremely low infectious dose (as few as 10 organisms) because it survives stomach acid."
    ],
    relatedAntibiotics: [
      { name: "Ciprofloxacin", slug: "ciprofloxacin", role: "Fluoroquinolone; inhibits DNA gyrase. Used for severe, bacteremic, or traveler's diarrhea." }
    ],
    differentialDiagnoses: ["Viral Gastroenteritis (watery stools, no blood or high fever)", "Inflammatory Bowel Disease flare", "Ischemic Colitis"],
    faqs: [
      { question: "Why are antibiotics contraindicated in Enterohemorrhagic E. coli (EHEC)?", answer: "Antibiotics induce a stress response in EHEC, causing lysis and upregulating the production and release of Shiga toxin. This dramatically increases the risk of Shiga toxin-induced HUS, characterized by microangiopathic hemolytic anemia, thrombocytopenia, and acute renal failure." }
    ],
    relatedDiseases: [{ name: "C. diff Pseudomembranous Colitis", slug: "pseudomembranous-colitis", description: "Antibiotic-associated diarrhea showing pseudomembranes on endoscopy." }],
    relatedOrganisms: [],
    relatedComparisons: [
      { name: "Salmonella vs. Shigella vs. Campylobacter", slug: "salmonella-vs-shigella-vs-campylobacter" },
      { name: "EHEC vs. ETEC vs. EIEC vs. EAEC", slug: "ehec-vs-etec-vs-eiec-vs-eaec" }
    ]
  },
  {
    id: "viral-gastroenteritis",
    name: "Viral Gastroenteritis (Stomach Flu)",
    slug: "viral-gastroenteritis",
    metaDescription: "Master viral watery diarrhea (Norovirus, Rotavirus), rapid outbreak settings, and strict fluid rehydration therapy.",
    overview: "Viral Gastroenteritis is a highly contagious acute viral infection of the gastrointestinal tract, presenting with watery, non-inflammatory diarrhea and prominent vomiting.",
    quickFacts: {
      commonPathogens: ["Norovirus (leading cause in all ages)", "Rotavirus (common in unvaccinated infants)"],
      riskFactors: ["Close contact settings (cruise ships, schools, nursing homes, daycare)", "Contaminated food or water", "Lack of hand hygiene"],
      hallmarkSymptoms: ["Profuse, watery, non-bloody diarrhea", "Nausea and projectile vomiting", "Abdominal bloating and mild cramps", "Low-grade fever"],
      diagnosticApproach: ["Clinical diagnosis (standard of care)", "Stool PCR panel (used for outbreak tracking)", "EIA for viral antigens"]
    },
    clinicalPresentation: "Presents hyperacutely with sudden onset of watery diarrhea and vomiting, often occurring in family or institutional clusters. Stools are strictly non-bloody and non-inflammatory, accompanied by diffuse abdominal tenderness without rigidity.",
    causativePathogens: [
      { name: "Norovirus", slug: "norovirus", role: "Non-enveloped, single-stranded RNA calicivirus. Extremely stable in the environment and resistant to standard alcohol hand sanitizers." }
    ],
    diagnosticApproach: "Primarily a clinical diagnosis. In public health or hospital outbreak settings, RT-PCR assays are utilized on stool samples to identify Norovirus or Rotavirus genotypes.",
    treatmentPrinciples: "Management is purely supportive, focusing on oral rehydration therapy with balanced electrolyte solutions. Antiemetics (Ondansetron) are helpful. Antidiarrheal agents (Loperamide) should be avoided.",
    clinicalPearls: [
      "Norovirus is famous for causing explosive outbreaks in closed environments like cruise ships, schools, and military barracks.",
      "Norovirus is highly resistant to alcohol-based hand rubs; mechanical handwashing with soap and water is mandatory to remove spores and viral particles.",
      "Rotavirus vaccine is a live-attenuated oral vaccine given in infancy; it carrying a tiny but testable risk of intussusception."
    ],
    relatedAntibiotics: [],
    differentialDiagnoses: ["Invasive Bacterial Gastroenteritis (bloody stools, high fever, toxic look)", "C. difficile colitis", "Food Poisoning (preformed toxin; symptoms arise in hours)"],
    faqs: [
      { question: "Why is alcohol hand sanitizer ineffective against Norovirus?", answer: "Norovirus is a non-enveloped virus. Non-enveloped viruses lack a lipid bilayer membrane that can be dissolved by alcohol; they rely on a sturdy protein capsid that is highly resistant to alcohol denaturation." }
    ],
    relatedDiseases: [{ name: "C. diff Pseudomembranous Colitis", slug: "pseudomembranous-colitis", description: "Differentiated by endosocopic pseudomembranes and antibiotic history." }],
    relatedOrganisms: []
  },
  {
    id: "giardiasis",
    name: "Giardiasis",
    slug: "giardiasis",
    metaDescription: "Learn Giardia lamblia protozoan hallmarks, foul fatty stools, wilderness water risk, diagnostic cyst/trophozoite, and Metronidazole.",
    overview: "Giardiasis is a diarrheal illness caused by the flagellated protozoan parasite Giardia lamblia, presenting with chronic malabsorptive diarrhea and foul-smelling stools.",
    quickFacts: {
      commonPathogens: ["Giardia lamblia (also known as Giardia duodenalis)"],
      riskFactors: ["Drinking untreated wilderness water (backpackers/hikers)", "Daycare center exposure", "Oral-anal sexual contact"],
      hallmarkSymptoms: ["Foul-smelling, greasy, floating stools (steatorrhea)", "Severe abdominal bloating and flatulence", "Weight loss and chronic fatigue", "Absence of blood or pus in stools"],
      diagnosticApproach: ["Stool antigen EIA (highly sensitive and specific)", "Microscopic stool examination (ova & parasites; shows binucleated trophozoites)", "Stool PCR"]
    },
    clinicalPresentation: "Presents after a 1-2 week incubation with gradual onset of watery, greasy, highly foul-smelling diarrhea. Stools contain excess fat (steatorrhea) and float. Patients complain of severe, uncomfortable abdominal distension, burping (often with a sulfur taste), and flatulence.",
    causativePathogens: [
      { name: "Giardia lamblia", slug: "giardia-lamblia", role: "Flagellated protozoan. Exists in two forms: infectious, hardy environmental cysts, and flagellated, pear-shaped, binucleated trophozoites with a ventral sucking disc." }
    ],
    diagnosticApproach: "Stool enzyme immunoassay (EIA) for Giardia antigens is first-line due to outstanding sensitivity. Traditional microscopic O&P examination demonstrates characteristic pear-shaped trophozoites (resembling a face/owl) or oval cysts.",
    treatmentPrinciples: "First-line therapy is oral Metronidazole (250 mg three times daily for 5-7 days) or a single dose of Tinidazole. Nitazoxanide is an excellent option for pediatric patients.",
    clinicalPearls: [
      "Board Examination Clue: Look for a backpacker or hiker who drank water from a mountain stream and presents with chronic, bloating, foul, greasy diarrhea.",
      "Giardia trophozoites attach to the duodenal and jejunal mucosa via a ventral sucking disc, causing atrophy of microvilli and resulting in malabsorption of fats and fat-soluble vitamins.",
      "Patients with IgA deficiency (e.g., Common Variable Immunodeficiency) are highly prone to chronic, severe, recurrent Giardia infections."
    ],
    relatedAntibiotics: [
      { name: "Metronidazole", slug: "metronidazole", role: "Nitroimidazole; damages DNA of anaerobic parasites. First-line for giardiasis." }
    ],
    differentialDiagnoses: ["Celiac Disease (malabsorptive diarrhea, but autoimmune etiology)", "Lactose Intolerance", "Amebiasis (bloody stools, invasive pathology)"],
    faqs: [
      { question: "How do humans acquire Giardia?", answer: "Transmission occurs via the fecal-oral route through ingestion of hardy, infectious Giardia cysts. These cysts are resistant to standard water chlorination and survive in cold mountain water for months, reactivating into trophozoites in the small intestine." }
    ],
    relatedDiseases: [{ name: "C. diff Pseudomembranous Colitis", slug: "pseudomembranous-colitis", description: "Bacterial diarrhea linked to hospital stays and antibiotics." }],
    relatedOrganisms: [],
    relatedComparisons: [{ name: "Giardia vs. Entamoeba", slug: "giardia-vs-entamoeba" }]
  },
  {
    id: "amebiasis",
    name: "Amebiasis",
    slug: "amebiasis",
    metaDescription: "Master Entamoeba histolytica bloody colitis, flask-shaped ulcers, anchovy-paste liver abscesses, and Metronidazole.",
    overview: "Amebiasis is an invasive parasitic disease caused by the protozoan Entamoeba histolytica, manifesting as severe bloody colitis (amebic dysentery) or extraintestinal abscesses.",
    quickFacts: {
      commonPathogens: ["Entamoeba histolytica"],
      riskFactors: ["Travel to or emigration from tropical, resource-limited regions", "Poor sanitation", "Men who have sex with men (MSM)"],
      hallmarkSymptoms: ["Bloody, mucus-rich diarrhea (dysentery)", "Right upper quadrant pain and fever (if liver abscess occurs)", "Colonic 'flask-shaped' ulcers on biopsy", "Weight loss and abdominal pain"],
      diagnosticApproach: ["Stool antigen assay (EIA; specific for E. histolytica)", "Stool PCR assay", "Microscopic examination (shows trophozoites with ingested red blood cells)", "Serology or liver ultrasound (for hepatic abscess)"]
    },
    clinicalPresentation: "Ranges from mild chronic diarrhea to fulminant dysentery with frequent bloody, mucus-filled stools and severe abdominal cramping. Extraintestinal amebiasis classically presents as a solitary, right-lobe amebic liver abscess, causing right upper quadrant pain, high fever, and leukocytosis.",
    causativePathogens: [
      { name: "Entamoeba histolytica", slug: "entamoeba-histolytica", role: "Pseudopod-forming protozoan parasite. Trophozoites are invasive, feeding on colonic epithelial cells and erythrocytes." }
    ],
    diagnosticApproach: "Stool antigen detection or PCR is preferred over O&P microscopy, as microscopy cannot distinguish E. histolytica from non-pathogenic E. dispar. Biopsy of colonic tissue reveals classic flask-shaped mucosal ulcers.",
    treatmentPrinciples: "For symptomatic colitis or abscesses: Metronidazole (or Tinidazole) to kill active trophozoites, followed immediately by a luminal amebicide (Paromomycin or Iodoquinol) to eradicate remaining cysts.",
    clinicalPearls: [
      "Board Examination Pearl: Trophozoites demonstrating engulfed red blood cells (erythrophagocytosis) on microscopic exam is diagnostic of active, invasive Entamoeba histolytica.",
      "Amebic liver abscess fluid is classically described as having an 'anchovy paste' appearance (chocolate brown, odorless, sterile necrotizing liver tissue).",
      "Do NOT perform surgical drainage of an amebic liver abscess; they respond outstandingly to medical therapy with Metronidazole."
    ],
    relatedAntibiotics: [
      { name: "Metronidazole", slug: "metronidazole", role: "Systemic amebicide targeting invasive tissue trophozoites." }
    ],
    differentialDiagnoses: ["Invasive Bacterial Dysentery (Salmonella, Shigella, EHEC; differentiated by cultures/PCR)", "Inflammatory Bowel Disease (colitis)", "Pyogenic Liver Abscess"],
    faqs: [
      { question: "Why is a dual-drug regimen required for amebiasis?", answer: "Metronidazole is highly effective at eradicating invasive tissue trophozoites in the colonic wall or liver, but is poorly active against infectious cysts in the intestinal lumen. A luminal agent (e.g., Paromomycin) is mandatory to kill these cysts and prevent future transmission or relapse." }
    ],
    relatedDiseases: [{ name: "C. diff Pseudomembranous Colitis", slug: "pseudomembranous-colitis", description: "Non-parasitic hospital-acquired colonic infection." }],
    relatedOrganisms: [],
    relatedComparisons: [{ name: "Giardia vs. Entamoeba", slug: "giardia-vs-entamoeba" }]
  },

  // ==================== CARDIOVASCULAR ====================
  {
    id: "prosthetic-valve-endocarditis",
    name: "Prosthetic Valve Endocarditis (PVE)",
    slug: "prosthetic-valve-endocarditis",
    metaDescription: "Master early vs late prosthetic valve endocarditis (S. epidermidis vs S. aureus), clinical diagnosis, and triple therapy.",
    overview: "Prosthetic Valve Endocarditis is a highly complex, biofilm-mediated endovascular infection occurring on mechanical or bioprosthetic heart valves, carrying high mortality.",
    quickFacts: {
      commonPathogens: ["Staphylococcus epidermidis (primary early cause)", "Staphylococcus aureus (high virulence)", "Viridans Streptococci (late onset)", "HACEK group"],
      riskFactors: ["Recent valve replacement surgery (< 1 year: early; > 1 year: late)", "Indwelling venous lines", "Dental procedures without prophylaxis"],
      hallmarkSymptoms: ["New or changing cardiac murmur", "Persistent unexplained fevers", "Splenomegaly", "Peripheral emboli or immunologic phenomena (Roth spots, Osler nodes)"],
      diagnosticApproach: ["Serial blood cultures (at least 3 sets)", "Transesophageal Echocardiogram (TEE; gold standard for prosthesis evaluation)", "Duke Criteria assessment"]
    },
    clinicalPresentation: "Presents with prolonged, fluctuating fevers, night sweats, fatigue, and weight loss. Clinicians will note a new regurgitant heart murmur, sign of cardiac failure, or peripheral signs like splinter hemorrhages, Osler nodes (painful), or Janeway lesions (painless).",
    causativePathogens: [
      { name: "Staphylococcus epidermidis", slug: "s-epidermidis", role: "Gram-positive, catalase-positive, coagulase-negative coccus. Produces heavy extracellular polysaccharide biofilms (slime) to adhere to prosthetic plastics and metals." }
    ],
    diagnosticApproach: "TEE is mandatory as it is far more sensitive than transthoracic echocardiography (TTE) for detecting valve dehiscence, ring abscesses, and vegetation on prosthetic structures. Diagnosis is established via Modified Duke Criteria.",
    treatmentPrinciples: "Requires prolonged (6-8 weeks) intravenous synergy: Vancomycin (targets staphylococci), Gentamicin (provides aminoglycoside synergy), and Rifampin (uniquely penetrates bacterial biofilms on foreign materials). Surgery is indicated for severe dehiscence or heart block.",
    clinicalPearls: [
      "Board Examination Pearl: Early PVE (<12 months post-surgery) is classically caused by Staphylococcus epidermidis (coagulase-negative, novobiocin-sensitive).",
      "Rifampin is mandatory in staphylococcal PVE because it is uniquely capable of killing slow-growing bacteria embedded inside prosthetic biofilms.",
      "A new conduction block (e.g., first-degree AV block) on ECG in a patient with endocarditis indicates a localized ring abscess spreading into the interventricular septum."
    ],
    relatedAntibiotics: [
      { name: "Vancomycin", slug: "vancomycin", role: "Glycopeptide targeting cell wall peptidoglycan. Empiric drug of choice." },
      { name: "Rifampin", slug: "rifampin", role: "DNA-dependent RNA polymerase inhibitor. Uniquely active against staphylococci within biofilms." }
    ],
    differentialDiagnoses: ["Native Valve Endocarditis (different bacteriology, less surgery needed)", "Culture-Negative Endocarditis", "Left Atrial Myxoma"],
    faqs: [
      { question: "Why is Rifampin delayed in PVE treatment?", answer: "Rifampin is often withheld for the first 2-3 days of therapy until blood cultures are sterilized. Starting rifampin too early can select for rapid high-level mutational resistance in circulating planktonic staphylococci." }
    ],
    relatedDiseases: [{ name: "Bacteremia", slug: "bacteremia", description: "Presence of bacteria in the bloodstream, a key precursor to endovascular seeding." }],
    relatedOrganisms: []
  },
  {
    id: "lyme-carditis",
    name: "Lyme Carditis",
    slug: "lyme-carditis",
    metaDescription: "Understand Lyme disease carditis, Borrelia burgdorferi transmission, fluctuating AV heart block, and Ceftriaxone/Doxycycline guidelines.",
    overview: "Lyme Carditis is a cardiovascular complication of early disseminated Lyme disease, characterized by spirochetal infiltration of cardiac tissue leading to fluctuating atrioventricular (AV) conduction blocks.",
    quickFacts: {
      commonPathogens: ["Borrelia burgdorferi"],
      riskFactors: ["Tick-bite in endemic areas (Northeastern/Upper Midwestern US)", "Outdoor activity during summer months", "Untreated primary erythema migrans rash"],
      hallmarkSymptoms: ["Lightheadedness, syncope, and palpitations", "Fluctuating first, second, or third-degree (complete) AV block", "Shortness of breath or chest pain", "History of migrating joint pain or rash"],
      diagnosticApproach: ["Electrocardiogram (ECG; shows PR interval prolongation or AV block)", "Lyme serology (ELISA followed by Western Blot)", "Echocardiogram"]
    },
    clinicalPresentation: "Presents in a young, active patient from an endemic area with sudden onset of unexplained lightheadedness, chest discomfort, palpitations, or complete syncope. Clinicians will identify bradycardia and varying degrees of heart block on telemetry.",
    causativePathogens: [
      { name: "Borrelia burgdorferi", slug: "b-burgdorferi", role: "Spirochete transmitted by the Ixodes scapularis deer tick. Disseminates hematogenously to target cardiac, neurologic, and joint tissues." }
    ],
    diagnosticApproach: "The cornerstone is an ECG demonstrating PR interval prolongation (first-degree block) or higher-grade AV blocks. Serologic testing follows the CDC two-tier algorithm: initial sensitive ELISA screening, followed by highly specific IgM/IgG Western Blot confirmation.",
    treatmentPrinciples: "Mild cases (PR interval < 300 ms, no higher block) are treated with oral Doxycycline. Severe cases (PR interval >= 300 ms, second/third-degree block, or symptoms) require admission for IV Ceftriaxone and temporary cardiac pacing.",
    clinicalPearls: [
      "Lyme carditis conduction blocks are highly fluctuating and reversible; complete heart block typically resolves completely with antibiotics, avoiding permanent pacemaker placement.",
      "The classic tick vector Ixodes scapularis also transmits Anaplasma phagocytophilum and Babesia microti (co-infections are common).",
      "Lyme disease is caused by Borrelia burgdorferi, which can be visualized using darkfield microscopy or silver stains (Warthin-Starry), not standard Gram stain."
    ],
    relatedAntibiotics: [
      { name: "Ceftriaxone", slug: "ceftriaxone", role: "IV beta-lactam; drug of choice for severe Lyme carditis or neurologic Lyme disease." }
    ],
    differentialDiagnoses: ["Acute Myocarditis (viral)", "Rheumatic Fever (presents with PR prolongation but also carditis/arthritis)", "Age-related degenerative AV block"],
    faqs: [
      { question: "Is a permanent pacemaker required for Lyme complete heart block?", answer: "No. Unlike degenerative complete heart block, Lyme-induced complete AV block is temporary and highly responsive to antibiotic therapy. A temporary external or transvenous pacemaker is used for safety, but permanent pacing is almost never required as conduction normalizes within days to weeks." }
    ],
    relatedDiseases: [{ name: "Infective Endocarditis", slug: "infective-endocarditis", description: "Bacterial infection of the endocardium presenting with cardiac murmurs and valvular destruction." }],
    relatedOrganisms: []
  },

  // ==================== SKIN & SOFT TISSUE ====================
  {
    id: "impetigo",
    name: "Impetigo",
    slug: "impetigo",
    metaDescription: "Learn superficial impetigo (S. aureus, S. pyogenes), classic honey-colored crusts, and topical Mupirocin vs Cephalexin therapy.",
    overview: "Impetigo is a highly contagious, superficial bacterial skin infection primarily affecting children, characterized by vesicular lesions that rupture to form honey-colored crusts.",
    quickFacts: {
      commonPathogens: ["Staphylococcus aureus (most common overall)", "Streptococcus pyogenes (Group A Strep)"],
      riskFactors: ["Young age (2-5 years)", "Warm, humid climates", "Poor hygiene or crowded conditions", "Minor skin trauma (scratches, insect bites)"],
      hallmarkSymptoms: ["Pruritic red macules progressing to vesicles/pustules", "Characteristic 'honey-colored' crusted lesions around nose/mouth", "Erythematous erosions", "Painless lesions with minimal systemic symptoms"],
      diagnosticApproach: ["Clinical diagnosis (standard)", "Bacterial culture of lesion fluid (reserved for treatment failure or MRSA suspicion)"]
    },
    clinicalPresentation: "Classically manifests as a cluster of small red spots, typically around the mouth, nose, or limbs, which quickly develop into fragile pustules. These rupture and leak amber fluid, drying into highly characteristic, thick, honey-colored crusts. Bullous impetigo shows larger, flaccid, fluid-filled blisters (bullae).",
    causativePathogens: [
      { name: "Staphylococcus aureus", slug: "s-aureus", role: "Gram-positive, catalase/coagulase-positive coccus. Produces exfoliative toxins (A and B) that cleave desmoglein 1, causing superficial epidermal splitting in bullous impetigo." }
    ],
    diagnosticApproach: "Diagnosis is made purely on clinical appearance. Cultures of the pus or fluid are only indicated if MRSA is suspected or if the infection fails to respond to standard empirical topical therapy.",
    treatmentPrinciples: "For localized non-bullous impetigo, topical Mupirocin ointment (applied three times daily for 5 days) is standard. For widespread lesions or bullous impetigo, oral antibiotics such as Cephalexin or Dicloxacillin are indicated.",
    clinicalPearls: [
      "Board Examination Pearl: Look for a 4-year-old child presenting with crusted, 'honey-colored' lesions around the nares to diagnose non-bullous impetigo.",
      "Streptococcus pyogenes impetigo can lead to acute post-streptococcal glomerulonephritis (APSGN) but, unlike pharyngitis, treating it does NOT prevent this renal complication.",
      "Impetigo does NOT cause acute rheumatic fever; only streptococcal pharyngitis carries that risk."
    ],
    relatedAntibiotics: [
      { name: "Mupirocin", slug: "mupirocin", role: "Topical agent; reversibly binds to bacterial isoleucyl-tRNA synthetase, stopping protein synthesis." }
    ],
    differentialDiagnoses: ["Herpes Simplex Virus infection (grouped vesicles on an erythematous base, painful)", "Atopic Dermatitis", "Contact Dermatitis"],
    faqs: [
      { question: "What is the difference between non-bullous and bullous impetigo?", answer: "Non-bullous impetigo (caused by S. aureus or S. pyogenes) presents with small vesicles that quickly rupture and form classic honey-colored crusts. Bullous impetigo (caused exclusively by exfoliative toxin-producing S. aureus) presents with larger, flaccid, clear-to-yellow blisters (bullae) that persist longer due to toxin-mediated cleavage of cell-to-cell adhesion proteins in the superficial epidermis." }
    ],
    relatedDiseases: [{ name: "Cellulitis", slug: "cellulitis-and-skin-infections", description: "Deeper dermis infection presenting with ill-defined erythema, warmth, and swelling." }],
    relatedOrganisms: [],
    relatedComparisons: [{ name: "S. aureus vs. S. pyogenes", slug: "staph-aureus-vs-strep-pyogenes" }]
  },
  {
    id: "erysipelas",
    name: "Erysipelas",
    slug: "erysipelas",
    metaDescription: "Differentiate erysipelas vs cellulitis (well-demarcated raised borders, superficial dermis), S. pyogenes cause, and Penicillin treatment.",
    overview: "Erysipelas is a superficial skin infection involving the upper dermis and superficial lymphatics, classically characterized by sharp, raised, well-demarcated borders and caused by Streptococcus pyogenes.",
    quickFacts: {
      commonPathogens: ["Streptococcus pyogenes (Group A Strep)"],
      riskFactors: ["Impaired lymphatic drainage (lymphedema, prior saphenous vein harvest)", "Venous insufficiency", "Skin breaks (tinea pedis, ulcers)"],
      hallmarkSymptoms: ["Abrupt onset of bright red, painful skin rash", "Sharply demarcated, raised, indurated borders", "Classically affects lower extremities or face ('butterfly' distribution)", "Rapidly progressive systemic symptoms (high fever, chills)"],
      diagnosticApproach: ["Clinical diagnosis (standard)", "Blood cultures (indicated if systemic toxicity or high fever is present)"]
    },
    clinicalPresentation: "Presents abruptly with high fever, chills, and systemic toxicity, immediately followed by the appearance of a bright red, warm, painful, and swollen skin plaque. The key diagnostic hallmark is a raised, sharply demarcated border that clearly separates infected tissue from normal skin.",
    causativePathogens: [
      { name: "Streptococcus pyogenes", slug: "s-pyogenes", role: "Gram-positive, beta-hemolytic, bacitracin-sensitive coccus. Secretes pyrogenic exotoxins and streptolysins that facilitate rapid tissue spread." }
    ],
    diagnosticApproach: "Diagnosis is entirely clinical. Swab cultures are generally low-yield because the infection is localized deep in the upper dermis; blood cultures are positive in less than 5% of cases.",
    treatmentPrinciples: "For uncomplicated, non-toxic cases, oral Penicillin V or Amoxicillin is highly effective. For severe cases with systemic toxicity, IV Penicillin G or Ceftriaxone is indicated.",
    clinicalPearls: [
      "Board Examination Distinction: Erysipelas is distinguished from Cellulitis by its rapid onset, prominent high fevers, superficial location (upper dermis vs. deep dermis/subcutis), and sharply demarcated, raised edges.",
      "The classic facial distribution of erysipelas was historically common, but the lower extremities are now the most frequent site of infection.",
      "Milian's ear sign: Erysipelas can involve the pinna of the ear (which lacks subcutaneous tissue, ruling out cellulitis)."
    ],
    relatedAntibiotics: [
      { name: "Ceftriaxone", slug: "ceftriaxone", role: "Broad-spectrum cephalosporin; used for severe cases of erysipelas." }
    ],
    differentialDiagnoses: ["Cellulitis (ill-defined borders, deeper, slower onset)", "Contact Dermatitis", "Systemic Lupus Erythematosus (butterfly rash; lacks fever, warmth, and induration)"],
    faqs: [
      { question: "Why is Penicillin the drug of choice for erysipelas?", answer: "Erysipelas is almost exclusively caused by Streptococcus pyogenes (Group A Strep). Unlike Staphylococcus aureus, S. pyogenes remains 100% susceptible to Penicillin, making narrow-spectrum beta-lactam therapy highly successful and preventing unnecessary broad-spectrum antibiotic exposure." }
    ],
    relatedDiseases: [{ name: "Cellulitis", slug: "cellulitis-and-skin-infections", description: "Deeper soft tissue infection with diffuse, non-raised borders." }],
    relatedOrganisms: [{ name: "Streptococcus pyogenes", slug: "s-pyogenes" }],
    relatedComparisons: [{ name: "Cellulitis vs. Erysipelas", slug: "cellulitis-vs-erysipelas" }]
  },
  {
    id: "herpes-zoster",
    name: "Herpes Zoster (Shingles)",
    slug: "herpes-zoster",
    metaDescription: "Master Herpes Zoster (shingles) dermatomal reactivation, varicella latency, vesicular presentation, and antiviral guidelines.",
    overview: "Herpes Zoster is a painful, localized skin eruption caused by reactivation of latent Varicella-Zoster Virus (VZV) within sensory dorsal root ganglia.",
    quickFacts: {
      commonPathogens: ["Varicella-Zoster Virus (VZV)"],
      riskFactors: ["Advanced age (>50)", "Cell-mediated immunosuppression (HIV, transplant, malignancy)", "Stress"],
      hallmarkSymptoms: ["Unilateral dermatomal pain, burning, or paresthesia", "Grouped fluid-filled vesicles on an erythematous base", "Does not cross the midline", "Postherpetic neuralgia (PHN) as a chronic complication"],
      diagnosticApproach: ["Clinical diagnosis (standard)", "VZV PCR of vesicle fluid (highly sensitive; used for atypical presentations)", "Direct fluorescent antibody (DFA) testing"]
    },
    clinicalPresentation: "Begins with a prodrome of localized burning, tingling, or lancinating pain within a single dermatome (thoracic is most common). Within 3-5 days, a crop of painful, grouped fluid-filled vesicles erupts on an erythematous base in a unilateral band-like distribution.",
    causativePathogens: [
      { name: "Varicella-Zoster Virus", slug: "vzv", role: "Enveloped, double-stranded DNA herpesvirus (HHV-3). Establishes lifelong latency in cranial or dorsal root sensory ganglia following primary varicella (chickenpox)." }
    ],
    diagnosticApproach: "Diagnosed on clinical inspection. PCR of vesicle roof or fluid provides rapid, definitive molecular confirmation in atypical cases. Historic Tzanck smear showing multinucleated giant cells is sensitive but non-specific.",
    treatmentPrinciples: "Oral antivirals (Valacyclovir 1000 mg or Acyclovir) must be initiated within 72 hours of rash onset to accelerate healing and reduce the risk of debilitating Postherpetic Neuralgia.",
    clinicalPearls: [
      "Board Examination Pearl: Look for a unilateral, grouped vesicular rash in a single dermatome that strictly terminates at the midline.",
      "Herpes Zoster Ophthalmicus (involving CN V1) shows vesicles on the tip of the nose (Hutchinson sign), indicating high risk of corneal ulceration; require immediate ophthalmology consult.",
      "Postherpetic neuralgia is defined as neuropathic pain persisting for >90 days after the resolution of shingles skin lesions; treated with Gabapentin or Amitriptyline."
    ],
    relatedAntibiotics: [
      { name: "Acyclovir", slug: "acyclovir", role: "Nucleoside analog; requires viral thymidine kinase for phosphorylation. Inhibits viral replication." }
    ],
    differentialDiagnoses: ["Herpes Simplex Virus (recurrent, typically localized to genital/oral areas, lacks wide band-like dermatomal distribution)", "Contact Dermatitis", "Poison Ivy"],
    faqs: [
      { question: "What is Postherpetic Neuralgia (PHN) and how is it prevented?", answer: "PHN is a chronic neuropathic pain syndrome resulting from VZV-induced nerve fiber damage during reactivation. It is prevented or reduced by starting oral antivirals (Valacyclovir) within 72 hours of rash onset, and by vaccinating adults >= 50 years of age with the recombinant subunit shingles vaccine (Shingrix)." }
    ],
    relatedDiseases: [{ name: "Cellulitis", slug: "cellulitis-and-skin-infections", description: "Bacterial dermis infection lacking vesicular clusters or strict dermatomal boundaries." }],
    relatedOrganisms: []
  },
  {
    id: "dermatophytosis",
    name: "Dermatophytosis (Tinea/Ringworm)",
    slug: "dermatophytosis",
    metaDescription: "Learn superficial fungal tinea infections, KOH prep showing branching septate hyphae, and topical vs oral Terbinafine.",
    overview: "Dermatophytosis is a superficial fungal infection of keratinized tissues (skin, hair, nails) caused by specialized fungi known as dermatophytes.",
    quickFacts: {
      commonPathogens: ["Trichophyton rubrum (most common cause)", "Microsporum canis", "Epidermophyton floccosum"],
      riskFactors: ["Warm, humid environments", "Excessive sweating (hyperhidrosis)", "Occlusive footwear", "Sharing gym locker rooms or towels"],
      hallmarkSymptoms: ["Anular (ring-like) scaling plaques", "Active, raised erythematous borders with central clearing (tinea corporis)", "Intense pruritus (itching)", "Nail thickening and yellowing (tinea unguium/onychomycosis)"],
      diagnosticApproach: ["KOH wet mount of skin scrapings (reveals branching, septate hyphae)", "Fungal culture on Sabouraud agar", "Wood's lamp examination (yellow-green fluorescence for Microsporum)"]
    },
    clinicalPresentation: "Classically manifests as a circular, expanding red patch with a scaly, raised active border and central clearing (the classic 'ringworm' appearance of tinea corporis). Tinea pedis (athlete's foot) shows scaling, maceration, and cracking in the interdigital toe webs.",
    causativePathogens: [
      { name: "Trichophyton rubrum", slug: "trichophyton-spp", role: "Filamentous dermatophytic fungus that digests keratin using specialized keratinases. Invades only dead keratinized layers." }
    ],
    diagnosticApproach: "Confirmed by scraping the scaling border of a lesion, dissolving keratin with 10-20% KOH, and viewing under microscopy to identify distinct, translucent, branching septate hyphae.",
    treatmentPrinciples: "Localized skin infections respond outstandingly to topical antifungals (Clotrimazole, Terbinafine) for 2-4 weeks. Tinea capitis (scalp) and onychomycosis (nails) strictly require systemic oral Terbinafine.",
    clinicalPearls: [
      "Board Examination Clue: A circular scaly rash with central clearing, showing branching, septate hyphae on KOH prep, is Dermatophytosis (Tinea).",
      "Oral Terbinafine is associated with hepatotoxicity; always check baseline liver function tests (LFTs) before initiating therapy.",
      "Tinea versicolor is NOT a dermatophytosis; it is caused by the yeast Malassezia furfur and shows a 'spaghetti and meatballs' appearance on KOH."
    ],
    relatedAntibiotics: [
      { name: "Terbinafine", slug: "terbinafine", role: "Allylamine antifungal; inhibits squalene epoxidase, leading to toxic squalene accumulation and block of ergosterol synthesis." }
    ],
    differentialDiagnoses: ["Psoriasis (silvery scale, extensor surfaces, lacks central clearing)", "Nummular Eczema (coin-shaped, completely filled with scaling, negative KOH)", "Pityriasis Rosea (herald patch, Christmas-tree pattern)"],
    faqs: [
      { question: "Why do tinea capitis and onychomycosis require oral rather than topical therapy?", answer: "In these conditions, the dermatophytes reside deep within protected keratin structures (the hair shaft and nail bed) where topical creams cannot penetrate. Oral antifungals (Terbinafine) are absorbed systemically and incorporated directly into the newly growing hair and nail matrix, eradicating the infection from within." }
    ],
    relatedDiseases: [{ name: "Cellulitis", slug: "cellulitis-and-skin-infections", description: "Bacterial infection of the dermis, presenting with deeper warmth and swelling, without scaling." }],
    relatedOrganisms: []
  },

  // ==================== BONE & JOINT ====================
  {
    id: "prosthetic-joint-infection",
    name: "Prosthetic Joint Infection (PJI)",
    slug: "prosthetic-joint-infection",
    metaDescription: "Master biofilm-mediated prosthetic joint infections (S. epidermidis, S. aureus), joint aspiration guidelines, and Vancomycin-Rifampin synergy.",
    overview: "Prosthetic Joint Infection is a severe, biofilm-mediated infection of an artificial joint prosthesis, presenting as acute or chronic articular dysfunction and requiring surgical intervention.",
    quickFacts: {
      commonPathogens: ["Staphylococcus epidermidis (chronic/delayed)", "Staphylococcus aureus (acute hematogenous)", "Pseudomonas aeruginosa", "Cutibacterium acnes (shoulder arthroplasty)"],
      riskFactors: ["Recent joint arthroplasty surgery", "Prior surgical site infection", "Rheumatoid arthritis", "Bacteremia"],
      hallmarkSymptoms: ["Persistent joint pain and stiffness", "Local swelling, warmth, and erythema", "Sinus tract communicating with the prosthesis (diagnostic)", "Loosening of the implant on X-ray"],
      diagnosticApproach: ["Arthrocentesis (joint aspiration) with cell count, differential, and culture", "Serum ESR and CRP (highly sensitive screening markers)", "Intraoperative periprosthetic tissue biopsies (at least 3-5 specimens)"]
    },
    clinicalPresentation: "Presents acutely (within 3 weeks of surgery) with severe joint pain, high fever, and purulent drainage, or chronically (months to years later) with progressive, dull joint pain, mechanical loosening, joint instability, and absence of systemic signs.",
    causativePathogens: [
      { name: "Staphylococcus epidermidis", slug: "s-epidermidis", role: "Slime-producing, coagulase-negative staphylococcus. Adheres to metal/plastic prostheses via MSCRAMM proteins, forming a protective polysaccharide biofilm." }
    ],
    diagnosticApproach: "Synovial fluid aspiration is critical, showing elevated leukocyte count (>3,000 cells/µL with >80% polymorphonuclears in chronic cases). A sinus tract communicating directly with the prosthesis is pathognomonic.",
    treatmentPrinciples: "Requires surgical debridement (either debridement and implant retention [DAIR] or two-stage revision) paired with 6 weeks of pathogen-specific IV antibiotics. Rifampin must be added for all staphylococcal PJIs.",
    clinicalPearls: [
      "Staphylococcus epidermidis biofilms protect bacteria from host phagocytes and raise the minimum inhibitory concentration (MIC) of standard antibiotics by up to 1000-fold.",
      "Rifampin is highly active against slow-growing biofilm-embedded staphylococci and must always be used in combination to prevent rapid mutational resistance.",
      "Plain radiographs may demonstrate periprosthetic lucency (>2 mm), indicating mechanical loosening and bone resorption."
    ],
    relatedAntibiotics: [
      { name: "Vancomycin", slug: "vancomycin", role: "First-line empiric glycopeptide; provides excellent cover for MRSA and MRSE." },
      { name: "Rifampin", slug: "rifampin", role: "Biofilm-active adjunctive agent; always paired with a companion drug." }
    ],
    differentialDiagnoses: ["Aseptic Mechanical Loosening (pain with weight-bearing, normal inflammatory markers, negative cultures)", "Gout or Pseudogout", "Hemarthrosis"],
    faqs: [
      { question: "What is the role of Rifampin in prosthetic joint infections?", answer: "Rifampin is unique in its ability to penetrate the dense polysaccharide biofilm matrix that covers infected orthopedic metal and plastic. It kills sessile, stationary-phase staphylococci within the biofilm, preventing recurrence. It must never be used alone, as staphylococci rapidly acquire resistance via rpoB gene mutations." }
    ],
    relatedDiseases: [
      { name: "Osteomyelitis", slug: "osteomyelitis", description: "Infection of the bone tissue itself, which can co-exist with prosthetic hardware infections." },
      { name: "Septic Arthritis", slug: "septic-arthritis", description: "Acute bacterial infection of a native joint, presenting with hyperacute fever and high synovial WBC counts." }
    ],
    relatedOrganisms: []
  },

  // ==================== OPHTHALMOLOGY ====================
  {
    id: "bacterial-conjunctivitis",
    name: "Bacterial Conjunctivitis",
    slug: "bacterial-conjunctivitis",
    metaDescription: "Master acute bacterial conjunctivitis hallmarks, purulent yellow-white discharge, major bacterial pathogens, and topical antibiotic therapy.",
    overview: "Bacterial Conjunctivitis is an acute, self-limiting bacterial infection of the conjunctiva, characterized by prominent purulent discharge and conjunctival injection.",
    quickFacts: {
      commonPathogens: ["Staphylococcus aureus (adults)", "Streptococcus pneumoniae (children)", "Haemophilus influenzae (children)", "Neisseria gonorrhoeae (hyperacute, neonatal)"],
      riskFactors: ["Contact lens wearers (Pseudomonas risk)", "Dry eye syndrome", "Exposure to infected individuals"],
      hallmarkSymptoms: ["Thick, purulent, yellow-green discharge", "Eyelids 'stuck shut' in the morning", "Conjunctival redness (injection)", "Foreign body sensation with no corneal involvement"],
      diagnosticApproach: ["Clinical diagnosis based on unilateral or bilateral purulent discharge", "Conjunctival swab culture (reserved for contact lens wearers, severe cases, or neonates)"]
    },
    clinicalPresentation: "Presents acutely with unilateral or bilateral eye redness, foreign body sensation, and constant thick, yellow-white, purulent discharge. The patient classically complains that their eyelids were completely glued or stuck shut upon awakening.",
    causativePathogens: [
      { name: "Streptococcus pneumoniae", slug: "s-pneumoniae", role: "Gram-positive diplococcus. A major cause of acute bacterial conjunctivitis in children, often co-existing with otitis media." }
    ],
    diagnosticApproach: "Diagnosed on clinical examination. Cultures and Gram stains of conjunctival scrapings are reserved for hyperacute cases (suspected Gonorrhea), contact lens wearers (must rule out Pseudomonas), or neonatal cases.",
    treatmentPrinciples: "Empirical treatment consists of topical antibiotic drops: Erythromycin ointment or Polymyxin B-Trimethoprim drops. For contact lens wearers, topical Fluoroquinolones (Ofloxacin or Ciprofloxacin) must be used.",
    clinicalPearls: [
      "Board Examination Warning: A contact lens wearer with a red, painful eye and purulent discharge must be treated with a topical Fluoroquinolone to cover Pseudomonas aeruginosa.",
      "Hyperacute bacterial conjunctivitis (onset < 24 hours, copious purulent discharge) is caused by Neisseria gonorrhoeae and is an ophthalmic emergency due to risk of corneal perforation; treated with IM Ceftriaxone and topical saline washes.",
      "Bacterial conjunctivitis is highly contagious; emphasize frequent handwashing and avoiding sharing towels."
    ],
    relatedAntibiotics: [
      { name: "Ofloxacin", slug: "ofloxacin", role: "Topical fluoroquinolone; provides excellent anti-pseudomonal coverage for contact lens wearers." }
    ],
    differentialDiagnoses: ["Viral Conjunctivitis (watery discharge, follicular conjunctiva)", "Allergic Conjunctivitis (intense bilateral itching, ropey discharge)", "Acute Angle-Closure Glaucoma (severe pain, fixed mid-dilated pupil, cloudy cornea)"],
    faqs: [
      { question: "Why do contact lens wearers require different empirical antibiotic drops?", answer: "Contact lens wearers are uniquely predisposed to severe corneal infections caused by Pseudomonas aeruginosa, an aggressive Gram-negative pathogen capable of rapidly destroying the cornea. Standard drops like Erythromycin do not cover Pseudomonas; therefore, anti-pseudomonal fluoroquinolones (Ofloxacin) are mandatory." }
    ],
    relatedDiseases: [{ name: "Viral Conjunctivitis", slug: "viral-conjunctivitis", description: "Viral ocular surface infection presenting with watery discharge." }],
    relatedOrganisms: [{ name: "Streptococcus pneumoniae", slug: "s-pneumoniae" }]
  },
  {
    id: "viral-conjunctivitis",
    name: "Viral Conjunctivitis",
    slug: "viral-conjunctivitis",
    metaDescription: "Master Adenovirus viral conjunctivitis (pink eye), watery discharge, conjunctival follicles, and supportive care principles.",
    overview: "Viral Conjunctivitis is a highly contagious superficial infection of the conjunctiva, most commonly caused by adenoviruses, presenting as a watery red eye with lymphoid follicles.",
    quickFacts: {
      commonPathogens: ["Adenovirus (classic agent of 'pink eye')"],
      riskFactors: ["Close contact with infected individuals (schools, clinics)", "Recent upper respiratory tract infection"],
      hallmarkSymptoms: ["Profuse, watery, serous discharge", "Bilateral involvement (starts in one eye, spreads to the other)", "Preauricular lymphadenopathy (tender node)", "Follicular conjunctival reaction"],
      diagnosticApproach: ["Clinical diagnosis based on watery discharge and preauricular nodes", "Rapid Adenoplus antigen test"]
    },
    clinicalPresentation: "Presents with acute onset of burning, redness, and watery discharge, typically beginning in one eye and spreading to the other within 24-48 hours. Patients often have a concurrent or recent cold, sore throat, or fever.",
    causativePathogens: [
      { name: "Adenovirus", slug: "adenovirus", role: "Non-enveloped, double-stranded linear DNA virus. Spreads rapidly via direct contact and fomites; highly stable in the environment." }
    ],
    diagnosticApproach: "Primarily clinical. Palpating a tender preauricular lymph node in a patient with a watery, follicular red eye is highly specific. Conjunctival swab antigen testing (Adenoplus) can confirm the diagnosis in unclear cases.",
    treatmentPrinciples: "Treatment is strictly supportive, consisting of cold compresses, artificial tears, and topical antihistamines for itching. Antibiotic drops are completely ineffective and should be avoided.",
    clinicalPearls: [
      "Board Examination Clue: A patient presenting with watery red eyes, a recent sore throat, and a palpable, tender preauricular lymph node has Adenoviral Conjunctivitis.",
      "Pharyngoconjunctival fever is a classic adenoviral syndrome consisting of high fever, pharyngitis, and bilateral follicular conjunctivitis.",
      "Epidemic keratoconjunctivitis (EKC; caused by Adenovirus serotypes 8, 19, 37) is a severe form that causes corneal infiltrates, leading to photophobia and temporary vision loss."
    ],
    relatedAntibiotics: [],
    differentialDiagnoses: ["Bacterial Conjunctivitis (thick purulent discharge, eyelids glued)", "Allergic Conjunctivitis (bilateral, intense itching, history of allergies)", "Herpes Keratitis"],
    faqs: [
      { question: "Why is viral conjunctivitis so contagious, and how is it managed?", answer: "Adenovirus is a non-enveloped virus that is exceptionally stable on dry surfaces and resistant to many standard disinfectants. It spreads easily via fingers and towels. Management relies on strict hand hygiene, disinfecting clinical equipment, and keeping infected children home from school until eye discharge ceases." }
    ],
    relatedDiseases: [{ name: "Bacterial Conjunctivitis", slug: "bacterial-conjunctivitis", description: "Bacterial ocular infection featuring thick, purulent discharge." }],
    relatedOrganisms: []
  },
  {
    id: "herpes-keratitis",
    name: "Herpes Keratitis",
    slug: "herpes-keratitis",
    metaDescription: "Understand HSV-1 corneal keratitis, classic dendritic ulcers, topical Trifluridine/Ganciclovir, and corticosteroid contraindications.",
    overview: "Herpes Keratitis is a serious corneal infection caused by Herpes Simplex Virus 1 (HSV-1), classically manifesting as branching dendritic ulcers on the corneal epithelium.",
    quickFacts: {
      commonPathogens: ["Herpes Simplex Virus 1 (HSV-1)"],
      riskFactors: ["Prior history of oral herpes (cold sores)", "Stress, UV light exposure, or immunosuppression", "Topical corticosteroid use"],
      hallmarkSymptoms: ["Unilateral eye pain, redness, and photophobia", "Foreign body sensation and watery tearing", "Classic branching dendritic corneal ulcer", "Decreased corneal sensation"],
      diagnosticApproach: ["Slit-lamp examination with fluorescein staining (demonstrates classic branching dendritic ulcer with terminal bulbs)", "Viral culture or PCR of corneal scrapings"]
    },
    clinicalPresentation: "Presents with acute onset of unilateral eye pain, tearing, redness, and severe light sensitivity (photophobia). The patient feels a constant foreign body sensation. Examination reveals corneal injection and decreased corneal sensation in the affected eye.",
    causativePathogens: [
      { name: "Herpes Simplex Virus 1", slug: "hsv-1", role: "Double-stranded DNA virus. Establishes latency in the ophthalmic division of the trigeminal ganglion (CN V1) and reactivates to infect the cornea." }
    ],
    diagnosticApproach: "Fluorescein staining viewed under a cobalt blue light slit-lamp is diagnostic, revealing a highly characteristic, branching, linear epithelial ulcer with distinct terminal bulbs.",
    treatmentPrinciples: "Treated with topical antivirals (Ganciclovir gel or Trifluridine drops) or oral Acyclovir/Valacyclovir. Corticosteroid drops are strictly contraindicated in active epithelial disease as they cause geographic ulcers.",
    clinicalPearls: [
      "Board Examination Warning: Never prescribe corticosteroid eye drops for an undiagnosed red eye; if the patient has Herpes Keratitis, corticosteroids will trigger rapid replication, leading to massive geographic ulcers and permanent blindness.",
      "Recurrent episodes can lead to stromal keratitis (immune-mediated), resulting in corneal scarring and requiring corneal transplantation.",
      "A classic sign is reduced corneal sensitivity (hypesthesia) because the virus destroys sensory nerve endings in the corneal epithelium."
    ],
    relatedAntibiotics: [
      { name: "Acyclovir", slug: "acyclovir", role: "Systemic antiviral; often used orally as an alternative to topical drops for ease of compliance." }
    ],
    differentialDiagnoses: ["Acanthamoeba Keratitis (ring-shaped infiltrate in contact lens wearers)", "Bacterial Corneal Ulcer (dense white stromal infiltrate)", "Herpes Zoster Ophthalmicus (pseudodendrites with no terminal bulbs)"],
    faqs: [
      { question: "Why are corticosteroids dangerous in epithelial herpes keratitis?", answer: "Active epithelial herpes keratitis is caused by active viral replication in corneal cells. Corticosteroids suppress the local immune response, allowing the virus to replicate uncontrollably and spread laterally, turning a thin dendritic ulcer into a massive, blinding geographic ulcer." }
    ],
    relatedDiseases: [{ name: "Viral Conjunctivitis", slug: "viral-conjunctivitis", description: "Superficial viral conjunctival infection without corneal ulceration." }],
    relatedOrganisms: []
  },
  {
    id: "endophthalmitis",
    name: "Endophthalmitis",
    slug: "endophthalmitis",
    metaDescription: "Master acute endophthalmitis post-cataract surgery, severe eye pain, hypopyon, and urgent intravitreal antibiotic therapy.",
    overview: "Endophthalmitis is a devastating, sight-threatening bacterial or fungal infection of the internal vitreous and aqueous humors of the eye, typically occurring after ocular surgery.",
    quickFacts: {
      commonPathogens: ["Staphylococcus epidermidis (most common post-cataract)", "Staphylococcus aureus (high virulence)", "Pseudomonas aeruginosa", "Bacillus cereus (post-traumatic)"],
      riskFactors: ["Recent intraocular surgery (especially cataract extraction)", "Penetrating ocular trauma", "Severe systemic bacteremia (endogenous endophthalmitis)"],
      hallmarkSymptoms: ["Severe, progressive ocular pain", "Rapidly deteriorating visual acuity (loss of vision)", "Marked conjunctival injection and chemosis", "Hypopyon (layer of pus in the anterior chamber)"],
      diagnosticApproach: ["Slit-lamp examination (reveals vitreous haze and hypopyon)", "Vitreous tap (aspiration of vitreous humor) for Gram stain and culture"]
    },
    clinicalPresentation: "Presents abruptly (usually 1-7 days after eye surgery) with severe, deep throbbing eye pain, dramatic loss of vision, swollen eyelids, and red conjunctiva. The hallmark sign is a hypopyon (a visible layer of white blood cells settled at the bottom of the anterior chamber).",
    causativePathogens: [
      { name: "Staphylococcus epidermidis", slug: "s-epidermidis", role: "Gram-positive, coagulase-negative coccus. Represents the leading post-operative cause, introduced from the patient's normal eyelid flora." }
    ],
    diagnosticApproach: "Ophthalmic slit-lamp examination confirms vitreous inflammation and cellular debris. An urgent vitreous tap (needle aspiration of fluid from the vitreous cavity) is performed by an ophthalmologist to obtain samples for Gram stain and cultures.",
    treatmentPrinciples: "This is a major medical emergency. Immediate treatment consists of intravitreal injection of broad-spectrum antibiotics (typically Vancomycin for Gram-positives and Ceftazidime for Gram-negatives). Pars plana vitrectomy is indicated for light-perception-only vision.",
    clinicalPearls: [
      "Board Examination Clue: A patient presenting with severe eye pain, vision loss, and a hypopyon 5 days after undergoing cataract surgery has acute Endophthalmitis.",
      "Post-traumatic endophthalmitis (following soil or organic matter exposure) is classically caused by Bacillus cereus, an aggressive toxin-producing rod that can destroy the eye within 24 hours.",
      "Endogenous endophthalmitis occurs when systemic pathogens (e.g., Candida albicans from candidemia) spread hematogenously to seed the retina and vitreous."
    ],
    relatedAntibiotics: [
      { name: "Vancomycin", slug: "vancomycin", role: "Glycopeptide injected directly into the vitreous (intravitreal) to bypass the blood-ocular barrier." }
    ],
    differentialDiagnoses: ["Severe Anterior Uveitis (sterile inflammation, no history of surgery)", "Acute Angle-Closure Glaucoma", "Orbital Cellulitis (presents with proptosis and restricted eye movements)"],
    faqs: [
      { question: "Why can't intravenous antibiotics be used as sole therapy for endophthalmitis?", answer: "The eye is protected by the blood-ocular barrier (similar to the blood-brain barrier), which prevents systemic antibiotics (oral or IV) from achieving therapeutic concentrations inside the vitreous cavity. Direct injection of antibiotics into the vitreous (intravitreal injection) is mandatory to achieve immediate bactericidal levels." }
    ],
    relatedDiseases: [
      { name: "Bacteremia", slug: "bacteremia", description: "Bloodstream infection which can seed the eye, causing endogenous endophthalmitis." },
      { name: "Candidemia", slug: "candidemia", description: "Systemic fungal infection requiring retinal screening due to risk of endogenous fungal endophthalmitis." }
    ],
    relatedOrganisms: []
  },

  // ==================== OBSTETRIC & NEONATAL ====================
  {
    id: "neonatal-sepsis",
    name: "Neonatal Sepsis",
    slug: "neonatal-sepsis",
    metaDescription: "Master early-onset neonatal sepsis (GBS, E. coli), clinical indicators (hypothermia, lethargy), and empiric Ampicillin-Gentamicin therapy.",
    overview: "Neonatal Sepsis is a systemic bacterial infection occurring in infants within the first 28 days of life, classified into early-onset (acquired vertically from maternal birth canal) and late-onset.",
    quickFacts: {
      commonPathogens: ["Streptococcus agalactiae (Group B Strep; primary early cause)", "Escherichia coli (high mortality, especially in preterms)", "Listeria monocytogenes (early-onset)", "Coagulase-negative Staphylococci (late-onset nosocomial)"],
      riskFactors: ["Maternal GBS colonization", "Prolonged rupture of membranes (PROM > 18 hours)", "Maternal chorioamnionitis or intrapartum fever", "Prematurity"],
      hallmarkSymptoms: ["Temperature instability (classically hypothermia < 36C)", "Lethargy and poor feeding", "Tachypnea, grunting, and nasal flaring", "Hypotension and poor perfusion"],
      diagnosticApproach: ["Complete septic workup: Blood cultures, Lumbar puncture (mandatory), and Urinalysis/urine culture (for late-onset)", "Complete blood count (reveals leukopenia or elevated immature-to-total neutrophil ratio > 0.2)"]
    },
    clinicalPresentation: "In contrast to adults, newborns present subtly and non-specifically. Key early indicators include temperature instability (more commonly hypothermia/cold skin rather than fever), poor sucking, lethargy, hypotonia ('floppy baby'), tachypnea, and cyanosis.",
    causativePathogens: [
      { name: "Streptococcus agalactiae", slug: "s-agalactiae", role: "Group B Streptococcus (GBS). Gram-positive coccus in chains, beta-hemolytic. Colonizes the maternal vagina and is aspirated by the neonate during birth." }
    ],
    diagnosticApproach: "A full sepsis evaluation is indicated, including at least one sterile blood culture and a mandatory lumbar puncture (since up to 30% of bacteremic neonates have co-existing meningitis, even without neck stiffness).",
    treatmentPrinciples: "Empirical intravenous therapy with Ampicillin (covers GBS and Listeria) and Gentamicin (provides synergistic Gram-negative coverage) must be started immediately. Cefotaxime is used if meningitis is confirmed.",
    clinicalPearls: [
      "Board Examination Pearl: In a newborn, temperature instability (hypothermia <36°C) and lethargy are classic presenting signs of systemic sepsis.",
      "Escherichia coli is the leading cause of early-onset sepsis in low-birth-weight and preterm infants.",
      "Avoid Ceftriaxone in neonates; it displaces bilirubin from albumin, increasing the risk of neonatal jaundice and kernicterus."
    ],
    relatedAntibiotics: [
      { name: "Ampicillin", slug: "ampicillin", role: "Aminopenicillin; covers Gram-positive targets including Listeria monocytogenes and Group B Strep." },
      { name: "Gentamicin", slug: "gentamicin", role: "Aminoglycoside; provides synergistic bactericidal coverage against Gram-negatives (E. coli)." }
    ],
    differentialDiagnoses: ["Neonatal Respiratory Distress Syndrome (RDS; non-infectious surfactant deficiency)", "Transient Tachypnea of the Newborn", "Congenital Heart Disease"],
    faqs: [
      { question: "Why is a lumbar puncture mandatory in neonatal sepsis workups?", answer: "Neonates with meningitis do not display classic signs like neck stiffness or Kernig's sign due to underdeveloped musculature. Since the blood-brain barrier is highly permeable in infants, bacteremia frequently seeds the meninges; a lumbar puncture is the only way to rule out co-existing, life-threatening meningitis." }
    ],
    relatedDiseases: [
      { name: "Group B Streptococcus (GBS)", slug: "group-b-streptococcus-gbs", description: "The primary pathogen involved in vertical transmission of neonatal infections." },
      { name: "Acute Bacterial Meningitis", slug: "acute-bacterial-meningitis", description: "Bacterial leptomeningeal infection which frequently complicates neonatal sepsis." }
    ],
    relatedOrganisms: []
  },
  {
    id: "congenital-cmv",
    name: "Congenital CMV",
    slug: "congenital-cmv",
    metaDescription: "Master congenital CMV clinical findings, periventricular calcifications, sensorineural hearing loss, and Ganciclovir treatment.",
    overview: "Congenital Cytomegalovirus (CMV) is the most common congenitally transmitted viral infection, presenting with severe neurodevelopmental sequelae including sensorineural hearing loss and periventricular calcifications.",
    quickFacts: {
      commonPathogens: ["Cytomegalovirus (CMV; HHV-5)"],
      riskFactors: ["Primary maternal CMV infection during pregnancy (highest risk of transmission)"],
      hallmarkSymptoms: ["Sensorineural hearing loss (most common sequela)", "Periventricular intracranial calcifications", "Microcephaly and ventriculomegaly", "Petechial rash ('blueberry muffin' lesions) and hepatosplenomegaly"],
      diagnosticApproach: ["CMV DNA PCR of urine or saliva (must be performed within the first 21 days of life to distinguish from post-natal infection)", "Brain ultrasound/CT"]
    },
    clinicalPresentation: "While 90% of newborns are asymptomatic at birth, symptomatic infants exhibit growth restriction, microcephaly, jaundice, hepatosplenomegaly, and a widespread purpuric petechial rash ('blueberry muffin rash'). Over time, they manifest progressive sensorineural hearing loss and intellectual disabilities.",
    causativePathogens: [
      { name: "Cytomegalovirus", slug: "cmv", role: "Double-stranded DNA enveloped herpesvirus. Cells show classic 'owl's eye' intranuclear inclusion bodies on histology." }
    ],
    diagnosticApproach: "The gold standard is detecting CMV DNA via PCR in the neonate's saliva or urine within 3 weeks of birth. Testing after 21 days can detect acquired post-natal infection, which does not carry the same risk of brain damage.",
    treatmentPrinciples: "Symptomatic infants with central nervous system involvement are treated with intravenous Ganciclovir or oral Valganciclovir for 6 months to preserve hearing and improve neurodevelopmental outcomes.",
    clinicalPearls: [
      "Board Examination Distinction: Congenital CMV features periventricular calcifications (surrounding the lateral ventricles), whereas Congenital Toxoplasmosis features diffuse parenchymal calcifications.",
      "CMV is the leading non-genetic cause of sensorineural hearing loss in children.",
      "The 'blueberry muffin' rash represents areas of extramedullary hematopoiesis in the dermis, a finding shared with congenital rubella."
    ],
    relatedAntibiotics: [],
    differentialDiagnoses: ["Congenital Toxoplasmosis (diffuse calcifications, chorioretinitis)", "Congenital Rubella (cataracts, PDA, deaf, blueberry muffin rash)", "Congenital Syphilis"],
    faqs: [
      { question: "Why must congenital CMV be diagnosed within the first 21 days of life?", answer: "Newborns can easily acquire CMV postnatally through breast milk or close contact. Postnatal CMV infection in term infants is entirely benign and does not cause hearing or brain damage. Only viral detection within the first 21 days confirms intrauterine (congenital) transmission, which requires close developmental monitoring and possible antiviral therapy." }
    ],
    relatedDiseases: [{ name: "Neonatal Sepsis", slug: "neonatal-sepsis", description: "Bacterial neonatal syndrome presenting with acute systemic deterioration." }],
    relatedOrganisms: []
  },
  {
    id: "congenital-toxoplasmosis",
    name: "Congenital Toxoplasmosis",
    slug: "congenital-toxoplasmosis",
    metaDescription: "Master congenital Toxoplasmosis classic triad, diffuse intracranial calcifications, chorioretinitis, and Pyrimethamine-Sulfadiazine.",
    overview: "Congenital Toxoplasmosis is an intrauterine protozoan infection acquired vertically from a mother with primary infection, classically characterized by the clinical triad of chorioretinitis, hydrocephalus, and diffuse intracranial calcifications.",
    quickFacts: {
      commonPathogens: ["Toxoplasma gondii"],
      riskFactors: ["Primary maternal Toxoplasma infection during pregnancy (associated with cat feces contact or undercooked meat)"],
      hallmarkSymptoms: ["Chorioretinitis (hallmark ocular lesion)", "Obstructive hydrocephalus", "Diffuse, scattered intracranial calcifications", "Seizures and developmental delay"],
      diagnosticApproach: ["Toxoplasma PCR of amniotic fluid (prenatal)", "Neonatal serum anti-Toxoplasma IgM or IgA antibodies", "Head CT/ultrasound (reveals calcifications and ventriculomegaly)"]
    },
    clinicalPresentation: "Infected neonates may appear normal at birth but develop progressive symptoms over months. Classic findings include macrocephaly (due to obstructive hydrocephalus), seizures, white/yellow retinal scars (chorioretinitis), and diffuse intracranial calcifications scattered throughout the brain parenchyma.",
    causativePathogens: [
      { name: "Toxoplasma gondii", slug: "toxoplasma-gondii", role: "Obligate intracellular protozoan. Vertically transmitted as tachyzoites, crossing the placenta during active maternal infection." }
    ],
    diagnosticApproach: "Confirmed by detecting specific anti-Toxoplasma IgM or IgA antibodies in the neonate's blood, as maternal IgG crosses the placenta and does not confirm active infant infection. Head CT displays diffuse intracranial calcifications and ventriculomegaly.",
    treatmentPrinciples: "Symptomatic and asymptomatic infected neonates are treated for a full year with combination oral Pyrimethamine and Sulfadiazine, supplemented with Leucovorin (folinic acid) to prevent bone marrow toxicity.",
    clinicalPearls: [
      "Board Examination Triad: Look for chorioretinitis, hydrocephalus, and diffuse intracranial calcifications to diagnose Congenital Toxoplasmosis.",
      "The maternal risk is strictly from primary infection during pregnancy; women with chronic, latent Toxoplasma infection prior to pregnancy have protective immunity and do not transmit it to the fetus.",
      "Pregnant women should strictly avoid cleaning cat litter boxes and eating raw or undercooked meats to prevent primary exposure."
    ],
    relatedAntibiotics: [],
    differentialDiagnoses: ["Congenital CMV (periventricular calcifications, microcephaly)", "Congenital Rubella (cataracts, heart defects)", "Congenital Lymphocytic Choriomeningitis Virus (LCMV)"],
    faqs: [
      { question: "How does head CT differentiate congenital Toxoplasmosis from congenital CMV?", answer: "Head CT in congenital Toxoplasmosis demonstrates diffuse, scattered calcifications throughout the cortex and basal ganglia, accompanied by macrocephaly from hydrocephalus. In contrast, congenital CMV classically demonstrates periventricular calcifications lining the borders of the lateral ventricles, accompanied by microcephaly." }
    ],
    relatedDiseases: [{ name: "Cerebral Toxoplasmosis", slug: "cerebral-toxoplasmosis", description: "Opportunistic CNS toxoplasmosis presenting as mass lesions in patients with advanced HIV." }],
    relatedOrganisms: []
  },
  {
    id: "neonatal-hsv",
    name: "Neonatal HSV",
    slug: "neonatal-hsv",
    metaDescription: "Learn neonatal Herpes Simplex Virus presentation, skin-eye-mouth (SEM) vs disseminated disease, and high-dose IV Acyclovir.",
    overview: "Neonatal HSV is a highly severe, potentially fatal infection in newborns, typically acquired vertically during delivery and presenting as skin-eye-mouth (SEM), central nervous system (CNS), or disseminated multi-organ disease.",
    quickFacts: {
      commonPathogens: ["Herpes Simplex Virus 2 (HSV-2; 75% of cases)", "Herpes Simplex Virus 1 (HSV-1)"],
      riskFactors: ["Active maternal genital herpes lesions at delivery", "Primary maternal HSV infection near term (highest transmission risk, ~50%)", "Invasive fetal monitoring (scalp electrodes)"],
      hallmarkSymptoms: ["Grouped vesicular skin lesions (SEM disease)", "Seizures, lethargy, and fontanelle bulging (CNS disease)", "Sepsis-like syndrome with hepatitis and DIC (disseminated)", "Keratoconjunctivitis"],
      diagnosticApproach: ["HSV PCR of CSF (mandatory)", "Swabs of skin vesicles, conjunctiva, and oropharynx for PCR", "Serum alanine aminotransferase (ALT; highly elevated in disseminated liver necrosis)"]
    },
    clinicalPresentation: "Presents in three patterns: 1) SEM Disease (appears at 5-11 days of life with vesicular lesions on skin and eyes); 2) CNS Disease (appears at 2-3 weeks with lethargy, seizures, and abnormal CSF); 3) Disseminated Disease (presents as acute neonatal shock, liver failure with massive transaminase elevation, and DIC).",
    causativePathogens: [
      { name: "Herpes Simplex Virus 2", slug: "hsv-2", role: "Double-stranded DNA enveloped virus. Vertically transmitted during passage through the birth canal of a mother shedding the virus." }
    ],
    diagnosticApproach: "The cornerstone is HSV PCR on CSF and blood. Multiplex PCR swabs of active skin vesicles, mouth, and conjunctiva must be obtained. Severe unexplained hepatitis (ALT > 1000) in a newborn strongly suggests disseminated HSV.",
    treatmentPrinciples: "Requires immediate admission and high-dose intravenous Acyclovir (20 mg/kg every 8 hours) for 14 days (for SEM) or 21 days (for CNS or disseminated disease) to improve survival.",
    clinicalPearls: [
      "Newborns with disseminated HSV can present with a severe sepsis-like syndrome but have negative bacterial blood cultures and progressive liver failure.",
      "Up to 30% of neonates with CNS or disseminated HSV have NO skin vesicles at any point during their illness, making diagnosis extremely difficult.",
      "If a pregnant woman has active prodromal symptoms or visible genital herpes lesions at the onset of labor, a Cesarean section is mandatory to prevent neonatal transmission."
    ],
    relatedAntibiotics: [
      { name: "Acyclovir", slug: "acyclovir", role: "High-dose IV therapy; essential to prevent massive neurodevelopmental damage or death." }
    ],
    differentialDiagnoses: ["Neonatal Bacterial Sepsis (differentiated by bacterial cultures)", "Congenital CMV", "Neonatal Varicella"],
    faqs: [
      { question: "Why does primary maternal HSV carry a much higher risk of neonatal transmission than recurrent HSV?", answer: "During primary maternal infection, the mother lacks protective anti-HSV IgG antibodies, resulting in high viral loads in the birth canal and zero passive antibody transfer to the fetus (transmission risk is ~50%). In recurrent maternal herpes, maternal IgG antibodies are present, crossing the placenta to protect the fetus and reducing transmission risk to <3%." }
    ],
    relatedDiseases: [
      { name: "Neonatal Sepsis", slug: "neonatal-sepsis", description: "Bacterial neonatal syndrome requiring standard antibiotic coverage." },
      { name: "HSV Encephalitis", slug: "hsv-encephalitis", description: "Temporal lobe encephalitis in older children and adults." }
    ],
    relatedOrganisms: []
  },
  {
    id: "group-b-streptococcus-gbs",
    name: "Group B Streptococcus (GBS) Infection",
    slug: "group-b-streptococcus-gbs",
    metaDescription: "Master Streptococcus agalactiae (GBS) neonatal infections, screening protocols, intrapartum penicillin G prophylaxis, and clinical presentations.",
    overview: "Group B Streptococcus (GBS) Infection refers to early-onset or late-onset neonatal sepsis, pneumonia, or meningitis acquired vertically from maternal vaginal colonization with Streptococcus agalactiae.",
    quickFacts: {
      commonPathogens: ["Streptococcus agalactiae (Group B Streptococcus)"],
      riskFactors: ["Maternal GBS colonization (positive recto-vaginal screen at 36-37 weeks)", "Maternal GBS bacteriuria during current pregnancy", "Prior infant with invasive GBS disease", "Intrapartum fever >= 38C"],
      hallmarkSymptoms: ["Respiratory distress (grunting, tachypnea, cyanosis) within hours of birth", "Lethargy and poor perfusion", "Apnea", "Hypothermia or fever"],
      diagnosticApproach: ["Blood cultures and CSF analysis of the symptomatic neonate", "Gram stain of CSF (reveals Gram-positive cocci in pairs/chains)", "Maternal vaginal-rectal screening swab at 36-37 weeks"]
    },
    clinicalPresentation: "Early-onset disease arises within the first 24 hours of life (90% of cases), presenting as acute respiratory distress, cyanosis, and shock. Late-onset disease occurs between 7 days and 3 months of life, presenting classically as purulent bacterial meningitis.",
    causativePathogens: [
      { name: "Streptococcus agalactiae", slug: "s-agalactiae", role: "Gram-positive, catalase-negative, beta-hemolytic coccus. Possesses a group B Lancefield antigen and is bacitracin-resistant. CAMP test positive." }
    ],
    diagnosticApproach: "Diagnosed by obtaining sterile blood and cerebrospinal fluid (CSF) cultures from the neonate. Maternal colonization is screened between 36 and 37 weeks gestation using a combined vaginal-rectal swab culture.",
    treatmentPrinciples: "Neonatal infection is treated with IV Penicillin G or Ampicillin combined with Gentamicin. Prevention relies on intrapartum antibiotic prophylaxis (IAP) with IV Penicillin G given to the colonized mother during labor.",
    clinicalPearls: [
      "Board Examination Pearl: Streptococcus agalactiae (GBS) is bacitracin-resistant and hydrolyzes hippurate; it produces the CAMP factor, which enlarges the zone of hemolysis created by Staphylococcus aureus.",
      "IAP with IV Penicillin G is indicated if: 1) positive GBS screen at 36-37 weeks; 2) GBS bacteriuria during current pregnancy; 3) prior child with GBS disease; or 4) unknown GBS status with PROM >18 hours, fever, or preterm labor.",
      "IAP is NOT indicated for planned Cesarean deliveries performed before labor onset and before rupture of membranes, regardless of GBS status."
    ],
    relatedAntibiotics: [
      { name: "Ampicillin", slug: "ampicillin", role: "Aminopenicillin; excellent bactericidal coverage against Streptococcus agalactiae." }
    ],
    differentialDiagnoses: ["Escherichia coli Neonatal Sepsis (Gram-negative rod, higher prevalence in preterms)", "Listeria monocytogenes infection", "Neonatal Respiratory Distress Syndrome"],
    faqs: [
      { question: "What is the CAMP test and why is it high-yield?", answer: "The CAMP test is a laboratory method used to identify Streptococcus agalactiae (GBS). GBS secretes an extracellular protein (CAMP factor) that acts synergistically with the beta-hemolysin of Staphylococcus aureus. When strep and staph are grown together on blood agar, GBS produces a highly characteristic 'arrowhead' zone of enhanced beta-hemolysis." }
    ],
    relatedDiseases: [
      { name: "Neonatal Sepsis", slug: "neonatal-sepsis", description: "Systemic neonatal syndrome frequently caused by vertical GBS transmission." },
      { name: "Acute Bacterial Meningitis", slug: "acute-bacterial-meningitis", description: "Bacterial leptomeningeal infection complicating late-onset GBS." }
    ],
    relatedOrganisms: []
  },
  {
    id: "esophageal-candidiasis",
    name: "Esophageal Candidiasis",
    slug: "esophageal-candidiasis",
    metaDescription: "Master Esophageal Candidiasis presentation, opportunistic risk factors in immunocompromised hosts, and Fluconazole therapy.",
    overview: "Esophageal Candidiasis is an opportunistic fungal infection of the esophagus, predominantly caused by Candida albicans. Characterized by painful swallowing (odynophagia) and white mucosal plaques, it is a hallmark AIDS-defining illness occurring typically when CD4 counts fall below 100 cells/µL.",
    quickFacts: {
      commonPathogens: ["Candida albicans"],
      riskFactors: ["HIV/AIDS (CD4 < 100 cells/µL)", "Systemic corticosteroid use", "Inhaled corticosteroid use without rinsing", "Hematologic malignancies"],
      hallmarkSymptoms: ["Severe odynophagia (painful swallowing)", "Dysphagia (difficulty swallowing)", "Substernal chest pain", "White, scraping-resistant oral plaques (thrush; present in ~80% of cases)"],
      diagnosticApproach: ["Upper endoscopy (reveals white, plaque-like mucosal lesions)", "Biopsy and histopathology (shows pseudohyphae and budding yeast invading mucosal cells)"]
    },
    clinicalPresentation: "Presents classically with severe, localized pain upon swallowing (odynophagia), difficulty swallowing solids and liquids (dysphagia), and substernal burning chest discomfort. Though highly associated with oral thrush, the absence of oral lesions does not exclude esophageal involvement, requiring endoscopy for definitive evaluation.",
    causativePathogens: [
      { name: "Candida albicans", slug: "candida-albicans", role: "Opportunistic dimorphic fungus that undergoes a transition from budding yeast to invasive pseudohyphae and true hyphae at body temperature, invading esophageal epithelial tissues." }
    ],
    diagnosticApproach: "The gold standard is upper endoscopy (EGD), which reveals elevated, creamy-white plaques that leave raw, erythematous, or bleeding surfaces when scraped. Confirmation is obtained via biopsy or brushings showing yeast and pseudohyphae invading squamous epithelial cells.",
    treatmentPrinciples: "Requires systemic antifungal therapy. Oral Fluconazole (100–400 mg daily for 14–21 days) is the highly preferred first-line agent due to excellent tissue penetration. Intravenous fluconazole or an echinocandin (e.g., Micafungin) is reserved for severe, refractory, or oral-intolerant cases.",
    clinicalPearls: [
      "Board Examination Pearl: In an HIV-positive patient presenting with new-onset odynophagia, an empirical course of oral Fluconazole is the first-line diagnostic and therapeutic step. Endoscopy is reserved only if symptoms fail to improve after 3-5 days of therapy.",
      "Inhaled corticosteroids (e.g., fluticasone) can precipitate esophageal candidiasis due to localized immunosuppression; patients must be educated to rinse their mouth thoroughly after each use."
    ],
    relatedAntibiotics: [
      { name: "Fluconazole", slug: "fluconazole", role: "First-line systemic triazole therapy; achieves high, curative tissue concentrations in the esophagus." }
    ],
    differentialDiagnoses: [
      "Cytomegalovirus (CMV) Esophagitis (presents with large, shallow, solitary linear ulcers; treated with Ganciclovir)",
      "Herpes Simplex Virus (HSV) Esophagitis (presents with small, deep, multiple 'punched-out' volcanic ulcers; treated with Acyclovir)",
      "Pill-Induced Esophagitis (presents with discrete, focal ulceration matching anatomical points of drug transit; history of taking doxycycline or NSAIDs without water)"
    ],
    faqs: [
      { question: "Is oral thrush always present in esophageal candidiasis?", answer: "No. While oral thrush (oropharyngeal candidiasis) is present in approximately 80% of patients with esophageal candidiasis, up to 20% of patients can have isolated esophageal involvement with a completely normal oral exam." }
    ],
    relatedDiseases: [
      { name: "Candidemia & Invasive Candidiasis", slug: "candidemia", description: "Systemic bloodstream invasion by Candida species, demanding immediate echinocandin therapy." }
    ],
    relatedOrganisms: []
  },
  {
    id: "vaginal-yeast-infection",
    name: "Vaginal Yeast Infection (Vulvovaginal Candidiasis)",
    slug: "vaginal-yeast-infection",
    alternateSlugs: ["vulvovaginal-candidiasis-yeast"],
    metaDescription: "Master Vaginal Yeast Infection (Vulvovaginal Candidiasis) diagnosis, thick cottage cheese discharge, normal pH (<4.5), and Fluconazole treatment.",
    overview: "Vaginal Yeast Infection, medically termed Vulvovaginal Candidiasis, is a highly common superficial fungal infection of the vagina and vulva caused primarily by Candida albicans. Characterized by severe pruritus and thick, odorless, white cottage cheese-like vaginal discharge, it occurs under conditions that disrupt normal vaginal flora.",
    quickFacts: {
      commonPathogens: ["Candida albicans"],
      riskFactors: ["Recent broad-spectrum antibiotic use", "Uncontrolled diabetes mellitus", "Pregnancy (high estrogen levels)", "Immunosuppression"],
      hallmarkSymptoms: ["Severe vulvovaginal pruritus (itching) and burning", "Thick, white, odorless, clumped discharge ('cottage cheese' appearance)", "Dysuria (burning with urination)", "Dyspareunia (painful intercourse)", "Vulvar erythema and edema"],
      diagnosticApproach: ["Vaginal pH measurement (remains normal, strictly < 4.5)", "Microscopic examination of discharge with 10% KOH (reveals pseudohyphae and budding yeast)"]
    },
    clinicalPresentation: "Presents with intense itching, burning, and soreness of the vulva and vagina. Physical examination demonstrates marked vulvar erythema, swelling, and vaginal excoriations, accompanied by the classic thick, white, adherent vaginal discharge that is strictly odorless.",
    causativePathogens: [
      { name: "Candida albicans", slug: "candida-albicans", role: "Normal commensal of the gastrointestinal and vaginal tracts that overgrows when protective vaginal lactobacilli are depleted or when systemic glycogen availability rises." }
    ],
    diagnosticApproach: "Evaluation begins by testing vaginal pH, which remains normal (< 4.5) in yeast infections (unlike bacterial vaginosis or trichomoniasis, where pH > 4.5). Diagnosis is confirmed by microscopic examination of discharge mixed with 10% potassium hydroxide (KOH), showing characteristic pseudohyphae and budding yeast.",
    treatmentPrinciples: "Mild to moderate uncomplicated infections are treated with a single dose of oral Fluconazole (150 mg) or short-course topical intravaginal azoles (e.g., miconazole, clotrimazole). Complicated or recurrent infections require prolonged courses of oral fluconazole.",
    clinicalPearls: [
      "Board Examination Pearl: A patient presenting with thick, white, pruritic vaginal discharge but a strictly normal vaginal pH of 4.0 or 4.2 has vulvovaginal candidiasis. High vaginal pH (>4.5) excludes isolated yeast infection and points toward BV or trichomoniasis.",
      "Recent use of antibiotics (such as clindamycin or amoxicillin) is a classic trigger, as it eradicates hydrogen peroxide-producing Lactobacillus species that normally suppress Candida overgrowth."
    ],
    relatedAntibiotics: [
      { name: "Fluconazole", slug: "fluconazole", role: "First-line oral triazole antifungal; a single 150 mg dose provides therapeutic vaginal tissue levels for up to 72 hours." }
    ],
    differentialDiagnoses: [
      "Bacterial Vaginosis (presents with thin gray-white discharge, 'fishy' odor, elevated pH > 4.5, and clue cells on wet mount)",
      "Trichomoniasis (presents with foul-smelling, green-yellow frothy discharge, elevated pH > 4.5, motile trichomonads on wet mount, and a 'strawberry cervix')",
      "Contact Dermatitis (presents with pruritus and erythema but lacks pseudohyphae and has normal vaginal discharge)"
    ],
    faqs: [
      { question: "Why does antibiotic use trigger vaginal yeast infections?", answer: "Broad-spectrum antibiotics eradicate the beneficial Lactobacillus species in the vagina. Lactobacilli normally maintain an acidic vaginal environment and produce hydrogen peroxide, which actively inhibits the transformation of Candida from a harmless commensal into an invasive pathogenic mold." }
    ],
    relatedDiseases: [
      { name: "Trichomoniasis", slug: "trichomoniasis", description: "Sexually transmitted vaginal infection presenting with elevated pH and green frothy discharge." }
    ],
    relatedOrganisms: []
  },
  {
    id: "mucormycosis",
    name: "Invasive Mucormycosis",
    slug: "mucormycosis",
    metaDescription: "Master Mucormycosis pathophysiology, Rhinocerebral presentation in DKA/neutropenia, broad non-septate 90-degree hyphae, and Amphotericin B treatment.",
    overview: "Mucormycosis is a rapidly progressive, highly lethal angioinvasive fungal infection caused by environmental molds of the order Mucorales, such as Rhizopus species. Classic rhinocerebral mucormycosis occurs in patients with diabetic ketoacidosis (DKA) or severe neutropenia, invading blood vessels and causing rapid tissue necrosis of the nasal turbinates, palate, orbit, and brain.",
    quickFacts: {
      commonPathogens: ["Rhizopus species", "Mucor species"],
      riskFactors: ["Diabetic Ketoacidosis (DKA)", "Severe neutropenia (hematologic malignancies, chemotherapy)", "Solid organ transplantation", "Deferoxamine iron-chelator therapy"],
      hallmarkSymptoms: ["Unilateral facial pain and headache", "Periorbital swelling and cellulitis", "Black necrotic eschar on nasal turbinates or hard palate", "Bloody nasal discharge", "Cranial nerve palsies (CN III, IV, VI, VII)"],
      diagnosticApproach: ["Biopsy of affected tissue (reveals wide, ribbon-like, non-septate hyphae branching at 90-degree right angles)", "Urgent head CT or MRI (to assess paranasal sinus invasion and orbital/brain involvement)"]
    },
    clinicalPresentation: "Presents with acute unilateral facial pain, swelling, nasal congestion, and headache. Fever is common. Rapidly progresses to cause a classic black necrotic eschar on the hard palate or nasal turbinates, ophthalmoplegia, visual loss, and altered mental status as the fungus crosses the cribriform plate into the frontal lobes.",
    causativePathogens: [
      { name: "Rhizopus species", slug: "rhizopus-spp", role: "Angioinvasive environmental mold that proliferates rapidly in acidic, glucose-rich, and iron-abundant environments (such as DKA) and directly invades arterial walls, causing tissue infarction." }
    ],
    diagnosticApproach: "Requires urgent surgical biopsy or scraping of necrotic nasal lesions. Histopathology is diagnostic, demonstrating broad, ribbon-like, non-septate hyphae with wide-angle (90-degree, right-angle) branching. Cultures are slow and can be falsely negative due to fungal tissue disruption.",
    treatmentPrinciples: "Mucormycosis is a surgical and medical emergency. Requires immediate, aggressive surgical debridement of all necrotic tissues, reversal of underlying risk factors (correcting acidosis/hyperglycemia), and initiation of high-dose Liposomal Amphotericin B. Posaconazole or Isavuconazole can be used as consolidation or step-down therapy.",
    clinicalPearls: [
      "Board Examination Pearl: A diabetic patient with DKA presenting with unilateral facial pain, orbital swelling, and a black, painless necrotic eschar on the hard palate has rhinocerebral mucormycosis. Key histopathology reveals broad, non-septate, 90-degree branching hyphae.",
      "The causative fungi thrive in acidic and iron-rich environments. Patients receiving Deferoxamine (an iron chelator) are at high risk because the molds utilize the deferoxamine-iron complex as a siderophore to gather iron for growth."
    ],
    relatedAntibiotics: [
      { name: "Amphotericin B", slug: "amphotericin-b", role: "First-line induction antifungal; high-dose liposomal formulation is mandatory to control this rapidly invasive infection." }
    ],
    differentialDiagnoses: [
      "Cavernous Sinus Thrombosis (presents with bilateral orbital signs, headache, and cranial nerve deficits, but lacks necrotic tissue eschar)",
      "Aspergillosis (causes invasive sinusitis, but histopathology shows narrow, septate hyphae branching at acute 45-degree angles)",
      "Bacterial Orbital Cellulitis (presents with fever, pain, and limited extraocular motion, but lacks rapid, necrotic, angioinvasive tissue destruction)"
    ],
    faqs: [
      { question: "Why is diabetic ketoacidosis (DKA) such a strong risk factor for Mucormycosis?", answer: "Rhizopus species express an active enzyme called ketone reductase, which allows them to thrive in acidic, high-ketone environments. Furthermore, acidosis dissociates iron from transferrin, releasing free iron into the blood, which the fungus utilizes as an essential nutrient to fuel its rapid, aggressive growth." }
    ],
    relatedDiseases: [
      { name: "Acute Bacterial Sinusitis", slug: "acute-bacterial-sinusitis", description: "Bacterial infection of paranasal sinuses, lacking angioinvasive tissue necrosis." },
      { name: "Aspergillosis", slug: "aspergillosis", description: "Invasive fungal infection demonstrating 45-degree branching septate hyphae." }
    ],
    relatedOrganisms: []
  },
  {
    id: "atypical-walking-pneumonia",
    name: "Atypical walking pneumonia",
    slug: "atypical-walking-pneumonia",
    metaDescription: "Master Atypical Walking Pneumonia (Mycoplasma pneumoniae) symptoms, cold agglutinins, interstitial X-ray patterns, and Macrolide/Doxycycline therapy.",
    overview: "Atypical walking pneumonia, primarily caused by Mycoplasma pneumoniae, is a common lower respiratory tract infection characterized by a mild, gradual onset of systemic and respiratory symptoms. Often presenting as a dry, hacking cough accompanied by an X-ray that looks far worse than the patient's stable clinical appearance, it classically affects school-aged children, military recruits, and young adults in close-quarter living conditions.",
    quickFacts: {
      commonPathogens: ["Mycoplasma pneumoniae", "Chlamydia pneumoniae", "Legionella pneumophila"],
      riskFactors: ["Young age (5-40 years)", "Close quarters (dorms, military barracks, schools)", "Autumn and winter seasons"],
      hallmarkSymptoms: ["Persistent dry, non-productive, hacking cough", "Low-grade fever and mild headache", "Pharyngitis and ear pain (bullous myringitis)", "Profound fatigue", "Maculopapular rash (erythema multiforme in severe cases)"],
      diagnosticApproach: ["Chest X-ray (reveals diffuse, bilateral interstitial or reticonodular infiltrates out of proportion to clinical signs)", "Mycoplasma PCR of nasopharyngeal swab", "Cold agglutinin titer (IgM-mediated red blood cell agglutination at cold temperatures)"]
    },
    clinicalPresentation: "Presents insidiously with a dry, hacking cough, mild sore throat, low-grade fever, and persistent malaise. Auscultation often reveals minimal rales or rhonchi, contrastingly paired with a highly abnormal, bilateral interstitial pattern on chest imaging. Patients remain ambulatory and clinically stable, earning the name 'walking' pneumonia.",
    causativePathogens: [
      { name: "Mycoplasma pneumoniae", slug: "myco-pneumoniae", role: "Pleomorphic bacterium that completely lacks a cell wall (making beta-lactams useless) and attaches to respiratory epithelium via an organelle tip, causing mucosal ciliary stasis." }
    ],
    diagnosticApproach: "The diagnosis is primarily clinical, supported by a chest X-ray demonstrating diffuse, streaky, bilateral interstitial or bronchopneumonic infiltrates. High-yield confirmatory tests include multiplex PCR of a nasopharyngeal swab or detection of a significant rise in Mycoplasma IgM antibodies or a cold agglutinin titer.",
    treatmentPrinciples: "Because the main pathogens completely lack peptidoglycan cell walls, all beta-lactam antibiotics (such as penicillins and cephalosporins) are clinically useless. First-line therapy consists of oral Macrolides (e.g., Azithromycin), Tetracyclines (e.g., Doxycycline), or respiratory Fluoroquinolones (e.g., Levofloxacin).",
    clinicalPearls: [
      "Board Examination Pearl: A young adult in college dorms presenting with a dry cough, low-grade fever, bilateral interstitial infiltrates on X-ray, and a positive cold agglutinin test has atypical walking pneumonia caused by Mycoplasma pneumoniae. Treat with Azithromycin or Doxycycline.",
      "Mycoplasma pneumoniae can trigger an autoimmune hemolytic anemia. IgM autoantibodies against host I-antigens on red blood cells cause RBCs to clump together in cold extremities, presenting as mild hemolysis or acrocyanosis."
    ],
    relatedAntibiotics: [
      { name: "Azithromycin", slug: "azithromycin", role: "First-line macrolide; inhibits protein synthesis of atypical organisms by binding the 50S ribosomal subunit." },
      { name: "Doxycycline", slug: "doxycycline", role: "Highly effective alternative; inhibits atypical protein synthesis via binding of the 30S ribosomal subunit." }
    ],
    differentialDiagnoses: [
      "Community-Acquired Pneumonia (CAP) (presents with acute high fevers, productive rusty sputum, lobar consolidation on X-ray, and toxic clinical appearance; classically S. pneumoniae)",
      "Viral Pneumonia (presents similarly with interstitial patterns, but diagnosed by viral panel PCR)",
      "Acute Bronchitis (presents with dry cough but lacks systemic fever or significant pulmonary infiltrates on chest X-ray)"
    ],
    faqs: [
      { question: "Why are penicillins ineffective against walking pneumonia?", answer: "Penicillins and other beta-lactam antibiotics work exclusively by disrupting peptidoglycan cell wall synthesis. Since Mycoplasma pneumoniae does not possess a cell wall, it is completely structurally resistant to these agents. Antagonists of protein synthesis (like azithromycin or doxycycline) are required." }
    ],
    relatedDiseases: [
      { name: "Community-Acquired Pneumonia (CAP)", slug: "community-acquired-pneumonia", description: "Lobar pneumonia presenting with productive cough, consolidated infiltrates, and higher severity." }
    ],
    relatedOrganisms: []
  },
  {
    id: "toxic-megacolon",
    name: "Toxic Megacolon",
    slug: "toxic-megacolon",
    metaDescription: "Master Toxic Megacolon pathology, severe Clostridioides difficile complication, radiologic colon dilation (>6cm), and therapy principles.",
    overview: "Toxic Megacolon is a life-threatening, acute complication characterized by severe colonic distension and systemic toxicity. It can complicate severe Clostridioides difficile infection (CDI) or inflammatory bowel disease (IBD). Pathophysiologically, deep neuromuscular inflammation leads to colonic smooth muscle paralysis, allowing the colon to balloon up to diameters greater than 6 cm, creating a massive risk of perforation and septic shock.",
    quickFacts: {
      commonPathogens: ["Clostridioides difficile"],
      riskFactors: ["Severe, untreated Clostridioides difficile colitis", "Ulcerative Colitis or Crohn's Disease", "Use of anti-motility agents (like loperamide) during active infectious diarrhea", "Recent broad-spectrum antibiotic exposure"],
      hallmarkSymptoms: ["Severe, generalized abdominal pain and distension", "High fever and tachycardia", "Bloody or watery diarrhea (which may paradoxically decrease as the colon paralyzes)", "Leukocytosis (>20,000 cells/µL)", "Signs of septic shock (hypotension, altered mental status)"],
      diagnosticApproach: ["Abdominal plain radiograph or CT scan (reveals a dilated colon diameter > 6 cm, with loss of normal haustral markings)", "Clinical criteria (fever, tachycardia, leukocytosis, anemia, and dehydration)"]
    },
    clinicalPresentation: "Presents as a critically ill, toxic-appearing patient with high spiking fevers, rapid heart rate, severe abdominal distension, guarding, and rebound tenderness. Diarrhea may have been profuse but can paradoxically cease as the colon becomes completely aperistaltic and flaccid.",
    causativePathogens: [
      { name: "Clostridioides difficile", slug: "c-difficile", role: "Spore-forming Gram-positive anaerobe whose enterotoxin A and cytotoxin B destroy colonic enterocytes, causing transmural inflammation and localized neuromuscular paralysis." }
    ],
    diagnosticApproach: "Diagnosed by combining clinical signs of systemic toxicity (fever, tachycardia, extreme leukocytosis) with imaging. An abdominal X-ray or CT scan demonstrating a segment of colonic dilation greater than 6 cm in diameter, accompanied by mucosal edema ('thumbprinting') and loss of haustral folds, is diagnostic.",
    treatmentPrinciples: "Management is an intensive care emergency. Requires complete bowel rest, nasogastric decompression, aggressive IV fluid resuscitation, and immediate broad-spectrum antibiotics including high-dose oral/rectal Vancomycin plus IV Metronidazole to cover severe C. difficile. Anti-motility agents are strictly contraindicated. Urgent surgical colectomy is required if there is no response to medical therapy within 24-72 hours, or if signs of perforation emerge.",
    clinicalPearls: [
      "Board Examination Pearl: In a patient with active C. difficile or Ulcerative Colitis, the administration of anti-motility agents (like Loperamide) can precipitate toxic megacolon. It paralyzes colonic motility, preventing clearance of toxins and leading to rapid colonic expansion.",
      "The hallmark cutoff for toxic megacolon is a colonic transverse diameter of greater than 6.0 cm on a plain abdominal X-ray, in the presence of systemic signs of toxicity (fever, tachycardia, leukocytosis)."
    ],
    relatedAntibiotics: [
      { name: "Metronidazole", slug: "metronidazole", role: "Given intravenously; achieves excellent tissue levels in the inflamed colonic wall." }
    ],
    differentialDiagnoses: [
      "Ogilvie Syndrome (acute colonic pseudo-obstruction; presents with massive colonic dilation in elderly or post-operative patients, but lacks systemic toxic signs like high fever or extreme leukocytosis)",
      "Mechanical Bowel Obstruction (differentiated by CT scan showing a clear physical transition point and no signs of severe colitis)",
      "Sigmoid Volvulus (presents with massive abdominal distension and a classic 'coffee bean' sign on abdominal radiograph)"
    ],
    faqs: [
      { question: "Why does diarrhea sometimes improve as toxic megacolon develops?", answer: "As the transmural inflammation spreads deep into the muscularis propria of the colon, it destroys the colonic myenteric plexus, leading to complete smooth muscle paralysis and aperistalsis. Because the colon is no longer contracting, the transit of diarrheal fluid stops, causing a deceptive decrease in bowel movements while the colon balloons internally." }
    ],
    relatedDiseases: [
      { name: "Pseudomembranous Colitis", slug: "pseudomembranous-colitis", description: "Severe C. difficile infection presenting with elevated yellowish plaques, which can progress to toxic megacolon." }
    ],
    relatedOrganisms: []
  },
  {
    id: "antibiotic-associated-diarrhea",
    name: "Antibiotic-associated diarrhea",
    slug: "antibiotic-associated-diarrhea",
    metaDescription: "Master Antibiotic-Associated Diarrhea etiology, Clostridioides difficile toxin assays, and Oral Vancomycin/Fidaxomicin treatment.",
    overview: "Antibiotic-associated diarrhea refers to a spectrum of diarrheal illnesses that arise as a direct complication of antimicrobial therapy. While some cases are mild and self-limiting due to metabolic shifts in intestinal flora, the most clinically significant and severe form is pseudomembranous colitis caused by the opportunistic overgrowth of toxin-producing Clostridioides difficile.",
    quickFacts: {
      commonPathogens: ["Clostridioides difficile"],
      riskFactors: ["Recent broad-spectrum antibiotic use (especially Clindamycin, Fluoroquinolones, Cephalosporins)", "Advanced age (>65 years)", "Recent healthcare or hospital exposure", "Proton Pump Inhibitor (PPI) use"],
      hallmarkSymptoms: ["Profuse, watery, foul-smelling diarrhea (typically > 3 loose stools in 24 hours)", "Abdominal cramping and tenderness", "Low-grade fever", "Leukocytosis"],
      diagnosticApproach: ["C. difficile Toxin PCR of stool sample", "Stool enzyme immunoassay (EIA) for Toxin A & B and glutamate dehydrogenase (GDH) antigen"]
    },
    clinicalPresentation: "Presents within days to weeks of initiating antibiotic therapy (or up to 2-3 months after completion). Symptoms range from frequent, watery, foul-smelling loose stools and mild lower abdominal cramping to severe colitis with high fevers, severe leukocytosis, and abdominal distension.",
    causativePathogens: [
      { name: "Clostridioides difficile", slug: "c-difficile", role: "Anaerobic Gram-positive spore-forming rod. Spores survive environmental sanitization and germinate in the colon when normal gut microflora are wiped out by antibiotics." }
    ],
    diagnosticApproach: "Diagnosis is confirmed by testing loose stool samples (never form-stable stools) for C. difficile toxins or toxin genes. Common algorithms utilize a highly sensitive GDH antigen screen combined with a highly specific Toxin EIA or a rapid, highly sensitive molecular PCR assay.",
    treatmentPrinciples: "The initial step is to immediately discontinue the inciting antibiotic if clinically feasible. For proven C. difficile infection, treatment consists of oral Fidaxomicin (200 mg twice daily for 10 days) or oral Vancomycin (125 mg four times daily for 10 days). Metronidazole is reserved for mild cases when first-line agents are unavailable.",
    clinicalPearls: [
      "Board Examination Pearl: Clindamycin, broad-spectrum cephalosporins (like Ceftriaxone), and fluoroquinolones are the most classic antibiotic triggers of C. difficile-associated diarrhea, but virtually any antibiotic can precipitate the disease.",
      "C. difficile is spread via highly resilient bacterial spores that are completely resistant to alcohol-based hand sanitizers. Healthcare providers must wash their hands with soap and water to physically rinse away spores."
    ],
    relatedAntibiotics: [
      { name: "Metronidazole", slug: "metronidazole", role: "Used as an alternative or adjuvant therapy; given orally for mild disease or intravenously for fulminant cases." }
    ],
    differentialDiagnoses: [
      "Non-C. difficile Antibiotic-Induced Diarrhea (mild, watery diarrhea from direct drug effects on gut motility or carbohydrate fermentation; improves immediately upon stopping the antibiotic; lacks systemic signs)",
      "Infectious Bacterial Gastroenteritis (Salmonella, Shigella, Campylobacter; differentiated by lack of recent antibiotic history and positive stool cultures)",
      "Inflammatory Bowel Disease Flare (differentiated by clinical history, colonoscopy, and fecal calprotectin)"
    ],
    faqs: [
      { question: "Why do Proton Pump Inhibitors (PPIs) increase the risk of antibiotic-associated C. diff diarrhea?", answer: "Gastric acid is a highly effective physiological barrier that kills swallowed C. difficile vegetative cells. PPIs suppress gastric acid production, allowing vegetative cells and spores to safely transit through the stomach into the intestine where they germinate and proliferate." }
    ],
    relatedDiseases: [
      { name: "Pseudomembranous Colitis", slug: "pseudomembranous-colitis", description: "The classic, severe manifestation of C. difficile infection characterized by yellow mucosal plaques." }
    ],
    relatedOrganisms: []
  },
  {
    id: "acute-prostatitis",
    name: "Acute Prostatitis",
    slug: "acute-prostatitis",
    metaDescription: "Master Acute Bacterial Prostatitis etiology (E. coli), severe prostatic pain, diagnosis avoidances, and long-course Fluoroquinolone therapy.",
    overview: "Acute Prostatitis, or Acute Bacterial Prostatitis, is an acute bacterial infection of the prostate gland, primarily caused by Gram-negative enterics such as Escherichia coli. Characterized by sudden fever, systemic chills, severe perineal and pelvic pain, and irritative voiding symptoms, it is a medical emergency due to high risk of sepsis and requires a prolonged course of targeted antibiotics.",
    quickFacts: {
      commonPathogens: ["Escherichia coli", "Klebsiella pneumoniae", "Proteus mirabilis", "Pseudomonas aeruginosa", "Neisseria gonorrhoeae / Chlamydia trachomatis (in young sexually active males)"],
      riskFactors: ["Benign Prostatic Hyperplasia (BPH) with urinary retention", "Recent urethral catheterization or cystoscopy", "Prostate biopsy", "Unprotected receptive anal intercourse"],
      hallmarkSymptoms: ["Sudden high fever and rigors (chills)", "Severe perineal, pelvic, or low back pain", "Exquisite prostatic tenderness on gentle digital rectal exam", "Dysuria, urinary frequency, and urgency", "Obstructive symptoms (hesitancy, weak stream, acute urinary retention)"],
      diagnosticApproach: ["Midstream urine culture (highly positive for the causative organism)", "Gentle digital rectal exam (reveals an exquisitely tender, warm, swollen, and boggy prostate)"]
    },
    clinicalPresentation: "Presents acutely with rapid onset of high fever, chills, and localized pain in the perineum, pelvis, or low back. Urinary symptoms are prominent, featuring severe burning during urination, urgency, and frequency, often accompanied by voiding hesitancy, straining, or complete acute urinary retention due to prostatic swelling.",
    causativePathogens: [
      { name: "Escherichia coli", slug: "e-coli", role: "Gram-negative enteric rod; uses uropathogenic fimbriae (pili) to ascend from the urethra and colonize prostatic ducts." }
    ],
    diagnosticApproach: "Diagnosis is clinical, supported by a positive midstream urine culture demonstrating the causative pathogen. A gentle digital rectal exam (DRE) reveals an exquisitely tender, boggy, warm, and edematous prostate. Aggressive or repeated prostate massage is strictly contraindicated due to high risk of bacteremia.",
    treatmentPrinciples: "Empirical antibiotic coverage must be initiated immediately. For stable outpatients, oral Fluoroquinolones (e.g., Ciprofloxacin or Levofloxacin) or TMP-SMX are first-line, continued for a strict duration of 4 to 6 weeks to ensure deep prostatic tissue penetration. Ill, septic patients require hospitalization and broad-spectrum intravenous beta-lactams.",
    clinicalPearls: [
      "Board Examination Pearl: In suspected acute bacterial prostatitis, do NOT perform a vigorous or aggressive digital rectal exam or prostatic massage. This can rupture small prostatic microabscesses, forcing bacteria into prostatic venous plexuses and precipitating rapid septic shock.",
      "The prostate gland has a highly restrictive blood-prostate barrier. Most antibiotics penetrate poorly. Fluoroquinolones (Ciprofloxacin) and Trimethoprim-Sulfamethoxazole are selected because they are highly lipophilic, successfully concentrating in therapeutic amounts in acidic prostatic secretions."
    ],
    relatedAntibiotics: [
      { name: "Ciprofloxacin", slug: "ciprofloxacin", role: "Highly lipophilic fluoroquinolone; exhibits outstanding prostatic tissue penetration and bactericidal Gram-negative coverage." },
      { name: "Levofloxacin", slug: "levofloxacin", role: "Alternative fluoroquinolone with outstanding bioavailability and tissue accumulation." }
    ],
    differentialDiagnoses: [
      "Acute Pyelonephritis (presents with fever and flank pain/CVA tenderness, but lacks perineal pain or prostatic bogginess)",
      "Uncomplicated Cystitis (presents with dysuria and frequency but lacks high systemic fevers, chills, or pelvic/perineal pain)",
      "Prostate Abscess (suspected when acute prostatitis fails to respond to appropriate antibiotics; diagnosed via transrectal ultrasound)"
    ],
    faqs: [
      { question: "Why is the antibiotic course for acute prostatitis so long (4-6 weeks)?", answer: "The prostate gland is surrounded by a dense fibrous capsule and has a blood-prostate barrier that restricts the entry of hydrophilic drugs. Over a short course, antibiotics cannot completely sterilize the deep prostatic acini. A full 4-to-6-week course is mandatory to prevent treatment failure or progression into chronic bacterial prostatitis." }
    ],
    relatedDiseases: [
      { name: "Pyelonephritis", slug: "pyelonephritis", description: "Infection of the renal pelvis and parenchyma, presenting with flank pain and costovertebral tenderness." },
      { name: "Urethritis", slug: "urethritis", description: "Urethral inflammation presenting with dysuria and discharge, often caused by STI pathogens." }
    ],
    relatedOrganisms: []
  },
  {
    id: "rheumatic-heart-disease",
    name: "Rheumatic Heart Disease",
    slug: "rheumatic-heart-disease",
    metaDescription: "Master Rheumatic Heart Disease pathophysiology, untreated Streptococcus pyogenes pharyngitis, mitral valve stenosis, and Penicillin G therapy.",
    overview: "Rheumatic Heart Disease is a chronic, progressive cardiac condition characterized by permanent valvular damage resulting from an episode of acute rheumatic fever (ARF). ARF is triggered by untreated Streptococcus pyogenes (Group A Strep) pharyngitis, which induces an autoimmune response via molecular mimicry, where antibodies against streptococcal M protein cross-react with host cardiac myosin, primarily causing mitral valve stenosis.",
    quickFacts: {
      commonPathogens: ["Streptococcus pyogenes (Group A Streptococcus)"],
      riskFactors: ["Untreated or poorly treated streptococcal pharyngitis (strep throat)", "Young age (5-15 years for initial acute rheumatic fever)", "Crowded living conditions", "Underdeveloped healthcare infrastructure"],
      hallmarkSymptoms: ["Dyspnea on exertion (due to progressive mitral stenosis)", "Fatigue and orthopnea", "Classic diastolic murmurs (e.g., mitral stenosis opening snap and rumbling murmur)", "Atrial fibrillation (secondary to left atrial enlargement)", "History of migratory polyarthritis, carditis, or chorea in childhood"],
      diagnosticApproach: ["Echocardiography (demonstrates characteristic mitral valve thickening, subvalvular fusion, and 'fish-mouth' orifice)", "Clinical history of Acute Rheumatic Fever (diagnosed using the Jones Criteria)"]
    },
    clinicalPresentation: "Presents years or decades after the initial childhood episode of acute rheumatic fever. Patients manifest progressive shortness of breath on exertion, fatigue, and signs of left-sided heart failure due to mitral stenosis. Examination reveals a characteristic low-pitched diastolic rumbling murmur at the apex, preceded by an opening snap.",
    causativePathogens: [
      { name: "Streptococcus pyogenes", slug: "s-pyogenes", role: "Gram-positive, beta-hemolytic coccus. Expresses M protein, a highly immunogenic virulence factor that stimulates antibodies that cross-react with human cardiac valves (molecular mimicry)." }
    ],
    diagnosticApproach: "The primary tool is transthoracic or transesophageal echocardiography, which demonstrates classic findings of chronic rheumatic carditis: commissural thickening, thickening and calcification of the mitral valve leaflets, subvalvular chordal shortening and fusion, and classic 'fish-mouth' restricted valve opening.",
    treatmentPrinciples: "For patients with documented history of acute rheumatic fever or rheumatic heart disease, long-term secondary penicillin prophylaxis is mandatory to prevent recurrent GAS pharyngitis and halt progressive valvular damage. Monthly intramuscular Penicillin G benzathine is the gold standard. Damaged valves may eventually require balloon valvuloplasty or surgical replacement.",
    clinicalPearls: [
      "Board Examination Pearl: Chronic rheumatic heart disease is the leading cause of mitral valve stenosis globally. It classically presents with a diastolic rumbling murmur at the cardiac apex preceded by an opening snap, arising from molecular mimicry against streptococcal M protein.",
      "Primary prevention of rheumatic heart disease requires treating GAS pharyngitis with oral Penicillin V or amoxicillin within 9 days of symptom onset. This completely prevents the immunological cascade leading to acute rheumatic fever."
    ],
    relatedAntibiotics: [
      { name: "Penicillin G", slug: "penicillin-g", role: "Long-acting intramuscular benzathine formulation; used as secondary prophylaxis to prevent recurrent GAS pharyngitis." }
    ],
    differentialDiagnoses: [
      "Degenerative Mitral Calcification (presents in elderly patients with mitral regurgitation or stenosis, lacking a history of rheumatic fever)",
      "Infective Endocarditis (presents acutely with fevers, new murmurs, and blood-culture positivity; can arise as a complication of pre-existing rheumatic valves)",
      "Myxomatous Mitral Valve Disease (mitral valve prolapse; presents with a mid-systolic click and late systolic murmur)"
    ],
    faqs: [
      { question: "Why does Streptococcus pyogenes skin infection (impetigo) not trigger rheumatic fever?", answer: "Strains of GAS that cause impetigo (skin-tropic strains) differ in their M protein structures compared to pharyngeal-tropic strains. Only rheumatogenic strains that colonize and infect the pharynx stimulate the specific immunological response and antibody cross-reactivity required to trigger acute rheumatic fever." }
    ],
    relatedDiseases: [
      { name: "Streptococcal Pharyngitis", slug: "streptococcal-pharyngitis", description: "Untreated pharyngeal GAS infection which serves as the obligate precursor to rheumatic heart disease." },
      { name: "Infective Endocarditis", slug: "infective-endocarditis", description: "Bacterial valvular vegetation that frequently infects chronic, structurally damaged rheumatic valves." }
    ],
    relatedOrganisms: []
  },
  {
    id: "myocardial-abscess",
    name: "Myocardial Abscess",
    slug: "myocardial-abscess",
    metaDescription: "Master Myocardial Abscess pathology, severe Staphylococcus aureus complication of endocarditis, ECG conduction blocks, and surgical/antibiotic therapy.",
    overview: "Myocardial Abscess is a severe, localized purulent infection of the myocardium, typically arising as a catastrophic complication of infective endocarditis (IE) or hematogenous bacteremia, primarily caused by Staphylococcus aureus. The abscess frequently invades the cardiac skeleton and interventricular septum, disrupting the electrical conduction system and presenting with acute heart block, septal perforation, or acute valvular failure.",
    quickFacts: {
      commonPathogens: ["Staphylococcus aureus", "Streptococcus species", "Enterococcus species"],
      riskFactors: ["Prosthetic valve infective endocarditis (highest risk)", "Intravenous drug use (IVDU)", "Aortic valve infective endocarditis", "Recent invasive cardiac surgery"],
      hallmarkSymptoms: ["Persistent fever and chills despite appropriate antibiotic therapy", "New-onset cardiac conduction blocks on ECG (e.g., first-degree AV block, bundle branch blocks)", "New or changing cardiac murmur (due to valvular destruction or septal rupture)", "Chest pain and progressive congestive heart failure"],
      diagnosticApproach: ["Transesophageal Echocardiography (TEE; demonstrates a localized hypoechoic myocardial fluid collection with a thick wall)", "Electrocardiography (ECG; monitors for progressive prolongation of the PR interval or new bundle branch blocks)", "Continuous blood cultures"]
    },
    clinicalPresentation: "Presents in a patient with active infective endocarditis or unremitting S. aureus bacteremia. Characterized by high, spiking fevers that persist despite active bactericidal antibiotic therapy. Manifests with progressive dyspnea and signs of acute heart failure, accompanied by sudden electrical conduction delays on ECG.",
    causativePathogens: [
      { name: "Staphylococcus aureus", slug: "s-aureus", role: "Gram-positive, catalase-positive, coagulase-positive coccus in clusters. Highly pyogenic and expresses fibronectin-binding proteins that facilitate rapid adhesion to valvular tissue, spreading locally into the myocardium." }
    ],
    diagnosticApproach: "The gold standard diagnostic imaging is a Transesophageal Echocardiogram (TEE), which is highly superior to a Transthoracic Echocardiogram (TTE) for detecting perivalvular and myocardial extension. ECG must be performed daily to monitor for new-onset conduction blocks, which indicate invasion of the abscess into the interventricular septum.",
    treatmentPrinciples: "Myocardial abscess is a highly lethal condition requiring a combination of prolonged intravenous bactericidal therapy (e.g., high-dose IV Vancomycin or Nafcillin) and urgent surgical debridement, drainage, or valve replacement. Temporary or permanent pacemaker placement may be required for complete heart block.",
    clinicalPearls: [
      "Board Examination Pearl: In a patient with active infective endocarditis (especially aortic or prosthetic valve), the development of a new cardiac conduction block (such as a new first-degree AV block or bundle branch block) on ECG strongly indicates extension of the infection into the myocardium, forming a localized myocardial or ring abscess.",
      "Because S. aureus produces coagulase, it walls itself off within fibrin-rich abscess cavities. This severely limits antibiotic penetration, explaining why medical therapy alone frequently fails and urgent surgical intervention is mandatory."
    ],
    relatedAntibiotics: [
      { name: "Vancomycin", slug: "vancomycin", role: "First-line empiric intravenous therapy; covers MRSA and provides bactericidal synergy against Gram-positive cocci." }
    ],
    differentialDiagnoses: [
      "Uncomplicated Infective Endocarditis (lacks myocardial fluid collections or ECG conduction abnormalities; responds well to antibiotics alone)",
      "Acute Myocarditis (viral or autoimmune; presents with diffuse myocardial inflammation, chest pain, and troponin elevation, but lacks focal abscesses on TEE or positive blood cultures)",
      "Ischemic Heart Block (presents with conduction blocks from myocardial infarction, differentiated by angiogram and lack of infective signs)"
    ],
    faqs: [
      { question: "Why is Transesophageal Echocardiography (TEE) preferred over Transthoracic Echocardiography (TTE) in suspected myocardial abscess?", answer: "The esophagus lies directly behind the left atrium of the heart, allowing high-frequency ultrasound waves to visualize posterior cardiac structures (like the aortic root, posterior valves, and ventricular septum) with incredible spatial resolution, completely unobstructed by lung tissue, ribs, or thick chest walls. TEE has a sensitivity >90% for detecting perivalvular abscesses, compared to <40% for TTE." }
    ],
    relatedDiseases: [
      { name: "Infective Endocarditis", slug: "infective-endocarditis", description: "The primary precursor disease where valvular vegetation spreads locally into the cardiac muscle." },
      { name: "Prosthetic Valve Endocarditis", slug: "prosthetic-valve-endocarditis", description: "Endocarditis of artificial valves, which has a very high rate of complicating ring and myocardial abscesses." }
    ],
    relatedOrganisms: []
  },
  {
    id: "gas-gangrene",
    name: "Gas Gangrene (Clostridial Myonecrosis)",
    slug: "gas-gangrene",
    metaDescription: "Master Gas Gangrene pathophysiology, Clostridium perfringens alpha-toxin, severe crepitus, and surgical/Penicillin treatment.",
    overview: "Gas Gangrene, or Clostridial Myonecrosis, is a hyper-acute, rapidly progressive, and highly lethal anaerobic infection of skeletal muscle, primarily caused by Clostridium perfringens. Triggered by traumatic wounds contaminated with soil, the bacteria secrete highly potent necrotizing toxins (such as alpha-toxin) that destroy cell membranes, causing extensive muscle death (myonecrosis), gas production within tissues, and profound systemic cardiovascular shock.",
    quickFacts: {
      commonPathogens: ["Clostridium perfringens"],
      riskFactors: ["Traumatic crush injuries", "Contaminated surgical wounds (especially after bowel or biliary surgery)", "Compound fractures", "Severe peripheral arterial disease (diabetic ischemic ulcers)"],
      hallmarkSymptoms: ["Sudden, agonizing pain out of proportion to physical findings at the wound site", "Rapidly progressive bronze-to-purplish skin discoloration", "Palpable subcutaneous crepitus (gas bubbles under the skin)", "Bullae containing foul-smelling, dishwater-like fluid", "Severe systemic toxicity (tachycardia, fever, rapid hypotension)"],
      diagnosticApproach: ["Plain radiograph of the extremity (reveals extensive gas dissecting along muscle planes)", "Gram stain of wound exudate (reveals large, blunt-ended, boxcar-shaped Gram-positive rods with a complete absence of neutrophils)"]
    },
    clinicalPresentation: "Presents within 6 to 48 hours of injury with sudden, severe, localized pain. The wound rapidly develops a bronze-colored discoloration, progressing to a dark purple or black necrotic state. Palpation reveals a crackling sensation (crepitus) under the skin. The wound drains a thin, foul-smelling, bloody 'dishwater' fluid, while the patient quickly develops severe tachycardia, high fever, and septic shock.",
    causativePathogens: [
      { name: "Clostridium perfringens", slug: "c-perfringens", role: "Spore-forming, obligate anaerobic Gram-positive rod. Secretes lecithinase (alpha-toxin), which degrades cell membrane phospholipids, causing massive hemolysis, myonecrosis, and tissue destruction." }
    ],
    diagnosticApproach: "The diagnosis is a clinical emergency. X-ray of the affected extremity demonstrating extensive gas bubbles dissecting along fascial and muscular planes is highly specific. A rapid Gram stain of wound fluid showing large, boxcar-shaped Gram-positive rods with a notable absence of white blood cells (due to toxin-induced leukocyte lysis) is diagnostic.",
    treatmentPrinciples: "Treatment is a surgical emergency. Requires immediate, radical surgical debridement of all necrotic muscle tissue (amputation is often required), and initiation of dual bactericidal intravenous therapy with Penicillin G (to kill Clostridium) and Clindamycin (to actively suppress bacterial toxin synthesis). Hyperbaric oxygen therapy can be used as an adjuvant.",
    clinicalPearls: [
      "Board Examination Pearl: In gas gangrene, a wound Gram stain reveals characteristic large, boxcar-shaped, Gram-positive bacilli with a complete absence of inflammatory neutrophils. Neutrophils are absent because clostridial alpha-toxin and perfringolysin O directly lyse host white blood cells.",
      "The characteristic crepitus (crackling) felt on palpation is caused by gas produced during anaerobic bacterial carbohydrate fermentation within the necrotic muscle tissue."
    ],
    relatedAntibiotics: [
      { name: "Penicillin G", slug: "penicillin-g", role: "First-line bactericidal intravenous therapy of choice against Clostridium perfringens." },
      { name: "Clindamycin", slug: "clindamycin", role: "Added as syndromic coverage to inhibit bacterial ribosomes, immediately shutting down the production of lethal clostridial toxins." }
    ],
    differentialDiagnoses: [
      "Necrotizing Fasciitis (presents with severe pain, swelling, and systemic toxicity, but involves subcutaneous tissue and fascia rather than skeletal muscle, and is typically caused by S. pyogenes or polymicrobials)",
      "Severe Cellulitis (presents with erythema and pain, but lacks muscle necrosis, tissue gas, subcutaneous crepitus, or rapid systemic toxicity)",
      "Venous Gas Gangrene (a non-infectious condition caused by gas-producing chemical reactions or mechanical trauma, lacking toxic shock)"
    ],
    faqs: [
      { question: "Why is Clindamycin added to Penicillin in treating gas gangrene?", answer: "While Penicillin G is bactericidal and kills Clostridium perfringens, it does not stop pre-existing or ongoing toxin production from surviving bacteria. Clindamycin is a protein synthesis inhibitor that binds the 50S ribosomal subunit, immediately stopping the synthesis and secretion of lethal alpha-toxin, which is the primary driver of tissue destruction and systemic shock." }
    ],
    relatedDiseases: [
      { name: "Necrotizing Fasciitis", slug: "necrotizing-fasciitis", description: "Rapidly spreading fascial infection presenting with severe pain and localized crepitus." }
    ],
    relatedOrganisms: []
  },
  {
    id: "mastoiditis",
    name: "Mastoiditis",
    slug: "mastoiditis",
    metaDescription: "Master Mastoiditis pathophysiology, complication of untreated Otitis Media, postauricular erythema and tenderness, and surgical/antibiotic therapy.",
    overview: "Mastoiditis is a serious bacterial infection of the mastoid air cells of the temporal bone. Almost universally arising as a direct, suppurative complication of untreated or inadequately treated acute otitis media (AOM), primarily caused by Streptococcus pneumoniae, the infection causes progressive purulent accumulation that destroys the thin bony trabeculae of the mastoid process, presenting with postauricular swelling, erythema, and protrusion of the auricle.",
    quickFacts: {
      commonPathogens: ["Streptococcus pneumoniae", "Streptococcus pyogenes", "Haemophilus influenzae", "Staphylococcus aureus", "Pseudomonas aeruginosa (especially in chronic cases)"],
      riskFactors: ["Untreated or poorly managed acute otitis media", "Young age (<2 years)", "Immunosuppression", "Anatomical abnormalities of the eustachian tube"],
      hallmarkSymptoms: ["Severe, throbbing ear pain (otalgia) and headache", "Postauricular swelling, warmth, and intense tenderness", "Erythema over the mastoid process", "Lateral and downward displacement of the auricle (protruding ear)", "High fever and purulent otorrhea (if tympanic membrane is ruptured)"],
      diagnosticApproach: ["CT scan of the temporal bones (reveals fluid opacification and loss of normal bony mastoid air cell septa/coalescence)", "Otoscopic exam (demonstrates signs of active acute otitis media with a bulging, erythematous tympanic membrane)"]
    },
    clinicalPresentation: "Presents acutely with high fever, severe ear pain, and headache, usually in a young child with a recent history of untreated ear infections. Physical exam is highly characteristic, revealing swelling, redness, and exquisite tenderness directly behind the ear, causing the external ear to protrude outward and downward.",
    causativePathogens: [
      { name: "Streptococcus pneumoniae", slug: "s-pneumoniae", role: "Lancet-shaped Gram-positive diplococcus. The leading cause of acute otitis media and subsequent coalescent mastoiditis." }
    ],
    diagnosticApproach: "The diagnosis is primarily clinical, but suspected cases or those with potential intracranial complications require a high-resolution CT scan of the temporal bones. CT findings include complete fluid opacification of the mastoid air cells and bony destruction of the mastoid trabeculae, known as coalescent mastoiditis.",
    treatmentPrinciples: "Requires immediate admission, intravenous broad-spectrum antibiotics (such as IV Ceftriaxone or Ampicillin-sulbactam), and urgent myringotomy with tympanostomy tube insertion to drain the middle ear cleft. Surgical mastoidectomy is reserved for cases that fail to respond to IV antibiotics or present with subperiosteal or intracranial abscesses.",
    clinicalPearls: [
      "Board Examination Pearl: A pediatric patient presenting with high fever, severe ear pain, and a protruding ear displaced outward and downward with exquisite postauricular tenderness has acute mastoiditis. The definitive imaging step is a high-resolution CT scan of the temporal bones.",
      "Untreated mastoiditis can lead to highly severe complications including subperiosteal abscess (Bezold's abscess if it tracts down the sternocleidomastoid muscle), facial nerve palsy (CN VII runs through the temporal bone), labyrinthitis, meningitis, or sigmoid sinus thrombosis."
    ],
    relatedAntibiotics: [
      { name: "Penicillin G", slug: "penicillin-g", role: "Used in penicillin-susceptible cases; provides targeted Gram-positive coverage." }
    ],
    differentialDiagnoses: [
      "Acute Otitis Externa (presents with severe ear pain and swelling of the external ear canal, but lacks bone destruction on CT, and pain is elicited by pulling on the pinna/tragus)",
      "Postauricular Lymphadenitis (presents with a tender postauricular node but lacks signs of active middle ear infection or bony destruction)",
      "Parotitis (presents with swelling in front of and below the ear, sparing the postauricular space)"
    ],
    faqs: [
      { question: "What is coalescent mastoiditis?", answer: "Coalescent mastoiditis is the advanced stage of mastoiditis where the persistent purulent pressure within the mastoid air cells leads to the resorption and destruction of the thin bony septa that separate the cells. The individual air cells merge into a single large cavity filled with pus, creating a high risk of cortical bone erosion and intracranial spread." }
    ],
    relatedDiseases: [
      { name: "Acute Otitis Media", slug: "acute-otitis-media", description: "The obligate precursor infection of the middle ear space." },
      { name: "Acute Bacterial Meningitis", slug: "acute-bacterial-meningitis", description: "A highly severe intracranial complication arising from direct bony erosion or hematogenous spread." }
    ],
    relatedOrganisms: []
  }
];
