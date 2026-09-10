import { diseasesData } from "./src/data/diseases.ts";
const slugs = ["viral-meningitis", "aseptic-viral-meningitis"];
slugs.forEach(s => {
  const d = diseasesData.find(d => d.slug === s || (d.alternateSlugs && d.alternateSlugs.includes(s)));
  console.log(s, "=>", d ? d.name : "Not found");
});
