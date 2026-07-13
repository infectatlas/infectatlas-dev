
import { microorganismsData } from "./data/microorganisms";
import { fungiData } from "./data/fungi";
import { virusesData } from "./data/viruses";
import { parasitesData } from "./data/parasites";
import * as fs from 'fs';

const allOrganisms = [...microorganismsData, ...fungiData, ...virusesData, ...parasitesData];
const validSlugs = new Set(allOrganisms.map(o => o.id));

const diseasesContent = fs.readFileSync('src/data/diseases.ts', 'utf8');

const regex = /slug: "([^"]+)"/g;
let match;
const invalidSlugs = new Set<string>();

while ((match = regex.exec(diseasesContent)) !== null) {
    const slug = match[1];
    if (!validSlugs.has(slug)) {
        invalidSlugs.add(slug);
    }
}

console.log("Invalid slugs found:", Array.from(invalidSlugs));
