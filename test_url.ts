import { getOrganismCanonicalUrl, getOrganismById } from './src/lib/organismUrlUtils';
console.log("Legionella: ", getOrganismCanonicalUrl(getOrganismById('l-pneumophila')!));
console.log("Mycoplasma: ", getOrganismCanonicalUrl(getOrganismById('myco-pneumoniae')!));
