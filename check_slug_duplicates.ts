import { microorganismsData } from './src/data/microorganisms';

const getPathogenSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

const potentialDuplicates = microorganismsData.filter(m => getPathogenSlug(m.name) !== m.id.toLowerCase());

console.log('Organisms with different slug vs id:', potentialDuplicates.length);
potentialDuplicates.forEach(p => {
    console.log(`- ${p.name}: Slug=${getPathogenSlug(p.name)}, ID=${p.id}`);
});
