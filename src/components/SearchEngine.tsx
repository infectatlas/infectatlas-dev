import { useState, useMemo } from "react";
import { Microorganism, microorganismsData } from "../data/microorganisms";
import { Search, Info, Award, ShieldAlert, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SearchEngineProps {
  onAddPathogenToStudyList?: (pathogenId: string) => void;
  studyLists: { id: string; name: string; pathogenIds: string[] }[];
  isPremium?: boolean;
  onUnlockPremium?: () => void;
}

interface MicrobeDetailsProps {
  microbe: Microorganism;
  isPremium?: boolean;
  onUnlockPremium?: () => void;
  isMobile?: boolean;
}

function MicrobeDetails({
  microbe,
  isPremium = true,
  onUnlockPremium,
  isMobile = false,
}: MicrobeDetailsProps) {
  return (
    <div className={isMobile ? "border-t border-slate-150 mt-3 pt-4 space-y-4" : "bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"}>
      {/* Header Profile - Only for Desktop */}
      {!isMobile && (
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${
              microbe.gramStatus === "Gram-positive"
                ? "bg-purple-500/20 text-purple-200 border border-purple-500/30"
                : microbe.gramStatus === "Gram-negative"
                ? "bg-red-500/20 text-red-200 border border-red-500/30"
                : "bg-slate-500/20 text-slate-200 border border-slate-500/30"
            }`}>
              {microbe.gramStatus}
            </span>
            <span className="text-[10px] font-bold tracking-wider bg-white/10 text-white/90 px-2 py-0.5 rounded-md">
              {microbe.shape}
            </span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight mt-2.5 italic text-slate-50">{microbe.name}</h3>
          <p className="text-slate-400 text-xs mt-1.5">Arrangement: <span className="font-semibold text-slate-200">{microbe.arrangement || "unspecified"}</span></p>
        </div>
      )}

      {/* Characteristics and Description */}
      <div className={isMobile ? "space-y-4" : "p-5 space-y-4.5"}>
        {/* Morphology & Clinical Overview simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Morphology & Fingerprints</h5>
            <div className="flex flex-wrap gap-1.5">
              {microbe.characteristics.map((char, idx) => (
                <span key={idx} className="bg-white text-slate-700 text-[11px] px-2 py-0.5 rounded-md font-medium border border-slate-200/60 shadow-3xs">
                  {char}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Clinical Profile</h5>
            <p className="text-[11px] lg:text-xs text-slate-600 leading-relaxed font-sans">
              {microbe.description}
            </p>
          </div>
        </div>

        {/* Diseases and Treatments - Replaces heavy HTML Table */}
        <div className="space-y-2">
          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">High-Yield Pharmacotherapy</h5>
          <div className="space-y-2">
            {microbe.diseases.map((dis) => (
              <div 
                key={dis.id} 
                className="flex flex-col sm:flex-row sm:items-start justify-between p-3 bg-white border border-slate-150 rounded-xl gap-2 hover:border-slate-300 transition-colors shadow-3xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-xs text-slate-850">{dis.name}</span>
                  </div>
                  <p className="text-xs text-slate-605 font-mono pl-5 leading-tight">{dis.treatment}</p>
                </div>
                
                <div className="sm:self-start pl-5 sm:pl-0 shrink-0">
                  <span className={`inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md border ${
                    dis.route === "PO"
                      ? "bg-amber-50 text-amber-800 border-amber-200/60"
                      : dis.route === "IV"
                      ? "bg-sky-50 text-sky-800 border-sky-200/60"
                      : dis.route === "IM"
                      ? "bg-purple-50 text-purple-800 border-purple-200/60"
                      : "bg-slate-50 text-slate-700 border-slate-200/60"
                  }`}>
                    {dis.route}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Pearls */}
        {microbe.diseases.some(d => d.clinicalPearl) && (
          <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/60 flex gap-2.5">
            <Award className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Clinical Studypoint</span>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {microbe.diseases.find(d => d.clinicalPearl)?.clinicalPearl}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchEngine({
  onAddPathogenToStudyList,
  studyLists,
  isPremium = true,
  onUnlockPremium
}: SearchEngineProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGram, setSelectedGram] = useState<string>("All");
  const [selectedShape, setSelectedShape] = useState<string>("All");
  const [selectedMicrobe, setSelectedMicrobe] = useState<Microorganism | null>(null);

  // List management drop-down trigger
  const [showListSelectorFor, setShowListSelectorFor] = useState<string | null>(null);

  // Unique Gram and Shape values for filters
  const gramOptions = ["All", "Gram-positive", "Gram-negative", "Acid-fast", "Spirochete", "No Cell Wall", "Gram-variable"];
  const shapeOptions = ["All", "Cocci", "Rods", "Diplococci", "Curved rods", "Spirochetes", "Coccobacillus", "Branching rods", "Pleomorphic rods", "Pleomorphic"];

  // Search filter implementation
  const filteredMicrobes = useMemo(() => {
    return microorganismsData.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.shape.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.characteristics.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
        m.diseases.some((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.treatment.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesGram = selectedGram === "All" || m.gramStatus === selectedGram;
      const matchesShape = selectedShape === "All" || m.shape === selectedShape;

      return matchesSearch && matchesGram && matchesShape;
    });
  }, [searchTerm, selectedGram, selectedShape]);

  return (
    <div className="space-y-6" id="search-engine-root">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Clinical Cross-Reference Engine</h2>
          <p className="text-sm text-slate-500 mt-1">
            Search microorganisms, morphology attributes, diseases, and key pharmacotherapy routes (IV / PO).
          </p>
        </div>
      </div>

      {/* Inputs Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative md:col-span-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            id="pathogen-search-input"
            type="text"
            placeholder="Search by microbe name, disease, characteristics, or drug (e.g., 'VRE', 'pneumonia', 'meropenem')"
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="md:col-span-3">
          <select
            id="gram-filter"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-700"
            value={selectedGram}
            onChange={(e) => setSelectedGram(e.target.value)}
          >
            {gramOptions.map((opt) => (
              <option key={opt} value={opt}>
                Gram: {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            id="shape-filter"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-700"
            value={selectedShape}
            onChange={(e) => setSelectedShape(e.target.value)}
          >
            {shapeOptions.map((opt) => (
              <option key={opt} value={opt}>
                Shape: {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left Search, Right Selected Microbe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pathogens Column List */}
        <div className="lg:col-span-5 space-y-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-1">
            Pathogens Found ({filteredMicrobes.length})
          </div>
          {filteredMicrobes.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm">
              No matching microorganisms found. Try refining your filters or search terms.
            </div>
          ) : (
            filteredMicrobes.map((microbe) => {
              const isSelected = selectedMicrobe?.id === microbe.id;
              return (
                <div
                  key={microbe.id}
                  id={`item-${microbe.id}`}
                  onClick={() => {
                    if (selectedMicrobe?.id === microbe.id) {
                      setSelectedMicrobe(null);
                    } else {
                      setSelectedMicrobe(microbe);
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-indigo-50/70 border-indigo-400 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 italic">{microbe.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {microbe.gramStatus} &bull; {microbe.shape}
                      </p>
                    </div>
                    {/* Add to list trigger */}
                    {onAddPathogenToStudyList && (
                      <div className="relative">
                        <button
                          title="Add to study list"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowListSelectorFor(showListSelectorFor === microbe.id ? null : microbe.id);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        {showListSelectorFor === microbe.id && (
                          <div className="absolute right-0 top-7 z-20 bg-white border border-slate-200 rounded-lg p-2 shadow-lg min-w-[200px] text-xs space-y-1" onClick={(e) => e.stopPropagation()}>
                            <p className="font-semibold text-slate-500 p-1 border-b border-slate-100">Add microbe to:</p>
                            {studyLists.length === 0 ? (
                              <p className="p-1 text-slate-400 italic">Create lists on study tab first</p>
                            ) : (
                              studyLists.map((list) => {
                                const contains = list.pathogenIds.includes(microbe.id);
                                return (
                                  <button
                                    key={list.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onAddPathogenToStudyList(microbe.id);
                                      setShowListSelectorFor(null);
                                    }}
                                    className="w-full text-left p-1.5 rounded-md hover:bg-slate-50 flex items-center justify-between text-slate-700"
                                  >
                                    <span>{list.name}</span>
                                    {contains && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-wrap gap-1 mt-2 transition-all duration-200 ${isSelected ? "lg:flex hidden" : "flex"}`}>
                    {microbe.characteristics.slice(0, 2).map((char, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md"
                      >
                        {char}
                      </span>
                    ))}
                    {microbe.diseases.map((dis) => (
                      <span
                        key={dis.id}
                        className="text-[10px] font-medium bg-indigo-50 text-indigo-650 px-1.5 py-0.5 rounded-md border border-indigo-100/50"
                      >
                        {dis.name}
                      </span>
                    ))}
                  </div>

                  {/* Inline Details for Mobile Accordion */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MicrobeDetails
                          microbe={microbe}
                          isPremium={isPremium}
                          onUnlockPremium={onUnlockPremium}
                          isMobile={true}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Microbe Details Card */}
        <div className="hidden lg:col-span-7 lg:block">
          <AnimatePresence mode="wait">
            {selectedMicrobe ? (
              <motion.div
                key={selectedMicrobe.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <MicrobeDetails
                  microbe={selectedMicrobe}
                  isPremium={isPremium}
                  onUnlockPremium={onUnlockPremium}
                  isMobile={false}
                />
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center p-14 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400 space-y-3">
                <ShieldAlert className="h-10 w-10 text-slate-300" />
                <div>
                  <h4 className="font-semibold text-slate-700">No microbe selected</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Click any microorganism in the left column list to review detailed morphology configurations and treatments.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
