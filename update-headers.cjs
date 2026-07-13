const fs = require('fs');

['src/components/PublicHeader.tsx', 'src/components/PublicFooter.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Insert Parasites after Viruses
  content = content.replace(/<Link\s+to="\/viruses"[^>]*>[\s\S]*?<\/Link>/g, match => {
    return `${match}\n          <Link\n            to="/parasites"\n            className={match.match(/className="([^"]+)"/)[1]}\n            ${match.includes('onClick=') ? 'onClick={() => setIsMobileMenuOpen(false)}' : ''}\n          >\n            Parasites\n          </Link>`;
  });
  
  fs.writeFileSync(file, content);
});
