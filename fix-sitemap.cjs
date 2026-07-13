const fs = require('fs');

let content = fs.readFileSync('scripts/generate-sitemap.ts', 'utf8');

// Add virus import
content = content.replace(/import \{ fungiData \} from "\.\.\/src\/data\/fungi";/, 'import { fungiData } from "../src/data/fungi";\nimport { virusesData } from "../src/data/viruses";');

// Add virus sitemap generation
const virusSitemapLogic = `
  // 1c. Viruses Sitemap
  const virusUrls = [
    { loc: \`\${DOMAIN}/viruses\`, lastmod: TODAY },
    ...virusesData.map((v) => ({
      loc: \`\${DOMAIN}/viruses/\${getPathogenSlug(v.name)}\`,
      lastmod: TODAY,
    })),
  ];

  fs.writeFileSync(
    path.join(publicDir, "sitemap-viruses.xml"),
    buildSitemapXml(virusUrls),
    "utf-8"
  );
  console.log(\`Generated sitemap-viruses.xml with \${virusUrls.length} entries.\`);
`;

content = content.replace(/\/\/ 2\. Diseases Sitemap/, virusSitemapLogic + '\n  // 2. Diseases Sitemap');

// Add to sitemap index
content = content.replace(/"sitemap-fungi\.xml",/, '"sitemap-fungi.xml",\n    "sitemap-viruses.xml",');

fs.writeFileSync('scripts/generate-sitemap.ts', content);
