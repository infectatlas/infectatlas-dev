const fs = require('fs');

['src/components/PublicHeader.tsx', 'src/components/PublicFooter.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className=\{match\.match\(\/className="\(\[\^"\]\+\)"\)\[1\]\}/g, 'className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"');
  // Need to fix mobile as well
  content = content.replace(/<Link\s+to="\/viruses"\s+className="px-4 py-2 text-\[14px\] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"\s+onClick=\{\(\) => setIsMobileMenuOpen\(false\)\}\s+>\s+Viruses\s+<\/Link>/g, `<Link
            to="/viruses"
            className="py-3 px-4 font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-base"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Viruses
          </Link>`);
  fs.writeFileSync(file, content);
});

let virusesSeo = fs.readFileSync('src/components/VirusesSEO.tsx', 'utf8');
virusesSeo = virusesSeo.replace(/m\.type === "Yeast" \|\| m\.type === "Mold" \|\| m\.type === "Dimorphic" \|\| m\.type === "Dermatophyte"/g, 'm.type === "DNA" || m.type === "RNA"');
virusesSeo = virusesSeo.replace(/m\.type === "Yeast"/g, 'm.type === "DNA"');
virusesSeo = virusesSeo.replace(/m\.type === "Mold"/g, 'm.type === "RNA"');
virusesSeo = virusesSeo.replace(/m\.type === "Dimorphic"/g, 'false');
virusesSeo = virusesSeo.replace(/m\.type === "Dermatophyte"/g, 'false');

fs.writeFileSync('src/components/VirusesSEO.tsx', virusesSeo);

