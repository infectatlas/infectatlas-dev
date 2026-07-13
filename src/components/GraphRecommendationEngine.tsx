import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  getRecommendations, 
  getIntelligentLearningPath, 
  getHistoryBasedRecommendations, 
  findUnifiedPathogen 
} from "../utils/graph";
import { 
  ArrowRight, 
  BookOpen, 
  Activity, 
  Pill, 
  Stethoscope, 
  Sparkles, 
  Award,
  Compass,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface GraphRecProps {
  entityType: "pathogen" | "disease" | "drug";
  idOrSlug: string;
}

// Map the entity to its correct path structure
export const getEntityLink = (type: string, id: string, slug: string) => {
  if (type === "disease") {
    return `/diseases/${slug}`;
  }
  if (type === "drug") {
    return `/drugs/${slug}`;
  }
  if (type === "pathogen") {
    const p = findUnifiedPathogen(id);
    if (p) {
      if (p.type === "bacteria") return `/organisms/${p.slug}`;
      if (p.type === "fungus") return `/fungi/${p.id}`;
      if (p.type === "virus") return `/viruses/${p.id}`;
      if (p.type === "parasite") return `/parasites/${p.id}`;
    }
    return `/organisms/${slug}`;
  }
  return "/";
};

// Map icons cleanly based on target recommendation types
const getRecIcon = (type: string) => {
  switch (type) {
    case "disease":
      return <Stethoscope className="h-4.5 w-4.5 text-rose-500" />;
    case "drug":
      return <Pill className="h-4.5 w-4.5 text-emerald-500" />;
    case "pathogen":
      return <Activity className="h-4.5 w-4.5 text-indigo-500" />;
    default:
      return <BookOpen className="h-4.5 w-4.5 text-amber-500" />;
  }
};

const getRecBadgeStyles = (type: string) => {
  switch (type) {
    case "disease":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "drug":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pathogen":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

/**
 * 1. Dynamic Related Content Grid Widget (Phase 3E)
 * Exposes graph-derived recommendations sorted by connection scores.
 */
export const DynamicRelatedContent: React.FC<GraphRecProps> = ({ entityType, idOrSlug }) => {
  const recommendations = React.useMemo(() => {
    return getRecommendations(entityType, idOrSlug);
  }, [entityType, idOrSlug]);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200/60" id="dynamic-related-content">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
          Graph-Driven Related Content & Differentials
        </h3>
      </div>
      
      <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
        The Knowledge Graph dynamically maps these entities based on shared pathogens, clinical indications, and empirical therapy regimens.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <Link
            key={`${rec.type}_${rec.id}`}
            to={getEntityLink(rec.type, rec.id, rec.slug)}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all hover:shadow-2xs group flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${getRecBadgeStyles(rec.type)}`}>
                  {rec.type}: {rec.relationshipType}
                </span>
                <span className="text-[10px] text-indigo-600 font-extrabold group-hover:underline inline-flex items-center gap-0.5 whitespace-nowrap">
                  Analyze <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              
              <div className="flex items-start gap-2 pt-1">
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg shrink-0 mt-0.5">
                  {getRecIcon(rec.type)}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-indigo-950 group-hover:text-indigo-700 transition-colors">
                    {rec.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

/**
 * 2. Intelligent Learning Path progression timeline (Phase 3F)
 * Maps out "What should I study next?" timeline automatically.
 */
export const IntelligentLearningPath: React.FC<GraphRecProps> = ({ entityType, idOrSlug }) => {
  const pathSteps = React.useMemo(() => {
    return getIntelligentLearningPath(entityType, idOrSlug);
  }, [entityType, idOrSlug]);

  if (pathSteps.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4" id="intelligent-study-path">
      <div className="flex items-center gap-2">
        <Compass className="h-5 w-5 text-indigo-650" />
        <div>
          <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wide">
            Intelligent Study Progression Map
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Next high-yield steps recommended by the InfectAtlas curation algorithm.
          </p>
        </div>
      </div>

      {/* Steps timeline layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 relative">
        {pathSteps.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col justify-between p-4 bg-white border border-slate-200/60 rounded-xl hover:border-indigo-250 transition-all shadow-3xs">
            <div className="space-y-2">
              <span className="text-[9px] font-black text-indigo-600 bg-indigo-50/70 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-wider block w-max">
                {step.relationshipType}
              </span>

              <h4 className="font-extrabold text-sm text-slate-900 pt-1">
                {step.name}
              </h4>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Step {idx + 1} of 3</span>
              <Link
                to={getEntityLink(step.type, step.id, step.slug)}
                className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-0.5 group"
              >
                Study Node <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 3. Continue Learning & Students Also Study Widget (Phase 3F)
 * Uses client-side active history in LocalStorage to generate smart suggestions.
 */
export const ContinueLearningHistory: React.FC = () => {
  const [historyRecs, setHistoryRecs] = useState<any[]>([]);

  useEffect(() => {
    try {
      const cachedAnalytics = localStorage.getItem("micro_analytics");
      let questionsPerPathogen = {};
      if (cachedAnalytics) {
        const parsed = JSON.parse(cachedAnalytics);
        if (parsed.questionsPerPathogen) {
          questionsPerPathogen = parsed.questionsPerPathogen;
        }
      }
      const recommendations = getHistoryBasedRecommendations(questionsPerPathogen, 3);
      setHistoryRecs(recommendations);
    } catch (err) {
      console.error("Failed to load user history recommendations:", err);
    }
  }, []);

  if (historyRecs.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl border border-indigo-850 p-5 sm:p-6 space-y-4" id="continue-learning-section">
      <div className="flex items-center gap-2 pb-1 border-b border-white/5">
        <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
        <div>
          <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider">
            Personalized Study Booster
          </h3>
          <p className="text-[11px] text-slate-300 font-light">
            Curation customized from your recent active recall answers and weak study metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {historyRecs.map((rec) => (
          <div key={rec.id} className="p-4 bg-black/30 border border-white/10 rounded-xl flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className={`text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                rec.relationshipType.includes("Weak") 
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/30" 
                  : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
              }`}>
                {rec.relationshipType}
              </span>
              <h4 className="font-extrabold text-xs text-white leading-snug pt-1">
                {rec.name}
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                {rec.description}
              </p>
            </div>

            <Link
              to={getEntityLink(rec.type, rec.id, rec.slug)}
              className="text-[10px] font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-0.5 group pt-2 shrink-0 border-t border-white/5"
            >
              Master This Next <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
