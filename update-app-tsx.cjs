const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
content = content.replace(/import FungiSEO from "\.\/components\/FungiSEO";/, 'import FungiSEO from "./components/FungiSEO";\nimport VirusesSEO from "./components/VirusesSEO";');

// Update validation logic
content = content.replace(/!location\.pathname\.startsWith\("\/fungi"\) &&/, '!location.pathname.startsWith("/fungi") && \n      !location.pathname.startsWith("/viruses") &&');

// Add route logic
content = content.replace(/if \(location\.pathname\.startsWith\("\/fungi"\)\) \{\n    return <FungiSEO \/>;\n  \}/, `if (location.pathname.startsWith("/fungi")) {\n    return <FungiSEO />;\n  }\n\n  if (location.pathname.startsWith("/viruses")) {\n    return <VirusesSEO />;\n  }`);

fs.writeFileSync('src/App.tsx', content);
