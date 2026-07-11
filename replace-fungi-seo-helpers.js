const fs = require('fs');
const content = fs.readFileSync('src/components/FungiSEO.tsx', 'utf8');

const updated = content
  .replace(/export const getSEOIntroduction = \(m: Fungus\): string => \{[\s\S]*?return defaultIntro;\n\};/, 
`export const getSEOIntroduction = (m: Fungus): string => {
  const defaultIntro = \`\${m.name} is a clinically significant \${m.type.toLowerCase()} known to cause human infections such as \${m.diseases.map(d => d.name).slice(0, 3).join(", ")}. Understanding its microbiology structure, distinguishing biochemical tests, and guideline treatment choices is essential for board examination diagnostic questions and clinical practice.\`;
  
  const nameLower = m.name.toLowerCase();
  if (nameLower.includes("candida albicans")) {
    return "Candida albicans is an opportunistic dimorphic fungus (forms germ tubes at 37°C). It is part of the normal human microbiome but can cause opportunistic mucosal or invasive infections. Learn key diagnostic features, antifungal treatment strategies, and high-yield board review concepts.";
  }
  if (nameLower.includes("aspergillus fumigatus")) {
    return "Aspergillus fumigatus is a ubiquitous mold found in decaying vegetation. It branches at acute angles (45°) and causes varied diseases from allergic responses to severe invasive infections in immunocompromised individuals.";
  }
  if (nameLower.includes("cryptococcus neoformans")) {
    return "Cryptococcus neoformans is a heavily encapsulated yeast found in soil and pigeon guano. Acquired via inhalation, it typically causes meningoencephalitis in immunocompromised hosts, heavily tested on board exams with India ink stains.";
  }
  if (nameLower.includes("histoplasma capsulatum")) {
    return "Histoplasma capsulatum is a dimorphic fungus endemic to the Ohio and Mississippi River valleys. Associated with bird and bat droppings, it presents as intracellular yeasts within macrophages and causes pulmonary or disseminated histoplasmosis.";
  }
  if (nameLower.includes("coccidioides immitis")) {
    return "Coccidioides immitis is a dimorphic fungus endemic to the Southwestern US and Mexico. It forms spherules containing endospores in tissues and is the causative agent of Valley Fever.";
  }
  
  return defaultIntro;
};`)
  .replace(/export const getPathogenSynonyms = \(m: Fungus\): string\[\] => \{[\s\S]*?return \[\];\n\};/, 
`export const getPathogenSynonyms = (m: Fungus): string[] => {
  const nameLower = m.name.toLowerCase();
  const idLower = m.id.toLowerCase();
  
  if (nameLower.includes("candida albicans")) {
    return ["C. albicans", "Thrush yeast"];
  }
  if (nameLower.includes("aspergillus fumigatus")) {
    return ["A. fumigatus"];
  }
  if (nameLower.includes("cryptococcus neoformans")) {
    return ["C. neoformans", "Encapsulated yeast"];
  }
  if (nameLower.includes("pneumocystis jirovecii")) {
    return ["P. jirovecii", "PCP", "Pneumocystis carinii"];
  }
  if (nameLower.includes("histoplasma capsulatum")) {
    return ["H. capsulatum", "Histoplasma"];
  }
  if (nameLower.includes("coccidioides immitis")) {
    return ["C. immitis", "Valley Fever fungus"];
  }
  if (nameLower.includes("blastomyces dermatitidis")) {
    return ["B. dermatitidis", "Blastomyces"];
  }
  if (nameLower.includes("sporothrix schenckii")) {
    return ["S. schenckii", "Rose gardener's disease"];
  }
  if (nameLower.includes("malassezia furfur")) {
    return ["M. furfur", "Tinea versicolor"];
  }

  // Generic abbreviation fallback
  const parts = m.name.split(" ");
  if (parts.length >= 2) {
    const abbreviated = \`\${parts[0].charAt(0)}. \${parts[1]}\`;
    return [abbreviated];
  }
  return [];
};`);

fs.writeFileSync('src/components/FungiSEO.tsx', updated);
