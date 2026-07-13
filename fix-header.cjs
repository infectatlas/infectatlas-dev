const fs = require('fs');

['src/components/PublicHeader.tsx', 'src/components/PublicFooter.tsx', 'src/components/VirusesSEO.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className=\{match\.match\(\/className="([^"]+)"\).*?\}/g, 'className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"');
  
  if (file === 'src/components/VirusesSEO.tsx') {
    content = content.replace(/m\.type === "Yeast" \|\| m\.type === "Mold" \|\| m\.type === "Dimorphic" \|\| m\.type === "Dermatophyte"/g, 'm.type === "DNA" || m.type === "RNA"');
    content = content.replace(/m\.type === "Yeast"/g, 'm.type === "DNA"');
    content = content.replace(/m\.type === "Mold"/g, 'm.type === "RNA"');
    content = content.replace(/m\.type === "Dimorphic"/g, 'false');
    content = content.replace(/m\.type === "Dermatophyte"/g, 'false');
  }
  fs.writeFileSync(file, content);
});
