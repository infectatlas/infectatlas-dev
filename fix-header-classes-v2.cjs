const fs = require('fs');

// In PublicHeader.tsx, the desktop links should have the text-sm class, mobile links should have px-4 py-2.
// Wait, actually let's just restore them from scratch using simple string replacement.

let header = fs.readFileSync('src/components/PublicHeader.tsx', 'utf8');

// Fix Desktop nav
header = header.replace(/<nav className="hidden md:flex items-center space-x-6">[\s\S]*?<\/nav>/, `<nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/organisms"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Bacteria
          </Link>
          <Link
            to="/fungi"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Fungi
          </Link>
          <Link
            to="/viruses"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Viruses
          </Link>
          <Link
            to="/parasites"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Parasites
          </Link>
          <Link
            to="/diseases"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Diseases
          </Link>
          <Link
            to="/drugs"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Drugs
          </Link>
          <Link
            to="/comparisons"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Comparisons
          </Link>
        </nav>`);

// Fix Mobile nav
header = header.replace(/<div className="flex flex-col space-y-1 p-4">[\s\S]*?<\/div>/, `<div className="flex flex-col space-y-1 p-4">
          <Link
            to="/organisms"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bacteria
          </Link>
          <Link
            to="/fungi"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fungi
          </Link>
          <Link
            to="/viruses"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Viruses
          </Link>
          <Link
            to="/parasites"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Parasites
          </Link>
          <Link
            to="/diseases"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Diseases
          </Link>
          <Link
            to="/drugs"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Drugs
          </Link>
          <Link
            to="/comparisons"
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Comparisons
          </Link>
        </div>`);

fs.writeFileSync('src/components/PublicHeader.tsx', header);

let footer = fs.readFileSync('src/components/PublicFooter.tsx', 'utf8');
footer = footer.replace(/<div className="flex flex-col space-y-3">[\s\S]*?<\/div>/, `<div className="flex flex-col space-y-3">
          <Link
            to="/organisms"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Bacteria
          </Link>
          <Link
            to="/fungi"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Fungi
          </Link>
          <Link
            to="/viruses"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Viruses
          </Link>
          <Link
            to="/parasites"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Parasites
          </Link>
          <Link
            to="/diseases"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Diseases
          </Link>
          <Link
            to="/drugs"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Drugs
          </Link>
          <Link
            to="/comparisons"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Comparisons
          </Link>
        </div>`);
fs.writeFileSync('src/components/PublicFooter.tsx', footer);

