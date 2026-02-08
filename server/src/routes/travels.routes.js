import express from "express";
import pool from "../config/db.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * GET /api/travels/me
 * Fetch logged-in operator's travels profile
 */
router.get("/me", requireAuth, async (req, res) => {
  const clerkId = req.auth.userId;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM travels WHERE owner_clerk_id = ?",
      [clerkId]
    );

    if (rows.length === 0) {
      return res.json(null); // IMPORTANT
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch travels profile" });
  }
});

/**
 * POST /api/travels
 * Create travels profile
 */
router.post("/", requireAuth, async (req, res) => {
  const clerkId = req.auth.userId;
  const { name, email, phone, address } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone required" });
  }

  try {
    // Prevent duplicate profile
    const [existing] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ?",
      [clerkId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Travels already exists" });
    }

    const [result] = await pool.query(
      `
      INSERT INTO travels (owner_clerk_id, name, email, phone, address)
      VALUES (?, ?, ?, ?, ?)
      `,
      [clerkId, name, email, phone, address]
    );

    res.json({
      id: result.insertId,
      message: "Travels profile created",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create travels profile" });
  }
});

router.put("/me", requireAuth, async (req, res) => {
  const clerkId = req.auth.userId;
  const { name, email, phone, address } = req.body;

  try {
    await pool.query(
      `UPDATE travels 
       SET name=?, email=?, phone=?, address=? 
       WHERE owner_clerk_id=?`,
      [name, email, phone, address, clerkId]
    );

    const [rows] = await pool.query(
      "SELECT * FROM travels WHERE owner_clerk_id=?",
      [clerkId]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});


export default router;
