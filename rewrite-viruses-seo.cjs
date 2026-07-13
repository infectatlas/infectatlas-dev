const fs = require('fs');

let content = fs.readFileSync('src/components/VirusesSEO.tsx', 'utf8');

// Replace the filter logic for Gram status (which for viruses should probably be DNA/RNA)
content = content.replace(/const \[selectedGram, setSelectedGram\] = useState\("all"\);/, 'const [selectedType, setSelectedType] = useState("all");');
content = content.replace(/const filteredData = virusesData\.filter\(\(m\) => \{[\s\S]*?\}\);/, `const filteredData = virusesData.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.diseases.some(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || m.type === selectedType;
    return matchesSearch && matchesType;
  });`);
content = content.replace(/<button\s+onClick=\{\(\) => setSelectedGram\("all"\)\}[\s\S]*?setSelectedGram\("Dermatophyte"\).*?<\/button>/, `<button
                onClick={() => setSelectedType("all")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedType === "all" ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                All Viruses
              </button>
              <button
                onClick={() => setSelectedType("DNA")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedType === "DNA" ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                DNA Viruses
              </button>
              <button
                onClick={() => setSelectedType("RNA")}
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${selectedType === "RNA" ? "bg-orange-600 text-white shadow-sm shadow-orange-500/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}\`}
              >
                RNA Viruses
              </button>`);

// Fix schema generation
content = content.replace(/"text": \`\$\{pathogen\.name\} is classified as a \$\{pathogen\.type\} \$\{pathogen\.morphology \|\| "fungus"\}\. It typically presents as \$\{pathogen\.morphology\} in microbiological morphology\.\`/g, 
  `"text": \`\${pathogen.name} is classified as a \${pathogen.type} virus. It is \${pathogen.envelope.toLowerCase()} and its genome is \${pathogen.polarity}.\``);

// We need to replace the detail rendering: 
// morphology -> envelope, polarity
content = content.replace(/<h3 className="text-sm font-bold text-slate-900 mb-1">Microbiology & Morphology<\/h3>[\s\S]*?<p className="text-sm text-slate-700 leading-relaxed">\{pathogen\.morphology\}<\/p>/, `<h3 className="text-sm font-bold text-slate-900 mb-1">Microbiology & Genome</h3>
                          <p className="text-sm text-slate-700 leading-relaxed">{pathogen.polarity}, {pathogen.envelope}, Family: {pathogen.family}</p>`);

// Add transmission, reservoir, diagnosis, prevention, vaccinationStatus, treatmentConcepts
// I will just use sed/regex for some simple replacements, but the structure might be easier to replace using string splitting.
fs.writeFileSync('src/components/VirusesSEO.tsx', content);
