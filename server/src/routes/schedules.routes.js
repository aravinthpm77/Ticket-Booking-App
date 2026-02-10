import express from "express";
import pool from "../config/db.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * GET /api/schedules - Fetch all schedules for operator's buses/routes
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    // Get operator's travels ID
    const [travels] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ? LIMIT 1",
      [clerkId]
    );

    if (!travels.length) {
      return res.json([]);
    }

    const travelsId = travels[0].id;

    // Get schedules for operator's routes
    const [schedules] = await pool.query(
      `SELECT 
        s.id,
        s.route_id,
        s.bus_id,
        s.travel_date,
        s.departure_time,
        s.arrival_time,
        s.price,
        r.from_city as from_place,
        r.to_city as to_place,
        b.bus_name,
        b.layout as bus_layout,
        b.bus_number

       FROM schedules s
       JOIN routes r ON s.route_id = r.id
       JOIN buses b ON s.bus_id = b.id
       WHERE r.travels_id = ?
       ORDER BY s.travel_date DESC`,
      [travelsId]
    );

    res.json(schedules);
  } catch (err) {
    console.error("Fetch schedules error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/schedules - Create a schedule
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { route_id, bus_id, travel_date, departure_time, arrival_time, price } = req.body;

    if (!route_id || !bus_id || !travel_date || !departure_time || !arrival_time || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verify operator owns this route
    const [travels] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ? LIMIT 1",
      [clerkId]
    );

    if (!travels.length) {
      return res.status(403).json({ message: "Create travels profile first" });
    }

    const travelsId = travels[0].id;

    // Verify route belongs to operator
    const [route] = await pool.query(
      "SELECT id FROM routes WHERE id = ? AND travels_id = ?",
      [route_id, travelsId]
    );

    if (!route.length) {
      return res.status(403).json({ message: "Route not found" });
    }

    // Insert schedule
    const [result] = await pool.query(
      `INSERT INTO schedules (travels_id, route_id, bus_id, travel_date, departure_time, arrival_time, price)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [travelsId, route_id, bus_id, travel_date, departure_time, arrival_time, price]
    );

    // Fetch created schedule with details
    const [created] = await pool.query(
      `SELECT 
        s.id,
        s.route_id,
        s.bus_id,
        s.travel_date,
        s.departure_time,
        s.arrival_time,
        s.price,
        r.from_city as from_place,
        r.to_city as to_place,
        b.bus_name,
        b.layout as bus_layout
       FROM schedules s
       JOIN routes r ON s.route_id = r.id
       JOIN buses b ON s.bus_id = b.id
       WHERE s.id = ?`,
      [result.insertId]
    );

    res.status(201).json(created[0]);
  } catch (err) {
    console.error("Create schedule error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/schedules/:id - Update a schedule
 */
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { id } = req.params;
    const { route_id, bus_id, travel_date, departure_time, arrival_time, price } = req.body;

    if (!route_id || !bus_id || !travel_date || !departure_time || !arrival_time || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verify operator owns this schedule's route
    const [travels] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ? LIMIT 1",
      [clerkId]
    );

    if (!travels.length) {
      return res.status(403).json({ message: "Create travels profile first" });
    }

    const travelsId = travels[0].id;

    // Verify route belongs to operator
    const [route] = await pool.query(
      "SELECT id FROM routes WHERE id = ? AND travels_id = ?",
      [route_id, travelsId]
    );

    if (!route.length) {
      return res.status(403).json({ message: "Route not found" });
    }

    // Update schedule
    const [updateResult] = await pool.query(
      `UPDATE schedules 
       SET route_id = ?, bus_id = ?, travel_date = ?, departure_time = ?, arrival_time = ?, price = ?
       WHERE id = ?`,
      [route_id, bus_id, travel_date, departure_time, arrival_time, price, id]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Fetch updated schedule with details
    const [updated] = await pool.query(
      `SELECT 
        s.id,
        s.route_id,
        s.bus_id,
        s.travel_date,
        s.departure_time,
        s.arrival_time,
        s.price,
        r.from_city as from_place,
        r.to_city as to_place,
        b.bus_name,
        b.layout as bus_layout
       FROM schedules s
       JOIN routes r ON s.route_id = r.id
       JOIN buses b ON s.bus_id = b.id
       WHERE s.id = ?`,
      [id]
    );

    res.json(updated[0]);
  } catch (err) {
    console.error("Update schedule error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/schedules/:id - Delete a schedule
 */
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { id } = req.params;

    // Verify operator owns this schedule's route
    const [travels] = await pool.query(
      "SELECT id FROM travels WHERE owner_clerk_id = ? LIMIT 1",
      [clerkId]
    );

    if (!travels.length) {
      return res.status(403).json({ message: "Create travels profile first" });
    }

    const travelsId = travels[0].id;

    // Verify schedule's route belongs to operator before deleting
    const [schedule] = await pool.query(
      `SELECT s.id FROM schedules s
       JOIN routes r ON s.route_id = r.id
       WHERE s.id = ? AND r.travels_id = ?`,
      [id, travelsId]
    );

    if (!schedule.length) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Delete schedule
    const [deleteResult] = await pool.query(
      "DELETE FROM schedules WHERE id = ?",
      [id]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ id: Number(id) });
  } catch (err) {
    console.error("Delete schedule error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
