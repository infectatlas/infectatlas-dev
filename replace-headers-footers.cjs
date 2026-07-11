const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/MarketingLandingPage.tsx',
  'src/components/OrganismsSEO.tsx',
  'src/components/FungiSEO.tsx',
  'src/components/DiseasesSEO.tsx',
  'src/components/DrugsSEO.tsx',
  'src/components/ComparisonsSEO.tsx',
  'src/components/HowItWorks.tsx',
  'src/components/LegalPage.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Inject imports if not present
  if (!content.includes('import PublicHeader')) {
    content = content.replace('import {', 'import PublicHeader from "./PublicHeader";\nimport PublicFooter from "./PublicFooter";\nimport {');
  }

  // Replace header for <header ...> ... </header>
  // But wait, MarketingLandingPage uses <nav id="sticky-header"...>...</nav>
  if (content.includes('<nav id="sticky-header"')) {
    content = content.replace(/<nav id="sticky-header"[\s\S]*?<\/nav>/, '<PublicHeader handleLaunchApp={handleLaunchApp} />');
  } else if (content.includes('<header className={`bg-white border-b border-slate-200 active:bg-white sticky top-0 z-20')) {
    // Other pages use <header>
    content = content.replace(/<header className={`bg-white border-b border-slate-200 active:bg-white sticky top-0 z-20[\s\S]*?<\/header>/, '<PublicHeader handleLaunchApp={handleLaunchApp} showHeader={showHeader} />');
  } else if (content.includes('<header')) {
      content = content.replace(/<header[\s\S]*?<\/header>/, '<PublicHeader handleLaunchApp={handleLaunchApp} showHeader={showHeader} />');
  }
  
  // Replace footer for <footer ...> ... </footer>
  if (content.includes('<footer')) {
    content = content.replace(/<footer[\s\S]*?<\/footer>/, '<PublicFooter />');
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
