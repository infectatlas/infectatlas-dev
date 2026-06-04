import { useState, useMemo, useEffect, useRef } from "react";
import { Microorganism, microorganismsData } from "../data/microorganisms";
import { StudyList } from "../types";
import { Sparkles, ArrowRight, RotateCw, CheckCircle2, Bookmark, BookmarkCheck, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { analytics } from "../utils/analytics";

interface FlashcardsProps {
  studyLists: StudyList[];
  spacedRepetitionIds: string[];
  onAddSpacedRepetition: (pathogenId: string) => void;
  onRemoveSpacedRepetition: (pathogenId: string) => void;
  isPremium?: boolean;
  onUnlockPremium?: () => void;
}

type ModeFilter = "NameToDescription" | "NameToDiseases" | "DiseasesToTreatment" | "NameToCharacteristics" | "CharacteristicsToName" | "DiseaseToName";

export default function Flashcards({
  studyLists,
  spacedRepetitionIds,
  onAddSpacedRepetition,
  onRemoveSpacedRepetition,
  isPremium = true,
  onUnlockPremium
}: FlashcardsProps) {
  // Filters & selection state
  const [selectedListId, setSelectedListId] = useState<string>("All");
  const [selectedGramFilter, setSelectedGramFilter] = useState<string>("All");
  const [cardTypeMode, setCardTypeMode] = useState<ModeFilter>("NameToDescription");

  // Deck Index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Analytics states to track cards reviewed in current session
  const [viewedCardIds, setViewedCardIds] = useState<Set<string>>(new Set());

  // Filtered Deck
  const deck = useMemo(() => {
    let listPathogens = microorganismsData;

    // Filter by Custom Study List
    if (selectedListId !== "All") {
      const activeList = studyLists.find((l) => l.id === selectedListId);
      if (activeList) {
        listPathogens = microorganismsData.filter((m) => activeList.pathogenIds.includes(m.id));
      }
    }

    // Filter by Gram Status
    if (selectedGramFilter !== "All") {
      listPathogens = listPathogens.filter((m) => m.gramStatus === selectedGramFilter);
    }

    // Shuffle option (kept in stable index or we can let users reset)
    return listPathogens;
  }, [selectedListId, selectedGramFilter, studyLists]);

  // 1. Trigger review_started whenever selection filters are configured
  useEffect(() => {
    if (deck.length > 0) {
      analytics.track("review_started", { totalCards: deck.length });
    }
  }, [selectedListId, selectedGramFilter]);

  const currentMicrobe: Microorganism | undefined = deck[currentIndex];

  // 2. Track unique cards reviewed
  useEffect(() => {
    if (currentMicrobe) {
      setViewedCardIds((prev) => {
        if (prev.has(currentMicrobe.id)) return prev;
        const updated = new Set(prev);
        updated.add(currentMicrobe.id);
        return updated;
      });
    }
  }, [currentMicrobe]);

  // 3. Keep ref synced with latest size for safe unmount extraction
  const cardsReviewedCountRef = useRef(0);
  useEffect(() => {
    cardsReviewedCountRef.current = viewedCardIds.size;
  }, [viewedCardIds]);

  // 4. Trigger review_completed on tab exit (unmount)
  useEffect(() => {
    return () => {
      const reviewedCount = cardsReviewedCountRef.current;
      if (reviewedCount > 0) {
        analytics.track("review_completed", { cardsReviewed: reviewedCount });
      }
    };
  }, []);

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(deck.length - 1); // Loop to back
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const isTrackedInSRS = currentMicrobe ? spacedRepetitionIds.includes(currentMicrobe.id) : false;

  const toggleSRS = () => {
    if (!currentMicrobe) return;
    if (isTrackedInSRS) {
      onRemoveSpacedRepetition(currentMicrobe.id);
    } else {
      onAddSpacedRepetition(currentMicrobe.id);
    }
  };

  return (
    <div className="space-y-6" id="flashcards-root">
      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-center shadow-xs">
        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Study Deck Focus</label>
          <select
            title="deck focus selection"
            id="list-deck-select"
            className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-slate-700"
            value={selectedListId}
            onChange={(e) => {
              setSelectedListId(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
          >
            <option value="All">All Registered Organisms ({microorganismsData.length})</option>
            {studyLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name} ({list.pathogenIds.length})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Microbe Taxonomy Filter</label>
          <select
            title="Gram filter selection"
            id="gram-deck-select"
            className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-slate-700"
            value={selectedGramFilter}
            onChange={(e) => {
              setSelectedGramFilter(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
          >
            <option value="All">All stain Reactions & Shapes</option>
            <option value="Gram-positive">Gram-positive only</option>
            <option value="Gram-negative">Gram-negative only</option>
            <option value="Acid-fast">Acid-fast only</option>
            <option value="Spirochete">Spirochetes only</option>
            <option value="No Cell Wall">No Cell Wall only</option>
            <option value="Gram-variable">Gram-variable only</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Flashcard Display Mode</label>
          <select
            title="card type display mode selection"
            id="mode-deck-select"
            className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-slate-700"
            value={cardTypeMode}
            onChange={(e) => {
              setCardTypeMode(e.target.value as ModeFilter);
              setIsFlipped(false);
            }}
          >
            <option value="NameToDescription">1. Front: Pathogen &bull; Back: Description</option>
            <option value="NameToDiseases">2. Front: Pathogen &bull; Back: Disease</option>
            <option value="DiseasesToTreatment">3. Front: Pathogen & Disease &bull; Back: Treatment</option>
            <option value="NameToCharacteristics">4. Front: Pathogen &bull; Back: Characteristics</option>
            <option value="CharacteristicsToName">5. Front: Characteristics &bull; Back: Pathogen</option>
            <option value="DiseaseToName">6. Front: Disease & Treatment &bull; Back: Pathogen</option>
          </select>
        </div>
      </div>

      {/* Main Flashcard Scene */}
      {deck.length === 0 ? (
        <div className="p-16 text-center bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-slate-400">
          This selected study focus has no microorganisms. Add some starting microbes from the **Cross-Reference** tab catalog, or select a different filter combination above.
        </div>
      ) : !isPremium ? (
        <div className="max-w-xl mx-auto">
          {/* Stunning locked deck preview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-5">
            <div className="inline-flex items-center justify-center p-3.5 bg-indigo-50 text-indigo-750 rounded-2xl">
              <BrainCircuit className="h-8 w-8 text-indigo-600 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 tracking-wider bg-indigo-100/50 px-2.5 py-1 rounded-full uppercase">
                Premium Spaced Repetition Mode
              </span>
              <h2 className="text-xl font-bold text-slate-900">👑 Active Recall Flashcards Locked</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Review cards using any of the 6 display options, bookmark specific focus areas, and register cards to your spaced intervals review deck.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs text-slate-600 max-w-sm mx-auto">
              <div className="flex items-center gap-2">
                <span className="text-indigo-600 font-extrabold">✓</span> 6 Display formats (including front-to-back pairings)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-indigo-600 font-extrabold">✓</span> Standard spaced repetition interval logs
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onUnlockPremium}
                className="w-full text-xs font-bold py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-150 transition-all font-semibold transform hover:scale-101 cursor-pointer"
              >
                Access Premium Spaced Repetition ($5.99/mo)
              </button>
              <span className="text-[10px] text-slate-400 block mt-2">
                Empower your brain. Perfect for board reviews of NCLEX and USMLE.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Progress Counters */}
          <div className="flex justify-between items-center text-xs font-medium text-slate-500">
            <span>Card {currentIndex + 1} of {deck.length}</span>
            <span className="bg-indigo-50/70 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold">
              {Math.round(((currentIndex + 1) / deck.length) * 100)}% Complete
            </span>
          </div>

          {/* Flashcard Component Deck */}
          <div className="perspective-1000 min-h-[300px] h-full relative cursor-pointer" onClick={handleFlip}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${currentMicrobe?.id}-${isFlipped}-${cardTypeMode}`}
                initial={{ opacity: 0, rotateY: isFlipped ? -90 : 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: isFlipped ? 90 : -90 }}
                transition={{ duration: 0.25 }}
                className={`w-full min-h-[280px] rounded-3xl p-6 border flex flex-col justify-between shadow-md transition-all ${
                  isFlipped
                    ? "bg-indigo-950 text-white border-indigo-900"
                    : "bg-white text-slate-900 border-slate-200 hover:shadow-lg hover:border-slate-300"
                }`}
              >
                {/* SRS Tracking Pin Overlay */}
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2 py-0.5 rounded-full uppercase text-[10px] font-bold ${
                    isFlipped 
                      ? "bg-indigo-800 text-indigo-200" 
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {currentMicrobe?.gramStatus} &bull; {currentMicrobe?.shape}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid triggering card flip
                      toggleSRS();
                    }}
                    className={`p-1.5 rounded-full transition-colors ${
                      isFlipped
                        ? isTrackedInSRS
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-white/5 text-slate-400 hover:text-white"
                        : isTrackedInSRS
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-slate-50 text-slate-400 hover:text-indigo-600 border border-slate-200"
                    }`}
                    title={isTrackedInSRS ? "Tracked in Spaced Repetition" : "Track this card in Spaced Repetition"}
                  >
                    {isTrackedInSRS ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                  </button>
                </div>

                {/* Central Body Question/Answer Presentation */}
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                  {!isFlipped ? (
                    // Front side layouts depending on CardTypeMode selection
                    cardTypeMode === "NameToDescription" ? (
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-600 font-sans block">Identify Profile For</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold italic text-slate-900 leading-tight">
                          {currentMicrobe?.name}
                        </h3>
                        <span className="text-xs text-slate-400 block mt-1">(Recall organism description and characteristics)</span>
                      </div>
                    ) : cardTypeMode === "NameToDiseases" ? (
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-600 font-sans block">Identify Diseases Caused By</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold italic text-slate-900 leading-tight">
                          {currentMicrobe?.name}
                        </h3>
                        <span className="text-xs text-slate-400 block mt-1">(Recall all conditions caused by this organism)</span>
                      </div>
                    ) : cardTypeMode === "DiseasesToTreatment" ? (
                      <div className="space-y-3 w-full text-center">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-600 font-sans block">Diseases Associated With</span>
                        <h3 className="text-xl md:text-2xl font-extrabold italic text-slate-900 leading-tight">
                          {currentMicrobe?.name}
                        </h3>
                        <div className="space-y-2 text-xs text-left text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-150 max-h-[140px] overflow-y-auto">
                          <span className="text-slate-500 font-semibold block text-[10px] uppercase tracking-wide mb-1">Causative Pathogenic Scope:</span>
                          <ul className="list-disc pl-4 space-y-1">
                            {currentMicrobe?.diseases.map((d, idx) => (
                              <li key={idx} className="font-medium">{d.name}</li>
                            ))}
                          </ul>
                        </div>
                        <span className="text-xs text-slate-400 block mt-1">(Recall drug therapies and administration routes)</span>
                      </div>
                    ) : cardTypeMode === "NameToCharacteristics" ? (
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-600 font-sans block">Identify Profile For</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold italic text-slate-900 leading-tight">
                          {currentMicrobe?.name}
                        </h3>
                      </div>
                    ) : cardTypeMode === "CharacteristicsToName" ? (
                      <div className="space-y-3 px-4">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-600 font-sans block">Identify Pathogen Showing</span>
                        <p className="text-base font-bold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                          {currentMicrobe?.characteristics.join(", ")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Arrangement: {currentMicrobe?.arrangement}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 px-4">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-600 font-sans block">Identify Causative Pathogen for</span>
                        <p className="text-base font-semibold text-slate-800 leading-relaxed bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100/30 font-serif italic">
                          "{currentMicrobe?.diseases[0]?.name}"
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          First-line Treatment: {currentMicrobe?.diseases[0]?.treatment}
                        </p>
                      </div>
                    )
                  ) : (
                    // Back side layouts depending on CardTypeMode selection
                    cardTypeMode === "NameToDescription" ? (
                      <div className="space-y-4 w-full">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-300 block">Organism Profile</span>
                          <h4 className="text-xl font-bold italic text-white mt-1">{currentMicrobe?.name}</h4>
                        </div>
                        <div className="space-y-2 text-xs text-left text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5 max-h-[180px] overflow-y-auto">
                          <p className="leading-relaxed"><strong className="text-white">Description:</strong> {currentMicrobe?.description}</p>
                          <p className="mt-2"><strong className="text-white">Classification:</strong> {currentMicrobe?.gramStatus} &bull; {currentMicrobe?.shape} ({currentMicrobe?.arrangement})</p>
                        </div>
                      </div>
                    ) : cardTypeMode === "NameToDiseases" ? (
                      <div className="space-y-4 w-full">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-300 block">Causative Pathogen</span>
                          <h4 className="text-xl font-bold italic text-white mt-1">{currentMicrobe?.name}</h4>
                        </div>
                        <div className="space-y-2.5 text-xs text-left text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5 max-h-[180px] overflow-y-auto">
                          <span className="text-indigo-200 font-bold block text-[11px] uppercase tracking-wide mb-1.5">Diseases Caused:</span>
                          <ul className="list-disc pl-4 space-y-1.5">
                            {currentMicrobe?.diseases.map((d, index) => (
                              <li key={index}>
                                <strong className="text-white text-[12px]">{d.name}</strong>
                                {d.clinicalPearl && <p className="text-[10px] text-slate-400 italic mt-0.5">{d.clinicalPearl}</p>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : cardTypeMode === "DiseasesToTreatment" ? (
                      <div className="space-y-4 w-full">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-300 block">Pharmacotherapy Answer</span>
                          <h4 className="text-xl font-bold italic text-white mt-1">{currentMicrobe?.name}</h4>
                        </div>
                        <div className="space-y-3 text-xs text-left text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5 max-h-[180px] overflow-y-auto">
                          <span className="text-emerald-400 font-bold block text-[11px] uppercase tracking-wide mb-1.5">Targeted Therapies:</span>
                          <div className="space-y-3.5 divide-y divide-white/10">
                            {currentMicrobe?.diseases.map((d, idx) => (
                              <div key={idx} className="pt-2 first:pt-0">
                                <span className="font-semibold text-white block text-[12px]">{d.name}</span>
                                <p className="mt-0.5 text-slate-300"><strong className="text-indigo-200">Tx:</strong> {d.treatment}</p>
                                <p className="text-[11px] text-emerald-300 mt-0.5 font-sans">Route: <span className="bg-indigo-950 px-1.5 py-0.5 rounded font-mono uppercase text-[10px] text-white border border-white/5">{d.route}</span></p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : cardTypeMode === "NameToCharacteristics" || cardTypeMode === "CharacteristicsToName" ? (
                      <div className="space-y-4 w-full">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-300 block">Pathogen Answer</span>
                          <h4 className="text-xl font-bold italic text-white mt-1">{currentMicrobe?.name}</h4>
                        </div>
                        <div className="space-y-2 text-xs text-left text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5">
                          <p><strong className="text-white">Profile:</strong> {currentMicrobe?.description}</p>
                          <p><strong className="text-white">Diseases:</strong> {currentMicrobe?.diseases.map(d => `${d.name} (${d.route})`).join("; ")}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 w-full">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-300 block">Identified Causative Pathogen</span>
                          <h4 className="text-xl font-bold italic text-white mt-1">{currentMicrobe?.name}</h4>
                        </div>
                        <div className="space-y-2 text-xs text-left text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5">
                          <p><strong className="text-white">Classification:</strong> {currentMicrobe?.gramStatus} &bull; {currentMicrobe?.shape} &bull; {currentMicrobe?.arrangement}</p>
                          <p><strong className="text-white">Diseases Managed:</strong> {currentMicrobe?.diseases.map(d => `${d.name} (Requires ${d.route})`).join("; ")}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Footer Controls & Hints */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-3 text-xs w-full">
                  <div className="flex items-center gap-1 text-slate-400">
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Click anywhere to flip</span>
                  </div>
                  <span className="text-indigo-600 font-semibold text-[11px] uppercase tracking-wider font-sans">
                    Reveal Answer
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flashcard Next/Prev Controls */}
          <div className="flex justify-between items-center max-w-sm mx-auto">
            <button
              onClick={handlePrevCard}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow-2xs"
            >
              Previous Microbe
            </button>
            <button
              onClick={handleNextCard}
              className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold px-5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Next Microbe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
