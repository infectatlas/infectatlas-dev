const fs = require('fs');

let content = fs.readFileSync('src/components/VirusesSEO.tsx', 'utf8');

// Replace specific Yeast and Mold terms
content = content.replace(/m\.type !== "Yeast"/g, 'm.type !== "DNA"');
content = content.replace(/m\.type !== "Mold"/g, 'm.type !== "RNA"');
content = content.replace(/pathogen\.type === "Yeast"/g, 'pathogen.type === "DNA"');
content = content.replace(/pathogen\.type === "Mold"/g, 'pathogen.type === "RNA"');

// Fix Groupings
content = content.replace(/"Yeast": \[\]/g, '"DNA": []');
content = content.replace(/"Mold": \[\]/g, '"RNA": []');
content = content.replace(/"Dimorphic": \[\]/g, '');
content = content.replace(/"Dermatophyte": \[\]/g, '');

content = content.replace(/groups\["Yeast"\]\.push\(m\);/g, 'groups["DNA"].push(m);');
content = content.replace(/groups\["Mold"\]\.push\(m\);/g, 'groups["RNA"].push(m);');
content = content.replace(/groups\["Dimorphic"\]\.push\(m\);/g, '');
content = content.replace(/groups\["Dermatophyte"\]\.push\(m\);/g, '');

content = content.replace(/selectedGram === "yeast"/g, 'selectedGram === "DNA"');
content = content.replace(/selectedGram === "mold"/g, 'selectedGram === "RNA"');

// Fix buttons filter list
content = content.replace(/\{ id: "yeast", name: "Yeast"[\s\S]*?\}/g, '{ id: "DNA", name: "DNA", color: "bg-blue-600 text-white shadow-md border-blue-400 hover:bg-blue-500 hover:shadow-blue-500/10" }');
content = content.replace(/\{ id: "mold", name: "Mold"[\s\S]*?\}/g, '{ id: "RNA", name: "RNA", color: "bg-orange-600 text-white shadow-md border-orange-450 hover:bg-orange-500 hover:shadow-orange-500/10" }');
content = content.replace(/,\s*\{ id: "dimorphic", name: "Dimorphic"[\s\S]*?\}/g, '');
content = content.replace(/,\s*\{ id: "dermatophyte", name: "Dermatophyte"[\s\S]*?\}/g, '');

// Update SEO descriptions
content = content.replace(/Yeast, Mold, Dimorphic, and atypical/g, 'DNA and RNA');
content = content.replace(/Is \$\{pathogen\.name\} Yeast or Mold\?/g, 'Is ${pathogen.name} DNA or RNA?');

fs.writeFileSync('src/components/VirusesSEO.tsx', content);

