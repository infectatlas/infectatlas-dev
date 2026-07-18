import { microorganismsData } from './src/data/microorganisms';
import { virusesData } from './src/data/viruses';
import { fungiData } from './src/data/fungi';
import { parasitesData } from './src/data/parasites';

const allOrganisms = [
  ...microorganismsData,
  ...virusesData,
  ...fungiData,
  ...parasitesData
];

const ids = allOrganisms.map(o => o.id);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

console.log('Duplicates:', duplicates);
