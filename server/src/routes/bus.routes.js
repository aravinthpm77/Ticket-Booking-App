import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import pool from "../config/db.js";

const router = express.Router();


router.post(
  "/",
  requireAuth,
  async (req, res) => {
    try {
      const clerkId = req.auth.userId;
      const { bus_name, bus_number, bus_type, layout, total_seats } = req.body;

      if (!bus_name || !bus_number || !bus_type || !layout || !total_seats) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // get travels
      const [travels] = await pool.query(
        "SELECT id FROM travels WHERE owner_clerk_id = ?",
        [clerkId]
      );

      if (!travels.length) {
        return res.status(404).json({ message: "Travels profile not found" });
      }

      const travelsId = travels[0].id;

      const [result] = await pool.query(
        `INSERT INTO buses 
        (travels_id, bus_name, bus_number, bus_type, layout, total_seats)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [travelsId, bus_name, bus_number, bus_type, layout, total_seats]
      );

      res.status(201).json({
        id: result.insertId,
        bus_name,
        bus_number,
        bus_type,
        layout,
        total_seats,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create bus" });
    }
  }
);

/**
 * GET ALL BUSES (by travels)
 */
router.get(
  "/",
  requireAuth,
  async (req, res) => {
    try {
      const clerkId = req.auth.userId;

      const [rows] = await pool.query(
        `
        SELECT b.*
        FROM buses b
        JOIN travels t ON b.travels_id = t.id
        WHERE t.owner_clerk_id = ?
        ORDER BY b.created_at DESC
        `,
        [clerkId]
      );

      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch buses" });
    }
  }
);

/**
 * DELETE BUS
 */
router.delete(
  "/:id",
  requireAuth,
  async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM buses WHERE id = ?", [id]);
      res.json({ message: "Bus deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete bus" });
    }
  }
);

export default router;
