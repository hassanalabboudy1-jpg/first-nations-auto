const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔌 Connecting to Supabase...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connected to database!");

    const sql = fs.readFileSync(
      path.join(__dirname, "supabase", "migrations", "001_initial_schema.sql"),
      "utf8"
    );

    console.log("🚀 Running migration...");
    await client.query(sql);
    console.log("✅ Migration complete! All tables created.");

    // Verify
    const res = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log("\n📋 Tables created:");
    res.rows.forEach((r) => console.log("   •", r.table_name));
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.end();
  }
}

main();
