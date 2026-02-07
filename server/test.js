import pool from "./src/config/db.js";

const test = async () => {
  try {

    const [rows] = await pool.query("SELECT 1");
    console.log("✅ DB Connected:", rows);
    process.exit(0);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
};

test();
