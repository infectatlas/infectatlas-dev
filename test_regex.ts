const text = "MRSA pneumonia and atypical pneumonia and Pneumonia in Cystic Fibrosis.";
const rules = [
  { pattern: /\batypical pneumonia\b/gi, url: "/diseases/atypical-walking-pneumonia" },
  { pattern: /\bwalking pneumonia\b/gi, url: "/diseases/atypical-walking-pneumonia" },
  { pattern: /\bpneumonia\b/gi, url: "/diseases/hospital-acquired-pneumonia" }
];

interface Match {
    start: number;
    end: number;
    url: string;
    text: string;
}
const matches: Match[] = [];

for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = rule.pattern.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      const overlaps = matches.some(m => Math.max(m.start, start) < Math.min(m.end, end));
      if (!overlaps) {
        matches.push({ start, end, url: rule.url, text: match[0] });
      }
    }
}
console.log(matches);
