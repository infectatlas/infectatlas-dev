import { getOrganismCanonicalUrl, getOrganismById } from './src/lib/organismUrlUtils';
console.log("Pseudomonas: ", getOrganismCanonicalUrl(getOrganismById('p-aeruginosa')!));
