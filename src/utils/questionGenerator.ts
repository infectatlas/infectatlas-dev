import { Microorganism, microorganismsData, DiseaseTreatment } from "../data/microorganisms";
import { Question } from "../types";

// Helper to shuffle arrays
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Get standard distractors for Gram, Shape, Arrangement
const ALL_GRAM_STATUSES = ["Gram-positive", "Gram-negative", "Acid-fast", "No Cell Wall", "Spirochete", "Gram-variable"];
const ALL_SHAPES = ["Cocci", "Rods", "Coccobacillus", "Diplococci", "Curved rods", "Branching rods", "Spirochetes", "Pleomorphic rods", "Pleomorphic"];
const ALL_ARRANGEMENTS = ["Clusters", "Chains", "Pairs", "Lancet-shaped pairs", "None", "Diplococci", "Chains with medusa-head borders"];

/**
 * Deterministically generates a pool of active recall questions for the specified pathogen IDs.
 */
export function generateQuestionPool(pathogenIds: string[]): Question[] {
  const targetIds = pathogenIds.length > 0 ? new Set(pathogenIds) : null;
  const targetMicrobes = targetIds 
    ? microorganismsData.filter(m => targetIds.has(m.id))
    : microorganismsData;

  const pool: Question[] = [];

  targetMicrobes.forEach(m => {
    const microbeName = m.name;

    // --- EASY DIFFICULTY: CLASSIFICATION, MORPHOLOGY, MOLECULAR CHARACTERS ---

    // 1. Gram Stain MCQ
    pool.push({
      id: `${m.id}-gram`,
      organism: m.id,
      difficulty: "easy",
      type: "mcq",
      topic: "classification",
      prompt: `What is the Gram staining status of ${microbeName}?`,
      options: shuffle([
        m.gramStatus,
        ...shuffle(ALL_GRAM_STATUSES.filter(g => g !== m.gramStatus)).slice(0, 3)
      ]),
      correctAnswer: m.gramStatus,
      explanation: `${microbeName} is classified as ${m.gramStatus}.`
    });

    // 2. Shape MCQ
    pool.push({
      id: `${m.id}-shape`,
      organism: m.id,
      difficulty: "easy",
      type: "mcq",
      topic: "classification",
      prompt: `Which cellular shape and structure best describes ${microbeName}?`,
      options: shuffle([
        m.shape,
        ...shuffle(ALL_SHAPES.filter(s => s !== m.shape)).slice(0, 3)
      ]),
      correctAnswer: m.shape,
      explanation: `${microbeName} has cellular morphology of ${m.shape}.`
    });

    // 3. Arrangement MCQ (if arrangement is substantial)
    if (m.arrangement && m.arrangement !== "None") {
      pool.push({
        id: `${m.id}-arrangement`,
        organism: m.id,
        difficulty: "easy",
        type: "mcq",
        topic: "classification",
        prompt: `What characteristic micro-cellular arrangement is typically observed for ${microbeName}?`,
        options: shuffle([
          m.arrangement,
          ...shuffle(ALL_ARRANGEMENTS.filter(a => a !== m.arrangement)).slice(0, 3)
        ]),
        correctAnswer: m.arrangement,
        explanation: `${microbeName} is typically seen aggregated or aligned as ${m.arrangement}.`
      });
    }

    // 4. Biochemical characteristics (True/False or MCQ)
    if (m.characteristics && m.characteristics.length > 0) {
      const correctChar = m.characteristics[0];
      pool.push({
        id: `${m.id}-char-tf`,
        organism: m.id,
        difficulty: "easy",
        type: "true_false",
        topic: "diagnostics",
        prompt: `True or False: ${microbeName} is typically characterized as being ${correctChar}.`,
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: `Yes, ${microbeName} is known to be ${correctChar}. Important biochemical and culture characteristics include: ${m.characteristics.join(", ")}.`
      });

      // Gather a biochemical trait from a different genus as false distractor
      const otherMicrobes = microorganismsData.filter(other => other.id !== m.id);
      const otherChars = otherMicrobes.flatMap(other => other.characteristics || [])
        .filter(c => !m.characteristics.includes(c));
      
      if (otherChars.length > 0) {
        const falseChar = shuffle(otherChars)[0];
        pool.push({
          id: `${m.id}-char-tf-false`,
          organism: m.id,
          difficulty: "easy",
          type: "true_false",
          topic: "diagnostics",
          prompt: `True or False: ${microbeName} typically presents as ${falseChar}.`,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: `No, ${microbeName} is NOT characterized as ${falseChar}. Its primary characteristics are: ${m.characteristics.join(", ")}.`
        });
      }
    }


    // --- MEDIUM DIFFICULTY: CLINICAL DISEASE & DIAGNOSTICS & RESISTANCE ---

    // 5. Classic Disease association MCQ
    if (m.diseases && m.diseases.length > 0) {
      const positiveDisease = m.diseases[0];
      const otherDiseaseNames = microorganismsData
        .filter(other => other.id !== m.id)
        .flatMap(other => other.diseases || [])
        .map(d => d.name)
        .filter(name => !m.diseases.some(d => d.name === name));
      
      if (otherDiseaseNames.length >= 3) {
        pool.push({
          id: `${m.id}-disease`,
          organism: m.id,
          difficulty: "medium",
          type: "mcq",
          topic: "clinical",
          prompt: `Which of the following clinical conditions or pathologies is most strongly associated with ${microbeName}?`,
          options: shuffle([
            positiveDisease.name,
            ...shuffle(Array.from(new Set(otherDiseaseNames))).slice(0, 3)
          ]),
          correctAnswer: positiveDisease.name,
          explanation: `${microbeName} is a well-established cause of ${positiveDisease.name}.`
        });
      }
    }

    // 6. Specific High-Yield Diagnostics MCQ
    if (m.id === "s-aureus") {
      pool.push({
        id: `${m.id}-diag-specific`,
        organism: m.id,
        difficulty: "medium",
        type: "mcq",
        topic: "diagnostics",
        prompt: `How is Staphylococcus aureus distinguished from other common Staphylococci such as S. epidermidis and S. saprophyticus?`,
        options: shuffle([
          "Coagulase positivity",
          "Novobiocin resistance",
          "Catalase positivity",
          "Bacitracin sensitivity"
        ]),
        correctAnswer: "Coagulase positivity",
        explanation: "Staphylococcus aureus is coagulase-positive ('coag-positive'), while S. epidermidis and S. saprophyticus are coagulase-negative Staphylococci (CoNS)."
      });
    } else if (m.id === "s-pneumoniae") {
      pool.push({
        id: `${m.id}-diag-specific`,
        organism: m.id,
        difficulty: "medium",
        type: "mcq",
        topic: "diagnostics",
        prompt: `Which diagnostic and susceptibility features differentiate Streptococcus pneumoniae from other alpha-hemolytic streptococci (e.g., Viridans)?`,
        options: shuffle([
          "Optochin-sensitive and bile-soluble",
          "Optochin-resistant and bile-insoluble",
          "Novobiocin susceptibility",
          "Bacitracin sensitivity and PYR positivity"
        ]),
        correctAnswer: "Optochin-sensitive and bile-soluble",
        explanation: "Streptococcus pneumoniae is classically optochin-sensitive and bile-soluble, whereas Viridans streptococci are optochin-resistant and bile-insoluble."
      });
    } else if (m.id === "s-pyogenes") {
      pool.push({
        id: `${m.id}-diag-specific`,
        organism: m.id,
        difficulty: "medium",
        type: "mcq",
        topic: "diagnostics",
        prompt: `What rapid and lab criteria are essential for diagnosing Streptococcus pyogenes (Group A Strep)?`,
        options: shuffle([
          "Bacitracin-sensitive and PYR-positive",
          "Optochin-sensitive and bile-soluble",
          "Novobiocin-resistant and catalase-negative",
          "Coagulase-positive and beta-hemolytic"
        ]),
        correctAnswer: "Bacitracin-sensitive and PYR-positive",
        explanation: "Streptococcus pyogenes (Group A Beta-hemolytic Streptococcus) is uniquely bacitracin-sensitive and PYR-positive."
      });
    }

    // 7. Resistance Mechanisms MCQ
    if (m.id === "s-aureus") {
      pool.push({
        id: `${m.id}-resistance-specific`,
        organism: m.id,
        difficulty: "medium",
        type: "mcq",
        topic: "resistance",
        prompt: `What is the primary genetic and biochemical mechanism behind Methicillin Resistance in S. aureus (MRSA)?`,
        options: shuffle([
          "Acquisition of the mecA gene, which encodes altered penicillin-binding protein PBP2a with low affinity for beta-lactams",
          "Plasmid-mediated production of TEM-1 beta-lactamase that hydrolyzes penicillins",
          "Alteration of D-Ala-D-Ala peptidoglycan terminal precursors to D-Ala-D-Lac",
          "Active extrusion of beta-lactams via plasmid-borne multi-drug efflux pumps"
        ]),
        correctAnswer: "Acquisition of the mecA gene, which encodes altered penicillin-binding protein PBP2a with low affinity for beta-lactams",
        explanation: "MRSA is driven by the mecA gene on the SCCmec cassette, which encodes PBP2a. It does not bind beta-lactams well, enabling cell wall synthesis even in the presence of methicillin/nafcillin."
      });
    } else if (m.id === "e-faecium" || m.id === "e-faecalis" || m.name.toLowerCase().includes("enterococcus")) {
      pool.push({
        id: `${m.id}-resistance-specific`,
        organism: m.id,
        difficulty: "medium",
        type: "mcq",
        topic: "resistance",
        prompt: `What alteration confers Vancomycin Resistance (VRE) in Enterococci?`,
        options: shuffle([
          "Modification of peptidoglycan cell wall cell-endings from D-Ala-D-Ala to D-Ala-D-Lac",
          "Production of metallo-beta-lactamase enzymes that hydrolyze glycopeptides",
          "Upregulated chromosomal drug efflux pumps targeting glycopeptides",
          "Mutational bypass of PBP4 leading to thin peptidoglycan cell walls"
        ]),
        correctAnswer: "Modification of peptidoglycan cell wall cell-endings from D-Ala-D-Ala to D-Ala-D-Lac",
        explanation: "VRE is mediated by vanA/vanB genes which change the D-Ala-D-Ala sequence of peptidoglycan precursors to D-Ala-D-Lac, preventing vancomycin binding."
      });
    } else if (m.id === "k-pneumoniae" || m.id === "e-coli" || m.name.toLowerCase().includes("klebsiella")) {
      pool.push({
        id: `${m.id}-resistance-specific`,
        organism: m.id,
        difficulty: "medium",
        type: "mcq",
        topic: "resistance",
        prompt: `What resistance mechanism classifies Extended-Spectrum Beta-Lactamases (ESBL) in gram-negative rods?`,
        options: shuffle([
          "Plasmid-mediated enzymes degrading penicillins and cephalosporins up to 3rd/4th generation, treated by carbapenems",
          "Enzymatic phosphorylation and inactivation of aminoglycosides",
          "Mutation of DNA gyrase subunit A preventing fluoroquinolone binding",
          "Target site methylation of ribosomal subunits preventing macrolide action"
        ]),
        correctAnswer: "Plasmid-mediated enzymes degrading penicillins and cephalosporins up to 3rd/4th generation, treated by carbapenems",
        explanation: "ESBLs are plasmid-borne enzymes that disable most penicillins, cephalosporins, and monobactams. Carbapenems remain the definitive treatment option of choice."
      });
    } else if (m.id === "p-aeruginosa" || m.name.includes("Pseudomonas")) {
      pool.push({
        id: `${m.id}-resistance-specific`,
        organism: m.id,
        difficulty: "medium",
        type: "mcq",
        topic: "resistance",
        prompt: `Which mechanism is a frequent cause of multi-drug resistance in Pseudomonas aeruginosa?`,
        options: shuffle([
          "Combined action of low outer membrane permeability, inducible AmpC beta-lactamase, and active MexAB-OprM efflux pumps",
          "Constitutive methylation of 16S rRNA molecules preventing aminoglycoside action",
          "Alteration of ribosomal binding targets via gyrB mutational drift",
          "Presence of standard vanC cell wall terminal substitutions"
        ]),
        correctAnswer: "Combined action of low outer membrane permeability, inducible AmpC beta-lactamase, and active MexAB-OprM efflux pumps",
        explanation: "Pseudomonas aeruginosa has high intrinsic resistance due to highly restrictive outer membrane porins, an inducible AmpC carbapenemase/beta-lactamase, and several dynamic multi-drug active efflux systems."
      });
    }


    // --- HARD DIFFICULTY: THERAPEUTICS & MULTI-OBJECTIVE CLINICAL VIGNETTES ---

    // 8. Therapeutics: Organism × Disease × Treatment level (Critically solves the single-treatment trap!)
    if (m.diseases && m.diseases.length > 0) {
      m.diseases.forEach(d => {
        // Collect other disease treatments from the SAME microbe
        const siblingTreatments = m.diseases
          .filter(sibling => sibling.id !== d.id)
          .map(sibling => `${sibling.treatment} (${sibling.route})`);

        // Collect general treatments from other pathogens
        const unrelatedTreatments = microorganismsData
          .filter(other => other.id !== m.id)
          .flatMap(other => other.diseases || [])
          .map(otherD => `${otherD.treatment} (${otherD.route})`);

        // Create options containing sibling therapies (crucial distractor for organ-specific therapy) and other therapies
        const distinctSiblingTreatments = Array.from(new Set(siblingTreatments)).slice(0, 2);
        const distinctUnrelatedTreatments = Array.from(new Set(unrelatedTreatments)).filter(t => !distinctSiblingTreatments.includes(t));
        
        const correctAnswerString = `${d.treatment} (${d.route})`;

        const options = shuffle([
          correctAnswerString,
          ...shuffle(distinctSiblingTreatments).slice(0, 2),
          ...shuffle(distinctUnrelatedTreatments).slice(0, 3)
        ]).filter(item => item !== undefined).slice(0, 4);

        // Ensure correct answer is always present
        if (!options.includes(correctAnswerString)) {
          options[Math.floor(Math.random() * options.length)] = correctAnswerString;
        }

        pool.push({
          id: `${m.id}-tx-${d.id}`,
          organism: m.id,
          difficulty: "hard",
          type: "mcq",
          topic: "treatment",
          prompt: `A patient is diagnosed with ${d.name} secondary to a confirmed ${microbeName} infection. What is the preferred first-line therapeutic regimen and administration route?`,
          options: options,
          correctAnswer: correctAnswerString,
          explanation: `For ${microbeName} presenting as ${d.name}, the clinical standard of care is ${d.treatment} administered via the ${d.route} route. Clinical Pearl: ${d.clinicalPearl || "Always check localized epidemiological resistance characteristics."}`
        });
      });
    }

    // 9. Multi-select on Key characteristics 
    if (m.characteristics && m.characteristics.length >= 2) {
      const positiveTraits = [...m.characteristics.slice(0, 2), m.gramStatus, m.shape];
      const otherMicrobeTraits = microorganismsData
        .filter(other => other.id !== m.id)
        .flatMap(other => other.characteristics || [])
        .filter(trait => !m.characteristics.includes(trait));

      const negativeTraits = shuffle(Array.from(new Set(otherMicrobeTraits))).slice(0, 3);
      const options = shuffle([...positiveTraits, ...negativeTraits]);

      pool.push({
        id: `${m.id}-multiselect`,
        organism: m.id,
        difficulty: "hard",
        type: "multi_select",
        topic: "diagnostics",
        prompt: `Select ALL characteristics, cellular structures, or laboratory indicators that apply to ${microbeName}:`,
        options: options,
        correctAnswer: positiveTraits,
        explanation: `${microbeName} is characterized by: ${positiveTraits.join(", ")}. Distractors included: ${negativeTraits.join(", ")}.`
      });
    }

    // 10. Clinical Vignette (Deterministic Template based on Pathology target)
    if (m.diseases && m.diseases.length > 0) {
      m.diseases.forEach(d => {
        // Build robust deterministic clues
        const charClues = m.characteristics.length > 0 
          ? `Biochemical assays indicate that the isolate is ${m.characteristics.slice(0, 2).join(" and ")}.`
          : "";

        const routeText = d.route === "PO" ? "oral outpatient therapy" : "intravenous inpatient therapy";
        const promptVignette = `A patient presents with signs and symptoms consistent with ${d.name}. Clinical evaluation demonstrates noteworthy pathology, and the attending team orders local microscopic staining. Lab culture shows ${m.gramStatus.toLowerCase()} cells exhibiting a ${m.shape.toLowerCase()} appearance arranged primarily in ${m.arrangement && m.arrangement !== "None" ? m.arrangement.toLowerCase() : "the typical arrangement"}. ${charClues} The clinical pearl associated with this presentation states: "${d.clinicalPearl || "Preferred drug choice hinges on resistance profile."}"`;

        // Two types of vignettes: Therapeutic goal (what treatment) or Diagnostic goal (what pathogen)
        const isTxVignette = Math.random() > 0.5;

        if (isTxVignette) {
          // Asks for treatment
          const curTx = `${d.treatment} (${d.route})`;
          const unrelatedTreatments = microorganismsData
            .filter(other => other.id !== m.id)
            .flatMap(other => other.diseases || [])
            .map(otherD => `${otherD.treatment} (${otherD.route})`);

          const options = shuffle([
            curTx,
            ...shuffle(Array.from(new Set(unrelatedTreatments))).slice(0, 3)
          ]);

          pool.push({
            id: `${m.id}-vignette-tx-${d.id}`,
            organism: m.id,
            difficulty: "hard",
            type: "vignette",
            topic: "treatment",
            prompt: `${promptVignette}\n\nWhich of the following represents the most appropriate initial agent and route?`,
            options: options,
            correctAnswer: curTx,
            explanation: `The presentation details match ${microbeName} causing ${d.name}. The optimal agent is ${d.treatment} via ${d.route}.`
          });
        } else {
          // Asks for Pathogen
          const siblingOrganisms = microorganismsData
            .filter(other => other.id !== m.id && other.gramStatus === m.gramStatus)
            .map(other => other.name);

          const otherOrganisms = microorganismsData
            .filter(other => other.id !== m.id && other.gramStatus !== m.gramStatus)
            .map(other => other.name);

          const options = shuffle([
            microbeName,
            ...shuffle(siblingOrganisms).slice(0, 2),
            ...shuffle(otherOrganisms).slice(0,1)
          ]).slice(0, 4);

          if (!options.includes(microbeName)) {
            options[0] = microbeName;
          }

          pool.push({
            id: `${m.id}-vignette-pathogen-${d.id}`,
            organism: m.id,
            difficulty: "hard",
            type: "vignette",
            topic: "clinical",
            prompt: `${promptVignette}\n\nWhat is the most likely causative pathogen?`,
            options: shuffle(options),
            correctAnswer: microbeName,
            explanation: `This scenario describes a classic case of ${d.name} caused by ${microbeName}. Laboratory criteria (${m.gramStatus}, ${m.shape}, ${m.characteristics.slice(0,2).join(", ")}) confirm the diagnosis.`
          });
        }
      });
    }
  });

  return shuffle(pool);
}
