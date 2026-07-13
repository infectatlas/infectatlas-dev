import { microorganismsData, Microorganism } from "../data/microorganisms";
import { fungiData, Fungus } from "../data/fungi";
import { virusesData, Virus } from "../data/viruses";
import { parasitesData, Parasite } from "../data/parasites";
import { diseasesData, Disease } from "../data/diseases";
import { drugsData, Drug } from "../data/drugs";

// Unified Pathogen type wrapping all specialized groups
export type PathogenType = "bacteria" | "fungus" | "virus" | "parasite";

export interface UnifiedPathogen {
  id: string;
  name: string;
  type: PathogenType;
  slug: string;
  description: string;
  category: string; // e.g. "Gram-positive", "Yeast", "DNA", "Protozoa"
  diseases: { id: string; name: string; treatment: string; clinicalPearl?: string }[];
  characteristics: string[];
}

export interface RelatedRecommendation {
  id: string;
  name: string;
  type: "pathogen" | "disease" | "drug" | "comparison" | "treatment-choice";
  slug: string;
  description: string;
  relationshipType: string; // "Directly Causes" | "Primary Choice" | "Shared Pathogen" etc.
  score: number; // Ranking score (higher is higher priority)
  metadata?: any;
}

// Slugs are standard lowercase, non-alphanumeric replaced with hyphens
export const getSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Module-level caches for high-performance graph traversals
let cachedUnifiedPathogens: UnifiedPathogen[] | null = null;
let pathogenMap: Map<string, UnifiedPathogen> | null = null;
let diseaseMap: Map<string, Disease> | null = null;
let drugMap: Map<string, Drug> | null = null;

// Retrieve all pathogens in a unified model
export const getAllUnifiedPathogens = (): UnifiedPathogen[] => {
  if (cachedUnifiedPathogens) {
    return cachedUnifiedPathogens;
  }

  const list: UnifiedPathogen[] = [];

  microorganismsData.forEach((m) => {
    list.push({
      id: m.id,
      name: m.name,
      type: "bacteria",
      slug: getSlug(m.name),
      description: m.description,
      category: m.gramStatus,
      diseases: m.diseases.map(d => ({ id: d.id, name: d.name, treatment: d.treatment, clinicalPearl: d.clinicalPearl })),
      characteristics: m.characteristics
    });
  });

  fungiData.forEach((f) => {
    list.push({
      id: f.id,
      name: f.name,
      type: "fungus",
      slug: getSlug(f.name), // we can fallback or prioritize id/slug
      description: f.description,
      category: f.type,
      diseases: f.diseases.map(d => ({ id: d.id, name: d.name, treatment: d.treatment, clinicalPearl: d.clinicalPearl })),
      characteristics: f.characteristics
    });
  });

  virusesData.forEach((v) => {
    list.push({
      id: v.id,
      name: v.name,
      type: "virus",
      slug: getSlug(v.name),
      description: v.description,
      category: `${v.type} (${v.polarity})`,
      diseases: v.diseases.map(d => ({ id: d.id, name: d.name, treatment: d.treatment, clinicalPearl: d.clinicalPearl })),
      characteristics: v.characteristics
    });
  });

  parasitesData.forEach((p) => {
    list.push({
      id: p.id,
      name: p.name,
      type: "parasite",
      slug: getSlug(p.name),
      description: p.description,
      category: p.type,
      diseases: p.diseases.map(d => ({ id: d.id, name: d.name, treatment: d.treatment, clinicalPearl: d.clinicalPearl })),
      characteristics: p.characteristics
    });
  });

  cachedUnifiedPathogens = list;
  return list;
};

// Find any unified pathogen by ID or slug
export const findUnifiedPathogen = (idOrSlug: string): UnifiedPathogen | undefined => {
  if (!pathogenMap) {
    const pathogens = getAllUnifiedPathogens();
    pathogenMap = new Map();
    pathogens.forEach(p => {
      pathogenMap!.set(p.id.toLowerCase(), p);
      pathogenMap!.set(p.slug.toLowerCase(), p);
      pathogenMap!.set(getSlug(p.name).toLowerCase(), p);
    });
  }
  return pathogenMap.get(idOrSlug.toLowerCase());
};

