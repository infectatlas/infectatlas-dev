import { useState } from "react";
import { Shield, Scale, AlertTriangle, FileText, Trash2, CheckCircle } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "privacy" | "terms";
}

export default function LegalModal({ isOpen, onClose, initialTab = "privacy" }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);
  const [hasCleared, setHasCleared] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGDPRClearData = () => {
    if (confirm("⚠️ WARNING: This will permanently delete all your custom study lists, flashcard progress, and performance analytics. This action complies with GDPR Right to Erasure and cannot be undone. Proceed?")) {
      localStorage.clear();
      setHasCleared(true);
      setTimeout(() => {
        window.location.reload();
      }, 1502);
    }
  };

  return (
    <div 
      id="legal-docs-overlay" 
      className="fixed inset-0 z-55 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full flex flex-col max-h-[90vh] overflow-hidden animate-fade-in">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold tracking-tight">Compliance & Legal Documentation</h2>
              <p className="text-[10px] text-slate-400">Aligned with GDPR, CCPA, and App Store Publisher Policy guidelines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-all"
          >
            Close Documentation
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-2 flex items-center justify-between gap-4 shrink-0">
          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "privacy"
                  ? "bg-white text-slate-900 shadow-3xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-850 hover:bg-slate-100"
              }`}
            >
              <FileText className="h-3.5 w-3.5 text-emerald-500" />
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab("terms")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "terms"
                  ? "bg-white text-slate-900 shadow-3xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-850 hover:bg-slate-100"
              }`}
            >
              <Scale className="h-3.5 w-3.5 text-indigo-505" />
              Terms & Clinical Disclaimer
            </button>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Last updated: May 2026</span>
        </div>

        {/* Scrollable Doc Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-650 leading-relaxed font-sans">
          
          {activeTab === "privacy" ? (
            <div id="privacy-section" className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3.5 text-emerald-900 flex items-start gap-2.5 leading-normal">
                <Shield className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-emerald-950 block">Your Privacy is Fully Protected</strong>
                  InfectAtlas operates strictly using client-side sandbox architectures. Your data remains on your local hardware device unless you trigger active study aids.
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">1. Information We Collect</h3>
                <p className="mb-2">
                  To provide a seamless healthcare self-testing platform, InfectAtlas stores state and preference markers strictly inside your browser's private local cache (local storage). These markers include:
                </p>
                <ul className="list-disc pl-5 mb-3 space-y-1">
                  <li>Your customized medical study lists & flagged pathogens.</li>
                  <li>Spaced repetition schedules, recall logs, and rating points.</li>
                  <li>Performance statistics, quiz attempt indexes, and target subject strengths.</li>
                  <li>Your premium key activation marker (sandbox key).</li>
                </ul>
                <p>
                  No personal identifier coordinates, including email addresses, phone networks, or static geographic locations are collected, harvested, or transferred to remote servers.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">2. AI Tutor & Third-Party Service Integrations</h3>
                <p className="mb-2">
                  Our interactive Gemini AI Memory Tutor allows medical scholars to instantly generate micro-mnemonics, clinically formatted summaries, and diagnostic memory patterns.
                </p>
                <ul className="list-disc pl-5 mb-3 space-y-1">
                  <li><strong>Limited Scope:</strong> Only study material attributes (pathogen names, treatment profiles, user question tokens) are shared with the server-side API.</li>
                  <li><strong>No PII Transfer:</strong> No personal identity variables are sent to the AI service. Prompts are packaged cleanly on our proxy system strictly to return high-yield memory tags.</li>
                  <li><strong>Security:</strong> All communication protocols are strictly routed via HTTPS and transport layer secure pipelines.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">3. GDPR Right to Erasure & CCPA Accordance</h3>
                <p className="mb-2">
                  Under the European Union's General Data Protection Regulation (GDPR) and state laws such as the California Consumer Privacy Act (CCPA), you retain the absolute right to destroy all locally or systemically persisted study markers instantly.
                </p>
                <p className="mb-3">
                  You can purge your entire study ledger using the administrative clearance utility below:
                </p>

                {hasCleared ? (
                  <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 text-rose-600" />
                    <span>Compliance Action Successful. Purging active schemas and hot-reloading browser...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleGDPRClearData}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg transition-all font-semibold"
                  >
                    <Trash2 className="h-4 w-4" />
                    Destroy All Local & Study Data (GDPR Right-to-Erasure)
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">4. Contact Information</h3>
                <p>
                  For publishing approvals, policy audits, or general inquiries regarding compliance, email our team coordinator at <strong>support@infectatlas.com</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div id="terms-section" className="space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3.5 text-amber-900 flex items-start gap-2.5 leading-normal">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-950 block">CRITICAL MEDICAL DISCLAIMER</strong>
                  This software is compiled exclusively as an interactive study companion for classroom and exam reference (such as NCLEX-RN, USMLE Step 1/2, COMLEX, or NAPLEX). It does not provide real clinic diagnostic services, therapeutic judgments, or prescriptive authority.
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">1. Educational Intended Use Profile</h3>
                <p>
                  All microbiological profiles, antibiotic mechanisms, efficacy grids, and practice situations present inside InfectAtlas are based upon standard board exam review curricula (e.g., IDSA clinical guidelines, CDC reports, and standard medical literature). Although we strive for 100% accuracy, medical science changes rapidly.
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  ⚠️ NEVER use this application to direct active bedside care, identify optimal empiric therapy regimens for actual patients, or replace professional clinical judgment. For real patient scenarios, reference active hospital antibiograms, institutional protocols, and official guidelines.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">2. Simulated Transactions Policy</h3>
                <p>
                  Any access key billing actions, promotional codes (e.g., <code>MICROVIP</code>), or pricing cards present inside InfectAtlas are strict system sandbox simulations designed to replicate the commercial subscription flows of the Google Play and iOS App Stores.
                </p>
                <p>
                  No real monetary cards are authorized, no processing queues occur, and no financial responsibilities arise from unlocking the premium level.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">3. Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by applicable laws, the publishers and active contributors of InfectAtlas will not be held liable for any clinical errors, exam failure results, data system discrepancies, or miscellaneous damages arising directly or indirectly from using this study tool.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">4. Professional Affiliations</h3>
                <p>
                  InfectAtlas is an independent educational tool. It is not affiliated, endorsed, or partnered with the NBME, the Federation of State Medical Boards (FSMB), the NCSBN, or any pharmaceutical organization.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-[11px] text-slate-450">
          <span className="flex items-center gap-1">
            🌿 Secure local client sandbox protocol
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="font-semibold text-slate-600 hover:text-slate-900 hover:underline"
            >
              Print Policy
            </button>
            <span>&bull;</span>
            <button
              onClick={onClose}
              className="font-bold text-indigo-600 hover:text-indigo-805"
            >
              I Accept & Understand
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
