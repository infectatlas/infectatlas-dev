import { microorganismsData, Microorganism } from "../data/microorganisms";
import { virusesData, Virus } from "../data/viruses";
import { fungiData, Fungus } from "../data/fungi";
import { parasitesData, Parasite } from "../data/parasites";

export type AnyOrganism = Microorganism | Virus | Fungus | Parasite;

const allOrganisms: AnyOrganism[] = [
  ...microorganismsData,
  ...virusesData,
  ...fungiData,
  ...parasitesData
];

export const getOrganismSlug = (organism: { name: string }): string => {
  return organism.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

const findMatchingOrganism = (
  organism: { name: string; id?: string },
  dataset: AnyOrganism[]
): AnyOrganism | undefined => {
  // Try direct referential equality first
  let found = dataset.find(item => item === organism);
  if (found) return found;

  // Try by ID matching
  if (organism.id) {
    found = dataset.find(item => item.id === organism.id);
    if (found) return found;
  }

  const inputNameLower = organism.name.toLowerCase();
  const inputSlug = getOrganismSlug(organism);

  // Try exact slug or exact name match
  found = dataset.find(
    item => getOrganismSlug(item) === inputSlug || item.name.toLowerCase() === inputNameLower
  );
  if (found) return found;

  // Try partial name/slug matching (e.g. "Epstein-Barr virus" matching "Epstein-Barr Virus (EBV)")
  found = dataset.find(item => {
    const itemNameLower = item.name.toLowerCase();
    const itemSlug = getOrganismSlug(item);
    return (
      itemNameLower.includes(inputNameLower) ||
      inputNameLower.includes(itemNameLower) ||
      itemSlug.includes(inputSlug) ||
      inputSlug.includes(itemSlug)
    );
  });
  if (found) return found;

  return undefined;
};

export const getOrganismCanonicalUrl = (organism: { name: string; id?: string }): string => {
  // Determine dataset membership
  const matchedFungus = findMatchingOrganism(organism, fungiData);
  if (matchedFungus) {
    return `/fungi/${getOrganismSlug(matchedFungus)}`;
  }
  
  const matchedVirus = findMatchingOrganism(organism, virusesData);
  if (matchedVirus) {
    return `/viruses/${getOrganismSlug(matchedVirus)}`;
  }
  
  const matchedParasite = findMatchingOrganism(organism, parasitesData);
  if (matchedParasite) {
    return `/parasites/${getOrganismSlug(matchedParasite)}`;
  }
  
  const matchedMicrobe = findMatchingOrganism(organism, microorganismsData);
  if (matchedMicrobe) {
    return `/organisms/${getOrganismSlug(matchedMicrobe)}`;
  }

  // Fallback if not found in any dataset
  return `/organisms/${getOrganismSlug(organism)}`;
};

export const getOrganismBySlug = (slug: string): AnyOrganism | undefined => {
  return allOrganisms.find(o => getOrganismSlug(o) === slug);
};

export const getOrganismById = (id: string): AnyOrganism | undefined => {
  return allOrganisms.find(o => o.id === id);
};
