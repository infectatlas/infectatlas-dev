const fs = require('fs');

let content = fs.readFileSync('src/components/VirusesSEO.tsx', 'utf8');

// Replacements
content = content.replace(/VirusesSEO/g, 'ParasitesSEO');
content = content.replace(/virusesData/g, 'parasitesData');
content = content.replace(/Virus/g, 'Parasite');
content = content.replace(/Viruses/g, 'Parasites');
content = content.replace(/viruses/g, 'parasites');
content = content.replace(/virus/g, 'parasite');

// Specific text adjustments
content = content.replace(/DNA and RNA/g, 'Protozoa, Helminths, and Ectoparasites');
content = content.replace(/DNA/g, 'Protozoa');
content = content.replace(/RNA/g, 'Helminth');

// Fix getPathogenStyles
content = content.replace(/case "Protozoa":[\s\S]*?case "Helminth":[\s\S]*?default:/, `case "Protozoa":
      return {
        bannerBg: "from-blue-50/50 via-white to-blue-50/30",
        lightBorder: "border-blue-100",
        accentText: "text-blue-600",
        pill: "bg-blue-50 text-blue-700 border-blue-100",
        accentLine: "border-l-blue-500",
        hover: "hover:border-blue-300 hover:shadow-blue-50/40",
      };
    case "Helminth":
      return {
        bannerBg: "from-orange-50/50 via-white to-orange-50/30",
        lightBorder: "border-orange-100",
        accentText: "text-orange-600",
        pill: "bg-orange-50 text-orange-700 border-orange-100",
        accentLine: "border-l-orange-500",
        hover: "hover:border-orange-300 hover:shadow-orange-50/40",
      };
    case "Ectoparasite":
      return {
        bannerBg: "from-emerald-50/50 via-white to-emerald-50/30",
        lightBorder: "border-emerald-100",
        accentText: "text-emerald-600",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-100",
        accentLine: "border-l-emerald-500",
        hover: "hover:border-emerald-300 hover:shadow-emerald-50/40",
      };
    default:`);

// Add Ectoparasite button and groups logic
content = content.replace(/groups\["Protozoa"\]\.push\(m\);\n\s*\} else if \(m\.type === "Helminth"\) \{\n\s*groups\["Helminth"\]\.push\(m\);\n\s*\} else if \(false\) \{\n\s*groups\["Dimorphic & Dermatophyte"\]\.push\(m\);\n\s*\}/g, `groups["Protozoa"].push(m);
      } else if (m.type === "Helminth") {
        groups["Helminth"].push(m);
      } else if (m.type === "Ectoparasite") {
        groups["Ectoparasite"].push(m);
      }`);

content = content.replace(/"Protozoa": \[\],\n\s*"Helminth": \[\],/g, `"Protozoa": [],\n      "Helminth": [],\n      "Ectoparasite": [],`);

content = content.replace(/\{ id: "Helminth", name: "Helminth".*?\}/, `{ id: "Helminth", name: "Helminths", color: "bg-orange-600 text-white shadow-md border-orange-450 hover:bg-orange-500 hover:shadow-orange-500/10" },
                    { id: "Ectoparasite", name: "Ectoparasites", color: "bg-emerald-600 text-white shadow-md border-emerald-450 hover:bg-emerald-500 hover:shadow-emerald-500/10" }`);

content = content.replace(/<button\n\s*onClick=\{\(\) => setSelectedGram\("Helminth"\)\}[\s\S]*?<\/button>/, `<button
                onClick={() => setSelectedGram("Helminth")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedGram === "Helminth" ? "bg-orange-600 text-white shadow-sm shadow-orange-500/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                Helminths
              </button>
              <button
                onClick={() => setSelectedGram("Ectoparasite")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedGram === "Ectoparasite" ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                Ectoparasites
              </button>`);

// Fix Schema and UI details
content = content.replace(/\{pathogen\.polarity\}, \{pathogen\.envelope\.toLowerCase\(\)\}/g, '{pathogen.type}, {pathogen.organismClass}');
content = content.replace(/\{m\.polarity\}, \{m\.envelope\.toLowerCase\(\)\}/g, '{m.type}, {m.organismClass}');
content = content.replace(/pathogen\.envelope\.toLowerCase\(\)/g, 'pathogen.organismClass');
content = content.replace(/pathogen\.polarity/g, 'pathogen.type');

content = content.replace(/if \(selectedGram === "Protozoa" && m\.type !== "Protozoa"\) return;\n\s*if \(selectedGram === "Helminth" && m\.type !== "Helminth"\) return;/g, `if (selectedGram === "Protozoa" && m.type !== "Protozoa") return;
        if (selectedGram === "Helminth" && m.type !== "Helminth") return;
        if (selectedGram === "Ectoparasite" && m.type !== "Ectoparasite") return;`);

// Fix Synonyms block manually, replacing getPathogenSynonyms content
content = content.replace(/export const getPathogenSynonyms = [\s\S]*?};/, `export const getPathogenSynonyms = (m: Parasite): string[] => {
  return [m.name];
};`);

fs.writeFileSync('src/components/ParasitesSEO.tsx', content);

