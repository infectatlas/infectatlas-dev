const fs = require('fs');

let content = fs.readFileSync('src/components/VirusesSEO.tsx', 'utf8');

content = content.replace(/export const getPathogenSynonyms = [\s\S]*?};/g, `export const getPathogenSynonyms = (m: Virus): string[] => {
  const nameLower = m.name.toLowerCase();
  
  if (nameLower.includes("herpes simplex")) {
    return ["HSV", "Herpes"];
  }
  if (nameLower.includes("varicella")) {
    return ["VZV", "Chickenpox", "Shingles"];
  }
  if (nameLower.includes("epstein-barr")) {
    return ["EBV", "Mono"];
  }
  if (nameLower.includes("cytomegalovirus")) {
    return ["CMV"];
  }
  if (nameLower.includes("influenza")) {
    return ["Flu"];
  }
  if (nameLower.includes("respiratory syncytial")) {
    return ["RSV"];
  }
  if (nameLower.includes("human papillomavirus")) {
    return ["HPV"];
  }
  if (nameLower.includes("hepatitis")) {
    return ["Hep"];
  }
  if (nameLower.includes("human immunodeficiency")) {
    return ["HIV", "AIDS"];
  }
  if (nameLower.includes("sars-cov-2")) {
    return ["COVID-19", "Coronavirus"];
  }
  if (nameLower.includes("parvovirus")) {
    return ["B19", "Fifth disease"];
  }
  if (nameLower.includes("measles")) {
    return ["Rubeola"];
  }
  if (nameLower.includes("rubella")) {
    return ["German measles"];
  }

  return [];
};`);

content = content.replace(/export const getPathogenReferences = [\s\S]*?\];\n\};/g, `export const getPathogenReferences = (pathogenId: string, name: string): PathogenReference[] => {
  return [
    {
      type: "Clinical Guideline",
      source: "CDC / IDSA",
      citation: \`Guideline standards and pathogen-specific treatment directives for human infections caused by \${name}.\`,
      url: "https://www.cdc.gov"
    },
    {
      type: "Landmark Review Article",
      source: "Clinical Virology Reviews",
      citation: \`Pathogenesis, Laboratory Identification, and Therapy of \${name} Associated Infections.\`,
    }
  ];
};`);

fs.writeFileSync('src/components/VirusesSEO.tsx', content);