// Find disease by ID or slug
export const findDisease = (idOrSlug: string): Disease | undefined => {
  if (!diseaseMap) {
    diseaseMap = new Map();
    diseasesData.forEach(d => {
      diseaseMap!.set(d.id.toLowerCase(), d);
      if (d.slug) diseaseMap!.set(d.slug.toLowerCase(), d);
      diseaseMap!.set(getSlug(d.name).toLowerCase(), d);
    });
  }
  return diseaseMap.get(idOrSlug.toLowerCase());
};

// Find drug by ID, name, or slug
export const findDrug = (idOrSlugOrName: string): Drug | undefined => {
  if (!drugMap) {
    drugMap = new Map();
    drugsData.forEach(d => {
      drugMap!.set(d.id.toLowerCase(), d);
      if (d.slug) drugMap!.set(d.slug.toLowerCase(), d);
      drugMap!.set(d.name.toLowerCase().trim(), d);
      drugMap!.set(getSlug(d.name).toLowerCase(), d);
    });
  }
  return drugMap.get(idOrSlugOrName.toLowerCase().trim());
};

// Central Recommendation Engine
export const getRecommendations = (
  entityType: "pathogen" | "disease" | "drug",
  idOrSlug: string
): RelatedRecommendation[] => {
  const recs: RelatedRecommendation[] = [];
  const pathogens = getAllUnifiedPathogens();

  if (entityType === "pathogen") {
    const current = findUnifiedPathogen(idOrSlug);
    if (!current) return [];

    // 1. Direct diseases (Priority 1)
    current.diseases.forEach((disRelation) => {
      const disNode = findDisease(disRelation.id) || findDisease(disRelation.name);
      if (disNode) {
        recs.push({
          id: disNode.id,
          name: disNode.name,
          type: "disease",
          slug: disNode.slug,
          description: disNode.overview,
          relationshipType: "Direct Pathology",
          score: 100,
        });
      }
    });

    // 2. Direct drugs (Priority 1)
    drugsData.forEach((drug) => {
      const matchesPathogen = drug.relatedPathogens.some(
        rp => rp.id === current.id || rp.name.toLowerCase() === current.name.toLowerCase()
      );
      if (matchesPathogen) {
        recs.push({
          id: drug.id,
          name: drug.name,
          type: "drug",
          slug: drug.slug,
          description: `Class: ${drug.drugClass}. Spectrum: ${drug.spectrumOfActivity.slice(0, 2).join(", ")}`,
          relationshipType: "Definitive Pharmacotherapy",
          score: 95,
        });
      }
    });

    // 3. Shared category pathogens (Priority 3) - e.g. same Gram-stain, type, or morphology
    pathogens.forEach((p) => {
      if (p.id !== current.id && p.category === current.category && p.type === current.type) {
        recs.push({
          id: p.id,
          name: p.name,
          type: "pathogen",
          slug: p.slug,
          description: p.description,
          relationshipType: `Comparative Classmate (${current.category})`,
          score: 70,
        });
      }
    });

    // 4. Shared disease pathogens (Priority 2) - other pathogens that cause the same diseases
    const diseaseNames = current.diseases.map(d => d.name.toLowerCase());
    pathogens.forEach((p) => {
      if (p.id !== current.id) {
        const commonDiseases = p.diseases.filter(d => diseaseNames.includes(d.name.toLowerCase()));
        if (commonDiseases.length > 0) {
          recs.push({
            id: p.id,
            name: p.name,
            type: "pathogen",
            slug: p.slug,
            description: `Also causes: ${commonDiseases.map(cd => cd.name).join(", ")}. ${p.description}`,
            relationshipType: `Shared Disease Competitor`,
            score: 80 + commonDiseases.length * 2,
          });
        }
      }
    });
  } 

  else if (entityType === "disease") {
    const current = findDisease(idOrSlug);
    if (!current) return [];

    // 1. Direct pathogens (Priority 1)
    current.relatedOrganisms.forEach((ro) => {
      const pathNode = findUnifiedPathogen(ro.name) || findUnifiedPathogen(ro.slug);
      if (pathNode) {
        recs.push({
          id: pathNode.id,
          name: pathNode.name,
          type: "pathogen",
          slug: pathNode.slug,
          description: pathNode.description,
          relationshipType: "Primary Etiological Pathogen",
          score: 100,
        });
      }
    });

    // 2. Direct drugs (Priority 1)
    current.relatedAntibiotics.forEach((ab) => {
      const drugNode = findDrug(ab.name);
      if (drugNode) {
        recs.push({
          id: drugNode.id,
          name: drugNode.name,
          type: "drug",
          slug: drugNode.slug,
          description: `Class: ${drugNode.drugClass}. Role: ${ab.role}`,
          relationshipType: "Empirical Pharmacotherapy",
          score: 95,
        });
      }
    });

    // 3. Shared pathogens diseases (Priority 2) - other diseases caused by the same pathogens
    const pathogenNames = current.relatedOrganisms.map(o => o.name.toLowerCase());
    diseasesData.forEach((dis) => {
      if (dis.id !== current.id) {
        const commonPathogens = dis.relatedOrganisms.filter(o => pathogenNames.includes(o.name.toLowerCase()));
        if (commonPathogens.length > 0) {
          recs.push({
            id: dis.id,
            name: dis.name,
            type: "disease",
            slug: dis.slug,
            description: dis.overview,
            relationshipType: `Synergistic Differential Diagnosis`,
            score: 80 + commonPathogens.length * 5,
          });
        }
      }
    });

    // 4. Comparative pathologies (Priority 1) - explicitly listed by authors
    current.relatedDiseases.forEach((rd) => {
      const disNode = findDisease(rd.slug) || findDisease(rd.name);
      if (disNode) {
        recs.push({
          id: disNode.id,
          name: disNode.name,
          type: "disease",
          slug: disNode.slug,
          description: disNode.overview,
          relationshipType: "Comparative Pathology Link",
          score: 90,
        });
      }
    });
  } 

  else if (entityType === "drug") {
    const current = findDrug(idOrSlug);
    if (!current) return [];

    // 1. Direct pathogens (Priority 1)
    current.relatedPathogens.forEach((rp) => {
      const pathNode = findUnifiedPathogen(rp.id) || findUnifiedPathogen(rp.name);
      if (pathNode) {
        recs.push({
          id: pathNode.id,
          name: pathNode.name,
          type: "pathogen",
          slug: pathNode.slug,
          description: pathNode.description,
          relationshipType: `Susceptible Target (${rp.relation})`,
          score: 100,
        });
      }
    });

    // 2. Direct diseases (Priority 1)
    current.relatedDiseases.forEach((rd) => {
      const disNode = findDisease(rd.id) || findDisease(rd.name);
      if (disNode) {
        recs.push({
          id: disNode.id,
          name: disNode.name,
          type: "disease",
          slug: disNode.slug,
          description: disNode.overview,
          relationshipType: `Guideline Indication (${rd.relation})`,
          score: 95,
        });
      }
    });

    // 3. Shared class drugs (Priority 3)
    drugsData.forEach((d) => {
      if (d.id !== current.id && d.drugClass === current.drugClass) {
        recs.push({
          id: d.id,
          name: d.name,
          type: "drug",
          slug: d.slug,
          description: `MoA: ${d.mechanismOfAction.slice(0, 80)}...`,
          relationshipType: `Same Pharmacological Class (${current.drugClass})`,
          score: 75,
        });
      }
    });

    // 4. Shared target drugs (Priority 2) - other drugs treating similar diseases
    const targetDiseaseIds = current.relatedDiseases.map(d => d.id.toLowerCase());
    drugsData.forEach((d) => {
      if (d.id !== current.id) {
        const commonDiseases = d.relatedDiseases.filter(rd => targetDiseaseIds.includes(rd.id.toLowerCase()));
        if (commonDiseases.length > 0) {
          recs.push({
            id: d.id,
            name: d.name,
            type: "drug",
            slug: d.slug,
            description: `Also targets: ${commonDiseases.map(cd => cd.name).join(", ")}`,
            relationshipType: `Clinical Alternative Option`,
            score: 85 + commonDiseases.length * 3,
          });
        }
      }
    });
  }

  // Filter out duplicates (keep highest score), sort descending, slice to 3-6 (we prefer 4)
  const uniqueRecs: Record<string, RelatedRecommendation> = {};
  recs.forEach((rec) => {
    const key = `${rec.type}_${rec.id}`;
    if (!uniqueRecs[key] || uniqueRecs[key].score < rec.score) {
      uniqueRecs[key] = rec;
    }
  });

  return Object.values(uniqueRecs)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
};

