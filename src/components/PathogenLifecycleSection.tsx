import React from "react";
import { PathogenLifecycleSection as PathogenLifecycleSectionType } from "../types";

export interface PathogenLifecycleSectionProps {
  data?: PathogenLifecycleSectionType;
  className?: string;
}

export const PathogenLifecycleSection: React.FC<PathogenLifecycleSectionProps> = ({
  data,
  className = "",
}) => {
  if (!data || !data.pathways || data.pathways.length === 0) {
    return null;
  }

  // Ensure there is at least one pathway with rows
  const hasRows = data.pathways.some((p) => p.rows && p.rows.length > 0);
  if (!hasRows) {
    return null;
  }

  const sectionTitle = data.title || "Pathogen Lifecycle & Transmission";

  return (
    <section id="lifecycle" className={`space-y-6 ${className}`}>
      <div className="space-y-1">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
          {sectionTitle}
        </h2>
      </div>

      <div className="space-y-8">
        {data.pathways.map((pathway, pIdx) => {
          let currentPhase: string | undefined = undefined;

          return (
            <div key={pathway.pathwayId || `pathway-${pIdx}`} className="space-y-3">
              {(pathway.pathwayTitle || pathway.pathwayDescription) && (
                <div className="space-y-1">
                  {pathway.pathwayTitle && (
                    <h3 className="text-sm font-bold text-slate-900">
                      {pathway.pathwayTitle}
                    </h3>
                  )}
                  {pathway.pathwayDescription && (
                    <p className="text-xs text-slate-600 italic">
                      {pathway.pathwayDescription}
                    </p>
                  )}
                </div>
              )}

              <div
                className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs focus:outline-none"
                tabIndex={0}
                aria-label={`Scrollable lifecycle table${
                  pathway.pathwayTitle ? ` for ${pathway.pathwayTitle}` : ""
                }`}
              >
                <table className="w-full min-w-[640px] text-left border-collapse text-xs sm:text-sm">
                  <caption className="sr-only">
                    {pathway.pathwayTitle
                      ? `${pathway.pathwayTitle} lifecycle steps and transmission events`
                      : `${sectionTitle} steps and events`}
                  </caption>
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th scope="col" className="px-4 py-3 w-28 sm:w-32 shrink-0">
                        Step / Phase
                      </th>
                      <th scope="col" className="px-4 py-3 w-1/4">
                        Lifecycle Event
                      </th>
                      <th scope="col" className="px-4 py-3 w-1/4">
                        Host & Anatomical Site
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Medical Significance & Key Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {pathway.rows.map((row, rIdx) => {
                      const showPhaseDivider =
                        row.phase && row.phase !== currentPhase;
                      if (showPhaseDivider) {
                        currentPhase = row.phase;
                      }

                      return (
                        <React.Fragment key={rIdx}>
                          {showPhaseDivider && (
                            <tr className="bg-slate-100/75 border-y border-slate-200">
                              <th
                                colSpan={4}
                                scope="colgroup"
                                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 text-left"
                              >
                                {row.phase}
                              </th>
                            </tr>
                          )}
                          <tr className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-4 py-3 font-semibold text-slate-900 align-top">
                              {row.step}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-800 align-top">
                              {row.event}
                            </td>
                            <td className="px-4 py-3 text-slate-600 align-top">
                              {row.location}
                            </td>
                            <td className="px-4 py-3 text-slate-600 leading-relaxed align-top">
                              {row.significance}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {data.references && data.references.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            References & Primary Lifecycle Sources
          </h4>
          <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
            {data.references.map((ref, idx) => (
              <li key={idx} className="leading-normal">
                <span className="font-semibold text-slate-700">
                  {ref.sourceName}:
                </span>{" "}
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-500 hover:underline"
                  >
                    {ref.title}
                  </a>
                ) : (
                  <span>{ref.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PathogenLifecycleSection;
