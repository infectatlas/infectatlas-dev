const fs = require('fs');
const file = 'src/components/ComparisonsSEO.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const PROSE_LINK_RULES: \{ pattern: RegExp; url: string; label\?: string \}.*?\];/s;
const replacement = `const PROSE_LINK_RULES: { pattern: RegExp; url: string; label?: string }[] = [
  // Drugs
  { pattern: /\\bNafcillin\\b/g, url: "/drugs/nafcillin" },
  { pattern: /\\bCefazolin\\b/g, url: "/drugs/cefazolin" },
  { pattern: /\\bCeftaroline\\b/g, url: "/drugs/ceftaroline" },
  { pattern: /\\bDaptomycin\\b/g, url: "/drugs/daptomycin" },
  { pattern: /\\bVancomycin\\b/g, url: "/drugs/vancomycin" },
  { pattern: /\\bMetronidazole\\b/g, url: "/drugs/metronidazole" },
  { pattern: /\\bClindamycin\\b/g, url: "/drugs/clindamycin" },
  { pattern: /\\bPip-Tazo\\b/g, url: "/drugs/piperacillin-tazobactam" },
  { pattern: /\\bCefepime\\b/g, url: "/drugs/cefepime" },
  { pattern: /\\bMeropenem\\b/g, url: "/drugs/meropenem" },
  { pattern: /\\bCeftriaxone\\b/g, url: "/drugs/ceftriaxone" },
  // Organisms (ordered specific to general)
  { pattern: /\\bPseudomonas aeruginosa\\b/g, url: "/organisms/p-aeruginosa" },
  { pattern: /\\bPseudomonas\\b/g, url: "/organisms/p-aeruginosa" },
  // Diseases (ordered specific to general)
  { pattern: /\\bPseudomonas bacteremia\\b/gi, url: "/diseases/bacteremia" },
  { pattern: /\\bcommunity-acquired lobar pneumonias\\b/gi, url: "/diseases/community-acquired-pneumonia" },
  { pattern: /\\babdominal sepsis\\b/gi, url: "/diseases/sepsis" },
  { pattern: /\\bneonatal sepsis\\b/gi, url: "/diseases/sepsis" },
  { pattern: /\\bosteomyelitis\\b/gi, url: "/diseases/osteomyelitis" },
  { pattern: /\\bbacteremia\\b/gi, url: "/diseases/bacteremia" },
  { pattern: /\\bpneumonia\\b/gi, url: "/diseases/hospital-acquired-pneumonia" },
  { pattern: /\\btoxic megacolon\\b/gi, url: "/diseases/toxic-megacolon" },
  { pattern: /\\bClostridioides difficile\\b/gi, url: "/diseases/pseudomembranous-colitis" },
  { pattern: /\\bC\\. difficile\\b/gi, url: "/diseases/pseudomembranous-colitis" },
  { pattern: /\\bC\\. diff\\b/gi, url: "/diseases/pseudomembranous-colitis" },
  { pattern: /\\bcellulitis\\b/gi, url: "/diseases/cellulitis-and-skin-infections" }
];`;

content = content.replace(regex, replacement);

content = content.replace(
  `if (slug !== "mrsa-vs-mssa" && slug !== "cdiff-vancomycin-vs-fidaxomicin") return text;`,
  `if (slug !== "mrsa-vs-mssa" && slug !== "cdiff-vancomycin-vs-fidaxomicin" && slug !== "pseudomonas-vs-enterobacteriaceae") return text;`
);

fs.writeFileSync(file, content);
