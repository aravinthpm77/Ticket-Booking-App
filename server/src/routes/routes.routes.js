import express from "express";
import pool from "../config/db.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { from_city, to_city, departure_time, arrival_time, price } = req.body;

    if (!from_city || !to_city || !departure_time || !arrival_time || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [travels] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ? LIMIT 1",
      [clerkId]
    );

    if (!travels.length) {
      return res.status(403).json({ message: "Create travels profile first" });
    }

    const travelsId = travels[0].id;

    const [insertResult] = await pool.query(
      `INSERT INTO routes 
       (travels_id, from_city, to_city, departure_time, arrival_time, price)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [travelsId, from_city, to_city, departure_time, arrival_time, price]
    );
    const [createdRows] = await pool.query(
      "SELECT * FROM routes WHERE id = ?",
      [insertResult.insertId]
    );

    res.status(201).json(createdRows[0]);
  } catch (err) {
    console.error("Create route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    const [routes] = await pool.query(
      `SELECT r.*
       FROM routes r
       JOIN travels t ON r.travels_id = t.id
       WHERE t.owner_clerk_id = ?
       ORDER BY r.created_at DESC`,
      [clerkId]
    );

    res.json(routes);
  } catch (err) {
    console.error("Fetch routes error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { id } = req.params;
    const { from_city, to_city, departure_time, arrival_time, price } = req.body;

    if (!from_city || !to_city || !departure_time || !arrival_time || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [travels] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ? LIMIT 1",
      [clerkId]
    );

    if (!travels.length) {
      return res.status(403).json({ message: "Create travels profile first" });
    }

    const travelsId = travels[0].id;

    const [updateResult] = await pool.query(
      `UPDATE routes
       SET from_city = ?, to_city = ?, departure_time = ?, arrival_time = ?, price = ?
       WHERE id = ? AND travels_id = ?`,
      [from_city, to_city, departure_time, arrival_time, price, id, travelsId]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Route not found" });
    }

    const [updatedRows] = await pool.query(
      "SELECT * FROM routes WHERE id = ?",
      [id]
    );

    res.json(updatedRows[0]);
  } catch (err) {
    console.error("Update route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { id } = req.params;

    const [travels] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ? LIMIT 1",
      [clerkId]
    );

    if (!travels.length) {
      return res.status(403).json({ message: "Create travels profile first" });
    }

    const travelsId = travels[0].id;

    const [deleteResult] = await pool.query(
      "DELETE FROM routes WHERE id = ? AND travels_id = ?",
      [id, travelsId]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.json({ id: Number(id) });
  } catch (err) {
    console.error("Delete route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
