import { diseasesData } from "./src/data/diseases.ts";
diseasesData.forEach(d => console.log(d.slug, d.name, d.alternateSlugs));
