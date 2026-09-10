import { diseasesData } from "./src/data/diseases.ts";
import { microorganismsData } from "./src/data/microorganisms.ts";
import { fungiData } from "./src/data/fungi.ts";
import { virusesData } from "./src/data/viruses.ts";
import { parasitesData } from "./src/data/parasites.ts";
import { getDiseaseReferences } from "./src/components/DiseasesSEO.tsx";
import { getPathogenReferences as getOrgRefs } from "./src/components/OrganismsSEO.tsx";
import { getPathogenReferences as getFungiRefs } from "./src/components/FungiSEO.tsx";
import { getPathogenReferences as getVirusRefs } from "./src/components/VirusesSEO.tsx";
import { getPathogenReferences as getParasiteRefs } from "./src/components/ParasitesSEO.tsx";
import { getOrganismCanonicalUrl } from "./src/lib/organismUrlUtils.ts";

let output = "";
const log = (str: string) => { output += str + "\n"; }

const isFallback = (refs: any[]) => {
  return refs.some(r => 
    r.source.includes("IDSA Consensus Panel on") || 
    r.source === "WHO / CDC Surveillance Protocol" ||
    r.source === "IDSA Empiric Guidelines Panel" ||
    r.source === "IDSA Mycology Guidelines Panel" ||
    r.source === "CDC / IDSA" ||
    r.source === "Clinical Virology Reviews" ||
    r.source === "Clinical Parasitology Reviews"
  );
}

log("=== DISEASES ===");
diseasesData.forEach(d => {
  const refs = getDiseaseReferences(d.id, d.name);
  if (isFallback(refs)) {
    log(`[FALLBACK] URL: /diseases/${d.slug}`);
    refs.forEach(r => log(`   - Source: ${r.source} | Citation: ${r.citation}`));
  } else {
    log(`[VERIFIED] URL: /diseases/${d.slug}`);
  }
});

log("\n=== ORGANISMS ===");
microorganismsData.forEach(o => {
  const refs = getOrgRefs(o.id, o.name);
  if (isFallback(refs)) {
    log(`[FALLBACK] URL: ${getOrganismCanonicalUrl(o)}`);
    refs.forEach(r => log(`   - Source: ${r.source} | Citation: ${r.citation}`));
  } else {
    log(`[VERIFIED] URL: ${getOrganismCanonicalUrl(o)}`);
  }
});

log("\n=== FUNGI ===");
fungiData.forEach(o => {
  const refs = getFungiRefs(o.id, o.name);
  if (isFallback(refs)) {
    log(`[FALLBACK] URL: ${getOrganismCanonicalUrl(o)}`);
    refs.forEach(r => log(`   - Source: ${r.source} | Citation: ${r.citation}`));
  } else {
    log(`[VERIFIED] URL: ${getOrganismCanonicalUrl(o)}`);
  }
});

log("\n=== VIRUSES ===");
virusesData.forEach(o => {
  const refs = getVirusRefs(o.id, o.name);
  if (isFallback(refs)) {
    log(`[FALLBACK] URL: ${getOrganismCanonicalUrl(o)}`);
    refs.forEach(r => log(`   - Source: ${r.source} | Citation: ${r.citation}`));
  } else {
    log(`[VERIFIED] URL: ${getOrganismCanonicalUrl(o)}`);
  }
});

log("\n=== PARASITES ===");
parasitesData.forEach(o => {
  const refs = getParasiteRefs(o.id, o.name);
  if (isFallback(refs)) {
    log(`[FALLBACK] URL: ${getOrganismCanonicalUrl(o)}`);
    refs.forEach(r => log(`   - Source: ${r.source} | Citation: ${r.citation}`));
  } else {
    log(`[VERIFIED] URL: ${getOrganismCanonicalUrl(o)}`);
  }
});

import * as fs from 'fs';
fs.writeFileSync("reference_audit.txt", output);
