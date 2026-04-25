// Validates JSON-LD on the live site against schema.org expectations.
// Run: node scripts/validate-schema.mjs

const BASE = "https://www.firstnationautofinancing.ca";

const pages = [
  { url: `${BASE}/`, expect: ["FinancialService", "FAQPage"] },
  { url: `${BASE}/community/akwesasne`, expect: ["FinancialService (org)", "FinancialService (community) + BreadcrumbList"] },
  { url: `${BASE}/community/six-nations-grand-river`, expect: ["FinancialService (org)", "FinancialService (community) + BreadcrumbList"] },
  { url: `${BASE}/community/miawpukek-conne-river`, expect: ["FinancialService (org)", "FinancialService (community) + BreadcrumbList"] },
  { url: `${BASE}/blog/how-tax-free-vehicle-delivery-works-status-card-holders`, expect: ["FinancialService (org)", "BlogPosting"] },
];

function extractLd(html) {
  const out = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1].trim();
    try { out.push(JSON.parse(raw)); }
    catch (e) { out.push({ __parseError: e.message, raw: raw.slice(0, 200) }); }
  }
  return out;
}

const REQUIRED = {
  FinancialService: ["@type", "name"],
  Organization: ["@type", "name"],
  FAQPage: ["@type", "mainEntity"],
  Question: ["@type", "name", "acceptedAnswer"],
  Answer: ["@type", "text"],
  BlogPosting: ["@type", "headline", "datePublished", "author"],
  BreadcrumbList: ["@type", "itemListElement"],
  ListItem: ["@type", "position", "name"],
  Place: ["@type", "name"],
  GeoCoordinates: ["@type", "latitude", "longitude"],
  AggregateRating: ["@type", "ratingValue", "reviewCount"],
};

const issues = [];
function check(obj, path = "") {
  if (Array.isArray(obj)) { obj.forEach((o, i) => check(o, `${path}[${i}]`)); return; }
  if (!obj || typeof obj !== "object") return;
  if (obj["@graph"]) check(obj["@graph"], `${path}.@graph`);
  const t = obj["@type"];
  if (typeof t === "string" && REQUIRED[t]) {
    for (const key of REQUIRED[t]) {
      if (!(key in obj)) issues.push(`${path} (${t}): missing required field "${key}"`);
    }
  }
  // Recurse into nested objects
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("@")) continue;
    if (v && typeof v === "object") check(v, `${path}.${k}`);
  }
  if (obj.__parseError) issues.push(`${path}: JSON parse error — ${obj.__parseError}`);
}

let totalSchemas = 0;
for (const page of pages) {
  console.log(`\n=== ${page.url} ===`);
  const before = issues.length;
  try {
    const res = await fetch(page.url, { headers: { "user-agent": "Mozilla/5.0 schema-check" } });
    if (!res.ok) { console.log(`  FETCH FAILED: ${res.status}`); continue; }
    const html = await res.text();
    const blocks = extractLd(html);
    console.log(`  Found ${blocks.length} JSON-LD block(s)`);
    blocks.forEach((b, i) => {
      const t = b["@type"] ?? (b["@graph"] ? `@graph(${b["@graph"].map(x => x["@type"]).join(",")})` : "?");
      console.log(`    [${i}] @type=${t}`);
      check(b, `block[${i}]`);
      totalSchemas++;
    });
  } catch (e) {
    issues.push(`${page.url}: fetch error — ${e.message}`);
  }
  const found = issues.length - before;
  if (found > 0) console.log(`  ⚠ ${found} issue(s) on this page`);
}

console.log(`\n=== Summary ===`);
console.log(`Schemas inspected: ${totalSchemas}`);
console.log(`Issues found: ${issues.length}`);
if (issues.length) {
  console.log("\nIssues:");
  for (const i of issues) console.log(`  - ${i}`);
  process.exit(1);
} else {
  console.log("✅ All schemas pass required-field validation");
}
