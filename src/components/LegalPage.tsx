import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Scale, 
  FileText, 
  AlertTriangle,
  BrainCircuit
} from "lucide-react";
import LegalModal from "./LegalModal"; // Preserve if modal is ever called inside the Study App

interface LegalPageProps {
  initialTab: "privacy" | "terms";
}

export default function LegalPage({ initialTab }: LegalPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);

  // Sync active tab state if the URL changes (e.g. from /privacy to /terms)
  useEffect(() => {
    if (location.pathname.includes("/privacy")) {
      setActiveTab("privacy");
    } else if (location.pathname.includes("/terms")) {
      setActiveTab("terms");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white" id="legal-page-root">
      
      {/* STICKY NAVIGATION (MATCHES HOMEPAGE) */}
      <nav id="sticky-header" className="sticky top-0 z-50 w-full h-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-indigo-600 rounded-lg p-1" title="Back to Homepage">
            <div className="p-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm shrink-0">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-indigo-600 transition-colors block leading-none font-sans">
                InfectAtlas
              </span>
              <span className="text-[9px] sm:text-[10px] text-indigo-600 font-bold uppercase tracking-wider block mt-1 leading-none font-sans">
                Medical Microbiology
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-indigo-600 focus:outline-indigo-600 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link 
              to="/app" 
              className="px-4 py-2 text-[14px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm"
            >
              Start Studying Free
            </Link>
          </div>
        </div>
      </nav>

      {/* DOCUMENT COMPONENT CARD */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-16 space-y-8 animate-fade-in" id="legal-content-main">
        
        {/* Document Header Panel */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-lg relative overflow-hidden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
              InfectAtlas Compliance Bureau
            </span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display italic">
              {activeTab === "privacy" ? "Privacy Policy" : "Terms & Clinical Disclaimer"}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
              Strictly aligned with US/EU publisher frameworks, GDPR right to erasure, and developer terms. Last updated: June 2026.
            </p>
          </div>

          <div className="flex border-t border-slate-800/80 pt-4 mt-2 gap-2">
            <Link
              to="/privacy"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "privacy"
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "terms"
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Terms & Clinical Disclaimer
            </Link>
          </div>
        </div>

        {/* Content Sheet */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10 text-slate-700 space-y-6 leading-relaxed font-sans text-[14px]">
          
          {activeTab === "privacy" ? (
            <div className="space-y-6" id="privacy-policy-body">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-extrabold text-emerald-900 block text-sm">PRIVACY COMMITMENT</strong>
                  <p className="mt-1 text-slate-700 text-xs sm:text-sm">
                    InfectAtlas ("InfectAtlas," "we," "our," or "us") respects your privacy and is committed to protecting your information. This Privacy Policy explains how information may be collected, used, stored, disclosed, and protected when you use our Service.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-slate-900 font-extrabold text-base mb-2">1. Information We Collect</h2>
                <p className="mb-2">
                  Depending on how the Service is configured and used, we may collect the following categories of information:
                </p>
                
                <h3 className="font-bold text-slate-800 mt-4 mb-2">A. Information Stored Locally on Your Device</h3>
                <p className="mb-2">
                  The current version of InfectAtlas primarily stores study-related information locally within your browser or device using localStorage. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-1 my-3 text-slate-600">
                  <li>Study lists and saved organisms</li>
                  <li>Flashcard progress metrics</li>
                  <li>Quiz performance scoreboards</li>
                  <li>Infectious disease learning analytics</li>
                  <li>Spaced repetition schedules</li>
                </ul>
                <p className="text-slate-500 italic text-[13px]">
                  This information remaining on your device is highly secure and is never uploaded unless backend sync option triggers.
                </p>
              </div>

              <div>
                <h2 className="text-slate-900 font-extrabold text-base mb-2">2. How We Use Information</h2>
                <p>
                  Any stored data is used exclusively to keep track of your active study status, show learning summaries in your performance dashboard, and customize flashcards categories. We do not sell your personal data.
                </p>
              </div>

              <div>
                <h2 className="text-slate-900 font-extrabold text-base mb-2">3. GDPR Right to Erasure & Deletion</h2>
                <p className="mb-3">
                  Under the General Data Protection Regulation (GDPR), you have the absolute right to have your study states and statistics wiped clean.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("⚠️ Clear database? This permanently erases locally accumulated study guides, scoreboards, and category metrics.")) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-4 py-2 rounded-xl text-xs transition duration-150 active:bg-rose-200 inline"
                >
                  Permanently Clear Local Data
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6" id="terms-service-body">
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 text-amber-950 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-extrabold text-amber-900 block text-sm">IMPORTANT NOTICE</strong>
                  <p className="mt-1 text-slate-700 text-xs sm:text-sm">
                    PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING OR USING INFECTATLAS, INCLUDING THE WEBSITE, STUDY MATERIALS, QUIZZES, FLASHCARDS, REFERENCE CONTENT, OR RELATED SERVICES (COLLECTIVELY, THE "SERVICE"), YOU AGREE TO BE LEGALLY BOUND BY THESE TERMS.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-slate-900 font-extrabold text-base mb-2">1. Educational Purposes Only</h2>
                <p className="mb-2">
                  InfectAtlas is an educational and informational platform intended solely for learning, academic study, examination preparation (USMLE, COMLEX, NCLEX, NAPLEX), and professional continuing education.
                </p>
                <p className="mb-2 font-bold text-slate-900">
                  The Service does not provide medical, prescribing, or clinical treatment advice.
                </p>
                <p>
                  InfectAtlas is not a medical device, clinical decision support system, healthcare service, telemedicine platform, pharmacy service, diagnostic tool, or treatment recommendation engine.
                </p>
              </div>

              <div>
                <h2 className="text-slate-900 font-extrabold text-base mb-2">2. Liability Limitation</h2>
                <p>
                  We strive for complete accuracy, but medical guidelines (IDSA, HHS, CDC) change. Content is provided "as is". InfectAtlas and its publishers are not liable for any direct or indirect healthcare or therapeutic decisions made based upon references found in the database.
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link 
              to="/" 
              className="text-indigo-600 font-bold text-xs hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Homepage</span>
            </Link>
            <span className="text-[11px] text-slate-400 font-mono">
              Secure SSL • InfectAtlas Publishing Bureau
            </span>
          </div>

        </div>
      </main>

      {/* FOOTER (MATCHES HOMEPAGE) */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-6">
          <p className="text-xs">
            © 2026 InfectAtlas. All rights reserved. Built for medical training, clinical pharmacy, and boards prep.
          </p>
          <p className="text-[10px] text-slate-500 leading-normal max-w-2xl">
            Educational use only. Not intended for clinical decision-making. Consult direct medical associations (such as CDC or WHO) and clinical guidelines for physical healthcare consultations.
          </p>
        </div>
      </footer>

    </div>
  );
}