// Intelligent Learning Path Generator (Phase 3F)
// Generates a smart study progression: e.g. [Current Entity] -> [Next logical Step] -> [Alternative Comparison]
export const getIntelligentLearningPath = (
  entityType: "pathogen" | "disease" | "drug",
  idOrSlug: string
): RelatedRecommendation[] => {
  const steps: RelatedRecommendation[] = [];
  const currentPathogen = entityType === "pathogen" ? findUnifiedPathogen(idOrSlug) : null;
  const currentDisease = entityType === "disease" ? findDisease(idOrSlug) : null;
  const currentDrug = entityType === "drug" ? findDrug(idOrSlug) : null;

  if (currentPathogen) {
    // Pathogen progression path: Pathogen -> Primary Disease it causes -> First-line Drug for that disease
    const primaryDiseaseRel = currentPathogen.diseases[0];
    if (primaryDiseaseRel) {
      const disNode = findDisease(primaryDiseaseRel.id) || findDisease(primaryDiseaseRel.name);
      if (disNode) {
        steps.push({
          id: disNode.id,
          name: disNode.name,
          type: "disease",
          slug: disNode.slug,
          description: disNode.overview,
          relationshipType: "Step 1: Clinical Pathology Manifestation",
          score: 100
        });

        const primaryDrugRel = disNode.relatedAntibiotics[0];
        if (primaryDrugRel) {
          const drugNode = findDrug(primaryDrugRel.name);
          if (drugNode) {
            steps.push({
              id: drugNode.id,
              name: drugNode.name,
              type: "drug",
              slug: drugNode.slug,
              description: drugNode.mechanismOfAction,
              relationshipType: "Step 2: Empirical Target Pharmacotherapy",
              score: 90
            });
          }
        }
      }
    }

    // Add a comparative pathogen
    const classMates = getAllUnifiedPathogens().filter(p => p.id !== currentPathogen.id && p.category === currentPathogen.category);
    if (classMates.length > 0) {
      steps.push({
        id: classMates[0].id,
        name: classMates[0].name,
        type: "pathogen",
        slug: classMates[0].slug,
        description: classMates[0].description,
        relationshipType: "Step 3: Comparative Diagnostic Differential",
        score: 80
      });
    }
  } 
  
  else if (currentDisease) {
    // Disease progression path: Disease -> Main causing pathogen -> First-line drug
    const primaryPathogenRel = currentDisease.relatedOrganisms[0];
    if (primaryPathogenRel) {
      const pathNode = findUnifiedPathogen(primaryPathogenRel.name) || findUnifiedPathogen(primaryPathogenRel.slug);
      if (pathNode) {
        steps.push({
          id: pathNode.id,
          name: pathNode.name,
          type: "pathogen",
          slug: pathNode.slug,
          description: pathNode.description,
          relationshipType: "Step 1: Etiological Pathogen Microbiology",
          score: 100
        });
      }
    }

    const primaryDrugRel = currentDisease.relatedAntibiotics[0];
    if (primaryDrugRel) {
      const drugNode = findDrug(primaryDrugRel.name);
      if (drugNode) {
        steps.push({
          id: drugNode.id,
          name: drugNode.name,
          type: "drug",
          slug: drugNode.slug,
          description: drugNode.mechanismOfAction,
          relationshipType: "Step 2: Guideline-Aligned Pharmacotherapy",
          score: 90
        });
      }
    }

    // Next disease in the related list
    const compDiseaseRel = currentDisease.relatedDiseases[0];
    if (compDiseaseRel) {
      const compNode = findDisease(compDiseaseRel.slug) || findDisease(compDiseaseRel.name);
      if (compNode) {
        steps.push({
          id: compNode.id,
          name: compNode.name,
          type: "disease",
          slug: compNode.slug,
          description: compNode.overview,
          relationshipType: "Step 3: Differential Diagnosis Comparison",
          score: 80
        });
      }
    }
  } 
  
  else if (currentDrug) {
    // Drug progression path: Drug -> Main targeted pathogen -> Main disease caused by that pathogen
    const primaryPathogenRel = currentDrug.relatedPathogens[0];
    if (primaryPathogenRel) {
      const pathNode = findUnifiedPathogen(primaryPathogenRel.id) || findUnifiedPathogen(primaryPathogenRel.name);
      if (pathNode) {
        steps.push({
          id: pathNode.id,
          name: pathNode.name,
          type: "pathogen",
          slug: pathNode.slug,
          description: pathNode.description,
          relationshipType: "Step 1: Primary Microbiological Spectrum",
          score: 100
        });

        if (pathNode.diseases[0]) {
          const disNode = findDisease(pathNode.diseases[0].id) || findDisease(pathNode.diseases[0].name);
          if (disNode) {
            steps.push({
              id: disNode.id,
              name: disNode.name,
              type: "disease",
              slug: disNode.slug,
              description: disNode.overview,
              relationshipType: "Step 2: Targeted Disease Pathology",
              score: 90
            });
          }
        }
      }
    }

    // Alternative drug in the same class
    const classAlternatives = drugsData.filter(d => d.id !== currentDrug.id && d.drugClass === currentDrug.drugClass);
    if (classAlternatives.length > 0) {
      steps.push({
        id: classAlternatives[0].id,
        name: classAlternatives[0].name,
        type: "drug",
        slug: classAlternatives[0].slug,
        description: classAlternatives[0].mechanismOfAction,
        relationshipType: "Step 3: Pharmacological Alternative",
        score: 80
      });
    }
  }

  return steps.slice(0, 3);
};

