const fs = require('fs');
const file = 'src/components/ComparisonsSEO.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const PROSE_LINK_RULES: \{ pattern: RegExp; url: string; label\?: string \}\[\] = \[\s*\/\/ Drugs[\s\S]*?\];\n\nfunction renderProseWithLinks\(text: string, slug\?: string\) \{\n  if \(slug !== "mrsa-vs-mssa" && slug !== "cdiff-vancomycin-vs-fidaxomicin" && slug !== "pseudomonas-vs-enterobacteriaceae" && slug !== "legionella-vs-mycoplasma-pneumoniae"\) return text;\n/m;

const replacement = `const GLOBAL_PROSE_LINK_RULES: { pattern: RegExp; url: string; label?: string }[] = [
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
  { pattern: /\\bLevofloxacin\\b/g, url: "/drugs/levofloxacin" },
  { pattern: /\\bAzithromycin\\b/g, url: "/drugs/azithromycin" },
  { pattern: /\\bDoxycycline\\b/g, url: "/drugs/doxycycline" },
  // Organisms (ordered specific to general)
  { pattern: /\\bMycoplasma pneumoniae\\b/g, url: "/organisms/mycoplasma-pneumoniae" },
  { pattern: /\\bMycoplasma\\b/g, url: "/organisms/mycoplasma-pneumoniae" },
  { pattern: /\\bLegionella pneumophila\\b/g, url: "/organisms/legionella-pneumophila" },
  { pattern: /\\bLegionella\\b/g, url: "/organisms/legionella-pneumophila" },
  { pattern: /\\bPseudomonas aeruginosa\\b/g, url: "/organisms/pseudomonas-aeruginosa" },
  { pattern: /\\bPseudomonas\\b/g, url: "/organisms/pseudomonas-aeruginosa" },
  { pattern: /\\bClostridioides difficile\\b/gi, url: "/diseases/pseudomembranous-colitis" },
  { pattern: /\\bC\\. difficile\\b/gi, url: "/diseases/pseudomembranous-colitis" },
  { pattern: /\\bC\\. diff\\b/gi, url: "/diseases/pseudomembranous-colitis" }
];

const SCOPED_PROSE_LINK_RULES: Record<string, { pattern: RegExp; url: string; label?: string }[]> = {
  "legionella-vs-mycoplasma-pneumoniae": [
    { pattern: /\\batypical pneumonia\\b/gi, url: "/diseases/atypical-walking-pneumonia" },
    { pattern: /\\bwalking pneumonia\\b/gi, url: "/diseases/atypical-walking-pneumonia" }
  ],
  "pseudomonas-vs-enterobacteriaceae": [
    { pattern: /\\bPseudomonas bacteremia\\b/gi, url: "/diseases/bacteremia" },
    { pattern: /\\bcommunity-acquired lobar pneumonias\\b/gi, url: "/diseases/community-acquired-pneumonia" },
    { pattern: /\\babdominal sepsis\\b/gi, url: "/diseases/sepsis" },
    { pattern: /\\bneonatal sepsis\\b/gi, url: "/diseases/sepsis" },
    { pattern: /\\bosteomyelitis\\b/gi, url: "/diseases/osteomyelitis" },
    { pattern: /\\bbacteremia\\b/gi, url: "/diseases/bacteremia" }
  ],
  "cdiff-vancomycin-vs-fidaxomicin": [
    { pattern: /\\btoxic megacolon\\b/gi, url: "/diseases/toxic-megacolon" }
  ],
  "mrsa-vs-mssa": [
    { pattern: /\\bcellulitis\\b/gi, url: "/diseases/cellulitis-and-skin-infections" }
  ]
};

function renderProseWithLinks(text: string, slug?: string) {
  if (slug !== "mrsa-vs-mssa" && slug !== "cdiff-vancomycin-vs-fidaxomicin" && slug !== "pseudomonas-vs-enterobacteriaceae" && slug !== "legionella-vs-mycoplasma-pneumoniae") return text;

  const rules = [
    ...GLOBAL_PROSE_LINK_RULES,
    ...(slug && SCOPED_PROSE_LINK_RULES[slug] ? SCOPED_PROSE_LINK_RULES[slug] : [])
  ];
`;

content = content.replace(regex, replacement);

const ruleLoopRegex = /for \(const rule of PROSE_LINK_RULES\) \{/g;
content = content.replace(ruleLoopRegex, `for (const rule of rules) {`);

fs.writeFileSync(file, content);
