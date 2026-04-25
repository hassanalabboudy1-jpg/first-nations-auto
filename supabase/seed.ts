import { Client } from "pg";
import { readFileSync } from "fs";
import { join } from "path";
import { ALL_COMMUNITIES, type CommunityData } from "../src/data/communities";

function loadDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const env = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    const match = env.match(/^DATABASE_URL=(.+)$/m);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  } catch {}
  throw new Error("DATABASE_URL not found in env or .env.local");
}

function parseDirectUrl(directUrl: string) {
  const m = directUrl.match(/postgresql:\/\/([^:]+):([^@]+)@db\.([^.]+)\.supabase\.co:\d+\/(.+)/);
  if (!m) return null;
  const [, user, password, ref, db] = m;
  return { user, password: decodeURIComponent(password), ref, db };
}

const POOLER_REGIONS = [
  "ca-central-1", "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "eu-west-1", "eu-west-2", "eu-central-1",
];
const POOLER_PREFIXES = ["aws-1", "aws-0"];

async function connectWithFallback(): Promise<Client> {
  const direct = loadDatabaseUrl();
  const parsed = parseDirectUrl(direct);

  const candidates: { label: string; config: Record<string, unknown> }[] = [
    { label: "direct", config: { connectionString: direct, ssl: { rejectUnauthorized: false } } },
  ];

  if (parsed) {
    for (const prefix of POOLER_PREFIXES) {
      for (const region of POOLER_REGIONS) {
        candidates.push({
          label: `pooler:${prefix}-${region}`,
          config: {
            host: `${prefix}-${region}.pooler.supabase.com`,
            port: 5432,
            user: `${parsed.user}.${parsed.ref}`,
            password: parsed.password,
            database: parsed.db,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 5000,
          },
        });
      }
    }
  }

  let lastErr: unknown;
  for (const { label, config } of candidates) {
    const client = new Client(config as never);
    try {
      await client.connect();
      console.log(`Connected via ${label}`);
      return client;
    } catch (e) {
      lastErr = e;
      try { await client.end(); } catch {}
    }
  }
  throw lastErr ?? new Error("Unable to connect");
}

const PROVINCES = ["ON", "QC", "MB", "NB", "NS", "NL"] as const;

function buildUpsertSql(rows: CommunityData[]): { sql: string; values: unknown[] } {
  const cols = [
    "name", "slug", "province", "nation", "language", "greeting",
    "population", "reserve_name", "latitude", "longitude",
    "is_remote", "delivery_zone",
  ];
  const values: unknown[] = [];
  const tuples = rows.map((c, i) => {
    const base = i * cols.length;
    values.push(
      c.name, c.slug, c.province, c.nation, c.language, c.greeting,
      c.population ?? null, c.reserveName ?? null,
      c.latitude ?? null, c.longitude ?? null,
      c.isRemote, c.deliveryZone,
    );
    const placeholders = cols.map((_, j) => `$${base + j + 1}`).join(",");
    return `(${placeholders})`;
  }).join(",\n");

  const sql = `
    INSERT INTO public.communities (${cols.join(",")}) VALUES
    ${tuples}
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      province = EXCLUDED.province,
      nation = EXCLUDED.nation,
      language = EXCLUDED.language,
      greeting = EXCLUDED.greeting,
      population = EXCLUDED.population,
      reserve_name = EXCLUDED.reserve_name,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude,
      is_remote = EXCLUDED.is_remote,
      delivery_zone = EXCLUDED.delivery_zone,
      updated_at = now();
  `;
  return { sql, values };
}

async function run() {
  const client = await connectWithFallback();

  console.log("Updating province constraint...");
  await client.query(`ALTER TABLE public.communities DROP CONSTRAINT IF EXISTS communities_province_check`);
  await client.query(
    `ALTER TABLE public.communities ADD CONSTRAINT communities_province_check CHECK (province IN (${PROVINCES.map(p => `'${p}'`).join(",")}))`
  );

  const seen = new Set<string>();
  const dupes: string[] = [];
  const unique = ALL_COMMUNITIES.filter((c) => {
    if (seen.has(c.slug)) { dupes.push(c.slug); return false; }
    seen.add(c.slug);
    return true;
  });
  if (dupes.length) console.log(`Skipping ${dupes.length} duplicate slugs: ${dupes.join(", ")}`);
  console.log(`Seeding ${unique.length} communities...`);
  const { sql, values } = buildUpsertSql(unique);
  await client.query(sql, values);

  const { rows } = await client.query<{ province: string; total: string }>(
    `SELECT province, count(*)::text AS total FROM public.communities GROUP BY province ORDER BY province`
  );
  console.log("\nCommunities seeded:");
  const labels: Record<string, string> = {
    ON: "Ontario", QC: "Quebec", MB: "Manitoba",
    NB: "New Brunswick", NS: "Nova Scotia", NL: "Newfoundland & Labrador",
  };
  let total = 0;
  for (const r of rows) {
    const n = parseInt(r.total, 10);
    total += n;
    console.log(`  ${labels[r.province] ?? r.province}: ${n}`);
  }
  console.log(`  Total: ${total}`);

  await client.end();
}

run().catch((e) => { console.error(e); process.exit(1); });
