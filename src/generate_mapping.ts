import { microorganismsData } from "./data/microorganisms";
import { fungiData } from "./data/fungi";
import { virusesData } from "./data/viruses";
import { parasitesData } from "./data/parasites";

const allOrganisms = [...microorganismsData, ...fungiData, ...virusesData, ...parasitesData];

console.log("Name | ID");
allOrganisms.forEach(o => {
    console.log(`${o.name} | ${o.id}`);
});
