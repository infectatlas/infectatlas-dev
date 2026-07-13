const fs = require('fs');

let content = fs.readFileSync('src/components/ParasitesSEO.tsx', 'utf8');
content = content.replace(/Protozoa Parasites/g, 'Protozoa');
content = content.replace(/Helminth Parasites/g, 'Helminths');
content = content.replace(/Ectoparasite Parasites/g, 'Ectoparasites');
content = content.replace(/Is \$\{pathogen\.name\} Protozoa or Helminth\?/g, 'What type of parasite is ${pathogen.name}?');
content = content.replace(/All Parasites/g, 'All Parasites'); // already ok
fs.writeFileSync('src/components/ParasitesSEO.tsx', content);
