const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/import VirusesSEO from "\.\/components\/VirusesSEO";/, 'import VirusesSEO from "./components/VirusesSEO";\nimport ParasitesSEO from "./components/ParasitesSEO";');

content = content.replace(/!location\.pathname\.startsWith\("\/viruses"\) &&/, '!location.pathname.startsWith("/viruses") && \n      !location.pathname.startsWith("/parasites") &&');

content = content.replace(/if \(location\.pathname\.startsWith\("\/viruses"\)\) \{\n    return <VirusesSEO \/>;\n  \}/, `if (location.pathname.startsWith("/viruses")) {\n    return <VirusesSEO />;\n  }\n\n  if (location.pathname.startsWith("/parasites")) {\n    return <ParasitesSEO />;\n  }`);

fs.writeFileSync('src/App.tsx', content);

