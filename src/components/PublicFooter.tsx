import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer id="website-footer" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 text-white rounded-lg inline-flex items-center justify-center">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-[15px] tracking-tight leading-none">
                  InfectAtlas
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5 leading-none">
                  Medical Microbiology
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-450 leading-relaxed">
              The interactive map of medical microbiology. Unifying active recall study guides and evidence-based diagnostic references.
            </p>
          </div>

          {/* Links Columns */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              Study Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/app" className="hover:text-white hover:underline transition-colors">
                  Study App Home
                </Link>
              </li>
              <li>
                <Link to="/app/flashcards" className="hover:text-white hover:underline transition-colors">
                  Active Flashcards
                </Link>
              </li>
              <li>
                <Link to="/app/quiz" className="hover:text-white hover:underline transition-colors">
                  Clinical Quizzes
                </Link>
              </li>
              <li>
                <Link to="/app/dashboard" className="hover:text-white hover:underline transition-colors">
                  Performance Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              Reference Library
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/organisms" className="hover:text-white hover:underline transition-colors">
                  Bacterial Pathogens
                </Link>
              </li>
              <li>
                <Link to="/fungi" className="hover:text-white hover:underline transition-colors">
                  Fungal Pathogens
                </Link>
              </li>
              <li>
                <Link to="/diseases" className="hover:text-white hover:underline transition-colors">
                  Clinical Disease Profiles
                </Link>
              </li>
              <li>
                <Link to="/drugs" className="hover:text-white hover:underline transition-colors">
                  Antimicrobials Spectra
                </Link>
              </li>
              <li>
                <Link to="/comparisons" className="hover:text-white hover:underline transition-colors">
                  Diagnostic Comparisons
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white hover:underline transition-colors">
                  Methodology: How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              Legal & Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy" className="hover:text-white hover:underline transition-colors" id="footer-privacy-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white hover:underline transition-colors" id="footer-terms-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@infectatlas.com" className="hover:text-white hover:underline transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 font-medium">
            © {new Date().getFullYear()} InfectAtlas. All rights reserved. <br className="sm:hidden"/> Not intended for direct medical advice or clinical diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
}
