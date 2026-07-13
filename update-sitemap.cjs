const fs = require('fs');

let content = fs.readFileSync('scripts/generate-sitemap.ts', 'utf8');

content = content.replace(/import \{ virusesData \} from "\.\.\/src\/data\/viruses";/, 'import { virusesData } from "../src/data/viruses";\nimport { parasitesData } from "../src/data/parasites";');

const parasiteSitemapLogic = `
  // 1d. Parasites Sitemap
  const parasiteUrls = [
    { loc: \`\${DOMAIN}/parasites\`, lastmod: TODAY },
    ...parasitesData.map((p) => ({
      loc: \`\${DOMAIN}/parasites/\${getPathogenSlug(p.name)}\`,
      lastmod: TODAY,
    })),
  ];

  fs.writeFileSync(
    path.join(publicDir, "sitemap-parasites.xml"),
    buildSitemapXml(parasiteUrls),
    "utf-8"
  );
  console.log(\`Generated sitemap-parasites.xml with \${parasiteUrls.length} entries.\`);
`;

content = content.replace(/\/\/ 2\. Diseases Sitemap/, parasiteSitemapLogic + '\n  // 2. Diseases Sitemap');

content = content.replace(/"sitemap-viruses\.xml",/, '"sitemap-viruses.xml",\n    "sitemap-parasites.xml",');

fs.writeFileSync('scripts/generate-sitemap.ts', content);
