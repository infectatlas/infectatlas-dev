const { getOrganismCanonicalUrl, getOrganismSlug } = require('./src/lib/organismUrlUtils.js') || {};
console.log(getOrganismSlug ? getOrganismSlug({name: "Legionella pneumophila"}) : "Not found");
