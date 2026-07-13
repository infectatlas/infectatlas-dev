const fs = require('fs');

let content = fs.readFileSync('src/components/FungiSEO.tsx', 'utf8');

// Replace Fungi with Viruses
content = content.replace(/FungiSEO/g, 'VirusesSEO');
content = content.replace(/fungiData/g, 'virusesData');
content = content.replace(/Fungus/g, 'Virus');
content = content.replace(/Fungi/g, 'Viruses');
content = content.replace(/fungi/g, 'viruses');
content = content.replace(/fungus/g, 'virus');

// Fix Imports
content = content.replace(/..\/data\/viruses/, '../data/viruses');

// Update getSEOIntroduction
content = content.replace(/export const getSEOIntroduction[\s\S]*?};/, `export const getSEOIntroduction = (m: Virus): string => {
  return m.description;
};`);

// Update getPathogenStyles
content = content.replace(/export const getPathogenStyles = [\s\S]*?};/, `export const getPathogenStyles = (type: string) => {
  switch (type) {
    case "DNA":
      return {
        bannerBg: "from-blue-50/50 via-white to-blue-50/30",
        lightBorder: "border-blue-100",
        accentText: "text-blue-600",
        pill: "bg-blue-50 text-blue-700 border-blue-100",
        accentLine: "border-l-blue-500",
        hover: "hover:border-blue-300 hover:shadow-blue-50/40",
      };
    case "RNA":
      return {
        bannerBg: "from-orange-50/50 via-white to-orange-50/30",
        lightBorder: "border-orange-100",
        accentText: "text-orange-600",
        pill: "bg-orange-50 text-orange-700 border-orange-100",
        accentLine: "border-l-orange-500",
        hover: "hover:border-orange-300 hover:shadow-orange-50/40",
      };
    default:
      return {
        bannerBg: "from-slate-50/50 via-white to-slate-50/30",
        lightBorder: "border-slate-100",
        accentText: "text-slate-700",
        pill: "bg-slate-50 text-slate-805 border-slate-105",
        accentLine: "border-l-slate-500",
        hover: "hover:border-slate-300 hover:shadow-slate-50/40",
      };
  }
};`);

// Replace morphology with envelope/polarity in schema
content = content.replace(/"text": \`\$\{pathogen\.name\} is classified as a \$\{pathogen\.type\} \$\{pathogen\.morphology \|\| "virus"\}\. It typically presents as \$\{pathogen\.morphology\} in microbiological morphology\.\`/g, `"text": \`\${pathogen.name} is classified as a \${pathogen.type} virus. It is \${pathogen.envelope.toLowerCase()} and its genome is \${pathogen.polarity}.\``);

// Filter logic
content = content.replace(/const \[selectedGram, setSelectedGram\] = useState\("all"\);/, 'const [selectedGram, setSelectedGram] = useState("all");');
content = content.replace(/m\.type === "Yeast" \|\| m\.type === "Mold" \|\| m\.type === "Dimorphic" \|\| m\.type === "Dermatophyte"/g, 'm.type === "DNA" || m.type === "RNA"');
content = content.replace(/m\.type === "Dimorphic" \|\| m\.type === "Dermatophyte"/g, 'false');

// Filter buttons
content = content.replace(/<button\s+onClick=\{\(\) => setSelectedGram\("all"\)\}[\s\S]*?setSelectedGram\("Dermatophyte"\).*?<\/button>/, `<button
                onClick={() => setSelectedGram("all")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedGram === "all" ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                All Viruses
              </button>
              <button
                onClick={() => setSelectedGram("DNA")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedGram === "DNA" ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                DNA Viruses
              </button>
              <button
                onClick={() => setSelectedGram("RNA")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedGram === "RNA" ? "bg-orange-600 text-white shadow-sm shadow-orange-500/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                RNA Viruses
              </button>`);

// Fix details view
// Change Morphology/Characteristics -> Virus Properties
let propertiesRegex = /<h3 className="text-sm font-bold text-slate-900 mb-1">Microbiology & Morphology<\/h3>[\s\S]*?<\/div>[\s\S]*?<div className="bg-slate-50 p-4 rounded-xl border border-slate-100">[\s\S]*?<h3 className="text-sm font-bold text-slate-900 mb-2">Key Diagnostic Characteristics<\/h3>[\s\S]*?<\/div>/;

let virusPropertiesStr = `<h3 className="text-sm font-bold text-slate-900 mb-1">Genome & Classification</h3>
                          <p className="text-sm text-slate-700 leading-relaxed"><span className="font-semibold text-slate-800">{pathogen.polarity}</span>, {pathogen.envelope.toLowerCase()}</p>
                          <p className="text-sm text-slate-700 leading-relaxed mt-1">Family: <span className="font-semibold">{pathogen.family}</span></p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h3 className="text-sm font-bold text-slate-900 mb-2">Transmission & Reservoir</h3>
                          <p className="text-sm text-slate-700 mb-1"><strong>Transmission:</strong> {pathogen.transmission}</p>
                          <p className="text-sm text-slate-700"><strong>Reservoir:</strong> {pathogen.reservoir}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h3 className="text-sm font-bold text-slate-900 mb-2">Diagnosis & Prevention</h3>
                          <p className="text-sm text-slate-700 mb-1"><strong>Diagnosis:</strong> {pathogen.diagnosis}</p>
                          <p className="text-sm text-slate-700"><strong>Prevention:</strong> {pathogen.prevention}</p>
                          <p className="text-sm text-slate-700 mt-1"><strong>Vaccine:</strong> {pathogen.vaccinationStatus}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h3 className="text-sm font-bold text-slate-900 mb-2">Key Diagnostic Characteristics</h3>
                          <div className="flex flex-wrap gap-2">
                            {pathogen.characteristics.map((char: string, index: number) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                          <h3 className="text-sm font-bold text-indigo-900 mb-2">Clinical Memory Aid</h3>
                          <p className="text-sm text-indigo-800 font-medium italic">"{pathogen.clinicalMemoryAids}"</p>
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl border border-slate-200">
                          <h3 className="text-sm font-bold text-slate-900 mb-2">General Treatment Concepts</h3>
                          <p className="text-sm text-slate-700">{pathogen.treatmentConcepts}</p>
                        `;

content = content.replace(propertiesRegex, virusPropertiesStr);

// In the pathogen cards on index page:
content = content.replace(/\{m\.morphology\}/g, '{m.polarity}, {m.envelope.toLowerCase()}');

fs.writeFileSync('src/components/VirusesSEO.tsx', content);

