const fs = require('fs');

let content = fs.readFileSync('src/components/VirusesSEO.tsx', 'utf8');

// I'll just delete the leftover code
// Look at the text between `  }\n};\n    case "Mold":` and `  }\n};\nexport default function VirusesSEO() {`
content = content.replace(/    case "Mold":[\s\S]*?  }\n};\n/g, '');

fs.writeFileSync('src/components/VirusesSEO.tsx', content);
