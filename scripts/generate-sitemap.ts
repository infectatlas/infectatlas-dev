import * as fs from "fs";
import * as path from "path";
import { microorganismsData } from "../src/data/microorganisms";
import { diseasesData } from "../src/data/diseases";
import { drugsData } from "../src/data/drugs";

const getPathogenSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

const DOMAIN = "https://infectatlas.com";
const TODAY = new Date().toISOString().split("T")[0];

const buildSitemapXml = (urls: { loc: string; lastmod: string }[]): string => {
  const urlElements = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>
`;
};

const buildSitemapIndexXml = (sitemaps: string[]): string => {
  const sitemapElements = sitemaps
    .map(
      (sm) => `  <sitemap>
    <loc>${DOMAIN}/${sm}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>
`;
};

async function generate() {
  console.log("Starting automated sitemap generation...");

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    console.error(`Public directory does not exist at ${publicDir}! Skipping.`);
    return;
  }

  // 1. Organisms Sitemap
  const organismUrls = [
    { loc: `${DOMAIN}/organisms`, lastmod: TODAY },
    ...microorganismsData.map((m) => ({
      loc: `${DOMAIN}/organisms/${getPathogenSlug(m.name)}`,
      lastmod: TODAY,
    })),
  ];
  fs.writeFileSync(
    path.join(publicDir, "sitemap-organisms.xml"),
    buildSitemapXml(organismUrls),
    "utf-8"
  );
  console.log(`Generated sitemap-organisms.xml with ${organismUrls.length} entries.`);

  // 2. Diseases Sitemap
  const diseaseUrls = [
    { loc: `${DOMAIN}/diseases`, lastmod: TODAY },
    ...diseasesData.map((d) => ({
      loc: `${DOMAIN}/diseases/${d.slug}`,
      lastmod: TODAY,
    })),
  ];
  fs.writeFileSync(
    path.join(publicDir, "sitemap-diseases.xml"),
    buildSitemapXml(diseaseUrls),
    "utf-8"
  );
  console.log(`Generated sitemap-diseases.xml with ${diseaseUrls.length} entries.`);

  // 3. Drugs Sitemap
  const drugUrls = [
    { loc: `${DOMAIN}/drugs`, lastmod: TODAY },
    ...drugsData.map((dr) => ({
      loc: `${DOMAIN}/drugs/${dr.slug}`,
      lastmod: TODAY,
    })),
  ];
  fs.writeFileSync(
    path.join(publicDir, "sitemap-drugs.xml"),
    buildSitemapXml(drugUrls),
    "utf-8"
  );
  console.log(`Generated sitemap-drugs.xml with ${drugUrls.length} entries.`);

  // 4. Comparisons & Index Sitemap (holding home Page, Study App Guide, and comparisons)
  const comparisonSlugs = [
    "comparisons",
    "mrsa-vs-mssa",
    "vancomycin-vs-linezolid",
    "cellulitis-vs-erysipelas",
    "gram-positive-vs-gram-negative",
    "bactericidal-vs-bacteriostatic",
  ];
  const comparisonUrls = [
    { loc: `${DOMAIN}/`, lastmod: TODAY },
    ...comparisonSlugs.map((slug) => ({
      loc: `${DOMAIN}/${slug}`,
      lastmod: TODAY,
    })),
  ];
  fs.writeFileSync(
    path.join(publicDir, "sitemap-comparisons.xml"),
    buildSitemapXml(comparisonUrls),
    "utf-8"
  );
  console.log(`Generated sitemap-comparisons.xml with ${comparisonUrls.length} entries.`);

  // 5. Sitemap Index.xml
  const sitemapFiles = [
    "sitemap-organisms.xml",
    "sitemap-diseases.xml",
    "sitemap-drugs.xml",
    "sitemap-comparisons.xml",
  ];
  fs.writeFileSync(
    path.join(publicDir, "sitemap.xml"),
    buildSitemapIndexXml(sitemapFiles),
    "utf-8"
  );
  console.log("Generated sitemap.xml index successfully.");
}

generate().catch((err) => {
  console.error("Error generating sitemaps:", err);
  process.exit(1);
});
