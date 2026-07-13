const fs = require('fs');

let content = fs.readFileSync('src/components/ParasitesSEO.tsx', 'utf8');

// Add imports for diseasesData and drugsData if not present
if (!content.includes('diseasesData')) {
  content = content.replace(
    /import { parasitesData, Parasite } from "\.\.\/data\/parasites";/,
    `import { parasitesData, Parasite } from "../data/parasites";\nimport { diseasesData } from "../data/diseases";\nimport { drugsData } from "../data/drugs";`
  );
}

// Function to replace disease names and drug names with links in the render logic
// Wait, we need to modify the JSX where it renders disease.name and disease.treatment

content = content.replace(
  /<h4 className="font-extrabold text-slate-800 text-sm">\{disease\.name\}<\/h4>/,
  `{(() => {
                            const d = diseasesData.find(dx => dx.name.toLowerCase() === disease.name.toLowerCase() || (dx.alternateSlugs && dx.alternateSlugs.some(slug => disease.name.toLowerCase().includes(slug.replace(/-/g, ' ')))));
                            return d ? (
                              <Link to={\`/diseases/\${d.slug}\`} className="font-extrabold text-indigo-650 hover:underline text-sm inline-flex items-center gap-1">
                                {disease.name} <ExternalLink className="h-3 w-3" />
                              </Link>
                            ) : (
                              <h4 className="font-extrabold text-slate-800 text-sm">{disease.name}</h4>
                            );
                          })()}`
);

content = content.replace(
  /<div className="font-semibold text-slate-900 text-sm">\{disease\.treatment\}<\/div>/,
  `<div className="font-semibold text-slate-900 text-sm">
                            {disease.treatment.split(/[,+]/).map((part, i, arr) => {
                              const tName = part.trim();
                              const drg = drugsData.find(dr => dr.name.toLowerCase().includes(tName.toLowerCase()) || tName.toLowerCase().includes(dr.name.toLowerCase()));
                              return (
                                <span key={i}>
                                  {drg ? (
                                    <Link to={\`/drugs/\${drg.slug}\`} className="text-indigo-600 hover:underline">
                                      {tName}
                                    </Link>
                                  ) : (
                                    <span>{tName}</span>
                                  )}
                                  {i < arr.length - 1 ? (disease.treatment.includes('+') ? ' + ' : ', ') : ''}
                                </span>
                              );
                            })}
                          </div>`
);

fs.writeFileSync('src/components/ParasitesSEO.tsx', content);