// Study History-Driven "Continue Learning" & "Students Also Study" Generator (Phase 3F)
export const getHistoryBasedRecommendations = (
  questionsPerPathogen: Record<string, { correct: number; incorrect: number }> = {},
  limit: number = 3
): RelatedRecommendation[] => {
  const recs: RelatedRecommendation[] = [];
  const pathogens = getAllUnifiedPathogens();

  // Find pathogens with answered questions
  const studiedPathogenIds = Object.keys(questionsPerPathogen);

  if (studiedPathogenIds.length === 0) {
    // Fallback: Recommend high-yield core pathogens if history is blank
    const fallbacks = ["s-aureus", "e-coli", "c-difficile", "p-aeruginosa"];
    fallbacks.forEach((id) => {
      const p = findUnifiedPathogen(id);
      if (p) {
        recs.push({
          id: p.id,
          name: p.name,
          type: "pathogen",
          slug: p.slug,
          description: p.description,
          relationshipType: "Popular Core Pathogen",
          score: 100
        });
      }
    });
  } else {
    // 1. Weakest studied pathogens (Priority 1) - accuracy < 70%
    studiedPathogenIds.forEach((id) => {
      const stats = questionsPerPathogen[id];
      const total = stats.correct + stats.incorrect;
      if (total > 0) {
        const accuracy = stats.correct / total;
        if (accuracy < 0.7) {
          const p = findUnifiedPathogen(id);
          if (p) {
            recs.push({
              id: p.id,
              name: p.name,
              type: "pathogen",
              slug: p.slug,
              description: `Last accuracy: ${Math.round(accuracy * 100)}%. Requires additional retention practice.`,
              relationshipType: "Weak Category Review",
              score: 95 + (1 - accuracy) * 10
            });
          }
        }
      }
    });

    // 2. Recommend connected elements of successfully studied pathogens
    studiedPathogenIds.forEach((id) => {
      const p = findUnifiedPathogen(id);
      if (p) {
        // Recommend a disease caused by it
        const firstDiseaseRel = p.diseases[0];
        if (firstDiseaseRel) {
          const dis = findDisease(firstDiseaseRel.id) || findDisease(firstDiseaseRel.name);
          if (dis) {
            recs.push({
              id: dis.id,
              name: dis.name,
              type: "disease",
              slug: dis.slug,
              description: dis.overview,
              relationshipType: `Next Progression from ${p.name}`,
              score: 85
            });
          }
        }
      }
    });
  }

  // Deduplicate and filter out already fully mastered if possible
  const uniqueRecs: Record<string, RelatedRecommendation> = {};
  recs.forEach((rec) => {
    const key = `${rec.type}_${rec.id}`;
    if (!uniqueRecs[key] || uniqueRecs[key].score < rec.score) {
      uniqueRecs[key] = rec;
    }
  });

  return Object.values(uniqueRecs)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
