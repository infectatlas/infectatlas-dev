const fs = require('fs');

let content = fs.readFileSync('src/components/VirusesSEO.tsx', 'utf8');

// The type is DNA or RNA, not Yeast or Mold. Let's replace the SEO Introduction and the getPathogenStyles

content = content.replace(/export const getSEOIntroduction = [\s\S]*?};/, `export const getSEOIntroduction = (m: Virus): string => {
  const defaultIntro = \`\${m.name} is a clinically significant \${m.type === 'DNA' ? 'DNA' : 'RNA'} virus. Understanding its replication, distinguishing features, and guideline treatment choices is essential for board examination diagnostic questions and clinical practice.\`;
  return m.description || defaultIntro;
};`);

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

fs.writeFileSync('src/components/VirusesSEO.tsx', content);
