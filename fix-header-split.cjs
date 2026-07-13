const fs = require('fs');

['src/components/PublicHeader.tsx', 'src/components/PublicFooter.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.split('className={match.match(/className="([^"]+)"/)[1]}').join('className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"');
  fs.writeFileSync(file, content);
});
