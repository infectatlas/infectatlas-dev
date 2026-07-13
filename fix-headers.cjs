const fs = require('fs');

['src/components/PublicHeader.tsx', 'src/components/PublicFooter.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/className=\{match\.match\(\/className="\(\[\^"\]\+\)"\/\)\[1\]\}/g, match => {
    // We need to restore the actual classes. Let's just find the Viruses link and copy its classes.
    return 'className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"';
  });
  
  // Actually wait, let's just do a string replacement for the exact bad lines in PublicHeader and PublicFooter.
  fs.writeFileSync(file, content);
});
