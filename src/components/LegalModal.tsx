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
          <span className="text-[10px] text-slate-400 font-mono">Last updated: June 2026</span>
        </div>

        {/* Scrollable Doc Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-650 leading-relaxed font-sans">
          
          {activeTab === "privacy" ? (
            <div id="privacy-section" className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3.5 text-emerald-900 flex items-start gap-2.5 leading-normal">
                <Shield className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-emerald-950 block">PRIVACY ASSURANCE</strong>
                  <p className="mt-1 text-slate-800">
                    InfectAtlas ("InfectAtlas," "we," "our," or "us") respects your privacy and is committed to protecting your information. This Privacy Policy explains how information may be collected, used, stored, disclosed, and protected when you use our Service.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">1. Information We Collect</h3>
                <p className="mb-2">
                  Depending on how the Service is configured and used, we may collect the following categories of information.
                </p>
                
                <h4 className="font-bold text-slate-800 mt-2.5 mb-1">A. Information Stored Locally on Your Device</h4>
                <p className="mb-2">
                  The current version of InfectAtlas primarily stores study-related information locally within your browser or device. This may include:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Study lists</li>
                  <li>Saved organisms and pathogens</li>
                  <li>Flashcard progress</li>
                  <li>Quiz performance</li>
                  <li>Learning analytics</li>
                  <li>Spaced repetition schedules</li>
                  <li>User preferences</li>
                  <li>Application settings</li>
                </ul>
                <p className="mb-3 text-slate-500 italic">
                  This information may remain on your device unless you delete it or clear your browser storage.
                </p>

                <h4 className="font-bold text-slate-800 mt-2.5 mb-1">B. Information You Voluntarily Provide</h4>
                <p className="mb-2">
                  If available now or in future versions of the Service, you may choose to provide:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Name</li>
                  <li>Username</li>
                  <li>Email address</li>
                  <li>Support requests</li>
                  <li>Feedback submissions</li>
                  <li>Survey responses</li>
                  <li>Account credentials</li>
                </ul>
                <p className="mb-3 text-slate-500 italic">
                  Providing such information is voluntary.
                </p>

                <h4 className="font-bold text-slate-800 mt-2.5 mb-1">C. Payment Information</h4>
                <p className="mb-2">
                  If paid subscriptions, premium features, or paid services become available, payment transactions may be processed by third-party payment processors.
                </p>
                <p className="mb-2">
                  InfectAtlas does not intend to store complete payment card numbers or full payment credentials on its own systems.
                </p>
                <p className="mb-3">
                  Payment information may be collected and processed directly by third-party payment providers in accordance with their privacy policies and legal obligations.
                </p>

                <h4 className="font-bold text-slate-800 mt-2.5 mb-1">D. Device and Technical Information</h4>
                <p className="mb-2">
                  We may automatically collect certain technical information, including:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Browser type</li>
                  <li>Device type</li>
                  <li>Operating system</li>
                  <li>Application version</li>
                  <li>Language settings</li>
                  <li>Referring pages</li>
                  <li>Usage statistics</li>
                  <li>Error logs</li>
                  <li>Diagnostic information</li>
                </ul>

                <h4 className="font-bold text-slate-800 mt-3 mb-1">E. Analytics Information</h4>
                <p className="mb-2">
                  We may collect information regarding how users interact with the Service, including:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Pages visited</li>
                  <li>Features used</li>
                  <li>Session duration</li>
                  <li>Button clicks</li>
                  <li>Navigation patterns</li>
                  <li>Performance metrics</li>
                </ul>
                <p className="mb-3">
                  Analytics information may be collected directly or through third-party analytics providers.
                </p>

                <h4 className="font-bold text-slate-800 mt-3 mb-1">F. AI Study Tool Inputs</h4>
                <p className="mb-2">
                  When AI-powered educational features are used, information submitted to generate educational content may be processed. Examples include:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Organism names</li>
                  <li>Disease names</li>
                  <li>Study topics</li>
                  <li>Quiz responses</li>
                  <li>Educational prompts</li>
                </ul>
                <p className="font-semibold text-rose-700">
                  ⚠️ Users should not submit patient records, protected health information (PHI), or confidential medical information.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">2. How We Use Information</h3>
                <p className="mb-2">
                  We may use information to:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Provide the Service</li>
                  <li>Improve educational content</li>
                  <li>Personalize study experiences</li>
                  <li>Generate flashcards and quizzes</li>
                  <li>Operate AI-powered learning tools</li>
                  <li>Maintain security</li>
                  <li>Diagnose technical issues</li>
                  <li>Prevent abuse</li>
                  <li>Process subscriptions</li>
                  <li>Respond to support requests</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">3. AI Services</h3>
                <p className="mb-2">
                  Certain educational features may utilize third-party artificial intelligence providers.
                </p>
                <p className="mb-2">
                  Information submitted through AI-powered study tools may be transmitted to AI providers solely for generating educational content.
                </p>
                <p className="mb-2 font-semibold">
                  Users should not submit:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Patient information</li>
                  <li>Medical records</li>
                  <li>Protected health information</li>
                  <li>Sensitive personal information</li>
                </ul>
                <p>
                  AI-generated content is governed by the InfectAtlas Terms of Service and Medical Disclaimer.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">4. Cookies and Similar Technologies</h3>
                <p className="mb-2">
                  The Service may use cookies, local storage, session storage, browser caches, and similar technologies to:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Maintain application functionality</li>
                  <li>Store preferences</li>
                  <li>Improve performance</li>
                  <li>Support authentication</li>
                  <li>Enable analytics</li>
                </ul>
                <p>
                  Users may disable certain browser storage mechanisms, although doing so may affect functionality.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">5. Information Sharing</h3>
                <p className="mb-2 font-bold text-slate-800">
                  We do not sell personal information.
                </p>
                <p className="mb-2">
                  We may share information with:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Hosting providers</li>
                  <li>Cloud infrastructure providers</li>
                  <li>Analytics providers</li>
                  <li>Payment processors</li>
                  <li>Customer support providers</li>
                  <li>Artificial intelligence providers</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                <p>
                  Information is shared only as reasonably necessary to operate the Service or comply with legal obligations.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">6. Data Retention</h3>
                <p className="mb-2">
                  Information may be retained for as long as reasonably necessary to:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Operate the Service</li>
                  <li>Maintain security</li>
                  <li>Resolve disputes</li>
                  <li>Comply with legal obligations</li>
                  <li>Enforce agreements</li>
                </ul>
                <p>
                  Locally stored information generally remains on your device until removed by you or your browser.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">7. Security</h3>
                <p className="mb-2">
                  We implement reasonable administrative, technical, and organizational safeguards intended to protect information.
                </p>
                <p className="mb-2">
                  However, no method of transmission, storage, or security system can guarantee absolute security.
                </p>
                <p>
                  Users acknowledge that use of the internet involves inherent risks.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">8. Children's Privacy</h3>
                <p className="mb-2">
                  The Service is not directed toward children under the age of 13.
                </p>
                <p className="mb-2">
                  We do not knowingly collect personal information from children under 13.
                </p>
                <p>
                  If we become aware that such information has been collected, we may take steps to remove it.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">9. International Users</h3>
                <p className="mb-2">
                  The Service may be accessed globally.
                </p>
                <p className="mb-2">
                  Information may be processed and stored in jurisdictions different from the user's country of residence.
                </p>
                <p>
                  By using the Service, users acknowledge that information may be transferred across national borders where permitted by law.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">10. GDPR and Similar Privacy Rights</h3>
                <p className="mb-2">
                  Where applicable law grants privacy rights, users may have rights including:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Access</li>
                  <li>Correction</li>
                  <li>Deletion (Right to Erasure)</li>
                  <li>Restriction</li>
                  <li>Objection</li>
                  <li>Data portability</li>
                </ul>
                <p className="mb-3">
                  Requests may be submitted through our contact channels. If you are using the app in client-only mode, you can instantly invoke your GDPR Right to Erasure to completely wipe all study records, flashcard analytics, and settings from this device browser:
                </p>
                <div className="mb-3">
                  {hasCleared ? (
                    <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3 rounded-lg flex items-center gap-2">
                      <CheckCircle className="h-4.5 w-4.5 text-rose-600" />
                      <span>Compliance Action Successful. Purging active schemas and reloading...</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleGDPRClearData}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg transition-all font-semibold"
                    >
                      <Trash2 className="h-4 w-4" />
                      Wipe My Device Database (GDPR Right-to-Erasure)
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">11. California Privacy Rights</h3>
                <p className="mb-2">
                  California residents may have additional rights under applicable California privacy laws.
                </p>
                <p>
                  We do not sell personal information as traditionally defined under California privacy laws.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">12. Changes to this Policy</h3>
                <p className="mb-2">
                  We may modify this Privacy Policy at any time.
                </p>
                <p className="mb-2">
                  Updated versions will be posted within the Service with a revised effective date.
                </p>
                <p>
                  Continued use of the Service after updates are posted constitutes acknowledgment of the revised Policy.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">13. Contact</h3>
                <p className="mb-2">
                  For privacy-related questions or requests:
                </p>
                <p className="font-bold text-indigo-600 hover:underline">
                  <a href="mailto:support@infectatlas.com">support@infectatlas.com</a>
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3.5 mt-4 text-amber-900">
                <strong className="font-bold text-amber-950 block uppercase tracking-wider text-[10px] mb-1">⚠️ Important Healthcare Notice</strong>
                <p className="mb-2">
                  InfectAtlas is an educational study platform.
                </p>
                <p className="mb-2">
                  Users must not submit patient records, protected health information (PHI), medical charts, diagnostic reports, insurance information, or other confidential healthcare information through the Service.
                </p>
                <p>
                  The Service is not intended to receive, store, process, or manage healthcare records and is not designed to function as a HIPAA-compliant medical record system.
                </p>
              </div>
            </div>
          ) : (
            <div id="terms-section" className="space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3.5 text-amber-900 flex items-start gap-2.5 leading-normal">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-950 block">IMPORTANT NOTICE</strong>
                  <p className="mt-1 text-slate-800">
                    PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING OR USING INFECTATLAS, INCLUDING THE WEBSITE, APPLICATION, PROGRESSIVE WEB APP (PWA), STUDY MATERIALS, QUIZZES, FLASHCARDS, REFERENCE CONTENT, AI-GENERATED CONTENT, OR RELATED SERVICES (COLLECTIVELY, THE "SERVICE"), YOU AGREE TO BE LEGALLY BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE SERVICE.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">1. Educational Purposes Only</h3>
                <p className="mb-2">
                  InfectAtlas is an educational and informational platform intended solely for learning, academic study, examination preparation, and professional continuing education.
                </p>
                <p className="mb-2">
                  The Service is designed to assist users in studying microbiology, infectious diseases, antimicrobial pharmacology, pathogen identification, and related healthcare concepts.
                </p>
                <p className="mb-2">
                  The Service is not intended to diagnose, treat, cure, monitor, prevent, or manage any disease, condition, or patient.
                </p>
                <p>
                  InfectAtlas is not a medical device, clinical decision support system, healthcare service, telemedicine platform, pharmacy service, diagnostic tool, or treatment recommendation engine.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">2. No Medical Advice</h3>
                <p className="mb-2 font-bold text-slate-800">
                  ALL CONTENT IS PROVIDED FOR EDUCATIONAL PURPOSES ONLY.
                </p>
                <p className="mb-2 font-semibold">
                  Nothing within the Service constitutes:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Medical advice;</li>
                  <li>Nursing advice;</li>
                  <li>Pharmacy advice;</li>
                  <li>Diagnostic advice;</li>
                  <li>Treatment advice;</li>
                  <li>Prescribing advice;</li>
                  <li>Professional healthcare services;</li>
                  <li>Clinical consultation.</li>
                </ul>
                <p className="mb-2">
                  No physician-patient, pharmacist-patient, nurse-patient, provider-patient, fiduciary, or professional relationship is created through use of the Service.
                </p>
                <p>
                  Users must seek qualified professional medical advice for any healthcare-related decision.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">3. Strict Prohibition on Patient Care Use</h3>
                <p className="mb-2 font-extrabold text-rose-700">
                  THE SERVICE MUST NOT BE USED FOR ACTUAL PATIENT CARE.
                </p>
                <p className="mb-2">
                  Without limitation, users may not use InfectAtlas to:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Diagnose patients;</li>
                  <li>Select medications;</li>
                  <li>Determine antibiotic therapy;</li>
                  <li>Establish treatment plans;</li>
                  <li>Make clinical decisions;</li>
                  <li>Guide emergency treatment;</li>
                  <li>Replace institutional protocols;</li>
                  <li>Replace professional judgment.</li>
                </ul>
                <p className="mb-2">
                  Users are solely responsible for independently verifying all information through current clinical guidelines, prescribing information, institutional protocols, local antibiograms, and qualified healthcare professionals.
                </p>
                <p className="font-semibold text-slate-800">
                  Any use of the Service in connection with actual patient care is undertaken entirely at the user's own risk.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">4. Content May Be Inaccurate or Outdated</h3>
                <p className="mb-2 text-slate-705">
                  Medical knowledge changes continuously.
                </p>
                <p className="mb-2 font-medium">
                  The Service may contain:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Errors;</li>
                  <li>Omissions;</li>
                  <li>Outdated information;</li>
                  <li>Incomplete information;</li>
                  <li>Simplified educational content;</li>
                  <li>Incorrect information.</li>
                </ul>
                <p className="mb-2">
                  The inclusion of diseases, organisms, treatments, antimicrobial regimens, susceptibility data, or educational recommendations does not guarantee accuracy, completeness, reliability, or current clinical validity.
                </p>
                <p>
                  Users are solely responsible for independently verifying all information.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">5. AI-Generated Content</h3>
                <p className="mb-2 font-medium">
                  Certain portions of the Service may utilize artificial intelligence systems to generate:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Quiz questions;</li>
                  <li>Flashcards;</li>
                  <li>Clinical vignettes;</li>
                  <li>Educational explanations;</li>
                  <li>Study materials;</li>
                  <li>Learning simulations.</li>
                </ul>
                <p className="mb-2 text-slate-705">
                  AI-generated content may contain inaccuracies, hallucinations, omissions, outdated information, misleading conclusions, or incorrect clinical statements.
                </p>
                <p className="mb-2 font-semibold">
                  AI-generated content must never be relied upon for patient care or healthcare decision-making.
                </p>
                <p>
                  Users assume all risks associated with use of AI-generated educational content.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">6. No Warranties</h3>
                <p className="mb-2 font-bold text-slate-800">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED "AS IS," "AS AVAILABLE," AND WITH ALL FAULTS.
                </p>
                <p className="mb-2 font-semibold">
                  INFECTATLAS DISCLAIMS ALL WARRANTIES, EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5 font-bold text-slate-800">
                  <li>MERCHANTABILITY;</li>
                  <li>FITNESS FOR A PARTICULAR PURPOSE;</li>
                  <li>NON-INFRINGEMENT;</li>
                  <li>ACCURACY;</li>
                  <li>RELIABILITY;</li>
                  <li>COMPLETENESS;</li>
                  <li>AVAILABILITY;</li>
                  <li>SECURITY.</li>
                </ul>
                <p className="mt-2 text-slate-705">
                  WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM DEFECTS.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">7. Limitation of Liability</h3>
                <p className="mb-2 font-bold text-slate-800">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INFECTATLAS, ITS OWNERS, OPERATORS, DEVELOPERS, CONTRIBUTORS, CONTRACTORS, AFFILIATES, LICENSORS, SUCCESSORS, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM OR RELATING TO THE SERVICE.
                </p>
                <p className="mb-2 font-semibold">
                  THIS INCLUDES, WITHOUT LIMITATION:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5 text-slate-800 font-medium">
                  <li>Direct damages;</li>
                  <li>Indirect damages;</li>
                  <li>Consequential damages;</li>
                  <li>Incidental damages;</li>
                  <li>Special damages;</li>
                  <li>Exemplary damages;</li>
                  <li>Punitive damages;</li>
                  <li>Lost profits;</li>
                  <li>Lost business opportunities;</li>
                  <li>Lost educational opportunities;</li>
                  <li>Examination failures;</li>
                  <li>Clinical outcomes;</li>
                  <li>Healthcare decisions;</li>
                  <li>Medication errors;</li>
                  <li>Personal injury;</li>
                  <li>Death;</li>
                  <li>Property damage;</li>
                  <li>Data loss;</li>
                  <li>Business interruption.</li>
                </ul>
                <p className="mt-2 font-semibold text-rose-700">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, YOUR SOLE AND EXCLUSIVE REMEDY IS TO STOP USING THE SERVICE.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">8. Assumption of Risk</h3>
                <p className="mb-2">
                  You acknowledge and agree that:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5">
                  <li>Use of the Service is voluntary;</li>
                  <li>Educational content may be inaccurate;</li>
                  <li>Medical information may change without notice;</li>
                  <li>AI-generated content may be incorrect;</li>
                  <li>The Service is not intended for patient care.</li>
                </ul>
                <p className="mt-2">
                  You assume all risks arising from your use of the Service.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">9. Indemnification</h3>
                <p>
                  You agree to defend, indemnify, and hold harmless InfectAtlas and its owners, operators, developers, contributors, contractors, licensors, successors, and service providers from any claims, liabilities, damages, judgments, losses, costs, expenses, or attorneys' fees arising from: Your use of the Service; Your violation of these Terms; Your misuse of educational content; Your use of the Service in connection with patient care; or Your violation of applicable laws or regulations.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">10. Prohibited Content</h3>
                <p className="mb-2">
                  Users must not submit:
                </p>
                <ul className="list-disc pl-5 mb-2.5 space-y-0.5 font-medium text-slate-805">
                  <li>Protected Health Information (PHI);</li>
                  <li>Patient records;</li>
                  <li>Medical charts;</li>
                  <li>Insurance information;</li>
                  <li>Personally identifiable patient information;</li>
                  <li>Confidential healthcare records.</li>
                </ul>
                <p className="mt-2">
                  InfectAtlas is not designed to receive, store, process, or maintain healthcare records subject to HIPAA or similar healthcare privacy laws.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">11. Intellectual Property</h3>
                <p>
                  All software, text, graphics, educational content, branding, logos, databases, designs, and related materials are protected by applicable intellectual property laws. No license is granted except the limited right to access and use the Service for personal educational purposes.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">12. Third-Party Services</h3>
                <p>
                  The Service may rely upon third-party providers including hosting providers, analytics providers, artificial intelligence providers, infrastructure providers, payment processors, and other service providers. InfectAtlas is not responsible for the availability, security, content, actions, or practices of third-party services.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">13. International Users</h3>
                <p>
                  The Service may be accessed worldwide. Users accessing the Service from outside the United States do so at their own initiative and are responsible for compliance with local laws applicable to their use of the Service.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">14. Dispute Resolution</h3>
                <p className="mb-2">
                  To the maximum extent permitted by applicable law, any dispute, claim, or controversy arising out of or relating to the Service shall be resolved exclusively through binding arbitration on an individual basis.
                </p>
                <p className="mb-2 font-bold text-slate-800">
                  Class actions, class arbitrations, representative actions, and jury trials are waived to the fullest extent permitted by law.
                </p>
                <p>
                  Where applicable law prohibits mandatory arbitration or certain liability limitations, such provisions shall apply only to the minimum extent required by law.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">15. Governing Law</h3>
                <p className="mb-2">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction selected by InfectAtlas in connection with operation of the Service, without regard to conflict-of-law principles.
                </p>
                <p>
                  Nothing in these Terms shall limit any mandatory consumer protections that may apply under applicable law.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">16. Modifications</h3>
                <p className="mb-2">
                  We may modify, suspend, discontinue, or update the Service or these Terms at any time without liability.
                </p>
                <p>
                  Continued use of the Service following publication of revised Terms constitutes acceptance of the revised Terms.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">17. Contact</h3>
                <p>
                  Questions regarding these Terms may be directed to: <a href="mailto:support@infectatlas.com" className="text-indigo-600 font-bold hover:underline">support@infectatlas.com</a>.
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
