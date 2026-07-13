const fs = require('fs');

let content = fs.readFileSync('src/components/ParasitesSEO.tsx', 'utf8');

// Function to replace disease names and drug names with links in the render logic

content = content.replace(
  /<h3 className="font-extrabold text-sm sm:text-base text-slate-900">\s*\{disease\.name\}\s*<\/h3>/,
  `{(() => {
                          const d = diseasesData.find(dx => dx.name.toLowerCase() === disease.name.toLowerCase() || (dx.alternateSlugs && dx.alternateSlugs.some(slug => disease.name.toLowerCase().includes(slug.replace(/-/g, ' ')))));
                          return d ? (
                            <Link to={\`/diseases/\${d.slug}\`} className="font-extrabold text-sm sm:text-base text-indigo-650 hover:underline inline-flex items-center gap-1.5">
                              {disease.name} <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
                            </Link>
                          ) : (
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{disease.name}</h3>
                          );
                        })()}`
);

content = content.replace(
  /<p className="text-slate-800 font-bold bg-indigo-50\/30 p-2\.5 rounded-lg border border-indigo-50 inline-block leading-snug">\s*\{disease\.treatment\}\s*<\/p>/,
  `<div className="text-slate-800 font-bold bg-indigo-50/30 p-2.5 rounded-lg border border-indigo-50 inline-block leading-snug">
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

